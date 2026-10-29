/* Shared vocabulary experience; the existing sentence hints are retained. */
const originalRenderVocab = renderVocab;
const originalVocabHelp = vocabHelp;
const originalVocabCrumbs = crumbs;
crumbs = () => originalVocabCrumbs().replace('>learn</button>', '>Învață</button>');
const vocabDates = new Map();
const vocabLessons = new Map();
function vocabApplyReleases() {
  let changed=false;
  for (const item of window.VOCAB_ADDITIONS || []) {
    if (item.releaseAt && Date.parse(item.releaseAt)>Date.now()) continue;
    let i=VOCAB.findIndex(v=>v[0]===item.word);
    if(i<0){i=VOCAB.length;VOCAB.push([item.word,item.meaning,item.opposite||'',item.sentence||'']);changed=true;}
    if(item.sentence&&item.answers)VOCAB_GAPS[i]=[item.sentence,item.answers];
    vocabDates.set(i,Date.parse(item.addedAt||item.releaseAt)||0);
    if(item.lesson)vocabLessons.set(i,item.lesson);
  }
  return changed;
}
vocabApplyReleases();
function vocabScheduleRelease() {
  const next=Math.min(...(window.VOCAB_ADDITIONS||[]).map(item=>Date.parse(item.releaseAt)).filter(date=>date>Date.now()));
  if(!Number.isFinite(next))return;
  setTimeout(()=>{vocabApplyReleases();if(route[0]==='llr'&&route[1]==='vocab')render();vocabScheduleRelease();},Math.min(2147483647,Math.max(1,next-Date.now())));
}
window.addEventListener('focus',()=>{if(vocabApplyReleases()&&route[0]==='llr'&&route[1]==='vocab')render();});
vocabScheduleRelease();
FRIENDLY_ROUTES['vocabular/invata'] = ['llr','vocab','learn'];
const vocabStyle = document.createElement('style');
vocabStyle.textContent = `.vocab-flashcards{display:grid;grid-template-columns:repeat(auto-fit,minmax(245px,1fr));gap:16px}.vocab-flashcard{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;min-height:205px;width:100%;padding:24px;border:2px solid #cbdaf0;border-radius:20px;background:#fff;color:var(--ink);box-shadow:0 4px 16px #26344a08;text-align:center;overflow-wrap:anywhere}.vocab-flashcard[aria-pressed=true]{background:#e6f7ee;border-color:#7dbfa1}.vocab-flashcard strong{font-size:1.45rem}.vocab-flashcard small{color:#52677d}.vocab-flashcard:focus-visible{outline:3px solid #ffb540;outline-offset:3px}.vocab-sentence{font-size:1.3rem;line-height:1.9}.vocab-bank{display:flex;flex-wrap:wrap;gap:8px}.vocab-bank span{background:white;padding:4px 12px;border:1px solid #d7dfea;border-radius:14px}.vocab-progress{font-weight:700;color:#4563a1}.vocab-new{font-size:.8rem;color:#4563a1;font-weight:700}.vocab-end{font-size:1.3rem}@media(max-width:420px){.vocab-flashcards{grid-template-columns:1fr}.vocab-flashcard{min-height:180px}}`;
document.head.appendChild(vocabStyle);
function vocabModel() {
  if (!state.__vocabV2) state.__vocabV2 = {completed:[],current:null,finished:false};
  const m=state.__vocabV2;
  if(m.version!==3){m.version=3;m.seen=[];m.batch=[];m.round=1;m.verified=false;m.practiceCounts={};}
  return m;
}
// Familiar classroom words get a modest preference when repeats are needed.
const vocabCommon = new Set(['opinie','mâhnit','sfios','patrie','vitală','îndemn','taină','bănuială','a isprăvi','a pomeni','graniță']);
function vocabWeight(i) {
  const date=vocabDates.get(i)||Date.parse(VOCAB[i][4])||0;
  const familiar=vocabCommon.has(VOCAB[i][0])?2.5:1;
  return date?familiar+5*Math.exp(-Math.max(0,(Date.now()-date)/86400000)/30):familiar;
}
function vocabWeightedOrder(ids, random = Math.random) {
  return ids.map(i=>({i,key:-Math.log(Math.max(Number.MIN_VALUE,random()))/vocabWeight(i)})).sort((a,b)=>a.key-b.key).map(x=>x.i);
}
function vocabShuffle(ids) { const a=[...ids]; for(let j=a.length-1;j>0;j--){const k=Math.floor(Math.random()*(j+1));[a[j],a[k]]=[a[k],a[j]];}return a; }
function vocabEnsureBatch() {
  vocabApplyReleases();
  const m=vocabModel(),signature=VOCAB.map(v=>v[0]).join('|');
  if(m.signature!==signature){m.batch=[];m.verified=false;m.signature=signature;}
  if(!m.batch.length){
    const selected=[];
    const add=(ids,limit)=>{for(const i of ids){if(selected.length>=limit)break;if(!selected.includes(i))selected.push(i);}};
    // Rotate lesson words fairly: every round includes each released lesson.
    const groups=[...new Set(vocabLessons.values())].map(lesson=>vocabWeightedOrder([...vocabLessons.keys()].filter(i=>vocabLessons.get(i)===lesson)).sort((a,b)=>(m.practiceCounts[a]||0)-(m.practiceCounts[b]||0)));
    const lessonSlots=Math.min(6,groups.reduce((n,g)=>n+g.length,0));
    while(selected.length<lessonSlots){let changed=false;for(const g of groups){const i=g.find(i=>!selected.includes(i));if(i!==undefined&&selected.length<lessonSlots){selected.push(i);changed=true;}}if(!changed)break;}
    const all=VOCAB.map((_,i)=>i);
    add(vocabWeightedOrder(all.filter(i=>!m.seen.includes(i))),10);
    add(vocabWeightedOrder(all),10);
    m.batch=vocabShuffle(selected);
    m.seen=[...new Set([...m.seen,...m.batch])];
    m.batch.forEach(i=>{m.practiceCounts[i]=(m.practiceCounts[i]||0)+1;delete state[key(i)];});
    m.verified=false;saveProgress();
  }
  return m.batch;
}
function vocabSetval(id,value) {
  diplomaReadyFor='';state[key(id)]=value;vocabModel().verified=false;saveProgress();
  const score=$('#score');if(score)score.innerHTML='';
  const next=$('#vocab-next-set');if(next)next.disabled=true;
}
function vocabEntry(i,answer) {
  return `<input class="entry" style="width:230px;max-width:100%" aria-label="Răspuns" data-id="${i}" data-answer="${esc(answer)}" value="${esc(val(i))}" oninput="vocabSetval('${i}',this.value)" placeholder="Scrie aici" autocomplete="off">`;
}
function vocabLetterHint(answer) {
  let words=answer.trim().split(/\s+/), index=words[0].toLocaleLowerCase('ro')==='a'&&words.length>1?(words[1]==='se'&&words.length>2?2:1):0;
  return words.map((word,j)=>j<index?word: j===index?Array.from(word)[0]+'_'.repeat(Math.max(0,Array.from(word).length-1)):'_'.repeat(Array.from(word).length)).join(' ');
}
function vocabSimilarHelp(i) {
  const hint=$('#vsh'+i);hint.hidden=!hint.hidden;
  hint.textContent='Începe așa: '+vocabLetterHint(VOCAB[i][1]);
}
function vocabFlip(button,i) {
  const back=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(back));
  button.innerHTML=`<small>${back?'Sensul cuvântului':'Cuvânt'}</small><strong>${esc(VOCAB[i][back?1:0])}</strong><small>${back?'Apasă pentru a vedea cuvântul':'Apasă pentru explicație'}</small>`;
}
function vocabNextSet() {
  const m=vocabModel();if(!m.verified)return;
  m.batch.forEach(i=>delete state[key(i)]);m.batch=[];m.verified=false;diplomaReadyFor='';
  m.round++;
  saveProgress();render();window.scrollTo(0,0);
}
function vocabBatchVerify() {
  const fields=[...document.querySelectorAll('[data-answer]')];let good=0;
  fields.forEach(el=>{const ok=el.dataset.answer.split('|').map(norm).includes(norm(el.value));good+=Number(ok);el.classList.toggle('good',ok);el.classList.toggle('bad',!ok);});
  const done=fields.length>0&&fields.every(el=>el.value.trim());vocabModel().verified=done;saveProgress();
  $('#score').innerHTML=`<div class="result">${good} din ${fields.length} răspunsuri corecte. ${good===fields.length?'Bravo! 🌟':done?'Poți corecta răspunsurile sau poți continua cu un alt set.':'Completează toate răspunsurile înainte să ceri alt set.'}</div>`+(good===fields.length?certificateUnlock():'');
  $('#vocab-next-set').disabled=!done;
}
function vocabGapVerify() {
  const m=vocabModel(),i=m.current,el=document.querySelector('[data-answer]');if(!el||i===null)return;
  const ok=VOCAB_GAPS[i][1].split('|').map(norm).includes(norm(el.value));
  el.classList.toggle('good',ok);el.classList.toggle('bad',!ok);
  if(ok&&!m.completed.includes(i))m.completed.push(i);
  m.verified=ok;saveProgress();
  const counter=$('#vocab-completed');if(counter)counter.textContent=m.completed.length+' propoziții completate corect';
  $('#score').innerHTML=`<div class="result">${ok?'Corect! 🌟 Ai completat '+m.completed.length+' '+(m.completed.length===1?'propoziție.':'propoziții.'):'Mai încearcă! Poți folosi indiciul și poți corecta răspunsul.'}</div>`;
  $('#vocab-next-gap').hidden=!ok;
}
function vocabNextGap() {
  const m=vocabModel();if(!m.verified)return;
  m.current=null;m.verified=false;saveProgress();render();
}
function vocabStop() {vocabModel().finished=true;saveProgress();render();}
function vocabRestartGaps() {state={};diplomaReadyFor='';saveProgress();render();}
function vocabRenderGaps() {
  const m=vocabModel(),ids=VOCAB_GAPS.map((_,i)=>i).filter(i=>VOCAB_GAPS[i]);
  if(m.finished||m.completed.length>=ids.length){
    const count=m.completed.length;
    return view(`<div class="hero"><h2>🌟 Bravo pentru perseverență!</h2><p class="vocab-end">Ai avut perseverența să completezi corect <b>${count} ${count===1?'propoziție':'propoziții'}</b>!</p><p>Fiecare pas contează. Revino când ai poftă să mai exersezi.</p>${!m.finished&&count===ids.length?certificateUnlock():''}<button class="btn" onclick="vocabRestartGaps()">Încep o rundă nouă</button><button class="btn alt" onclick="go('llr','vocab')">Înapoi la vocabular</button></div>`);
  }
  if(m.current===null||!ids.includes(m.current)){
    m.current=vocabWeightedOrder(ids.filter(i=>!m.completed.includes(i)))[0];m.verified=false;saveProgress();
  }
  const i=m.current,[q,a]=VOCAB_GAPS[i];
  view(`<div class="hero"><h2>Nivelul 3 – Completează propozițiile</h2><p>Scrie numai cuvântul lipsă, la forma potrivită. Apasă „Ajutor” dacă ai nevoie de un indiciu.</p><p id="vocab-completed" class="vocab-progress" aria-live="polite">${m.completed.length} propoziții completate corect</p></div><div class="panel"><p class="vocab-sentence">${esc(q)}</p>${vocabEntry(i,a)} <button class="btn alt" onclick="vocabHelp(${i})">💡 Ajutor</button><div id="vh${i}"></div><div class="row"><button class="btn" onclick="vocabGapVerify()">✓ Verifică</button><button id="vocab-next-gap" class="btn" onclick="vocabNextGap()" ${m.verified?'':'hidden'}>Următoarea propoziție →</button></div><div id="score" aria-live="polite"></div><button class="btn alt" onclick="vocabStop()">Mă opresc aici</button></div>`);
}
renderVocab = function(level) {
  vocabApplyReleases();
  if(!level)return view(`<div class="hero"><h2>🌱 Vocabular</h2><p>🌟 ${VOCAB.length} de cuvinte în lucru!</p><div class="rule"><b>REȚINE!</b> Cuvintele cu sens asemănător exprimă idei apropiate. Cuvintele cu sens opus exprimă idei contrare.</div></div><div class="cards">${card('📖 Învață – Flashcarduri','Toate cuvintele pe o singură pagină. Cele noi sunt primele.','go("llr","vocab","learn")')}${card('1. Găsește perechea','10 cuvinte în fiecare rundă','go("llr","vocab","match")')}${card('2. Scrie cuvinte cu sens asemănător','10 cuvinte și un indiciu la nevoie','go("llr","vocab","similar")')}${card('3. Completează propozițiile','O propoziție pe rând. Te oprești când vrei.','go("llr","vocab","gaps")')}${card('⭐ Bonus: Cuvinte cu sens opus','Descoperă contrariile','go("llr","vocab","opposite")')}</div>`);
  if(level==='learn'){
    const ids=VOCAB.map((_,i)=>i).sort((a,b)=>((vocabDates.get(b)||Date.parse(VOCAB[b][4])||0)-(vocabDates.get(a)||Date.parse(VOCAB[a][4])||0)) || (b>=23||a>=23?b-a:a-b));
    return view(`<div class="hero"><h2>📖 Învață – Flashcarduri</h2><p>🌟 ${VOCAB.length} de cuvinte în lucru!</p></div><div class="vocab-flashcards">${ids.map(i=>`<button type="button" class="vocab-flashcard" aria-pressed="false" onclick="vocabFlip(this,${i})"><small>Cuvânt</small><strong>${esc(VOCAB[i][0])}</strong><small>Apasă pentru explicație</small></button>`).join('')}</div>`);
  }
  if(level==='gaps')return vocabRenderGaps();
  if(level!=='match'&&level!=='similar')return originalRenderVocab(level);
  const ids=vocabEnsureBatch(),m=vocabModel(),options=vocabShuffle(ids).map(i=>VOCAB[i][1]);
  const body=(level==='similar'?`<div class="rule"><b>Lista de cuvinte:</b><div class="vocab-bank">${options.map(o=>`<span>${esc(o)}</span>`).join('')}</div></div>`:'')+ids.map((i,j)=>`<div class="task"><label><b>${j+1}. ${esc(VOCAB[i][0])}</b> → ${level==='match'?`<select class="entry" style="width:260px;max-width:100%" aria-label="Sensul cuvântului ${esc(VOCAB[i][0])}" data-answer="${esc(VOCAB[i][1])}" data-id="${i}" onchange="vocabSetval('${i}',this.value)"><option value="">Alege perechea</option>${options.map(o=>`<option value="${esc(o)}" ${val(i)===o?'selected':''}>${esc(o)}</option>`).join('')}</select>`:vocabEntry(i,VOCAB[i][1])}</label>${level==='similar'?` <button class="btn alt" onclick="vocabSimilarHelp(${i})">💡 Indiciu</button><div class="hint" id="vsh${i}" hidden></div>`:''}</div>`).join('');
  view(`<div class="hero"><h2>${level==='match'?'Nivelul 1 – Găsește perechea':'Nivelul 2 – Sens asemănător'}</h2><p>${level==='match'?'Găsește perechile! 🌟':'Scrie perechile! 💡 Indiciul te ajută.'}</p><p class="vocab-progress">Runda ${m.round} · ${ids.length} cuvinte</p></div><div class="panel">${body}<div class="row"><button class="btn" onclick="vocabBatchVerify()">✓ Verifică</button><button class="btn alt" onclick="resetTask()">↺ Încep din nou</button></div><div id="score" aria-live="polite"></div><button id="vocab-next-set" class="btn pink" onclick="vocabNextSet()" ${m.verified?'':'disabled'}>Încă o rundă! →</button></div>`);
};
// The new route is registered before resolving a direct flashcard link.
route=routeFromPath();state=loadProgress();render();
