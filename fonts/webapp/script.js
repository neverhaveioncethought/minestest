const chartLine = document.getElementById('chart-line');
const crashMessage = document.getElementById('crash-message');
const balanceEl = document.getElementById('balance');
const multiplierEl = document.getElementById('multiplier');
const cashOutBtn = document.getElementById('cashOut');
const placeBetBtn = document.getElementById('placeBet');
const confettiContainer = document.getElementById('confetti-container');
const congratulationsEl = document.getElementById('congratulations');


let balance = 1000;
let betAmount = 0;
let crashed = false;
let height = 0;
let multiplier = 1.0;
const maxCrashPoint = Math.random() * 300 + 100;

function updateMultiplier() {
    multiplier = 1 + height / 100;
    multiplierEl.textContent = `${multiplier.toFixed(2)}x`;
}

function startCrashGame() {
    if (crashed) return;

    height += 5;
    chartLine.style.height = `${height}px`;
    updateMultiplier();

    if (height >= maxCrashPoint) {
        crashMessage.classList.remove('hidden');
        crashed = true;
        resolveBet(false);
    } else {
        requestAnimationFrame(startCrashGame);
    }
}

function resolveBet(won) {
    const winnings = won ? betAmount * multiplier : 0;
    balance += winnings;
    balanceEl.textContent = balance.toFixed(2);
    cashOutBtn.classList.add('hidden');
    placeBetBtn.disabled = false;
}

function cashOut() {
    if (crashed) return;

    resolveBet(true);
    crashed = true;

    triggerFlashEffect();
    animateMultiplier();
    triggerConfetti();
    playWinSound();
    showCongratulationsMessage();

    chartLine.style.height = `${height}px`;
    crashMessage.textContent = "Cashed Out!";
    crashMessage.classList.remove('hidden');
}

function showCongratulationsMessage() {
    congratulationsEl.style.display = 'block';
    setTimeout(() => {
        congratulationsEl.style.display = 'none';
    }, 3000);
}

function triggerFlashEffect() {
    document.querySelector('.game-container').classList.add('flash');
    setTimeout(() => {
        document.querySelector('.game-container').classList.remove('flash');
    }, 500);
}

function animateMultiplier() {
    multiplierEl.classList.add('cashout-animate');
    setTimeout(() => {
        multiplierEl.classList.remove('cashout-animate');
    }, 700);
}

function triggerConfetti() {
    const confettiElements = Array.from(confettiContainer.children);
    confettiElements.forEach((confetti, index) => {
        setTimeout(() => {
            confetti.style.opacity = 1;
            confetti.style.animation = `confetti ${2 + Math.random()}s ease-out forwards`;
            confetti.style.backgroundColor = getRandomColor();
            confetti.style.left = `${Math.random() * 100}%`;
        }, index * 100);
    });
}

function getGameThemeColor() {
    const colors = ['#ff6347', '#ffcccb', '#f0e68c', '#9acd32', '#32cd32'];
    return colors[Math.floor(Math.random() * colors.length)];
}

document.getElementById('placeBet').addEventListener('click', () => {
    betAmount = parseFloat(document.getElementById('bet').value);
    if (betAmount <= 0 || betAmount > balance || crashed) {
        alert("Invalid bet!");
        return;
    }
    
    balance -= betAmount;
    balanceEl.textContent = balance.toFixed(2);

    if (crashed) {
        resetGame();
    }
    startCrashGame();
    cashOutBtn.classList.remove('hidden');
    placeBetBtn.disabled = true;
});

cashOutBtn.addEventListener('click', cashOut);

function resetGame() {
    crashed = false;
    height = 0;
    multiplier = 1.0;
    chartLine.style.height = `${height}px`;
    crashMessage.classList.add('hidden');
    crashMessage.textContent = "X CRASHED!";
    multiplierEl.textContent = `${multiplier}x`;
}
