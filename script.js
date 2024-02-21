const calculatorDisplay = document.querySelector('h1');
const inputButtons = document.querySelectorAll('button');
const clearButton = document.getElementById('clear-btn');

// Object to calculate first and second values based on the operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
}

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

// Function to send the number to the display
function sendNumberValue(number) {
    // Replace the current display value if first value is already entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    }
    else {
        const displayValue = calculatorDisplay.textContent

        // Check if the value currnetly is display is 0. If it's, replace it with the number that was pressed. If it isn't, add the pressed number.
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

// Function for operator action
function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);

    // Conditional to prevent usaing multiple operators
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }

    // Assign the value to the firstValue variable if there's no value already assign to it.
    if(!firstValue) {
        firstValue = currentValue;
    }
    else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation
    }

    // Ready to received next value. 
    awaitingNextValue = true;

    // Store the operator
    operatorValue = operator;
}

// Function to add the decimal when its button is presset
function addDecimal() {
    if(awaitingNextValue) return;

    // Check if there is not a decimal already in the display. If there isn't, add it.
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// Function to reset the display and all the values for the variables.
function resetAll() {
    firstValue = 0;
    operatorValue = "";
    awaitingNextValue = false;

    // Clear the display.
    calculatorDisplay.textContent = '0';
}

// Event Listener for the numbers, operators, and decimal buttons
inputButtons.forEach((inputButton) => {
    if (inputButton.classList.length === 0) {
        inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
    }
    else if(inputButton.classList.contains('operator')) {
        inputButton.addEventListener('click', () => useOperator(inputButton.value));
    }
    else if(inputButton.classList.contains('decimal')) {
        inputButton.addEventListener('click', () => addDecimal());
    }
});

// Event listener for the clear button
clearButton.addEventListener('click', resetAll)