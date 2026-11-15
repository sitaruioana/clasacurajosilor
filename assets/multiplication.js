/* Înmulțirea: serii scurte, puncte și progresul păstrat în pașaport. */
const MULT_LEVELS={
 tabla:['Reamintește-ți tabla înmulțirii','0–10'],
 zu_u:['Înmulțirea ZU × U','Zeci și unități × unități'],
 szu_u:['Înmulțirea SZU × U','Sute, zeci și unități × unități'],
 mszu_u:['Înmulțirea MSZU × U','Mii, sute, zeci și unități × unități'],
 zu_zu:['Înmulțirea ZU × ZU','Două cifre × două cifre'],
 szu_zu:['Înmulțirea SZU × ZU','Trei cifre × două cifre']
};
const MULT_GAMES={calcule:['🧮 Calculează','Scrie rezultatul'],situatii:['🌍 Probleme din viața de zi cu zi','Citește și calculează'],spion:['🕵️ Spionul de greșeli','Descoperă și corectează cele două greșeli'],istetei:['🧠 Exerciții pentru isteței','Calculează mintal, pas cu pas']};
const MULT_MIND=[["Începe cu numărul 3. Adaugă 30. Rotunjește la cea mai apropiată zece. Dublează numărul. Adaugă numărul de laturi ale unui triunghi.",63],["Începe cu numărul 4. Adaugă 25. Rotunjește la cea mai apropiată zece. Înjumătățește numărul. Adaugă numărul de colțuri ale unui pătrat.",19],["Începe cu numărul 6. Triplează-l. Adaugă 12. Scade numărul de zile dintr-o săptămână.",23],["Începe cu numărul 4. Adaugă 29. Rotunjește la cea mai apropiată zece. Dublează numărul. Adaugă numărul de zile dintr-o săptămână.",67],["Începe cu numărul 6. Triplează-l. Adaugă numărul de brațe ale unei caracatițe. Înjumătățește rezultatul.",13],["Începe cu numărul 5. Mărește-l de zece ori. Scade numărul de zile din februarie într-un an bisect.",21],["Începe cu numărul 12. Adaugă numărul de luni dintr-un an. Dublează rezultatul.",48],["Începe cu numărul 8. Adaugă 21. Rotunjește la cea mai apropiată zece. Adaugă numărul de ore dintr-o zi.",54],["Începe cu numărul 50. Înjumătățește-l. Adaugă 11. Rotunjește la cea mai apropiată zece. Adaugă numărul de degete de la două mâini.",50],["Începe cu numărul 9. Triplează-l. Adaugă numărul de anotimpuri dintr-un an. Rotunjește-l la zeci. Înjumătățește-l",15],["Începe cu numărul 20. Scade numărul lunilor de vară. Dublează rezultatul.",34],["Începe cu numărul 14. Adaugă numărul de roți ale două biciclete. Rotunjește la cea mai apropiată zece! Triplează rezultatul.",60],["Începe cu numărul 11. Adaugă numărul de colțuri ale unei cărți. Dublează rezultatul. Scade 6.",24],["Începe cu numărul 5. Adaugă numărul de zile dintr-un weekend. Mărește rezultatul de zece ori. Scade 20.",50],["Începe cu numărul 18. Scade numărul de anotimpuri dintr-un an. Dublează rezultatul. Rotunjește la zeci!",30],["Începe cu numărul 9. Adaugă numărul de picioare ale unui păianjen. Dublează rezultatul.",34],["Începe cu numărul 20. Adaugă numărul de luni dintr-un an. Înjumătățește rezultatul. Adaugă 4.",20],["Începe cu numărul 14. Adaugă numărul de roți ale unui automobil. Înjumătățește rezultatul. Mărește de 10 ori și mai pune 10.",100],["Începe cu numărul 6. Adaugă numărul de brațe ale unei caracatițe. Dublează rezultatul. Adaugă 4.",32],["Începe cu numărul 8. Adaugă numărul de planete din Sistemul Solar. Înjumătățește rezultatul. Adună 22 și scade 11.",19],["Începe cu numărul 11. Adaugă numărul de jucători ai unei echipe de fotbal pe teren. Dublează rezultatul.",44],["Începe cu numărul 31. Scade numărul de zile dintr-o săptămână. Înjumătățește rezultatul. Cât îți mai trebuie până la 20?",8],["Începe cu numărul 16. Înjumătățește-l. Adaugă numărul de colțuri ale unei ferestre dreptunghiulare. Triplează rezultatul.",36],["Începe cu numărul 12. Adaugă numărul de zile dintr-un weekend. Dublează rezultatul. Cât îți mai trebuie până la 40?",12],["Începe cu numărul 18. Scade numărul de anotimpuri. Dublează rezultatul. Cât îți mai trebuie până la 40?",12],["Începe cu numărul 10. Adaugă numărul de luni dintr-un an. Dublează rezultatul. Cât îți mai trebuie până la 50?",6],["Începe cu numărul 20. Scade numărul de roți ale unei biciclete. Înjumătățește rezultatul. Cât îți mai trebuie până la 15?",6],["Începe cu numărul 30. Scade numărul de zile dintr-o săptămână. Rotunjește la cea mai apropiată zece! Înjumătățește rezultatul. Cât îți mai trebuie până la 25?",15],["Începe cu numărul 6. Triplează-l. Adaugă numărul de anotimpuri. Cât îți mai trebuie până la 100?",78],["Începe cu numărul 11. Adaugă numărul de jucători ai unei echipe de fotbal pe teren. Dublează rezultatul. Cât îți mai trebuie până la 100?",56],["Începe cu numărul 3. Triplează-l. Adaugă numărul de zile ale unei săptămâni.",16],["Începe cu numărul 12. Înjumătățește-l. Adaugă numărul de brațe ale unei caracatițe.",14],["Începe cu numărul 6. Dublează-l. Adaugă numărul de luni dintr-un an.",24],["Începe cu numărul 11. Adaugă numărul de laturi ale unui pătrat. Rotunjește la cea mai apropiată zece. Dublează rezultatul.",40],["Începe cu numărul 11. Scade numărul lunilor de vară. Dublează rezultatul. Cât îți mai trebuie până la 50?",34],["Începe cu numărul 4. Triplează-l. Adaugă numărul de zile ale unei săptămâni.",19],["Începe cu numărul 14. Înjumătățește-l. Adaugă numărul de brațe ale unei caracatițe.",15],["Începe cu numărul 7. Dublează-l. Adaugă numărul de luni dintr-un an.",26],["Începe cu numărul 12. Adaugă numărul de laturi ale unui pătrat. Rotunjește la cea mai apropiată zece. Dublează rezultatul.",40],["Începe cu numărul 12. Scade numărul lunilor de vară. Dublează rezultatul. Cât îți mai trebuie până la 50?",32],["Începe cu numărul 5. Triplează-l. Adaugă numărul de zile ale unei săptămâni.",22],["Începe cu numărul 16. Înjumătățește-l. Adaugă numărul de brațe ale unei caracatițe.",16],["Începe cu numărul 8. Dublează-l. Adaugă numărul de luni dintr-un an.",28],["Începe cu numărul 13. Adaugă numărul de laturi ale unui pătrat. Rotunjește la cea mai apropiată zece. Dublează rezultatul.",40],["Începe cu numărul 13. Scade numărul lunilor de vară. Dublează rezultatul. Cât îți mai trebuie până la 50?",30],["Începe cu numărul 6. Triplează-l. Adaugă numărul de zile ale unei săptămâni.",25],["Începe cu numărul 18. Înjumătățește-l. Adaugă numărul de brațe ale unei caracatițe.",17],["Începe cu numărul 9. Dublează-l. Adaugă numărul de luni dintr-un an.",30],["Începe cu numărul 14. Adaugă numărul de laturi ale unui pătrat. Rotunjește la cea mai apropiată zece. Dublează rezultatul.",40],["Începe cu numărul 14. Scade numărul lunilor de vară. Dublează rezultatul. Cât îți mai trebuie până la 50?",28],["Începe cu numărul 7. Triplează-l. Adaugă numărul de zile ale unei săptămâni.",28],["Începe cu numărul 20. Înjumătățește-l. Adaugă numărul de brațe ale unei caracatițe.",18],["Începe cu numărul 10. Dublează-l. Adaugă numărul de luni dintr-un an.",32],["Începe cu numărul 15. Adaugă numărul de laturi ale unui pătrat. Rotunjește la cea mai apropiată zece. Dublează rezultatul.",40],["Începe cu numărul 15. Scade numărul lunilor de vară. Dublează rezultatul. Cât îți mai trebuie până la 50?",26],["Începe cu numărul 8. Triplează-l. Adaugă numărul de zile ale unei săptămâni.",31],["Începe cu numărul 22. Înjumătățește-l. Adaugă numărul de brațe ale unei caracatițe.",19],["Începe cu numărul 11. Dublează-l. Adaugă numărul de luni dintr-un an.",34],["Începe cu numărul 16. Adaugă numărul de laturi ale unui pătrat. Rotunjește la cea mai apropiată zece. Dublează rezultatul.",40],["Începe cu numărul 16. Scade numărul lunilor de vară. Dublează rezultatul. Cât îți mai trebuie până la 50?",24]];
const MULT_ROOT='matematica/inmultirea';
FRIENDLY_ROUTES[MULT_ROOT]=['math','multiply'];
for(const level of Object.keys(MULT_LEVELS)){
 FRIENDLY_ROUTES[MULT_ROOT+'/'+level]=['math','multiply',level];
 for(const game of Object.keys(MULT_GAMES))FRIENDLY_ROUTES[MULT_ROOT+'/'+level+'/'+game]=['math','multiply',level,game];
}
rewardChapter('math-multiplication','math','Înmulțirea',Object.entries(MULT_LEVELS).flatMap(([level,[title]])=>Object.entries(MULT_GAMES).filter(([game])=>game!=='istetei').map(([game,[name]])=>[title+' · '+name,['math','multiply',level,game]])),true);
REWARD_CHAPTERS.unshift(REWARD_CHAPTERS.pop());
rewardChapter('math-mind','math','Exerciții pentru isteței',Object.entries(MULT_LEVELS).map(([level,[title]])=>[title+' · Exerciții pentru isteței',['math','multiply',level,'istetei']]));
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
function multSituation(a,b,level,kind){
 if(kind==='wafer')return `Într-un pachet sunt ${a} napolitane. Câte napolitane sunt în ${b} pachete la fel?`;
 if(kind==='pages')return `Un copil citește ${multQuantity(a,'pagini')} în fiecare zi. Câte pagini citește în ${multQuantity(b,'zile')}, dacă citește la fel zilnic?`;
 if(kind==='books')return `O carte are ${multQuantity(a,'pagini')}. Câte pagini au ${multQuantity(b,'cărți')}, dacă fiecare are același număr de pagini?`;
 if(kind==='theatre')return `Un bilet la teatru costă ${multQuantity(a,'lei')}. Cât costă ${multQuantity(b,'bilete')} la fel?`;
 if(kind==='concert')return `Un bilet la concert costă ${multQuantity(a,'lei')}. Cât costă ${multQuantity(b,'bilete')} la fel?`;
 if(level==='tabla'&&a===3&&b===9)return 'Un bilet STB costă 3 lei. Câți lei costă în total câte o călătorie pentru 9 călători?';
 if(level==='tabla'&&a===5&&b===6)return 'Un bilet de metrou costă 5 lei. Câți lei trebuie să plătească 6 turiști pentru câte o călătorie?';
 if(level==='tabla')return [
  `O acadea costă ${a} lei. Cât costă ${b} acadele la fel?`,
  `Într-un pachet sunt ${a} creioane. Câte creioane sunt în ${b} pachete la fel?`,
  `La grădiniță, pentru gustare, s-au pus câte ${a} felii de măr pe fiecare farfurie. Câte felii sunt pe ${b} farfurii la fel?`,
  `Un bilet costă ${a} lei. Cât costă ${b} bilete la fel?`,
  `Într-un pachet sunt ${a} napolitane. Câte napolitane sunt în ${b} pachete la fel?`,
  `O ciocolată costă ${a} lei. Cât costă ${b} ciocolate la fel?`,
  `O felie de salam de biscuiți costă ${a} lei. Cât costă ${b} felii la fel?`,
  `Un croissant costă ${a} lei. Cât costă ${b} croissante la fel?`,
  `O pungă de pufuleți costă ${a} lei. Cât costă ${b} pungi la fel?`
 ][multRand(0,8)];
 return [
  level.startsWith('zu_')?`O imprimantă imprimă ${multQuantity(a,'pagini')} pe zi. Câte pagini imprimă în ${multQuantity(b,'zile')}, în același ritm?`:level.startsWith('szu_')?`Un centru de copiere (xerox) imprimă ${multQuantity(a,'pagini')} pe zi. Câte pagini imprimă în ${multQuantity(b,'zile')}, în același ritm?`:`O tipografie imprimă ${multQuantity(a,'pagini')} pe zi. Câte pagini imprimă în ${multQuantity(b,'zile')}, în același ritm?`,
  `Un muzeu primește ${multQuantity(a,'vizitatori')} pe zi. Câți vizitatori primește în ${multQuantity(b,'zile')}, dacă numărul este același în fiecare zi?`,
  level.startsWith('zu_')?`Într-o librărie se vând ${multQuantity(a,'caiete')} pe zi. Câte caiete se vând în ${multQuantity(b,'zile')}, în același ritm?`:level.startsWith('szu_')?`Un supermarket vinde ${multQuantity(a,'caiete')} pe zi. Câte caiete vinde în ${multQuantity(b,'zile')}, în același ritm?`:`O fabrică produce ${multQuantity(a,'caiete')} pe zi. Câte caiete produce în ${multQuantity(b,'zile')}, în același ritm?`
 ][multRand(0,2)];
}
function multStoryIcons(task){
 const q=task.question;let icon='';
 if(q.includes('STB'))icon='🚌';else if(q.includes('metrou'))icon='🚇';else if(q.includes('teatru'))icon='🎭';else if(q.includes('concert'))icon='🎵';else if(q.includes('acadea'))icon='🍭';else if(q.includes('ciocolată'))icon='🍫';else if(q.includes('salam de biscuiți')||q.includes('napolitane'))icon='🍪';else if(q.includes('croissant'))icon='🥐';else if(q.includes('pufuleți'))icon='🍿';else if(q.includes('felii de măr'))icon='🍎';else if(q.includes('creioane'))icon='✏️';else if(q.includes('carte')||q.includes('cărți'))icon='📚';else if(q.includes('imprimantă')||q.includes('copiere')||q.includes('tipografie'))icon='🖨️';else if(q.includes('pagini'))icon='📖';else if(q.includes('fișe'))icon='📄';else if(q.includes('muzeu'))icon='🏛️';else if(q.includes('caiete'))icon='📒';
 const money=multUnit(q)==='lei'?((task.a+task.b)%2?'💰':'💸'):'';
 return [icon,money].filter(Boolean).join(' ');
}
function multUnit(question){if(question.includes('Cât costă')||question.includes('Câți lei'))return 'lei';for(const name of ['creioane','felii','pagini','vizitatori','caiete','napolitane','fișe'])if(question.includes('Câte '+name)||question.includes('Câți '+name))return name;return '';}
const MULT_MIND_PAIRS={
 zu_u:[[15,6],[15,2],[15,4],[15,8],[15,9],[75,2],[75,4],[75,6],[75,8],[75,9]],
 szu_u:[[250,9],[125,8],[250,4],[150,6],[200,4],[300,3],[200,9],[300,9],[400,9],[500,9]],
 mszu_u:[[1250,4],[1000,2],[1500,2],[2000,4],[2500,4],[1000,5],[2000,3],[1500,4],[3000,2],[1250,8]],
 zu_zu:[[32,11],[12,11],[15,11],[20,11],[21,11],[22,11],[24,11],[36,11],[44,11],[48,25]],
 szu_zu:[[116,25],[100,11],[101,11],[110,11],[120,11],[125,11],[200,11],[104,11],[120,25],[124,25]]
};
function multMindStrategy(a,b){
 if(b===9)return `Înmulțește ${a} cu 10, apoi scade o dată ${a}.`;
 if(b===6)return `Calculează ${a} × 2, apoi triplează rezultatul.`;
 if(b===2)return `Dublează numărul ${a}.`;
 if(b===3)return `Dublează numărul ${a}, apoi mai adaugă o dată ${a}.`;
 if(b===4)return `Dublează numărul ${a}, apoi dublează încă o dată.`;
 if(b===5)return `Înmulțește ${a} cu 10, apoi înjumătățește rezultatul.`;
 if(b===8)return `Dublează numărul ${a} de trei ori.`;
 if(b===11)return `Înmulțește ${a} cu 10, apoi adaugă o dată ${a}.`;
 if(b===25)return `Împarte ${a} la 4, apoi înmulțește rezultatul cu 100.`;
 return 'Urmează pașii pe rând.';
}
function multMindTableHint(question){
 const tips=[];
 if(/tripleaz/i.test(question))tips.push('Triplează: adună numărul de trei ori sau dublează-l și mai adaugă-l o dată.');
 if(/dubleaz/i.test(question))tips.push('Dublează: adună numărul cu el însuși.');
 if(/înjumătăț/i.test(question))tips.push('Înjumătățește: împarte numărul în două părți egale.');
 if(/rotunjește/i.test(question))tips.push('La rotunjirea la zeci, privește cifra unităților: de la 5 în sus alegi zecea următoare.');
 if(/de zece ori|de 10 ori/i.test(question))tips.push('Pentru înmulțirea cu 10, adaugă un zero la dreapta numărului.');
 return tips.length?tips.join(' '):'Parcurge pașii în ordine și păstrează în minte rezultatul fiecărui pas.';
}
function multMindBank(level){
 if(level==='tabla')return MULT_MIND.map(([question,answer])=>({question,answer,hint:multMindTableHint(question)}));
 return (MULT_MIND_PAIRS[level]||[]).flatMap(([a,b])=>{
  const product=a*b,prefix=`Începe cu numărul ${a}. Înmulțește-l cu ${b}. `,hint=multMindStrategy(a,b);
  return [
   {question:prefix+'Ce rezultat ai obținut?',answer:product,hint},
   {question:prefix+'Adaugă numărul de laturi ale unui triunghi. Ce rezultat ai obținut?',answer:product+3,hint},
   {question:prefix+'Adaugă numărul de zile dintr-o săptămână. Ce rezultat ai obținut?',answer:product+7,hint},
   {question:prefix+'Adaugă numărul de laturi ale unui pătrat. Ce rezultat ai obținut?',answer:product+4,hint},
   {question:prefix+'Care este prima cifră a rezultatului?',answer:Number(String(product)[0]),hint},
   {question:prefix+'Care este ultima cifră a rezultatului?',answer:product%10,hint}
  ];
 });
}
function multAmount(game){return game==='spion'?6:12;}
function multBuild(level,game,previous=[]){
 if(game==='istetei'){const bank=multMindBank(level),used=new Set(previous),available=bank.map((_,i)=>i).filter(i=>!used.has('mind-'+i));if(available.length<12)return multBuild(level,game,[]);const picks=vocabShuffle(available);if(previous.length===0&&level!=='tabla'){const preferred=level==='szu_u'?2:0;const pos=picks.indexOf(preferred);if(pos>=0)picks.unshift(...picks.splice(pos,1));}const round=picks.slice(0,12).map(i=>({key:'mind-'+i,question:bank[i].question,answer:bank[i].answer,hint:bank[i].hint,shown:bank[i].answer,wrong:false}));for(const t of round)used.add(t.key);return {round,seen:[...used]};}
 const n=multAmount(game),used=new Set(previous),round=[];let tries=0;
 if(level==='tabla'&&game==='situatii')for(const [a,b] of [[3,9],[5,6]]){const key=a+'x'+b;if(!used.has(key)){used.add(key);round.push({a,b,answer:a*b,key,question:multSituation(a,b,level),shown:a*b,wrong:false});}}
 if(level==='tabla'&&game==='situatii'&&previous.length===0){const a=9,b=4,key='9x4';if(!used.has(key)){used.add(key);round.push({a,b,answer:a*b,key,question:multSituation(a,b,level,'wafer'),shown:a*b,wrong:false,fixedWafer:true});}}
 if(game==='situatii'&&['zu_u','zu_zu','szu_u','szu_zu'].includes(level)){
  const kind=level.startsWith('zu_')?'theatre':'concert';let attempts=0;
  while(round.length===0&&attempts++<1000){const [a,b]=multFactors(level,game),key=a+'x'+b;if(used.has(key))continue;used.add(key);round.push({a,b,answer:a*b,key,question:multSituation(a,b,level,kind),shown:a*b,wrong:false});}
  attempts=0;
  while(round.length===1&&attempts++<1000){const [a,b]=multFactors(level,game),key=a+'x'+b;if(used.has(key))continue;used.add(key);round.push({a,b,answer:a*b,key,question:multSituation(a,b,level,level.startsWith('zu_')?'pages':'books'),shown:a*b,wrong:false});}
 }
 while(round.length<n&&tries++<10000){const [a,b]=multFactors(level,game),key=a+'x'+b;if(used.has(key))continue;used.add(key);round.push({a,b,answer:a*b,key,question:game==='situatii'?multSituation(a,b,level):'',shown:a*b,wrong:false});}
 if(round.length!==n&&previous.length)return multBuild(level,game,[]);
 if(round.length!==n)throw Error('Nu am putut pregăti seria.');
 if(level==='tabla'&&game==='situatii'){const i=round.findIndex(t=>t.fixedWafer);if(i>=0)round.splice(10,0,round.splice(i,1)[0]);}
 if(game==='spion')for(const i of vocabShuffle(Array.from({length:n},(_,j)=>j)).slice(0,2)){const task=round[i],offset=task.answer<10?multRand(1,3):[1,10,100][multRand(0,2)];task.wrong=true;task.shown=task.answer+offset;}
 return {round,seen:[...used]};
}
function multKey(){return route.join('/');}
function multTarget(game){return game==='istetei'?1:game==='situatii'?2:5;}
function multCompleted(){const p=rewardRead(),key=multKey(),target=multTarget(route[3]),n=p.multiplicationRounds?.[key];if(p.stages[key])return target;if(Number.isInteger(n)&&n>=target){p.stages[key]=true;rewardSave(p);return target;}return Number.isInteger(n)?Math.max(0,Math.min(target,n)):0;}
function multMigrateProgress(){const p=rewardRead(),rounds=p.multiplicationRounds;if(!rounds||typeof rounds!=='object'||Array.isArray(rounds))return;let changed=false;for(const level of Object.keys(MULT_LEVELS))for(const game of Object.keys(MULT_GAMES)){const key=['math','multiply',level,game].join('/'),n=rounds[key];if(Number.isInteger(n)&&n>=multTarget(game)&&!p.stages[key]){p.stages[key]=true;changed=true;}}if(changed)rewardSave(p);}
function multSaveRound(){
 const p=rewardRead(),key=multKey();if(!p.multiplicationRounds||typeof p.multiplicationRounds!=='object'||Array.isArray(p.multiplicationRounds))p.multiplicationRounds={};
 const prior=Number.isInteger(p.multiplicationRounds[key])?Math.max(0,Math.min(5,p.multiplicationRounds[key])):0;
 p.multiplicationRounds[key]=Math.min(5,prior+1);if(p.multiplicationRounds[key]>=multTarget(route[3]))p.stages[key]=true;
 return rewardSave(p);
}
function multSetup(){if(!state.__multRound){const made=multBuild(route[2],route[3],state.__multSeen||[]);state.__multRound=made.round;state.__multSeen=made.seen;state.__multFinished=false;}return state.__multRound;}
function multSet(i,key,value){state['mult-'+i+'-'+key]=value;const task=document.getElementById('mult-task-'+i);if(task){task.classList.remove('good','bad');task.querySelector('.mult-feedback').textContent='';}const score=document.getElementById('mult-score');if(score)score.replaceChildren();}
function multRender(level,game){
 if(!MULT_LEVELS[level])return view(`<div class="hero"><h2>✖️ Înmulțirea</h2><p>Alege de unde vrei să începi!</p></div><div class="cards">${Object.entries(MULT_LEVELS).map(([id,[title,description]],i)=>card((i+1)+'. '+title,description,`go('math','multiply','${id}')`)).join('')}</div>`);
 if(!MULT_GAMES[game])return view(`<div class="hero"><h2>✖️ ${esc(MULT_LEVELS[level][0])}</h2><p>Alege un joc!</p></div><div class="cards">${Object.entries(MULT_GAMES).map(([id,[title,description]],i)=>card((i+1)+'. '+title,description,`go('math','multiply','${level}','${id}')`,id==='istetei'?'2026-11-15T00:00:00+02:00':undefined)).join('')}</div>`);
 const n=multAmount(game),target=multTarget(game),round=multSetup(),done=multCompleted(),shownRound=state.__multFinished?Math.max(1,done):Math.min(target,done+1);
 const instruction=game==='istetei'?'Calculează mintal, urmând pașii, și scrie răspunsul.':game==='spion'?'În fiecare serie sunt două calcule greșite. Alege „Corect” sau „Greșit”; pentru cele greșite, scrie rezultatul corect.':game==='situatii'?'Citește fiecare problemă și scrie răspunsul.':'Calculează și scrie rezultatul.';
 const rows=round.map((t,i)=>{let answer=esc(String(state['mult-'+i+'-answer']??''));let q=game==='istetei'?esc(t.question).replace(/([.!?])\s+/g,'$1<br>'):game==='situatii'?(esc(multStoryIcons(t))+' '+esc(t.question)).trim():`${t.a} × ${t.b} = ${game==='spion'?t.shown:'?'}`;let control=game==='spion'?`<div class="options"><label class="option"><input type="radio" name="mult-${i}" ${state['mult-'+i+'-choice']==='correct'?'checked':''} onchange="multSet(${i},'choice','correct')"> Corect</label><label class="option"><input type="radio" name="mult-${i}" ${state['mult-'+i+'-choice']==='wrong'?'checked':''} onchange="multSet(${i},'choice','wrong')"> Greșit</label></div><label>Rezultatul corect, dacă este greșit: <input class="entry" inputmode="numeric" type="text" autocomplete="off" aria-label="Rezultatul corect la exercițiul ${i+1}" value="${answer}" oninput="multSet(${i},'answer',this.value)"></label>`:`<label>Răspuns: <input class="entry" inputmode="numeric" type="text" autocomplete="off" aria-label="Răspunsul exercițiului ${i+1}" value="${answer}" oninput="multSet(${i},'answer',this.value)">${game==='situatii'?' '+esc(multUnit(t.question)):''}</label>`;return `<div class="task" id="mult-task-${i}"><p><b>${i+1}.</b> ${q}</p>${control}${game==='istetei'?`<details><summary>💡 Indiciu</summary><p class="hint">${esc(t.hint)}</p></details>`:''}<div class="mult-feedback" aria-live="polite"></div></div>`;}).join('');
 view(`<div class="hero"><div class="section-label">${esc(MULT_LEVELS[level][0])}</div><h2>${esc(MULT_GAMES[game][0])}</h2><p>${instruction}</p><p id="mult-progress">${done>=target?'🌟 Joc încheiat! Poți continua să exersezi.':`Seria ${shownRound} din ${target} · ${done} din ${target} ${target===1?'serie încheiată':'serii încheiate'}`}</p></div><div class="panel">${rows}<div class="row"><button class="btn" onclick="multVerify()">✓ Verifică</button><button class="btn alt" id="mult-next" onclick="multNext()" ${state.__multFinished?'':'disabled'}>Încă ${n} ${game==='calcule'?'calcule':'exerciții'} →</button></div><div id="mult-score" aria-live="polite"></div></div>`);
}
function multVerify(){
 const rows=multSetup(),game=route[3],ids=[];let attempted=0;
 rows.forEach((t,i)=>{const raw=String(state['mult-'+i+'-answer']??'').replace(/\s/g,''),value=/^\d+$/.test(raw)?Number(raw):NaN,choice=state['mult-'+i+'-choice'];const answered=game==='spion'?(choice==='correct'||choice==='wrong'&&Number.isFinite(value)):Number.isFinite(value);if(answered)attempted++;const ok=game==='spion'?(t.wrong?choice==='wrong'&&value===t.answer:choice==='correct'):value===t.answer;const el=document.getElementById('mult-task-'+i);el.classList.toggle('good',ok);el.classList.toggle('bad',!ok);el.querySelector('.mult-feedback').textContent=ok?'✓ Corect!':'Mai încearcă! 💡';if(ok)ids.push(String(i));});
 const earned=rewardGrant('math',ids);let saved=true;
 if(attempted===rows.length&&!state.__multFinished){saved=multSaveRound();if(saved)state.__multFinished=true;}
 const target=multTarget(game),done=multCompleted(),score=document.getElementById('mult-score');score.innerHTML=`<div class="result">${ids.length} din ${rows.length} răspunsuri corecte. ${!saved?'Nu am putut salva seria pe acest dispozitiv. Încearcă din nou.':ids.length===rows.length?'Bravo! 🌟':attempted===rows.length?'Ai lucrat toată seria! Poți corecta sau poți continua.':'Poți completa și verifica din nou.'}</div>`+rewardMessage(earned,'math');
 if(state.__multFinished){document.getElementById('mult-next').disabled=false;document.getElementById('mult-progress').textContent=done>=target?'🌟 Joc încheiat! Poți continua să exersezi.':`${done} din ${target} serii încheiate!`;if(done===target)score.innerHTML+='<p class="reward-stage">✓ Joc bifat în pașaport!</p>';const chapter=rewardCurrentChapter();if(chapter&&chapter.diploma&&rewardComplete(chapter))score.innerHTML+=rewardDiplomaOffer(chapter);}
}
function multNext(){if(!state.__multFinished)return;const seen=state.__multSeen||[];state={__multSeen:seen};multRender(route[2],route[3]);window.scrollTo(0,0);}
const multOldRender=render;render=function(){if(route[0]==='math'&&route[1]==='multiply')return multRender(route[2],route[3]);return multOldRender();};
const multOldRenderPassport=renderPassport;renderPassport=function(){multMigrateProgress();return multOldRenderPassport();};
multMigrateProgress();
const multResolved=routeFromPath();if(JSON.stringify(multResolved)!==JSON.stringify(route)){route=multResolved;state=loadProgress();}render();
