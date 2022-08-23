// question list
var questionList = [
    {
        question: "Which of the following is NOT a Javascript data-type?",
        choices: ["a) Strings", "b) Pizza", "c) Boolean", "d) Number"],
        answer: "2"
    },
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        choices: ["a) Var", "b) Let", "c) Const", "d) All of the above"],
        answer: "4"
    },
    {
        question: "Which of the following methods is NOT used to access HTML elements using Javascript?",
        choices: ["a) getElementById", "b) getElementByClassName", "c) getElementByNickName", "d) querySelector"],
        answer: "3"
    },
    {
        question: "What does the Javascript 'debugger' statement do?",
        choices: ["a) It will debug all the errors in the program at runtime.", "b) It acts as a breakpoint in the program.", "c) It will debug error in the current statement if any.", "d) All of the above"],
        answer: "4"
    },
    {
        question: "How do you stop an interval timer in Javascript?",
        choices: ["a) clearInterval", "b) stopInterval", "c) clearTime", "d) clearTimer"],
        answer: "1"
    }

]

// targeting start info elements
var startBtn = document.querySelector("#start-btn");

// targeting question container elements
var questionText = document.querySelector("#question-text");

var choiceContainer = document.querySelector("#choice-container");

var choiceOne = document.querySelector("#choice-one");
var choiceTwo = document.querySelector("#choice-two");
var choiceThree = document.querySelector("#choice-three");
var choiceFour = document.querySelector("#choice-four");

// score variables
var score = 0;
var correctOrIncorrect = document.querySelector("#correct-or-incorrect");
var allHighScores = []

// timer variables
var timer = document.querySelector("#timer");
var timeRemaining = 15 * questionList.length;

// different page variables
var startEl = document.querySelector("#start-info")
var questionsEl = document.querySelector("#question-container");
var enterNameEl = document.querySelector("#enter-name-page");


var startTimer = function () {
    // Display start time
    timer.textContent = ("Time Remaining: " + timeRemaining);
    // Start counting down
    var countDown = setInterval(function () {
        if (timeRemaining <= 0) {
            timer.textContent = ("Time Remaining: " + timeRemaining)
            clearInterval(countDown);
            endGame();
        }
        else if (timeRemaining > 0) {
            timeRemaining = timeRemaining - 1;
            if (timeRemaining <= 10) {
                var redText = document.querySelector("#timer");
                redText.setAttribute("class", "red-text");
            }
            timer.textContent = ("Time Remaining: " + timeRemaining)
        }
    }, 1000)
    startQuiz();
};

var endGame = function () {
    timeRemaining = 0;
    timer.textContent = ("")

    // score variables
    var finalScore = Math.floor((score / questionList.length) * 100);
    var yourScore = document.querySelector("#your-score");
    var nameInput = document.querySelector("#name");

    var saveScore = document.querySelector("#save-score");

    // hide questions & show name prompt
    questionsEl.setAttribute("class", "hide");
    enterNameEl.setAttribute("class", "show");

    // display final score
    yourScore.textContent = "Your Final Score: " + finalScore + "/100";

    saveScore.addEventListener("click", function () {

        var playerOb = {
            playerName: nameInput.value.trim(),
            playerScore: finalScore
        }


        allHighScores += JSON.stringify(playerOb);;

        console.log(allHighScores);

        localStorage.setItem("allHighScores", JSON.stringify(allHighScores));

        location.replace("./high-score.html");
    });
}

if (document.URL.includes("high-score.html")) {
    allHighScores = localStorage.getItem("allHighScores");

    console.log(allHighScores);

    allHighScores = JSON.parse(allHighScores);

    var highScoreList = document.querySelector("high-score-list");

}


var startQuiz = function () {
    // hide start info
    startEl.setAttribute("class", "hide");

    // show question div
    questionsEl.setAttribute("class", "show");

    // make sure we start on question 1
    var i = 0;

    var displayCurrentQuestion = function (currentQuestion) {

        if (questionList[currentQuestion]) {
            questionText.textContent = questionList[currentQuestion].question;
            choiceOne.textContent = questionList[currentQuestion].choices[0];
            choiceTwo.textContent = questionList[currentQuestion].choices[1];
            choiceThree.textContent = questionList[currentQuestion].choices[2];
            choiceFour.textContent = questionList[currentQuestion].choices[3];
            setTimeout(function () {
                correctOrIncorrect.textContent = "";
            }, 1800);

        } else {
            setTimeout(function () {
                endGame();
            }, 1000);

        }
    }

    if (timeRemaining > 0 && i < questionList.length) {
        displayCurrentQuestion(i);
        choiceContainer.addEventListener("click", function (event) {
            // debugger;
            // console.log(i);
            var element = event.target;
            var selectedAnswer = element.getAttribute("data-number");

            if (selectedAnswer === questionList[i].answer) {
                score++;
                i++;
                console.log("Correct.", score);
                correctOrIncorrect.textContent = "Correct!";
                displayCurrentQuestion(i);

            } else if (selectedAnswer && selectedAnswer != questionList[i].answer) {
                timeRemaining = timeRemaining - 15;
                timer.textContent = ("Time Remaining: " + timeRemaining);
                i++;
                console.log("Incorrect.", score)
                correctOrIncorrect.textContent = "Incorrect.";
                displayCurrentQuestion(i);
            };
        });
    } else {
        endGame();
        return;
    }
};

// if (document.URL.includes("index.html")) {
startBtn.addEventListener("click", startTimer);
// };