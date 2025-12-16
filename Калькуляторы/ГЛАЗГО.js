const gcsData = [
    {label: "Открывание глаз",options: [{ text: "Произвольное", score: 4 },{ text: "На речевую команду", score: 3 },{ text: "На болевое раздражение", score: 2 },{ text: "Отсутствует", score: 1 }]},
    {label: "Наилучший речевой ответ",options: [{ text: "Ориентирован и контактен", score: 5 },{ text: "Бессвязная речь, спутанность", score: 4 },{ text: "Отдельные слова", score: 3 },{ text: "Нечленораздельные звуки", score: 2 },{ text: "Отсутствует", score: 1 }]},
    {label: "Наилучший двигательный ответ",options: [{ text: "Выполнение команды", score: 6 },{ text: "Локализация боли", score: 5 },{ text: "Отдёргивание конечности на боль", score: 4 },{ text: "Патологическое сгибание", score: 3 },{ text: "Патологическое разгибание", score: 2 },{ text: "Нет ответа", score: 1 }]}];

const gcsRows = document.getElementById("gcsRows");
const gcsTotalEl = document.getElementById("gcsTotal");
const gcsInfoEl = document.getElementById("gcsInfo");

// Генерация строк
gcsData.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "calc-row";

    const label = document.createElement("label");
    label.textContent = item.label;

    const select = document.createElement("select");
    select.className = "calc-select";
    select.dataset.index = index;

    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = "—";
    select.appendChild(empty);

    item.options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.score;
        option.textContent = opt.text;
        select.appendChild(option);
    });

    const score = document.createElement("div");
    score.className = "calc-score";
    score.textContent = "0";

    select.addEventListener("change", updateGCS);

    row.append(label, select, score);
    gcsRows.appendChild(row);
});

// Подсчёт
function updateGCS() {
    let total = 0;

    document.querySelectorAll("#gcsRows .calc-row").forEach(row => {
        const select = row.querySelector("select");
        const scoreEl = row.querySelector(".calc-score");
        const val = parseInt(select.value) || 0;

        scoreEl.textContent = val;
        total += val;
    });

    gcsTotalEl.textContent = total;
    updateGCSInfo(total);
}

// Интерпретация
function updateGCSInfo(score) {
    let text = "";

    if (score === 15) text = "Сознание ясное";
    else if (score >= 13) text = "Оглушение";
    else if (score >= 9) text = "Сопор";
    else if (score >= 3) text = "Кома";

    gcsInfoEl.textContent = text;
    gcsInfoEl.style.display = text ? "block" : "none";
}
