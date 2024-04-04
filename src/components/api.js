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

async function editProfileInServer(name, job) {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
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
}

async function addCardInServer(newCard) {
    return fetch(`${apiConfig.baseUrl}/cards`, {
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
}

async function changeAvatarInServer(avatarUrl) {
    return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
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
}

async function deleteCardInServer(cardInformation) {
    return fetch(`${apiConfig.baseUrl}/cards/${cardInformation._id}`, {
        method: 'DELETE',
        headers: {
            authorization: `${apiConfig.headers.authorization}`
        }
    })
    .then(res => handleResponse(res))
}

async function deleteLikeInServer(cardData, cardElement) {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardData._id}`, {
        method: 'DELETE',
        headers: {
            authorization: `${apiConfig.headers.authorization}`,
            'Content-Type': `${apiConfig.headers['Content-Type']}`
        }
    })
    .then(res => handleResponse(res))
}

async function putLikeInServer(cardData) {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardData._id}`, {
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


