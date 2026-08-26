const ACCESS_CODE = "SANAPATI";


/* =================================================
   SCREEN SWITCHER
================================================= */

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.add("hidden");

        });

    const target =
        document.getElementById(id);

    if (target) {

        target.classList.remove("hidden");

    }
}


/* =================================================
   OPENING
================================================= */

document
    .getElementById("enter-button")
    .addEventListener("click", () => {

        showScreen("login-screen");

    });


/* =================================================
   ACCESS CODE
================================================= */

const accessInput =
    document.getElementById("access-code");

const errorMessage =
    document.getElementById("error-message");


document
    .getElementById("start-button")
    .addEventListener("click", () => {

        const code =
            accessInput.value
                .trim()
                .toUpperCase();

        if (code === ACCESS_CODE) {

            errorMessage.textContent = "";

            showScreen(
                "username-screen"
            );

        } else {

            errorMessage.textContent =
                "❌ Access code salah.";

            accessInput.value = "";

            accessInput.focus();

        }

    });


/* =================================================
   USERNAME
================================================= */

document
    .getElementById("username-button")
    .addEventListener("click", () => {

        const username =
            document
                .getElementById("username")
                .value
                .trim();

        const error =
            document.getElementById(
                "username-error"
            );

        if (username.length < 3) {

            error.textContent =
                "❌ Username minimal 3 karakter.";

            return;

        }

        error.textContent = "";

        localStorage.setItem(
            "npc_username",
            username
        );

        showScreen(
            "pin-setup-screen"
        );

    });


/* =================================================
   PIN
================================================= */

document
    .getElementById("pin-button")
    .addEventListener("click", () => {

        const pin =
            document
                .getElementById("pin-input")
                .value
                .trim();

        const confirm =
            document
                .getElementById(
                    "pin-confirm-input"
                )
                .value
                .trim();

        const error =
            document.getElementById(
                "pin-error"
            );


        if (!/^\d{4}$/.test(pin)) {

            error.textContent =
                "❌ PIN harus 4 angka.";

            return;

        }


        if (pin !== confirm) {

            error.textContent =
                "❌ PIN tidak sama.";

            return;

        }


        localStorage.setItem(
            "npc_pin",
            pin
        );


        const username =
            localStorage.getItem(
                "npc_username"
            );


        document.getElementById(
            "welcome-message"
        ).textContent =
            `Welcome, ${username}! Your adventure in Sanapati Land awaits.`;


        showScreen(
            "welcome-screen"
        );

    });


/* =================================================
   WELCOME
================================================= */

document
    .getElementById("continue-button")
    .addEventListener("click", () => {

        showScreen(
            "lore-screen"
        );

    });


/* =================================================
   LORE
================================================= */

document
    .getElementById("lore-button")
    .addEventListener("click", () => {

        const username =
            localStorage.getItem(
                "npc_username"
            );

        document.getElementById(
            "player-label"
        ).textContent =
            `🧭 ${username}`;

        showScreen(
            "game-screen"
        );

    });


/* =================================================
   ENTER KEY
================================================= */

accessInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            document
                .getElementById(
                    "start-button"
                )
                .click();

        }

    }
);
