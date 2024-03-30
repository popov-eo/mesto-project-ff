import { apiConfig, profileId } from '../components/api.js';

function likeCard(evt, cardData, cardElement) {
    const isLiked = cardElement.querySelector('.card__like-button').classList.contains('card__like-button_is-active');

    evt.target.classList.toggle('card__like-button_is-active');

    if (isLiked) {
        fetch(`${apiConfig.baseUrl}/cards/likes/${cardData._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${apiConfig.headers.authorization}`,
                'Content-Type': `${apiConfig.headers['Content-Type']}`
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
            cardElement.querySelector('.card__like-count').textContent = data.likes.length;
        })
        .catch((err) => {
            console.log(err);
        })
    } else {
        fetch(`${apiConfig.baseUrl}/cards/likes/${cardData._id}`, {
            method: 'PUT',
            headers: {
                authorization: `${apiConfig.headers.authorization}`,
                'Content-Type': `${apiConfig.headers['Content-Type']}`
            },
            body: JSON.stringify({
                likes: `${cardData.owner}`
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
            cardElement.querySelector('.card__like-count').textContent = data.likes.length;
        })
        .catch((err) => {
            console.log(err);
        })
    }

}

function deleteCard(evt, cardData) {
    const listItem = evt.target.closest('.card');
    listItem.remove();

    fetch(`${apiConfig.baseUrl}/cards/${cardData._id}`, {
        method: 'DELETE',
        headers: {
            authorization: `${apiConfig.headers.authorization}`
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
    })
}

function searchMyProfileLike(cardData, cardElement) {
    cardData.likes.forEach((user) => {
        if (user._id === profileId) {
            return cardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active');
        }

        return cardElement.querySelector('.card__like-button').classList.remove('card__like-button_is-active');
    })
}

function createCard(cardData, deleteCallback, likeCardCallback, popupImageCallback, searchMyProfileLikeCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    cardElement.querySelector('.card__like-count').textContent = cardData.likes.length;

    if (cardData.owner._id === profileId) {
        cardElement.querySelector('.card__delete-button').classList.remove('card__delete-button_invisible');
        cardElement.querySelector('.card__delete-button').disabled = false;
    } else {
        cardElement.querySelector('.card__delete-button').classList.add('card__delete-button_invisible');
        cardElement.querySelector('.card__delete-button').disabled = true;
    }

    searchMyProfileLikeCallback(cardData, cardElement);

    cardElement.querySelector('.card__image').addEventListener('click', () => {
        popupImageCallback(cardData);
    });

    cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => {
        likeCardCallback(evt, cardData, cardElement);
    });

    cardElement.querySelector('.card__delete-button').addEventListener('click', (evt) => {
        deleteCallback(evt, cardData);
    });

    return cardElement;
}

export { createCard, likeCard, deleteCard, searchMyProfileLike };