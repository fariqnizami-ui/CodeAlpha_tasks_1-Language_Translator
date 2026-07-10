# CodeAlpha_LanguageTranslator (Web Version)

This is a browser version of my Task 1 project for the CodeAlpha AI Internship.

## What it does
A simple webpage where you can:
- Type text in the input box
- Choose the language you are translating **from**
- Choose the language you are translating **to**
- Click **Translate** to see the result
- Click **Copy Result** to copy the translated text
- Click **Clear** to reset everything
- Click the **⇄** button to quickly swap the From/To languages

## Tech used
- HTML
- CSS
- JavaScript (fetch API)
- [MyMemory Translation API](https://mymemory.translated.net/doc/spec.php) — free, no API key needed

## How to run it
Just open `index.html` in any web browser (Chrome, Firefox, etc). No installation needed.

You need an active internet connection since the translation happens through an online API.

## Files
- `index.html` — page structure
- `style.css` — styling
- `script.js` — translation logic (calls the API and updates the page)

## Note
The free MyMemory API has a daily limit on how many words you can translate,
so if it stops working after a lot of use, that's why.

## Future improvements (if I get time)
- Add text-to-speech for the translated output
- Auto-detect the source language
- Show a loading spinner instead of just text

---
Made as part of the CodeAlpha Artificial Intelligence Internship.
