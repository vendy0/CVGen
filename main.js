import {
	inputPrenom, inputNom, inputPoste, inputLocalisation,
	inputEmail, inputPhone, inputThemeInteret, inputDetailsInteret,
	affichagePrenom, affichageNom, affichagePoste, affichageLocalisation,
	affichageEmail, affichagePhone, affichageThemeInteret, affichageDetailsInteret
} from "./domSelectors.js";

import { restaurerDepuisLocalStorage } from "./localStorage.js";
import { ajouterCentreInteret } from "./interetsManager.js";
import { ajouterListeners } from "./listeners.js";

window.addEventListener("load", () => {
	restaurerDepuisLocalStorage("affichagePrenom", inputPrenom, affichagePrenom);
	restaurerDepuisLocalStorage("affichageNom", inputNom, affichageNom);
	restaurerDepuisLocalStorage("affichagePoste", inputPoste, affichagePoste);
	restaurerDepuisLocalStorage("affichageLocalisation", inputLocalisation, affichageLocalisation);
	restaurerDepuisLocalStorage("affichageEmail", inputEmail, affichageEmail);
	restaurerDepuisLocalStorage("affichagePhone", inputPhone, affichagePhone);
	restaurerDepuisLocalStorage("affichageThemeInteret", inputThemeInteret, affichageThemeInteret);
	restaurerDepuisLocalStorage("affichageDetailsInteret", inputDetailsInteret, affichageDetailsInteret);

	const nbInterets = parseInt(localStorage.getItem("inputInteretAjoutes") || 0);
	for (let i = 0; i < nbInterets; i++) {
		ajouterCentreInteret();

		const theme = document.getElementById(`theme-interet-input-${i}`);
		const affichageTheme = document.getElementById(`affichage-theme-interet-${i}`);
		theme.value = localStorage.getItem(theme.id);
		affichageTheme.textContent = theme.value;

		const details = document.getElementById(`input-elements-interet-${i}`);
		const affichageDetails = document.getElementById(`affichage-details-interet-${i}`);
		details.value = localStorage.getItem(details.id);
		affichageDetails.textContent = details.value;
	}

	ajouterListeners();
});
