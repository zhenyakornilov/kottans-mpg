import cards from "./cards.js";

const states = {
  flippedCards: 0,
}

const allGameCards = [...cards, ...cards];

allGameCards.sort(() => {
  return 0.5 - Math.random();
});

function renderCards(cardsObj) {
  const cardsAll = document.getElementById("game-cards");
  let cardsHTML = cardsObj
    .map(({ name, imageSrc }) => {
      return `
      <li class="card">
        <div class="card-front">
          <img class="card-img-front" src="images/treble_clef.webp" alt="image of treble clef">
        </div>
        <div class="card-back">
          <img class="card-img" src="${imageSrc}" alt="image of ${name}">
          <p class='card-desc'>${name}</p>
        </div>
      </li>
      `;
    })
    .join("");

  cardsAll.innerHTML = cardsHTML;
}

renderCards(allGameCards);
