class Auth {
    constructor({baseAuthUrl, headers }) {
        this.baseAuthUrl = baseAuthUrl;
        this.headers = headers
    };

    register({ password, email }) {
        return fetch(`${this.baseAuthUrl}/signup`, {
            credentials: 'include',
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                password: password,
                email: email
            }),
        })
        .then(this._checkError);
    }

    authorize({ password, email }) {
        return fetch(`${this.baseAuthUrl}/signin`, {
            credentials: 'include',
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                password: password,
                email: email
            }),
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

const auth = new Auth({
    baseAuthUrl: 'https://api.ddtihonov.students.nomoredomains.rocks',
    headers: {'Content-Type': 'application/json'}
});

export default auth 