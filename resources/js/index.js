let textTyped = "";
let javaText = [
    "public class CopyBytes {_n_tpublic static void main(String[] args) throws IOException {_n_n_t_tFileInputStream in = null;_n_t_tFileOutputStream out = null;_n_n_ttry {_n_t_t_tin = new FileInputStream(\"xanadu.txt\");_n_t_t_tout = new FileOutputStream(\"outagain.txt\");_n_t_t_tint c;_n_n_t_t_twhile ((c = in.read()) != -1) {_n_t_t_t_tout.write(c);_n_t_t_t}_n_t_t} finally {_n_t_t_tif (int != null) {_n_t_t_t_tin.close();_n_t_t_t}_n_t_t_tif (out != null) {_n_t_t_t_tout.close();_n_t_t_t}_n_t_t}_n_t}_n}",
    "class helloWorldApp {_n_tpublic static void main(String[] args) {_n_t_tSystem.out.println(\"Hello World\");_n_t}_n}",
    "class Main {_n_tpublic static void main(String[] args) {_n_n_tint weeks = 3;_n_tint days = 7;_n_n_t_tfor (int i = 1; i <= weeks;i++) {_n_t_t_tSystem.out.println(\"Week: \" + i);_n_n_t_t_tfor (int j = 1; j <= days; j++) {_n_t_t_t_tSystem.out.println(\" Day: \" + j);_n_t_t_t}_n_t_t}_n_t}_n}",
    "public class Main {_n_tpublic static void main(String[] args) {_n_t_tSystem.out.println(\"This will be printed\");_n_t}_n}",
    "boolean b = false;_nb = true;_n_nboolean toBe = false;_nb = toBe || !toBe;_nif (b) {_n_tSystem.out.println(toBe);_n}_n_nint children = 0;_nb = children;_nif (children) {_n}_n_nint a;_nboolean b = true;_nboolean c = false;_na = b + c;_nSystem.out.println(a);",
    "int a = 4;_nboolean b = a == 4;_n_nif (b) {_n_tSystem.out.println(\"It's true!\");_n}",
    "String a = new String(\"Wow\");_nString b = new String(\"Wow\");_nString sameA = a;_n_nboolean r1 = a == b;_nboolean r2 = a.equals(b);_nboolean r3 = a == sameA;",
    "for (int i=0; i < arr.length; i++) {_n_tSystem.out.println(arr[i]);_n}",
    "int[] arr = {1, 9, 9, 5};_nfor (int i = 0; i < arr.length; i++) {_n_tint el = arr[i];_n_tSystem.out.println(el);_n}",
    "public class Student {_n_tprivate String name;_n_tpublic String getName() {_n_t_treturn name;_n_t}_n_tpublic void setName(String name) {_n_t_tthis.name = name;_n_t}_n}"
]

let pythonText = [
    "if x < 0:_n_tx = 0_n_tprint('Negative changed to zero')_nelif x == 0:_n_tprint('Zero')_nelif x == 1:_n_tprint('Single')_nelse:_n_tprint('More')",
    "stack = [3, 4, 5]_nstack.append(6)_nstack.append(7)_nstack.pop()_n_n",
    "knights = {'gallahad': 'the pure', 'robin': 'the brave'}_nfor k, v in knights.items():_n_tprint(k, v)",
    "questions = ['name', 'quest', 'favorite color']_nanswers = ['lancelot', 'the holy grail', 'blue']_nfor q, a in zip(questions, answers):_n_tprint('What is your {0}?  It is {1}.'.format(q, a))",
    "def fib(n):_n_ta, b = 0, 1_n_twhile a < n:_n_t_tprint(a, end=' ')_n_t_ta, b = b, a+b_n_tprint()_n_ndef fib2(n):_n_tresult = []_n_ta, b = 0, 1_n_twhile a < n:_n_t_tresult.append(a)_n_t_ta, b = b, a+b_n_treturn result",
    "class Warehouse:_n   purpose = 'storage'_n   region = 'west'_n_nw1 = Warehouse()_nprint(w1.purpose, w1.region)_nw2 = Warehouse()_nw2.region = 'east'_nprint(w2.purpose, w2.region)",
    "class Mapping:_n_tdef __init__(self, iterable):_n_t_tself.items_list = []_n_t_tself.update(iterable)_n_n_tdef update(self, iterable):_n_t_tfor item in iterable:_n_t_t_tself.items_list.append(item)"
]
let cppText = { //need to fill out later

}
let cSharpText = { //need to fill out later

}

let chosenText = javaText;
let textToType = javaText[Math.floor(Math.random() * chosenText.length)];

let pythonSelector = document.getElementById('python');
let javaSelector = document.getElementById('java');
let cSharpSelector = document.getElementById('cSharp');
let cppSelector = document.getElementById('cpp');

pythonSelector.onclick = () => {
    chosenText = pythonText;
    pythonSelector.classList.add('selectedLanguage');
    javaSelector.classList.remove('selectedLanguage');
    cSharpSelector.classList.remove('selectedLanguage');
    cppSelector.classList.remove('selectedLanguage');
}
javaSelector.onclick = () => {
    chosenText = javaText;
    pythonSelector.classList.remove('selectedLanguage');
    javaSelector.classList.add('selectedLanguage');
    cSharpSelector.classList.remove('selectedLanguage');
    cppSelector.classList.remove('selectedLanguage');
}
cSharpSelector.onclick = () => {
    chosenText = cSharpText;
    pythonSelector.classList.remove('selectedLanguage');
    javaSelector.classList.remove('selectedLanguage');
    cSharpSelector.classList.add('selectedLanguage');
    cppSelector.classList.remove('selectedLanguage');
}
cppSelector.onclick = () => {
    chosenText = cppText;
    pythonSelector.classList.remove('selectedLanguage');
    javaSelector.classList.remove('selectedLanguage');
    cSharpSelector.classList.remove('selectedLanguage');
    cppSelector.classList.add('selectedLanguage');
}


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
let shiftKeyDown = false;
let enterKeyDown = false;


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
            } else {
                inputs.push(textToType[i]);
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

    //restart test when you hit shift enter
    if(keyEvent.key == 'Shift'){
        shiftKeyDown = true;
    }
    if(keyEvent.key == 'Enter'){
        enterKeyDown = true;
    }

    if(shiftKeyDown && enterKeyDown){
        resetTypingTest();
    }    
    
    //give new inputs if finished with previous test
    if(inputs.length == 0 && keyEvent.key == 'Enter'){
        resetTypingTest();
    }
}

const logKeyUp = (keyEvent) => {
    if(keyEvent.key == 'Shift'){
        shiftKeyDown = false;
    }
    if(keyEvent.key == 'Enter'){
        enterKeyDown = false;
    }
}

const resetTypingTest = () => {
    textToType = chosenText[Math.floor(Math.random() * chosenText.length)];
    startTime = null;
    wpm = 0;
    letters = [];
    typedLetters = [];
    index = 0;
    inputs = [] //array of all inputs needed to type the code
    correctCharactersTyped = 0;

    while (typingText.firstChild) {
        typingText.removeChild(typingText.firstChild);
    }

    clearInterval(blinkInterval);
    clearInterval(updateLoop);
    setInterval(updateLoop,1000/5);
    blinkInterval = setInterval(blinkCursor,1000/2);
    writeText();
    generateInputs();
    addCursor();
}

const updateLoop = () => {
    //update wpm text
    if(startTime && inputs.length > 0) {
        wpm = Math.floor((60/((Date.now()-startTime)/1000)) * correctCharactersTyped / 5);
        textwpmElement.innerHTML = "Words Per Minute: " + wpm;
    } else if(inputs.length == 0) {
        clearInterval(blinkInterval);
        clearInterval(updateLoop);
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
document.addEventListener('keyup', logKeyUp);

setInterval(updateLoop,1000/5);
blinkInterval = setInterval(blinkCursor,1000/2);
writeText();
generateInputs();
addCursor();

