let snake = [];
let food = {};
let score = 0;
let snakeDirection = 'left';

function spawnSnake(){
    snake = [{ x: 10, y: 10 }, { x: 11, y: 10 }];
}
function extendSnake(){
    addNewHead();
    spawnFood();
}
function moveSnake(){
    snake.pop();
    addNewHead();
}
function addNewHead(){
    const snakeHead = snake[0];
    const newHead = {
        x: snakeHead.x,
        y: snakeHead.y
    };
    const changeHeadCoordinateFunc = {
        'up': () => newHead.y--,
        'down': () => newHead.y++,
        'left': () => newHead.x--,
        'right': () => newHead.x++,
    };

    changeHeadCoordinateFunc[snakeDirection]();
    snake.unshift(newHead);
}
function spawnFood(){
    food.x = Math.floor(Math.random() * canva.width);
    food.y = Math.floor(Math.random() * canva.height);
    const foodInsideSnake = snake.some(snakePart => {
        return snakePart.x == food.x && snakePart.y == food.y;
    });
    if (foodInsideSnake) spawnFood();
}
function resetScore(){
    score = 0;
}
function incrementScore(){
    score++;
}
function detectColisions(){
    const snakeHead = snake[0];
    const foodColision = snakeHead.x == food.x && snakeHead.y == food.y;
    const borderColision = [
        snakeHead.x >= canva.width || snakeHead.x < 0,
        snakeHead.y >= canva.height || snakeHead.y < 0
    ].some(condition => condition);

    const yourSelfColision = snake.some((snakePart, index) => {
        if (index == 0) return;
        return snakeHead.x == snakePart.x && snakeHead.y == snakePart.y;
    });

    if (foodColision) {
        extendSnake();
        incrementScore();
    }
    if (borderColision || yourSelfColision) {
        spawnSnake();
        resetScore();
    }
}
function gameLoop(){
    moveSnake();
    detectColisions();
    render();
}

spawnFood();
spawnSnake();
setInterval(gameLoop, 300);
