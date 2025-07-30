/** @format */

const inputPrenom = document.getElementById("first-name-input");
const inputNom = document.getElementById("last-name-input");
const inputPoste = document.getElementById("poste-input");
const inputLocalisation = document.getElementById("localisation-input");
const inputEmail = document.getElementById("email-input");
const inputPhone = document.getElementById("phone-input");
const inputThemeInteret = document.getElementById("interest-theme-input");
const inputDetailsInteret = document.getElementById("interest-elements-input");
const affichageThemeInteret = document.getElementById("interest-theme");

const affichagePrenom = document.getElementById("first-name");
const affichageNom = document.getElementById("last-name");
const affichagePoste = document.getElementById("poste");
const affichageLocalisation = document.getElementById("localisation");
const affichageEmail = document.getElementById("email");
const affichagePhone = document.getElementById("phone");
const affichageDetailsInteret = document.getElementById("interest-elements");

const btnAjouterInteret = document.getElementById("new-interest");

var compteurInteretsAjoutes = 0;

const btnTelechargerCV = document.getElementById("download-button");

var tousLesChampsInput = document.querySelectorAll("input");
tousLesChampsInput.forEach((input) => {
	input.addEventListener("change", () => {
		verifierEtMettreAJouChamp(
			inputPrenom,
			affichagePrenom,
			"affichagePrenom"
		);
		verifierEtMettreAJouChamp(inputNom, affichageNom, "affichageNom");
		verifierEtMettreAJouChamp(inputPoste, affichagePoste, "affichagePoste");
		verifierEtMettreAJouChamp(
			inputLocalisation,
			affichageLocalisation,
			"affichageLocalisation"
		);
		verifierEtMettreAJouChamp(inputEmail, affichageEmail, "affichageEmail");
		verifierEtMettreAJouChamp(inputPhone, affichagePhone, "affichagePhone");
		verifierEtMettreAJouChamp(
			inputThemeInteret,
			affichageThemeInteret,
			"affichageThemeInteret"
		);
	});
});

var tousLesChampsTextarea = document.querySelectorAll("textarea");
tousLesChampsTextarea.forEach((textArea) => {
	textArea.addEventListener("change", () => {
		verifierEtMettreAJouChamp(
			inputDetailsInteret,
			affichageDetailsInteret,
			"affichageDetailsInteret",
			false
		);
	});
});

window.addEventListener("load", () => {
	restaurerDepuisLocalStorage(
		"affichagePrenom",
		inputPrenom,
		affichagePrenom
	);
	restaurerDepuisLocalStorage("affichageNom", inputNom, affichageNom);
	restaurerDepuisLocalStorage("affichagePoste", inputPoste, affichagePoste);
	restaurerDepuisLocalStorage(
		"affichageLocalisation",
		inputLocalisation,
		affichageLocalisation
	);
	restaurerDepuisLocalStorage("affichageEmail", inputEmail, affichageEmail);
	restaurerDepuisLocalStorage("affichagePhone", inputPhone, affichagePhone);
	restaurerDepuisLocalStorage(
		"affichageThemeInteret",
		inputThemeInteret,
		affichageThemeInteret
	);
	restaurerDepuisLocalStorage(
		"affichageDetailsInteret",
		inputDetailsInteret,
		affichageDetailsInteret
	);
});

function restaurerDepuisLocalStorage(LSElement, input, area) {
	let elementStored = localStorage.getItem(LSElement);
	if (elementStored) area.textContent = elementStored;
	{
		input.value = elementStored;
	}
}

function verifierEtMettreAJouChamp(input, area, LSName, required = true) {
	if (required) {
		if (input.value.trim()) area.textContent = input.value.trim();
	} else {
		area.textContent = input.value.trim();
	}
	localStorage.setItem(LSName, input.value.trim());
}

btnAjouterInteret.addEventListener("click", () => {
	let interestContainer = document.querySelector(".interest-elements");
	let echantillon = document.querySelector(".interest-info");
	let echantillonTheme = document.getElementById("interest-theme");
	let echantillonElements = document.getElementById("interest-elements");
	let copiedInterest = echantillon.cloneNode(false);
	let copiedInterestTheme = echantillonTheme.cloneNode(false);
	copiedInterestTheme.id = "interest-theme-" + compteurInteretsAjoutes;
	let copiedInterestElements = echantillonElements.cloneNode(false);
	copiedInterestElements.id = "interest-elements-" + compteurInteretsAjoutes;
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
	let copiedInput = echantillonInput.cloneNode(true);
	let copiedThemeInput = copiedInput.querySelector("input");
	copiedThemeInput.value = "";
	copiedThemeInput.id = "interest-theme-input-" + compteurInteretsAjoutes;
	let copiedElementsInput = copiedInput.querySelector("textarea");
	copiedElementsInput.value = "";
	copiedElementsInput.id =
		"interest-elements-input-" + compteurInteretsAjoutes;
	interestInputContainer.appendChild(copiedInput);

	compteurInteretsAjoutes++;
	tousLesChampsTextarea = document.querySelectorAll("textarea");
	tousLesChampsInput = document.querySelectorAll("input");
});

btnTelechargerCV.addEventListener("click", () => {
	const captureZone = document.querySelector(".curiculum");
	html2canvas(captureZone)
		.then((canvas) => {
			// Convertit le canvas en une image PNG
			const imageURL = canvas.toDataURL("image/png");
			// Crée un lien de téléchargement
			const a = document.createElement("a");
			a.href = imageURL;
			a.download = "pixel-art" + ".png";
			a.click();
		})
		.catch((error) => {
			console.error("Erreur lors de la capture :", error);
			alert("Une erreur est survenue lors de la capture !");
		});
});

console.log(localStorage);
