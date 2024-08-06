const formDOM = document.querySelector('#form');
const inputDOM = document.querySelector('#input');
const messageDOM = document.querySelector('#message');

let messageTimeout;

formDOM.addEventListener('submit', (event) => {
  event.preventDefault();
  handleSubmit('add');
});

function handleSubmit(action) {
  const amount = Number(inputDOM.value);

  if (amount) {
    updateMessage('Loading...');

    fetch(`http://localhost:3000/api/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount })
    })
      .then((response) => {
        setInputValue('', false);
        return response.json();
      })
      .then((data) => updateMessage(data.message))
      .catch((error) => updateMessage(error.message));
  }
}

function updateMessage(message) {
  if (messageTimeout) clearTimeout(messageTimeout);

  messageDOM.textContent = message;

  messageTimeout = setTimeout(() => {
    messageDOM.textContent = '';
  }, 5000);
}

function setInputValue(amount, focus = true) {
  inputDOM.value = amount;
  if (focus) inputDOM.focus();
}
