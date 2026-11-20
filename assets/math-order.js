/* Addition and subtraction only; every series moves from thousands to units. */
const ORDER_TYPES={first:['1. Numerotează operațiile','Scrie deasupra fiecărui semn ordinea în care faci operațiile, fără să calculezi'],calculate:['2. Calculează și alege','Trei variante, un singur răspuns corect'],compare:['3. Compară rezultatul','Calculează, apoi alege >, < sau =']};
const orderStyle=document.createElement('style');orderStyle.textContent='.order-expression{display:flex;flex-wrap:wrap;align-items:center;gap:5px;font-size:1.2rem;font-weight:750;margin:10px 0 16px}.order-operation{display:inline-flex;align-items:center;justify-content:center;min-width:44px;min-height:44px;padding:4px 9px;border:2px solid #becde4;border-radius:10px;background:#f5f8ff;color:#28497b;font:inherit;cursor:pointer}.order-operation:hover{background:#e5edff}.order-operation.chosen{background:#dce8ff;border-color:#4267b2;box-shadow:0 0 0 2px #4267b230}.order-operation:focus-visible{outline:3px solid #e7a928;outline-offset:3px}';orderStyle.textContent+='.order-ranked-operation{display:inline-flex;flex-direction:column;align-items:center;gap:2px;line-height:1.2}.order-rank{width:42px;height:42px;box-sizing:border-box;border:2px solid #9bb8dc;border-radius:9px;background:#eef5ff;color:#244569;font:inherit;text-align:center}.order-rank:focus{outline:3px solid #e7a928;outline-offset:2px}.order-expression{align-items:end}';orderStyle.textContent+='.order-compare{font:inherit;color:#28497b;background:#eef5ff;border:2px solid #9bb8dc;border-radius:10px;min-height:44px;min-width:68px;padding:4px 9px;cursor:pointer}.order-compare:focus-visible{outline:3px solid #e7a928;outline-offset:2px}';document.head.appendChild(orderStyle);
FRIENDLY_ROUTES['matematica/ordinea-operatiilor']=['math','order'];
for(const kind of Object.keys(ORDER_TYPES))FRIENDLY_ROUTES['matematica/ordinea-operatiilor/'+kind]=['math','order',kind];
const orderCrumbs=crumbs;crumbs=function(){return orderCrumbs().replace(/>Primul termen<\/button>/g,route[0]==='math'&&route[1]==='order'?'>Ordinea operațiilor</button>':'>Primul termen</button>').replace(/>order<\/button>/g,'>Ordinea operațiilor</button>').replace(/>first<\/button>/g,'>Ordinea operațiilor</button>').replace(/>calculate<\/button>/g,'>Calculează</button>').replace(/>compare<\/button>/g,'>Compară</button>');};
const orderLoad=loadProgress;loadProgress=function(){return route[0]==='math'&&route[1]==='order'?{}:orderLoad();};
const orderView=view;view=function(html){if(route[0]==='math'&&!route[1])html=html.replace(/<\/div>$/,card('🍪 OR.E.O.','Ordinea efectuării operațiilor: adunări, scăderi și paranteze rotunde',"go('math','order')")+'</div>');return orderView(html);};
const orderCertificateTitle=certificateTitle;certificateTitle=function(){return route[0]==='math'&&route[1]==='order'?'Matematică – Ordinea operațiilor – '+ORDER_TYPES[route[2]][0]:orderCertificateTitle();};
function orderParse(expression){
 const tokens=expression.match(/\d+|[()+-]/g)||[];let index=0,depth=0;const plan=[];
 function factor(){if(tokens[index]==='('){index++;depth++;const value=sum();depth--;if(tokens[index++]!==')')throw Error('Missing bracket');return value;}const token=tokens[index++];if(!/^\d+$/.test(token||''))throw Error('Expected number');return Number(token);}
 function sum(){let left=factor();while(tokens[index]==='+'||tokens[index]==='-'){const operatorIndex=index,operator=tokens[index++],right=factor(),value=operator==='+'?left+right:left-right;plan.push({left,right,operator,value,depth,operatorIndex});left=value;}return left;}
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
  return {expression,answer,first,target,relation,options:kind==='first'?[]:kind==='calculate'?vocabShuffle([answer,wrong[0],wrong[1]]):['>','<','='],expected:kind==='first'?parsed.plan.map(step=>step.operatorIndex).join(','):kind==='calculate'?String(answer):relation,granularity:g};
 }
 throw Error('Could not generate an expression in the required range');
}
function orderTasks(kind){if(!state.__orderTasks){const signs=vocabShuffle(['>','<','=','>','<','=','>','<','=','>']);state.__orderTasks=Array.from({length:10},(_,i)=>orderMakeTask(i,kind,signs[i]));}return state.__orderTasks;}
function orderPick(i,value){state['order-'+i]=value;diplomaReadyFor='';document.getElementById('order-result')?.replaceChildren();}
function orderSetRank(i,index,input){
 const tasks=orderTasks('first'),task=tasks[i],total=orderParse(task.expression).plan.length;
 const rank=input.value.replace(/[^0-9]/g,'').slice(0,1);input.value=rank;
 const ranks=state['order-ranks-'+i]||{};ranks[index]=rank;state['order-ranks-'+i]=ranks;
 const entries=Object.entries(ranks).filter(([,v])=>v!==''),numbers=entries.map(([,v])=>Number(v));
 const complete=entries.length===total&&new Set(numbers).size===total&&numbers.every(n=>n>=1&&n<=total);
 orderPick(i,complete?entries.sort((a,b)=>Number(a[1])-Number(b[1])).map(([position])=>position).join(','):'');
 const field=input.closest('.science-exercise');field.classList.remove('good','bad');field.querySelector('.order-feedback').textContent='';
}
function orderExpression(task,i){let operation=0;const ranks=state['order-ranks-'+i]||{};return `<div class="order-expression" role="group" aria-label="Expresia exercițiului ${i+1}">${orderParse(task.expression).tokens.map((token,index)=>{if(token!=='+'&&token!=='-')return `<span>${esc(token)}</span>`;operation++;return `<label class="order-ranked-operation"><input class="order-rank" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="1" autocomplete="off" aria-label="Ordinea ${token==='+'?'adunării':'scăderii'} de la semnul ${operation}" value="${esc(ranks[index]||'')}" oninput="orderSetRank(${i},${index},this)"><span aria-hidden="true">${token==='-'?'−':'+'}</span></label>`;}).join('')}</div>`;}
function orderVerify(){const tasks=orderTasks(route[2]);let good=0,attempted=0;tasks.forEach((t,i)=>{const field=document.getElementById('order-task-'+i),value=state['order-'+i]||'',ok=String(value)===t.expected;if(value)attempted++;good+=Number(ok);field.classList.toggle('good',ok);field.classList.toggle('bad',!!value&&!ok);field.querySelector('.order-feedback').textContent=!value?(route[2]==='first'&&Object.values(state['order-ranks-'+i]||{}).some(Boolean)?'Numerotează fiecare operație o singură dată.':''):ok?'✓ Corect!':'Mai încearcă!';});document.getElementById('order-result').innerHTML=`<div class="result">${attempted?'Răspunsuri completate: '+attempted+'. Corecte: '+good+'.':'Completează un răspuns și verifică.'} ${good===10?'Bravo! 🌟':''}</div>`+(good===10?certificateUnlock():'');}
function orderNewRound(){state={};diplomaReadyFor='';renderOrder(route[2]);window.scrollTo(0,0);}
function renderOrder(kind){
 const tabs=`<nav class="science-tabs" aria-label="Ordinea operațiilor">${Object.entries(ORDER_TYPES).map(([id,[title]])=>`<button ${id===kind?'aria-current="page"':''} onclick="go('math','order','${id}')">${title}</button>`).join('')}</nav>`;
 const rule='<div class="rule"><b>Reține!</b> Mai întâi efectuăm operațiile din paranteze, de la stânga la dreapta. Apoi calculăm de la stânga la dreapta.</div>';
 if(!ORDER_TYPES[kind])return view(`<div class="hero"><h2>🧮 Ordinea efectuării operațiilor</h2><p>Adunări și scăderi în concentrul 1.000–10.000</p>${rule}</div><div class="cards">${Object.entries(ORDER_TYPES).map(([id,[title,desc]])=>card(title,desc,`go('math','order','${id}')`)).join('')}</div>`);
 const tasks=orderTasks(kind),body=tasks.map((t,i)=>kind==='first'?`<fieldset class="science-exercise" id="order-task-${i}"><legend><b>${i+1}.</b></legend>${orderExpression(t,i)}<div class="order-feedback" aria-live="polite"></div></fieldset>`:`<fieldset class="science-exercise" id="order-task-${i}"><legend><b>${i+1}.</b> ${orderDisplay(t.expression)}${kind==='compare'?` <select class="order-compare" aria-label="Alege semnul pentru exercițiul ${i+1}" onchange="orderPick(${i},this.value)"><option value="">?</option>${['&lt;','&gt;','='].map((label,j)=>{const value=['<','>','='][j];return `<option value="${esc(value)}" ${String(state['order-'+i]||'')===value?'selected':''}>${label}</option>`;}).join('')}</select> ${t.target}`:kind==='calculate'?' = ?':''}</legend>${kind==='compare'?'':t.options.map(value=>`<label class="science-choice"><input type="radio" name="order-${i}" value="${esc(String(value))}" ${String(state['order-'+i])===String(value)?'checked':''} onchange="orderPick(${i},this.value)">${esc(String(value))}</label>`).join('')}<div class="order-feedback" aria-live="polite"></div></fieldset>`).join('');
 view(tabs+`<div class="hero"><h2>${ORDER_TYPES[kind][0]}</h2><p>${ORDER_TYPES[kind][1]}</p>${rule}</div><div class="panel">${body}<button class="btn" onclick="orderVerify()">✓ Verifică</button><button class="btn alt" onclick="orderNewRound()">↺ Încă o serie de 10</button><div id="order-result" aria-live="polite"></div></div>`);
}
const orderOriginalRender=render;render=function(){if(route[0]==='math'&&route[1]==='order')return renderOrder(route[2]);return orderOriginalRender();};
const orderResolvedRoute=routeFromPath();if(JSON.stringify(orderResolvedRoute)!==JSON.stringify(route)){route=orderResolvedRoute;state=loadProgress();}render();
