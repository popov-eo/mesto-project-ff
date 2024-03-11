import {
    popupEdit,
    popupAdd,
    popupImage,
    editButton,
    addButton,
    closeButtonEdit,
    closeButtonImg,
    nameInput,
    jobInput
} from '../components/variables.js';

function openPopup(openButton) {
    if (openButton === editButton) {
        popupEdit.classList.add('popup_is-opened');
    } else if (openButton === addButton) {
        popupAdd.classList.add('popup_is-opened');
    }
};

function closePopup(closeButton) {
    const parent = closeButton.parentElement.parentElement;
    parent.classList.remove('popup_is-opened');
};

// form EditUser

nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;

function handleFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

    closePopup(closeButtonEdit);
}

// form openImage

function popupImageOpen(imgElement, data, altText) {
    imgElement.addEventListener('click', () => {
        popupImage.classList.add('popup_is-opened');
        popupImage.querySelector('.popup__image').src = data;
        popupImage.querySelector('.popup__caption').textContent = altText;
        closeButtonImg.addEventListener('click', () => {
            popupImage.classList.remove('popup_is-opened');
        })
        document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
                popupImage.classList.remove('popup_is-opened');
            }
        })
    })
}

export { handleFormSubmit, openPopup, closePopup, popupImageOpen }