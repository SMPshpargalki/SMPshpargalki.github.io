// Создаем массив кнопок и текста
const ТерапияTemplates = [
       
{ text: "Аллергическая крапивница", modal: `тут текст` },
{ text: "Аллергическая крапивница. Генерализованная форма", modal: `текст` },
{ text: "Анемия", modal: `текст` },
{ text: "Артрит", modal: `текст` },
{ text: "Артроз", modal: `текст` },
{ text: "Бронхиальная астма", modal: `текст` },
{ text: "Бронхиальная астма. Астматический статус", modal: `текст` },
{ text: "Гидроторакс", modal: `текст` },
{ text: "Гипотиреоз", modal: `текст` },
{ text: "Икота", modal: `текст` },
{ text: "Кахексия", modal: `текст` },
{ text: "Коксартроз", modal: `текст` },
{ text: "Кровохарканье", modal: `текст` },
{ text: "Ангионевротический отек. Отек Квинке", modal: `текст` },
{ text: "Печеночная недостаточность", modal: `текст` },
{ text: "Подагра", modal: `текст` },
{ text: "Псориаз", modal: `текст` },
{ text: "Рак. Онкология", modal: `текст` },
{ text: "Раковая интоксикация. Онкология", modal: `текст` },
{ text: "Сахарный диабет. Гипергликемическое состояние", modal: `текст` },
{ text: "Сахарный диабет. Гипогликемическое состояние", modal: `текст` },
{ text: "Тиреотоксикоз", modal: `текст` },
{ text: "Хроническая обструктивная болезнь легких (ХОБЛ)", modal: `текст` },
{ text: "Цирроз печени", modal: `текст` },
{ text: "Эзофагит", modal: `текст` },
{ text: "Экзема", modal: `текст` },
{ text: "Эмфизема легкого", modal: `текст` }];


// Создаем кнопки после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("Терапия");

    if (!container) {
        console.error("Container #Терапия не найден.");
        return;
    }

    ТерапияTemplates.forEach(item => {
        const btn = document.createElement("button");
        btn.className = "child-btn";
        btn.textContent = item.text;
        btn.onclick = () => openModal(item.modal);
        container.appendChild(btn);
    });
});
