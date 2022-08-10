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
var initials = document.querySelector("#initials");
var initialsLabel = document.querySelector("#initials-label");
var submitButton = document.querySelector("#submit-initials");
var viewScoresEl = document.querySelector("#view-scores");
var exitButton = document.querySelector("#exit");
var timeLeft = 60;
var currentQuestionIndex = 0;
var totalPoints = 0;
var timerInterval;
var highScoresArray = [];
var newUser = {
  score: " ",
  initials: " ",
};

function setTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      testOver();
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

function testOver() {
  stopTest();
  questionText.textContent =
    "Test Over" + "\nFinal Score: " + totalPoints + " out of 50.";
  hideTestContent();
  feedbackMsg.textContent = "";
  initials.style.display = "block";
  initialsLabel.style.display = "block";
  submitButton.style.display = "block";
}

function hideInitialsBox() {
  initials.style.display = "none";
  initialsLabel.style.display = "none";
  submitButton.style.display = "none";
}

function hideTestContent() {
  firstOption.style.display = "none";
  secondOption.style.display = "none";
  thirdOption.style.display = "none";
  fourthOption.style.display = "none";
}

//parses the stored scores, adds newest score, sorts the scores array, and stores back in local storage
function storeNewUser() {
  var savedScores = localStorage.getItem("highScores");
  highScoresArray = JSON.parse(savedScores);
  newUser.score = totalPoints;
  newUser.initials = initials.value;
  highScoresArray.push(newUser);
  highScoresArray.sort((a, b) => {
    if (a.score > b.score) {
      return -1;
    } else {
      return 1;
    }
  });

  localStorage.setItem("highScores", JSON.stringify(highScoresArray));
}

function displayScores() {
  //hide and show correct buttons
  questionText.textContent = "";
  startButton.style.display = "none";
  exitButton.style.display = "block";
  feedbackMsg.textContent = "High Scores:";
  //get previous high scores from local storage and display them
  var savedScores = localStorage.getItem("highScores");
  highScoresArray = JSON.parse(savedScores);
  for (var i = 0; i < highScoresArray.length; i++) {
    var score = document.createElement("p");
    score.textContent =
      highScoresArray[i].initials +
      ".........................." +
      highScoresArray[i].score +
      " points";
    feedbackMsg.appendChild(score);
  }
}

function stopTest() {
  clearInterval(timerInterval);
  timerEl.textContent = "0";
  hideTestContent();
}
//clicks start
startButton.addEventListener("click", function () {
  //starts time from 60 seconds
  setTimer();
  //hides start button
  startButton.style.display = "none";
  newQuestion();
});

//clicks an answer option
optionsBox.addEventListener("click", function (event) {
  event.preventDefault;
  console.log(event.target.className);
  if (event.target.className === "button option") {
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
    }

    //if there are more questions, displays next question, if not, ends the game
    if (currentQuestionIndex < questionsArray.length - 1) {
      currentQuestionIndex++;
      newQuestion();
    } else {
      testOver();
    }
  } else {
    return;
  }
});

//clicks view high score (optional)
viewScoresEl.addEventListener("click", function () {
  stopTest();
  displayScores();
});

exitButton.addEventListener("click", function () {
  location.reload();
});

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  if (initials.value === null) {
    alert("Please type your initials in the box");
  } else {
    storeNewUser();
    hideInitialsBox();
    feedbackMsg.textContent = "Your score has been saved!";
  }
});
