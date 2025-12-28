const burnData = {
  "0-1": { "head_front":9.5,"head_back":9.5,"neck_front":1,"neck_back":1,"chest_front":8,"chest_back":8,"abdomen":7,"back":4,"r_shoulder_front":1.5,"r_shoulder_back":1.5,"l_shoulder_front":1.5,"l_shoulder_back":1.5,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand_front":1.25,"r_hand_back":1.25,"l_hand_front":1.25,"l_hand_back":1.25,"r_thigh_front":2.25,"r_thigh_back":2.25,"l_thigh_front":2.25,"l_thigh_back":2.25,"r_calf_front":3.5,"r_calf_back":3.5,"l_calf_front":3.5,"l_calf_back":3.5,"r_foot":2.5,"l_foot":2.5,"right_butt":2,"left_butt":2,"perineum":1 },
  "1-4": { "head_front":8.5,"head_back":8.5,"neck_front":1,"neck_back":1,"chest_front":8,"chest_back":8,"abdomen":7,"back":4,"r_shoulder_front":1.5,"r_shoulder_back":1.5,"l_shoulder_front":1.5,"l_shoulder_back":1.5,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand_front":1.25,"r_hand_back":1.25,"l_hand_front":1.25,"l_hand_back":1.25,"r_thigh_front":3.25,"r_thigh_back":3.25,"l_thigh_front":3.25,"l_thigh_back":3.25,"r_calf_front":3.25,"r_calf_back":3.25,"l_calf_front":3.25,"l_calf_back":3.25,"r_foot":2,"l_foot":2,"right_butt":2,"left_butt":2,"perineum":1 },
  "5-9": { "head_front":6.5,"head_back":6.5,"neck_front":1,"neck_back":1,"chest_front":8,"chest_back":8,"abdomen":7,"back":4,"r_shoulder_front":1.5,"r_shoulder_back":1.5,"l_shoulder_front":1.5,"l_shoulder_back":1.5,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand_front":1.25,"r_hand_back":1.25,"l_hand_front":1.25,"l_hand_back":1.25,"r_thigh_front":4,"r_thigh_back":4,"l_thigh_front":4,"l_thigh_back":4,"r_calf_front":3.5,"r_calf_back":3.5,"l_calf_front":3.5,"l_calf_back":3.5,"r_foot":2,"l_foot":2,"right_butt":2,"left_butt":2,"perineum":1 },
  "10-15": { "head_front":4,"head_back":4,"neck_front":1,"neck_back":1,"chest_front":9,"chest_back":9,"abdomen":9,"back":4,"r_shoulder_front":1.5,"r_shoulder_back":1.5,"l_shoulder_front":1.5,"l_shoulder_back":1.5,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand_front":1,"r_hand_back":1,"l_hand_front":1,"l_hand_back":1,"r_thigh_front":4,"r_thigh_back":4,"l_thigh_front":4,"l_thigh_back":4,"r_calf_front":3.5,"r_calf_back":3.5,"l_calf_front":3.5,"l_calf_back":3.5,"r_foot":3,"l_foot":3,"right_butt":2,"left_butt":2,"perineum":1 },
  "adult": { "head_front":3.5,"head_back":3.5,"neck_front":1,"neck_back":1,"chest_front":9,"chest_back":9,"abdomen":9,"back":5,"r_shoulder_front":1.5,"r_shoulder_back":1.5,"l_shoulder_front":1.5,"l_shoulder_back":1.5,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand_front":1,"r_hand_back":1,"l_hand_front":1,"l_hand_back":1,"r_thigh_front":4,"r_thigh_back":4,"l_thigh_front":4,"l_thigh_back":4,"r_calf_front":3.5,"r_calf_back":3.5,"l_calf_front":3.5,"l_calf_back":3.5,"r_foot":3,"l_foot":3,"right_butt":2,"left_butt":2,"perineum":1 }
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
  "r_hand_front":"Правая кисть спереди","r_hand_back":"Правая кисть сзади",
  "l_hand_front":"Левая кисть спереди","l_hand_back":"Левая кисть сзади",
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
  svg.setAttribute("width","200");
  svg.setAttribute("height","400");

  const shapes = currentView==="front"?[
    {id:"head_front", type:"ellipse", cx:100, cy:25, rx:30, ry:20},
    {id:"neck_front", type:"rect", x:85, y:45, w:30, h:15, rx:7, ry:7},
    {id:"chest_front", type:"rect", x:60, y:60, w:80, h:40, rx:15, ry:15},
    {id:"abdomen", type:"rect", x:60, y:100, w:80, h:40, rx:15, ry:15},
    {id:"r_shoulder_front", type:"ellipse", cx:150, cy:70, rx:12, ry:12},
    {id:"l_shoulder_front", type:"ellipse", cx:50, cy:70, rx:12, ry:12},
    {id:"r_forearm_front", type:"rect", x:140, y:80, w:20, h:40, rx:10, ry:10},
    {id:"l_forearm_front", type:"rect", x:40, y:80, w:20, h:40, rx:10, ry:10},
    {id:"r_hand_front", type:"ellipse", cx:150, cy:120, rx:7, ry:7},
    {id:"l_hand_front", type:"ellipse", cx:50, cy:120, rx:7, ry:7},
    {id:"r_thigh_front", type:"rect", x:70, y:140, w:25, h:50, rx:12, ry:12},
    {id:"l_thigh_front", type:"rect", x:105, y:140, w:25, h:50, rx:12, ry:12},
    {id:"r_calf_front", type:"rect", x:70, y:190, w:25, h:50, rx:12, ry:12},
    {id:"l_calf_front", type:"rect", x:105, y:190, w:25, h:50, rx:12, ry:12},
    {id:"r_foot", type:"ellipse", cx:82, cy:240, rx:12, ry:7},
    {id:"l_foot", type:"ellipse", cx:118, cy:240, rx:12, ry:7},
    {id:"perineum", type:"circle", cx:100, cy:150, r:7}
  ]:[
    {id:"head_back", type:"ellipse", cx:100, cy:25, rx:30, ry:20},
    {id:"neck_back", type:"rect", x:85, y:45, w:30, h:15, rx:7, ry:7},
    {id:"chest_back", type:"rect", x:60, y:60, w:80, h:40, rx:15, ry:15},
    {id:"back", type:"rect", x:60, y:100, w:80, h:40, rx:15, ry:15},
    {id:"r_shoulder_back", type:"ellipse", cx:150, cy:70, rx:12, ry:12},
    {id:"l_shoulder_back", type:"ellipse", cx:50, cy:70, rx:12, ry:12},
    {id:"r_forearm_back", type:"rect", x:140, y:80, w:20, h:40, rx:10, ry:10},
    {id:"l_forearm_back", type:"rect", x:40, y:80, w:20, h:40, rx:10, ry:10},
    {id:"r_hand_back", type:"ellipse", cx:150, cy:120, rx:7, ry:7},
    {id:"l_hand_back", type:"ellipse", cx:50, cy:120, rx:7, ry:7},
    {id:"r_thigh_back", type:"rect", x:70, y:140, w:25, h:50, rx:12, ry:12},
    {id:"l_thigh_back", type:"rect", x:105, y:140, w:25, h:50, rx:12, ry:12},
    {id:"r_calf_back", type:"rect", x:70, y:190, w:25, h:50, rx:12, ry:12},
    {id:"l_calf_back", type:"rect", x:105, y:190, w:25, h:50, rx:12, ry:12},
    {id:"r_foot", type:"ellipse", cx:82, cy:240, rx:12, ry:7},
    {id:"l_foot", type:"ellipse", cx:118, cy:240, rx:12, ry:7},
    {id:"right_butt", type:"ellipse", cx:135, cy:150, rx:12, ry:7},
    {id:"left_butt", type:"ellipse", cx:65, cy:150, rx:12, ry:7}
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
  selectedZones.forEach(z=>{
    let value = burnData[currentBurnAge][z] || 0;
    // делим кисти на front/back
    if(z.includes("hand")) value = value; // уже делим в данных
    total += value;
    selectedNames.push(zoneNames[z]);
  });
  document.getElementById("burnTotal").innerText = total.toFixed(1);
  document.getElementById("burnSelectedZones").innerText = "Выбраны зоны: " + selectedNames.join(", ");
}
