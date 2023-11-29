const result = document.querySelector('#result');
const history = document.querySelector('#history');
const clear = document.querySelector('#reset');
const equal = document.querySelector('#equal');

const numbers = document.querySelectorAll('.num');
const operations = document.querySelectorAll('.symb'); // 6 pieses

result.innerHTML = '0';

let currentInput = '';
let previousInput = '';

const arrayNumber = history.innerHTML.map(item => parseFloat(item));


for (let i = 0; i < numbers.length; i++) {
  numbers[i].onclick = function () {

    if (result.innerHTML === '0' && previousInput !== '0') {
      result.innerHTML = '';
    }
    const value = this.innerHTML;

    currentInput += value;

    result.innerHTML = currentInput;
    history.innerHTML += value;
  }
}

clear.onclick = function () {
  previousInput = '';
  currentInput = '';

  result.innerHTML = '';
  history.innerHTML = '';

}

function operate(num1, num2, operator) {

  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '×':
      return num1 * num2;
    case '÷':
      return num1 / num2;
    default:
      return num2; // In case of an invalid operator, return the second number
  }
}


for (let i = 0; i < operations.length; i++) {
  operations[i].onclick = function () {
    const operator = this.innerHTML;

    if (previousInput === '') {
      previousInput = currentInput;
      result.innerHTML += operator;
      history.innerHTML += operator;
    } else {
      history.innerHTML += operator;
      result.innerHTML = operator;
    }

    currentInput = '';
  };
}

equal.onclick = function () {
  alert("111");
  const operatorIndex = history.innerHTML.search(/[+\-×÷]/g);
  const operator = history.innerHTML[operatorIndex];
  const historyWithoutOperator = history.innerHTML.replace(operator, '');
  const number = historyWithoutOperator.map(item => parseFloat(item));

  let resultValue = number[0];

  for (let i = 0; i < operator.length; i++) {
    const operator = operator[i];
    console.log(operator)
    const nextNumber = number[i + 1];
    console.log(nextNumber)
    resultValue = operate(resultValue, nextNumber, operator); // Применяем операцию к результату и следующему числу
  }

  result.innerHTML = resultValue;
  console.log(resultValue)
  history.innerHTML = '';
  previousInput = resultValue.toString(); // Обновляем предыдущий ввод для возможности выполнения дополнительных операций
  currentInput = '';
}


