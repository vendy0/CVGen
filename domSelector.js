// Formulaires
export const inputPrenom = document.getElementById("input-prenom");
export const inputNom = document.getElementById("input-nom");
export const inputPoste = document.getElementById("input-poste");
export const inputLocalisation = document.getElementById("input-localisation");
export const inputEmail = document.getElementById("input-email");
export const inputPhone = document.getElementById("input-telephone");
export const inputThemeInteret = document.getElementById("input-theme-interet");
export const inputDetailsInteret = document.getElementById("input-details-interet");

// Affichage
export const affichagePrenom = document.getElementById("affichage-prenom");
export const affichageNom = document.getElementById("affichage-nom");
export const affichagePoste = document.getElementById("affichage-poste");
export const affichageLocalisation = document.getElementById("affichage-localisation");
export const affichageEmail = document.getElementById("affichage-email");
export const affichagePhone = document.getElementById("affichage-telephone");
export const affichageThemeInteret = document.getElementById("affichage-theme-interet");
export const affichageDetailsInteret = document.getElementById("affichage-details-interet");

// Boutons
export const btnAjouterInteret = document.getElementById("btn-ajouter-interet");
export const btnSupprimerInteret = document.getElementById("btn-supprimer-interet");
export const btnTelechargerCV = document.getElementById("btn-telecharger-cv");
export const btnReset = document.getElementById("btn-reset");

// Global
export let tousLesChampsInput = document.querySelectorAll('input:not([type="button"])');
export let tousLesChampsTextarea = document.querySelectorAll("textarea");

export const updateSelectors = () => {
	tousLesChampsInput = document.querySelectorAll('input:not([type="button"])');
	tousLesChampsTextarea = document.querySelectorAll("textarea");
};
