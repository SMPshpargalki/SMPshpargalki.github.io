// =========================
// ШКАЛА WELLS (ТЭЛА)
// =========================

const wellsData = [
    { label: "Возраст старше 65 лет", score: 1 },
    { label: "Тромбоз глубоких вен или ТЭЛА в анамнезе", score: 3 },
    { label: "Хирургическое вмешательство или травма в течение 1 месяца", score: 2 },
    { label: "Активная злокачественная опухоль", score: 2 },
    { label: "Боль в одной ноге", score: 3 },
    { label: "Кровохарканье", score: 2 },
    { label: "ЧСС 75–94 в минуту", score: 3 },
    { label: "ЧСС ≥ 95 в минуту", score: 5 },
    { label: "Боль при пальпации или отёк одной из нижних конечностей", score: 4 }
];

const wellsRows = document.getElementById("wellsRows");
const wellsTotalEl = document.getElementById("wellsTotal");
const wellsInfoEl = document.getElementById("wellsInfo");

// Генерация строк
wellsData.forEach(item => {
    const row = document.createElement("div");
    row.className = "calc-row";

    const label = document.createElement("label");
    label.textContent = item.label;

    const select = document.createElement("select");
    select.className = "calc-select";

    const optEmpty = document.createElement("option");
    optEmpty.value = "";
    optEmpty.textContent = "—";
    select.appendChild(optEmpty);

    const optNo = document.createElement("option");
    optNo.value = 0;
    optNo.textContent = "Нет";
    select.appendChild(optNo);

    const optYes = document.createElement("option");
    optYes.value = item.score;
    optYes.textContent = "Да";
    select.appendChild(optYes);

    const scoreEl = document.createElement("div");
    scoreEl.className = "calc-score";
    scoreEl.textContent = "0";

    select.addEventListener("change", updateWells);

    row.append(label, select, scoreEl);
    wellsRows.appendChild(row);
});

// Подсчёт
function updateWells() {
    let total = 0;

    document.querySelectorAll("#wellsRows .calc-row").forEach(row => {
        const select = row.querySelector("select");
        const scoreEl = row.querySelector(".calc-score");
        const value = parseInt(select.value) || 0;

        scoreEl.textContent = value;
        total += value;
    });

    wellsTotalEl.textContent = total;
    updateWellsInfo(total);
}

// Интерпретация
function updateWellsInfo(score) {
    let text = "";

    if (score <= 3) {
        text = "Низкая вероятность ТЭЛА";
    } else if (score <= 10) {
        text = "Средняя вероятность ТЭЛА";
    } else {
        text = "Высокая вероятность ТЭЛА";
    }

    wellsInfoEl.textContent = text;
    wellsInfoEl.style.display = "block";
}