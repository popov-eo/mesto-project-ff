function showInputError(
    formElement,
    inputElement,
    errorMessage,
    inputErrorClass,
    errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}

function hideInputError(
    formElement,
    inputElement,
    inputErrorClass,
    errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

function makeButtonStateInactive(buttonElement, inactiveButtonClass) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
}

function makeButtonStateActive(buttonElement, inactiveButtonClass) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
}

function setEventListeners(
    formElement,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    makeButtonStateInactive(buttonElement, inactiveButtonClass);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {

            if (inputElement.validity.patternMismatch) {
                inputElement.setCustomValidity(inputElement.dataset.errorMessage)
            } else {
                inputElement.setCustomValidity('');
            }

            if (!inputElement.validity.valid) {
                showInputError(
                    formElement,
                    inputElement,
                    inputElement.validationMessage,
                    inputErrorClass,
                    errorClass
                )
            } else {
                hideInputError(
                    formElement,
                    inputElement,
                    inputErrorClass,
                    errorClass
                )
            }

            if (hasInvalidInput(inputList)) {
                makeButtonStateInactive(buttonElement, inactiveButtonClass)
            }
             else {
                makeButtonStateActive(buttonElement, inactiveButtonClass)
            }
        })
    })
}

function enableValidation(config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector));

    forms.forEach((formElement) => {
        setEventListeners(
            formElement,
            config.inputSelector,
            config.submitButtonSelector,
            config.inactiveButtonClass,
            config.inputErrorClass,
            config.errorClass
        )
    })
}

function clearValidation(popup, config) {
    const form = popup.querySelector(config.formSelector);

    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const buttonElement = form.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(
            form,
            inputElement,
            config.inputSelector,
            config.inputErrorClass,
            config.errorClass
        )
    })

    makeButtonStateInactive(buttonElement, config.inactiveButtonClass);
}

export { enableValidation, clearValidation }