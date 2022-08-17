import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
   startBtn: document.querySelector('[data-start]'),
   days: document.querySelector('[data-days]'),
   hours: document.querySelector('[data-hours]'),
   minutes: document.querySelector('[data-minutes]'),
   seconds: document.querySelector('[data-seconds]')
}

refs.startBtn.setAttribute('disabled', true);

let futureTime = null;
let timerId = null;

const options = {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
   minuteIncrement: 1,
   onClose(selectedDates) {
      if (selectedDates[0] < options.defaultDate) {
         return Notify.failure('Please choose a date in the future');
      }
      refs.startBtn.removeAttribute('disabled');
      futureTime = selectedDates[0];
   },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', onStartBtn);

function onStartBtn() {
   timerId = setInterval(timer, 1000);
   refs.startBtn.setAttribute('disabled', true);
}

function timer() {
   const currentTime = new Date();
   const delta = futureTime - currentTime;
   const { days, hours, minutes, seconds } = convertMs(delta);
   refs.days.textContent = days;
   refs.hours.textContent = hours;
   refs.minutes.textContent = minutes;
   refs.seconds.textContent = seconds;
      if (delta < 1000) {
      clearInterval(timerId);
   }
}

function addLeadingZero(value) {
   return String(value).padStart(2, '0')
}

function convertMs(ms) {
   const second = 1000;
   const minute = second * 60;
   const hour = minute * 60;
   const day = hour * 24;

   const days = addLeadingZero(Math.floor(ms / day));
   const hours = addLeadingZero(Math.floor((ms % day) / hour));
   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
   const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

   return { days, hours, minutes, seconds };
}