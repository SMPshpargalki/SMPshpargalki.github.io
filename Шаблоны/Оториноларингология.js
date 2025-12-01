// Создаем массив кнопок и текста
const ОториноларингологияTemplates = [

{ text: "Кровотечение после тонзиллэктомии", modal: `тут текст` },
{ text: "Носовое кровотечение", modal: `текст` },
{ text: "Носовое кровотечение (состоявшиеся)", modal: `текст` },
{ text: "Отит", modal: `текст` },
{ text: "Отит гнойный", modal: `текст` },
{ text: "Паратозилярный абсцесс", modal: `текст` },
{ text: "Паротит", modal: `текст` },
{ text: "Ринит", modal: `текст` },
{ text: "Серная пробка", modal: `текст` },
{ text: "Сиалоаденит", modal: `текст` },
{ text: "Синусит", modal: `текст` },
{ text: "Фарингит", modal: `текст` },
{ text: "Эпиглоттит", modal: `текст` }];


// Создаем кнопки после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("Оториноларингология");

    if (!container) {
        console.error("Container #Оториноларингология не найден.");
        return;
    }

    ОториноларингологияTemplates.forEach(item => {
        const btn = document.createElement("button");
        btn.className = "child-btn";
        btn.textContent = item.text;
        btn.onclick = () => openModal(item.modal);
        container.appendChild(btn);
    });
});
