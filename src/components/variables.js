const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const formElementEdit = popupEdit.querySelector('.popup__form');
const formElementAdd = popupAdd.querySelector('.popup__form');
const closeButtonEdit = popupEdit.querySelector('.popup__close');
const closeButtonAdd = popupAdd.querySelector('.popup__close');
const closeButtonImg = popupImage.querySelector('.popup__close');

const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_description');

export {
    container,
    cardsContainer,
    popups,
    popupEdit,
    popupAdd,
    popupImage,
    editButton,
    addButton,
    formElementEdit,
    formElementAdd,
    closeButtonEdit,
    closeButtonAdd,
    closeButtonImg,
    nameInput,
    jobInput
}