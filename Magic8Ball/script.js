const img = document.querySelector("img");
const input = document.querySelector("input");
const answer = document.querySelector(".answer");
const error = document.querySelector(".error");

const answers = ["Tak", "Nie", "Nie wiem", "Cięko stwierdzić"];

img.addEventListener("click", function () {
  error.innerText = "";
  answer.innerText = "";
  img.classList.remove("shake-animation");
  if (checkQuestion(input.value)) {
    answer.innerText = randomAnsw();
  } else {
    error.innerText = "Twoje pytanie jest błędne!";
  }
  setTimeout(function () {
    img.classList.add("shake-animation");
  }, 3);
});

const randomAnsw = () => {
  const idx = Math.floor(Math.random() * answers.length);
  return answers[idx];
};

const checkQuestion = (mess) => {
  const text = mess.trim();
  return text.charAt(text.length - 1) === "?";
};
