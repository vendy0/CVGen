/** @format */

/* ======= VARIABLES & SÉLECTION DES ÉLÉMENTS DOM ======= */

// Champs du formulaire
const inputPrenom = document.getElementById("input-prenom")
const inputNom = document.getElementById("input-nom")
const inputPoste = document.getElementById("input-poste")
const inputLocalisation = document.getElementById("input-localisation")
const inputEmail = document.getElementById("input-email")
const inputPhone = document.getElementById("input-telephone")
const inputThemeInteret = document.getElementById("input-theme-interet")
const inputDetailsInteret = document.getElementById("input-details-interet")

// Zones d'affichage dans le CV
const affichageThemeInteret = document.getElementById("affichage-theme-interet")
const affichagePrenom = document.getElementById("affichage-prenom")
const affichageNom = document.getElementById("affichage-nom")
const affichagePoste = document.getElementById("affichage-poste")
const affichageLocalisation = document.getElementById("affichage-localisation")
const affichageEmail = document.getElementById("affichage-email")
const affichagePhone = document.getElementById("affichage-telephone")
const affichageDetailsInteret = document.getElementById(
	"affichage-details-interet"
)

// Boutons d’action
const btnAjouterInteret = document.getElementById("btn-ajouter-interet")
const btnSupprimerInteret = document.getElementById("btn-supprimer-interet")
const btnTelechargerCV = document.getElementById("btn-telecharger-cv")
const btnReset = document.getElementById("btn-reset")

// Sélections globales pour champs texte
var tousLesChampsInput = document.querySelectorAll('input:not([type="button"])')
var tousLesChampsTextarea = document.querySelectorAll("textarea")

// Compteurs d’intérêts sauvegardés dans localStorage
var compteurInteretsAjoutes = parseInt(
	localStorage.getItem("compteurInteretsAjoutes") || 0
)
var inputInteretAjoutes = parseInt(
	localStorage.getItem("inputInteretAjoutes") || 0
)

/* ======= FONCTIONS ======= */

// Récupère la valeur d’un champ dans localStorage et la remet dans l’input et la zone d’affichage
function restaurerDepuisLocalStorage(LSElement, input, area) {
	let elementStored = localStorage.getItem(LSElement)
	if (elementStored) {
		area.textContent = elementStored
		input.value = elementStored
	}
}

// Crée un bloc d’affichage d’un centre d’intérêt (dans la prévisualisation du CV)
function creerBlocAffichageInteret(id) {
	const echantillon = document.querySelector(".interest-info")
	const echantillonTheme = document.getElementById("affichage-theme-interet")
	const echantillonDetails = document.getElementById(
		"affichage-details-interet"
	)

	let bloc = echantillon.cloneNode(false)
	let theme = echantillonTheme.cloneNode(false)
	theme.id = "affichage-theme-interet-" + id
	let details = echantillonDetails.cloneNode(false)
	details.id = "affichage-details-interet-" + id

	bloc.appendChild(theme)
	bloc.appendChild(details)

	return {bloc, theme, details}
}

// Crée un bloc de formulaire pour un centre d’intérêt (dans la zone formulaire)
function creerBlocFormulaireInteret(id) {
	let echantillonInput = document.querySelector(".input-interets")

	let bloc = echantillonInput.cloneNode(true)
	let theme = bloc.querySelector("input")
	theme.value = ""
	theme.id = "theme-interet-input-" + id

	let details = bloc.querySelector("textarea")
	details.value = ""
	details.id = "input-elements-interet-" + id

	return {bloc, theme, details}
}

// Ajoute les écouteurs qui synchronisent formulaire et affichage en direct + stockage local
function listener(inputTheme, inputDetails, areaTheme, areaDetails) {
	inputTheme.addEventListener("change", () => {
		localStorage.setItem(inputTheme.id, inputTheme.value.trim())
		if (inputTheme) {
			areaTheme.textContent = inputTheme.value.trim()
		}
	})
	inputDetails.addEventListener("change", () => {
		localStorage.setItem(inputDetails.id, inputDetails.value.trim())
		if (inputDetails) {
			areaDetails.textContent = inputDetails.value.trim()
		}
	})
}

// Met à jour la liste des champs texte et textarea (utile quand on ajoute/supprime des intérêts)
function mettreAJourListesChamps() {
	tousLesChampsTextarea = document.querySelectorAll("textarea")
	tousLesChampsInput = document.querySelectorAll("input")
}

// Vérifie si un champ est rempli (ou non), met à jour la zone d’affichage et sauvegarde dans localStorage
function verifierEtMettreAJourChamp(input, area, LSName, required = true) {
	if (required) {
		if (input.value.trim()) area.textContent = input.value.trim()
	} else {
		area.textContent = input.value.trim()
	}
	localStorage.setItem(LSName, input.value.trim())
}

// Sauvegarde le nombre d’intérêts présents dans la prévisualisation CV (hors modèle de base)
function sauvegarderNombreInteret() {
	inputInteretAjoutes = document.querySelectorAll(".interest-info").length - 1
	if (inputInteretAjoutes != 0) {
		localStorage.setItem("inputInteretAjoutes", inputInteretAjoutes)
	}
}

// Ajoute un centre d’intérêt dynamique : formulaire + affichage + écouteurs + stockage
function ajouterCentreInteret(firstTime = true) {
	const id = compteurInteretsAjoutes

	const blocAffichage = creerBlocAffichageInteret(id)
	const blocFormulaire = creerBlocFormulaireInteret(id)

	document
		.querySelector(".affichage-interet-container")
		.appendChild(blocAffichage.bloc)
	document
		.querySelector(".input-interet-container")
		.appendChild(blocFormulaire.bloc)

	listener(
		blocFormulaire.theme,
		blocFormulaire.details,
		blocAffichage.theme,
		blocAffichage.details
	)

	compteurInteretsAjoutes++
	localStorage.setItem("compteurInteretsAjoutes", compteurInteretsAjoutes)
	mettreAJourListesChamps()

	sauvegarderNombreInteret()
}

// Supprime le dernier centre d’intérêt (formulaire + affichage + nettoyage localStorage)
function supprimerInteret() {
	let listeInteretsInput = document.querySelectorAll(".input-interets")
	let listeInteretsAffiches = document.querySelectorAll(".interest-info")

	if (listeInteretsInput.length <= 1) return
	listeInteretsInput[listeInteretsInput.length - 1].remove()

	let idRemoveTheme = "theme-interet-input-" + (listeInteretsInput.length - 2)
	localStorage.removeItem(idRemoveTheme)

	inputInteretAjoutes = listeInteretsInput.length - 2
	compteurInteretsAjoutes = listeInteretsInput.length - 2
	localStorage.setItem("inputInteretAjoutes", inputInteretAjoutes)
	localStorage.setItem("compteurInteretsAjoutes", compteurInteretsAjoutes)

	if (listeInteretsAffiches.length <= 1) return
	listeInteretsAffiches[listeInteretsAffiches.length - 1].remove()
	let idRemoveElements =
		"input-elements-interet-" + (listeInteretsAffiches.length - 2)
	localStorage.removeItem(idRemoveElements)
}

function reinitialiser() {
	localStorage.clear()
	location.reload()
}

/* ======= INITIALISATION & ÉCOUTEURS D'ÉVÉNEMENTS ======= */

// Au chargement : restauration des données et reconstruction des centres d’intérêt sauvegardés
window.addEventListener("load", () => {
	restaurerDepuisLocalStorage("affichagePrenom", inputPrenom, affichagePrenom)
	restaurerDepuisLocalStorage("affichageNom", inputNom, affichageNom)
	restaurerDepuisLocalStorage("affichagePoste", inputPoste, affichagePoste)
	restaurerDepuisLocalStorage(
		"affichageLocalisation",
		inputLocalisation,
		affichageLocalisation
	)
	restaurerDepuisLocalStorage("affichageEmail", inputEmail, affichageEmail)
	restaurerDepuisLocalStorage("affichagePhone", inputPhone, affichagePhone)
	restaurerDepuisLocalStorage(
		"affichageThemeInteret",
		inputThemeInteret,
		affichageThemeInteret
	)
	restaurerDepuisLocalStorage(
		"affichageDetailsInteret",
		inputDetailsInteret,
		affichageDetailsInteret
	)
	compteurInteretsAjoutes = 0

	let nbInterets = parseInt(localStorage.getItem("inputInteretAjoutes") || 0)
	for (let i = 0; i < nbInterets; i++) {
		ajouterCentreInteret()

		let theme = document.getElementById("theme-interet-input-" + i)
		theme.value = localStorage.getItem("theme-interet-input-" + i)
		let affichageTheme = document.getElementById(
			"affichage-theme-interet-" + i
		)
		affichageTheme.textContent = theme.value

		let details = document.getElementById("input-elements-interet-" + i)
		details.value = localStorage.getItem("input-elements-interet-" + i)
		let affichageDetails = document.getElementById(
			"affichage-details-interet-" + i
		)
		affichageDetails.textContent = details.value
	}
})

// Mise à jour des champs principaux lors de toute modification
tousLesChampsInput.forEach((input) => {
	input.addEventListener("change", () => {
		verifierEtMettreAJourChamp(
			inputPrenom,
			affichagePrenom,
			"affichagePrenom"
		)
		verifierEtMettreAJourChamp(inputNom, affichageNom, "affichageNom")
		verifierEtMettreAJourChamp(inputPoste, affichagePoste, "affichagePoste")
		verifierEtMettreAJourChamp(
			inputLocalisation,
			affichageLocalisation,
			"affichageLocalisation"
		)
		verifierEtMettreAJourChamp(inputEmail, affichageEmail, "affichageEmail")
		verifierEtMettreAJourChamp(inputPhone, affichagePhone, "affichagePhone")
		verifierEtMettreAJourChamp(
			inputThemeInteret,
			affichageThemeInteret,
			"affichageThemeInteret"
		)
	})
})

// Mise à jour des zones de texte lors de toute modification
tousLesChampsTextarea.forEach((textArea) => {
	textArea.addEventListener("change", () => {
		verifierEtMettreAJourChamp(
			inputDetailsInteret,
			affichageDetailsInteret,
			"affichageDetailsInteret",
			false
		)
	})
})

// Ajout / suppression dynamique d’un intérêt via boutons
btnAjouterInteret.addEventListener("click", ajouterCentreInteret)
btnSupprimerInteret.addEventListener("click", supprimerInteret)
btnReset.addEventListener("click", reinitialiser)

// Capture et téléchargement du CV au clic
btnTelechargerCV.addEventListener("click", () => {
	const captureZone = document.querySelector(".curiculum")
	html2canvas(captureZone)
		.then((canvas) => {
			const imageURL = canvas.toDataURL("image/png")
			const a = document.createElement("a")
			a.href = imageURL
			a.download = "pixel-art.png"
			a.click()
		})
		.catch((error) => {
			console.error("Erreur lors de la capture :", error)
			alert("Une erreur est survenue lors de la capture !")
		})
})

// Affichage du contenu du localStorage en console pour debug
console.log(localStorage)
