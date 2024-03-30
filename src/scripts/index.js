import '../pages/index.css';
import { createCard, deleteCard, likeCard, searchMyProfileLike } from '../components/cards.js';
import { openPopup, closePopup } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { apiConfig, updateProfile, updateCards, deleteLike } from '../components/api.js';

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const imageFullSize =  popupImage.querySelector('.popup__image');
const captionImage =  popupImage.querySelector('.popup__caption');

const avatarButton = document.querySelector('.profile__image');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const formElementAvatar = popupAvatar.querySelector('.popup__form');
const formElementEdit = popupEdit.querySelector('.popup__form');
const formElementAdd = popupAdd.querySelector('.popup__form');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const namePlaceInput = formElementAdd.querySelector('.popup__input_type_card-name');
const imgUrl = formElementAdd.querySelector('.popup__input_type_url');

const avatarInput = formElementAvatar.querySelector('.popup__input_avatar_url')
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_description');

let avatarValue = '';
let nameValue = '';
let jobValue = '';
const newCardObj = {};

Promise.all([updateProfile, updateCards])
.then(([profileData, cardsData]) => {
    avatarButton.style.backgroundImage = `url(${profileData.avatar})`;
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;

    cardsData.forEach((cardElement) => {
        cardsContainer.append(createCard(cardElement, deleteCard, likeCard, openPopupImage, searchMyProfileLike));
    })
})
.catch((err) => {
    console.log(err);
})

function openPopupImage(data) {
    openPopup(popupImage);
    imageFullSize.src = data.link;
    imageFullSize.alt = data.name;
    captionImage.textContent = data.name;
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(popupEdit, true);

    nameValue = nameInput.value;
    jobValue = jobInput.value;

    fetch(`${apiConfig.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: `${apiConfig.headers.authorization}`,
            'Content-Type': `${apiConfig.headers['Content-Type']}`
        },
        body: JSON.stringify({
            name: nameValue,
            about: jobValue
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => renderLoading(popupEdit, false))

    closePopup(popupEdit);
}

popups.forEach((popup) => {
    popup.classList.add('popup_is-animated');

    popup.addEventListener('click', (evt) => {
        const contentClick = evt.target.closest('.popup__content');

        if (!contentClick) {
            closePopup(popup);
        }
    })

    popup.querySelector('.popup__close').addEventListener('click', () => {
        closePopup(popup);
    })
})

avatarButton.addEventListener('click', () => {
    openPopup(popupAvatar);

    clearValidation(formElementAvatar, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_inactive',
        inputErrorClass: 'popup__input_invalid',
        errorClass: 'popup__input-error_active'
    })

    enableValidation({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_inactive',
        inputErrorClass: 'popup__input_invalid',
        errorClass: 'popup__input-error_active'
    })
})

editButton.addEventListener('click', () => {
    openPopup(popupEdit);

    clearValidation(formElementEdit, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_inactive',
        inputErrorClass: 'popup__input_invalid',
        errorClass: 'popup__input-error_active'
    })

    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;

    enableValidation({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_inactive',
        inputErrorClass: 'popup__input_invalid',
        errorClass: 'popup__input-error_active'
    })
})

formElementEdit.addEventListener('submit', handleFormSubmit);

addButton.addEventListener('click', () => {
    openPopup(popupAdd);

    clearValidation(formElementAdd, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_inactive',
        inputErrorClass: 'popup__input_invalid',
        errorClass: 'popup__input-error_active'
    })

    enableValidation({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_inactive',
        inputErrorClass: 'popup__input_invalid',
        errorClass: 'popup__input-error_active'
    })
})

formElementAdd.addEventListener('submit', (evt) => {
    evt.preventDefault();

    renderLoading(popupAdd, true)

    newCardObj.name = namePlaceInput.value;
    newCardObj.link = imgUrl.value;

    fetch(`${apiConfig.baseUrl}/cards`, {
        method: 'POST',
        headers: {
            authorization: `${apiConfig.headers.authorization}`,
            'Content-Type': `${apiConfig.headers['Content-Type']}`
        },
        body: JSON.stringify({
            name: newCardObj.name,
            link: newCardObj.link
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
        console.log(data);
        cardsContainer.prepend(createCard(data, deleteCard, likeCard, openPopupImage, searchMyProfileLike));
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {renderLoading(popupAdd, false)})

    formElementAdd.reset();

    clearValidation(formElementAdd, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_inactive',
        inputErrorClass: 'popup__input_invalid',
        errorClass: 'popup__input-error_active'
    })

    closePopup(popupAdd);
})

function submitAvatarLink(evt) {
    evt.preventDefault();
    renderLoading(popupAvatar, true);

    avatarValue = avatarInput.value;

    fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: `${apiConfig.headers.authorization}`,
            'Content-Type': `${apiConfig.headers['Content-Type']}`
        },
        body: JSON.stringify({
            avatar: avatarValue
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
        console.log(data)
        avatarButton.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {renderLoading(popupAvatar, false);})

    closePopup(popupAvatar);
}

formElementAvatar.addEventListener('submit', submitAvatarLink);

function renderLoading(popup, isLoading) {
    const submitButton = popup.querySelector('.popup__button');
    if (isLoading) {
        submitButton.textContent = 'Сохранение...';
    } else {
        submitButton.textContent = 'Сохранить';
    }
}

















