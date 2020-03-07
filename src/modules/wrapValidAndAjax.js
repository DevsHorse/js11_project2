const wrapValidAndAjax = () => {
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
        this.pattern.name = /^[а-яА-Я]{1,}$/;
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
  
    const form = document.querySelector(`#form${num}`);
    const elementsForm = [...form.elements].filter(item =>
      item.tagName.toLowerCase() !== 'BUTTON' && item.type !== 'button');

      elementsForm.forEach(item => item.addEventListener('focus', () => { 
        validForm.method[`${phone}`] = [['notEmpty'], ['pattern', 'phone']];
        validForm.method[`${email}`] = [['notEmpty'], ['pattern', 'email']];
        validForm.method[`${name}`] = [['notEmpty'], ['pattern', 'name']];
        if (text) validForm.method[`${text}`] = [['notEmpty'], ['pattern', 'text']];
        validForm.init();
      }));
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

    const postData = body => fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

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

          const animationWrapper = () => {
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

          const setSuccessMesage = () => {
            statusMessage.classList.remove('cssload-preloader');
            statusMessage.innerHTML = '';
            statusMessage.appendChild(divSuccessMessage);
            divSuccessMessage.innerHTML = successMessage;

            // Remove success message timer
            const removeMassage = () => {
              divSuccessMessage.innerHTML = '';
            };
            setTimeout(removeMassage, 2000);
            // ------------------------------
            if (form.id === 'form3') {
              divSuccessMessage.style.left = 0;
              divSuccessMessage.style.top = '-15px';
            } else {
              divSuccessMessage.style.left = '50%';
              divSuccessMessage.style.top = 0;
            }
            animationWrapper();
          };

          const clearInputs = () => {
            form.querySelectorAll('input').forEach(item => {
              item.value = '';
              item.classList.remove('success');
              form.classList.remove('sended');
            });
          };

          const setErrorMessage = () => {
            statusMessage.classList.remove('cssload-preloader');
            statusMessage.innerHTML = errorMessage;
            console.error('network status not 200!');
          };

          postData(body)
            .then(response => {
              if (response.status !== 200) {
                throw setErrorMessage;
              }
              setSuccessMesage();
            })
            .then(clearInputs)
            .catch(error => error());
        }
      });
    };

    formSpliter(form1, 50);
    formSpliter(form2, 50);
    formSpliter(form3, -50);
  };
  sendForm();
};

export default wrapValidAndAjax;
