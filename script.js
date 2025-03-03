// DOM Elements
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const statusTextElement = document.getElementById('status-text');
const cycleCountElement = document.getElementById('cycle-count');
const progressBar = document.getElementById('progress');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const saveSettingsButton = document.getElementById('save-settings');
const addTaskButton = document.getElementById('add-task');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const alarmSound = document.getElementById('alarm-sound');
const notificationContainer = document.getElementById('notification-container');

// Timer Settings
let focusTime = 25; // Default 25 minutes
let shortBreakTime = 5; // Default 5 minutes
let longBreakTime = 15; // Default 15 minutes
let totalCycles = 4; // Default 4 cycles

// Timer Variables
let timeLeft = focusTime * 60; // Time in seconds
let timerInterval;
let isRunning = false;
let currentCycle = 1;
let isBreak = false;
let isLongBreak = false;
let totalTimeForCurrentMode;

// Load settings from localStorage if available
function loadSettings() {
    const savedSettings = JSON.parse(localStorage.getItem('pomodoroSettings'));
    if (savedSettings) {
        document.getElementById('focus-time').value = savedSettings.focusTime;
        document.getElementById('short-break').value = savedSettings.shortBreakTime;
        document.getElementById('long-break').value = savedSettings.longBreakTime;
        document.getElementById('cycles').value = savedSettings.totalCycles;
        
        focusTime = savedSettings.focusTime;
        shortBreakTime = savedSettings.shortBreakTime;
        longBreakTime = savedSettings.longBreakTime;
        totalCycles = savedSettings.totalCycles;
    }
    resetTimer();
}

// Load tasks from localStorage if available
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('pomodoroTasks'));
    if (savedTasks) {
        savedTasks.forEach(task => {
            addTaskToList(task.text, task.completed);
        });
    }
}

// Initialize application
function init() {
    loadSettings();
    loadTasks();
    updateDisplay();
    updateCycleCount();
}

// Update timer display
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    
    // Update progress bar
    const percentage = ((totalTimeForCurrentMode - timeLeft) / totalTimeForCurrentMode) * 100;
    progressBar.style.width = `${percentage}%`;
    
    // Update document title
    document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} - Pomodoro SMAN 4 Denpasar`;
}

// Update cycle count
function updateCycleCount() {
    cycleCountElement.textContent = `Siklus: ${currentCycle}/${totalCycles}`;
}

// Update status text
function updateStatusText() {
    if (isBreak) {
        if (isLongBreak) {
            statusTextElement.textContent = 'Istirahat Panjang';
        } else {
            statusTextElement.textContent = 'Istirahat Pendek';
        }
    } else {
        statusTextElement.textContent = 'Belajar';
    }
}

// Start timer
function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            playAlarmSound();
            isRunning = false;
            
            if (!isBreak) {
                // Just finished a focus session
                if (currentCycle === totalCycles) {
                    // Time for a long break
                    isBreak = true;
                    isLongBreak = true;
                    timeLeft = longBreakTime * 60;
                    totalTimeForCurrentMode = longBreakTime * 60;
                    showNotification('Waktu istirahat panjang! Selamat beristirahat.', 'success');
                } else {
                    // Time for a short break
                    isBreak = true;
                    isLongBreak = false;
                    timeLeft = shortBreakTime * 60;
                    totalTimeForCurrentMode = shortBreakTime * 60;
                    showNotification('Waktu istirahat pendek! Selamat beristirahat.', 'success');
                }
            } else {
                // Just finished a break
                isBreak = false;
                
                if (isLongBreak) {
                    // Reset to cycle 1 after a long break
                    currentCycle = 1;
                } else {
                    // Increment cycle after a short break
                    currentCycle++;
                }
                
                timeLeft = focusTime * 60;
                totalTimeForCurrentMode = focusTime * 60;
                showNotification('Waktu belajar! Ayo fokus kembali.', 'warning');
            }
            
            updateStatusText();
            updateCycleCount();
            updateDisplay();
            startButton.disabled = false;
            pauseButton.disabled = true;
        }
    }, 1000);
}

// Pause timer
function pauseTimer() {
    if (!isRunning) return;
    
    clearInterval(timerInterval);
    isRunning = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
}

// Reset timer
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isBreak = false;
    isLongBreak = false;
    currentCycle = 1;
    timeLeft = focusTime * 60;
    totalTimeForCurrentMode = focusTime * 60;
    
    startButton.disabled = false;
    pauseButton.disabled = true;
    
    updateStatusText();
    updateCycleCount();
    updateDisplay();
}

// Save settings
function saveSettings() {
    const newFocusTime = parseInt(document.getElementById('focus-time').value);
    const newShortBreakTime = parseInt(document.getElementById('short-break').value);
    const newLongBreakTime = parseInt(document.getElementById('long-break').value);
    const newTotalCycles = parseInt(document.getElementById('cycles').value);
    
    // Validate input values
    if (newFocusTime < 1 || newShortBreakTime < 1 || newLongBreakTime < 1 || newTotalCycles < 1) {
        showNotification('Nilai harus lebih dari 0', 'warning');
        return;
    }
    
    focusTime = newFocusTime;
    shortBreakTime = newShortBreakTime;
    longBreakTime = newLongBreakTime;
    totalCycles = newTotalCycles;
    
    // Save to localStorage
    const settings = {
        focusTime,
        shortBreakTime,
        longBreakTime,
        totalCycles
    };
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
    
    resetTimer();
    showNotification('Pengaturan telah disimpan', 'success');
}

// Add new task to the list
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    
    addTaskToList(taskText, false);
    
    // Save tasks to localStorage
    saveTasks();
    
    // Clear input
    taskInput.value = '';
}

// Add task to the DOM
function addTaskToList(taskText, completed) {
    const taskItem = document.createElement('li');
    taskItem.className = `task-item ${completed ? 'completed' : ''}`;
    
    taskItem.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${completed ? 'checked' : ''}>
        <span class="task-text">${taskText}</span>
        <span class="delete-task"><i class="fas fa-trash"></i></span>
    `;
    
    // Add event listener to checkbox
    const checkbox = taskItem.querySelector('.task-checkbox');
    checkbox.addEventListener('change', function() {
        taskItem.classList.toggle('completed');
        saveTasks();
    });
    
    // Add event listener to delete button
    const deleteButton = taskItem.querySelector('.delete-task');
    deleteButton.addEventListener('click', function() {
        taskItem.remove();
        saveTasks();
    });
    
    taskList.appendChild(taskItem);
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll('.task-item');
    
    taskItems.forEach(item => {
        tasks.push({
            text: item.querySelector('.task-text').textContent,
            completed: item.classList.contains('completed')
        });
    });
    
    localStorage.setItem('pomodoroTasks', JSON.stringify(tasks));
}

// Play alarm sound
function playAlarmSound() {
    alarmSound.play();
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
        <i class="fas fa-times notification-close"></i>
    `;
    
    // Add event listener to close button
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', function() {
        notification.remove();
    });
    
    notificationContainer.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Event Listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
saveSettingsButton.addEventListener('click', saveSettings);
addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
