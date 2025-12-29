// ========== STATE MANAGEMENT ==========
let appState = {
    currentScreen: 'idle',
    totalReps: 0,
    maxReps: 0,
    currentWorkout: null,
    workoutConfig: {},
    isRunning: false,
    isPaused: false,
    currentSet: 1,
    currentReps: 0,
    timer: null,
    timeRemaining: 0,
    // Structured workout state
    structuredWorkout: null,
    pendingWorkoutKey: null,
    currentStepIndex: 0,
    currentHangInSet: 0,
    phase: 'hang', // 'hang', 'restBetweenHangs', 'restBetweenSets'
    settings: {
        distanceThreshold: 20,
        sleepTimeout: 2
    }
};

// Load saved data from localStorage
function loadSavedData() {
    const saved = localStorage.getItem('hangboardData');
    if (saved) {
        const data = JSON.parse(saved);
        appState.totalReps = data.totalReps || 0;
        appState.maxReps = data.maxReps || 0;
        appState.settings = data.settings || appState.settings;
        updateUI();
    }
}

function saveData() {
    localStorage.setItem('hangboardData', JSON.stringify({
        totalReps: appState.totalReps,
        maxReps: appState.maxReps,
        settings: appState.settings
    }));
}

// ========== SCREEN NAVIGATION ==========
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId + 'Screen').classList.add('active');
    appState.currentScreen = screenId;
}

function backToIdle() {
    showScreen('idle');
    updateUI();
}

function returnToHome() {
    // Clean up any running timers
    if (appState.timer) {
        clearInterval(appState.timer);
        appState.timer = null;
    }
    // Reset workout state
    appState.isRunning = false;
    appState.isPaused = false;
    appState.currentReps = 0;
    appState.currentSet = 1;
    // Reset structured workout state
    appState.structuredWorkout = null;
    appState.currentStepIndex = 0;
    appState.currentHangInSet = 0;
    appState.phase = 'hang';
    // Return to home screen
    backToIdle();
}

// ========== WORKOUT CONFIGURATIONS ==========
const workoutConfigs = {
    fixedSets: {
        name: 'Fixed Sets',
        options: [
            { label: 'Goal reps', id: 'goalReps', type: 'number', default: 10 },
            { label: 'Sets', id: 'sets', type: 'number', default: 3 },
            { label: 'Rest between sets (s)', id: 'rest', type: 'number', default: 60 }
        ],
        type: 'reps'
    },
    maxReps: {
        name: 'Max Reps Test',
        options: [
            { label: 'Countdown (s)', id: 'countdown', type: 'number', default: 10 }
        ],
        type: 'maxTest'
    },
    emom: {
        name: 'EMOM',
        options: [
            { label: 'Reps per minute', id: 'repsPerMin', type: 'number', default: 5 },
            { label: 'Duration (min)', id: 'duration', type: 'number', default: 10 }
        ],
        type: 'emom'
    },
    intervals: {
        name: 'Hang Intervals',
        options: [
            { label: 'Hang time (s)', id: 'hangTime', type: 'number', default: 10 },
            { label: 'Rest time (s)', id: 'restTime', type: 'number', default: 50 },
            { label: 'Rounds', id: 'rounds', type: 'number', default: 6 }
        ],
        type: 'timed'
    }
};

// ========== STRUCTURED HANGBOARD WORKOUTS ==========
const structuredWorkouts = {
    beginner: {
        name: 'Beginner Workout',
        description: 'General Finger Endurance',
        steps: [
            { stepId: 'B1', grip: 'jug', edgeDepthMm: 0, intensityType: 'warmup', sets: 3, repsPerSet: 6, hangSec: 7, restSecBetweenHangs: 5, restSecBetweenSets: 120, addWeightKg: 0, notes: 'LARGE JUGS - Easy 2-hand warmup, relaxed shoulders' },
            { stepId: 'B2', grip: 'jug', edgeDepthMm: 0, intensityType: 'repeater', sets: 3, repsPerSet: 5, hangSec: 10, restSecBetweenHangs: 10, restSecBetweenSets: 150, addWeightKg: 0, notes: 'LARGE JUGS - Longer hangs, focus on breathing' },
            { stepId: 'B3', grip: 'edge', edgeDepthMm: 20, intensityType: 'repeater', sets: 3, repsPerSet: 5, hangSec: 7, restSecBetweenHangs: 10, restSecBetweenSets: 150, addWeightKg: 0, notes: '20mm EDGE - Open hand grip, comfortable intensity' },
            { stepId: 'B4', grip: 'jug', edgeDepthMm: 0, intensityType: 'warmup', sets: 2, repsPerSet: 5, hangSec: 7, restSecBetweenHangs: 5, restSecBetweenSets: 0, addWeightKg: 0, notes: 'LARGE JUGS - Easy cool-down, shake out arms' }
        ]
    },
    intermediate: {
        name: 'Intermediate Workout',
        description: 'Mixed Edges and Sloper',
        steps: [
            { stepId: 'I1', grip: 'jug', edgeDepthMm: 0, intensityType: 'warmup', sets: 2, repsPerSet: 6, hangSec: 7, restSecBetweenHangs: 5, restSecBetweenSets: 90, addWeightKg: 0, notes: 'LARGE JUGS - General warmup, prepare shoulders' },
            { stepId: 'I2', grip: 'edge', edgeDepthMm: 20, intensityType: 'repeater', sets: 4, repsPerSet: 5, hangSec: 7, restSecBetweenHangs: 6, restSecBetweenSets: 150, addWeightKg: 0, notes: '20mm EDGE - Open hand, focus on smooth engagement' },
            { stepId: 'I3', grip: 'edge', edgeDepthMm: 15, intensityType: 'repeater', sets: 4, repsPerSet: 4, hangSec: 7, restSecBetweenHangs: 7, restSecBetweenSets: 180, addWeightKg: 0, notes: '15mm EDGE - Half crimp okay, moderate intensity' },
            { stepId: 'I4', grip: 'sloper40', edgeDepthMm: 0, intensityType: 'repeater', sets: 3, repsPerSet: 5, hangSec: 7, restSecBetweenHangs: 5, restSecBetweenSets: 150, addWeightKg: 0, notes: '40° SLOPER - Open hand only, squeeze and engage core' }
        ]
    },
    endurance: {
        name: 'Endurance Workout',
        description: 'Long Hangs on Easy Grips',
        steps: [
            { stepId: 'E1', grip: 'jug', edgeDepthMm: 0, intensityType: 'repeater', sets: 4, repsPerSet: 3, hangSec: 20, restSecBetweenHangs: 20, restSecBetweenSets: 120, addWeightKg: 0, notes: 'LARGE JUGS - Long aerobic hangs, breathe deeply, very comfortable' },
            { stepId: 'E2', grip: 'edge', edgeDepthMm: 20, intensityType: 'repeater', sets: 4, repsPerSet: 3, hangSec: 20, restSecBetweenHangs: 30, restSecBetweenSets: 150, addWeightKg: 0, notes: '20mm EDGE - Open hand, smooth breathing, no shaking or pain' },
            { stepId: 'E3', grip: 'jug', edgeDepthMm: 0, intensityType: 'warmup', sets: 2, repsPerSet: 3, hangSec: 20, restSecBetweenHangs: 15, restSecBetweenSets: 0, addWeightKg: 0, notes: 'LARGE JUGS - Easy cool-down, relax and shake out' }
        ]
    },
    pro: {
        name: 'Pro Workout',
        description: 'Max Hangs on 15mm and 10mm Edges',
        steps: [
            { stepId: 'P1', grip: 'edge', edgeDepthMm: 20, intensityType: 'warmup', sets: 3, repsPerSet: 5, hangSec: 7, restSecBetweenHangs: 5, restSecBetweenSets: 120, addWeightKg: 0, notes: '20mm EDGE - Warmup repeaters, prepare fingers and tendons' },
            { stepId: 'P2', grip: 'edge', edgeDepthMm: 15, intensityType: 'maxHang', sets: 6, repsPerSet: 1, hangSec: 10, restSecBetweenHangs: 0, restSecBetweenSets: 180, addWeightKg: 0, notes: '15mm EDGE - Near-max hangs, half crimp or open, add weight if needed' },
            { stepId: 'P3', grip: 'edge', edgeDepthMm: 10, intensityType: 'maxHang', sets: 5, repsPerSet: 1, hangSec: 10, restSecBetweenHangs: 0, restSecBetweenSets: 180, addWeightKg: 0, notes: '10mm EDGE - Very intense, experienced climbers only, perfect form' }
        ]
    },
    athlete: {
        name: 'Athlete Workout',
        description: 'High-Intensity Edges Including 5mm',
        steps: [
            { stepId: 'A1', grip: 'edge', edgeDepthMm: 20, intensityType: 'warmup', sets: 3, repsPerSet: 5, hangSec: 7, restSecBetweenHangs: 5, restSecBetweenSets: 120, addWeightKg: 0, notes: '20mm EDGE - Warmup repeaters, thorough finger prep' },
            { stepId: 'A2', grip: 'edge', edgeDepthMm: 15, intensityType: 'maxHang', sets: 5, repsPerSet: 1, hangSec: 10, restSecBetweenHangs: 0, restSecBetweenSets: 180, addWeightKg: 0, notes: '15mm EDGE - Max hangs, half crimp, RPE 8-9, add weight as needed' },
            { stepId: 'A3', grip: 'edge', edgeDepthMm: 10, intensityType: 'maxHang', sets: 5, repsPerSet: 1, hangSec: 10, restSecBetweenHangs: 0, restSecBetweenSets: 180, addWeightKg: 0, notes: '10mm EDGE - Very intense max hangs, perfect form required' },
            { stepId: 'A4', grip: 'edge', edgeDepthMm: 5, intensityType: 'maxHang', sets: 4, repsPerSet: 1, hangSec: 7, restSecBetweenHangs: 0, restSecBetweenSets: 210, addWeightKg: 0, notes: '5mm EDGE - Extreme intensity, half crimp only, skip if any doubt' }
        ]
    }
};

function showWorkoutConfig(workoutType) {
    const config = workoutConfigs[workoutType];
    appState.currentWorkout = workoutType;
    
    document.getElementById('configTitle').textContent = config.name;
    
    const optionsContainer = document.getElementById('configOptions');
    optionsContainer.innerHTML = '';
    
    config.options.forEach(option => {
        const div = document.createElement('div');
        div.className = 'config-option';
        div.innerHTML = `
            <label>${option.label}:</label>
            <input type="${option.type}" id="cfg_${option.id}" value="${option.default}">
        `;
        optionsContainer.appendChild(div);
    });
    
    showScreen('config');
}

// ========== QUICK START ==========
function startQuickWorkout() {
    appState.currentWorkout = 'fixedSets';
    appState.workoutConfig = {
        goalReps: 10,
        sets: 3,
        rest: 60
    };
    startWorkout();
}

// ========== START CONFIGURED WORKOUT ==========
function startConfiguredWorkout() {
    const config = workoutConfigs[appState.currentWorkout];
    appState.workoutConfig = {};
    
    config.options.forEach(option => {
        const value = document.getElementById('cfg_' + option.id).value;
        appState.workoutConfig[option.id] = parseInt(value);
    });
    
    startWorkout();
}

// ========== WORKOUT EXECUTION ==========
function startWorkout() {
    const config = workoutConfigs[appState.currentWorkout];
    appState.currentSet = 1;
    appState.currentReps = 0;
    appState.isRunning = true;
    appState.isPaused = false;
    
    document.getElementById('workoutName').textContent = config.name;
    
    if (config.type === 'timed') {
        startTimedWorkout();
    } else if (config.type === 'reps') {
        startRepsWorkout();
    } else if (config.type === 'maxTest') {
        startMaxTest();
    } else if (config.type === 'emom') {
        startEMOM();
    }
    
    showScreen('workout');
}

function startRepsWorkout() {
    const { goalReps, sets } = appState.workoutConfig;
    updateWorkoutDisplay();
    
    // Simulate rep detection (in real app, this would come from sensor)
    document.getElementById('workoutStatus').innerHTML = 
        '<p style="color: var(--text-secondary)">Pull the bar to count reps</p>' +
        '<button class="btn-primary" style="margin-top: 1rem; max-width: 200px;" onclick="simulateRep()">Simulate Rep</button>';
}

function simulateRep() {
    if (!appState.isRunning || appState.isPaused) return;
    
    const { goalReps, sets } = appState.workoutConfig;
    appState.currentReps++;
    appState.totalReps++;
    
    updateWorkoutDisplay();
    
    if (appState.currentReps >= goalReps) {
        // Set complete
        if (appState.currentSet < sets) {
            startRestPeriod();
        } else {
            completeWorkout();
        }
    }
}

function startTimedWorkout() {
    const { hangTime, rounds } = appState.workoutConfig;
    appState.timeRemaining = hangTime;
    appState.phase = 'hang';
    
    updateTimedDisplay();
    runTimer();
}

function runTimer() {
    if (appState.timer) clearInterval(appState.timer);
    
    appState.timer = setInterval(() => {
        if (!appState.isRunning || appState.isPaused) return;
        
        appState.timeRemaining--;
        updateTimedDisplay();
        
        if (appState.timeRemaining <= 0) {
            handleTimerComplete();
        }
    }, 1000);
}

function handleTimerComplete() {
    const config = workoutConfigs[appState.currentWorkout];
    
    if (config.type === 'timed') {
        const { hangTime, restTime, rounds } = appState.workoutConfig;
        
        if (appState.phase === 'hang') {
            // Switch to rest
            appState.phase = 'rest';
            appState.timeRemaining = restTime;
        } else {
            // Complete round
            appState.currentSet++;
            if (appState.currentSet <= rounds) {
                appState.phase = 'hang';
                appState.timeRemaining = hangTime;
            } else {
                completeWorkout();
            }
        }
        updateTimedDisplay();
    }
}

function updateTimedDisplay() {
    const { rounds } = appState.workoutConfig;
    document.getElementById('workoutProgress').textContent = `Round ${appState.currentSet} / ${rounds}`;
    document.getElementById('metricLabel').textContent = 'Time';
    document.getElementById('metricValue').textContent = formatTime(appState.timeRemaining);
    
    const status = appState.phase === 'hang' ? '💪 HANG!' : '😌 REST';
    const statusColor = appState.phase === 'hang' ? 'var(--success)' : 'var(--warning)';
    document.getElementById('workoutStatus').innerHTML = 
        `<p style="color: ${statusColor}; font-size: 1.5rem; font-weight: 700;">${status}</p>`;
    
    updateProgressBar();
    
    // Hide control buttons for non-structured workouts
    const skipHangBtn = document.getElementById('skipHangBtn');
    const skipSetBtn = document.getElementById('skipSetBtn');
    const rewindBtn = document.getElementById('rewindBtn');
    if (skipHangBtn && skipSetBtn && rewindBtn) {
        skipHangBtn.style.display = 'none';
        skipSetBtn.style.display = 'none';
        rewindBtn.style.display = 'none';
    }
}

function updateWorkoutDisplay() {
    const { goalReps, sets } = appState.workoutConfig;
    document.getElementById('workoutProgress').textContent = `Set ${appState.currentSet} / ${sets}`;
    document.getElementById('metricLabel').textContent = 'Reps';
    document.getElementById('metricValue').textContent = `${appState.currentReps} / ${goalReps}`;
    updateProgressBar();
    
    // Hide control buttons for non-structured workouts
    const skipHangBtn = document.getElementById('skipHangBtn');
    const skipSetBtn = document.getElementById('skipSetBtn');
    const rewindBtn = document.getElementById('rewindBtn');
    if (skipHangBtn && skipSetBtn && rewindBtn) {
        skipHangBtn.style.display = 'none';
        skipSetBtn.style.display = 'none';
        rewindBtn.style.display = 'none';
    }
}

function updateProgressBar() {
    const config = workoutConfigs[appState.currentWorkout];
    let percent = 0;
    
    if (config.type === 'reps') {
        const { goalReps } = appState.workoutConfig;
        percent = (appState.currentReps / goalReps) * 100;
    } else if (config.type === 'timed') {
        const { hangTime, restTime } = appState.workoutConfig;
        const total = appState.phase === 'hang' ? hangTime : restTime;
        percent = ((total - appState.timeRemaining) / total) * 100;
    }
    
    document.getElementById('progressBar').style.width = percent + '%';
}

function startRestPeriod() {
    const { rest } = appState.workoutConfig;
    appState.timeRemaining = rest;
    
    document.getElementById('restTimer').textContent = formatTime(rest);
    document.getElementById('restMessage').textContent = `Next: Set ${appState.currentSet + 1}`;
    
    showScreen('rest');
    
    const restInterval = setInterval(() => {
        if (!appState.isRunning || appState.isPaused) return;
        
        appState.timeRemaining--;
        document.getElementById('restTimer').textContent = formatTime(appState.timeRemaining);
        
        const percent = ((rest - appState.timeRemaining) / rest) * 100;
        document.getElementById('restProgressBar').style.width = percent + '%';
        
        if (appState.timeRemaining <= 0) {
            clearInterval(restInterval);
            appState.currentSet++;
            appState.currentReps = 0;
            showScreen('workout');
            startRepsWorkout();
        }
    }, 1000);
}

function skipRest() {
    // Set time to 0 to trigger immediate completion of rest phase
    appState.timeRemaining = 0;
}

function startMaxTest() {
    const { countdown } = appState.workoutConfig;
    appState.timeRemaining = countdown;
    appState.currentReps = 0;
    
    document.getElementById('workoutProgress').textContent = 'Max Reps Test';
    document.getElementById('metricLabel').textContent = 'Get Ready';
    document.getElementById('metricValue').textContent = formatTime(countdown);
    document.getElementById('workoutStatus').innerHTML = '<p style="color: var(--warning)">Starting soon...</p>';
    
    const countdownInterval = setInterval(() => {
        appState.timeRemaining--;
        document.getElementById('metricValue').textContent = formatTime(appState.timeRemaining);
        
        if (appState.timeRemaining <= 0) {
            clearInterval(countdownInterval);
            startMaxTestActive();
        }
    }, 1000);
}

function startMaxTestActive() {
    document.getElementById('metricLabel').textContent = 'Reps';
    document.getElementById('metricValue').textContent = appState.currentReps;
    document.getElementById('workoutStatus').innerHTML = 
        '<p style="color: var(--success); font-size: 1.5rem;">GO! Do as many as you can!</p>' +
        '<button class="btn-primary" style="margin-top: 1rem; max-width: 200px;" onclick="simulateMaxRep()">+1 Rep</button>' +
        '<button class="btn-secondary" style="margin-top: 0.5rem; max-width: 200px;" onclick="finishMaxTest()">Finish</button>';
}

function simulateMaxRep() {
    appState.currentReps++;
    appState.totalReps++;
    document.getElementById('metricValue').textContent = appState.currentReps;
}

function finishMaxTest() {
    if (appState.currentReps > appState.maxReps) {
        appState.maxReps = appState.currentReps;
    }
    completeWorkout();
}

function startEMOM() {
    // EMOM implementation (simplified)
    alert('EMOM workout - Feature coming soon! Use Max Reps Test for now.');
    backToIdle();
}

// ========== STRUCTURED WORKOUT EXECUTION ==========
function startStructuredWorkout(workoutKey) {
    const workout = structuredWorkouts[workoutKey];
    if (!workout) {
        alert('Workout not found!');
        return;
    }
    
    // Store workout key temporarily
    appState.pendingWorkoutKey = workoutKey;
    
    // Show preview
    showWorkoutPreview(workout);
}

function showWorkoutPreview(workout) {
    // Update preview title and description
    document.getElementById('previewTitle').textContent = workout.name;
    document.getElementById('previewDescription').textContent = workout.description;
    
    // Build preview content
    let previewHTML = '<div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px;">';
    
    workout.steps.forEach((step, index) => {
        const gripDisplay = getGripDisplay(step.grip, step.edgeDepthMm);
        const totalHangs = step.sets * step.repsPerSet;
        const totalHangTime = totalHangs * step.hangSec;
        
        previewHTML += `
            <div style="margin-bottom: 1rem; padding: 1rem; background: var(--bg-primary); border-radius: 6px; border-left: 3px solid var(--primary);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <strong style="font-size: 1.1rem;">${step.stepId}: ${gripDisplay}</strong>
                    <span style="color: var(--text-secondary); font-size: 0.9rem;">${step.intensityType}</span>
                </div>
                <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">
                    <div>• ${step.sets} sets × ${step.repsPerSet} hangs = ${totalHangs} total hangs</div>
                    <div>• ${step.hangSec}s hang / ${step.restSecBetweenHangs}s rest between hangs</div>
                    <div>• ${Math.floor(step.restSecBetweenSets / 60)}:${(step.restSecBetweenSets % 60).toString().padStart(2, '0')} rest between sets</div>
                    <div>• Total hang time: ${Math.floor(totalHangTime / 60)}:${(totalHangTime % 60).toString().padStart(2, '0')}</div>
                </div>
                <div style="font-style: italic; color: var(--text-secondary); font-size: 0.85rem;">
                    ${step.notes}
                </div>
            </div>
        `;
    });
    
    previewHTML += '</div>';
    
    document.getElementById('previewSteps').innerHTML = previewHTML;
    showScreen('preview');
}

function confirmStartStructuredWorkout() {
    const workoutKey = appState.pendingWorkoutKey;
    const workout = structuredWorkouts[workoutKey];
    
    if (!workout) {
        alert('Workout not found!');
        return;
    }
    
    // Initialize structured workout state
    appState.structuredWorkout = workout;
    appState.currentStepIndex = 0;
    appState.currentSet = 1;
    appState.currentHangInSet = 1;
    appState.phase = 'hang';
    appState.isRunning = true;
    appState.isPaused = false;
    
    // Start first step
    executeStructuredStep();
    showScreen('workout');
}

function executeStructuredStep() {
    if (appState.currentStepIndex >= appState.structuredWorkout.steps.length) {
        // All steps complete
        completeStructuredWorkout();
        return;
    }
    
    const step = appState.structuredWorkout.steps[appState.currentStepIndex];
    
    // Check if we've completed all sets for this step
    if (appState.currentSet > step.sets) {
        // Move to next step
        appState.currentStepIndex++;
        appState.currentSet = 1;
        appState.currentHangInSet = 1;
        appState.phase = 'hang';
        executeStructuredStep();
        return;
    }
    
    // Update display
    updateStructuredWorkoutDisplay();
    
    // Start hang phase
    if (appState.phase === 'hang') {
        startStructuredHang();
    }
}

function startStructuredHang() {
    const step = appState.structuredWorkout.steps[appState.currentStepIndex];
    appState.timeRemaining = step.hangSec;
    appState.phase = 'hang';
    
    updateStructuredWorkoutDisplay();
    runStructuredTimer();
}

function runStructuredTimer() {
    if (appState.timer) clearInterval(appState.timer);
    
    appState.timer = setInterval(() => {
        if (!appState.isRunning || appState.isPaused) return;
        
        appState.timeRemaining--;
        updateStructuredWorkoutDisplay();
        
        if (appState.timeRemaining <= 0) {
            handleStructuredPhaseComplete();
        }
    }, 1000);
}

function handleStructuredPhaseComplete() {
    const step = appState.structuredWorkout.steps[appState.currentStepIndex];
    
    if (appState.phase === 'hang') {
        // Hang complete, check if we need rest between hangs
        if (appState.currentHangInSet < step.repsPerSet) {
            // More hangs in this set, rest between hangs
            appState.phase = 'restBetweenHangs';
            appState.timeRemaining = step.restSecBetweenHangs;
            appState.currentHangInSet++;
            updateStructuredWorkoutDisplay();
        } else {
            // Set complete, check if we need rest between sets
            if (appState.currentSet < step.sets) {
                // More sets, rest between sets
                appState.phase = 'restBetweenSets';
                appState.timeRemaining = step.restSecBetweenSets;
                showStructuredRestScreen();
            } else {
                // This step is complete, move to next step
                appState.currentStepIndex++;
                appState.currentSet = 1;
                appState.currentHangInSet = 1;
                appState.phase = 'hang';
                
                if (appState.currentStepIndex < appState.structuredWorkout.steps.length) {
                    // Brief transition message
                    const nextStep = appState.structuredWorkout.steps[appState.currentStepIndex];
                    showStructuredTransition(nextStep);
                } else {
                    completeStructuredWorkout();
                }
            }
        }
    } else if (appState.phase === 'restBetweenHangs') {
        // Rest between hangs complete, start next hang
        appState.phase = 'hang';
        startStructuredHang();
    } else if (appState.phase === 'restBetweenSets') {
        // Rest between sets complete, start next set
        appState.currentSet++;
        appState.currentHangInSet = 1;
        appState.phase = 'hang';
        showScreen('workout');
        executeStructuredStep();
    }
}

function showStructuredRestScreen() {
    const step = appState.structuredWorkout.steps[appState.currentStepIndex];
    document.getElementById('restTimer').textContent = formatTime(step.restSecBetweenSets);
    document.getElementById('restMessage').textContent = `Next: ${step.stepId} Set ${appState.currentSet + 1}`;
    
    showScreen('rest');
    
    const restInterval = setInterval(() => {
        if (!appState.isRunning || appState.isPaused) return;
        
        appState.timeRemaining--;
        document.getElementById('restTimer').textContent = formatTime(appState.timeRemaining);
        
        const percent = ((step.restSecBetweenSets - appState.timeRemaining) / step.restSecBetweenSets) * 100;
        document.getElementById('restProgressBar').style.width = percent + '%';
        
        if (appState.timeRemaining <= 0) {
            clearInterval(restInterval);
            handleStructuredPhaseComplete();
        }
    }, 1000);
}

function showStructuredTransition(nextStep) {
    // Show a brief transition (5 seconds) before next exercise
    if (appState.timer) clearInterval(appState.timer);
    
    document.getElementById('restTimer').textContent = '00:05';
    document.getElementById('restMessage').textContent = `Next: ${getGripDisplay(nextStep.grip, nextStep.edgeDepthMm)}`;
    
    showScreen('rest');
    
    let countdown = 5;
    const transitionInterval = setInterval(() => {
        if (!appState.isRunning || appState.isPaused) return;
        
        countdown--;
        const seconds = countdown < 10 ? `0${countdown}` : countdown;
        document.getElementById('restTimer').textContent = `00:${seconds}`;
        document.getElementById('restProgressBar').style.width = ((5 - countdown) / 5 * 100) + '%';
        
        if (countdown <= 0) {
            clearInterval(transitionInterval);
            showScreen('workout');
            executeStructuredStep();
        }
    }, 1000);
}

function updateStructuredWorkoutDisplay() {
    const step = appState.structuredWorkout.steps[appState.currentStepIndex];
    const workout = appState.structuredWorkout;
    
    // Update header
    document.getElementById('workoutName').textContent = workout.name;
    document.getElementById('workoutProgress').textContent = 
        `${step.stepId} - Set ${appState.currentSet}/${step.sets} - Hang ${appState.currentHangInSet}/${step.repsPerSet}`;
    
    // Update metric
    document.getElementById('metricLabel').textContent = appState.phase === 'hang' ? 'Hang Time' : 'Rest';
    document.getElementById('metricValue').textContent = formatTime(appState.timeRemaining);
    
    // Update status with grip info
    const gripDisplay = getGripDisplay(step.grip, step.edgeDepthMm);
    const phaseEmoji = appState.phase === 'hang' ? '💪' : '😌';
    const phaseText = appState.phase === 'hang' ? 'HANG!' : 'REST';
    const statusColor = appState.phase === 'hang' ? 'var(--success)' : 'var(--warning)';
    
    document.getElementById('workoutStatus').innerHTML = 
        `<p style="color: ${statusColor}; font-size: 1.5rem; font-weight: 700;">${phaseEmoji} ${phaseText}</p>
         <p style="color: var(--text-secondary); font-size: 1rem; margin-top: 0.5rem;">${gripDisplay}</p>
         <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.5rem; font-style: italic;">${step.notes}</p>`;
    
    // Update progress bar
    const totalTime = appState.phase === 'hang' ? step.hangSec : step.restSecBetweenHangs;
    const percent = ((totalTime - appState.timeRemaining) / totalTime) * 100;
    document.getElementById('progressBar').style.width = percent + '%';
    
    // Show/hide control buttons based on structured workout
    const skipHangBtn = document.getElementById('skipHangBtn');
    const skipSetBtn = document.getElementById('skipSetBtn');
    const rewindBtn = document.getElementById('rewindBtn');
    if (skipHangBtn && skipSetBtn && rewindBtn) {
        skipHangBtn.style.display = 'inline-block';
        skipSetBtn.style.display = 'inline-block';
        rewindBtn.style.display = 'inline-block';
    }
}

function getGripDisplay(grip, edgeDepthMm) {
    if (grip === 'jug') return 'Jugs';
    if (grip === 'sloper40') return '40° Sloper';
    if (grip === 'edge') return `${edgeDepthMm}mm Edge`;
    return grip;
}

function completeStructuredWorkout() {
    if (appState.timer) clearInterval(appState.timer);
    appState.isRunning = false;
    
    const workout = appState.structuredWorkout;
    
    let statsHTML = '<h3>Workout Complete!</h3>';
    statsHTML += `<p>${workout.name}</p>`;
    statsHTML += `<p>${workout.description}</p>`;
    statsHTML += `<p>Completed ${workout.steps.length} exercises</p>`;
    
    document.getElementById('completeStats').innerHTML = statsHTML;
    saveData();
    showScreen('complete');
}

function skipCurrentHang() {
    if (!appState.structuredWorkout || appState.isPaused) return;
    
    // Set time to 0 to trigger immediate completion of current phase
    appState.timeRemaining = 0;
}

function skipCurrentSet() {
    if (!appState.structuredWorkout || appState.isPaused) return;
    
    const step = appState.structuredWorkout.steps[appState.currentStepIndex];
    
    // Clear timer
    if (appState.timer) clearInterval(appState.timer);
    
    // Check if we have more sets in this step
    if (appState.currentSet < step.sets) {
        // Move to next set with rest period
        appState.phase = 'restBetweenSets';
        appState.timeRemaining = step.restSecBetweenSets;
        showStructuredRestScreen();
    } else {
        // This was the last set, move to next step
        appState.currentStepIndex++;
        appState.currentSet = 1;
        appState.currentHangInSet = 1;
        appState.phase = 'hang';
        
        if (appState.currentStepIndex < appState.structuredWorkout.steps.length) {
            // Show transition to next exercise
            const nextStep = appState.structuredWorkout.steps[appState.currentStepIndex];
            showStructuredTransition(nextStep);
        } else {
            // All exercises complete
            completeStructuredWorkout();
        }
    }
}

function rewindWorkout() {
    if (!appState.structuredWorkout || appState.isPaused) return;
    
    // Clear any running timer
    if (appState.timer) clearInterval(appState.timer);
    
    const step = appState.structuredWorkout.steps[appState.currentStepIndex];
    
    // If we're in the middle of a set (not on first hang)
    if (appState.currentHangInSet > 1) {
        // Go back to the previous hang in this set
        appState.currentHangInSet--;
        appState.phase = 'hang';
        appState.timeRemaining = step.hangSec;
        updateStructuredWorkoutDisplay();
        runStructuredTimer();
    } 
    // If we're on the first hang of a set but not the first set
    else if (appState.currentSet > 1) {
        // Go back to the previous set
        appState.currentSet--;
        appState.currentHangInSet = step.repsPerSet; // Start at the last hang of previous set
        appState.phase = 'hang';
        appState.timeRemaining = step.hangSec;
        updateStructuredWorkoutDisplay();
        runStructuredTimer();
    }
    // If we're at the first hang of the first set but not the first step
    else if (appState.currentStepIndex > 0) {
        // Go back to the previous step
        appState.currentStepIndex--;
        const prevStep = appState.structuredWorkout.steps[appState.currentStepIndex];
        appState.currentSet = prevStep.sets; // Start at the last set of previous step
        appState.currentHangInSet = prevStep.repsPerSet; // Start at the last hang
        appState.phase = 'hang';
        appState.timeRemaining = prevStep.hangSec;
        showScreen('workout');
        updateStructuredWorkoutDisplay();
        runStructuredTimer();
    }
    // Otherwise, we're at the very beginning - can't rewind further
}

function completeWorkout() {
    if (appState.timer) clearInterval(appState.timer);
    appState.isRunning = false;
    
    const config = workoutConfigs[appState.currentWorkout];
    
    let statsHTML = '<h3>Summary</h3>';
    if (config.type === 'reps') {
        statsHTML += `<p>Sets Completed: ${appState.currentSet}</p>`;
        statsHTML += `<p>Total Reps: ${appState.currentSet * appState.workoutConfig.goalReps}</p>`;
    } else if (config.type === 'timed') {
        statsHTML += `<p>Rounds Completed: ${appState.workoutConfig.rounds}</p>`;
    } else if (config.type === 'maxTest') {
        statsHTML += `<p>Max Reps: ${appState.currentReps}</p>`;
        if (appState.currentReps > appState.maxReps) {
            statsHTML += `<p style="color: var(--success)">🎉 New Record!</p>`;
        }
    }
    
    document.getElementById('completeStats').innerHTML = statsHTML;
    saveData();
    showScreen('complete');
}

function togglePause() {
    appState.isPaused = !appState.isPaused;
    document.getElementById('pauseBtn').textContent = appState.isPaused ? '▶️ Resume' : '⏸️ Pause';
}

function endWorkout() {
    if (appState.timer) clearInterval(appState.timer);
    appState.isRunning = false;
    // Reset structured workout state
    appState.structuredWorkout = null;
    appState.currentStepIndex = 0;
    appState.currentHangInSet = 0;
    appState.phase = 'hang';
    backToIdle();
}

// ========== SETTINGS ==========
function showSettings() {
    document.getElementById('distanceThreshold').value = appState.settings.distanceThreshold;
    document.getElementById('sleepTimeout').value = appState.settings.sleepTimeout;
    document.getElementById('settingsModal').classList.add('active');
}

function closeSettings() {
    document.getElementById('settingsModal').classList.remove('active');
}

function saveSettings() {
    appState.settings.distanceThreshold = parseInt(document.getElementById('distanceThreshold').value);
    appState.settings.sleepTimeout = document.getElementById('sleepTimeout').value;
    saveData();
    closeSettings();
}

// ========== UTILITY FUNCTIONS ==========
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateUI() {
    document.getElementById('totalReps').textContent = appState.totalReps;
    document.getElementById('maxReps').textContent = appState.maxReps;
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    updateUI();
    console.log('Hangboard Trainer initialized!');
});

