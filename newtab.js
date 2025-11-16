// storage helpers
const get = (k) => new Promise(res => chrome.storage.local.get(k, v => res(k ? v[k] : v)));
const set = (obj) => new Promise(res => chrome.storage.local.set(obj, res));

// Clock HH:MM (bold)
function to12(h){ h = h % 12; return h ? h : 12; }
function tick(){
  const d = new Date();
  const hh = String(to12(d.getHours())).padStart(2,'0');
  const mm = String(d.getMinutes()).padStart(2,'0');
  document.getElementById('time').textContent = `${hh}:${mm}`;
  const next = (60 - d.getSeconds()) * 1000 + 5;
  setTimeout(tick, next);
}
tick();

// Greeting with inline name
function baseGreetingByHour(h){
  if (h >= 6 && h < 12) return 'Good morning';
  if (h >= 12 && h < 17) return 'Good afternoon';
  if (h >= 17 && h < 21) return 'Good evening';
  return 'Hello';
}
async function renderGreeting(){
  const base = baseGreetingByHour(new Date().getHours());
  const name = (await get('name')) || '';
  const t = document.getElementById('greetText');
  const comma = document.getElementById('greetComma');
  const nameSpan = document.getElementById('greetName');
  const input = document.getElementById('greetNameInput');
  t.textContent = base;
  if (name){
    input.classList.add('hidden');
    comma.classList.remove('hidden'); nameSpan.classList.remove('hidden');
    nameSpan.textContent = name + '.';
  } else {
    comma.classList.add('hidden'); nameSpan.classList.add('hidden');
    input.classList.remove('hidden'); input.value=''; setTimeout(()=>input.focus(),50);
  }
}
document.getElementById('greetNameInput').addEventListener('keydown', async (e)=>{
  if (e.key==='Enter'){
    const v = e.target.value.trim();
    if (v) await set({name:v});
    renderGreeting();
  }
});
document.getElementById('greetName').addEventListener('click', async ()=>{
  await set({name:''}); renderGreeting();
});
renderGreeting(); setInterval(renderGreeting, 60*1000);

// Quote
const QUOTES=['You do not have to be extreme, just consistent.','Small steps every day lead to big results.','Discipline beats motivation. Start anyway.','Well begun is half done. — Aristotle','Study hard, for the well is deep, and our brains are shallow. – Richard Baxter','Turn your study hours into success stories. – Anonymous','Knowledge will forever govern ignorance. – James Madison','One chapter a day keeps failure away. – Anonymous','The purpose of education is to replace an empty mind with an open one. – Malcolm Forbes','The man who does not read has no advantage over the man who cannot read. – Mark Twain','Your books are your best allies. – Anonymous','The future belongs to those who prepare for it today. – Malcolm X','Your time is limited, so don’t waste it living someone else’s life. – Steve Jobs','Focused minds achieve great things. – Anonymous','Study like your future depends on it, because it does. – Anonymous','Wisdom is not a product of schooling but of the lifelong attempt to acquire it. – Albert Einstein','Discipline is the bridge between goals and accomplishment. – Jim Rohn','Open your book now, own your future. – Anonymous','Don’t let what you cannot do interfere with what you can do. – John Wooden','A reader lives a thousand lives before he dies. – George R.R. Martin','Focus now, shine future. – Anonymous','Study hard now so life will be easy later. – Anonymous','Education’s purpose is to replace an empty mind with an open one. – Malcolm Forbes','Never stop learning, because life never stops teaching. – Anonymous','Push yourself, because no one else is going to do it for you. – Anonymous','Don’t stop until you are proud. – Anonymous','Live as if you were to die tomorrow. Learn as if you were to live forever. – Mahatma Gandhi','Don’t count the days, make the days count. – Muhammad Ali','The future starts today, not tomorrow. – Pope John Paul II','Winners never quit, and quitters never win. – Vince Lombardi','Big dreams need small daily study steps. – Anonymous','What you learn today will build your tomorrow. – Anonymous','Books are your best investment. – Anonymous','Do what you can, with what you have, where you are. – Theodore Roosevelt','Success is the sum of small efforts, repeated day in and day out. – Robert Collier','Discipline now is success future. – Anonymous','Dream, dream, dream. Dreams transform into thoughts, and thoughts result in action. – A.P.J. Abdul Kalam','Hard study makes easy results. – Anonymous','Small study steps make giant results. – Anonymous','Winners are not people who never fail, but people who never quit. – Edwin Louis Cole','Once you learn to read, you will be forever free. – Frederick Douglass','The secret of getting ahead is getting started. – Mark Twain','Every page you study builds your future. – Anonymous','The way to get started is to quit talking and begin doing. – Walt Disney','Learning is not attained by chance, it must be sought for with ardor. – Abigail Adams','Perseverance is not a long race; it is many short races one after another. – Walter Elliot','Success usually comes to those who are too busy to be looking for it. – Henry David Thoreau','A book is a dream you hold in your hands. – Neil Gaiman','Excellence is a continuous process and not an accident. – A.P.J. Abdul Kalam','Education is the key to success in life. – Solomon Ortiz','Knowledge is power. – Francis Bacon','Consistency in study creates miracles. – Anonymous','The expert in anything was once a beginner. – Helen Hayes','Consistency beats motivation. – Anonymous','The roots of education are bitter, but the fruit is sweet. – Aristotle','What you learn now will build your future. – Anonymous','Formal education will make you a living; self-education will make you a fortune. – Jim Rohn','To learn a language is to have one more window from which to look at the world. – Chinese Proverb','The best way to predict your future is to create it by studying today. – Anonymous','Self-education is, I firmly believe, the only kind of education there is. – Isaac Asimov','Hard work beats talent when talent doesn’t work hard. – Tim Notke','Work hard in silence, let success make the noise. – Frank Ocean','Small daily improvements over time lead to stunning results. – Robin Sharma','Success doesn’t come to you, you go to it. – Marva Collins','Your future self is watching you study. – Anonymous','The more that you read, the more things you will know. The more that you learn, the more places you’ll go. – Dr. Seuss','Your goals need your books. – Anonymous','An investment in knowledge pays the best interest. – Benjamin Franklin','Don’t watch the clock; do what it does. Keep going. – Sam Levenson','Tell me and I forget. Teach me and I remember. Involve me and I learn. – Benjamin Franklin','Education opens doors to a brighter future. – Anonymous','Open your book today, own your tomorrow. – Anonymous','Failure is simply the opportunity to begin again, this time more intelligently. – Henry Ford','Motivation is what gets you started. Habit is what keeps you going. – Jim Ryun','Every study hour counts towards success. – Anonymous','The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice. – Brian Herbert','Reading is to the mind what exercise is to the body. – Joseph Addison','Education is the kindling of a flame, not the filling of a vessel. – Socrates','Great things never come from comfort zones. – Anonymous','The beautiful thing about learning is that no one can take it away from you. – B.B. King','Learning never exhausts the mind. – Leonardo da Vinci','Learning never stops. – Anonymous','Your dream life is waiting, keep preparing. – Anonymous','Dreams don’t work unless you do. – Anonymous','Success comes to those who prepare for it. – Anonymous','The best way to predict your future is to create it by studying now. – Anonymous','Learning is a treasure that will follow its owner everywhere. – Chinese Proverb','Discipline today is success tomorrow. – Anonymous','The man who moves a mountain begins by carrying away small stones. – Confucius','One more chapter now, one more success later. – Anonymous','Fall seven times and stand up eight. – Japanese Proverb','Focus today, shine tomorrow. – Anonymous','Education is the most powerful weapon which you can use to change the world. – Nelson Mandela','The harder you work now, the luckier you get. – Anonymous','Studying today is winning tomorrow. – Anonymous','If you can dream it, you can do it. – Walt Disney','It always seems impossible until it’s done. – Nelson Mandela','Success begins with self-discipline. – Anonymous','Discipline shapes destiny. – Anonymous','Learning today builds leaders tomorrow. – Anonymous','Opportunities don’t happen, you create them. – Chris Grosser','Knowledge will bring you the opportunity to make a difference. – Claire Fagin','Work gives you meaning and purpose. – Stephen Hawking','Start where you are. Use what you have. Do what you can. – Arthur Ashe','Education breeds confidence. Confidence breeds hope. Hope breeds peace. – Confucius','Genius is 1% inspiration and 99% perspiration. – Thomas Edison'];
async function renderQuote(){
  const today = new Date().toDateString();
  const lastQuoteDate = await get('lastQuoteDate');
  let currentQuote = await get('currentQuote');

  if (lastQuoteDate !== today) {
    // It's a new day, pick a new quote that hasn't been seen in 90 days.
    let quoteHistory = (await get('quoteHistory')) || [];
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    
    // 1. Prune history of entries older than 90 days
    quoteHistory = quoteHistory.filter(entry => new Date(entry.date) >= ninetyDaysAgo);

    // 2. Get indices of recently shown quotes
    const recentIndices = new Set(quoteHistory.map(entry => entry.index));

    // 3. Get available indices (all quotes minus recent ones)
    const allIndices = Array.from({ length: QUOTES.length }, (_, i) => i);
    let availableIndices = allIndices.filter(index => !recentIndices.has(index));

    // 4. If all quotes have been shown in the last 90 days, reset the pool to prevent errors.
    if (availableIndices.length === 0) {
      availableIndices = allIndices;
    }

    // 5. Pick a new random index from the available pool
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    const newQuoteIndex = availableIndices[randomIndex];
    const newQuote = QUOTES[newQuoteIndex];

    // 6. Update and save the history
    quoteHistory.push({ index: newQuoteIndex, date: new Date().toISOString() });
    await set({
      currentQuote: newQuote,
      lastQuoteDate: today,
      quoteHistory: quoteHistory
    });
    currentQuote = newQuote;
  }
  
  const [quote, author] = (currentQuote || ' – ').split(' – ');
  const quoteEl = document.getElementById('quote');
  const quoteTextEl = document.getElementById('quoteText');
  const quoteAuthorEl = document.getElementById('quoteAuthor');

  // Reset animation
  quoteEl.style.animation = 'none';
  void quoteEl.offsetWidth; // Trigger reflow
  quoteEl.style.animation = null;

  quoteTextEl.textContent = `"${quote}"`;
  quoteAuthorEl.textContent = `– ${author || 'Anonymous'}`;
}
renderQuote();

// Goal input/display with done & edit/new
const goalInput = document.getElementById('goalInput');
const goalDisplay = document.getElementById('goalDisplay');
const goalText = document.getElementById('goalText');
const goalDone  = document.getElementById('goalDone');
const goalEdit  = document.getElementById('goalEdit');
const goalNew   = document.getElementById('goalNew');

(async ()=>{
  const stored = await get('dailyGoal');
  const done   = await get('dailyGoalDone');
  if (stored){
    goalText.textContent = stored;
    showGoalDisplay();
  } else {
    showGoalInput();
  }
  goalDone.checked = !!done;
  applyGoalDoneStyle();
})();

function showGoalDisplay(){
  goalInput.classList.add('hidden');
  goalDisplay.classList.remove('hidden');
}
function showGoalInput(){
  goalDisplay.classList.add('hidden');
  goalInput.classList.remove('hidden');
  setTimeout(()=>goalInput.focus(),50);
}

goalInput.addEventListener('keydown', async (e)=>{
  if (e.key==='Enter'){
    const v = goalInput.value.trim();
    if (!v) return;
    await set({dailyGoal:v, dailyGoalDone:false});
    goalText.textContent = v;
    goalDone.checked = false;
    applyGoalDoneStyle();
    showGoalDisplay();
  }
});

function applyGoalDoneStyle(){
  if (goalDone.checked){
    goalText.style.textDecoration = 'line-through';
    goalText.style.opacity = '0.65';
  } else {
    goalText.style.textDecoration = 'none';
    goalText.style.opacity = '1';
  }
}
goalDone.addEventListener('change', async ()=>{
  await set({dailyGoalDone: goalDone.checked});
  applyGoalDoneStyle();
});

goalEdit.addEventListener('click', async ()=>{
  goalInput.value = (await get('dailyGoal')) || goalText.textContent;
  showGoalInput();
});
goalNew.addEventListener('click', ()=>{
  goalInput.value = '';
  showGoalInput();
});

// To-Do list (bottom-left)
const todoToggle = document.getElementById('todoToggle');
const todoPop = document.getElementById('todoPop');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoStatusText = document.getElementById('todoStatusText');
const todoMascotEmoji = document.getElementById('todoMascotEmoji');

const todoMessages = [
  '#One At a Time', '#Rise Up', '#Stay Positive', '#Work Hard', '#Dream Big',
  '#Stay Hungry', '#Trust Yourself', '#Keep Learning', '#Stay Humble',
  '#Believe More', '#Never Quit', '#Stay Determined', '#Chase Goals',
  '#Focus Hard', '#Keep Climbing', '#Stay Motivated', '#Keep Building',
  '#Go Beyond', '#Stay Consistent', '#Keep Rising', '#Stay Disciplined'
];
let todoMessageIndex = 0;
let focusedTodoIndex = -1; // -1 means no item is focused

// -----------------------------------------------------------------------------
// History for completed tasks
//
// When a task is marked as done, a copy is stored in a persistent history.
// This history is grouped by the completion date, is hidden by default, and
// automatically prunes entries older than 21 days.  A "History" toggle
// appears at the bottom of the to‑do popover when there are completed tasks.

// Create the History toggle button and container.  These elements are
// appended to the todoPop so they live alongside the to‑do list.  The button
// remains hidden until there is at least one history entry.
const todoHistoryBtn = document.createElement('button');
todoHistoryBtn.id = 'todoHistoryBtn';
todoHistoryBtn.className = 'todo-history-btn';
todoHistoryBtn.textContent = 'History';
// Initially hidden; visibility will be managed by updateHistoryButton().
todoHistoryBtn.style.display = 'none';
const todoHistoryDiv = document.createElement('div');
todoHistoryDiv.id = 'todoHistory';
todoHistoryDiv.className = 'todo-history';
todoHistoryDiv.style.display = 'none';
// Append the history controls to the popover once todoPop is defined.
if (todoPop) {
  todoPop.appendChild(todoHistoryBtn);
  todoPop.appendChild(todoHistoryDiv);
}

// Utility: prune history items older than 21 days and return filtered array.
function pruneHistory(list) {
  const cutoff = Date.now() - 21 * 24 * 60 * 60 * 1000;
  return list.filter(item => {
    const t = new Date(item.date).getTime();
    return t >= cutoff;
  });
}

// Update the visibility of the history toggle based on whether any history
// entries exist.  Prune old entries when checking and persist the pruned
// result back to storage.
async function updateHistoryButton() {
  try {
    let hist = (await get('todoHistory')) || [];
    const pruned = pruneHistory(hist);
    if (pruned.length !== hist.length) {
      await set({ todoHistory: pruned });
      hist = pruned;
    }
    todoHistoryBtn.style.display = hist.length ? '' : 'none';
  } catch (e) {
    // fail silently
  }
}

// Render the history list grouped by completion date.  Called whenever the
// History toggle is clicked and the history view is shown.
async function renderHistory() {
  const hist = (await get('todoHistory')) || [];
  const pruned = pruneHistory(hist);
  if (pruned.length !== hist.length) {
    await set({ todoHistory: pruned });
  }
  // Group by relative date labels (Today, Yesterday, Day before yesterday, or
  // formatted date).  Compute boundaries for relative calculations.
  const today = new Date(); today.setHours(0,0,0,0);
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
  const dayBefore = new Date(today); dayBefore.setDate(today.getDate() - 2);
  function getLabel(dateStr) {
    const d = new Date(dateStr);
    d.setHours(0,0,0,0);
    if (d.getTime() === today.getTime()) return 'today';
    if (d.getTime() === yesterday.getTime()) return 'yesterday';
    if (d.getTime() === dayBefore.getTime()) return 'day before yesterday';
    // Format as DD MM YYYY (two-digit day and month) for older entries
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    return `${dd} ${mm} ${d.getFullYear()}`;
  }
  const groups = {};
  pruned.forEach(item => {
    const label = getLabel(item.date);
    if (!groups[label]) groups[label] = [];
    groups[label].push(item);
  });
  // Clear existing entries
  todoHistoryDiv.innerHTML = '';
  // Sort groups by date descending using original item dates (most recent first)
  Object.keys(groups)
    .sort((a, b) => {
      // Derive representative date for comparison: take max date of group
      const maxDate = (arr) => Math.max(...arr.map(it => new Date(it.date).getTime()));
      return maxDate(groups[b]) - maxDate(groups[a]);
    })
    .forEach(label => {
      const header = document.createElement('div');
      header.className = 'history-date';
      header.textContent = label;
      todoHistoryDiv.appendChild(header);
      groups[label].forEach(item => {
        const entry = document.createElement('div');
        entry.className = 'history-item';
        entry.textContent = item.text;
        todoHistoryDiv.appendChild(entry);
      });
    });
}

// Toggle the history panel.  When showing, it renders the history; otherwise
// hides it.  Uses inline display style to toggle visibility.
todoHistoryBtn.addEventListener('click', async () => {
  if (todoHistoryDiv.style.display === 'none' || !todoHistoryDiv.style.display) {
    await renderHistory();
    todoHistoryDiv.style.display = '';
    // Provide a little animation for showing history
    todoHistoryDiv.style.opacity = '0';
    todoHistoryDiv.style.transform = 'translateY(6px)';
    requestAnimationFrame(() => {
      todoHistoryDiv.style.transition = 'opacity .25s ease, transform .25s ease';
      todoHistoryDiv.style.opacity = '1';
      todoHistoryDiv.style.transform = 'translateY(0)';
    });
  } else {
    todoHistoryDiv.style.display = 'none';
  }
});

// Ensure incomplete tasks appear first, then completed tasks.
function sortTodosInPlace(items){
  if (!Array.isArray(items)) return;
  items.sort((a,b)=>{
    const ad = !!a.done; const bd = !!b.done;
    if (ad === bd) return 0; // preserve relative order within group (V8 stable sort)
    return ad ? 1 : -1; // incomplete first
  });
}

function mascotReact(tempEmoji, animClass, resetMs=700){
  if (!todoMascotEmoji) return;
  todoMascotEmoji.classList.remove('mascot-nod','mascot-peek','mascot-shake');
  void todoMascotEmoji.offsetWidth;
  if (tempEmoji) todoMascotEmoji.textContent = tempEmoji;
  if (animClass) todoMascotEmoji.classList.add(animClass);
  setTimeout(()=>{ if (todoMascotEmoji) todoMascotEmoji.textContent = '👀'; }, resetMs);
}
todoToggle.addEventListener('click', ()=>{
  const willOpen = !todoPop.classList.contains('open');
  // When opening, display a motivational tag and reorder tasks so incomplete
  // items appear above completed ones.  When closing, clear focused index.
  if (willOpen) {
    todoStatusText.textContent = todoMessages[todoMessageIndex];
    todoMessageIndex = (todoMessageIndex + 1) % todoMessages.length;
    (async()=>{
      const items = (await get('todos')) || [];
      sortTodosInPlace(items);
      await set({ todos: items });
      renderTodos(items);
    })();
  } else {
    focusedTodoIndex = -1;
  }
  todoPop.classList.toggle('open');
  todoToggle.classList.toggle('active');
  // Persist the open state so that the list stays open across page reloads
  (async()=>{ await set({ todoOpen: todoPop.classList.contains('open') }); })();
});
function sweepOld(items){ const today = new Date(); today.setHours(0,0,0,0); return items.filter(t => !(t.done && t.done_at && new Date(t.done_at) < today)); }
async function loadTodos() {
  let items = (await get('todos')) || [];
  // Remove tasks done before today and ensure incomplete tasks come first
  items = sweepOld(items);
  sortTodosInPlace(items);
  await set({ todos: items });
  renderTodos(items);
  // Update history button visibility after rendering
  updateHistoryButton();
}
function renderTodos(items){
  todoList.innerHTML='';
  items.forEach((t,i)=>{
    const li=document.createElement('li');
    if (t.done) li.classList.add('done');
    const cb=document.createElement('input'); cb.type='checkbox'; cb.checked=!!t.done;
    const span=document.createElement('span'); span.textContent=t.text;
    const editBtn = document.createElement('button');
    editBtn.className = 'icon-btn edit-btn';
    editBtn.textContent = '✎';
    editBtn.title = 'Edit to-do';
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'icon-btn delete-btn';
    deleteBtn.textContent = '✕';
    deleteBtn.title = 'Delete to-do';
    li.style.animation = 'none'; // Reset animation
    void li.offsetWidth; // Trigger reflow
    li.style.animation = null; // Re-apply animation
    cb.addEventListener('change', async()=>{
      // Do not re-render immediately to avoid jarring movement
      // Preserve the previous completion timestamp so we can remove it from
      // history if the user unchecks the task.
      const prevDoneAt = items[i].done_at;
      items[i].done = cb.checked;
      items[i].done_at = cb.checked ? new Date().toISOString() : null;
      await set({ todos: items });
      // When a task is marked complete, record it in history.  The history
      // entry stores the task text and completion timestamp.  History will be
      // pruned after 21 days when rendered.  If the task is unchecked, remove
      // the corresponding entry from history.
      try {
        let hist = (await get('todoHistory')) || [];
        if (cb.checked) {
          hist.push({ text: items[i].text, date: items[i].done_at });
        } else {
          // Remove the entry matching the previous timestamp and text
          hist = hist.filter(entry => !(entry.text === items[i].text && entry.date === prevDoneAt));
        }
        await set({ todoHistory: hist });
      } catch (e) {
        // ignore storage errors
      }
      // Subtle visual feedback on the item itself
      li.style.opacity = cb.checked ? '0.6' : '1';
      li.style.textDecoration = cb.checked ? 'line-through' : 'none';
      // Mascot reaction
      if (cb.checked) mascotReact('😊','mascot-nod',600);
      else mascotReact('🙄','mascot-shake',500);
      // Update visibility of history button whenever a task is toggled
      updateHistoryButton();
      // If the history panel is currently visible, re-render it to reflect
      // newly added or removed entries so the UI updates dynamically.
      if (todoHistoryDiv && todoHistoryDiv.style.display !== 'none') {
        await renderHistory();
      }
    });
    deleteBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      items.splice(i, 1);
      await set({todos:items});
      renderTodos(items);
      mascotReact('🗑️','mascot-shake',600);
    });
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentText = span.textContent;
      const input = document.createElement('input');
      input.type = 'text';
      input.value = currentText;
      input.className = 'edit-input';

      li.replaceChild(input, span);
      input.focus();
      mascotReact('📝','mascot-peek',600);

      const saveChanges = async () => {
        const newText = input.value.trim();
        if (newText && newText !== currentText) {
          items[i].text = newText;
          await set({todos:items});
        }
        renderTodos(items);
      };

      input.addEventListener('blur', saveChanges);
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          saveChanges();
        } else if (e.key === 'Escape') {
          renderTodos(items);
          mascotReact('👍','mascot-nod',600);
        }
      });
    });
    li.appendChild(cb);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
  // After rendering, ensure the focused item has the focus class
  updateFocusedTodoStyle();
}
function updateFocusedTodoStyle() {
  Array.from(todoList.children).forEach((li, idx) => {
    if (idx === focusedTodoIndex) {
      li.classList.add('focused');
      li.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      li.classList.remove('focused');
    }
  });
}

todoInput.addEventListener('keydown', async (e)=>{
  if (e.key==='Enter' && todoInput.value.trim()){
    const items = (await get('todos')) || [];
    items.unshift({text:todoInput.value.trim(), done:false, done_at:null});
    sortTodosInPlace(items);
    todoInput.value=''; await set({todos:items}); renderTodos(items);
    focusedTodoIndex = 0; // Focus on the newly added item
    // Mascot celebrates new task
    if (todoMascotEmoji){
      todoMascotEmoji.classList.remove('mascot-nod','mascot-peek','mascot-shake');
      void todoMascotEmoji.offsetWidth;
      todoMascotEmoji.textContent = '🤩';
      todoMascotEmoji.classList.add('mascot-peek');
      setTimeout(()=> todoMascotEmoji.textContent = '👀', 700);
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    focusedTodoIndex = Math.min(focusedTodoIndex + 1, todoList.children.length - 1);
    updateFocusedTodoStyle();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    focusedTodoIndex = Math.max(focusedTodoIndex - 1, 0);
    updateFocusedTodoStyle();
  } else if (e.key === 'Escape') {
    e.preventDefault();
    focusedTodoIndex = -1;
    updateFocusedTodoStyle();
    todoInput.blur(); // unfocus input
  }
});

document.addEventListener('keydown', (e) => {
  if (todoPop.classList.contains('open') && todoList.children.length > 0 && document.activeElement !== todoInput) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusedTodoIndex = Math.min(focusedTodoIndex + 1, todoList.children.length - 1);
      updateFocusedTodoStyle();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusedTodoIndex = Math.max(focusedTodoIndex - 1, 0);
      updateFocusedTodoStyle();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      focusedTodoIndex = -1;
      updateFocusedTodoStyle();
      todoPop.classList.remove('open');
      todoToggle.classList.remove('active');
      // Persist closed state
      (async()=>{ await set({ todoOpen: false }); })();
    }
  }
});

loadTodos();

// Restore the to-do list open state on page load.  If the stored flag
// `todoOpen` is true, expand the popover and activate the toggle.  Also
// reorder items so incomplete tasks appear first when reopening.
(async () => {
  try {
    const openFlag = await get('todoOpen');
    if (openFlag) {
      todoPop.classList.add('open');
      todoToggle.classList.add('active');
      const items = (await get('todos')) || [];
      sortTodosInPlace(items);
      renderTodos(items);
      updateHistoryButton();
    }
  } catch (e) {
    // swallow storage error
  }
})();

// Exams logic top-right
const examsBtn = document.getElementById('examsBtn');
const examsDialog = document.getElementById('examsDialog');
const examName = document.getElementById('examName');
const examDate = document.getElementById('examDate');
const saveExam = document.getElementById('saveExam');
const cancelExam = document.getElementById('cancelExam');
const examsAll = document.getElementById('examsAll');
const examsList = document.getElementById('examsList');

// Removed flatpickr integration to comply with extension CSP. We'll use native date input.

examsBtn.addEventListener('click', () => {
  // When opening the exam dialog, ensure the minimum date is today and open the modal.
  examsDialog.showModal();
  const todayStr = new Date().toISOString().split('T')[0];
  examDate.setAttribute('min', todayStr);
});
cancelExam.addEventListener('click', ()=> examsDialog.close());
examsDialog.addEventListener('keydown', (e)=>{ if(e.key==='Escape') examsDialog.close(); });
examsDialog.addEventListener('mousedown', (e)=>{
  const r = examsDialog.getBoundingClientRect();
  if (e.clientX<r.left || e.clientX>r.right || e.clientY<r.top || e.clientY>r.bottom) examsDialog.close();
});

function daysLeft(dateStr){
  const today = new Date(); today.setHours(0,0,0,0);
  const t = new Date(dateStr); t.setHours(0,0,0,0);
  return Math.ceil((t - today)/(1000*60*60*24));
}
function urgency(d){ if (d<=7) return 'red'; if (d<=30) return 'amber'; return 'teal'; }
function fmt(dStr){
  // Expecting format yyyy-mm-dd; render as "D Mon YYYY" without leading zero for day
  try{
    const parts = dStr.split('-');
    if (parts.length === 3){
      const y = Number(parts[0]);
      const m = Number(parts[1]);
      const d = Number(parts[2]);
      const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return `${d} ${MONTHS[m-1]} ${y}`;
    }
  }catch(e){}
  // Fallback to previous behavior
  const d = new Date(dStr);
  return String(d.getDate()).padStart(2,'0')+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+d.getFullYear();
}

async function loadExams(){
  const arr = (await get('exams')) || [];
  arr.sort((a,b)=> new Date(a.date)-new Date(b.date));
  examsAll.innerHTML = arr.length ? '<strong>Saved Goals</strong><br>' : '';
  arr.forEach((ex,i)=>{
    const row=document.createElement('div');
    row.style.marginTop='6px';
    row.textContent = `${ex.title} — ${fmt(ex.date)} (${daysLeft(ex.date)} days)`;
    const del=document.createElement('button'); del.textContent='Delete'; del.className='btn ghost'; del.style.marginLeft='8px';
    del.addEventListener('click', async()=>{
      const cur=(await get('exams'))||[]; cur.splice(i,1); await set({exams:cur}); loadExams(); renderTop3();
    });
    row.appendChild(del); examsAll.appendChild(row);
  });
}
saveExam.addEventListener('click', async ()=>{
  if (!examName.value.trim() || !examDate.value) return;
  const arr=(await get('exams'))||[]; arr.push({title:examName.value.trim(), date:examDate.value});
  await set({exams:arr}); examName.value=''; examDate.value=''; await loadExams(); await renderTop3(); setTimeout(()=>examsDialog.close(),250);
});
async function renderTop3(){
  const arr=(await get('exams'))||[];
  // Show up to three upcoming exams only (hard cap as requested)
  const upcoming=arr.filter(ex=>daysLeft(ex.date) >= 0)
    .sort((a,b)=>new Date(a.date)-new Date(b.date))
    .slice(0,3);
  if (upcoming.length > 3) upcoming.length = 3;
examsList.innerHTML='';
  if (!upcoming.length){ examsList.classList.add('hidden'); examsList.classList.remove('two-col'); return; }
  examsList.classList.remove('hidden');
  // Toggle two-column layout when 4–6 cards
  if (upcoming.length >= 4) examsList.classList.add('two-col'); else examsList.classList.remove('two-col');
  upcoming.forEach((ex,idx)=>{
    const d=daysLeft(ex.date);
    const totalHorizon = Math.max(d, 30); // simple scale for progress
    const pct = Math.max(0, Math.min(100, Math.round(((30 - Math.min(d,30)) / 30) * 100)));
    const card=document.createElement('div'); card.className=`exam-card ${urgency(d)}`; card.style.animationDelay=`${idx*0.06}s`;
    if (d === 0) { card.classList.add('today'); }
    const labelText = d<=7 ? 'Be Ready!' : d<=30 ? 'Soon' : 'Upcoming';
    const labelEmoji = d<=7 ? '💪' : d<=30 ? '✨' : '🌱';
    const daysText = (d === 0) ? 'Happening Today!' : (d === 1 ? '1 day left' : (d + ' days left'));
    if (d === 0) card.classList.add('today');
    card.innerHTML=`
      <div class="head">
        <div class="days">${daysText}</div>
        <span class="urgency" title="${labelText}" aria-label="${labelText}">${labelEmoji}</span>
      </div>
      <div class="name">${ex.title}</div>
      <div class="date-row">
        <svg class="cal" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 2v3M17 2v3M3 9h18M5 5h14a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <div class="date">${fmt(ex.date)}</div>
      </div>
      <div class="progress"><div class="fill" style="width:${pct}%"></div></div>
    `;
    examsList.appendChild(card);
  });
}
loadExams(); renderTop3();


// ===== Attach ripple interactions to clickable surfaces =====
function attachRipples(scope=document){
  // Include settings toggle for ripple effect
  const els = scope.querySelectorAll('button, .icon-btn, .actions button, .exam-card, .settings-btn');
  els.forEach(el => {
    if (!el.classList.contains('ripple')) el.classList.add('ripple');
    el.addEventListener('click', function(e){
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ink = document.createElement('span');
      ink.className = 'ripple-ink';
      ink.style.width = ink.style.height = size + 'px';
      ink.style.left = (e.clientX - rect.left - size/2) + 'px';
      ink.style.top  = (e.clientY - rect.top  - size/2) + 'px';
      this.appendChild(ink);
      setTimeout(() => ink.remove(), 650);
    }, { passive: true });
  });
}
attachRipples();
// also after we re-render exams cards
const _renderTop3 = renderTop3;
renderTop3 = async function(){
  await _renderTop3();
  attachRipples();
}


// ---- Background management (Pixabay API + custom images) ----

// Utility to set the .bg element's image
function setBackground(url){
  const bg = document.querySelector('.bg');
  if (!bg) return;
  // If the URL is relative (e.g., "assets/bg1.jpg"), convert it to a
  // fully-qualified chrome-extension URL. This ensures fallback images
  // stored within the extension load correctly even when the page is
  // served from a file:// URL.
  let normalizedUrl = url;
  try {
    // Only convert relative paths that don't already begin with http(s), data,
    // or chrome-extension. Note: file URLs are not used for extension assets.
    const isAbsolute = /^(https?:|data:|chrome-extension:)/i.test(url);
    if (!isAbsolute) {
      normalizedUrl = chrome.runtime.getURL(url);
    }
  } catch (err) {
    // If runtime.getURL is unavailable (e.g., in non-extension context),
    // fallback to the original URL. This catch prevents errors in testing.
    normalizedUrl = url;
  }
  // Preload the image before setting it to avoid flashes of black
  const img = new Image();
  img.onload = () => {
    // Smoothly transition the background image on successful load
    bg.style.transition = 'background-image 1s ease-in-out';
    bg.style.backgroundImage = `url('${normalizedUrl}')`;
  };
    img.onerror = () => {
    // If the image fails to load, log a warning and immediately fall back to a local asset.
    console.warn('Failed to load background image:', normalizedUrl);
    try {
      // Pick a random fallback image from our packaged assets. This ensures the
      // UI remains visually pleasing even if the preferred image is unavailable.
      const fallbacks = [
        // Use the custom evergreen background first as our preferred fallback.
        'assets/default_bg.jpg',
        // Our primary fallbacks: curated bright landscapes
        'assets/fallback1.jpg', 'assets/fallback2.jpg',
        // Additional gradients provide a backup if all curated images are unavailable.
        'assets/bg1.jpg', 'assets/bg2.jpg', 'assets/bg3.jpg',
        'assets/bg4.jpg', 'assets/bg5.jpg', 'assets/bg6.jpg',
        'assets/bg7.jpg', 'assets/bg8.jpg', 'assets/bg9.jpg'
      ];
      let f = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      // Normalize the URL similarly to above. Use runtime.getURL if available.
      let fUrl = f;
      try {
        if (!/^(https?:|data:|chrome-extension:)/i.test(f)) {
          fUrl = chrome.runtime.getURL(f);
        }
      } catch(err){}
      bg.style.transition = 'background-image 0.5s ease-in-out';
      bg.style.backgroundImage = `url('${fUrl}')`;
      // Hide credit and update info to default
      updateCredit(false);
      updateCurrentBgInfo('Default image');
      // Persist the fallback as the current background so reloads don't retry the broken URL
      const today = new Date().toDateString();
      set({ bgUrl: f, bgDate: today, bgCredit: null });
    } catch(e2){
      console.warn('Failed to apply fallback image', e2);
    }
    };
  img.src = normalizedUrl;
}

// Update credit pill: show attribution if provided, or hide otherwise
function updateCredit(show, credit){
  const creditEl = document.getElementById('bgCredit');
  // Always hide the credit pill completely.  
  // While we still store credit information internally (for potential future use),  
  // we do not display any attribution badge on the main UI. This avoids a small circle  
  // appearing behind the settings button at the bottom right.  
  if (creditEl) {
    creditEl.style.display = 'none';
    creditEl.classList.remove('visible');
  }
}

// Update current background info text inside settings overlay
function updateCurrentBgInfo(info){
  const el = document.getElementById('currentBgInfo');
  if (el) el.textContent = info;
}

// Fetch a random Pixabay image for the day and set as background
async function pixabayDaily(){
  const localFallbacks = [
    // Prioritise our custom evergreen image as the first fallback.
    'assets/default_bg.jpg',
    'assets/bg1.jpg', 'assets/bg2.jpg', 'assets/bg3.jpg',
    'assets/bg4.jpg', 'assets/bg5.jpg', 'assets/bg6.jpg',
    'assets/bg7.jpg', 'assets/bg8.jpg', 'assets/bg9.jpg'
  ];
  const today = new Date().toDateString();
  const last = await get('bgDate');
  let bgUrl = await get('bgUrl');
  let bgCredit = await get('bgCredit');
  if (last !== today || !bgUrl){
    try {
      // Randomly select a theme for variety. We restrict themes to landscape and city
      // and request images curated by Pixabay's Editors Choice for higher quality.
      const themes = ['landscape', 'city'];
      const theme = themes[Math.floor(Math.random() * themes.length)];
      const apiUrl =
        `https://pixabay.com/api/?key=51842793-4b6fae7ced27df2b28d755b62&q=${encodeURIComponent(theme)}` +
        // Fetch only photos in horizontal orientation. Choose Editors Choice for high quality.
        `&image_type=photo&orientation=horizontal&per_page=50&order=popular&editors_choice=true` +
        // Restrict to safe‑search results and bright colour palettes to avoid overly dark images.
        `&safesearch=true&colors=orange,yellow,green,blue,white`;
      const resp = await fetch(apiUrl);
      const data = await resp.json();
      if (data.hits && data.hits.length) {
        // Pick a random result from the top portion of hits. Selecting from
        // the first ~20 results tends to yield diverse yet high‑quality images.
        const subset = data.hits.slice(0, 20);
        const hit = subset[Math.floor(Math.random() * subset.length)];
        // Choose the highest available resolution for a crisp background. We
        // cascade through the available properties to prefer fullHD or original.
        bgUrl = hit.fullHDURL || hit.imageURL || hit.largeImageURL || hit.webformatURL || hit.previewURL;
        // Store attribution data for potential credit display.
        bgCredit = { user: hit.user, pageURL: hit.pageURL };
        await set({ bgUrl, bgDate: today, bgCredit });
      }
    } catch(e) {
      console.warn('Pixabay API error, using fallback.', e);
      // If the API call fails, choose one of our curated fallback images. These files
      // are included in the extension package and offer bright, natural scenery.
      const fallbackOptions = ['assets/fallback1.jpg', 'assets/fallback2.jpg'];
      const fallback = fallbackOptions[Math.floor(Math.random() * fallbackOptions.length)];
      bgUrl = fallback;
      bgCredit = null;
      await set({ bgUrl: bgUrl, bgDate: today, bgCredit: bgCredit });
    }
  }
  if (bgUrl){
    setBackground(bgUrl);
    if (bgCredit){
      updateCredit(true, bgCredit);
      updateCurrentBgInfo(`Pixabay photo by ${bgCredit.user}`);
    } else {
      updateCredit(false);
      updateCurrentBgInfo('Default image');
    }
  }
}

// Load the appropriate background: custom image if available; otherwise Pixabay daily
async function loadBackground(){
  const customBg = await get('customBackground');
  if (customBg){
    setBackground(customBg);
    updateCredit(false);
    updateCurrentBgInfo('Custom image');
  } else {
    await pixabayDaily();
  }
}

// Set a custom background image (data URL)
async function setCustomBackground(dataUrl){
  await set({ customBackground: dataUrl });
  setBackground(dataUrl);
  updateCredit(false);
  updateCurrentBgInfo('Custom image');
}

// Remove custom background and fall back to a locally packaged image immediately.
// Once reverted, a new daily image will be fetched in the background. This ensures
// the UI updates instantly without requiring a page refresh.
async function removeCustomBackground(){
  // Remove the stored custom background flag so future loads use daily images
  await set({ customBackground: null });
  try {
    // Immediately display a curated fallback image (packaged in assets) to avoid a blank screen.
    // We use a dedicated fallback image rather than a random gradient to provide a more
    // natural, uplifting scene (see assets/fallback.jpg). This fallback remains in place
    // until pixabayDaily() fetches a fresh daily background.
    // Pick one of our curated fallback images at random. These files live in assets/
    // and provide bright, inspiring scenes for when the custom background is removed.
    const fallbackOptions = ['assets/fallback1.jpg', 'assets/fallback2.jpg'];
    const fallback = fallbackOptions[Math.floor(Math.random() * fallbackOptions.length)];
    setBackground(fallback);
    updateCredit(false);
    updateCurrentBgInfo('Default image');
    // Persist the fallback as the current daily background so that subsequent calls
    // to loadBackground() do not leave the background blank. We also update
    // bgDate to today so pixabayDaily() knows it can fetch a fresh image later.
    const today = new Date().toDateString();
    await set({ bgUrl: fallback, bgDate: today, bgCredit: null });
  } catch (err) {
    console.warn('Failed to set fallback background', err);
  }
  // Kick off a refresh of the daily background in the background. We do not await
  // this promise so the UI remains responsive. If the user is offline, this call
  // will simply log a warning and leave the fallback in place until a new
  // connection is available.
  pixabayDaily().catch((e) => console.warn('Daily background refresh error', e));
}

// ---- Settings overlay & background upload handling ----
const settingsToggle = document.getElementById('settingsToggle');
const settingsOverlay = document.getElementById('settingsOverlay');
const settingsCloseX = document.getElementById('settingsCloseX');
const bgUpload = document.getElementById('bgUpload');
const bgUploadButton = document.getElementById('bgUploadButton');
const bgRemoveButton = document.getElementById('bgRemoveButton');
const bgCancelButton = document.getElementById('bgCancelButton');

if (settingsToggle){
  settingsToggle.addEventListener('click', async () => {
    if (settingsOverlay) settingsOverlay.classList.add('open');
    // update current background info when opening
    const customBg = await get('customBackground');
    if (customBg){
      updateCurrentBgInfo('Custom image');
    } else {
      const credit = await get('bgCredit');
      updateCurrentBgInfo(credit ? `Pixabay photo by ${credit.user}` : 'Default image');
    }
  });
}
if (settingsCloseX){
  settingsCloseX.addEventListener('click', ()=> settingsOverlay && settingsOverlay.classList.remove('open'));
}
if (bgCancelButton){
  // Cancel simply closes the overlay without making any changes. We wrap
  // in a handler to ensure the event doesn’t bubble and inadvertently
  // trigger other click listeners.
  bgCancelButton.addEventListener('click', (ev) => {
    ev.stopPropagation();
    if (settingsOverlay) settingsOverlay.classList.remove('open');
  });
}
if (bgUploadButton && bgUpload){
  bgUploadButton.addEventListener('click', ()=> bgUpload && bgUpload.click());
  bgUpload.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async function(ev){
      const dataUrl = ev.target.result;
      await setCustomBackground(dataUrl);
      if (settingsOverlay) settingsOverlay.classList.remove('open');
    };
    reader.readAsDataURL(file);
  });
}
if (bgRemoveButton){
  // When the user clicks Remove, try to clear their custom
  // background and fall back to the daily image. If any error
  // occurs (for example, network errors when fetching Pixabay),
  // we still close the settings overlay so the UI doesn’t get
  // stuck. This prevents the remove/cancel controls from
  // appearing unresponsive.
  // When the user clicks Remove, immediately start removing the custom
  // background without awaiting the full async flow. This prevents
  // perceived delays: the fallback image is applied instantly while
  // the daily image fetch happens in the background. Any errors are
  // logged but do not block UI updates.
  bgRemoveButton.addEventListener('click', () => {
    removeCustomBackground().catch((err) => {
      console.warn('Error removing custom background', err);
    });
    if (settingsOverlay) settingsOverlay.classList.remove('open');
  });
}

// Close the settings overlay when clicking outside the card. This provides
// a more intuitive way to exit the dialog by simply clicking anywhere
// on the backdrop.
if (settingsOverlay){
  settingsOverlay.addEventListener('click', (e) => {
    // If the user clicked directly on the overlay (not on the card or its children),
    // close the overlay. We compare the event target to the overlay itself.
    if (e.target === settingsOverlay) {
      settingsOverlay.classList.remove('open');
    }
  });
}

// Initialize background on load
loadBackground();

// Ensure the settings button is positioned at bottom-right in case CSS is overridden
document.addEventListener('DOMContentLoaded', () => {
  const st = document.getElementById('settingsToggle');
  if (st) {
    // Explicitly set fixed positioning and right alignment; remove any left/bottom overrides
    st.style.position = 'fixed';
    st.style.left = 'auto';
    st.style.right = '20px';
    st.style.bottom = '20px';
  }
  // Mount Cohort Card if feature flag is enabled (non‑destructive). Use try/catch to avoid errors.
  try {
    mountCohortCard();
  } catch (e) {
    console.warn('[cohortCard] mount error', e);
  }
});

// --- Smooth layout switch for exam cards ---
function adjustExamCardLayout() {
  const container = document.querySelector('.exam-tracker-container');
  if (!container) return;
  const cards = container.querySelectorAll('.exam-card');
  if (cards.length <= 3) {
    container.classList.add('one-col');
    container.classList.remove('two-col');
  } else {
    container.classList.add('two-col');
    container.classList.remove('one-col');
  }
}

// ──────────────────────────────────────────────────────────────
// Cohort Card (feature‑flagged, isolated)
// This module mounts a top‑left card allowing users to pick a cohort and view rotating fun facts.
// It is fully fenced: no global selectors are changed. It reads the 'features.cohortCard' flag
// from chrome.storage.local and persists the user's cohort choice and fun fact index.
// ──────────────────────────────────────────────────────────────

// Basic telemetry wrapper; safe no‑op if __telemetry isn't defined.
const track = (name, payload = {}) => {
  try {
    window.__telemetry?.track?.(name, payload);
  } catch (e) {
    // ignore
  }
};

// Cohort labels (must remain in this order).
// Display names for the cohort selector.  Include "Exam" for IITJEE and NEET
// to clarify the context while the underlying keys remain without the suffix.
const COHORTS = ['IITJEE Exam', 'NEET Exam', 'Get 1% Smarter', 'None'];

// Placeholder fun facts per cohort. Swap these with your real content.
// Placeholder facts per cohort. Keep five entries each as requested. These
// should be replaced with a larger list provided by the user later.  Each
// string uses \n to denote line breaks; the formatFunFact helper will wrap
// and truncate as needed.
const FUN_FACTS = {
  IITJEE: [
    'Work done is\npath independent\nin conservative\nfields.',
    'If acceleration\nis zero,\nvelocity is\nconstant.',
    'In a right triangle,\nthe square of\nthe hypotenuse\nequals the sum\nof the squares\nof the other two sides.',
    'The derivative\nof sin x\nis cos x.',
    'A mole of\nany substance\ncontains Avogadro’s\nnumber of entities.'
  ],
  NEET: [
    'Mitochondria\nare the powerhouses\nof the cell.',
    'Antibodies bind\nspecific antigens\nat variable regions.',
    'DNA replication\nis semi‑conservative.',
    'The human heart\nhas four chambers.',
    'Photosynthesis\nconverts light energy\ninto chemical energy.'
  ],
  'Get 1% Smarter': [
    'Compounding\nis growth on\ngrowth — tiny\nwins add up.',
    'Deep work\nbeats busy work\nfor real progress.',
    'Learning a new skill\nimproves neural plasticity.',
    'Quality sleep\nenhances memory\nconsolidation.',
    'Focused study sessions\nare more effective\nthan multitasking.'
  ]
};

// Remote facts support (optional). If `factsEndpoint` is set in chrome.storage.local,
// we will fetch JSON shaped as { "IITJEE": [...], "NEET": [...], "Get 1% Smarter": [...] }.
// Fallback to bundled FUN_FACTS when remote is unavailable.
let REMOTE_FACTS = null;
async function loadRemoteFacts() {
  try {
    const { factsEndpoint, lastFactsSync } = await get(null);
    if (!factsEndpoint) return;
    // Refresh at most once per day
    const last = lastFactsSync ? new Date(lastFactsSync).getTime() : 0;
    if (Date.now() - last < 24 * 60 * 60 * 1000) return;
    const resp = await fetch(factsEndpoint, { cache: 'no-store' });
    if (!resp.ok) return;
    const data = await resp.json();
    if (data && typeof data === 'object') {
      REMOTE_FACTS = data;
      await set({ lastFactsSync: new Date().toISOString() });
      track('fun_facts_synced_v1', { ok: true });
    }
  } catch (e) {
    track('fun_facts_synced_v1', { ok: false, err: String(e) });
  }
}
function getFactList(cohort) {
  const remote = REMOTE_FACTS && Array.isArray(REMOTE_FACTS[cohort]) ? REMOTE_FACTS[cohort] : null;
  return remote || (FUN_FACTS[cohort] || []);
}

// Pick a random fact index for a given cohort while avoiding repeats for 21 days.
// Maintains a per‑cohort history of recently shown indices in chrome.storage.local
// under the key `factHistory`.  Each history entry includes the index and the
// timestamp when it was shown.  When all facts for a cohort have been
// exhausted within the 21‑day window, the history is reset so the pool of
// available facts is replenished.
async function pickRandomFactIndex(cohort) {
  try {
    const list = getFactList(cohort) || [];
    const listLen = list.length;
    if (!listLen) return 0;
    let history = (await get('factHistory')) || {};
    // Ensure we have an array for this cohort
    let catHist = Array.isArray(history[cohort]) ? history[cohort] : [];
    // Prune history entries older than 21 days
    const cutoff = Date.now() - 21 * 24 * 60 * 60 * 1000;
    catHist = catHist.filter(it => {
      const t = new Date(it.date).getTime();
      return t >= cutoff;
    });
    // Determine used indices in the recent window
    const used = new Set(catHist.map(it => it.index));
    // Build a list of available indices
    let available = [];
    for (let i = 0; i < listLen; i++) {
      if (!used.has(i)) available.push(i);
    }
    // If no indices are available (all have been shown recently), reset history
    // and allow the full list again
    if (available.length === 0) {
      available = Array.from({ length: listLen }, (_, i) => i);
      catHist = [];
    }
    // Pick a random index from the available pool
    const randomIndex = available[Math.floor(Math.random() * available.length)];
    // Record this fact in history
    catHist.push({ index: randomIndex, date: new Date().toISOString() });
    history[cohort] = catHist;
    await set({ factHistory: history });
    return randomIndex;
  } catch (e) {
    // On error fallback to sequential index 0
    return 0;
  }
}

// Helper: enforce a per‑day limit on the number of times a user can click
// the "Next fact" button.  If the limit has been reached, returns false
// and optionally triggers a notification.  Otherwise increments the click
// count and returns true.  The click count resets at midnight each day.
async function canClickNext() {
  const todayStr = new Date().toDateString();
  let storedDate = await get('nextFactClickDate');
  let count = (await get('nextFactClickCount')) || 0;
  if (storedDate !== todayStr) {
    // New day: reset the counter
    storedDate = todayStr;
    count = 0;
  }
  if (count >= 3) {
    return false;
  }
  // Increment and persist
  count++;
  await set({ nextFactClickDate: storedDate, nextFactClickCount: count });
  return true;
}

// Helper: read feature flag. Returns boolean.
//
// By default the cohort card should be visible so that first‑time users can
// immediately see and pick their cohort without digging through a hidden
// feature flag. Previously this returned the truthiness of the stored value,
// which meant that an undefined value (when no flag had been set) evaluated
// to false and suppressed the card entirely. As a result some users
// never discovered the fun fact card. To address this we now treat an
// undefined flag as `true`, only hiding the card when the value has been
// explicitly set to `false`. If the storage API fails we also default to
// `true` for resilience.
async function getFlag() {
  try {
    const val = await get('features.cohortCard');
    // Only hide the card when the stored flag is explicitly false. Any other
    // value (undefined, null, true) yields true.
    return val !== false;
  } catch {
    // On storage error default to showing the card.
    return true;
  }
}

// Helper: format a fun fact into a poem‑like multi‑line string.
function formatFunFact(text, { min = 3, max = 4, maxLines = 5 } = {}) {
  const words = (text || '').split(/\s+/).filter(Boolean);
  if (!words.length) {
    return { formatted: '', truncated: false, full: text || '' };
  }
  const lines = [];
  let i = 0;
  while (i < words.length && lines.length < maxLines) {
    const remainingLines = maxLines - lines.length - 1;
    const remainingWords = words.length - i;
    const minForTail = remainingLines * min;
    const take = Math.min(max, Math.max(min, remainingWords - minForTail));
    lines.push(words.slice(i, i + take).join(' '));
    i += take;
  }
  const truncated = i < words.length;
  return { formatted: lines.join('\n'), truncated, full: text };
}

// Helper: handle 12‑hour fun fact rotation.
async function rotateIfDue(currentIndex, lastISO, listLen) {
  try {
    const last = lastISO ? new Date(lastISO).getTime() : 0;
    const due = Date.now() - last >= 24 * 60 * 60 * 1000;
    return {
      index: due
        ? ((currentIndex || 0) + 1) % Math.max(1, listLen)
        : currentIndex || 0,
      rotated: due
    };
  } catch {
    return { index: currentIndex || 0, rotated: false };
  }
}

// Build the cohort selector control.
// Accepts optional callbacks `onOpen` and `onClose` which are invoked when the
// dropdown is opened or closed, respectively. These callbacks can be used
// to toggle the visibility of other elements (e.g. hiding the fact text
// when the dropdown list is open).
function makeSelector(selected, onSelect, onOpen, onClose) {
  const wrap = document.createElement('div');
  wrap.className = 'selector';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('aria-haspopup', 'listbox');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', 'Choose your cohort');
  btn.textContent = selected || 'Choose…';
  wrap.appendChild(btn);

  let open = false;
  let listEl = null;

  function openList() {
    if (open) return;
    open = true;
    btn.setAttribute('aria-expanded', 'true');
    if (typeof onOpen === 'function') onOpen();
    listEl = document.createElement('ul');
    listEl.role = 'listbox';
    listEl.tabIndex = -1;
    listEl.style.cssText =
      'position:absolute; right:0; margin-top:6px; min-width:160px; max-height:180px; overflow:auto; ' +
      // Increase opacity of the neutral gradient so options are easier to read
      'background:linear-gradient(180deg, rgba(255,255,255,0.20), rgba(255,255,255,0.14)); backdrop-filter:blur(10px); ' +
      'border:1px solid rgba(255,255,255,0.28); border-radius:10px; padding:6px;';
    COHORTS.forEach((label, idx) => {
      const li = document.createElement('li');
      li.role = 'option';
      li.id = 'cohort-opt-' + idx;
      li.textContent = label;
      li.style.padding = '6px 8px';
      li.style.cursor = 'pointer';
      // Determine the underlying slug for comparison and selection.
      const slug = /\s+Exam$/i.test(label) ? label.replace(/\s+Exam$/i, '') : label;
      if (slug === selected) li.setAttribute('aria-selected', 'true');
      const choose = () => {
        // Use the underlying slug for storage and display after selection.
        selected = slug;
        btn.textContent = slug;
        onSelect(slug);
        closeList();
      };
      li.addEventListener('click', choose);
      li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          choose();
        }
      });
      listEl.appendChild(li);
    });
    wrap.appendChild(listEl);
    // Fade/slide the dropdown into view for a nicer UX
    listEl.style.opacity = '0';
    listEl.style.transform = 'translateY(6px)';
    requestAnimationFrame(() => {
      listEl.style.transition = 'opacity .25s ease, transform .25s ease';
      listEl.style.opacity = '1';
      listEl.style.transform = 'translateY(0)';
    });
    listEl.focus();
  }

  function closeList() {
    if (!open) return;
    open = false;
    btn.setAttribute('aria-expanded', 'false');
    if (typeof onClose === 'function') onClose();
    if (listEl) {
      listEl.remove();
      listEl = null;
    }
  }

  btn.addEventListener('click', () => (open ? closeList() : openList()));
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      openList();
      e.preventDefault();
    }
  });
  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) closeList();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeList();
  });
  return wrap;
}

// Hover tab to show card when cohort is "None".
function makeHoverTab(onReveal) {
  const tab = document.createElement('button');
  tab.className = 'cohort-hover-tab';
  tab.type = 'button';
  tab.title = 'Show cohort card';
  tab.setAttribute('aria-label', 'Show cohort card');
  tab.textContent = '›';
  // Show the cohort card on hover or click.  We removed the dynamic tooltip to
  // avoid overlapping text; the button’s title attribute still provides
  // accessible text for screen readers and browser tooltips.
  tab.addEventListener('mouseenter', () => {
    onReveal('hover');
  });
  tab.addEventListener('focus', () => onReveal('hover'));
  tab.addEventListener('click', () => onReveal('hover'));
  return tab;
}

// Main mount function. Creates and injects DOM elements.
async function mountCohortCard() {
  if (!(await getFlag())) return;
  // Create left rail container.
  const rail = document.createElement('aside');
  rail.className = 'left-rail';
  document.body.appendChild(rail);
  // Indicate that the cohort card is present so layout can adjust accordingly
  document.body.classList.add('has-cohort-card');

  // Create card container.
  const card = document.createElement('div');
  card.className = 'exam-card cohort-card';
  rail.appendChild(card);

  // Header.
  const head = document.createElement('div');
  head.className = 'head';
  const title = document.createElement('div');
  title.className = 'title';
  title.textContent = 'Cohort';
  head.appendChild(title);
  card.appendChild(head);

  const factEl = document.createElement('div');
  factEl.className = 'fact';
  card.appendChild(factEl);
  const factActions = document.createElement('div');
  factActions.className = 'fact-actions';
  card.appendChild(factActions);
  const expandBtn = document.createElement('button');
  expandBtn.className = 'linklike';
  expandBtn.type = 'button';
  expandBtn.textContent = 'Show full fact';
  expandBtn.setAttribute('aria-expanded', 'false');
  const nextBtn = document.createElement('button');
  nextBtn.className = 'linklike';
  nextBtn.type = 'button';
  // Provide a simple label for the next fun fact action.  QA text was removed
  // to avoid confusion for end users.
  nextBtn.textContent = 'Next fact';
  nextBtn.style.opacity = '.6';
  factActions.appendChild(expandBtn);
  factActions.appendChild(nextBtn);

  // Load saved state. Do not pick a default cohort automatically; we want users
  // to explicitly choose their cohort via the dropdown.  Leaving `userCohort`
  // undefined on first run ensures the selector shows "Choose…" and fun facts
  // are only displayed after a selection is made.  The fun fact index and
  // timestamp default to zero/null accordingly.
  let userCohort = await get('userCohort');
  let funFactIndex = (await get('funFactIndex')) ?? 0;
  let funFactTimestamp = (await get('funFactTimestamp')) || null;

  // Build selector and attach to header.  Pass callbacks to hide the fact
  // content when the dropdown is open and show it again when closed.  This
  // prevents the cohort list from overlapping the current fun fact.
  const selector = makeSelector(
    userCohort,
    async (choice) => {
      userCohort = choice;
      await set({ userCohort });
      track('cohort_select_v1', { cohort: choice });
      render();
    },
    () => {
      // onOpen: hide fact while dropdown list is visible
      factEl.style.visibility = 'hidden';
      factActions.style.visibility = 'hidden';
      // Hide the to-do popover while the cohort selector is open to prevent
      // overlapping UI elements. This ensures a clean, non‑intersecting layout.
      if (typeof todoPop !== 'undefined' && todoPop) {
        todoPop.style.visibility = 'hidden';
      }
    },
    () => {
      // onClose: restore fact visibility when dropdown closes
      factEl.style.visibility = '';
      factActions.style.visibility = '';
      // Restore the to-do popover when the cohort selector is closed.
      if (typeof todoPop !== 'undefined' && todoPop) {
        todoPop.style.visibility = '';
      }
    }
  );
  head.appendChild(selector);

  // Hover tab when cohort is None.
  const hoverTab = makeHoverTab((source) => {
    // When the user clicks or hovers the tab, temporarily clear the cohort
    // selection so that the card reappears in its default state.  We do not
    // persist this change to storage; the user’s original choice of "None"
    // remains saved if they wish to hide the card again later.
    userCohort = null;
    rail.style.display = '';
    track('card_hover_reveal_v1', {});
    render();
  });

  // Rotation.
  async function rotateIfNeeded() {
    // Only rotate when a cohort is selected and there are facts available.
    if (!userCohort || userCohort === 'None') return;
    const list = getFactList(userCohort) || [];
    if (!list.length) return;
    try {
      const lastTime = funFactTimestamp ? new Date(funFactTimestamp).getTime() : 0;
      const now = Date.now();
      // When more than 12 hours have passed since the last fact was shown,
      // pick a new random fact index that respects 21‑day history constraints.
      if (now - lastTime >= 24 * 60 * 60 * 1000) {
        const newIndex = await pickRandomFactIndex(userCohort);
        funFactIndex = newIndex;
        funFactTimestamp = new Date().toISOString();
        await set({ funFactIndex, funFactTimestamp });
        track('fun_fact_rotated_v2', { cohort: userCohort, index: newIndex });
      }
    } catch (e) {
      // swallow any rotation error quietly
    }
  }

  // Render fact content.
  function renderFact() {
    const list = getFactList(userCohort) || [];
    // When no cohort is chosen or "None" is selected, show an instructional message
    // instead of hiding the card entirely. This gives users a clear indication
    // of what to do next.
    if (!userCohort || userCohort === 'None') {
      factEl.textContent = 'Select a cohort from the dropdown to view academic study facts.';
      expandBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      return;
    }
    // If a cohort is selected but has no associated facts, show a fallback message.
    if (!list.length) {
      factEl.textContent = 'No academic study facts available for this cohort yet.';
      expandBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      return;
    }
    const raw = list[funFactIndex % list.length];
    const { formatted, truncated, full } = formatFunFact(raw);
    const expanded = expandBtn.getAttribute('aria-expanded') === 'true';
    factEl.textContent = expanded ? full : formatted;
    expandBtn.style.display = truncated ? '' : 'none';
    expandBtn.textContent = expanded ? 'Collapse' : 'Show full fact';
    // Ensure the Next fact button is visible when a cohort with facts is selected
    nextBtn.style.display = '';
    // Restart the fade animation on the fact element whenever the content changes
    factEl.style.animation = 'none';
    // Force a reflow to reset the animation
    void factEl.offsetWidth;
    factEl.style.animation = '';
  }

  expandBtn.addEventListener('click', () => {
    const nowExp = expandBtn.getAttribute('aria-expanded') !== 'true';
    expandBtn.setAttribute('aria-expanded', String(nowExp));
    track('card_expand_toggle_v1', { expanded: nowExp });
    renderFact();
  });
  nextBtn.addEventListener('click', async () => {
    // Do nothing if no cohort is selected or "None" is chosen
    if (!userCohort || userCohort === 'None') return;
    const list = getFactList(userCohort) || [];
    if (!list.length) return;
    // Enforce daily click limit; allow up to 3 clicks per day
    const canClick = await canClickNext();
    if (!canClick) {
      // Show a simple alert to inform the user that the limit has been reached
      alert('You are not allowed to click more than 3 times in a day.');
      return;
    }
    // Pick a random fact index respecting 21‑day history
    funFactIndex = await pickRandomFactIndex(userCohort);
    funFactTimestamp = new Date().toISOString();
    await set({ funFactIndex, funFactTimestamp });
    renderFact();
  });

  async function render() {
    // When the user selects "None" hide the card and show the hover tab.  Remove
    // the layout shifting class so other elements return to their default
    // positioning.
    if (userCohort === 'None') {
      rail.style.display = 'none';
      if (!document.body.contains(hoverTab)) {
        document.body.appendChild(hoverTab);
      }
      document.body.classList.remove('has-cohort-card');
      return;
    }
    // Otherwise, ensure the card is visible and the hover tab is removed.
    if (document.body.contains(hoverTab)) {
      hoverTab.remove();
    }
    rail.style.display = '';
    document.body.classList.add('has-cohort-card');
    // Update the header title based on cohort selection.  For the
    // "Get 1% Smarter" cohort, remove the separate heading entirely and allow
    // the selector button to occupy the full width of the header.  This
    // prevents the text from appearing twice (once as a heading and again on
    // the button).  For other cohorts, show "Academic Fact" when a cohort is
    // selected, and "Cohort" when no cohort or "None" is selected.
    if (!userCohort || userCohort === 'None') {
      title.textContent = 'Cohort';
      title.style.display = '';
      // Reset any full‑width styling on the selector from a previous state
      selector.style.flexGrow = '';
      const selBtn = selector.querySelector('button');
      if (selBtn) {
        selBtn.style.width = '';
        selBtn.style.textAlign = '';
      }
    } else if (userCohort === 'Get 1% Smarter') {
      // Hide the title and stretch the selector button
      title.textContent = '';
      title.style.display = 'none';
      selector.style.flexGrow = '1';
      const selBtn = selector.querySelector('button');
      if (selBtn) {
        selBtn.style.width = '100%';
        selBtn.style.textAlign = 'center';
      }
    } else {
      title.textContent = 'Academic Fact';
      title.style.display = '';
      // Reset any full‑width styling on the selector
      selector.style.flexGrow = '';
      const selBtn = selector.querySelector('button');
      if (selBtn) {
        selBtn.style.width = '';
        selBtn.style.textAlign = '';
      }
    }
    // Only rotate facts when a cohort is selected (truthy) and not "None".  If
    // no cohort is selected, `renderFact` will display an instructional message.
    if (userCohort) {
      await rotateIfNeeded();
    }
    renderFact();
  }

  // Initial render; track shown.
  track('cohort_card_shown_v1', { cohort: userCohort || 'unset', source: 'auto' });

  // schedule midnight local rollover so facts change exactly once per day
  function msUntilLocalMidnight(){
    const now = new Date();
    const next = new Date(now);
    next.setHours(24,0,0,0);
    return next - now;
  }
  function scheduleMidnightRollover(){
    const kick = async () => {
      try {
        if (userCohort && userCohort !== 'None') {
          const list = getFactList(userCohort);
          if (list.length) {
            // pick a fresh fact at midnight (respects 21-day history)
            const idx = await pickRandomFactIndex(userCohort);
            funFactIndex = idx;
            funFactTimestamp = new Date().toISOString();
            await set({ funFactIndex, funFactTimestamp });
            renderFact();
          }
        }
      } catch (_) {}
      setTimeout(kick, msUntilLocalMidnight() + 1000);
    };
    setTimeout(kick, msUntilLocalMidnight() + 1000);
  }
  render();
}

// Observe mutations to adjust layout dynamically
const examObserver = new MutationObserver(adjustExamCardLayout);
const examContainer = document.querySelector('.exam-tracker-container');
if (examContainer) {
  examObserver.observe(examContainer, { childList: true, subtree: false });
  adjustExamCardLayout();
}
