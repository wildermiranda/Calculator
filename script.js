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

        
        if (!action) {
            console.log('Number key')

            const previousKeyType = calculator.dataset.previousKeyType

            if (displayedNumber === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent
            
            } else {
                display.textContent = displayedNumber + keyContent
            }
        
        } else if (action === 'decimal') { 
            console.log('Decimal key')

            display.textContent = displayedNumber + '.'

        } else if (action === 'clear') { 
            console.log('Clear key') 
        
        } else if (action === 'calculate') { 
            console.log('Equal key') 
        
        } else {
            console.log('Operator key')

            // Adicionar atributo
            calculator.dataset.previousKeyType = 'operator'
        }
    }
})