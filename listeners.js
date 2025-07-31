import {
	inputPrenom, inputNom, inputPoste, inputLocalisation, inputEmail, inputPhone,
	inputThemeInteret, inputDetailsInteret,
	tousLesChampsInput, tousLesChampsTextarea,
	btnAjouterInteret, btnSupprimerInteret, btnTelechargerCV, btnReset,
	affichagePrenom, affichageNom, affichagePoste, affichageLocalisation,
	affichageEmail, affichagePhone, affichageThemeInteret, affichageDetailsInteret
} from "./domSelectors.js";

import { verifierEtMettreAJourChamp, restaurerDepuisLocalStorage } from "./localStorage.js";
import { ajouterCentreInteret, supprimerInteret } from "./interetsManager.js";
import { telechargerCV } from "./download.js";

export function ajouterListeners() {
	tousLesChampsInput.forEach((input) => {
		input.addEventListener("input", () => {
			verifierEtMettreAJourChamp(inputPrenom, affichagePrenom, "affichagePrenom");
			verifierEtMettreAJourChamp(inputNom, affichageNom, "affichageNom");
			verifierEtMettreAJourChamp(inputPoste, affichagePoste, "affichagePoste");
			verifierEtMettreAJourChamp(inputLocalisation, affichageLocalisation, "affichageLocalisation");
			verifierEtMettreAJourChamp(inputEmail, affichageEmail, "affichageEmail");
			verifierEtMettreAJourChamp(inputPhone, affichagePhone, "affichagePhone");
			verifierEtMettreAJourChamp(inputThemeInteret, affichageThemeInteret, "affichageThemeInteret");
		});
	});

	tousLesChampsTextarea.forEach((textArea) => {
		textArea.addEventListener("input", () => {
			verifierEtMettreAJourChamp(inputDetailsInteret, affichageDetailsInteret, "affichageDetailsInteret", false);
		});
	});

	btnAjouterInteret.addEventListener("click", ajouterCentreInteret);
	btnSupprimerInteret.addEventListener("click", supprimerInteret);
	btnReset.addEventListener("click", () => location.reload());
	btnTelechargerCV.addEventListener("click", telechargerCV);
}
