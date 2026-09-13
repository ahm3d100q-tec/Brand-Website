/* =====================================================
   ACE WEBSITE JAVASCRIPT
===================================================== */


/* =====================================================
   CART
===================================================== */

const cartNotification = document.getElementById("cartNotification");
document.querySelectorAll(".quick-add").forEach(button => {
    button.addEventListener("click", function () {
        const card = this.closest(".product-card");
        const name = card.querySelector("h3")?.textContent.trim() || this.dataset.product;
        const price = Number((card.querySelector(".product-info > span")?.textContent || "0").replace(/[^0-9.]/g, ""));
        const image = card.querySelector(".image-primary")?.src || "";
        ACE.add({ name, price, image });
        if (cartNotification) {
            cartNotification.classList.add("show");
            setTimeout(() => cartNotification.classList.remove("show"), 2200);
        }
    });
});


/* =====================================================
   FAVORITES
===================================================== */

const favoriteButtons = document.querySelectorAll(".favorite-button");


favoriteButtons.forEach(button => {

    button.addEventListener("click", function () {

        this.classList.toggle("active");

        const icon = this.querySelector("i");

        if (this.classList.contains("active")) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

        }

    });

});


/* =====================================================
   SEARCH
===================================================== */

const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll(".product-card");


searchInput?.addEventListener("input", function () {

    const searchValue = this.value.toLowerCase().trim();


    productCards.forEach(card => {

        const productName =
            card.querySelector("h3")?.textContent.toLowerCase() || "";

        const productDescription =
            card.querySelector("p")?.textContent.toLowerCase() || "";


        if (
            productName.includes(searchValue) ||
            productDescription.includes(searchValue)
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

});


/* =====================================================
   NEWSLETTER
===================================================== */

const newsletterForm =
    document.getElementById("newsletterForm");


newsletterForm?.addEventListener("submit", function (event) {

    event.preventDefault();

    const emailInput =
        document.getElementById("emailInput");

    const email = emailInput.value.trim();


    if (!email) {
        return;
    }


    alert("Thank you for subscribing to Ace.");

    emailInput.value = "";

});


/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

const navbar =
    document.querySelector(".navbar");

const mainNav =
    document.querySelector(".main-nav");


window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");
        mainNav.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");
        mainNav.classList.remove("scrolled");

    }

});


/* =====================================================
   SMOOTH NAVIGATION
===================================================== */

const navLinks =
    document.querySelectorAll('a[href^="#"]');


navLinks.forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");

        if (
            targetId === "#" ||
            !document.querySelector(targetId)
        ) {
            return;
        }


        event.preventDefault();


        const target =
            document.querySelector(targetId);


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});
