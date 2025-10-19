# ATG Chapel Machakos Website

Welcome to the website for ATG Chapel Machakos. This repository contains a static frontend (HTML/CSS/JS) and a small Node.js server used for newsletter subscriptions.

Where Divinity Meets Humanity.

## Features

- Home with hero carousel, featured sections, and contact info (`index.html`)
- About, Founders, Services, Events, and Mission pages
- Community and Programs microsites with custom carousels
- Media/Testimonials slider powered by Swiper
- Bible Notebook page that fetches passages from bible-api.com and saves notes locally (`Bible.html`)
- Newsletter subscription form hitting a simple Express API

## Tech stack

- HTML, CSS, JavaScript (no build step)
- Bootstrap 5, Bootstrap Icons
- AOS (Animate on Scroll), GLightbox, Isotope + imagesLoaded, Swiper, PureCounter
- Node.js + Express + Nodemailer (newsletter API)

## Repository structure

```
chrch-app/
├─ index.html                    # Main landing page
├─ Atg.html                      # Alternate/linked home page
├─ Atgevents.html                # Events detail page
├─ Atgfounders.html              # Founders page
├─ Atgservices.html              # Order of Services page
├─ Mission.html                  # Missions listing
├─ Bible.html                    # Bible reader + notes
├─ assets/
│  ├─ css/main.css               # Site styles (theme tokens + components)
│  ├─ js/main.js                 # UI behaviors + plugin inits
│  ├─ img/                       # Images (hero, events, mission, etc.)
│  └─ vendor/                    # Third-party libraries
├─ Atg Community/                # Community microsite (custom carousel)
│  ├─ Comm.html
│  ├─ app.js                     # Carousel logic
│  └─ style.css                  # Carousel styles
├─ Atg Programs/                 # Programs microsite (custom carousel)
│  ├─ index.html
│  ├─ app.js                     # Carousel logic
│  └─ style.css
├─ js/app.js                     # (Unused by main pages; legacy carousel script)
└─ server/                       # Newsletter API
   ├─ server.js                  # Express + Nodemailer endpoint
   ├─ package.json
   └─ .env.example               # Sample environment variables (create .env)
```

See also: `docs/ARCHITECTURE.md` for a deeper breakdown of code and behavior.

## Running locally

Frontend is static; you can open `index.html` directly, but for the newsletter form to target the local API it helps to serve the site from `localhost` so the script picks the correct base URL.

1) Start the newsletter API

- Prerequisite: Node.js 18+
- Create environment file
  - Copy `server/.env.example` to `server/.env` and fill in SMTP settings
- Install and run

```sh
cd server
npm install
npm start
```

The server listens on `PORT` (default 5000) and exposes `POST /api/newsletter`.

2) Serve the frontend (optional but recommended)

Serve the repo root on `http://localhost` (any port). When the hostname includes `localhost`, the footer form in `index.html` will POST to `http://localhost:5000/api/newsletter`.

Examples of static servers you can use:

- VS Code Live Server extension
- `python3 -m http.server 8080`
- `npx serve -l 8080 .`

Then open `http://localhost:8080/index.html`.

## Configuration

Newsletter API expects these environment variables (see `server/.env.example`):

- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
- RECEIVING_EMAIL – where admin notifications go
- PORT – optional (default 5000)

`index.html` dynamically picks the API base:

- If `window.location.hostname` includes `localhost` → `http://localhost:5000`
- Else → `https://atgchapelmks-0dm8.onrender.com`

## Notable behaviors

- `assets/js/main.js` wires up: sticky header scrolled state, mobile nav, preloader, scroll-top button, AOS, carousel indicators, Isotope filters, GLightbox, Swiper sliders, and a nav scrollspy.
- `Bible.html` calls `https://bible-api.com/` and stores notes in `localStorage` keyed by book+chapter.
- Community/Programs carousels are standalone (custom JS/CSS) and not tied to Bootstrap.

### Futuristic theme enhancements

- Dark mode toggle is injected at runtime (bottom-right). Preference persists in `localStorage` under `theme` and uses `[data-theme="dark"]` for CSS overrides.
- Utilities available: `.gradient-text`, `.neon-text`, `.glass`, `.card-glow`, `.btn-neon`.
- Images auto-get `loading="lazy"` if not specified.

## Known gaps and polish items

- Some navigation labels/links are placeholders (e.g., “Songs”). Previously a stray `ssss e` string appeared in a few menus; this has been cleaned up.
- Mixed links to `Atg.html` vs `index.html` as the home page.
- A few pages still reference `forms/newsletter.php`; the live/working newsletter uses the Node API.
- Duplicate or misspelled files exist (e.g., `Events-detais.html`). Consider deduping and fixing typos.

## License and usage

For church and community use. Contact ATG Chapel Machakos for permissions beyond this scope.

## Contact

- Mwatu Wa Ngoma Rd, MKS KFA Building, Machakos
- +254 714 888 016
- atgmksinfo@gmail.com

Blessings as you explore the site.
