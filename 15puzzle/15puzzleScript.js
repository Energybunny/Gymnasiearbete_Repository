// ----------------------------------------------------------------------------------------------------
// 15-Puzzle
// ----------------------------------------------------------------------------------------------------
let size = 5; //Don't make it too large as it would take an eternity to shuffle
let shuffleIntensity = 6; //This one is exponential (size^shuffleIntensity). DON'T GO TOO HIGH

let gameWidth = "400px";
let tileSpacing = "1px";
let tileSize = parseInt(gameWidth, 10) / size + "px";

let emptyX = size -1;
let emptyY = size -1;

let count = 1;
let moves = 0;

let gameRunning = false;

//These change the css to make choosing a new game size more dynamic
document.documentElement.style.setProperty('--gameSize', size);
document.documentElement.style.setProperty('--gameWidth', gameWidth);
document.documentElement.style.setProperty('--borderWidth', tileSpacing);

// ----------------------------------------------------------------------------------------------------
// Draw the game
// ----------------------------------------------------------------------------------------------------
//A variable for the tiles
let tiles = [];

//Draw the grid using the variable
for(let i = 0; i < size; i++) 
{
    tiles[i] = [];
    

    for(let a = 0; a < size; a++) 
    {

        tiles[i][a] = 
        {
            x: i,
            y: a, 
            num: count,
            status: "occupied"
        }; 
        let tile = document.createElement("div");
        let node = document.createTextNode("");
        tile.appendChild(node);
        let element = document.getElementById("gameFrame");
        element.appendChild(tile);
        tile.id = i.toString() + "," +  a.toString();
        tile.className = "tile"

        tile.style.marginLeft = parseInt(tileSize, 10) * i + "px";
        tile.style.marginTop = parseInt(tileSize, 10) * a + "px";
        count++;
    };
};

count = 1;

//Asign a number to each tile
for(let i = 0; i < size; i++) 
{
    for(let a = 0; a < size; a++) 
    {
        document.getElementById(a + "," + i).innerHTML = count;
        count++;
    };
};

//Define the empty square
let empty = document.getElementById(emptyX + "," + emptyY);
empty.style.opacity = "0";
empty.style.cursor = "auto";
empty.id = "empty"
tiles[emptyX][emptyY] = 
{
    x: emptyX, 
    y: emptyY, 
    status: "empty"
};

//Listen for clicks on the page
document.addEventListener("click", function(event) 
{
    let choice = event.target
    if(choice.closest("#gameFrame") !== null &&
        choice.id !== "gameFrame" &&
        choice.id !== empty &&
        gameRunning) 
    {
        let middle = choice.id.indexOf(",");
        checkSurroundings(parseInt(choice.id.slice(0,middle)), parseInt(choice.id.slice(middle + 1,choice.id.length)));
    };
    
});

//Paint the tiles with a gradient pattern that matches the rest of the website
for(var i = 0; i < size; i++) 
{
    for(var a = 0; a < size; a++) 
    {
            let r = (255 - (i*size+a)*(255/Math.pow(size,2)))
            let gb = (25 + (i*size+a)*(230/Math.pow(size,2)))
            document.getElementById(a + "," + i).style.backgroundColor = "rgb(" + r + "," + gb + "," + gb + ")";
    }
}


// ----------------------------------------------------------------------------------------------------
// Start the game
// ----------------------------------------------------------------------------------------------------
function startGame() 
{
    moves = 0;
    shuffleTiles();
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("endScreen").style.display = "none";
    

    setTimeout(function(){
        gameRunning = true;
    }, 200)
    
}

// ----------------------------------------------------------------------------------------------------
// Move square
// ----------------------------------------------------------------------------------------------------

function move(x, y, direction) 
{
    let choice = document.getElementById(x + "," + y)
    emptyX = x;
    emptyY = y;

    if(direction == "right") 
    {
        empty.style.marginLeft = parseInt(empty.style.marginLeft, 10) - parseInt(tileSize, 10) + "px";
        choice.style.marginLeft = parseInt(choice.style.marginLeft, 10) + parseInt(tileSize, 10) + "px";
        tiles[x][y] = [tiles[x+1][y], tiles[x+1][y] = tiles[x][y]][0];
        choice.id = x+1 + "," + y;
    } 
    else if(direction == "left") 
    {
        empty.style.marginLeft = parseInt(empty.style.marginLeft, 10) + parseInt(tileSize, 10) + "px";
        choice.style.marginLeft = parseInt(choice.style.marginLeft, 10) - parseInt(tileSize, 10) + "px";
        tiles[x][y] = [tiles[x-1][y], tiles[x-1][y] = tiles[x][y]][0];
        choice.id = x-1 + "," + y;
    }
    else if(direction == "down") 
    {
        empty.style.marginTop = parseInt(empty.style.marginTop, 10) - parseInt(tileSize, 10) + "px";
        choice.style.marginTop = parseInt(choice.style.marginTop, 10) + parseInt(tileSize, 10) + "px";
        tiles[x][y] = [tiles[x][y+1], tiles[x][y+1] = tiles[x][y]][0];
        choice.id = x + "," + parseInt(y+1);
    }
    else if(direction == "up") 
    {
        empty.style.marginTop = parseInt(empty.style.marginTop, 10) + parseInt(tileSize, 10) + "px";
        choice.style.marginTop = parseInt(choice.style.marginTop, 10) - parseInt(tileSize, 10) + "px";
        tiles[x][y] = [tiles[x][y-1], tiles[x][y-1] = tiles[x][y]][0];
        choice.id = x + "," + parseInt(y-1);
    }
    
    if(gameRunning)
    {
        if(checkWin()) 
        {
            endGame();
        }
        moves++;
        document.getElementById("moveCounter").innerHTML = "moves: " + moves;
    }
    
}

// ----------------------------------------------------------------------------------------------------
// Check the surroundings of the chosen tile to look for the empty one.
// ----------------------------------------------------------------------------------------------------
function checkSurroundings(x, y) 
{
    // Right
    if(x + 1 < size && tiles[x+1][y].status == "empty") 
    {
        move(x, y, "right");
    }
    // Left
    else if(x - 1 >= 0 && tiles[x-1][y].status == "empty") 
    {
        move(x, y, "left");
    }
    // Bottom
    else if(y + 1 < size && tiles[x][y+1].status == "empty") 
    {
        move(x, y, "down");
    }
    // Top
    else if(y - 1 >= 0 && tiles[x][y-1].status == "empty") 
    {
        move(x, y, "up");
    } 
}

// ----------------------------------------------------------------------------------------------------
// Check win
// ----------------------------------------------------------------------------------------------------
function checkWin() 
{
    count = 0;
    for(var i = 0; i < size; i++) 
    {
        for(var a = 0; a < size; a++) 
        {
            if(tiles[i][a].x == i &&
                tiles[i][a].y == a )
            {
                count++
            }
        }
    }

    if(count == Math.pow(size, 2)) {
        return true;
    }
}

// ----------------------------------------------------------------------------------------------------
// Shuffle tiles
// ----------------------------------------------------------------------------------------------------
function shuffleTiles() 
{
    gameRunning = false;
    moves = 0;
    document.getElementById("moveCounter").innerHTML = "moves: " + moves
    let all = document.getElementsByClassName("tile");
    for(let i = 0; i < all.length; i++) {
        all[i].style.transitionDuration = "0.2s"
    }

    for(var i = 0; i < Math.pow(size, shuffleIntensity); i++)
    {
        // The direction specified is the direction of the tile in relation to the empty tile
        let randomNum = Math.round(Math.random()*3)

        if(randomNum == 0 && (emptyX-1) >= 0) 
        {
            // left
            checkSurroundings((emptyX-1),emptyY)
        } 
        else if (randomNum == 1 && emptyY-1 >=0)
        {
            // up
            checkSurroundings(emptyX,(emptyY-1))
        }
        else if (randomNum == 2 && emptyX+1 < size)
        {
            // right
            checkSurroundings((emptyX+1),emptyY)
        }
        else if (randomNum == 3 && emptyY+1 < size)
        {
            // down
            checkSurroundings(emptyX,(emptyY+1))  
        }
    }

    setTimeout(function(){
        for(let i = 0; i < all.length; i++) {
            all[i].style.transitionDuration = "0.02s"
        }
        gameRunning = true;
    }, 200) 
}

// ----------------------------------------------------------------------------------------------------
// End game
// ----------------------------------------------------------------------------------------------------
function endGame() 
{
    gameRunning = false;
    document.getElementById("gameFrame").style.userSelect = "none";
    document.getElementById("endScreen").style.display = "block";
}
