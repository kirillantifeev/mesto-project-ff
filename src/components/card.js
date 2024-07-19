import {closeModal, openModal, closeModalEsc, closeModalOverlay} from './modal.js';

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const cardTemplate = document.querySelector('#card-template').content;
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');


//----------------------------------Функция создания карточек из массива ------------------------------//

function addCard(cardData, removeCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', removeCard);

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeButtonActive);

    const cardImg = cardElement.querySelector('.card__image');
    cardImg.addEventListener('click', function () {
      cardOpenModal (cardElement)
    })

    return cardElement;
}



// Функция удаления карточки
function removeCard (event) {
const card = event.target.closest('.card');
card.remove();
}



// Вывести карточки на страницу

export function renderCards() {
    initialCards.forEach(function (cardData) {
        placesList.append(addCard(cardData, removeCard))
    });
}


//----------------------------------Функция создания карточек из попапа ------------------------------//

export function addCardPopup (evt) {
    evt.preventDefault(); 
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    
    const nameInput = document.querySelector('.popup__input_type_card-name'); 
    const urlInput = document.querySelector('.popup__input_type_url');

    const newNameInput = nameInput.value;
    const newUrlInput = urlInput.value;


    cardElement.querySelector('.card__title').textContent = newNameInput;
    cardElement.querySelector('.card__image').src = newUrlInput;
    cardElement.querySelector('.card__image').alt = newNameInput;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', removeCard,);
    placesList.prepend(cardElement);

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeButtonActive);

    const cardImg = cardElement.querySelector('.card__image');
    cardImg.addEventListener('click', function () {
      cardOpenModal (cardElement)
    })

    nameInput.value = '';
    urlInput.value  = '';

    closeModal();
}

//----------------------------------Функция лайка ------------------------------//

function likeButtonActive (evt) {
      evt.target.classList.toggle('card__like-button_is-active');
}


//----------------------------------Функция открытия попапа с картинкой ------------------------------//

function cardOpenModal (imageLink) {
  const popupImage = document.querySelector('.popup_type_image');
  openModal(popupImage);  

  popupImage.querySelector('.popup__image').src = imageLink.querySelector('.card__image').src;
  popupImage.querySelector('.popup__image').alt = imageLink.querySelector('.card__image').alt;
  popupImage.querySelector('.popup__caption').textContent = imageLink.querySelector('.card__image').alt;

const closeButtonPopup = popupImage.querySelector('.popup__close');
closeButtonPopup.addEventListener('click', closeModal);

document.addEventListener('keydown', closeModalEsc);
popupImage.addEventListener('mousedown', closeModalOverlay);
};