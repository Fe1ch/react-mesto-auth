class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  // Функция проверить на ошибки
  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Упс... Произошла ошибка: ${res.status}`);
    }
    return res.json();
  }

  //Функция запроса данных с сервера
  getInitialsCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  //Функция добавления новой карточки на сервер
  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkResponse)
  }

  //Функция удаления карточки с сервера
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  //Функция получения данных пользователя с сервера
  getUserInfoProfile() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  //Функция передачи данных пользовтеля на сервер
  setUserInfoProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._checkResponse)
  }


  changeLike(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse)
  }


  //Функция передачи нового аватара на сервер
  setUserAvatarProfile(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._checkResponse)
  }
}


export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: 'f53ec09c-3e53-48d5-bf06-d899fc9c4246',
    'Content-Type': 'application/json'
  }
})