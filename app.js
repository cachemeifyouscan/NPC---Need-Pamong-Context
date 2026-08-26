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
                "101";


            if (
                code !== correctCode
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
