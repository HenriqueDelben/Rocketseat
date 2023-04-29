

const formInputs = document.querySelectorAll(".form__input");

checkValidity(formInputs);

function checkValidity(inputs) {
  for (const input of inputs) {
    input.addEventListener("invalid", handleInvalidInput);
    input.addEventListener("input", handleValidInput);
  }    
} 

function handleValidInput(event) {
  const input = event.target;
  if (input.getAttribute("type") === "password" && input.validity.valid) {  
    removePasswordErrorMessage();
  } else if (input.getAttribute("type") === "email" && input.validity.valid) {
    removeEmailErrorMessage();
  }
}

function handleInvalidInput(event) {
    event.preventDefault();
    const input = event.target;
    if (input.getAttribute("type") === "password") {
      displayPasswordErrorMessage();
    } else {
      displayEmailErrorMessage();
    }
  }

function displayPasswordErrorMessage() {
    const passwordMessage = document.querySelector(".form__password-message");
    passwordMessage.innerText = "Digite uma senha de pelo menos 16 caracteres";
  }
  
function displayEmailErrorMessage() {
    const emailMessage = document.querySelector(".form__email-message");
    emailMessage.innerText = "Digite um e-mail válido";
  }

function removePasswordErrorMessage() {
  const passwordMessage = document.querySelector(".form__password-message");
  passwordMessage.innerText = "";
}

function removeEmailErrorMessage() {
  const emailMessage = document.querySelector(".form__email-message");
  emailMessage.innerText = "";
}