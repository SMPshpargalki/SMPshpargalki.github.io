function updateSHOCKS() {
  let total = 0;

  document.querySelectorAll("[data-shocks]").forEach(select => {
    const score = Number(select.value || 0);
    total += score;

    const scoreEl = document.getElementById(select.id + "Score");
    if (scoreEl) scoreEl.textContent = score;
  });

  // Сумма
  document.getElementById("shocksTotal").textContent =
    "Сумма баллов: " + total;

  // Функциональный класс
  let fk = "—";
  if (total <= 3) fk = "I ФК по NYHA";
  else if (total <= 6) fk = "II ФК по NYHA";
  else if (total <= 9) fk = "III ФК по NYHA";
  else fk = "IV ФК по NYHA";

  document.getElementById("shocksClass").textContent =
    "Функциональный класс: " + fk;
}

// реагируем только на ШОКС
document.addEventListener("change", e => {
  if (e.target.hasAttribute("data-shocks")) {
    updateSHOCKS();
  }
});
