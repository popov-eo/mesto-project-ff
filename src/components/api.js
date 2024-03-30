const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-9',
    headers: {
        authorization: '184de017-a3ae-4aa3-8f19-c2b639eb78c3',
        'Content-Type': 'application/json'
    }
}

const profileId = '89188d4a989569994e21b11a';

const updateProfile = fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'GET',
    headers: {
        authorization: `${apiConfig.headers.authorization}`
    }
})
.then(res => {

    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
})

const updateCards = fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'GET',
    headers: {
        authorization: `${apiConfig.headers.authorization}`
    }
})
.then(res => {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
})

export { apiConfig, profileId, updateProfile, updateCards }


