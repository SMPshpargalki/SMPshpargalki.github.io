const burnData = {
  "0-1": { "head_front":9.5,"head_back":9.5,"neck_front":1,"neck_back":1,"chest_front":8,"chest_back":8,"abdomen":7,"back":4,"right_butt":2,"left_butt":2,"perineum":1,"r_shoulder_front":1.5,"r_shoulder_back":1.5,"l_shoulder_front":1.5,"l_shoulder_back":1.5,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand":2.5,"l_hand":2.5,"r_thigh_front":2.25,"r_thigh_back":2.25,"l_thigh_front":2.25,"l_thigh_back":2.25,"r_calf_front":3.5,"r_calf_back":3.5,"l_calf_front":3.5,"l_calf_back":3.5,"r_foot":2.5,"l_foot":2.5 },
  "1-4": { "head_front":8.5,"head_back":8.5,"neck_front":1,"neck_back":1,"chest_front":8,"chest_back":8,"abdomen":7,"back":4,"right_butt":2,"left_butt":2,"perineum":1,"r_shoulder_front":1.5,"r_shoulder_back":1.5,"l_shoulder_front":1.5,"l_shoulder_back":1.5,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand":2.5,"l_hand":2.5,"r_thigh_front":3.25,"r_thigh_back":3.25,"l_thigh_front":3.25,"l_thigh_back":3.25,"r_calf_front":3.25,"r_calf_back":3.25,"l_calf_front":3.25,"l_calf_back":3.25,"r_foot":2,"l_foot":2 },
  "5-9": { "head_front":6.5,"head_back":6.5,"neck_front":1,"neck_back":1,"chest_front":8,"chest_back":8,"abdomen":7,"back":4,"right_butt":2,"left_butt":2,"perineum":1,"r_shoulder_front":1.5,"r_shoulder_back":1.5,"l_shoulder_front":1.5,"l_shoulder_back":1.5,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand":2.5,"l_hand":2.5,"r_thigh_front":4,"r_thigh_back":4,"l_thigh_front":4,"l_thigh_back":4,"r_calf_front":3.5,"r_calf_back":3.5,"l_calf_front":3.5,"l_calf_back":3.5,"r_foot":2,"l_foot":2 },
  "10-15": { "head_front":4,"head_back":4,"neck_front":1,"neck_back":1,"chest_front":9,"chest_back":9,"abdomen":9,"back":4,"right_butt":2,"left_butt":2,"perineum":1,"r_shoulder_front":1.5,"r_shoulder_back":1.5,"l_shoulder_front":1.5,"l_shoulder_back":1.5,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand":2,"l_hand":2,"r_thigh_front":4,"r_thigh_back":4,"l_thigh_front":4,"l_thigh_back":4,"r_calf_front":3.5,"r_calf_back":3.5,"l_calf_front":3.5,"l_calf_back":3.5,"r_foot":3,"l_foot":3 },
  "adult": { "head_front":3.5,"head_back":3.5,"neck_front":1,"neck_back":1,"chest_front":9,"chest_back":9,"abdomen":9,"back":5,"right_butt":2,"left_butt":2,"perineum":1,"r_shoulder_front":1.5,"r_shoulder_back":1.5,"l_shoulder_front":1.5,"l_shoulder_back":1.5,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand":2,"l_hand":2,"r_thigh_front":4,"r_thigh_back":4,"l_thigh_front":4,"l_thigh_back":4,"r_calf_front":3.5,"r_calf_back":3.5,"l_calf_front":3.5,"l_calf_back":3.5,"r_foot":3,"l_foot":3 }
};

let currentBurnAge = null;
let currentView = "front";
let selectedZones = new Set();

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
    {id:"head_front", x:70, y:10, w:60, h:30},
    {id:"neck_front", x:85, y:40, w:30, h:10},
    {id:"chest_front", x:60, y:50, w:80, h:40},
    {id:"abdomen", x:60, y:90, w:80, h:40},
    {id:"r_shoulder_front", x:140, y:50, w:20, h:20},
    {id:"l_shoulder_front", x:40, y:50, w:20, h:20},
    {id:"r_forearm_front", x:140, y:70, w:20, h:30},
    {id:"l_forearm_front", x:40, y:70, w:20, h:30},
    {id:"r_hand", x:145, y:100, w:15, h:15},
    {id:"l_hand", x:40, y:100, w:15, h:15},
    {id:"r_thigh_front", x:75, y:130, w:25, h:50},
    {id:"l_thigh_front", x:100, y:130, w:25, h:50},
    {id:"r_calf_front", x:75, y:180, w:25, h:50},
    {id:"l_calf_front", x:100, y:180, w:25, h:50},
    {id:"r_foot", x:75, y:230, w:25, h:15},
    {id:"l_foot", x:100, y:230, w:25, h:15},
    {id:"right_butt", x:120, y:120, w:25, h:15},
    {id:"left_butt", x:55, y:120, w:25, h:15},
    {id:"perineum", x:85, y:150, w:30, h:10}
  ]:[
    {id:"head_back", x:70, y:10, w:60, h:30},
    {id:"neck_back", x:85, y:40, w:30, h:10},
    {id:"chest_back", x:60, y:50, w:80, h:40},
    {id:"back", x:60, y:90, w:80, h:40},
    {id:"r_shoulder_back", x:140, y:50, w:20, h:20},
    {id:"l_shoulder_back", x:40, y:50, w:20, h:20},
    {id:"r_forearm_back", x:140, y:70, w:20, h:30},
    {id:"l_forearm_back", x:40, y:70, w:20, h:30},
    {id:"r_thigh_back", x:75, y:130, w:25, h:50},
    {id:"l_thigh_back", x:100, y:130, w:25, h:50},
    {id:"r_calf_back", x:75, y:180, w:25, h:50},
    {id:"l_calf_back", x:100, y:180, w:25, h:50}
  ];

  shapes.forEach(s=>{
    const rect=document.createElementNS(svgNS,"rect");
    rect.setAttribute("x",s.x);
    rect.setAttribute("y",s.y);
    rect.setAttribute("width",s.w);
    rect.setAttribute("height",s.h);
    rect.setAttribute("stroke","#000");
    rect.setAttribute("fill", selectedZones.has(s.id) ? "#f00" : "#ccc");
    rect.style.cursor="pointer";
    rect.addEventListener("click",()=>{
      if(selectedZones.has(s.id)) selectedZones.delete(s.id);
      else selectedZones.add(s.id);
      renderBurnSVG();
      updateTotal();
    });
    svg.appendChild(rect);
  });

  container.appendChild(svg);
}

function updateTotal(){
  if(!currentBurnAge) return;
  let total=0;
  selectedZones.forEach(z=>{
    total += burnData[currentBurnAge][z] || 0;
  });
  document.getElementById("burnTotal").innerText = total.toFixed(1);
}
