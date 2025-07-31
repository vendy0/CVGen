export function telechargerCV() {
	const captureZone = document.querySelector(".curiculum");
	html2canvas(captureZone)
		.then((canvas) => {
			const imageURL = canvas.toDataURL("image/png");
			const a = document.createElement("a");
			a.href = imageURL;
			a.download = "mon-cv.png";
			a.click();
		})
		.catch((error) => {
			console.error("Erreur lors de la capture :", error);
			alert("Une erreur est survenue !");
		});
}
