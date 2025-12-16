const shoxCalc = document.getElementById('shoxCalc');
const selects = shoxCalc.querySelectorAll('.calc-select');
const scores = shoxCalc.querySelectorAll('.calc-score');
const totalSpan = document.getElementById('shoxTotal');

// создаём элемент для отображения ФК
let fkSpan = document.createElement('div');
fkSpan.id = 'shoxFK';
fkSpan.style.marginTop = '4px';
fkSpan.style.fontWeight = 'bold';
shoxCalc.querySelector('.calc-total').appendChild(fkSpan);

function updateTotal() {
    let total = 0;
    selects.forEach((s, i) => {
        const value = parseInt(s.value) || 0;
        scores[i].innerText = value;
        total += value;
    });
    totalSpan.innerText = total;

    // определяем функциональный класс
    let fk = '';
    if (total <= 3) fk = '1 ФК';
    else if (total <= 6) fk = '2 ФК';
    else if (total <= 9) fk = '3 ФК';
    else fk = '4 ФК';

    fkSpan.innerText = `Функциональный класс: ${fk}`;
}

// слушатели на все селекты
selects.forEach(select => {
    select.addEventListener('change', updateTotal);
});
