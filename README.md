# Garage Code

Learn Python by running a car garage. Every job that comes into the bay is a coding problem, and Les the workshop foreman signs it off (or doesn't).

Part of **Kralnu Games** · [kralnugames.com](https://kralnugames.com)

## Play

Open `index.html` in any browser, or turn on GitHub Pages for this repo (Settings → Pages → Deploy from branch → `main`, root folder) and play it on your phone.

Everything runs in the browser. It needs no install, no account and no server, and progress saves on your device.

## The job board

| Job | What it teaches |
|---|---|
| 0412 Oil change | `print()` and text |
| 0413 Book it in | variables and f-strings |
| 0414 Tyre check | `if` / `else` and comparisons (runs on 3 cars) |
| 0415 Wheel nuts | `for` loops and `range()` |
| 0416 Parts shelf | lists, `.append()` and `len()` |
| 0417 Write the bill | maths, brackets and `:.2f` money formatting |
| 0418 Fault codes | text tools: `.upper()` and `.startswith()` |
| 0419 Warm-up | `while` loops |
| 0420 Your own tools | functions with `def` |
| 0421 MOT day (boss) | `return`, `and` / `or`, and `min()` |

Each job comes with a short workshop manual page that explains the new idea before you need it.

## Features

- The car reacts to your code. Your `reg` variable goes on the number plate, errors make the bonnet smoke, and a signed-off job lifts the car on the ramp.
- Hidden test cars stop hard-coded answers from passing.
- Les explains Python errors in plain English and gives hints for £5 from the till.
- You earn a tidy-code tip for short solutions and a bonus for finishing without hints. Your rank goes up from Apprentice to Garage owner.
- **Make a job:** write your own job and your own answer. The game works out the expected readout from your answer, and you can share a job code with a mate.
- The layout is built for phones, with a key bar for `: ( ) " =` and auto-indent after a colon.

## How it works

`index.html` holds three scripts:

- **`py`** is a small Python interpreter written in JavaScript. It covers the beginner subset: variables, numbers, text, f-strings, lists, `if`/`elif`/`else`, `for`/`while`, `break`/`continue`, `def`/`return`, and common built-ins and methods. Its error messages are written for beginners.
- **`levels`** holds the jobs. Each job has its own solution, and the expected readout is worked out by running that solution, so the answer key always matches the brief.
- **The UI** handles the bay, Les, the job sheet, the workbench and the job maker.

To add a job, add an entry to `LEVELS` in the `levels` script with a brief, a manual page, a solution and optional test cars.
