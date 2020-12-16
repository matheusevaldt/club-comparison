// Variables.
const chooseContainer = document.querySelector('.choose-container');
const overviewContainer = document.querySelector('.overview-container');
const inputClub = document.querySelector('.input-club');
const listClubs = document.querySelector('.list-clubs');
const nameChosenClub = document.querySelector('.name-chosen-club');
const imageChosenClub = document.querySelector('.image-chosen-club');
const buttonOverview = document.querySelector('.button-overview');
const messageOverview = document.querySelector('.message-overview');
const buttonResetComparison = document.querySelector('.button-reset-comparison');

let CLUBS_DATA = [];
let CLUBS_CHOSEN = [];

buttonResetComparison.addEventListener('click', resetComparison);

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
            imageChosenClub.style.backgroundImage = `url(images/logos/${club.logo})`;
            addChosenClub(club.id, club.name);
        }
    });
    clearAutocomplete();
    displayOnlyOverviewContainer();
    setMessageOverview();
});

function clearAutocomplete() {
    inputClub.value = '';
    inputClub.classList.remove('input-club-adjust');
    listClubs.classList.remove('list-clubs-adjust');
    listClubs.innerHTML = '';
}

function addChosenClub(id, name) {
    CLUBS_CHOSEN.push({id: id, name: name});
    console.log(CLUBS_CHOSEN);
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
        getClubsData(CLUBS_CHOSEN[0].id, CLUBS_CHOSEN[1].id);
    }
});

function setMessageOverview() {
    if (CLUBS_CHOSEN.length === 1) {
        messageOverview.innerHTML = 'Choose the second club.';
    } else {
        messageOverview.innerHTML = `Compare <span>${CLUBS_CHOSEN[0].name}</span> and <span>${CLUBS_CHOSEN[1].name}</span>.`;
    }
}

function resetComparison() {
    CLUBS_CHOSEN = [];
    displayOnlyChooseContainer();
    clearAutocomplete();
    inputClub.placeholder = 'Inform the first club';
}

window.addEventListener('click', () => {
    let elementOnFocus = document.activeElement;
    let isMobileDevice = window.navigator.userAgent.toLowerCase().includes('mobi');
    if (isMobileDevice) {
        if (elementOnFocus === inputClub) {
            buttonResetComparison.style.display = 'none';
        } else {
            buttonResetComparison.style.display = 'block';
        }
    }
});

// build structure for data on both clubs

function getClubsData(idFirstClub, idSecondClub) {
    const firstClub = CLUBS_DATA.find(club => club.id === idFirstClub);
    const secondClub = CLUBS_DATA.find(club => club.id === idSecondClub);
    const clubs = [firstClub, secondClub];
    compareClubs(clubs)
}

function compareClubs(clubs) {
    console.log(clubs);
}