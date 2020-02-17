'use strict';

const start = document.querySelector('.start');
const reset = document.querySelector('.reset');
const squad = document.querySelector('.div-animate');

let countAnimate = 0;
let countAnimateTwo = 0;
let anim = true;

let interval;
let animate = function(a) {
    if (a === '') {
        countAnimate = 0;
        countAnimateTwo = 0;
        anim = true;
        animate(' ');
        return;
    } else if (a !== ' ') {
        interval = requestAnimationFrame(animate);
        countAnimate++;
        countAnimateTwo++;
    }

    if(countAnimate < 1000) {
        squad.style.transform = `translateX(${countAnimate}px)
        rotate(${countAnimate}deg)
        translateY(${countAnimateTwo * 0.2}px)`;
    } else if (countAnimate >= 1000 && countAnimate < 2000) {
        squad.style.transform = `translateX(${2000 - countAnimate}px)
            rotate(${2000 - countAnimate}deg) translateY(30px)`;
    } else {
        cancelAnimationFrame(interval);
    }     
};

start.addEventListener('click', function(e) {
    e.preventDefault();
    if (anim) {
        interval = requestAnimationFrame(animate);
        anim = false;
    } else {
        anim = true;
        cancelAnimationFrame(interval);
    }
});

reset.addEventListener('click', function() {
    cancelAnimationFrame(interval);
    animate('');
});