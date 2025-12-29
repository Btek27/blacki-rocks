// Chess Encounter Mode
function initChessView() {
    const app = window.dndApp;
    
    // Initialize chess state
    if (!app.chessState) {
        app.chessState = {
            wrongMoves: 0,
            alternativeCheckmate: false,
            currentPhase: 'puzzle',
            omnivaxAdded: false,
            caissaBlessing: false,
            customConsequences: {},
            combatants: [],
            initiative: [],
            currentTurn: 0
        };
    }
    
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabName = e.target.dataset.tab;
            switchTab(tabName);
            if (tabName === 'omnivax') {
                updateOmnivaxDisplay();
            }
        });
    });
    
    // Summon creatures button
    document.getElementById('summonCreaturesBtn')?.addEventListener('click', () => {
        showSummonCreaturesMenu();
    });
    
    // Reset eye rays button
    document.getElementById('resetEyeRaysBtn')?.addEventListener('click', () => {
        resetEyeRays();
    });
    
    // Load physical description
    const physicalDesc = document.getElementById('physicalDescription');
    if (physicalDesc) {
        physicalDesc.innerHTML = CHESS_DATA.physicalDescription.split('\n\n').map(para => `<p>${para}</p>`).join('');
    }
    
    // Load puzzle description
    const puzzleDesc = document.getElementById('puzzleDescription');
    if (puzzleDesc) {
        // Format the puzzle description with proper line breaks
        let formatted = CHESS_DATA.puzzleDescription;
        // Split by double newlines for paragraphs
        const paragraphs = formatted.split(/\n\n+/);
        let html = '';
        paragraphs.forEach(para => {
            if (para.trim()) {
                // Handle bullet points
                if (para.trim().startsWith('-')) {
                    const lines = para.split('\n');
                    html += '<ul style="margin: 0.5rem 0; padding-left: 1.5rem;">';
                    lines.forEach(line => {
                        if (line.trim().startsWith('-')) {
                            const content = line.replace(/^-\s*/, '').trim();
                            html += `<li style="margin: 0.25rem 0;">${content}</li>`;
                        }
                    });
                    html += '</ul>';
                } else {
                    // Regular paragraph with formatting
                    let paraHtml = para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    paraHtml = paraHtml.replace(/\n/g, '<br>');
                    html += `<p>${paraHtml}</p>`;
                }
            }
        });
        puzzleDesc.innerHTML = html;
    }
    
    // Load reference
    const refContent = document.getElementById('omnivaxReference');
    if (refContent) {
        // Format reference with proper structure
        let formatted = CHESS_DATA.reference;
        const lines = formatted.split('\n');
        let html = '';
        let currentList = null;
        
        lines.forEach((line, index) => {
            const trimmed = line.trim();
            
            if (!trimmed) {
                // Empty line - close current list if open
                if (currentList) {
                    html += '</ul>';
                    currentList = null;
                }
                return;
            }
            
            // Check if it's a header (all caps, ends with :, or starts with **)
            if (trimmed.match(/^[A-Z\s]+:$/) || (trimmed.match(/^[A-Z\s]+$/) && trimmed.length > 2 && trimmed.length < 30)) {
                // Close any open list
                if (currentList) {
                    html += '</ul>';
                    currentList = null;
                }
                html += `<strong>${trimmed}</strong>`;
            } else if (trimmed.startsWith('•')) {
                // Bullet point - start list if needed
                if (!currentList) {
                    html += '<ul>';
                    currentList = true;
                }
                const content = trimmed.replace(/^•\s*/, '');
                html += `<li>${content}</li>`;
            } else {
                // Regular text line
                if (currentList) {
                    html += '</ul>';
                    currentList = null;
                }
                html += `<p>${trimmed}</p>`;
            }
        });
        
        // Close any remaining list
        if (currentList) {
            html += '</ul>';
        }
        
        refContent.innerHTML = html;
    }
    
    // Load taunts
    const tauntsGrid = document.getElementById('tauntsGrid');
    if (tauntsGrid) {
        tauntsGrid.innerHTML = '';
        CHESS_DATA.taunts.forEach(taunt => {
            const btn = document.createElement('button');
            btn.className = 'taunt-btn';
            btn.textContent = taunt.label;
            btn.addEventListener('click', () => {
                speakOmnivax(taunt.label, taunt.text);
            });
            tauntsGrid.appendChild(btn);
        });
    }
    
    // Wrong move buttons - toggle details display
    document.querySelectorAll('.consequence-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const move = e.target.dataset.move;
            const section = e.target.closest('.consequence-section');
            
            // Toggle active state
            const isActive = section.classList.contains('active');
            
            // Close all sections first
            document.querySelectorAll('.consequence-section').forEach(s => {
                s.classList.remove('active');
            });
            
            // If clicking the same button, toggle it off. Otherwise, open the clicked one
            if (!isActive) {
                section.classList.add('active');
            }
            
            // Double-click or apply button to actually apply the consequence
            // For now, we'll add a separate apply button or use double-click
        });
    });
    
    // Apply buttons for consequences
    document.querySelectorAll('.consequence-btn').forEach(btn => {
        let clickTimer = null;
        btn.addEventListener('dblclick', (e) => {
            e.preventDefault();
            const move = e.target.dataset.move;
            if (move === 'alt') {
                applyAlternativeCheckmate();
            } else {
                applyWrongMove(parseInt(move));
            }
        });
        
        // Also add right-click context menu option
        btn.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const move = e.target.dataset.move;
            if (confirm(`Apply ${move === 'alt' ? 'Alternative Checkmate' : `Wrong Move ${move}`}?`)) {
                if (move === 'alt') {
                    applyAlternativeCheckmate();
                } else {
                    applyWrongMove(parseInt(move));
                }
            }
        });
    });
    
    // Add explicit apply buttons
    document.querySelectorAll('.consequence-section').forEach(section => {
        const btn = section.querySelector('.consequence-btn');
        const move = btn.dataset.move;
        
        // Create apply button
        const applyBtn = document.createElement('button');
        applyBtn.className = 'btn-primary apply-consequence-btn';
        applyBtn.textContent = move === 'alt' ? '✨ Apply Alternative Checkmate' : `❌ Apply Wrong Move ${move}`;
        applyBtn.style.cssText = 'margin-top: 0.75rem; width: 100%;';
        applyBtn.addEventListener('click', () => {
            if (move === 'alt') {
                applyAlternativeCheckmate();
            } else {
                applyWrongMove(parseInt(move));
            }
        });
        
        const details = section.querySelector('.consequence-details');
        if (details) {
            details.appendChild(applyBtn);
        }
    });
    
    // Reset wrong moves button
    document.getElementById('resetWrongMovesBtn')?.addEventListener('click', () => {
        resetWrongMoves();
    });
    
    // Combat buttons
    document.getElementById('addOmnivaxBtn')?.addEventListener('click', () => {
        addOmnivaxToEncounter();
    });
    
    document.getElementById('addOmnivaxToInitiativeBtn')?.addEventListener('click', () => {
        addOmnivaxToInitiative();
    });
    
    document.getElementById('addPlayerBtn')?.addEventListener('click', () => {
        addPlayerToCombat();
    });
    
    document.getElementById('addEnemyBtn')?.addEventListener('click', () => {
        addEnemyToCombat();
    });
    
    document.getElementById('rollInitiativeBtn')?.addEventListener('click', () => {
        rollInitiative();
    });
    
    document.getElementById('nextTurnBtn')?.addEventListener('click', () => {
        nextTurn();
    });
    
    document.getElementById('resetInitiativeBtn')?.addEventListener('click', () => {
        resetInitiative();
    });
    
    // Creature spawn buttons
    document.getElementById('addGazerBtn')?.addEventListener('click', () => {
        addGazer();
    });
    
    document.getElementById('addMultipleGazersBtn')?.addEventListener('click', () => {
        addMultipleGazers();
    });
    
    document.getElementById('addSpectatorBtn')?.addEventListener('click', () => {
        addSpectator();
    });
    
    document.getElementById('addMultipleSpectatorsBtn')?.addEventListener('click', () => {
        addMultipleSpectators();
    });
    
    document.getElementById('addTrueBeholderBtn')?.addEventListener('click', () => {
        addTrueBeholder();
    });
    
    document.getElementById('addTwoTrueBeholdersBtn')?.addEventListener('click', () => {
        addTwoTrueBeholders();
    });
    
    updateChessDisplay();
    updateInitiativeDisplay();
    updateCombatantsDisplay();
    app.updateLogDisplay();
}

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const tabEl = document.getElementById(`tab-${tabName}`);
    const btnEl = document.querySelector(`[data-tab="${tabName}"]`);
    if (tabEl) tabEl.classList.add('active');
    if (btnEl) btnEl.classList.add('active');
}

// Removed custom consequences functions - no longer needed

function resetWrongMoves() {
    const app = window.dndApp;
    
    if (!confirm('Are you sure you want to reset all wrong moves? This will:\n- Reset wrong moves counter to 0\n- Remove all spawned creatures\n- Reset Omnivax stats to base values\n- Clear alternative checkmate effects')) {
        return;
    }
    
    // Reset wrong moves
    app.chessState.wrongMoves = 0;
    app.chessState.alternativeCheckmate = false;
    app.chessState.caissaBlessing = false;
    app.chessState.alternativeCheckmateDamageApplied = false;
    
    // Remove all spawned creatures (keep players and manually added enemies)
    app.chessState.combatants = app.chessState.combatants.filter(c => {
        // Keep players
        if (c.type === 'player') return true;
        // Keep manually added enemies (not auto-spawned)
        if (c.name === 'Omnivax') return true;
        // Remove auto-spawned creatures
        return !c.name.match(/^(Gazer|Spectator|True Beholder)/i);
    });
    
    // Reset Omnivax stats if they exist
    if (app.chessState.omnivaxStats) {
        const stats = getStatsForCR(17);
        app.chessState.omnivaxStats = {
            ac: 20,
            maxHP: stats.hp,
            currentHP: stats.hp,
            saveDC: 19,
            attackBonus: stats.atk,
            legendaryResistance: 3,
            legendaryResistanceMax: 3,
            legendaryActions: 3,
            legendaryActionsMax: 3,
            lairActionsUsed: []
        };
        
        // Update combatant if exists
        const combatant = getOmnivaxCombatant();
        if (combatant) {
            combatant.ac = 20;
            combatant.saveDC = 19;
            combatant.legendaryResistanceMax = 3;
            combatant.legendaryResistance = 3;
            combatant.currentHP = stats.hp;
            combatant.maxHP = stats.hp;
            
            // Reset abilities
            if (combatant.abilities) {
                combatant.abilities = combatant.abilities.map(ability => {
                    if (ability.includes('Eye Rays:')) {
                        return `Eye Rays: 3/turn (DC 19)`;
                    }
                    return ability;
                });
            }
        }
    }
    
    // Clear initiative if no combatants
    if (app.chessState.combatants.length === 0) {
        app.chessState.initiative = [];
        app.chessState.currentTurn = 0;
    }
    
    app.saveChessState();
    app.addLog('Wrong moves reset! All consequences cleared.');
    
    // Update all displays
    updateChessDisplay();
    updateCombatantsDisplay();
    updateInitiativeDisplay();
    updateOmnivaxDisplay();
    
    const content = `
        <div class="info-content-section">
            <h4>Wrong Moves Reset</h4>
            <p>All wrong moves have been reset to 0.</p>
            <ul style="margin-top: 1rem;">
                <li>✓ Wrong moves counter: 0/3</li>
                <li>✓ Alternative checkmate cleared</li>
                <li>✓ Auto-spawned creatures removed</li>
                <li>✓ Omnivax stats reset to base values</li>
                <li>✓ Eye rays reset to 3/turn</li>
            </ul>
        </div>
    `;
    app.showInfoPanel('Reset Complete', content);
}

function updateChessDisplay() {
    const app = window.dndApp;
    
    // Update wrong moves counter
    const counter = document.getElementById('wrongMovesCounter');
    if (counter) {
        counter.textContent = `Wrong Moves: ${app.chessState.wrongMoves}/3`;
        counter.style.color = app.chessState.wrongMoves > 0 ? '#ff4444' : 'white';
    }
    
    // Update phase indicator
    const phaseIndicator = document.getElementById('phaseIndicator');
    if (phaseIndicator) {
        const phase = app.chessState.currentPhase === 'puzzle' ? 'PUZZLE PHASE' : 'COMBAT PHASE';
        const badgeClass = app.chessState.currentPhase === 'puzzle' ? 'puzzle' : 'combat';
        phaseIndicator.innerHTML = `<span class="phase-badge ${badgeClass}">${phase}</span>`;
    }
}

function applyWrongMove(moveNumber) {
    const app = window.dndApp;
    
    if (app.chessState.wrongMoves >= moveNumber) {
        app.showInfoPanel('Already Applied', `<p>Wrong Move ${moveNumber} has already been applied!</p>`);
        return;
    }
    
    app.chessState.wrongMoves = moveNumber;
    app.saveChessState();
    
    const consequence = CHESS_DATA.wrongMoveConsequences[moveNumber];
    if (!consequence) return;
    
    // Automatically spawn creatures based on wrong move
    if (moveNumber === 1) {
        // Spawn 2d4 Gazers automatically
        const count = rollDice(2, 4);
        const stats = CREATURE_STATS['Gazer'];
        for (let i = 0; i < count; i++) {
            addCreatureToCombat(`Gazer ${i + 1}`, stats);
        }
        app.addLog(`WRONG MOVE 1: Spawned ${count} Gazers automatically (rolled 2d4)`);
    } else if (moveNumber === 2) {
        // Spawn 1d4 Spectators automatically
        const count = rollDice(1, 4);
        const stats = CREATURE_STATS['Spectator'];
        for (let i = 0; i < count; i++) {
            addCreatureToCombat(`Spectator ${i + 1}`, stats);
        }
        app.addLog(`WRONG MOVE 2: Spawned ${count} Spectators automatically (rolled 1d4)`);
    } else if (moveNumber === 3) {
        // Spawn 2 True Beholders automatically
        const stats = CREATURE_STATS['True Beholder'];
        addCreatureToCombat('True Beholder 1', stats);
        addCreatureToCombat('True Beholder 2', stats);
        app.addLog('WRONG MOVE 3: Spawned 2 True Beholders automatically');
    }
    
    // Update Omnivax stats based on wrong moves
    updateOmnivaxStatsFromWrongMoves();
    
    let content = `
        <div class="info-content-section">
            <h4>${consequence.title}</h4>
            <p style="font-style: italic; line-height: 1.8;">${consequence.narrative}</p>
        </div>
        <div class="info-content-section">
            <h4>Mechanical Effects Applied</h4>
            <ul>
                ${consequence.effects.map(effect => `<li>${effect}</li>`).join('')}
            </ul>
            <p style="margin-top: 1rem; color: #44ff44;">✓ Creatures automatically added to Combat tab</p>
            <p style="color: #44ff44;">✓ Omnivax stats updated in Omnivax tab</p>
        </div>
    `;
    
    app.addLog(`WRONG MOVE ${moveNumber}: ${consequence.title}`);
    app.showInfoPanel(`Wrong Move ${moveNumber}`, content);
    
    updateChessDisplay();
    updateCombatantsDisplay();
    updateInitiativeDisplay();
    
    // Always update Omnivax display to reflect changes
    updateOmnivaxDisplay();
}

function updateOmnivaxStatsFromWrongMoves() {
    const app = window.dndApp;
    if (!app.chessState.omnivaxStats) {
        const stats = getStatsForCR(17);
        app.chessState.omnivaxStats = {
            ac: app.chessState.alternativeCheckmate ? 19 : 20,
            maxHP: stats.hp - (app.chessState.alternativeCheckmate ? 30 : 0),
            currentHP: stats.hp - (app.chessState.alternativeCheckmate ? 30 : 0),
            saveDC: app.chessState.alternativeCheckmate ? 18 : 19,
            attackBonus: stats.atk,
            legendaryResistance: app.chessState.alternativeCheckmate ? 2 : 3,
            legendaryResistanceMax: app.chessState.alternativeCheckmate ? 2 : 3,
            legendaryActions: 3,
            legendaryActionsMax: 3,
            lairActionsUsed: []
        };
    }
    
    // Update AC based on wrong moves
    if (app.chessState.wrongMoves >= 3 && !app.chessState.alternativeCheckmate) {
        app.chessState.omnivaxStats.ac = 22;
    } else if (app.chessState.alternativeCheckmate) {
        app.chessState.omnivaxStats.ac = 19;
    } else {
        app.chessState.omnivaxStats.ac = 20;
    }
    
    // Update Save DC based on alternative checkmate
    if (app.chessState.alternativeCheckmate) {
        app.chessState.omnivaxStats.saveDC = 18;
    } else {
        app.chessState.omnivaxStats.saveDC = 19;
    }
    
    // Update Legendary Resistance based on alternative checkmate
    if (app.chessState.alternativeCheckmate) {
        app.chessState.omnivaxStats.legendaryResistanceMax = 2;
        if (app.chessState.omnivaxStats.legendaryResistance > 2) {
            app.chessState.omnivaxStats.legendaryResistance = 2;
        }
    } else {
        app.chessState.omnivaxStats.legendaryResistanceMax = 3;
    }
    
    // Apply 30 damage if alternative checkmate (only apply once)
    if (app.chessState.alternativeCheckmate && !app.chessState.alternativeCheckmateDamageApplied) {
        const damage = 30;
        const newHP = Math.max(0, app.chessState.omnivaxStats.maxHP - damage);
        app.chessState.omnivaxStats.currentHP = newHP;
        app.chessState.alternativeCheckmateDamageApplied = true;
    }
    
    // Update combatant if exists
    const combatant = getOmnivaxCombatant();
    if (combatant) {
        combatant.ac = app.chessState.omnivaxStats.ac;
        combatant.saveDC = app.chessState.omnivaxStats.saveDC;
        combatant.legendaryResistanceMax = app.chessState.omnivaxStats.legendaryResistanceMax;
        combatant.legendaryResistance = Math.min(combatant.legendaryResistance, combatant.legendaryResistanceMax);
        combatant.currentHP = app.chessState.omnivaxStats.currentHP;
        combatant.maxHP = app.chessState.omnivaxStats.maxHP;
        
        // Update abilities text
        let eyeRays = 3;
        if (app.chessState.wrongMoves >= 1) eyeRays = 4;
        if (app.chessState.wrongMoves >= 2) eyeRays = 5;
        if (app.chessState.wrongMoves >= 3) eyeRays = 10;
        
        const saveDC = app.chessState.omnivaxStats.saveDC;
        if (combatant.abilities) {
            combatant.abilities = combatant.abilities.map(ability => {
                if (ability.includes('Eye Rays:')) {
                    return `Eye Rays: ${eyeRays}/turn (DC ${saveDC})`;
                }
                return ability;
            });
        }
    }
    
    app.saveChessState();
}

// Creature stat definitions from markdown files
const CREATURE_STATS = {
    'Gazer': {
        cr: 0.5,
        ac: 13,
        hp: 13,
        maxHP: 13,
        type: 'Aberration',
        speed: 'Fly 30 ft',
        description: 'Small beholder-kin with single eye ray per turn',
        abilities: [
            'Bite: +5, 1d4+3 piercing',
            'Eye Ray (1/turn): Frost 2d6 cold, Fear (frightened), Telekinetic (push 15 ft), Dazing (incapacitated)',
            'Aggressive: Bonus action move toward hostile creature',
            'Mimicry: Can mimic simple sounds'
        ]
    },
    'Spectator': {
        cr: 3,
        ac: 14,
        hp: 39,
        maxHP: 39,
        type: 'Aberration',
        speed: 'Fly 30 ft',
        description: 'Four-eyed beholder guardian with spell reflection',
        abilities: [
            'Bite: +1, 1d6-1 piercing',
            'Eye Rays (2/turn): Confusion, Paralysis, Fear, Wounding (3d10 necrotic)',
            'Spell Reflection: If saves vs spell, can redirect to other target within 30 ft'
        ]
    },
    'True Beholder': {
        cr: 13,
        ac: 18,
        hp: 180,
        maxHP: 180,
        type: 'Aberration',
        speed: 'Fly 20 ft',
        description: 'Full Eye Tyrant with 10 eye rays and antimagic cone',
        abilities: [
            'Bite: +5, 2d6+3 piercing',
            'Eye Rays (3/turn): All 10 types available',
            'Antimagic Cone: 150-ft cone, suppresses magic',
            'Legendary Actions: 3 per round'
        ]
    }
};

function addGazer() {
    const app = window.dndApp;
    const stats = CREATURE_STATS['Gazer'];
    addCreatureToCombat('Gazer', stats);
    app.addLog('Added 1 Gazer to combat');
    updateInitiativeDisplay();
    updateCombatantsDisplay();
}

function addMultipleGazers() {
    const app = window.dndApp;
    const count = rollDice(2, 4);
    const stats = CREATURE_STATS['Gazer'];
    for (let i = 0; i < count; i++) {
        addCreatureToCombat(`Gazer ${i + 1}`, stats);
    }
    app.addLog(`Added ${count} Gazers to combat (rolled 2d4)`);
    updateInitiativeDisplay();
    updateCombatantsDisplay();
}

function addSpectator() {
    const app = window.dndApp;
    const stats = CREATURE_STATS['Spectator'];
    addCreatureToCombat('Spectator', stats);
    app.addLog('Added 1 Spectator to combat');
    updateInitiativeDisplay();
    updateCombatantsDisplay();
}

function addMultipleSpectators() {
    const app = window.dndApp;
    const count = rollDice(1, 4);
    const stats = CREATURE_STATS['Spectator'];
    for (let i = 0; i < count; i++) {
        addCreatureToCombat(`Spectator ${i + 1}`, stats);
    }
    app.addLog(`Added ${count} Spectators to combat (rolled 1d4)`);
    updateInitiativeDisplay();
    updateCombatantsDisplay();
}

function addTrueBeholder() {
    const app = window.dndApp;
    const stats = CREATURE_STATS['True Beholder'];
    addCreatureToCombat('True Beholder', stats);
    app.addLog('Added 1 True Beholder to combat');
    updateInitiativeDisplay();
    updateCombatantsDisplay();
}

function addTwoTrueBeholders() {
    const app = window.dndApp;
    const stats = CREATURE_STATS['True Beholder'];
    addCreatureToCombat('True Beholder 1', stats);
    addCreatureToCombat('True Beholder 2', stats);
    app.addLog('Added 2 True Beholders to combat');
    updateInitiativeDisplay();
    updateCombatantsDisplay();
}

// Make functions globally available
window.addGazer = addGazer;
window.addMultipleGazers = addMultipleGazers;
window.addSpectator = addSpectator;
window.addMultipleSpectators = addMultipleSpectators;
window.addTrueBeholder = addTrueBeholder;
window.addTwoTrueBeholders = addTwoTrueBeholders;

function rollDice(numDice, dieSize) {
    let total = 0;
    for (let i = 0; i < numDice; i++) {
        total += Math.floor(Math.random() * dieSize) + 1;
    }
    return total;
}

function addCreatureToCombat(name, stats) {
    const app = window.dndApp;
    
    if (!app.chessState.combatants) {
        app.chessState.combatants = [];
    }
    
    // Check if this is a duplicate name and add number if needed
    let finalName = name;
    let counter = 1;
    while (app.chessState.combatants.some(c => c.name === finalName)) {
        finalName = `${name} ${counter}`;
        counter++;
    }
    
    const combatant = {
        id: Date.now() + Math.random(),
        name: finalName,
        type: 'enemy',
        ac: stats.ac,
        maxHP: stats.maxHP || stats.hp,
        currentHP: stats.maxHP || stats.hp,
        cr: stats.cr,
        speed: stats.speed,
        description: stats.description,
        abilities: stats.abilities || [],
        initiative: null
    };
    
    app.chessState.combatants.push(combatant);
    app.saveChessState();
    
    return combatant;
}

function applyAlternativeCheckmate() {
    const app = window.dndApp;
    
    if (app.chessState.alternativeCheckmate) {
        app.showInfoPanel('Already Applied', '<p>Alternative Checkmate bonus already granted!</p>');
        return;
    }
    
    app.chessState.alternativeCheckmate = true;
    app.chessState.caissaBlessing = true;
    app.saveChessState();
    
    // Apply debuffs to Omnivax automatically
    updateOmnivaxStatsFromWrongMoves();
    
    const content = `
        <div class="info-content-section">
            <h4>Alternative Checkmate Discovered!</h4>
            <p style="font-style: italic; line-height: 1.8;">${CHESS_DATA.alternativeCheckmate.narrative}</p>
        </div>
        <div class="info-content-section">
            <h4>Omnivax Suffers (Applied Automatically)</h4>
            <ul>
                ${CHESS_DATA.alternativeCheckmate.omnivaxDebuffs.map(debuff => `<li>${debuff}</li>`).join('')}
            </ul>
            <p style="margin-top: 1rem; color: #44ff44;">✓ Omnivax stats updated in Omnivax tab</p>
        </div>
        <div class="info-content-section">
            <h4>Party Receives Caïssa's Blessing</h4>
            <ul>
                ${CHESS_DATA.alternativeCheckmate.partyBuffs.map(buff => `<li>${buff}</li>`).join('')}
            </ul>
        </div>
    `;
    
    app.addLog('ALTERNATIVE CHECKMATE! Caïssa manifests! Party receives Grandmaster\'s Gambit blessing!');
    app.addLog('Omnivax takes 30 psychic damage, AC reduced to 19, Save DC reduced to 18, Legendary Resistance reduced to 2/day');
    
    updateChessDisplay();
    updateCombatantsDisplay();
    
    // Always update Omnivax display to reflect changes
    updateOmnivaxDisplay();
    
    app.showInfoPanel('Alternative Checkmate!', content);
}

function speakOmnivax(label, text) {
    const app = window.dndApp;
    
    const content = `
        <div class="info-content-section">
            <h4>OMNIVAX - ${label}</h4>
            <p style="font-style: italic; font-size: 1.1rem; line-height: 1.8; color: #ff44ff;">"${text}"</p>
        </div>
    `;
    
    app.showInfoPanel('Omnivax Speaks', content);
    app.addLog(`OMNIVAX: [${label}] ${text}`);
    app.updateLogDisplay();
}

function addOmnivaxToEncounter(force = false) {
    const app = window.dndApp;
    
    // Check if already in combatants
    const existing = getOmnivaxCombatant();
    if (existing && !force) {
        const content = `
            <div class="info-content-section">
                <h4>Omnivax Already Added</h4>
                <p>Omnivax is already in the encounter.</p>
                <button class="btn-primary" onclick="addOmnivaxToEncounter(true); window.dndApp.hideInfoPanel();" style="margin-top: 1rem;">Add Again Anyway</button>
            </div>
        `;
        app.showInfoPanel('Warning', content);
        return;
    }
    
    
    if (!omnivaxData) {
        app.showInfoPanel('Error', '<p>Omnivax not found in database!</p>');
        return;
    }
    
    const stats = getStatsForCR(17);
    
    // Apply modifications based on chess state
    let ac = 20;
    let legendaryResist = 3;
    let eyeRays = 3;
    let psychicFeedback = '2d8';
    let saveDC = 19;
    
    if (app.chessState.alternativeCheckmate) {
        ac = 19;
        legendaryResist = 2;
        saveDC = 18;
    }
    
    if (app.chessState.wrongMoves >= 1) {
        eyeRays = 4;
        psychicFeedback = '2d8';
    }
    if (app.chessState.wrongMoves >= 2) {
        eyeRays = 5;
        psychicFeedback = '3d8';
    }
    if (app.chessState.wrongMoves >= 3) {
        eyeRays = 10;
        ac = app.chessState.alternativeCheckmate ? 19 : 22;
        psychicFeedback = '4d8';
    }
    
    const specialNotes = [
        `Eye Rays: ${eyeRays}/turn`,
        `Psychic Feedback: ${psychicFeedback} to attackers`,
        'Antimagic Cone: 240-ft',
        app.chessState.wrongMoves >= 2 ? 'Hive Mind active' : '',
        app.chessState.wrongMoves >= 3 ? 'OVERCHARGED' : '',
        app.chessState.alternativeCheckmate ? 'Caïssa\'s Blessing debuff' : ''
    ].filter(note => note);
    
    // Initialize combatants list
    if (!app.chessState.combatants) {
        app.chessState.combatants = [];
    }
    
    // Initialize Omnivax stats
    if (!app.chessState.omnivaxStats) {
        app.chessState.omnivaxStats = {
            ac: ac,
            maxHP: stats.hp - (app.chessState.alternativeCheckmate ? 30 : 0),
            currentHP: stats.hp - (app.chessState.alternativeCheckmate ? 30 : 0),
            saveDC: saveDC,
            attackBonus: stats.atk,
            legendaryResistance: legendaryResist,
            legendaryResistanceMax: legendaryResist,
            legendaryActions: 3,
            legendaryActionsMax: 3,
            lairActionsUsed: []
        };
    }
    
    // Remove existing if force adding
    if (existing && force) {
        app.chessState.combatants = app.chessState.combatants.filter(c => c.id !== existing.id);
    }
    
    const combatant = {
        id: Date.now(),
        name: 'Omnivax',
        type: 'enemy',
        cr: 17,
        maxHP: app.chessState.omnivaxStats.maxHP,
        currentHP: app.chessState.omnivaxStats.currentHP,
        ac: app.chessState.omnivaxStats.ac,
        saveDC: app.chessState.omnivaxStats.saveDC,
        attackBonus: app.chessState.omnivaxStats.attackBonus,
        speed: 'Fly 40 ft',
        description: 'The Hive Mother - Massive beholder with infinite perspective',
        abilities: [
            `Bite: +12, 4d8+6 piercing + grapple (DC 18 Str)`,
            `Eye Rays: ${eyeRays}/turn (DC ${saveDC})`,
            'Swallow Whole: 4d8 acid/turn, AC 20 interior, 30 HP to cut out',
            'Telekinetic Chess Strike (Bonus): +12, 3d10 bludgeoning, 120 ft',
            `Legendary Actions: 3/round`,
            `Legendary Resistance: ${legendaryResist}/day`,
            `Psychic Feedback: ${psychicFeedback} to attackers`,
            'Antimagic Cone: 240-ft (can split if Overcharged)',
            'All-Around Vision (cannot be surprised)',
            'Hive Mind (knows spawn locations, sees through their eyes)',
            ...specialNotes
        ],
        legendaryResistance: app.chessState.omnivaxStats.legendaryResistance,
        legendaryResistanceMax: app.chessState.omnivaxStats.legendaryResistanceMax,
        legendaryActions: app.chessState.omnivaxStats.legendaryActions,
        legendaryActionsMax: app.chessState.omnivaxStats.legendaryActionsMax,
        initiative: null
    };
    
    app.chessState.combatants.push(combatant);
    app.chessState.omnivaxAdded = true;
    app.saveChessState();
    
    app.addLog(`Omnivax added to combat! AC ${combatant.ac}, ${legendaryResist} Legendary Resistances, ${eyeRays} eye rays/turn`);
    
    const content = `
        <div class="info-content-section">
            <h4>Omnivax Added!</h4>
            <p><strong>AC:</strong> ${combatant.ac}</p>
            <p><strong>HP:</strong> ${combatant.currentHP}/${combatant.maxHP}</p>
            <p><strong>Legendary Resistances:</strong> ${legendaryResist}</p>
            <p><strong>Eye Rays per turn:</strong> ${eyeRays}</p>
            <p><strong>Psychic Feedback:</strong> ${psychicFeedback}</p>
            <p style="margin-top: 1rem; color: #44ff44;">✓ Added to combat tab. Roll initiative to begin!</p>
        </div>
    `;
    app.showInfoPanel('Omnivax Added', content);
    
    updateInitiativeDisplay();
    updateCombatantsDisplay();
    
    // Update Omnivax display if tab is active
    if (document.getElementById('tab-omnivax')?.classList.contains('active')) {
        updateOmnivaxDisplay();
    }
}

function addOmnivaxToInitiative() {
    const app = window.dndApp;
    
    // First ensure Omnivax is added to combatants
    const existing = getOmnivaxCombatant();
    if (!existing) {
        // Add Omnivax first
        addOmnivaxToEncounter();
        // Wait a moment for it to be added, then continue
        setTimeout(() => {
            addOmnivaxToInitiative();
        }, 100);
        return;
    }
    
    // Roll initiative for Omnivax if not already rolled
    if (existing.initiative === null) {
        const modifier = 2; // Dex modifier for Omnivax
        existing.initiative = rollDice(1, 20) + modifier;
        app.saveChessState();
        app.addLog(`Omnivax rolled initiative: ${existing.initiative}`);
    }
    
    updateInitiativeDisplay();
    updateCombatantsDisplay();
    
    const content = `
        <div class="info-content-section">
            <h4>Omnivax Added to Initiative</h4>
            <p><strong>Initiative:</strong> ${existing.initiative}</p>
            <p style="margin-top: 1rem; color: #44ff44;">✓ Omnivax is now in the initiative order!</p>
        </div>
    `;
    app.showInfoPanel('Omnivax Initiative', content);
}

function addPlayerToCombat() {
    const app = window.dndApp;
    const name = prompt('Enter player name:');
    if (!name) return;
    
    if (!app.chessState.combatants) {
        app.chessState.combatants = [];
    }
    
    const combatant = {
        id: Date.now() + Math.random(),
        name,
        type: 'player',
        ac: null,
        maxHP: null,
        currentHP: null,
        initiative: null
    };
    
    app.chessState.combatants.push(combatant);
    app.saveChessState();
    
    app.addLog(`Added player: ${name}`);
    updateInitiativeDisplay();
    updateCombatantsDisplay();
}

function addEnemyToCombat() {
    const app = window.dndApp;
    const name = prompt('Enter enemy name:');
    if (!name) return;
    
    const ac = prompt('Enter AC:', '13');
    const hp = prompt('Enter Max HP:', '50');
    const cr = prompt('Enter CR (optional):', '');
    
    if (!app.chessState.combatants) {
        app.chessState.combatants = [];
    }
    
    const combatant = {
        id: Date.now() + Math.random(),
        name,
        type: 'enemy',
        ac: parseInt(ac) || 13,
        maxHP: parseInt(hp) || 50,
        currentHP: parseInt(hp) || 50,
        cr: cr ? parseFloat(cr) : null,
        initiative: null
    };
    
    app.chessState.combatants.push(combatant);
    app.saveChessState();
    
    app.addLog(`Added enemy: ${name} (AC: ${combatant.ac}, HP: ${combatant.maxHP})`);
    updateInitiativeDisplay();
    updateCombatantsDisplay();
}

function rollInitiative() {
    const app = window.dndApp;
    
    if (!app.chessState.combatants || app.chessState.combatants.length === 0) {
        app.showInfoPanel('Error', '<p>No combatants added yet. Add players and enemies first.</p>');
        return;
    }
    
    app.chessState.combatants.forEach(combatant => {
        if (combatant.initiative === null) {
            // Roll d20 + modifier (simplified, you can add modifiers later)
            const modifier = combatant.type === 'player' ? 3 : 2;
            combatant.initiative = rollDice(1, 20) + modifier;
        }
    });
    
    // Sort by initiative (highest first)
    app.chessState.combatants.sort((a, b) => (b.initiative || 0) - (a.initiative || 0));
    
    app.chessState.currentTurn = 0;
    app.chessState.currentPhase = 'combat';
    app.saveChessState();
    
    app.addLog('Initiative rolled! Combat begins.');
    updateChessDisplay();
    updateInitiativeDisplay();
    updateCombatantsDisplay();
}

function nextTurn() {
    const app = window.dndApp;
    
    if (!app.chessState.combatants || app.chessState.combatants.length === 0) {
        return;
    }
    
    app.chessState.currentTurn = (app.chessState.currentTurn + 1) % app.chessState.combatants.length;
    app.saveChessState();
    
    const currentCombatant = app.chessState.combatants[app.chessState.currentTurn];
    app.addLog(`${currentCombatant.name}'s turn!`);
    
    updateInitiativeDisplay();
}

function resetInitiative() {
    const app = window.dndApp;
    
    if (!app.chessState.combatants) return;
    
    app.chessState.combatants.forEach(combatant => {
        combatant.initiative = null;
    });
    
    app.chessState.currentTurn = 0;
    app.saveChessState();
    
    app.addLog('Initiative reset.');
    updateInitiativeDisplay();
}

function updateInitiativeDisplay() {
    const app = window.dndApp;
    const list = document.getElementById('initiativeList');
    if (!list) return;
    
    list.innerHTML = '';
    
    if (!app.chessState.combatants || app.chessState.combatants.length === 0) {
        list.innerHTML = '<p style="color: #888; text-align: center;">No combatants yet. Add players and enemies first.</p>';
        return;
    }
    
    // Sort by initiative
    const sorted = [...app.chessState.combatants].sort((a, b) => {
        const aInit = a.initiative !== null ? a.initiative : -1;
        const bInit = b.initiative !== null ? b.initiative : -1;
        return bInit - aInit;
    });
    
    sorted.forEach((combatant, idx) => {
        const item = document.createElement('div');
        item.className = `initiative-item ${combatant.type} ${idx === app.chessState.currentTurn && combatant.initiative !== null ? 'current-turn' : ''}`;
        
        item.innerHTML = `
            <div class="initiative-value">${combatant.initiative !== null ? combatant.initiative : '?'}</div>
            <div class="initiative-name">${combatant.name}${combatant.cr ? ` (CR ${combatant.cr})` : ''}</div>
            <div class="initiative-controls">
                ${combatant.initiative === null ? `
                    <button class="initiative-btn" onclick="rollInitiativeForCombatant(${combatant.id})">Roll</button>
                ` : `
                    <input type="number" class="stat-edit-input" style="width: 60px; padding: 0.25rem;" 
                           value="${combatant.initiative}" 
                           onchange="updateInitiative(${combatant.id}, this.value)">
                `}
                <button class="initiative-btn" onclick="removeCombatant(${combatant.id})">Remove</button>
            </div>
        `;
        
        list.appendChild(item);
    });
}

function updateCombatantsDisplay() {
    const app = window.dndApp;
    const list = document.getElementById('combatantsList');
    if (!list) return;
    
    list.innerHTML = '';
    
    if (!app.chessState.combatants || app.chessState.combatants.length === 0) {
        return;
    }
    
    app.chessState.combatants.forEach(combatant => {
        const card = document.createElement('div');
        card.className = 'combatant-card';
        
        // Handle players without AC/HP
        const hasStats = combatant.maxHP !== null && combatant.maxHP !== undefined;
        const hpPercent = hasStats ? (combatant.currentHP / combatant.maxHP) * 100 : 100;
        const hpColor = hasStats ? (hpPercent > 50 ? '#44ff44' : hpPercent > 25 ? '#ffaa44' : '#ff4444') : '#888';
        
        const hpDisplay = hasStats ? `${combatant.currentHP}/${combatant.maxHP}` : (combatant.currentHP !== null ? `${combatant.currentHP}` : '—');
        const acDisplay = combatant.ac !== null && combatant.ac !== undefined ? combatant.ac : '—';
        
        card.innerHTML = `
            <div class="combatant-header">
                <div>
                    <div class="combatant-name">${combatant.name}${combatant.cr ? ` - CR ${combatant.cr}` : ''}</div>
                    <div class="combatant-type">${combatant.type}${combatant.speed ? ` | ${combatant.speed}` : ''}</div>
                    ${combatant.description ? `<div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem; font-style: italic;">${combatant.description}</div>` : ''}
                </div>
                <div style="text-align: right;">
                    <div style="color: ${hpColor}; font-weight: 600;">HP: ${hpDisplay}</div>
                    <div style="color: var(--text-muted);">AC: ${acDisplay}</div>
                </div>
            </div>
            ${combatant.legendaryResistanceMax > 0 ? `
            <div class="legendary-resources" style="margin: 0.75rem 0;">
                <div class="legendary-resource">
                    <div class="legendary-resource-label">Legendary Resistances</div>
                    <div class="legendary-resource-value">${combatant.legendaryResistance || 0} / ${combatant.legendaryResistanceMax}</div>
                    <div class="legendary-resource-controls">
                        <button class="legendary-btn" onclick="useLegendaryResistance(${combatant.id})" ${(combatant.legendaryResistance || 0) <= 0 ? 'disabled' : ''}>Use</button>
                        <button class="legendary-btn" onclick="resetLegendaryResistance(${combatant.id})">Reset</button>
                    </div>
                </div>
                <div class="legendary-resource">
                    <div class="legendary-resource-label">Legendary Actions</div>
                    <div class="legendary-resource-value">${combatant.legendaryActions || 0} / ${combatant.legendaryActionsMax}</div>
                    <div class="legendary-resource-controls">
                        <button class="legendary-btn" onclick="useLegendaryAction(${combatant.id}, 1)" ${(combatant.legendaryActions || 0) < 1 ? 'disabled' : ''}>Use 1</button>
                        <button class="legendary-btn" onclick="useLegendaryAction(${combatant.id}, 2)" ${(combatant.legendaryActions || 0) < 2 ? 'disabled' : ''}>Use 2</button>
                        <button class="legendary-btn" onclick="resetLegendaryActions(${combatant.id})">Reset</button>
                    </div>
                </div>
            </div>
            ` : ''}
            ${combatant.abilities && combatant.abilities.length > 0 ? `
            <div style="margin: 0.75rem 0; padding: 0.75rem; background: rgba(26, 26, 26, 0.5); border-radius: 6px;">
                <div style="font-size: 0.85rem; color: var(--accent-gold); font-weight: 600; margin-bottom: 0.5rem;">Abilities:</div>
                <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
                    ${combatant.abilities.map(ability => `<li>${ability}</li>`).join('')}
                </ul>
            </div>
            ` : ''}
            <div class="enemy-stats-editable">
                <div class="stat-edit-item">
                    <label class="stat-edit-label">HP</label>
                    ${hasStats ? `
                    <div style="display: flex; align-items: center; gap: 0.25rem;">
                        <input type="number" class="stat-edit-input" 
                               value="${combatant.currentHP}" 
                               min="0" 
                               max="${combatant.maxHP}"
                               onchange="updateCombatantHP(${combatant.id}, this.value)">
                        <span style="font-size: 0.75rem; color: #888; text-align: center;">/ ${combatant.maxHP}</span>
                    </div>
                    ` : `
                    <div style="display: flex; align-items: center; gap: 0.25rem;">
                        <input type="number" class="stat-edit-input" 
                               style="flex: 1;"
                               placeholder="Current" 
                               value="${combatant.currentHP || ''}"
                               min="0"
                               onchange="updateCombatantHP(${combatant.id}, this.value)">
                        <span style="font-size: 0.75rem; color: #888; text-align: center;">/</span>
                        <input type="number" class="stat-edit-input" 
                               style="flex: 1;"
                               placeholder="Max" 
                               value="${combatant.maxHP || ''}"
                               min="1"
                               onchange="updateCombatantMaxHP(${combatant.id}, this.value)">
                    </div>
                    `}
                </div>
                <div class="stat-edit-item">
                    <label class="stat-edit-label">AC</label>
                    <input type="number" class="stat-edit-input" 
                           value="${acDisplay}" 
                           placeholder="${combatant.type === 'player' ? 'Enter AC' : ''}"
                           min="1" 
                           max="50"
                           onchange="updateCombatantAC(${combatant.id}, this.value)">
                </div>
            </div>
            <div class="enemy-controls">
                ${[5, 10, 20, 50].map(dmg => {
                    const diceInfo = getDiceInfoForDamage(dmg, combatant);
                    return `<button class="damage-btn" onclick="applyDamageToCombatant(${combatant.id}, ${dmg})" title="${diceInfo}">-${dmg} HP</button>`;
                }).join('')}
                <button class="damage-btn" style="background: rgba(0,170,0,0.3); border-color: #00aa00;" onclick="healCombatant(${combatant.id})">+HP</button>
            </div>
        `;
        
        list.appendChild(card);
    });
}

function getDiceInfoForDamage(damage, combatant) {
    // Calculate dice needed for damage
    if (damage <= 5) return 'Roll 1d4 or 1d6';
    if (damage <= 10) return 'Roll 1d8+2 or 2d6';
    if (damage <= 20) return 'Roll 2d10 or 4d6';
    if (damage <= 50) return 'Roll 5d10 or 8d6';
    return 'Roll 10d10 or 12d6';
}

// Global functions for onclick handlers
window.rollInitiativeForCombatant = function(id) {
    const app = window.dndApp;
    const combatant = app.chessState.combatants.find(c => c.id === id);
    if (combatant) {
        const modifier = combatant.type === 'player' ? 3 : 2;
        combatant.initiative = rollDice(1, 20) + modifier;
        app.saveChessState();
        updateInitiativeDisplay();
    }
};

window.updateInitiative = function(id, value) {
    const app = window.dndApp;
    const combatant = app.chessState.combatants.find(c => c.id === id);
    if (combatant) {
        combatant.initiative = parseInt(value);
        app.saveChessState();
        updateInitiativeDisplay();
    }
};

window.removeCombatant = function(id) {
    const app = window.dndApp;
    app.chessState.combatants = app.chessState.combatants.filter(c => c.id !== id);
    app.saveChessState();
    updateInitiativeDisplay();
    updateCombatantsDisplay();
};

window.updateCombatantHP = function(id, value) {
    const app = window.dndApp;
    const combatant = app.chessState.combatants.find(c => c.id === id);
    if (combatant) {
        const hpValue = parseInt(value);
        if (!isNaN(hpValue)) {
            if (combatant.maxHP !== null && combatant.maxHP !== undefined) {
                combatant.currentHP = Math.max(0, Math.min(combatant.maxHP, hpValue));
            } else {
                combatant.currentHP = Math.max(0, hpValue);
            }
            app.saveChessState();
            updateCombatantsDisplay();
        }
    }
};

window.updateCombatantMaxHP = function(id, value) {
    const app = window.dndApp;
    const combatant = app.chessState.combatants.find(c => c.id === id);
    if (combatant) {
        const maxHPValue = parseInt(value);
        if (!isNaN(maxHPValue)) {
            combatant.maxHP = Math.max(1, maxHPValue);
            if (combatant.currentHP === null || combatant.currentHP === undefined) {
                combatant.currentHP = maxHPValue;
            } else {
                combatant.currentHP = Math.min(combatant.currentHP, maxHPValue);
            }
            app.saveChessState();
            updateCombatantsDisplay();
        }
    }
};

window.updateCombatantAC = function(id, value) {
    const app = window.dndApp;
    const combatant = app.chessState.combatants.find(c => c.id === id);
    if (combatant) {
        combatant.ac = parseInt(value);
        app.saveChessState();
        updateCombatantsDisplay();
    }
};

window.applyDamageToCombatant = function(id, damage) {
    const app = window.dndApp;
    const combatant = app.chessState.combatants.find(c => c.id === id);
    if (combatant) {
        const diceInfo = getDiceInfoForDamage(damage, combatant);
        
        if (combatant.currentHP !== null && combatant.currentHP !== undefined) {
            combatant.currentHP = Math.max(0, combatant.currentHP - damage);
            const hpDisplay = combatant.maxHP !== null && combatant.maxHP !== undefined 
                ? `${combatant.currentHP}/${combatant.maxHP}` 
                : combatant.currentHP;
            app.addLog(`${combatant.name} took ${damage} damage (HP: ${hpDisplay}). ${diceInfo}`);
            
            // Show dice info
            const content = `
                <div class="info-content-section">
                    <h4>Damage Applied</h4>
                    <p><strong>${combatant.name}</strong> took <strong>${damage}</strong> damage</p>
                    <p>HP: ${hpDisplay}</p>
                    <div class="dice-info">${diceInfo}</div>
                </div>
            `;
            app.showInfoPanel('Damage Applied', content);
        } else {
            app.addLog(`${combatant.name} took ${damage} damage. ${diceInfo}`);
            const content = `
                <div class="info-content-section">
                    <h4>Damage Applied</h4>
                    <p><strong>${combatant.name}</strong> took <strong>${damage}</strong> damage</p>
                    <p style="color: #ffaa44;">Note: Set HP values to track damage</p>
                    <div class="dice-info">${diceInfo}</div>
                </div>
            `;
            app.showInfoPanel('Damage Applied', content);
        }
        
        app.saveChessState();
        updateCombatantsDisplay();
    }
};

window.healCombatant = function(id) {
    const app = window.dndApp;
    const combatant = app.chessState.combatants.find(c => c.id === id);
    if (combatant) {
        const healAmount = prompt(`Heal ${combatant.name} by how much?`, '10');
        if (healAmount && !isNaN(healAmount)) {
            const heal = parseInt(healAmount);
            if (combatant.currentHP !== null && combatant.currentHP !== undefined) {
                if (combatant.maxHP !== null && combatant.maxHP !== undefined) {
                    combatant.currentHP = Math.min(combatant.maxHP, combatant.currentHP + heal);
                    app.addLog(`${combatant.name} healed by ${heal} HP (${combatant.currentHP}/${combatant.maxHP})`);
                } else {
                    combatant.currentHP = combatant.currentHP + heal;
                    app.addLog(`${combatant.name} healed by ${heal} HP (${combatant.currentHP})`);
                }
            } else {
                app.addLog(`${combatant.name} healed by ${heal} HP (set HP values to track)`);
            }
            app.saveChessState();
            updateCombatantsDisplay();
        }
    }
};

window.useLegendaryResistance = function(id) {
    const app = window.dndApp;
    const combatant = app.chessState.combatants.find(c => c.id === id);
    if (combatant && combatant.legendaryResistance > 0) {
        combatant.legendaryResistance--;
        app.addLog(`${combatant.name} uses Legendary Resistance! (${combatant.legendaryResistance}/${combatant.legendaryResistanceMax} remaining)`);
        app.saveChessState();
        updateCombatantsDisplay();
    }
};

window.resetLegendaryResistance = function(id) {
    const app = window.dndApp;
    const combatant = app.chessState.combatants.find(c => c.id === id);
    if (combatant) {
        combatant.legendaryResistance = combatant.legendaryResistanceMax;
        app.addLog(`${combatant.name}'s Legendary Resistances reset to ${combatant.legendaryResistanceMax}`);
        app.saveChessState();
        updateCombatantsDisplay();
    }
};

window.useLegendaryAction = function(id, cost) {
    const app = window.dndApp;
    const combatant = app.chessState.combatants.find(c => c.id === id);
    if (combatant && combatant.legendaryActions >= cost) {
        combatant.legendaryActions -= cost;
        app.addLog(`${combatant.name} uses ${cost} Legendary Action(s)! (${combatant.legendaryActions}/${combatant.legendaryActionsMax} remaining)`);
        app.saveChessState();
        updateCombatantsDisplay();
    }
};

window.resetLegendaryActions = function(id) {
    const app = window.dndApp;
    const combatant = app.chessState.combatants.find(c => c.id === id);
    if (combatant) {
        combatant.legendaryActions = combatant.legendaryActionsMax;
        app.addLog(`${combatant.name}'s turn! Legendary Actions reset to ${combatant.legendaryActionsMax}`);
        app.saveChessState();
        updateCombatantsDisplay();
    }
};

// ===== OMNIVAX MANAGEMENT =====
const EYE_RAYS = [
    { id: 1, name: 'Charm Ray', save: 'Wis', dc: 19, effect: 'Charmed for 1 hour' },
    { id: 2, name: 'Paralyzing Ray', save: 'Con', dc: 19, effect: 'Paralyzed 1 min' },
    { id: 3, name: 'Fear Ray', save: 'Wis', dc: 19, effect: 'Frightened 1 min' },
    { id: 4, name: 'Disintegration Ray', save: 'Dex', dc: 19, effect: '10d6+40 force damage' },
    { id: 5, name: 'Telekinetic Ray', save: 'Str', dc: 19, effect: 'Move 60 ft' },
    { id: 6, name: 'Death Ray', save: 'Dex', dc: 19, effect: '10d10 necrotic damage' },
    { id: 7, name: 'Petrification Ray', save: 'Dex', dc: 19, effect: 'Restrained then petrified' },
    { id: 8, name: 'Enfeeblement Ray', save: 'Con', dc: 19, effect: '8d8 necrotic + Str disadvantage' },
    { id: 9, name: 'Sleep Ray', save: 'Wis', dc: 19, effect: 'Unconscious 10 min' },
    { id: 10, name: 'Slow Ray', save: 'Dex', dc: 19, effect: 'Slowed 1 min' }
];

function updateOmnivaxDisplay() {
    const app = window.dndApp;
    if (!app.chessState) return;
    
    updateOmnivaxStats();
    updateOmnivaxStatus();
    updateEyeRaysDisplay();
    updateOmnivaxActions();
    updateOmnivaxLegendary();
    updateOmnivaxLair();
}

function getOmnivaxCombatant() {
    const app = window.dndApp;
    if (!app.chessState.combatants) return null;
    return app.chessState.combatants.find(c => c.name === 'Omnivax' || c.name.startsWith('Omnivax'));
}

function updateOmnivaxStats() {
    const app = window.dndApp;
    const statsEl = document.getElementById('omnivaxStats');
    if (!statsEl) return;
    
    const stats = getStatsForCR(17);
    let baseAC = 20;
    let baseLegendaryResist = 3;
    let eyeRays = 3;
    let baseSaveDC = 19;
    
    if (app.chessState.alternativeCheckmate) {
        baseAC = 19;
        baseLegendaryResist = 2;
        baseSaveDC = 18;
    }
    
    if (app.chessState.wrongMoves >= 1) eyeRays = 4;
    if (app.chessState.wrongMoves >= 2) eyeRays = 5;
    if (app.chessState.wrongMoves >= 3) {
        eyeRays = 10;
        baseAC = app.chessState.alternativeCheckmate ? 19 : 22;
    }
    
    const baseHP = stats.hp - (app.chessState.alternativeCheckmate ? 30 : 0);
    
    // Get current values from combatant if exists, otherwise use base
    const combatant = getOmnivaxCombatant();
    const currentAC = combatant ? combatant.ac : baseAC;
    const currentHP = combatant ? combatant.currentHP : baseHP;
    const maxHP = combatant ? combatant.maxHP : baseHP;
    const currentSaveDC = combatant ? (combatant.saveDC || baseSaveDC) : baseSaveDC;
    const currentAttackBonus = combatant ? (combatant.attackBonus || stats.atk) : stats.atk;
    
    // Initialize Omnivax stats if not in state
    if (!app.chessState.omnivaxStats) {
        app.chessState.omnivaxStats = {
            ac: baseAC,
            maxHP: baseHP,
            currentHP: baseHP,
            saveDC: baseSaveDC,
            attackBonus: stats.atk,
            legendaryResistance: baseLegendaryResist,
            legendaryResistanceMax: baseLegendaryResist,
            legendaryActions: 3,
            legendaryActionsMax: 3,
            lairActionsUsed: []
        };
    }
    
    // Use state values if combatant doesn't exist
    const displayAC = combatant ? currentAC : app.chessState.omnivaxStats.ac;
    const displayHP = combatant ? currentHP : app.chessState.omnivaxStats.currentHP;
    const displayMaxHP = combatant ? maxHP : app.chessState.omnivaxStats.maxHP;
    const displaySaveDC = combatant ? currentSaveDC : app.chessState.omnivaxStats.saveDC;
    const displayAttackBonus = combatant ? currentAttackBonus : app.chessState.omnivaxStats.attackBonus;
    
    statsEl.innerHTML = `
        <div class="stat-row-editable">
            <span class="stat-label">AC:</span>
            <input type="number" class="stat-input" id="omnivaxAC" value="${displayAC}" min="1" max="30" onchange="updateOmnivaxStat('ac', this.value)">
        </div>
        <div class="stat-row-editable">
            <span class="stat-label">HP:</span>
            <div class="stat-hp-group">
                <input type="number" class="stat-input" id="omnivaxHP" value="${displayHP}" min="0" max="${displayMaxHP}" onchange="updateOmnivaxStat('currentHP', this.value)">
                <span class="stat-separator">/</span>
                <input type="number" class="stat-input" id="omnivaxMaxHP" value="${displayMaxHP}" min="1" max="1000" onchange="updateOmnivaxStat('maxHP', this.value)">
            </div>
        </div>
        <div class="stat-row-editable">
            <span class="stat-label">CR:</span>
            <span class="stat-value">17</span>
        </div>
        <div class="stat-row-editable">
            <span class="stat-label">Speed:</span>
            <span class="stat-value">Fly 40 ft</span>
        </div>
        <div class="stat-row-editable">
            <span class="stat-label">Save DC:</span>
            <input type="number" class="stat-input" id="omnivaxSaveDC" value="${displaySaveDC}" min="1" max="30" onchange="updateOmnivaxStat('saveDC', this.value)">
        </div>
        <div class="stat-row-editable">
            <span class="stat-label">Attack Bonus:</span>
            <input type="number" class="stat-input" id="omnivaxAttackBonus" value="${displayAttackBonus}" min="1" max="30" onchange="updateOmnivaxStat('attackBonus', this.value)">
        </div>
        <div class="stat-row-editable">
            <span class="stat-label">Proficiency:</span>
            <span class="stat-value">+6</span>
        </div>
        <div class="stat-row-editable">
            <span class="stat-label">Epic Bonus:</span>
            <span class="stat-value">+${stats.epic_bonus}</span>
        </div>
    `;
}

function updateOmnivaxStatus() {
    const app = window.dndApp;
    const statusEl = document.getElementById('omnivaxStatus');
    if (!statusEl) return;
    
    if (!app.chessState.omnivaxStats) {
        const stats = getStatsForCR(17);
        let baseLegendaryResist = 3;
        if (app.chessState.alternativeCheckmate) baseLegendaryResist = 2;
        
        app.chessState.omnivaxStats = {
            ac: app.chessState.alternativeCheckmate ? 19 : 20,
            maxHP: stats.hp - (app.chessState.alternativeCheckmate ? 30 : 0),
            currentHP: stats.hp - (app.chessState.alternativeCheckmate ? 30 : 0),
            saveDC: app.chessState.alternativeCheckmate ? 18 : 19,
            attackBonus: stats.atk,
            legendaryResistance: baseLegendaryResist,
            legendaryResistanceMax: baseLegendaryResist,
            legendaryActions: 3,
            legendaryActionsMax: 3,
            lairActionsUsed: []
        };
    }
    
    const statuses = [];
    
    if (app.chessState.wrongMoves >= 1) {
        statuses.push('✓ 4 Eye Rays per turn');
        statuses.push('✓ Psychic Feedback: 2d8');
    }
    if (app.chessState.wrongMoves >= 2) {
        statuses.push('✓ 5 Eye Rays per turn');
        statuses.push('✓ Psychic Feedback: 3d8');
        statuses.push('✓ Hive Mind Active');
        statuses.push('✓ Gravity Powers Unlocked');
    }
    if (app.chessState.wrongMoves >= 3) {
        statuses.push('✓ OVERCHARGED');
        statuses.push('✓ Can use ALL 10 Eye Rays once');
        statuses.push('✓ Antimagic Cone can split');
        statuses.push('✓ Psychic Feedback: 4d8');
    }
    if (app.chessState.alternativeCheckmate) {
        statuses.push('⚠ AC reduced by 1');
        statuses.push('⚠ Save DC reduced by 1');
        statuses.push('⚠ Legendary Resistance: 2/day');
    }
    
    const legendaryResist = app.chessState.omnivaxStats.legendaryResistance || 0;
    const legendaryResistMax = app.chessState.omnivaxStats.legendaryResistanceMax || 3;
    const legendaryActions = app.chessState.omnivaxStats.legendaryActions || 0;
    const legendaryActionsMax = app.chessState.omnivaxStats.legendaryActionsMax || 3;
    
    statusEl.innerHTML = `
        ${statuses.length > 0 ? `<ul style="margin: 0 0 1rem 0; padding-left: 1.25rem; color: var(--text-secondary);"><li>${statuses.join('</li><li>')}</li></ul>` : '<p style="color: var(--text-muted); margin-bottom: 1rem;">No modifications yet</p>'}
        <div class="legendary-tracker-inline">
            <div class="legendary-track-item">
                <span class="legendary-track-label">Legendary Resistances:</span>
                <div class="legendary-track-controls">
                    <button class="legendary-track-btn" onclick="useOmnivaxLegendaryResistance()" ${legendaryResist <= 0 ? 'disabled' : ''}>-</button>
                    <span class="legendary-track-value">${legendaryResist} / ${legendaryResistMax}</span>
                    <button class="legendary-track-btn" onclick="resetOmnivaxLegendaryResistance()">Reset</button>
                </div>
            </div>
            <div class="legendary-track-item">
                <span class="legendary-track-label">Legendary Actions:</span>
                <div class="legendary-track-controls">
                    <button class="legendary-track-btn" onclick="useOmnivaxLegendaryAction(1)" ${legendaryActions < 1 ? 'disabled' : ''}>-1</button>
                    <button class="legendary-track-btn" onclick="useOmnivaxLegendaryAction(2)" ${legendaryActions < 2 ? 'disabled' : ''}>-2</button>
                    <span class="legendary-track-value">${legendaryActions} / ${legendaryActionsMax}</span>
                    <button class="legendary-track-btn" onclick="resetOmnivaxLegendaryActions()">Reset</button>
                </div>
            </div>
        </div>
    `;
}

function updateEyeRaysDisplay() {
    const app = window.dndApp;
    const listEl = document.getElementById('eyeRaysList');
    const maxEl = document.getElementById('eyeRaysMax');
    const availEl = document.getElementById('eyeRaysAvailable');
    if (!listEl) return;
    
    let eyeRays = 3;
    let saveDC = 19;
    
    if (app.chessState.alternativeCheckmate) saveDC = 18;
    if (app.chessState.wrongMoves >= 1) eyeRays = 4;
    if (app.chessState.wrongMoves >= 2) eyeRays = 5;
    if (app.chessState.wrongMoves >= 3) eyeRays = 10;
    
    if (!app.chessState.selectedEyeRays) {
        app.chessState.selectedEyeRays = [];
    }
    
    const selected = app.chessState.selectedEyeRays.length;
    
    if (maxEl) maxEl.textContent = eyeRays;
    if (availEl) availEl.textContent = eyeRays - selected;
    
    listEl.innerHTML = EYE_RAYS.map(ray => {
        const isSelected = app.chessState.selectedEyeRays.includes(ray.id);
        const canSelect = selected < eyeRays;
        const isDisabled = !canSelect && !isSelected;
        
        return `
            <div class="eye-ray-item ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}" 
                 onclick="${isDisabled ? '' : `toggleEyeRay(${ray.id})`}">
                <div class="eye-ray-checkbox">
                    ${isSelected ? '✓' : ''}
                </div>
                <div class="eye-ray-info">
                    <div class="eye-ray-name">${ray.id}. ${ray.name}</div>
                    <div class="eye-ray-details">DC ${saveDC} ${ray.save} save - ${ray.effect}</div>
                </div>
            </div>
        `;
    }).join('');
}

function toggleEyeRay(rayId) {
    const app = window.dndApp;
    if (!app.chessState.selectedEyeRays) {
        app.chessState.selectedEyeRays = [];
    }
    
    const index = app.chessState.selectedEyeRays.indexOf(rayId);
    if (index > -1) {
        app.chessState.selectedEyeRays.splice(index, 1);
    } else {
        let maxRays = 3;
        if (app.chessState.wrongMoves >= 1) maxRays = 4;
        if (app.chessState.wrongMoves >= 2) maxRays = 5;
        if (app.chessState.wrongMoves >= 3) maxRays = 10;
        
        if (app.chessState.selectedEyeRays.length < maxRays) {
            app.chessState.selectedEyeRays.push(rayId);
        }
    }
    
    app.saveChessState();
    updateEyeRaysDisplay();
    
    const selected = app.chessState.selectedEyeRays.map(id => EYE_RAYS.find(r => r.id === id).name).join(', ');
    app.addLog(`Eye Rays selected: ${selected || 'None'}`);
}

function resetEyeRays() {
    const app = window.dndApp;
    app.chessState.selectedEyeRays = [];
    app.saveChessState();
    updateEyeRaysDisplay();
    app.addLog('Eye Rays reset for new turn');
}

function updateOmnivaxActions() {
    const app = window.dndApp;
    const actionsEl = document.getElementById('omnivaxActions');
    if (!actionsEl) return;
    
    let saveDC = 19;
    if (app.chessState.alternativeCheckmate) saveDC = 18;
    
    actionsEl.innerHTML = `
        <div class="action-item">
            <div class="action-name">Bite</div>
            <div class="action-details">+12 to hit, 4d8+6 piercing + grapple (DC 18 Str)</div>
        </div>
        <div class="action-item">
            <div class="action-name">Swallow Whole</div>
            <div class="action-details">4d8 acid/turn, AC 20 interior, 30 HP to cut out</div>
        </div>
        <div class="action-item">
            <div class="action-name">Telekinetic Chess Strike (Bonus)</div>
            <div class="action-details">+12, 3d10 bludgeoning, 120 ft</div>
        </div>
        <div class="action-item">
            <div class="action-name">Antimagic Cone</div>
            <div class="action-details">240-ft cone (can split if Overcharged)</div>
        </div>
    `;
}

function updateOmnivaxLegendary() {
    const app = window.dndApp;
    const legendaryEl = document.getElementById('omnivaxLegendary');
    if (!legendaryEl) return;
    
    const gravityUnlocked = app.chessState.wrongMoves >= 2;
    
    legendaryEl.innerHTML = `
        <div class="legendary-action-item">
            <span class="legendary-cost">1 Action:</span>
            <span class="legendary-name">Eye Ray</span>
            <span class="legendary-desc">Use one ray at 120 ft range</span>
        </div>
        <div class="legendary-action-item">
            <span class="legendary-cost">1 Action:</span>
            <span class="legendary-name">Move</span>
            <span class="legendary-desc">Fly 20 ft, no opportunity attacks</span>
        </div>
        <div class="legendary-action-item">
            <span class="legendary-cost">2 Actions:</span>
            <span class="legendary-name">Telekinetic Throw</span>
            <span class="legendary-desc">Hurl chess piece</span>
        </div>
        <div class="legendary-action-item">
            <span class="legendary-cost">3 Actions:</span>
            <span class="legendary-name">Birth Gazer</span>
            <span class="legendary-desc">Summon 1 Gazer</span>
        </div>
        ${gravityUnlocked ? `
        <div class="legendary-action-item">
            <span class="legendary-cost">3 Actions:</span>
            <span class="legendary-name">Gravitic Pulse</span>
            <span class="legendary-desc">Change gravity direction</span>
        </div>
        ` : ''}
    `;
}

function updateOmnivaxLair() {
    const app = window.dndApp;
    const lairEl = document.getElementById('omnivaxLair');
    if (!lairEl) return;
    
    const gravityUnlocked = app.chessState.wrongMoves >= 2;
    let saveDC = 19;
    if (app.chessState.alternativeCheckmate) saveDC = 18;
    
    if (!app.chessState.omnivaxStats) {
        app.chessState.omnivaxStats = { lairActionsUsed: [] };
    }
    
    const lairActions = [
        { id: 'psychic_scream', name: 'Psychic Scream', desc: `60 ft, DC ${saveDC} Wis, 3d8 psychic + stunned` },
        { id: 'reality_distortion', name: 'Reality Distortion', desc: 'Teleport 60 ft + move chess piece' },
        { id: 'eye_beam_surge', name: 'Eye Beam Surge', desc: '+1 eye ray this round' }
    ];
    
    if (gravityUnlocked) {
        lairActions.push(
            { id: 'gravity_shift', name: 'Gravity Shift', desc: 'Change gravity direction in chamber' },
            { id: 'crushing_gravity', name: 'Crushing Gravity', desc: 'All creatures take 2d10 bludgeoning' },
            { id: 'zero_gravity', name: 'Zero Gravity', desc: 'All creatures float, difficult terrain' }
        );
    }
    
    const usedThisRound = app.chessState.omnivaxStats.lairActionsUsed || [];
    
    lairEl.innerHTML = `
        <div style="margin-bottom: 0.75rem;">
            <button class="btn-secondary" onclick="resetOmnivaxLairActions()" style="width: 100%;">🔄 Reset Lair Actions</button>
        </div>
        ${lairActions.map(action => {
            const isUsed = usedThisRound.includes(action.id);
            return `
                <div class="lair-action-item ${isUsed ? 'used' : ''}" onclick="${isUsed ? '' : `useOmnivaxLairAction('${action.id}')`}">
                    <div class="lair-action-header">
                        <div class="lair-action-name">${action.name}</div>
                        ${isUsed ? '<span class="lair-action-used">✓ Used</span>' : '<button class="lair-action-btn">Use</button>'}
                    </div>
                    <div class="lair-action-desc">${action.desc}</div>
                </div>
            `;
        }).join('')}
    `;
}

function showSummonCreaturesMenu() {
    const app = window.dndApp;
    const content = `
        <div class="info-content-section">
            <h4>Summon Creatures</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-top: 1rem;">
                <button class="btn-primary" onclick="addGazer(); window.dndApp.hideInfoPanel();">👁️ Add Gazer</button>
                <button class="btn-primary" onclick="addMultipleGazers(); window.dndApp.hideInfoPanel();">👁️ Add 2d4 Gazers</button>
                <button class="btn-primary" onclick="addSpectator(); window.dndApp.hideInfoPanel();">👁️ Add Spectator</button>
                <button class="btn-primary" onclick="addMultipleSpectators(); window.dndApp.hideInfoPanel();">👁️ Add 1d4 Spectators</button>
                <button class="btn-primary" onclick="addTrueBeholder(); window.dndApp.hideInfoPanel();">👁️ Add True Beholder</button>
                <button class="btn-primary" onclick="addTwoTrueBeholders(); window.dndApp.hideInfoPanel();">👁️ Add 2 True Beholders</button>
            </div>
        </div>
    `;
    app.showInfoPanel('Summon Creatures', content);
}

// ===== OMNIVAX STAT MANAGEMENT =====
window.updateOmnivaxStat = function(stat, value) {
    const app = window.dndApp;
    if (!app.chessState.omnivaxStats) {
        app.chessState.omnivaxStats = {};
    }
    
    const numValue = parseInt(value);
    
    if (stat === 'currentHP') {
        const maxHP = app.chessState.omnivaxStats.maxHP || 400;
        app.chessState.omnivaxStats.currentHP = Math.max(0, Math.min(maxHP, numValue));
        
        // Update combatant if exists
        const combatant = getOmnivaxCombatant();
        if (combatant) {
            combatant.currentHP = app.chessState.omnivaxStats.currentHP;
        }
    } else if (stat === 'maxHP') {
        app.chessState.omnivaxStats.maxHP = Math.max(1, numValue);
        if (app.chessState.omnivaxStats.currentHP > app.chessState.omnivaxStats.maxHP) {
            app.chessState.omnivaxStats.currentHP = app.chessState.omnivaxStats.maxHP;
        }
        
        const combatant = getOmnivaxCombatant();
        if (combatant) {
            combatant.maxHP = app.chessState.omnivaxStats.maxHP;
            combatant.currentHP = Math.min(combatant.currentHP, combatant.maxHP);
        }
    } else {
        app.chessState.omnivaxStats[stat] = numValue;
        
        const combatant = getOmnivaxCombatant();
        if (combatant) {
            combatant[stat] = numValue;
        }
    }
    
    app.saveChessState();
    updateOmnivaxStats();
    updateCombatantsDisplay();
    app.addLog(`Omnivax ${stat} changed to ${app.chessState.omnivaxStats[stat]}`);
};

window.useOmnivaxLegendaryResistance = function() {
    const app = window.dndApp;
    if (!app.chessState.omnivaxStats) return;
    
    if (app.chessState.omnivaxStats.legendaryResistance > 0) {
        app.chessState.omnivaxStats.legendaryResistance--;
        app.saveChessState();
        updateOmnivaxStatus();
        
        const combatant = getOmnivaxCombatant();
        if (combatant) {
            combatant.legendaryResistance = app.chessState.omnivaxStats.legendaryResistance;
            updateCombatantsDisplay();
        }
        
        app.addLog(`Omnivax uses Legendary Resistance! (${app.chessState.omnivaxStats.legendaryResistance}/${app.chessState.omnivaxStats.legendaryResistanceMax} remaining)`);
    }
};

window.resetOmnivaxLegendaryResistance = function() {
    const app = window.dndApp;
    if (!app.chessState.omnivaxStats) return;
    
    app.chessState.omnivaxStats.legendaryResistance = app.chessState.omnivaxStats.legendaryResistanceMax;
    app.saveChessState();
    updateOmnivaxStatus();
    
    const combatant = getOmnivaxCombatant();
    if (combatant) {
        combatant.legendaryResistance = app.chessState.omnivaxStats.legendaryResistance;
        updateCombatantsDisplay();
    }
    
    app.addLog(`Omnivax's Legendary Resistances reset to ${app.chessState.omnivaxStats.legendaryResistanceMax}`);
};

window.useOmnivaxLegendaryAction = function(cost) {
    const app = window.dndApp;
    if (!app.chessState.omnivaxStats) return;
    
    if (app.chessState.omnivaxStats.legendaryActions >= cost) {
        app.chessState.omnivaxStats.legendaryActions -= cost;
        app.saveChessState();
        updateOmnivaxStatus();
        
        const combatant = getOmnivaxCombatant();
        if (combatant) {
            combatant.legendaryActions = app.chessState.omnivaxStats.legendaryActions;
            updateCombatantsDisplay();
        }
        
        app.addLog(`Omnivax uses ${cost} Legendary Action(s)! (${app.chessState.omnivaxStats.legendaryActions}/${app.chessState.omnivaxStats.legendaryActionsMax} remaining)`);
    }
};

window.resetOmnivaxLegendaryActions = function() {
    const app = window.dndApp;
    if (!app.chessState.omnivaxStats) return;
    
    app.chessState.omnivaxStats.legendaryActions = app.chessState.omnivaxStats.legendaryActionsMax;
    app.saveChessState();
    updateOmnivaxStatus();
    
    const combatant = getOmnivaxCombatant();
    if (combatant) {
        combatant.legendaryActions = app.chessState.omnivaxStats.legendaryActions;
        updateCombatantsDisplay();
    }
    
    app.addLog(`Omnivax's turn! Legendary Actions reset to ${app.chessState.omnivaxStats.legendaryActionsMax}`);
};

window.useOmnivaxLairAction = function(actionId) {
    const app = window.dndApp;
    if (!app.chessState.omnivaxStats) {
        app.chessState.omnivaxStats = { lairActionsUsed: [] };
    }
    
    if (!app.chessState.omnivaxStats.lairActionsUsed) {
        app.chessState.omnivaxStats.lairActionsUsed = [];
    }
    
    if (!app.chessState.omnivaxStats.lairActionsUsed.includes(actionId)) {
        app.chessState.omnivaxStats.lairActionsUsed.push(actionId);
        app.saveChessState();
        updateOmnivaxLair();
        
        const actionNames = {
            'psychic_scream': 'Psychic Scream',
            'reality_distortion': 'Reality Distortion',
            'eye_beam_surge': 'Eye Beam Surge',
            'gravity_shift': 'Gravity Shift',
            'crushing_gravity': 'Crushing Gravity',
            'zero_gravity': 'Zero Gravity'
        };
        
        app.addLog(`Omnivax uses Lair Action: ${actionNames[actionId] || actionId}`);
    }
};

window.resetOmnivaxLairActions = function() {
    const app = window.dndApp;
    if (!app.chessState.omnivaxStats) return;
    
    app.chessState.omnivaxStats.lairActionsUsed = [];
    app.saveChessState();
    updateOmnivaxLair();
    app.addLog('Omnivax Lair Actions reset for new round');
};

// Make toggleEyeRay globally available
window.toggleEyeRay = toggleEyeRay;

// Initialize when app loads
if (window.dndApp) {
    window.dndApp.initChessView = initChessView;
    window.dndApp.updateOmnivaxDisplay = updateOmnivaxDisplay;
}

