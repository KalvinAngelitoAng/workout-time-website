let workoutTimer;
let restTimer;
let workoutSeconds = 0;
let restSeconds = 0;
let workoutIsRunning = false;
let restIsRunning = false;

function updateTimerDisplay() {
    const workoutMinutes = Math.floor(workoutSeconds / 60);
    const workoutRemainingSeconds = workoutSeconds % 60;
    document.getElementById('workoutTimer').innerText = `Latihan Utama: ${pad(workoutMinutes)}:${pad(workoutRemainingSeconds)}`;

    const restMinutes = Math.floor(restSeconds / 60);
    const restRemainingSeconds = restSeconds % 60;
    document.getElementById('restTimer').innerText = `Istirahat: ${pad(restMinutes)}:${pad(restRemainingSeconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

function startWorkoutTimer() {
    if (workoutIsRunning || restIsRunning) return;
    workoutIsRunning = true;

    workoutTimer = setInterval(() => {
        if (workoutSeconds > 0) {
            workoutSeconds--;
            updateTimerDisplay();
        } else {
            clearInterval(workoutTimer);
            workoutIsRunning = false;
            alert("Waktu Latihan Utama Selesai!");
        }
    }, 1000);
}

function startRestTimer() {
    if (restIsRunning) return;
    restIsRunning = true;

    restTimer = setInterval(() => {
        if (restSeconds > 0) {
            restSeconds--;
            updateTimerDisplay();
        } else {
            clearInterval(restTimer);
            restIsRunning = false;
            alert("Waktu Istirahat Selesai!");
            // Lanjutkan Latihan Utama setelah Istirahat
            if (!workoutIsRunning && workoutSeconds > 0) {
                startWorkoutTimer();
            }
        }
    }, 1000);
}

function resetTimers() {
    clearInterval(workoutTimer);
    clearInterval(restTimer);
    workoutIsRunning = false;
    restIsRunning = false;
    workoutSeconds = 0;
    restSeconds = 0;
    updateTimerDisplay();
}

document.getElementById('warmupBtn').addEventListener('click', () => {
    workoutSeconds = 10 * 60;  // 10 menit pemanasan
    restSeconds = 0;
    updateTimerDisplay();
    startWorkoutTimer();
});

document.getElementById('workoutBtn').addEventListener('click', () => {
    workoutSeconds = 30 * 60;  // 30 menit latihan utama
    restSeconds = 0;
    updateTimerDisplay();
    startWorkoutTimer();
});

document.getElementById('restBtn').addEventListener('click', () => {
    if (workoutIsRunning) {
        clearInterval(workoutTimer);
        workoutIsRunning = false;
    }
    restSeconds = 90;  // 5 menit istirahat
    updateTimerDisplay();
    startRestTimer();
});

document.getElementById('resetBtn').addEventListener('click', () => {
    resetTimers();
});
