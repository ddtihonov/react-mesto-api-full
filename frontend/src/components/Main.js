import Card from './Card.js';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Main (props) {
    const currentUser = useContext(CurrentUserContext);

    return (
    <main className="content">
        <section className="profile">
            <button className="profile__image-link" onClick={props.onEditAvatar}><img className="profile__avatar"  src={currentUser.avatar} alt="Аватар"/></button>
            <div className="profile__info">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button className="profile__changes-button link-aim" onClick={props.onEditProfile} type="button" aria-label="смена пользователя"></button>
                <p className="profile__profession">{currentUser.about}</p>
            </div>
            <button className="profile__add-button link-aim" onClick={props.onAddPlace} type="button" aria-label="добавить карточку" ></button>
        </section>
        <section className="table">
            <ul className="table__cells">
            {props.cards.map((card) => (
                <Card 
                data={card}
                key={card._id} 
                onCardLike={props.onCardLike} 
                onCardClick={props.onCardClick}
                onCardDelete={props.onCardDelete}
                />
        ))}
            </ul>
        </section>
    </main>
)
}