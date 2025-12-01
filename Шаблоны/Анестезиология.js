// Создаем массив кнопок и текста
const АнестезиологияTemplates = [
    
    { text: "Анафилактический шок", modal: `тут будет текст` },
    
    { text: "Клиническая смерть до СМП", modal: `текст` },
    
    { text: "Клиническая смерть. Повешение", modal: `текст` },
    
    { text: "Кома неясной этиологии", modal: `текст` },
    
    { text: "Кома. Сахарный диабет", modal: `текст` },
    
    { text: "Кома. Смерть при бригаде", modal: `текст` },
    
    { text: "Отек мозга", modal: `текст` }    
];


// Создаем кнопки после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("Анестезиология");

    if (!container) {
        console.error("Container #Анестезиология не найден.");
        return;
    }

    АнестезиологияTemplates.forEach(item => {
        const btn = document.createElement("button");
        btn.className = "child-btn";
        btn.textContent = item.text;
        btn.onclick = () => openModal(item.modal);
        container.appendChild(btn);
    });
});
