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
var timeLeft = 30;
var currentQuestionIndex = 0;
var totalPoints = 0;

//functions
// function setTimer(timeLeft);

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

// function gameOver();

//event handlers

//clicks start
startButton.addEventListener("click", function () {
  //starts time from 30 seconds
  // setTimer(timeLeft);
  //hides start button
  startButton.style.display = "none";
  newQuestion();
  console.log(question1.correct);
  console.log(firstOption.id);
});

//answers question
optionsBox.addEventListener("click", function (event) {
  event.preventDefault;
  if (event.target.id === questionsArray[currentQuestionIndex].correct) {
    totalPoints = totalPoints + 10;
    feedbackMsg.textContent = "Correct!";
  } else {
    // setTimer(timeLeft - 5);
    feedbackMsg.textContent = "Wrong.";
  }

  if (currentQuestionIndex < questionsArray.length - 1) {
    currentQuestionIndex++;
    newQuestion();
  } else {
    questionText.textContent =
      "Game Over" + "\nFinal Score: " + totalPoints + " out of 50.";
    firstOption.style.display = "none";
    secondOption.style.display = "none";
    thirdOption.style.display = "none";
    fourthOption.style.display = "none";
    feedbackMsg.textContent = "";
  }
});
//saves score at the end

//clicks view high score (optional)
