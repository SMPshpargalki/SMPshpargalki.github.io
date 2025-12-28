const burnData = {
 "0-1": { "head_front":9.5,"head_back":9.5,"neck_front":1,"neck_back":1,"chest_front":8,"chest_back":8,"abdomen":7,"back":4,"r_shoulder_front":1.5,"r_shoulder_back":1.5,"l_shoulder_front":1.5,"l_shoulder_back":1.5,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand_front":1.25,"r_hand_back":1.25,"l_hand_front":1.25,"l_hand_back":1.25,"r_thigh_front":2.25,"r_thigh_back":2.25,"l_thigh_front":2.25,"l_thigh_back":2.25,"r_calf_front":3.5,"r_calf_back":3.5,"l_calf_front":3.5,"l_calf_back":3.5,"r_foot":2.5,"l_foot":2.5,"right_butt":2,"left_butt":2,"perineum":1 },
 "1-4": { "head_front":8.5,"head_back":8.5,"neck_front":1,"neck_back":1,"chest_front":8,"chest_back":8,"abdomen":7,"back":4,"r_shoulder_front":1.5,"r_shoulder_back":1.5,"l_shoulder_front":1.5,"l_shoulder_back":1.5,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand_front":1.25,"r_hand_back":1.25,"l_hand_front":1.25,"l_hand_back":1.25,"r_thigh_front":3.25,"r_thigh_back":3.25,"l_thigh_front":3.25,"l_thigh_back":3.25,"r_calf_front":3.25,"r_calf_back":3.25,"l_calf_front":3.25,"l_calf_back":3.25,"r_foot":2,"l_foot":2,"right_butt":2,"left_butt":2,"perineum":1 },
 "5-9": { "head_front":6.5,"head_back":6.5,"neck_front":1,"neck_back":1,"chest_front":8,"chest_back":8,"abdomen":7,"back":4,"r_shoulder_front":1.5,"r_shoulder_back":1.5,"l_shoulder_front":1.5,"l_shoulder_back":1.5,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand_front":1.25,"r_hand_back":1.25,"l_hand_front":1.25,"l_hand_back":1.25,"r_thigh_front":4,"r_thigh_back":4,"l_thigh_front":4,"l_thigh_back":4,"r_calf_front":3.5,"r_calf_back":3.5,"l_calf_front":3.5,"l_calf_back":3.5,"r_foot":2,"l_foot":2,"right_butt":2,"left_butt":2,"perineum":1 },
 "10-15": { "head_front":4,"head_back":4,"neck_front":1,"neck_back":1,"chest_front":9,"chest_back":9,"abdomen":9,"back":4,"r_shoulder_front":1.5,"r_shoulder_back":1.5,"l_shoulder_front":1.5,"l_shoulder_back":1.5,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand_front":1,"r_hand_back":1,"l_hand_front":1,"l_hand_back":1,"r_thigh_front":4,"r_thigh_back":4,"l_thigh_front":4,"l_thigh_back":4,"r_calf_front":3.5,"r_calf_back":3.5,"l_calf_front":3.5,"l_calf_back":3.5,"r_foot":3,"l_foot":3,"right_butt":2,"left_butt":2,"perineum":1 },
 "adult": { "head_front":3.5,"head_back":3.5,"neck_front":1,"neck_back":1,"chest_front":9,"chest_back":9,"abdomen":9,"back":5,"r_shoulder_front":1.5,"r_shoulder_back":1.5,"l_shoulder_front":1.5,"l_shoulder_back":1.5,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand_front":1,"r_hand_back":1,"l_hand_front":1,"l_hand_back":1,"r_thigh_front":4,"r_thigh_back":4,"l_thigh_front":4,"l_thigh_back":4,"r_calf_front":3.5,"r_calf_back":3.5,"l_calf_front":3.5,"l_calf_back":3.5,"r_foot":3,"l_foot":3,"right_butt":2,"left_butt":2,"perineum":1 }
};
let currentView = "front";
let selectedZones = new Set();

 "chest_front":"Грудная клетка спереди","chest_back":"Грудная клетка сзади",
 "abdomen":"Живот","back":"Поясница",
 "l_shoulder_front":"Левое плечо спереди","l_shoulder_back":"Левое плечо сзади",
 "r_forearm_front":"Правое предплечье спереди","r_forearm_back":"Правое предплечье сзади",
 "l_forearm_front":"Левое предплечье спереди","l_forearm_back":"Левое предплечье сзади",
 "r_thigh_front":"Правое бедро спереди","r_thigh_back":"Правое бедро сзади",
 "l_thigh_front":"Левое бедро спереди","l_thigh_back":"Левое бедро сзади",
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
  {id:"abdomen", type:"rect", x:110, y:170, w:80, h:60, rx:20, ry:20},
  {id:"r_shoulder_front", type:"ellipse", cx:210, cy:130, rx:15, ry:15},
  {id:"l_shoulder_front", type:"ellipse", cx:90, cy:130, rx:15, ry:15},
  {id:"r_forearm_front", type:"rect", x:200, y:145, w:25, h:60, rx:12, ry:12},
  {id:"l_forearm_front", type:"rect", x:75, y:145, w:25, h:60, rx:12, ry:12},
  {id:"r_hand_front", type:"ellipse", cx:212, cy:205, rx:10, ry:10},
  {id:"l_hand_front", type:"ellipse", cx:88, cy:205, rx:10, ry:10},
  {id:"r_thigh_front", type:"rect", x:110, y:240, w:35, h:80, rx:15, ry:15},
  {id:"l_thigh_front", type:"rect", x:155, y:240, w:35, h:80, rx:15, ry:15},
 ]:[
  {id:"head_back", type:"ellipse", cx:150, cy:50, rx:40, ry:30},
  {id:"neck_back", type:"rect", x:135, y:85, w:30, h:20, rx:10, ry:10},
  {id:"chest_back", type:"rect", x:110, y:105, w:80, h:60, rx:20, ry:20},
  {id:"back", type:"rect", x:110, y:170, w:80, h:60, rx:20, ry:20},
  {id:"r_shoulder_back", type:"ellipse", cx:210, cy:130, rx:15, ry:15},
  {id:"l_shoulder_back", type:"ellipse", cx:90, cy:130, rx:15, ry:15},
  {id:"r_calf_back", type:"rect", x:110, y:320, w:35, h:80, rx:15, ry:15},
  {id:"l_calf_back", type:"rect", x:155, y:320, w:35, h:80, rx:15, ry:15},
  {id:"r_foot", type:"ellipse", cx:120, cy:400, rx:15, ry:10},
  {id:"l_foot", type:"ellipse", cx:180, cy:400, rx:15, ry:10},
  {id:"right_butt", type:"ellipse", cx:180, cy:225, rx:15, ry:12},
  {id:"left_butt", type:"ellipse", cx:120, cy:225, rx:15, ry:12}
 ];

 shapes.forEach(s=>{
   el.setAttribute("height",s.h);
   el.setAttribute("rx",s.rx||0);
   el.setAttribute("ry",s.ry);
   el=document.createElementNS(svgNS,"circle");
   el.setAttribute("cx",s.cx);
   el.setAttribute("cy",s.cy);
   el.setAttribute("r",s.r);
  }
  el.setAttribute("stroke","#000");
  el.setAttribute("fill", selectedZones.has(s.id) ? "#f00" : "#ccc");
  el.style.cursor="pointer";
 container.appendChild(svg);
}

function updateTotal(){
 if(!currentBurnAge) return;
 let total=0;
 let selectedNames = [];
 Object.keys(zoneNames).forEach(key=>{
 let text = selectedNames.map(s=>`${s.name} ${s.value}%`).join("\n");
 document.getElementById("burnSelectedZones").innerText = text;
}