var startBtn = document.querySelector("#start-btn");
var timer = document.querySelector("#timer");


var startTimer = function () {
    var timeRemaining = 75;
    if (timeRemaining > 0) {
        setInterval(function () {
            timeRemaining = timeRemaining - 1;
            timer.textContent = ("Time Remaining: " + timeRemaining)
        }, 1000)
    }
};

startBtn.addEventListener("click", startTimer);