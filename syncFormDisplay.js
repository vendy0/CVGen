export function listener(inputTheme, inputDetails, areaTheme, areaDetails) {
	inputTheme.addEventListener("input", () => {
		const val = inputTheme.value.trim();
		localStorage.setItem(inputTheme.id, val);
		areaTheme.textContent = val;
	});

	inputDetails.addEventListener("input", () => {
		const val = inputDetails.value.trim();
		localStorage.setItem(inputDetails.id, val);
		areaDetails.textContent = val;
	});
}
