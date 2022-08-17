import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  btn: document.querySelector('[type="submit"]')
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  refs.btn.setAttribute('disabled', true);

  const step = +e.currentTarget.elements.step.value;
  const amount = +e.currentTarget.elements.amount.value;
  let delay = +e.currentTarget.elements.delay.value;

  setTimeout(() => {
    refs.btn.removeAttribute('disabled');
  }, amount * step + delay)

  for (let i = 0; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    delay += step;
  }
}



function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
      reject({ position, delay });
  }
    }, delay)
  })
  
}
