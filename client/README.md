# 🕊️ ATG Chapel - Church Website

A modern, spiritual website for ATG Chapel featuring a narrative scroll-driven navigation system that creates a peaceful, engaging browsing experience.

## ✨ What's New: Scroll Navigation

We've reimagined the home page with:

- **📜 Narrative Scroll Layout** - Full-page sections that tell your story
- **🎯 Floating Action Hub** - Quick access navigation that doesn't get in the way
- **🌓 Theme Toggle** - Beautiful light and dark modes
- **💡 First-Time Guide** - Helpful onboarding for new visitors
- **🎨 Spiritual Animations** - Peaceful, faith-inspired visual effects

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Visit: `http://localhost:5173/`

**📖 New to this project?** Read [QUICK-START.md](./QUICK-START.md)

## 📁 Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── Section.jsx              # NEW: Reusable section
│   │   ├── FloatingHub.jsx          # NEW: Navigation hub
│   │   ├── Layout.jsx               # NEW: Page wrapper
│   │   ├── NavigationGuide.jsx      # NEW: User guide
│   │   └── SpiritualBackgroundEffects.jsx  # NEW: Visual effects
│   ├── pages/
│   │   ├── ScrollHome.jsx           # NEW: Narrative home
│   │   └── Home.jsx                 # Classic home (preserved)
│   ├── styles/
│   │   └── scroll-narrative.css     # NEW: Custom animations
│   └── App.jsx                      # Updated routing
├── tailwind.config.js               # NEW: Tailwind setup
├── postcss.config.js                # NEW: PostCSS config
└── Documentation/
    ├── QUICK-START.md               # 5-minute setup guide
    ├── IMPLEMENTATION-SUMMARY.md    # Full overview
    ├── SCROLL-NAVIGATION.md         # Usage guide
    ├── MIGRATION-GUIDE.md           # Transition help
    ├── TESTING-CHECKLIST.md         # Testing guide
    └── ARCHITECTURE-DIAGRAM.md      # Technical details
```

## 🎯 Key Features

### Narrative Scroll Experience
- 7 full-page sections (Welcome, Vision, Community, Sermons, Events, Give, Contact)
- Smooth scroll-snap behavior
- Parallax effects and animations
- Spiritual visual elements (light rays, particles, clouds)

### Floating Action Hub
- Circular floating button (bottom-right)
- Expands to show quick navigation menu
- 5 key actions: Watch Sermons, Prayer Request, Give, Events, About Us
- Fully keyboard accessible

### Spiritual Design
- Peaceful color palette (blues, purples, gold)
- Soft, slow animations (not flashy)
- Light/dark theme support
- Faith-inspired iconography

### Accessibility First
- WCAG AA compliant
- Keyboard navigable (Tab, Enter, Space, arrows)
- ARIA labels throughout
- Screen reader friendly
- Focus indicators

## 🎨 Customization

### Change Section Content
Edit `src/pages/ScrollHome.jsx`:
```jsx
<Section
  name="welcome"
  title="Your Title"
  subtitle="Your Subtitle"
>
  {/* Your content */}
</Section>
```

### Update Colors
Edit `tailwind.config.js`:
```js
spiritual: {
  light: '#f0f4ff',
  blue: '#6b9bd1',
  gold: '#d4af37',
  purple: '#8e7cc3',
}
```

### Modify Navigation Menu
Edit `src/components/FloatingHub.jsx`:
```js
const menuItems = [
  {
    id: 'item-id',
    icon: '🎧',
    label: 'Menu Label',
    action: 'scroll',
    target: 'section-name',
  },
  // Add more items...
];
```

## 🧭 Navigation

### Routes
- `/` - New scroll home (default)
- `/home-classic` - Original home with header/footer
- `/community` - Community page
- `/programs` - Programs page
- `/events` - Events page
- `/mission` - Mission page
- `/bible` - Bible notebook
- `/services` - Services page

### How Users Navigate
1. **Natural Scrolling** - Mouse, trackpad, touch, or keyboard
2. **Floating Hub** - Click "Guide" button for quick jumps
3. **Help Guide** - First-time overlay with instructions

## 📦 Tech Stack

### Core
- React 19.1.1
- React Router 7.9.4
- Vite 7.1.7

### New for Scroll Navigation
- Framer Motion - Animations
- React Scroll - Smooth scrolling
- Tailwind CSS - Styling

### Existing (Preserved)
- Bootstrap 5.3.8
- Bootstrap Icons
- AOS, GLightbox, Swiper

## 📚 Documentation

Comprehensive guides are available:

| Document | Purpose | Audience |
|----------|---------|----------|
| [QUICK-START.md](./QUICK-START.md) | Get running in 5 minutes | Everyone |
| [IMPLEMENTATION-SUMMARY.md](./IMPLEMENTATION-SUMMARY.md) | Full project overview | Project leads |
| [SCROLL-NAVIGATION.md](./SCROLL-NAVIGATION.md) | Feature details & usage | Developers |
| [MIGRATION-GUIDE.md](./MIGRATION-GUIDE.md) | Transition from old layout | Dev team |
| [TESTING-CHECKLIST.md](./TESTING-CHECKLIST.md) | Comprehensive testing | QA team |
| [ARCHITECTURE-DIAGRAM.md](./ARCHITECTURE-DIAGRAM.md) | Technical architecture | Architects |

## 🧪 Testing

Run through the [TESTING-CHECKLIST.md](./TESTING-CHECKLIST.md):

- [ ] Component functionality
- [ ] Navigation behavior
- [ ] Accessibility compliance
- [ ] Browser compatibility
- [ ] Mobile responsiveness
- [ ] Performance metrics

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy
Upload the `dist/` folder to your hosting provider.

## 🔄 Migration Path

### Current State
✅ New scroll layout is **default** (`/`)  
✅ Classic layout available (`/home-classic`)  
✅ Other pages unchanged  
✅ Both layouts fully functional

### Recommended Next Steps
1. **Gather feedback** (2 weeks)
2. **Optimize** (1 week)
3. **Expand to other pages** (4 weeks)
4. **Polish & launch** (1 week)

See [MIGRATION-GUIDE.md](./MIGRATION-GUIDE.md) for details.

## 🐛 Troubleshooting

### Common Issues

**Sections not snapping?**
- Clear browser cache
- Check scroll-snap CSS is applied

**Animations laggy?**
- Check Performance tab in DevTools
- Reduce motion in settings

**FloatingHub not visible?**
- Verify z-index is 50+
- Check for CSS conflicts

**Can't install dependencies?**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contributing

1. Read documentation files
2. Follow existing code patterns
3. Test thoroughly
4. Update docs if needed

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Performance

- Target: < 3s page load
- Target: 60fps animations
- Target: > 90 Lighthouse score
- Target: Zero accessibility errors

## 🎉 Credits

Built with ❤️ and faith for ATG Chapel.

Special thanks to:
- Design: Spiritual, peaceful aesthetics
- Development: Modern React best practices
- Accessibility: WCAG AA compliance
- Community: Feedback and testing

## 📞 Support

- 📖 Check documentation files first
- 🐛 Report bugs via GitHub issues
- 💡 Suggest features in team discussions
- 🙏 Pray for the project and community

## 📄 License

All rights reserved - ATG Chapel

---

**May this interface bring peace, connection, and faith to all who visit.** 🕊️

*Last Updated: October 19, 2025*

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
