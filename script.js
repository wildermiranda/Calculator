const calculator = document.querySelector('#calculator')
const keyboard = document.querySelector('#keyboard')
const display = document.querySelector('output')
const clear = document.querySelector('.clear')

keyboard.addEventListener('click', e => {
    // Obter o elemento onde o evento ocorreu e verifique se é um seletor button
    if (e.target.matches('button')) {
        // Obtenha o elemento onde o evento ocorreu
        const key = e.target
        
        // Obter o atributo action do elemento
        const action = key.dataset.action

        const keyContent = key.textContent
        const displayedNumber = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType
        const firstNumber = calculator.dataset.firstNumber
        const operator = calculator.dataset.operator
        const secondNumber = displayedNumber

        
        const calculate = (value1, operator, value2) => {
            let number1 = Number(value1)
            let number2 = Number(value2)
            let result = 0

            if (operator === 'percent') {
                result = number2
            
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

        const resetFontSize = _ => {

            // 0.00001 / 10

            display.classList.remove('small-font')

            if (display.clientWidth > 300 && display.clientWidth < 600) {
                display.classList.add('medium-font')
            }
            
            if (display.clientWidth > 600) {
                display.classList.add('small-font')
            }
        }

        const hideAndShowNumber = _ => {
            display.style.visibility = 'hidden'
            setTimeout( _ => { display.style.visibility = 'visible' }, 100)
        }

    
        if (!action) {
            console.log('Number key')

            clear.textContent = 'CE'

            if (displayedNumber === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') { 
                display.classList.remove('medium-font')
                display.textContent = keyContent
            
            } else {
                if (display.clientWidth >= 270) {
                    display.classList.add('medium-font')
                }

                if (display.clientWidth < 289) {
                    display.textContent = displayedNumber + keyContent
                
                } else {
                    display.classList.remove('medium-font')
                    display.textContent = '0'
                }                
            }
            
            if (calculator.dataset.calculation === 'empty') {
                calculator.dataset.states = 'off'
            
            } else {
                calculator.dataset.states = 'on'
            } 

            calculator.dataset.previousKeyType = 'number'

        
        } else if (action === 'decimal') {  
            console.log('Decimal key')

            clear.textContent = 'CE'
            
            if (!displayedNumber.includes('.')) {
                display.textContent = displayedNumber + '.'
            } 
            
            if (previousKeyType === 'operator' || previousKeyType === 'calculate') { 
                display.textContent = '0.'
            }

            calculator.dataset.previousKeyType = 'decimal'


        } else if (action === 'clear') { 
            console.log('Clear key') 

            clear.textContent = 'AC'

            calculator.dataset.previousKeyType = 'clear'

        
        } else if (action === 'calculate') { 
            console.log('Equal key')

            hideAndShowNumber()
        

            if (firstNumber && operator) {
                if (previousKeyType !== 'calculate') {
                    const calculation = calculate(firstNumber, operator, secondNumber)

                    display.textContent = calculation

                    resetFontSize()

                    calculator.dataset.calculation = calculation
                
                    calculator.dataset.secondNumber = secondNumber
                
                } else {
                    const number = calculator.dataset.secondNumber
                
                    const count = (value1, value2) => {
                        let number1 = Number(value1)
                        let number2 = Number(value2)
                        let result = 0
            
                        if (operator === 'percent') {
                            result = number1
                        
                        } else if (operator === 'add') {
                            result = number1 + number2
            
                        } else if (operator === 'subtract') {
                            result = - number1 + number2
            
                        } else if (operator === 'multiply') {
                            result = number1 * number2
            
                        } else {
                            result = number2 / number1
                        }
    
                        return result
                    }
                    
                    display.textContent = count(number, displayedNumber)
                    
                    resetFontSize()
                }
            } 
            
            calculator.dataset.previousKeyType = 'calculate'
        

        } else {
            console.log('Operator key')

            hideAndShowNumber()


            calculator.dataset.calculation = 'empty'
            
            if (firstNumber && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate' && calculator.dataset.states !== 'on') {
                const calculation = calculate(firstNumber, operator, secondNumber)

                display.textContent = calculation

                resetFontSize()

                calculator.dataset.firstNumber = calculation
                calculator.dataset.calculation = calculation
                
            } else { 
                // Get first number
                calculator.dataset.firstNumber = displayedNumber
            }
        
            if (action === 'percent') {
                display.textContent = calculator.dataset.firstNumber / 100

                resetFontSize()
            }

            // Get operator
            calculator.dataset.operator = action

            calculator.dataset.previousKeyType = 'operator'
        }
    }
})