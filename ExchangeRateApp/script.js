const amountOne = document.querySelector(".amount-one");
const amountTwo = document.querySelector(".amount-two");
const currencyOne = document.querySelector("#currency-one");
const currencyTwo = document.querySelector("#currency-two");
const swapBtn = document.querySelector(".swap");
const rateInfo = document.querySelector(".rateInfo");

const access_key = "";

const calculate = () => {
  fetch(
    `http://api.exchangerate.host/convert?access_key=${access_key}&from=${currencyOne.value}&to=${currencyTwo.value}&amount=${amountOne.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      const val = data.result.toFixed(4);
      rateInfo.textContent = `${amountOne.value / amountOne.value} ${
        currencyOne.value
      } = ${(val / amountOne.value).toFixed(4)} ${currencyTwo.value}`;
      amountTwo.value = data.result.toFixed(2);
    });
};

const swapCurrency = () => {
    let currency = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = currency;
    calculate();
}

currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
swapBtn.addEventListener("click", swapCurrency);

calculate();