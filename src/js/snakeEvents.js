// keyBoard listner for game interactions
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
    const snakeDirectionInReverseWay = [
        snakeDirection == 'left' && acceptedKeys[event.key] == 'right',
        snakeDirection == 'up' && acceptedKeys[event.key] == 'down',
        snakeDirection == 'right' && acceptedKeys[event.key] == 'left',
        snakeDirection == 'down' && acceptedKeys[event.key] == 'up'
    ].some(condition => condition);
    if (snakeDirectionInReverseWay) return;
    snakeDirection = acceptedKeys[event.key] || snakeDirection;
});