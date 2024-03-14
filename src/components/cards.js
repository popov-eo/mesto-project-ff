function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

function deleteCard(evt) {
    const listItem = evt.target.closest('.card');
    listItem.remove();
}

function createCard(cardData, deleteCallback, likeCardCallback, popupImageCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    cardElement.querySelector('.card__image').addEventListener('click', () => {
        popupImageCallback(cardData);
    });

    cardElement.querySelector('.card__like-button').addEventListener('click', likeCardCallback);

    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);

    return cardElement;
}

export { createCard, likeCard, deleteCard };