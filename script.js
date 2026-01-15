console.log("Asian Traders Loaded");
const menuBtn = document.getElementById("menuBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

menuBtn.addEventListener("click", () => {
  if(dropdownMenu.style.display === "flex"){
    dropdownMenu.style.display = "none";
  } else {
    dropdownMenu.style.display = "flex";
  }
});

document.querySelectorAll(".dropdown-menu a").forEach(link => {
  link.addEventListener("click", () => {
    dropdownMenu.style.display = "none";
  });
});
document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();

  const name = this.querySelector("input[placeholder='Enter your name']").value;
  const email = this.querySelector("input[placeholder='your@email.com']").value;
  const phone = this.querySelector("input[placeholder='+91 XXXXX XXXXX']").value;
  const message = this.querySelector("textarea").value;

  const whatsappNumber = "917984777292"; // <-- your phone number without + or spaces

  const text = 
    "New Enquiry from Asian Traders Website\n\n" +
    "Name: " + name + "\n" +
    "Email: " + email + "\n" +
    "Phone: " + phone + "\n\n" +
    "Message:\n" + message;

  const url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(text);

  window.open(url, "_blank");
});

function updateDots(track) {
    const slider = track.parentElement;
    const dots = slider.querySelectorAll(".dots span");
    const imgWidth = track.querySelector("img").clientWidth;
    const index = Math.round(track.scrollLeft / imgWidth);

    dots.forEach(d => d.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
}

window.addEventListener("load", () => {

document.querySelectorAll(".slider").forEach(slider => {
    const track = slider.querySelector(".image-track");
    const dotsContainer = slider.querySelector(".dots");
    const images = track.querySelectorAll("img");

    dotsContainer.innerHTML = "";

    images.forEach((img, i) => {
        const dot = document.createElement("span");
        if (i === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
            track.scrollTo({
                left: img.clientWidth * i,
                behavior: "smooth"
            });
        });

        dotsContainer.appendChild(dot);
    });

    track.addEventListener("scroll", () => {
        const imgWidth = track.scrollWidth / images.length;
        const index = Math.round(track.scrollLeft / imgWidth);

        const dots = dotsContainer.querySelectorAll("span");
        dots.forEach(d => d.classList.remove("active"));
        if (dots[index]) dots[index].classList.add("active");
    });
});

});