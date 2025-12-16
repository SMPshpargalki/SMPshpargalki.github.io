// =========================
// ШКАЛА ИНСУЛЬТА: Лицо, руки, кисти
// =========================

const strokeData = [
    {
        label: "Асимметрия лица",
        options: [
            { text: "Нет асимметрии или минимальная асимметрия лица", score: 0 },
            { text: "Частичный или полный паралич мимической мускулатуры в нижней трети лица с одной стороны или полное отсутствие движений мимической мускулатуры в верхних и нижних отделах лица с одной стороны", score: 1 }
        ]
    },
    {
        label: "Удержание рук",
        options: [
            { text: "Руки удерживаются под углом 90° или 45° без малейшего опускания", score: 0 },
            { text: "Одна рука медленно опускается, но производит некоторое сопротивление силе тяжести", score: 1 },
            { text: "Рука быстро падает без сопротивления силе тяжести", score: 2 }
        ]
    },
    {
        label: "Сжимание кисти",
        options: [
            { text: "Сжимает симметрично, сила не снижена", score: 0 },
            { text: "С одной стороны сжимает слабее", score: 1 },
            { text: "Не сжимает, движения в кисти отсутствуют или имеют место минимальные движения", score: 2 }
        ]
    }
];

const strokeRows = document.getElementById("strokeRows");
const strokeTotalEl = document.getElementById("strokeTotal");

// Генерация строк
strokeData.forEach((item, index) => {
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

    item.options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.score;
        option.textContent = opt.text;
        select.appendChild(option);
    });

    const scoreEl = document.createElement("div");
    scoreEl.className = "calc-score";
    scoreEl.textContent = "0";

    select.addEventListener("change", updateStroke);

    row.append(label, select, scoreEl);
    strokeRows.appendChild(row);
});

// Подсчёт
function updateStroke() {
    let total = 0;

    document.querySelectorAll("#strokeRows .calc-row").forEach(row => {
        const select = row.querySelector("select");
        const scoreEl = row.querySelector(".calc-score");
        const val = parseInt(select.value) || 0;

        scoreEl.textContent = val;
        total += val;
    });

    strokeTotalEl.textContent = total;
}