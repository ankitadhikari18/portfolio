document.addEventListener("DOMContentLoaded", function () {

    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            backToTop.style.display = "flex";
        } else {
            backToTop.style.display = "none";
        }

    });

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});
// ===============================
// ACTIVE NAVIGATION
// ===============================

const sections = document.querySelectorAll("main");
const navLinks = document.querySelectorAll("nav a");

function updateActiveNavigation() {

    let currentSection = "home";

    sections.forEach(function(section) {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }

    });

    navLinks.forEach(function(link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });
}

window.addEventListener("scroll", updateActiveNavigation);
window.addEventListener("load", updateActiveNavigation);

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(function(element) {
    revealObserver.observe(element);
});

const projectImages = document.querySelectorAll(".project-card img");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

projectImages.forEach(function(image) {

    image.addEventListener("click", function() {

        lightboxImage.src = image.src;
        lightbox.style.display = "flex";

    });

});

// Close when clicking the X
closeLightbox.addEventListener("click", function() {

    lightbox.style.display = "none";

});

// Close when clicking outside the image
lightbox.addEventListener("click", function(event) {

    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }

});

const typingText = document.getElementById("typing-text");

const words = [
    "UI/UX DESIGNER",
    "WEB DESIGNER",
    "CREATIVE DESIGNER",
    "GRAPHIC DESIGNER",
    "PRODUCT DESIGNER",
    "SERVICE DESIGNER",
    "ALL ROUNDER"
];

let wordIndex = 0;
let characterIndex = 0;

function typeWord() {

    if (characterIndex < words[wordIndex].length) {

        typingText.textContent +=
            words[wordIndex].charAt(characterIndex);

        characterIndex++;

        setTimeout(typeWord, 100);

    } else {

        setTimeout(deleteWord, 1500);

    }
}

function deleteWord() {

    if (characterIndex > 0) {

        typingText.textContent =
            words[wordIndex].substring(0, characterIndex - 1);

        characterIndex--;

        setTimeout(deleteWord, 60);

    } else {

        wordIndex++;

        if (wordIndex >= words.length) {
            wordIndex = 0;
        }

        setTimeout(typeWord, 300);

    }
}

typeWord();


const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function(event) {

    console.log("CONTACT FORM SUBMITTED");

    event.preventDefault();

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const message = document.getElementById("message").value;

console.log("NAME:", name);
console.log("EMAIL:", email);
console.log("MESSAGE:", message);

    try {

  const response = await fetch("https://portfolio-backend-28xn.onrender.com/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })

        });

        const result = await response.json();

        if (result.success) {

            alert("Your message has been sent successfully!");

            contactForm.reset();

        } else {

            alert("Sorry, your message could not be sent.");

        }

    } catch (error) {

        console.error(error);

        alert("Unable to connect to the server.");

    }

});
