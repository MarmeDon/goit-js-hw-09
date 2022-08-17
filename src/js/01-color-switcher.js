function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
   startBtn: document.querySelector('[data-start]'),
   stopBtn: document.querySelector('[data-stop]')
}

let timerId = null;


refs.startBtn.addEventListener('click', onStartBtn);

refs.stopBtn.setAttribute('disabled', true);

function onStartBtn() {
   timerId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
   }, 1000);
   refs.startBtn.setAttribute('disabled', true);
   refs.stopBtn.removeAttribute('disabled');
}

refs.stopBtn.addEventListener('click', onStopBtn);

function onStopBtn() {
   clearInterval(timerId);
   refs.startBtn.removeAttribute('disabled');
   refs.stopBtn.setAttribute('disabled', true);
}





