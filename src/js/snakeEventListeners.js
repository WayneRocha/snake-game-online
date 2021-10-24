// keyBoard listener for game interactions
window.addEventListener('keydown', event => {
    function snakeMoviments(){
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
        const snakeDirectionInReverseWay = [
            snakeDirection == 'left' && acceptedKeys[event.key] == 'right',
            snakeDirection == 'right' && acceptedKeys[event.key] == 'left',
            snakeDirection == 'up' && acceptedKeys[event.key] == 'down',
            snakeDirection == 'down' && acceptedKeys[event.key] == 'up'
        ].some(condition => condition);
        if (snakeDirectionInReverseWay) return;
        snakeDirection = acceptedKeys[event.key] || snakeDirection;
    }
    function snakeSpeedUp(){
        const acceptedKeys = {
            'Space': () => {
                setMoreSpeedToSnake();
            }
        };
        if (acceptedKeys[event.code])
            acceptedKeys[event.code]();
    }

    snakeMoviments();
    snakeSpeedUp();
});
window.addEventListener('keyup', event => {
    const acceptedKeys = {
        'Space': () => {
            setNormalSnakeSpeed();
        }
    };
    if (acceptedKeys[event.code])
        acceptedKeys[event.code]();
});

//keyBoard listeners for menu interactions
const [
    gameMenu,
    mainMenu,
    appearanceMenu,
    creditsMenu
] = document.getElementsByClassName('menu');
const [startBtn, appearanceBtn, creditsBtn] = document.getElementsByClassName('main-menu-options');
const backArrows = [...document.getElementsByClassName('back')];

function hiddenAllMenus(){
    gameMenu.classList.add('hidden');
    mainMenu.classList.add('hidden');
    appearanceMenu.classList.add('hidden');
    creditsMenu.classList.add('hidden');
}

startBtn.addEventListener('click', () => {
    hiddenAllMenus();
    gameMenu.classList.remove('hidden');
    startGameLoop();
});
appearanceBtn.addEventListener('click', () => {
    hiddenAllMenus();
    appearanceMenu.classList.remove('hidden');
});
creditsBtn.addEventListener('click', () => {
    hiddenAllMenus();
    creditsMenu.classList.remove('hidden');
});
backArrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
        hiddenAllMenus();
        mainMenu.classList.remove('hidden');
    });
});

//appearance listeners
const selectableItems = document.querySelectorAll('[data-game-appearance-selector]');

selectableItems.forEach(item => {
    item.addEventListener('click', ({target}) => {
        const selectorType = target.getAttribute('data-game-appearance-selector');
        const changeGameProperty = () => {
            const selectorActions = {
                'snake': () => appearance.snakeColor = target.getAttribute('data-color'),
                'fruit': () => appearance.foodColor = target.getAttribute('data-color'),
                'wolrd': () => appearance.backgrounds.selected = target.getAttribute('data-game-world'),
            };
            selectorActions[selectorType]();
        };
        const selectItem = () => {
            const itensOfCategory = document.querySelectorAll(`[data-game-appearance-selector="${selectorType}"]`);
            itensOfCategory.forEach(item => item.classList.remove('selected'));
            target.classList.add('selected');
        };

        changeGameProperty();
        selectItem();
    });
})