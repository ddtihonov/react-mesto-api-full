import React from 'react';

export default function ImagePopup (card) {

    return (  
    <div className={`popup popup-image ${card.isOpen ? 'popup_opened' : ''}`} onClick={card.onClose}>
        <div className="popup__container">
            <button className="popup__close-icon link-aim" type="button" aria-label="закрыть" onClick={card.onClose}></button>
            <figure className="popup__image-framing">
            <img className = "popup__image" alt={card.data.name} src={card.data.link} />
            <figcaption className="popup__image-label">{card.data.name}</figcaption>
            </figure>
        </div> 
    </div>
)
}