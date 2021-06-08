const canva = document.getElementById("game");
const context = canva.getContext("2d");
const snakeColor = 'orange';
const foodColor = 'green';
let snake = [];
let food = {};
let score = 0;
let direction = 'left';

function spawnSnake(){
    snake = [{ x: 10, y: 10 }, { x: 11, y: 10 }];
}
function render(){
    function cleanScreen(){
        context.clearRect(0, 0, canva.width, canva.height);
    }
    function renderSnake(){
        context.fillStyle = snakeColor;
        snake.forEach(snakePart => {
            const {x, y} = snakePart;
            context.fillRect(x, y, 1, 1);
        });
    }
    function renderFood(){
        context.fillStyle = foodColor;
        const {x, y} = food;
        context.fillRect(x, y, 1, 1);
    }
    
    cleanScreen();
    renderSnake();
    renderFood();
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
    
    if (changeHeadCoordinateFunc[direction]){
        changeHeadCoordinateFunc[direction]();
        snake.unshift(newHead);
    }
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
    score += 1;
}
function detectColisions(){
    const snakeHead = snake[0];
    const foodColision = snakeHead.x == food.x && snakeHead.y == food.y;
    const borderColision = (snakeHead.x >= canva.width || snakeHead.x < 0) || (snakeHead.y >= canva.height || snakeHead.y < 0);
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
window.addEventListener('keydown', event => {
    const acceptedKeys = {
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'w': 'up',
        'a': 'left',
        's': 'down',
        'd': 'right'
    };
    console.log(event.key);
    if (acceptedKeys[event.key])
        direction = acceptedKeys[event.key];
});
setInterval(gameLoop, 150);
