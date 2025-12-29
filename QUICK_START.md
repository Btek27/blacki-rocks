# Portfolio Website - Quick Start Guide

## 🎉 Your Portfolio is Ready!

Your modern portfolio website has been successfully created with both of your projects embedded!

## 📁 What Was Created

### Main Portfolio Files
- `index.html` - Main portfolio page with all sections
- `styles.css` - Modern styling with dark/light theme support
- `script.js` - Interactive features (accordion, theme toggle, animations)
- `README.md` - Documentation

### Embedded Projects
1. **dnd-assistant/** - Full D&D Assistant web app
2. **hangboard/** - Complete Hangboard Trainer app

## 🚀 How to Use

### Step 1: Open Your Portfolio
1. Navigate to: `c:\Viki Ai\Viki-Ai\portfolio_website\`
2. Double-click `index.html` to open in your browser
3. Or right-click and select "Open with" → your preferred browser

### Step 2: Customize Your Information

Open `index.html` in a text editor and replace these placeholders:

#### Hero Section (Lines ~45-60)
```html
<span class="name">[Your Name]</span>
<p class="hero-subtitle">[Your Title/Role]</p>
<p class="hero-description">
    [Brief introduction about yourself]
</p>
```

#### About Section (Lines ~75-90)
Replace the three paragraphs with your background, experience, and interests.

#### Skills Section (Lines ~95-120)
Update the skill tags with your actual skills:
```html
<span class="skill-tag">HTML</span>
<span class="skill-tag">CSS</span>
<!-- Add more as needed -->
```

#### Footer (Lines ~235-245)
Add your social media links and contact info.

### Step 3: Test Your Projects

Click on each project accordion to expand it, then click "View Project →" to:
- **D&D Assistant**: Opens at `/dnd-assistant/index.html`
- **Hangboard Trainer**: Opens at `/hangboard/index.html`

Both projects open as separate pages within your portfolio site!

## ✨ Features You Have

### 1. Theme Toggle
- **Dark Mode** (default): Modern dark theme
- **Light Mode**: Click the toggle switch in the nav bar
- Your preference is automatically saved

### 2. Accordion Projects
- Click project headers to expand/collapse
- Shows description, technologies, features, and preview
- "View Project" button navigates to full project page

### 3. Smooth Navigation
- Click nav links to smoothly scroll to sections
- Active section is automatically highlighted
- Responsive on all devices

### 4. Animations
- Fade-in effects on scroll
- Smooth transitions
- Interactive hover states

## 🎨 Customization Tips

### Change Accent Color
In `styles.css`, find the theme variables (lines 7-50) and modify:
```css
--accent-primary: #58a6ff;  /* Your preferred color */
--accent-hover: #79c0ff;    /* Hover state color */
```

### Add More Projects
1. Create a new folder in `portfolio_website/`
2. Copy your project files there
3. Add a new accordion section in `index.html` following the existing pattern
4. Update the link: `href="your-project-folder/index.html"`

### Modify Layout
All sections are in `index.html`:
- **Home**: Lines ~43-65
- **About**: Lines ~68-93
- **Skills**: Lines ~96-125
- **Projects**: Lines ~128-220

## 📱 Responsive Design

Your portfolio automatically adapts to:
- **Desktop**: Full layout with all features
- **Tablet**: Adjusted spacing and sizing
- **Mobile**: Stacked layout, hidden nav menu (ready for mobile menu if needed)

## 🔧 Common Tasks

### Update Project Description
Edit the `.project-description` paragraph for each project in `index.html`

### Add New Skills
In the Skills section, add more `.skill-tag` elements:
```html
<span class="skill-tag">New Skill</span>
```

### Change Default Theme
In `script.js`, line 6, change:
```javascript
const savedTheme = localStorage.getItem('theme') || 'light'; // Changed to light
```

## 🌐 Deployment

To put your portfolio online:

### Option 1: GitHub Pages (Free)
1. Create a GitHub repository
2. Upload all files from `portfolio_website/`
3. Enable GitHub Pages in repository settings
4. Your site will be at: `username.github.io/repository-name`

### Option 2: Netlify (Free)
1. Drag and drop the `portfolio_website` folder to Netlify
2. Get instant deployment with custom domain support

### Option 3: Traditional Hosting
1. Upload all files via FTP to your web host
2. Ensure `index.html` is in the root directory

## 📋 Checklist

Before sharing your portfolio:
- [ ] Replace all `[Your Name]` placeholders
- [ ] Fill in About Me section
- [ ] Update Skills & Technologies
- [ ] Test both project links
- [ ] Add social media/contact links
- [ ] Test on mobile device
- [ ] Test theme toggle
- [ ] Check all accordions expand/collapse correctly

## 🆘 Troubleshooting

**Projects not loading?**
- Verify folder names match the links in `index.html`
- Check that both `/dnd-assistant/` and `/hangboard/` exist

**Theme toggle not working?**
- Check browser console for JavaScript errors
- Ensure `script.js` is in the same folder as `index.html`

**Styling looks off?**
- Verify `styles.css` is in the correct location
- Check for any missing CSS files in subfolders

## 🎯 Next Steps

1. Open `index.html` and fill in your personal information
2. Test all features in your browser
3. Customize colors and styles to your preference
4. Add screenshots of your projects (optional)
5. Deploy to your preferred hosting platform

Enjoy your new portfolio! 🚀

