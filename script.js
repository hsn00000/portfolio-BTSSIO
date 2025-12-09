    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&(=+<>"; // Les caractères bizarres

    const hackerText = document.querySelector("#hacker-name");

    // Fonction qui lance l'animation
    const runHackerEffect = () => {
        let iteration = 0;

        clearInterval(hackerText.dataset.interval); // On nettoie l'animation précédente si besoin

        hackerText.dataset.interval = setInterval(() => {
        hackerText.innerText = hackerText.innerText
        .split("")
        .map((letter, index) => {
        // Si l'index de la lettre est déjà "résolu", on affiche la vraie lettre
        if (index < iteration) {
        return hackerText.dataset.value[index];
    }
        // Sinon, on affiche un caractère aléatoire
        return letters[Math.floor(Math.random() * 26)];
    })
        .join("");

        // On arrête l'animation quand tout le mot est décodé
        if (iteration >= hackerText.dataset.value.length) {
        clearInterval(hackerText.dataset.interval);
    }

        // Vitesse de décryptage (plus le chiffre est petit, plus c'est lent)
        iteration += 1 / 3;
    }, 30); // Vitesse de changement des lettres (30ms)
    }

    // Lancer l'effet au chargement de la page
    window.onload = () => {
        // On attend un petit peu (500ms) après le chargement pour lancer l'effet
        setTimeout(runHackerEffect, 500);
    };

    // Bonus : Lancer l'effet quand on passe la souris dessus (super satisfaisant)
    hackerText.onmouseover = event => {
        runHackerEffect();
    };