const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const birdImg = new Image();
const pipeImg = new Image();
const backgroundImg = new Image();

birdImg.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4ukkNPLktxTJ5WnqbyeyV7_lnLvauA3ebUQ&s';
pipeImg.src = 'https://w7.pngwing.com/pngs/294/165/png-transparent-green-super-mario-tunnel-art-mario-pipe-water-pipe-s-angle-text-rectangle-thumbnail.png';
backgroundImg.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Fvpxqv1JYoUA3FNjfYHRSP1m0rnE3HDx7WOtDZJHi_9Rak-If6yAN-nMpz2o8v19lLg&usqp=CAU';

const birdSize = 32;
const gravity = 0.7;
const jump = -8;
const pipeWidth = 50;
const pipeGap = 100;
const pipeSpeed = 2;
let birdY = canvas.height / 2;
let birdVelocity = 0;
let pipes = [];
let score = 0;


function drawBird() {
    ctx.drawImage(birdImg, 50, birdY, birdSize, birdSize);
}


function drawPipes() {
    for (const pipe of pipes) {
        ctx.drawImage(pipeImg, pipe.x, 0, pipeWidth, pipe.top);
        ctx.drawImage(pipeImg, pipe.x, canvas.height - pipe.bottom, pipeWidth, pipe.bottom);
    }
}


function update() {
    birdVelocity += gravity;
    birdY += birdVelocity;
    
    if (birdY + birdSize > canvas.height) {
        birdY = canvas.height - birdSize;
        birdVelocity = 0;
    }
    
    if (birdY < 0) {
        birdY = 0;
        birdVelocity = 0;
    }
    
    for (const pipe of pipes) {
        pipe.x -= pipeSpeed;
    }
    
    if (pipes.length && pipes[0].x + pipeWidth < 0) {
        pipes.shift();
        score++;
    }
    
    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 150) {
        const topPipeHeight = Math.random() * (canvas.height - pipeGap - 40) + 20;
        pipes.push({
            x: canvas.width,
            top: topPipeHeight,
            bottom: canvas.height - topPipeHeight - pipeGap
        });
    }
}


function checkCollisions() {
    for (const pipe of pipes) {
        if (50 + birdSize > pipe.x && 50 < pipe.x + pipeWidth) {
            if (birdY < pipe.top || birdY + birdSize > canvas.height - pipe.bottom) {
                return true;
            }
        }
    }
    return false;
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    drawBird();
    drawPipes();
    ctx.fillStyle = '#000000';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
}


function gameLoop() {
    if (checkCollisions()) {
        alert(`Game Over! Final Score: ${score}`);
        pipes = [];
        birdY = canvas.height / 2;
        birdVelocity = 0;
        score = 0;
    }
    
    update();
    draw();
    requestAnimationFrame(gameLoop);
}


document.addEventListener('keydown', () => {
    birdVelocity = jump;
});


gameLoop();
