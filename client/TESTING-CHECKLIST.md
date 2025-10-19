# Testing Checklist for Scroll Navigation

## ✅ Component Tests

### Section Component
- [ ] Section renders with all props
- [ ] Background gradients display correctly
- [ ] Background images load and display with overlay
- [ ] Dark/light text switches based on `darkText` prop
- [ ] Scroll snap behavior works (sections align properly)
- [ ] Floating particles animate smoothly
- [ ] Scroll indicator appears and animates
- [ ] Content fades in on scroll into view
- [ ] Responsive on mobile (text size, spacing)

### FloatingHub Component
- [ ] Button appears in bottom-right corner
- [ ] Button has pulsing animation when closed
- [ ] Clicking opens menu with all items
- [ ] Menu items fade in with stagger effect
- [ ] Clicking menu item scrolls to correct section
- [ ] Prayer Request opens modal
- [ ] Clicking outside or X closes menu
- [ ] Icons and labels display correctly
- [ ] Hover effects work on all items
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Mobile: Button and menu are properly sized

### Layout Component
- [ ] Theme toggle button appears top-right
- [ ] Theme toggle switches between light/dark
- [ ] Theme persists in localStorage
- [ ] FloatingHub renders
- [ ] NavigationGuide renders
- [ ] PrayerRequestModal is accessible

### NavigationGuide Component
- [ ] Guide shows automatically on first visit
- [ ] Help button (💡) appears bottom-left
- [ ] Clicking help button opens guide
- [ ] Guide displays all navigation tips
- [ ] "Got it" button closes guide
- [ ] Guide doesn't show again after dismissal
- [ ] Backdrop blur effect works
- [ ] Animations smooth (scale, fade)
- [ ] Clicking backdrop closes guide

### SpiritualBackgroundEffects Component
- [ ] `light-rays` variant shows moving rays
- [ ] `clouds` variant shows floating clouds
- [ ] `particles` variant shows animated particles
- [ ] Effects don't interfere with text readability
- [ ] Animations are GPU-accelerated (no jank)
- [ ] Effects scale properly on mobile

## ✅ Page Tests

### ScrollHome Page
- [ ] All 7 sections render in order
- [ ] Scroll snap works between sections
- [ ] Welcome section shows particles
- [ ] Vision section shows with background image
- [ ] Community section displays correctly
- [ ] Sermons section shows 2 cards
- [ ] Events section with call-to-action
- [ ] Give section with scripture quote
- [ ] Contact section with 3 info cards
- [ ] All buttons have hover effects
- [ ] Links navigate correctly
- [ ] Responsive on mobile/tablet/desktop

## ✅ Navigation Tests

### Scroll Behavior
- [ ] Smooth scrolling between sections
- [ ] Mouse wheel scrolling works
- [ ] Trackpad scrolling works
- [ ] Touch scrolling works (mobile)
- [ ] Keyboard scrolling works (Space, arrows)
- [ ] Scroll indicator animates
- [ ] No jump or jitter between sections

### FloatingHub Navigation
- [ ] "Watch Sermons" scrolls to Sermons section
- [ ] "Prayer Request" opens prayer modal
- [ ] "Give" scrolls to Give section
- [ ] "Events" scrolls to Events section
- [ ] "About Us" scrolls to Vision section
- [ ] Scroll offset accounts for fixed elements
- [ ] Smooth scroll animation (800ms)

## ✅ Accessibility Tests

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] FloatingHub menu accessible via keyboard
- [ ] Enter/Space activates buttons
- [ ] Escape closes menus/modals
- [ ] Focus indicators visible (gold outline)
- [ ] No keyboard traps

### Screen Reader
- [ ] All buttons have aria-labels
- [ ] Headings in correct hierarchy (h1, h2, h3)
- [ ] Landmarks (main, nav, section) present
- [ ] Images have alt text
- [ ] Links have descriptive text
- [ ] FloatingHub aria-expanded state updates

### Color Contrast
- [ ] Text meets WCAG AA standards (4.5:1)
- [ ] Dark mode has sufficient contrast
- [ ] Icons are distinguishable
- [ ] Focus indicators are visible

## ✅ Performance Tests

### Loading
- [ ] Page loads in < 3 seconds
- [ ] Images lazy load
- [ ] No layout shift (CLS)
- [ ] Smooth 60fps animations
- [ ] No memory leaks

### Mobile Performance
- [ ] Animations don't lag on mobile
- [ ] Battery usage is reasonable
- [ ] Touch interactions responsive
- [ ] Scroll performance smooth

## ✅ Browser Compatibility

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] Chrome Mobile (Android)
- [ ] Safari (iOS)
- [ ] Samsung Internet
- [ ] Firefox Mobile

### Specific Features
- [ ] CSS scroll-snap works in all browsers
- [ ] Framer Motion animations work
- [ ] Backdrop-blur supported or degrades gracefully
- [ ] Gradient text works or falls back

## ✅ Responsive Design Tests

### Breakpoints
- [ ] Mobile (< 768px): Single column, adjusted spacing
- [ ] Tablet (768px - 1024px): Optimized layout
- [ ] Desktop (> 1024px): Full layout
- [ ] Large screens (> 1920px): Content centered

### Mobile-Specific
- [ ] FloatingHub smaller on mobile
- [ ] Section height works on short screens
- [ ] Text size readable without zoom
- [ ] Touch targets at least 44x44px
- [ ] No horizontal scroll

## ✅ Edge Cases

### Content Tests
- [ ] Long titles don't overflow
- [ ] Missing images show placeholder
- [ ] Empty sections handle gracefully
- [ ] Special characters display correctly

### User Scenarios
- [ ] First-time visitor sees guide
- [ ] Returning visitor doesn't see guide
- [ ] User with dark mode preference
- [ ] User with reduced motion preference
- [ ] User with slow connection

## ✅ Integration Tests

### Router Integration
- [ ] "/" route loads ScrollHome
- [ ] "/home-classic" loads classic Home
- [ ] Other routes maintain header/footer
- [ ] Back button works correctly
- [ ] URL updates don't break scroll

### Modal Integration
- [ ] Prayer modal opens from FloatingHub
- [ ] Prayer modal doesn't break scroll
- [ ] Multiple modals don't conflict

### Theme Integration
- [ ] Theme persists across navigation
- [ ] Theme affects all components
- [ ] System theme detection works

## 🐛 Bug Checklist

### Known Issues to Watch
- [ ] No double scrolling on trackpad
- [ ] No flash of unstyled content
- [ ] No z-index conflicts
- [ ] No animation conflicts with browser back/forward
- [ ] No memory leaks from event listeners

## 📱 Device Testing

### Minimum Devices to Test
- [ ] iPhone (iOS Safari)
- [ ] Android phone (Chrome)
- [ ] iPad (Safari)
- [ ] Android tablet
- [ ] Windows laptop (Chrome, Edge)
- [ ] MacBook (Safari, Chrome)

## 🚀 Deployment Checklist

### Before Deployment
- [ ] All tests pass
- [ ] No console errors
- [ ] No console warnings
- [ ] Build succeeds (`npm run build`)
- [ ] Preview build works (`npm run preview`)
- [ ] Environment variables set
- [ ] Analytics configured (if any)

### After Deployment
- [ ] Production URL loads correctly
- [ ] All assets load (images, fonts)
- [ ] HTTPS works
- [ ] Performance metrics good (Lighthouse)
- [ ] No broken links
- [ ] SEO metadata correct

## 📊 Success Metrics

### User Experience
- Target: < 3s page load
- Target: 60fps animations
- Target: > 90 Lighthouse score
- Target: Zero accessibility errors
- Target: < 5% bounce rate increase

---

**Testing Notes:**
- Use actual devices, not just browser dev tools
- Test with slow network throttling (3G)
- Test with different screen sizes, not just preset breakpoints
- Have someone unfamiliar with the site test it
- Check analytics after launch for real-world usage patterns
