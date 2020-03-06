//Make the canvas size relative to the css width/height of the canvas
let gameWidth = $("#Guy").css("width");
let gameHeight = $("#Guy").css("height");

//Some variables used during the drawing of the game, such as size and coordinates
let animationStatus = 0;

const characterSize = 70;
const groundHeight = 200;
const characterStartY = groundHeight-1.6*characterSize;
let characterPos = {
    x: 100,
    y: characterStartY
};
let previousPos = {
    x: 100,
    y: characterStartY

}

const jumpHeight = 70;
let keyDown = false;
let jumpDirection = -1;
let jumping = false;
const topPosition = groundHeight - jumpHeight - 1.6*characterSize
let jumpVelocity = Math.floor((characterPos.y-topPosition)/20);

let characterStatus = 0; //which phase of the animation the character is in
let count = 0;

let gameRunning = false;

//Define the canvas
const canvas = $("#Guy");
canvas.crossOrigin = "Anonymous";
const ctx = canvas[0].getContext("2d");
ctx.canvas.width = parseFloat((gameWidth.slice(0,gameWidth.search("px"))));

let guyImg = document.getElementById("frameOne");

//This part makes sure that everything still works when the window gets resized
$(window).resize(function() {
    gameWidth = $("#Guy").css("width");
    gameHeight = $("#Guy").css("height");
    ctx.canvas.width = parseFloat(gameWidth);
    gameRunning = false;
    drawGame();
    drawCharacter(2);
});

// ----------------------------------------------------------------------------------------------------
// Draw the base components of the game environment. 
// ----------------------------------------------------------------------------------------------------

function drawGame() {
    ctx.fillStyle = "white";
    ctx.fillRect(0,groundHeight,parseFloat(gameWidth),2)
    ctx.drawImage(guyImg,characterPos.x,characterPos.y,characterSize,characterSize*1.6);   
};

document.onload = drawGame();

// ----------------------------------------------------------------------------------------------------
// Draw the character, known as "Guy"
// ----------------------------------------------------------------------------------------------------

function drawCharacter(x) {
    if(count == 18) {
        if(x !== 2) {
            if(characterStatus == 0) {
                guyImg.src="Images/frameOne.png";
                characterStatus = 1;
            } else {
                guyImg.src="Images/frameTwo.png";
                characterStatus = 0;
            }
        }
        count = 0;
        nextFrame(x,draw);
    }
    count++;
};

function nextFrame(x,callback) {
    if(x == 1) {
        ctx.clearRect(characterPos.x,previousPos.y,characterSize,characterSize*1.6)
    } else {
        ctx.clearRect(characterPos.x,characterPos.y,characterSize,characterSize*1.6)
    }
    callback();
}

function draw() {
    ctx.drawImage(guyImg,characterPos.x,characterPos.y,characterSize,characterSize*1.6);
}

// ----------------------------------------------------------------------------------------------------
// Start the game and update the components at a certain speed
// ----------------------------------------------------------------------------------------------------

function startGame() {
    setInterval(updateGame,10); 
    gameRunning = true;
};

function updateGame() {
    $(document).keydown(function(e) {
        if(e.which == 87 && keyDown == false && characterPos.y == characterStartY) {
            keyDown = true;
            jumping = true;
            jump();
        };
    });    
    $(document).keyup(function(e) {
        if(keyDown == true) {
            keyDown = false;
        };
    });
    drawCharacter();
};

// ----------------------------------------------------------------------------------------------------
// Make Guy jump
// ----------------------------------------------------------------------------------------------------

function jump() {
    let jumpSequence = setInterval(function() {
        if(jumping) {
            previousPos.y = characterPos.y;
            characterPos.y += jumpDirection*jumpVelocity;
            if(characterPos.y <= topPosition) {
                jumpDirection = 1;
            } else if(characterPos.y == characterStartY) {
                jumpDirection = -1;
                clearInterval(jumpSequence)
            };
            characterStatus = 0;
            nextFrame(1,draw);
        }
    },10);
};


 


