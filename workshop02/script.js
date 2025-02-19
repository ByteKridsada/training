let bet = null; // -1 0 1
let score = 0;

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("high-button").addEventListener("click", function () {
        updateValue(1, this);
    });
    document.getElementById("mid-button").addEventListener("click", function () {
        updateValue(0, this);
    });
    document.getElementById("low-button").addEventListener("click", function () {
        updateValue(-1, this);
    });
    document.getElementById("submit-button").addEventListener("click", function () {
        calculatePoint();
    });
});

function updateValue(value,button) {
    bet = value;
    document.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
}

function calculatePoint() {
    let pointBetStr = document.getElementById("player-input").value;
    if (validateInput(pointBetStr)) { 
        let pointBet = parseInt(pointBetStr, 0); 
        let result = getDiceResult();
        setScore(result, pointBet);
    }
}

function getDiceResult() {
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    let dice3 = Math.floor(Math.random() * 6) + 1;
    let result = dice1 + dice2 + dice3;

    setText(document.getElementById("txt-dice1"),dice1);
    setText(document.getElementById("txt-dice2"),dice2);
    setText(document.getElementById("txt-dice3"),dice3);

    return result < 8 ? -1 : result === 8 ? 0 : 1;
}

function setScore(result, pointBet) {
    let increase = 0
    if (result == bet) {
        increase = result == 0 ? pointBet * 5 : pointBet;
        document.getElementById("txt-result").innerText = result == 0 ? "You Win 5 Time Reward !!!" : "You Win!!!";
    } else {
        increase = -pointBet;
        document.getElementById("txt-result").innerText = "You Lose";
    }
    score += increase;
    document.getElementById("txt-score").innerText = "Your score: " + score; 
}

function setText(outputElement, text){
    outputElement.classList.add("animate"); 
    setTimeout(() => {
        outputElement.innerText = text;
        outputElement.classList.remove("animate");
    }, 200); 
}

function validateInput(input) {
    if (input.trim() === "") {
        alert("Please enter you bet point!");
    } else if (isNaN(input)) {
        alert("Please enter a valid number!");
    } else {
        if (bet == null) {
            alert("Please select you choice of bet");
            return false
        }
        return true
    }
    return false
}