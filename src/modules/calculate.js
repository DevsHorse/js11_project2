const calculate = () => {
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

      if (calcDay.value > 0 && calcSquare.value > 0 && calcCount.value > 0) {
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
};

export default calculate;
