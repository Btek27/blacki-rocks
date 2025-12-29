// DM Tools
function initDMView() {
    const app = window.dndApp;
    
    // Set scene button
    document.getElementById('setSceneBtn')?.addEventListener('click', () => {
        const scene = document.getElementById('sceneText').value;
        app.encounter.scene = scene;
        app.addLog(`Scene set: ${scene.substring(0, 50)}...`);
        app.saveEncounter();
    });
    
    // Add enemy button
    document.getElementById('addEnemyBtn')?.addEventListener('click', () => {
        const name = document.getElementById('enemyName').value.trim();
        const hp = parseInt(document.getElementById('enemyHP').value);
        const ac = parseInt(document.getElementById('enemyAC').value);
        const type = document.getElementById('enemyType').value;
        
        if (name && hp && ac) {
            const enemy = {
                id: Date.now(),
                name,
                maxHP: hp,
                currentHP: hp,
                ac,
                type,
                actionsUsed: {},
                legendaryResistance: 0,
                legendaryResistanceMax: 0,
                legendaryActions: 0,
                legendaryActionsMax: 0
            };
            
            app.encounter.enemies.push(enemy);
            app.addLog(`Added ${type}: ${name} (HP: ${hp}, AC: ${ac})`);
            app.saveEncounter();
            
            // Clear inputs
            document.getElementById('enemyName').value = '';
            document.getElementById('enemyHP').value = '';
            document.getElementById('enemyAC').value = '';
            
            updateEnemiesList();
        }
    });
    
    // Quick action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            const actionText = e.target.textContent.trim();
            app.addLog(`DM: ${actionText}`);
            app.saveEncounter();
        });
    });
    
    // Load scene if exists
    if (app.encounter.scene) {
        document.getElementById('sceneText').value = app.encounter.scene;
    }
    
    updateEnemiesList();
    app.updateLogDisplay();
}

function updateEnemiesList() {
    const app = window.dndApp;
    const list = document.getElementById('enemiesList');
    if (!list) return;
    
    list.innerHTML = '';
    
    if (app.encounter.enemies.length === 0) {
        list.innerHTML = '<p style="color: #888; text-align: center;">No enemies added yet</p>';
        return;
    }
    
    app.encounter.enemies.forEach(enemy => {
        const card = document.createElement('div');
        card.className = 'enemy-card';
        
        const hpPercent = (enemy.currentHP / enemy.maxHP) * 100;
        const hpColor = hpPercent > 50 ? '#44ff44' : hpPercent > 25 ? '#ffaa44' : '#ff4444';
        
        // Determine damage buttons based on HP
        const damageOptions = enemy.maxHP < 200 ? [5, 10, 20] : [10, 50, 100];
        
        // Check if epic monster
        const isEpic = enemy.epicBonus !== undefined;
        const hasLegendary = enemy.legendaryResistanceMax > 0;
        
        card.innerHTML = `
            <div class="enemy-header">
                <span class="enemy-name">${enemy.name}${enemy.cr ? ` - CR ${enemy.cr}` : ''} [${enemy.type}]</span>
                <button class="btn-secondary" style="padding: 0.25rem 0.75rem; font-size: 0.85rem;" data-enemy-id="${enemy.id}" data-action="view-info">📋 Info</button>
            </div>
            
            ${isEpic ? `
            <div class="enemy-stats-editable">
                <div class="stat-edit-item">
                    <label class="stat-edit-label">HP</label>
                    <input type="number" class="stat-edit-input" data-stat="currentHP" data-enemy-id="${enemy.id}" value="${enemy.currentHP}" min="0" max="${enemy.maxHP}">
                    <span style="font-size: 0.75rem; color: #888; text-align: center;">/ ${enemy.maxHP}</span>
                </div>
                <div class="stat-edit-item">
                    <label class="stat-edit-label">AC</label>
                    <input type="number" class="stat-edit-input" data-stat="ac" data-enemy-id="${enemy.id}" value="${enemy.ac}" min="1" max="50">
                </div>
                ${enemy.saveDC ? `
                <div class="stat-edit-item">
                    <label class="stat-edit-label">Save DC</label>
                    <input type="number" class="stat-edit-input" data-stat="saveDC" data-enemy-id="${enemy.id}" value="${enemy.saveDC}" min="1" max="40">
                </div>
                ` : ''}
                ${enemy.attackBonus ? `
                <div class="stat-edit-item">
                    <label class="stat-edit-label">Attack</label>
                    <input type="number" class="stat-edit-input" data-stat="attackBonus" data-enemy-id="${enemy.id}" value="${enemy.attackBonus}" min="1" max="30">
                </div>
                ` : ''}
            </div>
            ` : `
            <div class="enemy-hp" style="color: ${hpColor}; margin: 1rem 0;">
                HP: ${enemy.currentHP} / ${enemy.maxHP} (${Math.round(hpPercent)}%)
            </div>
            `}
            
            ${hasLegendary ? `
            <div class="legendary-resources">
                <div class="legendary-resource">
                    <div class="legendary-resource-label">Legendary Resistances</div>
                    <div class="legendary-resource-value">${enemy.legendaryResistance || 0} / ${enemy.legendaryResistanceMax}</div>
                    <div class="legendary-resource-controls">
                        <button class="legendary-btn" data-enemy-id="${enemy.id}" data-resource="resistance" data-action="use" ${(enemy.legendaryResistance || 0) <= 0 ? 'disabled' : ''}>Use</button>
                        <button class="legendary-btn" data-enemy-id="${enemy.id}" data-resource="resistance" data-action="reset">Reset</button>
                    </div>
                </div>
                <div class="legendary-resource">
                    <div class="legendary-resource-label">Legendary Actions</div>
                    <div class="legendary-resource-value">${enemy.legendaryActions || 0} / ${enemy.legendaryActionsMax}</div>
                    <div class="legendary-resource-controls">
                        <button class="legendary-btn" data-enemy-id="${enemy.id}" data-resource="action" data-cost="1" ${(enemy.legendaryActions || 0) < 1 ? 'disabled' : ''}>Use 1</button>
                        <button class="legendary-btn" data-enemy-id="${enemy.id}" data-resource="action" data-cost="2" ${(enemy.legendaryActions || 0) < 2 ? 'disabled' : ''}>Use 2</button>
                        <button class="legendary-btn" data-enemy-id="${enemy.id}" data-resource="action" data-action="reset">Reset</button>
                    </div>
                </div>
            </div>
            ` : ''}
            
            ${enemy.specialTraits && enemy.specialTraits.length > 0 ? `
            <div class="action-tracker">
                <h4>Special Actions</h4>
                <div class="action-buttons-grid">
                    ${enemy.specialTraits.slice(0, 6).map((trait, idx) => {
                        const actionKey = `action_${idx}`;
                        const used = enemy.actionsUsed && enemy.actionsUsed[actionKey];
                        return `<button class="action-track-btn ${used ? 'used' : ''}" data-enemy-id="${enemy.id}" data-action-key="${actionKey}" data-trait="${trait}">${trait.substring(0, 20)}${trait.length > 20 ? '...' : ''}</button>`;
                    }).join('')}
                </div>
            </div>
            ` : ''}
            
            <div class="enemy-controls">
                ${damageOptions.map(dmg => `
                    <button class="damage-btn" data-enemy-id="${enemy.id}" data-damage="${dmg}">-${dmg} HP</button>
                `).join('')}
                <button class="damage-btn" style="background: rgba(0,170,0,0.3); border-color: #00aa00;" data-enemy-id="${enemy.id}" data-damage="heal">+HP</button>
                <button class="damage-btn" style="background: rgba(204,0,0,0.3)" data-enemy-id="${enemy.id}" data-remove="true">Remove</button>
            </div>
        `;
        
        // Add event listeners
        // Stat editing
        card.querySelectorAll('.stat-edit-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const enemyId = parseInt(e.target.dataset.enemyId);
                const stat = e.target.dataset.stat;
                const value = parseInt(e.target.value);
                const enemy = app.encounter.enemies.find(e => e.id === enemyId);
                if (enemy) {
                    if (stat === 'currentHP') {
                        enemy.currentHP = Math.max(0, Math.min(enemy.maxHP, value));
                    } else {
                        enemy[stat] = value;
                    }
                    app.addLog(`${enemy.name}: ${stat} changed to ${enemy[stat]}`);
                    app.saveEncounter();
                    updateEnemiesList();
                }
            });
        });
        
        // Legendary resources
        card.querySelectorAll('.legendary-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const enemyId = parseInt(e.target.dataset.enemyId);
                const resource = e.target.dataset.resource;
                const action = e.target.dataset.action;
                const cost = parseInt(e.target.dataset.cost) || 0;
                const enemy = app.encounter.enemies.find(e => e.id === enemyId);
                
                if (!enemy) return;
                
                if (action === 'use') {
                    if (resource === 'resistance') {
                        if (enemy.legendaryResistance > 0) {
                            enemy.legendaryResistance--;
                            app.addLog(`${enemy.name} uses Legendary Resistance! (${enemy.legendaryResistance}/${enemy.legendaryResistanceMax} remaining)`);
                        }
                    } else if (resource === 'action') {
                        if (enemy.legendaryActions >= cost) {
                            enemy.legendaryActions -= cost;
                            app.addLog(`${enemy.name} uses ${cost} Legendary Action(s)! (${enemy.legendaryActions}/${enemy.legendaryActionsMax} remaining)`);
                        }
                    }
                } else if (action === 'reset') {
                    if (resource === 'resistance') {
                        enemy.legendaryResistance = enemy.legendaryResistanceMax;
                        app.addLog(`${enemy.name}'s Legendary Resistances reset to ${enemy.legendaryResistanceMax}`);
                    } else if (resource === 'action') {
                        enemy.legendaryActions = enemy.legendaryActionsMax;
                        app.addLog(`${enemy.name}'s turn! Legendary Actions reset to ${enemy.legendaryActionsMax}`);
                    }
                }
                
                app.saveEncounter();
                updateEnemiesList();
            });
        });
        
        // Action tracking
        card.querySelectorAll('.action-track-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const enemyId = parseInt(e.target.dataset.enemyId);
                const actionKey = e.target.dataset.actionKey;
                const trait = e.target.dataset.trait;
                const enemy = app.encounter.enemies.find(e => e.id === enemyId);
                
                if (!enemy) return;
                
                if (!enemy.actionsUsed) enemy.actionsUsed = {};
                enemy.actionsUsed[actionKey] = !enemy.actionsUsed[actionKey];
                
                app.addLog(`${enemy.name}: ${trait} ${enemy.actionsUsed[actionKey] ? 'used' : 'reset'}`);
                app.saveEncounter();
                updateEnemiesList();
            });
        });
        
        // View info button
        card.querySelector('[data-action="view-info"]')?.addEventListener('click', () => {
            showEnemyInfo(enemy);
        });
        
        // Damage buttons
        card.querySelectorAll('.damage-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const enemyId = parseInt(e.target.dataset.enemyId);
                if (e.target.dataset.remove === 'true') {
                    app.encounter.enemies = app.encounter.enemies.filter(e => e.id !== enemyId);
                    app.addLog(`${enemy.name} removed from encounter`);
                } else if (e.target.dataset.damage === 'heal') {
                    const healAmount = prompt(`Heal ${enemy.name} by how much?`, '10');
                    if (healAmount) {
                        const heal = parseInt(healAmount);
                        const enemy = app.encounter.enemies.find(e => e.id === enemyId);
                        if (enemy) {
                            enemy.currentHP = Math.min(enemy.maxHP, enemy.currentHP + heal);
                            app.addLog(`${enemy.name} healed by ${heal} HP (${enemy.currentHP}/${enemy.maxHP})`);
                        }
                    }
                } else {
                    const damage = parseInt(e.target.dataset.damage);
                    const enemy = app.encounter.enemies.find(e => e.id === enemyId);
                    if (enemy) {
                        const diceInfo = getDiceInfoForDamage(damage, enemy);
                        enemy.currentHP = Math.max(0, enemy.currentHP - damage);
                        app.addLog(`${enemy.name} took ${damage} damage (HP: ${enemy.currentHP}/${enemy.maxHP}). ${diceInfo}`);
                        
                        // Show dice info in info panel
                        const content = `
                            <div class="info-content-section">
                                <h4>Damage Applied</h4>
                                <p><strong>${enemy.name}</strong> took <strong>${damage}</strong> damage</p>
                                <p>HP: ${enemy.currentHP}/${enemy.maxHP}</p>
                                <div class="dice-info">${diceInfo}</div>
                            </div>
                        `;
                        app.showInfoPanel('Damage Applied', content);
                        
                        if (enemy.currentHP === 0) {
                            app.encounter.enemies = app.encounter.enemies.filter(e => e.id !== enemyId);
                            app.addLog(`${enemy.name} defeated!`);
                        }
                    }
                }
                app.saveEncounter();
                updateEnemiesList();
            });
        });
        
        list.appendChild(card);
    });
}

function getDiceInfoForDamage(damage, enemy) {
    // Calculate dice needed for damage
    if (damage <= 5) return 'Roll 1d4 or 1d6';
    if (damage <= 10) return 'Roll 1d8+2 or 2d6';
    if (damage <= 20) return 'Roll 2d10 or 4d6';
    if (damage <= 50) return 'Roll 5d10 or 8d6';
    return 'Roll 10d10 or 12d6';
}

function showEnemyInfo(enemy) {
    const app = window.dndApp;
    let content = `
        <div class="info-content-section">
            <h4>${enemy.name}</h4>
            <p><strong>Type:</strong> ${enemy.type}</p>
            ${enemy.cr ? `<p><strong>CR:</strong> ${enemy.cr}</p>` : ''}
            <p><strong>HP:</strong> ${enemy.currentHP} / ${enemy.maxHP}</p>
            <p><strong>AC:</strong> ${enemy.ac}</p>
            ${enemy.saveDC ? `<p><strong>Save DC:</strong> ${enemy.saveDC}</p>` : ''}
            ${enemy.attackBonus ? `<p><strong>Attack Bonus:</strong> +${enemy.attackBonus}</p>` : ''}
            ${enemy.epicBonus ? `<p><strong>Epic Bonus:</strong> +${enemy.epicBonus}</p>` : ''}
        </div>
    `;
    
    if (enemy.legendaryResistanceMax > 0) {
        content += `
            <div class="info-content-section">
                <h4>Legendary Resources</h4>
                <p><strong>Legendary Resistances:</strong> ${enemy.legendaryResistance || 0} / ${enemy.legendaryResistanceMax}</p>
                <p><strong>Legendary Actions:</strong> ${enemy.legendaryActions || 0} / ${enemy.legendaryActionsMax}</p>
            </div>
        `;
    }
    
    if (enemy.specialTraits && enemy.specialTraits.length > 0) {
        content += `
            <div class="info-content-section">
                <h4>Special Traits</h4>
                <ul>
                    ${enemy.specialTraits.map(trait => `<li>${trait}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    app.showInfoPanel(enemy.name, content);
}

// Initialize when app loads
if (window.dndApp) {
    window.dndApp.initDMView = initDMView;
}

