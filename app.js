/* =========================================================
   NPC — NEED PAMONG CONTEXT
   GAME LOGIC
========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

/*
   GANTI ACCESS CODE DI SINI
   kalau lu punya access code tertentu.
*/

const ACCESS_CODE = "SANAPATI";


/*
   Berapa lama mascot ditampilkan.
   3500 = 3.5 detik.
*/

const INTRO_DURATION = 3500;


/* =========================================================
   DOM
========================================================= */

const introScreen =
    document.getElementById("intro-screen");

const mainGame =
    document.getElementById("main-game");


/* =========================================================
   INTRO / MASCOT
========================================================= */

window.addEventListener("load", () => {

    /*
       Pastikan main game belum terlihat
       ketika website pertama kali dibuka.
    */

    mainGame.classList.remove("game-visible");


    /*
       Tunggu mascot tampil.
    */

    setTimeout(() => {

        /*
           Fade out mascot.
        */

        introScreen.classList.add("intro-hidden");


        /*
           Setelah fade mulai,
           munculkan game.
        */

        setTimeout(() => {

            mainGame.classList.add("game-visible");

        }, 300);

    }, INTRO_DURATION);

});


/* =========================================================
   SCREEN HELPER
========================================================= */

function showScreen(screenId) {

    const screens = [
        "login-screen",
        "username-screen",
        "pin-setup-screen",
        "pin-login-screen",
        "welcome-screen",
        "lore-screen",
        "game-screen"
    ];


    screens.forEach(id => {

        const element =
            document.getElementById(id);

        if (!element) return;

        element.classList.add("hidden");
    });


    const target =
        document.getElementById(screenId);

    if (target) {

        target.classList.remove("hidden");
    }

}


/* =========================================================
   LOCAL STORAGE
========================================================= */

function savePlayerData(data) {

    localStorage.setItem(
        "npcPlayer",
        JSON.stringify(data)
    );

}


function getPlayerData() {

    const data =
        localStorage.getItem("npcPlayer");

    if (!data) {

        return null;
    }


    try {

        return JSON.parse(data);

    } catch {

        return null;
    }

}


/* =========================================================
   ACCESS CODE
========================================================= */

const accessInput =
    document.getElementById("access-code");

const startButton =
    document.getElementById("start-button");

const accessError =
    document.getElementById("error-message");


startButton.addEventListener("click", () => {

    const code =
        accessInput.value.trim();


    if (!code) {

        accessError.textContent =
            "Masukkan access code terlebih dahulu.";

        return;
    }


    if (
        code.toUpperCase()
        !== ACCESS_CODE.toUpperCase()
    ) {

        accessError.textContent =
            "Access code tidak valid.";

        return;
    }


    accessError.textContent = "";


    const existingPlayer =
        getPlayerData();


    /*
       Kalau sudah pernah bermain,
       langsung minta PIN.
    */

    if (existingPlayer) {

        const pinMessage =
            document.getElementById(
                "pin-login-message"
            );

        pinMessage.textContent =
            `Welcome back, ${existingPlayer.username}. Masukkan PIN untuk melanjutkan progressmu.`;

        showScreen("pin-login-screen");

        return;
    }


    /*
       Player baru.
    */

    showScreen("username-screen");

});


/* =========================================================
   USERNAME
========================================================= */

const usernameInput =
    document.getElementById("username");

const usernameButton =
    document.getElementById("username-button");

const usernameError =
    document.getElementById("username-error");


usernameButton.addEventListener("click", () => {

    const username =
        usernameInput.value.trim();


    if (!username) {

        usernameError.textContent =
            "Username tidak boleh kosong.";

        return;
    }


    if (username.length < 3) {

        usernameError.textContent =
            "Username minimal 3 karakter.";

        return;
    }


    usernameError.textContent = "";


    /*
       Simpan sementara.
    */

    sessionStorage.setItem(
        "npcUsername",
        username
    );


    showScreen("pin-setup-screen");

});


/* =========================================================
   CREATE PIN
========================================================= */

const pinInput =
    document.getElementById("pin-input");

const pinConfirmInput =
    document.getElementById("pin-confirm-input");

const pinButton =
    document.getElementById("pin-button");

const pinError =
    document.getElementById("pin-error");


pinButton.addEventListener("click", () => {

    const pin =
        pinInput.value.trim();

    const confirmPin =
        pinConfirmInput.value.trim();


    if (!/^\d{4}$/.test(pin)) {

        pinError.textContent =
            "PIN harus terdiri dari 4 angka.";

        return;
    }


    if (pin !== confirmPin) {

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
            "Username tidak ditemukan. Silakan ulangi.";

        showScreen("username-screen");

        return;
    }


    /*
       Simpan player.
    */

    const player = {

        username: username,

        pin: pin,

        milestone: 1,

        createdAt:
            new Date().toISOString()

    };


    savePlayerData(player);


    sessionStorage.removeItem(
        "npcUsername"
    );


    pinError.textContent = "";


    document.getElementById(
        "welcome-message"
    ).textContent =
        `Welcome, ${username}! Your adventure in Sanapati Land begins now.`;


    showScreen("welcome-screen");

});


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


pinLoginButton.addEventListener("click", () => {

    const enteredPin =
        loginPinInput.value.trim();


    const player =
        getPlayerData();


    if (!player) {

        pinLoginError.textContent =
            "Data player tidak ditemukan.";

        return;
    }


    if (enteredPin !== player.pin) {

        pinLoginError.textContent =
            "PIN salah. Coba lagi.";

        return;
    }


    pinLoginError.textContent = "";


    document.getElementById(
        "welcome-message"
    ).textContent =
        `Welcome back, ${player.username}! Your adventure awaits.`;

    showScreen("welcome-screen");

});


/* =========================================================
   WELCOME → LORE
========================================================= */

const continueButton =
    document.getElementById(
        "continue-button"
    );


continueButton.addEventListener("click", () => {

    showScreen("lore-screen");

});


/* =========================================================
   LORE → GAME
========================================================= */

const loreButton =
    document.getElementById(
        "lore-button"
    );


loreButton.addEventListener("click", () => {

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


    showScreen("game-screen");

});


/* =========================================================
   ENTER KEY SUPPORT
========================================================= */

accessInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            startButton.click();

        }

    }
);


usernameInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            usernameButton.click();

        }

    }
);


pinInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            pinButton.click();

        }

    }
);


pinConfirmInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            pinButton.click();

        }

    }
);


loginPinInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            pinLoginButton.click();

        }

    }
);
