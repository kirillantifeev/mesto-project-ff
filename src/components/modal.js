export function openModal (popup) {
    popup.classList.add('popup_is-opened');

}

export function closeModal () {
    const modalElement = document.querySelector('.popup_is-opened');
    modalElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEsc);  
}

export function closeModalEsc (evt) {
    if (evt.key === "Escape") {
        closeModal();
    }
}

export function closeModalOverlay (evt) {
    if (evt.target === evt.currentTarget) {
        closeModal();
    }
}

export function animationOpen (popup) {
    popup.classList.add('popup_is-animated');
}


export function animationClose (popup) {
    popup.classList.remove('popup_is-animated');
}


// --------------------------------------Функция выведения текста из модального окна в шапку -------------------------------------//

export function handleFormSubmit(evt) {
    evt.preventDefault(); 

    const nameInput = document.querySelector('.popup__input_type_name'); 
    const jobInput = document.querySelector('.popup__input_type_description'); 
   
   const nameEditInput = nameInput.value;
   const jobEditInput = jobInput.value;

    const textInput = document.querySelector('.profile__title');
    const profileInput = document.querySelector('.profile__description');
    
    textInput.textContent = nameEditInput;
    profileInput.textContent = jobEditInput;
}

//-------------------------------------Функция выведения текста плейсхолдера формы------------------------------------------------//

export function FormTextPlaceholder () {
    const textInput = document.querySelector('.profile__title');
    const profileInput = document.querySelector('.profile__description');
    const nameInput = document.querySelector('.popup__input_type_name'); 
    const jobInput = document.querySelector('.popup__input_type_description'); 
    nameInput.placeholder = textInput.textContent;
    jobInput.placeholder = profileInput.textContent;
}

//------------------------------Функция добавления класса анимаций попапа----------------------------//

export function animationPopup () {
    const popupTypeEdit = document.querySelector('.popup_type_edit');
    const popupNewCard = document.querySelector('.popup_type_new-card');
    const popupTypeImage = document.querySelector('.popup_type_image');
    popupTypeEdit.classList.add('popup_is-animated');
    popupNewCard.classList.add('popup_is-animated');
    popupTypeImage.classList.add('popup_is-animated');
}

