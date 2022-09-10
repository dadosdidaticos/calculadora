function add(...n){
    let result = 0
    n.forEach((el)=>result+=el)
    return result
}

function subtract(...n){
    let result = n[0]*2
    n.forEach((el)=>result-=el)
    return result
}

function multiply(...n){
    let result = 1
    n.forEach((el)=>result*=el)
    return result
}

function divide(...n){
    let result = n[0]**2
    n.forEach((el)=>{
        result /= el
    })
    return result
}

function operate(operator,x,y){
    if (operator ==='+'){
        executeOperation = add
    }else if(operator ==='-'){
        executeOperation = subtract
    }else if(operator ==='*'){
        executeOperation = multiply
    }else if(operator ==='/'){
        executeOperation = divide
    }
    return executeOperation(x,y)
}

function getKeyValue(e){
    let keyElement = e.target
    displayValue += keyElement.textContent
    display.value = displayValue
}

function splitMulti(str, tokens){
    var tempChar = tokens[0]; // We can use the first token as a temporary join character
    for(var i = 1; i < tokens.length; i++){
        str = str.split(tokens[i]).join(tempChar);
    }
    str = str.split(tempChar);
    return str;
}

function getResult(){
    expression = display.value
    opArr = ['+','-','*','/']
    numbers = splitMulti(expression,opArr)
    operators = expression.split('').filter((el)=>opArr.includes(el))
    displayValue=numbers[0]
    for (let i = 1;i<numbers.length;i++){
        displayValue = operate(operators[i-1],parseFloat(displayValue),parseFloat(numbers[i]))
    }
    display.value = displayValue
    displayValue = ''
}

function clear(){
    displayValue = ''
    display.value = ''
}

function popLastInput(){
    let displayValueArr=displayValue.split('')
    displayValueArr.pop()
    displayValue = displayValueArr.join('')
    display.value = displayValue
    console.log(displayValue)
}

function keyboardGetResult(e){
    e.key=='Enter' ? getResult() : undefined
}

let numbers=[]
let operators=[]
let displayValue = ''

const operatorKeys = document.querySelectorAll('.key.operator, .key.number')
const display = document.querySelector('#display')
const equalKey = document.querySelector('#operate')
const clearKey = document.querySelector('#clear')
const backspaceKey = document.querySelector('#backspace')

operatorKeys.forEach((key)=> key.addEventListener('click',getKeyValue))
clearKey.addEventListener('click',clear)
equalKey.addEventListener('click',getResult)
backspaceKey.addEventListener('click',popLastInput)
document.addEventListener('keypress',keyboardGetResult)