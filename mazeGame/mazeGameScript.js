// ----------------------------------------------------------------------------------------------------
// Maze
// ----------------------------------------------------------------------------------------------------

// Define the canvas and the game field
const canvas = document.getElementById("myCanvas");
canvas.crossOrigin = "Anonymous";
const ctx = canvas.getContext("2d");
let img = document.getElementById("maze")

// A few variables used in gameplay
let xPosition = 20;
let yPosition = 360;
var level = 1;
let gameRunning = true;
const maxLevel = 4;

// Draw the maze when the page initially loads and start registering key presses when the game is running
window.onload = drawMaze(level);

document.onkeypress = keyPress;


// The color code for black (rgba: 0, 0, 0, 255)
let black = {
    r: 0,
    g: 0,
    b: 0,
    a: 255
}

// ----------------------------------------------------------------------------------------------------
// This parts draws the game level
// ----------------------------------------------------------------------------------------------------
function drawMaze(lvl) 
{
    img.src = "../Images/Maze" + lvl + ".png"; 
}

function drawImage() {
    ctx.drawImage(img,0,0);
    drawCharacter();
}

function drawCharacter() 
{
    ctx.fillStyle = "red";
    ctx.fillRect(xPosition,yPosition,20,20)
}

// ----------------------------------------------------------------------------------------------------
// This part checks if the document registers a key press and then executes a function to move the 
// character accordingly
// ----------------------------------------------------------------------------------------------------
function keyPress(evt) {
    if(gameRunning)
    {evt = evt || window.event;
        let charCode = evt.keyCode || evt.which;
        let charStr = String.fromCharCode(charCode);
        if(charStr == "a") 
        {
            moveCharacterLeft()
        }
        else if(charStr == "w") 
        {
            moveCharacterUp()
        }
        else if(charStr == "s") 
        {
            moveCharacterDown()
        }
        else if(charStr == "d") 
        {
            moveCharacterRight()
        }
        else if(charStr == "r" &&
                gameRunning)
        {
            ctx.fillRect(xPosition, yPosition, 20, 20)
            xPosition = 20;
            yPosition = 360;
            drawCharacter()
        }
        
        checkWin()
    }
    
}

// ----------------------------------------------------------------------------------------------------
// The following functions determine whether or not the character will be able to move
// ----------------------------------------------------------------------------------------------------

function moveCharacterRight() 
{
    let context = canvas.getContext("2d");
    let color = context.getImageData(xPosition+20,yPosition,1,1);
    let colorCode = {
        r: color.data[0],
        g: color.data[1],
        b: color.data[2],
        a: color.data[3]
    }

    if(compareToBlack(colorCode))
    {
        xPosition+= 20;
        drawCharacter();
        ctx.fillStyle = "#00FFFF";
        ctx.fillRect(xPosition-20,yPosition,20,20);
    }
}

function moveCharacterLeft() 
{
    let context = canvas.getContext("2d");
    let color = context.getImageData(xPosition-20,yPosition,1,1);
    let colorCode = {
        r: color.data[0],
        g: color.data[1],
        b: color.data[2],
        a: color.data[3]
    }

    if(compareToBlack(colorCode))
    {
        xPosition-= 20;
        drawCharacter();
        ctx.fillStyle = "#00FFFF";
        ctx.fillRect(xPosition+20,yPosition,20,20);
    }
}

function moveCharacterUp() 
{
    let context = canvas.getContext("2d");
    let color = context.getImageData(xPosition,yPosition-20,1,1);
    let colorCode = {
        r: color.data[0],
        g: color.data[1],
        b: color.data[2],
        a: color.data[3]
    }

    if(compareToBlack(colorCode))
    {
        yPosition-= 20;
        drawCharacter();
        ctx.fillStyle = "#00FFFF";
        ctx.fillRect(xPosition,yPosition+20,20,20);
    }
}

function moveCharacterDown() 
{
    let context = canvas.getContext("2d");
    let color = context.getImageData(xPosition,yPosition+20,1,1);
    let colorCode = {
        r: color.data[0],
        g: color.data[1],
        b: color.data[2],
        a: color.data[3]
    }
    
    if(compareToBlack(colorCode))
    {
        yPosition+= 20;
        drawCharacter();
        ctx.fillStyle = "#00FFFF";
        ctx.fillRect(xPosition,yPosition-20,20,20);
    }
}

// ----------------------------------------------------------------------------------------------------
// This checks if the color of the designated coordinate is not black
// ----------------------------------------------------------------------------------------------------
function compareToBlack(color) {
    
    if(color.r !== black.r ||
       color.g !== black.g ||
       color.b !== black.b ||
       color.a !== black.a) 
    {
        return true;
        console.log("hejsan")
    }
    else 
    {
        return false;
    }
}
const gameOver = document.getElementById("gameOver");
const resetButton = document.getElementById("resetButton");
// ----------------------------------------------------------------------------------------------------
// This checks if the game has been won after each move
// ----------------------------------------------------------------------------------------------------
function checkWin() {
    if(xPosition == 560 &&
        yPosition == 20) {
        gameRunning = false;
        resetButton.style.display = "block";
        gameOver.style.display = "block";
        gameOver.innerHTML = "level " + level + " complete!"
        if(level < maxLevel)
        {
            level++; 
        } else
        {
            level = 1;
        }   
    }
    
}

function nextLevel() {
    resetButton.style.display = "none";
    gameOver.style.display = "none";
    gameRunning = true;
    drawMaze(level);
    xPosition = 20;
    yPosition = 360;
    drawCharacter();
}
