# Hangboard Trainer Web App

A modern web application for tracking and managing hangboard workouts.

## Features

### Workout Modes
- **Quick Start Pull-ups**: Default settings (10 reps × 3 sets, 60s rest)
- **Fixed Sets**: Customizable goal reps, sets, and rest periods
- **Max Reps Test**: Test your maximum reps with countdown
- **EMOM**: Every Minute On the Minute training
- **Hang Intervals**: Timed hangs with rest cycles

### Features
- Real-time workout tracking
- Progress visualization
- History and high scores
- Customizable settings
- Local storage persistence
- Responsive design

## How to Launch

### Option 1: Direct File Opening
1. Open `index.html` directly in Chrome by double-clicking it
2. Or right-click `index.html` → Open With → Chrome

### Option 2: Using Live Server (Recommended)
If you have Python installed:
```bash
cd HangboardWeb
python -m http.server 8000
```
Then open: http://localhost:8000

### Option 3: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"

## Usage

1. **Select a Workout**: Choose from Quick Start or configure a specific workout mode
2. **Configure Parameters**: Adjust reps, sets, time, or rounds as needed
3. **Start Workout**: Follow the on-screen prompts and timer
4. **Track Progress**: Watch your stats and progress bars in real-time
5. **Complete**: View summary stats and return to menu

## Settings

Access settings via the ⚙️ button in the top-right:
- Distance threshold (for ultrasonic sensor integration)
- Sleep timeout
- All settings are saved locally

## Data Persistence

Your data (total reps, max reps, settings) is automatically saved to your browser's localStorage.

## Browser Compatibility

- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## Future Enhancements

- ESP32 Bluetooth integration
- Real-time force sensor data
- Advanced analytics
- Workout history calendar
- Export workout data

