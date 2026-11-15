/* Înmulțirea: serii scurte, puncte și progresul păstrat în pașaport. */
const MULT_LEVELS={
 tabla:['Reamintește-ți tabla înmulțirii','0–10'],
 zu_u:['Înmulțirea ZU × U','Zeci și unități × unități'],
 szu_u:['Înmulțirea SZU × U','Sute, zeci și unități × unități'],
 mszu_u:['Înmulțirea MSZU × U','Mii, sute, zeci și unități × unități'],
 zu_zu:['Înmulțirea ZU × ZU','Două cifre × două cifre'],
 szu_zu:['Înmulțirea SZU × ZU','Trei cifre × două cifre']
};
const MULT_GAMES={calcule:['Calculează','Scrie rezultatul'],situatii:['Probleme din viața de zi cu zi','Citește și calculează'],spion:['🕵️ Spionul de greșeli','Descoperă și corectează cele două greșeli']};
const MULT_ROOT='matematica/inmultirea';
FRIENDLY_ROUTES[MULT_ROOT]=['math','multiply'];
for(const level of Object.keys(MULT_LEVELS)){
 FRIENDLY_ROUTES[MULT_ROOT+'/'+level]=['math','multiply',level];
 for(const game of Object.keys(MULT_GAMES))FRIENDLY_ROUTES[MULT_ROOT+'/'+level+'/'+game]=['math','multiply',level,game];
}
rewardChapter('math-multiplication','math','Înmulțirea',Object.entries(MULT_LEVELS).flatMap(([level,[title]])=>Object.entries(MULT_GAMES).map(([game,[name]])=>[title+' · '+name,['math','multiply',level,game]])),true);
REWARD_CHAPTERS.unshift(REWARD_CHAPTERS.pop());
const multCrumbs=crumbs;crumbs=function(){let s=multCrumbs().replace('>multiply</button>','>Înmulțirea</button>');for(const [k,v] of Object.entries(MULT_LEVELS))s=s.replace('>'+k+'</button>','>'+v[0]+'</button>');for(const [k,v] of Object.entries(MULT_GAMES))s=s.replace('>'+k+'</button>','>'+v[0]+'</button>');return s;};
const multOldLoad=loadProgress;loadProgress=function(){return route[0]==='math'&&route[1]==='multiply'&&route[3]?{}:multOldLoad();};
const multOldView=view;view=function(html){const menu=route[0]==='math'&&!route[1];if(menu)html=html.replace('<div class="cards">','<div class="cards">'+card('✖️ Înmulțirea','Tabla înmulțirii, calcule și jocuri',"go('math','multiply')",'2026-11-15T00:00:00+02:00'));const result=multOldView(html);if(menu){const grid=document.querySelector('#app .cards'),cards=grid?[...grid.querySelectorAll('.card')]:[];const multiplication=cards.find(el=>el.textContent.includes('✖️ Înmulțirea')),detective=cards.find(el=>el.textContent.includes('Detectivii numerelor'));if(multiplication)grid.insertBefore(multiplication,grid.firstChild);if(detective)grid.appendChild(detective);}return result;};
function multRand(min,max){return min+Math.floor(Math.random()*(max-min+1));}
function multFactors(level,game){
 if(level==='tabla')return game==='situatii'?[multRand(2,10),multRand(2,10)]:[multRand(0,10),multRand(0,10)];
 let a=level==='zu_u'||level==='zu_zu'?multRand(10,99):level==='mszu_u'?multRand(1000,9999):multRand(100,999);
 let b=level==='zu_zu'||level==='szu_zu'?multRand(10,99):multRand(game==='situatii'?2:0,9);
 return [a,b];
}
function multQuantity(n,word){return n+(n>=20&&(n%100>=20||n%100===0)?' de ':' ')+word;}
function multSituation(a,b,level){
 if(level==='tabla')return [
  `O acadea costă ${a} lei. Cât costă ${b} acadele la fel?`,
  `Într-un pachet sunt ${a} creioane. Câte creioane sunt în ${b} pachete la fel?`,
  `Pe o farfurie sunt ${a} felii de măr. Câte felii sunt pe ${b} farfurii la fel?`,
  `Un bilet costă ${a} lei. Cât costă ${b} bilete la fel?`
 ][multRand(0,3)];
 return [
  `O tipografie imprimă ${multQuantity(a,'pagini')} pe zi. Câte pagini imprimă în ${multQuantity(b,'zile')}, în același ritm?`,
  `Un muzeu primește ${multQuantity(a,'vizitatori')} pe zi. Câți vizitatori primește în ${multQuantity(b,'zile')}, dacă numărul este același în fiecare zi?`,
  `O fabrică pregătește ${multQuantity(a,'caiete')} pe zi. Câte caiete pregătește în ${multQuantity(b,'zile')}, în același ritm?`
 ][multRand(0,2)];
}
function multUnit(question){if(question.includes('Cât costă'))return 'lei';for(const name of ['creioane','felii','pagini','vizitatori','caiete'])if(question.includes('Câte '+name)||question.includes('Câți '+name))return name;return '';}
function multAmount(game){return game==='spion'?6:12;}
function multBuild(level,game,previous=[]){
 const n=multAmount(game),used=new Set(previous),round=[];let tries=0;
 while(round.length<n&&tries++<10000){const [a,b]=multFactors(level,game),key=a+'x'+b;if(used.has(key))continue;used.add(key);round.push({a,b,answer:a*b,key,question:game==='situatii'?multSituation(a,b,level):'',shown:a*b,wrong:false});}
 if(round.length!==n&&previous.length)return multBuild(level,game,[]);
 if(round.length!==n)throw Error('Nu am putut pregăti seria.');
 if(game==='spion')for(const i of vocabShuffle(Array.from({length:n},(_,j)=>j)).slice(0,2)){const task=round[i],offset=task.answer<10?multRand(1,3):[1,10,100][multRand(0,2)];task.wrong=true;task.shown=task.answer+offset;}
 return {round,seen:[...used]};
}
function multKey(){return route.join('/');}
function multCompleted(){const p=rewardRead(),n=p.multiplicationRounds?.[multKey()];return Number.isInteger(n)?Math.max(0,Math.min(5,n)):0;}
function multSaveRound(){
 const p=rewardRead(),key=multKey();if(!p.multiplicationRounds||typeof p.multiplicationRounds!=='object'||Array.isArray(p.multiplicationRounds))p.multiplicationRounds={};
 const prior=Number.isInteger(p.multiplicationRounds[key])?Math.max(0,Math.min(5,p.multiplicationRounds[key])):0;
 p.multiplicationRounds[key]=Math.min(5,prior+1);if(p.multiplicationRounds[key]===5)p.stages[key]=true;
 return rewardSave(p);
}
function multSetup(){if(!state.__multRound){const made=multBuild(route[2],route[3],state.__multSeen||[]);state.__multRound=made.round;state.__multSeen=made.seen;state.__multFinished=false;}return state.__multRound;}
function multSet(i,key,value){state['mult-'+i+'-'+key]=value;const task=document.getElementById('mult-task-'+i);if(task){task.classList.remove('good','bad');task.querySelector('.mult-feedback').textContent='';}const score=document.getElementById('mult-score');if(score)score.replaceChildren();}
function multRender(level,game){
 if(!MULT_LEVELS[level])return view(`<div class="hero"><h2>✖️ Înmulțirea</h2><p>Alege de unde vrei să începi!</p></div><div class="cards">${Object.entries(MULT_LEVELS).map(([id,[title,description]],i)=>card((i+1)+'. '+title,description,`go('math','multiply','${id}')`)).join('')}</div>`);
 if(!MULT_GAMES[game])return view(`<div class="hero"><h2>✖️ ${esc(MULT_LEVELS[level][0])}</h2><p>Alege un joc!</p></div><div class="cards">${Object.entries(MULT_GAMES).map(([id,[title,description]],i)=>card((i+1)+'. '+title,description,`go('math','multiply','${level}','${id}')`)).join('')}</div>`);
 const n=multAmount(game),round=multSetup(),done=multCompleted(),shownRound=state.__multFinished?Math.max(1,done):Math.min(5,done+1);
 const instruction=game==='spion'?'În fiecare serie sunt două calcule greșite. Alege „Corect” sau „Greșit”; pentru cele greșite, scrie rezultatul corect.':game==='situatii'?'Citește fiecare problemă și scrie răspunsul.':'Calculează și scrie rezultatul.';
 const rows=round.map((t,i)=>{let answer=esc(String(state['mult-'+i+'-answer']??''));let q=game==='situatii'?esc(t.question):`${t.a} × ${t.b} = ${game==='spion'?t.shown:'?'}`;let control=game==='spion'?`<div class="options"><label class="option"><input type="radio" name="mult-${i}" ${state['mult-'+i+'-choice']==='correct'?'checked':''} onchange="multSet(${i},'choice','correct')"> Corect</label><label class="option"><input type="radio" name="mult-${i}" ${state['mult-'+i+'-choice']==='wrong'?'checked':''} onchange="multSet(${i},'choice','wrong')"> Greșit</label></div><label>Rezultatul corect, dacă este greșit: <input class="entry" inputmode="numeric" type="text" autocomplete="off" aria-label="Rezultatul corect la exercițiul ${i+1}" value="${answer}" oninput="multSet(${i},'answer',this.value)"></label>`:`<label>Răspuns: <input class="entry" inputmode="numeric" type="text" autocomplete="off" aria-label="Răspunsul exercițiului ${i+1}" value="${answer}" oninput="multSet(${i},'answer',this.value)">${game==='situatii'?' '+esc(multUnit(t.question)):''}</label>`;return `<div class="task" id="mult-task-${i}"><p><b>${i+1}.</b> ${q}</p>${control}<div class="mult-feedback" aria-live="polite"></div></div>`;}).join('');
 view(`<div class="hero"><div class="section-label">${esc(MULT_LEVELS[level][0])}</div><h2>${esc(MULT_GAMES[game][0])}</h2><p>${instruction}</p><p id="mult-progress">${done>=5?'🌟 Joc încheiat! Poți continua să exersezi.':`Seria ${shownRound} din 5 · ${done} din 5 serii încheiate`}</p></div><div class="panel">${rows}<div class="row"><button class="btn" onclick="multVerify()">✓ Verifică</button><button class="btn alt" id="mult-next" onclick="multNext()" ${state.__multFinished?'':'disabled'}>Încă ${n} ${game==='calcule'?'calcule':'exerciții'} →</button></div><div id="mult-score" aria-live="polite"></div></div>`);
}
function multVerify(){
 const rows=multSetup(),game=route[3],ids=[];let attempted=0;
 rows.forEach((t,i)=>{const raw=String(state['mult-'+i+'-answer']??'').replace(/\s/g,''),value=/^\d+$/.test(raw)?Number(raw):NaN,choice=state['mult-'+i+'-choice'];const answered=game==='spion'?(choice==='correct'||choice==='wrong'&&Number.isFinite(value)):Number.isFinite(value);if(answered)attempted++;const ok=game==='spion'?(t.wrong?choice==='wrong'&&value===t.answer:choice==='correct'):value===t.answer;const el=document.getElementById('mult-task-'+i);el.classList.toggle('good',ok);el.classList.toggle('bad',!ok);el.querySelector('.mult-feedback').textContent=ok?'✓ Corect!':'Mai încearcă! 💡';if(ok)ids.push(String(i));});
 const earned=rewardGrant('math',ids);let saved=true;
 if(attempted===rows.length&&!state.__multFinished){saved=multSaveRound();if(saved)state.__multFinished=true;}
 const done=multCompleted(),score=document.getElementById('mult-score');score.innerHTML=`<div class="result">${ids.length} din ${rows.length} răspunsuri corecte. ${!saved?'Nu am putut salva seria pe acest dispozitiv. Încearcă din nou.':ids.length===rows.length?'Bravo! 🌟':attempted===rows.length?'Ai lucrat toată seria! Poți corecta sau poți continua.':'Poți completa și verifica din nou.'}</div>`+rewardMessage(earned,'math');
 if(state.__multFinished){document.getElementById('mult-next').disabled=false;document.getElementById('mult-progress').textContent=done>=5?'🌟 Joc încheiat! Poți continua să exersezi.':`${done} din 5 serii încheiate!`;if(done===5)score.innerHTML+='<p class="reward-stage">✓ Joc bifat în pașaport!</p>';const chapter=rewardCurrentChapter();if(chapter&&chapter.diploma&&rewardComplete(chapter))score.innerHTML+=rewardDiplomaOffer(chapter);}
}
function multNext(){if(!state.__multFinished)return;const seen=state.__multSeen||[];state={__multSeen:seen};multRender(route[2],route[3]);window.scrollTo(0,0);}
const multOldRender=render;render=function(){if(route[0]==='math'&&route[1]==='multiply')return multRender(route[2],route[3]);return multOldRender();};
const multResolved=routeFromPath();if(JSON.stringify(multResolved)!==JSON.stringify(route)){route=multResolved;state=loadProgress();}render();
