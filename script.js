// script.js — основная логика раскрытия секций (Вариант D)

(function () {
    "use strict";

    // Скрыть все подразделы и текстовые блоки
    function hideAllSections() {
        document
            .querySelectorAll(".subsections, .text-block")
            .forEach((s) => (s.style.display = "none"));
    }

    // Скрыть всех потомков конкретного блока
    function hideDescendants(el) {
        if (!el) return;
        el.querySelectorAll(".subsections, .text-block").forEach((s) => {
            s.style.display = "none";
        });
    }

    // Основная функция переключения секций
    function toggleSection(id) {
        const el = document.getElementById(id);
        if (!el) return;

        const isVisible = window.getComputedStyle(el).display !== "none";

        // Если блок открыт → закрываем только его детей
        if (isVisible) {
            hideDescendants(el);
            el.style.display = "none";
            return;
        }

        // Если блок закрыт → скрываем всё
        hideAllSections();

        // Находим всех родителей блока
        let parent = el.parentElement;
        const chain = [];

        while (parent) {
            if (
                parent.classList &&
                parent.classList.contains("subsections") &&
                parent.id
            ) {
                chain.push(parent.id);
            }
            parent = parent.parentElement;
        }

        // Открываем родителей последовательно
        chain.reverse().forEach((pid) => {
            const block = document.getElementById(pid);
            if (block) block.style.display = "block";
        });

        // И открываем сам блок
        el.style.display = "block";
    }

    // Делаем функции глобальными (для onclick в HTML)
    window.toggleSection = toggleSection;
    window.hideAllSections = hideAllSections;
    window.hideDescendants = hideDescendants;

    // После загрузки страницы — скрыть всё
    document.addEventListener("DOMContentLoaded", hideAllSections);
})();
