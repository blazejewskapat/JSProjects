const username = document.querySelector("#username");
const password = document.querySelector("#password");
const passwordCheck = document.querySelector("#passwordcheck");
const email = document.querySelector("#email");
const inputs = [username, password, passwordCheck, email];

const sendBtn = document.querySelector(".send");
const cleanBtn = document.querySelector(".clean");
const popup = document.querySelector(".popup");

// Zwykla funkcja podlega hoistingowi a funkcja strzalkowa ten problem obchodzi. Jak mamy normalnie zdefiniowana funkcje to mozna ją wywolac w kazdym miejscu w kodzie, jak mamy funkcje strzałkową to najpierw musi być definicja a potem wywołanie.

const showError = (input, msg) => {
  const formElem = input.parentElement;
  formElem.classList.add("error");
  const pErrorText = formElem.querySelector(".error-text");
  pErrorText.textContent = msg;
};

const clearError = (input) => {
  const formElem = input.parentElement;
  formElem.classList.remove("error");
};

const checkForm = (input) => {
  console.log(input.value);
  if (input.value === "") {
    showError(input, input.placeholder);
  } else {
    clearError(input);
  }
};

const checkLength = (input, min) => {
  if (input.value.length < min) {
    const elem = input.previousElementSibling.innerText.slice(0, -1);
    showError(input, `${elem} słada się z min. ${min} znaków`);
  }
};

const checkPasswords = (password, passwordCheck) => {
  if (password.value != passwordCheck.value) {
    showError(passwordCheck, "Hasła się róznią");
  }
};

const checkIfPasswordIsvalid = (password) => {
  const regexPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]+$/;
  if (!regexPattern.test(password.value)) {
    showError(password, "Hasło jest niepoprawne");
  }
};

const checkErrors = () => {
  const allInputs = document.querySelectorAll(".form-elem");
  let errorCounter = 0;
  allInputs.forEach((el) => {
    if (el.classList.contains("error")) {
      errorCounter++;
    }
  });
  if (errorCounter === 0) {
    popup.classList.add("show-popup");
  }
};

cleanBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  inputs.forEach((el) => {
    el.value = "";
    clearError(el);
  });
});

sendBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  const inputs = [username, password, passwordCheck, email];
  inputs.forEach((el) => checkForm(el));
  checkLength(username, 3);
  checkLength(password, 8);
  checkIfPasswordIsvalid(password);
  checkPasswords(password, passwordCheck);
  checkErrors();
});
