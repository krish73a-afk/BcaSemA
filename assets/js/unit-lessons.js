window.BCA_UNIT_LESSONS = {
  architecture: [
    {
      lead: "A computer turns information into patterns of 0s and 1s. This unit teaches how those patterns represent numbers and characters, how logic rules describe decisions, and how a K-map can simplify a circuit before it is built.",
      analogy: "Imagine a wall of tiny light switches. Each switch is either off (0) or on (1). A row of switches can store a number, a letter, or instructions.",
      goals: ["Convert binary, octal and hexadecimal numbers using place values or bit groups.", "Use Boolean ideas and Karnaugh maps to simplify a logic function.", "Explain basic coding, parity and the stored-program computer."],
      lessons: [
        ["Numbers are built from place values", "In base 10, the places are powers of 10. Binary uses powers of 2: the rightmost bit is 1, then 2, 4, 8, and so on. A 1 means include this place; a 0 means leave it out. To change binary to decimal, add the included place values. To convert binary to octal, group bits in threes; for hexadecimal, group in fours, padding with zeroes if needed."],
        ["Logic rules describe switch decisions", "Boolean variables have two values, 0 and 1. AND is 1 only when both inputs are 1; OR is 1 when at least one input is 1; NOT flips a value. A truth table lists every input and output. A Karnaugh map arranges outputs so neighboring cells differ in one variable. Groups of 1s (sum of products) or 0s (product of sums) remove variables that change."],
        ["Codes and computer organization give bits meaning", "Gray code changes one bit between neighboring values. ASCII and EBCDIC assign bit patterns to characters. A parity bit can detect an odd number of flipped bits, but it cannot identify or correct the wrong bit. In the Von Neumann model, instructions and data share memory and the processor fetches instructions from it."]
      ],
      example: ["Convert 101101.01₂ to decimal.", "Read each digit with its binary place: 32 + 8 + 4 + 1 = 45.", "After the binary point, the places are 1/2 and 1/4. The digits add 0 + 1/4, so the fraction is 0.25.", "The answer is 45.25₁₀. For hexadecimal, group as 0010 1101 . 0100, which gives 2D.4₁₆."],
      pitfalls: ["Do not read binary places as powers of 10.", "K-map edge cells can be adjacent; diagonal cells are not.", "Parity can detect some errors, but it is not a correction method."],
      quiz: [
        {q:"What is 1101₂ in decimal?",o:["11","13","15","21"],c:1,e:"The place values are 8 + 4 + 0 + 1 = 13."},
        {q:"For hexadecimal conversion, binary digits are grouped in…",o:["Pairs","Groups of three","Groups of four","Groups of ten"],c:2,e:"One hexadecimal digit represents four binary bits."}
      ]
    },
    {
      lead: "This unit moves from logic that only reacts to current inputs to circuits that can remember. That difference explains how computers add numbers, choose data, store bits and keep track of steps.",
      analogy: "A combinational circuit is like a calculator that answers from the buttons pressed now. A sequential circuit is like a notebook: its answer can depend on what was written earlier.",
      goals: ["Distinguish combinational logic from sequential logic.", "Explain adders, multiplexers and decoders by their inputs and outputs.", "Describe flip-flops, registers and counters as memory-building blocks."],
      lessons: [
        ["Combinational circuits answer now", "A combinational circuit has no stored state. Its output depends only on current inputs. Adders calculate sums, multiplexers select one of several inputs, and decoders turn a coded input into one active output. To explain a circuit, name inputs and outputs, then show its truth table or Boolean rule."],
        ["Adders carry information between bit positions", "A half adder combines two bits: XOR gives the sum bit, while AND gives the carry. It cannot accept a carry from an earlier column. A full adder accepts A, B and carry-in, and produces sum and carry-out. Chaining full adders passes each carry to the next position, like written addition."],
        ["Sequential circuits store a state", "A flip-flop stores one bit. Its clock and input determine when that bit changes. D flip-flops copy D at the active clock event; JK and T forms provide other state changes, while SR has set/reset controls. A register combines bit-storage cells. Shift registers move bits; counters follow states. Synchronous counters share a clock, while ripple counters trigger later stages from earlier ones."]
      ],
      example: ["Add 1 and 1 with a half adder.", "A=1 and B=1. XOR is 0, so Sum=0.", "AND is 1, so Carry=1.", "The result is 10₂: zero in this column and one carried to the next."],
      pitfalls: ["A half adder has no carry-in; a full adder does.", "A multiplexer chooses among inputs; a decoder activates an output line.", "A flip-flop stores one bit; a register is a group of bits."],
      quiz: [
        {q:"Which circuit accepts a carry from the previous bit?",o:["Half adder","Full adder","Decoder","D flip-flop"],c:1,e:"A full adder accepts carry-in as a third input."},
        {q:"A combinational circuit's output depends on…",o:["Current inputs only","Yesterday's output only","The clock alone","Stored state only"],c:0,e:"Combinational logic has no memory, so present inputs determine its output."}
      ]
    },
    {
      lead: "A processor is a team of small parts that move and transform data. This unit follows one instruction through that team and explains the registers, addressing choices and stack that make the work orderly.",
      analogy: "Think of the CPU as a cook following a recipe. The program counter points to the next step, the instruction register holds it, and the ALU does arithmetic or logic.",
      goals: ["Name the main CPU registers and describe their roles.", "Explain the fetch-decode-execute cycle in order.", "Compare addressing modes, RISC/CISC tendencies and stack storage."],
      lessons: [
        ["Registers keep the work close", "The program counter (PC) identifies the next instruction. The instruction register (IR) holds the instruction being handled. The memory address register (MAR) holds an address; the memory data register (MDR) carries data. An accumulator or general-purpose register can hold an operand or result. Registers are small and fast compared with main memory."],
        ["The instruction cycle is a repeatable loop", "Fetch: use the PC to request the next instruction and place it in the IR. Decode: the control unit interprets the operation and finds operands. Execute: the ALU, memory or an I/O device performs the work. Write back: store the result and update the PC, either to the next instruction or a branch target. An interrupt can temporarily redirect execution."],
        ["Instructions find data in different ways", "Immediate addressing puts a value inside the instruction; direct addressing gives a memory location; indirect addressing points to a location containing the real address; register addressing names a CPU register. RISC designs tend toward simpler, regular instructions; CISC designs may offer more complex instructions. These are tendencies, and modern CPUs can combine them. A stack is last-in, first-out storage, useful for return addresses and temporary values."]
      ],
      example: ["Follow a simple instruction: ADD R1, R2.", "The PC supplies the instruction address; the CPU fetches it into the IR and advances the PC.", "The control unit decodes ADD and identifies R1 and R2. Their values go to the ALU.", "The ALU adds them, the result is written to the destination register, and execution continues at the next PC address."],
      pitfalls: ["The PC normally points to the next instruction address, not a data value.", "Decode identifies the operation; execute performs it.", "RISC and CISC are useful comparisons, not perfectly separate boxes for every modern CPU."],
      quiz: [
        {q:"Which register points to the next instruction?",o:["Program counter","Instruction register","Memory data register","Accumulator"],c:0,e:"The PC supplies the address from which the next instruction is fetched."},
        {q:"A stack follows…",o:["First-in, first-out","Last-in, first-out","Largest-first order","Alphabetical order"],c:1,e:"The most recently pushed item is the first one removed."}
      ]
    },
    {
      lead: "This unit explains how computers improve speed and communicate with devices. The central idea is balance: a processor is fast, while memory and devices may be slower, so computers use overlap, caches and transfer methods to avoid wasting time.",
      analogy: "A chef keeps often-used ingredients on the counter, asks a helper to bring a whole box, and starts another task while the first finishes. Computers use similar strategies.",
      goals: ["Describe pipeline stages and the hazards that limit speedup.", "Explain cache, locality, memory hierarchy and virtual memory.", "Compare I/O methods and outline Booth multiplication."],
      lessons: [
        ["Pipelining overlaps work", "A pipeline divides instruction work into stages such as fetch, decode and execute. While one instruction executes, another can be decoded and another fetched. This improves how many instructions finish over time; it does not remove the steps in each instruction. Data, control and resource hazards can force pauses, so real speedup is below the ideal."],
        ["Fast memory works because use has patterns", "Registers, cache, main memory and storage form a hierarchy: smaller, faster levels sit near the CPU; larger, slower levels are farther away. Cache stores blocks likely to be used again. Temporal locality means recently used data may be needed again; spatial locality means nearby addresses may be used soon. Virtual memory maps a program's logical address space onto physical memory, with storage supporting the illusion of a larger space."],
        ["I/O can keep the CPU from waiting", "With programmed I/O, the CPU repeatedly checks a device and transfers data. With interrupt-driven I/O, the device asks for attention. With DMA, a controller moves a block between a device and memory after CPU setup. Booth's multiplication algorithm handles signed binary multiplication by examining neighboring multiplier bits and choosing add, subtract or shift steps."]
      ],
      example: ["Compare three ways to receive a device update.", "Programmed I/O: the CPU keeps asking if the device is ready. This is simple but spends CPU time waiting.", "Interrupt: the device signals the CPU when it needs help. The CPU can do other work until then.", "DMA: for a large block, the CPU starts the transfer and the controller moves the data; the CPU is notified when it finishes."],
      pitfalls: ["Pipelining improves throughput; hazards can stall it.", "A cache hit and a cache miss take different paths.", "DMA still needs CPU setup; it reduces CPU work during transfer."],
      quiz: [
        {q:"Spatial locality means…",o:["Nearby addresses may be used soon","Old data is erased","Every address is equally fast","A device is interrupted"],c:0,e:"Programs often access locations near the one they just used."},
        {q:"Which method transfers a block with less CPU involvement?",o:["Programmed I/O","DMA","K-map grouping","Fetch-decode-execute"],c:1,e:"DMA controllers move blocks between a device and memory after setup."}
      ]
    }
  ],
  evs: [
    {
      lead: "The environment is a connected system, and people are part of it. This unit introduces Earth's spheres, the resources we depend on, the effects of using them, and meeting today's needs while protecting future choices.",
      analogy: "Earth is a shared home with rooms that connect: air, water, land and living things. If we change one room, the others can feel it.",
      goals: ["Name the main Earth spheres and describe a connection between them.", "Compare renewable and non-renewable resources with care.", "Explain sustainability and fairness within and between generations."],
      lessons: [
        ["Earth's spheres work together", "The atmosphere is air; the hydrosphere is water; the lithosphere is solid outer land; and the biosphere is living organisms and their habitats. These are not sealed boxes. Rain moves water through air and land, soil supports plants, and organisms change air and soil. Human settlements, farming and industry interact with all four."],
        ["Resources have limits and impacts", "Natural resources include soil, forests, water, minerals, energy and land. Renewable resources can replenish on a human timescale, but only if use stays within their regeneration rate; a forest can still be depleted by overharvesting. Non-renewable resources form much more slowly than people use them. Dams, mining, deforestation, erosion and land-use change can bring benefits and costs."],
        ["Sustainability joins needs with fairness", "Sustainable choices meet present needs while keeping future generations able to meet theirs. Intergenerational equity considers people in the future. Intragenerational equity asks whether people living today share benefits, costs and access fairly. A groundwater decision, for example, affects today's households and the supply left for future users."]
      ],
      example: ["Think through a proposed large dam.", "Possible benefits include water storage, electricity and reduced flood risk in some places.", "Possible costs include submerged homes, changed river flow and sediment, harm to fish or wetlands, and displacement.", "A balanced assessment compares alternatives, listens to affected communities, plans fair rehabilitation, protects ecological flows and monitors results."],
      pitfalls: ["Renewable does not mean unlimited or impact-free.", "Sustainability includes social wellbeing as well as nature and the economy.", "Separate fairness among people today from fairness to future generations."],
      quiz: [
        {q:"Which sphere includes rivers and groundwater?",o:["Hydrosphere","Lithosphere","Biosphere","Atmosphere"],c:0,e:"The hydrosphere includes Earth's water in many forms."},
        {q:"Intergenerational equity is about fairness to…",o:["Future generations","Only one business","One ecosystem species","People in one classroom"],c:0,e:"It asks how present choices affect people who come after us."}
      ]
    },
    {
      lead: "An ecosystem is a living neighborhood. Plants, animals, microorganisms, water, soil and sunlight interact; energy moves through food relationships while nutrients are reused. This unit connects those patterns with biodiversity and conservation.",
      analogy: "Imagine a garden: sunlight feeds plants, insects eat leaves, birds eat insects, and fungi break down fallen leaves so nutrients return to the soil.",
      goals: ["Identify producers, consumers, decomposers and abiotic factors.", "Distinguish energy flow from nutrient cycling and chains from webs.", "Describe biodiversity threats and in-situ/ex-situ conservation."],
      lessons: [
        ["Living and non-living parts form one system", "Abiotic factors include light, water, soil and temperature. Producers such as plants capture energy and build food. Consumers get energy by eating organisms. Decomposers break down dead material and return nutrients. These roles connect organisms to the surroundings they depend on."],
        ["Energy flows; matter cycles", "A food chain shows one feeding path; a food web joins many paths. At each trophic level, some energy is used and lost as heat, so less is available higher up. Matter such as carbon and nutrients cycles through organisms and the environment. Ecological pyramids summarize number, biomass or energy; an energy pyramid is upright because usable energy decreases upward."],
        ["Biodiversity supports life and livelihoods", "Biodiversity includes variety within species, between species and among ecosystems. Habitat loss, overuse, pollution, invasive species and climate change can reduce it. In-situ conservation protects species in their ecosystems, such as protected areas. Ex-situ conservation supports them outside that habitat, such as in seed banks or carefully managed captive-breeding programs; the approaches can complement each other."]
      ],
      example: ["Trace a simple food chain: Sun → grass → grasshopper → frog → hawk.", "Grass captures some sunlight and stores energy as food.", "The grasshopper receives some energy by eating grass; the frog receives some by eating the grasshopper.", "At each transfer, much energy is used or lost as heat. Decomposers return nutrients, but energy does not cycle in the same way."],
      pitfalls: ["Energy flows through an ecosystem; nutrients cycle.", "A food web is many connected feeding paths, not one chain.", "In-situ protects a habitat; ex-situ protects organisms away from their habitat."],
      quiz: [
        {q:"Which group returns nutrients by breaking down dead matter?",o:["Decomposers","Producers","Top consumers","Pollinators only"],c:0,e:"Decomposers break down organic matter and return nutrients."},
        {q:"A seed bank is an example of…",o:["Ex-situ conservation","In-situ conservation","A food web","A trophic level"],c:0,e:"Seed banks preserve plant diversity outside its natural habitat."}
      ]
    },
    {
      lead: "Environmental decisions involve people, rules and long-term planning. This unit connects sustainable development with business practice, environmental law, project assessment and India's climate missions.",
      analogy: "A town is like a team sharing a playground. A good plan lets people build and earn a living while keeping air, water and shared spaces healthy.",
      goals: ["Explain sustainable development as a balance of environmental, social and economic needs.", "Describe practical ways a business can reduce its impact.", "Recall the broad purposes of the three laws and the climate missions in the notes."],
      lessons: [
        ["Development has three connected parts", "Sustainable development balances environmental protection, social wellbeing and economic activity. If a project creates income but damages drinking water or displaces people without support, its benefits and costs are uneven. A sound plan asks who benefits, who bears the impact, what alternatives exist and how outcomes will be checked."],
        ["Businesses can prevent harm at the source", "A business can measure energy, water, materials and emissions; use resources efficiently; prevent pollution before it is created; reduce packaging; make products durable; and recover materials for reuse or recycling. It can also choose suppliers responsibly, protect workers and communities, and report results honestly."],
        ["Law and climate planning set shared direction", "The syllabus names the Water Act (1974), Air Act (1981) and Environment Protection Act (1986): broadly, they address water pollution, air pollution and a wider framework for environmental protection. For precise legal requirements, use current official text. The National Action Plan on Climate Change lists missions on solar energy, efficiency, sustainable habitats, water, Himalayan ecosystems, Green India, sustainable agriculture and climate knowledge."]
      ],
      example: ["Use a road or dam proposal to build an environmental assessment.", "Describe the project and affected environment; identify likely effects on land, water, health, livelihoods and communities.", "Compare alternatives, consult affected people and describe measures to avoid, reduce or repair harm.", "Include fair rehabilitation where displacement occurs, then monitor whether promised measures work."],
      pitfalls: ["Do not describe development as only economic growth.", "Learn the laws' broad purposes; amendments and detailed rules can change.", "An assessment should consider people and ecosystems, not only construction costs."],
      quiz: [
        {q:"Sustainable development balances environment, society and…",o:["Economic activity","Noise levels only","One company's profits","Population size alone"],c:0,e:"The three broad dimensions are environment, society and economy."},
        {q:"Which Act in the notes addresses air pollution?",o:["Air Act, 1981","Water Act, 1974","Environment Protection Act, 1986","Forest Survey Act, 2005"],c:0,e:"The Air (Prevention and Control of Pollution) Act is from 1981."}
      ]
    },
    {
      lead: "Pollution is harmful matter or energy entering the environment in a way that damages health or ecosystems. This unit follows a pollutant from source to effect, then chooses prevention and response measures.",
      analogy: "If a bathtub is overflowing, wiping the floor helps after the spill, but turning down the tap fixes the cause. Pollution prevention works the same way.",
      goals: ["Trace sources, exposure routes and effects for major forms of pollution.", "Keep greenhouse effect, global warming and ozone depletion distinct.", "Apply the waste hierarchy and the disaster-management cycle."],
      lessons: [
        ["Follow pollution from source to effect", "Air pollution can come from vehicles, power, industry, dust or burning. Water and soil pollution may follow waste, chemicals or runoff; noise and marine pollution have their own sources. A clear answer follows four links: source → exposure → effect → control. Effects can include illness, ecosystem damage, crop loss and degraded living conditions."],
        ["Atmospheric problems are related but different", "The greenhouse effect is a natural process in which gases absorb and re-emit heat; extra greenhouse gases strengthen it. Global warming is the long-term rise in average temperature. Ozone depletion is thinning of protective stratospheric ozone associated with particular chemicals. Acid rain forms when certain pollutants react in the atmosphere and return with precipitation."],
        ["Prevent waste and prepare for hazards", "A useful waste hierarchy starts with prevention, then reduction, reuse, recycling and recovery, with safe disposal for what remains. Disaster management includes risk reduction, preparedness, response and recovery. Businesses can plan to protect workers, infrastructure and supply chains before a hazard occurs, then restore operations safely."]
      ],
      example: ["Explain a local air-pollution problem using four links.", "Source: traffic exhaust and open burning release pollutants.", "Exposure: people breathe polluted air, especially near busy roads or during stagnant weather.", "Effects can include breathing and heart problems. Controls may include cleaner energy, public transport, maintained vehicles, emission standards, dust control and avoiding open burning."],
      pitfalls: ["The natural greenhouse effect makes Earth habitable; human emissions intensify it.", "Ozone depletion and global warming are different atmospheric problems.", "Safe disposal matters, but preventing and reducing waste come earlier."],
      quiz: [
        {q:"Climate change describes…",o:["A long-term shift in climate patterns","A daily change in one room","The ozone layer only","A waste sorting rule"],c:0,e:"Climate change refers to long-term shifts in climate patterns."},
        {q:"Which step comes first in the waste hierarchy?",o:["Prevention","Landfill","Burning","Disposal"],c:0,e:"Preventing waste avoids creating the problem in the first place."}
      ]
    }
  ],
  english: [
    {
      lead: "Vocabulary grows when you understand how words are built and how they behave in sentences. This unit covers roots, affixes, synonyms, antonyms and abbreviations, with a study method that makes new words easier to remember.",
      analogy: "A word can be a little building. The root is the main block; a prefix goes at the front and a suffix can be added at the end to change meaning or job.",
      goals: ["Separate a root, prefix and suffix in a word.", "Choose synonyms and antonyms that fit a sentence.", "Build a vocabulary notebook using context and examples."],
      lessons: [
        ["Build meaning from word parts", "A root carries a core meaning. A prefix comes before it and can change meaning: re-write means write again. A suffix follows the base and may change meaning or part of speech: teach becomes teacher; kind becomes kindness. Some words change spelling when an ending is added, so check the complete word in a sentence."],
        ["Choose related words by context", "Synonyms have similar meanings, but they may not fit every sentence equally well. Begin and start are close, yet natural word choice depends on situation and tone. Antonyms express contrast, such as early and late. Learn them through example sentences instead of memorizing isolated pairs."],
        ["Use abbreviations and records for the audience", "An abbreviation shortens a word or phrase. Standard forms can help in the right setting, while informal shortcuts may be unsuitable in an exam or formal letter. Keep a vocabulary record with the word, a simple meaning, a sentence you understand, and one related word; revisit it and recall the meaning before looking."]
      ],
      example: ["Learn the word “careful.”", "The base is care. The suffix -ful means “full of,” so careful means taking care or paying attention.", "A useful sentence is: “Mira was careful when she measured the medicine.”", "A related word is carefully. Notice that -ly makes an adverb describing how an action is done."],
      pitfalls: ["A synonym is similar in meaning, not always interchangeable.", "A prefix comes before the base; a suffix comes after it.", "Use abbreviations your audience will recognize and the task allows."],
      quiz: [
        {q:"In “rewrite,” which part is the prefix?",o:["write","re-","-ite","wri-"],c:1,e:"The prefix re- comes before the base word write."},
        {q:"Which is an antonym pair?",o:["Begin / start","Early / late","Teacher / teach","Care / careful"],c:1,e:"Early and late express opposite positions in time."}
      ]
    },
    {
      lead: "Good writing helps a reader follow one idea at a time. This unit builds the sentence and paragraph tools behind clear writing: phrases and clauses, sentence types, paragraph shape, transitions, precise wording and punctuation.",
      analogy: "A paragraph is a short path with a sign at the start, useful stops along the way, and a clear ending. Each sentence should help the reader move along it.",
      goals: ["Tell a phrase from a clause and identify independent/dependent clauses.", "Build simple, compound and complex sentences.", "Organize one clear paragraph with support and transitions."],
      lessons: [
        ["Sentences need complete thoughts", "A phrase is a group of words without a complete subject-and-verb idea. A clause has a subject and a verb. An independent clause can stand alone; a dependent clause needs another idea. “The student revised” is complete; “because the exam was near” leaves the reader waiting."],
        ["Vary sentence structure without losing clarity", "A simple sentence has one independent clause. A compound sentence joins independent clauses, often with a coordinating conjunction. A complex sentence combines an independent clause with a dependent clause. Variety makes writing less repetitive, but a sentence should not become so long that its main point is lost."],
        ["A paragraph develops one main idea", "Start with a topic sentence that tells the focus. Add reasons, examples or facts. Put details in a sensible order: time, importance, or cause and effect. Transitions such as however, therefore and for example signal how ideas connect. Use punctuation to show boundaries, and remove sentences that do not help the paragraph's point."]
      ],
      example: ["Improve this rough paragraph: “Exercise is good. It helps the body. People should do it. It also helps mood.”", "Choose a topic sentence: “Regular exercise supports both physical and emotional health.”", "Add connected support: “It strengthens the heart and muscles. It can also improve mood because movement reduces tension.”", "Use a final sentence to close the point, then check that each sentence supports the same idea."],
      pitfalls: ["A dependent clause alone is usually a fragment.", "Transitions show relationships; they cannot repair an unclear idea.", "A paragraph can have several sentences but should still have one main focus."],
      quiz: [
        {q:"Which option is a complete clause?",o:["After the lecture","At the bus stop","The class discussed the idea","Because of the rain"],c:2,e:"It has a subject and a complete verb phrase."},
        {q:"A paragraph's topic sentence usually…",o:["States its main idea","Lists punctuation rules","Changes the subject","Repeats the conclusion exactly"],c:0,e:"It tells the reader what the paragraph will develop."}
      ]
    },
    {
      lead: "Small grammar choices can change how clear a sentence feels. This unit focuses on agreement, pronouns, articles, prepositions, modifiers and repetition, then gives a calm way to proofread.",
      analogy: "Proofreading is like checking a drawing in layers: first make sure the picture says what you mean, then inspect the small lines and labels.",
      goals: ["Match subjects and verbs in number.", "Use pronouns and articles with clear reference.", "Find misplaced modifiers, wrong word forms and unnecessary repetition."],
      lessons: [
        ["Find the real subject before choosing the verb", "A singular subject takes a singular verb in the relevant tense: “Each student has submitted the work.” Words between subject and verb can distract, so locate the true subject first. In “The box of pencils is here,” box is the subject, not pencils."],
        ["Pronouns and articles guide the reader", "A pronoun should match its reference and grammatical role: “The teacher praised them,” where them receives the action. A and an depend on the following sound; the signals an item the reader can identify. “A university” begins with a consonant sound; “an hour” begins with a vowel sound. Prepositions often follow common patterns."],
        ["Put describing words beside what they describe", "A misplaced modifier can confuse: “Walking to class, the rain soaked Maya” makes it sound as if the rain was walking. Place the modifier next to the person or thing it describes. Remove redundant pairs such as “advance planning”; planning already means preparation. Proofread first for meaning, then agreement, word choice and punctuation."]
      ],
      example: ["Correct: “Each of the students have submitted there assignment.”", "Find the subject: each is singular, so use has.", "Choose the possessive their for an assignment belonging to the student.", "A clear revision is: “Each student has submitted their assignment.” In formal agreement exercises, “an assignment” is also clear."],
      pitfalls: ["The noun nearest the verb is not always the subject.", "There refers to a place; their shows belonging; they're means they are.", "Spell-check may accept the wrong homophone, so read for meaning."],
      quiz: [
        {q:"Choose the standard subject-verb form.",o:["Each student have a notebook.","Each student has a notebook.","Each students has a notebook.","Each student having a notebook."],c:1,e:"Each is singular, so the verb is has."},
        {q:"Which word means “belonging to them”?",o:["There","They're","Their","Them's"],c:2,e:"Their is the possessive form."}
      ]
    },
    {
      lead: "Different writing tasks need different shapes. A description paints a picture, a definition explains a term, and a classification sorts a topic into groups. This unit helps you match the structure to the question.",
      analogy: "Describe a toy and show what it looks like. Define it and say what makes it that kind of toy. Classify toys and explain the rule used to sort them.",
      goals: ["Choose descriptive, definitional or classificatory structure for a prompt.", "Build an introduction that points to the topic and direction.", "Use paragraphs and a conclusion that fulfill the task."],
      lessons: [
        ["Description gives a clear picture", "A description selects details and orders them so the reader can imagine the subject. Move from left to right, near to far, step by step through time, or from the most important detail to smaller ones. Good description uses details that support the purpose instead of listing everything."],
        ["Definition explains a term's boundaries", "A definition names the term, explains its distinguishing features and may give examples. It can clarify what the term is not when nearby ideas are easily confused. For a broad word such as success, explain the sense you mean and support it with examples rather than assuming everyone defines it alike."],
        ["Classification groups items by one clear rule", "State the group and the principle used to divide it, then explain each category with examples. Categories should be clear and not overlap confusingly. An introduction names the topic and direction; a conclusion should answer the prompt and close the argument, not introduce an unrelated idea."]
      ],
      example: ["Classify ways students revise.", "State the grouping rule: students can review content, practise retrieval, or apply ideas to problems.", "Explain each type and give an example: reread a concept map, answer questions from memory, or solve a new problem.", "Close by explaining that students often combine the three methods."],
      pitfalls: ["Do not mix several classification rules in one list.", "A definition needs distinguishing features, not just a synonym.", "A conclusion should connect to the prompt and the answer you developed."],
      quiz: [
        {q:"A classification paragraph should begin by…",o:["Stating the grouping rule","Hiding the categories","Adding unrelated evidence","Repeating the title only"],c:0,e:"The reader needs the principle behind the groups."},
        {q:"A definition is strongest when it explains…",o:["Only how to spell the word","Features that distinguish the term","Every related topic","The writer's favorite example"],c:1,e:"A good definition explains what makes the term what it is."}
      ]
    },
    {
      lead: "This unit combines reading comprehension, precis writing and essays. The common skill is keeping the central meaning: discover what matters, then express it clearly in fewer or better-organized words.",
      analogy: "Imagine packing a small travel bag. Keep what the trip needs, leave out what is extra, and make important things easy to find.",
      goals: ["Identify a passage's main idea, details, tone and meaning from context.", "Write a precis in your own words without changing the source's point.", "Plan and draft a focused essay under a time limit."],
      lessons: [
        ["Read for the whole message before details", "For comprehension, read once to understand the message and again to mark its main idea and support. Notice the author's tone and use nearby words to infer unfamiliar vocabulary. Answer what the passage says, not a related idea you already know."],
        ["A precis keeps the argument and removes extras", "A precis is a shorter version that preserves a passage's central idea, logic and important points. Remove repetition, illustrations and minor details, but do not change the author's claim. Use your own words, keep the order logical, remain objective, and follow the given word limit."],
        ["An essay needs a focused path", "Unpack the prompt and choose one clear position or main claim. Sketch an introduction with a thesis, body paragraphs with one point and an example each, and a conclusion that follows from the argument. Save time to check sentence boundaries and whether every paragraph answers the prompt."]
      ],
      example: ["Plan a short essay on responsible technology use.", "Thesis: technology helps learning when used thoughtfully.", "Point 1: it gives access to explanations; example: replay a lesson. Point 2: distractions and misinformation need boundaries; example: verify sources and silence alerts.", "Conclusion: use technology with a purpose and check its information."],
      pitfalls: ["A precis does not add your opinion.", "A precis is not just the first sentence copied from every paragraph.", "An essay plan should answer the exact prompt, not the whole topic."],
      quiz: [
        {q:"A precis should preserve…",o:["The source's central meaning","Every example and repetition","The writer's new opinion","Only the first sentence"],c:0,e:"A precis condenses while keeping the source's core message."},
        {q:"Before a timed essay, the most useful first step is to…",o:["Make a short outline","Write without reading the prompt","Add every fact you know","Skip planning"],c:0,e:"An outline keeps the answer focused and organized."}
      ]
    },
    {
      lead: "Speaking well is more than saying words correctly. Listeners also hear stress, rhythm and intonation, and they notice whether a speaker listens. This unit covers clear conversation and a simple structure for a presentation.",
      analogy: "Words are the message; your voice is the road they travel on. Clear pacing and a kind listener help the message reach the other person.",
      goals: ["Explain pronunciation, stress, rhythm and intonation.", "Practise attentive listening and respectful turn-taking.", "Plan a presentation with a purpose, signposts, examples and a closing."],
      lessons: [
        ["Voice features carry meaning", "Pronunciation is how a sound or word is produced. Stress makes a syllable or word prominent. Rhythm is the pattern of stressed and unstressed syllables in speech. Intonation is the rise and fall of pitch; it can signal a question, emphasis, contrast or attitude. Speaking clearly does not mean speaking loudly."],
        ["Listening is active communication", "Let the other person finish, show that you are following, and ask a relevant question when something is unclear. Avoid interrupting or preparing your reply so intensely that you miss the point. In a workplace, choose respectful, concise language that suits the listener and situation."],
        ["Presentations guide an audience", "A formal presentation has a purpose and planned route. Open by naming the topic and why it matters, preview a few sections, explain each point with an example, and close with a summary or next step. A casual conversation can change direction more freely, but both forms need clarity and attention to the listener."]
      ],
      example: ["Plan a two-minute presentation about a study habit.", "Opening: name the habit and why it helps.", "Middle: explain two steps and give a practical example for each.", "Closing: summarize the idea and invite a question. Speak steadily, pause at section changes and look at the audience."],
      pitfalls: ["Stress means prominence, not simply loudness.", "Intonation is pitch movement; rhythm is the pattern of strong and weak syllables.", "A presentation needs a clear audience path, not disconnected facts."],
      quiz: [
        {q:"Intonation is mainly the…",o:["Rise and fall of pitch","Spelling of a word","Length of a paragraph","Volume setting"],c:0,e:"Intonation describes pitch movement across speech."},
        {q:"A formal presentation usually needs…",o:["A purpose and signposted sections","No opening or closing","Only long sentences","Frequent interruption"],c:0,e:"A clear structure helps an audience follow the message."}
      ]
    }
  ],
  iks: [
    {
      lead: "Indian Knowledge Systems (IKS) includes many ways people have organized learning, texts, philosophy, arts and practical knowledge. This unit introduces traditions and categories while reminding us not to flatten different schools into one view.",
      analogy: "Think of a large library with different shelves and methods. The shelves connect, but a grammar book, a poem and a philosophy text do different jobs.",
      goals: ["Name the four Vedas and six Vedangas with their broad subjects.", "Recognize the philosophical traditions named in the syllabus.", "Distinguish Itihasa, Puranic/niti literature and knowledge-classification ideas."],
      lessons: [
        ["Texts and supporting disciplines", "The four Vedas are Rigveda, Yajurveda, Samaveda and Atharvaveda. The six Vedangas support their study: Shiksha concerns sound, Kalpa procedures, Vyakarana grammar, Nirukta word explanation, Chandas metre and Jyotisha timekeeping or calendrical matters. This shows that learning used specialized tools for preserving and interpreting texts."],
        ["Philosophical schools ask different questions", "The syllabus groups Samkhya, Yoga, Nyaya, Vaisheshika, Purva-Mimamsa and Vedanta as Vedic schools, and Charvaka, Buddhist and Jain traditions as non-Vedic. These traditions differ on knowledge, reality, self, causation and liberation. State the grouping used in the course and give a central concern instead of implying all thought agrees."],
        ["Genres and classifications have their purposes", "Itihasa commonly refers here to the Ramayana and Mahabharata. Puranic and niti literature have distinct genres and aims. Caturdasa Vidyasthana and the 64 Kalas are course concepts for classifying learning and arts; explain them using the terms and organization in your class notes."]
      ],
      example: ["Build a short answer about the Vedangas.", "Name all six: Shiksha, Kalpa, Vyakarana, Nirukta, Chandas and Jyotisha.", "Pair each with its role: sound, procedures, grammar, difficult words, metre and timekeeping.", "Close by explaining that these disciplines support careful study and transmission of knowledge."],
      pitfalls: ["Do not mix a Vedanga's name with another discipline's purpose.", "Do not describe every philosophical school as holding the same view.", "Use the course's definitions for the 14 knowledge stations and 64 arts."],
      quiz: [
        {q:"Which Vedanga concerns grammar?",o:["Vyakarana","Chandas","Kalpa","Jyotisha"],c:0,e:"Vyakarana is the grammatical discipline."},
        {q:"Which list names the four Vedas?",o:["Rig, Yajur, Sama, Atharva","Nyaya, Yoga, Veda, Kalpa","Shiksha, Kalpa, Chandas, Yoga","Ramayana, Mahabharata, Niti, Purana"],c:0,e:"Those are the four Vedas named in the syllabus."}
      ]
    },
    {
      lead: "This unit looks at tools for language, number, measurement and knowing. It connects formal rules and number representations with historical learning, while treating modern comparisons as analogies rather than claims that old texts were modern technologies.",
      analogy: "Place value is like labelled boxes: the same bead means hundreds, tens or ones depending on the box it sits in.",
      goals: ["Explain how place value and zero support compact calculation.", "Describe Bhuta-Sankhya, Katapayadi and Pingala's patterns.", "Use pramana, prameya and samshaya correctly."],
      lessons: [
        ["Rules make language patterns visible", "Panini's Ashtadhyayi is a highly organized work on grammar. Its rules can be compared with formal systems because both use explicit structures, but that is an analogy; it does not make the text a modern programming language. Name the historical work and explain what the comparison helps illustrate."],
        ["Place value and zero carry information", "In a positional system, each place has a weight. In 352, digits mean 3 hundreds, 5 tens and 2 ones. Zero can be a number and a placeholder: it shows the tens place is empty in 205, distinguishing it from 25. Bhuta-Sankhya and Katapayadi represent numbers through conventional word or symbol mappings."],
        ["Patterns and knowledge have named methods", "Pingala's work on metre studies patterns of short and long syllables that can be represented combinatorially. This offers a careful connection to binary patterns, while keeping historical context clear. In Vaisheshika terms, pramana is a means of valid knowledge, prameya is what is to be known, and samshaya is doubt."]
      ],
      example: ["Use place value to explain 205.", "The 2 is in the hundreds place, so it contributes 200.", "The 0 is in the tens place: there are no tens, but the place remains visible.", "The 5 contributes 5 ones. Without the zero placeholder, 205 could be confused with 25."],
      pitfalls: ["Zero as a placeholder and zero as a number are related but distinct uses.", "Describe number-encoding systems according to the mapping taught in class.", "Treat the Panini/computation comparison as an analogy, not an identity."],
      quiz: [
        {q:"In the Vaisheshika terms, prameya is…",o:["The object of knowledge","A sound measure","A weekday","A number code"],c:0,e:"Prameya is the subject or object to be known."},
        {q:"In 205, zero mainly shows…",o:["The tens place is empty","There are no hundreds","The number is invalid","The number is binary"],c:0,e:"The placeholder keeps the place-value structure clear."}
      ]
    },
    {
      lead: "This unit surveys mathematical and astronomical practices through texts, instruments and calendars. Study them with a sense of setting: what problem was being solved, what method was used, and what evidence the source supports.",
      analogy: "A traditional calendar is like a dashboard with several clues about time. Each clue answers a different question about the day and the sky.",
      goals: ["Explain the Sulba Sutras' mathematical setting and name scholars in the notes.", "Recall the five Panchanga limbs and their meanings.", "Describe what observatories such as Jantar Mantar were used to do."],
      lessons: [
        ["Mathematics grew through practical and scholarly work", "The Sulba Sutras preserve geometric procedures for constructing altars and ritual spaces. They show practical measurement and shape construction in a historical setting. The course also names Aryabhata and the Aryabhatiya, Brahmagupta and Bhaskara, alongside arithmetic, geometry, algebra, trigonometry and pi. Pingala's Chandah Sastra is discussed with metre and patterns."],
        ["Panchanga combines five calendar measures", "The five limbs are tithi (lunar day), vara (weekday), nakshatra (lunar mansion), yoga (a calculated angular relationship) and karana (half a tithi). Together these measures organize calendrical information. Define each and show that a Panchanga combines multiple astronomical measures rather than acting as only a list of dates."],
        ["Instruments make observation concrete", "Jantar Mantar observatories used large instruments to observe and calculate astronomical positions. Name the historical context and explain what the instruments were for, then connect design to observation and calculation. Avoid treating a historical instrument as if it answers every modern astronomical question."]
      ],
      example: ["Prepare a five-part Panchanga answer.", "Write the terms: tithi, vara, nakshatra, yoga and karana.", "Add a short meaning after each: lunar day, weekday, lunar mansion, angular relationship and half-tithi.", "Finish by saying the framework combines these measures for calendrical decisions."],
      pitfalls: ["Tithi is a lunar day, not simply a numbered day of the modern month.", "Describe a geometric rule in its setting; do not claim a modern proof unless the source provides one.", "Keep observation and calculation linked when writing about instruments."],
      quiz: [
        {q:"Which is a Panchanga limb?",o:["Karana","Vyakarana","Samkhya","MDR"],c:0,e:"Karana is one of the five Panchanga limbs."},
        {q:"The Sulba Sutras connect to…",o:["Geometry and altar construction","Software testing","English sentence structure","Food chains"],c:0,e:"They preserve geometric procedures in a ritual construction setting."}
      ]
    },
    {
      lead: "Technical knowledge is visible in the materials, buildings and art people made. This unit explores metals, dyes, painting, town planning and architecture, with attention to craft processes and regional context.",
      analogy: "A craftsperson is a careful observer: choose a material, understand how it behaves, shape it, finish it, then use it for a real purpose.",
      goals: ["Describe metalworking through materials and process steps.", "Connect dyes, painting and architecture with craft knowledge.", "Discuss Vastu Shastra and temple forms with historical and regional care."],
      lessons: [
        ["Metalworking is a chain of decisions", "An answer can identify a metal and its use, then describe ore selection, heating, smelting, shaping, joining and finishing. The syllabus names copper, gold, zinc, mercury, lead and silver, as well as iron and steel history. Tools, furnaces, alloying and trade connect technical work to society."],
        ["Dyes and painting join material with technique", "Color on cloth or a wall depends on materials and processes: prepare pigment or dye, apply it to a surface, and use methods that help it remain visible. The course places these arts within technical and occupational knowledge. Use specific class examples and explain the process rather than making broad claims."],
        ["Built spaces express design and local traditions", "Town planning and temple architecture involve layout, materials, structure and site. Many temple traditions include a sanctum, a tower or superstructure, halls, gateways and sculpture, but regional forms differ. Vastu Shastra is a body of architectural principles and texts; describe its history without presenting every claim as modern engineering evidence."]
      ],
      example: ["Structure an answer about iron or steel.", "Name the material and a documented use, time or region if your source gives one.", "Describe supported steps: prepare the material, heat or smelt it, shape it and finish it.", "Connect the technique with artisans, tools, trade or social needs; avoid unsupported claims of universal superiority."],
      pitfalls: ["Name a time, region or source when known; do not generalize across periods.", "Do not describe all temples as having an identical plan.", "A historical design principle is not automatically proof of a modern engineering claim."],
      quiz: [
        {q:"A strong metalworking explanation includes…",o:["Material and supported process steps","Only a claim of superiority","Unrelated rulers","A truth table"],c:0,e:"Specific material, technique and context make the answer stronger."},
        {q:"Temple architecture should be described with attention to…",o:["Regional variation and design","One plan for every temple","Only paint color","Modern code syntax"],c:0,e:"Forms and layouts vary across traditions and regions."}
      ]
    },
    {
      lead: "This unit brings knowledge into everyday and public life: food, sleep, health, yoga, psychology, ethics, administration and governance. Explain concepts within their traditions and distinguish historical texts from today's institutions.",
      analogy: "A community needs personal wellbeing and fair ways to make shared decisions. Knowledge can ask how to care for oneself and how people organize life together.",
      goals: ["Explain the course's treatment of daily habits, yoga and wellbeing.", "Describe sattva, rajas and tamas as a traditional framework.", "Discuss the Ramayana and Arthashastra with historical context."],
      lessons: [
        ["Wellbeing includes daily habits and traditions", "The syllabus considers food, sleep, water and daily practice in Ayurveda and yoga traditions. Yoga includes practices and philosophies, so name the path or practice instead of reducing it to posture. Say what the course source describes and avoid presenting a historical framework as a medical diagnosis."],
        ["Triguna is a way of describing qualities", "Sattva is associated with clarity and balance, rajas with activity and desire, and tamas with inertia or obscurity. This is a conceptual framework in particular traditions, not a measured modern personality test. Explain the terms with an example and keep their context clear."],
        ["Texts offer perspectives on governance and ethics", "The Ramayana and Arthashastra provide different perspectives on duty, governance and statecraft. The Arthashastra can be discussed through rulers, officials, revenue, law, diplomacy and security. Explain the setting and purpose; do not equate prescriptions directly with present-day constitutional or democratic rules."]
      ],
      example: ["Compare a classical governance text with a modern institution carefully.", "Name the text and one issue it discusses, such as administration or revenue.", "Describe the historical idea before comparing it with a present-day question.", "State the difference in context and institutions; use the comparison to clarify rather than claim the systems are identical."],
      pitfalls: ["Yoga is broader than physical postures in the course's framing.", "Triguna is a traditional conceptual framework, not a clinical measure.", "A historical text's prescriptions are not current constitutional rules."],
      quiz: [
        {q:"In the Triguna framework, rajas is associated with…",o:["Activity and desire","Clarity and balance","Inertia only","Timekeeping"],c:0,e:"Rajas is associated with activity and desire."},
        {q:"The Arthashastra is discussed in connection with…",o:["Statecraft and administration","Binary conversion","Punctuation","Food-chain energy"],c:0,e:"It is a classical text associated with governance and administration."}
      ]
    }
  ],
  math: [
    {
      lead: "Sets collect objects, relations connect them, and functions assign outputs. This unit builds a dependable method for checking relation properties and understanding how functions and relationships behave.",
      analogy: "A set is a basket of things. A relation draws links between things; a function is a special rule that gives every input exactly one output.",
      goals: ["Use set operations and Cartesian products correctly.", "Test reflexive, symmetric and transitive properties separately.", "Classify functions and explain Warshall's reachability method."],
      lessons: [
        ["Sets and ordered pairs describe collections and links", "A set is a collection of distinct elements. Union gathers elements from either set, intersection keeps shared elements, and difference keeps elements in the first but not the second. The Cartesian product A×B contains ordered pairs (a,b); order matters. A relation from A to B is any subset of A×B."],
        ["Test relation properties one at a time", "On a set A, reflexive means every a is related to itself; symmetric means aRb implies bRa; transitive means aRb and bRc imply aRc. An equivalence relation has all three. Its equivalence classes group elements that are equivalent, and those classes partition the set into non-overlapping groups."],
        ["Functions and reachability are structured rules", "A function gives each input exactly one output. Injective means different inputs have different outputs; surjective means every codomain value is reached; bijective means both. Warshall's algorithm starts from an adjacency matrix and considers each vertex k as a possible intermediate point. It adds reachability from i to j when i reaches k and k reaches j."]
      ],
      example: ["Check a R b when a−b is divisible by 3.", "Reflexive: a−a=0, divisible by 3, so aRa.", "Symmetric: if a−b is divisible by 3, then b−a is its negative and is also divisible by 3.", "Transitive: if a−b and b−c are divisible by 3, their sum a−c is divisible by 3. The classes are numbers with the same remainder mod 3."],
      pitfalls: ["Check each relation property separately; one does not prove another.", "A function may map several inputs to one output and still be a function.", "Clarify whether reachability includes a zero-length path from a vertex to itself."],
      quiz: [
        {q:"An equivalence relation must be…",o:["Reflexive, symmetric and transitive","Only symmetric","Injective and onto","Connected and acyclic"],c:0,e:"All three relation properties are required."},
        {q:"A bijective function is…",o:["Injective and surjective","Reflexive and transitive","A graph with no cycle","A square matrix"],c:0,e:"Bijective means one-to-one and onto."}
      ]
    },
    {
      lead: "Counting turns “how many?” into a choice of rule. Recurrences define a sequence using earlier terms. This unit helps you decide whether order matters, count arrangements correctly and solve simple recurrence patterns.",
      analogy: "If you choose a shirt and then a hat, each shirt can pair with each hat. Counting is careful bookkeeping so no choice is missed or counted twice.",
      goals: ["Choose permutations or combinations based on whether order matters.", "Apply addition, multiplication and pigeonhole principles.", "Solve a simple constant-coefficient recurrence using its characteristic equation."],
      lessons: [
        ["Count choices with the right principle", "Use multiplication for successive independent choices: 3 shirts and 2 hats give 3×2 outfits. Use addition for alternatives that cannot happen together, adding their counts. A permutation counts ordered selections; a combination counts selections where order does not matter."],
        ["Permutations, combinations and pigeonholes", "For n distinct items chosen r at a time, nPr=n!/(n−r)!; nCr=n!/[r!(n−r)!]. The pigeonhole principle says more objects than boxes forces a box to hold at least two. The binomial theorem expands (x+y)^n using combination coefficients; each coefficient counts how many ways to choose that number of y factors."],
        ["A recurrence builds each term from earlier terms", "A recurrence defines terms using previous terms and needs initial values to identify the sequence. For a linear recurrence with constant coefficients, try a term shaped like r^n to form a characteristic equation. Solve for roots, write a general combination of root terms, then use initial values to determine constants."]
      ],
      example: ["Count four-letter arrangements from the eight different letters of COMPUTER.", "Order matters because ABCD and BACD are different arrangements, so use a permutation.", "8P4 = 8×7×6×5 = 1,680.", "If you were only choosing four letters and order did not matter, you would use 8C4 instead."],
      pitfalls: ["Ask whether order matters before choosing nPr or nCr.", "If items repeat, the distinct-item formula may need adjustment.", "A recurrence needs initial values as well as its rule."],
      quiz: [
        {q:"For an ordered arrangement, use…",o:["Permutation","Combination","Matrix rank","Euler circuit"],c:0,e:"Permutations count selections where order matters."},
        {q:"More objects than boxes guarantees…",o:["A box contains two or more objects","Every box has one object","No object is repeated","All boxes are full"],c:0,e:"That is the pigeonhole principle."}
      ]
    },
    {
      lead: "Graph theory turns a map of connections into a precise object. This unit distinguishes paths, cycles, trees, Euler routes and Hamiltonian routes, then uses rules to reason about networks and planar drawings.",
      analogy: "A graph is like a map made of dots and lines. The dots are places or people; the lines are their connections.",
      goals: ["Read vertices, edges, paths and cycles from a graph.", "Use tree and spanning-tree properties.", "Distinguish Euler and Hamiltonian conditions and apply Euler's planar formula."],
      lessons: [
        ["Graphs model relationships", "A graph has vertices and edges. A path follows connected edges; a cycle returns to its start. The degree of a vertex is the number of edges touching it. Graphs can model roads, computer networks or relationships without needing real distances."],
        ["Trees connect without loops", "A tree is connected and has no cycles. With n vertices it has n−1 edges: each new vertex needs one edge to remain connected, and an extra edge would create a cycle. A spanning tree uses every vertex of a connected graph with the minimum number of edges needed for connectivity."],
        ["Euler asks about edges; Hamilton asks about vertices", "An Euler circuit uses every edge exactly once and returns to its start; in a connected undirected graph, each vertex must have even degree. A Hamiltonian cycle visits each vertex exactly once before returning and need not use every edge. For a connected planar graph, V−E+F=2, where F includes the outside region."]
      ],
      example: ["A connected tree has 6 vertices. How many edges?", "Use the tree rule E=n−1.", "Substitute n=6: E=6−1=5.", "Adding another edge between existing vertices creates a cycle, so the result is no longer a tree."],
      pitfalls: ["Euler conditions concern edges; Hamiltonian conditions concern vertices.", "A spanning tree includes all vertices but only enough edges to connect them.", "Count the outside region when using V−E+F=2."],
      quiz: [
        {q:"An Euler circuit uses every…",o:["Edge exactly once","Vertex exactly once","Face twice","Path in order"],c:0,e:"Euler is the edge-based route condition."},
        {q:"A tree with 8 vertices has…",o:["7 edges","8 edges","16 edges","4 edges"],c:0,e:"A tree has n−1 edges, so 8−1=7."}
      ]
    },
    {
      lead: "A matrix is a number table that organizes systems of equations and transformations. This unit builds from determinants and inverses to rank, eigenvalues, Cramer's rule and the Cayley-Hamilton idea.",
      analogy: "A matrix is a tidy grid of numbers. A determinant is one signal about whether that grid can be reversed to recover its input.",
      goals: ["Calculate a 2×2 determinant and inverse when valid.", "Find rank through row reduction and solve systems with Cramer's rule.", "Set up eigenvalue equations and state Cayley-Hamilton's role."],
      lessons: [
        ["Determinants tell when a square matrix is invertible", "For [[a,b],[c,d]], det=ad−bc. If it is zero, the rows or columns are dependent and no inverse exists. If nonzero, the inverse is 1/(ad−bc) times [[d,−b],[−c,a]]. Compute the determinant before attempting an inverse."],
        ["Rank measures independent information", "The rank is the number of linearly independent rows or columns. Row reduction is a reliable way to find it: use elementary row operations to reach echelon form and count nonzero rows. Rank helps show whether equations contain independent information or some rows repeat others."],
        ["Eigenvalues and solution rules reveal structure", "An eigenvalue λ satisfies det(A−λI)=0; a corresponding nonzero eigenvector v satisfies (A−λI)v=0. Cramer's rule solves a square system using determinants when the coefficient determinant is nonzero. Cayley-Hamilton says a square matrix satisfies its own characteristic polynomial, helping simplify matrix powers or derive an inverse when conditions allow."]
      ],
      example: ["Solve x+y=5 and 2x−y=1, then verify.", "Add the equations: 3x=6, so x=2.", "Substitute into x+y=5: y=3.", "Check both: 2+3=5 and 4−3=1. With Cramer's rule, show D, Dₓ and Dᵧ before dividing."],
      pitfalls: ["The inverse formula needs a square matrix with nonzero determinant.", "An eigenvector cannot be the zero vector.", "After solving, substitute the result into the original equations."],
      quiz: [
        {q:"A 2×2 matrix has an inverse only when its determinant is…",o:["Nonzero","Zero","Negative","A whole number"],c:0,e:"A zero determinant means the matrix is singular."},
        {q:"Eigenvalues satisfy which equation?",o:["det(A−λI)=0","V−E+F=2","nPr=n!","A×B=0 always"],c:0,e:"The characteristic equation is det(A−λI)=0."}
      ]
    }
  ],
  'problem-solving': [
    {
      lead: "Before coding, make sure the problem is clear. This unit teaches you to identify inputs, outputs, rules and edge cases, then turn the plan into a finite algorithm that can be traced and checked.",
      analogy: "A program is a recipe for a very literal helper. The helper needs exact ingredients, exact steps and a clear sign that the job is finished.",
      goals: ["Separate a general problem from one example input.", "Specify input, output, constraints and special cases.", "Write, trace and review an algorithm before translating it into code."],
      lessons: [
        ["Define the task before choosing a solution", "A problem is the general task; an instance is one set of actual values. State what input is allowed, what output is required, and any constraints. A precondition says what must be true before the algorithm runs; a postcondition says what should be true after it finishes."],
        ["A dependable algorithm has clear properties", "An algorithm is a finite, ordered set of unambiguous steps. It should accept valid input, produce the required result, terminate, and use practical time and memory. Correctness comes first: a fast answer that is wrong is not a solution. Then consider efficiency and clarity."],
        ["Break, trace and improve the plan", "Divide a task into smaller parts, write pseudocode or a flowchart, and trace the steps with an example. Include boundary cases such as zero, one, equal values and largest allowed input. Test normal and unusual cases, then review whether the result matches the specification."]
      ],
      example: ["Plan an algorithm to find the larger of two numbers.", "Input: a and b. Output: the larger value; state whether equal values may return either one.", "Compare a and b. If a>b, output a; otherwise output b.", "Trace a=4,b=9; a=9,b=4; and a=b=5 to confirm the tie rule."],
      pitfalls: ["One example input is not the whole problem specification.", "Pseudocode still needs tracing and testing.", "Define what happens on invalid input or ties when the question requires it."],
      quiz: [
        {q:"Which property means an algorithm eventually stops?",o:["Finiteness","Ambiguity","Recursion only","Decoration"],c:0,e:"A finite algorithm terminates after a limited number of steps."},
        {q:"What should be identified before writing steps?",o:["Inputs, outputs and constraints","Only variable names","The final font","A random test"],c:0,e:"The specification makes the task precise."}
      ]
    },
    {
      lead: "Structured programming uses three simple shapes: do steps in order, choose a path, or repeat a block. This unit shows how those shapes become safe conditions and loops in C.",
      analogy: "A route can go straight, choose left or right at a sign, or repeat a lap until the timer rings. Programs use the same three patterns.",
      goals: ["Recognize sequence, selection and repetition.", "Choose if/else, switch, while or do-while for a task.", "Trace loop conditions, updates and sentinel-controlled input."],
      lessons: [
        ["Sequence, selection and repetition", "Sequence runs statements in order. Selection chooses a branch, commonly with if/else or switch. Repetition runs a block while a condition holds. Combining these structures produces programs that are easier to read and reason about."],
        ["Choose the loop that matches the task", "A while loop tests before the body, so it may run zero times. A do-while loop tests after the body, so it runs at least once; it often suits a menu that must appear once. Every loop needs an initial state, a condition and an update that eventually makes the condition false."],
        ["Sentinels stop input safely", "A sentinel is a special value marking the end of input and is not part of the data. Choose one that cannot be confused with valid input, or use a separate end marker. Translate pseudocode into C in small pieces, then test zero, one and boundary values for off-by-one mistakes."]
      ],
      example: ["Display odd numbers from 1 through n.", "Set i=1. While i<=n, display i and add 2 to i.", "For n=6, the loop shows 1, 3 and 5. The next value is 7, so the condition is false.", "For n<1, the condition is false at the start and nothing is displayed; that is correct for this rule."],
      pitfalls: ["A while loop might run zero times; a do-while loop runs at least once.", "If a loop variable never moves toward the stopping condition, it may never end.", "Do not include a sentinel in a total or average."],
      quiz: [
        {q:"Which loop always runs its body at least once?",o:["do-while","while","for with a false condition","if"],c:0,e:"A do-while checks its condition after the body."},
        {q:"A sentinel is a value that…",o:["Marks the end of input","Stores a function address","Makes a loop infinite","Counts array indexes"],c:0,e:"It signals that no more data values follow."}
      ]
    },
    {
      lead: "Digits and running totals are small patterns with many exam questions. This unit uses division and remainder to inspect digits, then applies loops to number properties and simple statistics.",
      analogy: "A base-10 number is a row of digit cards. Remainder by 10 picks the last card; integer division by 10 removes it.",
      goals: ["Use %10 and integer /10 to process decimal digits.", "Trace reverse, palindrome, Armstrong, prime and factorial logic.", "Maintain count, sum, minimum and maximum safely."],
      lessons: [
        ["Take a number apart one digit at a time", "For positive integer n, n%10 gives its last digit and integer n/10 removes it. Repeating examines digits from right to left. To reverse a number, update reverse=reverse×10+digit. Save the original first if you will compare the transformed number later."],
        ["Common number properties are loop patterns", "A palindrome equals its reverse. A three-digit Armstrong number equals the sum of the cubes of its digits; for more digits, follow the definition in the question. A prime greater than 1 has exactly two positive divisors; checking candidates only through the square root is enough. Factorial multiplies positive integers down to 1, with 0!=1."],
        ["Statistics need running state and a safe count", "For a stream of values, keep count, sum, minimum and maximum as each arrives. A sentinel can stop input but should not be included. Compute average=sum/count only after checking count>0. Choose data types that can hold the possible sum or factorial result."]
      ],
      example: ["Reverse 582 using integer steps.", "Start reverse=0. Take digit=582%10=2; reverse=0×10+2=2; remaining n=58.", "Take 8; reverse=2×10+8=28; remaining n=5.", "Take 5; reverse=28×10+5=285; remaining n=0. The reverse is 285."],
      pitfalls: ["Save the original before changing n if you need to compare later.", "Zero and one are not prime numbers.", "Check that a value was entered before dividing by count."],
      quiz: [
        {q:"In C, n%10 gives the…",o:["Last digit","First digit","Number of digits","Average"],c:0,e:"The remainder after division by 10 is the last decimal digit."},
        {q:"Why check count>0 before calculating an average?",o:["To avoid dividing by zero","To sort the sum","To find the largest digit","To stop every loop"],c:0,e:"With no values, sum/count would divide by zero."}
      ]
    },
    {
      lead: "Functions, arrays and recursion help programs stay organized and solve repeated patterns. This unit connects reusable tasks with stored lists, searches, sorting and the discipline recursion needs to stop.",
      analogy: "A function is a named helper job. An array is a row of labelled boxes. Recursion asks the same helper to solve a smaller version until it reaches a simple base case.",
      goals: ["Distinguish a function prototype from its definition.", "Use recursion with a base case and a step toward it.", "Respect array bounds and the requirements of search and matrix addition."],
      lessons: [
        ["Functions give tasks a name", "A function prototype tells the compiler the function's name, return type and parameters. A definition contains the body that performs the task. Functions split, reuse and clarify work. Choose parameters for information the helper needs and a return value for its result."],
        ["Recursion must move toward a base case", "A recursive function calls itself on a smaller or simpler input. Its base case returns without another recursive call. For factorial, 0!=1 and n!=n×(n−1)! for n>0. Each call decreases n, so it reaches zero; without that progress, calls can exhaust the stack."],
        ["Arrays and algorithms have conditions", "A C array of n items uses indexes 0 through n−1; an out-of-range index is an error. Binary search halves a sorted array, so it is not valid on unsorted values. Selection sort repeatedly places the smallest remaining value next. A two-dimensional array can represent a matrix; addition needs matching dimensions."]
      ],
      example: ["Trace factorial(4) recursively.", "factorial(4)=4×factorial(3); factorial(3)=3×factorial(2).", "Continue: factorial(2)=2×factorial(1); factorial(1)=1×factorial(0).", "factorial(0)=1, so work back up: 1, 1, 2, 6, 24. The base case stops the calls."],
      pitfalls: ["A recursive call must move closer to its base case.", "Binary search requires sorted input.", "For n array items, n is not a valid index; the last index is n−1."],
      quiz: [
        {q:"For a C array of 5 items, what is the last valid index?",o:["4","5","1","0"],c:0,e:"C indexes from 0, so five items use indexes 0 through 4."},
        {q:"Binary search requires the array to be…",o:["Sorted","Reversed","Two-dimensional","Made of characters"],c:0,e:"Each comparison discards half based on the ordering."}
      ]
    }
  ]
};
