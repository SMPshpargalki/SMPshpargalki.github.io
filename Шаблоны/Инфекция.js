// Создаем массив кнопок и текста
const ИнфекцияTemplates = [
       
{ text: "Ангина лакунарная", modal: `ТУТ БУДЕТ текст` },       
{ text: "Бешенство", modal: `текст` },   
{ text: "Боррелиоз (болезнь Лайма)", modal: `текст` },    
{ text: "Ботулизм", modal: `текст` }, 
{ text: "Бронхит", modal: `текст` },
{ text: "Бронхопневмония", modal: `текст` },
{ text: "Ветряная оспа", modal: `текст` },
{ text: "Вирусный гепатит", modal: `текст` },
{ text: "Вирусный энцефалит", modal: `текст` },
{ text: "Гайморит", modal: `текст` },
{ text: "Кишечная инфекция неясной этиологии (КИНЭ)", modal: `текст` },
{ text: "Кишечная инфекция неясной этиологии (КИНЭ) гемоколит", modal: `текст` },
{ text: "Кишечная инфекция неясной этиологии (КИНЭ) эксикоз 2 степени", modal: `текст` },
{ text: "Коклюш", modal: `текст` },
{ text: "Коксаки", modal: `текст` },
{ text: "Конъюнктивит", modal: `текст` },
{ text: "Корь", modal: `текст` },
{ text: "Лихорадка неясной этиологии", modal: `текст` },
{ text: "Менингококковая инфекция", modal: `текст` },
{ text: "Мононуклеоз", modal: `текст` },
{ text: "Опоясывающий лишай", modal: `текст` },
{ text: "Острая респираторная вирусная инфекция (ОРВИ)", modal: `текст` },
{ text: "Педикулез", modal: `текст` },
{ text: "Полиомиелит", modal: `текст` },
{ text: "Рожистое воспаление", modal: `текст` },
{ text: "Сальмонеллёз", modal: `текст` },
{ text: "Скарлатина", modal: `текст` },
{ text: "Столбняк", modal: `текст` }];


// Создаем кнопки после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("Инфекция");

    if (!container) {
        console.error("Container #Инфекция не найден.");
        return;
    }

   ИнфекцияTemplates.forEach(item => {
        const btn = document.createElement("button");
        btn.className = "child-btn";
        btn.textContent = item.text;
        btn.onclick = () => openModal(item.modal);
        container.appendChild(btn);
    });
});
