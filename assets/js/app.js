let character = document.querySelector('#character');
let structures = [];
let gameContainer = document.querySelector('#interface');
let spacePressed = false;
let isJumping = false;
let gameStarted = false;
let score = 0;
let canvas = document.querySelector('#scoreCanvas');
let ctx = canvas.getContext('2d');

let speedStructure = 5;

function startGame() {
    console.log('Game Started!')
    createStructure();

    setInterval(() => {
        if (structures.length) {
            structures.forEach((structure, index) => {
                let structureRight = structure.style.right;
                let valueStructureRight = structureRight.slice(0, structureRight.length - 2);
                structure.style.right = `${+valueStructureRight + speedStructure}px`;
                if (structure.offsetLeft > 10 && structure.offsetLeft < 50) {
                    if (character.offsetTop >= 290 && character.offsetTop <= 310) {
                        alert('Сосал');
                        resetGame();
                    }
                }
                // if (structure.offsetLeft === 0) {
                //     structures.shift()
                //     console.log(structures, 'структура')
                // };
            });
        }
        score += 0.1;
        drawScore();
    }, 17);

    setInterval(() => {
        speedStructure += 0.5;
    }, 3000);

};

function resetGame() {
    character.style.bottom = 0;
    structures.forEach((structure) => {
    structure.remove();
    speedStructure = 5;
    })
    structures = [];
    score = 0;
};

function createStructure() {
    let structure = document.createElement('div');
    structure.classList.add('structure');
    structure.style.right = '5px';
    gameContainer.appendChild(structure);
    structures.push(structure);
    console.log(structures, 'структура')


    setTimeout(() => {
        createStructure();
    }, getRandomInt(500, 1000));
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

/* Score */
function drawScore() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "25px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Score: ${score.toFixed(0)}`, 55, 33);
};

/* character */
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !isJumping) {
        jump();

        if (!gameStarted) {
            startGame();
            gameStarted = true;
        }
    }
});

function jump() {
    isJumping = true;

    let start = Date.now();
    let initialBottom = parseFloat(getComputedStyle(character).bottom);
    let jumpHeight = 80;

    let timer = setInterval(function() {
        let timePassed = Date.now() - start;
        let jumpProgress = Math.sin((timePassed / 400) * Math.PI);

        let newBottom = initialBottom + jumpProgress * jumpHeight;
        character.style.bottom = newBottom > 0 ? newBottom + 'px' : '0px';

        if (timePassed > 400) {
            clearInterval(timer);
            character.style.bottom = initialBottom + 'px';
            isJumping = false;
        }
    }, 5);
};

