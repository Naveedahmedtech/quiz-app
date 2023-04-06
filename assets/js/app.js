// importing question
import questions from "./questions.js";
const landingSeciton = document.querySelector(".landing-section");
const questionsSection = document.querySelector(".questions-section");
const resultSection = document.querySelector(".result-section");
const startQuiz = document.querySelector(".lets-begin");
const restartQuiz = document.querySelector(".restart");
startQuiz.addEventListener("click", () => {
  landingSeciton.style.display = "none";
  questionsSection.style.display = "block";
  showQuestions();
  countTime();
  countTimeLine();
});

let currentQuestionIndex = 0;

restartQuiz.addEventListener("click", () => {
  currentQuestionIndex = 0;
  landingSeciton.style.display = "none";
  questionsSection.style.display = "block";
  resultSection.style.display = "none";
  showQuestions();
  counter = 0;
});

function showQuestions() {
  let questionsContainer = document.querySelector(".questions-container");
  let arr = [];

  arr += `
  <div class="question">
  <span>Question: ${currentQuestionIndex + 1}</span>
  <h1>${questions[currentQuestionIndex].question}</h1>
  </div>
  <div class="options-container">
  <div class="options">
  <div class="option">
  <p class="option-1">${questions[currentQuestionIndex].answers[0].ans1}</p>
    <p class="option-icon">A</p>
    </div>
    </div>
    <div class="options">
    <div class="option">
    <p class="option-1">${questions[currentQuestionIndex].answers[0].ans2}</p>
          <p class="option-icon">B</p>
        </div>
        </div>
        <div class="options">
        <div class="option">
        <p class="option-1">${questions[currentQuestionIndex].answers[0].ans3}</p>
        <p class="option-icon">C</p>
        </div>
        </div>
        <div class="options">
        <div class="option">
        <p class="option-1">${questions[currentQuestionIndex].answers[0].ans4}</p>
        <p class="option-icon">D</p>
        </div>
        </div>
        `;
  const questionCount = document.querySelector(".question-count");
  const questionLength = document.querySelector(".question-length");
  questionCount.innerHTML = `${currentQuestionIndex + 1}`;
  questionLength.innerHTML = `${questions.length}`;
  questionsContainer.innerHTML = arr;
  // check the answers
  checkAnswer();
}

let counter = 0;
function checkAnswer() {
  setTimeout(() => {
    const answers = document.querySelectorAll(".option-1");
    const correctAns = `${questions[currentQuestionIndex].answers[0].correctAns}`;
    let clicked = false; // variable to track if user has clicked an option
    answers.forEach((answer) => {
      answer.addEventListener("click", function () {
        if (clicked) {
          return; // exit if user has already clicked an option
        }

        clicked = true; // set clicked to true once user clicks an option
        // if (clicked) {
        //     console.log("You does not click an option")
        // }
        const currentItem = this.innerText;

        if (currentItem === correctAns) {
          this.classList.add("bg-success");
          answer.disabled = true;
          counter++;
        } else {
          this.classList.add("bg-danger");
        }
      });
    });
    const count = document.querySelector(".count-correct");
    const totalQuestion = document.querySelector(".total-questions");
    const alertAns = document.querySelector(".alert");
    if (counter <= 3) {
      alertAns.innerText = "Sorry, but you need a lot of practice!";
      count.innerText = counter;
    } else {
      alertAns.innerText = "Congratulations! you nailed it";
      count.innerText = counter + 1;
    }
    totalQuestion.innerText = questions.length;
  }, 0);
}
let timeText = ''
// Add event listener to Next button
const nextBtn = document.querySelector(".next-btn");
nextBtn.addEventListener("click", () => {
  timeText.innerText = 30;
  time = 0;
  countTimeLine();
    countTimeLine();
  incrementQuestion();
});

// count time
const timeContainer = document.querySelector(".time-counting");
function countTime() {
  timeText = document.querySelector(".count-time");
  timeText.innerText = 30;
  setInterval(function () {
    timeText.innerText--;
    // timeContainer.classList.add('time-line');
    if (timeText.innerText == 0) {
      timeText.innerText = 30;
      countTimeLine();
      incrementQuestion();
    }
  }, 1000);
}
// count time
const timeLine = document.querySelector(".time-line");
let time = 0;
let intervalId;

function countTimeLine() {
  clearInterval(intervalId); // Clear any existing interval
  time = 0; // Reset the time variable
  timeLine.style.width = 0; // Reset the timeline width

  intervalId = setInterval(function () {
    time += 50; // Increment the time by 50ms
    timeLine.style.width = (time * 100) / 30000 + "%"; // Calculate and set the timeline width as a percentage

    if (time >= 30000) {
      // If 30 seconds have passed
      clearInterval(intervalId); // Clear the interval
      timeLine.style.width = 0; // Reset the timeline width
    }
  }, 50);
}








function incrementQuestion() {
  // Increment the current question index
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestions();
  } else {
    questionsSection.style.display = "none";
    resultSection.style.display = "block";
  }
}
