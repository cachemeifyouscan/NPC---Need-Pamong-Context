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


// ==========================================
// GAME DATA
// ==========================================

let pengasuhData = [];

let currentPlayer = null;

let currentProgress = null;


// ==========================================
// 1. ACCESS CODE
// ==========================================

startButton.addEventListener("click", async () => {

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

        const response = await fetch(
            SUPABASE_FUNCTION_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
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

        // Simpan data Pengasuh untuk dipakai nanti
        pengasuhData = result.data || [];

        console.log(
            "Data Pengasuh:",
            pengasuhData
        );

        // Masuk ke username
        loginScreen.classList.add("hidden");

        usernameScreen.classList.remove("hidden");

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
});


// ==========================================
// 2. USERNAME
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
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            action: "login",
                            username: username
                        })
                    }
                );

            const result =
                await response.json();

            console.log(
                "Player result:",
                result
            );

            if (!result.success) {

                usernameError.textContent =
                    result.message ||
                    "Gagal membuat player.";

                return;
            }

            // Simpan player dan progress
            currentPlayer =
                result.player;

            currentProgress =
                result.progress;

            // Simpan player ID di browser
            localStorage.setItem(
                "npc_player_id",
                currentPlayer.id
            );

            localStorage.setItem(
                "npc_username",
                currentPlayer.username
            );

            console.log(
                "Current player:",
                currentPlayer
            );

            console.log(
                "Current progress:",
                currentProgress
            );


            // ==================================
            // PLAYER BARU
            // ==================================

            if (result.isNewPlayer) {

                usernameScreen.classList.add(
                    "hidden"
                );

                loreScreen.classList.remove(
                    "hidden"
                );

                return;
            }


            // ==================================
            // PLAYER LAMA
            // ==================================

            usernameScreen.classList.add(
                "hidden"
            );

            welcomeScreen.classList.remove(
                "hidden"
            );

            welcomeMessage.textContent =
                `Welcome back, ${currentPlayer.username}!`;

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
// 3. CONTINUE PLAYER LAMA
// ==========================================

continueButton.addEventListener(
    "click",
    () => {

        welcomeScreen.classList.add(
            "hidden"
        );

        masukKeGame();

    }
);


// ==========================================
// 4. LORE PLAYER BARU
// ==========================================

loreButton.addEventListener(
    "click",
    () => {

        loreScreen.classList.add(
            "hidden"
        );

        masukKeGame();

    }
);


// ==========================================
// 5. MASUK KE GAME
// ==========================================

function masukKeGame() {

    gameScreen.classList.remove(
        "hidden"
    );

    console.log(
        "Starting game for:",
        currentPlayer.username
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
// 6. TAMPILKAN PENGASUH
// ==========================================

function tampilkanPengasuh(data) {

    pengasuhContainer.innerHTML = "";

    data.forEach((pengasuh) => {

        const card =
            document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            ${
                pengasuh.foto_url
                ? `<img
                    src="${pengasuh.foto_url}"
                    alt="Foto Pengasuh"
                  >`
                : `<div>
                    👤 Foto belum tersedia
                  </div>`
            }

            <h3>
                ${pengasuh.panggilan || "-"}
            </h3>

            <p>
                ${pengasuh.nama || "-"}
            </p>

            <p>
                <strong>
                    TEAM ${pengasuh.tim || "-"}
                </strong>
            </p>

            <p>
                ${pengasuh.penempatan || "-"}
            </p>

        `;

        pengasuhContainer.appendChild(
            card
        );
    });
}
