/* =========================================================
   NPC — NEED PAMONG CONTEXT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const introScreen =
    document.getElementById(
        "intro-screen"
    );


const introStartButton =
    document.getElementById(
        "intro-start-button"
    );


const mainGame =
    document.getElementById(
        "main-game"
    );


/* =========================================================
   ALL GAME SCREENS
========================================================= */

const screens = [

    "login-screen",

    "username-screen",

    "pin-setup-screen",

    "pin-login-screen",

    "welcome-screen",

    "lore-screen",

    "game-screen"

];


/* =========================================================
   SCREEN SYSTEM
========================================================= */

function showScreen(screenId) {

    screens.forEach(
        function (id) {

            const element =
                document.getElementById(id);

            if (element) {

                element.classList.add(
                    "hidden"
                );

            }

        }
    );


    const target =
        document.getElementById(
            screenId
        );


    if (target) {

        target.classList.remove(
            "hidden"
        );

    }

}


/* =========================================================
   INITIAL STATE
========================================================= */

if (mainGame) {

    mainGame.style.display =
        "none";

}


if (introScreen) {

    introScreen.style.display =
        "flex";

}


/*
   Saat pertama dibuka,
   hanya login-screen yang disiapkan.
*/

showScreen(
    "login-screen"
);


/* =========================================================
   OPENING → ACCESS CODE
========================================================= */

if (introStartButton) {

    introStartButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            /*
               Hilangkan opening.
            */

            if (introScreen) {

                introScreen.style.display =
                    "none";

            }


            /*
               Tampilkan game.
            */

            if (mainGame) {

                mainGame.style.display =
                    "block";

            }


            /*
               Pastikan hanya Access Code
               yang terlihat.
            */

            showScreen(
                "login-screen"
            );


            /*
               Scroll kembali ke atas.
            */

            window.scrollTo(
                0,
                0
            );

        }
    );

}


/* =========================================================
   PLAYER STORAGE
========================================================= */

function savePlayerData(data) {

    localStorage.setItem(

        "npcPlayer",

        JSON.stringify(data)

    );

}


function getPlayerData() {

    const saved =
        localStorage.getItem(
            "npcPlayer"
        );


    if (!saved) {

        return null;

    }


    try {

        return JSON.parse(
            saved
        );

    }

    catch (error) {

        return null;

    }

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


const accessError =
    document.getElementById(
        "error-message"
    );


if (startButton) {

    startButton.addEventListener(
        "click",
        function () {


            const code =
                accessInput.value.trim();


            if (!code) {

                accessError.textContent =
                    "The gate awaits your seal.";

                return;

            }


            /*
               ACCESS CODE
            */

            const correctCode =
                "SANAPATI";


            if (
                code.toUpperCase()
                !==
                correctCode.toUpperCase()
            ) {

                accessError.textContent =
                    "The gate remains sealed. Try again.";

                return;

            }


            accessError.textContent =
                "";


            const player =
                getPlayerData();


            /*
               EXISTING PLAYER
            */

            if (player) {

                document.getElementById(
                    "pin-login-message"
                ).textContent =

                    `Welcome back, ${player.username}. Masukkan PIN untuk melanjutkan progressmu.`;


                showScreen(
                    "pin-login-screen"
                );


                return;

            }


            /*
               NEW PLAYER
            */

            showScreen(
                "username-screen"
            );

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
        function () {


            const username =
                usernameInput.value.trim();


            if (!username) {

                usernameError.textContent =
                    "Username tidak boleh kosong.";

                return;

            }


            if (
                username.length < 3
            ) {

                usernameError.textContent =
                    "Username minimal 3 karakter.";

                return;

            }


            usernameError.textContent =
                "";


            sessionStorage.setItem(
                "npcUsername",
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
        function () {


            const pin =
                pinInput.value.trim();


            const confirmPin =
                pinConfirmInput.value.trim();


            if (
                !/^\d{4}$/.test(pin)
            ) {

                pinError.textContent =
                    "PIN harus terdiri dari 4 angka.";

                return;

            }


            if (
                pin !==
                confirmPin
            ) {

                pinError.textContent =
                    "PIN dan konfirmasi PIN tidak sama.";

                return;

            }


            const username =
                sessionStorage.getItem(
                    "npcUsername"
                );


            if (!username) {

                pinError.textContent =
                    "Username tidak ditemukan.";

                return;

            }


            const player = {

                username:
                    username,

                pin:
                    pin,

                milestone:
                    1

            };


            savePlayerData(
                player
            );


            sessionStorage.removeItem(
                "npcUsername"
            );


            document.getElementById(
                "welcome-message"
            ).textContent =

                `Welcome, ${username}! Your adventure in Sanapati Land begins now.`;


            showScreen(
                "welcome-screen"
            );

        }
    );

}


/* =========================================================
   PIN LOGIN
========================================================= */

const loginPinInput =
    document.getElementById(
        "login-pin-input"
    );


const pinLoginButton =
    document.getElementById(
        "pin-login-button"
    );


const pinLoginError =
    document.getElementById(
        "pin-login-error"
    );


if (pinLoginButton) {

    pinLoginButton.addEventListener(
        "click",
        function () {


            const enteredPin =
                loginPinInput.value.trim();


            const player =
                getPlayerData();


            if (!player) {

                pinLoginError.textContent =
                    "Data player tidak ditemukan.";

                return;

            }


            if (
                enteredPin !==
                player.pin
            ) {

                pinLoginError.textContent =
                    "PIN salah. Coba lagi.";

                return;

            }


            pinLoginError.textContent =
                "";


            document.getElementById(
                "welcome-message"
            ).textContent =

                `Welcome back, ${player.username}! Your adventure awaits.`;


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
        function () {

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
        function () {


            const player =
                getPlayerData();


            if (player) {

                document.getElementById(
                    "player-label"
                ).textContent =

                    `👤 ${player.username}`;


                document.getElementById(
                    "milestone-label"
                ).textContent =

                    `MILESTONE ${player.milestone || 1}`;

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
        function (event) {

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
        function (event) {

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
        function (event) {

            if (
                event.key === "Enter"
            ) {

                pinButton.click();

            }

        }
    );

}


/* =========================================================
   ENTER KEY — CONFIRM PIN
========================================================= */

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


/* =========================================================
   ENTER KEY — LOGIN PIN
========================================================= */

if (loginPinInput) {

    loginPinInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                pinLoginButton.click();

            }

        }
    );

}
