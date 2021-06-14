// keyBoard listner for game interactions
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