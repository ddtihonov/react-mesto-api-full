import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
    const avatarRef = useRef('');

    function handleSubmit(evt) {
        evt.preventDefault();
    
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }


    return (
        <PopupWithForm 
            name="avatar" 
            title="Обновить аватар" 
            buttonText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__label form__label_avatar">
                <input
                ref={avatarRef} 
                className="form__input form__input_place_avatar" 
                type="url" name="avatar" 
                id="avatar-input" 
                placeholder="Ссылка на фотографию" 
                required/>
                <span className="form__input-error avatar-input-error"></span>
            </label>
        </PopupWithForm>
    )

}