# Technical documentation

## Overview

A static, single-page portfolio built with HTML, CSS and vanilla JavaScript. There is no framework, build step, backend or analytics. Open `index.html` directly or serve the project with a local HTTP server.

Assignment 2 builds on the Assignment 1 site. The new work is described in [What is new in Assignment 2](#what-is-new-in-assignment-2); everything else is unchanged from Assignment 1.

| File | Purpose |
| --- | --- |
| `index.html` | Semantic page structure, project content, form and native dialogs |
| `css/styles.css` | Design tokens, responsive layouts, theme, motion and focus styles |
| `js/i18n.js` | English/Arabic translations and the language switcher (loaded before `script.js`) |
| `js/script.js` | Navigation, theme, motion, greeting, gallery, toolkit explorer, Wikipedia feature and form validation |
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
4. `#skills`: the toolkit, with a live search box, category chips and four editorial rows of tools.
5. `#curiosity`: a random Wikipedia article loaded from a public API.
6. `#contact`: GitHub link, local demo form and footer.
7. `#mobile-menu` and `#gallery`: native modal dialogs.

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
| `initToolkit()` | Filters the toolkit while typing and by category, updates the count, shows the empty state. |
| `initCuriosity()` | Loads, shows, saves and restores a random Wikipedia article, with loading and error states. |
| `playEntrance()` | Replays the entrance animation on an element each time it becomes visible again. |
| `syncScrollLock()` | Keeps background scrolling locked while a dialog is open. |
| `initContactForm()` | Validates fields, focuses the first invalid field and displays an explicit local-preview confirmation. Retains the visitor's draft. |

## What is new in Assignment 2

| Requirement | Where it is met |
| --- | --- |
| Dynamic content | Toolkit explorer: live search and category filter (`initToolkit()`) |
| Data handling | Wikipedia public API (`initCuriosity()`); `localStorage` for theme, language, motion, and the last article |
| Animation and transitions | Entrance animation when filtered items reappear, fade/slide of new messages, hover lift on chips and tool tags, skeleton shimmer while loading |
| Error handling and user feedback | Loading indicator, three friendly API errors with retry, an empty state, live form hints and errors |
| AI enhancement | See [`ai-usage-report.md`](ai-usage-report.md) |

### Toolkit explorer

The four skill rows from Assignment 1 are now lists of individual tools (`<ul class="tool-list">`). Each `<article class="skill-row">` has a `data-category` (`web`, `mobile`, `code`, `foundation`) and each `<li>` can have a `data-keywords` attribute with extra search words (for example `js`, `ios`, `terminal`).

State is a small object, `{ category, query }`, and one `render()` function recomputes everything from it, so the search box, the chips and the reset button can never disagree:

1. A tool is visible when its row matches the selected category **and** its text plus keywords contain the query (case-insensitive, after trimming).
2. A row is visible when at least one of its tools is.
3. The status line (`role="status"`) says "Showing 3 of 10 tools" or "Showing all 10 tools".
4. When nothing matches, an empty state says what was searched and offers a "Show everything" button that clears the search, resets the category and returns focus to the search box.

The Escape key clears the search box. Chips are buttons with `aria-pressed`. The search runs on every `input` event, which is fast enough for ten items, so no debounce is needed. The visitor's query is only ever written with `textContent`. Changing the language re-runs `render()`, because the tool names (for example "Security fundamentals") and the status text change.

### Curiosity section (Wikipedia API)

`GET https://{en|ar}.wikipedia.org/api/rest_v1/page/random/summary` returns a random article summary. The site uses the Wikipedia that matches the page language. The endpoint needs no key and allows cross-origin requests, so the browser can call it directly.

Flow:

1. **Start.** If a valid article was saved in `localStorage` (`curiosity-fact`), it is shown straight away, with a note saying it is from the last visit. Otherwise the section shows a loading skeleton and fetches the first article only when the section is about to scroll into view (`IntersectionObserver`), so visitors who never scroll that far make no request.
2. **Fetch.** `fetchRandomFact()` asks for an article and accepts it only if it is not a disambiguation page and has an extract of at least 80 characters. Otherwise it asks again, up to three times. A 10-second `AbortController` timeout covers the whole attempt.
3. **Show.** The title, short description and extract are written with `textContent`. The block gets the article's own `lang` and `dir`, so an Arabic article is right-to-left even on an English page. The image, if there is one, is decorative (`alt=""`) because the title is next to it.
4. **Save.** The cleaned article is stored in `localStorage` so it can be restored next time.

The button is always the same element. Its label changes ("Show me another", "Finding…", "Try again") and it uses `aria-disabled` while loading instead of `disabled`, so keyboard focus is never lost. A request counter (`requestId`) ignores any response that arrives after a newer request started.

| Situation | What the visitor sees |
| --- | --- |
| Loading | Shimmering skeleton and "Finding something worth knowing…"; the card has `aria-busy="true"` |
| Offline (`navigator.onLine` is false) | "You seem to be offline." and a hint to check the connection and press "Try again" |
| No answer within 10 s | "Wikipedia is taking too long to answer." and the same hint |
| HTTP error, bad data or no suitable article after three tries | "Couldn’t fetch an article just now." and the same hint |
| `localStorage` unavailable | Nothing visible; the article simply is not saved |
| Image fails to load | The image column is hidden and the text uses the full width |
| JavaScript disabled | A `<noscript>` message |

**Treating third-party data as untrusted.** The response is not trusted just because Wikipedia sent it. `cleanFact()` checks the types, rebuilds the object with only the fields the page uses, and accepts links only if they are `https:` on `wikipedia.org` and images only if they are `https:` on `upload.wikimedia.org`. A `javascript:` link, for example, makes the article invalid. The same function validates the copy read back from `localStorage`, because visitors (or other scripts on the same origin) can edit it. No article text is ever inserted as HTML.

The note under the card says the article is random and "I did not choose or check it", because Wikipedia's random pages are not curated.

### Form feedback

The form is still a local demo. New in Assignment 2: the message field shows a live hint ("8 more characters to go." / "That’s enough to get started."), error messages slide in, and the success message is a highlighted box with a check mark that fades in. Messages follow the language switcher.

### Animation

| Where | Effect | Implementation |
| --- | --- | --- |
| Filtered rows, tools and the empty state | Rise and fade in when they reappear, staggered by 45 ms | `.is-entering` class added by `playEntrance()`; `@keyframes enter-up` |
| New Wikipedia article | Same rise and fade | `playEntrance()` on the content block |
| Loading | Shimmer on the skeleton lines | `@keyframes shimmer` |
| Form errors and success | Slide down and fade in | `@keyframes message-in` on `.field__error` and `.form__status`, which replay because those elements switch from `display: none` to visible |
| Chips and tool tags | Lift by 2 px and change border colour on hover | `transition` on `transform` and `border-color` |

Only `opacity` and `transform` are animated, apart from the shimmer, which moves a background. With `prefers-reduced-motion: reduce`, the existing global rule disables all animations, and `playEntrance()` returns early.

### Data kept in `localStorage`

| Key | Value | Why |
| --- | --- | --- |
| `theme` | `light` or `dark` | Remember the theme |
| `language` | `en` or `ar` | Remember the language |
| `motion-paused` | `true` or `false` | Remember the pause control |
| `curiosity-fact` | The last Wikipedia article (title, description, extract, links, language) | Show something immediately on the next visit |

Nothing personal is stored, and the contact form saves nothing. Every read and write is wrapped in `try/catch`, so the site works with storage blocked.

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

Text that JavaScript creates while the page runs cannot be marked in the HTML, so `script.js` listens for `languagechange` and re-renders it: the theme and motion button labels, the greeting and year, the gallery caption, alt text, counter and arrows, any visible form error, hint or success message, the toolkit count and empty-state text, and the Wikipedia button label, note and error title. The text of a Wikipedia article is not translated: it stays in the language it was fetched in and carries its own `lang` and `dir`.

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
- The toolkit search has a visible label, the chips use `aria-pressed`, and the result count is announced through a `role="status"` region. The Wikipedia card is an `aria-live="polite"` region with `aria-busy` while loading.
- Content stays visible if JavaScript or IntersectionObserver is unavailable.
- The desktop link list remains available on mobile if the dialog initializer cannot run.
- `prefers-reduced-motion` disables animation and smooth scrolling; a separate pause control handles continuous decorative motion.
- Animation uses transforms and opacity with `cubic-bezier(.19, 1, .22, 1)` easing. Hero motion pauses offscreen.
- Images have explicit dimensions, and below-fold project/profile images load lazily.
- Local assets allow the page to work without runtime third-party requests.

## Verification

**Assignment 2 checks.** These were run by Claude Code in the Claude desktop app's built-in browser (a Chromium-based browser), served with `python3 -m http.server`. I have not yet tested other browsers, and a real phone is still to do.

- Toolkit: all 10 tools shown at first; "js" shows only JavaScript; "zzz" shows the empty state; the reset button restores everything and focuses the search box; the Mobile chip shows React Native and Expo; "git" finds Git & GitHub; in Arabic, searching "أمن" and the English alias "security" both find the security tool; the count text is translated.
- Wikipedia: first article loads when the section is reached and is saved; a simulated network failure shows the error state with "Try again"; the next click recovers; a response with a `javascript:` link is rejected; an HTTP 503 shows the friendly error; an Arabic article loads in Arabic mode with `dir="rtl"`; a portrait-shaped thumbnail no longer stretches the card.
- Form: empty submit shows three errors and focuses the first field; the message hint counts down and then reads "That’s enough to get started."; valid input shows the animated success message; the hint and message switch to Arabic.
- Layout: no horizontal scrolling at 320 px in English or Arabic, including a very long search with no results; the mobile menu lists Work, About, Toolkit, Curiosity and Contact; the browser console showed no errors.

**Carried over from Assignment 1.** Arabic mode was checked in a browser by Claude Code: switching to Arabic and back restores all translated elements to their exact English text; the saved language survives a reload; the gallery shows Arabic numerals and reversed arrows and keys; form errors and the success message appear in Arabic and re-translate when the language changes; the mobile menu works; and there is no horizontal scrolling at 320, 375 and 1280px.

Browser smoke checks for Assignment 1 covered 320, 375, 390, 700, 768, 1024, 1440 and 1920px widths, all seven gallery screens, arrow-key navigation, Escape closing, mobile menu focus, form validation, saved theme, motion controls and a JavaScript-disabled fallback.

## Known limits

- The Wikipedia feature needs an internet connection and depends on a service I do not control. If Wikipedia changes its API, the section shows its error state instead of breaking the page.
- Random Wikipedia articles are not curated, so occasionally one may be obscure or sensitive.
- Toolkit search matches plain substrings, with no fuzzy matching and no special handling of Arabic diacritics.
- The contact form is still a demo and sends nothing.
