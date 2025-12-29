// Main Application Controller
class DnDAssistant {
    constructor() {
        this.currentView = 'menu';
        this.character = this.loadCharacter();
        this.encounter = this.loadEncounter();
        this.logEntries = this.loadLog();
        this.chessState = this.loadChessState();
        
        this.init();
    }

    init() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.target.dataset.view;
                this.showView(view);
            });
        });

        // Feature cards
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('click', () => {
                const view = card.dataset.view;
                this.showView(view);
            });
        });

        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobileMenuToggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                document.getElementById('navMenu').classList.toggle('active');
            });
        }

        // Info panel toggle
        const infoPanel = document.getElementById('infoPanel');
        const infoPanelClose = document.getElementById('infoPanelClose');
        
        if (infoPanelClose) {
            infoPanelClose.addEventListener('click', () => {
                infoPanel.classList.remove('active');
                document.getElementById('mainContent').classList.remove('info-panel-active');
            });
        }

        // Character edit panel
        const characterEditPanel = document.getElementById('characterEditPanel');
        const characterEditClose = document.getElementById('characterEditClose');
        
        if (characterEditClose) {
            characterEditClose.addEventListener('click', () => {
                characterEditPanel.classList.remove('active');
            });
        }

        // Initialize views
        this.showView('menu');
        this.initPlayerView();
        this.initDMView();
        this.initChessView();
        this.initWitchlightView();
    }

    showView(viewName) {
        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        // Show selected view
        const view = document.getElementById(`view-${viewName}`);
        if (view) {
            view.classList.add('active');
            this.currentView = viewName;
        }

        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === viewName) {
                btn.classList.add('active');
            }
        });

        // Close mobile menu
        document.getElementById('navMenu').classList.remove('active');

        // Initialize view-specific functionality
        setTimeout(() => {
            switch(viewName) {
                case 'player':
                    if (typeof initPlayerView === 'function') initPlayerView();
                    break;
                case 'dm':
                    if (typeof initDMView === 'function') initDMView();
                    break;
                case 'chess':
                    if (typeof initChessView === 'function') initChessView();
                    break;
                case 'witchlight':
                    if (typeof initWitchlightView === 'function') initWitchlightView();
                    break;
            }
        }, 100);

        // Scroll to top
        window.scrollTo(0, 0);
    }

    // ===== DATA PERSISTENCE =====
    saveCharacter() {
        localStorage.setItem('dnd_character', JSON.stringify(this.character));
    }

    loadCharacter() {
        const saved = localStorage.getItem('dnd_character');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            name: 'New Character',
            class: 'Fighter',
            level: 1,
            maxHP: 100,
            currentHP: 100,
            ac: 16,
            abilityScores: {
                STR: 15,
                DEX: 14,
                CON: 13,
                INT: 12,
                WIS: 10,
                CHA: 8
            },
            spellSlots: {}
        };
    }

    saveEncounter() {
        localStorage.setItem('dnd_encounter', JSON.stringify(this.encounter));
    }

    loadEncounter() {
        const saved = localStorage.getItem('dnd_encounter');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            scene: '',
            enemies: []
        };
    }

    saveLog() {
        localStorage.setItem('dnd_log', JSON.stringify(this.logEntries));
    }

    loadLog() {
        const saved = localStorage.getItem('dnd_log');
        return saved ? JSON.parse(saved) : [];
    }

    saveChessState() {
        localStorage.setItem('dnd_chess_state', JSON.stringify(this.chessState));
    }

    loadChessState() {
        // Check if this is the first launch
        const firstLaunch = !localStorage.getItem('dnd_app_initialized');
        
        if (firstLaunch) {
            // First launch - reset everything
            localStorage.setItem('dnd_app_initialized', 'true');
            const defaultState = {
                wrongMoves: 0,
                alternativeCheckmate: false,
                currentPhase: 'puzzle',
                omnivaxAdded: false,
                caissaBlessing: false,
                customConsequences: {},
                combatants: [],
                initiative: [],
                currentTurn: 0,
                omnivaxStats: null,
                alternativeCheckmateDamageApplied: false
            };
            localStorage.setItem('dnd_chess_state', JSON.stringify(defaultState));
            return defaultState;
        }
        
        const saved = localStorage.getItem('dnd_chess_state');
        if (saved) {
            const state = JSON.parse(saved);
            // Ensure all required fields exist
            if (!state.combatants) state.combatants = [];
            if (!state.initiative) state.initiative = [];
            if (state.currentTurn === undefined) state.currentTurn = 0;
            if (state.alternativeCheckmateDamageApplied === undefined) state.alternativeCheckmateDamageApplied = false;
            return state;
        }
        
        // Fallback default state
        return {
            wrongMoves: 0,
            alternativeCheckmate: false,
            currentPhase: 'puzzle',
            omnivaxAdded: false,
            caissaBlessing: false,
            customConsequences: {},
            combatants: [],
            initiative: [],
            currentTurn: 0,
            omnivaxStats: null,
            alternativeCheckmateDamageApplied: false
        };
    }

    // ===== INFO PANEL =====
    showInfoPanel(title, content) {
        const panel = document.getElementById('infoPanel');
        const titleEl = document.getElementById('infoPanelTitle');
        const contentEl = document.getElementById('infoPanelContent');
        
        if (titleEl) titleEl.textContent = title;
        if (contentEl) contentEl.innerHTML = content;
        
        panel.classList.add('active');
        document.getElementById('mainContent').classList.add('info-panel-active');
    }

    hideInfoPanel() {
        const panel = document.getElementById('infoPanel');
        panel.classList.remove('active');
        document.getElementById('mainContent').classList.remove('info-panel-active');
    }

    // ===== LOGGING =====
    addLog(message) {
        const timestamp = new Date().toLocaleTimeString();
        const entry = `[${timestamp}] ${message}`;
        this.logEntries.push(entry);
        
        // Keep only last 100 entries
        if (this.logEntries.length > 100) {
            this.logEntries.shift();
        }
        
        this.saveLog();
        this.updateLogDisplay();
    }

    updateLogDisplay() {
        const logElements = document.querySelectorAll('.log-content');
        logElements.forEach(log => {
            log.innerHTML = '';
            const recentEntries = this.logEntries.slice(-20);
            recentEntries.forEach(entry => {
                const div = document.createElement('div');
                div.className = 'log-entry';
                div.textContent = entry;
                log.appendChild(div);
            });
            log.scrollTop = log.scrollHeight;
        });
    }

    // ===== INITIALIZE VIEWS =====
    initPlayerView() {
        // Will be implemented in player.js
    }

    initDMView() {
        // Will be implemented in dm.js
    }

    initChessView() {
        // Will be implemented in chess.js
    }

    initWitchlightView() {
        // Will be implemented in witchlight.js
    }

    // ===== WITCHLIGHT DATA PERSISTENCE =====
    saveWitchlightNotes() {
        if (this.witchlightState) {
            localStorage.setItem('dnd_witchlight_notes', this.witchlightState.storyTrackerNotes);
        }
    }

    loadWitchlightNotes() {
        return localStorage.getItem('dnd_witchlight_notes') || '';
    }

    saveCompletedEncounters() {
        if (this.witchlightState) {
            localStorage.setItem('dnd_witchlight_encounters', JSON.stringify(this.witchlightState.completedEncounters));
        }
    }

    loadCompletedEncounters() {
        const saved = localStorage.getItem('dnd_witchlight_encounters');
        return saved ? JSON.parse(saved) : [];
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.dndApp = new DnDAssistant();
});

