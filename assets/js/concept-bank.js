(() => {
  const courses = window.BCA_COURSES || [];
  const base = window.BCA_UNIT_CONCEPT_NOTES || {};
  const added = window.BCA_UNIT_SUBTOPICS || {};
  const advanced = window.BCA_UNIT_ADVANCED_SUBTOPICS || {};
  const master = window.BCA_UNIT_MASTER_TOPICS || {};
  const masterExtra = window.BCA_UNIT_MASTER_TOPICS_EXTRA || {};
  const masterStem = window.BCA_UNIT_MASTER_TOPICS_STEM || {};
  const slugs = {architecture:'computer-architecture',evs:'environmental-science',english:'general-english',iks:'indian-knowledge-system',math:'mathematical-foundations','problem-solving':'problem-solving'};
  const search = document.getElementById('bank-search');
  const subject = document.getElementById('bank-subject');
  const unit = document.getElementById('bank-unit');
  const results = document.getElementById('bank-results');
  const count = document.getElementById('bank-result-count');
  const total = document.getElementById('bank-total');
  const more = document.getElementById('bank-more');
  const endNote = document.getElementById('bank-end-note');
  const empty = document.getElementById('bank-empty');
  const clear = document.getElementById('bank-clear');
  const pageSize = 28;
  let visible = pageSize;
  const library = [];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  courses.forEach(course => {
    (course.units || []).forEach((unitInfo, unitIndex) => {
      const topics = (base[course.id]?.[unitIndex] || [])
        .concat(added[course.id]?.[unitIndex] || [])
        .concat(advanced[course.id]?.[unitIndex] || [])
        .concat(master[course.id]?.[unitIndex] || [])
        .concat(masterExtra[course.id]?.[unitIndex] || [])
        .concat(masterStem[course.id]?.[unitIndex] || []);
      topics.forEach((topic, topicIndex) => library.push({
        course, unit:unitInfo, unitIndex, topicIndex,
        topic,
        href:'units/' + slugs[course.id] + '-unit-' + (unitIndex + 1) + '.html#concept-' + (topicIndex + 1)
      }));
    });
  });
  total.textContent = String(library.length);
  courses.forEach(course => subject.add(new Option(course.short, course.id)));

  function updateUnitOptions() {
    const selected = subject.value;
    const current = unit.value;
    unit.innerHTML = '<option value="">All units</option>';
    courses.filter(course => !selected || course.id === selected).forEach(course => {
      course.units.forEach((item, index) => {
        const option = new Option(course.short + ' · ' + (index + 1) + '. ' + item.title, course.id + ':' + index);
        unit.add(option);
      });
    });
    unit.value = [...unit.options].some(option => option.value === current) ? current : '';
    unit.disabled = !unit.options.length || unit.options.length === 1;
  }

  function card(item) {
    const t = item.topic;
    return '<article class="bank-card"><div class="bank-card-top"><span class="bank-chip">' + esc(item.course.short) + '</span><span class="bank-chip unit">' +
      esc('UNIT ' + (item.unitIndex + 1) + ' · ' + item.unit.badge) + '</span></div><h2>' + esc(t.title) + '</h2><p>' + esc(t.notes) +
      '</p><div class="bank-example"><strong>Example</strong><p>' + esc(t.example) + '</p></div><div class="bank-exam"><strong>Exam takeaway</strong><p>' + esc(t.exam) +
      '</p></div><div class="bank-card-actions"><a href="' + esc(item.href) + '">Open full lesson, diagrams and mock ↗</a></div></article>';
  }

  function render() {
    const query = search.value.trim().toLocaleLowerCase();
    const courseId = subject.value;
    const unitKey = unit.value;
    const matches = library.filter(item => {
      if (courseId && item.course.id !== courseId) return false;
      if (unitKey && unitKey !== item.course.id + ':' + item.unitIndex) return false;
      if (!query) return true;
      const searchable = [item.topic.title,item.topic.notes,item.topic.example,item.topic.exam,item.course.title,item.unit.title].join(' ').toLocaleLowerCase();
      return searchable.includes(query);
    });
    const shown = matches.slice(0, visible);
    results.innerHTML = shown.map(card).join('');
    count.textContent = matches.length === library.length
      ? 'Showing ' + shown.length + ' of ' + library.length + ' concepts'
      : 'Showing ' + shown.length + ' of ' + matches.length + ' matching concepts';
    more.hidden = shown.length >= matches.length;
    endNote.hidden = matches.length === 0 || shown.length < matches.length;
    empty.hidden = matches.length > 0;
    results.hidden = matches.length === 0;
  }

  let timer;
  search.addEventListener('input', () => { visible = pageSize; clearTimeout(timer); timer = setTimeout(render, 120); });
  subject.addEventListener('change', () => { updateUnitOptions(); visible = pageSize; render(); });
  unit.addEventListener('change', () => { visible = pageSize; render(); });
  more.addEventListener('click', () => { visible += pageSize; render(); });
  clear.addEventListener('click', () => { search.value = ''; subject.value = ''; updateUnitOptions(); unit.value = ''; visible = pageSize; render(); search.focus(); });
  updateUnitOptions();
  render();
})();
