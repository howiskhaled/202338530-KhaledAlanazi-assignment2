# Khaled Alanazi | Personal Portfolio (Assignment 2: Interactive Features)

My personal portfolio, built with plain **HTML, CSS and JavaScript**. This is Assignment 2 of SWE 363. It starts from my [Assignment 1 portfolio](https://github.com/howiskhaled/202338530-KhaledAlanazi-assignment1) and makes it more interactive: a searchable toolkit, a live feature powered by a public API, friendlier form feedback and smoother motion. The style stays minimalistic and futuristic, and the site still works in English and Arabic.

**Live site:** <https://howiskhaled.github.io/202338530-KhaledAlanazi-assignment2/> (available once GitHub Pages is enabled, see [Deploying](#deploying-to-github-pages))

## What is new in Assignment 2

| Requirement | What I built |
| --- | --- |
| **Dynamic content** | **Toolkit explorer.** The tools I am learning are now individual tags. Type in the search box and the list filters live (try `js`, `ios`, `git` or `terminal`), or pick a category chip (Web, Mobile, Code, Foundations). The two work together, and a count says how many tools are showing. |
| **Data handling** | **"Something new to learn."** A button fetches a random article from the public **Wikipedia API**, in the language the site is currently showing. The last article is saved in `localStorage`, so the next visit starts with something to read. Theme, language and motion preferences are also saved. |
| **Animation and transitions** | Filtered items rise and fade back in, new articles and form messages slide in, loading shows a shimmering skeleton, and chips and tags lift 4 px on hover. Everything respects `prefers-reduced-motion`. |
| **Error handling and feedback** | A loading state, friendly messages for offline, slow and failed requests (each with a "Try again" button), an empty state ("No tool matches ...") with a reset button, and a live hint on the contact form that counts the characters still needed. |
| **AI enhancement** | Built with Claude Code. See [AI usage summary](#ai-usage-summary) and [`docs/ai-usage-report.md`](docs/ai-usage-report.md). |

Everything from Assignment 1 is still here: the light and dark themes, the English / Arabic switcher with right-to-left layout, the time-of-day greeting, the Mizanyti screenshot gallery, the scroll-reveal animations and the validated contact form (still a local demo, nothing is sent).

## How to use the new features

1. **Search the toolkit.** Scroll to *The Toolkit* and type in the search box. Press `Esc` to clear it. If nothing matches, press **Show everything**.
2. **Filter by category.** Press a chip. The pressed chip is highlighted.
3. **Read something new.** Scroll to *Something new to learn* and press **Show me another**. If the request fails, the page tells you why and the button becomes **Try again**.
4. **Switch language.** Press the language button in the header. The labels change right away, and the next Wikipedia article comes from the Arabic or English Wikipedia to match.

## Tech stack

| Layer | Choice |
| --- | --- |
| Markup | HTML5 |
| Styling | CSS3 (custom properties, Grid, Flexbox, keyframe animations, mobile-first media queries) |
| Behaviour | Vanilla JavaScript (ES2020: `fetch`, `async`/`await`, `AbortController`, `IntersectionObserver`) |
| Data | [Wikipedia REST API](https://en.wikipedia.org/api/rest_v1/) (public, no key) and `localStorage` |
| Fonts | Locally hosted Inter (English) and Tajawal (Arabic) fonts, with system fallbacks |

No frameworks, build tools, API keys or dependencies are needed. The only runtime request to another site is the Wikipedia call, and only when you reach or use the Wikipedia section.

## Project structure

```
.
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── i18n.js                          (English / Arabic text and the language switcher)
│   └── script.js                        (theme, menu, gallery, toolkit, Wikipedia, form)
├── assets/
│   ├── fonts/                           (Inter and Tajawal, with their licences)
│   └── images/                          (favicon, hero artwork, profile photo, Mizanyti screenshots)
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

## Getting started (run locally)

You need only a web browser. The Wikipedia section also needs an internet connection.

**Option 1: open the file**

1. Download or clone this repository.
2. Double-click `index.html`.

**Option 2: run a local server** (recommended, closer to a real deployment)

```bash
git clone https://github.com/howiskhaled/202338530-KhaledAlanazi-assignment2.git
cd 202338530-KhaledAlanazi-assignment2
python3 -m http.server 8000
```

Then open <http://localhost:8000>. On Windows you can use `py -m http.server 8000` instead. The **Live Server** extension in VS Code works too.

### Trying the error messages

Open the browser's developer tools, go to the **Network** tab, set throttling to **Offline**, and press **Show me another**. You should see "You seem to be offline." with a **Try again** button. Set the network back to normal and press the button again.

### Deploying to GitHub Pages

1. Push the repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. After a minute or two the site is live at the link at the top of this README.

## AI usage summary

I used **Claude Code** (Claude Sonnet 5.5) for this assignment. I gave it the assignment brief and my Assignment 1 repository, and it helped me plan the features, write the first version of the new HTML, CSS and JavaScript, test them in a browser, and draft the documentation. Details, including a usage log for every AI conversation, what was changed afterwards and my declaration, are in [`docs/ai-usage-report.md`](docs/ai-usage-report.md). The AI Evidence ZIP is submitted separately on Blackboard and is not part of this repository.

## Documentation

- [`docs/technical-documentation.md`](docs/technical-documentation.md): how the code is organised, how the toolkit explorer and the Wikipedia feature work, error handling and what was tested
- [`docs/ai-usage-report.md`](docs/ai-usage-report.md): how AI was used, the usage log and the declaration

## Author

**Khaled Alanazi** (ID 202338530), Computer Science student
GitHub: [@howiskhaled](https://github.com/howiskhaled)  
khaledfaisal.com
