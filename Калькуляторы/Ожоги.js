/* =========================
   🔥 КАЛЬКУЛЯТОР ОЖОГОВ
   ========================= */

const burnsData = [
  {label:"Голова", values:[19,17,13,10,7]},
  {label:"Шея", values:[2,2,2,2,2]},
  {label:"Грудь", values:[13,13,13,13,13]},
  {label:"Спина", values:[13,13,13,13,13]},
  {label:"Правая ягодица", values:[2.5,2.5,2.5,2.5,2.5]},
  {label:"Левая ягодица", values:[2.5,2.5,2.5,2.5,2.5]},
  {label:"Промежность", values:[1,1,1,1,1]},
  {label:"Правое плечо", values:[3,3,3,3,3]},
  {label:"Левое плечо", values:[3,3,3,3,3]},
  {label:"Правое предплечье", values:[4,4,4,4,4]},
  {label:"Левое предплечье", values:[4,4,4,4,4]},
  {label:"Правая кисть", values:[2.5,2.5,2.5,2.5,2.5]},
  {label:"Левая кисть", values:[2.5,2.5,2.5,2.5,2.5]},
  {label:"Правое бедро", values:[5.5,6.5,8.5,8.5,9.5]},
  {label:"Левое бедро", values:[5.5,6.5,8.5,8.5,9.5]},
  {label:"Правая голень", values:[5,5,5.5,6,7]},
  {label:"Левая голень", values:[5,5,5.5,6,7]},
  {label:"Правая стопа", values:[3.5,3.5,3.5,3.5,3.5]},
  {label:"Левая стопа", values:[3.5,3.5,3.5,3.5,3.5]}
];

const ageLabels = [
  "0–1 год",
  "1–4 года",
  "5–9 лет",
  "10–15 лет",
  "Взрослый"
];

/* ОТРИСОВКА */
function renderBurnsCalc() {
  const container = document.getElementById("burnsRows");
  container.innerHTML = "";

  burnsData.forEach((item, i) => {
    const row = document.createElement("div");
    row.className = "calc-row";

    let options = `<option value="">—</option>`;
    item.values.forEach((val, idx) => {
      options += `<option value="${val}">${ageLabels[idx]}</option>`;
    });

    row.innerHTML = `
      <div class="calc-label">${item.label}</div>
      <select class="calc-select" data-i="${i}">
        ${options}
      </select>
      <div class="calc-points" id="burnsPoint${i}">0</div>
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
    const sel = document.querySelector(`select[data-i="${i}"]`);
    const val = sel && sel.value !== "" ? parseFloat(sel.value) : 0;
    document.getElementById(`burnsPoint${i}`).textContent = val;
    total += val;
  });

  document.getElementById("burnsTotal").textContent =
    Number.isInteger(total) ? total : total.toFixed(1);
}

/* ИНИЦИАЛИЗАЦИЯ */
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("burnsRows")) {
    renderBurnsCalc();
  }
});