const calculator = document.querySelector('#calculator')
const keyboard = document.querySelector('#keyboard')
const display = document.querySelector('output')

const calculate = (n1, operator, n2) => {
    const first = Number(n1)
    const second = Number(n2)

    if (operator === 'add') return first + second

    if (operator === 'subtract') return first - second

    if (operator === 'multiply') return first * second

    if (operator === 'divide') return first / second
}


const getKeyType = (key) => {
    const { action } = key.dataset
    
    if (!action) return 'number'
    
    if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') return 'operator'

    // For everything else, return the action
    return action
}


const createResultString = (key, displayedNumber, calculator) => {
    const keyContent = key.textContent
    const { action } = key.dataset
    const keyType = getKeyType(key)
    const { firstNumber, modifier, operator, previousKeyType } = calculator.dataset
    
    if (keyType === 'number') {
        return displayedNumber === '0' || 
        previousKeyType === 'operator' || 
        previousKeyType === 'calculate' ||
        previousKeyType === 'percent'
        ? keyContent
        : displayedNumber + keyContent
    }

    if (keyType === 'plus-minus') return - displayedNumber

    if (keyType === 'percent') return displayedNumber / 100  

    if (keyType === 'decimal') {
        if (!displayedNumber.includes('.')) return displayedNumber + '.'
        
        if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.'

        return displayedNumber
    } 

    if (keyType === 'operator') {
        calculator.dataset.operator = action
      
        return firstNumber && 
        operator && 
        previousKeyType !== 'operator' && 
        previousKeyType !== 'calculate'
        ? calculate(firstNumber, operator, displayedNumber)
        : displayedNumber
    }

    if (keyType === 'clear') return 0

    if (keyType === 'calculate') {
        return operator
        ? previousKeyType === 'calculate'
            ? calculate(displayedNumber, operator, modifier)
            : calculate(firstNumber, operator, displayedNumber) 
        : displayedNumber
    }
}


const updateCalculatorState = (key, calculation, displayedNumber, calculator) => {
    const keyType = getKeyType(key)
    const { firstNumber, operator, previousKeyType } = calculator.dataset
    calculator.dataset.previousKeyType = keyType

    if (keyType === 'operator') {
        calculator.dataset.firstNumber = firstNumber && 
        operator && 
        previousKeyType !== 'operator' &&
        previousKeyType !== 'calculate'
        ? calculation
        : displayedNumber
    }

    if (keyType === 'clear') {
        calculator.dataset.firstNumber = ''
        calculator.dataset.modifier = ''
        calculator.dataset.operator = ''
        calculator.dataset.previousKeyType = ''
    }
    
    if (keyType === 'calculate') {
        if (previousKeyType === 'calculate') return
        
        calculator.dataset.modifier = displayedNumber

        calculator.dataset.firstNumber = ''
    }
}


const updateVisualState = (key) => {
    const keyType = getKeyType(key)

    if (keyType === 'operator') {
        display.style.visibility = 'hidden'
        setTimeout( () => display.style.visibility = 'visible', 100)
    }

    if (keyType === 'number' || keyType === 'decimal'  || keyType === 'clear') {
        display.classList.remove('small-font')
    }
}


keyboard.addEventListener('click', e => {
    // Obter o elemento onde o evento ocorreu e verifique se é um seletor button
    if (!e.target.matches('button')) return
        
        const key = e.target 
        const displayedNumber = display.textContent

        // Pure function
        const resultString = createResultString(key, displayedNumber, calculator)

        display.textContent = resultString
        
        updateCalculatorState(key, resultString, displayedNumber, calculator)

        updateVisualState(key)
       
        
        if (display.clientWidth < 338) return
        display.classList.add('small-font')
    
        if (display.clientWidth < 338) return
        display.classList.remove('small-font')
        display.textContent = '0'
})