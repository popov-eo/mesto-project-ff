import '../pages/index.css';
import {
    createCard,
    deleteCard,
    likeCard,
    searchMyProfileLike
} from '../components/card.js';
import {
    openPopup,
    closePopup
} from '../components/modal.js';
import {
    enableValidation,
    clearValidation
} from '../components/validation.js';
import {
    updateProfile,
    updateCards,
    editProfileInServer,
    addCardInServer,
    changeAvatarInServer
} from '../components/api.js';

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
let profileId = '';

const namePlaceInput = formElementAdd.querySelector('.popup__input_type_card-name');
const imgUrl = formElementAdd.querySelector('.popup__input_type_url');

const avatarInput = formElementAvatar.querySelector('.popup__input_avatar_url');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const jobInput = formElementEdit.querySelector('.popup__input_type_description');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input-error_active'
}

Promise.all([updateProfile, updateCards])
.then(([profileData, cardsData]) => {
    avatarButton.style.backgroundImage = `url(${profileData.avatar})`;
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileId = profileData._id;

    cardsData.forEach((cardElement) => {
        cardsContainer.append(createCard(
            cardElement,
            deleteCard,
            likeCard,
            openPopupImage,
            searchMyProfileLike,
            profileId)
        )
    })
})
.catch((err) => {
    console.log(err);
})

function openPopupImage(data) {
    openPopup(popupImage);
    imageFullSize.src = data.link;
    imageFullSize.alt = data.name;
    captionImage.textContent = data.name
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(popupEdit, true);

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    editProfileInServer(
        nameValue,
        jobValue
    )
    .then(data => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
    })
    .catch(err => console.log(err))
    .finally(() => renderLoading(popupEdit, false));

    closePopup(popupEdit)
}

enableValidation(validationConfig);


popups.forEach((popup) => {
    popup.classList.add('popup_is-animated');

    popup.addEventListener('click', (evt) => {
        const contentClick = evt.target.closest('.popup__content');

        if (!contentClick) {
            closePopup(popup)
        }
    })

    popup.querySelector('.popup__close').addEventListener('click', () => {
        closePopup(popup)
    })
})

avatarButton.addEventListener('click', () => {
    openPopup(popupAvatar);

    clearValidation(popupAvatar, validationConfig);
})

editButton.addEventListener('click', () => {
    openPopup(popupEdit);

    clearValidation(popupEdit, validationConfig);

    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent
})

formElementEdit.addEventListener('submit', handleFormSubmit);

addButton.addEventListener('click', () => {
    openPopup(popupAdd);

    clearValidation(popupAdd, validationConfig)
})

formElementAdd.addEventListener('submit', (evt) => {
    evt.preventDefault();

    renderLoading(popupAdd, true);

    const newCardObj = {};

    newCardObj.name = namePlaceInput.value;
    newCardObj.link = imgUrl.value;

    addCardInServer(
        newCardObj,
        deleteCard,
        likeCard,
        openPopupImage,
        searchMyProfileLike,
        profileId
    )
    .then(data => {
        cardsContainer.prepend(createCard(data, deleteCard, likeCard, openPopupImage, searchMyProfileLike, profileId))
    })
    .catch(err => console.log(err))
    .finally(() => renderLoading(popupAdd, false))

    formElementAdd.reset();

    clearValidation(popupAdd, validationConfig);

    closePopup(popupAdd)
})

function submitAvatarLink(evt) {
    evt.preventDefault();
    renderLoading(popupAvatar, true);

    const avatarValue = avatarInput.value;

    changeAvatarInServer(avatarValue)
    .then((data) => {
        avatarButton.style.backgroundImage = `url(${data.avatar})`
    })
    .catch(err => console.log(err))
    .finally(() => renderLoading(popupAvatar, false));

    closePopup(popupAvatar)
}

formElementAvatar.addEventListener('submit', submitAvatarLink);

function renderLoading(popup, isLoading) {
    const submitButton = popup.querySelector('.popup__button');
    if (isLoading) {
        submitButton.textContent = 'Сохранение...';
    } else {
        submitButton.textContent = 'Сохранить'
    }
}

















