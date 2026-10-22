# AI Usage Report

**Student:** Khaled Alanazi (202338530)
**Assignment:** Assignment 2: Interactive Features

> **TODO (Khaled) before you submit.** Set the date in the declaration (section 8) on the day you submit, and read the whole report once to check that every statement is true. Then delete this box.

---

## 1. Usage Log

One row per AI conversation (`C01`, `C02`, ...) or AI-generated artifact (`A01`, `A02`, ...).

| ID | Tool (model) | Date | Purpose | Files affected | What you changed and how you verified it |
|----|--------------|------|---------|----------------|------------------------------------------|
| C01 | Claude Code (Claude Sonnet 5.5) | 2026-10-22 | I gave it the Assignment 2 brief and my Assignment 1 repository. It planned and built the toolkit search and filter, the Wikipedia API section, the form hint and animated messages, the English and Arabic text for them, and drafted the README, technical documentation and this report. | `index.html`, `css/styles.css`, `js/script.js`, `js/i18n.js`, `README.md`, `docs/technical-documentation.md`, `docs/ai-usage-report.md` | Claude fixed one bug it found while testing (a tall Wikipedia thumbnail stretched the card; fixed by positioning the image absolutely) and simplified its own error handling after noticing a redundant branch. It verified the features in the Claude desktop app's built-in browser: toolkit search, filter and empty state in English and Arabic; the Wikipedia section's loading, success, simulated network failure, HTTP 503, unsafe-link rejection and recovery; the form hint and success message; no horizontal scrolling at 320 px; no console errors (full list in `docs/technical-documentation.md`). My own edits and checks are in section 5. |

There are no separate AI-generated artifacts (images, text files) apart from the files above. The full conversation and the first versions of each file go in the AI Evidence ZIP (see section 8).

I did not use any other AI tool for this assignment.

---

## 2. Tool and use cases

| Tool | How it was used |
| --- | --- |
| **Claude Code** (Claude Sonnet 5.5) | Reading my Assignment 1 repository, choosing and building the new features, testing them in a browser, explaining them, and drafting the documentation |

**Use cases**

1. **Reading the brief and my existing code.** Claude read the assignment and cloned my Assignment 1 repository to see what already existed (theme toggle, greeting, gallery, validated form, English / Arabic switcher). That mattered because Assignment 1 already had a lot of JavaScript, so Assignment 2 had to add something clearly new.
2. **Dynamic content: toolkit explorer.** It turned the four toolkit rows into individual tool tags and added a live search box, category chips, a result count and an empty state. It added hidden search aliases (`js`, `ios`, `terminal`, ...) so the search is more useful than plain text matching.
3. **Data handling: Wikipedia API.** It added a "Something new to learn" section that fetches a random article summary from the Wikipedia REST API in the site's current language, saves the last article in `localStorage`, and handles loading, offline, timeout and failure states with a "Try again" button.
4. **Animation.** It added entrance animations for filtered items and new articles, a loading skeleton, sliding form messages and hover effects, all disabled by `prefers-reduced-motion`.
5. **User feedback.** It added the live character hint on the contact form and the friendly messages described above, in English and Arabic.
6. **Security review of its own feature.** Because the Wikipedia section shows text and links from another website, Claude wrote the code so that article text is only inserted with `textContent` and links and images are accepted only from Wikipedia's own hosts. It tested that a `javascript:` link is rejected.
7. **Testing.** Claude ran the checks listed in the usage log, in both languages, and found and fixed the thumbnail bug.
8. **Documentation.** Claude drafted the README, the technical documentation and this report.

### Decisions made while building

These were made by the AI during the conversation, and I need to review them (see section 5):

- Which features to add: a searchable toolkit (instead of a project filter, because I only have two projects and the toolkit has ten tools), and Wikipedia as the API (because it fits my "Driven by curiosity" theme, needs no key and works in Arabic).
- To keep the contact form free of stored personal data, so no form draft is saved to `localStorage`.
- To fetch the first Wikipedia article only when the section nears the screen, so people who never scroll there make no request.
- To keep the repository history in small branches (`feature/toolkit-explorer`, `feature/curiosity-api`, `feature/form-feedback`, `docs/assignment-2`) merged into `main`, with `Assisted-by:` lines in the commit messages.

---

## 3. Benefits & Challenges

### Benefits

- The AI read my existing code first, so the new features reuse my Assignment 1 structure (`i18n.js`, the `languagechange` event, `playEntrance`-style helpers, the same CSS tokens) instead of starting a separate project.
- It tested its own work, in both languages, and found a real layout bug I would likely only have noticed later.
- It explained choices that were new to me, such as why `aria-disabled` is better than `disabled` for the "Show me another" button, and why third-party text should go through `textContent`.

### Challenges and limitations

- **Testing was limited.** Claude tested in one Chromium-based browser at a few widths. It did not test Safari, Firefox or a real phone, so I still need to check those myself.
- **Network-dependent feature.** The Wikipedia section depends on a service I do not control, and random articles are not curated, so the page includes a note saying I did not choose or check the article.
- **Some code is more advanced than my current level.** `fetch` with `AbortController`, `async`/`await` and `IntersectionObserver` need studying so I can explain every line (section 6 lists what I should be able to explain).
- **The AI cannot know things only I know.** It cannot decide what I want my portfolio to say, which is why the content stays mine.

---

## 4. How the AI output was checked

- The AI tested each feature in a browser and recorded the results in `docs/technical-documentation.md`.
- The features can be tried again by following "How to use the new features" and "Trying the error messages" in the README.
- Every commit that contains AI-assisted code names the tool in an `Assisted-by:` line.

---

## 5. What I changed after the AI draft

I chose these changes after reading the AI's first version. Claude Code typed the edits for me, because I told it exactly what I wanted.

| File | What I changed | Why |
| --- | --- | --- |
| `index.html`, `js/i18n.js` | Changed the Wikipedia section heading from "Learn something new today." to "Something new to learn." and updated the Arabic heading to match | I liked this wording more, and it sounds more like me |
| `css/styles.css` | Made the hover lift on the filter chips and the tool tags bigger, from 2 px to 4 px | The 2 px lift was too small to notice |
| `README.md`, `docs/` | Updated the documentation so it uses the new heading and the 4 px hover lift | The docs have to match the code |

I also tried to change the fetching code (`fetchRandomFact()`) by myself, but I did not understand it well enough, so I did not change it. I need to keep studying that part (see section 6).

My own checks:

- I opened the site on my phone and used it there.
- I ran the offline test from the README (Network tab set to Offline, then pressing "Show me another") and saw the friendly error message and the "Try again" button.

--- | --- | --- |
| TODO | TODO | TODO |

My own checks (TODO: add what you tested yourself, for example other browsers, your phone, the offline test from the README):

- TODO

---

## 6. Understanding checklist

I should be able to explain each of these without the AI:

| Topic | Where to look |
| --- | --- |
| How one `render()` function turns the search text and selected category into what is visible | `initToolkit()` in `js/script.js` |
| Why the filter checks the tool's text **and** its `data-keywords` | `matches()` in `initToolkit()` and the `data-keywords` attributes in `index.html` |
| What `fetch`, `async`/`await` and `AbortController` do, and what happens on a timeout | `fetchRandomFact()` and `load()` in `initCuriosity()` |
| Why a `requestId` is used (ignoring an old response that arrives late) | `load()` |
| Why the article is checked and rebuilt (`cleanFact()`, `trustedUrl()`) and why `textContent` is used instead of `innerHTML` | `js/script.js` |
| What is saved in `localStorage` and why every access is in `try/catch` | `initCuriosity()`, `initThemeToggle()` |
| How the skeleton, error and ready panels are switched, and why the button uses `aria-disabled` | `render()` in `initCuriosity()` |
| How `IntersectionObserver` delays the first request | bottom of `initCuriosity()` |
| Why animations replay when an element goes from `hidden` to visible | `playEntrance()` and `@keyframes enter-up` in `css/styles.css` |
| How new text reaches the Arabic version (the `languagechange` event and `js/i18n.js`) | `render()` functions and `messages.ar` |

---

## 7. Learning outcomes

The hardest part for me was the `fetch` code. It was difficult to picture how the page asks Wikipedia for data, waits for the answer, and then decides what to show when it succeeds, is slow or fails. I tried to change the fetching code by myself, but I did not understand it, so I did not change it. The filter logic was also hard at first, because one function has to work out what is visible from both the search text and the chosen category. What I did understand well is why the site needs loading, error and empty messages, so the visitor always knows what happened and what to do next. I also learned how to test the error state by switching the browser to Offline. Next time I want to practise `fetch` on a small example before using it in my portfolio.

---

## 8. Declaration

AI evidence: the full, unedited conversation(s) and the first versions of the AI-written files are in `id-name-assignment2-ai-evidence.zip` (`conversations/` and `artifacts/`), submitted on Blackboard with the repository link. They are not committed to this repository.

> I declare that this report and the attached evidence document all of my AI use in this assignment, with complete and unedited conversations, and that I understand and can explain all the code I submitted. I understand that undeclared AI use or a false declaration will be treated as plagiarism according to KFUPM regulations.

**Name:** Khaled Alanazi
**ID:** 202338530
**Date:** TODO (the day you submit)
