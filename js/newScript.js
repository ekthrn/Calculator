const result = document.querySelector('#result');
const history = document.querySelector('#history');
const clear = document.querySelector('#reset');
const equal = document.querySelector('#equal');

const numbers = document.querySelectorAll('.num');
const operations = document.querySelectorAll('.symb');

let numbersArray = [];
let operatorArray = [];
let currentInput = [];
let previousInput = '';

let first = true;
result.innerHTML = "0";


numbers.onclick =
    numbers.forEach(numberButton => {
        numberButton.onclick = function () {
            if (first) {
                result.innerHTML = "";
                first = false;
            }
            let value = parseInt(this.innerHTML);

            currentInput.push(value);
            result.innerHTML += value;
            previousInput = value;
            history.innerHTML += value;

        };
    });

function isOperator() {
    let res = result.innerHTML;
    return "+-÷×".includes(res[res.length - 1]);
}

operations.forEach(operationButton => {
    operationButton.onclick = function () {
        if (isOperator()) {
            operatorArray[operatorArray.length - 1] = this.innerHTML;
            history.innerHTML = history.innerHTML.slice(0, -1) + this.innerHTML;
            result.innerHTML = result.innerHTML.slice(0, -1) + this.innerHTML;
        }
        else {
            numbersArray.push(currentInput.reduce(
                (a, c) => a + c, ""
            ));
            currentInput = [];
            operatorArray.push(this.innerHTML);
            result.innerHTML += this.innerHTML;
            history.innerHTML += this.innerHTML;
        }
    };
});

equal.onclick = function () {

    if (isOperator()) {
        operatorArray = operatorArray.slice(0, -1);
    }
    else {
        numbersArray.push(currentInput.reduce(
            (a, c) => a + c, ""
        ));
    }

    fetch('php/calculate.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            numbers: numbersArray,
            operators: operatorArray,
        }),
    })
        .then(response => response.json())
        .then(data => {

            result.innerHTML = data.result;
            numbersArray = [];
            operatorArray = [];
            currentInput = [String(data.result)];
            history.innerHTML += '=' + data.result;
        })
        .catch(error => console.error('Error:', error));
}

clear.onclick = function () {
    previousInput = '';
    currentInput = [];
    first = true;
    result.innerHTML = '0';
    history.innerHTML = '';

    operatorArray = [];
    numbersArray = [];
}