const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
const deleteButton = container.querySelector('.card__delete-button');

function deleteCard(evt) {
  const listItem = evt.target.closest('.card');
  listItem.remove();
};

function createCard(cardData, deleteCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = `Изображение с видом: ${cardData.name}`;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  
  cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
  });

  cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);

  return cardElement;
}

initialCards.forEach ((cardElement) => {
  cardsContainer.append(createCard(cardElement, deleteCard));
});


