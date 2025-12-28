const burnData = {
  "0-1": { "head_front":9.5,"head_back":9.5,"neck_front":1,"neck_back":1,"chest_front":8,"chest_back":8,"abdomen":7,"back":4,"right_butt":2,"left_butt":2,"perineum":1,"r_shoulder_front":1.5,"r_shoulder_back":1.5,"l_shoulder_front":1.5,"l_shoulder_back":1.5,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand":2.5,"l_hand":2.5,"r_thigh_front":2.25,"r_thigh_back":2.25,"l_thigh_front":2.25,"l_thigh_back":2.25,"r_calf_front":3.5,"r_calf_back":3.5,"l_calf_front":3.5,"l_calf_back":3.5,"r_foot":2.5,"l_foot":2.5 },
  "1-4": { "head_front":8.5,"head_back":8.5,"neck_front":1,"neck_back":1,"chest_front":8,"chest_back":8,"abdomen":7,"back":4,"right_butt":2,"left_butt":2,"perineum":1,"r_shoulder_front":1.5,"r_shoulder_back":1.5,"l_shoulder_front":1.5,"l_shoulder_back":1.5,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand":2.5,"l_hand":2.5,"r_thigh_front":3.25,"r_thigh_back":3.25,"l_thigh_front":3.25,"l_thigh_back":3.25,"r_calf_front":3.25,"r_calf_back":3.25,"l_calf_front":3.25,"l_calf_back":3.25,"r_foot":2,"l_foot":2 },
  "5-9": { "head_front":6.5,"head_back":6.5,"neck_front":1,"neck_back":1,"chest_front":8,"chest_back":8,"abdomen":7,"back":4,"right_butt":2,"left_butt":2,"perineum":1,"r_shoulder_front":1.5,"r_shoulder_back":1.5,"l_shoulder_front":1.5,"l_shoulder_back":1.5,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand":2.5,"l_hand":2.5,"r_thigh_front":4,"r_thigh_back":4,"l_thigh_front":4,"l_thigh_back":4,"r_calf_front":3.5,"r_calf_back":3.5,"l_calf_front":3.5,"l_calf_back":3.5,"r_foot":2,"l_foot":2 },
  "10-15": { "head_front":4,"head_back":4,"neck_front":1,"neck_back":1,"chest_front":9,"chest_back":9,"abdomen":9,"back":4,"right_butt":2,"left_butt":2,"perineum":1,"r_shoulder_front":1.5,"r_shoulder_back":1.5,"l_shoulder_front":1.5,"l_shoulder_back":1.5,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand":2,"l_hand":2,"r_thigh_front":4,"r_thigh_back":4,"l_thigh_front":4,"l_thigh_back":4,"r_calf_front":3.5,"r_calf_back":3.5,"l_calf_front":3.5,"l_calf_back":3.5,"r_foot":3,"l_foot":3 },
  "adult": { "head_front":3.5,"head_back":3.5,"neck_front":1,"neck_back":1,"chest_front":9,"chest_back":9,"abdomen":9,"back":5,"right_butt":2,"left_butt":2,"perineum":1,"r_shoulder_front":1.5,"r_shoulder_back":1.5,"l_shoulder_front":1.5,"l_shoulder_back":1.5,"r_forearm_front":2,"r_forearm_back":2,"l_forearm_front":2,"l_forearm_back":2,"r_hand":2,"l_hand":2,"r_thigh_front":4,"r_thigh_back":4,"l_thigh_front":4,"l_thigh_back":4,"r_calf_front":3.5,"r_calf_back":3.5,"l_calf_front":3.5,"l_calf_back":3.5,"r_foot":3,"l_foot":3 }
};

let currentBurnAge = null;
let currentView = "front";

document.getElementById("burnAgeSelect").addEventListener("change",(e)=>{
    currentBurnAge = e.target.value;
    renderBurnSVG();
    document.getElementById("burnResult").innerText = "Выберите зоны ожога на человечке.";
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

    // Зоны фронт/спина
    const zonesFront=["head_front","neck_front","chest_front","abdomen","r_shoulder_front","l_shoulder_front","r_forearm_front","l_forearm_front","r_hand","l_hand","r_thigh_front","l_thigh_front","r_calf_front","l_calf_front","r_foot","l_foot","right_butt","left_butt","perineum"];
    const zonesBack=["head_back","neck_back","chest_back","back","r_shoulder_back","l_shoulder_back","r_forearm_back","l_forearm_back","r_thigh_back","l_thigh_back","r_calf_back","l_calf_back"];

    const zones=currentView==="front"?zonesFront:zonesBack;

    zones.forEach((zone,i)=>{
        const rect=document.createElementNS(svgNS,"rect");
        rect.setAttribute("x",50);
        rect.setAttribute("y",20+i*18);
        rect.setAttribute("width",100);
        rect.setAttribute("height",16);
        rect.setAttribute("fill","#ccc");
        rect.setAttribute("stroke","#000");
        rect.style.cursor="pointer";
        rect.addEventListener("click",()=>{
            const percent=burnData[currentBurnAge][zone];
            document.getElementById("burnResult").innerText=`${zone.replace(/_/g," ")}: ${percent}% ожога`;
        });
        svg.appendChild(rect);
    });

    container.appendChild(svg);
}
