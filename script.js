const botonesAjuste = document.querySelectorAll('.ajuste');
const mainBox = document.querySelector('.main-box');
const settingsDisplay = document.querySelector('.settings');

let interval;
const changeIncrement = 1;

// envía a la función modificadora el borde que tiene que ajustar y en que sentido
botonesAjuste.forEach(btn => {

    btn.addEventListener('mousedown', () => {
        const btnAction = btn.innerHTML;
        const classList = btn.parentElement.classList.value.split(' ');
        classList.shift();
        const btnLocation = classList;
        interval = setInterval(() => {
            modifyBorder(btnAction, btnLocation)
        }, 5);

    })
    btn.addEventListener('mouseup', () => {
        clearInterval(interval)
    })
    btn.addEventListener('click', () => {
        displayBorders()
    })
})

function modifyBorder(action, location) {
    // console.log('modifying', action, location);

    let boxStyles = window.getComputedStyle(mainBox);
    let topLeft = boxStyles.getPropertyValue('border-top-left-radius').split(' ');
    let topRight = boxStyles.getPropertyValue('border-top-right-radius').split(' ');
    let bottomLeft = boxStyles.getPropertyValue('border-bottom-left-radius').split(' ');
    let bottomRight = boxStyles.getPropertyValue('border-bottom-right-radius').split(' ');

    const bordersArr = [
        topLeft,
        topRight,
        bottomLeft,
        bottomRight
    ]
    bordersArr.forEach(borde => {
        if (borde.length <= 1) borde.push(borde.toString())
    })

    if (location.includes('rightside')) {
        const leftRight = 'right'

        if (location.includes('top')) {
            const topBottom = 'top'

            const unchangedValue = +topRight[0].replace('px', '');
            let changeValue = +topRight[1]?.replace('px', '');

            changeValue = newValue(action, changeValue)

            // mainBox.style.setProperty('border-top-right-radius', `${unchangedValue}px ${changeValue}px`)
            newBorder(topBottom, leftRight, unchangedValue, changeValue)

        }
        if (location.includes('bottom')) {
            const topBottom = 'bottom'

            const unchangedValue = +bottomRight[0].replace('px', '');

            let changeValue = +bottomRight[1]?.replace('px', '');
            changeValue = newValue(action, changeValue)

            // mainBox.style.setProperty('border-bottom-right-radius', `${unchangedValue}px ${changeValue}px`)
            newBorder(topBottom, leftRight, unchangedValue, changeValue)

        }
    }

    if (location.includes('leftside')) {
        const leftRight = 'left'

        if (location.includes('top')) {
            const topBottom = 'top'

            const unchangedValue = +topLeft[0].replace('px', '');
            let changeValue = +topLeft[1]?.replace('px', '');
            changeValue = newValue(action, changeValue)

            newBorder(topBottom, leftRight, unchangedValue, changeValue)
        }
        if (location.includes('bottom')) {
            const topBottom = 'bottom'

            const unchangedValue = +bottomLeft[0].replace('px', '');
            let changeValue = +bottomLeft[1]?.replace('px', '');
            changeValue = newValue(action, changeValue)

            newBorder(topBottom, leftRight, unchangedValue, changeValue)
        }
    }

    if (location.includes('topside')) {
        const topBottom = 'top'

        if (location.includes('left')) {
            const leftRight = 'left'

            const unchangedValue = +topLeft[1].replace('px', '');
            let changeValue = +topLeft[0]?.replace('px', '');
            changeValue = newValue(action, changeValue)

            newBorder(topBottom, leftRight, changeValue, unchangedValue)
        }

        if (location.includes('right')) {
            const leftRight = 'right'

            const unchangedValue = +topRight[1].replace('px', '');
            let changeValue = +topRight[0]?.replace('px', '');
            changeValue = newValue(action, changeValue)

            newBorder(topBottom, leftRight, changeValue, unchangedValue)
        }
    }

    if (location.includes('bottomside')) {
        const topBottom = 'bottom'
        if (location.includes('left')) {
            const leftRight = 'left'
            const unchangedValue = +bottomLeft[1].replace('px', '');
            let changeValue = +bottomLeft[0]?.replace('px', '');
            changeValue = newValue(action, changeValue);

            newBorder(topBottom, leftRight, changeValue, unchangedValue)
        }

        if (location.includes('right')) {
            const leftRight = 'right'
            const unchangedValue = +bottomRight[1].replace('px', '');
            let changeValue = +bottomRight[0]?.replace('px', '');
            changeValue = newValue(action, changeValue)

            newBorder(topBottom, leftRight, changeValue, unchangedValue)
        }
    }
}

function newValue(_action, _changeValue) {
    _action == '+' ? _changeValue += changeIncrement : _changeValue -= changeIncrement;
    return +_changeValue
}

function newBorder(_topBottom, _leftRight, _firstValue, _secondValue) {
    mainBox.style.setProperty(`border-${_topBottom}-${_leftRight}-radius`, `${_firstValue}px ${_secondValue}px`)
}

function displayBorders() {
    // console.log(settingsDisplay)

    const boxStyles = window.getComputedStyle(mainBox);
    let topLeft = boxStyles.getPropertyValue('border-top-left-radius');
    let topRight = boxStyles.getPropertyValue('border-top-right-radius');
    let bottomLeft = boxStyles.getPropertyValue('border-bottom-left-radius');
    let bottomRight = boxStyles.getPropertyValue('border-bottom-right-radius');

    const salida = `
<pre>
border-top-left-radius: ${topLeft};
border-top-right-radius: ${topRight};
border-bottom-left-radius: ${bottomLeft};
border-bottom-right-radius: ${bottomRight};
</pre>
<button class="copy" onClick="copyClipboard()" >Copy to Clipboard</button>
    `
    settingsDisplay.innerHTML = salida;
}

function copyClipboard() {
    const copyText = settingsDisplay.querySelector('pre').innerText;
    navigator.clipboard.writeText(copyText)
    alert('Copied: \n' + copyText)
}
