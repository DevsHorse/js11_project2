'use strict';

let currentDate = new Date();
let div = document.createElement('div');
document.querySelector('body').append(div);
div.style.height = '100px';
function getDayTime() {
    let word = '';
    let k = currentDate.getHours();
    if (k >= 0 && k < 6 || k > 22) {
        word = 'Доброй ночи';
    } else if (k >= 6 && k < 11) {
        word = 'Доброе утро';
    } else if(k >= 11 && k < 17) {
        word = 'Добрый день';
    } else {
        word = 'Добрый вечер';
    }
    return word;
}

const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
let day = weekDays[currentDate.getDay()];

let currentTime = '';
if (currentDate.getHours() > 21 || currentDate.getHours() >= 10 && currentDate.getHours() <= 12 || currentDate.getHours() === 0) {
    currentTime = currentDate.toLocaleTimeString('en').substring(0, 11);
} else {
    currentTime = '0' + currentDate.toLocaleTimeString('en').substring(0, 11);
}

const currentYear = currentDate.toLocaleDateString().substring(6, 10);
const stringNY = `${String(+currentYear + 1)}-01-01T00:00:00`;
const nextYear = new Date(stringNY);
const dayMs = 24 * 60 * 60 * 1000;
const newYearWill =  Math.round((nextYear.getTime() - currentDate.getTime())/dayMs);

div.innerHTML = `${getDayTime()}<br>
Сегодня: ${day}<br>
Текущее время: ${currentTime}<br>
До нового года осталось ${newYearWill} дней`;