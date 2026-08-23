const SUPABASE_FUNCTION_URL =
    "https://wfrhomvhehsglmohshxl.supabase.co/functions/v1/get-game-data";

const accessCodeInput =
    document.getElementById("access-code");

const startButton =
    document.getElementById("start-button");

const errorMessage =
    document.getElementById("error-message");

const loginScreen =
    document.getElementById("login-screen");

const gameScreen =
    document.getElementById("game-screen");

const pengasuhContainer =
    document.getElementById("pengasuh-container");


startButton.addEventListener("click", async () => {

    const code = accessCodeInput.value.trim();

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

        const result = await response.json();

        if (!result.success) {
            errorMessage.textContent =
                "Access code salah.";
            return;
        }

        console.log("Data Pengasuh:", result.data);

        loginScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");

        tampilkanPengasuh(result.data);

    } catch (error) {

        console.error(error);

        errorMessage.textContent =
            "Terjadi kesalahan saat mengambil data.";

    } finally {

        startButton.disabled = false;
        startButton.textContent = "🚀 Start Game";
    }
});


function tampilkanPengasuh(data) {

    pengasuhContainer.innerHTML = "";

    data.forEach((pengasuh) => {

        const card =
            document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            ${
                pengasuh.foto_url
                ? `<img src="${pengasuh.foto_url}" alt="Foto Pengasuh">`
                : `<div>👤 Foto belum tersedia</div>`
            }

            <h3>${pengasuh.panggilan || "-"}</h3>

            <p>${pengasuh.nama || "-"}</p>

            <p>Tim ${pengasuh.tim || "-"}</p>

            <p>${pengasuh.penempatan || "-"}</p>

        `;

        pengasuhContainer.appendChild(card);
    });
}
