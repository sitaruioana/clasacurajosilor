/* Addition and subtraction only; every series moves from thousands to units. */
const ORDER_TYPES={first:['1. Alege prima operație','Fără calcul: alege ce faci prima dată'],calculate:['2. Calculează și alege','Trei variante, un singur răspuns corect'],compare:['3. Compară rezultatul','Calculează, apoi alege >, < sau =']};
FRIENDLY_ROUTES['matematica/ordinea-operatiilor']=['math','order'];
for(const kind of Object.keys(ORDER_TYPES))FRIENDLY_ROUTES['matematica/ordinea-operatiilor/'+kind]=['math','order',kind];
const orderCrumbs=crumbs;crumbs=function(){return orderCrumbs().replace(/>Primul termen<\/button>/g,route[0]==='math'&&route[1]==='order'?'>Prima operație</button>':'>Primul termen</button>').replace(/>order<\/button>/g,'>Ordinea operațiilor</button>').replace(/>first<\/button>/g,'>Prima operație</button>').replace(/>calculate<\/button>/g,'>Calculează</button>').replace(/>compare<\/button>/g,'>Compară</button>');};
const orderLoad=loadProgress;loadProgress=function(){return route[0]==='math'&&route[1]==='order'?{}:orderLoad();};
const orderView=view;view=function(html){if(route[0]==='math'&&!route[1])html=html.replace(/<\/div>$/,card('🧮 Ordinea efectuării operațiilor','Adunări, scăderi și paranteze rotunde',"go('math','order')")+'</div>');return orderView(html);};
const orderCertificateTitle=certificateTitle;certificateTitle=function(){return route[0]==='math'&&route[1]==='order'?'Matematică – Ordinea operațiilor – '+ORDER_TYPES[route[2]][0]:orderCertificateTitle();};
function orderParse(expression){
 const tokens=expression.match(/\d+|[()+-]/g)||[];let index=0,depth=0;const plan=[];
 function factor(){if(tokens[index]==='('){index++;depth++;const value=sum();depth--;if(tokens[index++]!==')')throw Error('Missing bracket');return value;}const token=tokens[index++];if(!/^\d+$/.test(token||''))throw Error('Expected number');return Number(token);}
 function sum(){let left=factor();while(tokens[index]==='+'||tokens[index]==='-'){const operator=tokens[index++],right=factor(),value=operator==='+'?left+right:left-right;plan.push({left,right,operator,value,depth});left=value;}return left;}
 const answer=sum();if(index!==tokens.length)throw Error('Unexpected token');return {answer,plan:plan.sort((a,b)=>b.depth-a.depth),tokens};
}
function orderGranularity(i){return i<2?1000:i<4?100:i<6?10:1;}
function orderInteger(i){const digit=()=>1+Math.floor(Math.random()*9);if(i<2)return digit()*1000;if(i<4)return digit()*1000+digit()*100;if(i<6)return digit()*1000+digit()*100+digit()*10;return digit()*1000+digit()*100+digit()*10+digit();}
function orderOperation(step){return step.left+' '+(step.operator==='-'?'−':'+')+' '+step.right;}
function orderDisplay(expression){return expression.replace(/-/g,'−').replace(/([+−])/g,' $1 ').replace(/\s+/g,' ');}
function orderMakeTask(i,kind,relation){
 const templates=[n=>`${n[0]}-(${n[1]}-${n[2]})+${n[3]}-${n[4]}`,n=>`${n[0]}+(${n[1]}-${n[2]})-${n[3]}+${n[4]}`,n=>`(${n[0]}+${n[1]})-(${n[2]}-${n[3]})+${n[4]}`,n=>`${n[0]}-(${n[1]}+${n[2]})+${n[3]}+${n[4]}`,n=>`(${n[0]}-${n[1]})+${n[2]}-(${n[3]}-${n[4]})`,n=>`${n[0]}+${n[1]}-(${n[2]}-${n[3]})`,n=>`${n[0]}-(${n[1]}-${n[2]})+${n[3]}`,n=>`(${n[0]}+${n[1]})-(${n[2]}+${n[3]})`,n=>`${n[0]}-${n[1]}+${n[2]}-${n[3]}`,n=>`${n[0]}+${n[1]}-${n[2]}+${n[3]}-${n[4]}`];
 for(let attempt=0;attempt<20000;attempt++){
  const numbers=Array.from({length:5},()=>orderInteger(i)),expression=templates[Math.floor(Math.random()*templates.length)](numbers),parsed=orderParse(expression),g=orderGranularity(i);
  if(parsed.plan.some(s=>s.value<1000||s.value>10000))continue;
  const answer=parsed.answer,first=orderOperation(parsed.plan[0]),target=answer+(relation==='<'?g:relation==='>'?-g:0);if(target<1000||target>10000)continue;
  const numeric=parsed.tokens.filter(t=>/^\d+$/.test(t)).map(Number),operators=parsed.tokens.filter(t=>t==='+'||t==='-');
  const candidateOps=[...new Set(operators.map((operator,j)=>orderOperation({left:numeric[j],right:numeric[j+1],operator})))].filter(s=>s!==first);
  if(candidateOps.length<2)continue;
  let flat=numeric[0];operators.forEach((op,j)=>flat=op==='+'?flat+numeric[j+1]:flat-numeric[j+1]);
  const mistakes=[flat,answer+g,answer-g,answer+2*g,answer-2*g].filter(n=>n>=1000&&n<=10000&&n!==answer);
  const wrong=[...new Set(mistakes)];if(wrong.length<2)continue;
  return {expression,answer,first,target,relation,options:kind==='first'?vocabShuffle([first,...vocabShuffle(candidateOps).slice(0,2)]):kind==='calculate'?vocabShuffle([answer,wrong[0],wrong[1]]):['>','<','='],expected:kind==='first'?first:kind==='calculate'?String(answer):relation,granularity:g};
 }
 throw Error('Could not generate an expression in the required range');
}
function orderTasks(kind){if(!state.__orderTasks){const signs=vocabShuffle(['>','<','=','>','<','=','>','<','=','>']);state.__orderTasks=Array.from({length:10},(_,i)=>orderMakeTask(i,kind,signs[i]));}return state.__orderTasks;}
function orderPick(i,value){state['order-'+i]=value;diplomaReadyFor='';document.getElementById('order-result')?.replaceChildren();}
function orderVerify(){const tasks=orderTasks(route[2]);let good=0;tasks.forEach((t,i)=>{const field=document.getElementById('order-task-'+i),value=state['order-'+i]||'',ok=String(value)===t.expected;good+=Number(ok);field.classList.toggle('good',ok);field.classList.toggle('bad',!!value&&!ok);field.querySelector('.order-feedback').textContent=!value?'':ok?'✓ Corect!':'Mai încearcă!';});document.getElementById('order-result').innerHTML=`<div class="result">${good} din 10 răspunsuri corecte. ${good===10?'Bravo! 🌟':'Poți corecta și verifica din nou.'}</div>`+(good===10?certificateUnlock():'');}
function orderNewRound(){state={};diplomaReadyFor='';renderOrder(route[2]);window.scrollTo(0,0);}
function renderOrder(kind){
 const tabs=`<nav class="science-tabs" aria-label="Ordinea operațiilor">${Object.entries(ORDER_TYPES).map(([id,[title]])=>`<button ${id===kind?'aria-current="page"':''} onclick="go('math','order','${id}')">${title}</button>`).join('')}</nav>`;
 const rule='<div class="rule"><b>Reține!</b> Mai întâi efectuăm operațiile din paranteze, de la stânga la dreapta. Apoi calculăm de la stânga la dreapta.</div>';
 if(!ORDER_TYPES[kind])return view(`<div class="hero"><h2>🧮 Ordinea efectuării operațiilor</h2><p>Adunări și scăderi în concentrul 1.000–10.000</p>${rule}</div><div class="cards">${Object.entries(ORDER_TYPES).map(([id,[title,desc]])=>card(title,desc,`go('math','order','${id}')`)).join('')}</div>`);
 const tasks=orderTasks(kind),body=tasks.map((t,i)=>`<fieldset class="science-exercise" id="order-task-${i}"><legend><b>${i+1}.</b> ${orderDisplay(t.expression)}${kind==='compare'?' ___ '+t.target:kind==='calculate'?' = ?':''}</legend>${t.options.map(value=>`<label class="science-choice"><input type="radio" name="order-${i}" value="${esc(String(value))}" ${String(state['order-'+i])===String(value)?'checked':''} onchange="orderPick(${i},this.value)">${esc(String(value))}</label>`).join('')}<div class="order-feedback" aria-live="polite"></div></fieldset>`).join('');
 view(tabs+`<div class="hero"><h2>${ORDER_TYPES[kind][0]}</h2><p>${ORDER_TYPES[kind][1]}</p>${rule}</div><div class="panel">${body}<button class="btn" onclick="orderVerify()">✓ Verifică</button><button class="btn alt" onclick="orderNewRound()">↺ Încă o serie de 10</button><div id="order-result" aria-live="polite"></div></div>`);
}
const orderOriginalRender=render;render=function(){if(route[0]==='math'&&route[1]==='order')return renderOrder(route[2]);return orderOriginalRender();};
const orderResolvedRoute=routeFromPath();if(JSON.stringify(orderResolvedRoute)!==JSON.stringify(route)){route=orderResolvedRoute;state=loadProgress();}render();
