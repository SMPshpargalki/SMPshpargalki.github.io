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
