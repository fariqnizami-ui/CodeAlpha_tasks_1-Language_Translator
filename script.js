/*
  CodeAlpha AI Internship - Task 1
  Language Translation Tool (Web version)

  I am using the MyMemory Translation API here because it is free
  and does not need any API key, which makes it easy for a beginner
  like me to use directly from JavaScript using fetch().

  API docs: https://mymemory.translated.net/doc/spec.php
*/

// grabbing all the elements I need from the HTML
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");
const translateBtn = document.getElementById("translateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const swapBtn = document.getElementById("swapBtn");
const statusMsg = document.getElementById("statusMsg");

// this function runs when the Translate button is clicked
async function translateText() {
  const text = inputText.value.trim();

  if (text === "") {
    statusMsg.textContent = "Please type something first!";
    return;
  }

  const from = sourceLang.value;
  const to = targetLang.value;

  statusMsg.textContent = "Translating...";
  translateBtn.disabled = true;

  // building the API url, langpair looks like "en|hi"
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // the translated text is inside data.responseData.translatedText
    outputText.value = data.responseData.translatedText;
    statusMsg.textContent = "Done!";
  } catch (error) {
    console.log(error);
    statusMsg.textContent = "Something went wrong. Check your internet connection.";
  }

  translateBtn.disabled = false;
}

function copyOutput() {
  const text = outputText.value.trim();
  if (text === "") {
    statusMsg.textContent = "Nothing to copy yet!";
    return;
  }
  navigator.clipboard.writeText(text);
  statusMsg.textContent = "Copied to clipboard!";
}

function clearAll() {
  inputText.value = "";
  outputText.value = "";
  statusMsg.textContent = "";
}

// swaps the "from" and "to" languages, just a nice little extra feature
function swapLanguages() {
  const temp = sourceLang.value;
  sourceLang.value = targetLang.value;
  targetLang.value = temp;
}

// connecting the buttons to their functions
translateBtn.addEventListener("click", translateText);
copyBtn.addEventListener("click", copyOutput);
clearBtn.addEventListener("click", clearAll);
swapBtn.addEventListener("click", swapLanguages);
