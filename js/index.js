import cards from "./cards.js";

const allGameCards = [...cards, ...cards];

function renderCards(cardsObj) {
  const cardsAll = document.getElementById("game-cards");
  let cardsHTML = cardsObj
    .map(({ name, imageSrc }) => {
      return (
        `<li class="card">` +
        `  <img class="card-img" src="${imageSrc}" alt="image of ${name}">` +
        `  <p class='card-desc'>${name}</p>` +
        `</li>`
      );
    })
    .join("");

  cardsAll.innerHTML = cardsHTML;
}

renderCards(allGameCards);
