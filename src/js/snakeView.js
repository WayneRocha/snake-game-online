const canva = document.getElementById("game-canva");
const context = canva.getContext("2d");
const appearance = {
    snakeColor: 'black',
    foodColor: 'green',
    backgrounds: {
        selected: 'default',
        default: [
            '#F2F2F2',
            '#D9D9D9'
        ],
        ocean: [
            '#007C7C',
            '#00BABA'
        ],
        fire: [
            '#B51725',
            '#5C0410'
        ],
        nature: [
            '#548C1C',
            '#6dc01a'
        ]
    }
};

function render() {
    function renderBackground() {
        const selectedBackground = appearance.backgrounds.selected;
        const [color1, color2] = appearance.backgrounds[selectedBackground];

        for (let column = 0; column < canva.width; column++) {
            for (let line = 0; line < canva.height; line++) {
                const color = ((column + line) % 2 === 0) ? color1 : color2;
                context.fillStyle = color;
                context.fillRect(column, line, 1, 1);
            }
        }
    }
    function renderSnake() {
        context.fillStyle = appearance.snakeColor;
        snake.forEach(snakePart => {
            const { x, y } = snakePart;
            context.fillRect(x, y, 1, 1);
        });
    }
    function renderFood() {
        context.fillStyle = appearance.foodColor;
        const { x, y } = food;
        context.fillRect(x, y, 1, 1);
    }
    function renderScore() {
        //
    }

    renderBackground();
    renderSnake();
    renderFood();
    renderScore();
}