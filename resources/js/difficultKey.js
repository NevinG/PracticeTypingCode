let possibleCharacters = ['{','[', '}', ']', '<', '>', '-', '+', '-','(', ')', '&', '%', '$', '#', '@', '\\', '\"', '\'']
let character;

const getRandomCharacter = () => {
    character = possibleCharacters[Math.floor(Math.random() * possibleCharacters.length)];
    document.getElementById('characterToType').innerHTML = character;
}

const logKey = (keyEvent) => { 
    if(keyEvent.key == character) {
        getRandomCharacter();
    }
}

getRandomCharacter();
document.addEventListener('keydown', logKey);
