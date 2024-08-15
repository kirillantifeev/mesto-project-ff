//---------------------------------------------------------------------------------------------------------------------------//
// Вынесем все необходимые элементы формы в константы
//const formElement = document.querySelector('.popup__form');
//const formInput = formElement.querySelector('.popup__input');
//const formError = formElement.querySelector(`.${formInput.id}-error`);

// Функция, которая добавляет класс с ошибкой



const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const setEventListeners = (formElement, config) => {
  // Находим все поля внутри формы,// сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
  // каждому полю добавим обработчик события input
  inputElement.addEventListener('input', () => {
  // Внутри колбэка вызовем isValid,// передав ей форму и проверяемый элемент
        isValid(formElement, inputElement, config)
        toggleButtonState(inputList, buttonElement, config);
      });
      
    });
  };


  export const enableValidation = (config) => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    
    // Переберём полученную коллекцию
      formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
        setEventListeners(formElement, config);
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
const toggleButtonState = (inputList, buttonElement, config) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
  // сделай кнопку неактивной
  disableSubmitButton (buttonElement, config);
    } else {
  // иначе сделай кнопку активной
          buttonElement.disabled = false;
      buttonElement.classList.remove(config.inactiveButtonClass);
    }
  };


// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, config) => {
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
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
// Если проходит, скроем
    hideInputError(formElement, inputElement, config);
  }
};

// Вызовем функцию isValid на каждый ввод символа
//inputElement.addEventListener('input', isValid);


export const clearValidation = (profileForm, config) => {
  const formList = Array.from(profileForm.querySelectorAll(config.inputSelector));
  const buttonElement = profileForm.querySelector(config.submitButtonSelector);
  formList.forEach((inputElement) => {
    disableSubmitButton (buttonElement, config);
    hideInputError(profileForm, inputElement, config);
  });
};

const disableSubmitButton = (button, config) => {
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
}