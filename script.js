// Variables.
const chooseContainer = document.querySelector('.choose-container');
const overviewContainer = document.querySelector('.overview-container');
const inputClub = document.querySelector('.input-club');
const listClubs = document.querySelector('.list-clubs');
const nameChosenClub = document.querySelector('.name-chosen-club');
const imageChosenClub = document.querySelector('.image-chosen-club');
const buttonOverview = document.querySelector('.button-overview');

let CLUBS_DATA = [];
let CLUBS_CHOSEN = [];

(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadJSON);
    } else {
        loadJSON();
    }
})();

function loadJSON() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => CLUBS_DATA = data.clubs);
}

inputClub.addEventListener('input', event => {
    let valueInserted = event.target.value;
    let valueInsertedFixed = valueInserted.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    let filteredArray = [];
    console.log(valueInsertedFixed);
    if (valueInsertedFixed) {
        filteredArray = CLUBS_DATA.filter(club => {
            let nameOfTheClub = club.autocompleteName;
            return nameOfTheClub.includes(valueInsertedFixed);
        });
        filteredArray = filteredArray.map(club => `<li id="${club.id}">${club.name}</li>`);
    }
    autocompleteInputClub(filteredArray);
});

function autocompleteInputClub(clubs) {
    if (clubs.length) {
        inputClub.classList.add('input-club-adjust');
        listClubs.classList.add('list-clubs-adjust');
        listClubs.innerHTML = clubs.join('');
    } else {
        inputClub.classList.remove('input-club-adjust');
        listClubs.classList.remove('list-clubs-adjust');
        listClubs.innerHTML = '';
    }
}

listClubs.addEventListener('click', event => {
    let element = event.target;
    let elementId = element.id;
    CLUBS_DATA.filter(club => {
        if (club.id === elementId) {
            nameChosenClub.innerHTML = club.name;
            imageChosenClub.src = `images/${club.logo}`;
            imageChosenClub.alt = club.fullName;
            addChosenClub(club.id);
        }
    });
    clearAutocomplete();
    displayOnlyOverviewContainer();
    setMessageButtonOverview();
});

function clearAutocomplete() {
    inputClub.value = '';
    inputClub.classList.remove('input-club-adjust');
    listClubs.classList.remove('list-clubs-adjust');
    listClubs.innerHTML = '';
}

function addChosenClub(id) {
    CLUBS_CHOSEN.push(id);
}

function displayOnlyChooseContainer() {
    overviewContainer.style.display = 'none';
    chooseContainer.style.display = 'block';
}

function displayOnlyOverviewContainer() {
    chooseContainer.style.display = 'none';
    overviewContainer.style.display = 'block';
}

buttonOverview.addEventListener('click', () => {
    if (CLUBS_CHOSEN.length === 1) {
        displayOnlyChooseContainer();
        inputClub.placeholder = 'Inform the second club';
    } else {
        console.log('COMPARE CLUBS');
    }
});

function setMessageButtonOverview() {
    if (CLUBS_CHOSEN.length === 1) {
        buttonOverview.innerHTML = 'Choose second club';
    } else {
        buttonOverview.innerHTML = 'Compare clubs';
    }
}