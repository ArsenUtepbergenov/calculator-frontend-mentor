const container = document.getElementById('container')

for (let elem of document.querySelectorAll('input[type="radio"][name="theme"]')) {
  elem.addEventListener('input', event => {
    switch (event.target.value) {
      case '1':
        removeStyleClass(container, 'theme-2')
        removeStyleClass(container, 'theme-3')
        addStyleClass(container, 'theme-1')
        break
      case '2':
        removeStyleClass(container, 'theme-1')
        removeStyleClass(container, 'theme-3')
        addStyleClass(container, 'theme-2')
        break
      case '3':
        removeStyleClass(container, 'theme-1')
        removeStyleClass(container, 'theme-2')
        addStyleClass(container, 'theme-3')
        break
    }
  })
}

function removeStyleClass(node, _class = '') {
  node.classList.remove(_class)
}

function addStyleClass(node, _class = '') {
  node.classList.add(_class)
}
