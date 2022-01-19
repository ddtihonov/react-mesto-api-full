import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Register ({setCurrentRoute, onRegister }) {

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
    
        onRegister({ password, email });
    }
    

    useEffect(() => {
        setCurrentRoute('/signup');
    }, []);

        return(
        <div className="register">
            <h2 className="register__title">Регистрация</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <label className="register__label">
                    <input className="register__input"
                    type="email" 
                    name="email"
                    value={email}
                    onChange={handleChangeEmail} 
                    id="email-input" placeholder="Email" 
                    minLength="6" maxLength="20" 
                    required/>
                    <span className="register__input-error email-input-error form__input-error"></span>
                </label>
                <label className="register__label">
                    <input className="register__input"
                    type="password" 
                    name="password"
                    value={password}
                    onChange={handleChangePassword} 
                    id="password-input" 
                    placeholder="Пароль"  
                    minLength="6" 
                    maxLength="20" required/>
                    <span className="register__input-error password-input-error form__input-error"></span>
                </label>
                <button className="register__button" type="submit">Зарегистрироваться</button>
            </form>
            <div className="register__box">
            <p className="register__text" >Уже зарегистрированы?</p>
            <Link className="register__link" to="/signin">Войти</Link>
            </div>
        </div>
    )
}
