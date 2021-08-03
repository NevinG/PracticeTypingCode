let textTyped = "";
let textToType = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const textTypedElement = document.getElementById('textTyped');
const textToTypeElement = document.getElementById('textToType');
const textHighlightorElement = document.getElementById('textHighlightor');
const textcpmElement = document.getElementById('cpmText');

let blinkHighlightorCooldown = false;
let startTime;
let cpm = 0;

const updateText = () => {
    textTypedElement.innerHTML = textTyped;
    if(textToType[0] === " "){
        textToTypeElement.innerHTML = "&nbsp;" + textToType.substring(1);
    } else {
        textToTypeElement.innerHTML = textToType;
    }
}

const logKey = (keyEvent) => {
    if(keyEvent.key === textToType[0]) {
        textTyped += textToType[0];
        textToType = textToType.substring(1);
        updateText();
    }

    textHighlightorElement.style.display = 'inline';
    blinkHighlightorCooldown = true;
    clearTimeout();
    setTimeout(() => blinkHighlightorCooldown = false, 1000);

    if(!startTime) {
        startTime = Date.now();
    }
}

const blinkTextHighlightor = () => {
    if(blinkHighlightorCooldown) return;

    if(textHighlightorElement.style.display === 'none') {
        textHighlightorElement.style.display = 'inline';
    } else {
        textHighlightorElement.style.display = 'none';
    }
}

const updateLoop = () => {
    //update cpm text
    if(startTime && textToType.length > 0) {
        cpm = Math.floor((60/((Date.now()-startTime)/1000)) * textTyped.length / 5);
        textcpmElement.innerHTML = "Words Per Minute: " + cpm;
    }
}

document.addEventListener('keydown', logKey);
setInterval(blinkTextHighlightor,500);
setInterval(updateLoop,1000/5);
updateText();

