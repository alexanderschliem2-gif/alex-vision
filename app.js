import { pipeline } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.0";

let generator = null;
let loading = false;

async function init() {
  const btn = document.getElementById("generate");
  const output = document.getElementById("output");

  loading = true;
  btn.disabled = true;
  output.innerHTML = "Lade Modell... (kann etwas dauern)";

  try {
    generator = await pipeline("text-to-image", "Xenova/stable-diffusion-turbo");
    output.innerHTML = "Modell geladen. Gib einen Prompt ein!";
  } catch (e) {
    console.error(e);
    output.innerHTML = "Fehler beim Laden des Modells.";
  }

  loading = false;
  btn.disabled = false;
}

document.getElementById("generate").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value.trim();
  const output = document.getElementById("output");
  const btn = document.getElementById("generate");

  if (!prompt) {
    output.innerHTML = "Bitte gib einen Prompt ein.";
    return;
  }
  if (!generator || loading) {
    output.innerHTML = "Modell ist noch nicht bereit...";
    return;
  }

  btn.disabled = true;
  output.innerHTML = "Generiere Bild...";

  try {
    const result = await generator(prompt, {
      guidance_scale: 0.0,
      num_inference_steps: 2,
    });

    const img = result.images[0];
    output.innerHTML = "";
    output.appendChild(img);
  } catch (e) {
    console.error(e);
    output.innerHTML = "Fehler bei der Bildgenerierung.";
  }

  btn.disabled = false;
});

init();
