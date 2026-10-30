/* Persistent rewards are independent of the answers in a practice attempt. */
const REWARD_KEY='curajosilor-rewards-v2';
const REWARD_SUBJECTS={llr:['⭐','LLR'],science:['❤️','Științe'],math:['💎','Matematică']};
const REWARD_CHAPTERS=[];
function rewardChapter(id,subject,title,stages,diploma=false){REWARD_CHAPTERS.push({id,subject,title,diploma,stages:stages.map(([label,r])=>({label,route:r,id:r.join('/')}))});}
for(const op of ['add','sub'])rewardChapter('math-'+op,'math',op==='add'?'Adunarea':'Scăderea',mathNames.map((n,i)=>[(i+1)+'. '+n,['math',op,String(i)]]),true);
rewardChapter('math-unknown','math','Aflarea numărului necunoscut',Object.entries(UNKNOWN_TYPES).flatMap(([type,[name]])=>Object.entries(UNKNOWN_LEVELS).map(([level,[label]])=>[name+' · '+label,['math','unknown',type,level]])),true);
rewardChapter('math-order','math','Ordinea operațiilor',Object.entries(ORDER_TYPES).map(([id,[name]])=>[name,['math','order',id]]),true);
const rewardNumerTitles=['Numere consecutive','Șiruri cu pas','Numerotarea paginilor: cifre','Numerotarea paginilor: pagini','Strângeri de mână și perechi','Formarea numerelor: cifre diferite','Formarea numerelor: pare și impare'];
rewardChapter('math-numer','math','Detectivii numerelor',rewardNumerTitles.map((name,i)=>[(i+1)+'. '+name,['math','numer',String(i)]]),true);
rewardChapter('llr-vocab','llr','Vocabular',[['Găsește perechea · o rundă de 10',['llr','vocab','match']],['Scrie cuvinte · o rundă de 10',['llr','vocab','similar']],['Completează 10 propoziții',['llr','vocab','gaps']],['10 cuvinte cu sens opus',['llr','vocab','opposite']]]);
for(const [type,title] of Object.entries(orthoNames)){
 const transform=type!=='comp'&&(!EXTRA_ORTHO[type]||!!EXTRA_ORTHO[type].transforms);
 rewardChapter('ortho-'+type,'llr','Ortograme: '+title,[['Alege forma corectă','choose'],['Completează textul','text'],...(transform?[['Transformă după model','transform']]:[]),['Detectivul greșelilor','errors']].map(([n,p])=>[n,['llr','ortho',type,p]]));
}
for(const level of ['easy','hard'])rewardChapter('punct-'+level,'llr',level==='easy'?'Pune semnele corect':'🦠 Vindecă-te de virgulită!',DATA.punct.map(([name],i)=>[name,['llr','punct',level,String(i)]]));
for(const [id,lesson] of Object.entries(SCIENCE_LESSONS))rewardChapter('science-'+id,'science',lesson.title,lesson.sections.map(p=>[scienceActivities[p][0],['science','lessons',id,p]]));
rewardChapter('science-experiments','science','Experimente',SCIENCE.map((e,i)=>[(i+1)+'. '+e.title,['science',String(i)]]));
function rewardRead(){
 let p;try{p=JSON.parse(localStorage.getItem(REWARD_KEY))}catch(e){}
 if(!p||typeof p!=='object'||Array.isArray(p))p={};
 p.totals=p.totals&&typeof p.totals==='object'?p.totals:{};
 for(const key of Object.keys(REWARD_SUBJECTS))if(!Number.isSafeInteger(p.totals[key])||p.totals[key]<0)p.totals[key]=0;
 p.stages=p.stages&&typeof p.stages==='object'?p.stages:{};
 p.experiments=p.experiments&&typeof p.experiments==='object'?p.experiments:{};
 if(!p.vocabMigrated){p.totals.llr+=vocabReadProgress().points;p.vocabMigrated=true;rewardSave(p);}
 return p;
}
function rewardSave(p){try{localStorage.setItem(REWARD_KEY,JSON.stringify(p));return true}catch(e){return false}}
function rewardBar(){const p=rewardRead();return `<section class="reward-bar" aria-label="Comorile mele"><div class="reward-balances">${Object.entries(REWARD_SUBJECTS).map(([key,[icon,name]])=>`<span aria-label="${name}: ${p.totals[key]}">${icon} <b>${p.totals[key]}</b><small>${name}</small></span>`).join('')}</div><button type="button" class="btn alt" onclick="go('passport')">🧭 Pașaportul meu</button></section>`;}
function rewardRefresh(){const el=document.getElementById('reward-bar');if(el)el.innerHTML=rewardBar();}
function rewardAttempt(){if(!state.__rewardAttempt)state.__rewardAttempt=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);return state.__rewardAttempt;}
function rewardGrant(subject,ids,token=rewardAttempt()){
 if(!REWARD_SUBJECTS[subject])return 0;
 const paid=state.__rewardPaid||(state.__rewardPaid={});let earned=0;
 for(const id of new Set(ids)){const event=token+':'+route.join('/')+':'+id;if(!paid[event]){paid[event]=true;earned++;}}
 if(earned){const p=rewardRead();p.totals[subject]+=earned;rewardSave(p);saveProgress();rewardRefresh();}
 return earned;
}
function rewardMark(id){const p=rewardRead();if(!p.stages[id]){p.stages[id]=true;rewardSave(p);}return id;}
function rewardComplete(chapter,p=rewardRead()){return chapter.stages.every(s=>p.stages[s.id]);}
function rewardCurrentChapter(){return REWARD_CHAPTERS.find(c=>c.stages.some(s=>s.id===route.join('/')))||(route[0]==='math'&&route[1]==='numer'?REWARD_CHAPTERS.find(c=>c.id==='math-numer'):null);}
function rewardMessage(earned,subject){return earned?`<p class="reward-earned" role="status">${REWARD_SUBJECTS[subject][0]} +${earned}! Fiecare reușită contează!</p>`:'';}
function rewardAfter(ids,total,target,subject=route[0]==='math'?'math':route[0]==='science'?'science':'llr'){
 const earned=rewardGrant(subject,ids);
 if(total>0&&ids.length===total)rewardMark(route.join('/'));
 const chapter=rewardCurrentChapter(),complete=chapter&&rewardComplete(chapter);
 const el=document.querySelector(target);if(el){el.innerHTML+=rewardMessage(earned,subject);if(total>0&&ids.length===total)el.innerHTML+='<p class="reward-stage">✓ Etapă bifată în pașaport!</p>';if(complete&&chapter.diploma)el.innerHTML+=rewardDiplomaOffer(chapter);}
}
// Answers start fresh on re-entry; the separate reward record is kept.
const rewardOldLoad=loadProgress;
loadProgress=function(){const exercise=(route[0]==='math'&&((['add','sub','order'].includes(route[1])&&route.length>2)||(route[1]==='unknown'&&route.length>3)))||(route[0]==='llr'&&route.length>2)||(route[0]==='science'&&route[1]==='lessons'&&route.length>3);return exercise?{}:rewardOldLoad();};
window.addEventListener('pageshow',event=>{if(event.persisted){state=loadProgress();checked=false;render();}});
window.addEventListener('storage',event=>{if(event.key===REWARD_KEY){rewardRefresh();if(route[0]==='passport')renderPassport();}});
vocabProgressWidget=()=>'';
const rewardOldVocabAward=vocabAward;
vocabAward=function(ids){rewardOldVocabAward(ids);return rewardGrant('llr',ids,vocabModel().awardToken);};
function rewardFieldValue(el){return el.tagName==='BUTTON'?(el.classList.contains('punct')?(el.classList.contains('cut')?'cut':'keep'):el.dataset.value):el.value;}
function rewardGenericIds(){return [...document.querySelectorAll('[data-answer]')].flatMap((el,i)=>el.dataset.answer.split('|').map(norm).includes(norm(rewardFieldValue(el)))?[el.dataset.id||String(i)]:[]);}
certificateUnlock=()=>''; // Chapter completion replaces the old single-activity diploma.
const rewardOldVerify=verify;
verify=function(){rewardOldVerify();const fields=[...document.querySelectorAll('[data-answer]')];rewardAfter(rewardGenericIds(),fields.length,'#score');};
const rewardOldBatchVerify=vocabBatchVerify;
vocabBatchVerify=function(){rewardOldBatchVerify();const total=document.querySelectorAll('[data-answer]').length;if(total&&rewardGenericIds().length===total){rewardMark(route.join('/'));const el=document.querySelector('#score');if(el)el.innerHTML+='<p class="reward-stage">✓ Etapă bifată în pașaport!</p>';}};
const rewardOldGapVerify=vocabGapVerify;
vocabGapVerify=function(){rewardOldGapVerify();if(vocabModel().completed.length>=10){rewardMark('llr/vocab/gaps');const el=document.querySelector('#score');if(el)el.innerHTML+='<p class="reward-stage">✓ 10 propoziții reușite: etapă bifată!</p>';}};
const rewardOldOppositeVerify=vocabOppositeVerify;
vocabOppositeVerify=function(){rewardOldOppositeVerify();if(rewardGenericIds().length>=Math.min(10,vocabOppositeEntries().length)){rewardMark('llr/vocab/opposite');const el=document.querySelector('#score');if(el)el.innerHTML+='<p class="reward-stage">✓ Etapă bifată în pașaport!</p>';}};
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
function renderPassport(){
 const p=rewardRead(),finished=Object.keys(p.stages).filter(id=>REWARD_CHAPTERS.some(c=>c.stages.some(s=>s.id===id))).length,total=REWARD_CHAPTERS.reduce((n,c)=>n+c.stages.length,0);
 const body=Object.entries(REWARD_SUBJECTS).map(([subject,[icon,name]])=>`<section class="passport-subject"><h3>${icon} ${name}</h3>${REWARD_CHAPTERS.filter(c=>c.subject===subject).map(c=>{const count=c.stages.filter(s=>p.stages[s.id]).length;return `<details class="passport-chapter"><summary><span>${esc(c.title)}</span><b>${count} / ${c.stages.length} ${count===c.stages.length?'✓':''}</b></summary><progress max="${c.stages.length}" value="${count}" aria-label="Etape încheiate: ${esc(c.title)}"></progress><ul>${c.stages.map((s,i)=>`<li><span>${p.stages[s.id]?'✅':'○'}</span><button onclick="rewardStageGo('${c.id}',${i})">${esc(s.label)}</button></li>`).join('')}</ul>${c.diploma&&rewardComplete(c,p)?rewardDiplomaOffer(c):c.id==='science-experiments'?'<p>🔬 Fiecare experiment are diploma și fișa lui.</p>':''}</details>`;}).join('')}</section>`).join('');
 view(`<div class="hero"><h2>🧭 Pașaportul meu de curajos</h2><p>${finished} din ${total} etape bifate. Fiecare pas contează!</p><p class="muted">Comorile și etapele rămân pe acest dispozitiv. Poți începe de unde vrei și poți repeta oricând.</p></div><div class="passport-grid">${body}</div>`);
}
const rewardHome=`<div class="hero"><h2>Salut, curajosule! 👋</h2><p>Provocarea clasei a III-a C, Școala 169: exersează ce înveți la școală și descoperă imediat ce ai reușit!</p><p>Adună ⭐ la LLR, ❤️ la Științe și 💎 la Matematică. Fiecare răspuns corect contează, chiar și când repeți!</p><details class="reward-guide"><summary>Cum le aduni pe toate? 🧭</summary><ol><li>Alege orice activitate. Poți schimba disciplina sau dificultatea când vrei.</li><li>Rezolvă și verifică: primești comori pentru răspunsurile corecte. Repetă cu răspunsuri noi pentru alte comori.</li><li>Încheie o activitate corect pentru a bifa etapa în pașaport. La vocabular, o etapă înseamnă 10 reușite.</li><li>La Matematică, încheie toate etapele unui capitol și primești diploma lui.</li><li>La fiecare experiment, completează predicția, observațiile și concluzia: primești diploma și fișa experimentului!</li></ol><button class="btn alt" onclick="go('passport')">Deschide pașaportul</button></details></div>`;
const rewardOldView=view;
view=function(html){if(route[0]==='home')html=html.replace(/<div class="hero">[\s\S]*?<\/div>/,rewardHome);return rewardOldView(`<div id="reward-bar">${rewardBar()}</div>`+html);};
const rewardStyle=document.createElement('style');rewardStyle.textContent=`.reward-bar{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin:0 0 20px;padding:12px 16px;border:1px solid #cfdaea;border-radius:18px;background:#fff}.reward-balances{display:flex;flex-wrap:wrap;gap:18px}.reward-balances span{display:grid;grid-template-columns:auto auto;column-gap:5px;align-items:center}.reward-balances small{grid-column:1/3;font-size:.72rem;color:#516784}.reward-bar .btn{margin:0;font-size:.9rem;min-height:44px}.reward-earned,.reward-stage{color:#225d46;font-weight:700}.reward-guide{margin-top:18px}.reward-guide summary{font-weight:750;cursor:pointer}.reward-guide li{margin:10px 0}.passport-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(290px,100%),1fr));gap:20px;align-items:start}.passport-subject{background:#fff;border:1px solid #d2ddec;border-radius:20px;padding:18px;min-width:0}.passport-chapter{border-top:1px solid #dfe7f2;padding:14px 0}.passport-chapter summary{cursor:pointer;display:flex;justify-content:space-between;gap:10px;align-items:baseline;font-weight:700}.passport-chapter summary b{white-space:nowrap;color:#46618b;font-size:.85rem}.passport-chapter progress{width:100%;height:10px;margin:14px 0;accent-color:#5075c9}.passport-chapter ul{padding:0;list-style:none}.passport-chapter li{display:flex;gap:6px;align-items:center;margin:4px 0}.passport-chapter li button{text-align:left;background:transparent;border:0;color:#294f85;min-height:44px;font:inherit;padding:7px}.passport-chapter li button:hover{text-decoration:underline}.card{display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;text-align:left}.card strong{line-height:1.4;min-height:2.8em}.card small{margin-top:12px;line-height:1.6}@media(max-width:600px){.card strong{min-height:0}.reward-balances{gap:14px}.reward-bar{padding:10px 12px}}@media print{#reward-bar{display:none}}`;
document.head.appendChild(rewardStyle);
FRIENDLY_ROUTES.pasaport=['passport'];
const rewardOldCrumbs=crumbs;crumbs=()=>rewardOldCrumbs().replace('>passport</button>','>Pașaportul meu</button>');
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
route=routeFromPath();state=loadProgress();checked=false;render();
