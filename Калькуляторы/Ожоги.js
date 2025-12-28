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

document.getElementById("frontViewBtn").addEventListener("click", ()=>{
  currentView="front";
  renderBurnSVG();
});

document.getElementById("backViewBtn").addEventListener("click", ()=>{
  currentView="back";
  renderBurnSVG();
});

function renderBurnSVG(){
  if(!currentBurnAge) return;
  const container=document.getElementById("burnSvgContainer");
  container.innerHTML="";
  const svgNS="http://www.w3.org/2000/svg";
  const scale = 2.5; // масштаб увеличения
  const svg=document.createElementNS(svgNS,"svg");
  svg.setAttribute("width", 200*scale);
  svg.setAttribute("height", 400*scale);

  const shapes = currentView==="front"?[
    {id:"head_front", type:"ellipse", cx:100, cy:30, rx:25, ry:20},
    {id:"neck_front", type:"rect", x:90, y:55, w:20, h:15, rx:8, ry:8},
    {id:"chest_front", type:"rect", x:75, y:70, w:50, h:40, rx:15, ry:15},
    {id:"abdomen", type:"rect", x:75, y:110, w:50, h:40, rx:15, ry:15},
    {id:"r_shoulder_front", type:"rect", x:130, y:70, w:15, h:35, rx:10, ry:10},
    {id:"l_shoulder_front", type:"rect", x:55, y:70, w:15, h:35, rx:10, ry:10},
    {id:"r_forearm_front", type:"rect", x:130, y:105, w:15, h:35, rx:8, ry:8},
    {id:"l_forearm_front", type:"rect", x:55, y:105, w:15, h:35, rx:8, ry:8},
    {id:"r_hand_front", type:"ellipse", cx:137, cy:140, rx:7, ry:7},
    {id:"l_hand_front", type:"ellipse", cx:63, cy:140, rx:7, ry:7},
    {id:"r_thigh_front", type:"rect", x:75, y:150, w:15, h:35, rx:8, ry:8}, // ноги разнесены
    {id:"l_thigh_front", type:"rect", x:110, y:150, w:15, h:35, rx:8, ry:8},
    {id:"r_calf_front", type:"rect", x:75, y:185, w:15, h:35, rx:8, ry:8},
    {id:"l_calf_front", type:"rect", x:110, y:185, w:15, h:35, rx:8, ry:8},
    {id:"r_foot", type:"ellipse", cx:82, cy:220, rx:7, ry:5},
    {id:"l_foot", type:"ellipse", cx:118, cy:220, rx:7, ry:5},
    {id:"perineum", type:"circle", cx:100, cy:145, r:5}
  ]:[
    {id:"head_back", type:"ellipse", cx:100, cy:30, rx:25, ry:20},
    {id:"neck_back", type:"rect", x:90, y:55, w:20, h:15, rx:8, ry:8},
    {id:"chest_back", type:"rect", x:75, y:70, w:50, h:40, rx:15, ry:15},
    {id:"back", type:"rect", x:75, y:110, w:50, h:40, rx:15, ry:15},
    {id:"r_shoulder_back", type:"rect", x:130, y:70, w:15, h:35, rx:10, ry:10},
    {id:"l_shoulder_back", type:"rect", x:55, y:70, w:15, h:35, rx:10, ry:10},
    {id:"r_forearm_back", type:"rect", x:130, y:105, w:15, h:35, rx:8, ry:8},
    {id:"l_forearm_back", type:"rect", x:55, y:105, w:15, h:35, rx:8, ry:8},
    {id:"r_hand_back", type:"ellipse", cx:137, cy:140, rx:7, ry:7},
    {id:"l_hand_back", type:"ellipse", cx:63, cy:140, rx:7, ry:7},
    {id:"r_thigh_back", type:"rect", x:75, y:150, w:15, h:35, rx:8, ry:8},
    {id:"l_thigh_back", type:"rect", x:110, y:150, w:15, h:35, rx:8, ry:8},
    {id:"r_calf_back", type:"rect", x:75, y:185, w:15, h:35, rx:8, ry:8},
    {id:"l_calf_back", type:"rect", x:110, y:185, w:15, h:35, rx:8, ry:8},
    {id:"r_foot", type:"ellipse", cx:82, cy:220, rx:7, ry:5},
    {id:"l_foot", type:"ellipse", cx:118, cy:220, rx:7, ry:5},
    {id:"right_butt", type:"ellipse", cx:115, cy:145, rx:8, ry:6},
    {id:"left_butt", type:"ellipse", cx:85, cy:145, rx:8, ry:6}
  ];

  shapes.forEach(s=>{
    let el;
    if(s.type==="rect"){
      el=document.createElementNS(svgNS,"rect");
      el.setAttribute("x", s.x*scale);
      el.setAttribute("y", s.y*scale);
      el.setAttribute("width", s.w*scale);
      el.setAttribute("height", s.h*scale);
      el.setAttribute("rx", (s.rx||0)*scale);
      el.setAttribute("ry", (s.ry||0)*scale);
    } else if(s.type==="ellipse"){
      el=document.createElementNS(svgNS,"ellipse");
      el.setAttribute("cx", s.cx*scale);
      el.setAttribute("cy", s.cy*scale);
      el.setAttribute("rx", s.rx*scale);
      el.setAttribute("ry", s.ry*scale);
    } else if(s.type==="circle"){
      el=document.createElementNS(svgNS,"circle");
      el.setAttribute("cx", s.cx*scale);
      el.setAttribute("cy", s.cy*scale);
      el.setAttribute("r", s.r*scale);
    }
    el.setAttribute("stroke","#000");
    el.setAttribute("fill", selectedZones.has(s.id) ? "#f00" : "#ccc");
    el.style.cursor="pointer";
    el.addEventListener("click", ()=>{
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
