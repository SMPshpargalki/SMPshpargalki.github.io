// search.js — улучшенный поиск с подсветкой, дебаунсом и корректным раскрытием

(function () {
    "use strict";

    // === ДЕБАУНС ДЛЯ ПОИСКА ===
    function debounce(fn, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    const input = document.getElementById("searchInput");
    const clearBtn = document.getElementById("clearSearch");

    // === УБРАТЬ ПОДСВЕТКУ ===
    function clearHighlights() {
        document.querySelectorAll(".search-highlight").forEach((el) => {
            const parent = el.parentNode;
            parent.replaceChild(document.createTextNode(el.textContent), el);
            parent.normalize && parent.normalize();
        });
    }

    // === ПОДСВЕТИТЬ СОВПАДЕНИЯ ===
    function highlightMatch(documentNode, query) {
        if (!query) return;

        const buttons = documentNode.querySelectorAll(
            ".main-btn, .sub-btn, .child-btn"
        );

        buttons.forEach((btn) => {
            const original = btn.innerText || btn.textContent;
            const lower = original.toLowerCase();

            if (lower.includes(query)) {
                const regex = new RegExp(
                    "(" + query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")",
                    "ig"
                );

                btn.innerHTML = original.replace(
                    regex,
                    '<span class="search-highlight">$1</span>'
                );
            } else {
                btn.innerHTML = original;
            }
        });
    }

    // === ПОКАЗАТЬ ВСЕХ РОДИТЕЛЕЙ КНОПКИ ===
    function showParentsOf(el) {
        let p = el.parentElement;
        const parents = [];

        while (p) {
            if (p.classList && p.classList.contains("subsections") && p.id) {
                parents.push(p.id);
            }
            p = p.parentElement;
        }

        parents.reverse().forEach((id) => {
            const block = document.getElementById(id);
            if (block) block.style.display = "block";
        });
    }

    // === ОСНОВНАЯ ФУНКЦИЯ ПОИСКА ===
    function performSearch() {
        const q = (input.value || "").trim().toLowerCase();
        const allButtons = document.querySelectorAll(
            ".main-btn, .sub-btn, .child-btn"
        );

        // Если строка пуста → восстановить всё
        if (q === "") {
            allButtons.forEach((b) => (b.style.display = "block"));
            document
                .querySelectorAll(".subsections, .text-block")
                .forEach((s) => (s.style.display = "none"));
            clearHighlights();
            return;
        }

        // Скрываем всё
        document.querySelectorAll(".subsections, .text-block").forEach((s) => {
            s.style.display = "none";
        });

        // Проходим по кнопкам
        allButtons.forEach((btn) => {
            const text = (btn.innerText || btn.textContent).toLowerCase();

            if (text.includes(q)) {
                btn.style.display = "block";
                showParentsOf(btn);
            } else {
                btn.style.display = "none";
            }
        });

        clearHighlights();
        highlightMatch(document, q);
    }

    const debouncedSearch = debounce(performSearch, 180);

    // === Обработка ввода ===
    if (input) {
        input.addEventListener("input", debouncedSearch);
        input.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                input.value = "";
                input.dispatchEvent(new Event("input"));
            }
        });
    }

    // === КНОПКА ОЧИСТКИ ===
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            input.value = "";
            input.dispatchEvent(new Event("input"));
            clearBtn.style.display = "none";
        });

        input.addEventListener("input", () => {
            clearBtn.style.display = input.value.length ? "block" : "none";
        });
    }

    // === Корректное раскрытие при клике по результату поиска ===
    document.addEventListener(
        "click",
        function (e) {
            const target = e.target;
            if (!target) return;

            const onclickAttr =
                target.getAttribute && target.getAttribute("onclick");

            if (onclickAttr && onclickAttr.includes("toggleSection")) {
                const q = (input.value || "").trim();

                if (q !== "") {
                    e.preventDefault();

                    const match = /toggleSection\(['"]([^'"]+)['"]\)/.exec(
                        onclickAttr
                    );

                    if (match) {
                        const id = match[1];

                        // Скрыть всё
                        document
                            .querySelectorAll(".subsections, .text-block")
                            .forEach((s) => (s.style.display = "none"));

                        const targetEl = document.getElementById(id);
                        if (!targetEl) return;

                        // Открываем родителей
                        showParentsOf(targetEl);

                        // Открываем сам блок
                        targetEl.style.display = "block";

                        // Открываем всех потомков
                        targetEl
                            .querySelectorAll(".subsections")
                            .forEach((s) => (s.style.display = "block"));
                        targetEl
                            .querySelectorAll(
                                ".main-btn, .sub-btn, .child-btn"
                            )
                            .forEach((b) => (b.style.display = "block"));
                    }
                }
            }
        },
        true
    );
})();
