function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
}

function checkInputValid(formElement, inputElement, inputErrorClass, errorClass) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    }
}

function checkInputInvalid(formElement, inputElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity('');
    }

    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

function ButtonStateActive(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass);
    }
}

function ButtonStateInactive(inputList, buttonElement, inactiveButtonClass) {
    if (!hasInvalidInput(inputList)) {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    }
}

function setEventListenersActive(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    ButtonStateActive(inputList, buttonElement, inactiveButtonClass);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValid(formElement, inputElement, inputErrorClass, errorClass);

            ButtonStateActive(inputList, buttonElement, inactiveButtonClass);
        })
    })
}

function setEventListenersInactive(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    ButtonStateInactive(inputList, buttonElement, inactiveButtonClass);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputInvalid(formElement, inputElement, inputErrorClass, errorClass);

            ButtonStateInactive(inputList, buttonElement, inactiveButtonClass);
        })
    })
}

function enableValidation(validationConfig) {
    const popupActive = document.querySelector('.popup_is-opened');
    const form = popupActive.querySelector(validationConfig.formSelector);

    setEventListenersActive(form, validationConfig.inputSelector, validationConfig.submitButtonSelector, validationConfig.inactiveButtonClass, validationConfig.inputErrorClass, validationConfig.errorClass);
}

function clearValidation(popupForm, validationConfig) {
    setEventListenersInactive(popupForm, validationConfig.inputSelector, validationConfig.submitButtonSelector, validationConfig.inactiveButtonClass, validationConfig.inputErrorClass, validationConfig.errorClass);
}

export { enableValidation, clearValidation }