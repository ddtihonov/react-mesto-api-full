class Api {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    };

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            credentials: 'include',
            headers: this.headers
        })
            .then(this._checkError);
    }

    setUserInfo(data) {
        return fetch(`${this.baseUrl}/users/me`, {
            credentials: 'include',
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._checkError);
    }

    addAvatar(data) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            credentials: 'include',
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._checkError);
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            credentials: 'include',
            headers: this.headers
        })
            .then(this._checkError);
    }
    
    addCard(element) {
        return fetch(`${this.baseUrl}/cards`, {
            credentials: 'include',
            method: 'POST', 
            headers: this.headers,
            body: JSON.stringify({
                name: element.name,
                link: element.link
            })
        })
            .then(this._checkError);
    }

    deleteCard(id) {
        return fetch(`${this.baseUrl}/cards/${id}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: this.headers
        })
            .then(this._checkError);
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this.baseUrl}/cards/${id}/likes`, {
            credentials: 'include',
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this.headers,
        })
            .then(this._checkError);
    }

    _checkError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

const api = new Api({
    baseUrl: 'https://api.ddtihonov.students.nomoredomains.rocks',
    headers: {'Content-Type': 'application/json'}
});

export default api 