/* Science lessons extend the existing experiment pages without changing their records. */
const scienceOriginalRenderer=renderScience;
SCIENCE[0].title='Aerul cald, aerul rece';
const scienceOriginalCrumbs=crumbs;
crumbs=function(){return scienceOriginalCrumbs().replace(/>lessons<\/button>/g,'>Lecții</button>').replace(/>earth<\/button>/g,'>Științele Pământului</button>').replace(/>life<\/button>/g,'>Științele vieții</button>').replace(/>experiments<\/button>/g,'>Experimente</button>').replace(/>sources<\/button>/g,'>Surse de apă</button>').replace(/>states<\/button>/g,'>Stările de agregare</button>').replace(/>cycle<\/button>/g,'>Circuitul apei</button>').replace(/>weather<\/button>/g,'>Fenomene ale naturii</button>').replace(/>pollution<\/button>/g,'>Poluare</button>').replace(/>protectie<\/button>/g,'>Protejarea mediului</button>').replace(/>invata<\/button>/g,'>Învățăm</button>').replace(/>text<\/button>/g,'>Text lacunar</button>').replace(/>crossword<\/button>/g,'>Rebus</button>').replace(/>tf<\/button>/g,'>Adevărat sau fals</button>').replace(/>gaps<\/button>/g,'>Completează</button>').replace(/>match<\/button>/g,'>Asociază</button>').replace(/>choice<\/button>/g,'>Alege</button>');};
FRIENDLY_ROUTES['stiinte/lectii']=['science','lessons'];
FRIENDLY_ROUTES['stiinte/experimente']=['science','experiments'];
const scienceSlugs={sources:'surse-de-apa',states:'starile-de-agregare',cycle:'circuitul-apei-in-natura',weather:'fenomene-ale-naturii',pollution:'poluarea-si-protejarea-mediului',protectie:'influenta-pozitiva-asupra-mediului',nevoi:'stiintele-vietii/nevoi-de-baza',plante:'stiintele-vietii/aparare-adaptare-plante',animale:'stiintele-vietii/aparare-adaptare-animale',insecte:'stiintele-vietii/insecte-pesti-amfibieni',reptile:'stiintele-vietii/reptile-pasari',mamifere:'stiintele-vietii/mamifere',crestere:'stiintele-vietii/cresterea-plantelor'};
const SCIENCE_LEARN={
 sources:[
 ['💧','Apa înseamnă viață','Apa este vitală pentru plante, animale și oameni.'],
 ['🌊','Ape stătătoare','Bălțile, lacurile, mările și oceanele sunt ape stătătoare.'],
 ['🏞️','Ape curgătoare','Izvoarele, pâraiele, râurile și fluviile sunt ape curgătoare. Apele curgătoare se deplasează de la izvor spre alte ape.'],
 ['🪣','Apa subterană','Se află sub pământ. Oamenii o pot aduce la suprafață prin fântâni și puțuri sau pot capta izvoarele.'],
 ['🌧️❄️','Precipitațiile','Ploaia și ninsoarea aduc apă în natură și sunt o sursă importantă de apă pentru plante și animale.'],
 ['🧊','Apă dulce și apă sărată','Cea mai mare parte a apei de pe Pământ este sărată. Ghețarii păstrează apă dulce înghețată.'],
 ['⚡','Cum folosim apa?','Oamenii folosesc apa pentru băut, pentru culturi și la producerea electricității în hidrocentrale. Pe mări și oceane sunt transportați oameni și mărfuri; peștii pot fi hrană.'],
 ['🌱','Fiecare picătură contează','Protejăm apa și o folosim cu grijă!']
 ],
 states:[
 ['🧊','Cele trei stări','Gheața este solidă, apa din pahar este lichidă, iar vaporii sunt apă în stare gazoasă.'],
 ['🌡️','Apa se transformă','Încălzirea și răcirea pot schimba starea apei.'],
 ['💧','Topire','Gheața se încălzește și devine apă lichidă: solid → lichid.'],
 ['❄️','Solidificare','Apa lichidă îngheață și devine gheață: lichid → solid.'],
 ['☀️','Vaporizare','Apa lichidă se transformă în vapori. Evaporarea are loc la suprafață, chiar și fără fierbere.'],
 ['🫧','Fierbere','Apa se transformă în vapori în toată masa ei; apar bule.'],
 ['☁️','Condensare','Vaporii se răcesc și formează picături de apă: gaz → lichid.']
 ],
 cycle:[
 ['🧊💧💨','Apa în trei stări','Gheața este solidă, apa pe care o bem este lichidă, iar vaporii sunt în stare gazoasă.'],
 ['☀️','Soarele pune apa în mișcare','Căldura Soarelui ajută apa din lacuri, râuri și mări să se evapore.'],
 ['💨','Evaporare și fierbere','Apa lichidă devine vapori. Evaporarea are loc la suprafață, fără să fie nevoie de fierbere; la fierbere apar bule în toată apa.'],
 ['☁️','Condensare și nori','Vaporii răciți pot forma picături mici. Norii conțin picături foarte mici de apă sau cristale de gheață.'],
 ['🌧️❄️','Precipitații','Apa revine din nori sub formă de ploaie, ninsoare sau grindină.'],
 ['🌱🏞️','Drumul continuă','O parte din apă pătrunde în sol; alta curge în pâraie, râuri, lacuri, mări și oceane. Apoi circuitul se repetă.'],
 ['🔄','Alte transformări','Topire: gheață → apă. Solidificare: apă → gheață. Condensare: vapori → picături. Temperatura influențează aceste schimbări.']
 ],
 weather:[
 ['🌧️','Ploaia','Picăturile cad din nori, aduc apă în sol și pot curăța aerul de praf. Ploile puternice pot produce și pagube.'],
 ['❄️','Ninsoarea','Fulgii sunt formați din cristale de gheață. Un strat de zăpadă poate proteja plantele semănate de frig.'],
 ['💨','Vântul','Este aer în mișcare și poate bate ziua sau noaptea. Aerul cald se ridică, iar aerul mai rece îi poate lua locul.'],
 ['⚡','Fulgerul','Este o descărcare electrică luminoasă care încălzește brusc aerul; aerul își mărește volumul.'],
 ['🔊','Tunetul','Este sunetul care însoțește fulgerul: fulgerul se vede, tunetul se aude.'],
 ['☁️','Picături din vapori','Răcirea vaporilor favorizează formarea picăturilor de apă în atmosferă.']
 ],
 pollution:[
 ['🌍','Ce este poluarea?','Substanțele dăunătoare pot afecta aerul, apa și solul, dar și plantele, animalele și oamenii.'],
 ['🚗','Aerul','Fumul incendiilor și gazele de eșapament pot polua aerul. Filtrele de la fabrici pot reține o parte dintre poluanți.'],
 ['💧','Apa','Deșeurile și petrolul deversate în ape pot dăuna viețuitoarelor. Apele uzate pot fi curățate înainte de deversare.'],
 ['🌱','Solul','Gunoaiele aruncate la întâmplare și substanțele chimice toxice pot polua pământul.'],
 ['🌧️','Ploaia acidă','Poluanții din aer pot ajunge în ploaie și pot afecta apa și solul.'],
 ['♻️','Ce putem face?','Punem deșeurile în locuri amenajate, le sortăm pentru reciclare și îngrijim copacii și spațiile verzi.']
 ]
};
SCIENCE_LEARN.protectie=[
 ['♻️','Reducem','Folosim doar cât avem nevoie și evităm risipa. Putem alege o sticlă care se umple din nou.'],
 ['🧺','Reutilizăm','Alegem obiecte care pot fi refolosite: o pungă de pânză, un borcan curat sau o cutie pentru creioane. Putem dona sau dărui lucrurile încă bune.'],
 ['🗂️','Reciclăm','Sortăm gunoiul conform regulilor de colectare. Din materialele colectate se pot face produse noi. Ducem uleiul, bateriile sau becurile uzate la puncte de colectare. Cerem ajutorul unui adult când avem de aruncat deșeuri speciale.'],
 ['💧','Economisim apa și energia','Închidem robinetul când nu folosim apa și stingem lumina când nu avem nevoie de ea.'],
 ['🌳','Îngrijim natura','Plantăm și îngrijim copaci, păstrăm curate spațiile verzi și protejăm habitatul plantelor și animalelor.'],
 ['🚶','Avem grijă de aer','Mergem pe jos sau cu bicicleta când este posibil și nu ardem deșeuri.']
];
for(const [id,l] of Object.entries(LIFE_LESSONS))SCIENCE_LEARN[id]=l.learn;
const lifeOriginalCrumbs=crumbs;crumbs=function(){let result=lifeOriginalCrumbs();for(const [id,l] of Object.entries(LIFE_LESSONS))result=result.replace('>'+id+'</button>','>'+esc(l.title)+'</button>');return result;};
FRIENDLY_ROUTES['stiinte/lectii/stiintele-pamantului']=['science','lessons','earth'];
FRIENDLY_ROUTES['stiinte/lectii/stiintele-vietii']=['science','lessons','life'];
const scienceActivities={text:['📝 Text lacunar','Completează textul lecției'],crossword:['🧩 Rebus','Descoperă cuvântul de pe verticală'],gaps:['📝 Completează','16 propoziții de completat'],match:['🔗 Asociază','12 situații și explicațiile lor'],choice:['🎯 Alege răspunsul','12 întrebări cu variante'],tf:['✅ Adevărat sau fals','Alege A sau F']};
for(const [id,slug] of Object.entries(scienceSlugs)){
 FRIENDLY_ROUTES['stiinte/lectii/'+slug]=['science','lessons',id];
 for(const part of ['invata',...SCIENCE_LESSONS[id].sections])FRIENDLY_ROUTES['stiinte/lectii/'+slug+'/'+part]=['science','lessons',id,part];
}
const scienceBaseLoad=loadProgress;
loadProgress=function(){return route[0]==='science'&&route[1]==='lessons'?{}:scienceBaseLoad();};
const lessonStyle=document.createElement('style');
lessonStyle.textContent=`.science-af{position:relative;display:flex;isolation:isolate;width:280px;max-width:100%;padding:4px;margin:10px 0;background:#edf1f6;border:1px solid #bdccd9;border-radius:24px}.science-af button{position:relative;z-index:1;flex:1;border:0;background:transparent;border-radius:20px;padding:10px 8px;min-height:44px;color:#344b65}.science-af-thumb{position:absolute;z-index:0;top:4px;bottom:4px;left:4px;width:calc(50% - 4px);border-radius:20px;transition:transform .18s;background:#d4eee2;opacity:0}.science-af[data-selection="0"] .science-af-thumb{opacity:1}.science-af[data-selection="1"] .science-af-thumb{opacity:1;transform:translateX(100%);background:#ffe0dc}.science-af button[aria-checked=true]{font-weight:800}.science-af button:focus-visible{outline:3px solid #ffb540;outline-offset:1px}@media(prefers-reduced-motion:reduce){.science-af-thumb{transition:none}}.science-tabs{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 18px}.science-tabs button{border:1px solid #aac9d0;background:#f4fbfc;color:#274e62;padding:8px 13px;border-radius:10px;font-weight:650}.science-tabs [aria-current=page]{background:#d7f1ed;border-color:#5f9f98}.science-cycle{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:9px;margin-top:18px}.science-cycle div{background:#eef7ff;border:1px solid #b8d8ed;border-radius:13px;padding:12px}.science-cycle strong{display:block}.science-exercise{border:0;border-bottom:1px solid #dfe8ef;margin:0;padding:16px 0;min-width:0}.science-exercise legend{padding:0;font-weight:650}.science-exercise .entry{width:210px;max-width:100%;margin:4px}.science-choice{display:block;padding:8px 10px;margin:6px 0;border:1px solid #cfdeea;border-radius:9px}.science-choice input{margin-right:8px}.science-feedback{font-size:.94rem;margin:7px 0 0;color:#355d65}.science-bank{background:#fff5ce;border-radius:10px;padding:12px;margin:10px 0}.science-bank span{display:inline-block;margin:3px 6px;padding:3px 8px;background:#fff;border-radius:8px}.science-rebus{overflow-x:auto;padding:10px 0;margin:10px 0 22px}.science-rebus-grid{display:grid;grid-template-columns:repeat(var(--science-rebus-width,15),30px);width:max-content;gap:3px}.science-rebus-grid span{height:30px;display:flex;align-items:center;justify-content:center;font-weight:750}.science-rebus-grid .letter{border:1px solid #89a9ce;border-radius:4px;background:#f1f7ff}.science-rebus-grid .central{background:#fff0a6;border:2px solid #b88c2c}.science-exercise.good,.science-exercise.bad{padding-left:10px;border-radius:9px}.science-actions{margin-top:18px}button:focus-visible{outline:3px solid #ffb540;outline-offset:2px}`;
lessonStyle.textContent+=`.science-learn-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));gap:16px;margin:18px 0}.science-learn-card{background:#fff;border:2px solid #c9deef;border-radius:20px;padding:19px;box-shadow:0 5px 14px #31597c0a}.science-learn-card:nth-child(4n+1){background:#fff8e4;border-color:#f1d796}.science-learn-card:nth-child(4n+2){background:#eef8ff;border-color:#addbf0}.science-learn-card:nth-child(4n+3){background:#f4f0ff;border-color:#d6c8f0}.science-learn-card:nth-child(4n){background:#eefaf2;border-color:#bde1c8}.science-learn-icon{font-size:2rem}.science-learn-card h3{margin:8px 0;color:#243a58}.science-learn-card p{margin:0;line-height:1.55}.science-learn-actions{margin:16px 0 32px}`;lessonStyle.textContent+=`.water-poster{margin:24px auto;max-width:900px}.water-poster-image{position:relative;line-height:0}.water-poster img{width:100%;height:auto;border-radius:18px}.water-poster-correction{position:absolute;left:5.2%;top:90.7%;width:10%;height:3.9%;border-radius:999px;background:#b8e8f4}`;document.head.appendChild(lessonStyle);
function scienceLessonNav(id,part){return `<nav class="science-tabs" aria-label="Activități de științe"><button onclick="go('science','lessons')">📘 Lecții</button><button onclick="go('science','experiments')">🔬 Experimente</button>${id?['invata',...SCIENCE_LESSONS[id].sections].map(p=>`<button ${p===part?'aria-current="page"':''} onclick="go('science','lessons','${id}','${p}')">${p==='invata'?'📖 Învățăm':scienceActivities[p][0]}</button>`).join(''):''}</nav>`;}
function scienceLessonSet(id,value){state['science-'+id]=value;document.getElementById('science-result')?.replaceChildren();}
function scienceLessonOrder(key,n){state.__scienceOrders=state.__scienceOrders||{};return state.__scienceOrders[key]||(state.__scienceOrders[key]=vocabShuffle(Array.from({length:n},(_,i)=>i)));}
function scienceLessonVal(id){return state['science-'+id]||'';}
function scienceLessonInput(id,answer){return `<input class="entry" id="science-${id}" aria-label="Cuvântul lipsă" autocomplete="off" value="${esc(scienceLessonVal(id))}" oninput="scienceLessonSet('${id}',this.value)" data-answer-options="${esc(answer)}">`;}
function scienceTask(body,answer,id,explanation='',correctText=''){return `<div class="science-exercise" data-science-answer="${esc(answer)}" data-science-id="${id}" data-explanation="${esc(explanation)}" data-correct-text="${esc(correctText)}">${body}<div class="science-feedback" aria-live="polite"></div></div>`;}
function scienceWordBank(words){return `<button class="btn alt" onclick="document.getElementById('science-bank').hidden=!document.getElementById('science-bank').hidden">💡 Lista de cuvinte</button><div class="science-bank" id="science-bank" hidden>${vocabShuffle([...new Set(words)]).map(w=>`<span>${esc(w)}</span>`).join('')}</div>`;}
function scienceAnswers(row){const n=row[0].split('___').length-1;return n>1?row[1].split('|'):[row[1]];}
function scienceRenderGaps(rows,asText){
 const order=asText?rows.map((_,i)=>i):scienceLessonOrder('gaps',rows.length);
 return order.map((r,n)=>{const row=rows[r],answers=scienceAnswers(row),parts=row[0].split('___');
  const text=parts.map((p,j)=>esc(p)+(j<answers.length?`<span class="science-exercise" style="display:inline-block;border:0;padding:0" data-science-answer="${esc(answers[j])}" data-feedback-id="science-feedback-${r}-${j}" data-correct-text="${esc(answers[j].split('|')[0])}">${scienceLessonInput('gap-'+r+'-'+j,answers[j])}</span>`:'')).join('');
  return `<div class="task"><p style="line-height:2.3">${asText?'':'<b>'+(n+1)+'.</b> '}${text}</p>${answers.map((_,j)=>`<div class="science-feedback" id="science-feedback-${r}-${j}" aria-live="polite"></div>`).join('')}</div>`;
 }).join('');
}
function scienceMatchSpec(answer){
 if(route[2]==='sources')return {prompt:'Din ce categorie face parte?',options:['ape stătătoare','ape curgătoare','apă subterană','precipitații']};
 if(answer.startsWith('stare '))return {prompt:'În ce stare se află apa?',options:['stare solidă','stare lichidă','stare gazoasă']};
 if(['evaporare','fierbere'].includes(answer))return {prompt:'Ce mod de vaporizare recunoști?',options:['evaporare','fierbere']};
 if(['topire','solidificare','vaporizare','condensare'].includes(answer))return {prompt:'La ce transformare te duce cu gândul?',options:['topire','solidificare','vaporizare','condensare']};
 if(answer==='Soarele')return {prompt:'Ce încălzește apa?',options:['Soarele','zăpada','ploaia']};
 return {prompt:'Ce etapă a circuitului apei recunoști?',options:['precipitații','pătrunderea apei în sol','scurgerea apei']};
}
function scienceMatchPick(id,value,button){scienceLessonSet(id,value);const field=button.closest('[data-science-answer]');field.querySelector('input[type=hidden]').value=value;field.querySelectorAll('button').forEach(b=>{b.classList.toggle('chosen',b===button);b.setAttribute('aria-pressed',String(b===button));});}
function scienceAFP(id,value,button){scienceLessonSet(id,value);const parent=button.closest('.science-af');parent.dataset.selection=value;parent.querySelector('input').value=value;parent.querySelectorAll('button').forEach(b=>b.setAttribute('aria-checked',String(b.dataset.value===value)));}
function scienceAF(id){const value=scienceLessonVal(id);return `<div class="science-af" role="radiogroup" aria-label="Adevărat sau fals" data-selection="${esc(value)}"><span class="science-af-thumb" aria-hidden="true"></span>${[['0','A','Adevărat'],['1','F','Fals']].map(([v,short,label])=>`<button type="button" role="radio" data-value="${v}" aria-checked="${value===v}" onclick="scienceAFP('${id}','${v}',this)" onkeydown="if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();const other=this.parentElement.querySelectorAll('button')[${v==='0'?1:0}];other.click();other.focus()}"><b>${short}</b> ${label}</button>`).join('')}<input type="hidden" value="${esc(value)}"></div>`;}
function scienceChoice(id,options){return vocabShuffle(options.map((text,i)=>({text,i}))).map(({text,i})=>`<label class="science-choice"><input type="radio" name="sci-${id}" value="${i}" ${scienceLessonVal(id)===String(i)?'checked':''} onchange="scienceLessonSet('${id}',this.value)">${esc(text)}</label>`).join('');}
function scienceRebus(data){
 const central=Math.max(...data.map(row=>row[2])),width=Math.max(...data.map(row=>central-row[2]+Array.from(row[1]).length));
 const rows=data.map(([q,a,index],i)=>{const chars=Array.from(norm(a).toUpperCase()),start=central-index,value=Array.from(norm(scienceLessonVal('cross-'+i)).toUpperCase());return Array.from({length:width},(_,c)=>c>=start&&c<start+chars.length?`<span id="science-cell-${i}-${c-start}" class="letter ${c===central?'central':''}">${esc(value[c-start]||'')}</span>`:'<span aria-hidden="true"></span>').join('');}).join('');
 const clues=data.map(([q,a],i)=>scienceTask(`<label for="science-cross-${i}"><b>${i+1}.</b> ${esc(q)} (${Array.from(a).length} litere)</label><input id="science-cross-${i}" class="entry" maxlength="${Array.from(a).length}" value="${esc(scienceLessonVal('cross-'+i))}" autocomplete="off" oninput="scienceLessonSet('cross-${i}',this.value);scienceCrossUpdate(${i},this.value)">`,a,String(i),'',a)).join('');
 return `<p>Completează răspunsurile. Literele din coloana galbenă formează un cuvânt!</p><div class="science-rebus" role="img" aria-label="Rebus cu ${data.length} rânduri; coloana galbenă formează cuvântul ascuns"><div class="science-rebus-grid" style="--science-rebus-width:${width}">${rows}</div></div>${clues}`;
}
function scienceCrossUpdate(row,value){const answer=SCIENCE_LESSONS[route[2]].crossword[row][1];const letters=Array.from(norm(value).toUpperCase());for(let i=0;i<Array.from(answer).length;i++){const el=document.getElementById('science-cell-'+row+'-'+i);if(el)el.textContent=letters[i]||'';}}
function scienceLessonVerify(){
 const fields=[...document.querySelectorAll('[data-science-answer]')];let good=0,done=0;
 for(const field of fields){const input=field.querySelector('select,input:not([type=radio])')||field.querySelector('input:checked');const value=input?.value||'';const ok=field.dataset.scienceAnswer.split('|').map(norm).includes(norm(value));if(value)done++;if(ok)good++;field.classList.toggle('good',ok);field.classList.toggle('bad',!!value&&!ok);const feedback=field.dataset.feedbackId?document.getElementById(field.dataset.feedbackId):field.querySelector('.science-feedback');if(feedback)feedback.textContent=!value?'':ok?'✓ Corect!':`Mai încearcă! Răspuns: ${(field.dataset.correctText||field.dataset.scienceAnswer).replace(/[.!?]+$/,'')}.${field.dataset.explanation?' '+field.dataset.explanation:''}`;}
 document.getElementById('science-result').innerHTML=`<div class="result">${done?'Răspunsuri completate: '+done+'. Corecte: '+good+'.':'Completează un răspuns și verifică.'} ${good===fields.length?'Bravo! 🌟':done<fields.length?'Continuă în ritmul tău.':'Poți corecta și verifica din nou.'}${route[3]==='crossword'&&good===fields.length?' Pe verticală ai descoperit '+SCIENCE_LESSONS[route[2]].crosswordSecret+'!':''}</div>`;
}
function scienceLessonReset(){state={};renderScience('lessons');}
const SCIENCE_FUN_FACTS={
 sources:[['🌊','Dunărea','Dunărea este cel mai important fluviu din România.'],['🏙️','Dâmbovița','Dâmbovița este un râu care trece prin București.']],
 weather:[['🌧️','Picături sau chifle?','Picăturile mici de ploaie sunt aproape rotunde. Cele mai mari se turtesc la bază, ca niște chifle!'],['❄️','Steluțe cu șase brațe','Fulgii în formă de steluță au șase brațe. Forma lor depinde de temperatura și umezeala din nori.'],['🌬️','Taxi pentru semințe','Vântul poartă semințele de păpădie. Puful lor funcționează ca o mică parașută!'],['⚡','Mai fierbinte decât Soarele?','Pentru o clipă, fulgerul poate încălzi aerul din jur mai tare decât suprafața Soarelui!'],['🔊','Lumina câștigă cursa!','Vedem fulgerul înainte să auzim tunetul: lumina călătorește mult mai repede decât sunetul.']]
};
function scienceFunFacts(id){const facts=SCIENCE_FUN_FACTS[id];if(!facts)return '';return `<section class="science-fun"><h2>✨ Știați că?</h2><div class="science-learn-grid">${facts.map(([icon,title,text])=>`<article class="science-learn-card"><span class="science-learn-icon" aria-hidden="true">${icon}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}</div></section>`;}
function scienceWaterPoster(){return `<figure class="water-poster"><h3>🌍 Apa pe Pământ</h3><div class="water-poster-image"><img src="${SITE_ROOT}assets/apa-pe-pamant.jpg" alt="Planșă despre apa pe Pământ, sursele de apă și distribuția aproximativă a apei dulci și sărate." loading="lazy"></div></figure>`;}
function scienceLessonRender(id,part){
 const lesson=SCIENCE_LESSONS[id];if(!lesson)return renderScience('lessons');
 if(!part)return view(scienceLessonNav(id)+`<div class="hero"><h2>📘 ${lesson.title}</h2><p>${lesson.intro}</p></div><div class="cards">${card('📖 Învățăm','Descoperă pe scurt, apoi exersează',`go('science','lessons','${id}','invata')`)}${lesson.sections.map(p=>card(scienceActivities[p][0],p==='tf'?lesson.tf.length+' enunțuri':p==='gaps'?lesson.gaps.length+' propoziții de completat':p==='match'?lesson.match.length+' asocieri':p==='choice'?lesson.choice.length+' întrebări':scienceActivities[p][1],`go('science','lessons','${id}','${p}')`,id==='pollution'&&p==='crossword'?'2026-11-16T00:00:00+02:00':undefined)).join('')}</div>`);
 if(part==='invata')return view(scienceLessonNav(id,part)+`<div class="hero"><p class="section-label">${esc(lesson.title)}</p><h2>📖 Învățăm</h2><p>Descoperă, apoi încearcă exercițiile!</p></div><div class="science-learn-grid">${SCIENCE_LEARN[id].map(([icon,title,text])=>`<article class="science-learn-card"><span class="science-learn-icon" aria-hidden="true">${icon}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}</div>${scienceFunFacts(id)}${id==='sources'?scienceWaterPoster():''}<div class="science-learn-actions"><button class="btn" onclick="go('science','lessons','${id}','${lesson.sections[0]}')">Hai la exerciții! ✨</button></div>`);
 if(!lesson.sections.includes(part))return scienceLessonRender(id);
 let body='';
 if(part==='text'||part==='gaps')body=scienceWordBank(lesson.bank)+scienceRenderGaps(lesson[part],part==='text');
 if(part==='crossword')body=scienceRebus(lesson.crossword);
 if(part==='match')body=scienceLessonOrder('match',lesson.match.length).map((i,j)=>{const [q,a]=lesson.match[i],spec=scienceMatchSpec(a);return scienceTask(`<p><b>${j+1}.</b> ${esc(q)}</p><p class="muted">${spec.prompt}</p><div class="options">${vocabShuffle(spec.options).map(o=>`<button type="button" class="option ${scienceLessonVal('match-'+i)===o?'chosen':''}" aria-pressed="${scienceLessonVal('match-'+i)===o}" onclick="scienceMatchPick('match-${i}',${esc(JSON.stringify(o))},this)">${esc(o)}</button>`).join('')}</div><input type="hidden" value="${esc(scienceLessonVal('match-'+i))}">`,a,String(i),'',a);}).join('');
 if(part==='choice')body=scienceLessonOrder('choice',lesson.choice.length).map((i,j)=>{const [q,options,a,why]=lesson.choice[i];return scienceTask(`<fieldset style="border:0;padding:0"><legend>${j+1}. ${esc(q)}</legend>${scienceChoice('choice-'+i,options)}</fieldset>`,String(a),String(i),why,options[a]);}).join('');
 if(part==='tf')body=scienceLessonOrder('tf',lesson.tf.length).map((i,j)=>{const [q,a,why]=lesson.tf[i];return scienceTask(`<fieldset style="border:0;padding:0"><legend>${j+1}. ${esc(q)}</legend>${scienceAF('tf-'+i)}</fieldset>`,a?'0':'1',String(i),why,a?'A — Adevărat':'F — Fals');}).join('');
 view(scienceLessonNav(id,part)+`<div class="hero"><p class="section-label">${lesson.title}</p><h2>${scienceActivities[part][0]}</h2>${part==='text'?'<p>Completează textul. Scrie un singur cuvânt în fiecare căsuță.</p>':''}</div><div class="panel">${body}<div class="science-actions"><button class="btn" onclick="scienceLessonVerify()">✓ Verifică</button><button class="btn alt" onclick="scienceLessonReset()">↺ Reîncearcă</button></div><div id="science-result" aria-live="polite"></div></div>`);
}
renderScience=function(id){
 if(id===undefined)return view(`<div class="hero"><h2>🔬 Științe ale naturii</h2><p>Învață, exersează și descoperă!</p></div><div class="cards">${card('📘 Lecții','Exerciții și jocuri pentru recapitulare',"go('science','lessons')")}${card('🔬 Experimente','Micul laborator de științe',"go('science','experiments')")}</div>`);
 if(id==='lessons'){const group=route[2],earth=['sources','states','cycle','weather','pollution','protectie'],life=['nevoi','plante','animale','insecte','reptile','mamifere','crestere'];if(group==='earth'||group==='life'){const ids=group==='earth'?earth:life;return view(scienceLessonNav()+`<div class="hero"><h2>${group==='earth'?'🌍 Științele Pământului':'🌱 Științele vieții'}</h2><p>Alege lecția!</p></div><div class="cards">${ids.map((key,i)=>{const l=SCIENCE_LESSONS[key],number=group==='earth'?earth.indexOf(key)+1:i+1,icon=group==='life'?LIFE_LESSONS[key].icon:({sources:'🌊',states:'🧊',cycle:'💧',weather:'🌦️',pollution:'🏭',protectie:'🌱'}[key]||'🔬');return card(number+'. '+icon+' '+l.title,l.intro,`go('science','lessons','${key}')`,group==='life'||key==='protectie'?'2026-11-21T00:00:00+02:00':undefined);}).join('')}</div>`);}if(group)return scienceLessonRender(group,route[3]);return view(scienceLessonNav()+`<div class="hero"><h2>📘 Lecții</h2><p>Alege ce vrei să descoperi.</p></div><div class="cards">${card('🌱 Științele vieții','Plante, animale și nevoile lor',"go('science','lessons','life')",'2026-11-21T00:00:00+02:00')}${card('🌍 Științele Pământului','Apa, fenomenele naturii și mediul',"go('science','lessons','earth')")}</div>`);}
 if(id==='experiments'){scienceOriginalRenderer();return;}
 return scienceOriginalRenderer(id);
};
// Register deep links before the final route resolution.
const scienceResolvedRoute=routeFromPath();if(JSON.stringify(scienceResolvedRoute)!==JSON.stringify(route)){route=scienceResolvedRoute;state=loadProgress();}render();
