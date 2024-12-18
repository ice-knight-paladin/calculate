const buttons = document.querySelectorAll(".buttons");
const input1 = document.querySelector("#result1");
const input2 = document.querySelector("#result2");
const input3 = document.querySelector("#result3");
const input4 = document.querySelector("#result4");
const input5 = document.querySelector("#result5");
const input6 = document.querySelector("#result6");
const input7 = document.querySelector("#result7");
const input8 = document.querySelector("#result8");
const input9 = document.querySelector("#result9");
const input10 = document.querySelector("#result10");
const input11 = document.querySelector("#result11");
const input12 = document.querySelector("#result12");
const input13 = document.querySelector("#result13");
const input14 = document.querySelector("#result14");

function inputShow(stroka){
    if (stroka.split('.').length > 3 || stroka.length === 15){
        input1.value = '';
        input2.value = ' .';
        input3.value = ' .';
        input4.value = ' .';
        input5.value = ' .';
        input6.value = ' .';
        input7.value = ' .';
        input8.value = ' .';
        input9.value = ' .';
        input10.value = ' .';
        input11.value = ' .';
        input12.value = ' .';
        input13.value = ' .';
        input14.value = '-';
        return;
    }
    var flag = -1;
    while (stroka.length < 15){
        stroka = '0' + stroka;
    }
    var stroka1 = stroka.split('');
    stroka = '';
    for (let i = 0; i < stroka1.length; i++){
        stroka += stroka1[i];
        if (stroka1[i] === '0' && stroka1[i + 1] != '0' && flag === -1){
            flag = i;
            if (stroka1[i + 1] === '.'){
                flag--;
            }
        }
        if (stroka1[i + 1] === '.'){
            stroka += stroka1[i + 1];
            i++;
        }
        stroka += 'q';
    }

    console.log(flag);
    stroka1 = stroka.split('q');
    for (let i = 0; i <= flag; i++){
        stroka1[i] = ' ';
    }
    input1.value = stroka1[0];
    input2.value = stroka1[1];
    input3.value = stroka1[2];
    input4.value = stroka1[3];
    input5.value = stroka1[4];
    input6.value = stroka1[5];
    input7.value = stroka1[6];
    input8.value = stroka1[7];
    input9.value = stroka1[8];
    input10.value = stroka1[9];
    input11.value = stroka1[10];
    input12.value = stroka1[11];
    input13.value = stroka1[12];
    input14.value = stroka1[13];
}

function inputShowR(){
    stroka = input1.value + input2.value + input3.value + input4.value + input5.value + input6.value + input7.value + input8.value + input9.value + input10.value + input11.value + input12.value + input13.value + input14.value;
    if (input14.value === ' '){
        return stroka.replaceAll(' ', '') + ' ';
    }
    return stroka.replaceAll(' ', '');
}


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
var reduction = true;
var ymem = '';
inputShow('0.00 ');
var isP = false;
var isPressDot = false;
var isFirst = true;
var proverkaNaPP = true;
var testX = false;
var tryd = false;

function fun1() {
    var ch;
    ch = document.getElementById("one");
    if (ch.checked) {
        reduction = false;
    } else {
        reduction = true;
    }

    if (reduction){
        inputShow('0.00 ');
        currentInput = '0.00 ';
        resetC();
    } else{
        inputShow('0. ');
        currentInput = '0. ';
        resetC();
    }
}

function calculate(){
    try{
        if (!oper && currentInput.indexOf('%') === -1){
            return;
        }
        currentInput = currentInput.replaceAll('  ', ' ');
        console.log(lastInput, isOperatorClicked, testX, tempInput, firstInput, currentInput);
        if (firstInput === '' && lastInput != ''){
            currentInput = '0' + currentInput;
        }
        console.log(currentInput, 'dytyutyty');
        if(lastInput === '' && isOperatorClicked === true && testX === false){
            if (tempInput === ''){
                currentInput += firstInput;
                lastInput = firstInput;
            } else{
                currentInput += tempInput;
                lastInput = tempInput;
            }
        }
        console.log(timesClicked, firstInput, lastInput, ymem, 'dwdwd', oper, currentInput);
        if (testX && lastInput === '' && oper != ''){
            currentInput += + ymem;
        }
        else if(lastInput !='' && oper !='' && timesClicked >2 && timesClicked < 10)
        {
            currentInput+= lastInput;
        }
        if (currentInput.indexOf('- -') != -1){
            currentInput = currentInput.replace('- -', '+');
        }
        console.log(currentInput.split(' ')[0], currentInput.split(' '), 'fwfwffw');
        if (currentInput.split(' ')[0] === '' && currentInput.split(' ')[2] === ''){
            currentInput = '0 '+ currentInput.split(' ')[1] + ' 0';
        }
        console.log(currentInput, 'fwfwffw');
        if (currentInput.split(' ')[0] === ''){
            currentInput = '0' + ' ' + currentInput;
        }
        console.log(currentInput);
        if (currentInput.includes('%')) {
            console.log(currentInput.indexOf('%'), (currentInput.length - 1));
            firstInput = currentInput.split(' ')[0];
            lastInput = currentInput.split(' ')[2];
            console.log(firstInput, lastInput, 'ffffff');
            if (currentInput.indexOf('%') === (currentInput.length - 1)){
                var t = parseFloat(firstInput) /100 *parseFloat(lastInput);
                currentInput = firstInput + ' '+ oper +' '+t;
            }
            else{
                var t = parseFloat(firstInput) / 100 * parseFloat(lastInput);
                console.log(t);
                currentInput = t.toString().substring(0, 14);
            }
        }
        var result = 0;
        console.log(lastInput, currentInput);
        if (currentInput.split(' ')[2] === '0' &&  currentInput.indexOf("/") != -1){
            result = 99999999999999;
        }
        else{
            if (currentInput.split(' ').length >= 2){
                result = eval(currentInput);
            }else{
                result = parseFloat(currentInput);
            }
        }
        if (result.toString().indexOf('e-') != -1){
            result = 0;
            console.log(result, 'gwgge');
        }
        if (result.toString().indexOf('.') != -1){
            if (result.toString().split('.')[0].length === 12){
                result = parseFloat(result.toString().substring(0, 12));
            }
        } 


        console.log(result, 'gwgge');
        if (reduction === false){
            if (result < 0){
                if (result.toString().indexOf('.') != -1){
                    inputShow(parseFloat(-result.toString().substring(0, 14)).toString() + '-');
                }else{
                    inputShow(parseFloat(-result.toString().substring(0, 13)).toString() + '.-');
                }
            }
            else{
                if (result.toString().indexOf('.') != -1){
                    inputShow(parseFloat(result.toString().substring(0, 13)).toString() + ' ');
                }else{
                    inputShow(parseFloat(result.toString().substring(0, 12)).toString() + '. ');
                }
            }
        }else{
            if (result.toString().indexOf('.') != -1){
                const dotIndex = result.toString().indexOf('.');
                if (dotIndex + 2 < result.toString().length){
                    const thirdChar = (result.toString() + '00').charAt(dotIndex + 3);
                    console.log(thirdChar);
                    if (parseInt(thirdChar) < 5){
                        console.log("wfwfff");
                        result = parseFloat(result.toString().substring(0, dotIndex + 3));
                        if (result.toString().indexOf('.') === -1){
                            if (result < 0){
                                inputShow(-result + '.00-');
                            }else{
                                inputShow(result + '.00 ');
                            }
                        }
                        else{if (result < 0){
                            if (result.toString().split('.')[1].length === 2){
                                inputShow(-result + '-');
                            }else if (result.toString().split('.')[1].length === 1){
                                inputShow(-result + '0-');
                            }else{
                                inputShow(-result + '00-');
                            }
                        }
                        else{
                            if (result.toString().split('.')[1].length == 2){
                                inputShow(result + ' ');
                            }else if (result.toString().split('.')[1].length == 1){
                                inputShow(result + '0 ');
                            }else{
                                inputShow(result + '00 ');
                            }
                        }
                    }
                    } else{
                        console.log('13131313313', result);
                        result = parseFloat(result.toString().substring(0, dotIndex + 3))
                        if (result < 0){
                            result = parseFloat((result - 0.01).toString().substring(0, dotIndex + 2));
                        }else{
                            result = parseFloat((result + 0.01).toString().substring(0, dotIndex + 2))
                        }
                        console.log('13131313313', result);

                        if (result < 0){
                            if (result.toString().split('.')[1].length == 2){
                                inputShow(-result + '-');
                            }else if (result.toString().split('.')[1].length == 1){
                                inputShow(-result + '0-');
                            }else{
                                inputShow(-result + '00-');
                            }
                        }
                        else{
                            if (result.toString().split('.')[1].length == 2){
                                inputShow(result + ' ');
                            }else if (result.toString().split('.')[1].length == 1){
                                inputShow(result + '0 ');
                            }else{
                                inputShow(result + '00 ');
                            }
                        }
                    }
                } else{
                    if (result < 0){
                        if (result.toString().split('.')[1].length == 2){
                            inputShow(-result + '-');
                        }else if (result.toString().split('.')[1].length == 1){
                            inputShow(-result + '0-');
                        }else{
                            inputShow(-result + '00-');
                        }
                    }
                    else{
                        if (result.toString().split('.')[1].length == 2){
                            inputShow(result + ' ');
                        }else if (result.toString().split('.')[1].length == 1){
                            inputShow(result + '0 ');
                        }else{
                            inputShow(result + '00 ');
                        }
                    }
                }
            }
            else{
                if (result < 0){
                    inputShow(-result + '.00-');
                }
                else{
                    inputShow(result + '.00 ');
                }
            }

        }
        currentInput = result.toString();
        shownInput = inputShowR();
        if(lastInput != ''){
            tempInput = lastInput;
        } else{
            tempInput = firstInput;
        }
        firstInput = result.toString();
        lastInput = '';
        isOperatorClicked = false;
        isP = false;
        oper = '';
        timesClicked = 0;
        isPressDot = false;
        isFirst = true;
        trueX = false;
        var tt = 0;
        tryd = true;
        testX = false;
        if (result < 0){
            tt = tt + 1;
        }
        if (result.toString().includes('.')){
            tt = tt + 1;
        }
        if (inputShowR().length > 14 & inputShowR().indexOf('.') != inputShowR().length - 2){
            inputShow(parseFloat(inputShowR().substring(0, 12 + tt)).toString());
        }
        if(result > (10**12 - 1) || result.toString().indexOf('e') != -1 || inputShowR().length > 14) {
            tempInput = '';
            reset();
            inputShow('. . . . . . . . . . . . . -');
            return;  
        }
    } catch(e) {
        console.log('ERROROROORORRO');
        currentInput = '';
        shownInput = '';
    }
}

function canAddToInput(value) {
    if (!isOperatorClicked){
        if (reduction) {
            return (inputShowR() + value).length <= 14 || ((inputShowR().split('')[inputShowR().length - 2] === '0' || inputShowR().split('')[inputShowR().length - 2] === '0') && isPressDot);
        }
        return (inputShowR() + value).length <= 14;
    }
    else{
        if (isFirst) {return true}
            if (reduction) {
                return (inputShowR() + value).length <= 14 || ((inputShowR().split('')[inputShowR().length - 2] === '0' || inputShowR().split('')[inputShowR().length - 2] === '0') && isPressDot);
            }
        return (inputShowR() + value).length <= 14;}
    }

function reset(){
    currentInput = '';  
    shownInput = '';  
    lastInput = '';  
    firstInput = '';  
    tempInput = '';
    oper ='';
    ymem = '';
    isFirst = true;
    isPressDot = false;
    if (reduction){
        inputShow('0.00 ');
    } else{
        inputShow('0. ');
    }
    isOperatorClicked = false;
}

function resetC(){
    reset();
    isP = false;
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
            console.log(shownInput);
            if (shownInput === ''){
                shownInput = '0';
            }
            if (shownInput.indexOf('-') != -1){
                if (shownInput.split('')[0] != '-'){
                    shownInput = '-' + shownInput.substring(0, shownInput.length -2);
                }
            }
            console.log(shownInput, memoryStorage, currentInput, 'ffefefefefe');
            memoryStorage += parseFloat(shownInput);
            isP = true;
            proverkaNaPP= true;
            //currentInput = '';
            //shownInput = '';
        }
        else if (btnVal === 'П-'){
            mistakeCheck = 0;
            if (shownInput === ''){
                shownInput = '0';
            }
            if (shownInput.indexOf('-') != -1){
                if (shownInput.split('')[0] != '-'){
                    shownInput = '-' + shownInput.substring(0, shownInput.length -2);
                }
            }
            memoryStorage -= parseFloat(shownInput);
            isP = true;
            proverkaNaPP = true;
            //currentInput = '';
            //shownInput = '';
        }
        else if (btnVal === 'ИП'){
            proverkaNaPP = true;
            isP = false;
            mistakeCheck = 0;
            console.log(memoryStorage, 'wdfwdwdw');
            if (memoryStorage.toString() === 'NaN'){
                memoryStorage = 0;
            }
            console.log(memoryStorage, 'dwdwdwdwdwdwd');
            if (memoryStorage.toString().indexOf('.') != -1){
                if (memoryStorage.toString().split('.')[0].length >= 11){
                    return;
                }
            }
            else if(memoryStorage > (10**12 - 1) || memoryStorage.toString().indexOf('e') != -1) {
                tempInput = '';
                reset();
                inputShow('. . . . . . . . . . . . . -');
                return;  
            }
            console.log(currentInput, 'Q111');
            if (oper != ''){
                currentInput += memoryStorage.toString();
            }
            console.log(currentInput, 'Q222');
            if (oper === ''){
                currentInput = memoryStorage.toString();
            }
            console.log(currentInput, 'Q333');
            if (oper === ''){
                firstInput = memoryStorage.toString();
            } else{
                lastInput = memoryStorage.toString();
            }
            console.log(firstInput, lastInput, currentInput);
            if (reduction){
                if (memoryStorage.toString().indexOf('.') != -1){
                    const dotIndex = memoryStorage.toString().indexOf('.');
                    if (dotIndex + 2 < memoryStorage.toString().length){
                        const thirdChar = (memoryStorage.toString() + '00').charAt(dotIndex + 3);
                        console.log(thirdChar);
                        if (parseInt(thirdChar) < 5){
                            memoryStorage = parseFloat(memoryStorage.toString().substring(0, dotIndex + 3));
                            if (memoryStorage < 0){
                                if (memoryStorage.toString().split('.')[1].length == 2){
                                    inputShow(-memoryStorage + '-');
                                }else if (memoryStorage.toString().split('.')[1].length == 1){
                                    inputShow( -memoryStorage + '0-');
                                }else{
                                    inputShow( -memoryStorage + '00-');
                                }
                            }
                            else{
                                if (memoryStorage.toString().split('.')[1].length == 2){
                                    inputShow(memoryStorage + ' ');
                                }else if (memoryStorage.toString().split('.')[1].length == 1){
                                    inputShow(memoryStorage + '0 ');
                                }else{
                                    inputShow(memoryStorage + '00 ');
                                }
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
                                if (memoryStorage.toString().split('.')[1].length == 2){
                                    inputShow(-memoryStorage + '-');
                                }else if (memoryStorage.toString().split('.')[1].length == 1){
                                    inputShow(-memoryStorage + '0-');
                                }else{
                                    inputShow(-memoryStorage + '00-');
                                }
                            }
                            else{
                                if (memoryStorage.toString().split('.')[1].length == 2){
                                    inputShow(memoryStorage + ' ');
                                }else if (memoryStorage.toString().split('.')[1].length == 1){
                                    inputShow(memoryStorage + '0 ');
                                }else{
                                    inputShow(memoryStorage + '00 ');
                                }
                            }
                        }
                    } else{
                        if (memoryStorage < 0){
                            if (memoryStorage.toString().split('.')[1].length === 2){
                                inputShow(-memoryStorage + '-');
                            }else if (memoryStorage.toString().split('.')[1].length === 1){
                                inputShow(-memoryStorage + '0-');
                            }else{
                                inputShow(-memoryStorage + '00-');
                            }
                        }
                        else{
                            if (memoryStorage.toString().split('.')[1].length === 2){
                                inputShow(memoryStorage + ' ');
                            }else if (memoryStorage.toString().split('.')[1].length === 1){
                                inputShow(memoryStorage + '0 ');
                            }else{
                                inputShow(memoryStorage + '00 ');
                            }
                        }
                    }
                }
                else{
                    if (memoryStorage < 0){
                        inputShow(-memoryStorage + '.00-');
                    }
                    else{
                        inputShow(memoryStorage + '.00 ');
                    }
                }
            }else{
                if (memoryStorage.toString().indexOf('.') != -1){
                    if (memoryStorage < 0){
                        inputShow((-memoryStorage).toString().substring(0, 13) + '-');
                    }
                    else{
                        inputShow((memoryStorage).toString().substring(0, 13) + ' ');
                    }
                }else{
                    if (memoryStorage < 0){
                        inputShow((-memoryStorage).toString().substring(0, 12) + '.-');
                    }
                    else{
                        inputShow((memoryStorage).toString().substring(0, 12) + '. ');
                    }
                }
            }
            shownInput = inputShowR();
        }
        else if (btnVal === 'СП'){
            isP = false;

            mistakeCheck = 0;
            memoryStorage = 0;
            console.log(memoryStorage);
        }
        else if (btnVal === '/-/'){
            isP = false;

            mistakeCheck = 0;
            if (currentInput === ''){
                currentInput = '0';
            }
            currentInput = currentInput.replaceAll('  ', ' ');
            if (parseFloat(currentInput) === 0){
                return;
            }
            if (currentInput.split(' ').length === 3){
                if (lastInput === ''){
                    lastInput = '0';
                }
            }
            if (reduction){
            console.log(currentInput.split(' '));
            if (currentInput.split(' ').length === 3){
                lastInput = lastInput.replace(',', '.');
                var reverseNumber = -parseFloat(lastInput);
                if (reverseNumber.toString().includes('e')){
                    reverseNumber = 0;
                }
                if (reverseNumber < 0){
                    if (reverseNumber.toString().indexOf('.') === -1){
                        inputShow( -reverseNumber + '.00-');
                    } else{
                        if (memoryStorage.toString().split('.')[1].length === 2){
                            inputShow( -reverseNumber + '-');
                        }else if (memoryStorage.toString().split('.')[1].length === 1){
                            inputShow( -reverseNumber + '0-');
                        }else{
                            inputShow( -reverseNumber + '00-');
                        }
                    }
                }
                else{
                    if (reverseNumber.toString().indexOf('.') === -1){
                        inputShow( reverseNumber + '.00 ');
                    } else{
                        if (reverseNumber.toString().split('.')[1].length === 2){
                            inputShow( reverseNumber + ' ');
                        }else if (reverseNumber.toString().split('.')[1].length === 1){
                            inputShow( reverseNumber + '0 ');
                        }else{
                            inputShow( reverseNumber + '00 ');
                        }
                    }
                }
                currentInput = currentInput.split(' ')[0] + ' ' +  currentInput.split(' ')[1] + ' ' + reverseNumber.toString();
                lastInput = reverseNumber.toString();
                shownInput = inputShowR();
            }else{
                firstInput = firstInput.replace(',', '.');
                var reverseNumber = -parseFloat(firstInput);
                console.log(reverseNumber);
                if (reverseNumber < 0){
                    if (reverseNumber.toString().indexOf('.') === -1){
                        inputShow( -reverseNumber + '.00-');
                    } else{
                        if (reverseNumber.toString().split('.')[1].length === 2){
                            inputShow( -reverseNumber + '-');
                        }else if (reverseNumber.toString().split('.')[1].length === 1){
                            inputShow( -reverseNumber + '0-');
                        }else{
                            inputShow( -reverseNumber + '00-');
                        }
                    }
                }
                else{
                    if (reverseNumber.toString().indexOf('.') === -1){
                        inputShow( reverseNumber + '.00 ');
                    } else{
                        if (reverseNumber.toString().split('.')[1].length === 2){
                            inputShow( reverseNumber + ' ');
                        }else if (reverseNumber.toString().split('.')[1].length === 1){
                            inputShow( reverseNumber + '0 ');
                        }else{
                            inputShow( reverseNumber + '00 ');
                        }
                    }
                }
                currentInput = reverseNumber.toString();
                firstInput = reverseNumber.toString();
                shownInput = reverseNumber.toString();
            }}
            else{
                if (currentInput.split(' ').length === 3){
                    var reverseNumber = -parseFloat(lastInput);
                    if (reverseNumber.toString().includes('e')){
                        reverseNumber = 0;
                    }
                    currentInput = currentInput.split(' ')[0] + ' ' +  currentInput.split(' ')[1] + ' ' + reverseNumber.toString();
                    lastInput = reverseNumber.toString();
                    shownInput = reverseNumber.toString();

                } else{
                    var reverseNumber = -parseFloat(firstInput);
                    if (reverseNumber.toString().includes('e')){
                        reverseNumber = 0;
                    }
                    currentInput = reverseNumber.toString();
                    firstInput = reverseNumber.toString();
                    shownInput = reverseNumber.toString();
                }

                var tt = 0;
                if (reverseNumber.toString().includes('.')){
                    tt = tt + 1;
                }
                if (reverseNumber.toString().includes('.')){
                    if (reverseNumber < 0){
                        inputShow( (-reverseNumber).toString().substring(0, 12 + tt) + '-');
                    }else{
                        inputShow( (reverseNumber).toString().substring(0, 12 + tt) + ' ');
                    }
                }else{
                    if (reverseNumber < 0){
                        inputShow( (-reverseNumber).toString().substring(0, 12 + tt) + '.-');
                    }else{
                        inputShow( (reverseNumber).toString().substring(0, 12 + tt) + '. ');
                    }
                }

            }
            console.log(currentInput);
        }
        else if(btnVal === '1/x'){
            testX = true;
            isP = false;
            console.log(firstInput, 'wfwfwfwf', currentInput, "dwdfwfwf");
            if(firstInput === ''){
                console.log('1111');
                if (currentInput != ''){
                    firstInput = currentInput.split(' ')[0];
                }else{
                    firstInput = '0.00 ';
                }
            }
            mistakeCheck = 0;
            if (currentInput.split(' ').length === 3){
                if (parseFloat(lastInput) === 0){
                    resetC();
                    tempInput = '';
                    inputShow( '. . . . . . . . . . . . . -');
                    return
                }
                var result = 1 / parseFloat(lastInput);
            }else{
                if (parseFloat(firstInput) === 0){
                    resetC();
                    tempInput = '';
                    inputShow( '. . . . . . . . . . . . . -');
                    return
                }
                var result = 1 / parseFloat(firstInput);
            }
            if (result.toString().indexOf('e') != -1){
                result = parseFloat(result.toFixed(12));
            }
            if (result.toString().indexOf('e-') != -1){
                resetC();
                return;
            }
            if (result.toString().length >= 14 || result.toString().includes('e+')){
                if (result.toString().indexOf('.') === -1|| result.toString().includes('e+')){
                    resetC();
                    tempInput = '';
                    inputShow( '. . . . . . . . . . . . . -');
                    return
                }else{
                    if (result < 0){
                        if (result.toString().indexOf != -1){
                            result = result.toString().slice(0, 14);
                        }else{
                            result = result.toString().slice(0, 13);
                        }
                    }else{
                        if (result.toString().indexOf != -1){
                            result = result.toString().slice(0, 13);
                        }else{
                            result = result.toString().slice(0, 12);
                        }
                    }
                }
            }

            if (reduction === false){
                if (parseFloat(result) < 0){
                    if (result.toString().indexOf('.') === -1){
                        inputShow( -parseFloat(result) + '.-');
                    }else{
                        inputShow( -parseFloat(result) + '-');
                    }
                }
                else{
                    if (result.toString().indexOf('.') === -1){
                        inputShow( parseFloat(result) + '. ');
                    }else{
                        inputShow( parseFloat(result) + ' ');
                    }
                }
            }else{
                console.log(result, 'ffffff');
                if (result.toString().indexOf('.') != -1){
                    const dotIndex = result.toString().indexOf('.');
                    if (dotIndex + 2 < result.toString().length){
                        const thirdChar = (result.toString() + '00').charAt(dotIndex + 3);
                        console.log(thirdChar);
                        if (parseInt(thirdChar) < 5){
                            result = parseFloat(result.toString().substring(0, dotIndex + 3));
                            if (result === 0){
                                inputShow( '0.00 ');
                            }else{
                            if (result < 0){
                                if (result.toString().split('.')[1].length === 2){
                                    inputShow( -result + '-');
                                }else if (result.toString().split('.')[1].length === 1){
                                    inputShow( -result + '0-');
                                }else{
                                    inputShow( -result + '00-');
                                }
                            }
                            else{
                                if (result.toString().split('.')[1].length === 2){
                                    inputShow( result + ' ');
                                }else if (result.toString().split('.')[1].length === 1){
                                    inputShow( result + '0 ');
                                }else{
                                    inputShow( result + '00 ');
                                }
                            }
                        }
                        } else{
                            result = parseFloat(result.toString().substring(0, dotIndex + 3))
                            if (result < 0){
                                result = parseFloat((result - 0.01).toString().substring(0, 14));
                            }else{
                                result = parseFloat((result + 0.01).toString().substring(0, 14));
                            }
                            if (result < 0){
                                if (result.toString().split('.')[1].length === 2){
                                    inputShow( -result + '-');
                                }else if (result.toString().split('.')[1].length === 1){
                                    inputShow( -result + '0-');
                                }else{
                                    inputShow( -result + '00-');
                                }
                            }
                            else{
                                if (result.toString().split('.')[1].length === 2){
                                    inputShow( result + ' ');
                                }else if (result.toString().split('.')[1].length === 1){
                                    inputShow( result + '0 ');
                                }else{
                                    inputShow( result + '00 ');
                                }
                            }
                        }
                    } else{
                        if (result < 0){
                            if (result.toString().split('.')[1].length === 2){
                                inputShow( -result + '-');
                            }else if (result.toString().split('.')[1].length === 1){
                                inputShow( -result + '0-');
                            }else{
                                inputShow( -result + '00-');
                            }
                        }
                        else{
                            if (result.toString().split('.')[1].length === 2){
                                inputShow(  result + ' ');
                            }else if (result.toString().split('.')[1].length === 1){
                                inputShow(  result + '0 ');
                            }else{
                                inputShow(  result + '00 ');
                            }
                        }
                    }
                }
                else{
                    if (result < 0){
                        inputShow( -result + '.00-');
                    }
                    else{
                        inputShow( result + '.00 ');
                    }
                }
            }
            console.log(currentInput, 'dwdwddw');

            if (currentInput.split(' ').length != 3){
                currentInput = result.toString();
                ymem = firstInput;
                shownInput = currentInput;
                firstInput = currentInput;
            }else{
                ymem = lastInput;
                currentInput = currentInput.split(' ')[0] + ' ' + currentInput.split(' ')[1] + ' ' + result.toString();
                shownInput = result.toString();
                lastInput = result.toString();
            }

            console.log(currentInput);

            timesClicked = 10;
        }
        else if(btnVal === '↔'){
            isP = false;

            mistakeCheck = 0;
            console.log(firstInput, '1Q', lastInput, '2Q', currentInput);
            if (currentInput.split(' ').length != 3){
                return;
            }
            if (lastInput === '' || parseFloat(lastInput) === 0){
                if (reduction){
                    inputShow( '0.00 ');
                }else{
                    inputShow( '0. ');
                }   
                currentInput = '0';
                return;
            }
            if (firstInput === '' || parseFloat(firstInput) === 0){
                if (reduction){
                    inputShow( '0.00 ');
                }else{
                    inputShow( '0. ');
                }
                currentInput = '0';
                return;
            }
            var sp = currentInput.split(' ');
            currentInput = sp[2] + ' ' + sp[1] + ' ' + sp[0];
            var flag = firstInput;
            firstInput = lastInput;
            lastInput = flag;
            console.log(lastInput);
            if (reduction){
                if (lastInput.indexOf('.') === -1){
                    if (lastInput.indexOf('-') != -1){
                        inputShow( lastInput.replace('-', '') + '.00-');
                    }else{
                        inputShow( parseFloat(lastInput) + '.00 ');
                    }
                }else{
                    if (lastInput.indexOf('-') != -1){
                            if (lastInput.split('.')[1].length === 2){
                                inputShow( lastInput.replace('-', '') + '-');
                            }else if (lastInput.split('.')[1].length === 1){
                                inputShow( lastInput.replace('-', '') + '0-');
                            }else{
                                inputShow( lastInput.replace('-', '') + '00-');
                            }
                    }else{
                        if (lastInput.split('.')[1].length === 2){
                            inputShow( lastInput + ' ');
                        }else if (lastInput.split('.')[1].length === 1){
                            inputShow( lastInput + '0 ');
                        }else{
                            inputShow( lastInput + '00 ');
                        }
                    }
                }
            }else{
                if (lastInput.indexOf('.') === -1){
                    if (lastInput < 0){
                        inputShow( lastInput.toString().replace('-', '').substring(0, 13) + '.-');
                    }else{
                        inputShow( lastInput.toString().replace('-', '').substring(0, 13) + '. ');
                    }
                }
            }

            console.log(currentInput);
        }
        else if(btnVal === '.'){
            isPressDot = true;
            mistakeCheck = 0;
            if (currentInput.split(' ').length > 1){
                if (lastInput.indexOf('.') === -1){
                    lastInput += '.';
                    currentInput += '.';
                    shownInput = lastInput;
                }
                if (lastInput.split('')[0] === '.'){
                    lastInput = '0' + lastInput;
                }
            }
            else{
                if (firstInput.indexOf('.') === -1){
                    firstInput += '.';
                    currentInput += '.';
                    shownInput = firstInput;
                }
                if (firstInput.split('')[0] === '.'){
                    firstInput = '0' + firstInput;
                }
            }
        }
        // Операции
        else if(btnVal === '%'){
            isP = false;
            if (currentInput.indexOf('%') != -1){
                return;
            }
            mistakeCheck = 0;
            if (oper != ''){
                if (currentInput.split(' ').length >= 3){
                    currentInput += ' ' + btnVal;
                }
            }else{
                currentInput += ' ' + btnVal + ' ';
                timesClicked += 1;
            }
            mistakeCheck = 0;
            isOperatorClicked = true;
            shownInput = '';
        }
        else if (operators.includes(btnVal)){
            isP = false;
            if (oper != ''){
                return;
            }
            if(btnVal != '%'){
                oper = btnVal;
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
            console.log(isOperatorClicked);
            if (isP){
                if (proverkaNaPP){
                    firstInput = '';
                    proverkaNaPP = false;
                }
                console.log(memoryStorage, currentInput, firstInput);
                if(canAddToInput(btnVal)){
                    console.log(firstInput, firstInput.split('.'), 'fwfwfwffw');
                    if (firstInput.indexOf('.') != -1){
                        if (reduction && firstInput.split('.')[1].length >= 2) {
                            return;
                        }
                    }
                    if (btnVal === '0' && firstInput === '0'){
                        return;
                    }
                    firstInput += btnVal;
                    shownInput = firstInput;
                    currentInput = firstInput;
                    if (firstInput.toString().indexOf('.') === -1){
                        isPressDot = false;
                    }
                    if (reduction && (firstInput.indexOf('.') ===-1 || (firstInput.indexOf('.') != - 1 && firstInput.split('.')[1].length === 0))){
                        if (firstInput.indexOf('.') === -1){
                            if (shownInput.indexOf('-')=== -1){
                                inputShow( shownInput + '.00 ');
                            }else{
                                inputShow( shownInput.replace('-', '') + '.00-');
                            }
                        }else{
                            if (shownInput.indexOf('-')=== -1){
                                inputShow( shownInput + '00 ');
                            }else{
                                inputShow( shownInput.replace('-', '') + '00-');
                            }
                        }
                    }
                    else if (reduction && firstInput.indexOf('.') !=-1 && firstInput.split('.')[1].length === 1){
                            if (firstInput.indexOf('.') === -1){
                                if (shownInput.indexOf('-')=== -1){
                                    inputShow( shownInput + '.0 ');
                                }else{
                                    inputShow( shownInput.replace('-', '') + '.0-');
                                }
                            }else{
                                if (shownInput.indexOf('-')=== -1){
                                    inputShow( shownInput + '0 ');
                                }else{
                                    inputShow( shownInput.replace('-', '') + '0-');
                                }
                            }
                    }
                    else{
                        if (firstInput.indexOf('.') === -1){
                            if (shownInput.indexOf('-')=== -1){
                                inputShow( shownInput + '. ');
                            }else{
                                inputShow( shownInput.replace('-', '') + '.-');
                            }
                        }else{
                            if (shownInput.indexOf('-')=== -1){
                                inputShow( shownInput + ' ');
                            }else{
                                inputShow( shownInput.replace('-', '') + '-');
                            }
                        }
                    }
                }
                return;
            }
            if(!isOperatorClicked){
                if (proverkaNaPP){
                    firstInput = '';
                    proverkaNaPP = false;
                }
                if(canAddToInput(btnVal)){
                    if (tryd){
                        tryd = false;
                        firstInput = '';
                    }
                    console.log(firstInput, firstInput.split('.'));
                    if (firstInput.indexOf('.') != -1){
                        if (reduction && firstInput.split('.')[1].length >= 2) {
                            return;
                        }
                    }
                    if (btnVal === '0' && firstInput === '0'){
                        return;
                    }
                    if (firstInput.split('')[0] === '0' && firstInput.split('')[1]!='.'){
                        firstInput = '';
                    }
                    firstInput += btnVal;
                    shownInput = firstInput;
                    currentInput = firstInput;
                    if (firstInput.toString().indexOf('.') === -1){
                        isPressDot = false;
                    }
                    if (reduction && (firstInput.indexOf('.') ===-1 || (firstInput.indexOf('.') != - 1 && firstInput.split('.')[1].length === 0))){
                        if (firstInput.indexOf('.') === -1){
                            if (shownInput.indexOf('-')=== -1){
                                inputShow( shownInput + '.00 ');
                            }else{
                                inputShow( shownInput.replace('-', '') + '.00-');
                            }
                        }else{
                            if (shownInput.indexOf('-')=== -1){
                                inputShow( shownInput + '00 ');
                            }else{
                                inputShow( shownInput.replace('-', '') + '00-');
                            }
                        }
                    }
                    else if (reduction && firstInput.indexOf('.') !=-1 && firstInput.split('.')[1].length === 1){
                            if (firstInput.indexOf('.') === -1){
                                if (shownInput.indexOf('-')=== -1){
                                    inputShow(shownInput + '.0 ');
                                }else{
                                    inputShow(shownInput.replace('-', '') + '.0-');
                                }
                            }else{
                                if (shownInput.indexOf('-')=== -1){
                                    inputShow(shownInput + '0 ');
                                }else{
                                    inputShow(shownInput.replace('-', '') + '0-');
                                }
                            }
                    }
                    else{
                        if (firstInput.indexOf('.') === -1){
                            if (shownInput.indexOf('-')=== -1){
                                inputShow(shownInput + '. ');
                            }else{
                                inputShow(shownInput.replace('-', '') + '.-');
                            }
                        }else{
                            if (shownInput.indexOf('-')=== -1){
                                inputShow(shownInput + ' ');
                            }else{
                                inputShow(shownInput.replace('-', '') + '-');
                            }
                        }
                    }

                }
            }
            else{
                //oper = '';
              if (canAddToInput(btnVal)) {
                if (lastInput.indexOf('.') != -1){
                    if (reduction && lastInput.split('.')[1].length >= 2) {
                        return;
                    }
                }
                if (btnVal === '0' && lastInput === '0'){
                    return;
                }
                if (lastInput === '0'){
                    lastInput = '';
                }
                console.log(lastInput, 'Q444');
                isFirst = false;
                lastInput += btnVal;
                shownInput = lastInput;
                currentInput += btnVal;
                if (lastInput.toString().indexOf('.') === -1){
                    isPressDot = false;
                }
                if (reduction && lastInput.indexOf('.') ===-1){
                    if (lastInput.indexOf('.') === -1){
                        if (shownInput.indexOf('-')=== -1){
                            inputShow(shownInput + '.00 ');
                        }else{
                            inputShow(shownInput.replace('-', '') + '.00-');
                        }
                    }else{
                        if (shownInput.indexOf('-')=== -1){
                            inputShow(shownInput + '00 ');
                        }else{
                            inputShow(shownInput.replace('-', '') + '00-');
                        }
                    }
                }else if (reduction && lastInput.indexOf('.') !=-1 && lastInput.split('.')[1].length === 1){
                    if (lastInput.indexOf('.') === -1){
                        if (shownInput.indexOf('-')=== -1){
                            inputShow(shownInput + '.0 ');
                        }else{
                            inputShow(shownInput.replace('-', '') + '.0-');
                        }
                    }else{
                        if (shownInput.indexOf('-')=== -1){
                            inputShow(shownInput + '0 ');
                        }else{
                            inputShow(shownInput.replace('-', '') + '0-');
                        }
                    }
                }
                else{
                    if (lastInput.indexOf('.') === -1){
                        if (shownInput.indexOf('-')=== -1){
                            inputShow(shownInput + '. ');
                        }else{
                            inputShow(shownInput.replace('-', '') + '.-');
                        }
                    }else{
                        if (shownInput.indexOf('-')=== -1){
                            inputShow(shownInput + ' ');
                        }else{
                            inputShow(shownInput.replace('-', '') + '-');
                        }
                    }
                }
              }
            }
        }
    });
});
