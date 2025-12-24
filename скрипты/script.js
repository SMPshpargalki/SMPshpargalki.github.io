// Основные функции управления интерфейсом
function hideAllSections(){
    document.querySelectorAll('.subsections, .text-block').forEach(s => s.style.display = 'none');
}

function hideDescendants(el){
    el.querySelectorAll('.subsections, .text-block').forEach(s => s.style.display = 'none');
}

function toggleSection(id){
    const el = document.getElementById(id);
    if(!el) return;
    const visible = window.getComputedStyle(el).display !== 'none';
    if(visible){
        hideDescendants(el);
        el.style.display = 'none';
        return;
    }
    hideAllSections();
    let p = el.parentElement;
    const ancestors = [];
    while(p){
        if(p.classList && p.classList.contains('subsections') && p.id){ 
            ancestors.push(p.id); 
        }
        p = p.parentElement;
    }
    ancestors.reverse().forEach(aid => {
        const block = document.getElementById(aid);
        if(block) block.style.display = 'block';
    });
    el.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', hideAllSections);

/* --- МОДАЛЬНОЕ ОКНО --- */
function openModal(text){
    document.getElementById('modalContent').innerHTML = text;
    document.getElementById('modal').style.display = 'flex';
}

function openVideo(src){
    document.getElementById('modalContent').innerHTML = `
    <video controls autoplay style="width:100%; max-height:90vh; border-radius:10px;">
        <source src="${src}" type="video/mp4">
        Ваш браузер не поддерживает видео.
    </video>`;
    document.getElementById('modal').style.display = 'flex';
}

function closeModal(){
    const video = document.getElementById('modalVideo');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
    document.getElementById('modal').style.display = 'none';
}

// Останавливаем видео при закрытии модального окна
function openVideo(url) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
    <video id="modalVideo" controls autoplay style="width:100%; max-height:80vh; border-radius:10px;">
        <source src="${url}" type="video/mp4">
        Ваш браузер не поддерживает видео.
    </video>`;
    modal.style.display = 'flex';
}

// Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}

/* ===== ПОИСК ТОЛЬКО ПО ШАБЛОНАМ КАРТ ВЫЗОВОВ ===== */

const searchInput = document.getElementById('searchInput');
const templatesSection = document.getElementById('templates');
const mainButtons = document.querySelectorAll('.main-btn');

// утилиты
function show(el){ if(el) el.style.display = 'block'; }
function hide(el){ if(el) el.style.display = 'none'; }

// все элементы поиска ТОЛЬКО внутри шаблонов
function getTemplateItems(){
    return templatesSection.querySelectorAll('.sub-btn, .child-btn, .text-block');
}

searchInput.addEventListener('input', function(){
    const q = this.value.trim().toLowerCase();

    // если поиск пустой — вернуть дефолт
    if(q === ''){
        // показать все main кнопки
        mainButtons.forEach(show);

        // скрыть всё как при загрузке
        document.querySelectorAll('.subsections, .text-block').forEach(hide);
        return;
    }

    // 🔴 скрываем ВСЕ главные разделы
    mainButtons.forEach(hide);

    // 🟢 показываем ТОЛЬКО шаблоны
    show(templatesSection);
    document
        .querySelector('[onclick="toggleSection(\'templates\')"]')
        ?.style && (document.querySelector('[onclick="toggleSection(\'templates\')"]').style.display = 'block');

    // фильтрация элементов внутри шаблонов
    const items = getTemplateItems();

    items.forEach(el => {
        const text = el.innerText.toLowerCase();
        text.includes(q) ? show(el) : hide(el);
    });

    // автоматически раскрываем родительские подразделы
    items.forEach(el => {
        if(el.style.display === 'block'){
            let p = el.parentElement;
            while(p){
                if(p.classList?.contains('subsections')){
                    show(p);
                }
                p = p.parentElement;
            }
        }
    });

    // скрыть пустые подразделы
    templatesSection.querySelectorAll('.subsections').forEach(sec => {
        const hasVisible = Array.from(
            sec.querySelectorAll('.sub-btn, .child-btn, .text-block')
        ).some(el => el.style.display === 'block');

        if(!hasVisible) hide(sec);
    });
});

/* ===== КРЕСТИК ОЧИСТКИ ПОИСКА ===== */

const clearBtn = document.getElementById("clearSearch");

searchInput.addEventListener("input", () => {
    clearBtn.style.display = searchInput.value.length > 0 ? "block" : "none";
});

clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearBtn.style.display = "none";

    // перезапускаем поиск → возврат к начальному состоянию
    searchInput.dispatchEvent(new Event("input"));
});
