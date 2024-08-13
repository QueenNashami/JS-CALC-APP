// main.js

document.addEventListener("DOMContentLoaded", function () {
    const keys = document.querySelector('.keys');
    const displayInput = document.querySelector('.input');
    const displayOutput = document.querySelector('.output');

    let currentInput = '';
    let currentOutput = '';

    
    keys.addEventListener('click', function (event) {
        const key = event.target.closest('.key');
        if (!key) return; // Prevent errors when clicking on non-key elements

        const keyValue = key.getAttribute('data-key');

        switch (keyValue) {
            case 'clear':
                clearCalculator();
                break;
            case 'backspace':
                deleteLastCharacter();
                break;
            case '=':
                calculateResult();
                break;
            case 'brackets':
                addBrackets();
                break;
            default:
                appendToInput(keyValue);
                break;
        }

        updateDisplay();
    });

    
    function clearCalculator() {
        currentInput = '';
        currentOutput = '';
    }

    
    function deleteLastCharacter() {
        currentInput = currentInput.slice(0, -1);
    }

    
    function calculateResult() {
        try {
            currentOutput = eval(currentInput.replace(/x/g, '*').replace(/÷/g, '/'));
            if (currentOutput !== undefined && currentOutput !== null) {
                currentInput = currentOutput;
            }
        } catch (error) {
            currentOutput = "Error";
        }
    }

    
    function addBrackets() {
        if (currentInput.includes('(') && !currentInput.includes(')')) {
            currentInput += ')';
        } else {
            currentInput += '(';
        }
    }

    
    function appendToInput(keyValue) {
        if (['+', '-', '*', '/', '%'].includes(keyValue) && currentInput === '') {
            return;
        }
        currentInput += keyValue;
    }

    
    function updateDisplay() {
        displayInput.textContent = currentInput;
        displayOutput.textContent = currentOutput;
    }
});
