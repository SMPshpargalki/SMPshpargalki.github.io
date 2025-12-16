function updateSHOCKS() {
  let total = 0;

  document.querySelectorAll("[data-shocks]").forEach(select => {
    const score = Number(select.value || 0);
    total += score;

    const scoreSpan = document.getElementById(select.id + "Score");
    if (scoreSpan) scoreSpan.textContent = score;
  });

  // Сумма баллов
  const totalEl = document.getElementById("shocksTotal");
  if (totalEl) {
    totalEl.textContent = "Сумма баллов: " + total;
  }

  // Функциональный класс
  const classEl = document.getElementById("shocksClass");
  if (classEl) {
    let fk = "—";

    if (total <= 3) fk = "I ФК";
    else if (total <= 6) fk = "II ФК";
    else if (total <= 9) fk = "III ФК";
    else fk = "IV ФК";

    classEl.textContent = "Функциональный класс: " + fk;
  }
}

// отслеживаем изменения ТОЛЬКО в ШОКС
document.addEventListener("change", e => {
  if (e.target.hasAttribute("data-shocks")) {
    updateSHOCKS();
  }
});
