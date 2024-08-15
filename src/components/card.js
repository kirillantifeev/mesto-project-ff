import {deleteCard, likeCard, disLikeCard} from './api.js';
import { openModal, closeModal, addElementCloseModal} from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const popupDeleteCard = document.querySelector('.popup_delete_card');
const buttonDeleteCard = popupDeleteCard.querySelector('.popup__button');




//--------------Функция создания карточки--------------//

export const createCard = (cardData, onDeleteCard, onLikeCard, openImagePopup, idUser) => {  

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__like_numbers').textContent = cardData.likes.length;
  
  const likeElement = cardElement.querySelector('.card__like-button');
  cardLikeOrDislike (likeElement, cardData, idUser);

  const cardImg = cardElement.querySelector('.card__image');
  cardImg.addEventListener('click', () => {
    openImagePopup(cardData);
  });

    const idCard = cardData._id;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (cardData.owner._id !== idUser ) {
    deleteButton.remove();
    }
    else {
    deleteButton.addEventListener('click', () => 
    openPopupDeleteCard (popupDeleteCard,cardElement, idCard)
    );
    } 

  likeElement.addEventListener('click', () => onLikeCard(likeElement, cardData, cardData.likes, idUser, cardData._id, cardElement));

  return cardElement;
  }



  function openPopupDeleteCard (popupDeleteCard,cardElement, idCard) {

    openModal(popupDeleteCard);  
    
    buttonDeleteCard.onclick = function () {
      deleteOnCard (cardElement, idCard, popupDeleteCard)
    }

  }
  


  function deleteOnCard (cardElement, idCard, popupDeleteCard) {
    onDeleteCard(cardElement, idCard);
      closeModal(popupDeleteCard);
  }



  //-------------- Функция удаления карточки-----------//

  export function onDeleteCard(card, idCard) {
  deleteCard(idCard)
  .then (() => {
    card.remove()
  })
  .catch((err) => {
    console.log(err => console.log(err));
  });
  }


  
 //-------------- Функция лайка-----------//
 
export function onLikeCard (like, cardData, cardLikes, idUser, idCard, cardElement) {
    const likeMethod = cardLikes.some(el => el._id === idUser) ? disLikeCard : likeCard
    likeMethod(idCard)
    .then((result) => { 
      cardData.likes = result.likes; 
      cardElement.querySelector('.card__like_numbers').textContent = result.likes.length;
      like.classList.toggle('card__like-button_is-active');
    })
    .catch(err => console.log(err));
  }




function cardLikeOrDislike (like, cardLikes, idUser) { 
if (cardLikes.likes.some(el => el._id === idUser)) {
  like.classList.add('card__like-button_is-active');
}
else {
  like.classList.remove('card__like-button_is-active');
}
}


