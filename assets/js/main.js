const password = `FUSCA`;

(function iniciaTermo() {
    disabledWords();
    focusLetter();
    manageMouseDown();
})();

function disabledWords() {
    const wordLines = document.querySelectorAll(`.word-lines`);
    let contador = 0;

    for(el of wordLines) {
        if (contador !== 0) {
            el.classList.add(`word-lines-disabled`);
        }
        contador++;
    }
}

function focusLetter() {
    const letterElement = document.querySelectorAll('.letter');
    
    for(el of letterElement) {
        if (!el.value) {
            el.focus();
            break;
        }
    }
}

function manageMouseDown() {
    document.addEventListener(`mousedown`, (e) => {
        const el = e.target;
        const elParent = el.parentElement;

        if (el.classList.contains(`enter`)) {
            e.preventDefault();
            tryResult();
            return;
        }

        if (el.classList.contains(`backspace`)) {
            e.preventDefault();
            manageButtons(null);
            return;
        }

        if (el.classList.contains(`keyboard-letter`)) {
            e.preventDefault();
            manageButtons(el.innerText);
            return;
        }
        
        if ((el.classList.contains(`letter`) && (elParent ? elParent.parentElement.classList.contains(`word-lines-disabled`) : false))
            || !el.classList.contains(`letter`)) {
            e.preventDefault();
            return;
        }
    });
}

function manageButtons(value) {
    let nextInput;
    let focusElement = document.activeElement;
    focusElement = document.querySelector(`#${focusElement.id}`);

    focusElement.value = value;

    if (value) {
        nextInput = Number(focusElement.id.replace(`input`, ``)) + 1;
    } else {
        nextInput = Number(focusElement.id.replace(`input`, ``)) - 1;
    }
    
    if (((nextInput - 1) % 5  || (!value && nextInput === 1)) && nextInput !== 0) {
        document.querySelector(`#input${nextInput}`).focus();
    }
}

function tryResult() {
    let focusElement = document.activeElement;
    let contador = 0;
    const hits = [];
    const errors = [];

    for (th of focusElement.parentElement.parentElement.children) {
        const inputElement = th.querySelector(`input`);

        if (inputElement.value === password[contador]) {
            hits.push(inputElement.id);
        } else {
            errors.push(inputElement.id);
        }

        contador++;
    }

    valideteErrors(errors);
}

function valideteErrors(errors) {
    /*
    Loop sobre os erros pois precisa ver se uma letra q esta marcada como errada nao esta na palavra, se sim, precisa pintar de amarelo.
    Mas precisa cuidar pois, se a letra esta na palavra, precisa tambem ver se ela nao esta no array dos hints, que sao as que foram acertadas.
    Se sim, colocar esse cara dentro do array halfHit para depois ficar amarelo.
    */
    const halfHit = [];

    errors.forEach(e => {
        const valueError = document.querySelector(`#${e}`).value;
        
    });
}
