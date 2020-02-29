'use strict';
document.addEventListener('DOMContentLoaded', () => {

	{ //Timer

		//Deadline
		const deadlineCounter = () => {
			const date = new Date();
			const deadline = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;
			return deadline;
		};

		const countTimer = deadline => {
			const timeHours = document.querySelector('#timer-hours'),
				timeMinutes = document.querySelector('#timer-minutes'),
				timeSeconds = document.querySelector('#timer-seconds');

			const getTimeRemaining = () => {

				const dateStop = new Date(deadline).getTime(),
					dateNow = new Date().getTime(),
					timeRemaining = (dateStop - dateNow) / 1000,
					lefthours = 24 + (Math.floor(timeRemaining / 60 / 60) - 24);

				if (lefthours < 0) {
					deadlineCounter();
					return;
				}

				const seconds = Math.floor(timeRemaining % 60),
					minutes = Math.floor((timeRemaining / 60) % 60),
					hours = Math.floor(timeRemaining / 60 / 60);

				function getTime(time, ...arr) {
					arr = arr.map(item => (item < 10 ? '0' + item : '' + item));
					const [seconds, minutes, hours] = [...arr];
					return { timeRemaining, seconds, minutes, hours };
				}

				return getTime(timeRemaining, seconds, minutes, hours);
			};

			const updateClock = setInterval(() => {
				const timer = getTimeRemaining();
				if (timer === undefined) {
					clearInterval(updateClock);
					return;
				}
				timeHours.textContent = timer.hours;
				timeMinutes.textContent = timer.minutes;
				timeSeconds.textContent = timer.seconds;

				if (timer.timeRemaining <= 1) {
					clearInterval(updateClock);
				}
			}, 1000);
		};

		countTimer(deadlineCounter());
	}

	{ //Menu
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
							count /= 2;
						} else {
							if (endPoint > 4000) {
								count += 3;
							} else  if (endPoint > 3000) {
								count += 2;
							}
						}
						num += (count * 20);
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
				const target = event.target;
				//Main block
				if (target.closest('main') && !menu.classList.contains('active-menu')) {
					if (target.closest('.menu')) {
						// Open menu
						handlerMenu();
					} else if (target.closest('a[href="#service-block"]')) {
						//Scroll button to next slide at main block
						event.preventDefault();
						scroll(document.getElementById('service-block'), 2);
					}
				} else if (menu.classList.contains('active-menu')) {
					if (target.closest('menu') === null || target.classList.contains('close-btn')) {
						// Close menu
						handlerMenu();
					} else if (target.tagName === 'A' && !target.classList.contains('.close-btn')) {
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

	{ //Popup
		const togglePopUp = () => {
			const popup = document.querySelector('.popup'),
				popupBtn = document.querySelectorAll('.popup-btn'),
				popupContent = popup.querySelector('.popup-content'),
				popupContentRect =  popupContent.getBoundingClientRect(),
				popupContentX = popupContentRect.x;

			popupBtn.forEach(elem => elem.addEventListener('click', () => {
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
					if (!target) {
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
					if (count >= popupContentX - 50) {
						cancelAnimationFrame(animationId);
					}

					popupContent.style.transform = `translate(${count}px)`;
				};
				animationFunc();
			}
		};

		togglePopUp();
	}

	{ //Tabs
		const tabs = () => {
			const tabHeader = document.querySelector('.service-header'),
				tab = tabHeader.querySelectorAll('.service-header-tab'),
				tabContent = document.querySelectorAll('.service-tab');


			const toggleTabContent = index => {
				for (let i = 0; i < tabContent.length; i++) {
					if (index === i) {
						tab[i].classList.add('active');
						tabContent[i].classList.remove('d-none');
					} else {
						tab[i].classList.remove('active');
						tabContent[i].classList.add('d-none');
					}
				}
			};

			tabHeader.addEventListener('click', event => {
				let target = event.target;
				target = target.closest('.service-header-tab');

				if (target) {
					tab.forEach((item, i) => {
						if (item === target) {
							toggleTabContent(i);
						}
					});
				}
			});

		};

		tabs();
	}

	{ //Slider

		const slider = () => {

			const slide = document.querySelectorAll('.portfolio-item'),
				slider = document.querySelector('.portfolio-content'),
				dotsUl = document.querySelector('.portfolio-dots');

			const addDots = () => {
				for (let i = 0; i < slide.length; i++) {
					const dotElement = document.createElement('li');
					dotsUl.appendChild(dotElement);
					dotElement.classList.add('dot');
					if (i === 0) dotElement.classList.add('dot-active');
				}
			};

			addDots();

			const dot = document.querySelectorAll('.dot');
			let currentSlide = 0,
				interval;

			const prevSlide = (elem, index, strClass) => {
				elem[index].classList.remove(strClass);
			};

			const nextSlide = (elem, index, strClass) => {
				elem[index].classList.add(strClass);
			};

			const autoPlaySlide = () => {

				prevSlide(slide, currentSlide, 'portfolio-item-active');
				prevSlide(dot, currentSlide, 'dot-active');
				currentSlide++;
				if (currentSlide >= slide.length) {
					currentSlide = 0;
				}
				nextSlide(slide, currentSlide, 'portfolio-item-active');
				nextSlide(dot, currentSlide, 'dot-active');
			};

			const startSlide = (time = 3000) => {
				interval = setInterval(autoPlaySlide, time);
			};

			const stopSlide = () => {
				clearInterval(interval);
			};

			slider.addEventListener('click', event => {
				event.preventDefault();

				const target = event.target;

				if (!target.matches('.portfolio-btn, .dot')) {
					return;
				}

				prevSlide(slide, currentSlide, 'portfolio-item-active');
				prevSlide(dot, currentSlide, 'dot-active');

				if (target.matches('#arrow-right')) {
					currentSlide++;
				} else if (target.matches('#arrow-left')) {
					currentSlide--;
				} else if (target.matches('.dot')) {
					dot.forEach((elem, index) => {
						if (elem === target) {
							currentSlide = index;
						}
					});
				}

				if (currentSlide >= slide.length) {
					currentSlide = 0;
				}

				if (currentSlide < 0) {
					currentSlide = slide.length - 1;
				}

				nextSlide(slide, currentSlide, 'portfolio-item-active');
				nextSlide(dot, currentSlide, 'dot-active');

			});

			slider.addEventListener('mouseover', event => {
				if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
					stopSlide();
				}
			});

			slider.addEventListener('mouseout', event => {
				if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
					startSlide();
				}
			});


			startSlide(1500);

		};

		slider();
	}

	{ //calc
		const inputs = document.querySelectorAll('input.calc-item');
		inputs.forEach(item => {
			item.addEventListener('input', e => e.target.value = e.target.value.replace(/\D/g, ''));
		});

		const calc = (price = 100) => {
			const calcBlock = document.querySelector('.calc-block'),
				calcType = document.querySelector('.calc-type'),
				calcSquare = document.querySelector('.calc-square'),
				calcDay = document.querySelector('.calc-day'),
				calcCount = document.querySelector('.calc-count'),
				totalValue = document.getElementById('total');


			const doubleListener = (fn, str, clearFn) => {
				calcBlock.addEventListener('change', event => {
					const target = event.target;
					if (target.matches('select') || target.matches('input')) {
						if (str === 'sum') {
							fn();
						} else if (str === 'clear') {
							fn(clearFn);
						}
					}
				});
			};

			const countSum = () => {
				let total = 0;
				let countValue = 1;
				let dayValue = 1;
				const typeValue = calcType.options[calcType.selectedIndex].value;
				const squareValue = +calcSquare.value;
				if (calcCount.value > 1) {
					countValue += (calcCount.value - 1) / 10;
				}

				if (calcDay.value && calcDay.value < 5) {
					dayValue *= 2;
				} else if (calcDay.value && calcDay.value < 10) {
					dayValue *= 1.5;
				}

				if (typeValue && squareValue) {
					total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
				}

				if (calcDay.value && calcSquare.value && calcCount.value) {
					let setTotalId;
					let counter = 0;

					const setTotal = () => {
						setTotalId = requestAnimationFrame(setTotal);

						counter += Math.floor(total / 40);
						totalValue.textContent = counter;

						if (counter >= total) {
							totalValue.textContent = total;
							cancelAnimationFrame(setTotalId);
						}
					};
					setTotalId = requestAnimationFrame(setTotal);
					doubleListener(cancelAnimationFrame, 'clear', setTotalId);
				} else {
					totalValue.textContent = 0;
				}
			};

			doubleListener(countSum, 'sum');
		};

		calc(100);
	}

	{ // Out team
		const commandPhoto = document.querySelectorAll('#command .command__photo');

		commandPhoto.forEach(item => {
			const photoSrc = item.getAttribute('src');
			const photoData = item.dataset.img;
			item.addEventListener('mouseenter', event => event.target.src = photoData);
			item.addEventListener('mouseleave', event => event.target.src = photoSrc);
		});
	}

	{ // Validator and send-ajax-form

		const wrappValidAndAjax = () => {
			let isValid = false;
			/*
				@	Validator -----------------------------------------------------------------------------
		  */
			class Validator {
				constructor({ selector, pattern = {}, method, cssOptions = {} }) {
					this.form = document.querySelector(selector);
					this.pattern = pattern;
					this.method = method;
					this.cssOptions = cssOptions;
					this.elementsForm = [...this.form.elements].filter(item =>
						item.tagName.toLowerCase() !== 'BUTTON' &&
										item.type !== 'button');
					this.error = new Set();
				}
				init() {
					this.applyStyle();
					this.setPattern();
					this.elementsForm.forEach(elem => elem.addEventListener('input', this.checkIt.bind(this)));
					this.form.addEventListener('submit', e => {
						this.elementsForm.forEach(elem => this.checkIt({ target: elem }));
						if (this.error.size) {
							e.preventDefault();
							return isValid = false;
						} else {
							e.preventDefault();
							return isValid = true;
						}
					});
				}
				isValid(elem) {
					const validatorMethod = {
						notEmpty(elem) {
							if (elem.value.trim() === '') return false;
							return true;
						},
						pattern(elem, pattern) {
							return pattern.test(elem.value);
						}
					};
					if (this.method) {
						const method = this.method[elem.id];

						if (method) {
							return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
						}
					} else {
						console.warn('Необходимо передать id полей ввода и методы проверки этих полей');
					}

					return true;
				}
				checkIt(event) {
					const target = event.target;

					if (this.isValid(target)) {
						this.showSuccess(target);
						this.error.delete(target);
					} else {
						this.showError(target);
						this.error.add(target);
					}
				}
				showError(elem) {
					elem.classList.remove('success');
					elem.classList.add('error');
					if (elem.nextElementSibling &&
						elem.nextElementSibling.classList.contains(`validator${this.cssOptions.number}-error`)) return;

					const errorDiv = document.createElement('div');
					errorDiv.textContent = 'Ошибка в этом поле.';
					errorDiv.classList.add(`validator${this.cssOptions.number}-error`);
					elem.insertAdjacentElement('afterend', errorDiv);
				}
				showSuccess(elem) {
					elem.classList.remove('error');
					elem.classList.add('success');
					if (elem.nextElementSibling &&
					elem.nextElementSibling.classList.contains(`validator${this.cssOptions.number}-error`)) {
						elem.nextElementSibling.remove();
					}
				}
				applyStyle() {
					const style = document.createElement('style');
					style.textContent = `
						input.success {
							border: 1px solid green!important
						}
						input.error {
							border: 1px solid red!important
						}
						.validator${this.cssOptions.number}-error {
							position: ${this.cssOptions.position};
							border-radius: 1px;
							width: 200px;
							margin: ${this.cssOptions.margin};
							font-size: 14px;
							font-family: sans-serif;
							font-weight: bold;
							text-shadow: 0 0 4px #fff;
							color: red
						}
					`;
					document.head.appendChild(style);
				}
				setPattern() {
					if (!this.pattern.phone) {							// Украина рег /^\+?(38)?([-()]*\d){11}$/
						this.pattern.phone = /^\+?([-()]*\d){11,}$/;
					}														// Россия рег /^\+?([78]){1}([-()]*\d){10}$/

					if (!this.pattern.email) {
						this.pattern.email = /^[\w\-_]+@\w+\.\w{2,}$/;
					}

					if (!this.pattern.text) {
						this.pattern.text = /^[А-Яа-я\s\W\d]{1,}$/;
					}

					if (!this.pattern.name) {
						this.pattern.name = /^[А-Я][а-я]{1,10}$/;
					}
				}
			}

			/*
				***
				@	Settings validator -----------------------------------------------------------------------------
				***
			*/

			const runValidator = (num, phone, email, name, marg, pos, text) => {

				const validForm = new Validator({
					selector: `#form${num}`,
					pattern: {},
					method: {},
					cssOptions: {
						margin: marg,
						number: num,
						position: pos
					}
				});

				validForm.method[`${phone}`] = [['notEmpty'], ['pattern', 'phone']];
				validForm.method[`${email}`] = [['notEmpty'], ['pattern', 'email']];
				validForm.method[`${name}`] = [['notEmpty'], ['pattern', 'name']];
				if (text) validForm.method[`${text}`] = [['notEmpty'], ['pattern', 'text']];
				validForm.init();
			};

			runValidator('1', 'form1-phone', 'form1-email', 'form1-name', '-30px auto 0px', 'relative');
			runValidator('2', 'form2-phone', 'form2-email', 'form2-name', '0px', 'absolute', 'form2-message');
			runValidator('3', 'form3-phone', 'form3-email', 'form3-name', '0px auto', 'relative');

			/*
				***
				@	Send AJAX form -----------------------------------------------------------------------------
				***
			*/

			const sendForm = () => {
				const errorMessage = 'Что-то пошло не так',
					successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

				const form1 = document.getElementById('form1');
				const form2 = document.getElementById('form2');
				const form3 = document.getElementById('form3');

				const statusMessage = document.createElement('div');
				statusMessage.style.cssText = `
				position: relative;
				min-height: 30px;
				font-size: 2rem; 
				color: white!important;
				`;

				const divSuccessMessage = document.createElement('div');
				divSuccessMessage.style.cssText = `
				position: absolute;
				top: 0;
				left: 50%;
				opacity: 0;
				transform: translateX(-1000%);
				`;

				const postData = (body, outputData, errorData) => {
					const request = new XMLHttpRequest();
					request.addEventListener('readystatechange', () => {
						if (request.readyState !== 4) {
							return;
						}
						if (request.status === 200) {
							outputData();
						} else {
							errorData(request.status);
						}
					});

					request.open('POST', './server.php');
					request.setRequestHeader('Content-Type', 'application/json');
					request.send(JSON.stringify(body));
				};

				const animation = endAnimation => {
					let idAnimate;
					let count = 1000;
					let opacity = 0;
					const animateSuccess = () => {
						idAnimate = requestAnimationFrame(animateSuccess);
						count -= 25;

						count >= 25 ? opacity = 1 - (count / 1000) : opacity = 1;

						if (count === endAnimation) {
							cancelAnimationFrame(idAnimate);
						}
						divSuccessMessage.style.transform = `translateX(-${count}%)`;
						divSuccessMessage.style.opacity = `${opacity}`;
					};
					idAnimate = requestAnimationFrame(animateSuccess);
				};

				const setSuccessMesage = (form, endAnimation) => {
					statusMessage.classList.remove('cssload-preloader');
					statusMessage.innerHTML = '';
					statusMessage.appendChild(divSuccessMessage);
					divSuccessMessage.innerHTML = successMessage;

					const removeMassage = () => {
						divSuccessMessage.innerHTML = '';
					};

					setTimeout(removeMassage, 2000);

					if (form.id === 'form3') {
						divSuccessMessage.style.left = 0;
						divSuccessMessage.style.top = '-15px';
					} else {
						divSuccessMessage.style.left = '50%';
						divSuccessMessage.style.top = 0;
					}
					animation(endAnimation);
				};

				const formSpliter = (form, endAnimation) => {
					form.addEventListener('submit', event => {
						if (form.classList.contains('sended')) {
							return;
						}
						if (isValid === true) {
							form.classList.add('sended');
							event.preventDefault();
							statusMessage.innerHTML = `
							<span>З</span><span>а</span><span>г</span>
							<span>р</span><span>у</span><span>з</span>
							<span>к</span><span>а</span>
							`;

							statusMessage.classList.add('cssload-preloader');
							form.appendChild(statusMessage);

							const formData = new FormData(form);
							const body = {};

							for (const val of formData.entries()) {
								body[val[0]] = val[1];
							}
							postData(body, () => {
								setSuccessMesage(form, endAnimation);
								form.querySelectorAll('input').forEach(item => {
									item.value = '';
									item.classList.remove('success');
									form.classList.remove('sended');
								});
							}, error => {
								statusMessage.classList.remove('cssload-preloader');
								statusMessage.innerHTML = errorMessage;
								console.error(error);
							});
						}
					});
				};

				formSpliter(form1, 50);
				formSpliter(form2, 50);
				formSpliter(form3, -50);
			};
			sendForm();
		};

		wrappValidAndAjax();
	}
});
