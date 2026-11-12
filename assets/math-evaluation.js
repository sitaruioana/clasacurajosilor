/* Antrenament pentru evaluare. Punctele sunt păstrate de pașaportul existent. */
const MATH_EVAL_TYPES={calculeaza:'Calculează',afla:'Află',ascunse:'Descoperă numerele ascunse',gandesc:'Mă gândesc la un număr',ordine:'Ordinea operațiilor',necunoscute:'Descoperă valoarea necunoscutelor',probleme:'Probleme de toamnă'};
const MATH_EVAL={
 calculeaza:[
  ['7025 + 2413',9438],['6142 + 2735',8877],['4253 + 3421',7674],
  ['3248 + 2457',5705],['3765 + 2847',6612],['4578 + 2346',6924],
  ['9875 − 4523',5352],['8647 − 3215',5432],['9654 − 4232',5422],
  ['6652 − 2418',4234],['7541 − 3267',4274],['8932 − 4576',4356],
  ['5700 − 2382',3318],['6400 − 2754',3646],['8200 − 3467',4733],
  ['9000 − 3674',5326],['7000 − 2856',4144],['8000 − 4738',3262]
 ].map(([q,a])=>({q,a})),
 afla:[
  ['Suma numerelor 4325 și 3794.','4325+3794=8119|3794+4325=8119'],
  ['Suma numerelor 2456 și 3278.','2456+3278=5734|3278+2456=5734'],
  ['Suma numerelor 1834 și 5427.','1834+5427=7261|5427+1834=7261'],
  ['Diferența numerelor 8566 și 5435.','8566-5435=3131'],
  ['Diferența numerelor 7824 și 3657.','7824-3657=4167'],
  ['Diferența numerelor 9000 și 2746.','9000-2746=6254'],
  ['Numărul cu 1325 mai mic decât suma numerelor 5636 și 3708.','5636+3708-1325=8019|(5636+3708)-1325=8019|3708+5636-1325=8019|(3708+5636)-1325=8019'],
  ['Numărul cu 1200 mai mic decât suma numerelor 3500 și 2700.','3500+2700-1200=5000|(3500+2700)-1200=5000|2700+3500-1200=5000|(2700+3500)-1200=5000'],
  ['Numărul cu 1500 mai mic decât suma numerelor 4100 și 2300.','4100+2300-1500=4900|(4100+2300)-1500=4900|2300+4100-1500=4900|(2300+4100)-1500=4900'],
  ['Scăzătorul, dacă descăzutul este 8652, iar diferența este 5431.','8652-5431=3221'],
  ['Scăzătorul, dacă descăzutul este 7430, iar diferența este 3215.','7430-3215=4215'],
  ['Scăzătorul, dacă descăzutul este 9320, iar diferența este 4100.','9320-4100=5220'],
  ['Numărul scăzut din 7491 pentru a obține 3986.','7491-3986=3505'],
  ['Numărul scăzut din 8250 pentru a obține 4120.','8250-4120=4130'],
  ['Numărul scăzut din 7000 pentru a obține 3260.','7000-3260=3740'],
  ['Numărul adunat cu 6426 pentru a obține 8000.','8000-6426=1574'],
  ['Numărul adunat cu 3570 pentru a obține 7000.','7000-3570=3430'],
  ['Numărul adunat cu 4285 pentru a obține 9000.','9000-4285=4715']
 ].map(([q,a])=>({q,a,expression:true})),
 ascunse:[
  ['4561 + 🍎 = 8542',3981,[3981,3982,4981]],['3250 + 🍎 = 7120',3870,[3870,3970,3880]],['2146 + 🍎 = 6350',4204,[4204,4304,4104]],
  ['🍂 + 4507 = 7182',2675,[2675,2775,2575]],['🍂 + 3200 = 7600',4400,[4400,4300,4500]],['🍂 + 2415 = 6830',4415,[4415,4515,4315]],
  ['🌰 − 3792 = 4696',8488,[8488,8486,8688]],['🌰 − 2100 = 4300',6400,[6400,6200,6500]],['🌰 − 3245 = 4120',7365,[7365,7265,7465]]
 ].map(([q,a,options])=>({q,a,options})),
 gandesc:[
  ['Mă gândesc la un număr, adaug suma numerelor 3561 și 1277 și obțin 7592. La ce număr m-am gândit?',2754],
  ['Mă gândesc la un număr, adaug suma numerelor 2100 și 1350 și obțin 6800. La ce număr m-am gândit?',3350],
  ['Mă gândesc la un număr, adaug suma numerelor 1840 și 2160 și obțin 9000. La ce număr m-am gândit?',5000]
 ].map(([q,a])=>({q,a})),
 ordine:[
  ['4200 + 1300 − 1100 + 1700 − 1200 + 1000',5900],
  ['(3500 + 1200) − (2400 − 1300) + 1700 − 1200 + 1000',5100],
  ['(6200 − 2100) + (3100 − 1400) − 1200 + 1000 − 1300',4300]
 ].map(([q,a])=>({q,a})),
 necunoscute:[
  ['a + 2410 − 1320 = 4360. Află a.',3270],
  ['b − 2300 − 1400 = 3200. Află b.',6900],
  ['8100 − c + 1800 = 4900. Află c.',5000]
 ].map(([q,a])=>({q,a})),
 probleme:[
  ['În trei zile, copiii au adunat 3000 de alune. În prima zi au adunat 1200, iar în a doua zi cu 200 mai puține decât în prima. Câte alune au adunat în a treia zi?',800,[3000,1200,2200,1000,800]],
  ['Într-o livadă s-au cules 4500 de kilograme de fructe: 1500 de kilograme de mere, pere cu 300 de kilograme mai puține decât mere și prune. Câte kilograme de prune s-au cules?',1800,[1200,1800,2700,4500,1500]],
  ['Copiii au strâns 1218 frunze galbene, iar frunze roșii cu 399 mai puține. Frunze ruginii au strâns cât cele galbene și roșii la un loc. Câte frunze au strâns în total?',4074,[1218,3000,4074,819,2037]],
  ['Într-o zi, copiii au adunat 1350 de castane, a doua zi cu 250 mai multe, iar a treia zi cât în primele două zile la un loc. Câte castane au adunat în total?',5900,[4000,1350,5900,2950,1600]],
  ['O grădină a dat 1420 de kilograme de morcovi, cu 320 de kilograme mai puțini cartofi, iar dovleci cât morcovii și cartofii la un loc. Câte kilograme de legume s-au adunat în total?',5040,[1100,2520,4000,1420,5040]]
 ].map(([q,a,options])=>({q,a,options}))
};
FRIENDLY_ROUTES['matematica/bonus-evaluare']=['math','evaluation'];
for(const key of Object.keys(MATH_EVAL_TYPES))FRIENDLY_ROUTES['matematica/bonus-evaluare/'+key]=['math','evaluation',key];
rewardChapter('math-evaluation','math','Bonus: antrenament pentru evaluare',Object.entries(MATH_EVAL_TYPES).map(([key,title])=>[title,['math','evaluation',key]]),true);
const mathEvalOldCrumbs=crumbs;crumbs=function(){let html=mathEvalOldCrumbs().replace('>evaluation</button>','>Bonus evaluare</button>');for(const [key,title] of Object.entries(MATH_EVAL_TYPES))html=html.replace('>'+key+'</button>','>'+title+'</button>');return html;};
const mathEvalOldLoad=loadProgress;loadProgress=function(){return route[0]==='math'&&route[1]==='evaluation'&&route[2]?{}:mathEvalOldLoad();};
const mathEvalOldView=view;view=function(html){const menu=route[0]==='math'&&!route[1];if(menu)html=html.replace('<div class="cards">','<div class="cards">'+card('⭐ Bonus: antrenament pentru evaluare','Jocuri cu adunări, scăderi și probleme',"go('math','evaluation')",'2026-11-12T00:00:00+02:00'));const result=mathEvalOldView(html);if(menu){const grid=document.querySelector('#app .cards');const detective=grid&&[...grid.querySelectorAll('.card')].find(el=>el.textContent.includes('Detectivii numerelor'));if(detective)grid.appendChild(detective);}return result;};
function mathEvalSet(i,value){state['me-'+i]=value;document.getElementById('me-score')?.replaceChildren();}
function mathEvalNormal(value){return String(value).replace(/[\s\u00a0\u202f]/g,'').replace(/[−–—]/g,'-').toLowerCase();}
function mathEvalRender(kind){
 if(!MATH_EVAL[kind])return view(`<div class="hero"><h2>⭐ Bonus: antrenament pentru evaluare</h2><p>Alege un joc și exersează în ritmul tău!</p></div><div class="cards">${Object.entries(MATH_EVAL_TYPES).map(([key,title],i)=>card((i+1)+'. '+title,MATH_EVAL[key].length+' exerciții',`go('math','evaluation','${key}')`)).join('')}</div>`);
 const rows=MATH_EVAL[kind];
 const rule=kind==='necunoscute'?`<div class="rule"><b>REȚINE!</b><ol><li>Mărești necunoscuta.</li><li>Ce rol are „marea necunoscută”?</li><li>Cum o aflăm?</li><li>Copiem „marea necunoscută”!</li><li>O aflăm!</li><li>Am rămas cu o necunoscută mică, așa și-așa! 🎶</li><li>Rezolv exercițiul clasic!</li></ol><h3>📝 Model</h3><div style="line-height:1.9"><span style="display:inline-flex;vertical-align:bottom;flex-direction:column;align-items:center;line-height:1.3"><small style="font-weight:700;color:#8b3a45">descăzut</small><span style="border:2px solid #bd5871;border-radius:6px;padding:2px 6px">a + 2520</span></span> − 1610 = 4337<br>a + 2520 = 1610 + 4337<br>a + 2520 = 5947<br>a = 5947 − 2520<br><b>a = 3427</b></div></div>`:'';
 const intro=kind==='afla'?'Scrie exercițiul și rezultatul, de exemplu: 8000 − 3000 = 5000.':kind==='ordine'?'Respectă ordinea operațiilor, apoi scrie rezultatul.':kind==='necunoscute'?'Rezolvă după model, apoi scrie valoarea necunoscutei.':kind==='probleme'?'Citește problema și alege răspunsul potrivit.':kind==='ascunse'?'Alege numărul care se ascunde.':'Calculează și scrie răspunsul.';
 const tasks=rows.map((t,i)=>`<div class="task" id="me-task-${i}"><p><b>${i+1}.</b> ${esc(t.q)}${kind==='calculeaza'||kind==='ordine'?' = ?':''}</p>${t.options?`<div class="options">${t.options.map((n,j)=>`<label class="option"><input type="radio" name="me-${i}" value="${n}" ${String(state['me-'+i])===String(n)?'checked':''} onchange="mathEvalSet(${i},this.value)"> ${n}</label>`).join('')}</div>`:`<input class="entry" style="width:${t.expression?'min(100%, 440px)':'160px'}" type="text" ${t.expression?'':'inputmode="numeric"'} autocomplete="off" aria-label="Răspunsul exercițiului ${i+1}" placeholder="${t.expression?'Scrie exercițiul și rezultatul':'Răspunsul tău'}" value="${esc(String(state['me-'+i]||''))}" oninput="mathEvalSet(${i},this.value)">`}<div class="me-feedback" aria-live="polite"></div></div>`).join('');
 view(`<div class="hero"><h2>⭐ ${esc(MATH_EVAL_TYPES[kind])}</h2><p>${intro}</p>${rule}</div><div class="panel">${tasks}<div class="row"><button class="btn" onclick="mathEvalVerify()">✓ Verifică</button><button class="btn alt" onclick="mathEvalRepeat()">↺ Reîncearcă</button></div><div id="me-score" aria-live="polite"></div></div>`);
}
function mathEvalVerify(){let rows=MATH_EVAL[route[2]],ids=[];rows.forEach((t,i)=>{let answer=mathEvalNormal(state['me-'+i]||''),correct=String(t.a).split('|').some(a=>mathEvalNormal(a)===answer),el=document.getElementById('me-task-'+i);el.classList.toggle('good',correct);el.classList.toggle('bad',!correct);el.querySelector('.me-feedback').textContent=correct?'✓ Corect!':'Mai încearcă! 💡';if(correct)ids.push(String(i));});document.getElementById('me-score').innerHTML=`<div class="result">${ids.length} din ${rows.length} exerciții corecte. ${ids.length===rows.length?'Bravo! 🌟':'Poți corecta și verifica din nou.'}</div>`;rewardAfter(ids,rows.length,'#me-score','math');}
function mathEvalRepeat(){state={};mathEvalRender(route[2]);window.scrollTo(0,0);}
const mathEvalOldRender=render;render=function(){if(route[0]==='math'&&route[1]==='evaluation')return mathEvalRender(route[2]);return mathEvalOldRender();};
const mathEvalResolved=routeFromPath();if(JSON.stringify(mathEvalResolved)!==JSON.stringify(route)){route=mathEvalResolved;state=loadProgress();}render();
