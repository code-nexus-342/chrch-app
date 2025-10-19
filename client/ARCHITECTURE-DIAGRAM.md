# Component Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         App.jsx (Router)                         │
│                                                                  │
│  Routes:                                                         │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ /              → ScrollHome (New)                       │    │
│  │ /home-classic  → Header + Home + Footer (Classic)      │    │
│  │ /community     → Header + Community + Footer           │    │
│  │ /events        → Header + Events + Footer              │    │
│  │ ...                                                     │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ScrollHome.jsx (New Home)                     │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                    Layout Component                     │    │
│  │  ┌──────────────────────────────────────────────┐      │    │
│  │  │ Theme Toggle (top-right)                     │      │    │
│  │  │ FloatingHub (bottom-right)                   │      │    │
│  │  │ NavigationGuide (bottom-left help button)    │      │    │
│  │  │ PrayerRequestModal (conditional)             │      │    │
│  │  └──────────────────────────────────────────────┘      │    │
│  │                                                         │    │
│  │  Main Content:                                          │    │
│  │  ┌────────────────────────────────────────────┐        │    │
│  │  │ Section: Welcome                            │        │    │
│  │  │  - SpiritualBackgroundEffects (particles)   │        │    │
│  │  │  - Title, subtitle, CTA button              │        │    │
│  │  └────────────────────────────────────────────┘        │    │
│  │  ┌────────────────────────────────────────────┐        │    │
│  │  │ Section: Vision                             │        │    │
│  │  │  - Background image with overlay            │        │    │
│  │  │  - 3 value cards (Worship, Fellowship, etc) │        │    │
│  │  └────────────────────────────────────────────┘        │    │
│  │  ┌────────────────────────────────────────────┐        │    │
│  │  │ Section: Community                          │        │    │
│  │  │  - Description, links to /community         │        │    │
│  │  └────────────────────────────────────────────┘        │    │
│  │  ┌────────────────────────────────────────────┐        │    │
│  │  │ Section: Sermons                            │        │    │
│  │  │  - Service times, watch online link         │        │    │
│  │  └────────────────────────────────────────────┘        │    │
│  │  ┌────────────────────────────────────────────┐        │    │
│  │  │ Section: Events                             │        │    │
│  │  │  - Event overview, link to /events          │        │    │
│  │  └────────────────────────────────────────────┘        │    │
│  │  ┌────────────────────────────────────────────┐        │    │
│  │  │ Section: Give                               │        │    │
│  │  │  - Scripture, donation buttons              │        │    │
│  │  └────────────────────────────────────────────┘        │    │
│  │  ┌────────────────────────────────────────────┐        │    │
│  │  │ Section: Contact                            │        │    │
│  │  │  - Contact info, message button             │        │    │
│  │  └────────────────────────────────────────────┘        │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
ScrollHome
├── Layout
│   ├── ThemeToggle (button)
│   ├── FloatingHub
│   │   ├── MainButton (floating circular)
│   │   └── MenuItem[] (expandable menu)
│   │       ├── 🎧 Watch Sermons (ScrollLink)
│   │       ├── 🙏 Prayer Request (modal trigger)
│   │       ├── ❤️ Give (ScrollLink)
│   │       ├── 📅 Events (ScrollLink)
│   │       └── 🕊️ About Us (ScrollLink)
│   ├── NavigationGuide
│   │   ├── HelpButton (💡)
│   │   └── GuideModal (first-time tips)
│   └── PrayerRequestModal
└── Sections (scroll container)
    ├── Section (Welcome)
    │   └── SpiritualBackgroundEffects (particles)
    ├── Section (Vision)
    ├── Section (Community)
    ├── Section (Sermons)
    ├── Section (Events)
    ├── Section (Give)
    └── Section (Contact)
```

## Data Flow

```
User Interaction Flow:
┌──────────────┐
│  User Loads  │
│    Page      │
└──────┬───────┘
       │
       ▼
┌──────────────────┐     ┌─────────────────────┐
│ First visit?     │────>│ Show NavigationGuide│
│ (localStorage)   │ Yes │ (auto after 2s)     │
└──────┬───────────┘     └─────────────────────┘
       │ No
       ▼
┌──────────────────────────┐
│ ScrollHome Renders       │
│ - All sections loaded    │
│ - Scroll snap enabled    │
│ - Animations ready       │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────────────────────────┐
│ User Navigation Options:                      │
│                                               │
│ 1. Natural Scroll                             │
│    ├─> Mouse wheel                            │
│    ├─> Trackpad                               │
│    ├─> Touch (mobile)                         │
│    └─> Keyboard (Space, arrows)               │
│                                               │
│ 2. FloatingHub                                │
│    ├─> Click to expand                        │
│    ├─> Select menu item                       │
│    └─> Smooth scroll to section               │
│                                               │
│ 3. NavigationGuide                            │
│    ├─> Click help button (💡)                 │
│    └─> Learn navigation methods               │
└───────────────────────────────────────────────┘
```

## State Management

```
App State:
├── Router State (React Router)
│   └── Current route path
│
├── Layout State
│   ├── theme: 'light' | 'dark' (localStorage)
│   └── [Component states below]
│
├── FloatingHub State
│   └── isOpen: boolean
│
├── NavigationGuide State
│   ├── isVisible: boolean
│   └── hasSeenGuide: boolean (localStorage)
│
└── PrayerRequestModal State
    └── isOpen: boolean (from existing component)
```

## Styling Architecture

```
Styling Layers:

1. Base (index.css)
   ├── Tailwind directives (@tailwind base, components, utilities)
   ├── CSS variables (--spiritual-light, --spiritual-blue, etc.)
   └── Smooth scrolling, custom scrollbar

2. Tailwind Config (tailwind.config.js)
   ├── Custom colors (spiritual palette)
   ├── Custom animations (float, fadeIn, slideUp)
   └── Extended utilities

3. Component Styles (scroll-narrative.css)
   ├── Light ray animations
   ├── Cloud animations
   ├── Spiritual glows and pulses
   ├── Dark theme overrides
   └── Accessibility focus styles

4. Inline Styles (in components)
   ├── Dynamic backgrounds
   ├── Framer Motion variants
   └── Conditional styling

5. Legacy Styles (preserved)
   ├── App.css
   ├── custom-pages.css
   └── mobile-nav-fix.css
```

## Animation Timeline

```
Section Enter Animation:
─────────────────────────────────────────────────────>
                                                 time

0ms                     ┌─ Container fades in (800ms)
│                       │
│                       │  ┌─ Title slides up (600ms)
│                       │  │
│                       │  │  ┌─ Subtitle slides up (600ms)
│                       │  │  │
│                       │  │  │  ┌─ Content slides up (600ms)
│                       │  │  │  │
▼                       ▼  ▼  ▼  ▼
┌───────────┬────────────┬───┬───┬────>
│  Trigger  │ Container  │ T │ S │ C
│  (scroll  │  opacity   │ i │ u │ o
│   into    │   0 → 1    │ t │ b │ n
│   view)   │            │ l │ t │ t
│           │            │ e │ i │ e
│           │            │   │ t │ n
│           │            │   │ l │ t
│           │            │   │ e │
└───────────┴────────────┴───┴───┴────>
            └─ stagger: 200ms gap ─┘
```

## File Dependencies

```
ScrollHome.jsx
├── React (hooks: useEffect)
├── framer-motion (motion, AnimatePresence)
├── react-router-dom (Link)
├── react-scroll (Link as ScrollLink)
├── Layout.jsx
│   ├── FloatingHub.jsx
│   │   ├── framer-motion
│   │   ├── react-scroll
│   │   └── react-router-dom
│   ├── NavigationGuide.jsx
│   │   └── framer-motion
│   └── PrayerRequestModal.jsx (existing)
├── Section.jsx
│   ├── framer-motion
│   ├── react-scroll (Element)
│   └── PropTypes
└── SpiritualBackgroundEffects.jsx
    ├── framer-motion
    └── PropTypes
```

## CSS Class Naming Convention

```
Tailwind Utilities:
- Spacing: px-4, py-6, mb-8, etc.
- Colors: bg-spiritual-blue, text-gray-800, etc.
- Layout: flex, grid, items-center, etc.
- Responsive: sm:text-lg, md:grid-cols-3, etc.

Custom Classes:
- .scroll-section (section snap alignment)
- .scroll-container (parent container)
- .spiritual-glow (gentle glow animation)
- .peaceful-pulse (pulse animation)
- .spiritual-gradient-text (gradient text)
- .light-ray, .cloud (background effects)

Component Classes:
- .floating-hub (FloatingHub container)
- .menu-item (FloatingHub menu items)
- .navigation-guide (NavigationGuide overlay)
- .theme-toggle (theme button)
```

## Accessibility Tree

```
<main> (landmark)
  └── <Layout>
      ├── <button> "Toggle theme" (aria-label)
      │
      ├── <FloatingHub>
      │   ├── <button> "Open navigation menu"
      │   │            (aria-expanded, aria-label)
      │   └── <nav> (aria-label="Quick navigation")
      │       ├── <a> "Navigate to Sermons" (aria-label)
      │       ├── <button> "Open Prayer Request" (aria-label)
      │       ├── <a> "Navigate to Give" (aria-label)
      │       ├── <a> "Navigate to Events" (aria-label)
      │       └── <a> "Navigate to About" (aria-label)
      │
      ├── <NavigationGuide>
      │   ├── <button> "Show navigation guide" (aria-label)
      │   └── <dialog> (role="dialog", aria-modal)
      │       └── <button> "Close guide" (aria-label)
      │
      └── <Sections>
          ├── <section> name="welcome" (aria-labelledby)
          │   └── <h2> id="welcome-title"
          ├── <section> name="vision" (aria-labelledby)
          │   └── <h2> id="vision-title"
          └── ... (more sections)
```

## Performance Considerations

```
Optimization Strategy:

1. Code Splitting
   - React.lazy() for heavy components
   - Dynamic imports for routes

2. Image Optimization
   - WebP format with JPG fallback
   - Lazy loading (loading="lazy")
   - Responsive images (srcSet)

3. Animation Optimization
   - GPU-accelerated properties (transform, opacity)
   - requestAnimationFrame for smooth 60fps
   - Reduce motion for accessibility

4. Bundle Size
   - Framer Motion: ~30KB gzipped
   - React Scroll: ~5KB gzipped
   - Tailwind: ~10KB (purged)
   - Total JS: ~200KB (acceptable)

5. Render Optimization
   - whileInView (only animate visible)
   - viewport: { once: true } (animate once)
   - Memoization for expensive renders
```

This architecture diagram provides a visual understanding of how all components fit together and interact. The new scroll navigation system is modular, maintainable, and built with best practices. 🕊️
