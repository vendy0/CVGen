const firstNameInput = document.getElementById("first-name-input");
const lastNameInput = document.getElementById("last-name-input");
const posteInput = document.getElementById("poste-input");
const localisationInput = document.getElementById("localisation-input");
const emailInput = document.getElementById("email-input");
const phoneInput = document.getElementById("phone-input");

const firstName = document.querySelector(".first-name");
const lastName = document.querySelector(".last-name");
const poste = document.querySelector(".poste");
const localisation = document.querySelector(".localisation");
const email = document.querySelector(".email");
const phone = document.querySelector(".phone");

const submitButton = document.getElementById("submit");

restore(firstName);
restore(lastName);
restore(poste);
restore(localisation);
restore(email);
restore(phone);

// Changer le texte du bouton
function changeText(element, input) {
  element.textContent = input.value.trim();
  localStorage.setItem(element.textContent, input);
}

// Charger depuis le localStorage
function restore(element) {
  let elementStored = localStorage.getItem(element);
  element.textContent = elementStored;
}

submitButton.addEventListener("click", () => {
  if (
    firstNameInput.value.trim() ||
    lastNameInput.value.trim() ||
    poste.value.trim() ||
    localisationInput.value.trim() ||
    emailInput.value.trim() ||
    phoneInput.value.trim()
  ) {
    if (firstNameInput.value.trim())
      changeText(firstName, firstNameInput.value.trim());
    if (lastNameInput.value.trim())
      changeText(lastName, lastNameInput.value.trim());
    if (posteInput.value.trim()) changeText(poste, posteInput.value.trim());
    if (localisationInput.value.trim())
      changeText(localisation, localisationInput.value.trim());
    if (emailInput.value.trim()) changeText(email, emailInput.value.trim());
    if (phoneInput.value.trim()) changeText(phone, phoneInput.value.trim());
  }
});

// Ctrl + U

localStorage.clear();
console.log(localStorage);
