// ----------------------------------------------------------------------------------------------------
// Tic Tac Toe
// ----------------------------------------------------------------------------------------------------
var gameRunning = true;
var playerTurn = 1;
var items = [];

var playerOneScore = 0;
var playerTwoScore = 0;

// ----------------------------------------------------------------------------------------------------
// Draw the grid on the web page and asign every cell an id and a place in an array (items)
// ----------------------------------------------------------------------------------------------------
for(var i = 0; i < 3; i++) 
{
    items[i] = [];
    var row = document.createElement("tr");
    var node = document.createTextNode("");
    row.appendChild(node);
    var element = document.getElementById("game");
    element.appendChild(row);
    row.id = i;
    for(var a = 0; a < 3; a++) 
    {
        items[i][a] = 
        {
            id: i.toString() + a.toString(), 
            owner: 0
        };
        var cell = document.createElement("td");
        var node = document.createTextNode("");
        cell.appendChild(node);
        var element = document.getElementById(i);
        element.appendChild(cell);
        cell.id = i.toString() + a.toString();
        
    }
}


// ----------------------------------------------------------------------------------------------------
// This part listens for clicks on the site. 
// ----------------------------------------------------------------------------------------------------
document.addEventListener("click", function(e) 
{
    if(e.target.tagName=="TD"){
        if(playerTurn%2 == 1 && 
           items[e.target.id.charAt(0)][e.target.id.charAt(1)].owner == 0 && 
           gameRunning == true) 
        {
            document.getElementById(e.target.id).style.backgroundImage = "url('../Images/circle.png')";
            playerTurn++
            items[e.target.id.charAt(0)][e.target.id.charAt(1)].owner = 1;
        }
        else if(playerTurn%2 == 0 && 
                items[e.target.id.charAt(0)][e.target.id.charAt(1)].owner == 0 && 
                gameRunning == true) 
        {
            document.getElementById(e.target.id).style.backgroundImage = "url('../Images/x.png')";
            playerTurn++;
            items[e.target.id.charAt(0)][e.target.id.charAt(1)].owner = 2;
        }
    }
    if(gameRunning == true) 
    {
        checkWinner(3,3);
    }
})    


// ----------------------------------------------------------------------------------------------------
// This function checks if someone has won the game
// ----------------------------------------------------------------------------------------------------
function checkWinner() {
    for(var i = 0; i < 3; i++) {
        if(items[i][0].owner == items[i][1].owner &&
           items[i][1].owner == items[i][2].owner &&
           items[i][0].owner > 0) 
        {
            endGame(i, 1);
            return;
        } 
        else if(items[0][i].owner == items[1][i].owner &&
                items[1][i].owner == items[2][i].owner &&
                items[1][i].owner > 0)
        {
            endGame(1, i);
            return;
        } 
        
    }
    if(items[0][0].owner == items[1][1].owner &&
       items[1][1].owner == items[2][2].owner &&
       items[1][1].owner > 0) 
    {
        endGame(1, 1);
        return;
    }
    else if(items[0][2].owner == items[1][1].owner &&
            items[1][1].owner == items[2][0].owner &&
            items[1][1].owner > 0) 
    {
        endGame(1, 1);
        return;
    }
    else if(playerTurn == 10) {
        endGame(4,4);
        return;
    }
}


// ----------------------------------------------------------------------------------------------------
// This function ends the game and displays the winner
// ----------------------------------------------------------------------------------------------------
function endGame(a, b) {
    gameRunning = false;
    if(a<3 && b<3 && items[a][b].owner == 1) 
    {
        playerOneScore++;
        document.getElementById("gameOver").innerHTML = ("Player one won!");
        document.getElementById("playerOneScore").innerHTML = (playerOneScore);
    }
    else if(a<3 && b<3 && items[a][b].owner == 2)
    {
        playerTwoScore++;
        document.getElementById("gameOver").innerHTML = ("Player two won!");
        document.getElementById("playerTwoScore").innerHTML = (playerTwoScore)
    }
    else
    {
        document.getElementById("gameOver").innerHTML = ("Tie!");
    }

    document.getElementById("resetButton").style.display = "block";
    document.getElementById("gameOver").style.display = "block";
    document.getElementById("game").style.pointerEvents = "none";
    
}


// ----------------------------------------------------------------------------------------------------
// This function resets the game and allows players to go again
// ----------------------------------------------------------------------------------------------------
function resetGame() {
    for(var i = 0; i <3; i++) {
        for(var a = 0; a < 3; a++) {
            items[i][a].owner = 0;
            items[i][a].owner = 0;
            items[i][a].owner = 0;
            document.getElementById(i.toString() + a.toString()).style.backgroundImage = "none"
        }
        
    }
    gameRunning = true;
    document.getElementById("resetButton").style.display = "none";
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("game").style.pointerEvents = "all";
    playerTurn = 1;
}
