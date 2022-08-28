import cards from "./cards.js";

const cardsMenu = document.getElementById("game-cards");
const states = {
  cardsPairs: 0,
  firstFlippedCard: null,
  secondFlippedCard: null,
  currentCardPair: [],
  totalTries: 0,
};
const allGameCards = shuffleCards([...cards, ...cards]);
renderCards(allGameCards);

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

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function flipBack() {
  document.querySelectorAll(".flipped").forEach((card) => {
    console.log(card.classList);
    if (!card.classList.contains("matched")) {
      card.closest(".game-card").classList.remove("flipped");
    }
  });
}

cardsMenu.addEventListener("click", async function flipCards({ target }) {
  let currentCard = target.closest(".game-card");
  if (currentCard) {
    if (!currentCard.classList.contains("flipped")) {
      states.currentCardPair.push(currentCard);
    }
    currentCard.classList.add("flipped");

    if (states.currentCardPair.length === 2) {
      [states.firstFlippedCard, states.secondFlippedCard] =
        states.currentCardPair;
      console.log(
        states.firstFlippedCard.isEqualNode(states.secondFlippedCard)
      );

      if (!states.firstFlippedCard.isEqualNode(states.secondFlippedCard)) {
        await sleep(600).then(flipBack);
      } else {
        await sleep(600).then(() => {
          states.firstFlippedCard.classList.add("matched");
          states.secondFlippedCard.classList.add("matched");
        });
        states.cardsPairs++;
      }
      states.currentCardPair = [];
    }

    if (states.cardsPairs === cards.length) {
      console.log("WIN GAME");
      await sleep(1000).then(() => alert("You won!"));
      location.reload();
    }
  }
});
