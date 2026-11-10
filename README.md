# Garage Code

**The sequel to [Python Kitchen](https://kralnugames.com/kitchen-coder/).** In the kitchen you learn to write Python. In the garage you learn to fix it.

Every car that rolls into the bay comes with a broken program. Les the workshop foreman wants it fixed and signed off. Read the error, find the fault, and get it on the ramp.

Part of **Kralnu Games** · [kralnugames.com](https://kralnugames.com)

## Play

Open the game at [kralnugames.com/garage-code](https://kralnugames.com/garage-code/), or turn on GitHub Pages for this repo (Settings → Pages → Deploy from branch → `main`, root folder).

It runs real Python 3 in your browser. The first visit downloads Python (about 10MB). After that it's saved on your device and works offline, and it shares the same saved copy as Python Kitchen. No install, no account, and progress saves on your device.

## The job board

| Bay | Job | What's wrong, and what it teaches |
|---|---|---|
| 1 · Won't start | 0501 Won't start | reading an error message, `SyntaxError` |
| | 0502 Misfire | `IndentationError` and blocks |
| | 0503 Wrong part number | `NameError` and typos |
| | 0504 Mixed fuel | `TypeError`: text and numbers |
| | 0505 One short | bugs that don't crash: off-by-one with `range()` |
| 2 · Runs, but wrong | 0506 The gauge lies | edge cases, `>=` and `else` |
| | 0507 Stuck throttle | infinite `while` loops |
| | 0508 Always fails | the `or` trap |
| | 0509 Lost receipt | `print` vs `return`, and `None` |
| | 0510 Short change | `/` vs `//` |
| 3 · Bigger jobs | 0511 Parts catalogue | lists of dictionaries, `return` inside loops |
| | 0512 Four corners | `zip()` |
| | 0513 The queue | `sorted()` with `key=lambda` |
| | 0514 Quick checks | list comprehensions |
| | 0515 Repeat faults | sets |
| 4 · Built properly | 0516 The car class | classes and `self` |
| | 0517 Clocking in | methods that change an object, `__str__` |
| | 0518 Service history | files: `open()`, `"w"` vs `"a"`, `with` |
| | 0519 Shared toolbox | the default-argument trap |
| | 0520 MOT day (boss) | three faults in one program |

Each job comes with a workshop manual page on the new idea. When it's signed off, Les tells you exactly what was wrong.

## Features

- Real Python error messages, with Les explaining each one in plain English (and guessing what you meant when you misspell something).
- Every job runs on several test cars, so a hard-typed answer won't pass.
- A runaway loop can't freeze the page: Les cuts the engine after a few seconds.
- Hints from Les for £5 from the till, and a bonus for finishing without them. Your rank goes up from Apprentice to Garage owner.
- **Make a job:** write your own broken program and its fix, and share it with a mate as a code.
- Built for phones, with a key bar for the fiddly symbols and auto-indent after a colon.

## How it works

- **`index.html`** is the bay, Les, the job sheet, the workbench and the job maker.
- **`jobs.js`** holds the 20 jobs. Each has a broken starter program, the fixed solution, and test cars. The expected readout is worked out by running the fix, so the answer key can never drift from the job.
- **`gc-worker.js`** loads Pyodide (real CPython in WebAssembly) in a background worker, so a runaway loop can be stopped without freezing the page.
- **`harness.py`** runs the code against each test car in a fresh, empty folder, records what's printed, and reports errors with the line number.
- **`tests/check.py`** proves every fix works on every test car and every starter really is broken. Run it with `python3 tests/check.py`.

## Updates

The game checks for a newer version when it opens and when you come back to it. If there is one, players see a small "A new version is ready" notice with an **Update** button, and there's a **Get the latest version** button in the menu at any time.

When pushing an update: change the game's version number and put the same value in `version.json`. Bump `CACHE` in `sw.js` if the list of files changes.

## Credits

Made by Kralnu Games. Ideas, design and testing by Kris. Built with Claude, an AI by Anthropic.

© 2026 kralnu90. All rights reserved.
