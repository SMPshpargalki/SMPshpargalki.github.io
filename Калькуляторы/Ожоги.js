// =========================
// КАЛЬКУЛЯТОР ПЛОЩАДИ ОЖОГОВ
// =========================

const burnsData = [
  { label:"Голова", options:[
    {text:"0–1 год", value:19},
    {text:"1–4 года", value:17},
    {text:"5–9 лет", value:13},
    {text:"10–15 лет", value:10},
    {text:"Взрослый", value:7}
  ]},

  { label:"Шея", options:[
    {text:"0–1 год", value:2},
    {text:"1–4 года", value:2},
    {text:"5–9 лет", value:2},
    {text:"10–15 лет", value:2},
    {text:"Взрослый", value:2}
  ]},

  { label:"Грудь", options:[
    {text:"0–1 год", value:13},
    {text:"1–4 года", value:13},
    {text:"5–9 лет", value:13},
    {text:"10–15 лет", value:13},
    {text:"Взрослый", value:13}
  ]},

  { label:"Спина", options:[
    {text:"0–1 год", value:13},
    {text:"1–4 года", value:13},
    {text:"5–9 лет", value:13},
    {text:"10–15 лет", value:13},
    {text:"Взрослый", value:13}
  ]},

  { label:"Правая ягодица", options:[
    {text:"0–1 год", value:2.5},
    {text:"1–4 года", value:2.5},
    {text:"5–9 лет", value:2.5},
    {text:"10–15 лет", value:2.5},
    {text:"Взрослый", value:2.5}
  ]},

  { label:"Левая ягодица", options:[
    {text:"0–1 год", value:2.5},
    {text:"1–4 года", value:2.5},
    {text:"5–9 лет", value:2.5},
    {text:"10–15 лет", value:2.5},
    {text:"Взрослый", value:2.5}
  ]},

  { label:"Промежность", options:[
    {text:"0–1 год", value:1},
    {text:"1–4 года", value:1},
    {text:"5–9 лет", value:1},
    {text:"10–15 лет", value:1},
    {text:"Взрослый", value:1}
  ]},

  { label:"Правое плечо", options:[
    {text:"0–1 год", value:3},
    {text:"1–4 года", value:3},
    {text:"5–9 лет", value:3},
    {text:"10–15 лет", value:3},
    {text:"Взрослый", value:3}
  ]},

  { label:"Левое плечо", options:[
    {text:"0–1 год", value:3},
    {text:"1–4 года", value:3},
    {text:"5–9 лет", value:3},
    {text:"10–15 лет", value:3},
    {text:"Взрослый", value:3}
  ]},

  { label:"Правое предплечье", options:[
    {text:"0–1 год", value:4},
    {text:"1–4 года", value:4},
    {text:"5–9 лет", value:4},
    {text:"10–15 лет", value:4},
    {text:"Взрослый", value:4}
  ]},

  { label:"Левое предплечье", options:[
    {text:"0–1 год", value:4},
    {text:"1–4 года", value:4},
    {text:"5–9 лет", value:4},
    {text:"10–15 лет", value:4},
    {text:"Взрослый", value:4}
  ]},

  { label:"Правая кисть", options:[
    {text:"0–1 год", value:2.5},
    {text:"1–4 года", value:2.5},
    {text:"5–9 лет", value:2.5},
    {text:"10–15 лет", value:2.5},
    {text:"Взрослый", value:2.5}
  ]},

  { label:"Левая кисть", options:[
    {text:"0–1 год", value:2.5},
    {text:"1–4 года", value:2.5},
    {text:"5–9 лет", value:2.5},
    {text:"10–15 лет", value:2.5},
    {text:"Взрослый", value:2.5}
  ]},

  { label:"Правое бедро", options:[
    {text:"0–1 год", value:5.5},
    {text:"1–4 года", value:6.5},
    {text:"5–9 лет", value:8.5},
    {text:"10–15 лет", value:8.5},
    {text:"Взрослый", value:9.5}
  ]},

  { label:"Левое бедро", options:[
    {text:"0–1 год", value:5.5},
    {text:"1–4 года", value:6.5},
    {text:"5–9 лет", value:8.5},
    {text:"10–15 лет", value:8.5},
    {text:"Взрослый", value:9.5}
  ]},

  { label:"Правая голень", options:[
    {text:"0–1 год", value:5},
    {text:"1–4 года", value:5},
    {text:"5–9 лет", value:5.5},
    {text:"10–15 лет", value:6},
    {text:"Взрослый", value:7}
  ]},

  { label:"Левая голень", options:[
    {text:"0–1 год", value:5},
    {text:"1–4 года", value:5},
    {text:"5–9 лет", value:5.5},
    {text:"10–15 лет", value:6},
    {text:"Взрослый", value:7}
  ]},

  { label:"Правая стопа", options:[
    {text:"0–1 год", value:3.5},
    {text:"1–4 года", value:3.5},
    {text:"5–9 лет", value:3.5},
    {text:"10–15 лет", value:3.5},
    {text:"Взрослый", value:3.5}
  ]},

  { label:"Левая стопа", options:[
    {text:"0–1 год", value:3.5},
    {text:"1–4 года", value:3.5},
    {text:"5–9 лет", value:3.5},
    {text:"10–15 лет", value:3.5},
    {text:"Взрослый", value:3.5}
  ]}
];

const burnRows = document.getElementById("burnRows");
const burnTotalEl = document.getElementById("burnTotal");

// Создание строк калькулятора
burnData.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "calc-row";

    const label = document.createElement("label");
    label.textContent = item.label;

    const select = document.createElement("select");
    select.className = "calc-select";

    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = "—";
    select.appendChild(empty);

    Object.keys(item.values).forEach(age => {
        const option = document.createElement("option");
        option.value = item.values[age];
        option.textContent = `${age} — ${item.values[age]}%`;
        select.appendChild(option);
    });

    const scoreEl = document.createElement("div");
    scoreEl.className = "calc-score";
    scoreEl.textContent = "0";

    select.addEventListener("change", updateBurn);

    row.append(label, select, scoreEl);
    burnRows.appendChild(row);
});

// Подсчёт общей площади
function updateBurn() {
    let total = 0;

    document.querySelectorAll("#burnRows .calc-row").forEach(row => {
        const select = row.querySelector("select");
        const scoreEl = row.querySelector(".calc-score");
        const val = parseFloat(select.value) || 0;

        scoreEl.textContent = val + "%";
        total += val;
    });

    burnTotalEl.textContent = total.toFixed(1) + "%";
}