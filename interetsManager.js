import { updateSelectors } from "./domSelectors.js";
import { listener } from "./syncFormDisplay.js";
import { sauvegarderNombreInteret } from "./localStorage.js";

let compteurInteretsAjoutes = parseInt(localStorage.getItem("compteurInteretsAjoutes") || 0);

export function creerBlocAffichageInteret(id) {
	const echantillon = document.querySelector(".interest-info");
	const theme = document.getElementById("affichage-theme-interet").cloneNode(false);
	const details = document.getElementById("affichage-details-interet").cloneNode(false);
	const bloc = echantillon.cloneNode(false);

	theme.id = `affichage-theme-interet-${id}`;
	details.id = `affichage-details-interet-${id}`;
	bloc.appendChild(theme);
	bloc.appendChild(details);

	return { bloc, theme, details };
}

export function creerBlocFormulaireInteret(id) {
	const echantillonInput = document.querySelector(".input-interets");
	const bloc = echantillonInput.cloneNode(true);
	const theme = bloc.querySelector("input");
	const details = bloc.querySelector("textarea");

	theme.id = `theme-interet-input-${id}`;
	theme.value = "";
	details.id = `input-elements-interet-${id}`;
	details.value = "";

	return { bloc, theme, details };
}

export function ajouterCentreInteret() {
	const id = compteurInteretsAjoutes;
	const { bloc: affichageBloc, theme, details } = creerBlocAffichageInteret(id);
	const { bloc: formulaireBloc, theme: themeInput, details: detailsInput } = creerBlocFormulaireInteret(id);

	document.querySelector(".affichage-interet-container").appendChild(affichageBloc);
	document.querySelector(".input-interet-container").appendChild(formulaireBloc);

	listener(themeInput, detailsInput, theme, details);

	compteurInteretsAjoutes++;
	localStorage.setItem("compteurInteretsAjoutes", compteurInteretsAjoutes);
	updateSelectors();
	sauvegarderNombreInteret();
}

export function supprimerInteret() {
	const interetsInput = document.querySelectorAll(".input-interets");
	const interetsAffiches = document.querySelectorAll(".interest-info");

	if (interetsInput.length <= 1) return;
	interetsInput[interetsInput.length - 1].remove();
	interetsAffiches[interetsAffiches.length - 1].remove();

	const lastId = interetsInput.length - 2;
	localStorage.removeItem(`theme-interet-input-${lastId}`);
	localStorage.removeItem(`input-elements-interet-${lastId}`);

	compteurInteretsAjoutes = lastId;
	localStorage.setItem("compteurInteretsAjoutes", lastId);
	localStorage.setItem("inputInteretAjoutes", lastId);
}

