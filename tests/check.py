"""Garage Code job checks. Run: python3 tests/check.py
Proves every job's fixed program works on every test car, every broken starter
really is broken (it crashes or gives the wrong readout on at least one car),
and every "must use" rule is met by the fixed program."""
import json, os, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, ROOT)
import harness  # noqa: E402

jobs = json.loads(subprocess.check_output(["node", "-e", "process.stdout.write(JSON.stringify(require(process.argv[1])))", os.path.join(ROOT, "jobs.js")]))
fails = 0
def bad(msg):
    global fails
    fails += 1
    print("  FAIL:", msg)

for job in jobs:
    print(f"{job['id']} {job['title']}")
    broke = False
    for i, t in enumerate(job["tests"]):
        s = json.loads(harness.gc_run(job["solution"], t["setup"], job.get("after", "")))
        if s["error"]:
            bad(f"solution errors on car {i+1}: {s['error']}")
            continue
        if not s["out"].strip():
            bad(f"solution prints nothing on car {i+1}")
        b = json.loads(harness.gc_run(job["starter"], t["setup"], job.get("after", "")))
        if b["error"] or b["out"] != s["out"]:
            broke = True
        for need, _ in job.get("require", []):
            if need not in s["used"]:
                bad(f"solution doesn't use {need}")
    if not broke:
        bad("starter isn't broken on any car")
    b = json.loads(harness.gc_run(job["starter"], job["tests"][0]["setup"], job.get("after", "")))
    print("   starter:", (b["error"]["type"] + ": " + b["error"]["msg"] + (f" (line {b['error']['line']})" if b['error']['line'] else "") + (f" maybe {b['error']['maybe']}" if b['error'].get('maybe') else "")) if b["error"] else "runs, wrong readout")
print(f"\n{len(jobs)} jobs, {fails} problems")
sys.exit(1 if fails else 0)
