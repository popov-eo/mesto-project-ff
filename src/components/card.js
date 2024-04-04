import {
    deleteCardInServer,
    deleteLikeInServer,
    putLikeInServer
} from './api.js';

function likeCard(cardData, cardElement) {
    const isLiked = cardElement.querySelector('.card__like-button').classList.contains('card__like-button_is-active');

    if (isLiked) {
        deleteLikeInServer(cardData, cardElement)
        .then((data) => {
            cardElement.querySelector('.card__like-count').textContent = data.likes.length;
            cardElement.querySelector('.card__like-button').classList.remove('card__like-button_is-active')
        })
        .catch(err => console.log(err));
    } else {
        putLikeInServer(cardData)
        .then((data) => {
            cardElement.querySelector('.card__like-count').textContent = data.likes.length;
            cardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active')
        })
        .catch(err => console.log(err));
    }
}

function deleteCard(evt, cardData) {
    deleteCardInServer(cardData)
    .then(() => {
        const listItem = evt.target.closest('.card');
        listItem.remove()
    })
    .catch(err => console.log(err))
}

function searchMyProfileLike(cardData, cardElement, profileId) {
    cardData.likes.forEach((user) => {
        if (user._id === profileId) {
            return cardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active')
        }

        return cardElement.querySelector('.card__like-button').classList.remove('card__like-button_is-active')
    })
}

function createCard(
    cardData,
    deleteCallback,
    likeCardCallback,
    popupImageCallback,
    searchMyProfileLikeCallback,
    profileId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    cardElement.querySelector('.card__like-count').textContent = cardData.likes.length;

    if (cardData.owner._id === profileId) {
        cardElement.querySelector('.card__delete-button').classList.remove('card__delete-button_invisible');
        cardElement.querySelector('.card__delete-button').disabled = false
    } else {
        cardElement.querySelector('.card__delete-button').classList.add('card__delete-button_invisible');
        cardElement.querySelector('.card__delete-button').disabled = true
    }

    searchMyProfileLikeCallback(cardData, cardElement, profileId);

    cardElement.querySelector('.card__image').addEventListener('click', () => {
        popupImageCallback(cardData)
    })

    cardElement.querySelector('.card__like-button').addEventListener('click', () => {
        likeCardCallback(cardData, cardElement, profileId, searchMyProfileLike)
    })

    cardElement.querySelector('.card__delete-button').addEventListener('click', (evt) => {
        deleteCallback(evt, cardData)
    })

    return cardElement;
}

export { createCard, likeCard, deleteCard, searchMyProfileLike };