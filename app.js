(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const key = 'js7_progress_v1';
  const themeKey = 'js7_theme';
  const state = { day: 1 };

  function loadProgress(){
    try { return JSON.parse(localStorage.getItem(key) || '{}'); }
    catch(e){ console.warn('[progress] 解析失败', e); return {}; }
  }
  function saveProgress(day, qid, isCorrect){
    const data = loadProgress();
    data[day] = data[day] || {};
    data[day][qid] = !!isCorrect;
    localStorage.setItem(key, JSON.stringify(data));
  }
  function isDayComplete(day){
    const lesson = LESSONS.find(x => x.day === day);
    if(!lesson || !lesson.questions || !lesson.questions.length) return false;
    const data = loadProgress()[day] || {};
    return lesson.questions.every(q => data[q.id]);
  }
  function dayProgress(day){
    const lesson = LESSONS.find(x => x.day === day);
    if(!lesson) return { done:0, total:0 };
    const data = loadProgress()[day] || {};
    const done = lesson.questions.filter(q => data[q.id]).length;
    return { done, total: lesson.questions.length };
  }

  function renderDay(day){
    const d = LESSONS.find(x => x.day === day);
    if(!d){ console.warn('[render] 无此 day:', day); return; }
    state.day = day;
    $('#title').textContent = `JS 7天入门 - Day ${day}：${d.title}`;
    const prog = dayProgress(day);
    $('#progressText').textContent = `完成 ${prog.done}/${prog.total}`;
    const lockNext = !isDayComplete(day);
    const nextBtn = $('#next');
    nextBtn.disabled = lockNext || (day >= LESSONS.length);

    const html = `
      <div>
        <div class="intro">${d.intro || ''}</div>
        ${d.questions.map(q => `
          <div class="card" id="q-${q.id}">
            <div class="title">${q.title}</div>
            <div class="content">${q.content || ''}</div>
            ${renderInput(q)}
            <div class="actions">
              <button data-action="submit" data-qid="${q.id}">提交</button>
              <button data-action="hint" data-qid="${q.id}">提示</button>
              <button data-action="solution" data-qid="${q.id}">解析</button>
            </div>
            <div class="hint" id="hint-${q.id}">${q.hint || '暂无提示'}</div>
            <div class="sol" id="sol-${q.id}">${q.solution ? `<pre>${escapeHtml(String(q.solution))}</pre>` : '暂无解析'}</div>
            <div class="result" id="res-${q.id}"></div>
          </div>
        `).join('')}
        <div class="muted">完成本日全部题目后，“下一课”按钮将解锁。</div>
      </div>
    `;
    $('#lesson').innerHTML = html;
    $('#lesson').addEventListener('click', onClick, { once:false });
    restoreDoneHighlights();
    bindIntroDemos();
  }

  function renderInput(q){
    if(q.type === 'mcq'){
      const inputType = q.multiple ? 'checkbox' : 'radio';
      return `
        <div style="margin-top:8px">
          ${(q.options || []).map((opt,i)=>`
            <label style="display:block;margin:4px 0;">
              <input type="${inputType}" name="q_${q.id}" value="${i}"> ${escapeHtml(String(opt))}
            </label>
          `).join('')}
        </div>
      `;
    }
    if(q.type === 'text'){
      return `<textarea id="input-${q.id}" rows="10" style="width:100%;margin-top:8px;" placeholder="在此作答"></textarea>`;
    }
    return `<div class="muted">未知题型</div>`;
  }

  function onClick(e){
    const btn = e.target.closest('button[data-action]');
    if(!btn) return;
    const { action, qid } = btn.dataset;
    const lesson = LESSONS.find(x => x.day === state.day);
    const q = lesson?.questions.find(x => String(x.id) === qid);
    if(!q) return;

    if(action === 'hint') return toggle(`#hint-${qid}`);
    if(action === 'solution') return toggle(`#sol-${qid}`);
    if(action === 'submit'){
      const res = check(q);
      saveProgress(state.day, q.id, res.correct);
      const el = $(`#res-${qid}`);
      el.textContent = res.correct ? '✅ 正确' : `❌ 错误${res.msg ? '：' + res.msg : ''}`;
      el.className = `result ${res.correct ? 'ok' : 'err'}`;
      // 若为文本题，尝试执行代码并捕获输出
      if(q.type === 'text'){
        const code = $(`#input-${q.id}`)?.value ?? '';
        const outId = `out-${q.id}`;
        let out = document.getElementById(outId);
        if(!out){
          out = document.createElement('pre');
          out.id = outId;
          out.style.marginTop = '8px';
          out.style.background = '#f3f4f6';
          out.style.padding = '8px';
          const card = document.getElementById(`q-${q.id}`);
          card && card.appendChild(out);
        }
        try{
          const logs = [];
          const originalLog = console.log;
          console.log = (...args) => { logs.push(args.map(x => String(x)).join(' ')); };
          new Function(code)();
          console.log = originalLog;
          out.textContent = logs.length ? logs.join('\n') : '（无输出）';
        }catch(err){
          out.textContent = '运行错误：' + (err && err.message ? err.message : String(err));
        }
      }
      // 题目完成高亮
      const card = document.getElementById(`q-${q.id}`);
      if(card){ card.classList.toggle('done', !!res.correct); }
      const prog = dayProgress(state.day);
      $('#progressText').textContent = `完成 ${prog.done}/${prog.total}`;
      $('#next').disabled = !isDayComplete(state.day) || (state.day >= LESSONS.length);
    }
  }

  function toggle(sel){
    const el = $(sel);
    if(!el) return;
    el.style.display = (el.style.display === 'block') ? 'none' : 'block';
  }

  function norm(s){ return String(s).trim().toLowerCase(); }
  function check(q){
    try{
      if(q.type === 'mcq'){
        const nodes = $$(`input[name="q_${q.id}"]`);
        const picked = nodes.map((n,i)=>n.checked ? i : null).filter(x=>x!=null);
        const expect = (q.correct || []).slice().sort();
        const got = picked.slice().sort();
        const ok = JSON.stringify(got) === JSON.stringify(expect);
        return { correct: ok };
      }
      if(q.type === 'text'){
        const v = $(`#input-${q.id}`)?.value ?? '';
        if(q.validatorRegex){
          const ok = new RegExp(q.validatorRegex, 'i').test(v);
          return { correct: ok };
        }
        if(q.correctText){
          return { correct: norm(q.correctText) === norm(v) };
        }
        return { correct: false, msg: '未配置答案' };
      }
      return { correct: false, msg: '未知题型' };
    }catch(err){
      console.error('[check error]', err);
      return { correct: false, msg: '判题异常' };
    }
  }

  function escapeHtml(s){
    return s.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
  }

  // 恢复已完成题目的高亮
  function restoreDoneHighlights(){
    const data = loadProgress()[state.day] || {};
    Object.entries(data).forEach(([qid, ok]) => {
      const card = document.getElementById(`q-${qid}`);
      if(card && ok){ card.classList.add('done'); }
    });
  }

  function go(day){ location.hash = `#/day${day}`; }
  window.addEventListener('hashchange', () => {
    const m = location.hash.match(/#\/day(\d+)/);
    const day = m ? Number(m[1]) : 1;
    renderDay(Math.min(Math.max(day,1), LESSONS.length));
  });
  $('#prev').onclick = () => go(Math.max(1, state.day - 1));
  $('#next').onclick = () => go(Math.min(LESSONS.length, state.day + 1));
  // 主题切换
  const toggleBtn = document.getElementById('toggleTheme');
  function applyTheme(t){ document.body.setAttribute('data-theme', t); }
  const savedTheme = localStorage.getItem(themeKey) || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(savedTheme);
  if(toggleBtn){
    toggleBtn.onclick = () => {
      const cur = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(cur);
      localStorage.setItem(themeKey, cur);
    };
  }

  async function demoGetWeather(city){
    const out = document.getElementById('weatherOut');
    if(out) out.textContent = '加载中...';
    try{
      const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
      const res = await fetch(url);
      if(!res.ok) throw new Error('网络错误: ' + res.status);
      const data = await res.json();
      const cur = data.current_condition?.[0];
      const text = `${city}: ${cur?.temp_C}°C, ${cur?.weatherDesc?.[0]?.value || ''}`;
      if(out) out.textContent = text;
    }catch(e){
      console.error('fetch error', e);
      if(out) out.textContent = '获取失败，请稍后重试';
    }
  }
  function wordCount(text){
    const m = {};
    for(const w of text.toLowerCase().split(/\W+/).filter(Boolean)){
      m[w] = (m[w]||0)+1;
    }
    return m;
  }
  function top3(m){
    return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([w,c])=>w+':'+c).join(', ');
  }
  function bindIntroDemos(){
    const btnWeather = document.getElementById('demoWeather');
    if(btnWeather){
      btnWeather.onclick = () => demoGetWeather('北京');
    }
    const btnWC = document.getElementById('runWordCount');
    const wcOut = document.getElementById('wcOut');
    if(btnWC && wcOut){
      btnWC.onclick = () => {
        const text = 'Hello hello world, world!';
        console.log('[调试] 原始文本:', text);
        const m = wordCount(text);
        console.log('[调试] 统计结果:', m);
        wcOut.textContent = top3(m);
      };
    }
  }

  if(!location.hash) go(1); else window.dispatchEvent(new Event('hashchange'));
})();


