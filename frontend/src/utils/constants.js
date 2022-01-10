export const validationConfig = {
    formSelector: '.form',
    formInputSelector: '.form__input',
    formButtonSelector: '.form__button',
    formButtonDisabled: 'form__button_disabled',
    formInputTypeError: 'form__input_type_error',
    formInputErrorActive: 'form__input-error_active',
    formInputError: '.form__input-error'
}
// селекторы popup
export const popupProfile = '.popup-profile';
export const popupСhangeCell = '.popup-cells';
export const popupImage = '.popup-image';
export const popupCardDelete = '.popup-delete';
export const popupAvatar = '.popup-avatar';

// кнопки и ссылки открытия форм
export const userChangesButton = document.querySelector('.profile__changes-button');
export const cardChangesButton = document.querySelector('.profile__add-button');
export const avatarChangesLink = document.querySelector('.profile__image-link');

// формы и инпуты
export const formUser = document.forms.user;
export const formCard = document.forms.card;
export const formAvatar = document.forms.avatar;
export const formCardInputName = formCard.querySelector('.form__input_place_name');
export const formCardInputImage = formCard.querySelector('.form__input_place_image');
export const nameInput = formUser.elements.name;
export const aboutInput = formUser.elements.about;


export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__profession');
export const formCardButtonImage = formCard.querySelector('.form__button-image');
export const avatarImage = document.querySelector('.profile__avatar');