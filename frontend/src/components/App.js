import React, { useState,  useEffect  } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header  from "./Header.js";
import Footer from "./Footer.js";
import Main from './Main.js';
import api  from '../utils/Api.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';
import auth from '../utils/Auth.js';

import ImagePopup  from './ImagePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js';


export default function App() {

    const navigate = useNavigate();

    //стейты popups
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
    const [isInfoTooltip, setIsInfoTooltip] = useState(false);

    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    
    const [currentEmail, setCurrentEmail] = useState('');
    const [successRegister, setSuccessRegister] = useState(false);

    // стейт маршрутов
    const [currentRoute, setCurrentRoute] = useState('');

    //стейт логина
    const [loggedIn, setLoggedIn] = useState(false);

    // запрос  данных пользователя
    useEffect(() => {
        api.getUserInfo()
            .then((userInfo) => {
                setCurrentUser(userInfo);
            })
            .catch((err) => {
                console.log(`Внимание! ${err}`);
            });
    }, []);

    //запроса массива данных карточек
    useEffect(() => {
        api.getInitialCards()
            .then((cardsInfo) => {
                setCards(cardsInfo);
            })
            .catch((err) => {
                console.log(`Внимание! ${err}`);
            });
    }, []);
    
    // обработчики открытя всех popup
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleDeleteCardClick = () => {
        setIsDeleteCardPopupOpen(true);
    }

    const handleRegisterClick = () => {
        setIsInfoTooltip(true);
    }

    const handleCardClick = (data) => {
        setImagePopupOpen(true);
        setSelectedCard(data);
    }

    // закрытие всех popup
    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setImagePopupOpen(false);
        setIsDeleteCardPopupOpen(false);
        setIsInfoTooltip(false);
    }

    //выход
    function handleOutput() {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            navigate('/signin');
            setLoggedIn(false);
        }
    }

    //управление лайками
    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
    
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) =>
                state.map((c) => (c._id === card._id ? newCard : c))
            );
        })
            .catch((err) => {
                console.log(`Внимание! ${err}`);
            });
    }

    //удаление карты
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
            setCards((state) => 
            state.filter((c) => c._id !== card._id));
            })
            .catch((err) => {
            console.log(`Внимание! ${err}`);
            });
    }

    //смена данных пользователя
    function handleUpdateUser(data) {
        api.setUserInfo(data)
            .then((userInfo) => {
                setCurrentUser(userInfo);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Внимание! ${err}`);
            });
    }

    //смена аватара
    function handleUpdateAvatar(data) {
        api.addAvatar(data)
            .then((userAvatar) => {
            setCurrentUser(userAvatar);
            closeAllPopups();
            })
            .catch((err) => {
                console.log(`Внимание! ${err}`);
            });
    }
    
    //добавление новой карты
    function handleAddCard(element) {
        api.addCard(element)
                .then((newCard) => {
                    setCards([newCard, ...cards]);
                    closeAllPopups();
                })
                .catch((err) => {
                    console.log(`Внимание! ${err}`);
                });
    }
    // обработчики закрытия
    function handleClosePopup(evt) {
        if (
            evt.target.classList.contains('popup')
            || evt.target.classList.contains('popup__close-icon')
        ) {
            closeAllPopups();
        }
    }

    useEffect(() => {
        function handleEscClose(evt) {
            if (evt.keyCode === 27) closeAllPopups();
        }
    
        document.addEventListener('keydown', handleEscClose);
    
        return () => document.removeEventListener('keydown', handleEscClose);
    }, []);

    // регистрация
    function handleRegister({ registerData, setRegisterData }) {
        auth.register(registerData)
            .then(() => {
                setSuccessRegister(true);
                setIsInfoTooltip(true);
                navigate('/signin');
    
            setRegisterData({
                email: '',
                password: '',
            });
        })
            .catch((err) => {
                setSuccessRegister(false);
                setIsInfoTooltip(true);
    
            
            
                console.log(`Внимание! ${err}`);
            });
    }

    // авторизация
    function handleAuthorize({ loginData, setLoginData }) {
        auth.authorize(loginData)
            .then((data) => {
                if (data.token) {
                    setLoggedIn(true)
                    navigate('/')
                    localStorage.setItem('token', data.token);
    
                    setLoginData({
                        email: '',
                        password: '',
                    });
                }
            })
            
            .catch((err) => {
                console.log(`Внимание! ${err}`);
            });
    }

    useEffect(() => {
        function handleTokenCheck() {
            if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            auth.checkToken(token)
                .then((data) => {
                    if (data) {
                        setCurrentEmail(data.data.email);
                        setLoggedIn(true);
                        navigate('/');
                    }
                })
                .catch((err) => {
                    console.log(`Внимание! ${err}`);
                });
        }
    }

    handleTokenCheck();
}, []);




return (
<div className="page">
    <CurrentUserContext.Provider value={currentUser}>
        <Header 
            currentRoute={currentRoute}
            loggedIn={loggedIn}
            email={currentEmail}
            onOut={handleOutput}
        />
        <Routes>
            <Route exact path='/'  element={
                <ProtectedRoute loggedIn={loggedIn}>
                    <Main
                        onEditAvatar={handleEditAvatarClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditProfile={handleEditProfileClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                </ProtectedRoute>    
                }
            />
            <Route exact path="/signup" element={
                <Register
                    setCurrentRoute={setCurrentRoute}
                    onRegister={handleRegister}
                    onInfoTooltip={handleRegisterClick}
                    successRegister={successRegister}
                />
            } /> 
            <Route exact path="/signin" element={
                <Login 
                    setCurrentRoute={setCurrentRoute}
                    onLogin={handleAuthorize}
                    navigate={navigate}
                    loggedIn={loggedIn}

                />
            } />
        </Routes>
        {loggedIn && <Footer />}       
        <ImagePopup 
            data={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={handleClosePopup}
        />
        <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen}
            onClose={handleClosePopup}
            onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={handleClosePopup} 
            onUpdateUser={handleUpdateUser}
            />
        <AddPlacePopup 
            isOpen={isAddPlacePopupOpen} 
            onClose={handleClosePopup} 
            onAddCard={handleAddCard}
            />     
        <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen} 
            onClose={handleClosePopup} 
        />
        <InfoTooltip
            name="registration"
            isOpen={isInfoTooltip} 
            onClose={handleClosePopup}
            registrationСompleted={successRegister} 
        />
    </CurrentUserContext.Provider>
</div>
);
}
    