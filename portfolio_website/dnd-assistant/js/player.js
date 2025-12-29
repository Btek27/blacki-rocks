// Player Character Manager
function initPlayerView() {
    const app = window.dndApp;
    
    // Update character display
    updateCharacterDisplay();
    
    // HP buttons
    document.querySelectorAll('.hp-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const change = parseInt(e.target.dataset.change);
            adjustHP(change);
        });
    });
    
    // Rest buttons
    document.getElementById('shortRestBtn')?.addEventListener('click', () => {
        app.addLog('Short Rest completed');
        updateCharacterDisplay();
    });
    
    document.getElementById('longRestBtn')?.addEventListener('click', () => {
        app.character.currentHP = app.character.maxHP;
        app.addLog('Long Rest completed - HP restored');
        updateCharacterDisplay();
        app.saveCharacter();
    });
    
    // Edit character button
    document.getElementById('editCharacterBtn')?.addEventListener('click', () => {
        showCharacterModal();
    });
}

function updateCharacterDisplay() {
    const app = window.dndApp;
    const char = app.character;
    
    // Update header
    document.getElementById('charName').textContent = char.name;
    document.getElementById('charClass').textContent = `${char.class} - Level ${char.level}`;
    document.getElementById('charAC').textContent = char.ac;
    document.getElementById('charHP').textContent = `${char.currentHP} / ${char.maxHP}`;
    
    // Update ability scores
    const abilityGrid = document.getElementById('abilityGrid');
    if (abilityGrid) {
        abilityGrid.innerHTML = '';
        const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
        abilities.forEach(ability => {
            const score = char.abilityScores[ability] || 10;
            const modifier = Math.floor((score - 10) / 2);
            const modStr = modifier >= 0 ? `+${modifier}` : `${modifier}`;
            
            const div = document.createElement('div');
            div.className = 'ability-score';
            div.innerHTML = `
                <div class="ability-name">${ability}</div>
                <div class="ability-value">${score}</div>
                <div class="ability-modifier">${modStr}</div>
            `;
            abilityGrid.appendChild(div);
        });
    }
    
    // Update spell slots if they exist
    const spellSlotsGrid = document.getElementById('spellSlotsGrid');
    if (spellSlotsGrid && Object.keys(char.spellSlots || {}).length > 0) {
        spellSlotsGrid.innerHTML = '';
        Object.entries(char.spellSlots).forEach(([level, slots]) => {
            const div = document.createElement('div');
            div.className = 'spell-slot';
            div.innerHTML = `
                <div class="spell-slot-level">Level ${level}</div>
                <div class="spell-slot-count">${slots.current} / ${slots.max}</div>
            `;
            spellSlotsGrid.appendChild(div);
        });
    } else if (spellSlotsGrid) {
        spellSlotsGrid.innerHTML = '<p style="color: #aaaaaa; text-align: center;">No spell slots</p>';
    }
}

function adjustHP(amount) {
    const app = window.dndApp;
    app.character.currentHP = Math.max(0, Math.min(app.character.maxHP, app.character.currentHP + amount));
    app.addLog(`HP ${amount > 0 ? 'increased' : 'decreased'} by ${Math.abs(amount)}`);
    updateCharacterDisplay();
    app.saveCharacter();
}

function showCharacterModal() {
    const app = window.dndApp;
    const panel = document.getElementById('characterEditPanel');
    const form = document.getElementById('characterForm');
    
    form.innerHTML = `
        <div class="form-group">
            <label>Character Name:</label>
            <input type="text" id="editName" value="${app.character.name}" class="form-input">
        </div>
        <div class="form-group">
            <label>Class:</label>
            <input type="text" id="editClass" value="${app.character.class}" class="form-input">
        </div>
        <div class="form-group">
            <label>Level:</label>
            <input type="number" id="editLevel" value="${app.character.level}" min="1" max="20" class="form-input">
        </div>
        <div class="form-group">
            <label>Max HP:</label>
            <input type="number" id="editMaxHP" value="${app.character.maxHP}" class="form-input">
        </div>
        <div class="form-group">
            <label>AC:</label>
            <input type="number" id="editAC" value="${app.character.ac}" class="form-input">
        </div>
        <div class="form-group">
            <label>Ability Scores:</label>
            <div class="ability-edit-grid">
                ${['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].map(ability => `
                    <div>
                        <label>${ability}:</label>
                        <input type="number" id="edit${ability}" value="${app.character.abilityScores[ability] || 10}" min="1" max="30" class="form-input">
                    </div>
                `).join('')}
            </div>
        </div>
        <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
            <button class="btn-primary" id="saveCharacterBtn">Save Character</button>
            <button class="btn-secondary" onclick="document.getElementById('characterModal').classList.remove('active')">Cancel</button>
        </div>
    `;
    
    document.getElementById('saveCharacterBtn').addEventListener('click', () => {
        app.character.name = document.getElementById('editName').value;
        app.character.class = document.getElementById('editClass').value;
        app.character.level = parseInt(document.getElementById('editLevel').value);
        app.character.maxHP = parseInt(document.getElementById('editMaxHP').value);
        app.character.ac = parseInt(document.getElementById('editAC').value);
        
        ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].forEach(ability => {
            app.character.abilityScores[ability] = parseInt(document.getElementById(`edit${ability}`).value);
        });
        
        app.character.currentHP = Math.min(app.character.currentHP, app.character.maxHP);
        
        app.addLog(`Character updated: ${app.character.name}`);
        app.saveCharacter();
        updateCharacterDisplay();
        panel.classList.remove('active');
    });
    
    panel.classList.add('active');
}

// Initialize when app loads
if (window.dndApp) {
    window.dndApp.initPlayerView = initPlayerView;
}

