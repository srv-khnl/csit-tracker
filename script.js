const subjects = {
    "1st Semester": [
        {
            code: "PHY118",
            name: "Physics",
            icon: "fa-atom",
            units: [
                { name: "Rotational Dynamics and Oscillatory Motion", hours: 5 },
                { name: "Electric and Magnetic Field", hours: 5 },
                { name: "Fundamentals of Atomic Theory", hours: 8 },
                { name: "Methods of Quantum Mechanics", hours: 5 },
                { name: "Fundamentals of Solid State Physics", hours: 6 },
                { name: "Semiconductor and Semiconductor Devices", hours: 8 },
                { name: "Universal Gates and Physics of Integrated Circuits", hours: 8 }
            ]
        },
        {
            code: "MTH111",
            name: "Mathematics I",
            icon: "fa-square-root-alt",
            units: [
                { name: "Function of One Variable", hours: 5 },
                { name: "Limits and Continuity", hours: 4 },
                { name: "Derivatives", hours: 4 },
                { name: "Applications of Derivatives", hours: 4 },
                { name: "Antiderivatives", hours: 5 },
                { name: "Applications of Antiderivatives", hours: 5 },
                { name: "Ordinary Differential Equations", hours: 6 },
                { name: "Infinite Sequence and Series", hours: 5 },
                { name: "Plain and Space Vectors", hours: 4 },
                { name: "Partial Derivatives and Multiple Integration", hours: 3 }
            ]
        }
    ],
    "3rd Semester": [
        {
            code: "CSC161",
            name: "Data Structure and Algorithm",
            icon: "fa-database",
            units: [
                { name: "Introduction", hours: 4 },
                { name: "Stack", hours: 4 },
                { name: "Queue", hours: 4 },
                { name: "Recursion", hours: 4 },
                { name: "Lists", hours: 8 },
                { name: "Sorting", hours: 8 },
                { name: "Searching and Hashing", hours: 7 },
                { name: "Trees and Graphs", hours: 8 }
            ]
        },
        {
            code: "NUM171",
            name: "Numerical Method",
            icon: "fa-calculator",
            units: [
                { name: "Solution of Nonlinear Equations", hours: 8 },
                { name: "Interpolation and Regression", hours: 8 },
                { name: "Numerical Differentiation and Integration", hours: 8 },
                { name: "Solving System of Linear Equations", hours: 8 },
                { name: "Solution of Ordinary Differential Equations", hours: 8 },
                { name: "Solution of Partial Differential Equations", hours: 6 }
            ]
        },
        {
            code: "CSC163",
            name: "Computer Architecture",
            icon: "fa-microchip",
            units: [
                { name: "Data Representation", hours: 4 },
                { name: "Register Transfer and Microoperations", hours: 5 },
                { name: "Basic Computer Organization and Design", hours: 8 },
                { name: "Microprogrammed Control", hours: 4 },
                { name: "Central Processing Unit", hours: 4 },
                { name: "Pipelining", hours: 6 },
                { name: "Computer Arithmetic", hours: 6 },
                { name: "Input Output Organization", hours: 4 },
                { name: "Memory Organization", hours: 4 }
            ]
        },
        {
            code: "CSC164",
            name: "Computer Graphics",
            icon: "fa-palette",
            units: [
                { name: "Introduction of Computer Graphics", hours: 3 },
                { name: "Scan Conversion Algorithm", hours: 6 },
                { name: "Two-Dimensional Geometric Transformations", hours: 5 },
                { name: "Three-Dimensional Geometric Transformation", hours: 5 },
                { name: "3D Objects Representation", hours: 7 },
                { name: "Solid Modeling", hours: 4 },
                { name: "Visible Surface Detections", hours: 5 },
                { name: "Illumination Models and Surface Rendering Technique", hours: 5 },
                { name: "Introduction to Virtual Reality", hours: 2 },
                { name: "Introduction to OpenGL", hours: 3 }
            ]
        },
        {
            code: "STA172",
            name: "Statistics II",
            icon: "fa-chart-bar",
            units: [
                { name: "Sampling Distribution And Estimation", hours: 6 },
                { name: "Testing of Hypothesis", hours: 8 },
                { name: "Non Parametric Test", hours: 8 },
                { name: "Multiple Correlation and Regression", hours: 6 },
                { name: "Design of Experiment", hours: 10 },
                { name: "Stochastic Process", hours: 9 }
            ]
        }
    ]
};

// Fixed Countdown Timer (to April 6, 2026) with sound
let isSoundEnabled = true;
let audioContext = null;
let tickAudio = null;

function updateSoundToggleUI() {
    const btn = document.getElementById('soundToggle');
    if (!btn) return;
    if (isSoundEnabled) {
        btn.classList.remove('muted');
        btn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        btn.classList.add('muted');
        btn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        // Stop any playing audio when muted
        if (tickAudio) {
            tickAudio.pause();
            tickAudio.currentTime = 0;
        }
    }
}

function playTickSound() {
    if (!isSoundEnabled) return;
    try {
        // Create audio only once or reuse existing
        if (!tickAudio) {
            tickAudio = new Audio('https://cdn.pixabay.com/audio/2022/03/09/audio_ce0ce29348.mp3');
        }
        tickAudio.currentTime = 0; // Reset to start
        tickAudio.play().catch(() => {});
    } catch (e) {}
}

function updateCountdown() {
    // Get exam date from input field
    const dateInput = document.getElementById('exam-date')?.value;
    
    if (!dateInput) {
        // Show default message if date not set
        document.getElementById('days').textContent = '--';
        document.getElementById('hours').textContent = '--';
        document.getElementById('minutes').textContent = '--';
        document.getElementById('seconds').textContent = '--';
        return;
    }
    
    // Set time to 12pm (midday) automatically
    const examDate = new Date(`${dateInput}T12:00:00`).getTime();
    const now = new Date().getTime();
    const diff = examDate - now;

    if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    // Update time displays without animation
    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');

    playTickSound();
}

// Progress Tracking
function getProgress() {
    return JSON.parse(localStorage.getItem('csit_progress')) || {};
}

function saveProgress(progress) {
    localStorage.setItem('csit_progress', JSON.stringify(progress));
}

// Subject Selector
function initSubjectSelector() {
    const select = document.getElementById('subject-select');
    const noBacklogCheckbox = document.getElementById('no-backlog');
    const showFirstSemester = !noBacklogCheckbox.checked;
    
    for (const [semester, semesterSubjects] of Object.entries(subjects)) {
        // Skip 1st Semester if user has no backlog
        if (semester === "1st Semester" && !showFirstSemester) {
            continue;
        }
        
        const optgroup = document.createElement('optgroup');
        optgroup.label = semester;
        
        semesterSubjects.forEach((subject, index) => {
            const option = document.createElement('option');
            option.value = `${semester}|${index}`;
            option.textContent = `${subject.code} - ${subject.name}`;
            optgroup.appendChild(option);
        });
        
        select.appendChild(optgroup);
    }

    select.addEventListener('change', function() {
        const value = this.value;
        if (!value) {
            document.getElementById('subject-container').innerHTML = '';
            return;
        }

        const [semester, index] = value.split('|');
        renderSubject(semester, parseInt(index));
    });
}

function toggleBacklogOption() {
    const select = document.getElementById('subject-select');
    select.innerHTML = '<option value="">Select a subject to track...</option>';
    document.getElementById('subject-container').innerHTML = '';
    initSubjectSelector();
    updateOverallStats();
}

function renderSubject(semester, subjectIndex) {
    const subject = subjects[semester][subjectIndex];
    const progress = getProgress();
    const key = `${semester}_${subjectIndex}`;

    let totalHours = 0;
    let completedHours = 0;
    const unitsProgress = progress[key] || {};

    subject.units.forEach((unit, idx) => {
        totalHours += unit.hours;
        if (unitsProgress[idx]) completedHours += unit.hours;
    });

    const percentage = totalHours > 0 ? Math.round((completedHours / totalHours) * 100) : 0;

    // Check if all units are completed
    const allChecked = subject.units.every((unit, idx) => unitsProgress[idx]);
    
    // Calculate vibrant color based on percentage (red to yellow to green gradient)
    let fillColor;
    if (percentage <= 50) {
        // Red to Yellow (0% - 50%)
        const intensity = percentage / 50;
        const red = Math.round(255 - (intensity * 50));
        const green = Math.round(200 * intensity);
        const blue = 0;
        fillColor = `rgb(${red}, ${green}, ${blue})`;
    } else {
        // Yellow to Green (50% - 100%)
        const intensity = (percentage - 50) / 50;
        const red = Math.round(255 - (intensity * 200));
        const green = Math.round(200 + (intensity * 55));
        const blue = 0;
        fillColor = `rgb(${red}, ${green}, ${blue})`;
    }
    
    const html = `
        <div class="subject-card">
            <div class="subject-header">
                <div class="subject-title">
                    <i class="fas ${subject.icon}"></i>
                    <div>
                        <div>${subject.name}</div>
                        <div style="font-size: 1rem; color: #9ca3af;">${subject.code}</div>
                    </div>
                </div>
                <div style="flex-grow: 1; max-width: 300px;">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%; background: ${fillColor};"></div>
                    </div>
                    <div class="progress-text">${completedHours}/${totalHours} hours (${percentage}%)</div>
                </div>
            </div>
            
            <div class="subject-actions">
                <input type="checkbox" id="check-all-${subjectIndex}" class="check-all-checkbox" ${allChecked ? 'checked' : ''} onchange="toggleAllUnits('${semester}', ${subjectIndex})">
                <label for="check-all-${subjectIndex}" style="cursor: pointer; margin: 0;">Check All</label>
            </div>
            
            <ul class="unit-list">
                ${subject.units.map((unit, idx) => `
                    <li class="unit-item">
                        <div class="unit-info">
                            <input type="checkbox" class="unit-checkbox" id="unit-${idx}" 
                                ${unitsProgress[idx] ? 'checked' : ''}
                                onchange="toggleUnit('${semester}', ${subjectIndex}, ${idx}, ${unit.hours})">
                            <label for="unit-${idx}" style="cursor: pointer;">${unit.name}</label>
                        </div>
                        <div class="unit-hours">${unit.hours} hrs</div>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    document.getElementById('subject-container').innerHTML = html;
}

function toggleUnit(semester, subjectIndex, unitIndex, hours) {
    const key = `${semester}_${subjectIndex}`;
    const progress = getProgress();
    
    if (!progress[key]) progress[key] = {};
    
    progress[key][unitIndex] = !progress[key][unitIndex];
    
    saveProgress(progress);
    renderSubject(semester, subjectIndex);
    updateOverallStats();
}

function checkAllUnits(semester, subjectIndex) {
    const subject = subjects[semester][subjectIndex];
    const progress = getProgress();
    const key = `${semester}_${subjectIndex}`;
    
    if (!progress[key]) progress[key] = {};
    
    subject.units.forEach((unit, idx) => {
        progress[key][idx] = true;
    });
    
    saveProgress(progress);
    renderSubject(semester, subjectIndex);
    updateOverallStats();
}

function uncheckAllUnits(semester, subjectIndex) {
    const subject = subjects[semester][subjectIndex];
    const progress = getProgress();
    const key = `${semester}_${subjectIndex}`;
    
    if (!progress[key]) progress[key] = {};
    
    subject.units.forEach((unit, idx) => {
        progress[key][idx] = false;
    });
    
    saveProgress(progress);
    renderSubject(semester, subjectIndex);
    updateOverallStats();
}

function toggleAllUnits(semester, subjectIndex) {
    // Use setTimeout to ensure the checkbox state is updated
    setTimeout(() => {
        const subject = subjects[semester][subjectIndex];
        const progress = getProgress();
        const key = `${semester}_${subjectIndex}`;
        const checkbox = document.getElementById(`check-all-${subjectIndex}`);
        
        if (!progress[key]) progress[key] = {};
        
        subject.units.forEach((unit, idx) => {
            progress[key][idx] = checkbox.checked;
        });
        
        saveProgress(progress);
        renderSubject(semester, subjectIndex);
        updateOverallStats();
    }, 0);
}



// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load saved sound preference
    const savedSound = localStorage.getItem('csit_sound') !== 'false'; // default true
    isSoundEnabled = savedSound;
    updateSoundToggleUI();

    // Setup sound toggle
    const btn = document.getElementById('soundToggle');
    console.log('Button found:', btn);
    console.log('Initial isSoundEnabled:', isSoundEnabled);
    
    if (btn) {
        btn.onclick = function(e) {
            console.log('CLICKED - before toggle:', isSoundEnabled);
            e.stopPropagation();
            isSoundEnabled = !isSoundEnabled;
            console.log('CLICKED - after toggle:', isSoundEnabled);
            localStorage.setItem('csit_sound', String(isSoundEnabled));
            updateSoundToggleUI();
        };
    } else {
        console.error('Sound toggle button not found!');
    }

    // Load saved exam date
    const savedDate = localStorage.getItem('csit_exam_date');
    
    const dateInput = document.getElementById('exam-date');
    
    if (dateInput && savedDate) {
        dateInput.value = savedDate;
    }

    // Save exam date on change
    if (dateInput) {
        dateInput.addEventListener('change', function() {
            localStorage.setItem('csit_exam_date', this.value);
            updateCountdown();
        });
    }

    // Load saved backlog preference
    const noBacklogCheckbox = document.getElementById('no-backlog');
    const savedNoBacklog = localStorage.getItem('csit_no_backlog') === 'true';
    if (noBacklogCheckbox) {
        noBacklogCheckbox.checked = savedNoBacklog;
    }

    // Save backlog preference on change
    if (noBacklogCheckbox) {
        noBacklogCheckbox.addEventListener('change', function() {
            localStorage.setItem('csit_no_backlog', String(this.checked));
            toggleBacklogOption();
        });
    }

    updateCountdown();
    setInterval(updateCountdown, 1000); // Update every second for tick sound
    initSubjectSelector();
    updateOverallStats();
});

function calculateOverallStats() {
    const progress = getProgress();
    let totalAllHours = 0;
    let completedAllHours = 0;
    const noBacklogCheckbox = document.getElementById('no-backlog');
    const onlyThirdSemester = noBacklogCheckbox && noBacklogCheckbox.checked;

    for (const [semester, semesterSubjects] of Object.entries(subjects)) {
        // If no backlog is checked, only count 3rd Semester
        if (onlyThirdSemester && semester !== "3rd Semester") {
            continue;
        }

        semesterSubjects.forEach((subject, subjectIndex) => {
            const key = `${semester}_${subjectIndex}`;
            const unitsProgress = progress[key] || {};

            subject.units.forEach((unit, idx) => {
                totalAllHours += unit.hours;
                if (unitsProgress[idx]) completedAllHours += unit.hours;
            });
        });
    }

    const percentage = totalAllHours > 0 ? Math.round((completedAllHours / totalAllHours) * 100) : 0;
    const hoursRemaining = totalAllHours - completedAllHours;

    return {
        totalHours: totalAllHours,
        completedHours: completedAllHours,
        hoursRemaining: hoursRemaining,
        percentage: percentage
    };
}

function updateOverallStats() {
    const stats = calculateOverallStats();
    document.getElementById('completedPercent').textContent = `${stats.percentage}%`;
    document.getElementById('totalHours').textContent = stats.totalHours;
    document.getElementById('hoursLeft').textContent = stats.hoursRemaining;
}
