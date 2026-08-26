/* =====================================================
   NPC — NEED PAMONG CONTEXT
   GAME LOGIC
===================================================== */


/* =====================================================
   CONFIGURATION
===================================================== */

// GANTI INI kalau access code yang lu mau berbeda.
const ACCESS_CODE = "SANAPATI";


/* =====================================================
   ELEMENTS
===================================================== */

const introScreen =
    document.getElementById("intro-screen");

const loginScreen =
    document.getElementById("login-screen");

const usernameScreen =
    document.getElementById("username-screen");

const pinSetupScreen =
    document.getElementById("pin-setup-screen");

const pinLoginScreen =
    document.getElementById("pin-login-screen");

const welcomeScreen =
    document.getElementById("welcome-screen");

const loreScreen =
    document.getElementById("lore-screen");

const gameScreen =
    document.getElementById("game-screen");


/* =====================================================
   INTRO
===================================================== */

window.addEventListener("load", () => {

    /*
     * Mascot muncul dulu.
     *
     * Setelah 3 detik:
     * mascot fade out
     * lalu Access Code muncul.
     */

    setTimeout(() => {

        introScreen.classList.add(
            "intro-hidden"
        );

    }, 3000);

});


/* =====================================================
   HELPER
===================================================== */

function hideAllScreens() {

    loginScreen.classList.add("hidden");

    usernameScreen.classList.add("hidden");

    pinSetupScreen.classList.add("hidden");

    pinLoginScreen.classList.add("hidden");

    welcomeScreen.classList.add("hidden");

    loreScreen.classList.add("hidden");

    gameScreen.classList.add("hidden");
}


function showScreen(screen) {

    hideAllScreens();

    screen.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================================================
   LOCAL STORAGE
===================================================== */

function getPlayer() {

    const player =
        localStorage.getItem("npcPlayer");

    if (!player) {
        return null;
    }

    try {

        return JSON.parse(player);

    } catch {

        return null;

    }
}


function savePlayer(player) {

    localStorage.setItem(
        "npcPlayer",
        JSON.stringify(player)
    );
}


/* =====================================================
   ACCESS CODE
===================================================== */

document
    .getElementById("start-button")
    .addEventListener("click", () => {

        const input =
            document
                .getElementById("access-code")
                .value
                .trim();

        const error =
            document
                .getElementById("error-message");


        if (!input) {

            error.textContent =
                "Please enter the access code.";

            return;
        }


        if (
            input.toUpperCase() !==
            ACCESS_CODE
        ) {

            error.textContent =
                "Access code is incorrect.";

            return;
        }


        error.textContent = "";


        /*
         * Kalau sudah pernah bermain,
         * langsung minta PIN.
         */

        const player =
            getPlayer();


        if (player) {

            document
                .getElementById(
                    "pin-login-message"
                )
                .textContent =
                `Welcome back, ${player.username}. Enter your PIN to continue.`;

            showScreen(
                pinLoginScreen
            );

        } else {

            showScreen(
                usernameScreen
            );

        }

    });


/* =====================================================
   ENTER KEY — ACCESS CODE
===================================================== */

document
    .getElementById("access-code")
    .addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            document
                .getElementById("start-button")
                .click();

        }

    });


/* =====================================================
   USERNAME
===================================================== */

document
    .getElementById("username-button")
    .addEventListener("click", () => {

        const username =
            document
                .getElementById("username")
                .value
                .trim();

        const error =
            document
                .getElementById("username-error");


        if (!username) {

            error.textContent =
                "Username cannot be empty.";

            return;
        }


        if (username.length < 3) {

            error.textContent =
                "Username must be at least 3 characters.";

            return;
        }


        error.textContent = "";


        /*
         * Simpan sementara.
         */

        sessionStorage.setItem(
            "npcNewUsername",
            username
        );


        showScreen(
            pinSetupScreen
        );

    });


/* =====================================================
   CREATE PIN
===================================================== */

document
    .getElementById("pin-button")
    .addEventListener("click", () => {

        const pin =
            document
                .getElementById("pin-input")
                .value
                .trim();

        const confirmPin =
            document
                .getElementById("pin-confirm-input")
                .value
                .trim();

        const error =
            document
                .getElementById("pin-error");


        if (!/^\d{4}$/.test(pin)) {

            error.textContent =
                "PIN harus terdiri dari 4 angka.";

            return;
        }


        if (pin !== confirmPin) {

            error.textContent =
                "PIN confirmation does not match.";

            return;
        }


        const username =
            sessionStorage.getItem(
                "npcNewUsername"
            );


        if (!username) {

            error.textContent =
                "Username session expired. Please start again.";

            return;
        }


        const player = {

            username:
                username,

            pin:
                pin,

            milestone:
                1,

            createdAt:
                new Date().toISOString()

        };


        savePlayer(player);


        sessionStorage.removeItem(
            "npcNewUsername"
        );


        error.textContent = "";


        document
            .getElementById(
                "welcome-message"
            )
            .textContent =
            `Welcome to NPC, ${username}. Your adventure begins here.`;


        showScreen(
            welcomeScreen
        );

    });


/* =====================================================
   LOGIN WITH PIN
===================================================== */

document
    .getElementById("pin-login-button")
    .addEventListener("click", () => {

        const enteredPin =
            document
                .getElementById(
                    "login-pin-input"
                )
                .value
                .trim();

        const error =
            document
                .getElementById(
                    "pin-login-error"
                );

        const player =
            getPlayer();


        if (!player) {

            showScreen(
                usernameScreen
            );

            return;
        }


        if (enteredPin !== player.pin) {

            error.textContent =
                "Incorrect PIN.";

            return;
        }


        error.textContent = "";


        document
            .getElementById(
                "welcome-message"
            )
            .textContent =
            `Welcome back, ${player.username}. Ready to continue your adventure?`;


        showScreen(
            welcomeScreen
        );

    });


/* =====================================================
   WELCOME → LORE
===================================================== */

document
    .getElementById("continue-button")
    .addEventListener("click", () => {

        showScreen(
            loreScreen
        );

    });


/* =====================================================
   LORE → GAME
===================================================== */

document
    .getElementById("lore-button")
    .addEventListener("click", () => {

        startGame();

    });


/* =====================================================
   START GAME
===================================================== */

function startGame() {

    const player =
        getPlayer();


    if (!player) {

        showScreen(
            usernameScreen
        );

        return;
    }


    document
        .getElementById(
            "player-label"
        )
        .textContent =
        `👤 ${player.username}`;


    document
        .getElementById(
            "milestone-label"
        )
        .textContent =
        `MILESTONE ${player.milestone}`;


    showScreen(
        gameScreen
    );


    renderGame();

}


/* =====================================================
   GAME CONTENT
===================================================== */

function renderGame() {

    const container =
        document.getElementById(
            "pengasuh-container"
        );


    container.innerHTML = `

        <div class="game-card">

            <h3>
                🗺️ Sanapati Land
            </h3>

            <p>
                Your adventure is about to begin.
            </p>

            <p>
                Kenali setiap Pamong,
                pahami perannya,
                dan temukan konteks di baliknya.
            </p>

        </div>

    `;

}


/* =====================================================
   ENTER KEY — USERNAME
===================================================== */

document
    .getElementById("username")
    .addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            document
                .getElementById(
                    "username-button"
                )
                .click();

        }

    });


/* =====================================================
   ENTER KEY — PIN SETUP
===================================================== */

document
    .getElementById("pin-confirm-input")
    .addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            document
                .getElementById(
                    "pin-button"
                )
                .click();

        }

    });


/* =====================================================
   ENTER KEY — PIN LOGIN
===================================================== */

document
    .getElementById("login-pin-input")
    .addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            document
                .getElementById(
                    "pin-login-button"
                )
                .click();

        }

    });
