const themeToggle = document.getElementById("themeToggle");

// Установить тему (true = dark)
function setTheme(isDark){
    if(isDark){
        document.body.classList.add("dark");
        themeToggle.textContent = "☀️"; // показываем солнце
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark");
        themeToggle.textContent = "🌙"; // показываем луну
        localStorage.setItem("theme", "light");
    }
}

// при загрузке страницы восстанавливаем тему
setTheme(localStorage.getItem("theme") === "dark");

// при нажатии переключаем
themeToggle.onclick = () => {
    setTheme(!document.body.classList.contains("dark"));
};