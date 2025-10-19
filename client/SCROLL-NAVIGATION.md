# Narrative Scroll Navigation - Implementation Guide

## Overview
This implementation replaces the traditional navbar with a modern, narrative scroll-driven layout and a floating action hub for navigation, creating a peaceful, spiritual browsing experience.

## Features Implemented

### 1. **Narrative Scroll Navigation**
- ✅ Full-page sections: Welcome, Vision, Community, Sermons, Events, Give, Contact
- ✅ Smooth scroll-snap behavior (100vh sections)
- ✅ Fade and parallax effects using Framer Motion
- ✅ Spiritual backgrounds with soft imagery (clouds, light rays)
- ✅ Clean styling with Tailwind CSS

### 2. **Floating Hub Navigation**
- ✅ Circular floating button at bottom-right corner
- ✅ Expands to show radial menu with:
  - 🎧 Watch Sermons
  - 🙏 Prayer Request
  - ❤️ Give
  - 📅 Events
  - 🕊️ About Us
- ✅ Animated with Framer Motion
- ✅ Fully responsive and accessible
- ✅ "Guide Me" branding instead of generic "Menu"

### 3. **Component Structure**
```
/client/src/components
  ├── Section.jsx          # Reusable full-page section with animations
  ├── FloatingHub.jsx      # Expandable floating navigation
  ├── Layout.jsx           # Wrapper with FloatingHub and theme toggle
  └── [existing components...]

/client/src/pages
  ├── ScrollHome.jsx       # New narrative home page
  └── [existing pages...]

/client/src/styles
  └── scroll-narrative.css # Custom spiritual animations
```

## Usage

### Running the App
```bash
cd client
npm install
npm run dev
```

### Switching Between Layouts
The app now supports both the new scroll layout and the classic layout:

- **New Scroll Home** (default): `http://localhost:5173/`
- **Classic Home**: `http://localhost:5173/home-classic`

To make the classic layout default, edit `App.jsx`:
```jsx
<Route path="/" element={<Home />} /> // Classic
<Route path="/scroll" element={<ScrollHome />} /> // New layout
```

### Section Component Props
```jsx
<Section
  name="section-id"              // Required: for scroll navigation
  title="Section Title"          // Optional
  subtitle="Subtitle text"       // Optional
  background="bg-gradient-..."   // Optional: Tailwind classes
  backgroundImage="/path/img"    // Optional: background image
  darkText={true}                // Optional: text color (default: true)
>
  {/* Your content here */}
</Section>
```

### Floating Hub Customization
Edit `FloatingHub.jsx` to modify menu items:
```jsx
const menuItems = [
  {
    id: 'unique-id',
    icon: '🎧',
    label: 'Display Text',
    action: 'scroll',        // or 'modal', 'link'
    target: 'section-name',  // scroll target or function
    ariaLabel: 'Accessibility label',
  },
  // Add more items...
];
```

## Styling & Theming

### Custom Colors
Defined in `tailwind.config.js`:
```js
spiritual: {
  light: '#f0f4ff',
  blue: '#6b9bd1',
  gold: '#d4af37',
  purple: '#8e7cc3',
  white: '#ffffff',
}
```

### Animations
Available classes:
- `animate-float` - Gentle floating motion
- `animate-fadeIn` - Fade in effect
- `animate-slideUp` - Slide up from bottom
- `spiritual-glow` - Gentle glow effect
- `peaceful-pulse` - Soft pulsing
- `spiritual-gradient-text` - Gradient text

## Accessibility Features
- ✅ All buttons/links are keyboard navigable
- ✅ ARIA labels on all interactive elements
- ✅ Focus indicators with spiritual-gold outline
- ✅ Proper heading hierarchy
- ✅ Semantic HTML
- ✅ Color contrast meets WCAG standards

## Responsive Design
- ✅ Mobile-first approach
- ✅ Floating hub adjusts for mobile (smaller, repositioned)
- ✅ Sections stack properly on mobile
- ✅ Touch-friendly hit areas
- ✅ Optimized animations for mobile performance

## Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (scroll-snap with prefix)
- Mobile browsers: Optimized and tested

## Performance Optimization
- Lazy loading for images
- CSS animations (GPU-accelerated)
- Framer Motion with `whileInView` (only animates when visible)
- Minimal re-renders with proper React hooks

## Future Enhancements (Optional)

### 1. Background Music Toggle
```jsx
// Add to Layout.jsx
const [musicPlaying, setMusicPlaying] = useState(false);
<audio src="/ambient.mp3" loop autoPlay={musicPlaying} />
```

### 2. Section Highlighting
Track current section in view:
```jsx
const [activeSection, setActiveSection] = useState('welcome');
// Update FloatingHub to show active indicator
```

### 3. Advanced Parallax
Add depth with multiple layers:
```jsx
// In Section.jsx
<motion.div style={{ y: parallaxY }}>
  {/* Background layer */}
</motion.div>
```

## Troubleshooting

### Issue: Scroll snap not working
**Solution**: Ensure body has `scroll-snap-type: y proximity;` and sections have `scroll-snap-align: start;`

### Issue: Floating hub items not clicking
**Solution**: Check z-index. FloatingHub should be `z-50` or higher.

### Issue: Animations not smooth on mobile
**Solution**: Reduce animation complexity, use CSS transforms instead of layout changes.

### Issue: Prayer modal not opening
**Solution**: Ensure `PrayerRequestModal` component exists and has proper event listeners.

## Dependencies
- `react` - ^19.1.1
- `react-router-dom` - ^7.9.4
- `framer-motion` - Latest
- `react-scroll` - Latest
- `tailwindcss` - Latest

## Credits
Designed for ATG Chapel with love and faith. May this interface bring peace and connection to all who visit. 🕊️
