// Witchlight Campaign View
function initWitchlightView() {
    const app = window.dndApp;
    
    // Initialize witchlight state
    if (!app.witchlightState) {
        app.witchlightState = {
            currentChapter: null,
            currentSubsection: null,
            storyTrackerNotes: app.loadWitchlightNotes() || '',
            completedEncounters: app.loadCompletedEncounters() || []
        };
    }
    
    // Tab switching
    document.querySelectorAll('#view-witchlight .tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabName = e.target.dataset.tab;
            switchWitchlightTab(tabName);
        });
    });
    
    // Load chapters
    loadChapters();
    
    // Load encounters
    setupEncounters();
    
    // Initialize combat tracker
    initCombatTracker();
    
    // Encounter chapter selector
    const encounterChapterSelect = document.getElementById('encounterChapterSelect');
    if (encounterChapterSelect) {
        encounterChapterSelect.addEventListener('change', (e) => {
            loadEncountersForChapter(e.target.value);
        });
    }
}

function switchWitchlightTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('#view-witchlight .tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active from all buttons
    document.querySelectorAll('#view-witchlight .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const tabEl = document.getElementById(`tab-${tabName}`);
    const btnEl = document.querySelector(`#view-witchlight [data-tab="${tabName}"]`);
    if (tabEl) tabEl.classList.add('active');
    if (btnEl) btnEl.classList.add('active');
}

function loadChapters() {
    const chapterList = document.getElementById('chapterList');
    if (!chapterList) return;
    
    chapterList.innerHTML = '';
    
    // Add Introduction
    if (WITCHLIGHT_DATA.introduction) {
        const introItem = document.createElement('div');
        introItem.className = 'chapter-item';
        introItem.innerHTML = `
            <div class="chapter-item-header" onclick="selectIntroduction()">
                <span class="chapter-icon">🌟</span>
                <span class="chapter-title">Introduction</span>
            </div>
        `;
        chapterList.appendChild(introItem);
    }
    
    WITCHLIGHT_DATA.chapters.forEach(chapter => {
        const chapterItem = document.createElement('div');
        chapterItem.className = 'chapter-item';
        chapterItem.innerHTML = `
            <div class="chapter-item-header" onclick="selectChapter('${chapter.id}')">
                <span class="chapter-icon">${chapter.icon}</span>
                <span class="chapter-title">${chapter.title}</span>
            </div>
        `;
        chapterList.appendChild(chapterItem);
    });
    
    // Add Appendices
    if (WITCHLIGHT_DATA.appendices) {
        const appendixItem = document.createElement('div');
        appendixItem.className = 'chapter-item';
        appendixItem.innerHTML = `
            <div class="chapter-item-header" onclick="selectAppendices()">
                <span class="chapter-icon">📚</span>
                <span class="chapter-title">Appendices</span>
            </div>
        `;
        chapterList.appendChild(appendixItem);
    }
}

function selectIntroduction() {
    const app = window.dndApp;
    app.witchlightState.currentChapter = 'introduction';
    
    // Update UI
    document.querySelectorAll('.chapter-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.chapter-item')[0]?.classList.add('active');
    
    // Load introduction content
    loadIntroductionContent();
}

function loadIntroductionContent() {
    const chapterContent = document.getElementById('chapterContent');
    if (!chapterContent || !WITCHLIGHT_DATA.introduction) return;
    
    const intro = WITCHLIGHT_DATA.introduction;
    
    let html = `
        <div class="chapter-header">
            <h2>🌟 Introduction: Into the Feywild</h2>
        </div>
        <div class="chapter-overview">
            <p>${intro.summary}</p>
        </div>
        <div class="chapter-sections">
    `;
    
    // Adventure Structure
    if (intro.structure) {
        html += `
            <div class="content-section">
                <h3>Adventure Structure</h3>
                <ul>
                    ${intro.structure.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Character Advancement
    if (intro.advancement && intro.advancement.levels) {
        html += `
            <div class="content-section">
                <h3>Character Advancement</h3>
                <div class="info-box">
                    ${Object.entries(intro.advancement.levels).map(([chapter, desc]) => `
                        <p><strong>${chapter}:</strong> ${desc}</p>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Feywild Trinkets
    if (intro.trinkets) {
        html += `
            <div class="content-section">
                <h3>Feywild Trinkets</h3>
                <div class="item-grid">
                    ${intro.trinkets.map(trinket => `
                        <div class="item-card">
                            <h4>${trinket.name}</h4>
                            <p>${trinket.effect}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Backgrounds
    if (intro.backgrounds) {
        html += `
            <div class="content-section">
                <h3>Backgrounds</h3>
                <ul>
                    ${intro.backgrounds.map(bg => `<li>${bg}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Races
    if (intro.races) {
        html += `
            <div class="content-section">
                <h3>Playable Races</h3>
                <ul>
                    ${intro.races.map(race => `<li>${race}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Character Traits
    if (intro.traits) {
        html += `
            <div class="content-section">
                <h3>Character Traits & Lost Things</h3>
                <ul>
                    ${intro.traits.map(trait => `<li>${trait}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    html += '</div>';
    chapterContent.innerHTML = html;
}

function selectChapter(chapterId) {
    const app = window.dndApp;
    const chapter = WITCHLIGHT_DATA.chapters.find(c => c.id === chapterId);
    if (!chapter) return;
    
    app.witchlightState.currentChapter = chapterId;
    
    // Update UI
    document.querySelectorAll('.chapter-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const chapterItems = Array.from(document.querySelectorAll('.chapter-item'));
    const chapterIndex = WITCHLIGHT_DATA.chapters.findIndex(c => c.id === chapterId);
    if (chapterItems[chapterIndex + 1]) { // +1 because intro is first
        chapterItems[chapterIndex + 1].classList.add('active');
    }
    
    // Load chapter content
    loadChapterContent(chapter);
}

function loadChapterContent(chapter) {
    const chapterContent = document.getElementById('chapterContent');
    if (!chapterContent) return;
    
    // Special handling for Factions & NPCs Reference
    if (chapter.isFactionReference) {
        loadFactionsReference();
        return;
    }
    
    let html = `
        <div class="chapter-header">
            <h2>${chapter.icon} ${chapter.title}</h2>
        </div>
        ${chapter.carnivalMap ? `<button class="carnival-map-btn" onclick="showCarnivalMap()">🗺️ View Carnival Map</button>` : ''}
    `;
    
    // Chapter Overview
    if (chapter.overview) {
        html += `
            <div class="chapter-overview">
                <p>${chapter.overview}</p>
            </div>
        `;
    }
    
    // Running This Chapter
    if (chapter.runningNotes) {
        html += `
            <div class="content-section dm-notes">
                <h3>📖 Running This Chapter</h3>
                <p>${chapter.runningNotes}</p>
            </div>
        `;
    }
    
    // Characters/NPCs
    if (chapter.characters && chapter.characters.length > 0) {
        html += `
            <div class="content-section">
                <h3>📜 Key Characters</h3>
                <div class="character-list">
                    ${chapter.characters.map((char, index) => `
                        <div class="character-accordion-item" data-character-name="${char.name}">
                            <div class="character-accordion-header" onclick="toggleCharacterDetail('${chapter.id}', ${index})">
                                <div class="character-header-info">
                                    <h4>${char.name}</h4>
                                    <p class="character-role">${char.role}</p>
                                </div>
                                <span class="arrow">▼</span>
                            </div>
                            <div class="character-accordion-content" id="character-${chapter.id}-${index}">
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Locations (Accordion Style)
    if (chapter.locations && chapter.locations.length > 0) {
        html += `
            <div class="content-section">
                <h3>🗺️ Locations</h3>
                <div class="location-accordion">
                    ${chapter.locations.map((loc, index) => `
                        <div class="location-accordion-item" data-location-id="${chapter.id}-${index}">
                            <div class="location-accordion-header" onclick="toggleLocationDetail('${chapter.id}', ${index})">
                                <h4>${loc.name}</h4>
                                <span class="accordion-arrow">▼</span>
                            </div>
                            <div class="location-accordion-content" id="location-${chapter.id}-${index}">
                                <!-- Content will be loaded here -->
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Events
    if (chapter.events && chapter.events.length > 0) {
        html += `
            <div class="content-section">
                <h3>⚡ Key Events</h3>
                <div class="event-list">
                    ${chapter.events.map(event => `
                        <div class="event-item">
                            <h4>${event.name}</h4>
                            <p>${event.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Session Notes
    if (chapter.sessionNotes) {
        html += `
            <div class="content-section dm-notes">
                <h3>🎲 Session Notes</h3>
                <p>${chapter.sessionNotes}</p>
            </div>
        `;
    }
    
    chapterContent.innerHTML = html;
}

function showCharacterDetail(chapterId, characterName) {
    const app = window.dndApp;
    const chapter = WITCHLIGHT_DATA.chapters.find(c => c.id === chapterId);
    if (!chapter) return;
    
    const character = chapter.characters.find(c => c.name === characterName);
    if (!character) return;
    
    let content = `
        <div class="info-content-section">
            <h3>${character.name}</h3>
            <p><strong>Role:</strong> ${character.role}</p>
            ${character.stats ? `<p><strong>Stats:</strong> ${character.stats}</p>` : ''}
        </div>
    `;
    
    if (character.abilities && character.abilities.length > 0) {
        content += `
            <div class="info-content-section">
                <h4>Abilities</h4>
                <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
                    ${character.abilities.map(ability => `<li>${ability}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    if (character.quote) {
        content += `
            <div class="info-content-section">
                <p style="font-style: italic; color: var(--accent-gold);">"${character.quote}"</p>
            </div>
        `;
    }
    
    app.showInfoPanel(character.name, content);
}

// Load Factions & NPCs Reference
function loadFactionsReference() {
    const chapterContent = document.getElementById('chapterContent');
    if (!chapterContent) {
        console.error('chapterContent element not found');
        return;
    }
    
    if (!window.WITCHLIGHT_FACTIONS) {
        console.error('WITCHLIGHT_FACTIONS not loaded');
        chapterContent.innerHTML = '<div class="chapter-header"><h2>🎭 Factions & NPCs</h2></div><p style="color: red;">Error: Faction data not loaded. Please check console.</p>';
        return;
    }
    
    const factionsData = window.WITCHLIGHT_FACTIONS;
    
    let html = `
        <div class="chapter-header">
            <h2>${factionsData.icon} ${factionsData.title}</h2>
        </div>
        <div class="chapter-overview">
            <p>${factionsData.description}</p>
        </div>
    `;
    
    // Render each faction
    factionsData.factions.forEach((faction, factionIndex) => {
        html += `
            <div class="content-section faction-section">
                <h3>🏛️ ${faction.name}</h3>
                <div class="faction-info">
                    <p class="faction-type"><strong>Type:</strong> ${faction.type}</p>
                    <p class="faction-description">${faction.description}</p>
                    ${faction.backstory ? `<p><strong>Backstory:</strong> ${faction.backstory}</p>` : ''}
                    ${faction.plot ? `<p><strong>Plot:</strong> ${faction.plot}</p>` : ''}
                    ${faction.dynamics ? `<p><strong>Dynamics:</strong> ${faction.dynamics}</p>` : ''}
                    ${faction.note ? `<p><em>${faction.note}</em></p>` : ''}
                </div>
                
                <h4>Members:</h4>
                <div class="faction-members-list">
                    ${faction.members.map((member, memberIndex) => `
                        <div class="faction-member-accordion" data-member-name="${member.name}">
                            <div class="faction-member-header" onclick="toggleFactionMember(${factionIndex}, ${memberIndex})">
                                <div class="member-header-info">
                                    <h5>${member.name}</h5>
                                    <p class="member-title">${member.title || member.role}</p>
                                    ${member.cr ? `<span class="member-cr">CR ${member.cr}</span>` : ''}
                                </div>
                                <span class="arrow">▼</span>
                            </div>
                            <div class="faction-member-content" id="faction-member-${factionIndex}-${memberIndex}">
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    // Render creatures section
    if (factionsData.creatures && factionsData.creatures.length > 0) {
        html += `
            <div class="content-section creature-section">
                <h3>🐉 Common Creatures</h3>
                <p>Key creatures that appear throughout the adventure.</p>
                <div class="creature-list">
                    ${factionsData.creatures.map((creature, creatureIndex) => `
                        <div class="creature-accordion" data-creature-name="${creature.name}">
                            <div class="creature-header" onclick="toggleCreature(${creatureIndex})">
                                <div class="creature-header-info">
                                    <h5>${creature.name}</h5>
                                    <p class="creature-type">${creature.size} ${creature.type}</p>
                                    <span class="creature-cr">${creature.cr}</span>
                                </div>
                                <span class="arrow">▼</span>
                            </div>
                            <div class="creature-content" id="creature-${creatureIndex}">
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    chapterContent.innerHTML = html;
}

// Toggle Faction Member Accordion
function toggleFactionMember(factionIndex, memberIndex) {
    const factionsData = window.WITCHLIGHT_FACTIONS;
    if (!factionsData) return;
    
    const member = factionsData.factions[factionIndex].members[memberIndex];
    const contentId = `faction-member-${factionIndex}-${memberIndex}`;
    const contentEl = document.getElementById(contentId);
    const itemEl = contentEl.closest('.faction-member-accordion');
    const isOpen = itemEl.classList.contains('active');
    
    // Close all other faction member accordions
    document.querySelectorAll('.faction-member-accordion').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (isOpen) {
        itemEl.classList.remove('active');
        contentEl.innerHTML = '';
    } else {
        itemEl.classList.add('active');
        contentEl.innerHTML = renderFactionMemberDetail(member);
    }
}

// Render Faction Member Detail
function renderFactionMemberDetail(member) {
    let html = '<div class="faction-member-detail">';
    
    // Description and personality
    if (member.description) {
        html += `<div class="member-description"><h6>📖 Description</h6><p>${member.description}</p></div>`;
    }
    
    if (member.appearance) {
        html += `<div class="member-appearance"><h6>👁️ Appearance</h6><p>${member.appearance}</p></div>`;
    }
    
    if (member.behavior) {
        html += `<div class="member-behavior"><h6>🎭 Behavior</h6><p>${member.behavior}</p></div>`;
    }
    
    // Roleplay info
    if (member.personality || member.ideal || member.bond || member.flaw) {
        html += '<div class="member-roleplay"><h6>🎲 Roleplay Information</h6>';
        if (member.personality) html += `<p><strong>Personality:</strong> "${member.personality}"</p>`;
        if (member.ideal) html += `<p><strong>Ideal:</strong> "${member.ideal}"</p>`;
        if (member.bond) html += `<p><strong>Bond:</strong> "${member.bond}"</p>`;
        if (member.flaw) html += `<p><strong>Flaw:</strong> "${member.flaw}"</p>`;
        html += '</div>';
    }
    
    if (member.weakness) {
        html += `<div class="member-weakness"><h6>⚠️ Weakness</h6><p>${member.weakness}</p></div>`;
    }
    
    if (member.combatNotes) {
        html += `<div class="member-combat-notes"><h6>⚔️ Combat Notes</h6><p>${member.combatNotes}</p></div>`;
    }
    
    // Stat block
    if (member.statBlock) {
        html += renderStatBlockFull(member.statBlock);
    }
    
    html += '</div>';
    return html;
}

// Toggle Creature Accordion
function toggleCreature(creatureIndex) {
    const factionsData = window.WITCHLIGHT_FACTIONS;
    if (!factionsData) return;
    
    const creature = factionsData.creatures[creatureIndex];
    const contentId = `creature-${creatureIndex}`;
    const contentEl = document.getElementById(contentId);
    const itemEl = contentEl.closest('.creature-accordion');
    const isOpen = itemEl.classList.contains('active');
    
    // Close all other creature accordions
    document.querySelectorAll('.creature-accordion').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (isOpen) {
        itemEl.classList.remove('active');
        contentEl.innerHTML = '';
    } else {
        itemEl.classList.add('active');
        contentEl.innerHTML = renderCreatureDetail(creature);
    }
}

// Render Creature Detail
function renderCreatureDetail(creature) {
    let html = '<div class="creature-detail">';
    
    if (creature.description) {
        html += `<div class="creature-description"><p>${creature.description}</p></div>`;
    }
    
    if (creature.statBlock) {
        html += renderStatBlockFull(creature.statBlock);
    }
    
    html += '</div>';
    return html;
}

// Render Full Stat Block
function renderStatBlockFull(statBlock) {
    let html = '<div class="stat-block-full">';
    
    // Header
    html += `
        <div class="stat-block-header-full">
            <h4>${statBlock.size} ${statBlock.type}, ${statBlock.alignment}</h4>
        </div>
        <div class="stat-block-divider"></div>
    `;
    
    // Basic stats
    html += `
        <div class="stat-block-basics">
            <p><strong>Armor Class</strong> ${statBlock.ac}</p>
            <p><strong>Hit Points</strong> ${statBlock.hp}</p>
            <p><strong>Speed</strong> ${statBlock.speed}</p>
        </div>
        <div class="stat-block-divider"></div>
    `;
    
    // Ability scores
    if (statBlock.stats) {
        html += '<div class="stat-block-abilities">';
        html += '<table class="ability-scores"><tr>';
        html += `<th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th>`;
        html += '</tr><tr>';
        html += `<td>${statBlock.stats.str}</td>`;
        html += `<td>${statBlock.stats.dex}</td>`;
        html += `<td>${statBlock.stats.con}</td>`;
        html += `<td>${statBlock.stats.int}</td>`;
        html += `<td>${statBlock.stats.wis}</td>`;
        html += `<td>${statBlock.stats.cha}</td>`;
        html += '</tr></table>';
        html += '</div><div class="stat-block-divider"></div>';
    }
    
    // Other stats
    html += '<div class="stat-block-info">';
    if (statBlock.saves) html += `<p><strong>Saving Throws</strong> ${statBlock.saves}</p>`;
    if (statBlock.skills) html += `<p><strong>Skills</strong> ${statBlock.skills}</p>`;
    if (statBlock.damageResistances) html += `<p><strong>Damage Resistances</strong> ${statBlock.damageResistances}</p>`;
    if (statBlock.conditionImmunities) html += `<p><strong>Condition Immunities</strong> ${statBlock.conditionImmunities}</p>`;
    if (statBlock.senses) html += `<p><strong>Senses</strong> ${statBlock.senses}</p>`;
    if (statBlock.languages) html += `<p><strong>Languages</strong> ${statBlock.languages}</p>`;
    if (statBlock.cr) html += `<p><strong>Challenge</strong> ${statBlock.cr} (Proficiency Bonus ${statBlock.proficiency})</p>`;
    if (statBlock.equipment) html += `<p><strong>Equipment</strong> ${statBlock.equipment}</p>`;
    html += '</div><div class="stat-block-divider"></div>';
    
    // Traits
    if (statBlock.traits && statBlock.traits.length > 0) {
        html += '<div class="stat-block-traits">';
        statBlock.traits.forEach(trait => {
            html += `<p><strong>${trait.name}.</strong> ${trait.description}</p>`;
        });
        html += '</div><div class="stat-block-divider"></div>';
    }
    
    // Actions
    if (statBlock.actions && statBlock.actions.length > 0) {
        html += '<div class="stat-block-actions"><h5>Actions</h5>';
        statBlock.actions.forEach(action => {
            html += `<p><strong>${action.name}.</strong> ${action.description}</p>`;
        });
        html += '</div>';
    }
    
    // Bonus Actions
    if (statBlock.bonusActions && statBlock.bonusActions.length > 0) {
        html += '<div class="stat-block-divider"></div><div class="stat-block-bonus-actions"><h5>Bonus Actions</h5>';
        statBlock.bonusActions.forEach(action => {
            html += `<p><strong>${action.name}.</strong> ${action.description}</p>`;
        });
        html += '</div>';
    }
    
    // Reactions
    if (statBlock.reactions && statBlock.reactions.length > 0) {
        html += '<div class="stat-block-divider"></div><div class="stat-block-reactions"><h5>Reactions</h5>';
        statBlock.reactions.forEach(reaction => {
            html += `<p><strong>${reaction.name}.</strong> ${reaction.description}</p>`;
        });
        html += '</div>';
    }
    
    html += '</div>';
    return html;
}

// Toggle Character Detail Accordion
function toggleCharacterDetail(chapterId, characterIndex) {
    const chapter = WITCHLIGHT_DATA.chapters.find(c => c.id === chapterId);
    if (!chapter) return;
    
    const character = chapter.characters[characterIndex];
    if (!character) return;
    
    const contentId = `character-${chapterId}-${characterIndex}`;
    const contentEl = document.getElementById(contentId);
    const itemEl = contentEl.closest('.character-accordion-item');
    const isOpen = itemEl.classList.contains('active');
    
    // Close all other accordion items
    document.querySelectorAll('.character-accordion-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (isOpen) {
        itemEl.classList.remove('active');
        contentEl.innerHTML = '';
    } else {
        itemEl.classList.add('active');
        contentEl.innerHTML = renderCharacterDetail(character);
    }
}

function renderCharacterDetail(character) {
    let content = `
        <div class="character-detail-section">
    `;
    
    // Description
    if (character.description) {
        content += `
            <div class="character-description">
                <h5>📖 Description</h5>
                <p>${character.description}</p>
            </div>
        `;
    }
    
    // Stats
    if (character.stats) {
        content += `
            <div class="character-stats-section">
                <h5>⚔️ Stats</h5>
                <p>${character.stats}</p>
            </div>
        `;
    }
    
    // Abilities - handle both array and string
    if (character.abilities) {
        content += `
            <div class="character-abilities-section">
                <h5>✨ Abilities</h5>
        `;
        
        if (Array.isArray(character.abilities)) {
            content += `<ul class="abilities-list">`;
            character.abilities.forEach(ability => {
                content += `<li>${ability}</li>`;
            });
            content += `</ul>`;
        } else {
            content += `<p>${character.abilities}</p>`;
        }
        
        content += `</div>`;
    }
    
    // Quote
    if (character.quote) {
        content += `
            <div class="character-quote-section">
                <h5>💬 Quote</h5>
                <blockquote class="character-quote">"${character.quote}"</blockquote>
            </div>
        `;
    }
    
    // Personality/Notes
    if (character.personality) {
        content += `
            <div class="character-personality-section">
                <h5>🎭 Personality</h5>
                <p>${character.personality}</p>
            </div>
        `;
    }
    
    // Goals/Motivations
    if (character.goals) {
        content += `
            <div class="character-goals-section">
                <h5>🎯 Goals & Motivations</h5>
                <p>${character.goals}</p>
            </div>
        `;
    }
    
    content += `</div>`;
    return content;
}

// Toggle Location Detail Accordion
function toggleLocationDetail(chapterId, locationIndex) {
    const chapter = WITCHLIGHT_DATA.chapters.find(c => c.id === chapterId);
    if (!chapter) return;
    
    const location = chapter.locations[locationIndex];
    if (!location) return;
    
    const contentId = `location-${chapterId}-${locationIndex}`;
    const contentEl = document.getElementById(contentId);
    const itemEl = contentEl.closest('.location-accordion-item');
    const isOpen = itemEl.classList.contains('active');
    
    // Close all other accordion items
    document.querySelectorAll('.location-accordion-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (isOpen) {
        itemEl.classList.remove('active');
        contentEl.innerHTML = '';
    } else {
        itemEl.classList.add('active');
        contentEl.innerHTML = renderLocationDetail(location);
    }
}

function renderLocationDetail(location) {
    let content = `
        <div class="location-detail-section">
            <p class="location-description">${location.description}</p>
        </div>
    `;
    
    if (location.details) {
        content += `
            <div class="location-detail-section">
                <h4>📋 Details</h4>
                <p>${location.details}</p>
            </div>
        `;
    }
    
    // DM Guidance Section
    if (location.dmGuidance) {
        content += `
            <div class="location-detail-section dm-notes-section">
                <h4>📖 DM Guidance</h4>
        `;
        
        // Player Options
        if (location.dmGuidance.playerOptions && location.dmGuidance.playerOptions.length > 0) {
            content += `
                <div style="margin-top: 10px;">
                    <strong>Player Options:</strong>
                    ${location.dmGuidance.playerOptions.map(option => `
                        <div style="margin: 15px 0; padding: 10px; background: rgba(0,0,0,0.2); border-left: 3px solid var(--accent-gold);">
                            <strong style="color: var(--accent-gold);">🎯 ${option.option}</strong>
                            <p style="margin: 5px 0;"><em>Outcome:</em> ${option.outcome}</p>
                            ${option.mechanics ? `<p style="margin: 5px 0; font-size: 0.9em; color: #aaa;"><em>Mechanics:</em> ${option.mechanics}</p>` : ''}
                            ${option.pacts ? `<div style="margin-top: 5px; font-size: 0.9em;">
                                <em>Fey Pacts:</em>
                                <ul style="margin: 5px 0 0 20px;">
                                    ${option.pacts.map(pact => `<li>${pact}</li>`).join('')}
                                </ul>
                            </div>` : ''}
                            ${option.puzzle ? `<div style="margin-top: 5px; font-size: 0.9em;">
                                <em>Puzzle Solutions:</em>
                                <ul style="margin: 5px 0 0 20px;">
                                    ${option.puzzle.map(p => `<li>${p}</li>`).join('')}
                                </ul>
                            </div>` : ''}
                            ${option.timing ? `<p style="margin: 5px 0; font-size: 0.9em; color: #ff6b6b;"><em>Timing:</em> ${option.timing}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        // Racing Rules (for Snail Racing)
        if (location.dmGuidance.racingRules) {
            const rules = location.dmGuidance.racingRules;
            content += `
                <div style="margin-top: 15px; padding: 10px; background: rgba(100,50,0,0.2); border: 1px solid var(--accent-gold);">
                    <strong>Racing Rules:</strong>
                    <ul style="margin: 5px 0 0 20px;">
                        <li><strong>Course:</strong> ${rules.course}</li>
                        <li><strong>Automatic Movement:</strong> ${rules.automatic}</li>
                        <li><strong>Checks:</strong> ${rules.checks}</li>
                        <li><strong>Success:</strong> ${rules.success}</li>
                        <li><strong>Failure:</strong> ${rules.failure}</li>
                        <li><strong>Prohibited:</strong> ${rules.prohibited}</li>
                        <li><strong>Violation:</strong> ${rules.violation}</li>
                    </ul>
                </div>
            `;
        }
        
        // Surprises
        if (location.dmGuidance.surprises && location.dmGuidance.surprises.length > 0) {
            content += `
                <div style="margin-top: 10px;">
                    <strong>Surprises (d8):</strong>
                    <ul style="margin: 5px 0 0 20px;">
                        ${location.dmGuidance.surprises.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Rewards
        if (location.dmGuidance.rewards) {
            content += `
                <div style="margin-top: 10px; padding: 10px; background: rgba(0,100,0,0.2); border-left: 3px solid #4CAF50;">
                    <strong>🎁 Rewards:</strong>
            `;
            if (typeof location.dmGuidance.rewards === 'string') {
                content += `<p>${location.dmGuidance.rewards}</p>`;
            } else {
                content += `<ul style="margin: 5px 0 0 20px;">`;
                for (const [key, value] of Object.entries(location.dmGuidance.rewards)) {
                    content += `<li><strong>${key}:</strong> ${value}</li>`;
                }
                content += `</ul>`;
            }
            content += `</div>`;
        }
        
        // Random Acts (for Big Top)
        if (location.dmGuidance.randomActs && location.dmGuidance.randomActs.length > 0) {
            content += `
                <div style="margin-top: 10px;">
                    <strong>Random Acts (d8):</strong>
                    <ol style="margin: 5px 0 0 20px;">
                        ${location.dmGuidance.randomActs.map(act => `<li>${act}</li>`).join('')}
                    </ol>
                </div>
            `;
        }
        
        // Secrets
        if (location.dmGuidance.secrets && location.dmGuidance.secrets.length > 0) {
            content += `
                <div style="margin-top: 10px; padding: 10px; background: rgba(100,0,100,0.2); border-left: 3px solid #9C27B0;">
                    <strong>🔮 Secrets:</strong>
                    <ul style="margin: 5px 0 0 20px;">
                        ${location.dmGuidance.secrets.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Mood Effects
        if (location.dmGuidance.moodEffects) {
            content += `
                <div style="margin-top: 10px; font-size: 0.9em; color: #FFC107;">
                    <strong>🎭 Mood Effects:</strong> ${location.dmGuidance.moodEffects}
                </div>
            `;
        }
        
        // Future Payoff
        if (location.dmGuidance.futurePayoff) {
            content += `
                <div style="margin-top: 10px; font-size: 0.9em; color: #00BCD4;">
                    <strong>⏭️ Future Payoff:</strong> ${location.dmGuidance.futurePayoff}
                </div>
            `;
        }
        
        content += `</div>`;
    }
    
    return content;
}

function selectAppendices() {
    const app = window.dndApp;
    app.witchlightState.currentChapter = 'appendices';
    
    // Update UI
    document.querySelectorAll('.chapter-item').forEach(item => {
        item.classList.remove('active');
    });
    const items = Array.from(document.querySelectorAll('.chapter-item'));
    items[items.length - 1]?.classList.add('active');
    
    // Load appendices content
    loadAppendicesContent();
}

function loadAppendicesContent() {
    const chapterContent = document.getElementById('chapterContent');
    if (!chapterContent || !WITCHLIGHT_DATA.appendices) return;
    
    const appendices = WITCHLIGHT_DATA.appendices;
    
    let html = `
        <div class="chapter-header">
            <h2>📚 Appendices</h2>
        </div>
        <div class="appendices-container">
    `;
    
    // Magic Items
    if (appendices.magicItems) {
        html += `
            <div class="content-section">
                <h3>✨ Magic Items</h3>
                <div class="item-grid">
                    ${appendices.magicItems.map(item => `
                        <div class="magic-item-card" onclick="showMagicItemDetail('${item.name}')">
                            <h4>${item.name}</h4>
                            <p class="item-rarity">${item.rarity}</p>
                            <p>${item.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Factions
    if (appendices.factions) {
        html += `
            <div class="content-section">
                <h3>⚔️ Factions</h3>
                <div class="faction-list">
                    ${appendices.factions.map(faction => `
                        <div class="faction-card">
                            <h4>${faction.name}</h4>
                            <p>${faction.description}</p>
                            ${faction.members ? `
                                <p><strong>Members:</strong> ${faction.members.join(', ')}</p>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Creatures
    if (appendices.creatures) {
        html += `
            <div class="content-section">
                <h3>🐉 Creatures</h3>
                <div class="creature-grid">
                    ${appendices.creatures.map(creature => `
                        <div class="creature-card" onclick="showCreatureDetail('${creature.name}')">
                            <h4>${creature.name}</h4>
                            <p class="creature-cr">CR ${creature.cr}</p>
                            <p class="creature-type">${creature.type}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    chapterContent.innerHTML = html;
}

function showMagicItemDetail(itemName) {
    const app = window.dndApp;
    const item = WITCHLIGHT_DATA.appendices.magicItems.find(i => i.name === itemName);
    if (!item) return;
    
    let content = `
        <div class="info-content-section">
            <h3>${item.name}</h3>
            <p><strong>Rarity:</strong> ${item.rarity}</p>
            <p>${item.description}</p>
        </div>
    `;
    
    if (item.effect) {
        content += `
            <div class="info-content-section">
                <h4>Effect</h4>
                <p>${item.effect}</p>
            </div>
        `;
    }
    
    app.showInfoPanel(item.name, content);
}

function showCreatureDetail(creatureName) {
    const app = window.dndApp;
    const creature = WITCHLIGHT_DATA.appendices.creatures.find(c => c.name === creatureName);
    if (!creature) return;
    
    let content = `
        <div class="info-content-section">
            <h3>${creature.name}</h3>
            <p><strong>CR:</strong> ${creature.cr}</p>
            <p><strong>Type:</strong> ${creature.type}</p>
            ${creature.stats ? `<p><strong>Stats:</strong> ${creature.stats}</p>` : ''}
        </div>
    `;
    
    if (creature.abilities && creature.abilities.length > 0) {
        content += `
            <div class="info-content-section">
                <h4>Abilities</h4>
                <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
                    ${creature.abilities.map(ability => `<li>${ability}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    app.showInfoPanel(creature.name, content);
}

function setupEncounters() {
    const encounterList = document.getElementById('encounterList');
    if (!encounterList) return;
    
    encounterList.innerHTML = '<p class="info-message">Select a chapter to view encounters.</p>';
}

function loadEncountersForChapter(chapterId) {
    const app = window.dndApp;
    const encounterList = document.getElementById('encounterList');
    if (!encounterList) return;
    
    const encounters = WITCHLIGHT_DATA.encounters[chapterId];
    if (!encounters || encounters.length === 0) {
        encounterList.innerHTML = '<p class="info-message">No encounters available for this chapter.</p>';
        return;
    }
    
    let html = '<div class="encounter-accordion">';
    encounters.forEach((encounter, index) => {
        const isCompleted = app.witchlightState.completedEncounters.includes(encounter.id);
        html += `
            <div class="encounter-accordion-item ${isCompleted ? 'completed' : ''}" data-encounter-id="${encounter.id}">
                <div class="encounter-accordion-header" onclick="toggleEncounterDetail('${chapterId}', ${index})">
                    <div class="encounter-header-left">
                        <h3>${encounter.name}</h3>
                        <span class="encounter-location">📍 ${encounter.location}</span>
                    </div>
                    <div class="encounter-header-right">
                        <span class="encounter-difficulty-badge ${encounter.difficulty.toLowerCase()}">${encounter.difficulty}</span>
                        ${isCompleted ? '<span class="encounter-status-badge completed">✓ Completed</span>' : ''}
                        <span class="accordion-arrow">▼</span>
                    </div>
                </div>
                <div class="encounter-accordion-content" id="encounter-${chapterId}-${index}">
                    <!-- Content loaded on expansion -->
                </div>
            </div>
        `;
    });
    html += '</div>';
    
    encounterList.innerHTML = html;
}

// Toggle Encounter Detail Accordion
function toggleEncounterDetail(chapterId, encounterIndex) {
    const app = window.dndApp;
    const encounters = WITCHLIGHT_DATA.encounters[chapterId];
    if (!encounters) return;
    
    const encounter = encounters[encounterIndex];
    if (!encounter) return;
    
    const contentId = `encounter-${chapterId}-${encounterIndex}`;
    const contentEl = document.getElementById(contentId);
    const itemEl = contentEl.closest('.encounter-accordion-item');
    const isOpen = itemEl.classList.contains('active');
    
    // Close all other accordion items
    document.querySelectorAll('.encounter-accordion-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (isOpen) {
        itemEl.classList.remove('active');
        contentEl.innerHTML = '';
    } else {
        itemEl.classList.add('active');
        contentEl.innerHTML = renderEncounterDetail(encounter, chapterId);
    }
}

// Render Encounter Detail Content
function renderEncounterDetail(encounter, chapterId) {
    const app = window.dndApp;
    const isCompleted = app.witchlightState.completedEncounters.includes(encounter.id);
    
    let html = '<div class="encounter-detail-content">';
    
    // Description
    html += `
        <div class="encounter-detail-section">
            <h4>📖 Description</h4>
            <p>${encounter.description}</p>
        </div>
    `;
    
    // Creatures
    if (encounter.creatures && encounter.creatures.length > 0) {
        html += `
            <div class="encounter-detail-section">
                <h4>👹 Creatures</h4>
                <ul class="encounter-creatures-list">
                    ${encounter.creatures.map(creature => `<li>${creature}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Mechanics
    if (encounter.mechanics) {
        html += `
            <div class="encounter-detail-section">
                <h4>⚙️ Mechanics</h4>
                <p>${encounter.mechanics}</p>
            </div>
        `;
    }
    
    // Rewards
    if (encounter.rewards) {
        html += `
            <div class="encounter-detail-section encounter-rewards">
                <h4>🎁 Rewards</h4>
                <p>${encounter.rewards}</p>
            </div>
        `;
    }
    
    // DM Notes
    if (encounter.dmNotes) {
        html += `
            <div class="encounter-detail-section dm-notes-inline">
                <h4>📝 DM Notes</h4>
                <p>${encounter.dmNotes}</p>
            </div>
        `;
    }
    
    // Action Buttons
    html += `
        <div class="encounter-actions-inline">
            <button class="btn-encounter-complete ${isCompleted ? 'completed' : ''}" 
                    onclick="toggleEncounterComplete('${encounter.id}', '${chapterId}')">
                ${isCompleted ? '↩️ Mark Incomplete' : '✓ Mark Complete'}
            </button>
            <button class="btn-start-combat" onclick="startCombatFromEncounter('${chapterId}', '${encounter.id}')">
                ⚔️ Start Combat
            </button>
        </div>
    `;
    
    html += '</div>';
    return html;
}

function startEncounter(chapterId, encounterId) {
    const app = window.dndApp;
    const encounters = WITCHLIGHT_DATA.encounters[chapterId];
    if (!encounters) return;
    
    const encounter = encounters.find(e => e.id === encounterId);
    if (!encounter) return;
    
    // Switch to DM Tools view and add encounter info
    app.showView('dm');
    
    // Add encounter description to scene
    const sceneText = document.getElementById('sceneText');
    if (sceneText) {
        sceneText.value = `Encounter: ${encounter.name}\nLocation: ${encounter.location}\n\n${encounter.description}`;
    }
    
    app.addLog(`Started encounter: ${encounter.name} from ${WITCHLIGHT_DATA.chapters.find(c => c.id === chapterId)?.title || 'Unknown Chapter'}`);
    
    setTimeout(() => {
        app.showInfoPanel('Encounter Started', `
            <div class="info-content-section">
                <h4>${encounter.name}</h4>
                <p><strong>Location:</strong> ${encounter.location}</p>
                <p>${encounter.description}</p>
                <p style="margin-top: 1rem; color: #44ff44;">✓ Encounter details added to DM Tools scene setting</p>
            </div>
        `);
    }, 100);
}

function toggleEncounterComplete(encounterId, chapterId) {
    const app = window.dndApp;
    const index = app.witchlightState.completedEncounters.indexOf(encounterId);
    
    if (index > -1) {
        app.witchlightState.completedEncounters.splice(index, 1);
    } else {
        app.witchlightState.completedEncounters.push(encounterId);
    }
    
    app.saveCompletedEncounters();
    
    // Reload encounters to update UI
    const chapterSelect = document.getElementById('encounterChapterSelect');
    if (chapterSelect && chapterSelect.value) {
        loadEncountersForChapter(chapterSelect.value);
    }
}

// Show Carnival Map in Full-Screen Modal with Zoom/Pan
function showCarnivalMap() {
    const chapter = WITCHLIGHT_DATA.chapters.find(c => c.id === 'chapter1');
    
    if (!chapter || !chapter.carnivalMap) {
        alert('Carnival map not found.');
        return;
    }
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'map-modal-full';
    modal.innerHTML = `
        <div class="map-modal-overlay-full" onclick="closeMapModal()"></div>
        <div class="map-modal-container-full">
            <div class="map-modal-header-full">
                <h2>🎪 Witchlight Carnival Map</h2>
                <div class="map-controls-full">
                    <button class="map-control-btn-full" id="zoomInBtn" title="Zoom In">➕</button>
                    <button class="map-control-btn-full" id="zoomOutBtn" title="Zoom Out">➖</button>
                    <button class="map-control-btn-full" id="resetViewBtn" title="Reset View">🔄</button>
                    <button class="map-control-btn-full drag-toggle-btn active" id="dragToggleBtn" title="Toggle Map Dragging">🖐️ Drag</button>
                    <span class="zoom-indicator-full" id="zoomIndicator">100%</span>
                </div>
                <div class="fog-controls-full">
                    <button class="map-control-btn-full fog-toggle-btn" id="fogToggleBtn" title="Toggle Fog of War">🌫️ Fog</button>
                    <button class="map-control-btn-full fog-reset-btn" id="fogResetBtn" title="Reset Fog">♻️ Reset Fog</button>
                    <button class="map-control-btn-full marker-toggle-btn" id="markerToggleBtn" title="Show/Hide Markers">📍 Markers</button>
                    <div class="fog-brush-control">
                        <label for="brushSizeSlider">Brush Size:</label>
                        <input type="range" id="brushSizeSlider" min="10" max="150" value="50" />
                        <span class="brush-size-display" id="brushSizeDisplay">50px</span>
                    </div>
                </div>
                <button class="map-modal-close-btn-full" onclick="closeMapModal()">✕ Close</button>
            </div>
            <div class="map-display-area-full" id="mapDisplayArea">
                <div class="map-image-wrapper-full" id="mapImageWrapper">
                    <img src="${chapter.carnivalMap}" alt="Carnival Map" id="carnivalMapImage" draggable="false" />
                    <canvas class="fog-canvas-full" id="fogCanvas"></canvas>
                    <div class="map-hotspots-overlay-full" id="mapHotspotsOverlay"></div>
                </div>
            </div>
            <div class="map-modal-footer-full">
                <p>💡 Click location labels to view details | 🖱️ Drag to pan | 🔍 Use zoom buttons or mouse wheel</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Wait for image to load, then initialize
    const mapImage = document.getElementById('carnivalMapImage');
    mapImage.onload = function() {
        initFullMapInteractivity(chapter);
    };
    
    // If image already loaded
    if (mapImage.complete) {
        initFullMapInteractivity(chapter);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', handleMapModalEscape);
}

function initFullMapInteractivity(chapter) {
    const wrapper = document.getElementById('mapImageWrapper');
    const mapImage = document.getElementById('carnivalMapImage');
    const displayArea = document.getElementById('mapDisplayArea');
    const hotspotsOverlay = document.getElementById('mapHotspotsOverlay');
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const resetViewBtn = document.getElementById('resetViewBtn');
    const dragToggleBtn = document.getElementById('dragToggleBtn');
    const zoomIndicator = document.getElementById('zoomIndicator');
    
    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let draggingEnabled = true;  // Can be toggled manually or by fog
    let manualDragToggle = true;  // Track manual toggle state
    
    const MIN_SCALE = 0.5;  // Allow zoom out to 50%
    const MAX_SCALE = 3;
    const ZOOM_STEP = 0.25;
    
    // Create hotspots
    createFullMapHotspots(chapter, hotspotsOverlay, mapImage);
    
    // Initial fit - make height fill viewport
    resetView();
    
    function updateTransform() {
        wrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        zoomIndicator.textContent = `${Math.round(scale * 100)}%`;
    }
    
    function zoom(delta, mouseX = null, mouseY = null) {
        const oldScale = scale;
        scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + delta));
        
        if (scale === oldScale) return;
        
        if (mouseX !== null && mouseY !== null) {
            // Zoom toward mouse position
            const rect = displayArea.getBoundingClientRect();
            const viewportX = mouseX - rect.left;
            const viewportY = mouseY - rect.top;
            
            const beforeX = (viewportX - translateX) / oldScale;
            const beforeY = (viewportY - translateY) / oldScale;
            
            translateX = viewportX - beforeX * scale;
            translateY = viewportY - beforeY * scale;
        } else {
            // Zoom toward center
            const rect = displayArea.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const beforeX = (centerX - translateX) / oldScale;
            const beforeY = (centerY - translateY) / oldScale;
            
            translateX = centerX - beforeX * scale;
            translateY = centerY - beforeY * scale;
        }
        
        updateTransform();
    }
    
    function resetView() {
        scale = 1;
        
        const displayRect = displayArea.getBoundingClientRect();
        const imgHeight = mapImage.naturalHeight;
        
        // Center horizontally, align to fit height
        translateX = (displayRect.width - mapImage.naturalWidth) / 2;
        translateY = 0;
        
        updateTransform();
    }
    
    // Zoom buttons
    zoomInBtn.addEventListener('click', () => zoom(ZOOM_STEP));
    zoomOutBtn.addEventListener('click', () => zoom(-ZOOM_STEP));
    resetViewBtn.addEventListener('click', resetView);
    
    // Drag toggle button
    dragToggleBtn.addEventListener('click', () => {
        manualDragToggle = !manualDragToggle;
        draggingEnabled = manualDragToggle;
        dragToggleBtn.classList.toggle('active', manualDragToggle);
        dragToggleBtn.textContent = manualDragToggle ? '🖐️ Drag ON' : '🖐️ Drag OFF';
        
        // Update cursor based on fog and drag state
        const fogCanvas = document.getElementById('fogCanvas');
        const isFogActive = fogCanvas && fogCanvas.style.display === 'block';
        
        if (isFogActive) {
            // If fog is active, cursor depends on drag state
            if (manualDragToggle) {
                displayArea.style.cursor = 'grab';  // Dragging mode
            } else {
                displayArea.style.cursor = 'crosshair';  // Erasing mode
            }
        } else {
            // If fog is not active, normal cursor behavior
            displayArea.style.cursor = manualDragToggle ? 'grab' : 'default';
        }
    });
    
    // Mouse wheel zoom
    displayArea.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
        zoom(delta, e.clientX, e.clientY);
    }, { passive: false });
    
    // Mouse drag to pan - allow dragging anywhere on the map
    displayArea.addEventListener('mousedown', (e) => {
        // Don't interfere with hotspot button clicks
        if (e.target.classList.contains('map-hotspot-btn-full')) {
            return;
        }
        
        // Don't drag if dragging is disabled (fog active)
        if (!draggingEnabled) {
            return;
        }
        
        if (e.button === 0) {
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            displayArea.style.cursor = 'grabbing';
            e.preventDefault();
        }
    });
    
    window.addEventListener('mousemove', (e) => {
        if (isDragging && draggingEnabled) {
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            updateTransform();
        }
    });
    
    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            if (draggingEnabled) {
                displayArea.style.cursor = 'grab';
            }
        }
    });
    
    displayArea.style.cursor = 'grab';
    
    // ===== FOG OF WAR SYSTEM =====
    // Pass callback and getter to control map dragging
    const setDraggingEnabled = (enabled) => {
        draggingEnabled = enabled;
    };
    const getDragToggleBtn = () => dragToggleBtn;
    initFogOfWar(mapImage, wrapper, displayArea, hotspotsOverlay, setDraggingEnabled, getDragToggleBtn);
}

function initFogOfWar(mapImage, wrapper, displayArea, hotspotsOverlay, setDraggingEnabled, getDragToggleBtn) {
    const fogCanvas = document.getElementById('fogCanvas');
    const fogToggleBtn = document.getElementById('fogToggleBtn');
    const fogResetBtn = document.getElementById('fogResetBtn');
    const markerToggleBtn = document.getElementById('markerToggleBtn');
    const brushSizeSlider = document.getElementById('brushSizeSlider');
    const brushSizeDisplay = document.getElementById('brushSizeDisplay');
    const dragToggleBtn = getDragToggleBtn();
    
    if (!fogCanvas) return;
    
    const ctx = fogCanvas.getContext('2d');
    let fogEnabled = false;
    let markersAlwaysVisible = false;
    let brushSize = 50;
    let isErasing = false;
    
    // ===== FOG COLOR CONFIGURATION =====
    // Customize these colors to change the fog appearance
    // Format: 'rgba(red, green, blue, alpha)'
    // Current: Dark grey-green gradient for mysterious forest/carnival vibe
    const FOG_COLOR_1 = 'rgba(40, 60, 40, 0.95)';   // Top-left: Dark grey-green
    const FOG_COLOR_2 = 'rgba(30, 50, 35, 0.95)';   // Bottom-right: Darker grey-green
    // Example alternatives:
    // Pure black: 'rgba(0, 0, 0, 0.9)'
    // Dark blue: 'rgba(20, 30, 60, 0.95)'
    // Purple mist: 'rgba(40, 20, 60, 0.95)'
    const STORAGE_KEY = 'witchlight-fog-data';
    
    // Set canvas size to match image
    function resizeCanvas() {
        fogCanvas.width = mapImage.naturalWidth;
        fogCanvas.height = mapImage.naturalHeight;
        loadFogState();
    }
    
    // Initialize canvas when image loads
    if (mapImage.complete) {
        resizeCanvas();
    } else {
        mapImage.addEventListener('load', resizeCanvas);
    }
    
    // Create initial fog layer
    function resetFog() {
        ctx.clearRect(0, 0, fogCanvas.width, fogCanvas.height);
        
        // Create gradient fog
        const gradient = ctx.createLinearGradient(0, 0, fogCanvas.width, fogCanvas.height);
        gradient.addColorStop(0, FOG_COLOR_1);
        gradient.addColorStop(1, FOG_COLOR_2);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, fogCanvas.width, fogCanvas.height);
        
        saveFogState();
    }
    
    // Save fog state to localStorage
    function saveFogState() {
        try {
            const imageData = fogCanvas.toDataURL();
            localStorage.setItem(STORAGE_KEY, imageData);
        } catch (e) {
            console.warn('Could not save fog state:', e);
        }
    }
    
    // Load fog state from localStorage
    function loadFogState() {
        try {
            const savedData = localStorage.getItem(STORAGE_KEY);
            if (savedData) {
                const img = new Image();
                img.onload = function() {
                    ctx.clearRect(0, 0, fogCanvas.width, fogCanvas.height);
                    ctx.drawImage(img, 0, 0);
                };
                img.src = savedData;
            } else {
                // No saved state, create initial fog
                resetFog();
            }
        } catch (e) {
            console.warn('Could not load fog state:', e);
            resetFog();
        }
    }
    
    // Erase fog with soft brush
    function eraseFog(x, y) {
        // Get coordinates relative to the canvas (natural image size)
        const rect = fogCanvas.getBoundingClientRect();
        const wrapperTransform = wrapper.style.transform;
        
        // Extract scale and translate from transform
        const scaleMatch = wrapperTransform.match(/scale\(([^)]+)\)/);
        const translateMatch = wrapperTransform.match(/translate\(([^,]+)px,\s*([^)]+)px\)/);
        
        const currentScale = scaleMatch ? parseFloat(scaleMatch[1]) : 1;
        const currentTranslateX = translateMatch ? parseFloat(translateMatch[1]) : 0;
        const currentTranslateY = translateMatch ? parseFloat(translateMatch[2]) : 0;
        
        // Convert viewport coordinates to canvas coordinates
        const displayAreaRect = displayArea.getBoundingClientRect();
        const viewportX = x - displayAreaRect.left;
        const viewportY = y - displayAreaRect.top;
        
        const canvasX = (viewportX - currentTranslateX) / currentScale;
        const canvasY = (viewportY - currentTranslateY) / currentScale;
        
        // Create soft circular brush with feathered edges
        const gradient = ctx.createRadialGradient(canvasX, canvasY, 0, canvasX, canvasY, brushSize);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');      // Full erase at center
        gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.5)');  // Soft falloff
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');      // Feathered edge
        
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = gradient;
        ctx.fillRect(canvasX - brushSize, canvasY - brushSize, brushSize * 2, brushSize * 2);
        ctx.globalCompositeOperation = 'source-over';
    }
    
    // Mouse events for erasing - only erase when drag is OFF
    displayArea.addEventListener('mousedown', (e) => {
        if (!fogEnabled) return;
        if (e.target.classList.contains('map-hotspot-btn-full')) return;
        
        // Only erase if dragging is disabled (drag toggle is OFF)
        const isDragOn = dragToggleBtn.classList.contains('active');
        if (isDragOn) return;  // Don't erase when drag is enabled
        
        if (e.button === 0) {
            isErasing = true;
            eraseFog(e.clientX, e.clientY);
        }
    });
    
    displayArea.addEventListener('mousemove', (e) => {
        if (!fogEnabled || !isErasing) return;
        
        // Double check drag state during move
        const isDragOn = dragToggleBtn.classList.contains('active');
        if (isDragOn) {
            isErasing = false;
            return;
        }
        
        eraseFog(e.clientX, e.clientY);
    });
    
    displayArea.addEventListener('mouseup', () => {
        if (isErasing) {
            isErasing = false;
            saveFogState();
        }
    });
    
    displayArea.addEventListener('mouseleave', () => {
        if (isErasing) {
            isErasing = false;
            saveFogState();
        }
    });
    
    // Fog toggle button
    fogToggleBtn.addEventListener('click', () => {
        fogEnabled = !fogEnabled;
        fogCanvas.style.display = fogEnabled ? 'block' : 'none';
        fogToggleBtn.classList.toggle('active', fogEnabled);
        fogToggleBtn.textContent = fogEnabled ? '🌫️ Fog ON' : '🌫️ Fog OFF';
        
        if (fogEnabled) {
            // When fog turns on, disable dragging and update drag button
            setDraggingEnabled(false);
            dragToggleBtn.classList.remove('active');
            dragToggleBtn.textContent = '🖐️ Drag OFF';
            displayArea.style.cursor = 'crosshair';
        } else {
            // When fog turns off, respect the manual drag toggle state
            const isDragOn = dragToggleBtn.classList.contains('active');
            setDraggingEnabled(isDragOn);
            displayArea.style.cursor = isDragOn ? 'grab' : 'default';
        }
        
        updateMarkerVisibility();
    });
    
    // Reset fog button - no confirmation dialog
    fogResetBtn.addEventListener('click', () => {
        resetFog();
    });
    
    // Marker visibility toggle
    markerToggleBtn.addEventListener('click', () => {
        markersAlwaysVisible = !markersAlwaysVisible;
        markerToggleBtn.classList.toggle('active', markersAlwaysVisible);
        markerToggleBtn.textContent = markersAlwaysVisible ? '📍 Markers ON' : '📍 Markers OFF';
        updateMarkerVisibility();
    });
    
    function updateMarkerVisibility() {
        if (markersAlwaysVisible || !fogEnabled) {
            hotspotsOverlay.style.zIndex = '30';  // Above fog
        } else {
            hotspotsOverlay.style.zIndex = '10';  // Below fog
        }
    }
    
    // Brush size slider
    brushSizeSlider.addEventListener('input', (e) => {
        brushSize = parseInt(e.target.value);
        brushSizeDisplay.textContent = `${brushSize}px`;
    });
    
    // Initialize fog as hidden
    fogCanvas.style.display = 'none';
}

function createFullMapHotspots(chapter, overlay, mapImage) {
    if (!chapter.mapHotspots || chapter.mapHotspots.length === 0) {
        console.log('No hotspots configured.');
        return;
    }
    
    overlay.innerHTML = '';
    
    chapter.mapHotspots.forEach(hotspot => {
        const hotspotBtn = document.createElement('button');
        hotspotBtn.className = `map-hotspot-btn-full ${hotspot.type === 'event' ? 'event-hotspot' : ''}`;
        hotspotBtn.textContent = hotspot.locationName;
        
        // Position as percentage of image natural dimensions in pixels
        // Since overlay is a child of wrapper, it will scale/transform with the image
        const leftPx = (hotspot.x / 100) * mapImage.naturalWidth;
        const topPx = (hotspot.y / 100) * mapImage.naturalHeight;
        
        hotspotBtn.style.left = `${leftPx}px`;
        hotspotBtn.style.top = `${topPx}px`;
        
        // Click handler
        hotspotBtn.onclick = (e) => {
            e.stopPropagation();
            navigateToLocation(hotspot.locationName);
        };
        
        overlay.appendChild(hotspotBtn);
    });
}

function navigateToLocation(locationName) {
    // Close the map
    closeMapModal();
    
    // Wait a moment for modal to close
    setTimeout(() => {
        // Check if it's an event or location
        const chapter = WITCHLIGHT_DATA.chapters.find(c => c.id === 'chapter1');
        
        // Try locations first
        const locationItems = document.querySelectorAll('.location-accordion-item');
        let found = false;
        
        locationItems.forEach((item, index) => {
            const header = item.querySelector('.location-accordion-header h4');
            if (header && header.textContent.trim() === locationName.trim()) {
                found = true;
                // Scroll to it
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Open it after scroll
                setTimeout(() => {
                    if (!item.classList.contains('active')) {
                        toggleLocationDetail('chapter1', index);
                    }
                    
                    // Highlight it
                    item.style.transition = 'box-shadow 0.3s ease';
                    item.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.8)';
                    
                    setTimeout(() => {
                        item.style.boxShadow = '';
                    }, 2500);
                }, 600);
            }
        });
        
        // If not found in locations, check events
        if (!found && chapter.events) {
            const eventIndex = chapter.events.findIndex(e => e.name === locationName);
            if (eventIndex !== -1) {
                // Scroll to events section
                const eventsSection = document.querySelector('#chapterContent .content-section');
                if (eventsSection) {
                    const eventsSectionHeader = Array.from(document.querySelectorAll('#chapterContent .content-section h3')).find(h => h.textContent.includes('Key Events'));
                    if (eventsSectionHeader) {
                        eventsSectionHeader.parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        
                        // Highlight event
                        const eventItems = eventsSectionHeader.parentElement.querySelectorAll('.event-item');
                        if (eventItems[eventIndex]) {
                            setTimeout(() => {
                                eventItems[eventIndex].style.transition = 'box-shadow 0.3s ease, background 0.3s ease';
                                eventItems[eventIndex].style.boxShadow = '0 0 30px rgba(138, 43, 226, 0.8)';
                                eventItems[eventIndex].style.background = 'rgba(138, 43, 226, 0.1)';
                                
                                setTimeout(() => {
                                    eventItems[eventIndex].style.boxShadow = '';
                                    eventItems[eventIndex].style.background = '';
                                }, 2500);
                            }, 600);
                        }
                    }
                }
            }
        }
    }, 300);
}

function closeMapModal() {
    const modal = document.querySelector('.map-modal-full') || document.querySelector('.map-modal-simple');
    if (modal) {
        modal.remove();
    }
    document.removeEventListener('keydown', handleMapModalEscape);
}

function handleMapModalEscape(e) {
    if (e.key === 'Escape') {
        closeMapModal();
    }
}

// Make functions globally available
window.selectChapter = selectChapter;
window.selectIntroduction = selectIntroduction;
window.selectAppendices = selectAppendices;
window.toggleEncounterDetail = toggleEncounterDetail;
window.toggleEncounterComplete = toggleEncounterComplete;
window.startEncounter = startEncounter;
window.showCharacterDetail = showCharacterDetail;
window.toggleLocationDetail = toggleLocationDetail;
window.toggleCharacterDetail = toggleCharacterDetail;
window.toggleFactionMember = toggleFactionMember;
window.toggleCreature = toggleCreature;
window.showMagicItemDetail = showMagicItemDetail;
window.showCreatureDetail = showCreatureDetail;
window.showCarnivalMap = showCarnivalMap;
window.closeMapModal = closeMapModal;

// ===== COMBAT TRACKER FUNCTIONALITY =====

let combatState = {
    active: false,
    round: 1,
    currentTurnIndex: 0,
    combatants: []
};

// Initialize Combat Tracker
function initCombatTracker() {
    // Load factions into dropdown
    if (window.WITCHLIGHT_FACTIONS) {
        const factionSelect = document.getElementById('factionSelect');
        if (factionSelect) {
            let html = '<option value="">Select Faction...</option>';
            
            WITCHLIGHT_FACTIONS.factions.forEach((faction, index) => {
                html += `<option value="faction-${index}">${faction.name}</option>`;
            });
            
            html += '<option value="creatures">Creatures</option>';
            
            factionSelect.innerHTML = html;
        }
    }
}

// Load faction members when faction is selected
function loadFactionMembers() {
    const factionSelect = document.getElementById('factionSelect');
    const memberSelect = document.getElementById('memberSelect');
    const preview = document.getElementById('quickStatBlockPreview');
    
    if (!factionSelect || !memberSelect) return;
    
    const selectedValue = factionSelect.value;
    memberSelect.innerHTML = '<option value="">Select NPC/Creature...</option>';
    preview.innerHTML = '';
    
    if (!selectedValue || !window.WITCHLIGHT_FACTIONS) return;
    
    if (selectedValue === 'creatures') {
        WITCHLIGHT_FACTIONS.creatures.forEach((creature, index) => {
            memberSelect.innerHTML += `<option value="creature-${index}">${creature.name} (CR ${creature.cr})</option>`;
        });
    } else if (selectedValue.startsWith('faction-')) {
        const factionIndex = parseInt(selectedValue.split('-')[1]);
        const faction = WITCHLIGHT_FACTIONS.factions[factionIndex];
        
        if (faction && faction.members) {
            faction.members.forEach((member, index) => {
                memberSelect.innerHTML += `<option value="member-${factionIndex}-${index}">${member.name} (CR ${member.cr})</option>`;
            });
        }
    }
}

// Display selected stat block preview
function displaySelectedStatBlock() {
    const factionSelect = document.getElementById('factionSelect');
    const memberSelect = document.getElementById('memberSelect');
    const preview = document.getElementById('quickStatBlockPreview');
    
    if (!memberSelect || !preview) return;
    
    const selectedValue = memberSelect.value;
    if (!selectedValue) {
        preview.innerHTML = '';
        return;
    }
    
    let statBlock = null;
    let name = '';
    
    if (selectedValue.startsWith('creature-')) {
        const creatureIndex = parseInt(selectedValue.split('-')[1]);
        const creature = WITCHLIGHT_FACTIONS.creatures[creatureIndex];
        if (creature) {
            statBlock = creature.statBlock;
            name = creature.name;
        }
    } else if (selectedValue.startsWith('member-')) {
        const parts = selectedValue.split('-');
        const factionIndex = parseInt(parts[1]);
        const memberIndex = parseInt(parts[2]);
        const member = WITCHLIGHT_FACTIONS.factions[factionIndex].members[memberIndex];
        if (member) {
            statBlock = member.statBlock;
            name = member.name;
        }
    }
    
    if (statBlock) {
        preview.innerHTML = `
            <div class="stat-block-quick-preview">
                <h4>${name}</h4>
                <p><strong>HP:</strong> ${statBlock.hp} | <strong>AC:</strong> ${statBlock.ac}</p>
                <p><strong>CR:</strong> ${statBlock.cr}</p>
            </div>
        `;
    }
}

// Quick add from stat block
function quickAddFromStatBlock() {
    const memberSelect = document.getElementById('memberSelect');
    if (!memberSelect || !memberSelect.value) {
        alert('Please select an NPC or creature first.');
        return;
    }
    
    const selectedValue = memberSelect.value;
    let statBlock = null;
    let name = '';
    let type = 'enemy';
    
    if (selectedValue.startsWith('creature-')) {
        const creatureIndex = parseInt(selectedValue.split('-')[1]);
        const creature = WITCHLIGHT_FACTIONS.creatures[creatureIndex];
        if (creature) {
            statBlock = creature.statBlock;
            name = creature.name;
        }
    } else if (selectedValue.startsWith('member-')) {
        const parts = selectedValue.split('-');
        const factionIndex = parseInt(parts[1]);
        const memberIndex = parseInt(parts[2]);
        const member = WITCHLIGHT_FACTIONS.factions[factionIndex].members[memberIndex];
        if (member) {
            statBlock = member.statBlock;
            name = member.name;
            
            // Determine type based on faction
            const factionName = WITCHLIGHT_FACTIONS.factions[factionIndex].name.toLowerCase();
            if (factionName.includes('valor') || factionName.includes('call')) {
                type = 'ally';
            }
        }
    }
    
    if (statBlock) {
        // Extract HP number from stat block
        const hpMatch = statBlock.hp.match(/(\d+)/);
        const hp = hpMatch ? parseInt(hpMatch[0]) : 10;
        
        // Extract AC number
        const acMatch = statBlock.ac.match(/(\d+)/);
        const ac = acMatch ? parseInt(acMatch[0]) : 10;
        
        // Auto-roll initiative
        const initiative = Math.floor(Math.random() * 20) + 1;
        
        // Add to combat
        const combatant = {
            id: Date.now() + Math.random(),
            name: name,
            initiative: initiative,
            hp: hp,
            maxHp: hp,
            ac: ac,
            type: type,
            statBlock: statBlock
        };
        
        combatState.combatants.push(combatant);
        sortCombatants();
        renderInitiativeList();
        
        // Clear selection
        memberSelect.value = '';
        document.getElementById('quickStatBlockPreview').innerHTML = '';
    }
}

// Roll initiative (d20)
function rollInitiative() {
    const initiativeInput = document.getElementById('combatantInitiative');
    if (initiativeInput) {
        const roll = Math.floor(Math.random() * 20) + 1;
        initiativeInput.value = roll;
        
        // Add animation
        initiativeInput.style.transform = 'scale(1.2)';
        setTimeout(() => {
            initiativeInput.style.transform = 'scale(1)';
        }, 200);
    }
}

// Start new combat
function startNewCombat() {
    combatState.active = true;
    combatState.round = 1;
    combatState.currentTurnIndex = 0;
    combatState.combatants = [];
    
    document.getElementById('startCombatBtn').style.display = 'none';
    document.getElementById('endCombatBtn').style.display = 'block';
    document.getElementById('combatActiveArea').style.display = 'block';
    document.getElementById('combatInstructions').style.display = 'none';
    document.getElementById('currentRound').textContent = '1';
    
    renderInitiativeList();
}

// End combat
function endCombat() {
    if (!confirm('Are you sure you want to end combat? All combatants will be removed.')) {
        return;
    }
    
    combatState.active = false;
    combatState.round = 1;
    combatState.currentTurnIndex = 0;
    combatState.combatants = [];
    
    document.getElementById('startCombatBtn').style.display = 'block';
    document.getElementById('endCombatBtn').style.display = 'none';
    document.getElementById('combatActiveArea').style.display = 'none';
    document.getElementById('combatInstructions').style.display = 'block';
    
    renderInitiativeList();
}

// Add combatant manually
function addCombatant() {
    const nameInput = document.getElementById('combatantName');
    const initiativeInput = document.getElementById('combatantInitiative');
    const hpInput = document.getElementById('combatantHP');
    const acInput = document.getElementById('combatantAC');
    const typeSelect = document.getElementById('combatantType');
    
    const name = nameInput.value.trim();
    const initiative = parseInt(initiativeInput.value);
    const hp = parseInt(hpInput.value) || 10; // Default to 10 if not provided
    const ac = parseInt(acInput.value) || 10; // Default to 10 if not provided
    const type = typeSelect.value;
    
    if (!name) {
        alert('Please enter a name.');
        return;
    }
    
    if (!initiative || initiative < 1) {
        alert('Please enter or roll initiative.');
        return;
    }
    
    const combatant = {
        id: Date.now() + Math.random(),
        name: name,
        initiative: initiative,
        hp: hp,
        maxHp: hp,
        ac: ac,
        type: type
    };
    
    combatState.combatants.push(combatant);
    sortCombatants();
    renderInitiativeList();
    
    // Clear form
    nameInput.value = '';
    initiativeInput.value = '';
    hpInput.value = '';
    acInput.value = '';
    typeSelect.value = 'player';
}

// Sort combatants by initiative (highest first)
function sortCombatants() {
    combatState.combatants.sort((a, b) => b.initiative - a.initiative);
}

// Render initiative list
function renderInitiativeList() {
    const initiativeList = document.getElementById('witchlightInitiativeList');
    if (!initiativeList) {
        console.error('Initiative list element not found');
        return;
    }
    
    if (combatState.combatants.length === 0) {
        initiativeList.innerHTML = '<p class="info-message">No combatants yet. Add some above!</p>';
        return;
    }
    
    let html = '';
    combatState.combatants.forEach((combatant, index) => {
        const isActive = combatState.active && index === combatState.currentTurnIndex;
        const isDead = combatant.hp <= 0;
        
        html += `
            <div class="initiative-item ${combatant.type} ${isActive ? 'active-turn' : ''} ${isDead ? 'dead' : ''}" data-id="${combatant.id}">
                <div class="initiative-item-header">
                    <div class="initiative-left">
                        <div class="initiative-badge">${combatant.initiative}</div>
                        <div class="initiative-info">
                            <h4>${combatant.name}</h4>
                            <span class="combatant-type">${combatant.type}</span>
                        </div>
                    </div>
                    <div class="initiative-right">
                        <div class="hp-display">
                            <input type="number" class="hp-input-inline" value="${combatant.hp}" 
                                   onchange="updateHP(${index}, this.value)" min="0" max="${combatant.maxHp}" />
                            <span class="hp-separator">/</span>
                            <span class="hp-max">${combatant.maxHp}</span>
                            <span>HP</span>
                        </div>
                        <div class="ac-display">
                            <span>AC</span>
                            <input type="number" class="ac-input-inline" value="${combatant.ac}" 
                                   onchange="updateAC(${index}, this.value)" min="1" max="30" />
                        </div>
                        <div class="initiative-actions-group">
                            <span style="color: var(--accent-gold); font-weight: 600;">Initiative:</span>
                            <input type="number" class="init-input-inline" value="${combatant.initiative}" 
                                   onchange="updateInitiative(${index}, this.value)" min="1" max="30" 
                                   title="Initiative" />
                        </div>
                        <div class="combatant-actions">
                            ${combatant.statBlock ? `<button class="btn-combatant-action" onclick="viewCombatantStatBlock(${index})" title="View Stat Block">📋</button>` : ''}
                            <button class="btn-combatant-action danger" onclick="removeCombatant(${index})" title="Remove">🗑️</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    initiativeList.innerHTML = html;
}

// Next turn
function nextTurn() {
    if (combatState.combatants.length === 0) return;
    
    combatState.currentTurnIndex++;
    
    if (combatState.currentTurnIndex >= combatState.combatants.length) {
        combatState.currentTurnIndex = 0;
        combatState.round++;
        document.getElementById('currentRound').textContent = combatState.round;
    }
    
    renderInitiativeList();
}

// Update HP
function updateHP(index, newHP) {
    const combatant = combatState.combatants[index];
    combatant.hp = Math.max(0, Math.min(combatant.maxHp, parseInt(newHP) || 0));
    renderInitiativeList();
}

// Update AC
function updateAC(index, newAC) {
    const combatant = combatState.combatants[index];
    combatant.ac = Math.max(1, parseInt(newAC) || 10);
    renderInitiativeList();
}

// Update initiative
function updateInitiative(index, newInit) {
    const combatant = combatState.combatants[index];
    const init = parseInt(newInit);
    if (isNaN(init) || init < 1) return;
    
    combatant.initiative = init;
    sortCombatants();
    renderInitiativeList();
}

// Remove combatant
function removeCombatant(index) {
    const combatant = combatState.combatants[index];
    if (!confirm(`Remove ${combatant.name} from combat?`)) return;
    
    combatState.combatants.splice(index, 1);
    
    // Adjust current turn if needed
    if (combatState.currentTurnIndex >= combatState.combatants.length) {
        combatState.currentTurnIndex = 0;
    }
    
    renderInitiativeList();
}

// View combatant stat block (accordion style in combat tracker)
function viewCombatantStatBlock(index) {
    const combatant = combatState.combatants[index];
    if (!combatant.statBlock) return;
    
    // Find the initiative item
    const initiativeItem = document.querySelector(`[data-id="${combatant.id}"]`);
    if (!initiativeItem) return;
    
    // Check if stat block is already showing
    let statBlockDiv = initiativeItem.querySelector('.stat-block-expanded');
    
    // Close all other stat blocks
    document.querySelectorAll('.stat-block-expanded').forEach(sb => {
        if (sb !== statBlockDiv) {
            sb.remove();
        }
    });
    
    if (statBlockDiv) {
        // Already showing, so close it
        statBlockDiv.remove();
        return;
    }
    
    // Create and insert stat block
    statBlockDiv = document.createElement('div');
    statBlockDiv.className = 'stat-block-expanded';
    statBlockDiv.innerHTML = renderStatBlockFull(combatant.statBlock);
    
    initiativeItem.appendChild(statBlockDiv);
}

// Start combat from encounter
function startCombatFromEncounter(chapterId, encounterId) {
    const encounters = WITCHLIGHT_DATA.encounters[chapterId];
    if (!encounters) return;
    
    const encounter = encounters.find(e => e.id === encounterId);
    if (!encounter) return;
    
    // Switch to combat tab
    switchWitchlightTab('combat');
    
    // Start combat if not active
    if (!combatState.active) {
        startNewCombat();
    }
    
    // Add creatures from encounter
    if (encounter.creatures && encounter.creatures.length > 0) {
        encounter.creatures.forEach(creatureName => {
            // Try to find stat block
            let statBlock = null;
            let hp = 20; // default
            let ac = 12; // default
            
            // Search in factions data
            if (window.WITCHLIGHT_FACTIONS) {
                // Check creatures
                const creature = WITCHLIGHT_FACTIONS.creatures.find(c => 
                    c.name.toLowerCase().includes(creatureName.toLowerCase()) ||
                    creatureName.toLowerCase().includes(c.name.toLowerCase())
                );
                
                if (creature && creature.statBlock) {
                    statBlock = creature.statBlock;
                    const hpMatch = statBlock.hp.match(/(\d+)/);
                    hp = hpMatch ? parseInt(hpMatch[0]) : 20;
                    const acMatch = statBlock.ac.match(/(\d+)/);
                    ac = acMatch ? parseInt(acMatch[0]) : 12;
                }
                
                // Check faction members if not found
                if (!statBlock) {
                    for (const faction of WITCHLIGHT_FACTIONS.factions) {
                        const member = faction.members.find(m => 
                            m.name.toLowerCase().includes(creatureName.toLowerCase()) ||
                            creatureName.toLowerCase().includes(m.name.toLowerCase())
                        );
                        
                        if (member && member.statBlock) {
                            statBlock = member.statBlock;
                            const hpMatch = statBlock.hp.match(/(\d+)/);
                            hp = hpMatch ? parseInt(hpMatch[0]) : 20;
                            const acMatch = statBlock.ac.match(/(\d+)/);
                            ac = acMatch ? parseInt(acMatch[0]) : 12;
                            break;
                        }
                    }
                }
            }
            
            // Add combatant
            const combatant = {
                id: Date.now() + Math.random(),
                name: creatureName,
                initiative: Math.floor(Math.random() * 20) + 1,
                hp: hp,
                maxHp: hp,
                ac: ac,
                type: 'enemy',
                statBlock: statBlock
            };
            
            combatState.combatants.push(combatant);
        });
        
        sortCombatants();
        renderInitiativeList();
    }
}

// Make combat functions globally available
window.startNewCombat = startNewCombat;
window.endCombat = endCombat;
window.addCombatant = addCombatant;
window.rollInitiative = rollInitiative;
window.nextTurn = nextTurn;
window.updateHP = updateHP;
window.updateAC = updateAC;
window.updateInitiative = updateInitiative;
window.removeCombatant = removeCombatant;
window.viewCombatantStatBlock = viewCombatantStatBlock;
window.loadFactionMembers = loadFactionMembers;
window.displaySelectedStatBlock = displaySelectedStatBlock;
window.quickAddFromStatBlock = quickAddFromStatBlock;
window.startCombatFromEncounter = startCombatFromEncounter;

// Initialize combat tracker when witchlight view loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (document.getElementById('factionSelect')) {
            initCombatTracker();
        }
    }, 500);
});

