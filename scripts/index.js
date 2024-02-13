const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

function deleteCard() {
  document.querySelector('.card').remove();
}

initialCards.forEach (function (item) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__title').textContent = item.name;
    
    cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like-button_is-active');
    });

    cardElement.querySelector('.card__delete-button').style.backgroundImage = 'url(../images/delete-icon.svg)';

    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

    cardsContainer.append(cardElement);
  });