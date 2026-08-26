/* =========================================================
   NPC — NEED PAMONG CONTEXT
========================================================= */


/* =========================================================
   ACCESS CODE
========================================================= */

const ACCESS_CODE = "SANAPATI";


/* =========================================================
   HELPER
========================================================= */

function showScreen(screenId) {

    const screens =
        document.querySelectorAll(".screen");

    screens.forEach(screen => {

        screen.classList.add("hidden");

    });

    const target =
        document.getElementById(screenId);

    if (target) {

        target.classList.remove("hidden");

    }

}


/* =========================================================
   OPENING
========================================================= */

const enterButton =
    document.getElementById("enter-button");

if (enterButton) {

    enterButton.addEventListener(
        "click",
        function () {

            showScreen("login-screen");

        }
    );

}


/* =========================================================
   ACCESS CODE
========================================================= */

const startButton =
    document.getElementById("start-button");

const accessCodeInput =
    document.getElementById("access-code");

const errorMessage =
    document.getElementById("error-message");


if (startButton) {

    startButton.addEventListener(
        "click",
        function () {

            const code =
                accessCodeInput.value
                .trim()
                .toUpperCase();


            if (code === ACCESS_CODE) {

                errorMessage.textContent = "";

                showScreen(
                    "username-screen"
                );

            } else {

                errorMessage.textContent =
                    "❌ Access code salah. Coba lagi.";

                accessCodeInput.value = "";

                accessCodeInput.focus();

            }

        }
    );

}


/* =========================================================
   USERNAME
========================================================= */

const usernameButton =
    document.getElementById("username-button");

const usernameInput =
    document.getElementById("username");

const usernameError =
    document.getElementById("username-error");


if (usernameButton) {

    usernameButton.addEventListener(
        "click",
        function () {

            const username =
                usernameInput.value.trim();


            if (
                username.length < 3
            ) {

                usernameError.textContent =
                    "❌ Username minimal 3 karakter.";

                return;

            }


            usernameError.textContent = "";


            localStorage.setItem(
                "npc_username",
                username
            );


            showScreen(
                "pin-setup-screen"
            );

        }
    );

}


/* =========================================================
   CREATE PIN
========================================================= */

const pinButton =
    document.getElementById("pin-button");

const pinInput =
    document.getElementById("pin-input");

const pinConfirmInput =
    document.getElementById(
        "pin-confirm-input"
    );

const pinError =
    document.getElementById("pin-error");


if (pinButton) {

    pinButton.addEventListener(
        "click",
        function () {

            const pin =
                pinInput.value.trim();

            const confirmPin =
                pinConfirmInput.value.trim();


            if (
                !/^\d{4}$/.test(pin)
            ) {

                pinError.textContent =
                    "❌ PIN harus terdiri dari 4 angka.";

                return;

            }


            if (
                pin !== confirmPin
            ) {

                pinError.textContent =
                    "❌ PIN tidak sama.";

                return;

            }


            pinError.textContent = "";


            localStorage.setItem(
                "npc_pin",
                pin
            );


            const username =
                localStorage.getItem(
                    "npc_username"
                );


            const welcomeMessage =
                document.getElementById(
                    "welcome-message"
                );


            welcomeMessage.textContent =
                `Welcome, ${username}! Your adventure in Sanapati Land awaits.`;


            showScreen(
                "welcome-screen"
            );

        }
    );

}


/* =========================================================
   WELCOME
========================================================= */

const continueButton =
    document.getElementById(
        "continue-button"
    );


if (continueButton) {

    continueButton.addEventListener(
        "click",
        function () {

            showScreen(
                "lore-screen"
            );

        }
    );

}


/* =========================================================
   LORE
========================================================= */

const loreButton =
    document.getElementById(
        "lore-button"
    );


if (loreButton) {

    loreButton.addEventListener(
        "click",
        function () {

            showScreen(
                "game-screen"
            );

            const username =
                localStorage.getItem(
                    "npc_username"
                );


            const playerLabel =
                document.getElementById(
                    "player-label"
                );


            if (playerLabel) {

                playerLabel.textContent =
                    `🧭 ${username}`;

            }

        }
    );

}


/* =========================================================
   ENTER KEY SUPPORT
========================================================= */

if (accessCodeInput) {

    accessCodeInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                startButton.click();

            }

        }
    );

}


if (usernameInput) {

    usernameInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                usernameButton.click();

            }

        }
    );

}


if (pinInput) {

    pinInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                pinButton.click();

            }

        }
    );

}


if (pinConfirmInput) {

    pinConfirmInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                pinButton.click();

            }

        }
    );

}
