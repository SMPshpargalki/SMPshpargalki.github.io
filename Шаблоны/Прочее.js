// Создаем массив кнопок и текста
const ПрочееTemplates = [
       
{ text: "Гемодиализ", modal: `тут текст` },
{ text: "Здоров на момент осмотра", modal: `текст` },
{ text: "Подозрение на отравление", modal: `текст` },
{ text: "Странное и необъяснимое поведение", modal: `текст` },
{ text: "Употребление алкоголя", modal: `текст` }];


// Создаем кнопки после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("Прочее");

    if (!container) {
        console.error("Container #Прочее не найден.");
        return;
    }

    ПрочееTemplates.forEach(item => {
        const btn = document.createElement("button");
        btn.className = "child-btn";
        btn.textContent = item.text;
        btn.onclick = () => openModal(item.modal);
        container.appendChild(btn);
    });
});
