(() => {
  const courseId = document.body.dataset.course || '';
  const unitIndex = Number(document.body.dataset.unitIndex);
  const storageKey = 'bcasema-learning-v1';
  const stage = document.getElementById('unit-quiz-stage');
  const bestLabel = document.getElementById('unit-best');
  const markButton = document.getElementById('mark-unit-done');
  const note = document.getElementById('unit-progress-note');
  let questions = [];
  let run = null;

  try {
    questions = JSON.parse(document.getElementById('unit-quiz-data')?.textContent || '[]');
  } catch {
    questions = [];
  }
  function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }
  function readState() {
    try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); }
    catch { return {}; }
  }
  function saveState(state) {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch {}
  }
  function unitKey() { return courseId + ':' + unitIndex; }
  function completionState() {
    const state = readState();
    state.completed = state.completed || {};
    state.unitBest = state.unitBest || {};
    state.attempts = state.attempts || {};
    state.best = state.best || {};
    state.last = state.last || {};
    return state;
  }
  function updateProgress() {
    const state = completionState();
    const done = Array.isArray(state.completed[courseId]) ? state.completed[courseId] : [];
    const isDone = done.includes(unitIndex);
    if (markButton) {
      markButton.textContent = isDone ? '✓ Unit marked complete' : 'Mark unit complete';
      markButton.classList.toggle('success', isDone);
      markButton.classList.toggle('soft', !isDone);
    }
    if (bestLabel) bestLabel.textContent = Number.isFinite(state.unitBest[unitKey()]) ? state.unitBest[unitKey()] + '%' : '—';
  }
  function toggleComplete() {
    const state = completionState();
    const done = Array.isArray(state.completed[courseId]) ? state.completed[courseId].slice() : [];
    const position = done.indexOf(unitIndex);
    if (position >= 0) done.splice(position, 1);
    else done.push(unitIndex);
    done.sort((a, b) => a - b);
    state.completed[courseId] = done;
    saveState(state);
    updateProgress();
    if (note) note.textContent = position >= 0 ? 'Unit completion removed.' : 'Progress saved on this device.';
  }
  function begin() {
    if (!questions.length) return;
    run = {index:0, score:0, selected:-1, answered:false};
    drawQuestion();
  }
  function drawQuestion() {
    if (!stage || !run) return;
    const q = questions[run.index];
    stage.innerHTML =
      '<div class="quiz-stage"><div class="quiz-topline"><span>Question ' + (run.index + 1) + ' of ' + questions.length +
      '</span><span>Score ' + run.score + '</span></div><div class="quiz-progress"><span style="width:' +
      Math.round(run.index / questions.length * 100) + '%"></span></div><h3 class="quiz-question">' + esc(q.q) +
      '</h3><div class="quiz-options">' + q.o.map((option, i) =>
        '<button class="quiz-option" data-answer="' + i + '" aria-pressed="false">' +
        String.fromCharCode(65 + i) + ' · ' + esc(option) + '</button>'
      ).join('') + '</div><div class="quiz-feedback" id="quiz-feedback" hidden></div><div class="quiz-actions">' +
      '<button class="button small primary" data-check>Check answer</button><button class="button small primary" data-next hidden>' +
      (run.index === questions.length - 1 ? 'See results' : 'Next question →') + '</button></div></div>';
  }
  function choose(index) {
    if (!run || run.answered) return;
    run.selected = index;
    stage.querySelectorAll('[data-answer]').forEach(button => {
      const picked = Number(button.dataset.answer) === index;
      button.classList.toggle('selected', picked);
      button.setAttribute('aria-pressed', String(picked));
    });
  }
  function check() {
    if (!run || run.answered) return;
    const q = questions[run.index];
    const feedback = stage.querySelector('#quiz-feedback');
    if (run.selected < 0) {
      feedback.hidden = false;
      feedback.className = 'quiz-feedback wrong';
      feedback.textContent = 'Choose an answer first, then check it.';
      return;
    }
    const correct = run.selected === q.c;
    run.answered = true;
    if (correct) run.score++;
    stage.querySelectorAll('[data-answer]').forEach((button, i) => {
      button.disabled = true;
      if (i === q.c) button.classList.add('correct');
      if (i === run.selected && !correct) button.classList.add('wrong');
    });
    feedback.hidden = false;
    feedback.className = 'quiz-feedback ' + (correct ? 'correct' : 'wrong');
    feedback.textContent = (correct ? 'Correct. ' : 'Not quite. The answer is ' + String.fromCharCode(65 + q.c) + '. ') + q.e;
    stage.querySelector('[data-check]').hidden = true;
    stage.querySelector('[data-next]').hidden = false;
  }
  function next() {
    if (!run) return;
    run.index++;
    if (run.index >= questions.length) return finish();
    run.selected = -1;
    run.answered = false;
    drawQuestion();
  }
  function finish() {
    if (!run || !stage) return;
    const score = Math.round(run.score / questions.length * 100);
    const state = completionState();
    state.unitBest[unitKey()] = Math.max(Number(state.unitBest[unitKey()] || 0), score);
    state.best[courseId] = Math.max(Number(state.best[courseId] || 0), score);
    state.last[courseId] = score;
    state.attempts[courseId] = Number(state.attempts[courseId] || 0) + 1;
    saveState(state);
    updateProgress();
    stage.innerHTML =
      '<div class="quiz-result"><div class="result-medal">' + (score >= 80 ? '🏅' : score >= 60 ? '✨' : '🌱') +
      '</div><h3>' + (score >= 80 ? 'Unit locked in!' : score >= 60 ? 'Good recall. Review one idea.' : 'Review the lesson and try again.') +
      '</h3><div class="result-score">' + run.score + ' / ' + questions.length + ' · ' + score + '%</div><p>Your best score for this unit is ' +
      state.unitBest[unitKey()] + '%. ' + (score >= 80 ? 'You reached the practice goal.' : 'Revisit the lesson, then retake this mock.') +
      '</p><button class="button small secondary" data-retry>Retake this unit mock</button></div>';
    run = null;
  }
  stage?.addEventListener('click', event => {
    const target = event.target.closest('button');
    if (!target) return;
    if (target.id === 'unit-quiz-start' || target.matches('[data-retry]')) begin();
    else if (target.matches('[data-answer]')) choose(Number(target.dataset.answer));
    else if (target.matches('[data-check]')) check();
    else if (target.matches('[data-next]')) next();
  });
  markButton?.addEventListener('click', toggleComplete);
  updateProgress();
})();
