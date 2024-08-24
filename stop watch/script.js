let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapsContainer = document.getElementById('laps');

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');

function startPauseStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTime, 10);
        startPauseBtn.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(timerInterval);
        startPauseBtn.textContent = 'Start';
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    difference = 0;
    running = false;
    display.textContent = '00:00:00';
    startPauseBtn.textContent = 'Start';
    lapsContainer.innerHTML = '';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.textContent = `${hours}:${minutes}:${seconds}`;
}

function recordLap() {
    if (running) {
        const lapTime = display.textContent;
        const lapDiv = document.createElement('div');
        lapDiv.textContent = `Lap: ${lapTime}`;
        lapsContainer.appendChild(lapDiv);
    }
}

startPauseBtn.addEventListener('click', startPauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
