const form = document.querySelector("form");
const perror = document.querySelector(".error");
const cost = document.querySelector(".cost");
const costInfo = document.querySelector(".cost-info");
const btn = document.querySelector("button");

const showBill = () => {
    const price = document.getElementById("price");
    const people = document.getElementById("people");
    const tip = document.getElementById("tip");
    if (
        price.value.toString() == "" ||
        people.value.toString() == "" ||
        tip.value.toString() == 0
    ) {
        costInfo.style.display = "none";
        perror.textContent = "Uzupełnij brakujące dane!";
        perror.style.display = "block";
    } else if (price.value < 0.01 || people.value < 1) {
        costInfo.style.display = "none";
        perror.textContent = "Wartości są niepoprawne!";
        perror.style.display = "block";
    } else {
        perror.style.display = "none";
        costInfo.style.display = "block";
        cost.textContent = countBill() + " zł!";
    }
}

const countBill = () => {
    return (((parseFloat(price.value) * parseFloat(tip.value))
        + parseFloat(price.value)) / parseInt(people.value)).toFixed(2);
}

btn.addEventListener("click", showBill);