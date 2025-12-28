/* ===== ТАБЛИЦА ВДМ ===== */
const vdmTable = [
    { min: 8,  max: 9,  vdm: "8–9 см" },
    { min: 10, max: 11, vdm: "10–11 см" },
    { min: 12, max: 13, vdm: "10–11 см" },
    { min: 14, max: 15, vdm: "12–13 см" },
    { min: 16, max: 17, vdm: "14–19 см" },
    { min: 18, max: 19, vdm: "16–21 см" },
    { min: 20, max: 21, vdm: "18–24 см" },
    { min: 22, max: 23, vdm: "21–25 см" },
    { min: 24, max: 25, vdm: "23–27 см" },

    { min: 26, max: 27, vdm: "25–28 см" },
    { min: 28, max: 29, vdm: "26–31 см" },
    { min: 30, max: 31, vdm: "29–32 см" },
    { min: 32, max: 33, vdm: "31–33 см" },
    { min: 34, max: 35, vdm: "32–33 см" },
    { min: 36, max: 37, vdm: "32–37 см" },
    { min: 38, max: 39, vdm: "35–38 см" },
    { min: 40, max: 41, vdm: "34–35 см" }
];

function getVDM(weeks) {
    const row = vdmTable.find(item => weeks >= item.min && weeks <= item.max);
    return row ? row.vdm : "нет данных";
}

/* ===== КАЛЬКУЛЯТОР СРОКА БЕРЕМЕННОСТИ ===== */
document.getElementById("calcPreg").addEventListener("click", function () {

    const lmpValue = document.getElementById("lmpDate").value;
    if (!lmpValue) {
        alert("Пожалуйста, выберите дату.");
        return;
    }

    const lmp = new Date(lmpValue + "T00:00:00");
    const today = new Date();
    const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const diffMs = now - lmp;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    /* ПДР = LMP + 280 дней */
    const due = new Date(lmp);
    due.setDate(due.getDate() + 280);

    function formatDate(d) {
        const dd = String(d.getDate()).padStart(2, "0");
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const yyyy = d.getFullYear();
        return dd + "." + mm + "." + yyyy;
    }

    /* ВДМ */
    const vdm = getVDM(weeks);

    /* ВЫВОД */
    document.getElementById("pregWeeks").innerText =
        "Срок: " + weeks + " недель" + (days > 0 ? " " + days + " дней" : "");

    document.getElementById("pregDue").innerText =
        "Предполагаемая дата родов: " + formatDate(due);

    document.getElementById("pregVDM").innerText =
        "Высота стояния дна матки: " + vdm;

    document.getElementById("pregResult").style.display = "block";
});
