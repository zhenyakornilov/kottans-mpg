import cards from "./cards.js";

const cardsMenu = document.getElementById("game-cards");
const timer = document.getElementById("timer");
const startBtn = document.getElementById("start-button");

const states = {
  cardsPairs: 0,
  isGameStarted: false,
};

const allGameCards = shuffleCards([...cards, ...cards]);

function shuffleCards(cardsArr) {
  for (let i = cardsArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let swap = cardsArr[i];
    cardsArr[i] = cardsArr[j];
    cardsArr[j] = swap;
  }

  return cardsArr;
}

function renderCards(cardsObj) {
  const cardsAll = document.getElementById("game-cards");
  let cardsHTML = cardsObj
    .map(({ name, imageSrc }) => {
      return `
      <li class="game-card">
        <div class="card-inner">
          <div class="card-front">
            <img class="card-img-front" src="images/treble_clef.webp" alt="image of treble clef">
          </div>
          <div class="card-back">
            <img class="card-img" src="${imageSrc}" alt="image of ${name}">
            <p class="card-desc">${name}</p>
          </div>
        </div>
      </li>
      `;
    })
    .join("");

  cardsAll.innerHTML = cardsHTML;
}

renderCards(allGameCards);

let cardPair = [];
cardsMenu.addEventListener("click", function flipCards({ target }) {
  let currentCard = target.closest(".game-card");
  if (currentCard) {
    if (!currentCard.classList.contains("flipped")) {
      cardPair.push(currentCard);
    }
    currentCard.classList.add("flipped");

    if (cardPair.length === 2) {
      const [first, second] = cardPair;
      console.log(first.isEqualNode(second));

      if (!first.isEqualNode(second)) {
        setTimeout(() => {
          flipBack();
        }, 1000);
      } else {
        first.classList.add("matched");
        second.classList.add("matched");
        states.cardsPairs++;
      }
      cardPair = [];
    }

    if (states.cardsPairs === cards.length) {
      console.log("WIN GAME");
      alert("You won!");
    }
  }
});

function flipBack() {
  document.querySelectorAll(".flipped").forEach((card) => {
    console.log(card.classList);
    if (!card.classList.contains("matched")) {
      card.closest(".game-card").classList.remove("flipped");
    }
  });
}
