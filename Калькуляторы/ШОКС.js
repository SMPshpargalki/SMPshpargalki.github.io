const shoxData = [
  {label:"Одышка", options:[{text:"нет", value:0},{text:"при нагрузке", value:1},{text:"в покое", value:2}]},
  {label:"Изменился ли за последнюю неделю вес", options:[{text:"нет", value:0},{text:"увеличился", value:1}]},
  {label:"Жалобы на перебои в работе сердца", options:[{text:"нет", value:0},{text:"есть", value:1}]},
  {label:"В каком положении находится в постели", options:[
    {text:"горизонтальном", value:0},
    {text:"с приподнятым головным концом (2+ подушки)", value:1},
    {text:"с приподнятым головным концом (2+ подушки) плюс просыпается от удушья", value:2},
    {text:"сидя", value:3}
  ]},
  {label:"Набухшие шейные вены", options:[
    {text:"нет", value:0},
    {text:"лежа", value:1},
    {text:"стоя", value:2}
  ]},
  {label:"Хрипы в легких", options:[
    {text:"Нет", value:0},
    {text:"нижние отделы (до 1/3)", value:1},
    {text:"до лопаток (до 2/3)", value:2},
    {text:"над всей поверхностью легких", value:3}
  ]},
  {label:"Наличие ритма галопа", options:[{text:"нет", value:0},{text:"есть", value:1}]},
  {label:"Печень", options:[
    {text:"не увеличена", value:0},
    {text:"увеличена до 5 см", value:1},
    {text:"увеличена более 5 см", value:2}
  ]},
  {label:"Отеки", options:[
    {text:"нет", value:0},
    {text:"пастозность", value:1},
    {text:"отеки", value:2},
    {text:"анасарка", value:3}
  ]},
  {label:"Уровень САД", options:[
    {text:">120", value:0},
    {text:"100–120", value:1},
    {text:"<100", value:2}
  ]}
];

function generateShoxCalc(){
  const container = document.getElementById("shoxRows");
  container.innerHTML = "";
  shoxData.forEach(item=>{
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
      document.getElementById("shoxTotal").textContent = total;

      let info = "";
      if(total <= 3) info="I ФК";
      else if(total <= 6) info="II ФК";
      else if(total <= 9) info="III ФК";
      else info="IV ФК";
      document.getElementById("shoxInfo").textContent = info;
    });

    row.appendChild(label);
    row.appendChild(select);
    row.appendChild(score);
    container.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", generateShoxCalc);
