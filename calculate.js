const result = document.querySelector('#result');
const history = document.querySelector('#history');
const clear = document.querySelector('#reset');
const equal = document.querySelector('#equal');

const numbers = document.querySelectorAll('.num');
const operations = document.querySelectorAll('.symb');

let value = ''; // мы кликнули на это значение
let valueArray = []; // массив кликнутых значений и операторов

let operator = ''; // мы кликнули на этот оператор
let operators = [];

document.addEventListener('DOMContentLoaded', () => {

    function updateHistory() { 
        let displayArray = [];

        if(valueArray.length >=16 ) {
            displayArray = valueArray.slice(-17); 
        } else {
            displayArray = valueArray;
        }
        history.textContent = displayArray.join('');
    }

    function updateResult() { 
        let  displayArray = [];

        if(valueArray.length >=15 ) {
            displayArray = valueArray.slice(-16); 
        } else {
            displayArray = valueArray;
        }
        result.textContent = displayArray; 
    }

    numbers.forEach((number) => {
        number.addEventListener('click', () => {
            value = parseFloat(number.textContent);
            valueArray.push(value);
            updateHistory();
        })
    });

    operations.forEach((operation) => {
        operators.push(operation.textContent);
        operation.addEventListener('click', () => {

            operator = operation.textContent;

            if (operators.includes(valueArray[valueArray.length - 1])) {
                valueArray[valueArray.length - 1] = operator;
            } else {
                valueArray.push(operator);
            }
            updateHistory();
        })
    });

    equal.addEventListener('click', () => {

        let processedArray = []; 
        let currentNumber = ''; 

        valueArray.forEach((item, index) => {
            if (operators.includes(item)) {
                if (currentNumber !== '') { 
                    processedArray.push(parseFloat(currentNumber)); 
                    currentNumber = ''; 
                } 
                if (index !== 0) { 
                    processedArray.push(item); 
                }
            } else { 
                currentNumber += item; 
            }
        }); 
        
        if (currentNumber !== '') { processedArray.push(parseFloat(currentNumber)); }

        const correctDecimals = (num) => { return Math.round(num * 100000) / 100000; };

        for (let i = 0; i < processedArray.length; i++) { 
            if (processedArray[i] === '×') { 
                processedArray[i - 1] = correctDecimals(processedArray[i - 1] * processedArray[i + 1]); 
                processedArray.splice(i, 2); 
                i--; 
            } else if (processedArray[i] === '÷') { 
                processedArray[i - 1] = correctDecimals(processedArray[i - 1] / processedArray[i + 1]); 
                processedArray.splice(i, 2); 
                i--; 
            } else if (processedArray[i] === '+') { 
                processedArray[i - 1] = correctDecimals(processedArray[i - 1] + processedArray[i + 1]); 
                processedArray.splice(i, 2); 
                i--; 
            } else if (processedArray[i] === '-') { 
                processedArray[i - 1] = correctDecimals(processedArray[i - 1] - processedArray[i + 1]); 
                processedArray.splice(i, 2); 
                i--; 
            }
        } 
        updateHistory(); 
        valueArray = processedArray; 
        updateResult();
    });

    clear.addEventListener('click', () => {
        valueArray = [];
        updateHistory();
        updateResult();
    });
})
