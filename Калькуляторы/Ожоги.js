const burnData = {
  "0-1": { "head_front":9.5,"head_back":9.5,"neck_front":1,"neck_back":1,"chest_front":8,"chest_back":8,"abdomen":7,"back":4,"r_shoulder_front":2,"r_shoulder_back":2,"l_shoulder_front":2,"l_shoulder_back":2,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand_front":1.25,"r_hand_back":1.25,"l_hand_front":1.25,"l_hand_back":1.25,"r_thigh_front":2.25,"r_thigh_back":2.25,"l_thigh_front":2.25,"l_thigh_back":2.25,"r_calf_front":3.5,"r_calf_back":3.5,"l_calf_front":3.5,"l_calf_back":3.5,"r_foot":2.5,"l_foot":2.5,"right_butt":2,"left_butt":2,"perineum":1 },
  "1-4": { "head_front":8.5,"head_back":8.5,"neck_front":1,"neck_back":1,"chest_front":8,"chest_back":8,"abdomen":7,"back":4,"r_shoulder_front":2,"r_shoulder_back":2,"l_shoulder_front":2,"l_shoulder_back":2,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand_front":1.25,"r_hand_back":1.25,"l_hand_front":1.25,"l_hand_back":1.25,"r_thigh_front":3.25,"r_thigh_back":3.25,"l_thigh_front":3.25,"l_thigh_back":3.25,"r_calf_front":3.25,"r_calf_back":3.25,"l_calf_front":3.25,"l_calf_back":3.25,"r_foot":2,"l_foot":2,"right_butt":2,"left_butt":2,"perineum":1 },
  "5-9": { "head_front":6.5,"head_back":6.5,"neck_front":1,"neck_back":1,"chest_front":8,"chest_back":8,"abdomen":7,"back":4,"r_shoulder_front":2,"r_shoulder_back":2,"l_shoulder_front":2,"l_shoulder_back":2,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand_front":1.25,"r_hand_back":1.25,"l_hand_front":1.25,"l_hand_back":1.25,"r_thigh_front":4,"r_thigh_back":4,"l_thigh_front":4,"l_thigh_back":4,"r_calf_front":3.5,"r_calf_back":3.5,"l_calf_front":3.5,"l_calf_back":3.5,"r_foot":2,"l_foot":2,"right_butt":2,"left_butt":2,"perineum":1 },
  "10-15": { "head_front":4,"head_back":4,"neck_front":1,"neck_back":1,"chest_front":9,"chest_back":9,"abdomen":9,"back":4,"r_shoulder_front":2,"r_shoulder_back":2,"l_shoulder_front":2,"l_shoulder_back":2,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand_front":1,"r_hand_back":1,"l_hand_front":1,"l_hand_back":1,"r_thigh_front":4,"r_thigh_back":4,"l_thigh_front":4,"l_thigh_back":4,"r_calf_front":3.5,"r_calf_back":3.5,"l_calf_front":3.5,"l_calf_back":3.5,"r_foot":3,"l_foot":3,"right_butt":2,"left_butt":2,"perineum":1 },
  "adult": { "head_front":3.5,"head_back":3.5,"neck_front":1,"neck_back":1,"chest_front":9,"chest_back":9,"abdomen":9,"back":5,"r_shoulder_front":2,"r_shoulder_back":2,"l_shoulder_front":2,"l_shoulder_back":2,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand_front":1,"r_hand_back":1,"l_hand_front":1,"l_hand_back":1,"r_thigh_front":4,"r_thigh_back":4,"l_thigh_front":4,"l_thigh_back":4,"r_calf_front":3.5,"r_calf_back":3.5,"l_calf_front":3.5,"l_calf_back":3.5,"r_foot":3,"l_foot":3,"right_butt":2,"left_butt":2,"perineum":1 }
};

let currentBurnAge = null;
let currentView = "front";
let selectedZones = new Set();

const zoneNames = {
  "head_front":"Голова спереди","head_back":"Голова сзади",
  "neck_front":"Шея спереди","neck_back":"Шея сзади",
  "chest_front":"Грудная клетка спереди","chest_back":"Грудная клетка сзади",
  "abdomen":"Живот","back":"Поясница",
  "r_shoulder_front":"Правое плечо спереди","r_shoulder_back":"Правое плечо сзади",
  "l_shoulder_front":"Левое плечо спереди","l_shoulder_back":"Левое плечо сзади",
  "r_forearm_front":"Правое предплечье спереди","r_forearm_back":"Правое предплечье сзади",
  "l_forearm_front":"Левое предплечье спереди","l_forearm_back":"Левое предплечье сзади",
  "r_hand_front":"Правая кисть","r_hand_back":"Правая кисть",
  "l_hand_front":"Левая кисть","l_hand_back":"Левая кисть",
  "r_thigh_front":"Правое бедро спереди","r_thigh_back":"Правое бедро сзади",
  "l_thigh_front":"Левое бедро спереди","l_thigh_back":"Левое бедро сзади",
  "r_calf_front":"Правая голень спереди","r_calf_back":"Правая голень сзади",
  "l_calf_front":"Левая голень спереди","l_calf_back":"Левая голень сзади",
  "r_foot":"Правая стопа","l_foot":"Левая стопа",
  "right_butt":"Правая ягодица","left_butt":"Левая ягодица",
  "perineum":"Промежность"
};

document.getElementById("burnAgeSelect").addEventListener("change", e=>{
  currentBurnAge = e.target.value;
  selectedZones.clear();
  renderBurnSVG();
  updateTotal();
});

document.getElementById("frontViewBtn").addEventListener("click",()=>{
  currentView="front";
  renderBurnSVG();
});

document.getElementById("backViewBtn").addEventListener("click",()=>{
  currentView="back";
  renderBurnSVG();
});

function renderBurnSVG(){
  if(!currentBurnAge) return;
  const container=document.getElementById("burnSvgContainer");
  container.innerHTML="";
  const svgNS="http://www.w3.org/2000/svg";
  const svg=document.createElementNS(svgNS,"svg");

  const scale = 1.2; // увеличиваем человечка
  svg.setAttribute("width", 200*scale);
  svg.setAttribute("height", 350*scale); // меньше высота для телефона

  const shapes = currentView==="front"?[
    {id:"head_front", type:"ellipse", cx:100*scale, cy:30*scale, rx:25*scale, ry:20*scale},
    {id:"neck_front", type:"rect", x:90*scale, y:55*scale, w:20*scale, h:15*scale, rx:8*scale, ry:8*scale},
    {id:"chest_front", type:"rect", x:75*scale, y:70*scale, w:50*scale, h:40*scale, rx:15*scale, ry:15*scale},
    {id:"abdomen", type:"rect", x:75*scale, y:110*scale, w:50*scale, h:40*scale, rx:15*scale, ry:15*scale},
    {id:"r_shoulder_front", type:"rect", x:135*scale, y:70*scale, w:18*scale, h:35*scale, rx:10*scale, ry:10*scale},
    {id:"l_shoulder_front", type:"rect", x:47*scale, y:70*scale, w:18*scale, h:35*scale, rx:10*scale, ry:10*scale},
    {id:"r_forearm_front", type:"rect", x:135*scale, y:105*scale, w:18*scale, h:35*scale, rx:8*scale, ry:8*scale},
    {id:"l_forearm_front", type:"rect", x:47*scale, y:105*scale, w:18*scale, h:35*scale, rx:8*scale, ry:8*scale},
    {id:"r_hand_front", type:"ellipse", cx:144*scale, cy:140*scale, rx:7*scale, ry:7*scale},
    {id:"l_hand_front", type:"ellipse", cx:56*scale, cy:140*scale, rx:7*scale, ry:7*scale},
    {id:"r_thigh_front", type:"rect", x:80*scale, y:150*scale, w:15*scale, h:35*scale, rx:8*scale, ry:8*scale},
    {id:"l_thigh_front", type:"rect", x:105*scale, y:150*scale, w:15*scale, h:35*scale, rx:8*scale, ry:8*scale},
    {id:"r_calf_front", type:"rect", x:80*scale, y:185*scale, w:15*scale, h:35*scale, rx:8*scale, ry:8*scale},
    {id:"l_calf_front", type:"rect", x:105*scale, y:185*scale, w:15*scale, h:35*scale, rx:8*scale, ry:8*scale},
    {id:"r_foot", type:"ellipse", cx:87*scale, cy:220*scale, rx:7*scale, ry:5*scale},
    {id:"l_foot", type:"ellipse", cx:113*scale, cy:220*scale, rx:7*scale, ry:5*scale},
    {id:"perineum", type:"circle", cx:100*scale, cy:145*scale, r:5*scale}
  ]:[
    {id:"head_back", type:"ellipse", cx:100*scale, cy:30*scale, rx:25*scale, ry:20*scale},
    {id:"neck_back", type:"rect", x:90*scale, y:55*scale, w:20*scale, h:15*scale, rx:8*scale, ry:8*scale},
    {id:"chest_back", type:"rect", x:75*scale, y:70*scale, w:50*scale, h:40*scale, rx:15*scale, ry:15*scale},
    {id:"back", type:"rect", x:75*scale, y:110*scale, w:50*scale, h:40*scale, rx:15*scale, ry:15*scale},
    {id:"r_shoulder_back", type:"rect", x:135*scale, y:70*scale, w:18*scale, h:35*scale, rx:10*scale, ry:10*scale},
    {id:"l_shoulder_back", type:"rect", x:47*scale, y:70*scale, w:18*scale, h:35*scale, rx:10*scale, ry:10*scale},
    {id:"r_forearm_back", type:"rect", x:135*scale, y:105*scale, w:18*scale, h:35*scale, rx:8*scale, ry:8*scale},
    {id:"l_forearm_back", type:"rect", x:47*scale, y:105*scale, w:18*scale, h:35*scale, rx:8*scale, ry:8*scale},
    {id:"r_hand_back", type:"ellipse", cx:144*scale, cy:140*scale, rx:7*scale, ry:7*scale},
    {id:"l_hand_back", type:"ellipse", cx:56*scale, cy:140*scale, rx:7*scale, ry:7*scale},
    {id:"r_thigh_back", type:"rect", x:80*scale, y:150*scale, w:15*scale, h:35*scale, rx:8*scale, ry:8*scale},
    {id:"l_thigh_back", type:"rect", x:105*scale, y:150*scale, w:15*scale, h:35*scale, rx:8*scale, ry:8*scale},
    {id:"r_calf_back", type:"rect", x:80*scale, y:185*scale, w:15*scale, h:35*scale, rx:8*scale, ry:8*scale},
    {id:"l_calf_back", type:"rect", x:105*scale, y:185*scale, w:15*scale, h:35*scale, rx:8*scale, ry:8*scale},
    {id:"r_foot", type:"ellipse", cx:87*scale, cy:220*scale, rx:7*scale, ry:5*scale},
    {id:"l_foot", type:"ellipse", cx:113*scale, cy:220*scale, rx:7*scale, ry:5*scale},
    {id:"right_butt", type:"ellipse", cx:115*scale, cy:145*scale, rx:8*scale, ry:6*scale},
    {id:"left_butt", type:"ellipse", cx:85*scale, cy:145*scale, rx:8*scale, ry:6*scale}
  ];

  shapes.forEach(s=>{
    let el;
    if(s.type==="rect"){
      el=document.createElementNS(svgNS,"rect");
      el.setAttribute("x",s.x);
      el.setAttribute("y",s.y);
      el.setAttribute("width",s.w);
      el.setAttribute("height",s.h);
      el.setAttribute("rx",s.rx||0);
      el.setAttribute("ry",s.ry||0);
    } else if(s.type==="ellipse"){
      el=document.createElementNS(svgNS,"ellipse");
      el.setAttribute("cx",s.cx);
      el.setAttribute("cy",s.cy);
      el.setAttribute("rx",s.rx);
      el.setAttribute("ry",s.ry);
    } else if(s.type==="circle"){
      el=document.createElementNS(svgNS,"circle");
      el.setAttribute("cx",s.cx);
      el.setAttribute("cy",s.cy);
      el.setAttribute("r",s.r);
    }
    el.setAttribute("stroke","#000");
    el.setAttribute("fill", selectedZones.has(s.id) ? "#f00" : "#ccc");
    el.style.cursor="pointer";
    el.addEventListener("click",()=>{
      if(selectedZones.has(s.id)) selectedZones.delete(s.id);
      else selectedZones.add(s.id);
      renderBurnSVG();
      updateTotal();
    });
    svg.appendChild(el);
  });

  container.appendChild(svg);
}

function updateTotal(){
  if(!currentBurnAge) return;
  let total=0;
  let selectedNames = [];
  Object.keys(zoneNames).forEach(z=>{
    if(selectedZones.has(z)){
      let value = burnData[currentBurnAge][z] || 0;
      total += value;
      selectedNames.push({name: zoneNames[z], value: value});
    }
  });
  document.getElementById("burnTotal").innerText = total.toFixed(1);
  let text = selectedNames.map(s=>`${s.name} ${s.value}%`).join("\n");
  document.getElementById("burnSelectedZones").innerText = text;
}
