# Khaled Alanazi | Personal Portfolio (Assignment 1)

A responsive personal portfolio built with plain **HTML, CSS and JavaScript**. This site is my portfolio, and I would love to keep improving it in the future. Its style is minimalistic and futuristic in a basic way.

**Live site:** <https://howiskhaled.github.io/202338530-KhaledAlanazi-assignment1/>

## Features

- **About Me**: editorial introduction, profile photo and time-based greeting
- **Skills**: four spacious rows of languages and tools I am learning
- **Projects**: two full-width showcases with images, descriptions and tags
- **Screenshot gallery**: click the Mizanyti screenshots to open a full-size viewer with 7 screens (arrow keys, buttons, swipe, Esc to close)
- **Contact**: a form with Name, Email and Message (front-end only, no backend)
- **English / Arabic**: a language toggle switches all the text to Arabic and the layout to right-to-left; the choice is remembered
- **Responsive**: checked from 320 px to 1920 px, with a native-dialog mobile menu
- **JavaScript interactivity**
  - Light theme by default; a colorful dark option remembers your choice
  - Language switcher (English / Arabic) with right-to-left layout
  - Time-of-day greeting in the about section
  - Slowly moving hero artwork and rotating scroll cue, with a pause control
  - Scroll-reveal animations
  - Screenshot gallery (lightbox) built on the native `<dialog>` element
  - Contact form validation with an explicit local-preview message; your draft is retained
- **Accessible**: skip link, semantic HTML, labelled form fields, visible focus styles, and `prefers-reduced-motion` support

## Tech stack

| Layer | Choice |
| --- | --- |
| Markup | HTML5 |
| Styling | CSS3 (custom properties, Grid, Flexbox, mobile-first media queries) |
| Behaviour | Vanilla JavaScript (ES6) |
| Fonts | Locally hosted Inter (English) and Tajawal (Arabic) fonts, with system fallbacks (no external requests) |

No frameworks, build tools or dependencies are needed.

## Project structure

```
.
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── i18n.js                          (English / Arabic translations and language switcher)
│   └── script.js
├── assets/
│   ├── fonts/
│   │   ├── InterVariable.woff2          (Inter variable font, hosted locally)
│   │   ├── OFL.txt                      (Inter licence)
│   │   ├── Tajawal-Regular.ttf          (Arabic font, hosted locally)
│   │   ├── Tajawal-Light.ttf
│   │   └── Tajawal-OFL.txt              (Tajawal licence)
│   └── images/
│       ├── favicon.svg
│       ├── liquid-light.svg             (hero background artwork)
│       ├── profile.jpg                  (profile photo, same as my GitHub avatar)
│       └── mizanyti-*.jpg               (7 screenshots of the Mizanyti app, sample data)
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

## Getting started (run locally)

You need only a web browser.

**Option 1: open the file**

1. Download or clone this repository.
2. Double-click `index.html`.

**Option 2: run a local server** (recommended, closer to a real deployment)

```bash
git clone https://github.com/howiskhaled/202338530-KhaledAlanazi-assignment1.git
cd 202338530-KhaledAlanazi-assignment1
python -m http.server 8000
```

Then open <http://localhost:8000>. On Windows you can use `py -m http.server 8000` instead. If you use VS Code, the **Live Server** extension works too.

### Deploying to GitHub Pages

1. Push the repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. After a minute or two the site is live at `https://howiskhaled.github.io/202338530-KhaledAlanazi-assignment1/`, which is the link at the top of this README.

## AI usage summary

I used **Claude Code** to write the first draft of the HTML, CSS and JavaScript. Then I used **Codex** to improve the UI and UX. I started with a blue theme but did not like it, so I took inspiration from [monopo.vn](https://monopo.vn), whose clean, minimalistic style I liked a lot. I asked Codex to imitate that style and to teach me the main techniques the website uses to achieve it. As with Claude, I also asked it to explain the features and how it built them. I later used Codex again to add the Arabic language feature. The "Driven by curiosity" theme is my own idea. I also edited the text on the page, such as the About Me section, and added a real photo of myself. The full details are in [`docs/ai-usage-report.md`](docs/ai-usage-report.md).

## Documentation

- [`docs/technical-documentation.md`](docs/technical-documentation.md): how the code is organised and why
- [`docs/ai-usage-report.md`](docs/ai-usage-report.md): how AI was used, and what I learned

## Author

**Khaled Alanazi** (ID 202338530), Computer Science student
GitHub: [@howiskhaled](https://github.com/howiskhaled)
