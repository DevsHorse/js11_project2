window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    //Timer
    function countTimer(deadline) {
        let timeHours = document.querySelector('#timer-hours'),
            timeMinutes = document.querySelector('#timer-minutes'),
            timeSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000;
            console.log(dateNow)
            if (timeRemaining <= 0) {
                return;
            }

            let seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
            console.log(24 + (Math.floor(timeRemaining / 60 / 60) - 24))
                function a(time, ...arr) {
                    arr = arr.map( (item) => item < 10 ? '0' + item : '' + item);
                    let [seconds, minutes, hours] = [...arr];
                    return { timeRemaining, seconds, minutes, hours };
                }

            return a(timeRemaining, seconds, minutes, hours);
        }   

        const updateClock = setInterval(function() {
            let timer = getTimeRemaining();
            if (timer === undefined) {
                return;
            }
            timeHours.textContent = timer.hours;
            timeMinutes.textContent = timer.minutes;
            timeSeconds.textContent = timer.seconds;

            if ( timer.timeRemaining <= 1 ) {
                clearInterval(updateClock);
            }
        }, 1000);
    }

    

    countTimer('2020-02-18T00:00:00');
    // setInterval(countTimer, 1000, '01 july 2019');










});