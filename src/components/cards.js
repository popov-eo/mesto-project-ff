import {
    formElementAdd
} from '../components/variables.js';

// create cards

function likeCard(likeElement) {
    likeElement
        .querySelector('.card__like-button')
        .addEventListener('click', (evt) => {
            evt.target.classList.toggle('card__like-button_is-active');
    });
}

function deleteCard(evt) {
    const listItem = evt.target.closest('.card');
    listItem.remove();
}

function createCard(cardData, deleteCallback, likeCardCallback, popupImageCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = `Изображение с видом: ${cardData.name}`;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    popupImageCallback(cardElement, cardData.link, cardData.name);

    likeCardCallback(cardElement);

    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);

    return cardElement;
}

function createNewCard(deleteCallback, likeCardCallback, popupImageCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const namePlaceInput = formElementAdd.querySelector('.popup__input_type_card-name');
    const imgUrl = formElementAdd.querySelector('.popup__input_type_url');

    const namePlaceValue = namePlaceInput.value;

    const imgSrcValue = imgUrl.value;

    cardElement.querySelector('.card__image').src = imgSrcValue;
    cardElement.querySelector('.card__image').alt = `Изображение с видом: ${namePlaceValue}`;
    cardElement.querySelector('.card__title').textContent = namePlaceValue;

    likeCardCallback(cardElement);

    popupImageCallback(cardElement, imgSrcValue, namePlaceValue)

    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);

    namePlaceInput.value = '';
    imgUrl.value = '';

    return cardElement;
}

export { createCard, createNewCard, likeCard, deleteCard };