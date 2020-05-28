/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScores, activePlayer, scoreToWin, gamePlaying;

//dice = Math.floor(Math.random()*6)+1;
//console.log(dice);
//textContent will alter the text under the element
//innerHTML will accept adding HTML elements under a given element
//document.querySelector('#current-'+activePlayer).textContent = dice;
// document.querySelector('#current-'+activePlayer).innerHTML = '<em>' + dice + '</em>';

scoreToWin = 20;
init();

document.querySelector('.btn-new').addEventListener('click', init);

//Handling action on Roll Dice
document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying) {
        //1. Generate random number
        var dice = Math.floor(Math.random() * 6) + 1;
        //2. change the dice class's src

        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';


        if (dice !== 1) {
            roundScores += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScores;
        } else {
            togglePlayer();
        }

    }else{
        alert("Please click on New Game to play again!");
    }
});

//Handling action on HOLD score
document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying) {
        scores[activePlayer] += roundScores;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        if (scores[activePlayer] >= scoreToWin) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner\!';
            document.querySelector('.dice').style.display='none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            togglePlayer();

        }
    } else{
        alert("Please click on New Game to play again!");
    }
});

function togglePlayer() {

    roundScores = 0;
    activePlayer === 0 ? activePlayer=1 : activePlayer=0;
    document.getElementsByClassName('.player-current-score').textContent='0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display='none';
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    //document.querySelector('.dice').style.display='none';
}
function init() {
    //Set all the scores to 0
    scores = [0, 0];
    roundScores = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('#score-0').textContent='0';
    document.querySelector('#score-1').textContent='0';
    document.querySelector('#current-0').textContent='0';
    document.querySelector('#current-1').textContent='0';
    document.querySelector('.dice').style.display='none';
    document.querySelector('#name-0').textContent='Player 1';
    document.querySelector('#name-1').textContent='Player 2';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

}