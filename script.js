/** @format */

const inputPrenom = document.getElementById("input-prenom");
const inputNom = document.getElementById("input-nom");
const inputPoste = document.getElementById("input-poste");
const inputLocalisation = document.getElementById("input-localisation");
const inputEmail = document.getElementById("input-email");
const inputPhone = document.getElementById("input-telephone");
const inputThemeInteret = document.getElementById("input-theme-interet");
const inputDetailsInteret = document.getElementById("input-details-interet");

const affichageThemeInteret = document.getElementById(
	"affichage-theme-interet"
);
const affichagePrenom = document.getElementById("affichage-prenom");
const affichageNom = document.getElementById("affichage-nom");
const affichagePoste = document.getElementById("affichage-poste");
const affichageLocalisation = document.getElementById("affichage-localisation");
const affichageEmail = document.getElementById("affichage-email");
const affichagePhone = document.getElementById("affichage-telephone");
const affichageDetailsInteret = document.getElementById(
	"affichage-details-interet"
);

const btnAjouterInteret = document.getElementById("btn-ajouter-interet");

var compteurInteretsAjoutes = 0;

const btnTelechargerCV = document.getElementById("btn-telecharger-cv");

var tousLesChampsInput = document.querySelectorAll('input[type="text"]');
tousLesChampsInput.forEach((input) => {
	input.addEventListener("change", () => {
		verifierEtMettreAJourChamp(
			inputPrenom,
			affichagePrenom,
			"affichagePrenom"
		);
		verifierEtMettreAJourChamp(inputNom, affichageNom, "affichageNom");
		verifierEtMettreAJourChamp(
			inputPoste,
			affichagePoste,
			"affichagePoste"
		);
		verifierEtMettreAJourChamp(
			inputLocalisation,
			affichageLocalisation,
			"affichageLocalisation"
		);
		verifierEtMettreAJourChamp(
			inputEmail,
			affichageEmail,
			"affichageEmail"
		);
		verifierEtMettreAJourChamp(
			inputPhone,
			affichagePhone,
			"affichagePhone"
		);
		verifierEtMettreAJourChamp(
			inputThemeInteret,
			affichageThemeInteret,
			"affichageThemeInteret"
		);
	});
});

var tousLesChampsTextarea = document.querySelectorAll("textarea");
tousLesChampsTextarea.forEach((textArea) => {
	textArea.addEventListener("change", () => {
		verifierEtMettreAJourChamp(
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

function verifierEtMettreAJourChamp(input, area, LSName, required = true) {
	if (required) {
		if (input.value.trim()) area.textContent = input.value.trim();
	} else {
		area.textContent = input.value.trim();
	}
	localStorage.setItem(LSName, input.value.trim());
}

btnAjouterInteret.addEventListener("click", ajouterCentreInteret);

function ajouterCentreInteret() {
	const id = compteurInteretsAjoutes;

	const blocAffichage = creerBlocAffichageInteret(id);
	const blocFormulaire = creerBlocFormulaireInteret(id);

	document
		.querySelector(".affichage-interet-container")
		.appendChild(blocAffichage.bloc);
	document
		.querySelector(".input-interet-container")
		.appendChild(blocFormulaire.bloc);

	listener(
		blocFormulaire.theme,
		blocFormulaire.details,
		blocAffichage.theme,
		blocAffichage.details
	);

	compteurInteretsAjoutes++;
	mettreAJourListesChamps();
}

function creerBlocAffichageInteret(id) {
	const echantillon = document.querySelector(".interest-info");
	const echantillonTheme = document.getElementById("affichage-theme-interet");
	const echantillonDetails = document.getElementById(
		"affichage-details-interet"
	);

	let bloc = echantillon.cloneNode(false);
	let theme = echantillonTheme.cloneNode(false);
	theme.id = "affichage-theme-interet-" + id;
	let details = echantillonDetails.cloneNode(false);
	details.id = "affichage-details-interet-" + id;

	bloc.appendChild(theme);
	bloc.appendChild(details);

	return {bloc, theme, details};
}

function creerBlocFormulaireInteret(id) {
	let echantillonInput = document.querySelector(".input-interets");

	let bloc = echantillonInput.cloneNode(true);
	let theme = bloc.querySelector("input");
	theme.value = "";
	theme.id = "affichage-theme-interet-input-" + id;

	let details = bloc.querySelector("textarea");
	details.value = "";
	details.id = "input-elements-interet-" + id;

	return {bloc, theme, details};
}

function listener(inputTheme, inputDetails, areaTheme, areaDetails) {
	inputTheme.addEventListener("change", () => {
		if (inputTheme) {
			areaTheme.textContent = inputTheme.value.trim();
		}
	});
	inputDetails.addEventListener("change", () => {
		if (inputDetails) {
			areaDetails.textContent = inputDetails.value.trim();
		}
	});
}

function mettreAJourListesChamps(){
	tousLesChampsTextarea = document.querySelectorAll("textarea");
	tousLesChampsInput = document.querySelectorAll("input");
}

// btnAjouterInteret.addEventListener("click", () => {
// 	let interestContainer = document.querySelector(
// 		".affichage-details-interet"
// 	);
// 	let echantillon = document.querySelector(".interest-info");
// 	let echantillonTheme = document.getElementById("affichage-theme-interet");
// 	let echantillonElements = document.getElementById(
// 		"affichage-details-interet"
// 	);
// 	let copiedInterest = echantillon.cloneNode(false);
// 	let copiedInterestTheme = echantillonTheme.cloneNode(false);
// 	copiedInterestTheme.id =
// 		"affichage-theme-interet-" + compteurInteretsAjoutes;
// 	let copiedInterestElements = echantillonElements.cloneNode(false);
// 	copiedInterestElements.id =
// 		"affichage-details-interet-" + compteurInteretsAjoutes;
// 	copiedInterest.appendChild(copiedInterestTheme);
// 	copiedInterest.appendChild(copiedInterestElements);
// 	// copiedElement.innerText = "";
// 	interestContainer.appendChild(copiedInterest);

// 	let interestInputContainer = document.querySelector(
// 		".interest-input-container"
// 	);
// 	let echantillonInput = document.querySelector(".interests-input");
// 	let echantillonThemeInput = document.getElementById(
// 		"affichage-theme-interet-input"
// 	);
// 	let echantillonElementsInput = document.getElementById(
// 		"input-elements-interet"
// 	);
// 	let copiedInput = echantillonInput.cloneNode(true);
// 	let copiedThemeInput = copiedInput.querySelector("input");
// 	copiedThemeInput.value = "";
// 	copiedThemeInput.id =
// 		"affichage-theme-interet-input-" + compteurInteretsAjoutes;
// 	let copiedElementsInput = copiedInput.querySelector("textarea");
// 	copiedElementsInput.value = "";
// 	copiedElementsInput.id =
// 		"input-elements-interet-" + compteurInteretsAjoutes;
// 	interestInputContainer.appendChild(copiedInput);

// 	compteurInteretsAjoutes++;
// 	tousLesChampsTextarea = document.querySelectorAll("textarea");
// 	tousLesChampsInput = document.querySelectorAll("input");

// 	listener(
// 		copiedThemeInput,
// 		copiedElementsInput,
// 		copiedInterestTheme,
// 		copiedInterestElements
// 	);
// });

// function listener(inputTheme, inputDetails, areaTheme, areaDetails) {
// 	inputTheme.addEventListener("change", () => {
// 		if (inputTheme) {
// 			areaTheme.textContent = inputTheme.value.trim();
// 		}
// 	});
// 	inputDetails.addEventListener("change", () => {
// 		if (inputDetails) {
// 			areaDetails.textContent = inputDetails.value.trim();
// 		}
// 	});
// }

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
