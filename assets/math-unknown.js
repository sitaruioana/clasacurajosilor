/* Use the same current unknown-number exercises from every entry page. */
const sharedUnknownTypes={term:['Termenul necunoscut','Primul și al doilea termen, amestecate'],minuend:['Descăzutul necunoscut','Află numărul din care se scade'],subtrahend:['Scăzătorul necunoscut','Află numărul care se scade'],mixed:['Exerciții combinate','Toate cele trei reguli, amestecate']};
const sharedUnknownLevels={easy:['🟢 Ușor','Fără trecere peste ordin: descoperă regula, estimează și alege răspunsul.'],medium:['🟡 Mediu','Calcule cu trecere peste ordin și verificarea rezultatului.'],hard:['🟠 Dificil','Probleme cu povești diferite, în care identifici numărul necunoscut.'],advanced:['🔴 Avansat','Probleme cu două etape și un calcul suplimentar accesibil.']};
const sharedUnknownWords={năstrușnic:'pus pe șotii, poznaș',istovit:'foarte obosit',cinstit:'corect, care nu înșală',neclintit:'care nu se mișcă',omenie:'bunătate și grijă față de ceilalți',negustor:'persoană care cumpără și vinde mărfuri',spaimă:'frică puternică'};
for(const key of Object.keys(UNKNOWN_TYPES))delete UNKNOWN_TYPES[key];Object.assign(UNKNOWN_TYPES,sharedUnknownTypes);Object.assign(UNKNOWN_LEVELS,sharedUnknownLevels);
for(const r of Object.values(FRIENDLY_ROUTES))if(r[0]==='math'&&r[1]==='unknown'&&['first','second'].includes(r[2]))r[2]='term';
function unknownWord(w){return `<span class="vocab-word" tabindex="0" role="button" title="Apasă pentru explicație" onclick="this.title='${sharedUnknownWords[w]||''}';alert('${w}: ${sharedUnknownWords[w]||''}')">${w}</span>`}
function unknownRng(seed){return function(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}}
function unknownProblems(type,level){
 const seed=({term:13,minuend:29,subtrahend:43,mixed:59}[type]||13)+({easy:0,medium:101,hard:203,advanced:307}[level]||0);
 const rand=unknownRng(seed),pick=a=>a[Math.floor(rand()*a.length)];
 const kinds=type==='term'?['first','second','second','first','first','second','first','second','second','first']:type==='mixed'?['first','minuend','second','subtrahend','first','subtrahend','minuend','second','subtrahend','minuend']:Array(10).fill(type);
 return kinds.map((kind,i)=>{
  let a,b;
  if(level==='easy'){
   // Fără transport/împrumut la fiecare ordin, cu toți termenii principali >= 1000.
   const digitsA=[1+Math.floor(rand()*4),1+Math.floor(rand()*4),1+Math.floor(rand()*4),1+Math.floor(rand()*4)];
   const digitsB=digitsA.map((d,j)=>j===0?1+Math.floor(rand()*(8-d)):Math.floor(rand()*(9-d)));
   a=digitsA.reduce((v,d)=>v*10+d,0);b=digitsB.reduce((v,d)=>v*10+d,0);
   if(kind==='minuend'||kind==='subtrahend'){a=a+b;} // scăderea fără împrumut
  }else{
   b=1100+Math.floor(rand()*1800);a=3500+Math.floor(rand()*3500);
   if(kind==='minuend'||kind==='subtrahend')a=Math.max(a,b+1200);
   if(a+b>9999)a=9999-b;
   // La mediu, introducem trecerea peste ordin la adunare/scădere.
   if(level==='medium'){
    if(kind==='first'||kind==='second'){a=3527+i*137;b=1478+i*63;}
    else{a=6532+i*107;b=1786+i*53;}
   }
  }
  const sum=a+b,diff=a-b,answer=(kind==='first'||kind==='minuend')?a:b;
  let expression={first:`□ + ${b} = ${sum}`,second:`${a} + □ = ${sum}`,minuend:`□ − ${b} = ${diff}`,subtrahend:`${a} − □ = ${diff}`}[kind];
  let question=expression;
  let tip1='';let tip2='';
  if(level==='easy'){
   tip1=`Estimează: numărul lipsă este aproximativ ${Math.round(answer/1000)*1000}. Care variantă este apropiată de estimarea ta?`;
   tip2={first:'Din sumă scazi termenul cunoscut.',second:'Din sumă scazi termenul cunoscut.',minuend:'La diferență aduni scăzătorul.',subtrahend:'Din descăzut scazi diferența.'}[kind];
  }else if(level==='medium'){
   tip1='Identifică mai întâi numărul necunoscut și operația inversă.';
   tip2='Verifică prin înlocuirea numărului găsit în egalitatea inițială.';
  }else if(level==='hard'){
   const scenes={
    first:[`Ana a ales un număr secret. A adunat ${b} și a obținut ${sum}. Ce număr a ales?`,`O veveriță năstrușnică a strâns câteva alune. Prietena ei a adus încă ${b}, iar acum au ${sum}. Câte strânsese prima?`,`La târg, un negustor a primit un număr necunoscut de mere și încă ${b} pere. În total are ${sum} de fructe. Câte mere a primit?`],
    second:[`Mara avea ${a} de mărgele. Bunica i-a dăruit încă un număr necunoscut, iar colecția a ajuns la ${sum}. Câte mărgele a primit?`,`Un robot a parcurs ${a} m dimineața și încă o distanță necunoscută după-amiaza. În total a parcurs ${sum} m. Cât a mers după-amiaza?`,`Un explorator istovit a parcurs ${a} m, apoi încă o porțiune de traseu. La final, contorul arăta ${sum} m. Cât măsoară a doua porțiune?`],
    minuend:[`Dintr-o bibliotecă s-au împrumutat ${b} de cărți și au rămas ${diff}. Câte cărți erau inițial?`,`Un muzeu a trimis ${b} de monede la restaurare. În vitrine au rămas ${diff}. Câte monede erau la început?`,`O echipă a folosit ${b} de piese pentru un castel LEGO și i-au rămas ${diff}. Câte piese avea?`],
    subtrahend:[`Un negustor cinstit avea ${a} de mere. După vânzare, i-au rămas ${diff}. Câte mere a vândut?`,`Din ${a} de bile colorate, copiii au folosit câteva pentru un mozaic. Au rămas ${diff}. Câte bile au folosit?`,`Un robot avea de parcurs ${a} m. Îi mai rămân ${diff} m. Câți metri a parcurs deja?`]
   };
   question=scenes[kind][i%3];tip1='Ce reprezintă numărul necunoscut în poveste?';tip2=`Poți scrie egalitatea: ${expression}`;
  }else if(level==='advanced'){
   const extra=120+10*(i%6),other=210+10*(i%5),combined=extra+other;
   // În fiecare problemă, o operație mică pregătește egalitatea cu necunoscuta.
   const scenes={
    first:[`La un concurs, echipa A a câștigat un număr necunoscut de puncte. Echipa B a adunat ${extra} puncte dimineața și ${other} după-amiaza. Împreună au ${answer+combined} puncte. Câte are echipa A?`,`Un negustor a adus un număr necunoscut de caiete. A mai primit două cutii cu ${extra} și ${other} caiete. Acum are ${answer+combined}. Câte avea înainte?`],
    second:[`Ana avea ${a} de abțibilduri. A primit ${extra} de la o prietenă și încă un număr necunoscut de la alta. Acum are ${a+extra+answer}. Câte i-a dăruit a doua prietenă?`,`Într-un joc, un robot avea ${a} de puncte. A câștigat ${extra} și apoi un bonus misterios. Scorul final este ${a+extra+answer}. Cât a valorat bonusul?`],
    minuend:[`Dintr-o colecție misterioasă au fost trimise ${extra} de obiecte la expoziție și încă ${other} la restaurare. Au rămas ${answer-combined}. Câte obiecte erau inițial?`,`Un explorator a consumat ${extra} ml de apă dimineața și ${other} ml după-amiaza. În bidon au rămas ${answer-combined} ml. Câți mililitri avea la început?`],
    subtrahend:[`Într-un depozit erau ${a} de jucării. Au plecat un număr necunoscut către magazine și încă ${extra} către o școală. Au rămas ${a-answer-extra}. Câte jucării au plecat către magazine?`,`La festival erau ${a} de bilete. S-au vândut un număr necunoscut, apoi încă ${extra}. Au rămas ${a-answer-extra}. Câte bilete s-au vândut prima dată?`]
   };
   question=scenes[kind][i%2];tip1='Află mai întâi suma sau diferența din informațiile cunoscute.';tip2='După primul calcul, scrie o egalitate cu numărul necunoscut.';
  }
  return {question,answer,expression,tip1,tip2,kind};
 });
}
function unknownOptions(answer,i){
 // Patru variante, cu răspunsul corect distribuit între toate pozițiile.
 const offsets=[100,-100,1000,-1000,200,-200,500,-500,300,-300,700,-700];
 const choices=[];
 for(const offset of offsets){
  const n=answer+offset;
  if(n>=1000&&n<=9999&&n!==answer&&!choices.includes(n))choices.push(n);
  if(choices.length===3)break;
 }
 // Plasă de siguranță pentru a păstra trei distractori diferiți și în cazuri-limită.
 for(let d=1;choices.length<3;d++){
  const n=answer+d;
  if(n<=9999&&n!==answer&&!choices.includes(n))choices.push(n);
  const m=answer-d;
  if(choices.length<3&&m>=1000&&m!==answer&&!choices.includes(m))choices.push(m);
 }
 const correctPosition=i%4;
 choices.splice(correctPosition,0,answer);
 return choices;
}
function unknownCompleted(){return Array.from({length:10},(_,i)=>!!state['correct'+i]).filter(Boolean).length}
function unknownVerify(){
 const ps=unknownProblems(route[2],route[3]);let good=0;
 ps.forEach((p,i)=>{const v=String(val(i)).replace(/\s/g,'');const ok=v!==''&&Number(v)===p.answer;if(ok)state['correct'+i]=true;if(state['correct'+i])good++;const el=document.getElementById('unknown-feedback-'+i);if(el)el.textContent=ok?'✓ Corect!':state['correct'+i]?'✓ Rezolvat anterior':'Mai încearcă. Verifică regula și calculul.';if(el)el.className='unknown-feedback '+(ok||state['correct'+i]?'good-feedback':'bad-feedback');});
 saveProgress();const bar=document.getElementById('unknown-bar');if(bar)bar.style.width=(good*10)+'%';const counter=document.getElementById('unknown-count');if(counter)counter.textContent=good+' din 10 rezolvate';const msg=document.getElementById('unknown-message');if(msg)msg.innerHTML=good===10?'🎉 Bravo! Ai terminat toate cele 10 exerciții. Poți continua cu un alt nivel.':'Continuă! Bara crește când rezolvi corect un exercițiu.';
}
function unknownChoose(i,n){state[key(i)]=String(n);saveProgress();const buttons=document.querySelectorAll('[data-unknown-option="'+i+'"]');buttons.forEach(b=>b.classList.toggle('chosen',b.dataset.value===String(n)));unknownVerify()}
function unknownInput(i,v){state[key(i)]=v;saveProgress();let el=document.getElementById('unknown-feedback-'+i);if(el)el.textContent='';}
function renderUnknown(type,level){
 if(type==='first'||type==='second'){type='term';route[2]='term';}
 if(!type)return view(`<div class="hero"><h2>❓ Aflarea numărului necunoscut</h2><p>Lucrăm cu numere între 1.000 și 10.000. Alege tipul de exerciții.</p></div><div class="cards">${Object.entries(UNKNOWN_TYPES).map(([k,v])=>card(v[0],v[1],`go('math','unknown','${k}')`)).join('')}</div><div class="rule"><b>Reține!</b> Termen necunoscut = sumă − termen cunoscut. Descăzut necunoscut = diferență + scăzător. Scăzător necunoscut = descăzut − diferență.</div>`);
 if(!level)return view(`<div class="hero"><h2>${UNKNOWN_TYPES[type][0]}</h2><p>Patru niveluri, câte 10 exerciții fiecare. Etapele și diamantele se păstrează pe acest dispozitiv.</p></div><div class="cards">${Object.entries(UNKNOWN_LEVELS).map(([k,v])=>card(v[0],v[1],`go('math','unknown','${type}','${k}')`)).join('')}</div>`);
 const problems=unknownProblems(type,level),completed=unknownCompleted();
 const body=problems.map((p,i)=>{
  let entry=level==='easy'?`<div class="options">${unknownOptions(p.answer,i).map(n=>`<button type="button" data-unknown-option="${i}" data-value="${n}" class="option ${String(val(i))===String(n)?'chosen':''}" onclick="unknownChoose(${i},${n})">${n.toLocaleString('ro-RO')}</button>`).join('')}</div>`:`<input class="entry" type="number" inputmode="numeric" min="1000" max="10000" aria-label="Răspunsul exercițiului ${i+1}" placeholder="Numărul necunoscut" value="${esc(val(i))}" oninput="unknownInput(${i},this.value)"/> <button class="btn alt" onclick="unknownVerify()">✓ Verifică</button>`;
  let q=esc(p.question);for(const w of Object.keys(sharedUnknownWords))q=q.replace(new RegExp('\\b'+w+'\\b','g'),unknownWord(w));
  return `<div class="task"><p><b>${i+1}.</b> ${q}</p>${entry}<div id="unknown-feedback-${i}" class="unknown-feedback">${state['correct'+i]?'✓ Rezolvat anterior':''}</div><details><summary>💡 Primul indiciu</summary><p>${esc(p.tip1)}</p><details><summary>Am nevoie de încă un indiciu</summary><p>${esc(p.tip2)}</p></details></details></div>`;
 }).join('');
 view(`<div class="hero"><div class="section-label">${UNKNOWN_TYPES[type][0]} · ${UNKNOWN_LEVELS[level][0]}</div><h2>Află numărul necunoscut</h2><p>${UNKNOWN_LEVELS[level][1]}</p><div class="unknown-progress"><div class="row" style="justify-content:space-between"><b>Progresul meu</b><span id="unknown-count">${completed} din 10 rezolvate</span></div><div class="unknown-track"><div id="unknown-bar" class="unknown-fill" style="width:${completed*10}%"></div></div></div></div><div class="panel">${body}<div class="row" style="margin-top:16px"><button class="btn" onclick="unknownVerify()">✓ Verifică răspunsurile</button><button class="btn alt" onclick="resetTask()">↺ Reîncepe nivelul</button></div><p id="unknown-message" class="result">${completed===10?'🎉 Bravo! Ai terminat toate exercițiile.':'Bara de progres crește numai după un răspuns corect.'}</p></div>`);
}
const sharedUnknownResolved=routeFromPath();if(JSON.stringify(sharedUnknownResolved)!==JSON.stringify(route)){route=sharedUnknownResolved;state=loadProgress();}render();
