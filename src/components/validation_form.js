//---------------------------------------------------------------------------------------------------------------------------//
// Вынесем все необходимые элементы формы в константы
//const formElement = document.querySelector('.popup__form');
//const formInput = formElement.querySelector('.popup__input');
//const formError = formElement.querySelector(`.${formInput.id}-error`);

// Функция, которая добавляет класс с ошибкой

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,// сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
  // каждому полю добавим обработчик события input
  inputElement.addEventListener('input', () => {
  // Внутри колбэка вызовем isValid,// передав ей форму и проверяемый элемент
        isValid(formElement, inputElement)
        toggleButtonState(inputList, buttonElement);
      });
      
    });
  };

  export const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    
    // Переберём полученную коллекцию
      formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
        setEventListeners(formElement);
      });
    };
    
// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
  // Если поле не валидно, колбэк вернёт true
  // Обход массива прекратится и вся функция
  // hasInvalidInput вернёт true
  return !inputElement.validity.valid;
    })
  };

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
  // сделай кнопку неактивной
          buttonElement.disabled = true;
      buttonElement.classList.add('form__submit_inactive');
    } else {
  // иначе сделай кнопку активной
          buttonElement.disabled = false;
      buttonElement.classList.remove('form__submit_inactive');
    }
  };


// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    
    // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
      } else {
    // если передать пустую строку, то будут доступны
    
    // стандартные браузерные сообщения
        inputElement.setCustomValidity('');
      }

  if (!inputElement.validity.valid) {
// Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
// Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};

// Вызовем функцию isValid на каждый ввод символа
//inputElement.addEventListener('input', isValid);


export const clearValidation = (profileForm) => {
  const formList = Array.from(profileForm.querySelectorAll('.popup__input'));
  const buttonElement = profileForm.querySelector('.popup__button');
  formList.forEach((inputElement) => {
    validationConfig(profileForm, inputElement, buttonElement);
  });
};

const validationConfig = (formElement, inputElement, buttonElement) => {
  buttonElement.disabled = true;
  buttonElement.classList.add('form__submit_inactive');
  hideInputError(formElement, inputElement);
}