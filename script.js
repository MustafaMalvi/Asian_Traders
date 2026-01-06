// ----- Slider + dots -----

document.querySelectorAll(".image-slider").forEach(slider => {
    const track = slider.querySelector(".image-track");
    const images = track.querySelectorAll("img");
    const dotsContainer = slider.querySelector(".dots");

    images.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.onclick = () => {
            track.scrollTo({
                left: i * images[0].clientWidth,
                behavior: "smooth"
            });
        };
        dotsContainer.appendChild(dot);
    });

    if (dotsContainer.children.length > 0) {
        dotsContainer.children[0].classList.add("active");
    }
});

function slide(btn, dir) {
    const track = btn.parentElement.querySelector(".image-track");
    const imgWidth = track.querySelector("img").clientWidth;

    track.scrollBy({
        left: dir * imgWidth,
        behavior: "smooth"
    });
}

function updateDots(track) {
    const slider = track.parentElement;
    const dots = slider.querySelectorAll(".dots span");
    const imgWidth = track.querySelector("img").clientWidth;
    const index = Math.round(track.scrollLeft / imgWidth);

    dots.forEach(d => d.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
}

// ----- Scroll Spy (menu highlight) -----
const pages = ["home", "products", "about", "contact"];
const container = document.getElementById("page-container");

async function loadPages() {
    for (const page of pages) {
        const res = await fetch(page + ".html");
        const html = await res.text();
        container.innerHTML += html;
    }
    activateScrollSpy();
}
loadPages();

function activateScrollSpy() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const top = section.offsetTop - 150;
            const height = section.clientHeight;

            if (scrollY >= top && scrollY < top + height) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });

    // Activate Home by default
    navLinks[0].classList.add("active");
}