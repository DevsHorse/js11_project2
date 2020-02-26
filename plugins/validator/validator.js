'use strict';

// eslint-disable-next-line no-unused-vars
class Validator {
	constructor({ selector, pattern = {}, method, cssOptions = {} }) {
		this.form = document.querySelector(selector);
		this.pattern = pattern;
		this.method = method;
		this.cssOptions = cssOptions;
		this.elementsForm = [...this.form.elements].filter(item => item.tagName.toLowerCase() !== 'BUTTON' &&
							item.type !== 'button');
		this.error = new Set();
	}

	init() {
		this.applyStyle();
		this.setPattern();
		this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
		this.form.addEventListener('submit', e => {
			this.elementsForm.forEach(elem => this.checkIt({ target: elem }));
			if (this.error.size) {
				e.preventDefault();
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
		console.log(elem);
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
				border: 2px solid green!important
			}
			input.error {
				border: 2px solid red!important
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
		if (!this.pattern.phone) {
			this.pattern.phone = /^\+?(38)?([-()]*\d){10}$/;
		}

		if (!this.pattern.email) {
			this.pattern.email = /^\w+@\w+\.\w{2,}$/;
		}

		if (!this.pattern.text) {
			this.pattern.text = /^[А-Яа-я\s\W\d]{1,}$/;
		}

		if (!this.pattern.name) {
			this.pattern.name = /^[А-Я][а-я]{1,10}$/;
		}
	}
}
