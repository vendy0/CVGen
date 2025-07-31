/** @format */

// Récupération des éléments du formulaire
const inputPrenom = document.getElementById("input-prenom")
const inputNom = document.getElementById("input-nom")
const inputPoste = document.getElementById("input-poste")
const inputLocalisation = document.getElementById("input-localisation")
const inputEmail = document.getElementById("input-email")
const inputPhone = document.getElementById("input-telephone")
const inputThemeInteret = document.getElementById("input-theme-interet")
const inputDetailsInteret = document.getElementById("input-details-interet")

// Récupération des zones d'affichage du CV
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

// Boutons principaux
const btnAjouterInteret = document.getElementById("btn-ajouter-interet")
const btnSupprimerInteret = document.getElementById("btn-supprimer-interet")
const btnTelechargerCV = document.getElementById("btn-telecharger-cv")

// Sélection des champs de saisie texte
var tousLesChampsInput = document.querySelectorAll('input[type="text"]')
var tousLesChampsTextarea = document.querySelectorAll("textarea")

// Compteurs de centres d'intérêt ajoutés (sauvegardés dans le localStorage)
var compteurInteretsAjoutes = parseInt(
	localStorage.getItem("compteurInteretsAjoutes") || 0
)
var inputInteretAjoutes = parseInt(
	localStorage.getItem("inputInteretAjoutes") || 0
)

// Restaure la valeur d'un champ depuis le localStorage
function restaurerDepuisLocalStorage(LSElement, input, area) {
	let elementStored = localStorage.getItem(LSElement)
	if (elementStored) {
		area.textContent = elementStored
		input.value = elementStored
	}
}

// Ajoute dynamiquement un bloc de centre d’intérêt
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

// Crée un bloc d’affichage d’intérêt (dans la prévisualisation CV)
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

// Crée un bloc de formulaire d’intérêt (dans la zone formulaire)
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

// Ajoute les écouteurs de modification entre formulaire et affichage
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

// Met à jour les listes de champs de saisie
function mettreAJourListesChamps() {
	tousLesChampsTextarea = document.querySelectorAll("textarea")
	tousLesChampsInput = document.querySelectorAll("input")
}

// Vérifie, met à jour et sauvegarde un champ texte (ou textarea)
function verifierEtMettreAJourChamp(input, area, LSName, required = true) {
	if (required) {
		if (input.value.trim()) area.textContent = input.value.trim()
	} else {
		area.textContent = input.value.trim()
	}
	localStorage.setItem(LSName, input.value.trim())
}

// Sauvegarde le nombre d’intérêts ajoutés
function sauvegarderNombreInteret() {
	inputInteretAjoutes = document.querySelectorAll(".interest-info").length - 1
	if (inputInteretAjoutes != 0) {
		localStorage.setItem("inputInteretAjoutes", inputInteretAjoutes)
	}
}

function supprimerInteret() {
	let listeInteretsInput = document.querySelectorAll(".input-interets")
	let listeInteretsAffiches = document.querySelectorAll(".interest-info")

	if (listeInteretsInput.length <= 1) return
	listeInteretsInput[listeInteretsInput.length - 1].remove()

	let idRemoveTheme = "theme-interet-input-" + (listeInteretsInput.length - 2)
	localStorage.removeItem(idRemoveTheme)

	inputInteretAjoutes = listeInteretsInput.length - 1
	compteurInteretsAjoutes = listeInteretsInput.length - 1
	localStorage.setItem("inputInteretAjoutes", inputInteretAjoutes)
	localStorage.setItem("compteurInteretsAjoutes", compteurInteretsAjoutes)

	if (listeInteretsAffiches.length <= 1) return
	listeInteretsAffiches[listeInteretsAffiches.length - 1].remove()
	let idRemoveElements =
		"input-elements-interet-" + (listeInteretsAffiches.length - 2)
	localStorage.removeItem(idRemoveElements)
}

// Initialisation au chargement de la page
window.addEventListener("load", () => {
	// Restauration des champs principaux depuis localStorage
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

	// Réajout des centres d’intérêt précédemment enregistrés
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

// Mise à jour des champs principaux lors des changements
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

// Mise à jour des zones de texte lors des changements
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

// Ajout dynamique d’un intérêt lors du clic sur le bouton
btnAjouterInteret.addEventListener("click", ajouterCentreInteret)

btnSupprimerInteret.addEventListener("click", supprimerInteret)

// Capture et téléchargement du CV en PNG
btnTelechargerCV.addEventListener("click", () => {
	const captureZone = document.querySelector(".curiculum")
	html2canvas(captureZone)
		.then((canvas) => {
			// Convertit le canvas en une image PNG
			const imageURL = canvas.toDataURL("image/png")
			// Crée un lien de téléchargement
			const a = document.createElement("a")
			a.href = imageURL
			a.download = "pixel-art" + ".png"
			a.click()
		})
		.catch((error) => {
			console.error("Erreur lors de la capture :", error)
			alert("Une erreur est survenue lors de la capture !")
		})
})

// Affiche le contenu actuel du localStorage dans la console
console.log(localStorage)
