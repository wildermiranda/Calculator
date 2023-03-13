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

            // console.log(previousKeyType)
        
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

            // Adicionar o atributo data-previous-key-tipe a div calculator se os operadores forem clicados. O motivo de criar este atributo é que quando um operador for clicado, o número digitado em seguida irá substituir o número que foi digitado inicialmente. Esse atributo é uma ligação entre o 'Operator key' com o 'Number key'.

            calculator.dataset.previousKeyType = 'operator'
            // console.log(calculator) 
        }
    }
})