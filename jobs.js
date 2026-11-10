/* Garage Code jobs: the sequel to Python Kitchen.
   Python Kitchen teaches you to write code. Garage Code teaches you to fix it.
   Most jobs arrive as a broken program (starter). The answer key is never typed
   out: the game runs each job's fixed program (solution) on every test car and
   the learner's readout has to match it. tests/check.py proves every solution
   works and every starter is genuinely broken.
   require: [need, message]. need is a Python node type (e.g. "ListComp") or
   "call:name" for a function the code must call. */
(function (root) {
const JOBS = [
/* ---------------- Bay 1 · Won't start ---------------- */
{id:'g1',no:'0501',bay:1,title:"Won't start",customer:'Mrs Patel',car:'Ford Focus',reg:'KR12 ABC',miles:'120,500',colour:'#3b6ea5',pay:40,
 intro:"Welcome to the garage. Kitchen taught you to write Python. In here you learn to fix it. First car won't even start. Run it, and read what Python tells you.",
 manual:{title:'Reading an error',body:"When Python can't run your code it stops and tells you three things: the <b>line number</b>, the <b>type</b> of error, and a short message. Go to that line first. A <code>SyntaxError</code> means the code isn't written in proper Python yet, like a missing bracket or colon. Fix one thing, then run it again: the next error might be further down.",example:"print(\"Hello\"   # SyntaxError: '(' was never closed\nif fuel < 10     # SyntaxError: expected ':'"},
 brief:'The job card should print the reg, a timing belt warning if the car has done over 100,000 miles, then <code>Done</code>. Two typing mistakes stop it starting.',
 teaches:['reading errors','SyntaxError'],
 starter:`# The car's reg and mileage are filled in for you.
print("Job card for", reg
if mileage > 100000
    print("High mileage - check the timing belt")
print("Done")
`,
 solution:`print("Job card for", reg)
if mileage > 100000:
    print("High mileage - check the timing belt")
print("Done")`,
 tests:[{setup:'reg = "KR12 ABC"\nmileage = 120500',label:'120,500 miles'},{setup:'reg = "YD60 LMN"\nmileage = 45000',label:'45,000 miles'}],
 hints:["Run it and look at the line number in the readout. Start there.","Every opening bracket needs a closing one. Look at the end of line 2.","Lines starting with if end with a colon. Line 3 is missing one."],
 diag:'A missing ) on the print line and a missing : on the if line. Python can only report one SyntaxError at a time, so you fix, run, fix again.'},

{id:'g2',no:'0502',bay:1,title:'Misfire',customer:'Dave Holt',car:'VW Golf',reg:'DH15 GLF',miles:'78,210',colour:'#c9ccd1',pay:45,
 intro:"Golf's misfiring. Somebody's been sloppy with the spacing in this one.",
 manual:{title:'Indentation',body:'Python uses spaces at the start of a line to group code. Everything that belongs to a <code>for</code>, <code>if</code> or <code>def</code> is pushed in 4 spaces. Lines pushed in the same amount run together. An <code>IndentationError</code> means a line is pushed in when it shouldn\'t be, or isn\'t when it should.',example:'for psi in pressures:\n    print(psi)          # inside the loop\n    if psi < 30:\n        print("Low")    # inside the if\nprint("Finished")       # after the loop'},
 brief:'Print each tyre pressure, with <code>  Pump it up</code> under any tyre below 30 psi, then <code>All tyres checked</code> once at the end.',
 teaches:['IndentationError','blocks'],
 starter:`# pressures is a list of the four tyre pressures.
for psi in pressures:
print(f"Tyre at {psi} psi")
    if psi < 30:
        print("  Pump it up")
    print("All tyres checked")
`,
 solution:`for psi in pressures:
    print(f"Tyre at {psi} psi")
    if psi < 30:
        print("  Pump it up")
print("All tyres checked")`,
 tests:[{setup:'pressures = [32, 28, 33, 31]',label:'32 28 33 31'},{setup:'pressures = [29, 29, 35, 35]',label:'29 29 35 35'},{setup:'pressures = [34, 34, 34, 34]',label:'all 34'}],
 hints:["The line after for needs pushing in 4 spaces so it's inside the loop.","Once that's fixed, look at the last line. Should All tyres checked print four times or once?","Lines at the same depth as for run after the loop has finished."],
 diag:"The first print wasn't pushed in under the for, and the last print was pushed in too far, so it would have run once per tyre."},

{id:'g3',no:'0503',bay:1,title:'Wrong part number',customer:'Brake Bros Ltd',car:'Transit van',reg:'BB68 VAN',miles:'141,002',colour:'#f2f2ee',pay:45,
 intro:"Parts order's come back wrong. Python says it can't find something. Check the spelling.",
 manual:{title:'NameError',body:"A <code>NameError</code> means Python was asked for a name it has never seen. Nine times out of ten it's a typo. Python names are exact: <code>price</code>, <code>prise</code> and <code>Price</code> are three different things. The readout and Les will often guess what you meant.",example:'price = 48.50\nprint(prise)   # NameError: name \'prise\' is not defined'},
 brief:'Print the order line, like <code>2 x brake pads: £97.00</code>, using the part, price and quantity filled in for each order.',
 teaches:['NameError','typos'],
 starter:`# part, price and qty are filled in for each order.
total = prise * qty
print(f"{qty} x {part}: £{totl:.2f}")
`,
 solution:`total = price * qty
print(f"{qty} x {part}: £{total:.2f}")`,
 tests:[{setup:'part = "brake pads"\nprice = 48.5\nqty = 2',label:'2 brake pads'},{setup:'part = "oil filter"\nprice = 7.99\nqty = 3',label:'3 oil filters'},{setup:'part = "wiper blade"\nprice = 12.0\nqty = 1',label:'1 wiper blade'}],
 hints:["Run it. The readout tells you which name Python couldn't find.","Compare the misspelt name with the one in the comment at the top.","There are two typos. Fix one, run it again, and Python will point at the next."],
 diag:'Two typos: prise instead of price, and totl instead of total. A NameError always means "check the spelling".'},

{id:'g4',no:'0504',bay:1,title:'Mixed fuel',customer:'Jen Okafor',car:'Toyota Yaris',reg:'JO19 YRS',miles:'61,880',colour:'#d9534f',pay:50,
 intro:"Someone's put diesel in a petrol car. Same problem here: two types that don't mix.",
 manual:{title:'TypeError',body:'Text (<code>str</code>) and numbers (<code>int</code>, <code>float</code>) are different types. <code>+</code> adds numbers and joins text, but it can\'t do both at once, so <code>"Due in " + 500</code> is a <code>TypeError</code>. The easy fix is an f-string, which turns the number into text for you.',example:'left = 500\nprint("Due in " + left)        # TypeError\nprint(f"Due in {left} miles")  # fine'},
 brief:'Work out how many miles until the next service (they happen every <code>service_every</code> miles) and print <code>Next service in 8120 miles</code>.',
 teaches:['TypeError','str and int'],
 starter:`# mileage and service_every are filled in.
miles_left = service_every - mileage % service_every
print("Next service in " + miles_left + " miles")
`,
 solution:`miles_left = service_every - mileage % service_every
print(f"Next service in {miles_left} miles")`,
 tests:[{setup:'mileage = 61880\nservice_every = 10000',label:'61,880 · every 10k'},{setup:'mileage = 99950\nservice_every = 10000',label:'99,950 · every 10k'},{setup:'mileage = 30000\nservice_every = 12000',label:'30,000 · every 12k'}],
 hints:["The maths on line 2 is fine. It's line 3 that breaks.","miles_left is a number. You can't + a number onto text.","Swap it for an f-string: f\"Next service in {miles_left} miles\""],
 diag:'"Next service in " is text and miles_left is a number, and + can\'t join them. An f-string converts the number for you.'},

{id:'g5',no:'0505',bay:1,title:'One short',customer:'Mr Lewis',car:'Land Rover Defender',reg:'LR07 DEF',miles:'188,400',colour:'#4f7d5c',pay:55,
 intro:"This one doesn't crash. It just quietly does the wrong thing, which is worse. Compare the readout with the job sheet.",
 manual:{title:"Bugs that don't crash",body:"Some bugs give no error at all. The code runs but the answer is wrong. The only way to catch them is to compare the readout with what it <i>should</i> say, line by line. A very common one is being <b>off by one</b>: <code>range(1, 5)</code> gives 1, 2, 3 and 4, and stops one before the second number.",example:'for n in range(1, 4):\n    print(n)        # 1, 2, 3 (not 4!)\nfor n in range(1, 4 + 1):\n    print(n)        # 1, 2, 3, 4'},
 brief:'Tighten every wheel nut, numbered from 1 up to <code>nuts</code>, then print how many are done.',
 teaches:['off-by-one','range()'],
 starter:`# nuts is how many wheel nuts this car has.
for n in range(1, nuts):
    print(f"Nut {n} tightened")
print(f"{nuts} nuts done")
`,
 solution:`for n in range(1, nuts + 1):
    print(f"Nut {n} tightened")
print(f"{nuts} nuts done")`,
 tests:[{setup:'nuts = 5',label:'5 nuts'},{setup:'nuts = 4',label:'4 nuts'},{setup:'nuts = 6',label:'6 nuts'}],
 hints:["Count the Nut lines in the readout. Is the last one missing?","range stops one before the end number.","Make the loop go one further: range(1, nuts + 1)."],
 diag:'range(1, nuts) stops one short, so the last nut was never tightened. Off-by-one bugs are the most common bug in all of programming.'},

/* ---------------- Bay 2 · Runs, but wrong ---------------- */
{id:'g6',no:'0506',bay:2,title:'The gauge lies',customer:'Sam Reid',car:'Mini Cooper',reg:'SR21 MNI',miles:'23,415',colour:'#e8b23a',pay:60,
 intro:"Customer says the tyre checker just went quiet on him. Test the edges.",
 manual:{title:'Edge cases',body:"Always test the exact edge. The legal limit for tread is 1.6mm, and a tyre on exactly 1.6 is legal. <code>&gt;</code> means \"more than\" and <code>&gt;=</code> means \"more than or equal to\". If you use <code>if</code> and <code>elif</code> but no <code>else</code>, some values can fall through the gaps and nothing happens at all.",example:'if tread >= 1.6:\n    print("PASS")\nelse:\n    print("FAIL")   # catches everything else'},
 brief:'Print <code>PASS</code> if the tread is 1.6mm or more, otherwise <code>FAIL</code>. Every tyre must get an answer.',
 teaches:['edge cases','>= and else'],
 starter:`# tread is measured on each car, in mm.
if tread > 1.6:
    print("PASS")
elif tread < 1.6:
    print("FAIL")
`,
 solution:`if tread >= 1.6:
    print("PASS")
else:
    print("FAIL")`,
 tests:[{setup:'tread = 3.0',label:'3.0 mm'},{setup:'tread = 1.1',label:'1.1 mm'},{setup:'tread = 1.6',label:'exactly 1.6 mm'}],
 hints:["Look at car 3. What happens when the tread is exactly 1.6?","1.6 is not more than 1.6, and not less than it either, so neither line runs.","Use >= for PASS, and swap the elif for a plain else."],
 diag:'At exactly 1.6, neither > nor < was true, so nothing printed. >= covers the edge, and else makes sure every car gets an answer.'},

{id:'g7',no:'0507',bay:2,title:'Stuck throttle',customer:'Gary Mills',car:'Subaru Impreza',reg:'GM04 WRX',miles:'97,330',colour:'#2c4f9e',pay:60,
 intro:"Throttle's stuck wide open. Run it and watch. I'll cut the engine if it runs away.",
 manual:{title:'Infinite loops',body:"A <code>while</code> loop keeps going as long as its check is true. If nothing inside the loop ever changes that check, it never stops: an <b>infinite loop</b>. Les cuts the engine after a few seconds. Make sure the line that changes the value is pushed in, <i>inside</i> the loop.",example:'while temp < 90:\n    print(temp)\n    temp = temp + 10   # inside: the loop can finish'},
 brief:'Warm the engine up 10 degrees at a time, printing <code>Warming... 55C</code> each time, until it reaches at least 90. Then print <code>Ready at 95C</code>.',
 teaches:['infinite loops','while'],
 starter:`# temp is the engine temperature when it starts.
while temp < 90:
    print(f"Warming... {temp}C")
temp = temp + 10
print(f"Ready at {temp}C")
`,
 solution:`while temp < 90:
    print(f"Warming... {temp}C")
    temp = temp + 10
print(f"Ready at {temp}C")`,
 tests:[{setup:'temp = 55',label:'starts at 55C'},{setup:'temp = 20',label:'starts at 20C'},{setup:'temp = 90',label:'already 90C'}],
 hints:["The loop never stops. What's supposed to change inside it?","temp = temp + 10 is outside the loop, so it only runs after the loop finishes. Which is never.","Push that line in 4 spaces so it's part of the loop."],
 diag:'The line that warms the engine sat outside the loop, so temp never changed and the loop ran forever.'},

{id:'g8',no:'0508',bay:2,title:'Always fails',customer:'Priya Shah',car:'Kia Picanto',reg:'PS17 KIA',miles:'33,904',colour:'#7a4fb5',pay:65,
 intro:"Every car that comes through gets told to replace its tyres. Nice for business, not so nice for the customers.",
 manual:{title:'The "or" trap',body:"<code>or</code> joins two whole checks. <code>tyre == \"worn\" or \"flat\"</code> doesn't mean what it looks like: Python reads it as <code>(tyre == \"worn\") or (\"flat\")</code>, and any text that isn't empty counts as true. So it's always true. Write the check out in full on both sides, or use <code>in</code>.",example:'if tyre == "worn" or tyre == "flat":\n    ...\nif tyre in ("worn", "flat"):   # same thing, shorter\n    ...'},
 brief:'Print <code>Replace tyre</code> only for worn or flat tyres, otherwise <code>Tyre OK</code>.',
 teaches:['or','truthiness'],
 starter:`# tyre is "good", "new", "worn" or "flat".
if tyre == "worn" or "flat":
    print("Replace tyre")
else:
    print("Tyre OK")
`,
 solution:`if tyre in ("worn", "flat"):
    print("Replace tyre")
else:
    print("Tyre OK")`,
 tests:[{setup:'tyre = "good"',label:'good'},{setup:'tyre = "worn"',label:'worn'},{setup:'tyre = "flat"',label:'flat'},{setup:'tyre = "new"',label:'new'}],
 hints:["Car 1's tyre is good but still gets replaced. So the if is always true.","Python reads it as (tyre == \"worn\") or (\"flat\"). And \"flat\" on its own always counts as true.","Write both checks in full: tyre == \"worn\" or tyre == \"flat\""],
 diag:'"flat" on its own always counts as true, so the whole check was always true. Each side of or needs its own full comparison.'},

{id:'g9',no:'0509',bay:2,title:'Lost receipt',customer:'Tom Barker',car:'BMW 3 Series',reg:'TB66 BMW',miles:'71,250',colour:'#1f2a36',pay:65,
 intro:"The labour's worked out but it vanishes before it reaches the bill. Classic.",
 manual:{title:'print vs return',body:'<code>print()</code> shows a value on the readout, then it\'s gone. <code>return</code> hands the value back to whoever called the function, so they can use it. A function with no <code>return</code> hands back <code>None</code>, which means "nothing", and you can\'t add nothing to a number.',example:'def double(x):\n    return x * 2\n\nprint(double(4) + 1)   # 9'},
 brief:'Labour is £45 an hour. Work out the labour, add the parts, and print <code>Total: £97.50</code>. Only the total line should print.',
 teaches:['return','None'],
 starter:`# hours and parts are filled in for each job.
def labour(hours):
    print(hours * 45)

cost = labour(hours) + parts
print(f"Total: £{cost:.2f}")
`,
 solution:`def labour(hours):
    return hours * 45

cost = labour(hours) + parts
print(f"Total: £{cost:.2f}")`,
 tests:[{setup:'hours = 1.5\nparts = 30.0',label:'1.5 hrs + £30'},{setup:'hours = 2\nparts = 84.5',label:'2 hrs + £84.50'},{setup:'hours = 0.5\nparts = 12.99',label:'0.5 hrs + £12.99'}],
 hints:["Read the error: something is None.","labour() prints the answer instead of handing it back, so it hands back None.","Change print to return inside the function."],
 diag:'The function printed the labour instead of returning it, so labour(hours) was None. return hands the value back so the rest of the code can use it.'},

{id:'g10',no:'0510',bay:2,title:'Short change',customer:'Ellie Ford',car:'Fiat 500',reg:'EF14 FIA',miles:'52,775',colour:'#f4b6c2',pay:65,
 intro:"Customer's paying in instalments and the numbers don't add up. Someone's been rounding down.",
 manual:{title:'/ and //',body:'<code>/</code> divides and keeps the decimals: <code>250 / 3</code> is 83.333. <code>//</code> is <b>floor division</b>: it divides and throws the remainder away, so <code>250 // 3</code> is 83. Handy for counting whole things, wrong for money.',example:'print(250 / 3)    # 83.33333333333333\nprint(250 // 3)   # 83'},
 brief:'Split the repair cost into equal monthly payments and print <code>3 payments of £83.33</code>.',
 teaches:['/ vs //','rounding'],
 starter:`# cost and months are filled in.
monthly = cost // months
print(f"{months} payments of £{monthly:.2f}")
`,
 solution:`monthly = cost / months
print(f"{months} payments of £{monthly:.2f}")`,
 tests:[{setup:'cost = 250.0\nmonths = 3',label:'£250 over 3'},{setup:'cost = 99.99\nmonths = 2',label:'£99.99 over 2'},{setup:'cost = 120.0\nmonths = 4',label:'£120 over 4'}],
 hints:["Car 3 comes out right. Cars 1 and 2 lose the pennies.","// throws away the remainder.","Use a single / for money."],
 diag:'// is floor division, which throws away the remainder. For money you want a normal / and then :.2f to show it to the penny.'},

/* ---------------- Bay 3 · Bigger jobs ---------------- */
{id:'g11',no:'0511',bay:3,title:'Parts catalogue',customer:'Parts counter',car:'Stores',reg:'STORES',miles:'—',colour:'#8a6d3b',pay:75,
 intro:"Our parts lookup only ever finds the first thing on the shelf. Have a look.",
 manual:{title:'Lists of dictionaries',body:'Real data is often a list of dictionaries: one dictionary per item, all with the same keys. Loop over the list, and look inside each one with <code>part["code"]</code>. Remember <code>return</code> leaves the function <i>straight away</i>. Only give up and <code>return None</code> after the loop has checked everything.',example:'def find(code):\n    for part in parts:\n        if part["code"] == code:\n            return part\n    return None     # after the loop, not inside it'},
 brief:'Look up the part code in <code>want</code> and print <code>Oil filter: 12 in stock</code>, or <code>XX99 not stocked</code> if there\'s no such part.',
 teaches:['lists of dicts','return in loops'],
 starter:`# parts is the stock list. want is the code to look up.
def find(code):
    for part in parts:
        if part["code"] == code:
            return part
        else:
            return None

part = find(want)
if part:
    print(f"{part['name']}: {part['stock']} in stock")
else:
    print(f"{want} not stocked")
`,
 solution:`def find(code):
    for part in parts:
        if part["code"] == code:
            return part
    return None

part = find(want)
if part:
    print(f"{part['name']}: {part['stock']} in stock")
else:
    print(f"{want} not stocked")`,
 tests:[
  {setup:'parts = [{"code": "BP12", "name": "Brake pads", "stock": 4}, {"code": "OF07", "name": "Oil filter", "stock": 12}, {"code": "WB03", "name": "Wiper blade", "stock": 9}]\nwant = "BP12"',label:'look up BP12'},
  {setup:'parts = [{"code": "BP12", "name": "Brake pads", "stock": 4}, {"code": "OF07", "name": "Oil filter", "stock": 12}, {"code": "WB03", "name": "Wiper blade", "stock": 9}]\nwant = "WB03"',label:'look up WB03'},
  {setup:'parts = [{"code": "BP12", "name": "Brake pads", "stock": 4}, {"code": "OF07", "name": "Oil filter", "stock": 12}, {"code": "WB03", "name": "Wiper blade", "stock": 9}]\nwant = "XX99"',label:'look up XX99'}],
 hints:["Car 1 works, car 2 doesn't. The part is on the shelf, so why isn't it found?","On the very first part that doesn't match, the else returns None and the function ends.","Delete the else, and put return None after the loop, lined up with for."],
 diag:'The else returned None on the first part that didn\'t match, so the loop never got past the first shelf. "Not found" can only be decided after checking everything.'},

{id:'g12',no:'0512',bay:3,title:'Four corners',customer:'Lucy Grant',car:'Audi A4',reg:'LG20 AUD',miles:'44,120',colour:'#9aa3ab',pay:75,
 intro:"Tyre report's missing a wheel. And there's a tidier way to walk two lists side by side.",
 manual:{title:'zip()',body:'When two lists line up, item for item, <code>zip()</code> walks them together and hands you a pair each time. No counting, so no off-by-one. <code>enumerate()</code> is its cousin: it hands you a counter alongside each item.',example:'names = ["FL", "FR"]\npsi = [32, 30]\nfor name, p in zip(names, psi):\n    print(name, p)'},
 brief:'Print every wheel\'s pressure, like <code>Front left: 32 psi</code>. Les wants it done with <code>zip()</code>.',
 teaches:['zip()','pairs'],
 starter:`# pressures lists the four tyres in the same order as positions.
positions = ["Front left", "Front right", "Rear left", "Rear right"]
for i in range(1, len(positions)):
    print(f"{positions[i]}: {pressures[i]} psi")
`,
 solution:`positions = ["Front left", "Front right", "Rear left", "Rear right"]
for position, psi in zip(positions, pressures):
    print(f"{position}: {psi} psi")`,
 tests:[{setup:'pressures = [32, 30, 33, 31]',label:'32 30 33 31'},{setup:'pressures = [35, 35, 29, 30]',label:'35 35 29 30'}],
 require:[['call:zip','It works, but Les asked for zip(). Walk positions and pressures together with for position, psi in zip(positions, pressures):']],
 hints:["The front left tyre is missing. Lists start counting at 0, not 1.","Instead of counting at all, zip the two lists together.","for position, psi in zip(positions, pressures):"],
 diag:'Lists start at index 0, so range(1, ...) skipped the front left tyre. zip() pairs the lists up without any counting, so there\'s nothing to get off by one.'},

{id:'g13',no:'0513',bay:3,title:'The queue',customer:'Workshop board',car:'Today\'s jobs',reg:'QUEUE',miles:'—',colour:'#5b7a99',pay:80,
 intro:"Morning queue needs sorting, most urgent first. Whoever wrote this got one tiny thing wrong.",
 manual:{title:'sorted() and key',body:'<code>my_list.sort()</code> sorts the list where it is and hands back <code>None</code>. <code>sorted(my_list)</code> hands back a brand-new sorted list. To sort by one part of each item, give it a <code>key</code>: a small function that picks what to sort by. <code>lambda job: job[1]</code> means "sort by the second thing in each job".',example:'jobs = [("MOT", 2), ("Brakes", 1)]\nqueue = sorted(jobs, key=lambda job: job[1])\nprint(queue)   # [(\'Brakes\', 1), (\'MOT\', 2)]'},
 brief:'Print the jobs in order of priority, 1 first, like <code>1. Brakes</code>.',
 teaches:['sorted()','key=lambda'],
 starter:`# jobs is a list of (name, priority) pairs. Priority 1 is most urgent.
queue = jobs.sort(key=lambda job: job[1])
for name, priority in queue:
    print(f"{priority}. {name}")
`,
 solution:`queue = sorted(jobs, key=lambda job: job[1])
for name, priority in queue:
    print(f"{priority}. {name}")`,
 tests:[{setup:'jobs = [("MOT", 2), ("Oil change", 3), ("Brakes", 1)]',label:'3 jobs'},{setup:'jobs = [("Tyres", 4), ("Clutch", 1), ("Wipers", 5), ("Battery", 2), ("Exhaust", 3)]',label:'5 jobs'}],
 hints:["The error says something is None. Which variable?",".sort() sorts the list in place and hands back None, so queue is None.","Use queue = sorted(jobs, key=lambda job: job[1])"],
 diag:'.sort() sorts the list where it sits and returns None, so queue ended up as nothing. sorted() hands back a new list you can keep.'},

{id:'g14',no:'0514',bay:3,title:'Quick checks',customer:'Fleet manager',car:'Delivery fleet',reg:'FLEET',miles:'—',colour:'#4f7d5c',pay:80,
 intro:"The fleet report's flagging all the wrong tyres. It's a one-liner, so the bug's hiding in plain sight.",
 manual:{title:'List comprehensions',body:'A list comprehension builds a new list in one line. Read it as: "give me <code>depth</code>, for every <code>depth</code> in <code>tread</code>, if the check is true". It does the same job as a loop with <code>.append()</code>, just tidier.',example:'tread = [3.1, 1.2, 2.8]\nworn = [d for d in tread if d < 1.6]\nprint(worn)   # [1.2]'},
 brief:'Find the tyres below the 1.6mm limit and print <code>2 worn: [1.2, 1.5]</code>. Keep it as a list comprehension.',
 teaches:['list comprehensions'],
 starter:`# tread is a list of tread depths across the fleet, in mm.
worn = [depth for depth in tread if depth > 1.6]
print(f"{len(worn)} worn: {worn}")
`,
 solution:`worn = [depth for depth in tread if depth < 1.6]
print(f"{len(worn)} worn: {worn}")`,
 tests:[{setup:'tread = [3.1, 1.2, 2.8, 1.5]',label:'4 tyres'},{setup:'tread = [2.0, 2.2, 1.9]',label:'3 tyres'},{setup:'tread = [0.9, 1.0, 4.5, 1.59, 3.3]',label:'5 tyres'}],
 require:[['ListComp','Right answer, but Les wanted it kept as a list comprehension: [depth for depth in tread if ...]']],
 hints:["The readout lists the good tyres, not the worn ones.","Read the comprehension out loud: depth for every depth in tread, if depth is more than 1.6.","Worn means less than 1.6. Flip the >."],
 diag:'The check was the wrong way round, so it collected the good tyres. Read a comprehension out loud and the bug usually jumps out.'},

{id:'g15',no:'0515',bay:3,title:'Repeat faults',customer:'Kevin Ash',car:'Vauxhall Corsa',reg:'KA11 CRS',miles:'109,880',colour:'#c4502e',pay:85,
 intro:"Diagnostic computer's logged the same faults over and over. Customer wants each fault once, in order.",
 manual:{title:'Sets',body:'A <code>set</code> keeps one of each thing and drops repeats. Sets have no order, so wrap it in <code>sorted()</code> when you want a tidy list. <code>len()</code> works on sets too.',example:'codes = ["P0300", "P0171", "P0300"]\nprint(sorted(set(codes)))   # [\'P0171\', \'P0300\']'},
 brief:'Print how many faults were logged and how many were different, then each different code once, in alphabetical order.',
 teaches:['set()','sorted()'],
 starter:`# codes is every fault the car's computer logged.
unique = codes
print(f"{len(codes)} faults logged, {len(unique)} different")
for code in unique:
    print(code)
`,
 solution:`unique = sorted(set(codes))
print(f"{len(codes)} faults logged, {len(unique)} different")
for code in unique:
    print(code)`,
 tests:[{setup:'codes = ["P0300", "P0420", "P0300", "P0171", "P0420"]',label:'5 logged'},{setup:'codes = ["P0128", "P0128", "P0128"]',label:'3 logged'},{setup:'codes = ["P0700", "P0171", "P0505", "P0171"]',label:'4 logged'}],
 hints:["unique is just another name for the same list, repeats and all.","set(codes) drops the repeats.","unique = sorted(set(codes)) drops repeats and puts them in order."],
 diag:'unique = codes only gave the same list a second name, repeats and all. A set keeps one of each, and sorted() puts them in order.'},

/* ---------------- Bay 4 · Built properly ---------------- */
{id:'g16',no:'0516',bay:4,title:'The car class',customer:'Office',car:'Garage system',reg:'CLASS',miles:'—',colour:'#6b4f86',pay:90,
 intro:"Upstairs want the cars stored properly, as objects. First attempt won't run.",
 manual:{title:'Classes',body:'A <code>class</code> is a blueprint. <code>Car(reg, mileage)</code> builds one car from it. <code>__init__</code> runs when a car is built and stores its details on <code>self</code>, which means "this car". Every function inside a class (a <b>method</b>) takes <code>self</code> first, so it knows which car it\'s working on.',example:'class Car:\n    def __init__(self, reg):\n        self.reg = reg\n\n    def honk(self):\n        print(f"{self.reg} goes beep")\n\nCar("AB12 CDE").honk()'},
 brief:'Build a Car from the reg and mileage, and have it print <code>KR12 ABC has done 120500 miles</code>.',
 teaches:['classes','self'],
 starter:`# reg and mileage are filled in.
class Car:
    def __init__(self, reg, mileage):
        self.reg = reg
        self.mileage = mileage

    def describe():
        print(f"{self.reg} has done {self.mileage} miles")

car = Car(reg, mileage)
car.describe()
`,
 solution:`class Car:
    def __init__(self, reg, mileage):
        self.reg = reg
        self.mileage = mileage

    def describe(self):
        print(f"{self.reg} has done {self.mileage} miles")

car = Car(reg, mileage)
car.describe()`,
 tests:[{setup:'reg = "KR12 ABC"\nmileage = 120500',label:'KR12 ABC'},{setup:'reg = "PL70 QRS"\nmileage = 8040',label:'PL70 QRS'}],
 require:[['ClassDef','Keep the Car class. Les wants the cars stored as objects.']],
 hints:["Read the error: it says describe() takes 0 arguments but 1 was given.","Python always passes the car itself in as the first argument.","def describe(self):"],
 diag:'Every method needs self as its first argument. Python passes the object in automatically, so describe() was given one more thing than it expected.'},

{id:'g17',no:'0517',bay:4,title:'Clocking in',customer:'Office',car:'Garage system',reg:'CLASS',miles:'—',colour:'#6b4f86',pay:95,
 intro:"The car's meant to log every test drive, but the mileage never goes up. Funny how that works.",
 manual:{title:'Changing an object',body:'Inside a method, <code>self.mileage</code> is the car\'s own mileage. A plain <code>mileage</code> with no <code>self.</code> is a throwaway variable that vanishes when the method ends. <code>__str__</code> is a special method: it decides what <code>print(car)</code> shows.',example:'def drive(self, miles):\n    self.mileage += miles   # changes the car itself\n\ndef __str__(self):\n    return f"{self.reg} ({self.mileage} miles)"'},
 brief:'Log each test drive in <code>trips</code> on the car, then print it, like <code>KR12 ABC (120534 miles)</code>.',
 teaches:['methods','self.attributes','__str__'],
 starter:`# reg, mileage and trips are filled in.
class Car:
    def __init__(self, reg, mileage):
        self.reg = reg
        self.mileage = mileage

    def drive(self, miles):
        mileage = self.mileage + miles

    def __str__(self):
        return f"{self.reg} ({self.mileage} miles)"

car = Car(reg, mileage)
for trip in trips:
    car.drive(trip)
print(car)
`,
 solution:`class Car:
    def __init__(self, reg, mileage):
        self.reg = reg
        self.mileage = mileage

    def drive(self, miles):
        self.mileage = self.mileage + miles

    def __str__(self):
        return f"{self.reg} ({self.mileage} miles)"

car = Car(reg, mileage)
for trip in trips:
    car.drive(trip)
print(car)`,
 tests:[{setup:'reg = "KR12 ABC"\nmileage = 120500\ntrips = [12, 9, 13]',label:'3 trips'},{setup:'reg = "PL70 QRS"\nmileage = 8040\ntrips = [5]',label:'1 trip'},{setup:'reg = "YD60 LMN"\nmileage = 45000\ntrips = []',label:'no trips'}],
 require:[['ClassDef','Keep the Car class. Fix the method rather than taking it out.']],
 hints:["The mileage printed is the same as the starting mileage. drive() isn't changing the car.","Inside drive, mileage = ... makes a brand-new variable that's thrown away.","Store it on the car: self.mileage = self.mileage + miles"],
 diag:'mileage = ... inside the method made a temporary variable that vanished. self.mileage is the car\'s own value, so that\'s the one to change.'},

{id:'g18',no:'0518',bay:4,title:'Service history',customer:'Margaret Cole',car:'Honda Jazz',reg:'MC09 JAZ',miles:'86,402',colour:'#3f8f8a',pay:100,
 intro:"Mrs Cole's service book has been wiped. Again. Every time we add an entry, the old ones vanish.",
 manual:{title:'Files',body:'<code>open(name, mode)</code> opens a file. Mode <code>"r"</code> reads it, <code>"w"</code> <b>wipes it</b> and writes from scratch, and <code>"a"</code> <b>appends</b>, adding to the end. Using <code>with</code> closes the file for you when you\'re done.',example:'with open("log.txt", "a") as f:\n    f.write("New line\\n")\n\nwith open("log.txt") as f:\n    for line in f:\n        print(line.strip())'},
 brief:'Add <code>new_entry</code> to the end of <code>history.txt</code>, then print the whole history, oldest first.',
 teaches:['open()','file modes','with'],
 starter:`# history.txt already has this car's past services in it.
# new_entry is today's job.
with open("history.txt", "w") as f:
    f.write(new_entry + "\\n")

with open("history.txt") as f:
    for line in f:
        print(line.strip())
`,
 solution:`with open("history.txt", "a") as f:
    f.write(new_entry + "\\n")

with open("history.txt") as f:
    for line in f:
        print(line.strip())`,
 tests:[{setup:'with open("history.txt", "w") as f:\n    f.write("2024: Oil change\\n2025: Brakes\\n")\nnew_entry = "2026: MOT"',label:'2 past services'},
  {setup:'with open("history.txt", "w") as f:\n    f.write("2021: First service\\n2022: Tyres\\n2023: Cambelt\\n")\nnew_entry = "2026: Clutch"',label:'3 past services'}],
 hints:["Only today's job is in the readout. Where did the old ones go?","Mode \"w\" wipes the file before writing.","Open it with \"a\" to add to the end instead."],
 diag:'"w" wipes the file before writing. "a" appends to the end, so the history is kept.'},

{id:'g19',no:'0519',bay:4,title:'Shared toolbox',customer:'Office',car:'Garage system',reg:'JOBS',miles:'—',colour:'#a0522d',pay:110,
 intro:"Strangest bug I've seen all year. Jobs booked for one car keep turning up on the next car's list.",
 manual:{title:'The default value trap',body:'A default value in a function, like <code>jobs=[]</code>, is made <b>once</b>, when the function is created. Not each time it\'s called. So every call shares the same list, and it keeps growing. The safe way is to default to <code>None</code> and make a fresh list inside.',example:'def add_job(job, jobs=None):\n    if jobs is None:\n        jobs = []\n    jobs.append(job)\n    return jobs'},
 brief:'Book one job for each of two cars, and print each car\'s own list, like <code>Car 1 jobs: [\'Oil change\']</code>.',
 teaches:['default arguments','None'],
 starter:`# job1 is for the first car, job2 is for the second.
def add_job(job, jobs=[]):
    jobs.append(job)
    return jobs

first = add_job(job1)
second = add_job(job2)
print(f"Car 1 jobs: {first}")
print(f"Car 2 jobs: {second}")
`,
 solution:`def add_job(job, jobs=None):
    if jobs is None:
        jobs = []
    jobs.append(job)
    return jobs

first = add_job(job1)
second = add_job(job2)
print(f"Car 1 jobs: {first}")
print(f"Car 2 jobs: {second}")`,
 tests:[{setup:'job1 = "Oil change"\njob2 = "Brakes"',label:'oil · brakes'},{setup:'job1 = "MOT"\njob2 = "Tyres"',label:'MOT · tyres'}],
 hints:["Both cars end up with both jobs. They're sharing one list.","jobs=[] is only made once, when Python reads the def line.","Default to None, then make a fresh list inside: if jobs is None: jobs = []"],
 diag:'jobs=[] is created once and shared by every call, so both cars wrote into the same list. Defaulting to None and making a new list inside fixes it.'},

{id:'g20',no:'0520',bay:4,title:'MOT day',customer:'MOT centre',car:'The whole day\'s list',reg:'MOT',miles:'—',colour:'#2f3a46',pay:150,boss:true,
 intro:"Big one. The MOT program has three faults in it, and they don't all shout. Find every one.",
 manual:{title:'Hunting several bugs',body:'Real programs can have more than one fault. Fix the one that crashes first, then run it again and compare the readout with the job sheet line by line. Read each <code>if</code> out loud. Check capitals in text: <code>"PASS"</code> and <code>"Pass"</code> are different.',example:'if result == "PASS":   # exact match, capitals and all\n    passed += 1'},
 brief:'Inspect every car. List each reg in order with <code>PASS</code> or <code>FAIL</code> and its faults in brackets, then print how many passed.',
 teaches:['debugging','everything together'],
 starter:`# cars is today's list. Each car is a dictionary.
class Inspection:
    def __init__(self, car):
        self.car = car
        self.faults = []

    def run(self):
        if self.car["tread"] < 1.6:
            self.faults.append("tyres")
        if self.car["lights"] = False:
            self.faults.append("lights")
        if self.car["brakes"] < 50:
            self.faults.append("brakes")

    def result(self):
        if self.faults:
            return "PASS"
        return "FAIL"

reports = []
for car in cars:
    check = Inspection(car)
    check.run()
    reports.append((car["reg"], check.result(), check.faults))

for reg, result, faults in sorted(reports):
    line = f"{reg}: {result}"
    if faults:
        line += " (" + ", ".join(faults) + ")"
    print(line)

passed = len([r for r in reports if r[1] == "Pass"])
print(f"{passed} of {len(cars)} passed")
`,
 solution:`class Inspection:
    def __init__(self, car):
        self.car = car
        self.faults = []

    def run(self):
        if self.car["tread"] < 1.6:
            self.faults.append("tyres")
        if self.car["lights"] == False:
            self.faults.append("lights")
        if self.car["brakes"] < 50:
            self.faults.append("brakes")

    def result(self):
        if self.faults:
            return "FAIL"
        return "PASS"

reports = []
for car in cars:
    check = Inspection(car)
    check.run()
    reports.append((car["reg"], check.result(), check.faults))

for reg, result, faults in sorted(reports):
    line = f"{reg}: {result}"
    if faults:
        line += " (" + ", ".join(faults) + ")"
    print(line)

passed = len([r for r in reports if r[1] == "PASS"])
print(f"{passed} of {len(cars)} passed")`,
 tests:[
  {setup:'cars = [{"reg": "YR68 TDW", "tread": 3.1, "lights": True, "brakes": 72}, {"reg": "AB12 CDE", "tread": 1.2, "lights": True, "brakes": 64}, {"reg": "LK19 FXT", "tread": 2.4, "lights": False, "brakes": 41}]',label:'3 cars'},
  {setup:'cars = [{"reg": "ZZ01 TOP", "tread": 4.0, "lights": True, "brakes": 90}, {"reg": "MC09 JAZ", "tread": 1.7, "lights": True, "brakes": 55}]',label:'2 cars'}],
 require:[['ClassDef','Keep the Inspection class. The fix is inside it, not around it.']],
 hints:["Start with the crash. = puts a value in a box, == compares.","Once it runs, check result(). Should a car with faults pass?","Last one: the passed count is always 0. Compare the capitals in \"Pass\" with what result() returns."],
 diag:'Three faults: = instead of == in the lights check, PASS and FAIL swapped in result(), and "Pass" instead of "PASS" in the count. The first crashed. The other two only showed up in the readout.'}
];
root.GC_JOBS = JOBS;
if (typeof module !== 'undefined') module.exports = JOBS;
})(typeof window !== 'undefined' ? window : globalThis);
