import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card (props) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = props.data.owner._id === currentUser._id;

    const cardDeleteButtonClassName = `cell__basket ${
        isOwn ? 'cell__basket_opened' : ''
    }`;

    const isLiked = props.data.likes.some((i) => i._id === currentUser._id);

    const cardLikeButtonClassName = `cell__heart ${
        isLiked ? 'cell__heart_black' : ''
    }`;

    function cardClick () {
        props.onCardClick(props.data);
    }

    function handleLikeClick() {
        props.onCardLike(props.data);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.data);
    }

    return (
        <li className="cell">
        <button className={cardDeleteButtonClassName} type="button" aria-label="корзина" onClick={handleDeleteClick}></button>
        <a className="cell__image-link"  href="#" onClick={cardClick}><img className="cell__image" src={props.data.link} alt={props.data.name}/></a>
        <div className="cell__info">
            <h2 className="cell__caption">{props.data.name}</h2>
            <div className="cell__like">
                <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="лайк"></button>
                <p className="cell__score-likes">{props.data.likes.length}</p>
            </div>
        </div>
    </li> 
    )
}