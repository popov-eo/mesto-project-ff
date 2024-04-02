const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-9',
    headers: {
        authorization: '184de017-a3ae-4aa3-8f19-c2b639eb78c3',
        'Content-Type': 'application/json'
    }
}

function handleResponse(res) {
        if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
}

const updateProfile = fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'GET',
    headers: {
        authorization: `${apiConfig.headers.authorization}`
    }
})
.then(res => handleResponse(res))

const updateCards = fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'GET',
    headers: {
        authorization: `${apiConfig.headers.authorization}`
    }
})
.then(res => handleResponse(res))

function editProfileInServer(name, job, title, description, renderLoadingCallback, popup) {
    fetch(`${apiConfig.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: `${apiConfig.headers.authorization}`,
            'Content-Type': `${apiConfig.headers['Content-Type']}`
        },
        body: JSON.stringify({
            name: name,
            about: job
        })
    })
    .then(res => handleResponse(res))
    .then(data => {
        title.textContent = data.name;
        description.textContent = data.about;
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => renderLoadingCallback(popup, false))
}

function addCardInServer(newCard, container, renderLoadingCallback, popup, createCardCallback, deleteCard, likeCard, openPopupImage, searchMyProfileLike) {
    fetch(`${apiConfig.baseUrl}/cards`, {
        method: 'POST',
        headers: {
            authorization: `${apiConfig.headers.authorization}`,
            'Content-Type': `${apiConfig.headers['Content-Type']}`
        },
        body: JSON.stringify({
            name: newCard.name,
            link: newCard.link
        })
    })
    .then(res => handleResponse(res))
    .then(data => {
        container.prepend(createCardCallback(data, deleteCard, likeCard, openPopupImage, searchMyProfileLike));
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {renderLoadingCallback(popup, false)})
}

function changeAvatarInServer(avatarUrl, button, renderLoadingCallback, popup) {
    fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: `${apiConfig.headers.authorization}`,
            'Content-Type': `${apiConfig.headers['Content-Type']}`
        },
        body: JSON.stringify({
            avatar: avatarUrl
        })
    })
    .then(res => handleResponse(res))
    .then((data) => {
        button.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {renderLoadingCallback(popup, false);})
}

function deleteCardInServer(cardInformation) {
    fetch(`${apiConfig.baseUrl}/cards/${cardInformation._id}`, {
        method: 'DELETE',
        headers: {
            authorization: `${apiConfig.headers.authorization}`
        }
    })
    .then(res => handleResponse(res))
    .catch((err) => {
        console.log(err);
    })
}

function deleteLikeInServer(cardData, cardElement) {
    fetch(`${apiConfig.baseUrl}/cards/likes/${cardData._id}`, {
        method: 'DELETE',
        headers: {
            authorization: `${apiConfig.headers.authorization}`,
            'Content-Type': `${apiConfig.headers['Content-Type']}`
        }
    })
    .then(res => handleResponse(res))
    .then((data) => {
        cardElement.querySelector('.card__like-count').textContent = data.likes.length;
    })
    .catch((err) => {
        console.log(err);
    })
}

function putLikeInServer(cardData, cardElement) {
    fetch(`${apiConfig.baseUrl}/cards/likes/${cardData._id}`, {
        method: 'PUT',
        headers: {
            authorization: `${apiConfig.headers.authorization}`,
            'Content-Type': `${apiConfig.headers['Content-Type']}`
        },
        body: JSON.stringify({
            likes: `${cardData.owner}`
        })
    })
    .then(res => handleResponse(res))
    .then((data) => {
        cardElement.querySelector('.card__like-count').textContent = data.likes.length;
    })
    .catch((err) => {
        console.log(err);
    })
}

export {
    apiConfig,
    updateProfile,
    updateCards,
    editProfileInServer,
    addCardInServer,
    changeAvatarInServer,
    deleteCardInServer,
    deleteLikeInServer,
    putLikeInServer
}


