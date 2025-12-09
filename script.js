const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&(=+<>";

/* --- EFFET MATRIX SUR LE NOM --- */
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

window.onload = () => {
    setTimeout(runHackerEffect, 500);
};


/* --- CURSEUR SUIVEUR --- */
const cursor = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});


/* --- NAVIGATION ACTIVE AU SCROLL --- */
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".nav-links li a");

window.onscroll = () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Si on a scrollé jusqu'à ce que la section soit bien visible (un tiers de l'écran)
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