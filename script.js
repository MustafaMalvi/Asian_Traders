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

    dotsContainer.children[0].classList.add("active");
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
