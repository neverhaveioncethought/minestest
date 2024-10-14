const chartLine = document.getElementById('chart-line');
const crashMessage = document.getElementById('crash-message');
const multiplierEl = document.getElementById('multiplier');
const placeBetBtn = document.getElementById('placeBet');

let crashed = false;
let height = 0;
let multiplier = 1.0;
const maxCrashPoint = Math.random() * 400 + 100;

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
        multiplierEl.textContent = `${multiplier.toFixed(2)}x`;
        crashed = true;
    } else {
        requestAnimationFrame(startCrashGame);
    }
}

placeBetBtn.addEventListener('click', () => {
    if (crashed) {
        resetGame();
    }
    startCrashGame();
});

function resetGame() {
    crashed = false;
    height = 0;
    multiplier = 1.0;
    chartLine.style.height = '0';
    crashMessage.classList.add('hidden');
    multiplierEl.textContent = '1.0x';
}
