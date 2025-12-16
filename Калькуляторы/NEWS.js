const newsData = [
  {label:"Частота дыхания за 1 минуту", options:[{text:"≤8", value:3},{text:"9–11", value:1},{text:"12–20", value:0},{text:"21–24", value:2},{text:"≥25", value:3}]},
  {label:"Насыщение крови кислородом (SpO₂)", options:[{text:"≤91 %", value:3},{text:"92–93 %", value:2},{text:"94–95 %", value:1},{text:"≥96 %", value:0}]},
  {label:"Необходимость инсуффляции кислорода", options:[{text:"Да", value:2},{text:"Нет", value:0}]},
  {label:"Температура тела (°C)", options:[{text:"≤35,0", value:3},{text:"35,1 – 36,0", value:1},{text:"36,1 – 38,0", value:0},{text:"38,1 – 39,0", value:1},{text:"≥39,1", value:2}]},
  {label:"Систолическое АД", options:[{text:"≤90", value:3},{text:"91 – 100", value:2},{text:"101 – 110", value:1},{text:"111 – 219", value:0},{text:"≥220", value:3}]},
  {label:"Частота сердечных сокращений (ЧСС)", options:[{text:"≤40", value:3},{text:"41 – 50", value:1},{text:"51 – 90", value:0},{text:"91 – 110", value:1},{text:"111 – 130", value:2},{text:"≥131", value:3}]},
  {label:"Изменение уровня сознания", options:[{text:"Нет", value:0},{text:"Есть", value:3}]}];

function generateNewsCalc(){
  const container = document.getElementById("newsRows");
  container.innerHTML = "";
  newsData.forEach(item=>{
    const row = document.createElement("div");
    row.className = "calc-row";

    const label = document.createElement("label");
    label.textContent = item.label;

    const select = document.createElement("select");
    select.innerHTML = `<option value="">Выберите</option>` +
      item.options.map(o=>`<option value="${o.value}">${o.text}</option>`).join("");

    const score = document.createElement("div");
    score.className = "calc-score";
    score.textContent = "0";

    select.addEventListener("change", ()=>{
      score.textContent = select.value || 0;
      const total = Array.from(container.querySelectorAll(".calc-score"))
        .reduce((sum,s)=>sum+parseInt(s.textContent),0);
      document.getElementById("newsTotal").textContent = total;
    });

    row.appendChild(label);
    row.appendChild(select);
    row.appendChild(score);
    container.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", generateNewsCalc);
