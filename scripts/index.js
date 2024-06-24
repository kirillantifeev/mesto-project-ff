// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(cardData, removeCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', removeCard);
    return cardElement;
}

// @todo: Функция удаления карточки
function removeCard (event) {
const card = event.target.closest('.card');
card.remove();
}

// @todo: Вывести карточки на страницу

function renderCards() {
    initialCards.forEach(function (cardData) {
        placesList.append(addCard(cardData, removeCard))
    });
}

renderCards();

