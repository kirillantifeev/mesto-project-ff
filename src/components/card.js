import {closeModal, openImagePopup, closeModalEsc, closeModalOverlay} from './modal.js';
import {initialCards} from './cards.js';


const cardTemplate = document.querySelector('#card-template').content;
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');



export const createCard = (cardData, onDeleteCard, onLikeCard, openImagePopup) => {  

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  
  const cardImg = cardElement.querySelector('.card__image');
  cardImg.addEventListener('click', () => {
    openImagePopup(cardElement);
  });

  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => onDeleteCard(cardElement));


  const likeButton = cardElement.querySelector('.card__like-button');
  const likeElement = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => onLikeCard(likeElement));

  return cardElement;
  }



  // Функция удаления карточки
  export function onDeleteCard(card) {
  card.remove();
  }

  export function renderInitialCards() {
    initialCards.forEach(function (cardData) {
        placesList.append(createCard(cardData, onDeleteCard, onLikeCard, openImagePopup))
    });
}

export function onLikeCard (like) {
  like.classList.toggle('card__like-button_is-active');
}
