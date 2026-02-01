# SEO Content Factory - Autonomous Work Instructions

## Your Mission
Execute the SEO Article Strategy for gratisschadeverhalen.nl/autoschadebureau.nl INDEPENDENTLY. 
Do NOT ask for permission or input - just execute the plan.

## Work Mode
Sub-agent spawning is NOW AVAILABLE. You can spawn sub-agents for parallel work.
Use `sessions_spawn` tool - do NOT specify `agentId` parameter (let it default to current agent).

## Work Location
`/root/clawd-work/seo-content-factory/`

## Files Available
- `SEO_Article_Strategy.md` - Full strategy document
- `ContentAndSEOPlan.md` - Content plan and keyword research
- `drafts/` - Folder with completed article drafts

## Article Topics Queue (From Strategy)

### Priority 1 - NOT YET WRITTEN:
1. "Leenauto bij schadeherstel: Jouw rechten en mogelijkheden"
2. "De kosten van een letselschade advocaat: Voor jou altijd kosteloos"
3. "Medisch advies bij letselschade: Het belang van een medisch adviseur"
4. "Aansprakelijkheid bij autoschade: De schuldvraag en artikel 185 WvW uitgelegd"
5. "Schadeformulier invullen: Tips om fouten te voorkomen"
6. "Conflicten met de verzekeraar: Wat te doen bij onenigheid"
7. "Schadevrije jaren en premie: De invloed van een schadeclaim"
8. "Getuigenverklaringen bij een ongeval: Waarom ze cruciaal zijn"

### Priority 2 - Verkeersveiligheid:
9. "Tips om autoschade te voorkomen: Van rijgedrag tot preventieve maatregelen"
10. "Veilig rijden in de winter: Gladheid, winterbanden en laagstaande zon"
11. "De gevaren van afleiding in het verkeer: Telefoongebruik en dagdromen"
12. "Nieuwe technologieën: Risico's van e-steps en speed pedelecs"
13. "Verkeersregels rondom rotondes en verkeerslichten"

### Already Completed (in drafts/):
- wat-te-doen-bij-een-aanrijding.md
- autoschade-verhalen-tegenpartij.md
- schade-zonder-dader-waarborgfonds.md
- total-loss-dagwaarde-nieuwwaarderegeling.md
- wat-is-letselschade.md
- letselschade-claimen-verkeersongeval.md
- smartengeld-berekenen.md

## Autonomous Execution Rules

### DO:
1. Pick the next article from the Priority 1 queue
2. Research the topic using web search if needed
3. Write a comprehensive 1500-2500 word article in Dutch
4. Follow SEO best practices from SEO_Article_Strategy.md
5. Save to `drafts/` folder with kebab-case filename
6. Update this file to mark article as completed
7. Move to the next article
8. Report progress summary at end of session
9. Use `sessions_spawn` for parallel work (omit agentId parameter)

### DO NOT:
- Ask permission to start
- Ask which article to write next
- Ask for approval of content
- Wait for input between articles
- Stop after one article (continue until interrupted)

## Article Template

```markdown
# [Article Title with Primary Keyword]

**Meta description:** [150-160 chars with keyword]

## Introductie
[Hook + problem statement + what reader will learn]

## [H2 Section 1 - with keyword variation]
[Content...]

## [H2 Section 2]
[Content...]

## [H2 Section 3]
[Content...]

## Veelgestelde Vragen
### [FAQ 1]
[Answer]

### [FAQ 2]
[Answer]

## Conclusie
[Summary + CTA to schade melden]

---
**Interne links:** [Links to related articles]
**Doelkeywords:** [Primary], [Secondary 1], [Secondary 2]
```

## Sub-Agent Strategy (NOW AVAILABLE)

For parallel work, spawn sub-agents using `sessions_spawn`:
- Do NOT specify `agentId` parameter
- Use for research tasks while you write
- Run 2-3 articles in parallel when possible

## Progress Tracking

| Article | Status | Date | Notes |
|---------|--------|------|-------|
| wat-te-doen-bij-een-aanrijding | ✅ Done | 2026-01-30 | |
| autoschade-verhalen-tegenpartij | ✅ Done | 2026-01-30 | |
| schade-zonder-dader-waarborgfonds | ✅ Done | 2026-01-30 | |
| total-loss-dagwaarde-nieuwwaarderegeling | ✅ Done | 2026-01-30 | |
| wat-is-letselschade | ✅ Done | 2026-01-31 | |
| letselschade-claimen-verkeersongeval | ✅ Done | 2026-01-31 | |
| smartengeld-berekenen | ✅ Done | 2026-01-31 | |
| leenauto-bij-schadeherstel | ⏳ Queued | | Priority 1 |
| kosten-letselschade-advocaat | ⏳ Queued | | Priority 1 |
| medisch-advies-letselschade | ⏳ Queued | | Priority 1 |
| aansprakelijkheid-schuldvraag | ⏳ Queued | | Priority 1 |
| schadeformulier-invullen-tips | ⏳ Queued | | Priority 1 |

## START COMMAND

When instructed to "work on SEO articles" or "continue SEO content factory":
1. Read this file
2. Check which articles are not yet done
3. Start writing the next Priority 1 article
4. Use sub-agents for parallel work if needed (omit agentId)
5. Continue until session ends or all articles complete
