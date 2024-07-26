document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentValue = '';
    let operator = '';
    let previousValue = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;

            if (button.id === 'clear') {
                currentValue = '';
                previousValue = '';
                operator = '';
                updateDisplay('');
            } else if (button.id === 'equals') {
                if (currentValue !== '' && previousValue !== '' && operator !== '') {
                    currentValue = calculate(previousValue, currentValue, operator);
                    operator = '';
                    previousValue = '';
                    updateDisplay(currentValue);
                }
            } else if (button.classList.contains('operator')) {
                if (currentValue !== '') {
                    if (previousValue !== '') {
                        currentValue = calculate(previousValue, currentValue, operator);
                        updateDisplay(currentValue);
                    }
                    operator = value;
                    previousValue = currentValue;
                    currentValue = '';
                }
            } else {
                if (value === '.' && currentValue.includes('.')) return;
                currentValue += value;
                updateDisplay(currentValue);
            }
        });
    });

    function updateDisplay(value) {
        display.value = value;
    }

    function calculate(num1, num2, operator) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        switch (operator) {
            case '+':
                return (num1 + num2).toString();
            case '-':
                return (num1 - num2).toString();
            case '*':
                return (num1 * num2).toString();
            case '/':
                return num2 === 0 ? 'Error' : (num1 / num2).toString();
            default:
                return '';
        }
    }
});
