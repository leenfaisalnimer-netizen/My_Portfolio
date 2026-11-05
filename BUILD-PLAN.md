# BUILD PLAN — Leen Nimer
### Thinker. Builder. Game Changer.

**Document type:** Master creative brief + implementation instructions for Claude Code
**Version:** 1.0 · 5 November 2026
**Output:** Static website — `index.html`, `style.css`, `script.js`, `/assets`
**Stack:** HTML, CSS, vanilla JavaScript. GSAP + ScrollTrigger + Lenis via CDN. No frameworks.

---

## 0. Non-negotiable content rules

Claude Code must follow these on every line of copy, every alt text, every meta tag and every comment in the code.

1. **No new claims.** Rhythm and layout can improve. Numbers, clients, employers and results cannot be added.
2. **Status labels stay.** Every project shows exactly one of: `Deployed`, `Built`, `Prototype`, `Design only`, `Research plan`. (`Built (no-code)` is the Built label with a qualifier.)
3. **Limit lines stay.** Every featured case study shows its **Limit** row. It is part of the positioning, not small print.
4. **Academic work is academic work.** University projects are never described as client work. Scenario organisations are never called clients.
5. **Placeholders stay visible.** Anything in `[SQUARE BRACKETS]` renders on the page as a visible, clearly styled placeholder (see §20.6) until Leen replaces it.
6. **No target-employer branding.** Do not use the name, logo or colours of any firm Leen is applying to, anywhere on the site, in metadata or in code comments. The palette in this plan is the only palette.
7. **Never say Leen has graduated.** Use the education line exactly as written in §11.
8. **Identity.** Every generated scene uses the reference image in `Media/` as the identity reference. Leen's hijab and modest styling must appear exactly as in that image.

---

## 1. Website overview

| Item | Decision |
|---|---|
| Site type | Personal brand portfolio, single long-scroll page |
| Owner | Leen Nimer, Computer Science student, Amman, Jordan |
| Primary audience | Recruiters and assessors hiring for digital transformation and technology consulting internships |
| Secondary audience | Faculty, competition juries, community and IEEE peers |
| Job of the site | In under 60 seconds, prove three things: she finds the real problem, she builds systems that run, and she reports honestly what the evidence shows |
| Primary action | **Get in touch** → `mailto:leen.faisal.nimer@gmail.com` |
| Secondary action | **Download CV** → `assets/Leen-Nimer-CV.pdf` |
| Text links | LinkedIn → `https://www.linkedin.com/in/leen-nimer-259a24295` · GitHub → `https://github.com/leenfaisalnimer-netizen` |
| Availability | Full-time from February 2027 (eight-month university internship period) |
| Page title | `Leen Nimer \| Thinker. Builder. Game Changer.` |
| Meta description | `Leen Nimer is a Computer Science student in Amman who turns business and user needs into working digital solutions, from the first question to the tested result.` |

**The idea in one line:** *A calm, daylight editorial that reads like a consulting case book — every claim on the page arrives with its evidence and its limits.*

---

## 2. Core positioning

**Positioning statement**
For teams hiring in digital transformation and technology consulting, Leen Nimer is a Computer Science student who works across the whole lifecycle — requirements, design, software, cloud, data and testing — and who reports what the evidence shows, even when the evidence says no.

**Promise:** *From the first question to the tested result.*

**Proof of difference:** Most student portfolios list what was built. Leen's shows what was built, what it proved, and where it stops. The Emergency Response Analytics finding (three models, no usable signal, a recommendation built around that) is the signature story.

**Messaging hierarchy**

| Level | Message |
|---|---|
| Slogan | Thinker. Builder. Game Changer. |
| Value line | I turn business and user needs into working digital solutions, from the first question to the tested result. |
| Mission | Good technology starts with the right question and ends with evidence. |
| Belief | I report what the evidence shows. |
| Ask | Let's solve the right problem. |

---

## 3. Brand personality

| Trait | Shows up as | Never becomes |
|---|---|---|
| **Thinker** — curious, rigorous | Questions before answers, requirements counted, limits stated | Academic or wordy |
| **Builder** — practical, hands-on | Real tools named, real numbers, status labels | Jargon-dumping or tool lists without context |
| **Game Changer** — calm, confident leadership | Evidence-led recommendations, community roles | Hype, "disruption", motivational-speaker energy |

**Voice:** first person, plain English, short sentences, precise numbers. Warm but not chatty.
**Banned words:** passionate, rockstar, ninja, guru, revolutionary, world-class, cutting-edge, synergy, "10x".
**Tone reference:** a well-edited annual report written by someone you'd enjoy working with.

---

## 4. Visual direction

**Mood:** High-end editorial in morning daylight. Limestone, linen, jasmine leaves, a thin line of gold. Calm confidence.

**Drawn from the reference photo:** ivory fabric, deep jasmine-leaf green, white flowers, a touch of gold.

**Do**
- Generous white space; let huge type breathe
- Thin gold hairlines as structure (rules, dividers, progress lines)
- Soft, low shadows; paper-like surfaces
- Real daylight in the video scenes, with soft leaf shadows
- Subtle film grain at ~3% opacity across the page

**Don't**
- Dark sci-fi, neon, black voids, floating holograms, glowing screens
- Orange, red or pink accents
- Stock icons, emoji, gradients that look like app UI
- Gold for small text

**Art direction keywords:** *daylight · limestone · linen · jasmine · editorial · quiet gold · evidence*

---

## 5. Higgsfield Seedance 2.0 — asset generation

### 5.1 Identity reference
- **Source file:** `Media/[REFERENCE IMAGE FILENAME]` (Leen's own photo). The `Media/` folder is source material only; the site never loads it.
- The reference must be uploaded to Higgsfield (`media_upload` → PUT → `media_confirm`) and its `media_id` reused for **every** generation so the character stays consistent.
- Hijab, colour, drape, neckline and covered arms must match the reference in every frame. Reject any take where styling drifts.

### 5.2 Generation settings (all three scenes)

| Setting | Value |
|---|---|
| Model | Seedance 2.0 on Higgsfield (confirm exact model id with `models_explore` before generating) |
| Resolution | 1080p |
| Aspect ratio | 16:9 |
| Duration | Scene 1: 10 s · Scene 2: 10 s · Scene 3: 12 s |
| Camera | Slow and steady, one move per clip, no cuts |
| Audio | None (strip on export) |
| Takes | Generate 1 take per scene, review, regenerate only the scenes that fail QA |

### 5.3 Recommended workflow (best identity lock)
1. **Start frames:** generate one still per scene from the identity reference (same wardrobe block, same location description, first-frame composition). Review for face, hijab and wardrobe accuracy.
2. **Animate:** run Seedance 2.0 image-to-video from each approved start frame, with the identity reference attached and the scene prompt below.
3. **QA checklist per clip:** same face · hijab exactly as reference · arms covered · no readable text · no logos · no holograms · hands natural · camera smooth · last ~1 s is a steady hold (makes scroll hand-off clean).

Credits are spent from Leen's connected Higgsfield account. Claude Code shows the quote and gets approval before generating.

### 5.4 Shared prompt block (append to every scene)
> Use the reference image as the identity reference. Same woman, same face. Cream hijab styled exactly as in the reference, tailored ivory modest clothing with covered arms, small gold pendant. Natural daylight, warm and realistic, shallow depth of field. Palette of ivory, limestone, deep jasmine-leaf green and small gold highlights. 1080p, 16:9, slow and steady camera. No readable text, no logos, no holograms, no exaggerated expressions.

**Negative prompt (all scenes):**
> readable text, letters, logos, watermarks, holograms, floating screens, neon, dark sci-fi, black background, changes to hijab or clothing, exposed arms, extra fingers, warped hands, distorted face, exaggerated expression, camera shake, fast motion, cuts

### 5.5 Post-production (ffmpeg, run locally by Claude Code)
For each clip `scene-N-name.mp4`:

```bash
# Desktop scrub version: 1600 px wide, short keyframe interval for smooth seeking, no audio
ffmpeg -i raw/scene-1-thinker.mp4 -an -vf "scale=1600:-2,fps=24" -c:v libx264 -preset slow -crf 25 \
  -x264-params keyint=6:min-keyint=6:scenecut=0 -pix_fmt yuv420p -movflags +faststart assets/video/scene-1-thinker.mp4

# Mobile version: 960 px wide, plays inline instead of scrubbing
ffmpeg -i raw/scene-1-thinker.mp4 -an -vf "scale=960:-2,fps=24" -c:v libx264 -preset slow -crf 27 \
  -pix_fmt yuv420p -movflags +faststart assets/video/scene-1-thinker-mobile.mp4

# Poster = first frame (for mobile, slow connections, reduced motion and Save-Data)
ffmpeg -i raw/scene-1-thinker.mp4 -frames:v 1 -vf "scale=1600:-2" -c:v libwebp -quality 80 assets/video/scene-1-thinker-poster.webp
ffmpeg -i raw/scene-1-thinker.mp4 -frames:v 1 -vf "scale=1600:-2" -q:v 3 assets/video/scene-1-thinker-poster.jpg
```

**Budgets:** desktop scrub clip ≤ 6 MB, mobile clip ≤ 2.5 MB, poster ≤ 180 KB. Raise CRF by 1–2 if over budget. Raw downloads live in `raw/` (git-ignored), never in `/assets`.

---

## 6. Three cinematic scenes

Format: **three separate videos**, each showing something different. Each one scrubs with scroll inside a pinned section, then hands over to the next section with a soft fade.

### Scene 1 — The Thinker
| | |
|---|---|
| Placement | Hero |
| Length | 10 s |
| Camera | Slow push-in, wide → medium |
| Framing | Leen in the **right third** of frame so the headline can sit on the left |
| Files | `assets/video/scene-1-thinker.mp4`, `-mobile.mp4`, `-poster.webp`, `-poster.jpg` |

**Prompt**
> A bright limestone studio in morning light, with soft jasmine-leaf shadows moving gently across the wall. She stands at a long wall of blank cream cards linked by fine gold thread, positioned in the right third of the frame. She pins one card, steps back, tilts her head and gives a quiet smile as the pattern becomes clear. Slow, steady push-in from a wide shot to a medium shot, ending on a calm hold. [+ shared prompt block]

**Scroll mapping:** 0% = wide, cards visible · 50% = card pinned · 100% = medium shot, quiet smile, hold.

### Scene 2 — The Builder
| | |
|---|---|
| Placement | Three pillars section |
| Length | 10 s |
| Camera | Slow lateral slide, from her hands to her face |
| Framing | Action kept in the **centre 60%** so it survives a portrait crop on the sticky column |
| Files | `assets/video/scene-2-builder.mp4`, `-mobile.mp4`, `-poster.webp`, `-poster.jpg` |

**Prompt**
> A pale oak workbench beside a tall window in soft daylight. An open laptop faces away from camera, beside a paper notebook and a small wheeled robot with a visible circuit board. Close on her hands as she connects the last wire, sets the robot down, and it rolls forward a short way. The camera slides slowly sideways from her hands up to her face; she looks up, satisfied. Ends on a calm hold. [+ shared prompt block]

**Scroll mapping:** Pillar 01 Thinker = hands and wire · Pillar 02 Builder = robot rolls · Pillar 03 Game Changer = she looks up, satisfied.

### Scene 3 — The Game Changer
| | |
|---|---|
| Placement | Leads into the final CTA |
| Length | 12 s |
| Camera | Slow backward dolly as she walks towards camera |
| Framing | Subject centred; soft open sky in the upper third for overlay type |
| Files | `assets/video/scene-3-gamechanger.mp4`, `-mobile.mp4`, `-poster.webp`, `-poster.jpg` |

**Prompt**
> A rooftop terrace in Amman at golden hour, with limestone buildings softly blurred behind and white jasmine along the railing. She finishes a conversation with a small team at a table, and they nod. She turns and walks calmly towards camera, then stops with a relaxed, confident expression. Slow backward dolly, ending on a steady hold. [+ shared prompt block]

**Scroll mapping:** 0–40% = team conversation · 40–85% = walk to camera · 85–100% = hold, then fade to the final CTA.

---

## 7. Website structure

```
00  Preloader            name + gold hairline progress, curtain wipe
01  Nav                  fixed, minimal, "Get in touch" always visible
02  Hero                 #top           Scene 1 scrub, kinetic headline
03  Stats strip          #stats         five animated stats
04  Mission              #mission       word-by-word scroll reveal
05  Three pillars        #pillars       Scene 2 sticky scrub + three pillars
06  Story                #story         timeline 2018 → 2027, education line
07  How I work           #how           pinned horizontal five-stage process
08  Featured work        #work          six stacked case-study cards
09  More work            #more          filterable project index
10  Recognition          #recognition   awards, leadership, skills
11  Marquee band                        velocity-reactive slogan
12  Scene 3 + Final CTA  #contact       Scene 3 scrub → fade to CTA
13  Footer                              wordmark, links, note, ©
```

**Nav items:** Work · How I work · Story · Recognition · **Get in touch** (pill button)
**Logo:** `LN` monogram in Fraunces with a gold dot; links to `#top`.

---

## 8. Hero section

**Layout (desktop):** The Scene 1 video starts as an inset frame (ivory margins of ~4vw, 24 px radius). On scroll the frame expands to full-bleed while the headline reveals. A soft ivory scrim from left keeps type readable over the bright video.

**Copy**
- **Eyebrow:** Computer Science student · Amman, Jordan
- **Headline (H1):** Thinker. Builder. *Game Changer.* — one word per line, "Game Changer." in Fraunces italic
- **Subhead:** I turn business and user needs into working digital solutions, from the first question to the tested result.
- **Buttons:** `Get in touch` (primary, Leaf) · `See my work` (secondary, outline → `#work`)
- **Scroll cue:** a thin gold line that draws downward with the label "Scroll"

**Motion sequence**
| Scroll progress (pinned ~240vh) | What happens |
|---|---|
| On load | Eyebrow fades up, "Thinker." rises from a mask, scroll cue draws |
| 0 → 100% | Video scrubs through all 10 s; frame expands inset → full-bleed (0–35%) |
| 20% | "Builder." rises |
| 42% | "Game Changer." rises (italic), gold hairline draws under it |
| 60% | Subhead and buttons fade up |
| 90–100% | Hero content drifts up slightly, video dims to 85%, hand-off to stats |

The nav "Get in touch" is visible from first paint, so the main CTA is never gated behind scrolling.

---

## 9. Animated stats strip

Ivory band framed by gold hairlines top and bottom. Five columns on desktop, divided by vertical hairlines.

| Value | Label | Animation |
|---|---|---|
| **1st** | Sketch Storm UI/UX competition, HTU, 2024 | Word mask-reveal (no count) |
| **Top 3** | in Jordan, StarT International Award, 2022 | Word mask-reveal (no count) |
| **3** | database models in one system: Oracle, MongoDB, Neo4j | Count 0 → 3 |
| **2 to 10** | auto-scaling instances across 3 AWS Availability Zones | "2 to" static, 10 counts 2 → 10 |
| **3.77×** | speed-up on 4 threads, at 94% efficiency | Count 0.00 → 3.77, × fades in last |

- Values: Instrument Sans 500, tabular numerals, gold, very large. Labels: Instrument Sans, Muted.
- Trigger once when the strip is 75% into view; 1.6 s, `power3.out`, 0.12 s stagger.
- Numbers are written in the HTML as their final values (accessible and correct without JS); JS animates from zero.

---

## 10. Mission section

- **Eyebrow:** Why I do this
- **Statement (Display XL, kinetic):** *Good technology starts with the right question and ends with evidence.*
- **Body:** I want to close the gap between what people need and what gets built — then show, honestly, what worked and what comes next.

**Motion:** the statement is split into words; each word scrubs from 15% to 100% opacity as you scroll (pinned ~120vh). "right question" and "evidence" settle in Leaf italic with a gold underline that draws in.

---

## 11. Story section

**Layout:** Left column sticky with the section heading and a portrait-style crop of the Scene 1 poster; right column scrolls through a vertical timeline on a gold hairline that draws as you read.

- **Eyebrow:** My story
- **Heading:** I started building before university.

**Body copy**
> At school I took third place in Jordan's Best Applied Science Projects Competition in 2018, and in 2022 I reached Jordan's top 3 in the StarT International Award. Along the way I worked on Plandr, a plant-disease detection project using image processing, and Smarpl, an IoT greenhouse.
>
> At Al Hussein Technical University I study Computer Science. In May 2024 I won first place in the Sketch Storm UI/UX competition and third place at the Super Girls ICT Hackathon. In 2025 I spent eight months in the BIG by Orange incubation programme as founder and game project manager of Once Upon a JOurney.
>
> My degree has taken me through the full lifecycle: requirements, design, software, cloud, data and testing. Alongside it I served as Treasurer of IEEE HTU and now serve as Vice Chair, and I have contributed to GDG on Campus, the Game Development and VR Club and the Abdul Hameed Shoman Foundation.

**Pull quote (Display L, Fraunces italic):**
> "I report what the evidence shows."
> When three models found no usable signal in 5,000 emergency incidents, that became my finding, and I built my recommendation around it.

**Education line (use exactly, do not edit):**
> B.Sc. Computer Science, Al Hussein Technical University (HTU), started October 2023. Expected graduation: [GRADUATION DATE].

**Timeline markers**
| Year | Marker |
|---|---|
| 2018 | 3rd place, Best Applied Science Projects Competition |
| 2022 | Jordan Top 3, StarT International Award |
| Oct 2023 | Starts B.Sc. Computer Science at HTU |
| May 2024 | 1st place, Sketch Storm · 3rd place, Super Girls ICT Hackathon |
| 2025 | BIG by Orange incubation, Once Upon a JOurney |
| Oct 2025 | Treasurer, IEEE HTU |
| Oct 2026 | Vice Chair, IEEE HTU |
| Feb 2027 | Available full-time |

---

## 12. Three pillars section

**Layout (desktop):** pinned two-column section (~300vh). Left: sticky Scene 2 video in a tall rounded frame, scrubbing. Right: one pillar at a time crossfades in, with a large gold numeral and a progress rail (01 · 02 · 03).

- **Eyebrow:** Three ways I work
- **Heading:** Thinker. Builder. Game Changer.

| # | Pillar | Headline | What it covers | Proof chips |
|---|---|---|---|---|
| 01 | Thinker | I start by finding the real problem. | Business analysis, requirements, process thinking and user research. | Blood Hub · Karaz · 1st place, Sketch Storm |
| 02 | Builder | I turn plans into systems that run. | Software, cloud and data engineering, with testing built in. | HTUNews on AWS · HealthBooking · Multi-Model Blood Bank |
| 03 | Game Changer | I move decisions forward with evidence and people. | Data-driven recommendations, leadership and community. | Emergency Response Analytics · IEEE HTU Vice Chair (formerly Treasurer) · BIG by Orange incubation |

Proof chips that match a featured case study link to that card (`#work-blood-bank` etc.).

**Hand-off:** at the end of the pin the video fades out to ivory as the Story section rises.

---

## 13. Product / Service / Community section — "How I work"

- **Eyebrow:** How I work
- **Heading:** From the first question to the tested result.

**Layout (desktop):** pinned horizontal scroll. Five stage panels travel left; a gold hairline runs through all five and fills as you move. Each panel has a big italic stage number, the stage name, what Leen does, and a "Where to see it" proof line.

| # | Stage | What I do | Where to see it |
|---|---|---|---|
| 01 | Understand | Requirements, feasibility, risk, user research | Blood Hub: 10 functional and 7 non-functional requirements |
| 02 | Design | Personas, flows, data models, prototypes | Karaz: from low-fidelity sketches to a high-fidelity Figma prototype |
| 03 | Build | Web apps, databases, cloud infrastructure | HTUNews and HealthBooking on AWS, TrainWise in ASP.NET Core |
| 04 | Test | Test cases, traceability, integration tests | Jawlatuna: 10 test cases, 2 defects logged and resolved |
| 05 | Improve | Feedback, measurement, honest review | Task Management: peer review removed open signup |

---

## 14. Featured work section

- **Eyebrow:** Featured work
- **Heading:** Work that shows its evidence.
- **Intro:** Six university projects. Each shows its status, what I did, what happened, and where its limits are.
- **Status legend:** `Deployed` · `Built` · `Prototype` · `Design only` · `Research plan`

**Layout:** stacked sticky cards. Each card pins near the top and the next card slides over it, while the previous one scales to 0.94 and dims slightly. Card anatomy:

```
┌───────────────────────────────────────────────────────────────┐
│ 01                                     [ Built ]   University project │
│ Multi-Model Blood Bank (Fraunces, large)                          │
│ Oracle PL/SQL · MongoDB · Neo4j · Python · pytest                 │
│ ─────────────── gold hairline ─────────────────────────────────── │
│ The need     │ …                                                  │
│ What I did   │ …                                                  │
│ Result       │ … (key figures set in Leaf, tabular)               │
│ Limit        │ … (marked with a gold rule + "Limit" label)        │
│ ─────────────────────────────────────────────────────────────── │
│ [REPO LINK]                                                       │
└───────────────────────────────────────────────────────────────┘
```

### 01 · Multi-Model Blood Bank — `Built`
**Tools:** Oracle PL/SQL, MongoDB, Neo4j, Python, pytest
- **The need:** A regional blood bank brief covers three kinds of data: structured stock, irregular cold-chain readings, and road routes between centres and hospitals.
- **What I did:** I gave each kind of data the database that suits it: 8 Oracle tables with views, triggers and a package; 50 MongoDB documents; and a Neo4j graph with 7 Cypher queries. One Python desktop app connects all three, covered by 3 pytest integration tests.
- **Result:** Neo4j answered the connected-data query in 22 ms against Oracle's 132 ms. MongoDB ran the aggregation in 17 ms against Oracle's 101 ms.
- **Limit:** These timings come from a small dataset and a few runs, and each engine ran a comparable workload rather than an identical query. Concurrency is untested. Shortest path counts hops, not kilometres.
- **Link:** [REPO LINK]

### 02 · HTUNews on AWS and HealthBooking Serverless — `Deployed`
**Status note:** Deployed to a live AWS account for coursework.
**Tools:** EC2, ALB, Auto Scaling, S3, IAM, Route 53, ACM, Lambda, API Gateway, DynamoDB, Amplify, CloudWatch
- **The need:** Two scenarios: move a news site to secure, scalable cloud infrastructure, and launch a serverless medical appointment system.
- **What I did:** For HTUNews I built a load-balanced Auto Scaling group across 3 Availability Zones, with IAM groups, MFA, chained security groups and HTTPS. For HealthBooking I connected a Vue front end to five Python Lambdas and two DynamoDB tables, with a least-privilege IAM role.
- **Result:** HTUNews scales from 2 to 10 instances at a 60% CPU target, with weighted routing to move traffic in four steps. HealthBooking resets slots and appointments at midnight Amman time through EventBridge, sends notifications through SNS and reports through a CloudWatch dashboard.
- **Limit:** HTUNews is an assignment scenario, not a client. I declared AI-assistant support in my report, deployed the services myself and can explain each decision.
- **Links:** [REPO LINK] · [LIVE DEMO LINK IF RUNNING]

### 03 · Blood Hub Donation System — `Design only`
**Tools:** Feasibility analysis, use cases, DFDs, ERD, UML, wireframes, traceability
- **The need:** Blood donation coordination in Jordan leans on manual processes and social media appeals, with no central view of available donors.
- **What I did:** I ran a feasibility study and risk assessment, then wrote 10 functional and 7 non-functional requirements. I added 6 user stories with Given-When-Then criteria, full analysis models and wireframes, and considered Jordan's data protection law (PDPL 24/2023) and SANAD integration.
- **Result:** A "conditionally feasible" verdict and a traceable design pack, with a hybrid Waterfall and Scrum delivery approach.
- **Limit:** This is a proposed design based on desk research. It has not been built or tested with donors or hospitals.
- **Link:** [CASE STUDY PDF]

### 04 · Karaz — `Prototype`
**Tools:** Figma, personas, segmentation, Value Proposition Canvas
- **The need:** People with allergies, intolerances or insulin resistance need a quick way to check whether a food suits them.
- **What I did:** I defined the audience with a persona and a Value Proposition Canvas, then evolved the app from low-fidelity sketches to a high-fidelity Figma prototype.
- **Result:** Feedback changed the product. A doctor's input removed AI medicine analysis, and friends and family replaced meal-by-meal logging with one daily log.
- **Limit:** Karaz is a prototype, not a released app, and the feedback came from a small group.
- **Link:** [FIGMA VIEW LINK]

### 05 · Jawlatuna — `Built (no-code)`
**Tools:** Adalo, SRS, SDS, functional specification, traceability matrix
- **The need:** A tourism booking idea needed proof of demand and a disciplined route from requirements to testing.
- **What I did:** I surveyed potential users, assessed feasibility including legal issues, and followed an incremental model. I built the app in Adalo and traced 7 functional requirements through a matrix to 10 test cases.
- **Result:** Testing logged 2 defects, and both were resolved.
- **Limit:** The survey sample was small, and the no-code build is a working proof of concept rather than a production system.
- **Link:** [CASE STUDY PDF]

### 06 · Emergency Response Analytics — `Built` · *signature story*
**Tools:** Python, scikit-learn, PyGAD, SciPy, Jupyter
- **The need:** An emergency-centre scenario asked whether response time could be predicted from operational data.
- **What I did:** I sampled 5,000 incidents from 368,000 rows, then compared two feature selection methods and three regression models. I also built a constrained genetic algorithm that produces a readable weighted formula, and checked it with SciPy.
- **Result:** All three models scored R² near zero, with an average error of about 4 minutes. I reported that the fields held no usable signal, and recommended planning around the stable 15-minute average while collecting richer data.
- **Limit:** The genetic algorithm's target was built from its four input fields. It shows constrained optimisation working, not forecast accuracy on real response times.
- **Link:** [NOTEBOOK LINK]

Card 06 gets a subtle distinction: the pull quote "I report what the evidence shows." echoes in small italic above the title.

---

## 15. More work (project index)

- **Eyebrow:** More work
- **Heading:** Eleven more, labelled honestly.
- **Filter chips:** All · Built · Design only · Research plan (filters with a FLIP animation; counts shown on chips)

Layout: full-width rows separated by hairlines — project name (Fraunces), status pill, "what it shows" text. Desktop hover: row text shifts 12 px right and a gold hairline draws under it.

| Project | Status | What it shows |
|---|---|---|
| TrainWise | Built | ASP.NET Core MVC training platform with EF Core, SQL Server, Identity, three signed-in roles, a Web API and Swagger |
| Matrix Manipulation System | Built | Nine C programs using processes, threads, pipes, FIFOs and sockets, tested with 10 concurrent clients. 3.77× speed-up on 4 threads on 700×700 matrices |
| Task Management Website | Built | MERN app with JWT and bcrypt, run as solo Scrum. Peer review removed open signup and added employee task suggestions |
| Nutricost MCT Decision Dashboard | Built | Power BI model with DAX and forecasting on public Amazon product data. Case study only, not commissioned by Nutricost |
| Karen in the Kitchen | Built | Unity educational game teaching CPU scheduling, built with tutorial guidance and tested with 3 groups |
| Milkcake Bakery Website | Built | PHP and MySQL site with Bootstrap, planned in Figma and Canva, with a written test plan |
| Competition Voting System | Built | SQL Server database normalised to 3NF, with role-based permissions and stored procedures |
| Maze Solving Robot | Built | Arduino, 3D printing and Fusion 360 |
| Regional Office Network | Design only | OSPF ring network linking an Amman head office, six regional branches and a data centre, modelled for an assignment scenario |
| NovaSecure Security Plan | Design only | Risk and security planning with NIST RMF and ISO 31000, for an assignment scenario |
| 3D-Print Defect Detection | Research plan | Survey-based research and a YOLOv8 plan. Nothing built yet |

---

## 16. Recognition: awards, leadership and skills

### 16.1 Awards
Large gold year numerals on the left, award and issuer on the right, hairline rows. Rows reveal with a mask as they enter.

| Year | Award | Issuer |
|---|---|---|
| 2024 | 1st place, Sketch Storm UI/UX competition | Al Hussein Technical University |
| 2024 | 3rd place, Super Girls ICT Hackathon | Orange Digital Centre Coding School |
| 2022 | Jordan Top 3, StarT International Award for student projects and research | LUMA Centre Finland |
| 2018 | 3rd place, Best Applied Science Projects Competition for School Students in Jordan | Hamdi Mango Center for Scientific Research |

### 16.2 Leadership and community
| Role | Organisation | Dates |
|---|---|---|
| Vice Chair (previously Treasurer, Oct 2025 – Oct 2026) | IEEE HTU | October 2025 – present |
| Ambassador | JSYP 2026 | May 2026 – August 2026 |
| CS Tech Consultant | GDG on Campus HTU | October 2025 – September 2026 |
| Technical Team Member | Game Development and VR Club | March 2025 – present |
| Founder and Game Project Manager, Once Upon a JOurney | BIG by Orange incubation | March – October 2025 |
| Content Creator | HTU Entrepreneurship Club | April – July 2025 |
| Ambassador, event photography and live events | Abdul Hameed Shoman Foundation | July 2024 – December 2025 |
| Judge and team guide (2024), main organiser (2025) | Sumo Robots Contest | 2024 – 2025 |
| Staff, largest human image of a pencil (1,035 participants) | Guinness World Records attempt | June 2022 |

### 16.3 Skills
Seven tiles in a 4/3 grid; each tile has an area name in Fraunces and tools as small hairline-bordered tags.

| Area | Tools and methods |
|---|---|
| Languages | Python, Java, C, C#, JavaScript, PHP, SQL, PL/SQL, Cypher, Bash |
| Software | ASP.NET Core MVC, Entity Framework Core, React, Node.js, Express, Vue, Bootstrap, Unity |
| Data | Oracle, SQL Server, MySQL, MongoDB, Neo4j, DynamoDB, Power BI, DAX, scikit-learn, PyGAD |
| Cloud | AWS compute, networking, storage, IAM, serverless and monitoring services |
| Analysis and design | Requirements, use cases, user stories, UML, DFDs, ERDs, personas, Figma |
| Quality and delivery | Test plans, traceability matrices, pytest, Swagger, Scrum, incremental delivery, Git and GitHub |
| Languages spoken | Arabic (native), English (B2–C1) |

---

## 17. Final CTA section

**Sequence:** a velocity-reactive marquee band ("Thinker · Builder · Game Changer ·", Fraunces italic, outline + solid alternating) leads into a pinned full-bleed Scene 3 (~220vh). The video scrubs through the rooftop scene; over the final 15% a Leaf-green veil fades up from the bottom, the page background tweens from Ivory to Leaf, and the CTA rises out of it.

**Copy (on Leaf, Ivory text)**
- **Headline (Display XXL, kinetic, letter-by-letter rise):** Let's solve the right problem.
- **Body:** I'm looking for a full-time internship in digital transformation in Amman, available from February 2027.
- **Buttons:** `Get in touch` (Ivory fill, Leaf text, magnetic) · `Download CV` (Ivory outline)
- **Text links:** LinkedIn · GitHub · leen.faisal.nimer@gmail.com (click copies the address with a small "Copied" toast; the link still works as mailto)

---

## 18. Footer

Leaf background continues from the CTA.

- **Wordmark:** "Leen Nimer" in Fraunces, sized to span the full container width, revealed with a rising mask
- **Slogan:** Thinker. Builder. Game Changer.
- **Location:** Amman, Jordan
- **Links:** Email · LinkedIn · GitHub · CV
- **Note:** University projects are academic work, and scenario organisations are not clients. Video scenes were generated with AI from my own photo.
- **Legal:** © 2026 Leen Nimer
- **Back to top:** small circular button with an arrow, smooth-scrolls via Lenis

---

## 19. Complete visual style guide

### 19.1 Colour tokens

| Token | Hex | Use | Contrast on Ivory |
|---|---|---|---|
| `--ivory` | `#FBF7EF` | Page background | base |
| `--jasmine` | `#FFFFFF` | Cards, raised surfaces | base |
| `--ink` | `#1E2A24` | Body text | 13.92:1 |
| `--leaf` | `#23483A` | Headlines, buttons, dark sections | 9.54:1 |
| `--muted` | `#5C655F` | Secondary text | 5.64:1 |
| `--gold` | `#A67C37` | Hairlines, numerals, large accents only | 3.53:1 (large only) |
| `--gold-on-leaf` | `#C9A15E` | Large gold accents on Leaf backgrounds only (derived) | ~4.2:1 on Leaf |
| `--ivory-2` | `#F4EEE2` | Alternate section tint (derived) | — |
| `--ivory-72` | `rgba(251,247,239,.72)` | Secondary text on Leaf (derived) | ~5.7:1 on Leaf |
| `--hairline` | `rgba(166,124,55,.45)` | 1 px rules | — |

**Rules:** gold never for text under 24 px (or under 19 px bold). Body text is always Ink or Muted on Ivory, Ivory or `--ivory-72` on Leaf. Status pills use Leaf text.

### 19.2 Surfaces, shape, depth
- Radius: `4px` small elements · `20px` cards · `28px` video frames · `999px` pills
- Shadow (cards): `0 1px 2px rgba(30,42,36,.04), 0 18px 48px -18px rgba(30,42,36,.14)`
- Borders: 1 px `--hairline`
- Grain: fixed full-page SVG `feTurbulence` noise overlay, `opacity: .03`, `mix-blend-mode: multiply`, `pointer-events: none`; shifts position in 8 steps per second (static under reduced motion)

### 19.3 Layout grid
- Max container 1440 px; side gutters `clamp(16px, 4vw, 64px)`
- 12 columns desktop, 6 tablet, 4 mobile; gap `clamp(16px, 2vw, 32px)`
- Section spacing `clamp(96px, 14vw, 224px)`
- 8 px spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128

### 19.4 Status pills
All pills: Instrument Sans 600, 12 px, uppercase, 0.08em tracking, Leaf text — always written out, never colour-only.

| Status | Style |
|---|---|
| Deployed | Leaf fill, Ivory text, small solid dot |
| Built | 1 px Leaf outline, solid dot |
| Built (no-code) | Built style + "(no-code)" suffix |
| Prototype | 1 px dashed Leaf outline, half-filled dot |
| Design only | 1 px Muted outline, Muted text, hollow dot |
| Research plan | 1 px dotted Muted outline, Muted text, hollow dashed dot |

### 19.5 Buttons
- **Primary:** Leaf fill, Ivory text, 56 px tall, 28 px horizontal padding, pill. Hover: fill wipes to Ink from left, arrow nudges 4 px. Magnetic on desktop.
- **Secondary:** 1 px Leaf outline, Leaf text. Hover: fills Leaf, text Ivory.
- **Text link:** Ink text, gold hairline underline that redraws left → right on hover.
- **Focus:** 2 px Leaf outline, 3 px offset (Ivory outline on Leaf sections).

### 19.6 Iconography
Hand-built inline SVG arrows and dots only, 1.5 px strokes, round caps. No icon libraries.

---

## 20. Typography

### 20.1 Families (Google Fonts)
- **Display:** Fraunces (variable: `opsz 9–144`, `wght 300–700`, roman + italic)
- **Body/UI:** Instrument Sans (variable: `wght 400–700`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Instrument+Sans:wght@400..700&display=swap" rel="stylesheet">
```

### 20.2 Scale

| Role | Family | Size | Line height | Tracking | Weight |
|---|---|---|---|---|---|
| Display XXL (hero, CTA) | Fraunces, opsz 144 | `clamp(4rem, 13vw, 15rem)` | 0.88 | -0.045em | 350 |
| Display XL (mission) | Fraunces, opsz 144 | `clamp(2.75rem, 7.5vw, 8.5rem)` | 0.95 | -0.035em | 350 |
| Display L (H2) | Fraunces, opsz 96 | `clamp(2.25rem, 5vw, 5.5rem)` | 1.0 | -0.03em | 400 |
| H3 (card titles) | Fraunces, opsz 48 | `clamp(1.6rem, 2.6vw, 2.5rem)` | 1.1 | -0.015em | 450 |
| Stat value | Instrument Sans, `tnum` | `clamp(3rem, 6vw, 6.5rem)` | 1.0 | -0.04em | 500 |
| Body L | Instrument Sans | `clamp(1.125rem, 1.4vw, 1.375rem)` | 1.55 | 0 | 400 |
| Body | Instrument Sans | `1.0625rem` | 1.65 | 0 | 400 |
| Eyebrow / label | Instrument Sans | `0.8125rem` | 1.2 | 0.14em, uppercase | 600 |
| Small / meta | Instrument Sans | `0.875rem` | 1.5 | 0.01em | 400 |

### 20.3 Rules
- Body measure 60–70 characters max.
- Italic Fraunces is the accent voice: "Game Changer.", "right question", "evidence", pull quotes.
- `font-variant-numeric: tabular-nums` on stats, years, timings and results.
- `text-wrap: balance` on headings, `text-wrap: pretty` on body.
- Hanging punctuation on pull quotes.

### 20.4 Placeholder styling
`[SQUARE BRACKET]` placeholders render as `<span class="placeholder">` — Muted text, 1 px dashed gold border, 4 px radius, monospace-free (Instrument Sans), `cursor: help`, `title="Placeholder — to be replaced"`. They are not links until replaced.

---

## 21. Animation direction

**Principle:** *Slow camera, quick type.* Video moves at the scroll's pace; type arrives crisply and settles. Nothing bounces. Nothing spins.

| Token | Value |
|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` (GSAP `expo.out`) |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` (GSAP `power3.inOut`) |
| Reveal duration | 1.1 s (type), 0.8 s (UI), 1.6 s (counters) |
| Stagger | 0.06 s per word, 0.025 s per letter, 0.12 s per item |
| Mask reveal | Words translate from `110%` inside `overflow: clip` lines |

**Kinetic typography catalogue**
1. **Mask rise** — headings split into lines → words; words rise from a clip mask. Used for H1, H2, CTA.
2. **Scroll ink** — words scrub from 15% to 100% opacity tied to scroll. Mission statement, pull quote.
3. **Letter cascade** — letters rise with slight per-letter delay. Final CTA headline, footer wordmark.
4. **Velocity marquee** — marquee speed and skew (max ±6°) respond to Lenis scroll velocity.
5. **Hairline draw** — gold rules scale from `scaleX(0)` with `transform-origin: left`.
6. **Counters** — numeric stats count up once (see §9).

**Cinematic transitions between sections**
- Hero → Stats: hero content drifts up 8vh and fades; video dims.
- Pillars → Story: video frame fades to Ivory while the Story heading rises.
- How I work → Featured work: horizontal track exits left; first card rises from below with scale 0.96 → 1.
- Marquee → Scene 3: video frame grows from 80% width to full-bleed.
- Scene 3 → CTA: Leaf veil fades up, body background tweens Ivory → Leaf.

**Preloader:** Ivory screen; "Leen Nimer" letters rise; a gold hairline fills with real progress (fonts ready + hero poster decoded + first 25% of the hero clip). Curtain wipes up with `clip-path`. Hard cap 2.5 s. Shortened to 0.6 s on repeat visits in the same session (`sessionStorage`, wrapped in try/catch).

---

## 22. Interaction design

| Interaction | Behaviour | Desktop | Touch |
|---|---|---|---|
| Custom cursor | 8 px Leaf dot + 36 px hairline ring that trails with lerp 0.15; ring grows on links, shows "View" on project cards, "Copy" on email | ✓ (`pointer: fine` only) | — |
| Magnetic buttons | Primary buttons follow the pointer up to 10 px within a 80 px radius, spring back with `elastic.out(1, .4)` | ✓ | — |
| Card tilt | Featured cards tilt max 2° toward pointer | ✓ | — |
| Proof chips | Clicking a pillar proof chip smooth-scrolls (Lenis) to the matching case card and briefly outlines it in gold | ✓ | ✓ |
| Filter chips | More-work filter with FLIP reorder animation; `aria-pressed` state | ✓ | ✓ |
| Email copy | Click copies to clipboard and shows "Copied" toast; mailto still opens | ✓ | ✓ |
| Nav | Hides on scroll down, reveals on scroll up; gets an Ivory blur background after 80 px; active section underline follows scroll | ✓ | ✓ |
| Mobile menu | Full-screen Ivory sheet, links rise with stagger, Esc/backdrop closes, focus trapped | — | ✓ |
| Scroll progress | 2 px gold line at the very top of the viewport | ✓ | ✓ |

---

## 23. Scroll behaviour

- **Lenis** smooth scroll: `duration: 1.15`, `easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))`, `smoothWheel: true`, native touch scrolling (`syncTouch: false`).
- **GSAP ticker drives Lenis**: `gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); lenis.on('scroll', ScrollTrigger.update);`
- Anchor links route through `lenis.scrollTo(target, { offset: -80 })`.

**Pinned sections (desktop ≥ 1024 px)**
| Section | Pin length | Scrubbed content |
|---|---|---|
| Hero | 240vh | Scene 1 + frame expand + word reveals |
| Mission | 120vh | Word opacity |
| Pillars | 300vh | Scene 2 + pillar crossfades |
| How I work | ~(track width − viewport) | Horizontal track + gold progress line |
| Scene 3 + CTA | 220vh | Scene 3 + veil + CTA rise |

**Video scrub engine**
- Load each desktop scrub clip with `fetch()` → `Blob` → `URL.createObjectURL()` so seeking never waits on range requests. Hero loads immediately; Scenes 2 and 3 start loading when their section is within 1.5 viewports.
- ScrollTrigger `onUpdate` sets `target = progress * (duration - 0.05)`.
- A rAF loop eases `current += (target - current) * 0.12` and only writes `video.currentTime` when `!video.seeking` and the delta is > 1/48 s.
- Until the clip is ready, the poster image shows; the clip fades in over 400 ms once `canplaythrough` fires.

---

## 24. Mobile behaviour (< 768 px; tablet 768–1023 px follows mobile rules for video)

- **Video:** no scroll-scrubbing. Each scene uses its `-mobile.mp4`, `muted playsinline loop`, autoplaying only while ≥ 40% visible (IntersectionObserver) and pausing when out of view. Poster shows first.
- **Save-Data, 2G/slow-2G or `prefers-reduced-motion`:** posters only, no video download.
- **Hero:** no pin. Video fills 78svh with the headline stacked below the frame's lower edge; all three words reveal in sequence on load (0.15 s apart) since there is no pin to scrub.
- **Pins removed:** Mission becomes a standard on-enter word reveal. Pillars stack as three cards under a single video. How I work becomes a vertical list connected by a gold line on the left. Featured cards stack without the sticky overlap.
- **Type:** Display XXL clamps to ~4rem; long words never overflow (`overflow-wrap: anywhere` on display type as a safety net).
- **Touch targets:** ≥ 48 px. Buttons full-width in the hero and CTA.
- **Stats:** 2-column grid, 5th stat spans both columns.
- **Cursor, magnetic and tilt effects:** off.
- **No horizontal page scroll** at 320 px width — verified.

---

## 25. Technical implementation

### 25.1 File structure
```
/
├── index.html
├── style.css
├── script.js
├── BUILD-PLAN.md
├── .gitignore                 # raw/, .DS_Store
├── Media/                     # identity reference (source only, never loaded by the site)
│   └── [REFERENCE IMAGE FILENAME]
├── raw/                       # Higgsfield downloads (git-ignored)
└── assets/
    ├── Leen-Nimer-CV.pdf      # supplied by Leen
    ├── video/
    │   ├── scene-1-thinker.mp4 / -mobile.mp4 / -poster.webp / -poster.jpg
    │   ├── scene-2-builder.mp4 / -mobile.mp4 / -poster.webp / -poster.jpg
    │   └── scene-3-gamechanger.mp4 / -mobile.mp4 / -poster.webp / -poster.jpg
    └── img/
        ├── favicon.svg        # "LN" monogram, Leaf on Ivory with gold dot
        └── og-image.jpg       # 1200×630, Scene 1 poster crop + name
```

### 25.2 CDN scripts (pinned versions, loaded with `defer` at end of `<body>`)
```html
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script defer src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>
<script defer src="script.js"></script>
```
Lenis' recommended CSS (`html.lenis`, `.lenis-smooth`, `.lenis-stopped`) is inlined in `style.css`. If a CDN fails, `script.js` detects missing globals and falls back to native scroll with all content visible.

### 25.3 HTML
- Semantic landmarks: `header`, `nav`, `main`, `section[aria-labelledby]`, `footer`. One `h1`.
- Skip link to `#main`.
- Videos are decorative: `aria-hidden="true"`, `muted`, `playsinline`, `preload="none"` (hero `preload="auto"`), `poster` set. Each scene also has a visually hidden one-line description for screen-reader context of the section, not of the video.
- All content is in the HTML at its final state. JS only adds the `.js` class and animates from hidden states, so the page is complete with JS off.
- Placeholders: `<span class="placeholder" title="Placeholder — to be replaced">[REPO LINK]</span>`.
- Meta: title, description, canonical (when domain known), Open Graph + Twitter card using `assets/img/og-image.jpg`, `theme-color #FBF7EF`, JSON-LD `Person` (name, jobTitle "Computer Science student", address Amman, sameAs LinkedIn + GitHub, alumniOf omitted — she is still studying; use `affiliation` HTU).

### 25.4 CSS
- Tokens on `:root` (colours, type scale, easing, spacing).
- Light theme only by design (daylight editorial); set `color-scheme: light`.
- Modern reset; `html { -webkit-text-size-adjust: 100% }`; `body { background: var(--ivory) }`.
- Hidden-initial states only under `.js` and `@media (prefers-reduced-motion: no-preference)`.
- `@media (prefers-reduced-motion: reduce)`: no pins, no scrubbing, no grain animation, no cursor, instant reveals, posters instead of video.
- Use `svh/dvh` for mobile viewport heights; `clip-path` + `transform` only for animation (no layout-property animation).
- `content-visibility: auto` with `contain-intrinsic-size` on Recognition and More-work sections.

### 25.5 JavaScript modules (single `script.js`, IIFE, strict mode)
```
init()
├── env            — reduced motion, pointer type, Save-Data/effectiveType, breakpoints via matchMedia
├── preloader      — progress from fonts/poster/clip, curtain, sessionStorage shortcut
├── smoothScroll   — Lenis + GSAP ticker + ScrollTrigger sync, anchor routing
├── splitText      — vanilla splitter: lines → words → chars, preserves <em>, sets aria-label on parent
├── reveals        — mask rise, hairline draw, fade-ups (ScrollTrigger.batch)
├── VideoScrub     — class: blob loader, poster swap, lerp seek loop, lazy activation
├── MobileVideo    — IntersectionObserver play/pause
├── hero           — pinned timeline: frame expand, word reveals, subhead/buttons
├── stats          — counters (integers, "2 to 10", 3.77 with 2 decimals), word reveals
├── mission        — scroll-ink words
├── pillars        — pinned crossfade + Scene 2 scrub + progress rail
├── process        — horizontal pin + progress line
├── work           — stacked sticky cards (scale/dim previous), tilt
├── index          — filter chips with FLIP
├── marquee        — velocity-reactive
├── cta            — Scene 3 scrub, veil, body bg tween, letter cascade
├── cursor         — dot + ring, context labels
├── magnetic       — buttons
├── nav            — hide/reveal, active section, mobile sheet with focus trap
└── copyEmail      — clipboard + toast
```
- Responsive animation via `gsap.matchMedia()` with three contexts: desktop motion, mobile motion, reduced motion. Each context tears down its own ScrollTriggers.
- `ScrollTrigger.refresh()` after fonts load (`document.fonts.ready`) and after each video's metadata loads.
- All `localStorage`/`sessionStorage` access wrapped in try/catch.

### 25.6 Performance budget
| Metric | Target |
|---|---|
| LCP (mobile, 4G) | < 2.5 s — LCP element is the hero poster (`fetchpriority="high"`) |
| CLS | < 0.05 — every media frame has fixed aspect-ratio |
| INP | < 200 ms |
| JS (own) | < 30 KB gzipped |
| Initial transfer (desktop, before Scene 2/3) | < 4 MB |
| Initial transfer (mobile) | < 1.2 MB |
| Lighthouse | ≥ 90 Performance, ≥ 95 Accessibility, Best Practices and SEO |

### 25.7 Build phases for Claude Code
1. **Scaffold:** `index.html`, `style.css`, `script.js`, `.gitignore`, `assets/` tree, favicon SVG.
2. **Content:** all copy from §8–§18 in semantic HTML at final state, placeholders styled.
3. **Style:** tokens, type scale, layout, components, status pills, grain.
4. **Motion:** Lenis + ScrollTrigger, reveals, kinetic type, pins, counters, transitions, interactions.
5. **Video:** generate the three Seedance 2.0 scenes (after credit approval and with the `Media/` reference), post-process with ffmpeg, wire `VideoScrub` and `MobileVideo`. Until videos exist, frames render posters, or an Ivory-to-Ivory-2 gradient with soft leaf-shadow texture if posters are missing too.
6. **QA:** Playwright screenshots at 1440, 1024, 768, 390 and 320 px; reduced-motion pass; JS-off pass; keyboard-only pass; contrast check; copy check against §0 rules (search the build for any banned employer name, "graduated", "client").
7. **Ship:** commit and push to the working branch; deploy to static hosting (GitHub Pages or Hostinger) when Leen chooses.

### 25.8 Acceptance checklist
- [ ] Every project shows its status label
- [ ] Every featured case shows its Limit row
- [ ] No placeholders removed or invented; all `[BRACKETS]` visible
- [ ] Education line matches §11 exactly; no "graduated" anywhere
- [ ] No employer branding, no orange/red/pink accents
- [ ] Gold never used for small text
- [ ] Footer note present: academic work + AI video disclosure
- [ ] Works with JS off, reduced motion on, Save-Data on
- [ ] No horizontal scroll at 320 px
- [ ] Videos load from `/assets` via relative paths

---

## 26. Open placeholders (to be supplied by Leen)

| Placeholder | Where it appears |
|---|---|
| `[GRADUATION DATE]` | Story — education line |
| `[REPO LINK]` | Featured 01 (Multi-Model Blood Bank) |
| `[REPO LINK]` | Featured 02 (HTUNews / HealthBooking) |
| `[LIVE DEMO LINK IF RUNNING]` | Featured 02 |
| `[CASE STUDY PDF]` | Featured 03 (Blood Hub) |
| `[FIGMA VIEW LINK]` | Featured 04 (Karaz) |
| `[CASE STUDY PDF]` | Featured 05 (Jawlatuna) |
| `[NOTEBOOK LINK]` | Featured 06 (Emergency Response Analytics) |
| `[REFERENCE IMAGE FILENAME]` | `Media/` — needed before video generation (not yet in the repository) |
| `assets/Leen-Nimer-CV.pdf` | CV file — needed for the Download CV buttons (not yet in the repository) |

**Resolved from your answers:** `[EMAIL]` → leen.faisal.nimer@gmail.com · `[LINKEDIN URL]` → https://www.linkedin.com/in/leen-nimer-259a24295 · `[GITHUB URL]` → https://github.com/leenfaisalnimer-netizen · `[ARABIC Naitive]` → Arabic (native) · `[ENGLISH B2 - C1]` → English (B2–C1).
