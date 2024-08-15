const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-19',
    headers: {
      authorization: 'c041982f-0c43-43cc-ac40-f1be674c5c5b',
      //'Content-Type': 'application/json'
    }
  }
  
  export const editAvatar = (newAvatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: newAvatar
        })
        })
        .then(responseProcessing)
  }



export const deleteCard = (idCard) => {
     return fetch(`${config.baseUrl}/cards/${idCard}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization
        }     
})
.then(responseProcessing)
}


export const likeCard = (idCard) => {
    return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
        method: 'PUT',
        headers: {
            authorization: config.headers.authorization
        }
})
.then(responseProcessing)
}

export const disLikeCard = (idCard) => {
    return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization
        }
})
.then(responseProcessing)
}

export const numbersLike = () => {
    fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
        //method: 'DELETE',
        headers: {
            authorization: config.headers.authorization
        }
    })
    .then(responseProcessing)
}




    export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
    headers: {
        authorization: config.headers.authorization
    }
    })
    .then(responseProcessing)
    };

    export const getDataProfile = () => {
        return fetch(`${config.baseUrl}/users/me`, {
            headers: {
                authorization: config.headers.authorization
            }
            })
            .then(responseProcessing)
    }


    const responseProcessing = res => {
    if (res.ok) {
    return res.json();
    }
    else {
    return Promise.reject(`Ошибка: ${res.status}`);
    }
    }


    export const editDataProgile = (name, about) => {
        return fetch(`${config.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: config.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })   
        .then(responseProcessing)
    }

    export const addNewCard = (name, link) => {
        return fetch(`${config.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: config.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
              })
        })
        .then(responseProcessing)
    }

