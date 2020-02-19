window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    {   //Timer
        function countTimer(deadline) {
            let timeHours = document.querySelector('#timer-hours'),
                timeMinutes = document.querySelector('#timer-minutes'),
                timeSeconds = document.querySelector('#timer-seconds');

            function getTimeRemaining() {
            
                let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                lefthours = 24 + (Math.floor(timeRemaining / 60 / 60) - 24);

                if (lefthours < 0) {
                    deadlineCounter();
                    return;
                }
                
                let seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
                
                    function getTime(time, ...arr) {
                        arr = arr.map( (item) => item < 10 ? '0' + item : '' + item);
                        let [seconds, minutes, hours] = [...arr];
                        return { timeRemaining, seconds, minutes, hours };
                    }

                return getTime(timeRemaining, seconds, minutes, hours);
            }   

            const updateClock = setInterval( () => {
                let timer = getTimeRemaining();
                if (timer === undefined) {
                    clearInterval(updateClock);
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
        //Deadline
        function deadlineCounter() {
            let date = new Date();
            let deadline = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;
            return deadline; 
        }

        countTimer(deadlineCounter());
    }

    //Menu 
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li'),
            menuLinks = menu.querySelectorAll('li>a');

        const handlerMenu = () => menu.classList.toggle('active-menu');

        btnMenu.addEventListener('click', handlerMenu); 
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach( elem => elem.addEventListener('click', handlerMenu));



        // function а(item, dr) {
        //     const end = item.offsetTop;
        //     let start = document.documentElement.scrollTop;
        //     let duration = dr;

        //     let animateScrollId;

        //         const animateScroll = function() {
        //         animateScrollId = requestAnimationFrame(animateScroll);
        //         console.log(start);
        //         console.log(end);
        //         document.documentElement.scrollTop = start;
        //         duration++;
        //         if (duration > 20) {
        //             duration = 20;
        //         }
        //         start += duration;
        //         if (start > end) {
        //             cancelAnimationFrame(animateScrollId);
        //         }
        //     animateScroll();
        // };
        // }
        

        // menuLinks.forEach( item => {
        //     const itemId = item.getAttribute('href').substring(1);
        //     item.addEventListener('click', e => {
        //         e.preventDefault();
        //         const block = document.getElementById(itemId);
        //         а(block, 1);
        //     });
        // });




    };

    toggleMenu();


    {//Popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
             popupBtn = document.querySelectorAll('.popup-btn'),
             popupClose = document.querySelector('.popup-close'),
             popupContent = popup.querySelector('.popup-content'),
             popupContentRect =  popupContent.getBoundingClientRect(),
             popupContentX = popupContentRect.x;
        
        popupBtn.forEach( elem => elem.addEventListener('click', () => {
            popup.style.display = 'block';   
            if (screen.width > 768) {
                animationPopUp();
            }
        }));

        popupClose.addEventListener('click', () => popup.style.display = 'none');

        //Popup Animation function
        function animationPopUp() {
            let animationId;
            let count = -1200;
            popupContent.style.transform = `translate(${count}px)`; 
            
                const animationFunc = () => {
                    animationId = requestAnimationFrame(animationFunc);
                    count += 50;
                        if ( count >= popupContentX - 50 ) {
                            cancelAnimationFrame(animationId);
                        } 
                        
                    popupContent.style.transform = `translate(${count}px)`;
                };  
            animationFunc();
        }   
    };

    togglePopUp();
    }
































































});