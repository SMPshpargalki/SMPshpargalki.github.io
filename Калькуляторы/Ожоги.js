// =========================
// КАЛЬКУЛЯТОР ПЛОЩАДИ ОЖОГОВ
// =========================

const burnData = [
    { label: "Голова", values: { "0-1 год": 19, "1-4 года": 17, "5-9 лет": 13, "10-15 лет": 10, "Взрослый": 7 } },
    { label: "Шея", values: { "0-1 год": 2, "1-4 года": 2, "5-9 лет": 2, "10-15 лет": 2, "Взрослый": 2 } },
    { label: "Грудь", values: { "0-1 год": 13, "1-4 года": 13, "5-9 лет": 13, "10-15 лет": 13, "Взрослый": 13 } },
    { label: "Спина", values: { "0-1 год": 13, "1-4 года": 13, "5-9 лет": 13, "10-15 лет": 13, "Взрослый": 13 } },
    { label: "Правая ягодица", values: { "0-1 год": 2.5, "1-4 года": 2.5, "5-9 лет": 2.5, "10-15 лет": 2.5, "Взрослый": 2.5 } },
    { label: "Левая ягодица", values: { "0-1 год": 2.5, "1-4 года": 2.5, "5-9 лет": 2.5, "10-15 лет": 2.5, "Взрослый": 2.5 } },
    { label: "Промежность", values: { "0-1 год": 1, "1-4 года": 1, "5-9 лет": 1, "10-15 лет": 1, "Взрослый": 1 } },
    { label: "Правое плечо", values: { "0-1 год": 3, "1-4 года": 3, "5-9 лет": 3, "10-15 лет": 3, "Взрослый": 3 } },
    { label: "Левое плечо", values: { "0-1 год": 3, "1-4 года": 3, "5-9 лет": 3, "10-15 лет": 3, "Взрослый": 3 } },
    { label: "Правое предплечье", values: { "0-1 год": 4, "1-4 года": 4, "5-9 лет": 4, "10-15 лет": 4, "Взрослый": 4 } },
    { label: "Левое предплечье", values: { "0-1 год": 4, "1-4 года": 4, "5-9 лет": 4, "10-15 лет": 4, "Взрослый": 4 } },
    { label: "Правая кисть", values: { "0-1 год": 2.5, "1-4 года": 2.5, "5-9 лет": 2.5, "10-15 лет": 2.5, "Взрослый": 2.5 } },
    { label: "Левая кисть", values: { "0-1 год": 2.5, "1-4 года": 2.5, "5-9 лет": 2.5, "10-15 лет": 2.5, "Взрослый": 2.5 } },
    { label: "Правое бедро", values: { "0-1 год": 5.5, "1-4 года": 6.5, "5-9 лет": 8.5, "10-15 лет": 8.5, "Взрослый": 9.5 } },
    { label: "Левое бедро", values: { "0-1 год": 5.5, "1-4 года": 6.5, "5-9 лет": 8.5, "10-15 лет": 8.5, "Взрослый": 9.5 } },
    { label: "Правая голень", values: { "0-1 год": 5, "1-4 года": 5, "5-9 лет": 5.5, "10-15 лет": 6, "Взрослый": 7 } },
    { label: "Левая голень", values: { "0-1 год": 5, "1-4 года": 5, "5-9 лет": 5.5, "10-15 лет": 6, "Взрослый": 7 } },
    { label: "Правая стопа", values: { "0-1 год": 3.5, "1-4 года": 3.5, "5-9 лет": 3.5, "10-15 лет": 3.5, "Взрослый": 3.5 } },
    { label: "Левая стопа", values: { "0-1 год": 3.5, "1-4 года": 3.5, "5-9 лет": 3.5, "10-15 лет": 3.5, "Взрослый": 3.5 } }
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