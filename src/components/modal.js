import { popups } from '../components/classVariables.js';

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape') {
        closePopup(openedPopup);
    }
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

export { openPopup, closePopup }