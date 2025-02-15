/*-------------------------------- Constants --------------------------------*/
const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');

/*-------------------------------- Variables --------------------------------*/
let secondInput = "";
let firstInput = "";
let operator = null;

/*----------------------------- Event Listeners -----------------------------*/
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const value = event.target.innerText;

        if (!isNaN(value) || value === ".") {
            handleNumber(value);
        } else if (value === 'C') {
            clearCalculator();
        } else if (value === '=') {
            showResult();
        } else {
            handleOperator(value);
        }

        updateDisplay(); // Ensure display updates after every action
    });
});

/*-------------------------------- Functions --------------------------------*/
function handleNumber(num) {
    secondInput += num;
}

function handleOperator(op) {
    if (secondInput === "" && firstInput === "") return;

    if (firstInput !== "" && secondInput !== "") {
        showResult();
    }

    operator = op;
    firstInput = secondInput;
    secondInput = "";
}

function showResult() {
    if (!firstInput || !secondInput || !operator) return;

    let result;
    const prev = parseFloat(firstInput);
    const curr = parseFloat(secondInput);

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = curr !== 0 ? prev / curr : "Error";
            break;
        default:
            return;
    }

    secondInput = result.toString();
    firstInput = "";
    operator = null;
}

function clearCalculator() {
    secondInput = "";
    firstInput = "";
    operator = null;
    updateDisplay();
}

function updateDisplay() {
    display.innerText = secondInput || firstInput || "0";
}
