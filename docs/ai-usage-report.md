# AI Usage Report

**Student:** Khaled Alanazi (202338530)
**Assignment:** Assignment 1: Foundation & AI Integration

---

## 1. Tools Used & Use Cases

| Tool | How I used it |
| --- | --- |
| **Claude Code** | Planning questions, the first draft of the HTML, CSS and JavaScript, testing, one extra feature (the screenshot gallery), explanations and documentation drafts |
| **Codex** | Redesign of the UI and UX inspired by monopo.vn, the Arabic language feature, and explanations of how they work |

I did not use any other AI tool.

### Use cases

**Claude Code**

1. **Planning.** I gave Claude the assignment brief. Before writing any code, it asked me questions about the style, colours, features and my personal details, so the first version came from my choices and not from a generic template.
2. **First draft.** Claude wrote the first version of `index.html`, `css/styles.css` and `js/script.js`.
3. **Testing and debugging.** Claude checked the site in a browser at several screen widths and found two real problems in its own work. At 320 px wide the navigation and theme button overflowed the screen, so the nav links were made more compact. The "·" separator in the Arabic project name also appeared on the wrong side, and that was fixed too. Later, Claude also tested the Arabic language feature that Codex added: switching languages both ways, the saved choice, the gallery, the form messages, the mobile menu and horizontal scrolling on small screens. It found no problems.
4. **A feature on request.** I asked for a gallery that opens when I click my Mizanyti app screenshots. Claude built it with the native `<dialog>` element, and I asked it to explain each step so I could learn how it works. Its testing found that on a short phone screen the bottom of the dialog was cut off by 9 px, and it fixed that.
5. **Documentation.** Claude wrote the first drafts of the README and the technical documentation.

**Codex**

6. **UI and UX redesign.** I first started with a colour theme that I did not like. I found monopo.vn, and I liked its clean style so much that I asked Codex to imitate it and to explain what techniques the website uses to make its minimalistic style. The first result had plain, basic colours, so I asked Codex to add colour and make it colourful. The redesign added an SVG artwork hero, a locally hosted Inter font, an editorial layout with full-width project sections, a mobile menu and motion controls. It kept the screenshot gallery, the theme toggle, the time-based greeting and the form validation, and the form now says clearly that no message is sent. Codex also ran its own browser checks at eight screen widths from 320 px to 1920 px. Those checks show what the tool did, and they do not replace my own testing.
7. **Explanations.** With both tools I asked for the features and for explanations of how they were built, so that I could understand the code.
8. **Arabic language feature.** After the redesign, I used Codex to add an Arabic version of the whole website. A language toggle switches all the text to Arabic and the layout to right-to-left, and the choice is remembered. This added a new file, `js/i18n.js`, which holds the English and Arabic text and the switching logic, and a locally hosted Arabic font.

### Decisions I made myself

- Which features to include, and using plain HTML, CSS and JavaScript with no framework.
- All content about me: my name, field, interests, skills, GitHub link and the description of my Mizanyti app, plus the Mizanyti screenshots from my own project.
- Deciding that the first colour theme was not right, and choosing monopo.vn as my inspiration.
- Asking for colour after the first redesign came out plain.
- Deciding to add an Arabic language feature to the website.
- The "Driven by curiosity" theme, which is my own idea.
- Editing the text on the page, such as the About Me section, and adding a real photo of myself.

---

## 2. Benefits & Challenges

### Benefits

- I got a working, well-structured starting point quickly, so I could spend my time understanding the code instead of staring at a blank file.
- The AI could turn an idea into something I could see. I found a website I loved, and Codex showed me how its style is built.
- Codex did everything I asked for, including the Arabic language feature.
- Asking the tools to explain their work taught me practices I would not have known to ask for, such as CSS variables for theming and the native `<dialog>` element.
- Testing at different screen sizes caught layout problems early.

### Challenges and limitations

- **The features confused me at first.** The time-based greeting and the dark mode were confusing, and I did not understand them on the first try. After more explanation they turned out to be easy, and they are cool features.
- **My own colour changes did not work.** I tried to change the colours by hand, and the result looked awful. I could picture the idea in my head but could not build it yet, so I asked Codex to visualise that idea. The result was good.
- **The first results needed follow-up.** Codex's first redesign had plain, basic colours and needed a second request. Claude's first navigation did not fit on a 320 px screen. AI output has to be tested and cannot simply be trusted.
- **Some code is more advanced than my current level.** I am still learning HTML, CSS and JavaScript, so I need to keep studying the code to be able to explain every part of it.
- **The AI could not know things only I know.** It did not have my app's screenshots or my profile photo, so I supplied them myself.

---

## 3. Learning Outcomes

I learned how to build a gallery with a dialog, including how to open it, close it and move between images. I learned how to make a website feel smooth to use. From studying monopo.vn with Codex, I learned that the typography and the monochrome background in the hero are two of the main things behind its minimalistic style. The time greeting and the dark mode confused me at first, but I understand them better now. Adding the Arabic version also taught me how tricky it is to build a website in Arabic because of the layout of the language, which runs from right to left. Creating my own repository also made me more comfortable using GitHub. As for my workflow, I learned that I can show an AI a reference website, ask it to imitate that style and explain the techniques, and then give follow-up instructions, such as asking for more colour, until the result matches my idea.

---

## 4. Responsible Use & Modifications

### How I reviewed the AI output

- I opened the website in Chrome and used the DevTools device toolbar to check the mobile view.
- I asked both tools to explain how the features work, so that I understand the code and not only the result.

### Modifications I made

- Edited the text on the page, such as the About Me section, so it says what I want it to say.
- Added a real photo of myself and the screenshots of my own Mizanyti app.
- Tried to adjust the colours by hand. The result was not good, so I described my idea to Codex and it visualised it for me.
- Came up with the "Driven by curiosity" theme.

### Academic integrity

I used AI as the assignment allows, and I am documenting it openly here. I will only submit code that I understand and can explain, and I did not copy code from classmates.
