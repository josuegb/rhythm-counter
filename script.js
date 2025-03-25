class BeatCounter {
    constructor() {
        this.bpmInput = document.getElementById('bpm');
        this.timeSignatureSelect = document.getElementById('timeSignature');
        this.startStopButton = document.getElementById('startStop');
        this.beatIndicator = document.getElementById('beatIndicator');
        this.counterDisplay = document.getElementById('counter');
        
        this.isPlaying = false;
        this.counter = 0;
        this.currentBeat = 0;
        this.lastKeyPressTime = 0;
        this.intervalId = null;

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.startStopButton.addEventListener('click', () => this.togglePlay());
        
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'k') {
                this.handleKeyPress();
            }
        });
    }

    togglePlay() {
        this.isPlaying = !this.isPlaying;
        
        if (this.isPlaying) {
            this.startStopButton.textContent = 'Stop';
            this.startMetronome();
        } else {
            this.startStopButton.textContent = 'Start';
            this.stopMetronome();
        }
    }

    startMetronome() {
        const bpm = parseInt(this.bpmInput.value);
        const interval = (60 * 1000) / bpm;
        
        this.currentBeat = 0;
        this.intervalId = setInterval(() => this.tick(), interval);
    }

    stopMetronome() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.beatIndicator.classList.remove('active');
    }

    tick() {
        const timeSignature = parseInt(this.timeSignatureSelect.value);
        
        // Visual feedback
        this.beatIndicator.classList.add('active');
        setTimeout(() => this.beatIndicator.classList.remove('active'), 100);

        // Update current beat
        this.currentBeat = (this.currentBeat + 1) % timeSignature;
    }

    handleKeyPress() {
        if (!this.isPlaying) return;

        const bpm = parseInt(this.bpmInput.value);
        const beatInterval = (60 * 1000) / bpm;
        const currentTime = Date.now();
        
        // Check if this is the first keypress or if enough time has passed since the last one
        if (this.lastKeyPressTime === 0 || (currentTime - this.lastKeyPressTime) >= beatInterval * 0.5) {
            this.counter++;
            this.counterDisplay.textContent = this.counter;
            this.lastKeyPressTime = currentTime;
        }
    }
}

// Initialize the application
const beatCounter = new BeatCounter();