// Создаем массив кнопок и текста
const КонстатацияTemplates = [
       
{ text: "Ампутация головы", modal: `тут текст` },
{ text: "Ампутация туловища", modal: `текст` },
{ text: "Констатация смерти (Более недели в лесу)", modal: `текст` },
{ text: "Констатация смерти (Более часа)", modal: `текст` },
{ text: "Констатация смерти (Менее часа)", modal: `текст` },
{ text: "Констатация смерти при пожаре (Обугленный)", modal: `текст` },
{ text: "Констатация смерти (Падение с высоты)", modal: `текст` },
{ text: "Констатация смерти (Повешение)", modal: `текст` },
{ text: "Констатация смерти (Поездная)", modal: `текст` }];


// Создаем кнопки после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("Констатация");

    if (!container) {
        console.error("Container #Констатация не найден.");
        return;
    }

    КонстатацияTemplates.forEach(item => {
        const btn = document.createElement("button");
        btn.className = "child-btn";
        btn.textContent = item.text;
        btn.onclick = () => openModal(item.modal);
        container.appendChild(btn);
    });
});
