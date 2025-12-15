function updateNEWS() {
  let total = 0;

  document.querySelectorAll("[data-score]").forEach(select => {
    const score = Number(select.value || 0);
    total += score;

    const scoreSpan = document.getElementById(select.id + "Score");
    if (scoreSpan) scoreSpan.textContent = score;
  });

  document.getElementById("newsTotal").textContent =
    "Сумма баллов: " + total;
}

document.addEventListener("change", e => {
  if (e.target.hasAttribute("data-score")) {
    updateNEWS();
  }
});