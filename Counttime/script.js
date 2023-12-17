const optionsBtn = document.querySelector(".optionsBtn");
const settings = document.querySelector(".settings");
const nameInput = document.querySelector("#name");
const dataInput = document.querySelector("#data");
const imgLink = document.querySelector("#img-link");
const saveBtn = document.querySelector(".save");
const eventSpan = document.querySelector(".event");
const dayCounts = document.querySelector(".day-counts");
const hoursCounts = document.querySelector(".hours-counts");
const minutesCounts = document.querySelector(".minutes-counts");
const secondsCounts = document.querySelector(".seconds-counts");
const imageSection = document.querySelector(".image-section");

let intervalId;

const showOptions = () => {
  settings.classList.toggle("active");
};

const calculateTimeLeft = () => {
  const currentDate = new Date();

  const datetimeInput = dataInput.value;
  const inputDate = new Date(datetimeInput);

  let timeDifference = inputDate - currentDate;
  secondsCounts.innerText = Math.floor((timeDifference / 1000) % 60);
  minutesCounts.innerText = Math.floor((timeDifference / (1000 * 60)) % 60);
  hoursCounts.innerText = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  dayCounts.innerText = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
};

const setTimeInterval = () => {
  clearInterval(intervalId);
  intervalId = setInterval(calculateTimeLeft, 1000);
};

const checkEventName = () => {
  if (nameInput.value.trim() !== "") {
    eventSpan.innerText = nameInput.value;
  } else {
    eventSpan.innerText = "Twój event odbędzie się";
  }
};

const checkImgLink = () => {
  if (imgLink.value.trim() !== "") {
    imageSection.style.backgroundImage = `url(${imgLink.value})`;
  } else {
    imageSection.style.backgroundImage = `url("default.png")`;
  }
};

const addOptions = () => {
  checkEventName();
  checkImgLink();
  setTimeInterval();
  showOptions();
};

optionsBtn.addEventListener("click", showOptions);
saveBtn.addEventListener("click", addOptions);

setTimeInterval();
