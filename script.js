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