# D&D Assistant - Web Edition

A modern, user-friendly web application for managing D&D characters, encounters, and epic monsters.

## Features

### 🎮 Player Character Manager
- Track HP, AC, and ability scores
- Manage spell slots
- Quick HP adjustment buttons
- Short and long rest functionality
- Character editing

### 🎲 Dungeon Master Tools
- Scene setting and description
- Enemy/NPC management
- HP tracking with color-coded indicators
- Encounter logging
- Damage application buttons

### 📚 Epic Monster Encyclopedia
- Browse 30+ epic monsters (CR 17-53)
- Search by name, filter by category or CR range
- View detailed stat blocks
- One-click add to encounters
- CR statistics reference

### ♟️ Chess Encounter: The Infinite Gambit
- Pre-built encounter with Omnivax
- Scene descriptions
- Chess puzzle tracker
- Wrong move consequences
- Omnivax dialogue/taunts
- Quick reference stat block
- Combat phase management

## Getting Started

### Option 1: Open Directly
Simply open `index.html` in a modern web browser (Chrome, Firefox, Edge, Safari).

### Option 2: Local Server (Recommended)
For best experience, use a local web server:

**Python:**
```bash
cd web
python -m http.server 8000
```
Then open http://localhost:8000

**Node.js:**
```bash
cd web
npx http-server -p 8000
```

**PHP:**
```bash
cd web
php -S localhost:8000
```

## File Structure

```
web/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── data/
│   ├── epic-monsters.js   # Epic monster database
│   └── chess-data.js      # Chess encounter data
├── js/
│   ├── app.js          # Main application controller
│   ├── player.js       # Player character manager
│   ├── dm.js           # DM tools
│   ├── epic.js         # Epic monster encyclopedia
│   └── chess.js        # Chess encounter mode
└── README.md           # This file
```

## Usage

### Navigation
- Use the top navigation bar to switch between views
- Click feature cards on the home page for quick access
- Mobile-friendly hamburger menu on small screens

### Data Persistence
All data is saved to browser localStorage:
- Character data persists between sessions
- Encounters are saved automatically
- Log entries are maintained
- Chess encounter state is preserved

### Keyboard Shortcuts
- `Esc` - Close modals
- Click outside modals to close

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Features Comparison

| Feature | Python Version | Web Version |
|---------|---------------|-------------|
| Player Character Manager | ✅ | ✅ |
| DM Tools | ✅ | ✅ |
| Epic Monster Encyclopedia | ✅ | ✅ |
| Chess Encounter | ✅ | ✅ |
| Data Persistence | ❌ | ✅ (localStorage) |
| Cross-platform | ❌ (Windows) | ✅ (All platforms) |
| Mobile Support | ❌ | ✅ |
| Offline Support | ✅ | ✅ |

## Customization

### Adding More Monsters
Edit `data/epic-monsters.js` and add entries to the `EPIC_MONSTERS` object following the existing format.

### Changing Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --accent-gold: #ffd700;
    --accent-purple: #8b44ff;
    /* etc. */
}
```

### Modifying Chess Encounter
Edit `data/chess-data.js` to change dialogue, consequences, or reference material.

## Troubleshooting

**Data not saving?**
- Check browser localStorage is enabled
- Clear browser cache if issues persist

**Monsters not showing?**
- Check browser console for JavaScript errors
- Ensure all files are in correct directories

**Styling looks broken?**
- Ensure `styles.css` is loaded
- Check browser compatibility

## Credits

Based on the Python D&D Assistant with enhanced UI/UX for web.

Epic Monster data from Epic Monster Updates v13.

## License

For personal use. D&D content property of Wizards of the Coast.

---

**Enjoy your epic D&D sessions!** 🎲⚔️🐉

