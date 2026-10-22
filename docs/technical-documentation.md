# Technical documentation

## Overview

A static, single-page portfolio built with HTML, CSS and vanilla JavaScript. There is no framework, build step, backend or analytics. Open `index.html` directly or serve the project with a local HTTP server.

| File | Purpose |
| --- | --- |
| `index.html` | Semantic page structure, project content, form and native dialogs |
| `css/styles.css` | Design tokens, responsive layouts, theme, motion and focus styles |
| `js/i18n.js` | English/Arabic translations and the language switcher (loaded before `script.js`) |
| `js/script.js` | Navigation, theme, motion, greeting, gallery and form validation |
| `assets/images/liquid-light.svg` | Original vector atmosphere with displaced gradients and soft flowing folds |
| `assets/fonts/InterVariable.woff2` | Locally hosted Inter variable font, with its SIL Open Font License in `OFL.txt` |
| `assets/fonts/Tajawal-Regular.ttf`, `Tajawal-Light.ttf` | Locally hosted Arabic font, with its SIL Open Font License in `Tajawal-OFL.txt` |

## Visual system

The September 2026 redesign retains the supplied Monopo Saigon reference's large light-weight headlines, spacious editorial layout, sharp image edges and 75px pill actions. Following the user's color update, the canvas combines warm cream, pale sage, deep green and peach, with terracotta accents and a plum portfolio showcase. Project screenshots retain their original colors, and the portfolio preview reuses the colorful hero artwork. Only the childhood portrait uses `filter: grayscale(1)`, in both themes.

The centered content area is capped at 1078px. The hero and inverse skills section extend across the viewport. Desktop sections use asymmetric columns and single-column project presentations. At 700px and below, content becomes a vertical layout and an accessible mobile menu replaces the desktop navigation. A 1000px breakpoint adjusts spacing for tablets.

The default theme is light. A saved dark preference is respected on subsequent visits. The dark option uses deep green and burgundy surfaces with peach accents and warm light text. Initial theme selection runs before CSS to avoid a flash. The fixed transparent header changes foreground between white and the current text color according to the content behind it. The browser theme color is read from the CSS background token.

## Page structure

1. `#home`: atmospheric hero, display headline, scroll cue and motion toggle.
2. `#about`: introduction, time-based greeting and original profile photo.
3. `#projects`: Mizanyti screenshot composition and portfolio preview.
4. `#skills`: four editorial rows listing the tools being learned.
5. `#contact`: GitHub link, local demo form and footer.
6. `#mobile-menu` and `#gallery`: native modal dialogs.

## Behavior

| Function | Responsibility |
| --- | --- |
| `initThemeToggle()` | Switches light/dark color palettes, saves the preference and updates the accessible label and browser theme color. |
| `initGreeting()` | Adds a local-time greeting and current year. |
| `initHeader()` | Uses a scheduled animation frame on scroll/resize to select the header's foreground color. |
| `initMotion()` | Handles the pause control, saved motion preference, reduced-motion changes and pausing offscreen hero animations. |
| `initScrollReveal()` | Reveals content as it enters the viewport. Keyboard focus also reveals its parent immediately. |
| `initMobileMenu()` | Opens/closes the navigation dialog, updates expanded state and moves focus to the chosen section. Closes on a desktop resize. |
| `initGallery()` | Displays seven original screenshots with captions, wrapping navigation, arrow keys, horizontal swipe and next-image preloading. |
| `syncScrollLock()` | Keeps background scrolling locked while a dialog is open. |
| `initContactForm()` | Validates fields, focuses the first invalid field and displays an explicit local-preview confirmation. Retains the visitor's draft. |

## Gallery

`mizanytiSlides` is an ordered array of `{ src, alt, caption }` entries. `data-slide` on a preview image identifies which slide opens. The separate “View all 7 screens” button starts at the first image.

The browser's native `dialog.showModal()` supplies focus containment, Escape closing and focus restoration. Buttons and arrow keys navigate with wraparound. Swipes require at least 50px of horizontal movement and must be more horizontal than vertical, so ordinary vertical gestures do not change slides. Clicking outside the dialog closes it.

## Language (English / Arabic)

A toggle in the header (and in the mobile menu) switches the whole site between English and Arabic. English is the default, and the visitor's choice is saved in `localStorage`.

**How it works** (`js/i18n.js`, exposed as `window.portfolioI18n`):

| Piece | What it does |
| --- | --- |
| `data-i18n="key"` | Marks an element whose text is translatable. `data-i18n-aria-label`, `data-i18n-alt` and `data-i18n-placeholder` do the same for those attributes. |
| `messages` | A dictionary with an `en` and an `ar` object. The English text is not retyped: `init()` copies it from the HTML, so the page itself is the English source and the HTML works as the fallback. |
| `t(key, values)` | Looks the key up in the current language, falls back to English, then to the key itself. `{name}`-style placeholders are filled from `values`. |
| `number(value)` | Formats numbers with `Intl.NumberFormat`, which gives Arabic-Indic digits (٠١٢…) in Arabic. |
| `setLanguage(lang)` | Sets `<html lang>` (`ar-SA` or `en`) and `dir` (`rtl` or `ltr`), rewrites every bound element, updates the page title and meta description, updates the toggle buttons, saves the choice, and announces the change through a `role="status"` element for screen readers. It then fires a `languagechange` event. |

Text that JavaScript creates while the page runs cannot be marked in the HTML, so `script.js` listens for `languagechange` and re-renders it: the theme and motion button labels, the greeting and year, the gallery caption, alt text, counter and arrows, and any visible form error or success message.

**Right-to-left details**

- `html[dir="rtl"]` rules in the CSS switch to the Tajawal font, remove letter-spacing (it breaks the joining of Arabic letters) and increase line height.
- In the gallery the previous/next arrows swap, and the arrow keys and swipe direction reverse, so "forward" still points the way the text reads.
- A visitor's name inside an Arabic sentence is wrapped in Unicode isolation marks (`⁨ … ⁩`), so a Latin name cannot scramble the order of the Arabic words around it.
- The language button is `hidden` in the HTML and revealed by JavaScript, so it does not appear when it could not work.
- Tajawal (Regular and Light, about 60 KB each) loads with `font-display: swap`.

## Contact form

This is explicitly a **local demo**. No data is submitted, stored or sent to an external service. The main contact route is the real GitHub profile link.

- Name requires two characters after trimming.
- Email must match a simple email pattern.
- Message requires ten characters after trimming.
- Errors appear beside the corresponding fields and use `aria-describedby`, `aria-live` and `aria-invalid`.
- Validation checks all fields, then focuses the first invalid one.
- Successful validation uses `textContent`, keeps the draft and confirms that nothing was sent.
- The submit control is enabled visually only after its JavaScript handler is installed. Without JavaScript, the form explains that its preview needs JavaScript and provides the GitHub alternative.

Connecting a real delivery service is separate work; do not change the form's confirmation to imply delivery until a backend actually returns success.

## Accessibility and performance

- Semantic landmarks, section headings, labelled controls and a skip link.
- Visible keyboard focus and 44px or larger main navigation/dialog controls.
- Content stays visible if JavaScript or IntersectionObserver is unavailable.
- The desktop link list remains available on mobile if the dialog initializer cannot run.
- `prefers-reduced-motion` disables animation and smooth scrolling; a separate pause control handles continuous decorative motion.
- Animation uses transforms and opacity with `cubic-bezier(.19, 1, .22, 1)` easing. Hero motion pauses offscreen.
- Images have explicit dimensions, and below-fold project/profile images load lazily.
- Local assets allow the page to work without runtime third-party requests.

## Verification

Arabic mode was checked in a browser by Claude Code: switching to Arabic and back restores all 107 translated elements to their exact English text; the saved language survives a reload; the gallery shows Arabic numerals and reversed arrows and keys; form errors and the success message appear in Arabic and re-translate when the language changes; the mobile menu works; there is no horizontal scrolling at 320, 375 and 1280px; and the console shows no errors.

Browser smoke checks cover 320, 375, 390, 700, 768, 1024, 1440 and 1920px widths, all seven gallery screens, arrow-key navigation, Escape closing, mobile menu focus, form validation and draft retention, saved theme, motion controls and a JavaScript-disabled fallback. Desktop/mobile screenshots are used for visual review. Local review artifacts live in ignored `.preview/`.
