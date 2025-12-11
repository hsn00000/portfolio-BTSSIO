const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&(=+<>";
const hackerText = document.querySelector("#hacker-name");

/* --- 1. EFFET HACKER (Texte qui change) --- */
const runHackerEffect = () => {
    if(!hackerText) return;

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

// Lancer l'effet au chargement
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(runHackerEffect, 500);
});

// Relancer au survol
if(hackerText) {
    hackerText.onmouseover = event => {
        runHackerEffect();
    };
}

/* --- 2. CURSEUR SUIVEUR --- */
const cursor = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    if(cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

/* --- 3. NAVIGATION INTELLIGENTE (CORRECTION ACCUEIL) --- */
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".nav-links li a");

window.addEventListener('scroll', () => {
    let current = "";

    // CORRECTION : Si on est tout en haut de la page (moins de 100px de scroll)
    // On force l'activation de l'accueil.
    if (window.scrollY < 100) {
        current = "accueil";
    } else {
        // Sinon, on vérifie normalement
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // On active la section si on a dépassé son sommet - 200px (marge navbar)
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute("id");
            }
        });
    }

    // Application de la classe 'active' sur le bon lien
    navLi.forEach((li) => {
        li.classList.remove("active");
        if (li.getAttribute("href") === `#${current}`) {
            li.classList.add("active");
        }
    });
});