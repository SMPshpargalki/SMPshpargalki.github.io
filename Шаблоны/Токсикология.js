// Создаем массив кнопок и текста
const ТоксикологияTemplates = [
       
{ text: "Использование наркотиков", modal: `текст` },
{ text: "Отравление амитриптилином", modal: `текст` },
{ text: "Отравление амитриптилином. Кома", modal: `текст` },
{ text: "Отравление героином. Кома (передоз)", modal: `текст` },
{ text: "Токсическое действие едких щелочей", modal: `текст` }];


// Создаем кнопки после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("Токсикология");

    if (!container) {
        console.error("Container #Токсикология не найден.");
        return;
    }

    ТоксикологияTemplates.forEach(item => {
        const btn = document.createElement("button");
        btn.className = "child-btn";
        btn.textContent = item.text;
        btn.onclick = () => openModal(item.modal);
        container.appendChild(btn);
    });
});
