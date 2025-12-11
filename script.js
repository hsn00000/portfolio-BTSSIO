const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&(=+<>";

const hackerText = document.querySelector("#hacker-name");

const runHackerEffect = () => {
    if(!hackerText) return; // Sécurité si l'élément n'existe pas

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

// Lancer l'effet dès que le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(runHackerEffect, 500);
});

// RELANCER l'effet au survol de la souris (C'est plus fun !)
hackerText.onmouseover = event => {
    runHackerEffect();
};

/* --- CURSEUR SUIVEUR --- */
const cursor = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    if(cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

/* --- NAVIGATION ACTIVE AU SCROLL --- */
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".nav-links li a");

window.onscroll = () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute("id");
        }
    });

    navLi.forEach((li) => {
        li.classList.remove("active");
        if (li.getAttribute("href").includes(current)) {
            li.classList.add("active");
        }
    });
};