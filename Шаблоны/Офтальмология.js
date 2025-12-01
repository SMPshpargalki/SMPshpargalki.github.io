// Создаем массив кнопок и текста
const ОфтальмологияTemplates = [

{ text: "Глаукома", modal: `тут текст` },
{ text: "Катаракта", modal: `текст` },
{ text: "Конъюнктивит", modal: `текст` },
{ text: "Окклюзия сосудов сетчатки глаза", modal: `текст` },
{ text: "Отслойка сетчатки глаза", modal: `текст` },
{ text: "Фотокератит", modal: `текст` }];

// Создаем кнопки после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("Офтальмология");

    if (!container) {
        console.error("Container #Офтальмология не найден.");
        return;
    }

    ОфтальмологияTemplates.forEach(item => {
        const btn = document.createElement("button");
        btn.className = "child-btn";
        btn.textContent = item.text;
        btn.onclick = () => openModal(item.modal);
        container.appendChild(btn);
    });
});
