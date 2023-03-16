const calculator = document.querySelector('#calculator')
const keyboard = document.querySelector('#keyboard')
const display = document.querySelector('output')

keyboard.addEventListener('click', e => {
    // Obter o elemento onde o evento ocorreu e verifique se é um seletor button
    if (e.target.matches('button')) {
        // Obtenha o elemento onde o evento ocorreu
        const key = e.target

        console.log(key)
        
        // Obter o atributo action do elemento
        const action = key.dataset.action

        const keyContent = key.textContent
        const displayedNumber = display.textContent

        
        const previousKeyType = calculator.dataset.previousKeyType

        if (!action) {
            console.log('Number key')

            if (displayedNumber === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent
            
            } else {
                display.textContent = displayedNumber + keyContent
            }

            calculator.dataset.previousKeyType = 'number'
        
        } else if (action === 'decimal') { 
            console.log('Decimal key')
            
            if (!displayedNumber.includes('.')) {
                display.textContent = displayedNumber + '.'
            
            } 
            
            if (previousKeyType === 'operator') { 
                display.textContent = '0.'
            }

            calculator.dataset.previousKeyType = 'decimal'

        } else if (action === 'clear') { 
            console.log('Clear key') 

            calculator.dataset.previousKeyType = 'clear'
        
        } else if (action === 'calculate') { 
            console.log('Equal key')

            const calculate = (value1, operator, value2) => {
                let number1 = Number(value1)
                let number2 = Number(value2)
                let result = ''

                if (operator === 'percent') {
                    result = number1 / 100 * number2
                
                } else if (operator === 'add') {
                    result = number1 + number2

                } else if (operator === 'subtract') {
                    result = number1 - number2

                } else if (operator === 'multiply') {
                    result = number1 * number2

                } else {
                    result = number1 / number2
                }

                return result
            }

            const firstNumber = calculator.dataset.firstNumber
            const operator = calculator.dataset.operator
            const secondNumber = displayedNumber

            display.textContent = calculate(firstNumber, operator, secondNumber)

            calculator.dataset.previousKeyType = 'calculate'
        
        } else {
            console.log('Operator key')

            // Get first number
            calculator.dataset.firstNumber = displayedNumber
            
            // Get operator
            calculator.dataset.operator = action

            calculator.dataset.previousKeyType = 'operator'
        }
    }
})