//variable declarations(array of question objects (with options, correct vs. incorrect))
var question1 = {
  question:
    "Which of the following keywords is used to define a variable in JS?",
  option1: "var",
  option2: "arr",
  option3: "element",
  option4: "html",
  correct: "opt1",
};
var question2 = {
  question: "Which method is used to turn an object into a JSON string in JS?",
  option1: "parse()",
  option2: "convert()",
  option3: "stringify()",
  option4: "None of the Above",
  correct: "opt3",
};
var question3 = {
  question: "Which of the following is NOT a primitive datatype in JS?",
  option1: "string",
  option2: "number",
  option3: "boolean",
  option4: "array",
  correct: "opt4",
};
var question4 = {
  question: "Which of the following stops an interval timer in JS?",
  option1: "clearInterval",
  option2: "clearTimer",
  option3: "exitInterval",
  option4: "stopTimer",
  correct: "opt1",
};
var question5 = {
  question: "How are comments written in JS?",
  option1: "/* */",
  option2: "#",
  option3: "//",
  option4: "$",
  correct: "opt3",
};
var questionsArray = [question1, question2, question3, question4, question5];
var startButton = document.querySelector("#start-button");
var firstOption = document.querySelector("#opt1");
var secondOption = document.querySelector("#opt2");
var thirdOption = document.querySelector("#opt3");
var fourthOption = document.querySelector("#opt4");
var questionText = document.querySelector("#question-text");
var optionsBox = document.querySelector("#options-box");
var feedbackMsg = document.querySelector("#feedback");
var timerEl = document.querySelector("#seconds");
var timeLeft = 60;
var currentQuestionIndex = 0;
var totalPoints = 0;
var timerInterval;
//functions
function setTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

function newQuestion() {
  console.log(currentQuestionIndex);
  questionText.textContent = questionsArray[currentQuestionIndex].question;
  firstOption.textContent = questionsArray[currentQuestionIndex].option1;
  secondOption.textContent = questionsArray[currentQuestionIndex].option2;
  thirdOption.textContent = questionsArray[currentQuestionIndex].option3;
  fourthOption.textContent = questionsArray[currentQuestionIndex].option4;
  firstOption.style.display = "block";
  secondOption.style.display = "block";
  thirdOption.style.display = "block";
  fourthOption.style.display = "block";
}

function gameOver() {
  questionText.textContent =
    "Game Over" + "\nFinal Score: " + totalPoints + " out of 50.";
  firstOption.style.display = "none";
  secondOption.style.display = "none";
  thirdOption.style.display = "none";
  fourthOption.style.display = "none";
  feedbackMsg.textContent = "";
}

//event handlers

//clicks start
startButton.addEventListener("click", function () {
  //starts time from 60 seconds
  setTimer();
  //hides start button
  startButton.style.display = "none";
  newQuestion();
});

//answers question
optionsBox.addEventListener("click", function (event) {
  event.preventDefault;
  //if correct, adds points and displays message
  if (event.target.id === questionsArray[currentQuestionIndex].correct) {
    totalPoints = totalPoints + 10;
    feedbackMsg.textContent = "Correct!";
  } else {
    //if incorrect, takes 10 seconds off and displays message
    timeLeft = timeLeft - 10;
    clearInterval(timerInterval);
    setTimer();
    feedbackMsg.textContent = "Wrong.";
    return timeLeft;
  }

  //if there are more questions, displays next question, if not, ends the game
  if (currentQuestionIndex < questionsArray.length - 1) {
    currentQuestionIndex++;
    newQuestion();
  } else {
    gameOver();
  }
});
//saves score at the end

//clicks view high score (optional)
