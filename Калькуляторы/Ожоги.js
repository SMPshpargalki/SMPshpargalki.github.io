/* =========================
   🔥 КАЛЬКУЛЯТОР ОЖОГОВ
   ========================= */

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

/* ОТРИСОВКА */
function renderBurnsCalc() {
  const container = document.getElementById("burnsRows");
  container.innerHTML = "";

  burnsData.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "calc-row";

    row.innerHTML = `
      <div class="calc-label">${item.label}</div>
      <select class="calc-select" data-index="${index}">
        <option value="">—</option>
        ${item.options.map(o =>
          `<option value="${o.value}">${o.text}</option>`
        ).join("")}
      </select>
      <div class="calc-points" id="burnsPoint${index}">0</div>
    `;

    container.appendChild(row);
  });

  container.querySelectorAll("select").forEach(sel => {
    sel.addEventListener("change", updateBurnsTotal);
  });
}

/* ПОДСЧЁТ */
function updateBurnsTotal() {
  let total = 0;

  burnsData.forEach((_, i) => {
    const select = document.querySelector(`select[data-index="${i}"]`);
    const value = parseFloat(select.value) || 0;
    document.getElementById(`burnsPoint${i}`).textContent = value;
    total += value;
  });

  document.getElementById("burnsTotal").textContent =
    total % 1 === 0 ? total : total.toFixed(1);
}

/* ИНИЦИАЛИЗАЦИЯ */
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("burnsRows")) {
    renderBurnsCalc();
  }
});