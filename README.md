# Personal Portfolio Website

A modern, professional portfolio website showcasing personal projects with dark/light theme toggle and accordion-style project displays.

## Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Dark/Light Theme Toggle**: Switch between dark and light modes with preference saved to localStorage
- **Smooth Animations**: Scroll-based animations and smooth transitions throughout
- **Project Showcase**: Accordion-style project cards with detailed descriptions
- **Embedded Projects**: Two full projects integrated as separate pages

## Structure

```
portfolio_website/
├── index.html          # Main portfolio page
├── styles.css          # Global styles with theme support
├── script.js           # Interactive functionality
├── dnd-assistant/      # D&D Assistant project (embedded)
│   ├── index.html
│   ├── styles.css
│   ├── js/
│   └── data/
├── hangboard/          # Hangboard Trainer project (embedded)
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── README.md           # This file
```

## Projects Included

### 1. D&D Assistant - Epic Edition
A comprehensive web-based D&D companion featuring:
- Player character management
- DM tools for encounter tracking
- Chess puzzle encounter with Omnivax
- The Wild Beyond the Witchlight campaign guide

**Technologies**: HTML, CSS, JavaScript, Python

### 2. Hangboard Trainer
An interactive web application for climbing training:
- Multiple workout modes (Fixed Sets, Max Reps, EMOM, Intervals)
- Structured programs for all skill levels
- Real-time workout tracking and timers
- Progress tracking and statistics

**Technologies**: HTML, CSS, JavaScript

## Getting Started

1. Open `index.html` in your web browser
2. Fill in your personal information in the placeholders:
   - Name
   - Title/Role
   - About Me section
   - Skills & Technologies
   - Contact information

3. Customize the theme colors in `styles.css` if desired
4. Add your social media links in the footer section

## Customization

### Personal Information
Edit the following sections in `index.html`:
- `[Your Name]` - Your full name
- `[Your Title/Role]` - Your professional title
- About Me section paragraphs
- Skills categories and tags
- Social media links in footer

### Theme Colors
Modify the CSS variables in `styles.css` under `:root[data-theme="light"]` and `:root[data-theme="dark"]` to change colors:
```css
--accent-primary: #58a6ff;  /* Primary accent color */
--accent-hover: #79c0ff;    /* Hover state color */
```

### Adding More Projects
To add additional projects:
1. Copy the project files into a new subfolder
2. Add a new `.project-accordion` section in the Projects section of `index.html`
3. Update the project link to point to the new subfolder

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This portfolio template is open source and available for personal use.

## Contact

[Add your contact information here]

