const player1Button = document.querySelector("#player-1");
const player2Button = document.querySelector("#player-2");
const conteiner = document.querySelector("#conteiner");
const reiniciar = document.querySelector("#reiniciar")
const celulas = [];

let currentPlayer = "X";
let gameEnded = false;

for (let i = 0; i < 9; i++) {
  const celula = document.createElement("div");
  celula.classList.add("blocos-content");
  celulas.push(celula);
  conteiner.appendChild(celula);

  celula.addEventListener("click", function () {
    if (!gameEnded && celula.textContent === "") {
      celula.textContent = currentPlayer;
      celula.classList.add("current-Player");

      if (checkWinner(currentPlayer)) {
        Swal.fire({
          title: "Parabens!",
          text: `O player ${currentPlayer} venceu!`,
          icon: "success",
        });
        gameEnded = true;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";

        if (checkDraw()) {
          Swal.fire({
            title: "Empate!",
            text: "O jogo empatou",
            icon: "warning",
          });
          gameEnded = true;
        }

        // Remover a classe do jogador anterior
        if (currentPlayer === "X") {
          player2Button.classList.remove("current-player");
          player1Button.classList.add("current-player");
        } else {
          player1Button.classList.remove("current-player");
          player2Button.classList.add("current-player");
        }
      }
    }
  });
}

function checkWinner(player) {
  const combinacoesVencedoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return combinacoesVencedoras.some(combination => {
    return combination.every(index => celulas[index].textContent === player);
  });
}

function checkDraw() {
  return [...celulas].every(celula => celula.textContent !== "");
}

reiniciar.addEventListener("click", function () {
  celulas.forEach(celula => {
    celula.textContent = "";
    celula.classList.remove("current-player");
  })
  currentPlayer = "X";
  gameEnded = false;

  player1Button.classList.add("current-player");
  player2Button.classList.remove("current-player")
});