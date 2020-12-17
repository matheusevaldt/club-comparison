// Variables.
const initialContainer = document.querySelector('.initial-container');

const chooseContainer = document.querySelector('.choose-container');
const overviewContainer = document.querySelector('.overview-container');
const inputClub = document.querySelector('.input-club');
const listClubs = document.querySelector('.list-clubs');
const nameChosenClub = document.querySelector('.name-chosen-club');
const imageChosenClub = document.querySelector('.image-chosen-club');
const buttonOverview = document.querySelector('.button-overview');
const messageOverview = document.querySelector('.message-overview');
const buttonResetComparison = document.querySelector('.button-reset-comparison');

const comparisonContainer = document.querySelector('.comparison-container');

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
        initialContainer.style.display = 'none';
        comparisonContainer.style.display = 'block';
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





// COMPARISON CONTAINER
const stateChampionshipRow = document.querySelector('.state-championship-row');

const firstClubName = document.getElementById('first-club-name')
const firstClubSupporters = document.getElementById('first-club-supporters');
const firstClubBrazilianChampionship = document.getElementById('first-club-brazilian-championship');
const firstClubBrazilianCup = document.getElementById('first-club-brazilian-club');
const firstClubConmebolLibertadores = document.getElementById('first-club-conmebol-libertadores');
const firstClubConmebolSudamericana = document.getElementById('first-club-conmebol-sudamericana');
const firstClubConmebolRecopa = document.getElementById('first-club-conmebol-recopa');
const firstClubClubWorldCup = document.getElementById('first-club-club-world-cup');
const firstClubStateChampionship = document.getElementById('first-club-state-championship');

const secondClubName = document.getElementById('second-club-name');
const secondClubSupporters = document.getElementById('second-club-supporters');
const secondClubBrazilianChampionship = document.getElementById('second-club-brazilian-championship');
const secondClubBrazilianCup = document.getElementById('second-club-brazilian-club');
const secondClubConmebolLibertadores = document.getElementById('second-club-conmebol-libertadores');
const secondClubConmebolSudamericana = document.getElementById('second-club-conmebol-sudamericana');
const secondClubConmebolRecopa = document.getElementById('second-club-conmebol-recopa');
const secondClubClubWorldCup = document.getElementById('second-club-club-world-cup');
const secondClubStateChampionship = document.getElementById('second-club-state-championship');

function getClubsData(idFirstClub, idSecondClub) {
    const firstClub = CLUBS_DATA.find(club => club.id === idFirstClub);
    const secondClub = CLUBS_DATA.find(club => club.id === idSecondClub);
    const clubs = [firstClub, secondClub];
    assignClubsData(clubs)
}

function assignClubsData(clubs) {

    firstClubName.innerHTML = clubs[0].name;
    secondClubName.innerHTML = clubs[1].name;

    firstClubSupporters.innerHTML = `${clubs[0].supporters} million`;
    secondClubSupporters.innerHTML = `${clubs[1].supporters} million`;

    firstClubBrazilianChampionship.innerHTML = clubs[0].titles.titlesBrazilianChampionship;
    secondClubBrazilianChampionship.innerHTML = clubs[1].titles.titlesBrazilianChampionship;

    firstClubBrazilianCup.innerHTML = clubs[0].titles.titlesBrazilianCup;
    secondClubBrazilianCup.innerHTML = clubs[1].titles.titlesBrazilianCup;

    firstClubConmebolLibertadores.innerHTML = clubs[0].titles.titlesConmebolLibertadores;
    secondClubConmebolLibertadores.innerHTML = clubs[1].titles.titlesConmebolLibertadores;

    firstClubConmebolSudamericana.innerHTML = clubs[0].titles.titlesConmebolSudamericana;
    secondClubConmebolSudamericana.innerHTML = clubs[1].titles.titlesConmebolSudamericana;

    firstClubConmebolRecopa.innerHTML = clubs[0].titles.titlesConmebolRecopa;
    secondClubConmebolRecopa.innerHTML = clubs[1].titles.titlesConmebolRecopa;

    firstClubClubWorldCup.innerHTML = clubs[0].titles.titlesClubWorldCup;
    secondClubClubWorldCup.innerHTML = clubs[1].titles.titlesClubWorldCup;

    if (clubs[0].state === clubs[1].state) {
        stateChampionshipRow.classList.add('display-state-championship-row');
        firstClubStateChampionship.innerHTML = clubs[0].titles.titlesStateChampionship;
        secondClubStateChampionship.innerHTML = clubs[1].titles.titlesStateChampionship;
    } else {
        stateChampionshipRow.classList.remove('display-state-championship-row');
    }

}
