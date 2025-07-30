/** @format */

const firstNameInput = document.getElementById("first-name-input");
const lastNameInput = document.getElementById("last-name-input");
const posteInput = document.getElementById("poste-input");
const localisationInput = document.getElementById("localisation-input");
const emailInput = document.getElementById("email-input");
const phoneInput = document.getElementById("phone-input");
const interestThemeInput = document.getElementById("interest-theme-input");
const interestElementsInput = document.getElementById(
  "interest-elements-input"
);
const interestTheme = document.getElementById("interest-theme");

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const poste = document.getElementById("poste");
const localisation = document.getElementById("localisation");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const interestElements = document.getElementById("interest-elements");

const newInterest = document.getElementById("new-interest");

var compteurInterest = 0;

const downloadButton = document.getElementById("download-button");

let inputList = document.querySelectorAll("input");
inputList.forEach(input => {
  input.addEventListener("change", () => {
    verifyAndChange(firstNameInput, firstName, "firstName");
    verifyAndChange(lastNameInput, lastName, "lastName");
    verifyAndChange(posteInput, poste, "poste");
    verifyAndChange(localisationInput, localisation, "localisation");
    verifyAndChange(emailInput, email, "email");
    verifyAndChange(phoneInput, phone, "phone");
    verifyAndChange(interestThemeInput, interestTheme, "interestTheme");
  });
});

let textAreaList = document.querySelectorAll("textarea");
textAreaList.forEach(textArea => {
  textArea.addEventListener("change", () => {
    verifyAndChange(
      interestElementsInput,
      interestElements,
      "interestElements",
      false
    );
  });
});

window.addEventListener("load", () => {
  restore("firstName", firstNameInput, firstName);
  restore("lastName", lastNameInput, lastName);
  restore("poste", posteInput, poste);
  restore("localisation", localisationInput, localisation);
  restore("email", emailInput, email);
  restore("phone", phoneInput, phone);
  restore("interestTheme", interestThemeInput, interestTheme);
  restore("interestElements", interestElementsInput, interestElements);
});

function restore(LSElement, input, area) {
  let elementStored = localStorage.getItem(LSElement);
  area.textContent = elementStored;
  input.value = elementStored;
}

function verifyAndChange(input, area, LSName, required = true) {
  if (required) {
    if (input.value.trim()) area.textContent = input.value.trim();
  } else {
    area.textContent = input.value.trim();
  }
  localStorage.setItem(LSName, input.value.trim());
}

newInterest.addEventListener("click", () => {
  let interestContainer = document.querySelector(".interest-elements");
  let echantillon = document.querySelector(".interest-info");
  let echantillonTheme = document.getElementById("interest-theme");
  let echantillonElements = document.getElementById("interest-elements");
  let copiedInterest = echantillon.cloneNode(false);
  let copiedInterestTheme = echantillonTheme.cloneNode(false);
  copiedInterestTheme.id = "interest-theme" + compteurInterest;
  let copiedInterestElements = echantillonElements.cloneNode(false);
  copiedInterestElements.id = "interest-elements" + compteurInterest;
  copiedInterest.appendChild(copiedInterestTheme);
  copiedInterest.appendChild(copiedInterestElements);
  // copiedElement.innerText = "";
  interestContainer.appendChild(copiedInterest);

  let interestInputContainer = document.querySelector(
    ".interest-input-container"
  );
  let echantillonInput = document.querySelector(".interests-input");
  let echantillonThemeInput = document.getElementById("interest-theme-input");
  let echantillonElementsInput = document.getElementById(
    "interest-elements-input"
  );

  let copiedInput = echantillon.cloneNode(false);
  copiedInput.id = "interests-input" + compteurInterest;
  let copiedThemeInput = echantillonThemeInput.cloneNode(true);
  copiedThemeInput.id = "interest-theme-input" + compteurInterest;
  copiedThemeInput.value = "";

  let copiedElementsInput = echantillonElementsInput.cloneNode(true);
  copiedElementsInput.id = "interest-elements-input" + compteurInterest;
  copiedElementsInput.value = "";
  
  let fieldset = document.createElement("fieldset");

  echantillonInput.appendChild(fieldset);
  fieldset.appendChild(copiedThemeInput);
  fieldset.appendChild(copiedElementsInput);
  interestInputContainer.appendChild(echantillonInput);

  compteurInterest++;
  console.log(compteurInterest);
  console.log(copiedElementsInput.id);
  console.log(copiedThemeInput.id);
});

downloadButton.addEventListener("click", () => {
  const captureZone = document.querySelector(".curiculum");
  html2canvas(captureZone)
    .then(canvas => {
      // Convertit le canvas en une image PNG
      const imageURL = canvas.toDataURL("image/png");
      // Crée un lien de téléchargement
      const a = document.createElement("a");
      a.href = imageURL;
      a.download = "pixel-art" + ".png";
      a.click();
    })
    .catch(error => {
      console.error("Erreur lors de la capture :", error);
      alert("Une erreur est survenue lors de la capture !");
    });
});

console.log(localStorage);
