const SUPABASE_FUNCTION_URL =
    "https://wfrhomvhehsglmohshxl.supabase.co/functions/v1/get-game-data";

const SUPABASE_PROGRESS_URL =
    "https://wfrhomvhehsglmohshxl.supabase.co/functions/v1/player-progress";


// ==========================================
// ELEMENTS
// ==========================================

const accessCodeInput =
    document.getElementById("access-code");

const startButton =
    document.getElementById("start-button");

const errorMessage =
    document.getElementById("error-message");

const loginScreen =
    document.getElementById("login-screen");

const usernameScreen =
    document.getElementById("username-screen");

const usernameInput =
    document.getElementById("username");

const usernameButton =
    document.getElementById("username-button");

const usernameError =
    document.getElementById("username-error");

const pinSetupScreen =
    document.getElementById("pin-setup-screen");

const pinInput =
    document.getElementById("pin-input");

const pinConfirmInput =
    document.getElementById("pin-confirm-input");

const pinButton =
    document.getElementById("pin-button");

const pinError =
    document.getElementById("pin-error");

const pinLoginScreen =
    document.getElementById("pin-login-screen");

const loginPinInput =
    document.getElementById("login-pin-input");

const pinLoginButton =
    document.getElementById("pin-login-button");

const pinLoginError =
    document.getElementById("pin-login-error");

const welcomeScreen =
    document.getElementById("welcome-screen");

const welcomeMessage =
    document.getElementById("welcome-message");

const continueButton =
    document.getElementById("continue-button");

const loreScreen =
    document.getElementById("lore-screen");

const loreButton =
    document.getElementById("lore-button");

const gameScreen =
    document.getElementById("game-screen");

const pengasuhContainer =
    document.getElementById("pengasuh-container");

const playerLabel =
    document.getElementById("player-label");


// ==========================================
// GAME STATE
// ==========================================

let pengasuhData = [];

let currentPlayer = null;

let currentProgress = null;


// ==========================================
// HELPER
// ==========================================

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
}


function savePlayerLocally() {

    if (!currentPlayer) {
        return;
    }

    localStorage.setItem(
        "npc_player_id",
        currentPlayer.id
    );

    localStorage.setItem(
        "npc_username",
        currentPlayer.username
    );
}


function setCurrentPlayer(result) {

    currentPlayer =
        result.player || null;

    currentProgress =
        result.progress || null;

    savePlayerLocally();

    console.log(
        "Current player:",
        currentPlayer
    );

    console.log(
        "Current progress:",
        currentProgress
    );
}


function progressIsNew() {

    if (!currentProgress) {
        return true;
    }

    return (
        Number(currentProgress.current_milestone) === 1 &&
        currentProgress.current_stage === "intro"
    );
}


// ==========================================
// 1. ACCESS CODE
// ==========================================

startButton.addEventListener(
    "click",
    async () => {

        const code =
            accessCodeInput.value.trim();

        errorMessage.textContent = "";

        if (!code) {

            errorMessage.textContent =
                "Masukkan access code terlebih dahulu.";

            return;
        }

        startButton.disabled = true;
        startButton.textContent = "Loading...";

        try {

            const response =
                await fetch(
                    SUPABASE_FUNCTION_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            code: code
                        })
                    }
                );

            const result =
                await response.json();

            if (!result.success) {

                errorMessage.textContent =
                    "Access code salah.";

                return;
            }


            // Simpan data Pamong
            pengasuhData =
                result.data || [];

            console.log(
                "Data Pengasuh:",
                pengasuhData
            );


            // Masuk ke username
            showScreen(usernameScreen);

            usernameInput.focus();

        } catch (error) {

            console.error(error);

            errorMessage.textContent =
                "Terjadi kesalahan saat mengambil data.";

        } finally {

            startButton.disabled = false;

            startButton.textContent =
                "🚀 Start Game";
        }
    }
);


// ==========================================
// 2. CHECK USERNAME
// ==========================================

usernameButton.addEventListener(
    "click",
    async () => {

        const username =
            usernameInput.value.trim();

        usernameError.textContent = "";

        if (!username) {

            usernameError.textContent =
                "Masukkan username terlebih dahulu.";

            return;
        }

        if (username.length < 3) {

            usernameError.textContent =
                "Username minimal 3 karakter.";

            return;
        }

        usernameButton.disabled = true;
        usernameButton.textContent =
            "Checking...";

        try {

            const response =
                await fetch(
                    SUPABASE_PROGRESS_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            action: "check",
                            username: username
                        })
                    }
                );

            const result =
                await response.json();

            console.log(
                "Username check:",
                result
            );


            if (!result.success) {

                usernameError.textContent =
                    result.message ||
                    "Gagal mengecek username.";

                return;
            }


            // ==================================
            // USERNAME BELUM ADA
            // ==================================

            if (!result.exists) {

                currentPlayer = {
                    username: username
                };

                currentProgress = null;

                showScreen(pinSetupScreen);

                pinInput.focus();

                return;
            }


            // ==================================
            // USERNAME SUDAH ADA
            // ==================================

            currentPlayer =
                result.player;


            // Akun lama belum punya PIN
            if (result.needsPinSetup) {

                showScreen(pinSetupScreen);

                pinInput.focus();

                return;
            }


            // Akun sudah punya PIN
            showScreen(pinLoginScreen);

            pinLoginInput.focus();

        } catch (error) {

            console.error(error);

            usernameError.textContent =
                "Tidak dapat terhubung ke server.";

        } finally {

            usernameButton.disabled = false;

            usernameButton.textContent =
                "✨ Continue";
        }
    }
);


// ==========================================
// 3. CREATE / SET PIN
// ==========================================

pinButton.addEventListener(
    "click",
    async () => {

        const pin =
            pinInput.value.trim();

        const confirmPin =
            pinConfirmInput.value.trim();

        pinError.textContent = "";


        // Validasi PIN
        if (!/^\d{4}$/.test(pin)) {

            pinError.textContent =
                "PIN harus terdiri dari 4 angka.";

            return;
        }


        if (pin !== confirmPin) {

            pinError.textContent =
                "Konfirmasi PIN tidak cocok.";

            return;
        }


        if (!currentPlayer) {

            pinError.textContent =
                "Data player tidak ditemukan.";

            return;
        }


        pinButton.disabled = true;

        pinButton.textContent =
            "Saving...";


        try {

            let result;


            // ==================================
            // PLAYER BARU
            // ==================================

            if (!currentPlayer.id) {

                const response =
                    await fetch(
                        SUPABASE_PROGRESS_URL,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                action: "register",
                                username:
                                    currentPlayer.username,
                                pin: pin
                            })
                        }
                    );

                result =
                    await response.json();

            }


            // ==================================
            // PLAYER LAMA TANPA PIN
            // ==================================

            else {

                const response =
                    await fetch(
                        SUPABASE_PROGRESS_URL,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                action: "set-pin",
                                playerId:
                                    currentPlayer.id,
                                pin: pin
                            })
                        }
                    );

                result =
                    await response.json();
            }


            console.log(
                "PIN result:",
                result
            );


            if (!result.success) {

                pinError.textContent =
                    result.message ||
                    "Gagal menyimpan PIN.";

                return;
            }


            setCurrentPlayer(result);


            // PIN berhasil dibuat
            // Kalau progress masih intro,
            // masuk ke lore terlebih dahulu.

            if (progressIsNew()) {

                showScreen(loreScreen);

            } else {

                showScreen(welcomeScreen);

                welcomeMessage.textContent =
                    `Welcome back, ${currentPlayer.username}!`;
            }

        } catch (error) {

            console.error(error);

            pinError.textContent =
                "Tidak dapat terhubung ke server.";

        } finally {

            pinButton.disabled = false;

            pinButton.textContent =
                "🔐 Save PIN";
        }
    }
);


// ==========================================
// 4. LOGIN DENGAN PIN
// ==========================================

pinLoginButton.addEventListener(
    "click",
    async () => {

        const pin =
            loginPinInput.value.trim();

        pinLoginError.textContent = "";


        if (!/^\d{4}$/.test(pin)) {

            pinLoginError.textContent =
                "PIN harus terdiri dari 4 angka.";

            return;
        }


        const username =
            usernameInput.value.trim();


        pinLoginButton.disabled = true;

        pinLoginButton.textContent =
            "Checking...";


        try {

            const response =
                await fetch(
                    SUPABASE_PROGRESS_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            action: "login",
                            username: username,
                            pin: pin
                        })
                    }
                );


            const result =
                await response.json();


            console.log(
                "Login result:",
                result
            );


            if (!result.success) {

                pinLoginError.textContent =
                    result.message ||
                    "Username atau PIN salah.";

                return;
            }


            // Akun ternyata belum punya PIN
            if (result.needsPinSetup) {

                currentPlayer =
                    result.player;

                showScreen(pinSetupScreen);

                pinInput.focus();

                return;
            }


            setCurrentPlayer(result);


            // Player sudah punya progress
            showScreen(welcomeScreen);

            welcomeMessage.textContent =
                `Welcome back, ${currentPlayer.username}!`;

        } catch (error) {

            console.error(error);

            pinLoginError.textContent =
                "Tidak dapat terhubung ke server.";

        } finally {

            pinLoginButton.disabled = false;

            pinLoginButton.textContent =
                "▶️ Continue";
        }
    }
);


// ==========================================
// 5. CONTINUE PLAYER LAMA
// ==========================================

continueButton.addEventListener(
    "click",
    () => {

        masukKeGame();

    }
);


// ==========================================
// 6. LORE
// ==========================================

loreButton.addEventListener(
    "click",
    () => {

        masukKeGame();

    }
);


// ==========================================
// 7. MASUK KE GAME
// ==========================================

function masukKeGame() {

    showScreen(gameScreen);


    if (currentPlayer) {

        playerLabel.textContent =
            `👤 ${currentPlayer.username}`;

    }


    if (currentProgress) {

        const milestone =
            currentProgress.current_milestone ||
            1;

        document.getElementById(
            "milestone-label"
        ).textContent =
            `MILESTONE ${milestone}`;

    }


    console.log(
        "Starting game for:",
        currentPlayer
            ? currentPlayer.username
            : "-"
    );

    console.log(
        "Progress:",
        currentProgress
    );


    tampilkanPengasuh(
        pengasuhData
    );
}


// ==========================================
// 8. TAMPILKAN PENGASUH
// ==========================================

function tampilkanPengasuh(data) {

    pengasuhContainer.innerHTML = "";


    if (!data || data.length === 0) {

        pengasuhContainer.innerHTML =
            `<p>Tidak ada data Pamong.</p>`;

        return;
    }


    data.forEach(
        (pengasuh) => {

            const card =
                document.createElement("div");

            card.className =
                "card";


            card.innerHTML = `

                ${
                    pengasuh.foto_url

                    ? `
                        <img
                            src="${pengasuh.foto_url}"
                            alt="Foto Pengasuh"
                        >
                    `

                    : `
                        <div class="no-photo">
                            👤 Foto belum tersedia
                        </div>
                    `
                }

                <h3>
                    ${pengasuh.panggilan || "-"}
                </h3>

                <p>
                    ${pengasuh.nama || "-"}
                </p>

                <p class="team-label">
                    TEAM ${pengasuh.tim || "-"}
                </p>

                <p>
                    ${pengasuh.penempatan || "-"}
                </p>

            `;


            pengasuhContainer.appendChild(
                card
            );
        }
    );
}
