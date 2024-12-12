let canvas_element = document.getElementById("myc");
let toolbox = canvas_element.getContext("2d");
let x = 180;
let y = 10;  
let g = 1;  
let dy = 0;  
let dx = 10;  
let isLeft = false;
let isRight = false;
let isFlying = false;
let bullet_x = x;
let bullet_y = y;
let obstacle_x = Math.floor(Math.random() * 380);
let obstacle_y = -20;
let gameOver = false;
 
document.body.addEventListener("keydown", onkeydown);
document.body.addEventListener("keyup", onkeyup);
setInterval(drawFrame, 10);
 
function onkeydown(e) {
    if (e.key === " ") {
        dy += -10;
    } else if (e.key === "d") {
        isRight = true;
    } else if (e.key === "a") {
        isLeft = true;
    }
}
 
function onkeyup(e) {
    if (e.key === "d") {
        isRight = false;
    } else if (e.key === "a") {
        isLeft = false;
    }
}
 
function drawBackground() {
    toolbox.fillStyle = "#000000";
    toolbox.fillRect (0, 0, 400, 400);
    toolbox.fillStyle = "#0077ff";
    toolbox.fillRect (0, 0, 400, 325);
    toolbox.fillStyle = "#00ff77";
    toolbox.fillRect (0, 325, 400,400);
}
 
    //draw chicken
    function drawPlayer(x, y) { 
        //draw body
        toolbox.fillStyle = "#FF0000";
        toolbox.fillRect (x, y, 30, 30);
        toolbox.fillStyle = "#b32d00";
        toolbox.fillRect (x+5, y+5, 20,20);
        toolbox.fillStyle = ("#b32d00");
        toolbox.fillRect (x+5, y+5, 10,10)

        // draw wing
        toolbox.fillStyle = ("#661a00");
        toolbox.fillRect (x+10, y+7, 9,9);
        toolbox.fillStyle = ("#ffff99");
        toolbox.fillRect (x+13, y+10, 5,2);

        // draw head
        toolbox.fillStyle = ("#FFFFFF");
        toolbox.fillRect (x-7, y-11, 9,10);
        toolbox.fillStyle = ("#ffff00");
        toolbox.fillRect (x-11, y-7, 6,3);

        // draw eye
        toolbox.fillStyle = ("#000000");
        toolbox.fillRect (x-5, y-9, 3,3);

        // draw tail
        toolbox.fillStyle = ("#661a00");
        toolbox.fillRect (x+28, y-3, 4,3);
        toolbox.fillStyle = ("#661a00");
        toolbox.fillRect (x+30, y-5, 4,3);
        toolbox.fillStyle = ("#661a00");
        toolbox.fillRect (x+32, y-7, 4,3);
       
    }

function drawObstacle(x, y) {
    toolbox.fillStyle = "#00FFFF";
    toolbox.fillRect(x, y, 20, 20);
}
function updatePlayerPosition() {
    dy += g;
    y += dy;
    if (y > 380) {
        y = 380;
        dy = 0;
    }
    if (isRight) {
        x += dx;
    } else if (isLeft) {
        x -= dx;
    }
    if (x <= -20) {
        x = 400;
    }
    if (x > 400) {
        x = -20;
    }
}
 
function updateBulletPosition() {
    if (isFlying) {
        bullet_x += 20;
    } else {
        bullet_x = x + (20 - 4) / 2;
        bullet_y = y + (20 - 4) / 2;
    }
    if (bullet_x > 400) {
        isFlying = false;
    }
}
 
function updateObstacle() {
    obstacle_y += 2;
    if (obstacle_y > 400) {
        obstacle_y = -20;
        obstacle_x = Math.floor(Math.random() * 380);
    }
}
 
function checkCollision() {
   
    if (x < obstacle_x + 20 && x + 20 > obstacle_x &&
        y < obstacle_y + 20 && y + 20 > obstacle_y) {
        gameOver = true;
    }
}
 
function drawFrame() {
    if (gameOver) {
        toolbox.fillStyle = "white";
        toolbox.font = "30px Arial";
        toolbox.fillText("Game Over!", 120, 200);
        return; // Stop the game when it's over
    }
 
    updatePlayerPosition();
    updateBulletPosition();
    updateObstacle();
    checkCollision();
    drawBackground();
    drawPlayer(x, y);
    drawObstacle(obstacle_x, obstacle_y);
 
   
   
}