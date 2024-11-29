const placesContainer = document.querySelector('.places__list');

const editProfilePopup = document.querySelector('.popup_type_edit');
const profileForm = document.querySelector('.popup__form');
const inputName = profileForm.querySelector('.popup__input_type_name');
const inputJob = profileForm.querySelector('.popup__input_type_description');
const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfilePopupButton = editProfilePopup.querySelector('.popup__close');
const saveProfilePopupButton = editProfilePopup.querySelector('.popup__button');

const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const cardForm = addCardPopup.querySelector('.popup__form');
const inputPlaceName = addCardPopup.querySelector('.popup__input_type_card-name');
const inputLink = addCardPopup.querySelector('.popup__input_type_url');
const closeCardPopupButton = addCardPopup.querySelector('.popup__close');
const saveCardPopupButton = addCardPopup.querySelector('.popup__button');

const imageModal = document.querySelector('.popup_type_image');
const closeImagePopupButton = imageModal.querySelector('.popup__close');
const popupImage = imageModal.querySelector('.popup__image');
const popupImageCaption = imageModal.querySelector('.popup__caption');

function createCard(name, link, alt) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    card.querySelector('.card__image').src = link;
    card.querySelector('.card__image').alt = alt;
    card.querySelector('.card__title').textContent = name;

    const likeButton = card.querySelector('.card__like-button');
    likeButton.addEventListener('click', (e) => e.target.classList.toggle('card__like-button_is-active'));
    
    const cardImage = card.querySelector('.card__image');
    cardImage.addEventListener('click', (e) => {
        openModal(imageModal);
        popupImage.src = e.target.src;
        popupImage.alt = e.target.alt;
        popupImageCaption.textContent = name;
    });

    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', (e) => e.target.closest('.card').remove());
    
    return card;
}

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = inputName.value;
    document.querySelector('.profile__description').textContent = inputJob.value;
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    placesContainer.prepend(createCard(inputPlaceName.value, inputLink.value, inputPlaceName.value));
    saveCardPopupButton.addEventListener('click', closeModal(addCardPopup));
}

function addDefaultProfileValues() {
    inputName.value = document.querySelector('.profile__title').textContent;
    inputJob.value = document.querySelector('.profile__description').textContent;
}

initialCards.forEach(card => {
    placesContainer.append(createCard(card.name, card.link, card.alt));
});

editProfileButton.addEventListener('click', function() {
    addDefaultProfileValues();
    openModal(editProfilePopup);
});

closeProfilePopupButton.addEventListener('click', function() {
    closeModal(editProfilePopup);
    addDefaultProfile();
})

saveProfilePopupButton.addEventListener('click', () => closeModal(editProfilePopup));

addCardButton.addEventListener('click', () => openModal(addCardPopup));

closeCardPopupButton.addEventListener('click', function() {
    closeModal(addCardPopup);
    if (inputPlaceName.value) inputPlaceName.value = '';
    if (inputLink.value) inputLink.value = '';
});

closeImagePopupButton.addEventListener('click', () => closeModal(imageModal));

profileForm.addEventListener('submit', handleProfileFormSubmit); 

cardForm.addEventListener('submit', handleCardFormSubmit);

editProfilePopup.classList.add('popup_is-animated');
addCardPopup.classList.add('popup_is-animated');
imageModal.classList.add('popup_is-animated');