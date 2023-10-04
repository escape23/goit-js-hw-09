import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let subtract = 0;
let intervalId = null;
let countDownTime = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    currentSelectedDate(selectedDates[0]);
  },
};

console.log(options.defaultDate);
flatpickr(refs.input, options);

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onBtnStart);

function currentSelectedDate(selectedDates) {
  if (selectedDates <= options.defaultDate) {
    return Notify.failure('Please choose a date in the future');
  } else if (selectedDates > options.defaultDate) {
    refs.startBtn.disabled = false;
    subtract = selectedDates.getTime() - options.defaultDate.getTime();
    console.log(subtract);
    const countDownTime = convertMs(subtract);
    formatTime(countDownTime);
  }
}

function formatTime(countDownTime) {
  refs.days.textContent = countDownTime.days;
  refs.hours.textContent = countDownTime.hours;
  refs.minutes.textContent = countDownTime.minutes;
  refs.seconds.textContent = countDownTime.seconds;
}

function onBtnStart() {
  intervalId = setInterval(startTimer, 1000);
}

function startTimer() {
  refs.startBtn.disabled = true;
  refs.input.disabled = true;
  subtract -= 1000;
  if (refs.seconds.textContent <= 0 && refs.minutes.textContent <= 0) {
    clearInterval(intervalId);
  } else countDownTime = convertMs(subtract);
  formatTime(countDownTime);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
