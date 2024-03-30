fetch('https://mesto.nomoreparties.co/v1/wff-cohort-9/cards', {
    method: 'GET',
    headers: {
        authorization: '184de017-a3ae-4aa3-8f19-c2b639eb78c3'
    }
    .then(res => {
        console.log(res);
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(usersLikes => {
        myProfileLike = usersLikes.some((myProfileId) => {
            return myProfileId === '89188d4a989569994e21b11a';
        })
        if (myProfileLike) {
            cardElement.classList.add('card__like-button_is-active');
        }
    })
})
