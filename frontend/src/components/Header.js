import React, { useState} from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../images/Logo.svg';

export default function Header(props) {

    const [isDataOpen, setIsDataOpen] = useState(false);

    function openData () {
        setIsDataOpen(true)
    }

    function closeData () {
        setIsDataOpen(false)
    }

    return (
    <header className="header">
        <div className="header__size">
            <div className={`header__burger ${isDataOpen ? 'active' : ''}`}>
                <p className="header__text" >{props.email}</p>
                <Link
                    to="/signin"
                    className="header__link_mobile"
                    onClick={props.onOut}>
                    Выйти
                </Link>                
            </div>
        </div>
        <div className="header__container">
            <img src={logo} alt="Лого" className="header__logo"/>
            {props.loggedIn &&
            <> 
                <div className={`menu__icon ${isDataOpen ? 'close' : ''}`} onClick={openData}>
                    <span></span>
                </div>
                <div className="header__size_close-icon">
                    <button className={`header__close-icon ${isDataOpen ? 'active' : ''}`} type="button" aria-label="закрыть" onClick={closeData}></button>
                </div>
            </>
            }
            <div className="header__box">
                {props.loggedIn ? (
                    <>
                        <p className="header__text" >{props.email}</p>
                        <Link
                        to="/signin"
                        className="header__link"
                        onClick={props.onOut}
                        >
                        Выйти
                        </Link>
                    </>
                ) : ( 
                <>
                    {(props.currentRoute === '/signin') ? (
                    <Link
                        to="/signup"
                        className="header__link"
                    >
                        Регистрация
                    </Link>
                    ) : (
                    <Link
                        to="/signin"
                        className="header__link"
                    >
                        Войти
                    </Link>
                    )}
                </>
                )}
            </div>
        </div>
    </header>
)
}