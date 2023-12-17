const root = document.documentElement;

const money = document.querySelector(".money");
const addBtn = document.querySelector(".addBtn");
const removeBtn = document.querySelector(".removeBtn");

const income = document.querySelector(".income");
const expense = document.querySelector(".expense");

const newTrPage = document.querySelector(".newTrPage");
const cancelBtn = document.querySelector(".cancelBtn");
const saveBtn = document.querySelector(".saveBtn");

const lightColor = document.querySelector(".lightColor");
const darkColor = document.querySelector(".darkColor");

const name = document.querySelector("#name");
const price = document.querySelector("#price");
const category = document.querySelector("#category");

let deleteButtons = document.querySelectorAll(".delete");

let actualTransactionId = 3;

const addTransaction = () => {
  newTrPage.style.display = "flex";
};

const clearForm = () => {
  name.value = "";
  price.value = "";
  category.value = "0";
};

const cancelNewTransaction = () => {
  clearForm();
  newTrPage.style.display = "none";
};

const removeAllTransactions = () => {
  let incomeTransactions = income.getElementsByClassName("transaction");
  while (incomeTransactions.length > 0) {
    incomeTransactions[0].remove();
  }
  let expenseTransactions = expense.getElementsByClassName("transaction");
  while (expenseTransactions.length > 0) {
    expenseTransactions[0].remove();
  }
  actualTransactionId = -1;
  actualizeMoneyField();
};

const checkFormFields = () => {
  if (name.value === "") {
    name.value = "Nieznana tranzakcja ";
  }
  if (price.value === "") {
    price.value = 0;
  }
  if (category.value === "0") {
    category.value = "3";
  }
};

const createNewTransaction = () => {
  checkFormFields();
  let newTransaction = document.createElement("div");
  newTransaction.className = "transaction";
  newTransaction.id = actualTransactionId;
  newTransaction.innerHTML = `                <p class="transactionName">${
    name.value
  }
        <i class="fa-solid fa-money-bill"></i> ${
          category.options[category.selectedIndex].text
        }
      </p>
      <p class="transactionAmount">
        ${price.value}zł<button class="delete">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </p>`;
  return newTransaction;
};

const actualizeMoneyField = () => {
  let totalSum = 0;
  const incomeTransactionElements =
    income.getElementsByClassName("transactionAmount");
  const expenseTransactionElements =
    expense.getElementsByClassName("transactionAmount");
  const allTransactionElements = [
    ...incomeTransactionElements,
    ...expenseTransactionElements,
  ];
  for (let i = 0; i < allTransactionElements.length; i++) {
    let num = allTransactionElements[i].innerText.slice(0, -2);
    totalSum += parseFloat(num);
  }
  money.innerText = `${totalSum}zł`;
};

const saveNewTransaction = () => {
  if (price.value < 0) {
    expense.appendChild(createNewTransaction());
  } else {
    income.appendChild(createNewTransaction());
  }
  actualTransactionId++;
  newTrPage.style.display = "none";
  actualizeMoneyField();
  clearForm();
};

const setLightColor = () => {
  root.style.setProperty("--first-color", "#f9f9f9");
  root.style.setProperty("--second-color", "#14161f");
  root.style.setProperty("--border-color", "#14161f");
};

const setDarkColor = () => {
  root.style.setProperty("--first-color", "#14161f");
  root.style.setProperty("--second-color", "#f9f9f9");
  root.style.setProperty("--border-color", "#f9f9f9");
};

const actualizeTransactionsIds = () => {
  let remainingDivs = document.querySelectorAll(".transaction");
  for (let i = 0; i < remainingDivs.length; i++) {
    remainingDivs[i].id = i;
  }
};

const deleteTransaction = (event) => {
  let parent = event.target.parentNode.parentNode.parentNode;
  if (parent.className === "transaction") {
    let divId = parent.id;
    let divToRemove = document.getElementById(divId);
    divToRemove.parentNode.removeChild(divToRemove);
    actualTransactionId--;
    actualizeTransactionsIds();
    actualizeMoneyField();
  }
};

addBtn.addEventListener("click", addTransaction);
removeBtn.addEventListener("click", removeAllTransactions);
cancelBtn.addEventListener("click", cancelNewTransaction);
saveBtn.addEventListener("click", saveNewTransaction);
lightColor.addEventListener("click", setLightColor);
darkColor.addEventListener("click", setDarkColor);
income.addEventListener("click", deleteTransaction);
expense.addEventListener("click", deleteTransaction);
