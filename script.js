const calculatorDisplay = document.querySelector('h1');
const inputButtons = document.querySelectorAll('button');
const clearButton = document.getElementById('clear-btn');

// Function to send the number to the display
function sendNumberValue(number) {
    // Constant to store the value currently in the display
    const displayValue = calculatorDisplay.textContent

    // Check if the value currnetly is display is 0. If it's, replace it with the number that was pressed. If it isn't, add the pressed number.
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
}

// Function to add event Listener for the numbers, operators, and decimal buttons
inputButtons.forEach((inputButton) => {
    // Check if the button that was pressed is a number
    if (inputButton.classList.length === 0) {
        inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
    }
    // Check if the button that was pressed was an operator
    else if(inputButton.classList.contains('opeator')) {
        inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
    }
    // Check if the button that was pressed was the decimal button
    else if(inputButton.classList.contains('opeator')) {
        inputButton.addEventListener('click', () => sendNumberValue());
    }
});