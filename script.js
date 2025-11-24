document.addEventListener("DOMContentLoaded", () => {
  
  const board = document.querySelector("#board");
  const startScreen = document.querySelector("#start-screen");
  const gameScreen = document.querySelector("#game-screen");
  const titleLevel = document.querySelector("#title-level");
  const btnBack = document.querySelector("#btn-back");

  let firstCard = null;
  let lock = false;
  let matches = 0;      // pares encontrados
let totalMatches = 0; // total de pares possíveis


  const images = [ "hk1.jpg","hk2.jpg","hk3.jpg","hk4.jpg", "hk5.jpg","hk6.jpg","hk7.jpg","hk8.jpg", "hk9.jpg","hk10.jpg","hk11.jpg","hk12.jpg", "hk13.jpg","hk14.jpg","hk15.jpg","hk16.jpg", "hk17.jpg","hk18.jpg","hk19.jpg","hk20.jpg" ];

  // 📌 EVENTO DOS BOTÕES
  document.querySelectorAll(".btn-level").forEach(btn => {
    btn.addEventListener("click", () => {
      const size = Number(btn.dataset.size);
      startGame(size);
    });
  });

  function startGame(size) {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    titleLevel.textContent =
      size === 4 ? "✨ Nível Fácil (4x4)" :
      size === 5 ? "💖 Nível Médio (5x5)" :
                  "🌟 Nível Difícil (6x6)";

    const totalCards = size * size;
totalMatches = totalCards / 2;
matches = 0;


    let selected = images.slice(0, Math.floor(totalCards / 2));
    let cards = [...selected, ...selected];

    cards = shuffle(cards);

    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.innerHTML = "";

    cards.forEach(img => {
      board.innerHTML += `
        <div class="card" data-img="${img}">
          <div class="face front"></div>
          <div class="face back" style="background-image: url('assets/${img}')"></div>
        </div>
      `;
    });

    document.querySelectorAll(".card").forEach(card => {
      card.addEventListener("click", flip);
    });
    // Depois de criar todas as cartas no tabuleiro
setTimeout(() => {
  document.querySelectorAll(".card").forEach(card => {
    card.classList.add("flip"); // mostra a carta
  });

  // Depois de 2 segundos, vira tudo de volta
  setTimeout(() => {
    document.querySelectorAll(".card").forEach(card => {
      card.classList.remove("flip");
    });
  }, 2000);
}, 300);

  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.random() * (i + 1) | 0;
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function flip() {
    if (lock || this.classList.contains("flip")) return;

    this.classList.add("flip");

    if (!firstCard) {
      firstCard = this;
      return;
    }

    if (this.dataset.img === firstCard.dataset.img) {
  
  matches++;
  firstCard = null;

  // 👉 QUANDO GANHAR
  if (matches === totalMatches) {
    showWinAnimation();
  }

} else {

      lock = true;
      setTimeout(() => {
        this.classList.remove("flip");
        firstCard.classList.remove("flip");
        firstCard = null;
        lock = false;
      }, 800);
    }
  }
function showWinAnimation() {
  const win = document.getElementById("winAnimation");
  win.classList.remove("hidden");

  setTimeout(() => {
    win.classList.add("hidden");
  }, 4000);
}

  btnBack.addEventListener("click", () => {
    gameScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
  });
  
});
