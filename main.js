const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// տախտակի նկար
const ground = new Image();
ground.src = "image/ground5.jpg";

// ուտելիքի նկար
const foodImg = new Image();
foodImg.src = "image/foodImg.png";


let box = 32;

let score = 0;

// ուտելիքի սպավն
let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box
}

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
}

document.addEventListener("keydown", direction)

let dir;
// keyCode-եր
function direction(event) {
    if ((event.keyCode == 37 || event.keyCode == 65) && dir != "right")
        dir = "left";
    else if ((event.keyCode == 38 || event.keyCode == 87) && dir != "down")
        dir = "up";
    else if ((event.keyCode == 39 || event.keyCode == 68) && dir != "left")
        dir = "right";
    else if ((event.keyCode == 40 || event.keyCode == 83) && dir != "up")
        dir = "down";
}


// ինքն իրան ուտել 1)
function headline(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
            // console.log("game over")
            gameover.style.display = "block"
            back.style.display = "block"
            block.classlist.remove;
        }
    }
}

// տախտակի ու ուտելիքի նկարելը
function drawGame() {
    ctx.drawImage(ground, 0, 0)
    ctx.drawImage(foodImg, food.x, food.y)

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "purple" : "pink"
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

    }

    // Score-i նկարելը
    ctx.fillStyle = "black";
    ctx.font = "50px Italian"
    ctx.fillText(score, box * 2.5, box * 1.7)

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // ուտելիք ուտելը
    if (snakeX == food.x && snakeY == food.y) {
        score++;

        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box
        }
    } else {
        snake.pop();
    }

    if (snakeX < box || snakeX > box * 17 || snakeY > box * 17 || snakeY < box * 3) {
        clearInterval(game);
        // console.log("game over")
        gameover.style.display = "block"
        back.style.display = "block"
        block.classlist.remove;

    }


    // թեքվել
    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };
    // ինքն իրան ուտել 2)
    headline(newHead, snake);


    snake.unshift(newHead)

}

let game = setInterval(drawGame, 100)