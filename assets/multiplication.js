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
const MULT_PRICE_CATALOG={
 zu:[[12,'Un kilogram de zahăr','kilograme de zahăr'],[15,'O ciocolată','ciocolate'],[18,'Un pachet de cafea','pachete de cafea'],[22,'O sticlă de ulei','sticle de ulei'],[25,'O cutie de creioane','cutii de creioane'],[28,'Un borcan de miere','borcane de miere'],[30,'Un bilet la cinema','bilete la cinema'],[35,'O carte','cărți'],[42,'Un puzzle','puzzle-uri'],[48,'Un kilogram de brânză','kilograme de brânză'],[60,'Un kilogram de nuci','kilograme de nuci'],[75,'O minge','mingi'],[90,'Un ghiozdan','ghiozdane']],
 szu:[[123,'Un kilogram de somon','kilograme de somon'],[287,'Un kilogram de cafea','kilograme de cafea'],[110,'Un kilogram de somon','kilograme de somon'],[125,'Un kilogram de unt','kilograme de unt'],[130,'Un kilogram de unt','kilograme de unt'],[150,'Un kilogram de miere','kilograme de miere'],[175,'Un kilogram de cafea','kilograme de cafea'],[180,'Un kilogram de brânză','kilograme de brânză'],[200,'Un kilogram de nuci','kilograme de nuci'],[240,'Un kilogram de cafea','kilograme de cafea'],[270,'Un kilogram de cafea','kilograme de cafea'],[300,'Un kilogram de somon','kilograme de somon']],
 mszu:[[1299,'O bicicletă','biciclete'],[1499,'O trotinetă','trotinete'],[1799,'Un aspirator','aspiratoare'],[2299,'O mașină de spălat','mașini de spălat'],[2499,'Un laptop','laptopuri'],[2999,'Un televizor','televizoare'],[3499,'Un laptop','laptopuri'],[3999,'Un frigider','frigidere'],[4999,'Un laptop','laptopuri'],[5499,'Un televizor','televizoare'],[6499,'Un calculator','calculatoare'],[7999,'Un calculator','calculatoare']]
};
function multPriceCatalog(level){return MULT_PRICE_CATALOG[level.startsWith('zu_')?'zu':level.startsWith('szu_')?'szu':'mszu'];}
function multPriceQuestion(a,b,level){
 if(level==='tabla')return [
  `O acadea costă ${a} lei. Cât costă ${b} acadele la fel?`,
  `O ciocolată costă ${a} lei. Cât costă ${b} ciocolate la fel?`,
  `O felie de salam de biscuiți costă ${a} lei. Cât costă ${b} felii la fel?`,
  `Un croissant costă ${a} lei. Cât costă ${b} croissante la fel?`,
  `O pungă de pufuleți costă ${a} lei. Cât costă ${b} pungi la fel?`
 ][multRand(0,4)];
 const item=multPriceCatalog(level).find(x=>x[0]===a);if(!item)throw Error('Prețul nu are produs asociat.');
 return `${item[1]} costă ${multQuantity(a,'lei')}. Cât costă ${multQuantity(b,item[2])}?`;
}
function multPriceGroup(question,level){
 const q=question.toLocaleLowerCase('ro-RO');
 if(q.includes('stb'))return 'stb';
 if(q.includes('metrou'))return 'metrou';
 if(q.includes('teatru'))return 'teatru';
 if(q.includes('concert'))return 'concert';
 if(level!=='tabla'){const item=multPriceCatalog(level).find(x=>q.startsWith(x[1].toLocaleLowerCase('ro-RO')+' costă'));if(item)return item[1].toLocaleLowerCase('ro-RO');}
 for(const word of ['acadea','ciocolată','salam de biscuiți','croissant','pufuleți','bilet'])if(q.includes(word))return word;
 return q;
}
function multSituation(a,b,level,kind){
 if(kind==='price')return multPriceQuestion(a,b,level);
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
 let crowd;
 if(level.startsWith('zu_'))crowd=`Un muzeu primește ${multQuantity(a,'vizitatori')} pe zi. Câți vizitatori primește în ${multQuantity(b,'zile')}, dacă numărul este același în fiecare zi?`;
 else if(level.startsWith('szu_'))crowd=[
  `Un magazin primește ${multQuantity(a,'clienți')} pe zi. Câți clienți primește în ${multQuantity(b,'zile')}, dacă numărul este același în fiecare zi?`,
  `Un cinema primește ${multQuantity(a,'spectatori')} pe zi. Câți spectatori primește în ${multQuantity(b,'zile')}, dacă numărul este același în fiecare zi?`
 ][multRand(0,1)];
 else crowd=[
  `Pe un stadion vin ${multQuantity(a,'fani')} la fiecare meci. Câți fani vin în total la ${multQuantity(b,'meciuri')}, dacă sunt la fel de mulți la fiecare meci?`,
  `La fiecare concert vin ${multQuantity(a,'fani')}. Câți fani vin în total la ${multQuantity(b,'concerte')}, dacă sunt la fel de mulți la fiecare concert?`
 ][multRand(0,1)];
 return [
  level.startsWith('zu_')?`O imprimantă imprimă ${multQuantity(a,'pagini')} pe zi. Câte pagini imprimă în ${multQuantity(b,'zile')}, în același ritm?`:level.startsWith('szu_')?`Un centru de copiere (xerox) imprimă ${multQuantity(a,'pagini')} pe zi. Câte pagini imprimă în ${multQuantity(b,'zile')}, în același ritm?`:`O tipografie imprimă ${multQuantity(a,'pagini')} pe zi. Câte pagini imprimă în ${multQuantity(b,'zile')}, în același ritm?`,
  crowd,
  level.startsWith('zu_')?`Într-o librărie se vând ${multQuantity(a,'caiete')} pe zi. Câte caiete se vând în ${multQuantity(b,'zile')}, în același ritm?`:level.startsWith('szu_')?`Un supermarket vinde ${multQuantity(a,'caiete')} pe zi. Câte caiete vinde în ${multQuantity(b,'zile')}, în același ritm?`:`O fabrică produce ${multQuantity(a,'caiete')} pe zi. Câte caiete produce în ${multQuantity(b,'zile')}, în același ritm?`
 ][multRand(0,2)];
}
function multStoryIcons(task){
 const q=task.question;let icon='';
 if(/pachet/i.test(q))icon='📦';else if(q.includes('STB'))icon='🚌';else if(q.includes('metrou'))icon='🚇';else if(q.includes('teatru'))icon='🎭';else if(q.includes('concert'))icon='🎵';else if(q.includes('stadion'))icon='⚽';else if(q.includes('cinema'))icon='🎬';else if(q.includes('magazin'))icon='🛒';else if(q.includes('acadea'))icon='🍭';else if(q.includes('ciocolată'))icon='🍫';else if(q.includes('cafea'))icon='☕';else if(q.includes('somon'))icon='🐟';else if(/(?:^|[^\p{L}])unt(?:$|[^\p{L}])/iu.test(q))icon='🧈';else if(q.includes('zahăr')||q.includes('brânză')||q.includes('nuci'))icon='🛒';else if(q.includes('salam de biscuiți')||q.includes('napolitane'))icon='🍪';else if(q.includes('croissant'))icon='🥐';else if(q.includes('pufuleți'))icon='🍿';else if(q.includes('felii de măr'))icon='🍎';else if(q.includes('creioane'))icon='✏️';else if(q.includes('carte')||q.includes('cărți'))icon='📚';else if(q.includes('imprimantă')||q.includes('copiere')||q.includes('tipografie'))icon='🖨️';else if(q.includes('pagini'))icon='📖';else if(q.includes('fișe'))icon='📄';else if(q.includes('muzeu'))icon='🏛️';else if(q.includes('caiete'))icon='📒';
 const money=multUnit(q)==='lei'?((task.a+task.b)%2?'💰':'💸'):'';
 return [icon,money].filter(Boolean).join(' ');
}
function multUnit(question){if(question.includes('Cât costă')||question.includes('Câți lei'))return 'lei';for(const name of ['creioane','felii','pagini','vizitatori','clienți','spectatori','fani','caiete','napolitane','fișe'])if(question.includes('Câte '+name)||question.includes('Câți '+name))return name;return '';}
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
function multContextFacts(question){
 const q=question.toLocaleLowerCase('ro-RO'),facts=[];
 if(q.includes('luni dintr-un an'))facts.push('Un an are 12 luni.');
 if(q.includes('caracatiț'))facts.push('O caracatiță are 8 brațe.');
 if(q.includes('săptămân'))facts.push('O săptămână are 7 zile.');
 if(q.includes('triunghi'))facts.push('Un triunghi are 3 laturi.');
 if(q.includes('pătrat'))facts.push('Un pătrat are 4 laturi și 4 colțuri.');
 if(q.includes('anotimp'))facts.push('Un an are 4 anotimpuri.');
 if(q.includes('luni de vară')||q.includes('lunilor de vară'))facts.push('Vara are 3 luni.');
 if(q.includes('weekend'))facts.push('Un weekend are 2 zile.');
 if(q.includes('bisect'))facts.push('Într-un an bisect, februarie are 29 de zile.');
 if(q.includes('ore dintr-o zi'))facts.push('O zi are 24 de ore.');
 if(q.includes('degete de la două mâini'))facts.push('Două mâini au împreună 10 degete.');
 if(q.includes('două biciclete'))facts.push('Două biciclete au împreună 4 roți.');
 else if(q.includes('unei biciclete'))facts.push('O bicicletă are 2 roți.');
 if(q.includes('automobil'))facts.push('Un automobil are 4 roți.');
 if(q.includes('colțuri ale unei cărți'))facts.push('O carte dreptunghiulară are 4 colțuri.');
 if(q.includes('ferestre dreptunghiulare'))facts.push('O fereastră dreptunghiulară are 4 colțuri.');
 if(q.includes('planete din sistemul solar'))facts.push('Sistemul Solar are 8 planete.');
 if(q.includes('echipe de fotbal'))facts.push('O echipă de fotbal are 11 jucători pe teren.');
 return facts.join(' ');
}
function multMindTableHint(question){
 const fact=multContextFacts(question);if(fact)return fact;
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
   {question:prefix+'Adaugă numărul de laturi ale unui triunghi. Ce rezultat ai obținut?',answer:product+3,hint:hint+' Un triunghi are 3 laturi.'},
   {question:prefix+'Adaugă numărul de zile dintr-o săptămână. Ce rezultat ai obținut?',answer:product+7,hint:hint+' O săptămână are 7 zile.'},
   {question:prefix+'Adaugă numărul de laturi ale unui pătrat. Ce rezultat ai obținut?',answer:product+4,hint:hint+' Un pătrat are 4 laturi.'},
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
 if(game==='situatii'){
  const priceCount=()=>round.filter(t=>multUnit(t.question)==='lei').length;
  if(previous.length===0&&level!=='tabla'){
   const preferred=level.startsWith('szu_')?[123,287]:level.startsWith('zu_')?[12]:[];
   const minimum=level.endsWith('_zu')?10:2,maximum=level.endsWith('_zu')?99:9;
   for(const a of preferred){const candidates=vocabShuffle(Array.from({length:maximum-minimum+1},(_,i)=>i+minimum)),b=candidates.find(n=>!used.has(a+'x'+n));if(b!==undefined){const key=a+'x'+b;used.add(key);round.push({a,b,answer:a*b,key,question:multSituation(a,b,level,'price'),shown:a*b,wrong:false});}}
  }
  let priceTries=0;
  while(priceCount()<6&&round.length<n&&priceTries++<10000){
   const factors=multFactors(level,game),b=factors[1],catalog=level==='tabla'?null:multPriceCatalog(level),a=catalog?catalog[multRand(0,catalog.length-1)][0]:factors[0],key=a+'x'+b;
   if(used.has(key))continue;const question=multSituation(a,b,level,'price'),group=multPriceGroup(question,level);if(round.some(t=>multUnit(t.question)==='lei'&&multPriceGroup(t.question,level)===group))continue;used.add(key);round.push({a,b,answer:a*b,key,question,shown:a*b,wrong:false});
  }
  if(priceCount()<6&&previous.length)return multBuild(level,game,[]);
 }
 while(round.length<n&&tries++<10000){
  const [a,b]=multFactors(level,game),key=a+'x'+b;if(used.has(key))continue;
  const question=game==='situatii'?multSituation(a,b,level):'';
  if(game==='situatii'&&/imprimantă imprimă|centru de copiere|tipografie imprimă/i.test(question)&&round.some(t=>/imprimantă imprimă|centru de copiere|tipografie imprimă/i.test(t.question)))continue;
  if(game==='situatii'&&multUnit(question)==='lei'&&round.some(t=>multUnit(t.question)==='lei'&&multPriceGroup(t.question,level)===multPriceGroup(question,level)))continue;
  used.add(key);round.push({a,b,answer:a*b,key,question,shown:a*b,wrong:false});
 }
 if(round.length!==n&&previous.length)return multBuild(level,game,[]);
 if(round.length!==n)throw Error('Nu am putut pregăti seria.');
 if(level==='tabla'&&game==='situatii'){const i=round.findIndex(t=>t.fixedWafer);if(i>=0)round.splice(10,0,round.splice(i,1)[0]);}
 if(game==='spion')for(const i of vocabShuffle(Array.from({length:n},(_,j)=>j)).slice(0,2)){const task=round[i],offset=task.answer<10?multRand(1,3):[1,10,100][multRand(0,2)];task.wrong=true;task.shown=task.answer+offset;}
 return {round,seen:[...used]};
}
function multKey(){return route.join('/');}
function multTarget(game){return game==='istetei'?1:game==='situatii'?2:5;}
function multCompleted(){const p=rewardRead(),key=multKey(),target=multTarget(route[3]),n=p.multiplicationRounds?.[key],count=Number.isSafeInteger(n)&&n>=0?n:0;if(!p.stages[key]&&count>=target){p.stages[key]=true;rewardSave(p);}return p.stages[key]?Math.max(target,count):count;}
function multMigrateProgress(){const p=rewardRead(),rounds=p.multiplicationRounds;if(!rounds||typeof rounds!=='object'||Array.isArray(rounds))return;let changed=false;for(const level of Object.keys(MULT_LEVELS))for(const game of Object.keys(MULT_GAMES)){const key=['math','multiply',level,game].join('/'),n=rounds[key];if(Number.isInteger(n)&&n>=multTarget(game)&&!p.stages[key]){p.stages[key]=true;changed=true;}}if(changed)rewardSave(p);}
function multSaveRound(){
 const p=rewardRead(),key=multKey();if(!p.multiplicationRounds||typeof p.multiplicationRounds!=='object'||Array.isArray(p.multiplicationRounds))p.multiplicationRounds={};
 const stored=p.multiplicationRounds[key],count=Number.isSafeInteger(stored)&&stored>=0?stored:0,prior=p.stages[key]?Math.max(multTarget(route[3]),count):count;
 p.multiplicationRounds[key]=Math.min(Number.MAX_SAFE_INTEGER,prior+1);if(p.multiplicationRounds[key]>=multTarget(route[3]))p.stages[key]=true;
 return rewardSave(p);
}
function multSetup(){if(!state.__multRound){const made=multBuild(route[2],route[3],state.__multSeen||[]);state.__multRound=made.round;state.__multSeen=made.seen;state.__multFinished=false;}return state.__multRound;}
function multSet(i,key,value){state['mult-'+i+'-'+key]=value;const task=document.getElementById('mult-task-'+i);if(task){task.classList.remove('good','bad');task.querySelector('.mult-feedback').textContent='';}const score=document.getElementById('mult-score');if(score)score.replaceChildren();}
function multRender(level,game){
 if(!MULT_LEVELS[level])return view(`<div class="hero"><h2>✖️ Înmulțirea</h2><p>Alege de unde vrei să începi!</p></div><div class="cards">${Object.entries(MULT_LEVELS).map(([id,[title,description]],i)=>card((i+1)+'. '+title,description,`go('math','multiply','${id}')`)).join('')}</div>`);
 if(!MULT_GAMES[game])return view(`<div class="hero"><h2>✖️ ${esc(MULT_LEVELS[level][0])}</h2><p>Alege un joc!</p></div><div class="cards">${Object.entries(MULT_GAMES).map(([id,[title,description]],i)=>card((i+1)+'. '+title,description,`go('math','multiply','${level}','${id}')`,id==='istetei'?'2026-11-15T00:00:00+02:00':undefined)).join('')}</div>`);
 const n=multAmount(game),target=multTarget(game),round=multSetup(),done=multCompleted();
 const instruction=game==='istetei'?'Calculează mintal, urmând pașii, și scrie răspunsul.':game==='spion'?'În fiecare serie sunt două calcule greșite. Alege „Corect” sau „Greșit”; pentru cele greșite, scrie rezultatul corect.':game==='situatii'?'Citește fiecare problemă și scrie răspunsul.':'Calculează și scrie rezultatul.';
 const rows=round.map((t,i)=>{let answer=esc(String(state['mult-'+i+'-answer']??''));let q=game==='istetei'?esc(t.question).replace(/([.!?])\s+/g,'$1<br>'):game==='situatii'?(esc(multStoryIcons(t))+' '+esc(t.question)).trim():`${t.a} × ${t.b} = ${game==='spion'?t.shown:'?'}`;let control=game==='spion'?`<div class="options"><label class="option"><input type="radio" name="mult-${i}" ${state['mult-'+i+'-choice']==='correct'?'checked':''} onchange="multSet(${i},'choice','correct')"> Corect</label><label class="option"><input type="radio" name="mult-${i}" ${state['mult-'+i+'-choice']==='wrong'?'checked':''} onchange="multSet(${i},'choice','wrong')"> Greșit</label></div><label>Rezultatul corect, dacă este greșit: <input class="entry" inputmode="numeric" type="text" autocomplete="off" aria-label="Rezultatul corect la exercițiul ${i+1}" value="${answer}" oninput="multSet(${i},'answer',this.value)"></label>`:`<label>Răspuns: <input class="entry" inputmode="numeric" type="text" autocomplete="off" aria-label="Răspunsul exercițiului ${i+1}" value="${answer}" oninput="multSet(${i},'answer',this.value)">${game==='situatii'?' '+esc(multUnit(t.question)):''}</label>`;return `<div class="task" id="mult-task-${i}"><p><b>${i+1}.</b> ${q}</p>${control}${game==='istetei'?`<details><summary>💡 Indiciu</summary><p class="hint">${esc(t.hint)}</p></details>`:''}<div class="mult-feedback" aria-live="polite"></div></div>`;}).join('');
 view(`<div class="hero"><div class="section-label">${esc(MULT_LEVELS[level][0])}</div><h2>${esc(MULT_GAMES[game][0])}</h2><p>${instruction}</p><p id="mult-progress">În pașaport îți trebuie ${target===1?'o serie':target+' serii'}!<br>Serii încheiate: ${done}</p></div><div class="panel">${rows}<div class="row"><button class="btn" onclick="multVerify()">✓ Verifică</button><button class="btn alt" id="mult-next" onclick="multNext()" ${state.__multFinished?'':'disabled'}>Încă ${n} ${game==='calcule'?'calcule':'exerciții'} →</button></div><div id="mult-score" aria-live="polite"></div></div>`);
}
function multVerify(){
 const rows=multSetup(),game=route[3],ids=[];let attempted=0;
 rows.forEach((t,i)=>{const raw=String(state['mult-'+i+'-answer']??'').replace(/\s/g,''),value=/^\d+$/.test(raw)?Number(raw):NaN,choice=state['mult-'+i+'-choice'];const answered=game==='spion'?(choice==='correct'||choice==='wrong'&&Number.isFinite(value)):Number.isFinite(value);if(answered)attempted++;const ok=game==='spion'?(t.wrong?choice==='wrong'&&value===t.answer:choice==='correct'):value===t.answer;const el=document.getElementById('mult-task-'+i);el.classList.toggle('good',ok);el.classList.toggle('bad',answered&&!ok);el.querySelector('.mult-feedback').textContent=!answered?'':ok?'✓ Corect!':'Mai încearcă! 💡';if(ok)ids.push(String(i));});
 const earned=rewardGrant('math',ids);let saved=true;
 if(attempted===rows.length&&!state.__multFinished){saved=multSaveRound();if(saved)state.__multFinished=true;}
 const target=multTarget(game),done=multCompleted(),score=document.getElementById('mult-score');score.innerHTML=`<div class="result">${attempted?'Răspunsuri completate: '+attempted+'. Corecte: '+ids.length+'.':'Completează un răspuns și verifică.'} ${!saved?'Nu am putut salva seria pe acest dispozitiv. Încearcă din nou.':ids.length===rows.length?'Bravo! 🌟':attempted===rows.length?'Ai lucrat toată seria! Poți corecta sau poți continua.':'Poți completa și verifica din nou.'}</div>`+rewardMessage(earned,'math');
 if(state.__multFinished){document.getElementById('mult-next').disabled=false;document.getElementById('mult-progress').innerHTML=`În pașaport îți trebuie ${target===1?'o serie':target+' serii'}!<br>Serii încheiate: ${done}`;if(done>=target)score.innerHTML+='<p class="reward-stage">✓ Joc bifat în pașaport!</p>';const chapter=rewardCurrentChapter();if(chapter&&chapter.diploma&&rewardComplete(chapter))score.innerHTML+=rewardDiplomaOffer(chapter);}
}
function multNext(){if(!state.__multFinished)return;const seen=state.__multSeen||[];state={__multSeen:seen};multRender(route[2],route[3]);window.scrollTo(0,0);}
const multOldRender=render;render=function(){if(route[0]==='math'&&route[1]==='multiply')return multRender(route[2],route[3]);return multOldRender();};
const multOldRenderPassport=renderPassport;renderPassport=function(){multMigrateProgress();return multOldRenderPassport();};
multMigrateProgress();
const multResolved=routeFromPath();if(JSON.stringify(multResolved)!==JSON.stringify(route)){route=multResolved;state=loadProgress();}render();

/* Înmulțirea cu o sumă sau o diferență. */
const DIST_TITLE='Înmulțirea cu o sumă sau o diferență';
const DIST_TYPES={completeaza:'Completează casetele',alege:'Alege desfășurarea',convenabil:'Calculează convenabil'};
rewardChapter('math-distributivitate','math',DIST_TITLE,Object.entries(DIST_TYPES).map(([id,title])=>[title,['math','multiply','suma',id]]));
const distOldMultRender=multRender;
multRender=function(level,game){
 if(level==='suma')return distRender(game);
 if(!level){const result=distOldMultRender(level,game);const grid=document.querySelector('#app .cards');if(grid){const el=document.createElement('div');el.innerHTML=card('2. '+DIST_TITLE,'Descoperă și exersează',"go('math','multiply','suma')",'2026-11-20T00:00:00+02:00');const btn=el.firstElementChild;grid.insertBefore(btn,grid.children[1]||null);[...grid.children].forEach((node,i)=>{if(node!==btn){const strong=node.querySelector('strong');if(strong)strong.firstChild.textContent=strong.firstChild.textContent.replace(/^\d+\./,(i+1)+'.');}});}return result;}
 return distOldMultRender(level,game);
};
const DIST_ITEMS=[[2,4,5,'+'],[4,7,3,'+'],[5,6,2,'+'],[9,8,3,'−'],[7,9,1,'−'],[6,10,5,'−'],[3,8,2,'+'],[8,6,4,'+'],[5,12,2,'−'],[4,15,5,'−']];
const DIST_CONV=[[4,7,3,'+'],[6,8,2,'+'],[5,6,4,'+'],[3,12,2,'−'],[8,13,3,'−'],[7,15,5,'−'],[2,16,4,'+'],[4,18,2,'+'],[6,24,4,'−'],[5,37,7,'−']];
function distInput(id,answer){return input(id,answer,'?').replace('<input ','<input style="width:5em;max-width:100%" inputmode="numeric" ');}
function distRender(game){
 const intro='<div class="rule"><b>Reține!</b><br>Poți calcula mai întâi în paranteză: 5 × (4 + 3) = 5 × 7 = 35.<br>Sau poți înmulți fiecare număr din paranteză: 5 × (4 + 3) = 5 × 4 + 5 × 3 = 35.<br>La scădere procedăm la fel: 5 × (4 − 3) = 5 × 4 − 5 × 3 = 5.</div>';
 if(!DIST_TYPES[game])return view(`<div class="hero"><h2>✖️ ${DIST_TITLE}</h2>${intro}</div><div class="cards">${Object.entries(DIST_TYPES).map(([id,title],i)=>card((i+1)+'. '+title,id==='completeaza'?'Două moduri de calcul':id==='alege'?'Alege varianta potrivită':'Grupează pentru a calcula ușor',`go('math','multiply','suma','${id}')`)).join('')}</div>`);
 let rows=(game==='convenabil'?DIST_CONV:DIST_ITEMS).map(([a,b,c,op],i)=>{const sum=op==='+'?b+c:b-c,result=a*sum,p=a*b,q=a*c;let body='';
  if(game==='completeaza')body=`<p>${a} × (${b} ${op} ${c}) = ${a} × ${distInput('d'+i+'a',sum)} = ${distInput('d'+i+'b',result)}</p><p>${a} × (${b} ${op} ${c}) = ${a} × ${b} ${op} ${a} × ${c} = ${distInput('d'+i+'c',p)} ${op} ${distInput('d'+i+'d',q)} = ${distInput('d'+i+'e',result)}</p>`;
  else if(game==='alege'){const correct=`${a} × ${b} ${op} ${a} × ${c}`;const wrong1=`${a} × ${b} ${op} ${c}`;const wrong2=`${a} × ${b} ${op==='+'?'−':'+'} ${a} × ${c}`;body=`<p>${a} × (${b} ${op} ${c}) = ${result}</p><select class="entry" data-id="d${i}" data-answer="${esc(correct)}" onchange="setval('d${i}',this.value)"><option value="">Alege</option>${vocabShuffle([wrong1,correct,wrong2]).map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('')}</select>`;}
  else body=`<p>${a} × ${b} ${op} ${a} × ${c} = ${a} × ${distInput('d'+i+'a',sum)} = ${distInput('d'+i+'b',result)}</p>`;
  return `<div class="task"><b>${i+1}.</b> ${body}</div>`;}).join('');
 view(`<div class="hero"><h2>${esc(DIST_TYPES[game])}</h2>${intro}</div><div class="panel">${rows}<div class="row"><button class="btn" onclick="distVerify()">✓ Verifică</button></div><div id="dist-score" aria-live="polite"></div></div>`);
}
function distVerify(){const fields=[...document.querySelectorAll('[data-answer]')],ids=[];let rows=0,attempted=0,correctFields=0;for(const el of fields){const filled=!!String(el.value).trim(),ok=filled&&norm(el.value)===norm(el.dataset.answer);if(filled)attempted++;if(ok)correctFields++;el.classList.toggle('good',ok);el.classList.toggle('bad',!!String(el.value).trim()&&!ok);}for(const [i,row] of [...document.querySelectorAll('.task')].entries()){if([...row.querySelectorAll('[data-answer]')].every(el=>norm(el.value)===norm(el.dataset.answer))){rows++;ids.push(String(i));}}const earned=rewardGrant('math',ids);if(rows===10)rewardMark(route.join('/'));document.getElementById('dist-score').innerHTML=`<p class="result">${attempted?'Răspunsuri completate: '+attempted+'. Corecte: '+correctFields+'.':'Completează un răspuns și verifică.'} ${rows===10?'Bravo! 🌟':''}</p>`+rewardMessage(earned,'math');}

render();

const distOldCrumbs=crumbs;crumbs=function(){return distOldCrumbs().replace('>suma</button>','>Înmulțirea cu o sumă sau o diferență</button>').replace('>completeaza</button>','>Completează casetele</button>').replace('>alege</button>','>Alege desfășurarea</button>').replace('>convenabil</button>','>Calculează convenabil</button>');};render();
