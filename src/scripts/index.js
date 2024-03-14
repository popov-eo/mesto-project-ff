import '../pages/index.css';
import '../scripts/cards.js';
import {
    cardsContainer,
    popups,
    popupEdit,
    popupAdd,
    editButton,
    addButton,
    formElementEdit,
    formElementAdd,
    popupImage
} from '../components/classVariables.js';
import { createCard, deleteCard, likeCard } from '../components/cards.js';
import { openPopup, closePopup } from '../components/modal.js';

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const namePlaceInput = formElementAdd.querySelector('.popup__input_type_card-name');
const imgUrl = formElementAdd.querySelector('.popup__input_type_url');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_description');
let nameValue = '';
let jobValue = '';
const newCardObj = {};


function openPopupImage(data) {
    openPopup(popupImage);
    popupImage.querySelector('.popup__image').src = data.link;
    popupImage.querySelector('.popup__image').alt = data.name;
    popupImage.querySelector('.popup__caption').textContent = data.name;
}

function handleFormSubmit(evt) {
    evt.preventDefault();

    nameValue = nameInput.value;
    jobValue = jobInput.value;

    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

    closePopup(popupEdit);
}

initialCards.forEach((cardElement) => {
    cardsContainer.append(createCard(cardElement, deleteCard, likeCard, openPopupImage));
})

editButton.addEventListener('click', () => {
    openPopup(popupEdit);
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
})

formElementEdit.addEventListener('submit', handleFormSubmit);

addButton.addEventListener('click', () => {
    openPopup(popupAdd);
})

formElementAdd.addEventListener('submit', (evt) => {
    evt.preventDefault();

    newCardObj.name = namePlaceInput.value;
    newCardObj.link = imgUrl.value;

    cardsContainer.prepend(createCard(newCardObj, deleteCard, likeCard, openPopupImage));

    namePlaceInput.value = '';
    imgUrl.value = '';

    closePopup(popupAdd);
})



















