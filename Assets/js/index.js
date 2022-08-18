var startBtn = document.querySelector("#start-btn");
var timer = document.querySelector("#timer");

var questionArray = [
    {
        question: "I am a question.",
        choices: ["Answer1", "Answer2", "Answer3", "Answer4"],
        answer: "Answer2"
    }
]

var startTimer = function () {
    // Display start time
    var timeRemaining = 75;
    timer.textContent = ("Time Remaining: " + timeRemaining)
    // Start counting down
    var countDown = setInterval(function () {
        if (timeRemaining > 0) {
            timeRemaining = timeRemaining - 1;
            timer.textContent = ("Time Remaining: " + timeRemaining)
        }
        // When timer runs out:
        else if (timeRemaining <= 0) {
            clearInterval(countDown);
        }
    }, 1000)

};

var startQuiz = function () {
    var showEl = document.querySelector("#startInfo")
    showEl.setAttribute("class", "hide");

    var questions = function () {

    }
}

startBtn.addEventListener("click", startTimer);
startBtn.addEventListener("click", startQuiz);