/** @format */

const firstNameInput = document.getElementById("first-name-input");
const lastNameInput = document.getElementById("last-name-input");
const posteInput = document.getElementById("poste-input");
const localisationInput = document.getElementById("localisation-input");
const emailInput = document.getElementById("email-input");
const phoneInput = document.getElementById("phone-input");

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const poste = document.getElementById("poste");
const localisation = document.getElementById("localisation");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

const interestThemeInput = document.getElementById("interest-theme-input");
const interestElementsInput = document.getElementById(
	"interest-elements-input"
);
const interestTheme = document.getElementById("interest-theme");
const interestElements = document.getElementById("interest-elements");

let inputList = document.querySelectorAll("input");
inputList.forEach((input) => {
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
textAreaList.forEach((textArea) => {
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

console.log(inputList);
console.log(localStorage);
