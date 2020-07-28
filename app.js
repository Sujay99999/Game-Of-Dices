var score, activeplayer, roundScore, flag;
// beware of the global variables


function startup()
{
    roundScore = 0;
    score = [0,0];
    activeplayer = 0;
    flag = true;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('#dice-img').style.display = 'none';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    var player0Name = prompt("Enter the player 1 Name");
    document.getElementById('name-0').textContent = player0Name;
    var player1Name = prompt("Enter the player 2 Name");
    document.getElementById('name-1').textContent = player1Name;
    
}

function addTheScore()
{
    roundScore = 0;
    document.getElementById('current-' + activeplayer).textContent = roundScore;
    document.getElementById('score-' + activeplayer).textContent = score[activeplayer];
}
function checkTheScore()
{
    if((score[activeplayer] + roundScore) >= 50)
    {
        document.querySelector('#name-' + activeplayer).textContent = 'WINNER!';
        document.querySelector('.player-' + activeplayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + activeplayer + '-panel').classList.add('winner');
        flag = false;
        return true;
    }
    else
    {
        return false;
    }
}

// step 1 : when i click the roll dice i should get a randeom number and change the image respectively
function rollTheDice()
{
    if(flag)
    {
        var random = Math.floor((Math.random())*6) + 1;
        document.querySelector('#dice-img').src = 'dice-' + random + '.png';
    
        if(random === 1)
        {
            document.querySelector('#dice-img').style.display = 'block';
            document.querySelector('#dice-img').style.opacity = 0.5;
            
            if(checkTheScore() == false);
            {
                addTheScore();
                if(activeplayer === 1)
                {
                    activeplayer = 0;
                }
                else{
                    activeplayer = 1;
                }
                document.querySelector('.player-0-panel').classList.toggle('active');
                document.querySelector('.player-1-panel').classList.toggle('active');
            }
    
        }
        else
        {
            document.querySelector('#dice-img').style.display = 'block';
            document.querySelector('#dice-img').style.opacity = 1;
            if(checkTheScore() == false);
            {
                roundScore += random;
                document.getElementById('current-' + activeplayer).textContent = roundScore;
            }     
        }
    }
}

function holdTheDice()
{
    if(flag)
    {
        score[activeplayer] += roundScore;
        roundScore = 0;
        if(checkTheScore()==false)
        {
            addTheScore();
        }    
    }
}
startup();

document.querySelector('.btn-roll').addEventListener('click', rollTheDice);
document.querySelector('.btn-hold').addEventListener('click', holdTheDice);
document.querySelector('.btn-new').addEventListener('click', startup);
document.querySelector('.btn-ins').addEventListener('click', function()
{
    alert(`GAME RULES:

    - The game has 2 players, playing in rounds
    - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
    - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
    - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
    - The first player to reach 100 points on GLOBAL score wins the game
    `);
});