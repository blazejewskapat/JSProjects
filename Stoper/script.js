const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");
const historyBtn = document.querySelector(".history");

const stopwatch = document.querySelector(".stopwatch");
const time = document.querySelector(".time");
const timeList = document.querySelector(".time-list");
const infoBtn = document.querySelector(".fa-question");
const paintBtn = document.querySelector(".fa-paint-brush");
const modalShadow = document.querySelector(".modal-shadow");
const closeBtn = document.querySelector(".modal-close");

const colorsPanel = document.querySelector(".colors");
const colorOne = document.querySelector(".one");
const colorTwo = document.querySelector(".two");
const colorThree = document.querySelector(".three");
const colorFour = document.querySelector(".four");
let root = document.documentElement;

let startTime;
let stopTime;
let pauseTime = 0;
let statusTime = false;
let timesArray = [];

const startStartwatch = () => {
  clearInterval(stopTime);
  if (statusTime) {
    startTime = new Date().getTime() - pauseTime;
    stopTime = setInterval(updateStopwatch, 1000);
    statusTime = false;
  } else {
    startTime = new Date().getTime();
    stopTime = setInterval(updateStopwatch, 1000);
    statusTime = false;
  }
};

const resetStopwatch = () => {
  clearInterval(stopTime);
  statusTime = false;
  timesArray = [];
  time.style.visibility = "hidden";
  timeList.innerHTML = "";
  timeList.style.visibility = "hidden";
};

const stopStopwatch = () => {
  clearInterval(stopTime);
  statusTime = false;
  time.textContent = `Ostatni czas: ${stopwatch.textContent}`;
  time.style.visibility = "visible";
  timeList.innerHTML = "";
  timeList.style.visibility = "hidden";
  timesArray.push(stopwatch.textContent);
  stopwatch.textContent = "00:00";
};

const pauseStopwatch = () => {
  clearInterval(stopTime);
  pauseTime = new Date().getTime() - startTime;
  statusTime = true;
};

const updateStopwatch = () => {
  let currentTime = new Date().getTime();
  let elapsedTime = currentTime - startTime;
  let seconds = Math.floor(elapsedTime / 1000);
  let minutes = Math.floor(seconds / 60);

  seconds %= 60;
  minutes %= 60;
  let formattedTime = pad(minutes) + ":" + pad(seconds);
  stopwatch.textContent = formattedTime;
};

const pad = (value) => {
  return value < 10 ? "0" + value : value;
};

const showHistory = () => {
  timeList.innerHTML = "";
  let num = 0;
  timesArray.forEach((time) => {
    num++;
    let newElem = document.createElement("li");
    let textNode = document.createTextNode(`Pomiar nr ${num}: ${time}`);
    newElem.appendChild(textNode);
    timeList.appendChild(newElem);
  });
  timeList.style.visibility = "visible";
};

const showModal = () => {
  modalShadow.style.display = "block";
};

const hideModal = () => {
  modalShadow.style.display = "none";
};

const changeColor = () => {};

playBtn.addEventListener("click", startStartwatch);
stopBtn.addEventListener("click", stopStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
historyBtn.addEventListener("click", showHistory);
infoBtn.addEventListener("click", showModal);
closeBtn.addEventListener("click", hideModal);
window.addEventListener("click", (e) =>
  e.target === modalShadow ? hideModal() : false
);
paintBtn.addEventListener("click", () => {
  colorsPanel.classList.toggle("show-colors");
});
colorOne.addEventListener("click", () => {
  root.style.setProperty("--first-color", "yellow");
  root.style.setProperty("--hover-color", "rgba(255, 255, 0, 0.784)");
});
colorTwo.addEventListener("click", () => {
  root.style.setProperty("--first-color", "green");
  root.style.setProperty("--hover-color", "rgba(0, 128, 0, 0.771)");
});
colorThree.addEventListener("click", () => {
  root.style.setProperty("--first-color", "blue");
  root.style.setProperty("--hover-color", "rgba(55, 55, 249, 0.765)");
});
colorFour.addEventListener("click", () => {
  root.style.setProperty("--first-color", "rgb(230, 107, 127)");
  root.style.setProperty("--hover-color", "rgba(230, 107, 127, 0.792)");
});
