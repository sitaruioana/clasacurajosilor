/* Shared vocabulary experience; the existing sentence hints are retained. */
const originalRenderVocab = renderVocab;
const originalVocabHelp = vocabHelp;
const vocabOriginalCertificateUnlock = certificateUnlock;
certificateUnlock = function(){return route[0]==='llr'&&route[1]==='vocab'?'':vocabOriginalCertificateUnlock();};
const originalVocabCrumbs = crumbs;
crumbs = () => originalVocabCrumbs().replace('>learn</button>', '>Învață</button>');
const vocabProgressKey='curajosilor-vocab-progress-v1';
function vocabReadProgress(){
  try{const p=JSON.parse(localStorage.getItem(vocabProgressKey));if(p&&Number.isInteger(p.points)&&p.points>=0&&p.words&&typeof p.words==='object'&&!Array.isArray(p.words))return p;}catch(e){}
  return {points:0,words:{}};
}
function vocabToday(){return new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Bucharest',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
function vocabProgressContent(){
  const p=vocabReadProgress(),today=vocabToday(),words=Object.values(p.words);
  return `<div><strong>⭐ ${p.points}</strong><small>Punctele mele</small></div><div><strong>${words.filter(w=>w.lastDay===today).length}</strong><small>Cuvinte reușite azi</small></div><div><strong>${words.length} / ${VOCAB.length}</strong><small>Cuvinte reușite în total</small></div>`;
}
function vocabProgressWidget(){return `<section id="vocab-points" class="vocab-score" aria-label="Progresul meu">${vocabProgressContent()}</section>`;}
function vocabAward(ids){
  const p=vocabReadProgress(),today=vocabToday(),m=vocabModel();let earned=0;
  p.awards=p.awards||{};
  for(const i of new Set(ids)){
    if(!VOCAB[i])continue;const word=VOCAB[i][0],id=norm(word);
    const event=m.awardToken+':'+id;
    if(p.awards[event])continue;
    p.awards[event]=true;
    p.words[id]={word,lastDay:today};p.points++;earned++;
  }
  if(earned)try{localStorage.setItem(vocabProgressKey,JSON.stringify(p));}catch(e){}
  const panel=$('#vocab-points');if(panel)panel.innerHTML=vocabProgressContent();
  return earned;
}
function vocabRewardMessage(earned){return earned?`<div class="vocab-reward" role="status">⭐ +${earned} ${earned===1?'punct':'puncte'}! Bravo!</div>`:'';}
function vocabQuickNav(){
  if(!route[2])return '';
  return `<nav class="vocab-tabs" aria-label="Alege activitatea">${[['learn','📖 Învață'],['match','🧩 Perechi'],['similar','✏️ Scrie'],['gaps','💬 Propoziții'],['opposite','⭐ Sens opus']].map(([id,label])=>`<button type="button" ${route[2]===id?'aria-current="page"':''} onclick="go('llr','vocab','${id}')">${label}</button>`).join('')}</nav>`;
}
const vocabOriginalLoadProgress=loadProgress;
loadProgress=function(){return route[0]==='llr'&&route[1]==='vocab'&&route[2]&&route[2]!=='learn'?{}:vocabOriginalLoadProgress();};
function vocabSentenceCount(n){return n+' '+(n===1?'propoziție completată corect':'propoziții completate corect');}
function vocabRepeatRound(){
  const m=vocabModel();
  if(route[2]==='opposite'){m.bonusIds.forEach(i=>delete state[key('op'+i)]);}
  else m.batch.forEach(i=>delete state[key(i)]);
  m.awardToken=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);m.verified=false;
  diplomaReadyFor='';saveProgress();render();window.scrollTo(0,0);
}
// Consistent presentation for activity cards throughout the shared site.
function activityCardTitle(title){
  const text=String(title).replace(/^\d+\.\s*/, '').trim();
  if(/^\p{Extended_Pictographic}/u.test(text))return text;
  const icon=/^Alege/.test(text)?'🎯':/^Completează/.test(text)?'🧩':/^Transformă/.test(text)?'🔄':/^Detectiv/.test(text)?'🔎':/^Calculează/.test(text)?'🧮':/^Așază/.test(text)?'✏️':/^Rezolvă/.test(text)?'💡':/^Află/.test(text)?'🔎':route[0]==='science'?'🔬':route[0]==='math'?'🧮':route[1]==='punct'?'📄':'✍️';
  return icon+' '+text;
}
card=function(title,desc,action){return `<button class="card" onclick="${esc(action)}"><strong>${esc(activityCardTitle(title))}</strong><small>${esc(String(desc).trim().replace(/\.$/,''))}</small></button>`;};
const vocabOriginalView=view;
view=function(html){return vocabOriginalView(route[0]==='llr'&&route[1]==='vocab'?vocabProgressWidget()+vocabQuickNav()+html:html);};
const vocabOriginalVerify=vocabVerify;
vocabVerify=function(){
  vocabOriginalVerify();
  const list=VOCAB.map((v,i)=>({v,i})).filter(x=>x.v[2]),ids=[];
  for(const field of document.querySelectorAll('[data-answer]')){
    if(field.dataset.answer.split('|').map(norm).includes(norm(field.value))){const i=Number(field.dataset.id);ids.push(route[2]==='opposite'?list[i]?.i:i);}
  }
  const earned=vocabAward(ids);const score=$('#score');if(score)score.innerHTML+=vocabRewardMessage(earned);
};
// Existing classroom sequence: graniță was learned in first grade.
// Keep data indices stable for exercises, saved points and sentence hints.
const vocabInitialOrder = new Map(['graniță',...VOCAB.slice(0,23).map(v=>v[0])].map((word,i)=>[word,i]));
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
vocabStyle.textContent = `.cards>.card{display:flex;flex-direction:column;justify-content:flex-start;align-items:stretch;gap:10px}.cards>.card strong{margin:0;min-height:4.2em;line-height:1.4}.cards>.card small{display:block;margin:0;line-height:1.6}@supports(grid-template-rows:subgrid){.cards>.card{display:grid;grid-template-rows:subgrid;grid-row:span 2;align-content:start}.cards>.card strong{min-height:0}}.vocab-tabs{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 16px}.vocab-tabs button{border:1px solid #b7cbea;border-radius:10px;background:#fff;color:#34517e;padding:8px 12px;font-weight:650}.vocab-tabs button[aria-current=page]{background:#436dd0;color:#fff;border-color:#436dd0}.vocab-tabs button:focus-visible{outline:3px solid #ffb540;outline-offset:2px}.vocab-score{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:0 0 16px}.vocab-score>div{border:1px solid #d3dfed;background:#fff9e8;border-radius:13px;padding:10px;text-align:center}.vocab-score>div:nth-child(2){background:#edf8f1}.vocab-score>div:nth-child(3){background:#eef3ff}.vocab-score strong{display:block;font-size:1.2rem;color:#304c7d}.vocab-score small{display:block;font-size:.76rem;line-height:1.35;color:#52677d}.vocab-reward{background:#fff3bd;padding:10px 14px;border-radius:11px;font-weight:750;margin:10px 0}.vocab-flashcards{display:grid;grid-template-columns:repeat(auto-fit,minmax(125px,1fr));gap:12px}.vocab-flashcard{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;min-height:132px;width:100%;padding:14px 10px;border:2px solid var(--flash-border,#6c8dd9);border-radius:16px;background:var(--flash-bg,#f0f5ff);color:var(--ink);box-shadow:0 4px 16px #26344a08;text-align:center;overflow-wrap:anywhere}.vocab-flashcard[aria-pressed=true]{background:var(--flash-back,#e0edff);border-color:var(--flash-border,#6c8dd9)}.vocab-flashcard[data-color=pink]{--flash-border:#e36a9d;--flash-bg:#fff1f6;--flash-back:#ffe0ec}.vocab-flashcard[data-color=blue]{--flash-border:#5e92e0;--flash-bg:#eef5ff;--flash-back:#dceaff}.vocab-flashcard[data-color=green]{--flash-border:#55ab84;--flash-bg:#edf9f1;--flash-back:#d9f1e2}.vocab-flashcard[data-color=yellow]{--flash-border:#d9ac35;--flash-bg:#fff9e6;--flash-back:#fff0b5}.vocab-flashcard[data-color=purple]{--flash-border:#a17bd5;--flash-bg:#f7f0ff;--flash-back:#ecddff}.vocab-flashcard[data-color=orange]{--flash-border:#e59a51;--flash-bg:#fff4e9;--flash-back:#ffe6cd}.vocab-flashcard strong{font-size:1.12rem;line-height:1.35}.vocab-flashcard small{color:#52677d;font-size:.75rem;line-height:1.3}.vocab-flashcard:focus-visible{outline:3px solid #ffb540;outline-offset:3px}.vocab-sentence{font-size:1.3rem;line-height:1.9}.vocab-bank{display:flex;flex-wrap:wrap;gap:8px}.vocab-bank span{background:white;padding:4px 12px;border:1px solid #d7dfea;border-radius:14px}.vocab-progress{font-weight:700;color:#4563a1}.vocab-new{font-size:.8rem;color:#4563a1;font-weight:700}.vocab-end{font-size:1.3rem}@media(max-width:300px){.vocab-flashcards{grid-template-columns:1fr}}`;
document.head.appendChild(vocabStyle);
function vocabModel() {
  if (!state.__vocabV2) state.__vocabV2 = {completed:[],current:null,finished:false};
  const m=state.__vocabV2;
  if(m.version!==3){m.version=3;m.seen=[];m.batch=[];m.round=1;m.verified=false;m.practiceCounts={};}
  if(!m.awardToken)m.awardToken=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
  return m;
}
// Familiar classroom words get a modest preference when repeats are needed.
const vocabCommon = new Set(['opinie','mâhnit','sfios','patrie','vitală','îndemn','taină','bănuială','a isprăvi','a pomeni','graniță']);
function vocabWeight(i) {
  const date=vocabDates.get(i)||Date.parse(VOCAB[i][4])||0;
  const familiar=vocabCommon.has(VOCAB[i][0])?2.5:1;
  if(vocabInitialOrder.has(VOCAB[i][0]))return familiar;
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
    m.awardToken=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
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
function vocabFlashOrder(){
  return VOCAB.map((_,i)=>i).sort((a,b)=>{
    const dateDifference=(vocabDates.get(b)||Date.parse(VOCAB[b][4])||0)-(vocabDates.get(a)||Date.parse(VOCAB[a][4])||0);
    if(dateDifference)return dateDifference;
    return (vocabInitialOrder.get(VOCAB[b][0])??(24+b))-(vocabInitialOrder.get(VOCAB[a][0])??(24+a));
  });
}
function vocabFlashColors(count){
  const colors=[];
  while(colors.length<count){
    const group=vocabShuffle(['pink','blue','green','yellow','purple','orange']);
    if(group[0]===colors[colors.length-1])[group[0],group[1]]=[group[1],group[0]];
    colors.push(...group);
  }
  return colors.slice(0,count);
}
// Alternate the initial face every 14 calendar days in Europe/Bucharest.
function vocabExplanationFirst(){
  const days=Math.floor((Date.parse(vocabToday()+'T00:00:00Z')-Date.UTC(2026,9,30))/86400000);
  return Math.floor(Math.max(0,days)/14)%2===1;
}
let vocabLastFrontSide=vocabExplanationFirst();
window.addEventListener('focus',()=>{
  const side=vocabExplanationFirst();
  if(side!==vocabLastFrontSide){vocabLastFrontSide=side;if(route[0]==='llr'&&route[1]==='vocab'&&route[2]==='learn')render();}
});
function vocabFlip(button,i) {
  const back=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(back));
  const firstExplanation=button.dataset?.firstSide?button.dataset.firstSide==='explanation':vocabExplanationFirst();
  const explanation=back?!firstExplanation:firstExplanation;
  button.innerHTML=`<small>${explanation?'Explicație':'Cuvânt'}</small><strong>${esc(VOCAB[i][explanation?1:0])}</strong><small>Întoarce ↻</small>`;
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
  const earned=vocabAward(fields.filter(el=>el.dataset.answer.split('|').map(norm).includes(norm(el.value))).map(el=>Number(el.dataset.id)));
  const done=fields.length>0&&fields.every(el=>el.value.trim());vocabModel().verified=done;saveProgress();
  $('#score').innerHTML=`<div class="result">${good} din ${fields.length} răspunsuri corecte. ${good===fields.length?'Bravo! 🌟':done?'Poți corecta răspunsurile sau poți continua cu un alt set.':'Completează toate răspunsurile înainte să ceri alt set.'}</div>`+vocabRewardMessage(earned);
  $('#vocab-next-set').disabled=!done;
}
function vocabGapVerify() {
  const m=vocabModel(),i=m.current,el=document.querySelector('[data-answer]');if(!el||i===null)return;
  const ok=VOCAB_GAPS[i][1].split('|').map(norm).includes(norm(el.value));
  el.classList.toggle('good',ok);el.classList.toggle('bad',!ok);
  if(ok&&!m.completed.includes(i))m.completed.push(i);
  const earned=ok?vocabAward([i]):0;
  m.verified=ok;saveProgress();
  const counter=$('#vocab-completed');if(counter)counter.textContent=vocabSentenceCount(m.completed.length);
  $('#score').innerHTML=`<div class="result">${ok?'Corect! 🌟 Ai completat '+m.completed.length+' '+(m.completed.length===1?'propoziție.':'propoziții.'):'Mai încearcă! Poți folosi indiciul și poți corecta răspunsul.'}</div>`+vocabRewardMessage(earned);
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
  view(`<div class="hero"><h2>💬 Completează propozițiile</h2><p>Scrie numai cuvântul lipsă, la forma potrivită. Apasă „Ajutor” dacă ai nevoie de un indiciu.</p><p id="vocab-completed" class="vocab-progress" aria-live="polite">${vocabSentenceCount(m.completed.length)}</p></div><div class="panel"><p class="vocab-sentence">${esc(q)}</p>${vocabEntry(i,a)} <button class="btn alt" onclick="vocabHelp(${i})">💡 Ajutor</button><div id="vh${i}"></div><div class="row"><button class="btn" onclick="vocabGapVerify()">✓ Verifică</button><button id="vocab-next-gap" class="btn" onclick="vocabNextGap()" ${m.verified?'':'hidden'}>Următoarea propoziție →</button></div><div id="score" aria-live="polite"></div><button class="btn alt" onclick="vocabStop()">Mă opresc aici</button></div>`);
}
const VOCAB_BONUS = {
  'tandră':['duioasă','cu mustață de frișcă'],
  'înmiresmată':['aromată','încălțată cu banane'],
  'a cuteza':['a avea curaj','a gâdila un nor'],
  'impozant':['grandios','cu pijamale cu buline'],
  'ghidus':['poznaș','crocant ca un biscuit'],
  'feroce':['crud','cu papuci de iepuraș'],
  'mâhnit':['supărat','rotund ca o gogoașă'],
  'sfios':['rușinos','parfumat cu supă'],
  'vitală':['necesară','zburătoare ca o clătită','neesențială'],
  'fertil':['productiv','cu mustăți de morcov'],
  'a pizmui':['a fi invidios','a pieptăna o banană'],
  'a făgădui':['a-și da cuvântul','a cânta cu o roșie'],
  'a consola':['a alina','a învăța un cartof să danseze']
};
function vocabOppositeEntries(){return VOCAB.map((v,i)=>({v,i,extra:(window.VOCAB_ADDITIONS||[]).find(x=>x.word===v[0])})).filter(x=>x.v[2]&&(VOCAB_BONUS[x.v[0]]||x.extra?.bonusSimilar));}
function vocabOppositeChoices(entry){
  const {v,extra}=entry,meta=VOCAB_BONUS[v[0]];
  return {correct:meta?.[2]||v[2],similar:[v[1],meta?.[0]||extra.bonusSimilar],funny:meta?.[1]||extra.bonusFunny};
}
function vocabPickOpposite(i,value){vocabSetval('op'+i,value);renderVocab('opposite');}
function vocabOppositeVerify(){
  let good=0,ids=[];const fields=[...document.querySelectorAll('[data-answer]')];
  for(const field of fields){const ok=norm(field.value)===norm(field.dataset.answer);field.classList.toggle('good',ok);field.classList.toggle('bad',!ok);if(ok){good++;ids.push(Number(field.dataset.wordIndex));}}
  const earned=vocabAward(ids);$('#score').innerHTML=`<div class="result">${good} din ${fields.length} răspunsuri corecte. ${good===fields.length?'Bravo! 🌟':'Mai încearcă! 🌱'}</div>`+vocabRewardMessage(earned);
}
function vocabRenderOpposite(){
  const m=vocabModel(),entries=vocabOppositeEntries();
  m.bonusIds=entries.map(x=>x.i);m.bonusOptions=m.bonusOptions||{};
  const body=entries.map(entry=>{
    const {v,i}=entry,choices=vocabOppositeChoices(entry);
    if(!m.bonusOptions[i])m.bonusOptions[i]=vocabShuffle([...choices.similar,choices.funny,choices.correct]);
    return `<div class="task"><p><b>${esc(v[0])}</b></p><div class="options">${m.bonusOptions[i].map(option=>`<button type="button" class="option ${val('op'+i)===option?'chosen':''}" aria-pressed="${val('op'+i)===option}" onclick="vocabPickOpposite(${i},${esc(JSON.stringify(option))})">${esc(option)}</button>`).join('')}</div><input type="hidden" data-id="op${i}" data-word-index="${i}" data-answer="${esc(choices.correct)}" value="${esc(val('op'+i))}"></div>`;
  }).join('');
  saveProgress();
  view(`<div class="hero"><h2>⭐ Cuvinte cu sens opus</h2><p>Alege cuvântul cu sens opus! 🌟</p></div><div class="panel">${body}<div class="row"><button class="btn" onclick="vocabOppositeVerify()">✓ Verifică</button><button class="btn alt" onclick="vocabRepeatRound()">↺ Repetă runda</button></div><div id="score" aria-live="polite"></div></div>`);
}
renderVocab = function(level) {
  vocabApplyReleases();
  if(!level)return view(`<div class="hero"><h2>🌱 Vocabular</h2><p>🌟 ${VOCAB.length} de cuvinte în lucru!</p><div class="rule"><b>REȚINE!</b> Cuvintele cu sens asemănător exprimă idei apropiate. Cuvintele cu sens opus exprimă idei contrare.</div></div><div class="cards vocab-activities">${card('📖 Învață – Flashcarduri','Toate cuvintele, mereu la îndemână','go("llr","vocab","learn")')}${card('🧩 Găsește perechea','10 cuvinte în fiecare rundă','go("llr","vocab","match")')}${card('✏️ Scrie cuvinte cu sens asemănător','Seturi de 10 cuvinte și indicii dacă ai nevoie :)','go("llr","vocab","similar")')}${card('💬 Completează propozițiile','Propoziții pe rând, în ritmul tău','go("llr","vocab","gaps")')}${card('⭐ Cuvinte cu sens opus','Descoperă contrariile','go("llr","vocab","opposite")')}</div>`);
  if(level==='learn'){
    const ids=vocabFlashOrder();
    const colors=vocabFlashColors(ids.length),firstExplanation=vocabExplanationFirst();
    return view(`<div class="hero"><h2>📖 Învață – Flashcarduri</h2><p>🌟 ${VOCAB.length} de cuvinte în lucru!</p></div><div class="vocab-flashcards">${ids.map((i,j)=>`<button type="button" data-color="${colors[j]}" data-first-side="${firstExplanation?'explanation':'word'}" class="vocab-flashcard" aria-pressed="false" onclick="vocabFlip(this,${i})"><small>${firstExplanation?'Explicație':'Cuvânt'}</small><strong>${esc(VOCAB[i][firstExplanation?1:0])}</strong><small>Întoarce ↻</small></button>`).join('')}</div>`);
  }
  if(level==='gaps')return vocabRenderGaps();
  if(level==='opposite')return vocabRenderOpposite();
  if(level!=='match'&&level!=='similar')return originalRenderVocab(level);
  const ids=vocabEnsureBatch(),m=vocabModel(),options=vocabShuffle(ids).map(i=>VOCAB[i][1]);
  const body=(level==='similar'?`<div class="rule"><b>Lista de cuvinte:</b><div class="vocab-bank">${options.map(o=>`<span>${esc(o)}</span>`).join('')}</div></div>`:'')+ids.map((i,j)=>`<div class="task"><label><b>${j+1}. ${esc(VOCAB[i][0])}</b> → ${level==='match'?`<select class="entry" style="width:260px;max-width:100%" aria-label="Sensul cuvântului ${esc(VOCAB[i][0])}" data-answer="${esc(VOCAB[i][1])}" data-id="${i}" onchange="vocabSetval('${i}',this.value)"><option value="">Alege perechea</option>${options.map(o=>`<option value="${esc(o)}" ${val(i)===o?'selected':''}>${esc(o)}</option>`).join('')}</select>`:vocabEntry(i,VOCAB[i][1])}</label>${level==='similar'?` <button class="btn alt" onclick="vocabSimilarHelp(${i})">💡 Indiciu</button><div class="hint" id="vsh${i}" hidden></div>`:''}</div>`).join('');
  view(`<div class="hero"><h2>${level==='match'?'🧩 Găsește perechea':'✏️ Scrie cuvinte cu sens asemănător'}</h2><p>${level==='match'?'Găsește perechile! 🌟':'Scrie perechile! 💡 Indiciul te ajută.'}</p><p class="vocab-progress">Runda ${m.round} · ${ids.length} cuvinte</p></div><div class="panel">${body}<div class="row"><button class="btn" onclick="vocabBatchVerify()">✓ Verifică</button><button class="btn alt" onclick="vocabRepeatRound()">↺ Repetă runda</button></div><div id="score" aria-live="polite"></div><button id="vocab-next-set" class="btn pink" onclick="vocabNextSet()" ${m.verified?'':'disabled'}>Încă o rundă! →</button></div>`);
};
// The new route is registered before resolving a direct flashcard link.
route=routeFromPath();state=loadProgress();render();
