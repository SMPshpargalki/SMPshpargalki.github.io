// Создаем массив кнопок и текста
const ПедиатрияTemplates = [
       
{ text: "Беспризорный", modal: `тут текст` },
{ text: "Геморрагический васкулит", modal: `текст` },
{ text: "Инвагинация", modal: `текст` },
{ text: "Кишечная колика", modal: `текст` },
{ text: "Ларингит", modal: `текст` },
{ text: "Недоношенный (роды дома)", modal: `текст` },
{ text: "Неонатальная желтуха", modal: `текст` },
{ text: "Омфалит", modal: `текст` },
{ text: "Пилороспазм", modal: `текст` },
{ text: "Полиомиелит", modal: `текст` },
{ text: "Реакция на иммунизацию", modal: `текст` },
{ text: "Синдром прорезывания зубов", modal: `текст` },
{ text: "Срыгивание новорожденного", modal: `текст` },
{ text: "Тромбоцитопеническая пурпура", modal: `текст` }];


// Создаем кнопки после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("Педиатрия");

    if (!container) {
        console.error("Container #Педиатрия не найден.");
        return;
    }

    ПедиатрияTemplates.forEach(item => {
        const btn = document.createElement("button");
        btn.className = "child-btn";
        btn.textContent = item.text;
        btn.onclick = () => openModal(item.modal);
        container.appendChild(btn);
    });
});
