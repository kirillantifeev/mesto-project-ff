import './pages/index.css'; 

import { openModal, closeModal, addElementCloseModal} from './components/modal.js';
import {createCard, onDeleteCard, onLikeCard} from './components/card.js';
import {enableValidation, clearValidation} from './components/validation_form.js'; 
import {initialCards} from './components/cards.js';
import {getInitialCards, getDataProfile, editDataProgile, addNewCard, editAvatar} from './components/api.js';
import { data } from 'autoprefixer';

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewAvatar = document.querySelector('.popup_pofile_edit_avatar');
const popupDeleteCard = document.querySelector('.popup_delete_card');

const editButtonElement = document.querySelector('.profile__edit-button');
const addButtonElement = document.querySelector('.profile__add-button');
const buttonEditAvatar = document.querySelector('.profile__image');

const formEditProfile = document.forms['edit-profile'];
const formNewPlace = document.forms['new-place'];
const formNewAvatar = document.forms['new-avatar'];

const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_description'); 

const urlNewAvatar = document.querySelector('.popup__input_type_url_avatar');

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const avatarUser = content.querySelector('.profile__image');

const nameInputNewCard = document.querySelector('.popup__input_type_card-name'); 
const urlInput = document.querySelector('.popup__input_type_url');

const popupImage = document.querySelector('.popup_type_image');
const picturePopupImage = popupImage.querySelector('.popup__image');
const signaturePopupImage = popupImage.querySelector('.popup__caption');

addElementCloseModal (popupTypeEdit);
addElementCloseModal (popupNewCard);
addElementCloseModal (popupImage);
addElementCloseModal (popupNewAvatar);
addElementCloseModal(popupDeleteCard); 


//-------------------------------------Функция выведения текста формы из информации профиля------------------------------------------------//

function fillFormTextEditProfile () {
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}


// --------------------------------- Попап редактирования информации ------------------------------//

editButtonElement.addEventListener('click', function() {
  openModal(popupTypeEdit);  

  fillFormTextEditProfile();

  clearValidation(popupTypeEdit, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  });
});



// --------------------------------- Попап добавления новой карточки ------------------------------//

addButtonElement.addEventListener('click', function() {
  openModal(popupNewCard);  
  //clearValidation(popupNewCard);
});

//-----------------------------------Попап смены аватара---------------------------------------------//
buttonEditAvatar.addEventListener('click', function() {
  openModal(popupNewAvatar);
})


// --------------------------------------Функция выведения текста из модального окна в шапку -------------------------------------//

export function submitPopupEditProfile(evt) {
  evt.preventDefault(); 
  loading (true, popupTypeEdit);

 const nameEditInput = nameInput.value;
 const jobEditInput = jobInput.value;

  const textInput = document.querySelector('.profile__title');
  const profileInput = document.querySelector('.profile__description');
  
  

  editDataProgile(nameEditInput, jobEditInput)
  .then ((res) => {
     textInput.textContent = res.name;
     profileInput.textContent = res.about;
  })
  .finally (() => {
    loading (false, popupTypeEdit);
  })

}


//-----------------------------------------Функция добавление нового аватара на сервер------------------------//
const submitPopupNewAvatar = (evt) => {
  evt.preventDefault(); 
  loading (true, popupNewAvatar);

const urlAvatar = urlNewAvatar.value;
editAvatar (urlAvatar)
.then((res)=> {
  avatarUser.style.backgroundImage = "url('" + res.avatar + "')";
})
.finally (() => {
  loading (false, popupNewAvatar);
})
    closeModal();
}




//---------------------------------Функция улучшения UI --------------------------------------------//

function loading (loading, popup) {
  const buttonPopup = popup.querySelector('.popup__button'); 
  if (loading) {
    buttonPopup.textContent = 'Сохранение...'
  }
  else {
    buttonPopup.textContent = 'Сохранить'
  } 
}


//----------------------------------Функция открытия попапа с картинкой ------------------------------//

function openImagePopup(data) {
  
  picturePopupImage.src = data.link;
  picturePopupImage.alt = data.name;
  signaturePopupImage.textContent = data.name;

  openModal(popupImage);  
};


formEditProfile.addEventListener('submit', submitPopupEditProfile); 



formNewAvatar.addEventListener('submit', submitPopupNewAvatar);


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}); 

const editDataUser = (name, description, avatar) => {
  const nameUser = content.querySelector('.profile__title');
  const descriptionUser = content.querySelector('.profile__description');
  

  nameUser.textContent = name;
  descriptionUser.textContent = description;
  avatarUser.style.backgroundImage = "url('" + avatar + "')";
}


Promise.all([getDataProfile(), getInitialCards()])
.then(([dataUser, cards]) => {

  function renderInitialCards() {
  cards.forEach(function (cardData) {
      placesList.append(createCard(cardData, onDeleteCard, onLikeCard, openImagePopup, dataUser._id))
  });
  } 

  renderInitialCards();

  editDataUser(dataUser.name, dataUser.about, dataUser.avatar);


// --------------------------------- Функция добавления новой карточки ------------------------------//


function addCardPopups (evt) {
  evt.preventDefault(); 
  loading (true, popupNewCard);

  const newNameInput = nameInputNewCard.value;
  const newUrlInput = urlInput.value;

    nameInputNewCard.value = '';
    urlInput.value  = '';
    addNewCard(newNameInput, newUrlInput, placesList)
    .then((res) => {
      //console.log(res);
      placesList.prepend(createCard(res, onDeleteCard, onLikeCard, openImagePopup, dataUser._id))
    })
    .finally (() => {
      loading (false, popupNewCard);
    })
    clearValidation(popupNewCard, {
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'form__submit_inactive',
      inputErrorClass: 'form__input_type_error',
      errorClass: 'form__input-error_active'
    });
    closeModal();
}

formNewPlace.addEventListener('submit', addCardPopups); 
})
.catch(err => {
  console.log(err);
})

