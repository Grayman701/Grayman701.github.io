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
        let obstacles = [];
        let gameOver = false;

        document.body.addEventListener("keydown", onkeydown);
        document.body.addEventListener("keyup", onkeyup);
        setInterval(drawFrame, 10);

        function onkeydown(e) {
            if (e.key === " ") {
                dy += -10; // add an immediate upward speed
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
            toolbox.fillRect(0, 0, 400, 400);
        }

        function drawPlayer(x, y) {
            toolbox.fillStyle = "#FF0000";
            toolbox.fillRect(x, y, 20, 20);
        }

        function drawBullet(x, y) {
            toolbox.fillStyle = "#FFFF00";
            toolbox.fillRect(x, y, 4, 4);
        }

        function drawObstacle(obstacle) {
            toolbox.fillStyle = "#00FF00";
            toolbox.fillRect(obstacle.x, obstacle.y, 20, 20);
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

        function generateObstacle() {
            // Generate obstacles at random positions
            let y_pos = Math.floor(Math.random() * 100) - 20;
            let x_pos = Math.floor(Math.random() * 380);
            obstacles.push({ x: x_pos, y: y_pos });
        }

        function updateObstacles() {
            for (let i = 0; i < obstacles.length; i++) {
                obstacles[i].y += 2; 
                if (obstacles[i].y > 400) {
                    obstacles.splice(i, 1); 
                    i--;
                }
            }
        }

        function checkCollision() {
            for (let i = 0; i < obstacles.length; i++) {
                // Check if the player's position overlaps with any obstacle
                if (x < obstacles[i].x + 20 && x + 20 > obstacles[i].x &&
                    y < obstacles[i].y + 20 && y + 20 > obstacles[i].y) {
                    gameOver = true; // Collision detected
                }
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
            updateObstacles();
            checkCollision();
            drawBackground();
            drawPlayer(x, y);
            drawBullet(bullet_x, bullet_y);

           
            for (let i = 0; i < obstacles.length; i++) {
                drawObstacle(obstacles[i]);
            }

            // Randomly generate new obstacles
            if (Math.random() < 0.01) {
                generateObstacle();
            }
        }