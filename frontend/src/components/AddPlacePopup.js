import React from 'react';
import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');

    function handleAddPlaceSubmit(evt) {
        evt.preventDefault();
    
        props.onAddCard({
            name: title,
            link: link,
        });
        setTitle('');
        setLink('');
    }

    function handleAddTitle(evt) {
        setTitle(evt.target.value);
    }
    
    function handleAddLink(evt) {
        setLink(evt.target.value);
    }

    return (
        <PopupWithForm 
            name="card" 
            title="Новое место" 
            buttonText="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleAddPlaceSubmit}
        >
            <label className="form__label">
                    <input 
                    className="form__input form__input_place_name" 
                    type="text" 
                    name="title" 
                    id="title-input" 
                    placeholder="Название" 
                    minLength="2" 
                    maxLength="30" required 
                    value={title}
                    onChange={handleAddTitle}/>
                    <span className="form__input-error title-input-error"></span>
                </label>
                <label className="form__label">
                    <input className="form__input form__input_place_image" 
                    type="url" 
                    name="image" 
                    id="image-input" 
                    placeholder="Ссылка на картинку" required
                    value={link}
                    onChange={handleAddLink}/>
                    <span className="form__input-error image-input-error"></span>
                </label>
        </PopupWithForm>
    )
}