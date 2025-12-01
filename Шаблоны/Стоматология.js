// Создаем массив кнопок и текста
const СтоматологияTemplates = [

{ text: "Альвеолит", modal: `тут текст` },
{ text: "Гингивит", modal: `текст` },
{ text: "Глоссит", modal: `текст` },
{ text: "Кровотечение после экстракции зуба", modal: `текст` },
{ text: "Пародонтит", modal: `текст` },
{ text: "Периостит", modal: `текст` },
{ text: "Пульпит", modal: `текст` },
{ text: "Стоматит", modal: `текст` }];


// Создаем кнопки после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("Стоматология");

    if (!container) {
        console.error("Container #Стоматология не найден.");
        return;
    }

    СтоматологияTemplates.forEach(item => {
        const btn = document.createElement("button");
        btn.className = "child-btn";
        btn.textContent = item.text;
        btn.onclick = () => openModal(item.modal);
        container.appendChild(btn);
    });
});
