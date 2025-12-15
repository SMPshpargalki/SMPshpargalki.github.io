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

// --- ДАННЫЕ ИЗ ТАБЛИЦЫ ---
const norms = {
    "Новорождённые": {girl:{h:49.5,w:3.3}, boy:{h:50.4,w:3.5}, chss:"130-140 в минуту", chdd:"40-60 в минуту", ad:"70/40 мм. рт. ст."},
    "1 месяц": {girl:{h:53.5,w:4.1}, boy:{h:54.5,w:4.3}, chss:"130-140 в минуту", chdd:"40-60 в минуту", ad:"70/40 мм. рт. ст."},
    "2 месяца": {girl:{h:56.9,w:5}, boy:{h:57.7,w:5.3}, chss:"130-140 в минуту", chdd:"40-60 в минуту", ad:"70/40 мм. рт. ст."},
    "3 месяца": {girl:{h:60.2,w:5.9}, boy:{h:61.3,w:6.2}, chss:"120-130 в минуту", chdd:"35-40 в минуту", ad:"85/40 мм. рт. ст."},
    "4 месяца": {girl:{h:62.1,w:6.5}, boy:{h:63.8,w:6.9}, chss:"120-130 в минуту", chdd:"35-40 в минуту", ad:"85/40 мм. рт. ст."},
    "5 месяцев": {girl:{h:63.9,w:7.2}, boy:{h:66.9,w:7.8}, chss:"120-130 в минуту", chdd:"35-40 в минуту", ad:"85/40 мм. рт. ст."},
    "6 месяцев": {girl:{h:66.6,w:7.9}, boy:{h:67.9,w:8.7}, chss:"120-125 в минуту", chdd:"33-35 в минуту", ad:"90/55 мм. рт. ст."},
    "7 месяцев": {girl:{h:67.4,w:8.1}, boy:{h:69.6,w:8.9}, chss:"120-125 в минуту", chdd:"33-35 в минуту", ad:"90/55 мм. рт. ст."},
    "8 месяцев": {girl:{h:69.8,w:8.3}, boy:{h:71.2,w:9.3}, chss:"120-125 в минуту", chdd:"33-35 в минуту", ad:"90/55 мм. рт. ст."},
    "9 месяцев": {girl:{h:70.6,w:9}, boy:{h:72.8,w:9.8}, chss:"120-125 в минуту", chdd:"33-35 в минуту", ad:"90/55 мм. рт. ст."},
    "10 месяцев": {girl:{h:72.1,w:9.5}, boy:{h:73.9,w:10.3}, chss:"120-125 в минуту", chdd:"30-32 в минуту", ad:"90/55 мм. рт. ст."},
    "11 месяцев": {girl:{h:73.6,w:9.8}, boy:{h:74.9,w:10.4}, chss:"120-125 в минуту", chdd:"33-35 в минуту", ad:"90/55 мм. рт. ст."},
    "1 год": {girl:{h:74.8,w:10.1}, boy:{h:75.7,w:10.8}, chss:"120 в минуту", chdd:"30-32 в минуту", ad:"92/56 мм. рт. ст."},
    "2 года": {girl:{h:86.1,w:12.6}, boy:{h:88.2,w:13}, chss:"110-115 в минуту", chdd:"26-30 в минуту", ad:"94/56 мм. рт. ст."},
    "3 года": {girl:{h:97.3,w:14.8}, boy:{h:95.7,w:14.9}, chss:"110-115 в минуту", chdd:"26-30 в минуту", ad:"94/56 мм. рт. ст."},
    "4 года": {girl:{h:100.6,w:16}, boy:{h:102.4,w:17.1}, chss:"100-105 в минуту", chdd:"24-26 в минуту", ad:"98/56 мм. рт. ст."},
    "5 лет": {girl:{h:109,w:18.3}, boy:{h:110.4,w:19.7}, chss:"100 в минуту", chdd:"24-26 в минуту", ad:"100/60 мм. рт. ст."},
    "6 лет": {girl:{h:115.7,w:21.3}, boy:{h:115.9,w:21.9}, chss:"90-95 в минуту", chdd:"24-26 в минуту", ad:"100/60 мм. рт. ст."},
    "7 лет": {girl:{h:123.6,w:24.5}, boy:{h:123.9,w:24.9}, chss:"85-92 в минуту", chdd:"21-23 в минуту", ad:"100/60 мм. рт. ст."},
    "8 лет": {girl:{h:129,w:27.4}, boy:{h:129.7,w:27.8}, chss:"80-85 в минуту", chdd:"21-23 в минуту", ad:"100/60 мм. рт. ст."},
    "9 лет": {girl:{h:136.9,w:31}, boy:{h:134.6,w:30.6}, chss:"80-85 в минуту", chdd:"21-23 в минуту", ad:"100/60 мм. рт. ст."},
    "10 лет": {girl:{h:140.3,w:34.3}, boy:{h:140.3,w:33.7}, chss:"78-84 в минуту", chdd:"18-21 в минуту", ad:"105/70 мм. рт. ст."},
    "11 лет": {girl:{h:144.5,w:37.4}, boy:{h:143.4,w:35.4}, chss:"78-84 в минуту", chdd:"18-21 в минуту", ad:"105/70 мм. рт. ст."},
    "12 лет": {girl:{h:152.8,w:44}, boy:{h:150,w:41.2}, chss:"75-82 в минуту", chdd:"18-21 в минуту", ad:"110/70 мм. рт. ст."},
    "13 лет": {girl:{h:156.8,w:48.5}, boy:{h:156.6,w:45.8}, chss:"75-82 в минуту", chdd:"18-21 в минуту", ad:"110/70 мм. рт. ст."},
    "14 лет": {girl:{h:160.8,w:51.3}, boy:{h:162.6,w:51.2}, chss:"72-78 в минуту", chdd:"16-18 в минуту", ad:"120/70 мм. рт. ст."},
    "15 лет": {girl:{h:161.9,w:54.8}, boy:{h:170.1,w:56.3}, chss:"70-72 в минуту", chdd:"16-18 в минуту", ad:"120/70 мм. рт. ст."},
    "16 лет": {girl:{h:162.6,w:55.6}, boy:{h:173.6,w:62}, chss:"70-72 в минуту", chdd:"16-18 в минуту", ad:"120/80 мм. рт. ст."},
    "17 лет": {girl:{h:162.9,w:56.4}, boy:{h:175.3,w:66.8}, chss:"70-72 в минуту", chdd:"16-18 в минуту", ad:"120/80 мм. рт. ст."}
};

// --- ЗАПОЛНЕНИЕ СПИСКА ВОЗРАСТОВ ---
const ageSelect = document.getElementById("ageSelect");
Object.keys(norms).forEach(age => {
    const opt = document.createElement("option");
    opt.value = age;
    opt.textContent = age;
    ageSelect.appendChild(opt);
});

// --- РАСЧЁТ ---
function calculate() {
    const age = ageSelect.value;
    const gender = document.getElementById("genderSelect").value;
    const result = document.getElementById("normResult");
    if (!age || !gender) {
        result.textContent = "Выберите возраст и пол.";
        return;
    }
    const d = norms[age];
    const g = d[gender];
    result.innerHTML = `
        <b>Рост:</b> ${g.h} см<br>
        <b>Вес:</b> ${g.w} кг<br>
        <b>ЧСС:</b> ${d.chss}<br>
        <b>ЧДД:</b> ${d.chdd}<br>
        <b>АД:</b> ${d.ad}`;
}

ageSelect.onchange = calculate;
document.getElementById("genderSelect").onchange = calculate;

// Калькулятор беременности
document.getElementById("calcPreg").addEventListener("click", function () {
    const lmpValue = document.getElementById("lmpDate").value;
    if (!lmpValue) {
        alert("Пожалуйста, выберите дату.");
        return;
    }
    const lmp = new Date(lmpValue + "T00:00:00");
    const today = new Date();
    const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diffMs = now - lmp;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
    
    // ПДР = LMP + 280 дней
    const due = new Date(lmp);
    due.setDate(due.getDate() + 280);
    
    function formatDate(d) {
        const dd = String(d.getDate()).padStart(2, "0");
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const yyyy = d.getFullYear();
        return dd + "." + mm + "." + yyyy;
    }
    
    document.getElementById("pregWeeks").innerText = "Срок: " + weeks + " недель " + (days > 0 ? days + " дней" : "");
    document.getElementById("pregDue").innerText = "Предполагаемая дата родов: " + formatDate(due);
    document.getElementById("pregResult").style.display = "block";
});
