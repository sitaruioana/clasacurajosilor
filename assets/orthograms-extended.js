/* Exerciții pentru întruna / într-una și numai / nu mai. */
const ORTHO_PRACTICE={
 intruna:{
  additional:[
   ['Melcul Mișu vorbea ___ despre prietenii săi.','întruna'],
   ['Melcul s-a ascuns ___ dintre cutiile din pivniță.','într-una'],
   ['Vrăbiuța ciripește ___ pe creanga cireșului.','întruna'],
   ['Mingea a ajuns ___ dintre curțile vecinilor.','într-una'],
   ['Pisoiul toarce ___ în brațele bunicii.','întruna'],
   ['___ dintre fotografii apare bunicul.','într-una'],
   ['Soarele a strălucit ___ de dimineață până seara.','întruna'],
   ['Vaza cu lalele se află ___ dintre camere.','într-una'],
   ['Cățelul aleargă ___ după minge.','întruna'],
   ['Am găsit o jucărie ___ dintre lăzile din pod.','într-una'],
   ['Păsările cântă ___ în copacii din grădină.','întruna']
  ],
  stories:[
   ['Pisoiul Tom','Pisoiul Tom miauna [[întruna]] de dimineață. Mama lui i-a pregătit un culcuș [[într-una]] dintre cutiile din debara. Tom se învârtea [[întruna]] prin jurul ei. A descoperit un ghem [[într-una]] dintre lăzile vechi și l-a rostogolit [[întruna]] prin cameră.'],
   ['Excursia Mariei','Maria vorbea [[întruna]] despre excursie. [[într-una]] dintre zile, urma să viziteze un castel. Și-a pus hainele [[într-una]] dintre valize, iar jucăriile în cealaltă. Pe drum, fata privea [[întruna]] pe fereastră. [[într-una]] dintre poieni a zărit o căprioară.'],
   ['Melcul Mișu','Melcul Mișu povestea [[întruna]] despre călătoriile sale. [[într-una]] dintre dimineți, a pornit spre grădină. Veverița l-a ascultat, iar el a vorbit [[întruna]] despre frunzele găsite pe drum. Mișu a păstrat o ghindă [[într-una]] dintre cutiile sale și i-a zâmbit [[întruna]] prietenei lui.'],
   ['Joacă în parc','Cățelul alerga [[întruna]] după minge. La un moment dat, mingea a ajuns [[într-una]] dintre tufele de lângă bancă. Stăpâna lui a căutat-o [[întruna]], apoi a descoperit-o [[într-una]] dintre ascunzătorile cățelului.'],
   ['O zi ploioasă','[[într-una]] dintre dimineți, vântul bătea [[întruna]]. Mara a descoperit o fotografie [[într-una]] dintre cărțile bunicii. Ploaia lovea [[întruna]] geamul, iar fata a rămas în casă să citească.']
  ]
 },
 numai:{
  additional:[
   ['___ bunica știe unde este cheia secretă.','numai'],
   ['Ploaia s-a oprit: acum ___ plouă deloc.','nu mai'],
   ['Vreau ___ o felie de tort, nu două.','numai'],
   ['Pisica a adormit și ___ miaună.','nu mai'],
   ['În coș au rămas ___ trei mere.','numai'],
   ['Bicicleta este stricată, așa că Andrei ___ merge cu ea.','nu mai'],
   ['___ Ana a descoperit răspunsul la ghicitoare.','numai'],
   ['— ___ striga! Bebelușul doarme.','nu mai'],
   ['La petrecere au venit ___ cinci copii.','numai'],
   ['Am închis cartea și ___ citesc astăzi.','nu mai'],
   ['Am pus în ghiozdan ___ caietul de matematică.','numai']
  ],
  stories:[
   ['Excursia Mariei','Maria avea [[numai]] două zile până la excursie. Era atât de nerăbdătoare, încât [[nu mai]] avea răbdare să aștepte. În bagaj a pus [[numai]] hainele de care avea nevoie. Când a terminat, [[nu mai]] rămăsese nimic de pregătit. Apoi a citit [[numai]] câteva pagini înainte de culcare.'],
   ['Pisoiul Tom','Pisoiul Tom miauna de dimineață. Mama i-a spus: „[[nu mai]] miorlăi, Tom!” El a tăcut [[numai]] un minut, apoi a început să toarcă. Când a văzut că afară [[nu mai]] plouă, a ieșit în curte. A zărit [[numai]] un fluture lângă gard și s-a jucat [[numai]] în apropierea casei.'],
   ['La bibliotecă','Mara putea împrumuta [[numai]] o carte. Colega ei găsise deja una și [[nu mai]] căuta alta. Bibliotecara le-a amintit că [[numai]] cărțile cu bulină verde pot fi luate acasă. Fetele au ales repede și [[nu mai]] stăteau pe gânduri. Au plecat [[numai]] după ce au mulțumit.'],
   ['La picnic','În coș mai erau [[numai]] trei mere. Dan ar fi vrut încă unul, dar [[nu mai]] rămăsese niciun măr în rucsac. Bunica a împărțit fructele, iar fiecare copil a primit [[numai]] câte unul. La sfârșit, în coș [[nu mai]] era niciun fruct.'],
   ['O după-amiază liniștită','Andrei voia să meargă în parc, dar bicicleta lui se stricase și [[nu mai]] putea merge cu ea. A rămas în curte cu [[numai]] două jucării. După ce le-a strâns, [[nu mai]] era nimic pe alee. Seara, bunicul i-a promis că vor repara bicicleta, dar [[numai]] după ce găsesc uneltele.']
  ]
 }
};
for(const [type,data] of Object.entries(ORTHO_PRACTICE)){
 const old=EXTRA_ORTHO[type].choose;
 const revised=type==='numai'?old.map(([sentence,answer])=>{
  if(sentence==='După ploaie, copiii ___ stau în casă.')return ['După ploaie, copiii au ieșit afară și ___ stau în casă.',answer];
  if(sentence==='Eu aleg ___ creioanele verzi.')return ['Dintre toate creioanele, le aleg ___ pe cele verzi.',answer];
  if(sentence==='Bunicul ___ locuiește în sat.')return ['Bunicul s-a mutat la oraș și ___ locuiește în sat.',answer];
  if(sentence==='Acum ___ alerg prin curte.')return ['Am obosit și acum ___ alerg prin curte.',answer];
  return [sentence,answer];
 }):old;
 EXTRA_ORTHO[type].choose=[...data.additional,...revised];
 DATA.ortho[type]=vocabShuffle(EXTRA_ORTHO[type].choose);
}
const orthoExpandedView=view;
view=function(html){
 if(route[0]==='llr'&&route[1]==='ortho'&&['intruna','numai'].includes(route[2])&&!route[3]){
  html=html.replace('12 enunțuri de completat','23 de enunțuri de completat').replace('2. Completează textul','2. Completează textele').replace('O poveste scurtă, cu formele potrivite','5 texte cu 23 de spații de completat');
 }
 return orthoExpandedView(html);
};
const orthoExpandedRenderer=renderOrtho;
renderOrtho=function(type,exercise){
 const data=ORTHO_PRACTICE[type];
 if(!data||exercise!=='text')return orthoExpandedRenderer(type,exercise);
 const boxes=data.stories.map(([title,source],story)=>{
  const parts=source.split(/\[\[(.*?)\]\]/g);let j=0;
  const content=parts.map((part,i)=>{
   if(i%2===0)return esc(part);
   const answer=part,id='text'+story+'_'+j++,prefix=parts[i-1];
   return `<select class="entry short" aria-label="Textul ${story+1}, spațiul ${j}" data-id="${id}" data-answer="${esc(answer)}" onchange="setval('${id}',this.value)"><option value="">Alege</option>${opts[type].map(o=>`<option value="${esc(o)}" ${val(id)===o?'selected':''}>${esc(orthoDisplayOption(o,prefix))}</option>`).join('')}</select>`;
  }).join('');
  return `<section class="panel"><h3>${story+1}. ${esc(title)}</h3><p style="line-height:2.8">${content}</p></section>`;
 }).join('');
 return view(`<div class="hero"><div class="section-label">${esc(EXTRA_ORTHO[type].title)}</div><h2>Completează textele</h2><p>Alege forma potrivită pentru fiecare spațiu.</p><button class="btn alt" onclick="hint('general')">💡 Ajutor</button><div id="hintgeneral"></div></div>${boxes}<div class="panel">${actions()}</div>`);
};

/* Detectivul greșelilor: vocabular în contexte noi. */
DATA.errors.intruna=[["Călătorii au mers întruna peste dune.", true], ["Savantul a lucrat într-una la descoperirea sa.", false], ["Într-una dintre poieni am zărit un pui de căprioară.", true], ["Bunica murmura într-una un cântec de leagăn.", false], ["Copilul a găsit un șoșon întruna dintre cutii.", false], ["Ștrengărița a râs întruna la spectacol.", true], ["Întruna dintre zile, am văzut o ploaie măruntă.", false], ["O bură cădea întruna peste grădină.", true], ["Motanul bondoc a dormit într-una dintre camere.", true], ["Fetița mărinimoasă a ajutat într-una din zile.", true], ["Băiatul s-a fâstâcit și a roșit într-una.", false], ["Am descoperit un desen întruna dintre cărți.", false], ["Din cerdac, bunicul privea întruna spre drum.", true], ["Puii mișunau într-una prin curte.", false], ["Într-una dintre zile, am învățat despre climă.", true], ["Apa cristalină curgea întruna peste pietre.", true], ["Pisica durdulie dormea întruna dintre cutiile mari.", false], ["Din ogeac ieșea întruna un fir de fum.", true], ["Vântul a împrăștiat frunzele într-una dintre curți.", true], ["Fata căuta într-una cheia pierdută.", false], ["Un savant a cercetat o insectă întruna dintre grădini.", false], ["După furtună, steagul răvășit flutura întruna.", true], ["Întruna dintre camere se auzea un murmur.", false]];
DATA.errors.numai=[["Numai savantul cunoștea răspunsul la întrebare.", true], ["Ploaia s-a oprit și numai cade bură.", false], ["În coș a rămas nu mai o felie de pâine.", false], ["Motanul bondoc nu mai încape în cutia mică.", true], ["Pe dună creșteau numai câteva fire de iarbă.", true], ["După ce s-a liniștit, băiatul numai era fâstâcit.", false], ["În cerdac stătea nu mai bunica.", false], ["Apa nu mai era cristalină după furtună.", true], ["Dintre toți copiii, numai Mara purta șoșoni.", true], ["Vântul s-a oprit și frunzele nu mai sunt răvășite.", true], ["În acvariul gol numai trăiește niciun pește.", false], ["Am ascultat nu mai o parte din poveste.", false], ["Pisoii au adormit și nu mai mișună prin curte.", true], ["Numai fetița mărinimoasă a împărțit prăjitura.", true], ["După tratament, articulația nu mai era umflată.", true], ["Pe cer se vedea nu mai o stea.", false], ["După ce a aflat adevărul, copilul numai scornește povești.", false], ["Nu mai găsesc desenul cu habitatul ursului.", true], ["Bunicul murmura nu mai câteva versuri.", false], ["După încălzire, copilul nu mai simțea frigul.", true], ["Doar Ana a ghicit: numai ea știa răspunsul.", true], ["Fetița nu mai este de o șchioapă, a crescut mult.", true], ["Din ogeac numai iese fum, focul s-a stins.", false]];
