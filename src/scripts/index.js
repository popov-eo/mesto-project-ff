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
    closeButtonEdit,
    closeButtonAdd,
} from '../components/variables.js';
import { createCard, createNewCard, deleteCard, likeCard } from '../components/cards.js';
import { handleFormSubmit, openPopup, closePopup, popupImageOpen } from '../components/modal.js';

// animating popups

popups.forEach((popup) => {
    popup.classList.add('popup_is-animated');
})

// create cards

initialCards.forEach((cardElement) => {
    cardsContainer.append(createCard(cardElement, deleteCard, likeCard, popupImageOpen));
});

formElementAdd.addEventListener('submit', (evt) => {
    evt.preventDefault();
    cardsContainer.prepend(createNewCard(deleteCard, likeCard, popupImageOpen));
    closePopup(closeButtonAdd);
});

// popups

editButton.addEventListener('click', () => {
    openPopup(editButton);
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            popupEdit.classList.remove('popup_is-opened');
        }
    })
});

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        const contentClick = evt.target.closest('.popup__content');

        if (!contentClick) {
            popup.classList.remove('popup_is-opened');
        }
    })
});

closeButtonEdit.addEventListener('click', () => {
    closePopup(closeButtonEdit);
});

closeButtonAdd.addEventListener('click', () => {
    closePopup(closeButtonAdd);
});

// events forms

formElementEdit.addEventListener('submit', handleFormSubmit);

addButton.addEventListener('click', () => {
    openPopup(addButton);
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            popupAdd.classList.remove('popup_is-opened');
        }
    })
});

// events popups

closeButtonEdit.addEventListener('click', () => {
    closePopup(closeButtonEdit);
});

closeButtonAdd.addEventListener('click', () => {
    closePopup(closeButtonAdd);
});





















