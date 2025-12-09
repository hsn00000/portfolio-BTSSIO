const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&(=+<>";

// On cible uniquement le nom
const hackerText = document.querySelector("#hacker-name");

const runHackerEffect = () => {
    let iteration = 0;

    clearInterval(hackerText.dataset.interval);

    hackerText.dataset.interval = setInterval(() => {
        hackerText.innerText = hackerText.innerText
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return hackerText.dataset.value[index];
                }
                return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");

        if (iteration >= hackerText.dataset.value.length) {
            clearInterval(hackerText.dataset.interval);
        }

        iteration += 1 / 3;
    }, 30);
}

// Lancer l'effet au chargement de la page uniquement
window.onload = () => {
    setTimeout(runHackerEffect, 500);
};