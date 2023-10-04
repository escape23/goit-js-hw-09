import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormCreatePromise);

function onFormCreatePromise(evt) {
  evt.preventDefault();
  let delayInput = Number(evt.currentTarget.delay.value);
  const stepInput = Number(evt.currentTarget.step.value);
  const amountInput = Number(evt.currentTarget.amount.value);

  for (let i = 1; i <= amountInput; i += 1) {
    createPromise(i, delayInput);
    delayInput += stepInput;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      }
      // Reject
      else reject({ position, delay });
    }, delay);
  });
  promise
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
