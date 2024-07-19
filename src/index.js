import './pages/index.css'; 

import { openModal, closeModal, closeModalEsc, closeModalOverlay, handleFormSubmit, FormTextPlaceholder, animationPopup } from './components/modal.js';
import {renderCards, addCardPopup} from './components/card.js';

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const editButtonElement = document.querySelector('.profile__edit-button');
const addButtonElement = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.popup__form');
const form2Element = document.forms[1];

renderCards();
animationPopup();

// --------------------------------- Попап редактирования информации ------------------------------//

editButtonElement.addEventListener('click', function() {
  openModal(popupTypeEdit);  
  
  const closeButtonPopup = popupTypeEdit.querySelector('.popup__close');
  closeButtonPopup.addEventListener('click', closeModal);

  document.addEventListener('keydown', closeModalEsc);
  popupTypeEdit.addEventListener('mousedown', closeModalOverlay);
});

// --------------------------------- Попап добавления новой карточки ------------------------------//

addButtonElement.addEventListener('click', function() {
  openModal(popupNewCard);  

  const closeButtonPopup = popupNewCard.querySelector('.popup__close');
  closeButtonPopup.addEventListener('click', closeModal);

  document.addEventListener('keydown', closeModalEsc);
  popupNewCard.addEventListener('mousedown', closeModalOverlay);
});


FormTextPlaceholder();

formElement.addEventListener('submit', handleFormSubmit); 

form2Element.addEventListener('submit', addCardPopup); 


