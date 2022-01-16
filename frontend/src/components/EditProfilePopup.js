import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleNameChange(evt) {
        setName(evt.target.value);
    }
    
    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
    
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name="user" 
            title="Редактировать профиль" 
            buttonText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <label className="form__label">
                    <input className="form__input form__input_user_name"
                    onChange={handleNameChange}
                    value={name || ''} 
                    type="text" name="name" 
                    id="name-input" placeholder="Имя" 
                    minLength="2" maxLength="40" 
                    required/>
                    <span className="form__input-error name-input-error"></span>
                </label>
                <label className="form__label">
                    <input className="form__input form__input_user_job"
                    onChange={handleDescriptionChange}
                    value={description || ''} 
                    type="text" 
                    name="about" 
                    id="about-input" 
                    placeholder="Род деятельности"  
                    minLength="2" 
                    maxLength="200" required/>
                    <span className="form__input-error about-input-error"></span>
                </label>
        </PopupWithForm>
    )
}