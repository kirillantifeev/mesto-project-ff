export function openModal (popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalEsc);
}

export function eddElementCloseModal (popup) {
    const closeButtonPopup = popup.querySelector('.popup__close');
    closeButtonPopup.addEventListener('click', closeModal);
 
    popup.addEventListener('mousedown', closeModalOverlay);
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

