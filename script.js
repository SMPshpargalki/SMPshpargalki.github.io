body{
<script>
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
    if(p.classList && p.classList.contains('subsections') && p.id){ ancestors.push(p.id); }
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
    document.getElementById('modal').style.display = 'none';
    }
</script>
<script>
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
  // Останавливаем видео при закрытии модального окна
    function closeModal() {
    const video = document.getElementById('modalVideo');
    if (video) {
    video.pause();
    video.currentTime = 0;
    }
    document.getElementById('modal').style.display = 'none';
    }
</script>
<!-- Модальное окно для увеличенной картинки -->
<div id="imgModal" style="
  display:none;
  position:fixed;
  top:0; left:0;
  width:100%; height:100%;
  background:rgba(0,0,0,0.9);
  justify-content:center;
  align-items:center;
  z-index:9999;">
  <img id="imgModalContent" style="
    max-width:90%;
    max-height:90%;
    border-radius:10px;">
</div>
  <!-- МОДАЛЬНОЕ ОКНО -->
<div id="modal" style="
  display:none;
  position:fixed;
  top:0; left:0;
  width:100%; height:100%;
  background:rgba(0,0,0,0.6);
  backdrop-filter:blur(3px);
  justify-content:center;
  align-items:center;
  padding:0;
  z-index:9999;">
<div style="
    background:#ffffff;
    width:100%;
    height:100%;
    max-width:650px;
    border-radius:0;
    display:flex;
    flex-direction:column;">
    <!-- Верхняя панель -->
<div style="
    padding:15px;
    background:#ffffff;
    border-bottom:1px solid #ddd;
    position:sticky;
    top:0;
    z-index:1000;
    display:flex;
    justify-content:flex-end;">
<button onclick="closeModal()" style="
    background:#e63946;
    color:#fff;
    border:none;
    padding:8px 14px;
    border-radius:8px;
    font-size:16px;
    cursor:pointer;">
    Закрыть
</button>
</div>
    <!-- Контент -->
<div id="modalContent" style="
    padding:20px;
    overflow-y:auto;
    font-size:18px;
    line-height:1.5;
    white-space:pre-line;
    flex:1;
    text-align:left;">
</div>
</div>
</div>
<script>
    if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
    }
</script>
<script>
/* --- Умный поиск + автопоказ раздела по клику --- */
const searchInput = document.getElementById('searchInput');
// Функция показывает/скрывает элемент (block/none)
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
    // Пустой поиск — вернуть начальное состояние: скрыть все .subsections (логика у вас уже есть)
    // но лучше ничего не трогать: оставим текущее поведение — просто скрываем результаты поиска
allButtons.forEach(b => b.style.display = 'block');
    // скрываем все разделы, чтобы не выпадали по умолчанию
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
    // Снять видимость у контейнеров-панелей, они будут видны по необходимости ниже
});
  // Скрыть все секции (чтобы потом показать только нужные заголовки/контейнеры)
document.querySelectorAll('.subsections, .text-block').forEach(s => s.style.display = 'none');
  // Для каждой видимой кнопки — показать её родителей (названия разделов), иначе кнопка "оторвётся" от интерфейса
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
  // После этого — нужно скрыть пустые контейнеры (те у которых внутри все кнопки display:none)
document.querySelectorAll('.subsections').forEach(sec => {
    // Если в секции есть хотя бы одна видимая кнопка, оставляем её видимой (уже сделано),
    // иначе прячем секцию
const hasVisibleChild = Array.from(sec.querySelectorAll('.main-btn, .sub-btn, .child-btn')).some(b => b.style.display === 'block');
if(!hasVisibleChild){
sec.style.display = 'none';
} else {
      // оставляем как есть
}
});
});
// --- Поведение клика по кнопкам, которые вызывают toggleSection('id') ---
// На все элементы с inline onclick "toggleSection('...')" повесим дополнительный слушатель.
// При клике: если в поле поиска есть текст, то мы сделаем особое поведение — полностью
// раскроем целевой раздел (покажем все его дочерние subdiv/child/text-block), игнорируя фильтр.
document.querySelectorAll('[onclick]').forEach(el => {
const onclickAttr = el.getAttribute('onclick') || '';
const targetId = parseToggleTargetFromOnclick(onclickAttr);
if(targetId){
el.addEventListener('click', (e) => {
      // Если поле поиска пустое, просто позволяем стандартному onclick работать (toggleSection)
const q = (searchInput.value || '').trim();
if(q === ''){
        // ничего — штатный onclick выполнится
return;
}
      // Если есть поисковый запрос — при клике раскроем ВСЕ дочерние элементы целевого раздела
e.preventDefault(); // чтобы предотвратить дублирование (если нужно)
e.stopPropagation();
      // Сначала используем вашу логику: скрыть всё, показать цепочку предков и сам раздел
      // (используем toggleSection, но сначала гарантируем, что всё скрыто)
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
      // Показать сам раздел и **всех** его потомков (это ключ: разворачивает раздел полностью)
function showRecursive(node){
if(!node) return;
node.style.display = 'block';
node.querySelectorAll('.subsections, .text-block, .child-btn, .sub-btn').forEach(ch => ch.style.display = 'block');
}
showRecursive(elTarget);
      // Уберём визуальный фильтр (оставим поле поиска как есть) — при желании можно очистить поле:
      // searchInput.value = '';
});
}
});
</script>
<script>
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
</script>
<script>
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
    "10 месяцев": {girl:{h:72.1,w:9.5}, boy:{h:73.9,w:10.3}, chss:"120-125 в минуту", chdd:"30-32 в минуту", ad:"92/56 мм. рт. ст."},
    "11 месяцев": {girl:{h:73.6,w:9.8}, boy:{h:74.9,w:10.4}, chss:"120-125 в минуту", chdd:"33-35 в минуту", ad:"90/55 мм. рт. ст."},
    "1 год": {girl:{h:74.8,w:10.1}, boy:{h:75.7,w:10.8}, chss:"120 в минуту", chdd:"30-32 в минуту", ad:"92/56 мм. рт. ст."},
    "2 года": {girl:{h:86.1,w:12.6}, boy:{h:88.2,w:13}, chss:"110-115 в минуту", chdd:"26-30 в минуту", ad:"94/56 мм. рт. ст."},
    "3 года": {girl:{h:97.3,w:14.8}, boy:{h:95.7,w:14.9}, chss:"110-115 в минуту", chdd:"26-30 в минуту", ad:"94/56 мм. рт. ст."},
    "4 года": {girl:{h:100.6,w:16}, boy:{h:102.4,w:17.1}, chss:"100-105 в минуту", chdd:"24-26 в минуту", ad:"98/56 мм. рт. ст."},
    "5 лет": {girl:{h:109,w:18.3}, boy:{h:110.4,w:19.7}, chss:"100 в минуту", chdd:"24-26 в минуту", ad:"100/60 мм. рт. ст."},
    "6 лет": {girl:{h:115.7,w:21.3}, boy:{h:115.9,w:21.9}, chss:"90-95 в минуту", chdd:"24-26 в минуту", ad:"100/60 мм. рт. ст."},
    "7 лет": {girl:{h:123.6,w:24.5}, boy:{h:123.9,w:24.9}, chss:"85-92 в минуту", chdd:"21-23 в минуту", ad:"100/60 мм. рт. ст."},
    "8 лет": {girl:{h:129,w:27.4}, boy:{h:129.7,w:27.8}, chss:"80-85 в минуту", chdd:"21-23 в минуту", ad:"100/600 мм. рт. ст."},
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
  // --- ОТКРЫТЬ/СКРЫТЬ КАЛЬКУЛЯТОР ---
function toggleCalculator() {
const box = document.getElementById("normCalculator");
box.style.display = box.style.display === "none" ? "block" : "none";
}
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
genderSelect.onchange = calculate;
</script>
<script>
function togglePregCalc() {
const panel = document.getElementById("pregCalc");
panel.style.display = (panel.style.display === "block") ? "none" : "block";
}
</script>
<script>
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
const mm = String(d.getMonth() + 1, "0");
const yyyy = d.getFullYear();
return dd + "." + mm + "." + yyyy;
}
document.getElementById("pregWeeks").innerText = "Срок: " + weeks + " недель " + (days > 0 ? days + " дней" : "");
document.getElementById("pregDue").innerText = "Предполагаемая дата родов: " + formatDate(due);
document.getElementById("pregResult").style.display = "block";
  });
</script>
<script>
const DRUGS = {
 
Адреналин:{
name:"Адреналин",
synonyms:["эпинефрин","epinephrin","adrenalin"],
type:"weight",
unit:"вес в кг",
steps:[5,10,15,20,25,30,35,40,45,50,55,60,65,70],
info:["<b>Название:</b>","Эпинефрин; Adrenalini","<b>Дозировка:</b>","Ампула 1мг/мл - 1мл","<b>Дозировка введения:</b>","0.01мг/кг - внутривенно","0.1мг/кг - эндотрахеально","<b>Метод введения:</b>","Внутривенно; Эндотрахеально","<b>Ограничения:</b>","Возрастных ограничений нет"],
table:{5:["Внутривенно 0.05 мг - 0.05мл","Эндотрахеально 0.5мг - 0.5мл"],
10:["Внутривенно 0.1мг - 0.1мл","Эндотрахеально 1мг - 1мл"],
15:["Внутривенно 0.15мг - 0.15мл","Эндотрахеально 1.5мг - 1.5мл"],
20:["Внутривенно 0.2 мг - 0.2мл","Эндотрахеально 2мг - 2мл"],
25:["Внутривенно 0.25 мг - 0.25мл"],
30:["Внутривенно 0.3мг - 0.3мл"],
35:["Внутривенно 0.35мг - 0.35мл"],
40:["Внутривенно 0.4мг - 0.4мл"],
45:["Внутривенно 0.45мг - 0.45мл"],
50:["Внутривенно 0.5мг - 0.5мл"],
55:["Внутривенно 0.55мг - 0.55мл"],
60:["Внутривенно 0.6мг - 0.6мл"],
65:["Внутривенно 0.65мг - 0.65мл"],
70:["Внутривенно 0.7мг - 0.7мл"],}},

АктивированныйУголь:{
    name:"Активированный уголь",
    synonyms:["уголь"],
    type:"weight",
    unit:"вес в кг",
    steps:[5,10,15,20,25,30,35,40,45,50,55,60,65,70],
    info:["<b>Название:</b>","Carbonis activati","<b>Дозировка:</b>","Таблетка-250мг",
"<b>Дозировка введения:</b>","50 мг/кг",
"<b>Метод введения:</b>","Перорально",
"<b>Ограничения:</b>","Возрастных ограничений нет."],
table:{5:["1 таблетка - 250мг"],
10:["2 таблетки - 500мг"],
15:["3 таблетки - 750мг"],
20:["4 таблетки - 1000мг"],
25:["5 таблеток - 1250мг"],
30:["6 таблеток - 1500мг"],
35:["7 таблеток - 1750мг"],
40:["8 таблеток - 2000мг"],
45:["9 таблеток - 2250мг"],
50:["10 таблеток - 2500мг"],
55:["11 таблеток - 2750мг"],
60:["12 таблеток - 3000мг"],
65:["13 таблеток - 3250мг"],
70:["14 таблеток - 3500мг"],}},

  Дмазепам:{
    name:"Диазепам",
    synonyms:["Реланиум","Сибазон","Relanium","Diazepam","Sibazon"],
    type:"weight",
    unit:"вес в кг",
    steps:[5,10,15,20,25,30,35,40,45,50],
    info:["<b>Название:</b>","Diazepami; Relanii; Sibazoni","<b>Дозировка:</b>","5мг/мл - 2мл","<b>Дозировка введения:</b>","0,2-0,5 мг/кг - в/венно","0,5 мг/кг - в/мышечно","<b>Максимальная разовая доза:</b>","до 5 лет - 5мг","старше 5 лет - 10мг","<b>Метод введения:</b>","В/в медленно не менее 2х минут.","Повторное введение через 5-15 минут, в разовой дозе.","<b>Ограничения:</b>","Возрастных ограничений нет."],
    table:{5:["от 1мг-0.2мл","до 2.5мг-0.5мл"],
           10:["от 2мг-0.4мл до 5мг-1.0мл"],
           15:["3 мг / 0.6 мл","7.5 мг / 1.5 мл"],
           20:["4 мг / 0.8 мл","10 мг / 2.0 мл"],
           25:["5 мг / 1.0 мл","10 мг / 2.0 мл"],}},

   Кетамин:{
    name:"Кетамин",
    synonyms:["ketamin"],
    type:"weight",
    unit:"вес в кг",
    steps:[5,10,15,20,25,30,35,40,45,50],
    info:["<b>Название:</b>"],
    table:{5:["от 1мг-0.2мл","до 2.5мг-0.5мл"],
           10:["от 2мг-0.4мл до 5мг-1.0мл"],
           15:["3 мг / 0.6 мл","7.5 мг / 1.5 мл"],
           20:["4 мг / 0.8 мл","10 мг / 2.0 мл"],
           25:["5 мг / 1.0 мл","10 мг / 2.0 мл"],}},
  
  Дротаверин:{
    name:"Дротаверин",
    synonyms:["Но-шпа","Ношпа","No-spa","Drotaverine"],
    info:["Возрастных ограничений нет"],
    type:"age",
    unit:"возраст в годах",
    steps:[1,2,3,4,5,6,7,8,9,10,11,12],
    table:{1:["от 0.1мл до 0.2 мл"],
           2:["0.2 — 0.4 мл"],
           3:["0.3 — 0.6 мл"],
           10:["1.0 — 2.0 мл"],
           12:["1.2 — 2.0 мл"],}},

   Церукал:{
    name:"Церукал",
    synonyms:["метоклопрамид"],
    type:"text",
    info:["0.02 мг/кг","не более 0.6 мг за раз","в/в или в/м"],},
  
   Преднизолон:{
    name:"Преднизолон",
    synonyms:["медопред"],
    type:"text",
    info:["0.02 мг/кг","не более 0.6 мг за раз","в/в или в/м"],},
  
   Спазмалин:{
    name:"Спазмалин",
    synonyms:["баралгин","спазматен"],
    type:"text",
    info:["0.02 мг/кг","не более 0.6 мг за раз","в/в или в/м"],},
  
   Дексаметазон:{
    name:"Дексаметазон",
    synonyms:["дексаметазон"],
    type:"text",
    info:["0.02 мг/кг","не более 0.6 мг за раз","в/в или в/м"],},
  
   Супрастин:{
    name:"Супрастин",
    synonyms:["хлоропирамин"],
    type:"text",
    info:["0.02 мг/кг","не более 0.6 мг за раз","в/в или в/м"],},
  
   Магнезия:{
    name:"Магния сульфат",
    synonyms:["ммагнезия"],
    type:"text",
    info:["0.02 мг/кг","не более 0.6 мг за раз","в/в или в/м"],},
  
   НатрияХлорид:{
    name:"Натрия Хлорид",
    synonyms:["Натрий"],
    type:"text",
    info:["0.02 мг/кг","не более 0.6 мг за раз","в/в или в/м"],},
     
  Атропин:{
    name:"Атропин",
    synonyms:["Atropin"],
    type:"text",
    info:["0.02 мг/кг","в/в или в/м"],}};
</script>
<script>

const $ = id => document.getElementById(id);

const drugSearch = $("drugSearch");
const drugList = $("drugList");
const drugParam = $("drugParam");
const drugInfo = $("drugInfo");
const drugResult = $("drugResult");
const btnToggle = $("drugListToggle");

let selectedKey = null;

// ========== показать весь список ==========
btnToggle.onclick =()=>{
drugList.innerHTML = "";
Object.entries(DRUGS).forEach(([key,data])=>{
drugList.innerHTML += `<option value="${key}">${data.name}</option>`;
});
drugList.style.display="block";
};
// ========== поиск без enter ==========
drugSearch.addEventListener("input",()=>{
const q = drugSearch.value.trim().toLowerCase();
resetCalc();
if(!q){
drugList.style.display="none";
return;
}
drugList.innerHTML="";
drugList.style.display="block";
Object.entries(DRUGS).forEach(([key,data])=>{
if(data.name.toLowerCase().includes(q) ||
data.synonyms.some(n=>n.toLowerCase().includes(q))
){
drugList.innerHTML += `<option value="${key}">${data.name}</option>`;
}
});
});
// ========== выбор препарата ==========
drugList.addEventListener("change",()=>{
resetCalc(); // ← очищаем инфо, выбор и результат
selectedKey = drugList.value;
const drug = DRUGS[selectedKey];
drugSearch.value = drug.name;
drugList.style.display="none";
showInfo(drug);
if(drug.type === "text") return;
fillParams(drug);
});
btnToggle.addEventListener("click", ()=>{
resetCalc();
});
// ========== отображаем справку ==========
function showInfo(drug){
drugInfo.innerHTML = drug.info.join("<br>");
drugInfo.style.display = "block";
}
// ========== вывод вариантов веса/возраста ==========
function fillParams(drug){
drugParam.innerHTML="";
drugParam.style.display="block";
const label = `Выберите ${drug.unit}`;
drugParam.innerHTML += `<option value="">${label}</option>`;
drug.steps.forEach(v=>{
drugParam.innerHTML += `<option value="${v}">${v}</option>`;
});
}
// ========== выбор параметра (вес/возраст) ==========
drugParam.addEventListener("change",()=>{
if(!selectedKey) return;
const drug = DRUGS[selectedKey];
const v = drugParam.value;
const row = drug.table[v];
if(!row) return;
drugResult.innerHTML = row.join("<br>");
drugResult.style.display="block";
});
// ========== очистка ==========
function resetCalc(){
selectedKey = null;
drugParam.style.display="none";
drugParam.innerHTML="";
drugInfo.style.display="none";
drugInfo.innerHTML="";
drugResult.style.display="none";
drugResult.innerHTML="";
}
drugSearch.addEventListener("input",()=>{
if(!drugSearch.value.trim()) resetCalc();
});
</script>
