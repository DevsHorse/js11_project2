document.addEventListener('DOMContentLoaded', function() {
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

    {//Menu 
    const toggleMenu = () => {

        const menu = document.querySelector('menu');

        // function for close and open menu
        const handlerMenu = () => menu.classList.toggle('active-menu');
 
         //Scroll links animate function
         function scroll(block, dur) {
            const endPoint = block.offsetTop;

            let idAnimate;
            let num = 0;

            function animateScroll() {  
                idAnimate = requestAnimationFrame(animateScroll);

                // Function to increase scroll speed
                function duration(count) {
                    if (num > (endPoint * 0.95) && count !== 1) {
                        count = count / 2;
                    } else {
                        if (endPoint > 4000) {
                            count += 3;
                        } else  if (endPoint > 3000) {
                            count += 2;
                        }
                    }
                    num = num + (count * 20);  
                }

                duration(dur);
                document.documentElement.scrollTop = num;

                if (num > endPoint) {
                    document.documentElement.scrollTop = endPoint;
                    cancelAnimationFrame(idAnimate);
                }
            }

            idAnimate = requestAnimationFrame(animateScroll);
        }

        //All listeners for header 
        document.addEventListener('click', event => {
            let target = event.target;
            //Main block
            if ( target.closest('main') && !menu.classList.contains('active-menu') ) {
                if ( target.closest('.menu') ) {
                    // Open menu 
                    handlerMenu(); 
                } else if ( target.closest('a[href="#service-block"]') ) {
                    //Scroll button to next slide at main block
                    event.preventDefault();
                    scroll(document.getElementById('service-block'), 2);
                }
            } else if (menu.classList.contains('active-menu')) {
                if ( target.closest('menu') === null || target.classList.contains('close-btn') ) {
                    // Close menu
                    handlerMenu();
                } else if ( target.tagName === 'A' && !target.classList.contains('.close-btn') ) {
                    // Close menu and scroll to blocks of target-link
                    event.preventDefault();
                    handlerMenu();
                    const targetId = target.getAttribute('href').substring(1);
                    const block = document.getElementById(targetId);
                    scroll(block, 3);
                } 
            }
        });
    };

    toggleMenu();
    }

    {//Popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
             popupBtn = document.querySelectorAll('.popup-btn'),
             popupContent = popup.querySelector('.popup-content'),
             popupContentRect =  popupContent.getBoundingClientRect(),
             popupContentX = popupContentRect.x;
        
        popupBtn.forEach( elem => elem.addEventListener('click', () => {
            popup.style.display = 'block';   
            if (screen.width > 768) {
                animationPopUp();
            }
        }));

        //popup Close
        popup.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if ( !target ) {
                    popup.style.display = 'none';
                }
            }
        });

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

    {//Tabs 
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');


        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if ( index === i ) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if ( target ) {
                tab.forEach( (item, i) => {
                    if ( item === target ) {
                        toggleTabContent(i);
                    }
                });
            }
        });

    };

    tabs();
    }


});