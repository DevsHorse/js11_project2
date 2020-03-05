'use strict';

import "nodelist-foreach-polyfill";
import "@babel/polyfill";
import "formdata-polyfill";
import "es6-promise";
import "fetch-polyfill";
import elementClosest from "element-closest";
elementClosest(window);
import "remove-polyfill";


import timerBody from './modules/timerBody';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calculate from './modules/calculate';
import ourTeam from './modules/ourTeam';
import wrapValidAndAjax from './modules/wrapValidAndAjax';

//timer
timerBody();
//menu
toggleMenu();
//modal
togglePopUp();
//tabs
tabs();
//slider
slider();
//calculate
calculate();
//Our team block
ourTeam();
// validate and ajax
wrapValidAndAjax();