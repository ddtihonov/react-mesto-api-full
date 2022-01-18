import React from 'react';
import { useEffect, useState } from 'react';


export default function Login ({setCurrentRoute,  onLogin}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = (evt) => {
        setEmail(evt.target.value);
    }

    const handleChangePassword = (evt) => {
        setPassword(evt.target.value);
    }

        function handleSubmit(evt) {
            evt.preventDefault();
        
            onLogin({ password, email });
        }

    useEffect(() => {
        setCurrentRoute('/signin');
    }, []);

    
        return(
        <div className="login">
            <h2 className="login__title">Вход</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <label className="login__label">
                    <input className="login__input"
                    type="email" 
                    name="email" 
                    id="email-input" placeholder="Email" 
                    minLength="6" maxLength="20" 
                    required
                    value={email}
                    onChange={handleChangeEmail}
                    />
                    <span className="login__input-error email-input-error form__input-error"></span>
                </label>
                <label className="login__label">
                    <input className="login__input"
                    type="password" 
                    name="password" 
                    id="password-input" 
                    placeholder="Пароль"  
                    minLength="6" 
                    maxLength="20" required
                    value={password}
                    onChange={handleChangePassword}
                    />
                    <span className="login__input-error password-input-error form__input-error"></span>
                </label>
                <button className="login__button" type="submit">Войти</button>
            </form>
        </div>
    )
}
