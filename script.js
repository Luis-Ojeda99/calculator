const calculatorDisplay = document.querySelector('h1');
const inputButtons = document.querySelectorAll('button');
const clearButton = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

// Function to send the number to the display
function sendNumberValue(number) {
    // Replace the current display value if first value is already entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        // Set awaitingNextValue to false until an operator is pressed again.
        awaitingNextValue = false;
    }
    else {
    // Constant to store the value currently in the display
    const displayValue = calculatorDisplay.textContent

    // Check if the value currnetly is display is 0. If it's, replace it with the number that was pressed. If it isn't, add the pressed number.
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

// Function for operator action
function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);

    // Assign the value to the firstValue variable if there's no value already assign to it.
    if(!firstValue) {
        firstValue = currentValue;
    }
    else {
        console.log('currentValue', currentValue);
    }

    // Ready to received next value. 
    awaitingNextValue = true;

    // Store the operator
    operatorValue = operator;
    console.log('fv', firstValue);
    console.log('op', operator);
}

// Function to add the decimal when its button is presset
function addDecimal() {
    // If an operator has been pressed, don't add a decimal.
    if(awaitingNextValue) return;

    // Check if there is not a decimal already in the display. If there isn't, add it.
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// Function to add event Listener for the numbers, operators, and decimal buttons
inputButtons.forEach((inputButton) => {
    // Send the number value to the display if a number was pressed.
    if (inputButton.classList.length === 0) {
        inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
    }
    // If an operator was pressed, call the useOperator option to action accordingly.
    else if(inputButton.classList.contains('operator')) {
        inputButton.addEventListener('click', () => useOperator(inputButton.value));
    }
    // Check if the button that was pressed was the decimal button
    else if(inputButton.classList.contains('decimal')) {
        inputButton.addEventListener('click', () => addDecimal());
    }
});

// Function to reset the display and all the values for the variables.
function resetAll() {
    // Set firstValue back to 0.
    firstValue = 0;

    // Set the operator value back to an empty string.
    operatorValue = "";

    // Set awaitingNextValue back to its default value of false.
    awaitingNextValue = false;

    // Clear the display.
    calculatorDisplay.textContent = '0';
}

// Event listener for the clear button
clearButton.addEventListener('click', resetAll)