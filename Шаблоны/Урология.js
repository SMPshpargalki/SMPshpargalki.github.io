// Создаем массив кнопок и текста
const УрологияTemplates = [
       
{ text: "Баланопостит", modal: `тут текст` },
{ text: "Гематурия", modal: `текст` },
{ text: "Гиперплазия предстательной железы", modal: `текст` },
{ text: "Задержка мочи", modal: `текст` },
{ text: "Кровотечение после обрезания", modal: `текст` },
{ text: "Несостоятельность нефростомы", modal: `текст` },
{ text: "Несостоятельность стента", modal: `текст` },
{ text: "Несостоятельность цистостомы", modal: `текст` },
{ text: "Описание нефростомы", modal: `текст` },
{ text: "Описание уретрального катетера", modal: `текст` },
{ text: "Описание цистостомы", modal: `текст` },
{ text: "Орхоэпидидимит", modal: `текст` },
{ text: "Острая почечная недостаточность", modal: `текст` },
{ text: "Парафимоз", modal: `текст` },
{ text: "Перекрут гидатиды яичка", modal: `текст` },
{ text: "Пиелонефрит", modal: `текст` },
{ text: "Почечная колика", modal: `текст` },
{ text: "Приапизм", modal: `текст` },
{ text: "Простатит", modal: `текст` },
{ text: "Фимоз", modal: `текст` },
{ text: "Цистит", modal: `текст` }];


// Создаем кнопки после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("Урология");

    if (!container) {
        console.error("Container #Урология не найден.");
        return;
    }

    УрологияTemplates.forEach(item => {
        const btn = document.createElement("button");
        btn.className = "child-btn";
        btn.textContent = item.text;
        btn.onclick = () => openModal(item.modal);
        container.appendChild(btn);
    });
});
