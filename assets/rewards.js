const SCORE_SWITCH_AT=Date.parse('2026-12-01T00:00:00+02:00');
const SCORE_CATEGORIES={vocab:['⭐','Vocabular'],grammar:['🤩','Gramatică'],
 ortho:['💥','Ortograme'],punctuation:['✨','Punctuație'],multiply:['❎','Înmulțire'],math:['💎','Matematică'],science:['❤️','Științe']};
function scoreSplitActive(now=Date.now()){return now>=SCORE_SWITCH_AT;}
function scoreCategory(subject,currentRoute=route){
 if(subject==='science')return 'science';
 if(subject==='math')return currentRoute[0]==='math'&&currentRoute[1]==='multiply'?'multiply':'math';
 if(subject==='llr'){
  if(currentRoute[0]==='llr'&&currentRoute[1]==='vocab')return 'vocab';
  if(currentRoute[0]==='llr'&&currentRoute[1]==='ortho')return 'ortho';
  if(currentRoute[0]==='llr'&&currentRoute[1]==='punct')return 'punctuation';
  return 'grammar';
 }
 return null;
}
function scoreSplitData(p){
 if(!p.scoreSplitV1||typeof p.scoreSplitV1!=='object'||Array.isArray(p.scoreSplitV1))p.scoreSplitV1={};
 for(const k of ['vocab','grammar','ortho','punctuation','multiply','math'])if(!Number.isSafeInteger(p.scoreSplitV1[k])||p.scoreSplitV1[k]<0)p.scoreSplitV1[k]=k==='math'?p.totals.math:0;
 return p.scoreSplitV1;
}
function scoreValues(p){const v=scoreSplitData(p);return {vocab:v.vocab,grammar:v.grammar,ortho:v.ortho,punctuation:v.punctuation,multiply:v.multiply,math:v.math,science:p.totals.science};}
function scoreNewRows(p){const values=scoreValues(p);return Object.entries(SCORE_CATEGORIES).map(([id,[icon,name]])=>`${icon} <b>${values[id]}</b> ${name}`).join('<br>');}
function scoreOldLlrVisible(){return Date.now()<Date.parse('2026-12-02T00:00:00+02:00');}
function scoreOldLlr(p){return scoreOldLlrVisible()?'<p>⭐ Stele LLR vechi: <b>'+p.totals.llr+'</b> (până la 2 decembrie)</p>':'';}
function scoreLegacyRows(p){return '';}

/* Persistent rewards are independent of the answers in a practice attempt. */
const REWARD_KEY='curajosilor-rewards-v2';
const PASSPORT_INDEX='curajosilor-passport-profiles-v1';
function passportIndex(){try{const x=JSON.parse(localStorage.getItem(PASSPORT_INDEX));if(x&&x.version===1&&Array.isArray(x.ids)&&x.ids.every(id=>typeof id==='string'&&/^p-[a-z0-9-]+$/.test(id))&&(x.active==='default'||x.ids.includes(x.active)))return x;}catch(e){}return {version:1,active:'default',ids:[]};}
function passportKey(id=passportIndex().active){return id==='default'?REWARD_KEY:REWARD_KEY+':'+id;}

const REWARD_SUBJECTS={llr:['⭐','LLR'],science:['❤️','Științe'],math:['💎','Matematică']};
const REWARD_CHAPTERS=[];
function rewardChapter(id,subject,title,stages,diploma=false){REWARD_CHAPTERS.push({id,subject,title,diploma,stages:stages.map(([label,r])=>({label,route:r,id:r.join('/')}))});}
for(const op of ['add','sub'])rewardChapter('math-'+op,'math',op==='add'?'Adunarea':'Scăderea',mathNames.map((n,i)=>[(i+1)+'. '+n,['math',op,String(i)]]),true);
rewardChapter('math-unknown','math','Aflarea numărului necunoscut',Object.entries(UNKNOWN_TYPES).flatMap(([type,[name]])=>Object.entries(UNKNOWN_LEVELS).map(([level,[label]])=>[name+' · '+label,['math','unknown',type,level]])),true);
rewardChapter('math-order','math','Ordinea operațiilor',Object.entries(ORDER_TYPES).map(([id,[name]])=>[name,['math','order',id]]),true);
const rewardNumerTitles=['Numere consecutive','Șiruri cu pas','Numerotarea paginilor: cifre','Numerotarea paginilor: pagini','Strângeri de mână și perechi','Formarea numerelor: cifre diferite','Formarea numerelor: pare și impare'];
rewardChapter('math-numer','math','Detectivii numerelor',rewardNumerTitles.map((name,i)=>[(i+1)+'. '+name,['math','numer',String(i)]]),true);
rewardChapter('llr-vocab','llr','Vocabular',[['Găsește perechea · o rundă de 10',['llr','vocab','match']],['Scrie cuvinte · o rundă de 10',['llr','vocab','similar']],['Completează 10 propoziții',['llr','vocab','gaps']]]);
for(const [type,title] of Object.entries(orthoNames)){
 const transform=type!=='comp'&&(!EXTRA_ORTHO[type]||!!EXTRA_ORTHO[type].transforms);
 rewardChapter('ortho-'+type,'llr','Ortograme: '+title,[['Alege forma corectă','choose'],['Completează textul','text'],...(transform?[['Transformă după model','transform']]:[]),['Detectivul greșelilor','errors']].map(([n,p])=>[n,['llr','ortho',type,p]]));
}
for(const level of ['easy','hard'])rewardChapter('punct-'+level,'llr',level==='easy'?'Pune semnele corect':'🦠 Vindecă-te de virgulită!',DATA.punct.map(([name],i)=>[name,['llr','punct',level,String(i)]]));
for(const [id,lesson] of Object.entries(SCIENCE_LESSONS))rewardChapter('science-'+id,'science',lesson.title,lesson.sections.map(p=>[scienceActivities[p][0],['science','lessons',id,p]]));
rewardChapter('science-experiments','science','Experimente',SCIENCE.map((e,i)=>[(i+1)+'. '+e.title,['science',String(i)]]));
function rewardRead(){
 let p;try{p=JSON.parse(localStorage.getItem(passportKey()))}catch(e){}
 if(!p||typeof p!=='object'||Array.isArray(p))p={};
 p.totals=p.totals&&typeof p.totals==='object'?p.totals:{};
 for(const key of Object.keys(REWARD_SUBJECTS))if(!Number.isSafeInteger(p.totals[key])||p.totals[key]<0)p.totals[key]=0;
 p.stages=p.stages&&typeof p.stages==='object'?p.stages:{};
 p.experiments=p.experiments&&typeof p.experiments==='object'?p.experiments:{};
 if(!p.vocabMigrated){p.totals.llr+=vocabReadProgress().points;p.vocabMigrated=true;rewardSave(p);}
 if(!scoreOldLlrVisible() && !p.oldLlrClearedV1){p.totals.llr=0;p.oldLlrClearedV1=true;rewardSave(p);}
 return p;
}
function rewardSave(p){try{localStorage.setItem(passportKey(),JSON.stringify(p));return true}catch(e){return false}}
function rewardBar(){const p=rewardRead();return `<section class="reward-bar" aria-label="Comorile mele"><div class="reward-balances">${Object.entries(scoreSplitActive()?SCORE_CATEGORIES:REWARD_SUBJECTS).map(([key,[icon,name]])=>{const count=scoreSplitActive()?scoreValues(p)[key]:p.totals[key];return `<span aria-label="${name}: ${count}">${icon} <b>${count}</b><small>${name}</small></span>`;}).join('')}</div><button type="button" class="btn alt" onclick="go('passport')">🧭 Progresul meu</button></section>`;}
function rewardRefresh(){const el=document.getElementById('reward-bar');if(el)el.innerHTML=rewardBar();}
function rewardAttempt(){if(!state.__rewardAttempt)state.__rewardAttempt=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);return state.__rewardAttempt;}
function rewardGrant(subject,ids,token=rewardAttempt()){
 if(!REWARD_SUBJECTS[subject])return 0;
 const paid=state.__rewardPaid||(state.__rewardPaid={});let earned=0;
 for(const id of new Set(ids)){const event=token+':'+route.join('/')+':'+id;if(!paid[event]){paid[event]=true;earned++;}}
 if(earned){const p=rewardRead();if(scoreSplitActive()&&subject!=='science')scoreSplitData(p)[scoreCategory(subject)]+=earned;else p.totals[subject]+=earned;rewardSave(p);saveProgress();rewardRefresh();}
 return earned;
}
function rewardMark(id){const p=rewardRead();if(!p.stages[id]){p.stages[id]=true;rewardSave(p);}return id;}
function rewardComplete(chapter,p=rewardRead()){return chapter.stages.every(s=>p.stages[s.id]);}
function rewardCurrentChapter(){return REWARD_CHAPTERS.find(c=>c.stages.some(s=>s.id===route.join('/')))||(route[0]==='math'&&route[1]==='numer'?REWARD_CHAPTERS.find(c=>c.id==='math-numer'):null);}
const rewardCheers=['Corect! 🌟','Bravo! 🎉','Ai reușit! 🌈','Excelent! ✨','Grozav! 💣','Fantastic! 🔥'];let rewardCheerIndex=0;
function rewardMessage(earned,subject){if(!earned)return '';const cheer=rewardCheers[rewardCheerIndex++%rewardCheers.length];return `<p class="reward-earned" role="status">${scoreSplitActive()?SCORE_CATEGORIES[scoreCategory(subject)][0]:REWARD_SUBJECTS[subject][0]} +${earned}! ${cheer}</p>`;}
function rewardAfter(ids,total,target,subject=route[0]==='math'?'math':route[0]==='science'?'science':'llr'){
 const earned=rewardGrant(subject,ids);
 const bonusActivity=route[0]==='math'&&route[1]==='evaluation';
 if(!bonusActivity&&total>0&&ids.length===total)rewardMark(route.join('/'));
 const chapter=rewardCurrentChapter(),complete=chapter&&rewardComplete(chapter);
 const el=document.querySelector(target);if(el){el.innerHTML+=rewardMessage(earned,subject);if(!bonusActivity&&total>0&&ids.length===total)el.innerHTML+='<p class="reward-stage">✓ Etapă bifată în progresul tău!</p>';if(complete&&chapter.diploma)el.innerHTML+=rewardDiplomaOffer(chapter);}
}
// Answers start fresh on re-entry; the separate reward record is kept.
const rewardOldLoad=loadProgress;
loadProgress=function(){const exercise=(route[0]==='math'&&((['add','sub','order'].includes(route[1])&&route.length>2)||(route[1]==='unknown'&&route.length>3)))||(route[0]==='llr'&&route.length>2)||(route[0]==='science'&&route[1]==='lessons'&&route.length>3);return exercise?{}:rewardOldLoad();};
window.addEventListener('pageshow',event=>{if(event.persisted){state=loadProgress();checked=false;render();}});
window.addEventListener('storage',event=>{if(event.key===REWARD_KEY||event.key===PASSPORT_INDEX||event.key?.startsWith(REWARD_KEY+':')){rewardRefresh();if(route[0]==='passport')renderPassport();}});
vocabProgressWidget=()=>'';
const rewardOldVocabAward=vocabAward;
vocabAward=function(ids){rewardOldVocabAward(ids);return rewardGrant('llr',ids,vocabModel().awardToken);};
function rewardFieldValue(el){return el.tagName==='BUTTON'?(el.classList.contains('punct')?(el.classList.contains('cut')?'cut':'keep'):el.dataset.value):el.value;}
function rewardGenericIds(){return [...document.querySelectorAll('[data-answer]')].flatMap((el,i)=>el.dataset.answer.split('|').map(norm).includes(norm(rewardFieldValue(el)))?[el.dataset.id||String(i)]:[]);}
certificateUnlock=()=>''; // Chapter completion replaces the old single-activity diploma.
const rewardOldVerify=verify;
verify=function(){
 rewardOldVerify();
 const fields=[...document.querySelectorAll('[data-answer]')];
 if(route[0]==='llr'&&route[1]==='punct'&&route[2]==='hard'){
  const extras=fields.filter(el=>el.classList.contains('punct')&&el.dataset.answer==='cut');
  const found=extras.filter(el=>el.classList.contains('cut'));
  const wrong=fields.filter(el=>el.classList.contains('punct')&&el.dataset.answer==='keep'&&el.classList.contains('cut'));
  fields.filter(el=>el.classList.contains('punct')&&el.dataset.answer==='keep'&&!el.classList.contains('cut')).forEach(el=>el.classList.remove('good','bad'));
  const earned=rewardGrant('llr',found.map(el=>el.dataset.id));
  const complete=extras.length>0&&found.length===extras.length&&wrong.length===0;
  if(complete)rewardMark(route.join('/'));
  const score=document.getElementById('score');
  if(score)score.innerHTML=`<div class="result">Semne greșite tăiate corect: ${found.length}.${wrong.length?' Semne corecte tăiate: '+wrong.length+'.':''} ${!found.length&&!wrong.length?'Taie semnele care sunt în plus, apoi verifică.':complete?'Bravo! Ai găsit toate semnele în plus! 🌟':''}</div>`+rewardMessage(earned,'llr')+(complete?'<p class="reward-stage">✓ Etapă bifată în progresul tău!</p>':'');
  return;
 }
 rewardAfter(rewardGenericIds(),fields.length,'#score');
};
const rewardOldBatchVerify=vocabBatchVerify;
vocabBatchVerify=function(){rewardOldBatchVerify();const total=document.querySelectorAll('[data-answer]').length;if(total&&rewardGenericIds().length===total){rewardMark(route.join('/'));const el=document.querySelector('#score');if(el)el.innerHTML+='<p class="reward-stage">✓ Etapă bifată în progresul tău!</p>';}};
const rewardOldGapVerify=vocabGapVerify;
vocabGapVerify=function(){rewardOldGapVerify();if(vocabModel().completed.length>=10){rewardMark('llr/vocab/gaps');const el=document.querySelector('#score');if(el)el.innerHTML+='<p class="reward-stage">✓ 10 propoziții reușite: etapă bifată!</p>';}};
const rewardOldOrderVerify=orderVerify;
orderVerify=function(){rewardOldOrderVerify();const tasks=orderTasks(route[2]),ids=tasks.flatMap((t,i)=>String(state['order-'+i]||'')===t.expected?[String(i)]:[]);rewardAfter(ids,tasks.length,'#order-result','math');};
const rewardOldUnknownVerify=unknownVerify;
unknownVerify=function(){rewardOldUnknownVerify();const problems=unknownProblems(route[2],route[3]),ids=problems.flatMap((p,i)=>String(val(i)).trim()&&Number(String(val(i)).replace(/\s/g,''))===p.answer?[String(i)]:[]);rewardAfter(ids,problems.length,'#unknown-message','math');};
const rewardOldScienceVerify=scienceLessonVerify;
scienceLessonVerify=function(){rewardOldScienceVerify();const fields=[...document.querySelectorAll('[data-science-answer]')],ids=fields.flatMap((f,i)=>{const el=f.querySelector('select,input:not([type=radio])')||f.querySelector('input:checked');return el&&el.value&&f.dataset.scienceAnswer.split('|').map(norm).includes(norm(el.value))?[f.dataset.scienceId||el.id||String(i)]:[]});rewardAfter(ids,fields.length,'#science-result','science');};
const rewardOldScienceCertificate=scienceCertificate;
scienceCertificate=function(i){
 const e=SCIENCE[i],d=scienceData(i),complete=(e.items?e.items.every((_,j)=>d['pred'+j]&&d['obs'+j]):!!(d.prediction||'').trim())&&e.observations.every((_,j)=>(d['obs'+j]||'').trim())&&!!(d.conclusion||'').trim();
 // The original routine still validates, asks for the name and prints both pages.
 const originalPrint=window.print;
 window.print=function(){if(complete){const p=rewardRead();p.stages['science/'+i]=true;if(!p.experiments[i]){p.experiments[i]=true;p.totals.science+=1;}rewardSave(p);rewardRefresh();}return originalPrint.call(window);};
 try{return rewardOldScienceCertificate(i);}finally{window.print=originalPrint;}
};
function rewardDiplomaOffer(chapter){return `<div class="certificate-unlock"><b>🏆 Ai încheiat toate etapele: ${esc(chapter.title)}!</b><p>Diploma capitolului te așteaptă.</p><label for="reward-name-${chapter.id}">Numele tău:</label> <input class="entry" id="reward-name-${chapter.id}" maxlength="80" autocomplete="name" placeholder="Prenume și nume"><button class="btn" onclick="rewardDiploma('${chapter.id}')">Vezi diploma</button></div>`;}
function rewardDiploma(id){
 const chapter=REWARD_CHAPTERS.find(c=>c.id===id);if(!chapter?.diploma||!rewardComplete(chapter))return;
 const input=document.getElementById('reward-name-'+id),name=(input?.value||'').trim().replace(/\s+/g,' ');if(name.length<2){input?.focus();return;}
 const date=new Intl.DateTimeFormat('ro-RO',{day:'numeric',month:'long',year:'numeric'}).format(new Date());
 document.getElementById('diploma-sheet').innerHTML=`<div style="font-size:2.8rem">💎 🏆 💎</div><div style="letter-spacing:3px;font-weight:800">CLASA CURAJOȘILOR · A III-A C · ȘCOALA 169</div><h2>DIPLOMĂ DE MERIT</h2><p>Se acordă elevului / elevei</p><div class="recipient">${esc(name)}</div><p>pentru perseverență și parcurgerea tuturor etapelor capitolului</p><div class="diploma-lesson">${esc(chapter.title)}</div><p class="diploma-score">✓ ${chapter.stages.length} din ${chapter.stages.length} etape încheiate</p><p>${esc(date)}</p>`;
 document.getElementById('diploma-overlay').classList.add('open');
}
function rewardStageGo(chapterId,index){const stage=REWARD_CHAPTERS.find(c=>c.id===chapterId)?.stages[index];if(!stage)return;if(stage.route[1]==='numer'){sessionStorage.setItem('curajosilor-numer-start',stage.route[2]);go('math','numer');}else go(...stage.route);}

function passportRename(){const input=document.getElementById('passport-name'),name=input.value.trim().slice(0,32),p=rewardRead();p.nickname=name;if(rewardSave(p)){renderPassport();document.getElementById('passport-status').textContent='Porecla a fost salvată.';}else document.getElementById('passport-status').textContent='Porecla nu a putut fi salvată pe acest dispozitiv.';}
function passportExport(){const p=rewardRead();const blob=new Blob([JSON.stringify({site:'clasa-curajosilor',version:1,passport:p},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='pasaport-curajosilor.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function passportValid(p){return !!p&&typeof p==='object'&&!Array.isArray(p)&&p.totals&&['llr','science','math'].every(k=>Number.isSafeInteger(p.totals[k])&&p.totals[k]>=0)&&p.stages&&typeof p.stages==='object'&&!Array.isArray(p.stages)&&Object.entries(p.stages).every(([k,v])=>k.length<200&&v===true)&&(!p.experiments||(typeof p.experiments==='object'&&!Array.isArray(p.experiments)&&Object.entries(p.experiments).every(([k,v])=>/^(?:[0-9]|10)$/.test(k)&&v===true)))&&(!p.nickname||(typeof p.nickname==='string'&&p.nickname.length<=32));}
async function passportImport(input){const file=input.files?.[0];if(!file)return;const status=document.getElementById('passport-status');try{if(file.size>1000000)throw Error('size');const data=JSON.parse(await file.text());if(data.site!=='clasa-curajosilor'||data.version!==1||!passportValid(data.passport))throw Error('format');const id='p-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10),index=passportIndex();const imported={...data.passport,vocabMigrated:true};localStorage.setItem(passportKey(id),JSON.stringify(imported));index.ids.push(id);index.active=id;try{localStorage.setItem(PASSPORT_INDEX,JSON.stringify(index));}catch(error){localStorage.removeItem(passportKey(id));throw error;}renderPassport();document.getElementById('passport-status').textContent='Pașaportul a fost încărcat separat. Celelalte pașapoarte sunt păstrate.';}catch(error){status.textContent='Nu am putut încărca fișierul. Alege un pașaport Curajoșilor valid și verifică dacă browserul permite salvarea.';}finally{input.value='';}}
function passportSwitch(select){const index=passportIndex();if(select.value!=='default'&&!index.ids.includes(select.value))return;index.active=select.value;try{localStorage.setItem(PASSPORT_INDEX,JSON.stringify(index));renderPassport();document.getElementById('passport-status').textContent='Ai schimbat pașaportul.';}catch(e){document.getElementById('passport-status').textContent='Nu am putut schimba pașaportul.';}}
function passportOptions(){const index=passportIndex();return ['default',...index.ids].map(id=>{let p;try{p=JSON.parse(localStorage.getItem(passportKey(id))||'{}')}catch(e){p={}};return `<option value="${esc(id)}" ${index.active===id?'selected':''}>${esc(p.nickname|| (id==='default'?'Pașaportul inițial':'Curajos'))}</option>`;}).join('');}
function passportPrint(){const p=rewardRead();const list=REWARD_CHAPTERS.map(c=>{const stages=c.stages.filter(s=>p.stages[s.id]);return stages.length?`<section><h3>${esc(c.title)}</h3><ul>${stages.map(s=>`<li>${esc(s.label)}</li>`).join('')}</ul></section>`:''}).join('');let sheet=document.getElementById('passport-print');if(!sheet){sheet=document.createElement('article');sheet.id='passport-print';document.body.appendChild(sheet);}sheet.innerHTML=`<h1>🧭 Progresul meu de curajos</h1><p>${esc(p.nickname||'Curajos')}</p><p>⭐ ${p.totals.llr} la LLR · ❤️ ${p.totals.science} la Științe · 💎 ${p.totals.math} la Matematică</p><h2>Etapele mele bifate</h2>${list||'<p>Prima etapă te așteaptă!</p>'}`;document.body.classList.add('passport-printing');window.print();}
window.addEventListener('afterprint',()=>document.body.classList.remove('passport-printing'));
const passportPrintStyle=document.createElement('style');passportPrintStyle.textContent='#passport-print{display:none}@media print{body.passport-printing > *,body.passport-printing > #diploma-overlay{display:none!important}body.passport-printing > #passport-print{display:flex!important;box-sizing:border-box;width:180mm;min-height:270mm;margin:0 auto;padding:15mm;color:#172b44;font:16pt/1.6 system-ui;text-align:center;flex-direction:column;align-items:center;justify-content:center}body.passport-printing #passport-print h1{font-size:26pt;margin:0 0 8mm}body.passport-printing #passport-print p{margin:2mm 0}#passport-print section{break-inside:avoid}}';document.head.appendChild(passportPrintStyle);

function renderPassport(){
 const p=rewardRead(),finished=Object.keys(p.stages).filter(id=>REWARD_CHAPTERS.some(c=>c.stages.some(s=>s.id===id))).length,total=REWARD_CHAPTERS.reduce((n,c)=>n+c.stages.length,0);
 const body=Object.entries(REWARD_SUBJECTS).map(([subject,[icon,name]])=>`<section class="passport-subject"><h3>${icon} ${name}</h3>${REWARD_CHAPTERS.filter(c=>c.subject===subject).map(c=>{const count=c.stages.filter(s=>p.stages[s.id]).length;return `<details class="passport-chapter"><summary><span>${esc(c.title)}</span><b>${count} / ${c.stages.length} ${count===c.stages.length?'✓':''}</b></summary><progress max="${c.stages.length}" value="${count}" aria-label="Etape încheiate: ${esc(c.title)}"></progress><ul>${c.stages.map((s,i)=>`<li><span>${p.stages[s.id]?'✅':'○'}</span><button onclick="rewardStageGo('${c.id}',${i})">${esc(s.label)}</button></li>`).join('')}</ul>${c.diploma&&rewardComplete(c,p)?rewardDiplomaOffer(c):c.id==='science-experiments'?'<p>🔬 Fiecare experiment are diploma și fișa lui.</p>':''}</details>`;}).join('')}</section>`).join('');
 view(`<div class="hero"><h2>🧭 Progresul meu de curajos</h2><p>${finished} din ${total} etape bifate. Fiecare pas contează!</p><p class="muted">Comorile și etapele rămân pe acest dispozitiv. Poți începe de unde vrei și poți repeta oricând.</p></div><div class="panel"><h3>🧭 Pașaportul tău, în siguranță</h3><p>Salvează fișierul ca să-ți poți recupera punctele și etapele sau să le muți pe alt dispozitiv. Poți folosi o poreclă.</p><label for="passport-name">Poreclă</label> <input id="passport-name" class="entry" maxlength="32" value="${esc(p.nickname||'')}" placeholder="Porecla ta"> <button class="btn alt" onclick="passportRename()">Salvează numele</button><div class="row"><button class="btn" onclick="passportExport()">💾 Salvează pașaportul</button><button class="btn alt" onclick="document.getElementById('passport-file').click()">📂 Încarcă un pașaport</button><input id="passport-file" type="file" accept=".json,application/json" hidden onchange="passportImport(this)"><button class="btn alt" onclick="passportPrint()">📄 Salvează ca PDF</button></div><p class="muted">Fișierul de rezervă păstrează punctele și etapele. PDF-ul poate fi arătat doamnei.</p><label for="passport-switch">Pașaport activ</label> <select id="passport-switch" class="entry" onchange="passportSwitch(this)">${passportOptions()}</select><p id="passport-status" role="status" aria-live="polite"></p></div><div class="passport-grid">${body}</div>`);
}
/* Progres simplu și recuperarea punctelor cu documentul creat de învățătoare. */
const RECOVERY_PUBLIC_KEY={"key_ops":["verify"],"ext":true,"kty":"EC","x":"kx73TSV5Uj3o4s8lcmGu4EK0tsgv95Z3Ar9RjpNagfo","y":"nxwoSq-ki8zSHduXrKI4KdQQCO3NpivEU9UVAzhmH20","crv":"P-256"};
function progressSave(field,value){const p=rewardRead();if(field==='nickname')p.nickname=value.slice(0,50);if(field==='favoriteChapter')p.favoriteChapter=value.slice(0,100);if(field==='studentForm')p.studentForm=value==='Curajoasa'?'Curajoasa':'Curajosul';if(!rewardSave(p)){const el=document.getElementById('passport-status');if(el)el.textContent='Nu am putut salva pe acest dispozitiv.';}}
renderPassport=function(){const p=rewardRead(),form=p.studentForm==='Curajoasa'?'Curajoasa':'Curajosul';view(`<div class="hero"><h2>🧭 Progresul meu</h2><p>Felicitări pentru comorile adunate! 🌟</p></div><div class="panel"><p><label for="student-form">Cum vrei să scriem?</label> <select id="student-form" class="entry" onchange="progressSave('studentForm',this.value)"><option ${form==='Curajosul'?'selected':''}>Curajosul</option><option ${form==='Curajoasa'?'selected':''}>Curajoasa</option></select> <input id="progress-name" class="entry" aria-label="Prenumele sau porecla" maxlength="50" placeholder="Prenumele sau porecla" value="${esc(p.nickname||'')}" oninput="progressSave('nickname',this.value)"> a obținut:</p><p>${scoreSplitActive()?scoreNewRows(p):`⭐ <b>${p.totals.llr}</b> stele la LLR<br>❤️ <b>${p.totals.science}</b> inimi la Științe<br>💎 <b>${p.totals.math}</b> diamante la Matematică`}</p>${scoreSplitActive()?scoreOldLlr(p)+scoreLegacyRows(p):''}<label for="progress-favorite">Cel mai mult mi-a plăcut capitolul:</label><br><input id="progress-favorite" class="entry" maxlength="100" placeholder="Scrie capitolul preferat" value="${esc(p.favoriteChapter||'')}" oninput="progressSave('favoriteChapter',this.value)"><div class="row"><button class="btn" onclick="progressPrint()">📄 Salvează ca PDF</button></div><details><summary>🆘 Help</summary><ol><li>Discută cu doamna învățătoare.</li><li>Explică-i cum ai pierdut punctajul.</li><li>Spune-i câte puncte aveai la fiecare categorie.</li><li>Încarcă aici documentul primit de la doamna învățătoare.</li><li>Îți vei recupera punctele! ✨</li></ol><button class="btn alt" onclick="document.getElementById('progress-file').click()">📂 Încarcă documentul</button><input id="progress-file" type="file" accept=".json,application/json" hidden onchange="progressImport(this)"></details><p id="passport-status" role="status" aria-live="polite"></p></div>`);};
function progressPrint(){const p=rewardRead(),form=p.studentForm==='Curajoasa'?'Curajoasa':'Curajosul';let sheet=document.getElementById('passport-print');if(!sheet){sheet=document.createElement('article');sheet.id='passport-print';document.body.appendChild(sheet);}sheet.innerHTML=`<h1>🧭 Progresul meu</h1><p>${form} <b>${esc(p.nickname||'________________')}</b> a obținut:</p>${scoreSplitActive()?`<p>${scoreNewRows(p)}</p>${scoreOldLlr(p)}${scoreLegacyRows(p)}`:`<p>⭐ <b>${p.totals.llr}</b> stele la LLR</p><p>❤️ <b>${p.totals.science}</b> inimi la Științe</p><p>💎 <b>${p.totals.math}</b> diamante la Matematică</p>`}<p>Cel mai mult mi-a plăcut capitolul <b>${esc(p.favoriteChapter||'________________')}</b>.</p>`;document.body.classList.add('passport-printing');window.print();}
async function progressImport(input){const file=input.files?.[0];if(!file)return;let status=document.getElementById('passport-status');try{if(file.size>10000)throw Error();const data=JSON.parse(await file.text());if(typeof data.payload!=='string'||typeof data.signature!=='string')throw Error();const v=JSON.parse(data.payload);if(v.site!=='clasa-curajosilor'||!((v.version===1&&['llr','science','math'].every(k=>Number.isSafeInteger(v[k])&&v[k]>=0))||(v.version===2&&['vocab','grammar','ortho','punctuation','multiply','math','science'].every(k=>Number.isSafeInteger(v[k])&&v[k]>=0))))throw Error();if(v.version===2&&!scoreSplitActive()){status.textContent='Acest document poate fi folosit începând cu 1 decembrie.';return;}const signature=Uint8Array.from(atob(data.signature),c=>c.charCodeAt(0));const key=await crypto.subtle.importKey('jwk',RECOVERY_PUBLIC_KEY,{name:'ECDSA',namedCurve:'P-256'},false,['verify']);if(!await crypto.subtle.verify({name:'ECDSA',hash:'SHA-256'},key,signature,new TextEncoder().encode(data.payload)))throw Error();const p=rewardRead();if(v.version===2){const split=scoreSplitData(p);for(const k of ['vocab','grammar','ortho','punctuation','multiply','math'])split[k]=v[k];p.totals.science=v.science;}else{p.totals={...p.totals,llr:scoreOldLlrVisible()?v.llr:0,science:v.science,math:v.math};if(scoreSplitActive())scoreSplitData(p).math=v.math;}if(!rewardSave(p))throw Error();renderPassport();rewardRefresh();document.getElementById('passport-status').textContent=v.version===1&&scoreSplitActive()?'Ai recuperat inimile și diamantele. Pentru celelalte categorii, cere-i doamnei învățătoare un document nou.':'Ți-ai recuperat punctele! 🌟';}catch(e){status.textContent='Documentul nu a putut fi încărcat. Cere-i ajutor doamnei învățătoare.';}finally{input.value='';}}

const rewardPreviousCrumbs=crumbs;
crumbs=function(){return route[0]==='home'?'':rewardPreviousCrumbs();};
const rewardOldView=view;
view=function(html){if(route[0]==='home')html=html.replace(/<div class="hero">[\s\S]*?<\/div>/,'');return rewardOldView(`<div id="reward-bar">${rewardBar()}</div>`+html);};
const rewardStyle=document.createElement('style');rewardStyle.textContent=`.reward-bar{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin:0 0 20px;padding:12px 16px;border:1px solid #cfdaea;border-radius:18px;background:#fff}.reward-balances{display:flex;flex-wrap:wrap;gap:18px}.reward-balances span{display:grid;grid-template-columns:auto auto;column-gap:5px;align-items:center}.reward-balances small{grid-column:1/3;font-size:.72rem;color:#516784}.reward-bar .btn{margin:0;font-size:.9rem;min-height:44px}.reward-earned,.reward-stage{color:#225d46;font-weight:700}.reward-guide{margin-top:18px}.reward-guide summary{font-weight:750;cursor:pointer}.reward-guide li{margin:10px 0}.passport-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(290px,100%),1fr));gap:20px;align-items:start}.passport-subject{background:#fff;border:1px solid #d2ddec;border-radius:20px;padding:18px;min-width:0}.passport-chapter{border-top:1px solid #dfe7f2;padding:14px 0}.passport-chapter summary{cursor:pointer;display:flex;justify-content:space-between;gap:10px;align-items:baseline;font-weight:700}.passport-chapter summary b{white-space:nowrap;color:#46618b;font-size:.85rem}.passport-chapter progress{width:100%;height:10px;margin:14px 0;accent-color:#5075c9}.passport-chapter ul{padding:0;list-style:none}.passport-chapter li{display:flex;gap:6px;align-items:center;margin:4px 0}.passport-chapter li button{text-align:left;background:transparent;border:0;color:#294f85;min-height:44px;font:inherit;padding:7px}.passport-chapter li button:hover{text-decoration:underline}.card{display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;text-align:left}.card strong{line-height:1.4;min-height:2.8em}.card small{margin-top:12px;line-height:1.6}@media(max-width:600px){.card strong{min-height:0}.reward-balances{gap:14px}.reward-bar{padding:10px 12px}}@media print{#reward-bar{display:none}}`;
rewardStyle.textContent+='\n.cards>.card:nth-child(5n+1){background:#fff9e5;border-color:#e9c969}\n.cards>.card:nth-child(5n+2){background:#eef7ff;border-color:#a7cfee}\n.cards>.card:nth-child(5n+3){background:#effaf1;border-color:#a8d9b3}\n.cards>.card:nth-child(5n+4){background:#fff3ec;border-color:#efbe9d}\n.cards>.card:nth-child(5n+5){background:#f7f1ff;border-color:#d0b8ee}\n.cards>.card{border-width:2px;box-shadow:0 4px 14px #26344a0d}\n.cards>.card:hover{filter:brightness(.98)}\n.btn[onclick*="hint("],.btn[onclick*="Help("],.btn[onclick*="help("],.btn[onclick*="science-bank"],.btn[onclick*="vocabSimilarHelp"]{background:#ffe7a0;color:#5c4109;border:1px solid #dfb64a}\n.btn[onclick*="next"],.btn[onclick*="Next"],.btn[onclick*="continue"],.btn[onclick*="NextRound"],.btn[onclick*="nextRound"]{background:#d7f3dd;color:#205735;border:1px solid #91c9a0}\n.btn[onclick*="verify("],.btn[onclick*="Verify("],.btn[onclick*="Verify()"]{background:#436dd0;color:#fff;border:1px solid #355ab1}\n.science-learn-card:nth-child(4n+1){background:#fff3c9;border-color:#eac96f}\n.science-learn-card:nth-child(4n+2){background:#e2f5ff;border-color:#91cde8}\n.science-learn-card:nth-child(4n+3){background:#f1e9ff;border-color:#c4aeeb}\n.science-learn-card:nth-child(4n){background:#e5f8e9;border-color:#a6d6b1}\n.science-learn-icon{font-size:2.25rem}\n@media print{.cards>.card{box-shadow:none}}\n';rewardStyle.textContent+='.reward-bar{background:#f2f7ff;border:2px solid #9ebbe1;box-shadow:0 4px 14px #4d76a30d}.reward-bar .btn{background:#e2edfb;color:#284b7c;border:1px solid #aac4e4}.hero{background:#f2f7ff;border:2px solid #9ebbe1;box-shadow:0 4px 14px #4d76a30d}.hero h2{color:#243e5a}@media print{.hero{background:#fff;box-shadow:none}}';document.head.appendChild(rewardStyle);
FRIENDLY_ROUTES.pasaport=['passport'];
const rewardOldCrumbs=crumbs;crumbs=()=>rewardOldCrumbs().replace('>passport</button>','>Progresul meu</button>');
const rewardOldRender=render;
render=function(){if(route[0]==='passport')return renderPassport();const result=rewardOldRender();if(route[0]==='math'&&route[1]==='numer')rewardNumerHook();return result;};
function rewardNumerHook(){
 const frame=document.querySelector('iframe');if(!frame||frame.dataset.rewards)return;frame.dataset.rewards='true';
 const p=rewardRead(),done=rewardNumerTitles.map((_,i)=>p.stages['math/numer/'+i]?i:null).filter(i=>i!==null);let start=0;
 try{start=Number(sessionStorage.getItem('curajosilor-numer-start'))||0;sessionStorage.removeItem('curajosilor-numer-start');}catch(e){}
 const hook=`<script>(function(){const tokens={};const originalCheck=check,originalReset=resetLesson;check=function(){const ids=lessons[current].problems.flatMap((p,i)=>{const v=String(answers[current+'-'+i]||'').replace(/\\s/g,'');return v&&Number(v)===p[1]?[i]:[]});originalCheck();const token=tokens[current]||(tokens[current]=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2));parent.postMessage({type:'curajosilor-numer',lesson:current,ids,token},${JSON.stringify(location.origin)});};resetLesson=function(){tokens[current]='';originalReset();};${JSON.stringify(done)}.forEach(i=>completed.add(i));openLesson(${Math.max(0,Math.min(6,start))});})();<\/script>`;
 frame.srcdoc=frame.srcdoc.replace('</body>',hook+'</body>');
 if(!document.getElementById('numer-rewards')){const el=document.createElement('div');el.id='numer-rewards';frame.parentElement.before(el);}
}
window.addEventListener('message',event=>{
 if(event.source!==document.querySelector('iframe')?.contentWindow||event.origin!==location.origin||route[0]!=='math'||route[1]!=='numer')return;
 const d=event.data;if(d?.type!=='curajosilor-numer'||!Number.isInteger(d.lesson)||d.lesson<0||d.lesson>6||!Array.isArray(d.ids)||!d.ids.every(i=>Number.isInteger(i)&&i>=0&&i<3)||typeof d.token!=='string')return;
 const ids=[...new Set(d.ids)],earned=rewardGrant('math',ids,d.lesson+':'+d.token);if(ids.length===3)rewardMark('math/numer/'+d.lesson);
 const chapter=REWARD_CHAPTERS.find(c=>c.id==='math-numer'),el=document.getElementById('numer-rewards');if(el)el.innerHTML=rewardMessage(earned,'math')+(rewardComplete(chapter)?rewardDiplomaOffer(chapter):'');
});
/* Verificare la îndemână în exercițiile de matematică. */
const floatingStyle=document.createElement('style');floatingStyle.textContent=`.verify-float{position:fixed;z-index:980;right:0;top:43%;display:flex;flex-direction:column;align-items:flex-end;gap:8px}.verify-float button{font:700 1rem system-ui;background:#416bd1;color:white;border:2px solid white;border-radius:0 12px 12px 0;padding:14px 9px;box-shadow:0 3px 14px #22385840;cursor:pointer;width:44px;min-height:138px;writing-mode:vertical-rl;transform:rotate(180deg);display:flex;align-items:center;justify-content:center}.verify-float output{display:none;max-width:220px;margin-right:8px;padding:9px 12px;background:#fff;border:1px solid #a8bfe2;border-radius:12px;color:#203756;box-shadow:0 3px 12px #22385830}.verify-float output.visible{display:block}button[data-float-source]{display:none!important}@media(max-width:600px){.verify-float button{font-size:.9rem;padding:12px 8px;min-height:125px}.verify-float output{font-size:.85rem;max-width:180px}}@media print{.verify-float{display:none!important}}`;document.head.appendChild(floatingStyle);
floatingStyle.textContent+=' .verify-float[hidden]{display:none!important}';
const floatingOriginalVerify=verify;
verify=function(){floatingOriginalVerify();const fields=[...document.querySelectorAll('[data-answer]')],attempted=fields.filter(el=>String(rewardFieldValue(el)??'').trim()!=='');for(const el of fields)if(!String(rewardFieldValue(el)??'').trim())el.classList.remove('bad','good');const correct=attempted.filter(el=>el.dataset.answer.split('|').map(norm).includes(norm(rewardFieldValue(el)))).length;const message=document.querySelector('#score .result');if(message&&attempted.length<fields.length)message.textContent=attempted.length?`Răspunsuri completate: ${attempted.length}. Corecte: ${correct}.`:'Completează un răspuns și verifică.';};
const floatingOriginalUnknownVerify=unknownVerify;
unknownVerify=function(){floatingOriginalUnknownVerify();if(route[0]!=='math'||route[1]!=='unknown')return;unknownProblems(route[2],route[3]).forEach((_,i)=>{if(!String(val(i)).trim()&&!state['correct'+i]){const el=document.getElementById('unknown-feedback-'+i);if(el){el.textContent='';el.className='unknown-feedback';}}});};
const floatingOldView=view;
view=function(html){const result=floatingOldView(html);let holder=document.getElementById('verify-float');if(!holder){holder=document.createElement('div');holder.id='verify-float';holder.className='verify-float';holder.hidden=true;holder.innerHTML='<output aria-live="polite"></output><button type="button">Verifică</button>';document.body.appendChild(holder);holder.querySelector('button').onclick=()=>{const target=document.querySelector('button[data-float-source]');if(target)target.click();else if(route[0]==='math'&&route[1]==='numer'){const doc=document.querySelector('iframe')?.contentDocument,btn=doc?.querySelector('button[onclick="check()"]');if(!btn)return;btn.click();doc.querySelectorAll('.problem').forEach(row=>{if(!row.querySelector('input')?.value.trim()){const feedback=row.querySelector('.feedback');if(feedback){feedback.textContent='';feedback.className='feedback';}}});}else return;const message=document.querySelector('#order-result .result, #mult-score .result, #me-score .result, #dist-score .result, #unknown-message, #science-result .result, #bonus-score .result, #interval-score .result, #score .result');const out=holder.querySelector('output');out.textContent=message?.textContent?.trim()||'Răspunsurile completate au fost verificate.';out.classList.add('visible');clearTimeout(holder._messageTimer);holder._messageTimer=setTimeout(()=>out.classList.remove('visible'),6000);};}holder.hidden=true;holder.querySelector('output').classList.remove('visible');if(!(route[0]==='math'&&route[1]==='numer')){const candidates=[...document.querySelectorAll('#app button[onclick]')].filter(b=>/^\s*✓?\s*Verifică/i.test(b.textContent)&&!/hint/i.test(b.getAttribute('onclick')||''));const source=candidates.at(-1);if(source){source.setAttribute('data-float-source','');holder.hidden=false;}}return result;};

const floatingOldNumerHook=rewardNumerHook;rewardNumerHook=function(){floatingOldNumerHook();const holder=document.getElementById('verify-float');if(holder)holder.hidden=false;};
route=routeFromPath();state=loadProgress();checked=false;render();

const SCORE_NOTICE_KEY='curajosilor-notice-puncte-20261201-v1';
function scoreNoticeClose(){try{localStorage.setItem(SCORE_NOTICE_KEY,'da');}catch(e){}window.__scoreNoticeAcknowledged=true;document.getElementById('score-notice')?.remove();}
function scoreShowNotice(){
 if(window.__scoreNoticeAcknowledged)return;
 try{if(localStorage.getItem(SCORE_NOTICE_KEY)==='da')return;}catch(e){}
 if(document.getElementById('score-notice'))return;
 const el=document.createElement('dialog');el.id='score-notice';el.setAttribute('aria-labelledby','score-notice-title');
 el.innerHTML=`<h2 id="score-notice-title">🌟 Noutate pentru curajoși!</h2><p>Din 1 decembrie punctele se vor aduna separat:</p><ul><li>⭐ Vocabular</li><li>🤩 Gramatică</li><li>💥 Ortograme</li><li>✨ Punctuație</li><li>❎ Înmulțire</li><li>💎 Matematică</li><li>❤️ Științe</li></ul><p>Stelele LLR vechi vor dispărea pe 2 decembrie, la ora 00:00. Descarcă-ți progresul până atunci, ca să îl păstrezi! Intră la „Progresul meu” și apasă „Salvează ca PDF”.</p><button type="button" class="btn" onclick="scoreNoticeClose()">Am înțeles!</button>`;
 document.body.appendChild(el);
 if(typeof el.showModal==='function')el.showModal();else el.setAttribute('open','');
}
const scoreNoticeStyle=document.createElement('style');
scoreNoticeStyle.textContent=`#score-notice{width:min(530px,calc(100% - 32px));max-height:calc(100% - 32px);overflow:auto;border:2px solid #9ebbe1;border-radius:22px;padding:24px;background:#f2f7ff;color:#24334a;box-shadow:0 12px 40px #1c315a40}#score-notice::backdrop{background:#15284699}#score-notice h2{margin:0 0 10px}#score-notice ul{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:9px}#score-notice li{background:#fff;border:1px solid #d3e0f0;padding:9px 12px;border-radius:12px;font-weight:650}#score-notice .btn{min-height:44px}`;
document.head.appendChild(scoreNoticeStyle);scoreShowNotice();
function scoreScheduleRefresh(){const now=Date.now(),times=[SCORE_SWITCH_AT,Date.parse('2026-12-02T00:00:00+02:00')].filter(t=>t>now);if(times.length)setTimeout(()=>{rewardRefresh();if(route[0]==='home'||route[0]==='passport')render();scoreScheduleRefresh();},Math.min(2147483647,Math.min(...times)-now+100));}
scoreScheduleRefresh();
