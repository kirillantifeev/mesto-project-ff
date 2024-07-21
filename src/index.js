import './pages/index.css'; 

import { openModal, openImagePopup, closeModal, eddElementCloseModal, closeModalEsc, closeModalOverlay } from './components/modal.js';
import {createCard, renderInitialCards, onDeleteCard, onLikeCard} from './components/card.js';

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const editButtonElement = document.querySelector('.profile__edit-button');
const addButtonElement = document.querySelector('.profile__add-button');
const formEditProfile = document.forms['edit-profile'];
const formNewPlace = document.forms['new-place'];

const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_description'); 

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const nameInputNewCard = document.querySelector('.popup__input_type_card-name'); 
const urlInput = document.querySelector('.popup__input_type_url');



eddElementCloseModal (popupTypeEdit);
eddElementCloseModal (popupNewCard);
eddElementCloseModal (popupImage);

renderInitialCards();

//-------------------------------------Функция выведения текста плейсхолдера формы------------------------------------------------//

function FormTextPlaceholder () {
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}


// --------------------------------- Попап редактирования информации ------------------------------//

editButtonElement.addEventListener('click', function() {
  openModal(popupTypeEdit);  

  FormTextPlaceholder();

  
});

// --------------------------------- Попап добавления новой карточки ------------------------------//

addButtonElement.addEventListener('click', function() {
  openModal(popupNewCard);  
});


// --------------------------------------Функция выведения текста из модального окна в шапку -------------------------------------//

export function submitPopupEditProfile(evt) {
  evt.preventDefault(); 

 const nameEditInput = nameInput.value;
 const jobEditInput = jobInput.value;

  const textInput = document.querySelector('.profile__title');
  const profileInput = document.querySelector('.profile__description');
  
  textInput.textContent = nameEditInput;
  profileInput.textContent = jobEditInput;
}


function addCardPopups (evt) {
  evt.preventDefault(); 

  const newNameInput = nameInputNewCard.value;
  const newUrlInput = urlInput.value;

  const newCardData = {
  name: newNameInput,
  link: newUrlInput,
  };

    placesList.prepend(createCard(newCardData, onDeleteCard, onLikeCard, openImagePopup));

    nameInput.value = '';
    urlInput.value  = '';

    closeModal();
}



formEditProfile.addEventListener('submit', submitPopupEditProfile); 

formNewPlace.addEventListener('submit', addCardPopups); 


