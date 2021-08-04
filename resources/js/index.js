let textTyped = "";
let textToType = "if(yourMom === true)\{_n_tscale = broken\;_n\}_nelse\{_n_tconsole.log(\"hi\")\;_n\}";

const textwpmElement = document.getElementById('wpmText');
const typingText = document.getElementById('typingText');
let startTime;
let wpm = 0;

let letters = [];
let typedLetters = [];
let index = 0;
let inputs = [] //array of all inputs needed to type the code
let correctCharactersTyped = 0;
let blinkInterval;

const generateInputs = () => {
    for(let i = 0; i < textToType.length; i++) {
        if(textToType[i] == '_') {//new line
            if(textToType[i+1] == 'n') {
                inputs.push('Enter');
                i++;
            } else if(textToType[i+1] == 't') {
                inputs.push('Tab');
                i++;
            }
        } else {
            inputs.push(textToType[i]);
        }
    }
}

const writeText = () => {
    for(let i = 0; i< textToType.length; i++ ){
        if(textToType[i] == '_') {//new line
            if(textToType[i+1] == 'n') {
                let b = document.createElement('div');
                b.id = 'enterIconContainer';
                let c = document.createElement('img');
                c.id = 'enterIcon';
                c.src = "resources/images/enterIcon.svg";
                b.appendChild(c);
                typingText.appendChild(b);
                letters.push(b);

                let a = document.createElement('br');
                typingText.appendChild(a);

                i++;
                continue;
            }
        }
        if(textToType[i] == '_') {//tab
            if(textToType[i+1] == 't') {
                let b = document.createElement('div');
                b.id = 'tabIconContainer';
                let c = document.createElement('img');
                c.id = 'enterIcon';
                c.src = "resources/images/tabIcon.svg";
                b.appendChild(c);
                typingText.appendChild(b);
                letters.push(b);

                let a = document.createElement('span');
                a.innerHTML = '____';
                a.classList.add('space');
                typingText.appendChild(a);
                i++;
                continue;
            }
        }
        if(textToType[i] == ' ') {//space
            let a = document.createElement('span');
            a.innerHTML = '_';
            a.classList.add('space');
            typingText.appendChild(a);
            letters.push(a);
            continue;
        }
        
        let a = document.createElement('span');
        a.innerHTML = textToType[i];
        typingText.appendChild(a);
        letters.push(a);
    }
}

const logKey = (keyEvent) => {
    if(keyEvent.key == 'Tab'){ //prevents tab from tabbing to the tab bar of the screen
        keyEvent.preventDefault();
    }
    if(keyEvent.key == inputs[0]) {
        correctCharactersTyped++;
        inputs.shift();
        typedLetters.unshift(letters[0]);
        letters.shift();
        removeCursor();
        if(inputs.length > 0) {
        addCursor();
        }
        if(typedLetters[0].innerHTML !== '_'){
            typedLetters[0].style.color = "gray";
        }
        if(typedLetters[0].id === 'tabIconContainer'|| typedLetters[0].id === 'enterIconContainer') {
            typedLetters[0].style.display = 'none';
        }
        //start counting wpm
        if(!startTime) {
            startTime = Date.now();
        }
    }
}

const updateLoop = () => {
    //update wpm text
    if(startTime && inputs.length > 0) {
        wpm = Math.floor((60/((Date.now()-startTime)/1000)) * correctCharactersTyped / 5);
        textwpmElement.innerHTML = "Words Per Minute: " + wpm;
    } else if(inputs.length == 0) {
        clearInterval(blinkInterval);
    }
}

const addCursor = () => {
    let blinker = document.createElement('span');
    blinker.id = "blinker";
    letters[0].prepend(blinker);
}

const removeCursor = () => {
    document.getElementById("blinker").remove();
}

const blinkCursor = () => {
    let blinker = document.getElementById('blinker');
    if(blinker.style.display == 'none') {
        blinker.style.display = 'inline';
    } else {
        blinker.style.display = 'none';
    }
}

document.addEventListener('keydown', logKey);
setInterval(updateLoop,1000/5);
blinkInterval = setInterval(blinkCursor,1000/2);
writeText();
generateInputs();
addCursor();

