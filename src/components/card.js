const cardTemplate = document.querySelector('#card-template').content;


//--------------Функция создания карточки--------------//

export const createCard = (cardData, onDeleteCard, onLikeCard, openImagePopup) => {  

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  
  const cardImg = cardElement.querySelector('.card__image');
  cardImg.addEventListener('click', () => {
    openImagePopup(cardData);
  });

  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => onDeleteCard(cardElement));


  const likeElement = cardElement.querySelector('.card__like-button');
  likeElement.addEventListener('click', () => onLikeCard(likeElement));

  return cardElement;
  }



  //-------------- Функция удаления карточки-----------//

  export function onDeleteCard(card) {
  card.remove();
  }


 //-------------- Функция лайка-----------//

export function onLikeCard (like) {
  like.classList.toggle('card__like-button_is-active');
}
