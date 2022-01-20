import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card ({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner === currentUser._id;

    const cardDeleteButtonClassName = `cell__basket ${
        isOwn ? 'cell__basket_opened' : ''
    }`;

    const isLiked = card.likes.some((i) => i === currentUser._id);

    const cardLikeButtonClassName = `cell__heart ${
        isLiked ? 'cell__heart_black' : ''
    }`;

    function cardClick () {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="cell">
        <button className={cardDeleteButtonClassName} type="button" aria-label="корзина" onClick={handleDeleteClick}></button>
        <a className="cell__image-link"  href="#" onClick={cardClick}><img className="cell__image" src={card.link} alt={card.name}/></a>
        <div className="cell__info">
            <h2 className="cell__caption">{card.name}</h2>
            <div className="cell__like">
                <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="лайк"></button>
                <p className="cell__score-likes">{card.likes.length}</p>
            </div>
        </div>
    </li> 
    )
}