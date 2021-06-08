const canva = document.getElementById("game");
const context = canva.getContext("2d");
const appearance = {
    snakeColor: 'black',
    foodColor: 'green',
};

function render(){
    function cleanScreen(){
        context.clearRect(0, 0, canva.width, canva.height);
    }
    function renderSnake(){
        context.fillStyle = appearance.snakeColor;
        snake.forEach(snakePart => {
            const {x, y} = snakePart;
            context.fillRect(x, y, 1, 1);
        });
    }
    function renderFood(){
        context.fillStyle = appearance.foodColor;
        const {x, y} = food;
        context.fillRect(x, y, 1, 1);
    }
    function renderScore(){
        //
    }
    
    cleanScreen();
    renderSnake();
    renderFood();
    renderScore();
}