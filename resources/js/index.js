let textTyped = "";
let allText = [
    "public class CopyBytes {_n_tpublic static void main(String[] args) throws IOException {_n_n_t_tFileInputStream in = null;_n_t_tFileOutputStream out = null;_n_n_ttry {_n_t_t_tin = new FileInputStream(\"xanadu.txt\");_n_t_t_tout = new FileOutputStream(\"outagain.txt\");_n_t_t_tint c;_n_n_t_t_twhile ((c = in.read()) != -1) {_n_t_t_t_tout.write(c);_n_t_t_t}_n_t_t} finally {_n_t_t_tif (int != null) {_n_t_t_t_tin.close();_n_t_t_t}_n_t_t_tif (out != null) {_n_t_t_t_tout.close();_n_t_t_t}_n_t_t}_n_t}_n}",
    "class helloWorldApp {_n_tpublic static void main(String[] args) {_n_t_tSystem.out.println(\"Hello World\");_n_t}_n}",
    "class Main {_n_tpublic static void main(String[] args) {_n_n_tint weeks = 3;_n_tint days = 7;_n_n_t_tfor (int i = 1; i <= weeks;i++) {_n_t_t_tSystem.out.println(\"Week: \" + i);_n_n_t_t_tfor (int j = 1; j <= days; j++) {_n_t_t_t_tSystem.out.println(\" Day: \" + j);_n_t_t_t}_n_t_t}_n_t}_n}"
]
let textToType = allText[Math.floor(Math.random() * allText.length)];

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

let collapseTabs = true;
let autoFill = false;

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
                c.id = 'tabIcon';
                c.src = "resources/images/tabIcon.svg";
                b.appendChild(c);
                

                let a = document.createElement('span');
                a.innerHTML = '____';
                a.classList.add('space');
                a.appendChild(b);
                typingText.appendChild(a);
                letters.push(a);
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
        a.classList.add('codeCharacter');
        typingText.appendChild(a);
        letters.push(a);
    }
}
const removeKey = (index) => {
    correctCharactersTyped++;
    let removedInput = inputs.splice(index,1)[0];
    typedLetters.unshift(letters[index]);
    let removedLetter = letters.splice(index,1)[0];
    removeCursor();
    if(inputs.length > 0) {
    addCursor();
    }
    if(!removedLetter.classList.contains('space')){
        removedLetter.style.color = "gray";
    }
    if(removedLetter.id === 'enterIconContainer') {
        removedLetter.style.display = 'none';
    }
    if(removedLetter.children[0] && removedLetter.children[0].id == 'tabIconContainer'){
        removedLetter.children[0].style.display = 'none';
    }

    if(autoFill && removedInput === '}') {
        //remove all tabs and enters on the same line
        //get all letters to the left of the bracker
        let i = index - 1;
        while(inputs[i] != 'Enter' && i >=0 ) {
            if(inputs[i] == 'Tab') {
                removeKey(i);
            }
            i--;
        }

        //remove enter after it
        if(inputs[i+1] == 'Enter') {
            removeKey(i+1);
        }
    }
}

const typeBracket = () => {
    let openBracketCount = 1;
    for(let i = 1; i < inputs.length; i++) {
        if(inputs[i] == '}') {
            openBracketCount--;
            if(openBracketCount === 0) {
                removeKey(i);
            }
        }
        if(inputs[i] == '{') {
            openBracketCount++;
        }
    }
}

const logKey = (keyEvent) => {
    if(keyEvent.key == 'Tab'){ //prevents tab from tabbing to the tab bar of the screen
        keyEvent.preventDefault();
    }
    if(keyEvent.key == inputs[0]) {
        if(collapseTabs && inputs[0] =='Tab') {
            while(inputs.length > 0 && inputs[0] == 'Tab') {
                removeKey(0);
            }
        } else if(autoFill && inputs[0] == '\{') {
            typeBracket();
            removeKey(0)
        }else {
            removeKey(0);
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
    if(blinker && blinker.style.display == 'none') {
        blinker.style.display = 'inline';
    } else if (blinker){
        blinker.style.display = 'none';
    }
}
document.getElementById('collapseTabs').addEventListener('click', () => {
    collapseTabs = document.getElementById('collapseTabs').checked;
});
document.getElementById('autoFill').addEventListener('click', () => {
    autoFill = document.getElementById('autoFill').checked;
});
document.addEventListener('keydown', logKey);
setInterval(updateLoop,1000/5);
blinkInterval = setInterval(blinkCursor,1000/2);
writeText();
generateInputs();
addCursor();

