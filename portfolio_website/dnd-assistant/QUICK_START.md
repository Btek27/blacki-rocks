# Quick Start Guide - Web Edition

## 🚀 Getting Started in 30 Seconds

### Step 1: Open the App
Simply double-click `index.html` or open it in your web browser.

**OR** use a local server (recommended):
```bash
# In the 'web' folder, run:
python -m http.server 8000
# Then open: http://localhost:8000
```

### Step 2: Explore!
- Click any card on the home page
- Use the navigation bar at the top
- Everything saves automatically!

---

## 📱 What You'll See

### Home Page
Four beautiful cards:
- ⚔️ **Player Character Manager** - Track your character
- 🎲 **Dungeon Master Tools** - Manage encounters
- 📚 **Epic Monster Encyclopedia** - Browse epic monsters
- ♟️ **Chess Encounter** - Pre-built Omnivax encounter

### Navigation Bar
Sticky navigation at the top:
- Click any button to switch views
- Active view is highlighted in gold
- Mobile-friendly hamburger menu

---

## 🎮 Quick Feature Tour

### Player Character Manager
1. **View your character** - Name, class, level, HP, AC
2. **Adjust HP** - Click +/- buttons
3. **Edit character** - Click "Edit Character" button
4. **Take rests** - Short Rest or Long Rest buttons

### DM Tools
1. **Set the scene** - Type description, click "Set Scene"
2. **Add enemies** - Fill form, click "Add Enemy"
3. **Track damage** - Click damage buttons on enemy cards
4. **View log** - All actions logged automatically

### Epic Monster Encyclopedia
1. **Search** - Type monster name
2. **Filter** - Select category or CR range
3. **View details** - Click "View Details"
4. **Add to encounter** - Click "Add to Encounter"
5. **See CR stats** - Click "CR Stats"

### Chess Encounter
1. **Read scene** - Full description ready
2. **Track puzzle** - See wrong moves counter
3. **Apply consequences** - Click wrong move buttons
4. **Use taunts** - Click dialogue buttons
5. **Add Omnivax** - One-click add with modifiers
6. **Start combat** - Transition to combat phase

---

## 💾 Data Persistence

**Everything saves automatically!**
- Character data → localStorage
- Encounters → localStorage
- Log entries → localStorage
- Chess state → localStorage

**Your data persists:**
- Between sessions
- After closing browser
- Across page refreshes

**To clear data:**
- Open browser DevTools (F12)
- Application → Local Storage
- Delete entries starting with "dnd_"

---

## 🎨 Design Features

### Modern UI
- ✨ Smooth animations
- 🎨 Beautiful color scheme
- 📱 Fully responsive
- 🌙 Dark theme (easy on eyes)

### User-Friendly
- 🖱️ Intuitive navigation
- 📊 Visual HP indicators
- 🎯 Color-coded status
- ⚡ Fast performance

### Professional
- 🎲 D&D-themed styling
- 📖 Clear typography
- 🎭 Cinzel font for headers
- 💫 Polished interactions

---

## 🔥 Pro Tips

### Keyboard Navigation
- `Esc` - Close any modal
- Click outside modals to close
- Tab through form fields

### Mobile Use
- Hamburger menu on small screens
- Touch-friendly buttons
- Responsive layouts
- Swipe-friendly cards

### Workflow Tips
1. **Before session**: Set up characters and encounters
2. **During session**: Use DM Tools for tracking
3. **Epic battles**: Use Epic Encyclopedia
4. **Chess encounter**: Use pre-built mode

### Data Management
- Export: Copy from localStorage (DevTools)
- Import: Paste JSON into localStorage
- Backup: Screenshot important data
- Share: Send localStorage data to other DMs

---

## 🐛 Troubleshooting

**App not loading?**
- Check all files are in `web/` folder
- Ensure JavaScript is enabled
- Try a different browser

**Data not saving?**
- Check localStorage is enabled
- Clear browser cache
- Try incognito/private mode

**Styling looks wrong?**
- Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- Check `styles.css` is loaded
- Verify browser compatibility

**Monsters not showing?**
- Check browser console (F12) for errors
- Verify `data/epic-monsters.js` exists
- Ensure JavaScript files load in order

---

## 📚 Next Steps

1. **Try Player Mode** - Add your character
2. **Explore Epic Monsters** - Search for "Tiamat" or "Demogorgon"
3. **Set up Chess Encounter** - Click through the interface
4. **Run a Test Encounter** - Add enemies in DM Mode

---

## 🎉 You're Ready!

The web version is **more user-friendly** than the Python version:
- ✅ Better visual design
- ✅ Smoother interactions
- ✅ Mobile support
- ✅ Cross-platform
- ✅ Auto-save
- ✅ Modern UI/UX

**Just open `index.html` and start playing!** 🎲

---

*For full documentation, see `README.md`*

