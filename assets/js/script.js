document.addEventListener("DOMContentLoaded", function () {
    let buttons = this.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer()
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }
document.getElementById('answer-box').addEventListener("keydown", function(event){
    if (event.key === "Enter") {
        checkAnswer();
    }
})

    runGame("addition")
})
/** The main game loop that is run when the script has been loaded
 * and after a user's answer has been processed.
 */
function runGame(gameType) {
    document.getElementById('answer-box').value = "";
    document.getElementById('answer-box').focus();
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;
    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtraction") {
        displaySubtractQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting`;
    }
}
/**
 * Checks user's input against the first value in the
 * calculateCorrectAnswer array
 */

function checkAnswer() {
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];
    if (isCorrect) {
        alert("Hey you got it right");
        incrementScore();
    } else {
        alert(`Too bad, you answered ${userAnswer} and the correct answer is ${calculatedAnswer[0]}`);
        incrementWrongAnswer();
    }
    runGame(calculatedAnswer[1]);
}

function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;
    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === '-') {
        [operand1 - operand2, "subtraction"]
    } else {
        alert(`Unimplemented operator: ${operator}`);
        throw `Unimplemented operator: ${operator}. Aborting!`;
    }
}
/** Gets the value of score from the DOM and adds one */
function incrementScore() {
    let oldScore = parseInt(document.getElementById('score').textContent);
    document.getElementById('score').textContent = ++oldScore;
}
/** Gets the value of incorrect answer from the DOM and adds one */

function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById('incorrect').textContent);
    document.getElementById('incorrect').textContent = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";

}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}