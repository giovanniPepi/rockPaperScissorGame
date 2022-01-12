const pcTurn = pcPlay();
let justPlayed = null;
let usrScore = 0;
let pcScore = 0; 
const resultArea = document.querySelector(".resultArea")

function addReloadBtn () {
    const reloadOption = document.querySelector(".reload");
    reloadOption.addEventListener('click', () => window.location.reload(false));
}
function pcPlay() {
    const turn = ['rock', 'paper', 'scissors'];
    const pcRand = Math.floor(Math.random() * turn.length);
    return (turn[pcRand]);   
};

function gamePlay (usrTurn, pcTurn) {
    if ((usrTurn != 'rock') && (usrTurn != 'paper') && (usrTurn != 'scissors')) {
            return(`Please type 'Rock', 'Paper' or 'Scissors' to play.`);
        } else if (usrTurn  == pcTurn) {
            ++usrScore;
            ++pcScore;
            writeRound (usrTurn, pcTurn);
            return(`It\'s a Draw! You choose ${usrTurn}, computer chooses ${pcTurn} too.`); 
        } else if (pcTurn == 'scissors' && usrTurn  == 'paper') {
            ++pcScore;
            writeRound (usrTurn, pcTurn);
            return(`Nooo! You have lost, you choose ${usrTurn}, computer chooses ${pcTurn}.`);
        } else if (pcTurn == 'paper' && usrTurn  == 'rock') {
            ++pcScore;
            writeRound (usrTurn, pcTurn);
            return(`Noo! You have lost, you choose ${usrTurn}, computer chooses ${pcTurn}.`);
        } else if (pcTurn == 'rock' && usrTurn  == 'scissors') {
            ++pcScore;
            writeRound (usrTurn, pcTurn);
            return(`Nooo! You have lost, you choose ${usrTurn}, computer chooses ${pcTurn}.`);
        } else {
            ++usrScore;
            writeRound (usrTurn, pcTurn);
            return(`YEAH! You have won, you choose ${usrTurn}, computer chooses ${pcTurn}.`)
        }
    };

function playThis (n) {    
    const keyChoice = document.querySelector(`.keyChoice[data-key="${n.keyCode}"]`);
    if (keyChoice == null) return; // not a game key
    if (n.keyCode === justPlayed) return; // avoids CSS stuck when repeated input
    keyChoice.classList.add('playing');
    justPlayed = n.keyCode;
    createResultDiv((gamePlay(keyChoice.id, pcPlay())));     

    if (usrScore >= 5 || pcScore >=5) {
        getFinalResults();
        window.removeEventListener('keydown', playThis);
        addReloadBtn();       
    }
};

function removeTransition (n) {
    if(n.propertyName !== 'transform') return; /*is this necessary? */
    this.classList.remove('playing');
};

function createResultDiv (result) {
    const resultDiv = document.querySelector('.results')
    if (!resultDiv) {
        const resultDiv = document.createElement("div");
        resultDiv.setAttribute("class", "results");  
        resultDiv.textContent = result;
        resultArea.appendChild(resultDiv);        
    } else {
        resultDiv.textContent = result;
    };
};

function writeRound () {
    const header = document.querySelector(".header");
    const userResult = document.querySelector(".userPlay");
    const pcResult = document.querySelector(".pcPlay");
    const pWarning = document.querySelector(".warning");

    if (pWarning) header.removeChild(pWarning);    
    if (!userResult) {
        const userResult = document.createElement("div");    
        userResult.setAttribute("class", "userPlay");
        userResult.textContent = 'User score: ' + usrScore;
        header.appendChild(userResult);
    } else {
        userResult.textContent = 'User score: ' + usrScore;
    };
    if (!pcResult) {
        const pcResult = document.createElement("div");
        pcResult.setAttribute("class", "pcPlay");
       
        pcResult.textContent = 'Computer score: ' + pcScore;
        header.appendChild(pcResult);
    } else {
        pcResult.textContent = 'Computer score: ' + pcScore;
    }    
};

function removeScoreChild () {
    const header = document.querySelector('.header');
    const results = document.querySelector('.resultArea');

    while (header.firstChild) {
        header.removeChild(header.firstChild);
    };
    while(results.firstChild) {
        results.removeChild(results.firstChild);
    }
}

function getFinalResults () { 
    const header = document.querySelector(".header");
    removeScoreChild();
    const finalPlacar = document.createElement("div");
    finalPlacar.setAttribute("class", "finalPlacar");
    
    const reloadOption = document.createElement("button")
    reloadOption.setAttribute("class", "reload");
    reloadOption.textContent="Play Again!";

    if (usrScore > pcScore) {
        finalPlacar.textContent = "Final Score. You: " + usrScore + ". Computer: " +pcScore + ". " + "You win, congratulations! Easy peasy lemon squeezy!";
    } else if (usrScore < pcScore) {
        finalPlacar.textContent = "Final Score. You: " + usrScore + ". Computer: " +pcScore + ". " + "You have lost. Pathetic. Weakness disgust me.";
    } else if (usrScore === pcScore) {
        finalPlacar.textContent = "Final Score. You: " + usrScore + ". Computer: " +pcScore + ". " + "Draw. It was a tough one!";
    }
    header.appendChild(finalPlacar);
    header.appendChild(reloadOption);   
};

const choices = document.querySelectorAll('.keyChoice');
choices.forEach(choice => choice.addEventListener('transitionend', removeTransition));

const noClickArea = document.querySelectorAll(".userChoice");
noClickArea.forEach(click => click.addEventListener('click', () => alert("Please use the keys R, P or S to play.")));

window.addEventListener('keydown', playThis);
window.addEventListener('keyup', () => justPlayed = null)


