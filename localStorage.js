export function restaurerDepuisLocalStorage(key, input, area) {
	const value = localStorage.getItem(key);
	if (value) {
		input.value = value;
		area.textContent = value;
	}
}

export function verifierEtMettreAJourChamp(input, area, key, required = true) {
	const value = input.value.trim();
	if (required ? value : true) {
		area.textContent = value;
	}
	localStorage.setItem(key, value);
}

export function sauvegarderNombreInteret() {
	const count = document.querySelectorAll(".interest-info").length - 1;
	if (count > 0) {
		localStorage.setItem("inputInteretAjoutes", count);
	}
}
