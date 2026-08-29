```javascript
/* =========================================================
   THE GRAND DEBATE 2026
   JAVASCRIPT
========================================================= */


/* =========================================================
   PRELOADER
========================================================= */

document.body.classList.add("loading");

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    setTimeout(() => {

        preloader.classList.add("hide");
        document.body.classList.remove("loading");

    }, 1100);

});


/* =========================================================
   NAVBAR
========================================================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", () => {

    menuButton.classList.toggle("active");
    navLinks.classList.toggle("open");

});


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        menuButton.classList.remove("active");
        navLinks.classList.remove("open");

    });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================================
   NUMBER COUNTERS
========================================================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let startTime = null;

            function animateCounter(timestamp) {

                if (!startTime) {
                    startTime = timestamp;
                }

                const progress =
                    Math.min((timestamp - startTime) / 1200, 1);

                const easing =
                    1 - Math.pow(1 - progress, 3);

                counter.textContent =
                    Math.floor(easing * target);

                if (progress < 1) {

                    requestAnimationFrame(
                        animateCounter
                    );

                } else {

                    counter.textContent = target;

                }

            }

            requestAnimationFrame(animateCounter);

            counterObserver.unobserve(counter);

        });

    },

    {
        threshold: .5
    }

);


counters.forEach(counter => {
    counterObserver.observe(counter);
});


/* =========================================================
   COUNTDOWN
========================================================= */

/*
   EVENT DATE

   October 1, 2026 at 09:00.

   Change this line if your event date changes.
*/

const eventDate =
    new Date("October 1, 2026 09:00:00").getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const difference =
        eventDate - now;


    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;

    }


    const days =
        Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference %
                (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (difference %
                (1000 * 60 * 60))
            /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (difference %
                (1000 * 60))
            /
            1000
        );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================================
   REGISTRATION FORM
========================================================= */

const form =
    document.getElementById("registrationForm");

const successMessage =
    document.getElementById("successMessage");


function showError(field, message) {

    const error =
        field.parentElement.querySelector(".error");

    if (error) {
        error.textContent = message;
    }

    field.classList.add("invalid");

}


function clearError(field) {

    const error =
        field.parentElement.querySelector(".error");

    if (error) {
        error.textContent = "";
    }

    field.classList.remove("invalid");

}


function validateRequired(field, message) {

    if (!field.value.trim()) {

        showError(field, message);

        return false;

    }

    clearError(field);

    return true;

}


function validateEmail(field) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(field.value.trim())) {

        showError(
            field,
            "Please enter a valid email."
        );

        return false;

    }

    clearError(field);

    return true;

}


function validateAge(field) {

    const age = Number(field.value);

    if (!age || age < 10 || age > 25) {

        showError(
            field,
            "Please enter an age between 10 and 25."
        );

        return false;

    }

    clearError(field);

    return true;

}


form.addEventListener("submit", event => {

    event.preventDefault();


    const firstName =
        document.getElementById("firstName");

    const lastName =
        document.getElementById("lastName");

    const email =
        document.getElementById("email");

    const phone =
        document.getElementById("phone");

    const school =
        document.getElementById("school");

    const age =
        document.getElementById("age");

    const participation =
        document.getElementById("participation");

    const experience =
        document.getElementById("experience");

    const topic =
        document.getElementById("topic");

    const agreement =
        document.getElementById("agreement");

    let valid = true;


    if (
        !validateRequired(
            firstName,
            "First name is required."
        )
    ) {
        valid = false;
    }


    if (
        !validateRequired(
            lastName,
            "Last name is required."
        )
    ) {
        valid = false;
    }


    if (
        !validateRequired(
            email,
            "Email is required."
        )
    ) {
        valid = false;

    } else if (!validateEmail(email)) {

        valid = false;

    }


    if (
        !validateRequired(
            phone,
            "Phone number is required."
        )
    ) {
        valid = false;
    }


    if (
        !validateRequired(
            school,
            "School or institution is required."
        )
    ) {
        valid = false;
    }


    if (!validateAge(age)) {
        valid = false;
    }


    if (
        !validateRequired(
            participation,
            "Please choose participation type."
        )
    ) {
        valid = false;
    }


    if (
        !validateRequired(
            experience,
            "Please choose experience level."
        )
    ) {
        valid = false;
    }


    if (
        !validateRequired(
            topic,
            "Please choose a preferred topic."
        )
    ) {
        valid = false;
    }


    const agreementError =
        document.querySelector(".agreement-error");


    if (!agreement.checked) {

        agreementError.textContent =
            "Please confirm the information is correct.";

        valid = false;

    } else {

        agreementError.textContent = "";

    }


    if (!valid) {

        const firstInvalid =
            form.querySelector(".invalid");

        if (firstInvalid) {
            firstInvalid.focus();
        }

        return;

    }


    /*
       FRONT-END SUCCESS

       This shows the confirmation screen.

       GitHub Pages is static, so this does not
       send the information to an email server.
    */

    successMessage.classList.add("show");

    form.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    console.log("Registration submitted:", {

        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value,
        school: school.value,
        age: age.value,
        participation: participation.value,
        experience: experience.value,
        topic: topic.value,
        message:
            document.getElementById("message").value

    });

});


/* =========================================================
   REMOVE FORM ERRORS WHILE TYPING
========================================================= */

form.querySelectorAll("input, select, textarea")
    .forEach(field => {

        field.addEventListener("input", () => {

            clearError(field);

        });

        field.addEventListener("change", () => {

            clearError(field);

        });

    });


/* =========================================================
   AGREEMENT CHECKBOX
========================================================= */

document
    .getElementById("agreement")
    .addEventListener("change", function () {

        if (this.checked) {

            document.querySelector(
                ".agreement-error"
            ).textContent = "";

        }

    });


/* =========================================================
   BACK TO TOP
========================================================= */

const backTop =
    document.getElementById("backTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 700) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   HERO PARALLAX
========================================================= */

const heroImage =
    document.querySelector(".hero-image");


window.addEventListener("scroll", () => {

    if (!heroImage) {
        return;
    }

    if (window.scrollY < window.innerHeight) {

        heroImage.style.transform =
            `scale(1.04) translateY(${window.scrollY * .08}px)`;

    }

});


/* =========================================================
   TOPIC INTERACTION
========================================================= */

document.querySelectorAll(".topic")
    .forEach(topic => {

        topic.addEventListener(
            "mouseenter",
            () => {

                const icon =
                    topic.querySelector("i");

                if (icon) {
                    icon.style.transform =
                        "rotate(45deg)";
                }

            }
        );


        topic.addEventListener(
            "mouseleave",
            () => {

                const icon =
                    topic.querySelector("i");

                if (icon) {
                    icon.style.transform =
                        "rotate(0deg)";
                }

            }
        );

    });


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%c THE GRAND DEBATE 2026 ",
    "background:#c9a96e;color:#060606;padding:10px;font-weight:bold;"
);

console.log(
    "Where ideas collide. Where voices become legacy."
);
```
