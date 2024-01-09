const container = document.getElementById('container')

const numbers = document.querySelectorAll('.number')
const outputText = document.getElementById('output-text')
const plusKey = document.getElementById('plus')
const minusKey = document.getElementById('minus')
const delKey = document.getElementById('del')
const dotKey = document.getElementById('dot')
const divisionKey = document.getElementById('division')
const multiplicationKey = document.getElementById('multiplication')
const resetKey = document.getElementById('reset')
const resultKey = document.getElementById('result')

let buffer = ''
let operation = ''
let temp = ''
let afterResult = false

multiplicationKey.addEventListener('click', event => {
  const target = event.target

  if (target.tagName === 'DIV' && !target.classList.contains('multiplication')) return
  if (hasOperation()) return

  saveBufferAndOperation('*')
  return
})

divisionKey.addEventListener('click', event => {
  const target = event.target

  if (target.tagName === 'DIV' && !target.classList.contains('division')) return
  if (hasOperation()) return

  saveBufferAndOperation('/')
  return
})

minusKey.addEventListener('click', event => {
  const target = event.target

  if (target.tagName === 'DIV' && !target.classList.contains('minus')) return
  if (hasOperation()) return

  saveBufferAndOperation('-')
  return
})

plusKey.addEventListener('click', event => {
  const target = event.target

  if (target.tagName === 'DIV' && !target.classList.contains('plus')) return
  if (hasOperation()) return

  saveBufferAndOperation('+')
  return
})

delKey.addEventListener('click', event => {
  const target = event.target

  if (target.tagName === 'DIV' && !target.classList.contains('del')) return

  del()

  return
})

dotKey.addEventListener('click', event => {
  const target = event.target

  if (target.tagName === 'DIV' && !target.classList.contains('dot')) return
  if (hasDot()) return

  outputText.innerHTML += '.'

  return
})

numbers.forEach(node => {
  node.addEventListener('click', event => {
    const target = event.target

    if (target.tagName === 'DIV' && !target.classList.contains('number')) return

    if (hasOperation()) {
      outputText.innerHTML = ''
      temp += target.innerHTML
      outputText.innerHTML = temp
      return
    }

    if (afterResult) {
      afterResult = false
      outputText.innerHTML = ''
    }

    outputText.innerHTML += target.innerHTML
  })
})

resultKey.addEventListener('click', event => {
  const target = event.target

  if (target.tagName === 'DIV' && !target.classList.contains('result')) return
  if (buffer === '' || !hasOperation() || !outputText.innerHTML === '') return

  result()

  return
})

resetKey.addEventListener('click', event => {
  const target = event.target

  if (target.tagName === 'DIV' && !target.classList.contains('reset')) return

  reset()

  return
})

function dotAtEnd() {
  if (!hasDot()) return

  return outputText.innerHTML.endsWith('.')
}

function hasDot() {
  return outputText.innerHTML.includes('.')
}

function hasOperation() {
  return operation !== ''
}

function add(a, b) {
  return Number.parseFloat(a) + Number.parseFloat(b)
}

function divide(a, b) {
  if (Number.parseFloat(b) === 0) return 'Error: division by zero'
  return Number.parseFloat(a) / Number.parseFloat(b)
}

function subtract(a, b) {
  return Number.parseFloat(a) - Number.parseFloat(b)
}

function multiply(a, b) {
  return Number.parseFloat(a) * Number.parseFloat(b)
}

function reset() {
  clear()
  outputText.innerHTML = ''
}

function del() {
  let temp = outputText.innerHTML

  if (temp === '') return

  outputText.innerHTML = temp.slice(0, temp.length - 1)
}

function result() {
  switch (operation) {
    case '+':
      outputText.innerHTML = add(buffer, outputText.innerHTML)
      break
    case '-':
      outputText.innerHTML = subtract(buffer, outputText.innerHTML)
      break
    case '/':
      outputText.innerHTML = divide(buffer, outputText.innerHTML)
      break
    case '*':
      outputText.innerHTML = multiply(buffer, outputText.innerHTML)
      break
  }

  clear()

  afterResult = true
}

function clear() {
  buffer = ''
  operation = ''
  temp = ''
}

function saveBufferAndOperation(o) {
  operation = o
  buffer = outputText.innerHTML
}

for (let elem of document.querySelectorAll('input[type="radio"][name="theme"]')) {
  elem.addEventListener('input', event => {
    switch (event.target.value) {
      case '1':
        removeClass(container, 'theme-2')
        removeClass(container, 'theme-3')
        addClass(container, 'theme-1')
        break
      case '2':
        removeClass(container, 'theme-1')
        removeClass(container, 'theme-3')
        addClass(container, 'theme-2')
        break
      case '3':
        removeClass(container, 'theme-1')
        removeClass(container, 'theme-2')
        addClass(container, 'theme-3')
        break
    }
  })
}

function removeClass(node, _class = '') {
  node.classList.remove(_class)
}

function addClass(node, _class = '') {
  node.classList.add(_class)
}
