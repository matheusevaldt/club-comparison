// Global variables.
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
const errorContainer = document.querySelector('.error-container');
const buttonRestartComparison = document.querySelector('.button-restart-comparison');
const comparisonContainer = document.querySelector('.comparison-container');
const stateChampionshipComparison = document.querySelector('.state-championship-comparison');
const stateChampionshipCaption = document.querySelector('.state-championship-caption');
const buttonCompareOtherClubs = document.querySelector('.button-compare-other-clubs');
let CLUBS_DATA = [];
let CLUBS_CHOSEN = [];

// Event listeners.
buttonDisplayAvailableClubs.addEventListener('click', displayAvailableClubs);
buttonHideAvailableClubs.addEventListener('click', hideAvailableClubs);
buttonStartAgain.addEventListener('click', startAgain);
buttonChooseSecondClub.addEventListener('click', chooseSecondClub);
buttonCompareClubs.addEventListener('click', compareClubs);
buttonRestartComparison.addEventListener('click', restartComparison);
buttonCompareOtherClubs.addEventListener('click', compareOtherClubs);

// Fetch the data from the 'data.json' file when page is being loaded.
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadJSON);
    } else {
        loadJSON();
    }
})();

// Store the content from the 'data.json' file in the 'CLUBS_DATA' variable.
function loadJSON() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => CLUBS_DATA = data.clubs);
}

// Whenever the user interacts with the 'inputClub' field, do the following:
// - Get what the user has inserted.
// - Make sure that what has been inserted can be matched with the data from the 'CLUBS_DATA' variable.
// - If the sequence of characters that have been inserted by the user are also presented in the name of a club:
// '--> Take the club's name and id.
// '--> Display the club in the autocomplete field so the user can select it.
inputClub.addEventListener('input', event => {
    let filteredArray = [];
    let valueInserted = event.target.value;
    let valueInsertedFixed = valueInserted.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    if (valueInsertedFixed) {
        filteredArray = CLUBS_DATA.filter(club => {
            let nameOfTheClub = club.autocompleteName;
            return nameOfTheClub.includes(valueInsertedFixed);
        });
        filteredArray = filteredArray.map(club => `<li id="${club.id}">${club.name}</li>`);
    }
    autocompleteInputClub(filteredArray);
});

// If there are clubs in the 'CLUBS_DATA' variable that match with what the user has inserted in the 'inputClub' field:
// - Display these clubs in the autocomplete field.
// If no clubs match with what has been inserted by the user:
// - Hide the autocomplate field.
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

// Whenever the user selects a club from the autocomplete field, do the following:
// - Store the club's name and id in the 'CLUBS_CHOSEN' variable.
// - Clear and reset the autocomplete field.
// - Show to the user the club that he has selected.
// - Display the following buttons:
// '--> A button for the user start the process again.
// '--> If the user has only chosen one club so far: a button for the user choose the second club.
// '--> If the user has already chosen two clubs: verify if the chosen clubs are different. If they are not, display an error message. If they are different, display the comparison between them.
listClubs.addEventListener('click', event => {
    let element = event.target;
    let elementId = element.id;
    CLUBS_DATA.filter(club => {
        if (club.id === elementId) addChosenClub(club.id, club.name);
    });
    if (CLUBS_CHOSEN.length === 1) displayOverview();
    if (CLUBS_CHOSEN.length === 2) verifyClubs();
});

function addChosenClub(id, name) {
    CLUBS_CHOSEN.push({id: id, name: name});
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

function verifyClubs() {
    if (CLUBS_CHOSEN[0].id === CLUBS_CHOSEN[1].id) {
        clearAutocompleteList();
        hideInstructionsContainer();
        hideInputContainer();
        displayErrorContainer();
    } else {
        displayOverview();
    }
}

function displayErrorContainer() {
    errorContainer.style.display = 'block';
}

function hideErrorContainer() {
    errorContainer.style.display = 'none';
}

function restartComparison() {
    hideErrorContainer();
    startAgain();
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

// Whenever the user wants to compare two clubs, do the following:
// - Get the id of the club.
// - Search in the 'CLUBS_DATA' variable for the id.
// - Return the data of the club that matches the id.
// - Display the data gathered from both clubs in the comparison container.
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
    // Assigning the amount of supporters of both clubs.
    document.getElementById('first-club-supporters').innerHTML = `${clubs[0].supporters} mi`;
    document.getElementById('second-club-supporters').innerHTML = `${clubs[1].supporters} mi`;
    // Assigning the amount of brazilian championship titles of both clubs.
    document.getElementById('first-club-brazilian-championship').innerHTML = clubs[0].titles.titlesBrazilianChampionship;
    document.getElementById('second-club-brazilian-championship').innerHTML = clubs[1].titles.titlesBrazilianChampionship;
    // Assigning the amount of brazilian cup titles of both clubs.
    document.getElementById('first-club-brazilian-cup').innerHTML = clubs[0].titles.titlesBrazilianCup;
    document.getElementById('second-club-brazilian-cup').innerHTML = clubs[1].titles.titlesBrazilianCup;
    // Assigning the amount of libertadores titles of both clubs.
    document.getElementById('first-club-libertadores').innerHTML = clubs[0].titles.titlesConmebolLibertadores;
    document.getElementById('second-club-libertadores').innerHTML = clubs[1].titles.titlesConmebolLibertadores;
    // Assigning the amount of sudamericana titles of both clubs.
    document.getElementById('first-club-sudamericana').innerHTML = clubs[0].titles.titlesConmebolSudamericana;
    document.getElementById('second-club-sudamericana').innerHTML = clubs[1].titles.titlesConmebolSudamericana;
    // Assigning the amount of recopa titles of both clubs.
    document.getElementById('first-club-recopa').innerHTML = clubs[0].titles.titlesConmebolRecopa;
    document.getElementById('second-club-recopa').innerHTML = clubs[1].titles.titlesConmebolRecopa;
    // Assigning the amount of club world cup titles of both clubs.
    document.getElementById('first-club-club-world-cup').innerHTML = clubs[0].titles.titlesClubWorldCup;
    document.getElementById('second-club-club-world-cup').innerHTML = clubs[1].titles.titlesClubWorldCup;
    // If both clubs are from the same state, assign and display the amount of state championship titles of both clubs.
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