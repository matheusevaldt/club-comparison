// Variables.
const buttonDisplayAvailableClubs = document.querySelector('.button-display-available-clubs');
const listOfAvailableClubs = document.querySelector('.list-of-available-clubs');
const buttonHideAvailableClubs = document.querySelector('.button-hide-available-clubs');
const initialContainer = document.querySelector('.initial-container');
const instructionsContainer = document.querySelector('.instructions-container');
const currentInstruction = document.querySelector('.current-instruction');
const summaryChoices = document.querySelector('.summary-choices');
const inputContainer = document.querySelector('.input-container');
const inputClub = document.querySelector('.input-club');
const listClubs = document.querySelector('.list-clubs');
const actionsContainer = document.querySelector('.actions-container');
const buttonStartAgain = document.querySelector('.button-start-again');
const buttonChooseSecondClub = document.querySelector('.button-choose-second-club');
const buttonCompareClubs = document.querySelector('.button-compare-clubs');
const comparisonContainer = document.querySelector('.comparison-container');
const stateChampionshipComparison = document.querySelector('.state-championship-comparison');
const stateChampionshipCaption = document.querySelector('.state-championship-caption');
const buttonCompareOtherClubs = document.querySelector('.button-compare-other-clubs');

let CLUBS_DATA = [];
let CLUBS_CHOSEN = [];

buttonDisplayAvailableClubs.addEventListener('click', displayAvailableClubs);
buttonHideAvailableClubs.addEventListener('click', hideAvailableClubs);
buttonStartAgain.addEventListener('click', startAgain);
buttonChooseSecondClub.addEventListener('click', chooseSecondClub);
buttonCompareClubs.addEventListener('click', compareClubs);
buttonCompareOtherClubs.addEventListener('click', compareOtherClubs);

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

// After the user selects a club to compare.
listClubs.addEventListener('click', event => {
    let element = event.target;
    let elementId = element.id;
    CLUBS_DATA.filter(club => {
        if (club.id === elementId) addChosenClub(club.id, club.name);
    });
    displayOverview();
});

function addChosenClub(id, name) {
    CLUBS_CHOSEN.push({id: id, name: name});
    console.log(CLUBS_CHOSEN);
}

function displayOverview() {
    clearAutocompleteList();
    hideInstructionsContainer();
    hideInputContainer();
    displaySummaryChoices();
    displayActionsContainer();
}

function clearAutocompleteList() {
    inputClub.value = '';
    listClubs.innerHTML = '';
    inputClub.classList.remove('input-club-adjust');
    listClubs.classList.remove('list-clubs-adjust');   
}

function hideInstructionsContainer() {
    instructionsContainer.style.display = 'none';
}

function hideInputContainer() {
    inputContainer.style.display = 'none';
}

function displaySummaryChoices() {
    summaryChoices.style.display = 'block';
    if (CLUBS_CHOSEN.length === 1) {
        summaryChoices.innerHTML = `You have chosen <strong>${CLUBS_CHOSEN[0].name}</strong> as your first club.`;
    } else {
        summaryChoices.innerHTML = `You have chosen <strong>${CLUBS_CHOSEN[0].name}</strong> as your first club 
                                    and <strong>${CLUBS_CHOSEN[1].name}</strong> as your second club.`;
    }
}

function displayActionsContainer() {
    actionsContainer.style.display = 'flex';
    if (CLUBS_CHOSEN.length === 1) {
        buttonStartAgain.style.display = 'block';
        buttonChooseSecondClub.style.display = 'block';
        buttonCompareClubs.style.display = 'none';
    } else {
        buttonStartAgain.style.display = 'block';
        buttonChooseSecondClub.style.display = 'none';
        buttonCompareClubs.style.display = 'block';
    }
}

function chooseSecondClub() {
    hideSummaryChoices();
    hideActionsContainer();
    displayInstructionsContainer('second');
    displayInputContainer('second');
}

function hideSummaryChoices() {
    summaryChoices.style.display = 'none';
}

function hideActionsContainer() {
    actionsContainer.style.display = 'none';
    buttonStartAgain.style.display = 'none';
    buttonChooseSecondClub.style.display = 'none';
    buttonCompareClubs.style.display = 'none';
}

function displayInstructionsContainer(phase) {
    instructionsContainer.style.display = 'block';
    currentInstruction.innerHTML = `Choose the ${phase} club that you would like to compare.`;
}

function displayInputContainer(phase) {
    inputContainer.style.display = 'block';
    inputClub.placeholder = `Inform the ${phase} club`;
}

function startAgain() {
    CLUBS_CHOSEN = [];
    hideSummaryChoices();
    hideActionsContainer();
    displayInstructionsContainer('first');
    displayInputContainer('first');
}

function compareClubs() {
    getClubsData(CLUBS_CHOSEN[0].id, CLUBS_CHOSEN[1].id);
    initialContainer.style.display = 'none';
    comparisonContainer.style.display = 'block';
}

function getClubsData(idFirstClub, idSecondClub) {
    const firstClub = CLUBS_DATA.find(club => club.id === idFirstClub);
    const secondClub = CLUBS_DATA.find(club => club.id === idSecondClub);
    const clubs = [firstClub, secondClub];
    assignClubsData(clubs);
}

function assignClubsData(clubs) {
    // Assigning the name of both clubs.
    document.getElementById('first-club-name').innerHTML = clubs[0].name;
    document.getElementById('second-club-name').innerHTML = clubs[1].name;
    // Assigning the logos of both clubs.
    document.querySelector('.first-club-logo').src = `images/logos/${clubs[0].logo}`;
    document.querySelector('.second-club-logo').src = `images/logos/${clubs[1].logo}`;
    // Assigning the amount of supporters for both clubs.
    document.getElementById('first-club-supporters').innerHTML = `${clubs[0].supporters} mi`;
    document.getElementById('second-club-supporters').innerHTML = `${clubs[1].supporters} mi`;
    // Assigning the amount of brazilian championship titles for both clubs.
    document.getElementById('first-club-brazilian-championship').innerHTML = clubs[0].titles.titlesBrazilianChampionship;
    document.getElementById('second-club-brazilian-championship').innerHTML = clubs[1].titles.titlesBrazilianChampionship;
    // Assigning the amount of brazilian cup titles for both clubs.
    document.getElementById('first-club-brazilian-cup').innerHTML = clubs[0].titles.titlesBrazilianCup;
    document.getElementById('second-club-brazilian-cup').innerHTML = clubs[1].titles.titlesBrazilianCup;
    // Assigning the amount of libertadores titles for both clubs.
    document.getElementById('first-club-libertadores').innerHTML = clubs[0].titles.titlesConmebolLibertadores;
    document.getElementById('second-club-libertadores').innerHTML = clubs[1].titles.titlesConmebolLibertadores;
    // Assigning the amount of sudamericana titles for both clubs.
    document.getElementById('first-club-sudamericana').innerHTML = clubs[0].titles.titlesConmebolSudamericana;
    document.getElementById('second-club-sudamericana').innerHTML = clubs[1].titles.titlesConmebolSudamericana;
    // Assigning the amount of recopa titles for both clubs.
    document.getElementById('first-club-recopa').innerHTML = clubs[0].titles.titlesConmebolRecopa;
    document.getElementById('second-club-recopa').innerHTML = clubs[1].titles.titlesConmebolRecopa;
    // Assigning the amount of club world cup titles for both clubs.
    document.getElementById('first-club-club-world-cup').innerHTML = clubs[0].titles.titlesClubWorldCup;
    document.getElementById('second-club-club-world-cup').innerHTML = clubs[1].titles.titlesClubWorldCup;
    // If both clubs are from the same state, assign and display the amount of state championship titles for both clubs.
    if (clubs[0].state === clubs[1].state) {
        stateChampionshipComparison.style.display = 'grid';
        stateChampionshipCaption.style.display = 'block';
        document.getElementById('first-club-state-championship').innerHTML = clubs[0].titles.titlesStateChampionship;
        document.getElementById('second-club-state-championship').innerHTML = clubs[1].titles.titlesStateChampionship;
    } else {
        stateChampionshipComparison.style.display = 'none';
        stateChampionshipCaption.style.display = 'none';
    }
}

function compareOtherClubs() {
    startAgain();
    comparisonContainer.style.display = 'none';
    initialContainer.style.display = 'block';
}

function displayAvailableClubs() {
    listOfAvailableClubs.style.display = 'block';
    if (screen.width > 1200) buttonHideAvailableClubs.innerHTML = 'Click here to close this pop-up';
}

function hideAvailableClubs() {
    listOfAvailableClubs.style.display = 'none';
}

// const firstClubName = document.getElementById('first-club-name');
// const firstClubLogo = document.querySelector('.first-club-logo');
// const firstClubSupporters = document.getElementById('first-club-supporters');
// const firstClubBrazilianChampionship = document.getElementById('first-club-brazilian-championship');
// const firstClubBrazilianCup = document.getElementById('first-club-brazilian-cup');
// const firstClubLibertadores = document.getElementById('first-club-libertadores');
// const firstClubSudamericana = document.getElementById('first-club-sudamericana');
// const firstClubRecopa = document.getElementById('first-club-recopa');
// const firstClubClubWorldCup = document.getElementById('first-club-club-world-cup');
// const firstClubStateChampionship = document.getElementById('first-club-state-championship');
// const secondClubName = document.getElementById('second-club-name')
// const secondClubLogo = document.querySelector('.second-club-logo');
// const secondClubSupporters = document.getElementById('second-club-supporters');
// const secondClubBrazilianChampionship = document.getElementById('second-club-brazilian-championship');
// const secondClubBrazilianCup = document.getElementById('second-club-brazilian-cup');
// const secondClubLibertadores = document.getElementById('second-club-libertadores');
// const secondClubSudamericana = document.getElementById('second-club-sudamericana');
// const secondClubRecopa = document.getElementById('second-club-recopa');
// const secondClubClubWorldCup = document.getElementById('second-club-club-world-cup');
// const secondClubStateChampionship = document.getElementById('second-club-state-championship');