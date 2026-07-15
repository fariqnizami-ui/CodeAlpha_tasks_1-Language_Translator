// =========================
// Supported Languages
// =========================
const languages = {
    "English": "en",
    "Hindi": "hi",
    "Urdu": "ur",
    "Arabic": "ar",
    "French": "fr",
    "Spanish": "es",
    "German": "de",
    "Italian": "it",
    "Portuguese": "pt",
    "Russian": "ru",
    "Chinese": "zh-CN",
    "Japanese": "ja",
    "Korean": "ko",
    "Turkish": "tr",
    "Dutch": "nl",
    "Polish": "pl",
    "Greek": "el",
    "Swedish": "sv",
    "Danish": "da",
    "Finnish": "fi",
    "Norwegian": "no",
    "Thai": "th",
    "Vietnamese": "vi",
    "Indonesian": "id",
    "Malay": "ms",
    "Bengali": "bn",
    "Punjabi": "pa",
    "Tamil": "ta",
    "Telugu": "te",
    "Marathi": "mr",
    "Gujarati": "gu",
    "Kannada": "kn"
};

// =========================
// Elements
// =========================
const source = document.getElementById("source");
const target = document.getElementById("target");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const status = document.getElementById("status");

// Populate language dropdowns
Object.entries(languages).forEach(([name, code]) => {
    source.add(new Option(name, code));
    target.add(new Option(name, code));
});

source.value = "en";
target.value = "hi";

// =========================
// Translate
// =========================
async function translateText() {

    const text = inputText.value.trim();

    if (!text) {
        status.textContent = "Please enter some text.";
        return;
    }

    status.textContent = "Translating...";

    try {

        const url =
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source.value}|${target.value}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.responseData && data.responseData.translatedText) {

            outputText.value = data.responseData.translatedText;
            status.textContent = "✅ Translation Complete";

        } else {

            outputText.value = "";
            status.textContent = "Translation failed.";

        }

    } catch (err) {

        console.error(err);
        status.textContent = "Network Error.";

    }
}

// =========================
// Buttons
// =========================
document.getElementById("translate").addEventListener("click", translateText);

document.getElementById("swap").addEventListener("click", () => {

    const temp = source.value;
    source.value = target.value;
    target.value = temp;

});

document.getElementById("clear").addEventListener("click", () => {

    inputText.value = "";
    outputText.value = "";
    status.textContent = "";

});

document.getElementById("copy").addEventListener("click", () => {

    if (!outputText.value) return;

    navigator.clipboard.writeText(outputText.value);
    status.textContent = "📋 Copied";

});

// =========================
// Speech
// =========================

let voices = [];

function loadVoices() {
    voices = speechSynthesis.getVoices();
}

loadVoices();

speechSynthesis.onvoiceschanged = loadVoices;

function speak(text, lang) {

    if (!text.trim()) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = lang;

    let voice = voices.find(v =>
        v.lang.toLowerCase().startsWith(lang.toLowerCase())
    );

    if (!voice) {

        voice = voices.find(v =>
            v.lang.substring(0,2) === lang.substring(0,2)
        );

    }

    if (voice) {
        utterance.voice = voice;
    }

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    speechSynthesis.speak(utterance);

}

// =========================
// Speak Buttons
// =========================

document.getElementById("speakIn").addEventListener("click", () => {

    speak(inputText.value, source.value);

});

document.getElementById("speakOut").addEventListener("click", () => {

    speak(outputText.value, target.value);

});
