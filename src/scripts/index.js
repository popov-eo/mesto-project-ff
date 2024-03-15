import '../pages/index.css';
import '../scripts/cards.js';
import { createCard, deleteCard, likeCard } from '../components/cards.js';
import { openPopup, closePopup } from '../components/modal.js';

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const imageFullSize =  popupImage.querySelector('.popup__image');
const captionImage =  popupImage.querySelector('.popup__caption');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const formElementEdit = popupEdit.querySelector('.popup__form');
const formElementAdd = popupAdd.querySelector('.popup__form');

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
    imageFullSize.src = data.link;
    imageFullSize.alt = data.name;
    captionImage.textContent = data.name;
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

editButton.addEventListener('click', () => {
    openPopup(popupEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
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

    formElementAdd.reset();

    closePopup(popupAdd);
})



















