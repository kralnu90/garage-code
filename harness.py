# Garage Code harness.
# Runs a learner's code against one test car: the car's data is set up first,
# then the learner's workbench code, then any test calls Les makes afterwards.
# It records what was printed and reports errors with the line number in the
# learner's own file, plus a "did you mean" guess for misspelt names.
# Each run gets a fresh, empty folder, so jobs that write files start clean.
# The browser runs this inside Pyodide; tests/check.py runs it under CPython.
import ast
import builtins
import difflib
import json
import os
import shutil
import sys
import tempfile
import traceback

FILENAME = "workbench.py"
TESTFILE = "les_test.py"
SETUPFILE = "car_data.py"
MAX_OUTPUT = 100_000


class _Recorder:
    def __init__(self):
        self.parts = []
        self.size = 0

    def write(self, s):
        s = str(s)
        self.size += len(s)
        if self.size > MAX_OUTPUT:
            raise RuntimeError("too much printing")
        self.parts.append(s)
        return len(s)

    def flush(self):
        pass

    def isatty(self):
        return False


def _no_input(prompt=""):
    raise EOFError("Garage Code jobs don't use input(). The car's data is filled in for you.")


def _used(code):
    """Node types and called names in the learner's code, for 'you must use X' checks."""
    try:
        tree = ast.parse(code)
    except SyntaxError:
        return []
    found = set()
    for node in ast.walk(tree):
        found.add(type(node).__name__)
        if isinstance(node, ast.Call):
            f = node.func
            if isinstance(f, ast.Name):
                found.add("call:" + f.id)
            elif isinstance(f, ast.Attribute):
                found.add("call:." + f.attr)
    return sorted(found)


def _suggest(name, options):
    if not name:
        return None
    pool = [o for o in options if not o.startswith("__")]
    hit = difflib.get_close_matches(name, pool, n=1, cutoff=0.6)
    return hit[0] if hit else None


def gc_run(code, setup="", after=""):
    rec = _Recorder()
    saved = (sys.stdout, sys.stderr, builtins.input, os.getcwd())
    work = tempfile.mkdtemp(prefix="bay_")
    error = None
    namespace = {"__name__": "__main__", "__builtins__": builtins}
    try:
        os.chdir(work)
        if setup:
            exec(compile(setup, SETUPFILE, "exec"), namespace)
        sys.stdout = rec
        sys.stderr = rec
        builtins.input = _no_input
        exec(compile(code, FILENAME, "exec"), namespace)
        if after:
            exec(compile(after, TESTFILE, "exec"), namespace)
    except SystemExit:
        pass
    except BaseException as e:  # report everything the learner's code raises
        line = None
        hidden = False
        if isinstance(e, SyntaxError) and e.filename == FILENAME:
            line = e.lineno
            msg = e.msg
        else:
            frames = traceback.extract_tb(e.__traceback__)
            for frame in frames:
                if frame.filename == FILENAME:
                    line = frame.lineno
            hidden = line is None and any(f.filename == TESTFILE for f in frames)
            msg = str(e)
        maybe = None
        if isinstance(e, NameError) and not isinstance(e, UnboundLocalError):
            maybe = _suggest(getattr(e, "name", None), list(namespace) + dir(builtins))
        elif isinstance(e, AttributeError):
            obj = getattr(e, "obj", None)
            if obj is not None:
                maybe = _suggest(getattr(e, "name", None), dir(obj))
        error = {"type": type(e).__name__, "msg": msg, "line": line, "hidden": hidden, "maybe": maybe}
    finally:
        sys.stdout, sys.stderr, builtins.input = saved[0], saved[1], saved[2]
        try:
            os.chdir(saved[3])
        except OSError:
            pass
        shutil.rmtree(work, ignore_errors=True)
    return json.dumps({"out": "".join(rec.parts), "error": error, "used": _used(code)})


if __name__ == "__main__" and sys.platform != "emscripten":
    # Command-line use for the test suite only: JSON {"code", "setup", "after"} on stdin.
    job = json.loads(sys.stdin.read())
    sys.stdout.write(gc_run(job["code"], job.get("setup") or "", job.get("after") or ""))
