const timerBody = () => {
  //Deadline
  const deadlineCounter = () => {
    const date = new Date();
    const deadline = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate() + 1}`;
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
};

export default timerBody;