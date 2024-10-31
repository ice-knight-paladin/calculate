const buttons = document.querySelectorAll(".buttons");
const input = document.querySelector("#result");
const operators = ['+', '-', '*', '/','%', '/-/', '1/x', '↔'];
var decimalAdded = false;
var memoryStorage = 0;
var isOperatorClicked = false;
var currentInput = ''; 
var firstInput = '';
var lastInput = '';
var tempInput = '';
var shownInput = '';
var mistakeCheck = 0;
var oper = '';
var timesClicked = 0;
var reduction;
input.value = '0.00 ';

function fun1() {
    var ch;
    ch = document.getElementById("one");
    if (ch.checked) {
        reduction = false;
    } else {
        reduction = true;
    }
}

function calculate(){
    try{
        if(lastInput === '' && isOperatorClicked === true){
            currentInput += tempInput;
        }
        if(lastInput !='' && oper !='' && timesClicked >2)
        {
            currentInput+= lastInput;
        }
    
        if (currentInput.includes('%')) {
            var t = parseFloat(firstInput) /100 *parseFloat(lastInput);
            currentInput = firstInput + ' '+oper+' '+t;
            console.log(currentInput);
        }
        currentInput = currentInput.replace(/,/g, '.');
        var result = eval(currentInput);
        if(result > (10**13 - 1)) {
            tempInput = '';
            reset();
            input.value = '............';
            return;  
        }

        if (result < 0){
            input.value = -result + '-';
        }
        else{
            input.value = result + ' ';
        }
        currentInput = result.toString();
        shownInput = input.value;
        if(lastInput != ''){
            tempInput = lastInput;
        }
        firstInput = '';
        lastInput = '';
        timesClicked = 0;
        isOperatorClicked = false;
    } catch(e) {
        input.value = 'Error';
        currentInput = '';
        shownInput = '';
    }
}

function canAddToInput(value) {
    return (shownInput + value).length <= 12;
}

function reset(){
    currentInput = '';  
    shownInput = '';  
    lastInput = '';  
    firstInput = '';  
    tempInput = '';  
    input.value = '0.00 ';  
    isOperatorClicked = false;  

}

//событие клика
buttons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        var btnVal = event.target.innerText;

        if(btnVal === '=') {
            mistakeCheck = 0;
            calculate();
        }
        // Очистка дисплея, добавить исправление ошибки ввода
        else if (btnVal === 'C'){
            if (mistakeCheck === 0) {
                mistakeCheck = 1;
                if(lastInput === ''){
                    currentInput = currentInput.slice(0,-2);
                }
                else{
                lastInput = '';
                currentInput = currentInput.slice(0,-3);
                }
                
            }
            else{
                mistakeCheck = 0;
                reset();
            }
        }
        else if (btnVal === 'П+'){
            mistakeCheck = 0;
            memoryStorage += parseFloat(shownInput);
            console.log(memoryStorage);
            reset();
            //currentInput = '';
            //shownInput = '';
            //input.value = '';
        }
        else if (btnVal === 'П-'){
            mistakeCheck = 0;
            memoryStorage -= parseFloat(shownInput);
            console.log(memoryStorage);
            reset();
            //currentInput = '';
            //shownInput = '';
            //input.value = '';
        }
        else if (btnVal === 'ИП'){
            mistakeCheck = 0;
            input.value = memoryStorage;
            currentInput = memoryStorage.toString();
            shownInput = memoryStorage.toString();
        }
        else if (btnVal === 'СП'){
            mistakeCheck = 0;
            memoryStorage = 0;
            console.log(memoryStorage);
        }
        else if (btnVal === '/-/'){
            mistakeCheck = 0;
            console.log(currentInput.split(' '));
            if (currentInput.split(' ').length === 3){
                var reverseNumber = -parseFloat(lastInput);
                if (reverseNumber < 0){
                    input.value = -reverseNumber + '-';
                }
                else{
                    input.value = reverseNumber + ' ';
                }
                
                currentInput = currentInput.split(' ')[0] + currentInput.split(' ')[1] + reverseNumber.toString();
                lastInput = reverseNumber.toString();
                shownInput = input.value;
            }else{
                var reverseNumber = -parseFloat(firstInput);
                if (reverseNumber < 0){
                    input.value = -reverseNumber + '-';
                }
                else{
                    input.value = reverseNumber + ' ';
                }
                
                currentInput = reverseNumber.toString();
                firstInput = reverseNumber.toString();
                shownInput = input.value;
            }

        }
        else if(btnVal === '1/x'){
            mistakeCheck = 0;
            var returnNumber = 1 / parseFloat(currentInput);
            if (returnNumber < 0){
                input.value = -returnNumber + '-';
            }
            else{
                input.value = returnNumber + ' ';
            }
            currentInput = returnNumber.toString();
            shownInput = input.value;
        }
        else if(btnVal === '↔'){
            mistakeCheck = 0;
            var sp = currentInput.split(' ');
            currentInput = sp[2] + ' ' + sp[1] + ' ' + sp[0];
        }
        else if(btnVal === ','){
            mistakeCheck = 0;
            if (currentInput.split(' ').length > 1){
                if (lastInput.indexOf(',') === -1){
                    lastInput += ',';
                    currentInput += ',';
                    shownInput = lastInput;
                    input.value = shownInput;
                }
            }
            else{
                if (firstInput.indexOf(',') === -1){
                    firstInput += ',';
                    currentInput += ',';
                    shownInput = firstInput;
                    input.value = shownInput;
                }
            }
        }
        // Операции
        else if (operators.includes(btnVal)){
            if(btnVal != '%'){
                oper = btnVal;
            }
            if (currentInput.split(' ').length >= 3){
                calculate();
            }
            timesClicked += 1;
            mistakeCheck = 0;
            isOperatorClicked = true;
            currentInput += ' '  + btnVal + ' ';
            input.value = shownInput;
            shownInput = '';
        }

        //Добавляем введенное значение
        else {
            mistakeCheck = 0;
            if(!isOperatorClicked){
                if(canAddToInput(btnVal)){
                    if(!operators.some(op1 => currentInput.includes(op1))){
                        firstInput += btnVal;
                    } 
                    shownInput += btnVal;
                    currentInput += btnVal;
                    input.value = shownInput;
                }
            }
            else{
                //oper = '';
              if (canAddToInput(btnVal)) {
                if (operators.some((op) => currentInput.includes(op))) {
                  lastInput += btnVal;
                }
                shownInput = lastInput;
                currentInput += btnVal;
                input.value = shownInput;
              }
            }
        }
    });
});
