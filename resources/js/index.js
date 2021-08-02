let textTyped = "";
let textToType = "testing this right now! Here is alot of text to practice with okay! If you cant practice this right then its a no go for all of us okay!";

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

