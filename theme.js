const themeToggle = document.getElementById("themeToggle");

// Применяем тему
function setTheme(isDark, save = true){
    if(isDark){
        document.body.classList.add("dark");
        themeToggle.textContent = "☀️"; // Темная включена → показываем солнце
        if (save) localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark");
        themeToggle.textContent = "🌙"; // Светлая включена → показываем луну
        if (save) localStorage.setItem("theme", "light");
    }
}

// ===========================
// 1️⃣  Логика при загрузке
// ===========================

// Проверяем: пользователю уже задавал тему вручную?
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    // Да → уважать выбор пользователя
    setTheme(savedTheme === "dark", false);
} else {
    // Нет → выбираем системную
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark, false);
}

// ===========================
// 2️⃣  Реакция на изменение темы телефона
// ===========================
window.matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
        // Если пользователь не выбирал тему вручную
        if (!localStorage.getItem("theme")) {
            setTheme(event.matches, false);
        }
    });

// ===========================
// 3️⃣  Кнопка переключения темы
// ===========================
themeToggle.onclick = () => {
    const darkMode = !document.body.classList.contains("dark");
    setTheme(darkMode, true);
};