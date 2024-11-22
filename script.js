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

function fun1() {
    var ch;
    ch = document.getElementById("one");
    if (ch.checked) {
        reduction = false;
    } else {
        reduction = true;
    }

    if (reduction){
        input.value = '0.00 ';
    } else{
        input.value = '0. ';
    }
}



function calculate(){
    try{
        console.log(currentInput);
        if(lastInput === '' && isOperatorClicked === true){
            currentInput += tempInput;
        }
        if(lastInput !='' && oper !='' && timesClicked >2)
        {
            currentInput+= lastInput;
        }
        console.log(oper);
    
        if (currentInput.includes('%')) {
            console.log(currentInput.indexOf('%'), (currentInput.length - 1));
            if (currentInput.indexOf('%') === (currentInput.length - 1)){
                var t = parseFloat(firstInput) /100 *parseFloat(lastInput);
                currentInput = firstInput + ' '+ oper +' '+t;
                console.log(currentInput);
            }
            else{
                var t = parseFloat(firstInput) / 100 * parseFloat(lastInput);
                console.log(t);
                currentInput = t.toString();
            }
        }
        currentInput = currentInput.replace(/,/g, '.');
        var result = 0;
        console.log(lastInput, currentInput);
        if (lastInput === '0' && currentInput.indexOf("/") != -1){
            result = 10000000000000;
        }
        else{
            var result = eval(currentInput);
            console.log(result);
        }
        if(result > (10**13 - 1)) {
            tempInput = '';
            reset();
            input.value = '.............-';
            return;  
        }
        if (reduction === false){
            if (result < 0){
                if (result.toString().indexOf('.') != -1){
                    input.value = -result + '-';
                }else{
                    input.value = -result + '.-';
                }
            }
            else{
                if (result.toString().indexOf('.') != -1){
                    input.value = result + ' ';
                }else{
                    input.value = result + '. ';
                }
            }
        }else{
            if (result.toString().indexOf('.') != -1){
                const dotIndex = result.toString().indexOf('.');
                if (dotIndex + 2 < result.toString().length){
                    const thirdChar = (result.toString() + '00').charAt(dotIndex + 3);
                    console.log(thirdChar);
                    if (parseInt(thirdChar) < 5){
                        result = parseFloat(result.toString().substring(0, dotIndex + 3));
                        if (result < 0){
                            input.value = -result + '-';
                        }
                        else{
                            input.value = result + ' ';
                        }
                    } else{
                        if ((parseFloat(result.toString().substring(0, dotIndex + 3)) + 0.01).toString().length > dotIndex + 3){
                            result = parseFloat(result.toString().substring(0, dotIndex + 2) + (parseInt(result.toString().charAt(dotIndex + 2)) + 1));
                            console.log(result);
                        
                        }
                        else{
                            result = parseFloat(result.toString().substring(0, dotIndex + 3))+ 0.01;
                        }
                        
                        if (result < 0){
                            input.value = -result + '-';
                        }
                        else{
                            input.value = result + ' ';
                        }
                    }
                } else{
                    if (result < 0){
                        input.value = -result + '-';
                    }
                    else{
                        input.value = result + ' ';
                    }
                }
            }
            else{
                if (result < 0){
                    input.value = -result + '.-';
                }
                else{
                    input.value = result + '. ';
                }
            }
        }
        currentInput = result.toString();
        shownInput = input.value;
        if(lastInput != ''){
            tempInput = lastInput;
        }
        firstInput = result.toString();
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
    oper ='';
    if (reduction){
        input.value = '0.00 ';
    } else{
        input.value = '0. ';
    }
    isOperatorClicked = false;
}

function resetC(){
    reset();
    memoryStorage = 0;
}

//событие клика
buttons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        var btnVal = event.target.innerText;
        if (btnVal.indexOf('1') != -1 & btnVal.indexOf('2') != -1){
            return;
        }
        if (btnVal.length === 0){
            return;
        }

        if(btnVal === '=') {
            mistakeCheck = 0;
            calculate();
        }
        // Очистка дисплея, добавить исправление ошибки ввода
        else if (btnVal === 'C'){
            resetC();
        }
        else if (btnVal === 'П+'){
            mistakeCheck = 0;
            shownInput = shownInput.replace(',', '.');
            memoryStorage += parseFloat(shownInput);
            reset();
            //currentInput = '';
            //shownInput = '';
            //input.value = '';
        }
        else if (btnVal === 'П-'){
            mistakeCheck = 0;
            shownInput = shownInput.replace(',', '.');
            memoryStorage -= parseFloat(shownInput);
            reset();
            //currentInput = '';
            //shownInput = '';
            //input.value = '';
        }
        else if (btnVal === 'ИП'){
            mistakeCheck = 0;
            currentInput += memoryStorage.toString();
            if (memoryStorage.toString().indexOf('.') != -1){
                const dotIndex = memoryStorage.toString().indexOf('.');
                if (dotIndex + 2 < memoryStorage.toString().length){
                    const thirdChar = (memoryStorage.toString() + '00').charAt(dotIndex + 3);
                    console.log(thirdChar);
                    if (parseInt(thirdChar) < 5){
                        memoryStorage = parseFloat(memoryStorage.toString().substring(0, dotIndex + 3));
                        if (memoryStorage < 0){
                            input.value = -memoryStorage + '-';
                        }
                        else{
                            input.value = memoryStorage + ' ';
                        }
                    } else{
                        if ((parseFloat(memoryStorage.toString().substring(0, dotIndex + 3)) + 0.01).toString().length > dotIndex + 3){
                            memoryStorage = parseFloat(memoryStorage.toString().substring(0, dotIndex + 2) + (parseInt(memoryStorage.toString().charAt(dotIndex + 2)) + 1));
                            console.log(memoryStorage);
                        
                        }
                        else{
                            memoryStorage = parseFloat(memoryStorage.toString().substring(0, dotIndex + 3))+ 0.01;
                            console.log('qwe', memoryStorage);
                        }
                        
                        if (memoryStorage < 0){
                            input.value = -memoryStorage + '-';
                        }
                        else{
                            input.value = memoryStorage + ' ';
                        }
                    }
                } else{
                    if (memoryStorage < 0){
                        input.value = -memoryStorage + '-';
                    }
                    else{
                        input.value = memoryStorage + ' ';
                    }
                }
            }
            else{
                if (memoryStorage < 0){
                    input.value = -memoryStorage + '.-';
                }
                else{
                    input.value = memoryStorage + '. ';
                }
            }
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
                lastInput = lastInput.replace(',', '.');
                var reverseNumber = -parseFloat(lastInput);
                if (reverseNumber < 0){
                    if (reverseNumber.toString().indexOf('.') === -1){
                        input.value = -reverseNumber + '.-';
                    } else{
                        input.value = -reverseNumber + '-';
                    }
                }
                else{
                    if (reverseNumber.toString().indexOf('.') === -1){
                        input.value = reverseNumber + '. ';
                    } else{
                        input.value = reverseNumber + ' ';
                    }
                }
                currentInput = currentInput.split(' ')[0] + ' ' +  currentInput.split(' ')[1] + ' ' + reverseNumber.toString();
                lastInput = reverseNumber.toString();
                shownInput = input.value;
            }else{
                firstInput = firstInput.replace(',', '.');
                var reverseNumber = -parseFloat(firstInput);
                console.log(reverseNumber);
                if (reverseNumber < 0){
                    if (reverseNumber.toString().indexOf('.') === -1){
                        input.value = -reverseNumber + '.-';
                    } else{
                        input.value = -reverseNumber + '-';
                    }
                }
                else{
                    if (reverseNumber.toString().indexOf('.') === -1){
                        input.value = reverseNumber + '. ';
                    } else{
                        input.value = reverseNumber + ' ';
                    }
                }
                currentInput = reverseNumber.toString();
                firstInput = reverseNumber.toString();
                shownInput = reverseNumber.toString();
            }
            console.log(currentInput);
        }
        else if(btnVal === '1/x'){
            mistakeCheck = 0;
            if (currentInput.split(' ').length === 3){
                if (parseFloat(lastInput) === 0){
                    resetC();
                    tempInput = '';
                    input.value = '.............-';
                    return
                }
                var result = 1 / parseFloat(lastInput);
            }else{
                if (parseFloat(firstInput) === 0){
                    resetC();
                    tempInput = '';
                    input.value = '.............-';
                    return
                }
                var result = 1 / parseFloat(firstInput);
            }
            if (result.toString().length >= 14){
                if (result.toString().indexOf('.') === -1){
                    resetC();
                    tempInput = '';
                    input.value = '.............-';
                    return
                }else{
                    result = result.toString().slice(0, 13);
                }
            }
            
            if (reduction === false){
                if (result < 0){
                    input.value = -result + '-';
                }
                else{
                    input.value = result + ' ';
                }
            }else{
                if (result.toString().indexOf('.') != -1){
                    const dotIndex = result.toString().indexOf('.');
                    if (dotIndex + 2 < result.toString().length){
                        const thirdChar = (result.toString() + '00').charAt(dotIndex + 3);
                        console.log(thirdChar);
                        if (parseInt(thirdChar) < 5){
                            result = parseFloat(result.toString().substring(0, dotIndex + 3));
                            if (result < 0){
                                input.value = -result + '-';
                            }
                            else{
                                input.value = result + ' ';
                            }
                        } else{
                            if ((parseFloat(result.toString().substring(0, dotIndex + 3)) + 0.01).toString().length > dotIndex + 3){
                                result = parseFloat(result.toString().substring(0, dotIndex + 2) + (parseInt(result.toString().charAt(dotIndex + 2)) + 1));
                                console.log(result);
                            
                            }
                            else{
                                result = parseFloat(result.toString().substring(0, dotIndex + 3)) + 0.01;
                            }
                            
                            if (result < 0){
                                input.value = -result + '-';
                            }
                            else{
                                input.value = result + ' ';
                            }
                        }
                    } else{
                        if (result < 0){
                            input.value = -result + '-';
                        }
                        else{
                            input.value = result + ' ';
                        }
                    }
                }
                else{
                    if (result < 0){
                        input.value = -result + '.-';
                    }
                    else{
                        input.value = result + '. ';
                    }
                }
            }
            console.log(currentInput);
            if (currentInput.split(' ').length != 3){
                currentInput = result.toString();
                shownInput = currentInput;
                firstInput = currentInput;
            }else{
                currentInput = currentInput.split(' ')[0] + ' ' + currentInput.split(' ')[1] + ' ' + result.toString();
                shownInput = result.toString();
                lastInput = result.toString();
            }
            console.log(currentInput);
        }
        else if(btnVal === '↔'){
            mistakeCheck = 0;
            var sp = currentInput.split(' ');
            currentInput = sp[2] + ' ' + sp[1] + ' ' + sp[0];
            var flag = firstInput;
            firstInput = lastInput;
            lastInput = flag;
            console.log(lastInput);
            if (lastInput.indexOf('.') === -1){
                if (lastInput.indexOf('-') != -1){
                    input.value = lastInput.replace('-', '') + '.-'
                }else{
                    input.value = parseFloat(lastInput) + '. '
                }
            }else{
                if (lastInput.indexOf('-') != -1){
                    input.value = lastInput.replace('-', '') + '-'
                }else{
                    input.value = parseFloat(lastInput) + ' '
                }
            }
            console.log(currentInput);
        }
        else if(btnVal === '.'){
            mistakeCheck = 0;
            if (currentInput.split(' ').length > 1){
                if (lastInput.indexOf('.') === -1){
                    lastInput += '.';
                    currentInput += '.';
                    shownInput = lastInput;
                }
            }
            else{
                if (firstInput.indexOf('.') === -1){
                    firstInput += '.';
                    currentInput += '.';
                    shownInput = firstInput;
                }
            }
        }
        // Операции
        else if(btnVal === '%'){
            mistakeCheck = 0;
            if (oper != ''){
                if (currentInput.split(' ').length >= 3){
                    currentInput += ' ' + btnVal;
                }
            }else{
                currentInput += ' ' + btnVal + ' ';
                timesClicked += 1;
                mistakeCheck = 0;
                isOperatorClicked = true;
                shownInput = '';
            }
        }
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
                    shownInput = firstInput;
                    currentInput += btnVal;
                    if (firstInput.indexOf('.') === -1){
                        if (shownInput.indexOf('-')=== -1){
                            input.value = shownInput + '. ';
                        }else{
                            input.value = shownInput.replace('-', '') + '.-';
                        }
                    }else{
                        if (shownInput.indexOf('-')=== -1){
                            input.value = shownInput + ' ';
                        }else{
                            input.value = shownInput.replace('-', '') + '-';
                        }
                    }

                    console.log(input.value);
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
                if (lastInput.indexOf('.') === -1){
                    if (shownInput.indexOf('-')=== -1){
                        input.value = shownInput + '. ';
                    }else{
                        input.value = shownInput.replace('-', '') + '.-';
                    }
                }else{
                    if (shownInput.indexOf('-')=== -1){
                        input.value = shownInput + ' ';
                    }else{
                        input.value = shownInput.replace('-', '') + '-';
                    }
                }
              }
            }
        }
    });
});
