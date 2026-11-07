window.BCA_UNIT_EXAMPLE_VISUALS = {
  architecture: [
    [
      {caption:"Place-value working for 101101.01₂",headers:["Place","32","16","8","4","2","1","1/2","1/4"],rows:[["Bit","1","0","1","1","0","1","0","1"],["Add","32","0","8","4","0","1","0","0.25"]]},
      {caption:"K-map cells where C=1",headers:["C \\ AB","00","01","11","10"],rows:[["0","0","0","0","0"],["1","1","1","1","1"]]}
    ],
    [
      {caption:"Full-adder truth table",headers:["A","B","Cin","Sum","Cout"],rows:[["0","0","0","0","0"],["0","0","1","1","0"],["0","1","0","1","0"],["0","1","1","0","1"],["1","0","0","1","0"],["1","0","1","0","1"],["1","1","0","0","1"],["1","1","1","1","1"]]},
      {caption:"4-to-1 MUX selection",headers:["S1S0","Selected line","Y"],rows:[["00","I0","I0"],["01","I1","I1"],["10","I2","I2"],["11","I3","I3"]]}
    ],
    [
      {caption:"Instruction trace: ADD R1,R2",headers:["Stage","What happens","Key part"],rows:[["Fetch","Read instruction at PC","PC → IR"],["Decode","Identify ADD and registers","Control unit"],["Execute","Add R1 and R2","ALU"],["Write back","Store result in R1","Register file"]]},
      {caption:"Operand path by addressing mode",headers:["Mode","Instruction contains","CPU does"],rows:[["Immediate","The value","Use it directly"],["Direct","Memory address","Read that location"],["Indirect","Pointer/address","Follow it, then read"],["Register","Register name","Read that register"]]}
    ],
    [
      {caption:"Pipeline overlap: first three of eight instructions",headers:["Cycle","1","2","3","4","5","6","7"],rows:[["I1","F","D","E","M","W","",""],["I2","","F","D","E","M","W",""],["I3","","","F","D","E","M","W"]],note:"With five stages, the full stream of eight instructions completes at cycle 5+8−1=12."},
      {caption:"Average access time (simplified model)",headers:["Case","Probability","Time","Weighted time"],rows:[["Cache hit","0.95","1 ns","0.95 ns"],["Cache miss","0.05","50 ns","2.50 ns"],["Total","1.00","—","3.45 ns"]]}
    ]
  ],
  evs: [
    [
      {caption:"Groundwater sustainability check",headers:["Question","What to measure","Possible response"],rows:[["Is pumping sustainable?","Recharge vs. withdrawal","Limit use / recharge"],["Who benefits now?","Household and farm access","Fair allocation"],["Who carries the cost?","Dry wells / price / quality","Protect vulnerable users"],["What remains later?","Water-table trend","Monitor and adapt"]]},
      {caption:"Balanced dam impact map",headers:["Benefit","Possible impact","Planning response"],rows:[["Water storage","Submerged land","Compare locations"],["Electricity","Changed river flow","Set ecological flows"],["Flood control","Fish and sediment changes","Monitor river health"],["Jobs","Displacement","Consult and rehabilitate"]]}
    ],
    [
      {caption:"Simplified energy transfer example",headers:["Trophic level","Approx. energy units"],rows:[["Producers","10,000"],["Primary consumers","1,000"],["Secondary consumers","100"]]},
      {caption:"Two conservation approaches",headers:["Method","Where","Example","Strength"],rows:[["In situ","Natural habitat","Protected area","Keeps ecological links"],["Ex situ","Outside habitat","Seed bank","Stores material for recovery"]]}
    ],
    [
      {caption:"Turn a business goal into a measurable plan",headers:["Area","Baseline","Action","Measure"],rows:[["Energy","Monthly kWh","Efficient equipment","kWh per product"],["Water","Litres per batch","Repair leaks / reuse","Litres per batch"],["Packaging","Units discarded","Reusable or less material","Waste per month"]]},
      {caption:"Course environmental laws: broad scope",headers:["Act","Broad topic","Example focus"],rows:[["Water Act (1974)","Water pollution","Effluent control"],["Air Act (1981)","Air pollution","Emission control"],["Environment Protection Act (1986)","Broader environment","Framework powers"]]}
    ],
    [
      {caption:"Farm runoff pathway",headers:["Step","What happens","Possible control"],rows:[["Source","Fertilizer on field","Use the required amount"],["Transport","Rain carries nutrients","Vegetated buffer"],["Exposure","Pond receives runoff","Retention / wetland"],["Effect","Algal growth, lower oxygen","Monitor and prevent"]]},
      {caption:"Waste hierarchy",headers:["Order","Action","Cup example"],rows:[["1","Prevent","Use a refillable cup"],["2","Reduce","Avoid extra packaging"],["3","Reuse","Wash a durable cup"],["4","Recycle / recover","Sort suitable material"],["5","Dispose safely","Only what remains"]]}
    ]
  ],
  english: [
    [
      {caption:"Word-family breakdown: unhelpfully",headers:["Part","Role","Meaning"],rows:[["help","base","give assistance"],["-ful","suffix","full of / having"],["un-","prefix","not / opposite"],["-ly","suffix","in this manner"]]},
      {caption:"Choose a synonym by tone",headers:["Choice","Tone","Works in the sentence?"],rows:[["large","neutral","The report shows a large increase."],["substantial","formal","The report shows a substantial increase."],["huge","strong / informal","May sound exaggerated in a report"]]}
    ],
    [
      {caption:"Repair a fragment",headers:["Part","Original","Revision"],rows:[["Dependent clause","Although the experiment was repeated.","Although the experiment was repeated, the result stayed the same."],["Independent clause","—","The result stayed the same."]]},
      {caption:"Paragraph structure",headers:["Part","Job","Study-plan example"],rows:[["Topic","Main point","A study plan makes revision manageable."],["Support","Reason / evidence","It divides work into short sessions."],["Example","Concrete case","A student revises one unit each day."],["Close","Link / takeaway","Regular practice reduces last-minute pressure."]]}
    ],
    [
      {caption:"Edit agreement, pronoun and homophone",headers:["Issue","Before","After"],rows:[["Agreement","Each player have","Each player has"],["Pronoun number","there bag","their bag"],["Full sentence","Each of the players has left their bag near the door.","Keep the singular subject; use clear, accepted pronoun usage."]] ,note:"Style guides differ on singular they; follow your course convention."},
      {caption:"Fix the dangling modifier",headers:["Version","What it suggests"],rows:[["Walking to the library, the rain soaked Sam.","The rain was walking."],["Walking to the library, Sam was soaked by the rain.","Sam was walking; the modifier is attached clearly."]]}
    ],
    [
      {caption:"Definition frame",headers:["Piece","Reliable study source"],rows:[["Class","A learning resource"],["Distinctive feature","Supported by traceable, relevant evidence"],["Example","A current course text or official guide"],["Boundary","A confident claim without evidence is not reliable"]]},
      {caption:"Classification by practice method",headers:["Basis","Category","Example"],rows:[["How you practise","Recall","Explain without notes"],["How you practise","Application","Solve a new problem"],["How you practise","Feedback","Review a corrected answer"]]}
    ],
    [
      {caption:"Keep the central meaning in a précis",headers:["Source idea","Keep?","Why"],rows:[["Parks support exercise","Yes","Main benefit"],["Trees cool neighborhoods","Yes","Main benefit"],["Shared community space","Yes","Main benefit"],["City should maintain parks","Yes","Central recommendation"],["Repeated examples","Usually shorten","Secondary detail"]]},
      {caption:"Timed essay plan",headers:["Time share","Task","Output"],rows:[["10%","Unpack prompt and outline","Thesis + 3 points"],["75%","Draft paragraphs","Point + reason + example"],["15%","Review","Complete answer, clarity, errors"]]}
    ],
    [
      {caption:"Stress changes the contrast",headers:["Emphasis","Meaning highlighted"],rows:[["I wanted the BLUE notebook.","Color contrast: blue, not red."],["I WANTED the blue notebook.","The speaker, not someone else, wanted it."],["I wanted the blue NOTEBOOK.","The object, not another item, is highlighted."]] ,note:"Stress and intonation vary by context and speaker."},
      {caption:"Two-minute presentation outline",headers:["Time","Part","Speaker move"],rows:[["0:00–0:15","Opening","Name habit and benefit"],["0:15–0:35","Step 1","Show a weekly plan"],["0:35–1:30","Example","Walk through one study session"],["1:30–2:00","Close","Summarize and invite questions"]]}
    ]
  ],
  iks: [
    [
      {caption:"The six Vedangas",headers:["Name","Study focus"],rows:[["Shiksha","Sound / pronunciation"],["Kalpa","Procedures"],["Vyakarana","Grammar"],["Nirukta","Word explanation"],["Chandas","Metre"],["Jyotisha","Calendrical timing"]]},
      {caption:"Compare schools by their questions",headers:["Grouping in course","Examples","Compare through"],rows:[["Vedic","Nyaya, Samkhya, Yoga","Knowledge / reality / liberation"],["Non-Vedic","Charvaka, Buddhist, Jain","Evidence / self / action"]],note:"Use the exact grouping and wording taught in your syllabus."}
    ],
    [
      {caption:"Why zero matters in 205",headers:["Digit","Place","Contribution"],rows:[["2","Hundreds","200"],["0","Tens","0; holds the place"],["5","Ones","5"]]},
      {caption:"Explain a code decoding",headers:["Step","What to show","Check"],rows:[["1","State the class mapping","Use the supplied table"],["2","Map each symbol to a value","No symbol skipped"],["3","Apply reading order","State reversal convention"],["4","Write decoded value","Check place/order"]]}
    ],
    [
      {caption:"Five Panchanga limbs",headers:["Limb","Course-level meaning"],rows:[["Tithi","Lunar day"],["Vara","Weekday"],["Nakshatra","Lunar mansion"],["Yoga","Calculated angular relation"],["Karana","Half a tithi"]]},
      {caption:"A geometry answer structure",headers:["Step","Include"],rows:[["Context","Construction task named in source"],["Diagram","Label lengths and shape"],["Rule","State the geometric relationship"],["Interpretation","Explain what it enabled"],["Care","Avoid claims beyond evidence"]]}
    ],
    [
      {caption:"Metalworking process chain",headers:["Stage","Decision / action","Evidence to mention"],rows:[["Prepare","Select ore / material","Ore, furnace"],["Transform","Heat, smelt or refine","Fuel, slag"],["Shape","Forge / cast / join","Tools, object"],["Finish","Cool, polish or treat","Properties, use"]]},
      {caption:"Temple plan: common relationships",headers:["Element","Possible role"],rows:[["Sanctum","Central sacred space"],["Tower / superstructure","Marks or covers the sacred core"],["Hall","Gathering / movement"],["Gateway","Transition into the complex"],["Site","Connects building and setting"]],note:"Forms vary across regional traditions."}
    ],
    [
      {caption:"Use Triguna terms carefully",headers:["Quality","Associated description","Illustrative cue"],rows:[["Sattva","Clarity / balance","Calm, clear attention"],["Rajas","Activity / desire","Restless, driven action"],["Tamas","Inertia / obscurity","Dullness or inaction"]],note:"This is a traditional conceptual framework, not a clinical diagnosis."},
      {caption:"Compare historical and modern governance",headers:["Question","Arthashastra context","Modern comparison"],rows:[["Revenue","State resources and administration","Public finance"],["Officials","Roles and accountability","Public service"],["Law / order","Historical political setting","Constitutional limits differ"],["Diplomacy","Relations among states","Institutions differ by era"]]}
    ]
  ],
  math: [
    [
      {caption:"Test a relation modulo 3",headers:["a","b","a−b","Divisible by 3?"],rows:[["1","4","−3","Yes"],["2","5","−3","Yes"],["1","5","−4","No"]]},
      {caption:"Warshall update through vertex 2",headers:["Pair","Path via 2?","Update"],rows:[["1→2","1→2 exists","M[1,2]=1"],["2→3","2→3 exists","M[2,3]=1"],["1→3","Both legs exist","Set M[1,3]=1"]]}
    ],
    [
      {caption:"Order matters or not?",headers:["Task","Order matters?","Count"],rows:[["President and vice-president","Yes","8P2=8×7=56"],["Two-person committee","No","8C2=8×7/2=28"]]},
      {caption:"Recurrence solution check",headers:["n","2^(n+1)−1","Required initial value"],rows:[["0","1","1"],["1","3","3"],["2","7","3(3)−2(1)=7"]]}
    ],
    [
      {type:"diagram",diagram:{type:"network",title:"Euler-trail graph: two odd-degree vertices",caption:"Edges: AB, BC, CD, DA and AC. Degrees are A=3, B=2, C=3, D=2, so A and C are the two possible endpoints of an open Euler trail.",nodes:["A","B","C","D"],edges:[[0,1],[1,2],[2,3],[3,0],[0,2]]}},
      {caption:"Planar-face calculation",headers:["Quantity","Value"],rows:[["V","6"],["E","9"],["Euler formula","V−E+F=2"],["F","2−6+9=5"]]}
    ],
    [
      {caption:"Eigenpairs of [[2,1],[1,2]]",headers:["λ","System (A−λI)v=0","One eigenvector"],rows:[["3","−x+y=0","(1,1)"],["1","x+y=0","(1,−1)"]]},
      {caption:"Cramer's rule determinants",headers:["Determinant","Matrix","Value"],rows:[["D","[[1,1],[2,−1]]","−3"],["Dx","[[5,1],[1,−1]]","−6"],["Dy","[[1,5],[2,1]]","−9"],["Solution","x=Dx/D; y=Dy/D","x=2, y=3"]]}
    ]
  ],
  'problem-solving': [
    [
      {caption:"Trace largest-of-three logic",headers:["Step","a","b","c","largest"],rows:[["Start","7","4","9","—"],["Compare a,b","7","4","9","7"],["Compare c","7","4","9","9"],["Output","7","4","9","9"]]},
      {caption:"Choose tests from the specification",headers:["Case","Input","Expected","Why"],rows:[["All equal","4,4,4","4","Tie"],["Max first","9,2,1","9","First branch"],["Max middle","2,9,1","9","Middle branch"],["Max last","1,2,9","9","Last branch"]]}
    ],
    [
      {caption:"Trace odd-number loop",headers:["Pass","i before","Print","i after"],rows:[["1","1","1","3"],["2","3","3","5"],["3","5","5","7"],["4","7","7","9"],["Stop","9","—","9>8"]]},
      {caption:"Sentinel sum: 4, 7, −1",headers:["Input","Is sentinel?","Count","Sum"],rows:[["4","No","1","4"],["7","No","2","11"],["−1","Yes","2","11"]]}
    ],
    [
      {caption:"Armstrong check for 153",headers:["Digit","Cube","Running sum"],rows:[["1","1","1"],["5","125","126"],["3","27","153"]],note:"153 digits; sum of cubes = original value."},
      {caption:"Prime test for 29",headers:["Candidate divisor","29 mod divisor","Decision"],rows:[["2","1","Continue"],["3","2","Continue"],["4","1","Continue"],["5","4","Continue"],["6","—","Stop: 6²>29"]],note:"No divisor through √29; 29 is prime."}
    ],
    [
      {caption:"Recursive factorial call trace",headers:["Call","Base or rule","Returns"],rows:[["factorial(4)","4×factorial(3)","24"],["factorial(3)","3×factorial(2)","6"],["factorial(2)","2×factorial(1)","2"],["factorial(1)","1×factorial(0)","1"],["factorial(0)","Base: 1","1"]]},
      {caption:"Binary-search trace for target 20",headers:["low","mid","high","middle value","Next range"],rows:[["0","3","6","12","4–6"],["4","5","6","20","Found at 5"]]}
    ]
  ]
};
