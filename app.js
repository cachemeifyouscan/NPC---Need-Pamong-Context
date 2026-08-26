/* =========================================================
   NPC — NEED PAMONG CONTEXT
========================================================= */


/* =========================================================
   SETTINGS
========================================================= */

const ACCESS_CODE = "SANAPATI";


/* =========================================================
   SCREEN CONTROLLER
========================================================= */

function showScreen(screenId) {

    const screens =
        document.querySelectorAll(".screen");


    screens.forEach(function(screen) {

        screen.classList.add("hidden");

    });


    const target =
        document.getElementById(screenId);


    if (target) {

        target.classList.remove("hidden");

    }

}


/* =========================================================
   OPENING → ACCESS CODE
========================================================= */

const enterButton =
    document.getElementById(
        "enter-button"
    );


if (enterButton) {

    enterButton.addEventListener(
        "click",
        function() {

            showScreen(
                "login-screen"
            );

        }
    );

}


/* =========================================================
   ACCESS CODE
========================================================= */

const accessInput =
    document.getElementById(
        "access-code"
    );


const startButton =
    document.getElementById(
        "start-button"
    );


const errorMessage =
    document.getElementById(
        "error-message"
    );


if (startButton) {

    startButton.addEventListener(
        "click",
        function() {

            const code =
                accessInput.value
                    .trim()
                    .toUpperCase();


            if (code === ACCESS_CODE) {

                errorMessage.textContent =
                    "";


                showScreen(
                    "username-screen"
                );

            }

            else {

                errorMessage.textContent =
                    "❌ Access code salah. Coba lagi.";


                accessInput.value =
                    "";


                accessInput.focus();

            }

        }
    );

}


/* =========================================================
   USERNAME
========================================================= */

const usernameInput =
    document.getElementById(
        "username"
    );


const usernameButton =
    document.getElementById(
        "username-button"
    );


const usernameError =
    document.getElementById(
        "username-error"
    );


if (usernameButton) {

    usernameButton.addEventListener(
        "click",
        function() {

            const username =
                usernameInput.value.trim();


            if (username.length < 3) {

                usernameError.textContent =
                    "❌ Username minimal 3 karakter.";

                return;

            }


            usernameError.textContent =
                "";


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

const pinInput =
    document.getElementById(
        "pin-input"
    );


const pinConfirmInput =
    document.getElementById(
        "pin-confirm-input"
    );


const pinButton =
    document.getElementById(
        "pin-button"
    );


const pinError =
    document.getElementById(
        "pin-error"
    );


if (pinButton) {

    pinButton.addEventListener(
        "click",
        function() {

            const pin =
                pinInput.value.trim();


            const confirmPin =
                pinConfirmInput.value.trim();


            if (!/^\d{4}$/.test(pin)) {

                pinError.textContent =
                    "❌ PIN harus terdiri dari 4 angka.";

                return;

            }


            if (pin !== confirmPin) {

                pinError.textContent =
                    "❌ PIN tidak sama.";

                return;

            }


            pinError.textContent =
                "";


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
   WELCOME → LORE
========================================================= */

const continueButton =
    document.getElementById(
        "continue-button"
    );


if (continueButton) {

    continueButton.addEventListener(
        "click",
        function() {

            showScreen(
                "lore-screen"
            );

        }
    );

}


/* =========================================================
   LORE → GAME
========================================================= */

const loreButton =
    document.getElementById(
        "lore-button"
    );


if (loreButton) {

    loreButton.addEventListener(
        "click",
        function() {

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


            showScreen(
                "game-screen"
            );

        }
    );

}


/* =========================================================
   ENTER KEY — ACCESS CODE
========================================================= */

if (accessInput) {

    accessInput.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                startButton.click();

            }

        }
    );

}


/* =========================================================
   ENTER KEY — USERNAME
========================================================= */

if (usernameInput) {

    usernameInput.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                usernameButton.click();

            }

        }
    );

}


/* =========================================================
   ENTER KEY — PIN
========================================================= */

if (pinInput) {

    pinInput.addEventListener(
        "keydown",
        function(event) {

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
        function(event) {

            if (
                event.key === "Enter"
            ) {

                pinButton.click();

            }

        }
    );

}


/* =========================================================
   ENTER KEY — ACCESS CODE FALLBACK
========================================================= */

if (accessInput) {

    accessInput.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                startButton.click();

            }

        }
    );

}
