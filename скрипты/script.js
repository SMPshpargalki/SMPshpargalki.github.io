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

/* --- Умный поиск + автопоказ раздела по клику --- */
const searchInput = document.getElementById('searchInput');

// Функции показа/скрытия элементов
function show(el){ if(el) el.style.display = 'block'; }
function hide(el){ if(el) el.style.display = 'none'; }

// Возвращает id цели из строки onclick типа: toggleSection('obstetrics')
function parseToggleTargetFromOnclick(str){
    const m = /toggleSection\(['"]([^'"]+)['"]\)/.exec(str || '');
    return m ? m[1] : null;
}

// При вводе - фильтруем кнопки и автоматически раскрываем нужные заголовки
searchInput.addEventListener('input', function(){
    const q = this.value.trim().toLowerCase();
    // Все кнопки (включая main/sub/child)
    const allButtons = document.querySelectorAll('.main-btn, .sub-btn, .child-btn');
    
    if(q === ''){
        // Пустой поиск — вернуть начальное состояние
        allButtons.forEach(b => b.style.display = 'block');
        // скрываем все разделы
        document.querySelectorAll('.subsections, .text-block').forEach(s => s.style.display = 'none');
        return;
    }
    
    // Пройдемся по кнопкам и пометим соответствия
    allButtons.forEach(btn => {
        const text = (btn.innerText || '').toLowerCase();
        if(text.includes(q)){
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
    });
    
    // Скрыть все секции
    document.querySelectorAll('.subsections, .text-block').forEach(s => s.style.display = 'none');
    
    // Для каждой видимой кнопки — показать её родителей
    document.querySelectorAll('.main-btn, .sub-btn, .child-btn').forEach(btn => {
        if(btn.style.display === 'block'){
            // показать контейнеры-родители (секции) вверх по дереву
            let p = btn.parentElement;
            while(p){
                if(p.classList && p.classList.contains('subsections')){
                    p.style.display = 'block';
                }
                p = p.parentElement;
            }
        }
    });
    
    // Скрыть пустые контейнеры
    document.querySelectorAll('.subsections').forEach(sec => {
        const hasVisibleChild = Array.from(sec.querySelectorAll('.main-btn, .sub-btn, .child-btn')).some(b => b.style.display === 'block');
        if(!hasVisibleChild){
            sec.style.display = 'none';
        }
    });
});

// Поведение клика по кнопкам, которые вызывают toggleSection('id')
document.querySelectorAll('[onclick]').forEach(el => {
    const onclickAttr = el.getAttribute('onclick') || '';
    const targetId = parseToggleTargetFromOnclick(onclickAttr);
    if(targetId){
        el.addEventListener('click', (e) => {
            // Если поле поиска пустое, просто позволяем стандартному onclick работать
            const q = (searchInput.value || '').trim();
            if(q === ''){
                return;
            }
            
            // Если есть поисковый запрос — при клике раскроем ВСЕ дочерние элементы целевого раздела
            e.preventDefault();
            e.stopPropagation();
            
            // Сначала используем вашу логику: скрыть всё, показать цепочку предков и сам раздел
            document.querySelectorAll('.subsections, .text-block').forEach(s => s.style.display = 'none');
            const elTarget = document.getElementById(targetId);
            if(!elTarget) return;
            
            // Показать цепочку предков
            let p = elTarget.parentElement;
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
            
            // Показать сам раздел и **всех** его потомков
            function showRecursive(node){
                if(!node) return;
                node.style.display = 'block';
                node.querySelectorAll('.subsections, .text-block, .child-btn, .sub-btn').forEach(ch => ch.style.display = 'block');
            }
            showRecursive(elTarget);
        });
    }
});

// Очистка поиска
const input = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearSearch");

input.addEventListener("input", () => {
    clearBtn.style.display = input.value.length > 0 ? "block" : "none";
});

clearBtn.addEventListener("click", () => {
    input.value = "";
    clearBtn.style.display = "none";
    input.dispatchEvent(new Event("input"));  // перезапуск поиска
});
