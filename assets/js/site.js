(() => {
  const courses = window.BCA_COURSES || [];
  const byId = Object.fromEntries(courses.map(course => [course.id, course]));
  const pages = {
    architecture:'computer-architecture.html', evs:'environmental-science.html', english:'general-english.html',
    iks:'indian-knowledge-system.html', math:'mathematical-foundations.html', 'problem-solving':'problem-solving.html'
  };
  const unitSlugs = {
    architecture:'computer-architecture', evs:'environmental-science', english:'general-english',
    iks:'indian-knowledge-system', math:'mathematical-foundations', 'problem-solving':'problem-solving'
  };
  const palette = {
    blue:{accent:'#56c9ff',tint:'rgba(86,201,255,.12)'}, green:{accent:'#65e0a8',tint:'rgba(101,224,168,.12)'},
    coral:{accent:'#ff8a79',tint:'rgba(255,138,121,.12)'}, purple:{accent:'#b495ff',tint:'rgba(180,149,255,.13)'},
    orange:{accent:'#ffc070',tint:'rgba(255,192,112,.12)'}, pink:{accent:'#ff83bd',tint:'rgba(255,131,189,.12)'}
  };
  const app=document.getElementById('app');
  const pageType=document.body.dataset.page||'home';
  const course=byId[document.body.dataset.course||''];
  const nav=document.getElementById('subject-nav');
  const crumbs=document.getElementById('crumbs');
  const overlay=document.getElementById('search-overlay');
  const searchInput=document.getElementById('search-input');
  const storageKey='bcasema-learning-v1';
  let state=loadState();
  let activeUnitQuiz=null;
  let activeMock=null;
  let mockTimer=null;
  let foodPath=[];

  const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const pct=(n,d)=>d?Math.round(n/d*100):0;
  const tone=c=>palette[c.tone]||palette.blue;
  const toneStyle=c=>`--accent:${tone(c).accent};--tint:${tone(c).tint}`;
  const subjectHref=id=>pages[id]||'index.html';
  const numLabel=n=>String(n+1).padStart(2,'0');

  function loadState(){
    try{
      const old=JSON.parse(localStorage.getItem(storageKey)||'{}');
      return {completed:old.completed||{},best:old.best||{},attempts:old.attempts||{},last:old.last||{},unitBest:old.unitBest||{},mockBest:old.mockBest||{}};
    }catch{return {completed:{},best:{},attempts:{},last:{},unitBest:{},mockBest:{}};}
  }
  function saveState(){try{localStorage.setItem(storageKey,JSON.stringify(state));}catch{}}
  function doneUnits(c){return Array.isArray(state.completed[c.id])?state.completed[c.id]:[];}
  function completion(c){return pct(doneUnits(c).length,c.units.length);}
  function averageMock(){
    const scores=courses.map(c=>state.mockBest[c.id]).filter(n=>Number.isFinite(n));
    return scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):0;
  }
  function totalAttempts(){return Object.values(state.attempts).reduce((a,b)=>a+(Number(b)||0),0);}
  function sourcePages(c){
    const text=window.BCA_GUIDES?.[c.id]||'';
    const map={};
    text.split(/(?=## Page \d+\n)/g).forEach(part=>{
      const match=part.match(/^## Page (\d+)\n/);
      if(match)map[Number(match[1])]=part.replace(/^## Page \d+\n/,'').trim();
    });
    return map;
  }

  function buildSubjectNav(){
    nav.innerHTML=courses.map(c=>`<a href="${subjectHref(c.id)}" class="subject-link" data-subject="${c.id}"><span class="subject-dot" style="background:${tone(c).tint};color:${tone(c).accent}">${c.icon}</span><span>${esc(c.short)}</span></a>`).join('');
  }
  function setShell(){
    document.querySelectorAll('.nav-link').forEach(link=>{
      const key=link.dataset.nav;
      link.classList.toggle('active',(pageType==='home'&&key==='home')||(pageType==='course'&&key==='courses')||key===pageType);
    });
    document.querySelectorAll('.subject-link').forEach(link=>link.classList.toggle('active',pageType==='course'&&course&&link.dataset.subject===course.id));
    const label=pageType==='course'&&course?course.short:pageType==='plan'?'Study path':pageType==='library'?'Study library':pageType==='home'?'Overview':'BCA Semester I';
    crumbs.innerHTML=`<span>BCA · SEMESTER I</span><i>›</i><strong>${esc(label)}</strong>`;
  }
  function render(){
    setShell();
    if(pageType==='course'&&course)app.innerHTML=renderCourse(course);
    else if(pageType==='plan')app.innerHTML=renderPlan();
    else if(pageType==='library')app.innerHTML=renderLibrary();
    else app.innerHTML=renderHome();
    if(pageType==='course'&&course)bindCourseAnchors();
    app.addEventListener('click',handleAppClick);
    closeMobileMenu();
    if(pageType==='home'&&location.hash==='#subjects')setTimeout(()=>document.getElementById('subjects')?.scrollIntoView({behavior:'smooth'}),100);
  }

  function courseCard(c){
    const percent=completion(c),mock=state.mockBest[c.id];
    const label=mock!==undefined?`Mock ${mock}%`:percent?`${percent}% units complete`:'Ready to learn';
    return `<a class="subject-card" href="${subjectHref(c.id)}" style="--accent:${tone(c).accent};--tint:${tone(c).tint}"><div class="card-top"><span class="subject-icon">${c.icon}</span><span class="subject-code">${esc(c.code)}</span></div><h3>${esc(c.title)}</h3><p>${esc(c.subtitle)}</p><div class="card-bottom"><div class="course-progress-line"><span style="width:${percent}%;background:${tone(c).accent}"></span></div><span class="card-progress-label">${label}</span><span class="card-arrow">↗</span></div></a>`;
  }

  function renderHome(){
    const avg=averageMock();
    const lessons=courses.reduce((n,c)=>n+doneUnits(c).length,0);
    const total=courses.reduce((n,c)=>n+c.units.length,0);
    const next=courses.find(c=>doneUnits(c).length<c.units.length)||courses[0];
    const firstOpen=next.units.findIndex((_,i)=>!doneUnits(next).includes(i));
    const nextUnit=firstOpen<0?0:firstOpen;
    const achievements=[
      {label:'First lesson checked',earned:lessons>0,icon:'✦'},
      {label:'First mock complete',earned:Object.keys(state.mockBest).length>0,icon:'◈'},
      {label:'80%+ club',earned:Object.values(state.mockBest).some(n=>n>=80),icon:'🏅'},
      {label:'All subjects explored',earned:Object.keys(state.completed).filter(id=>byId[id]&&doneUnits(byId[id]).length>0).length===courses.length,icon:'✧'}
    ];
    return `<section class="home-hero"><div class="hero-copy"><p class="eyebrow">BCA SEMESTER I · YOUR PERSONAL STUDY PLAYBOOK</p><h1>Master each unit.<span>Own your exam.</span></h1><p>Friendly explanations, complete syllabus notes, hands-on ideas, and practice that helps knowledge stick.</p><div class="hero-actions"><a class="button primary" href="${subjectHref(next.id)}#unit-${nextUnit+1}">Continue ${esc(next.short)} <span>→</span></a><a class="button secondary" href="study-path.html">Build a study path</a></div></div><div class="hero-art" aria-label="A connected learning map"><div class="orbit"></div><div class="hero-core">✦</div><span class="orbit-chip chip-a">LESSON</span><span class="orbit-chip chip-b">PRACTICE</span><span class="orbit-chip chip-c">RECALL</span><span class="orbit-chip chip-d">80% GOAL</span><span class="hero-float">✧</span></div></section>
    <section class="hero-stats"><div class="stat-card"><span class="stat-icon">◉</span><div><strong>${courses.length}</strong><span>SUBJECT PAGES</span></div></div><div class="stat-card"><span class="stat-icon">▦</span><div><strong>${total}</strong><span>SYLLABUS UNITS</span></div></div><div class="stat-card"><span class="stat-icon">◷</span><div><strong>${totalAttempts()}</strong><span>PRACTICE ROUNDS</span></div></div></section>
    <section class="section" id="subjects"><div class="section-head"><div><h2 class="section-title">Your semester, organized</h2><p class="section-caption">Each subject has its own page, unit notes, unit-end mock tests, and a timed course mock.</p></div><a class="text-link" href="study-library.html">Open study library ↗</a></div><div class="subject-grid">${courses.map(courseCard).join('')}</div></section>
    <section class="section home-bottom-grid"><div class="panel"><div class="panel-heading"><div><h3>Timed mock score graph</h3><p>Your best full-course mock result in each subject.</p></div><span class="mini-pill">80%+ TARGET</span></div><div class="chart" aria-label="Mock test scores by subject">${courses.map(c=>{const score=state.mockBest[c.id]||0;return `<div class="chart-row"><span class="chart-label">${esc(c.short)}</span><div class="chart-track"><div class="chart-fill" style="width:${score}%;background:${tone(c).accent}"></div></div><span class="chart-value">${score}%</span></div>`}).join('')}</div><div class="chart-foot"><span>0%</span><span>Practice score</span><span>100%</span></div></div><div class="panel path-card"><div class="path-head"><span class="path-sun">✳</span><div><h3>Your next focused session</h3><p>One unit · one activity · one quiz.</p></div></div><div class="path-steps"><div class="path-step"><span class="step-number">01</span><span>Read the “tiny idea” first</span></div><div class="path-step"><span class="step-number">02</span><span>Open the complete unit notes</span></div><div class="path-step"><span class="step-number">03</span><span>Finish the 3-question unit mock</span></div></div><a class="button small violet" href="${subjectHref(next.id)}#unit-${nextUnit+1}">Start with ${esc(next.short)} <span>↗</span></a></div></section>
    <section class="section"><div class="section-head"><div><h2 class="section-title">Progress markers</h2><p class="section-caption">Your learning is saved on this device. Keep stacking small wins.</p></div><a class="text-link" href="study-path.html">View study plan ↗</a></div><div class="panel"><div class="achievement-row">${achievements.map(a=>`<span class="achievement ${a.earned?'earned':''}">${a.icon} ${esc(a.label)}${a.earned?' · EARNED':''}</span>`).join('')}</div></div></section>
    <section class="section"><div class="panel" style="display:flex;align-items:center;gap:12px;background:linear-gradient(105deg,#101b27,#171528);border-color:#28344b"><span style="font-size:24px">🧠</span><span style="color:#9ba9be;font-size:9px;line-height:1.7">Fast learning loop: read one small section, explain it from memory, then answer the unit quiz. Review missed answers and try again. The 80% goal is a practice target; your result depends on consistent revision and your exam.</span></div></section>`;
  }

  function renderCourse(c){
    const pagesByNumber=sourcePages(c);
    const done=doneUnits(c),complete=completion(c),mock=state.mockBest[c.id];
    const unitCards=c.units.map((u,i)=>{
      const unitPage=pagesByNumber[i+3]||'';
      const studyPage=renderUnitStudyPage(unitPage);
      const known=done.includes(i);
      const unitHref='units/'+unitSlugs[c.id]+'-unit-'+(i+1)+'.html';
      const best=state.unitBest[`${c.id}:${i}`];
      return `<article class="unit-card unit-anchors" id="unit-${i+1}" data-unit-card="${i}" style="${toneStyle(c)}"><div class="unit-trigger-row"><button class="unit-trigger" data-open-unit="${i}" aria-expanded="${i===0}"><span class="unit-num">${numLabel(i)}</span><span class="unit-trigger-copy"><small>${esc(u.badge)}</small><strong>${esc(u.title)}</strong><span>${esc(u.tiny)}</span></span><span class="unit-check ${known?'done':''}" data-unit-check="${i}" aria-label="${known?'Unit complete':'Unit incomplete'}">✓</span></button><a class="button small secondary view-full-unit" href="${unitHref}">View full unit <span>↗</span></a></div><div class="unit-body"><div class="lesson-grid"><div class="lesson-main"><p class="lesson-kicker">THE IDEA IN SIMPLE WORDS</p><div class="lesson-simple">${esc(u.tiny)}</div><p class="lesson-explain">${esc(u.explain)}</p><p class="lesson-kicker">A WORKED EXAMPLE</p><div class="lesson-example">${esc(u.example)}</div><p class="lesson-kicker" style="margin-top:13px">WRITE IT LIKE THIS IN AN EXAM</p><p class="exam-answer">${esc(u.exam)}</p><div class="flash-wrap"><p class="lesson-kicker">ACTIVE RECALL · TAP TO REVEAL</p><div class="flashcard-row">${u.cards.map((card,j)=>`<button class="flash-pill" data-flash="${i}-${j}"><strong>${esc(card[0])}</strong><span hidden>${esc(card[1])}</span></button>`).join('')}</div></div></div><aside class="lesson-side"><div class="unit-goal"><span class="lesson-kicker">UNIT CHECKLIST</span><div class="unit-goal-item"><i>✓</i><span>Say the key idea in one sentence</span></div><div class="unit-goal-item"><i>✓</i><span>Walk through the worked example</span></div><div class="unit-goal-item"><i>✓</i><span>Try the unit mock at the end</span></div><button class="button small ${known?'success':'soft'} mark-unit" data-mark-unit="${i}">${known?'✓ Unit marked done':'Mark unit complete'}</button></div></aside></div>
      ${studyPage}
      <details class="full-note"><summary>Read the exact extracted page text · source PDF page ${i+3}</summary><pre>${esc(unitPage||'No extracted notes found for this page. Open the original guide from the study library.')}</pre></details>
      <section class="unit-test" aria-label="${esc(u.title)} mock test"><div class="unit-test-head"><div><strong>${esc(u.badge)} · UNIT MOCK</strong><span>3 questions · instant feedback · best score ${best===undefined?'—':`${best}%`}</span></div><button class="button small soft" data-unit-quiz-start="${i}">Start unit mock <span>→</span></button></div><div class="unit-test-body" id="unit-quiz-${c.id}-${i}"></div></section></div></article>`;
    }).join('');
    const page1=pagesByNumber[1]||'',page2=pagesByNumber[2]||'',lastPage=pagesByNumber[c.units.length+3]||'';
    return `<section class="course-hero" style="${toneStyle(c)}"><div class="course-title-line"><span class="course-big-icon">${c.icon}</span><div class="course-title-copy"><p class="eyebrow">${esc(c.tag.toUpperCase())} · BCA SEMESTER I</p><h1>${esc(c.title)}</h1><p>${esc(c.subtitle)}</p><span class="course-code">${esc(c.code)} · ${c.units.length} UNITS · COMPLETE NOTES INCLUDED</span></div></div><div class="course-hero-score"><strong id="course-best-score">${mock===undefined?'—':`${mock}%`}</strong><span>${mock===undefined?'best mock score':'best timed mock'}</span></div></section>
    <nav class="course-tabs" aria-label="Subject page sections"><button class="tab-button active" data-scroll="#course-units">Units & lessons</button><button class="tab-button" data-scroll="#course-lab">Interactive lab</button><button class="tab-button" data-scroll="#course-mock">Timed mock</button><button class="tab-button" data-scroll="#course-guide">Exam & sources</button></nav>
    <div class="progress-strip"><span class="label">Syllabus progress</span><div class="course-progress-line"><span id="course-progress-fill" style="width:${complete}%;background:${tone(c).accent}"></span></div><span id="course-progress-meta" class="meta">${done.length} / ${c.units.length} units complete</span></div>
    <section class="course-section" id="course-units"><div class="section-head"><div><h2 class="section-title">${esc(c.short)} · learn by unit</h2><p class="section-caption">Open any full unit for detailed lessons, worked examples, all guide concepts and answers, and a five-question mock.</p></div><span class="mini-pill">${c.units.length} UNIT MOCKS</span></div><div class="unit-grid">${unitCards}</div></section>
    <section class="course-section course-sections" id="course-lab"><div class="panel course-lab" style="${toneStyle(c)}"><div class="panel-heading"><div class="lab-title-line"><span class="lab-badge">✦</span><div><h3>${esc(c.lab.title)}</h3><p>${esc(c.lab.desc)}</p></div></div><span class="mini-pill">INTERACTIVE LAB</span></div><div class="lab-workbench">${labMarkup(c)}<div class="lab-output" id="lab-output" aria-live="polite">${labIntro(c)}</div></div></div><div class="panel mastery-chart"><div class="panel-heading"><div><h3>Unit mastery map</h3><p>Marks fill as you complete each unit.</p></div><span class="mini-pill">${complete}%</span></div><div class="chart">${c.units.map((u,i)=>`<div class="chart-row"><span class="chart-label">${esc(u.badge)}</span><div class="chart-track"><div class="chart-fill" data-unit-bar="${i}" style="width:${done.includes(i)?100:0}%;background:${tone(c).accent}"></div></div><span class="chart-value" data-unit-value="${i}">${done.includes(i)?'DONE':'OPEN'}</span></div>`).join('')}</div></div></section>
    <section class="course-section panel mock-panel" id="course-mock" style="${toneStyle(c)}"><div class="mock-overview"><div><p class="eyebrow">EXAM SIMULATOR</p><h2 class="section-title">Timed ${esc(c.short)} mock exam</h2><p class="section-caption">A complete pass across every unit. No hints while the clock runs; review answers and explanations at the end.</p><div class="mock-meta"><span>${c.units.reduce((n,_,i)=>n+((window.BCA_UNIT_QUIZZES?.[c.id]||[])[i]?.length||0),0)} questions</span><span>${mockDuration(c)} minutes</span><span>80%+ practice goal</span></div></div><button class="button violet" data-mock-start>Start timed mock <span>→</span></button></div><div class="mock-stage" id="mock-stage"></div></section>
    <section class="course-section" id="course-guide"><div class="section-head"><div><h2 class="section-title">Exam toolkit & original guide</h2><p class="section-caption">Course overview, how to use the guide, exam analysis, priorities, archive notes, and references from the supplied PDF.</p></div><a class="button small secondary" href="library/${encodeURIComponent(c.pdf)}" target="_blank" rel="noopener">Open original PDF ↗</a></div><div class="guide-pages"><details class="guide-page"><summary>Course cover and syllabus information · page 1</summary><pre>${esc(page1)}</pre></details><details class="guide-page"><summary>Guide instructions and contents · page 2</summary><pre>${esc(page2)}</pre></details><details class="guide-page"><summary>Exam pattern, paper analysis, priorities, and references · page ${c.units.length+3}</summary><pre>${esc(lastPage)}</pre></details></div>${c.id==='evs'?`<div class="evs-master"><div><strong>EVS deep practice · original 400-question quiz</strong><span>Unit sets, mixed rounds, answer explanations, and score tracking from your supplied file.</span></div><div class="source-actions"><a class="button small success" href="quizzes/environment-science-400q.html" target="_blank" rel="noopener">Open quiz in a new tab ↗</a><button class="button small secondary" data-toggle-evs-quiz>Embed here</button></div></div><div class="master-embed" id="master-embed"><iframe src="quizzes/environment-science-400q.html" title="Environmental Science 400 question interactive quiz" loading="lazy"></iframe></div>`:''}</section>`;
  }

  function renderUnitStudyPage(text){
    const normalized=String(text||'').replace(/\s+/g,' ').trim();
    const core=normalized.match(/Core ideas to remember\s+([\s\S]*?)\s+Important questions with model answers/i)?.[1]||'';
    const concepts=core.split(/\s+-\s+/).map(item=>item.trim()).filter(Boolean);
    const questionSection=normalized.split(/Important questions with model answers/i)[1]||'';
    const questions=questionSection.split(/Question:\s*/i).slice(1).map(part=>{
      const answerAt=part.indexOf('Model answer');
      if(answerAt<0)return null;
      return {question:part.slice(0,answerAt).trim(),answer:part.slice(answerAt+'Model answer'.length).trim()};
    }).filter(item=>item&&item.question&&item.answer);
    if(!concepts.length&&!questions.length)return '<div class="page-empty">The expanded study notes are unavailable. Open the original guide below.</div>';
    return `<section class="source-lesson"><div class="source-lesson-heading"><div><p class="lesson-kicker">COMPLETE UNIT NOTES · FROM YOUR GUIDE</p><h3>Learn the full unit</h3><p>Start with the key syllabus ideas, then study the worked answers as examples of exam writing.</p></div><span class="mini-pill">${concepts.length} CORE IDEAS · ${questions.length} MODEL ANSWERS</span></div>${concepts.length?`<div class="concept-list">${concepts.map((item,index)=>`<article class="concept-note"><span class="concept-number">${String(index+1).padStart(2,'0')}</span><p>${esc(item)}</p></article>`).join('')}</div>`:''}${questions.length?`<div class="source-questions"><div class="lesson-kicker">EXAM QUESTIONS · READ THE ANSWER, THEN COVER IT AND TRY AGAIN</div><div class="model-answer-grid">${questions.map((item,index)=>`<article class="model-answer-card"><div class="answer-label"><span>MODEL ANSWER ${String(index+1).padStart(2,'0')}</span><i>✦</i></div><h4>${esc(item.question)}</h4><div class="answer-divider"></div><p>${esc(item.answer)}</p></article>`).join('')}</div></div>`:''}<div class="source-study-cue"><span>↗</span><p><strong>Study move:</strong> close this section and explain two key ideas without looking. Then answer the unit mock at the end.</p></div></section>`;
  }

  function mockDuration(c){const count=(window.BCA_UNIT_QUIZZES?.[c.id]||[]).reduce((n,set)=>n+set.length,0);return Math.max(12,Math.ceil(count*1.25));}
  function labMarkup(c){
    switch(c.lab.type){
      case 'cpu':return `<div class="lab-flow">${['📥 Fetch','🧠 Decode','⚙️ Execute','💾 Store'].map((x,i)=>`${i?'<span class="flow-arrow">→</span>':''}<div class="flow-box" data-flow="${i}">${x}</div>`).join('')}</div><div class="lab-steps">${['Fetch','Decode','Execute','Store'].map((s,i)=>`<button class="lab-chip" data-cpu-step="${i}">Step ${i+1} · ${s}</button>`).join('')}</div>`;
      case 'ecosystem':return `<div class="lab-steps">${[['☀ Sun','sun'],['🌿 Grass','grass'],['🦗 Grasshopper','insect'],['🐸 Frog','frog'],['🦅 Hawk','hawk']].map(([label,key])=>`<button class="lab-chip" data-food="${key}">${label}</button>`).join('')}</div><div class="lab-flow" id="food-flow"></div>`;
      case 'sentence':return `<p style="color:#a5b1c5;font-size:9px;margin:0 0 8px">I packed my bag <b>___</b> the exam is tomorrow.</p><div class="input-row"><select class="lab-input" id="link-word"><option value="">Choose a linking word</option><option value="because">because</option><option value="although">although</option><option value="unless">unless</option></select><button class="button small soft" data-check-sentence>Check sentence</button></div>`;
      case 'panchanga':return `<div class="lab-steps">${[['Tithi','a lunar day'],['Vara','the weekday'],['Nakshatra','a lunar mansion'],['Yoga','a calculated angular relationship'],['Karana','half of a tithi']].map(([name,meaning])=>`<button class="lab-chip" data-calendar="${esc(name)}" data-meaning="${esc(meaning)}">${esc(name)}</button>`).join('')}</div>`;
      case 'sets':return `<div class="input-row"><input class="lab-input" id="set-a" value="1, 2, 3" aria-label="Set A" placeholder="Set A · 1, 2, 3"><input class="lab-input" id="set-b" value="2, 3, 4" aria-label="Set B" placeholder="Set B · 2, 3, 4"><button class="button small soft" data-calculate-sets>Compare sets</button></div>`;
      case 'algorithm':return `<div class="input-row"><label for="reverse-input" style="color:#a0adc1;font-size:9px">Number</label><input class="lab-input" id="reverse-input" type="number" min="0" max="999999999" value="582"><button class="button small soft" data-reverse>Run algorithm</button></div><ol id="algorithm-steps" style="margin:8px 0 0;padding-left:18px;color:#a5b1c5;font-size:8px;line-height:1.8"></ol>`;
      default:return '';
    }
  }
  function labIntro(c){return ({cpu:'The instruction cycle is ready. Tap Fetch to begin.',ecosystem:'Start with sunlight, then tap the organisms in food-chain order.',sentence:'Choose the word that explains why the bag is packed.',panchanga:'Tap a calendar clue to reveal its meaning.',sets:'Union collects items from both sets. Intersection keeps shared items.',algorithm:'Watch how each digit moves to build the reversed number.'})[c.lab.type]||'Choose an activity to begin.';}

  function renderPlan(){
    return `<div class="page-head"><div><p class="eyebrow">YOUR STUDY ROUTINE</p><h1>Turn today into a focused session.</h1><p class="page-subtitle">A short repeatable loop that makes you practise remembering, not only rereading.</p></div></div><div class="plan-layout"><section class="panel plan-card"><div class="panel-heading"><div><h3>Today's 25-minute study sprint</h3><p>Pick one subject, then move through the three stages.</p></div><span class="mini-pill">LEARN · APPLY · RECALL</span></div><div class="plan-checklist"><div class="plan-item"><span class="step-number">01</span><div><strong>Study one unit · 10 minutes</strong><span>Read the friendly overview, then open the complete notes and model answers.</span></div></div><div class="plan-item"><span class="step-number">02</span><div><strong>Use the interactive lab · 5 minutes</strong><span>Make an idea visible: move an instruction, build a food chain, or solve a small set.</span></div></div><div class="plan-item"><span class="step-number">03</span><div><strong>Take the unit mock · 5 minutes</strong><span>Answer without looking, read each explanation, and revisit any missed idea.</span></div></div><div class="plan-item"><span class="step-number">04</span><div><strong>End with active recall · 5 minutes</strong><span>Close the notes and explain the concept in your own simple words.</span></div></div></div><div class="input-row" style="margin-top:14px"><select class="lab-input" id="plan-course" aria-label="Choose a subject">${courses.map(c=>`<option value="${c.id}">${esc(c.short)}</option>`).join('')}</select><button class="button primary" data-start-plan>Open my next unit ↗</button></div></section><aside class="plan-tip"><span style="font-size:22px">🧭</span><h3>The 80% practice target</h3><p>When you score below 80%, do not just repeat the full test. Open the unit behind a missed answer, explain the idea without notes, then try that unit's three-question mock again.</p><div class="achievement-row"><span class="achievement earned">Short lessons</span><span class="achievement earned">Unit tests</span><span class="achievement earned">Timed mock</span></div><p style="margin-top:12px">Your progress and highest scores stay in this browser on this device.</p></aside></div><section class="section"><div class="section-head"><div><h2 class="section-title">The semester map</h2><p class="section-caption">Mark a unit complete as you learn. Try to finish every unit before the course mock.</p></div></div><div class="subject-grid">${courses.map(courseCard).join('')}</div></section><section class="section panel"><div class="panel-heading"><div><h3>Progress you can see</h3><p>Unit completion by subject.</p></div></div><div class="progress-visual-grid">${courses.map(c=>`<div class="visual-bar-col"><div class="visual-bar" style="--accent:${tone(c).accent};height:${Math.max(4,completion(c))}%" title="${completion(c)}% complete"></div><span class="visual-bar-label">${esc(c.short)}</span></div>`).join('')}</div></section>`;
  }

  function renderLibrary(){
    return `<section class="library-hero"><p class="eyebrow">THE COMPLETE REFERENCE SHELF</p><h1>All the source material. One click away.</h1><p>Each subject page contains the complete extracted text from its supplied guide, placed inside the matching unit. Keep the PDFs here for the original layout and references.</p></section><div class="source-grid">${courses.map(c=>`<article class="source-card"><span class="source-icon">▤</span><div class="source-copy"><strong>${esc(c.title)}</strong><span>${esc(c.code)} · ${c.units.length} units · full guide text is integrated unit by unit</span><div class="source-actions"><a href="${subjectHref(c.id)}">Open subject page ↗</a><a href="library/${encodeURIComponent(c.pdf)}" target="_blank" rel="noopener">Open original PDF ↗</a><a href="library/${encodeURIComponent(c.pdf)}" download>Save PDF ↓</a></div></div></article>`).join('')}</div><section class="section panel" style="background:linear-gradient(112deg,#10291f,#101d2a);border-color:#28513e"><div class="panel-heading"><div><h3>Environmental Science · 400-question quiz</h3><p>Original interactive mock test supplied with the study files.</p></div><span class="subject-icon" style="--accent:#65e0a8;--tint:rgba(101,224,168,.12);background:var(--tint)">🌿</span></div><p class="page-subtitle">Includes mixed and unit-wise rounds, answer explanations, and a score summary.</p><div class="source-actions"><a class="button small success" href="quizzes/environment-science-400q.html" target="_blank" rel="noopener">Open full 400-question quiz ↗</a><a class="button small secondary" href="environmental-science.html#course-mock">Open the EVS course mock ↗</a><a class="button small secondary" href="quizzes/environment-science-400q.html" download>Save quiz file ↓</a></div></section><p class="source-page-note">The supplied notes follow a CCSU BCA Semester I 2025–26 syllabus reproduction. Exam-pattern observations and archive coverage remain the notes' own evidence statements; use them as revision guidance and verify current instructions with your course.</p>`;
  }

  function bindCourseAnchors(){
    const match=location.hash.match(/^#unit-(\d+)$/);
    if(match){const index=Number(match[1])-1;const card=app.querySelector(`[data-unit-card="${index}"]`);if(card){card.classList.add('open');card.querySelector('[data-open-unit]')?.setAttribute('aria-expanded','true');setTimeout(()=>card.scrollIntoView({behavior:'smooth',block:'center'}),90);}}
    else if(location.hash){const target=app.querySelector(location.hash);if(target)setTimeout(()=>target.scrollIntoView({behavior:'smooth',block:'start'}),90);}
  }

  function handleAppClick(event){
    const target=event.target.closest('button,a');if(!target)return;
    if(target.matches('[data-open-unit]')){const card=target.closest('.unit-card');const open=!card.classList.contains('open');card.classList.toggle('open',open);target.setAttribute('aria-expanded',String(open));return;}
    if(target.matches('[data-flash]')){const answer=target.querySelector('span');answer.hidden=!answer.hidden;return;}
    if(target.matches('[data-mark-unit]')){markUnit(Number(target.dataset.markUnit),target);return;}
    if(target.matches('[data-unit-quiz-start]')){startUnitQuiz(Number(target.dataset.unitQuizStart));return;}
    if(target.matches('[data-unit-answer]')){chooseUnitAnswer(Number(target.dataset.unitAnswer));return;}
    if(target.matches('[data-unit-check]')){submitUnitAnswer();return;}
    if(target.matches('[data-unit-next]')){nextUnitQuestion();return;}
    if(target.matches('[data-unit-retry]')){startUnitQuiz(Number(target.dataset.unitIndex));return;}
    if(target.matches('[data-mock-start]')){startMock();return;}
    if(target.matches('[data-mock-option]')){selectMockAnswer(Number(target.dataset.mockOption));return;}
    if(target.matches('[data-mock-nav]')){goMockQuestion(Number(target.dataset.mockNav));return;}
    if(target.matches('[data-mock-prev]')){goMockQuestion(Math.max(0,activeMock.index-1));return;}
    if(target.matches('[data-mock-next]')){goMockQuestion(Math.min(activeMock.items.length-1,activeMock.index+1));return;}
    if(target.matches('[data-mock-finish]')){finishMock();return;}
    if(target.matches('[data-mock-again]')){startMock();return;}
    if(target.matches('[data-toggle-evs-quiz]')){toggleEvsQuiz(target);return;}
    if(target.matches('[data-scroll]')){app.querySelectorAll('.tab-button').forEach(b=>b.classList.toggle('active',b===target));app.querySelector(target.dataset.scroll)?.scrollIntoView({behavior:'smooth',block:'start'});return;}
    if(target.matches('[data-start-plan]')){startPlan();return;}
    if(target.matches('[data-cpu-step]')){cpuStep(target);return;}
    if(target.matches('[data-food]')){foodStep(target);return;}
    if(target.matches('[data-check-sentence]')){checkSentence();return;}
    if(target.matches('[data-calendar]')){calendarStep(target);return;}
    if(target.matches('[data-calculate-sets]')){calculateSets();return;}
    if(target.matches('[data-reverse]')){reverseNumber();return;}
  }

  function markUnit(index,button){
    if(!course)return;const list=doneUnits(course);const at=list.indexOf(index);
    if(at>=0)list.splice(at,1);else list.push(index);list.sort((a,b)=>a-b);state.completed[course.id]=list;saveState();
    const isDone=list.includes(index);button.classList.toggle('success',isDone);button.classList.toggle('soft',!isDone);button.textContent=isDone?'✓ Unit marked done':'Mark unit complete';
    app.querySelector(`[data-unit-check="${index}"]`)?.classList.toggle('done',isDone);
    const percent=completion(course);const fill=app.querySelector('#course-progress-fill');if(fill)fill.style.width=`${percent}%`;
    const meta=app.querySelector('#course-progress-meta');if(meta)meta.textContent=`${list.length} / ${course.units.length} units complete`;
    app.querySelector(`[data-unit-bar="${index}"]`)?.style.setProperty('width',isDone?'100%':'0%');
    const label=app.querySelector(`[data-unit-value="${index}"]`);if(label)label.textContent=isDone?'DONE':'OPEN';
    document.querySelectorAll(`.subject-card[href="${subjectHref(course.id)}"] .course-progress-line span`).forEach(x=>x.style.width=`${percent}%`);
  }

  function startUnitQuiz(index){
    const items=((window.BCA_UNIT_QUIZZES?.[course?.id]||[])[index]||[]).map(shuffledQuestion);if(!items.length)return;
    activeUnitQuiz={courseId:course.id,unitIndex:index,items,index:0,score:0,selected:-1,answered:false};renderUnitQuestion();
  }
  function unitQuizRoot(){return document.getElementById(`unit-quiz-${activeUnitQuiz.courseId}-${activeUnitQuiz.unitIndex}`);}
  function renderUnitQuestion(){
    const root=unitQuizRoot();if(!root||!activeUnitQuiz)return;
    const run=activeUnitQuiz,q=run.items[run.index];
    root.innerHTML=`<div class="quiz-stage"><div class="quiz-topline"><span>Question ${run.index+1} of ${run.items.length}</span><span>Score ${run.score}</span></div><div class="quiz-progress"><span style="width:${run.index/run.items.length*100}%"></span></div><h4 class="quiz-question">${esc(q.q)}</h4><div class="quiz-options">${q.o.map((option,i)=>`<button class="quiz-option" data-unit-answer="${i}" aria-pressed="false">${String.fromCharCode(65+i)} · ${esc(option)}</button>`).join('')}</div><div class="quiz-feedback" hidden id="unit-feedback"></div><div class="quiz-actions"><button class="button small primary" data-unit-check>Check answer</button><button class="button small primary" data-unit-next hidden>${run.index===run.items.length-1?'See unit result':'Next question →'}</button></div></div>`;
  }
  function chooseUnitAnswer(index){if(!activeUnitQuiz||activeUnitQuiz.answered)return;activeUnitQuiz.selected=index;const root=unitQuizRoot();root?.querySelectorAll('[data-unit-answer]').forEach(button=>{button.classList.toggle('selected',Number(button.dataset.unitAnswer)===index);button.setAttribute('aria-pressed',String(Number(button.dataset.unitAnswer)===index));});}
  function submitUnitAnswer(){
    const run=activeUnitQuiz;if(!run||run.answered)return;const root=unitQuizRoot(),q=run.items[run.index],feedback=root.querySelector('#unit-feedback');
    if(run.selected<0){feedback.hidden=false;feedback.className='quiz-feedback wrong';feedback.textContent='Choose an answer first. Then check it.';return;}
    const correct=run.selected===q.c;run.answered=true;if(correct)run.score++;
    root.querySelectorAll('[data-unit-answer]').forEach((button,i)=>{button.disabled=true;if(i===q.c)button.classList.add('correct');if(i===run.selected&&!correct)button.classList.add('wrong');});
    feedback.hidden=false;feedback.className=`quiz-feedback ${correct?'correct':'wrong'}`;feedback.textContent=`${correct?'Correct.':'Not quite. The answer is '+String.fromCharCode(65+q.c)+'.'} ${q.e}`;
    root.querySelector('[data-unit-check]').hidden=true;root.querySelector('[data-unit-next]').hidden=false;
  }
  function nextUnitQuestion(){
    const run=activeUnitQuiz;if(!run)return;run.index++;
    if(run.index>=run.items.length){finishUnitQuiz();return;}
    run.selected=-1;run.answered=false;renderUnitQuestion();
  }
  function finishUnitQuiz(){
    const run=activeUnitQuiz,c=byId[run.courseId],score=pct(run.score,run.items.length),key=`${run.courseId}:${run.unitIndex}`;
    state.unitBest[key]=Math.max(state.unitBest[key]||0,score);state.attempts[run.courseId]=(state.attempts[run.courseId]||0)+1;state.last[run.courseId]=score;
    state.best[run.courseId]=Math.max(state.best[run.courseId]||0,score);saveState();
    const root=unitQuizRoot();if(!root)return;
    root.innerHTML=`<div class="quiz-result"><div class="result-medal">${score>=80?'🏅':score>=60?'✨':'🌱'}</div><h3>${score>=80?'Unit locked in!':score>=60?'Good recall. Review one idea.':'Open the lesson and try again.'}</h3><div class="result-score">${run.score} / ${run.items.length} · ${score}%</div><p>Your best score for this unit is ${state.unitBest[key]}%. ${score>=80?'You reached the practice goal.':`Revisit ${esc(c.units[run.unitIndex].title)}, then retake this unit mock.`}</p><div class="quiz-actions" style="justify-content:center"><button class="button small secondary" data-unit-retry>Retake this unit mock</button></div></div>`;
    root.querySelector('[data-unit-retry]').dataset.unitIndex=String(run.unitIndex);
    const head=root.closest('.unit-test')?.querySelector('.unit-test-head span');if(head)head.textContent=`3 questions · instant feedback · best score ${state.unitBest[key]}%`;
    const top=app.querySelector('#course-best-score');if(top&&state.mockBest[c.id]===undefined){top.textContent=`${state.best[c.id]}%`;top.nextElementSibling.textContent='best unit quiz';}
  }

  function shuffle(list){const copy=list.slice();for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}
  function shuffledQuestion(q){const choices=shuffle(q.o.map((text,index)=>({text,index})));return {...q,o:choices.map(item=>item.text),c:choices.findIndex(item=>item.index===q.c)};}
  function mockQuestions(c){return (window.BCA_UNIT_QUIZZES?.[c.id]||[]).flat().map((q,i)=>({...shuffledQuestion(q),unitIndex:(window.BCA_UNIT_QUIZZES?.[c.id]||[]).findIndex(set=>set.includes(q)),questionNo:i+1}));}
  function startMock(){
    if(!course)return;clearInterval(mockTimer);const items=shuffle(mockQuestions(course));
    activeMock={courseId:course.id,items,index:0,answers:Array(items.length).fill(null),endsAt:Date.now()+mockDuration(course)*60*1000};
    renderMock();mockTimer=setInterval(updateMockTimer,1000);
  }
  function renderMock(){
    const stage=app.querySelector('#mock-stage');if(!stage||!activeMock)return;
    const run=activeMock,q=run.items[run.index],picked=run.answers[run.index];
    stage.innerHTML=`<div class="mock-controls"><div><span class="mock-timer" id="mock-timer">${formatTime(run.endsAt-Date.now())}</span><span class="chart-value" style="margin-left:8px">REMAINING</span></div><span class="chart-value">${run.answers.filter(a=>a!==null).length} / ${run.items.length} answered</span></div><div class="quiz-topline"><span>Question ${run.index+1} of ${run.items.length} · ${esc(course.units[q.unitIndex]?.badge||'REVIEW')}</span><span>Choose one option</span></div><div class="quiz-progress"><span style="width:${run.index/run.items.length*100}%"></span></div><h3 class="quiz-question">${esc(q.q)}</h3><div class="quiz-options">${q.o.map((option,i)=>`<button class="quiz-option ${picked===i?'selected':''}" data-mock-option="${i}" aria-pressed="${picked===i}">${String.fromCharCode(65+i)} · ${esc(option)}</button>`).join('')}</div><div class="mock-grid" aria-label="Jump to a question">${run.items.map((_,i)=>`<button class="mock-jump ${run.answers[i]!==null?'answered':''} ${i===run.index?'current':''}" data-mock-nav="${i}" aria-label="Go to question ${i+1}">${i+1}</button>`).join('')}</div><div class="quiz-actions"><button class="button small secondary" data-mock-prev ${run.index===0?'disabled':''}>← Previous</button><button class="button small secondary" data-mock-next ${run.index===run.items.length-1?'disabled':''}>Next →</button><button class="button small violet" data-mock-finish>Finish mock</button></div>`;
  }
  function selectMockAnswer(index){if(!activeMock)return;activeMock.answers[activeMock.index]=index;const stage=app.querySelector('#mock-stage');stage.querySelectorAll('[data-mock-option]').forEach(b=>{const selected=Number(b.dataset.mockOption)===index;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});const answered=activeMock.answers.filter(x=>x!==null).length;stage.querySelector('.mock-controls .chart-value:last-child').textContent=`${answered} / ${activeMock.items.length} answered`;stage.querySelectorAll('[data-mock-nav]').forEach(b=>b.classList.toggle('answered',activeMock.answers[Number(b.dataset.mockNav)]!==null));}
  function goMockQuestion(index){if(!activeMock)return;activeMock.index=index;renderMock();}
  function formatTime(ms){const sec=Math.max(0,Math.ceil(ms/1000));return `${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;}
  function updateMockTimer(){if(!activeMock)return;const left=activeMock.endsAt-Date.now();const timer=document.getElementById('mock-timer');if(timer)timer.textContent=formatTime(left);if(left<=0)finishMock(true);}
  function finishMock(expired=false){
    if(!activeMock)return;clearInterval(mockTimer);const run=activeMock,c=byId[run.courseId];
    const score=run.items.reduce((n,q,i)=>n+(run.answers[i]===q.c?1:0),0),percent=pct(score,run.items.length);
    state.mockBest[c.id]=Math.max(state.mockBest[c.id]||0,percent);state.best[c.id]=Math.max(state.best[c.id]||0,percent);state.last[c.id]=percent;state.attempts[c.id]=(state.attempts[c.id]||0)+1;saveState();
    const misses=run.items.map((q,i)=>({q,answer:run.answers[i]})).filter(x=>x.answer!==x.q.c);
    const stage=app.querySelector('#mock-stage');
    stage.innerHTML=`<div class="quiz-result"><div class="result-medal">${percent>=80?'🏆':percent>=60?'✧':'🌱'}</div><h3>${expired?'Time is up. Here is your result.':percent>=80?'80% practice goal reached.':percent>=60?'A solid start. Review and grow.':'Use the review to choose your next step.'}</h3><div class="result-score">${score} / ${run.items.length} · ${percent}%</div><p>${percent>=80?'Excellent practice. Revisit the missed answers once, then take another mixed paper later.':'Read every correction, open the unit behind a missed question, and try that unit mock again.'} ${run.answers.filter(a=>a===null).length?`${run.answers.filter(a=>a===null).length} unanswered question(s) were scored as incorrect.`:''}</p><div class="quiz-actions" style="justify-content:center"><button class="button small secondary" data-mock-again>Try a fresh mock</button></div></div><div class="mock-review">${misses.map(({q,answer})=>`<article class="review-item missed"><strong>${esc(q.unitIndex>=0?c.units[q.unitIndex].title:'Review')} · ${answer===null?'Not answered':'Review this answer'}</strong>${esc(q.q)}<br><span>Your answer: ${answer===null?'No answer':esc(q.o[answer])} · Correct: ${esc(q.o[q.c])}</span><br>${esc(q.e)}${q.unitIndex>=0?`<br><a class="text-link" href="${subjectHref(c.id)}#unit-${q.unitIndex+1}">Open this unit ↗</a>`:''}</article>`).join('')||'<article class="review-item correct"><strong>Perfect paper</strong>You answered every question correctly. Keep revising across all units to make it stick.</article>'}</div>`;
    const top=app.querySelector('#course-best-score');if(top){top.textContent=`${state.mockBest[c.id]}%`;top.nextElementSibling.textContent='best timed mock';}
  }

  function startPlan(){const id=app.querySelector('#plan-course')?.value||courses[0].id;const c=byId[id];const next=c.units.findIndex((_,i)=>!doneUnits(c).includes(i));location.href=`${subjectHref(id)}#unit-${next<0?1:next+1}`;}
  function toggleEvsQuiz(button){const embed=app.querySelector('#master-embed');if(!embed)return;embed.classList.toggle('open');button.textContent=embed.classList.contains('open')?'Hide embedded quiz ↑':'Embed here';if(embed.classList.contains('open'))setTimeout(()=>embed.scrollIntoView({behavior:'smooth',block:'start'}),50);}

  function cpuStep(button){const i=Number(button.dataset.cpuStep);const messages=['The program counter points to the next instruction. Fetch it from memory.','The control unit reads the instruction and identifies its operation and operands.','The ALU, registers, or memory carry out the requested work.','Store the result, then move to the next instruction or branch target.'];app.querySelectorAll('[data-flow]').forEach(x=>x.classList.toggle('active',Number(x.dataset.flow)===i));app.querySelectorAll('[data-cpu-step]').forEach(x=>x.classList.toggle('active',x===button));app.querySelector('#lab-output').textContent=messages[i];}
  function foodStep(button){const key=button.dataset.food,order=['sun','grass','insect','frog','hawk'];if(key==='sun')foodPath=['sun'];else{const at=order.indexOf(key);if(foodPath.includes(key))foodPath=foodPath.filter(x=>x!==key);else if(at>0&&foodPath.includes(order[at-1]))foodPath.push(key);else foodPath=[key];}button.classList.toggle('active',foodPath.includes(key));const labels={sun:'☀ Sunlight',grass:'🌿 Grass',insect:'🦗 Grasshopper',frog:'🐸 Frog',hawk:'🦅 Hawk'};app.querySelector('#food-flow').innerHTML=foodPath.map((x,i)=>`${i?'<span class="flow-arrow">→</span>':''}<div class="flow-box active">${labels[x]}</div>`).join('');app.querySelector('#lab-output').textContent=foodPath.length<2?'Energy begins with sunlight. Add grass to continue the chain.':`${foodPath.map(x=>labels[x].split(' ').slice(1).join(' ')).join(' → ')}. Energy moves along a food chain; some is lost as heat at each step.`;}
  function checkSentence(){const answer=app.querySelector('#link-word').value;app.querySelector('#lab-output').textContent=answer==='because'?'Correct. “Because” introduces the reason the bag is packed.':'Try “because”: it introduces the reason for packing the bag.';}
  function calendarStep(button){app.querySelectorAll('[data-calendar]').forEach(x=>x.classList.toggle('active',x===button));app.querySelector('#lab-output').textContent=`${button.dataset.calendar}: ${button.dataset.meaning}.`;}
  function calculateSets(){const parse=id=>new Set(app.querySelector(id).value.split(',').map(x=>x.trim()).filter(Boolean));const a=parse('#set-a'),b=parse('#set-b'),union=new Set([...a,...b]),intersection=[...a].filter(x=>b.has(x)),onlyA=[...a].filter(x=>!b.has(x));app.querySelector('#lab-output').textContent=`A ∪ B = {${[...union].join(', ')}} · A ∩ B = {${intersection.join(', ')||'∅'}} · A only = {${onlyA.join(', ')||'∅'}}.`;}
  function reverseNumber(){const n0=Math.floor(Math.abs(Number(app.querySelector('#reverse-input').value)||0));if(n0>999999999){app.querySelector('#lab-output').textContent='Choose a number with up to 9 digits.';return;}let n=n0,reverse=0,lines=[];if(n===0)lines.push('The number is 0, so the reverse is 0.');while(n>0){const digit=n%10;reverse=reverse*10+digit;lines.push(`Take last digit ${digit}; new reverse = ${reverse}; remove the last digit.`);n=Math.floor(n/10);}app.querySelector('#algorithm-steps').innerHTML=lines.map(x=>`<li>${esc(x)}</li>`).join('');app.querySelector('#lab-output').textContent=`Finished: reversed number = ${reverse}.`;}

  function openSearch(){overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');searchInput.value='';renderSearch('');setTimeout(()=>searchInput.focus(),30);}
  function closeSearch(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');}
  function renderSearch(query){
    const root=document.getElementById('search-results'),q=query.trim().toLowerCase();if(!q){root.innerHTML=`<a class="search-result" href="index.html#subjects"><strong>Browse all six subject pages</strong><span>Open a course, unit lesson, mock test, or source guide.</span></a>`;return;}
    const results=[];
    for(const c of courses){
      if(`${c.title} ${c.code} ${c.intro}`.toLowerCase().includes(q))results.push({href:subjectHref(c.id),title:c.title,sub:`Subject · ${c.code}`});
      c.units.forEach((u,i)=>{if(`${u.title} ${u.tiny} ${u.explain} ${u.example} ${u.exam} ${u.cards.flat().join(' ')}`.toLowerCase().includes(q))results.push({href:`${subjectHref(c.id)}#unit-${i+1}`,title:u.title,sub:`${c.short} · unit ${i+1}`});});
      const guide=window.BCA_GUIDES?.[c.id]||'';if(guide.toLowerCase().includes(q))results.push({href:`${subjectHref(c.id)}#course-guide`,title:'Exam map and complete source guide',sub:`${c.short} · supplied PDF notes`});
    }
    root.innerHTML=results.length?results.slice(0,16).map(x=>`<a class="search-result" href="${x.href}"><strong>${esc(x.title)}</strong><span>${esc(x.sub)}</span></a>`).join(''):'<div class="page-empty">No matches yet. Try a shorter word or another subject name.</div>';
  }
  function closeMobileMenu(){document.getElementById('sidebar').classList.remove('open');document.getElementById('mobile-backdrop').classList.remove('open');document.getElementById('menu-toggle').setAttribute('aria-expanded','false');}

  buildSubjectNav();setShell();
  document.getElementById('menu-toggle').addEventListener('click',event=>{const sidebar=document.getElementById('sidebar');sidebar.classList.toggle('open');const open=sidebar.classList.contains('open');document.getElementById('mobile-backdrop').classList.toggle('open',open);event.currentTarget.setAttribute('aria-expanded',String(open));});
  document.getElementById('mobile-backdrop').addEventListener('click',closeMobileMenu);
  document.getElementById('search-open').addEventListener('click',openSearch);
  document.getElementById('search-close').addEventListener('click',closeSearch);
  searchInput.addEventListener('input',()=>renderSearch(searchInput.value));
  overlay.addEventListener('click',event=>{if(event.target===overlay||event.target.closest('a[href]'))closeSearch();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeSearch();closeMobileMenu();}});
  window.addEventListener('hashchange',()=>{if(pageType==='home'&&location.hash==='#subjects')document.getElementById('subjects')?.scrollIntoView({behavior:'smooth'});if(pageType==='course'&&course)bindCourseAnchors();});
  render();
})();
