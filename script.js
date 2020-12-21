// Variables.
const initialContainer = document.querySelector('.initial-container');

const instructionsContainer = document.querySelector('.instructions-container');
const inputContainer = document.querySelector('.input-container');
const actionsContainer = document.querySelector('.actions-container');


const inputClub = document.querySelector('.input-club');
const listClubs = document.querySelector('.list-clubs');


const currentInstruction = document.querySelector('.current-instruction');
const summaryChoices = document.querySelector('.summary-choices');

const buttonStartAgain = document.querySelector('.button-start-again');
const buttonChooseSecondClub = document.querySelector('.button-choose-second-club');
const buttonCompareClubs = document.querySelector('.button-compare-clubs');



const comparisonContainer = document.querySelector('.comparison-container');

let CLUBS_DATA = [];
let CLUBS_CHOSEN = [];

buttonStartAgain.addEventListener('click', startAgain);
buttonChooseSecondClub.addEventListener('click', chooseSecondClub);
buttonCompareClubs.addEventListener('click', compareClubs);

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

// COMPARISON CONTAINER
const stateChampionshipComparison = document.querySelector('.state-championship-comparison');
const stateChampionshipCaption = document.querySelector('.state-championship-caption');

const firstClubLogo = document.getElementById('first-club-logo');
const firstClubHeader = document.getElementById('first-club-header')
const firstClubSupporters = document.getElementById('first-club-supporters');
const firstClubBrazilianChampionship = document.getElementById('first-club-brazilian-championship');
const firstClubBrazilianCup = document.getElementById('first-club-brazilian-club');
const firstClubConmebolLibertadores = document.getElementById('first-club-conmebol-libertadores');
const firstClubConmebolSudamericana = document.getElementById('first-club-conmebol-sudamericana');
const firstClubConmebolRecopa = document.getElementById('first-club-conmebol-recopa');
const firstClubClubWorldCup = document.getElementById('first-club-club-world-cup');
const firstClubStateChampionship = document.getElementById('first-club-state-championship');

const secondClubLogo = document.getElementById('second-club-logo');
const secondClubHeader = document.getElementById('second-club-header');
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
    assignClubsData(clubs);
    compareClubsData(clubs);
}

function assignClubsData(clubs) {

    firstClubLogo.src = `images/logos/${clubs[0].logo}`;
    secondClubLogo.src = `images/logos/${clubs[1].logo}`;

    firstClubHeader.innerHTML = clubs[0].name;
    secondClubHeader.innerHTML = clubs[1].name;

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
        stateChampionshipComparison.classList.add('display-state-championship-comparison');
        firstClubStateChampionship.innerHTML = clubs[0].titles.titlesStateChampionship;
        secondClubStateChampionship.innerHTML = clubs[1].titles.titlesStateChampionship;
        stateChampionshipCaption.style.display = 'block';
    } else {
        stateChampionshipComparison.classList.remove('display-state-championship-comparison');
    }

}

function compareClubsData(clubs) {

    if (Number(clubs[0].supporters) > Number(clubs[1].supporters)) {
        firstClubSupporters.style.backgroundColor = 'rgba(239, 176, 140, 0.5)'
    } else {
        secondClubSupporters.style.backgroundColor = 'rgba(239, 176, 140, 0.5)';
    }

    if (Number(clubs[0].titles.titlesBrazilianChampionship) > Number(clubs[1].titles.titlesBrazilianChampionship)) {
        firstClubBrazilianChampionship.style.backgroundColor = 'rgba(239, 176, 140, 0.5)';
    } else if (Number(clubs[0].titles.titlesBrazilianChampionship) < Number(clubs[1].titles.titlesBrazilianChampionship)) {
        secondClubBrazilianChampionship.style.backgroundColor = 'rgba(239, 176, 140, 0.5)';
    }

    if (Number(clubs[0].titles.titlesBrazilianCup) > Number(clubs[1].titles.titlesBrazilianCup)) {
        firstClubBrazilianCup.style.backgroundColor = 'rgba(239, 176, 140, 0.5)';
    } else if (Number(clubs[0].titles.titlesBrazilianCup) < Number(clubs[1].titles.titlesBrazilianCup)) {
        secondClubBrazilianCup.style.backgroundColor  = 'rgba(239, 176, 140, 0.5)';
    }

    if (Number(clubs[0].titles.titlesConmebolLibertadores) > Number(clubs[1].titles.titlesConmebolLibertadores)) {
        firstClubConmebolLibertadores.style.backgroundColor = 'rgba(239, 176, 140, 0.5)';
    } else if (Number(clubs[0].titles.titlesConmebolLibertadores) < Number(clubs[1].titles.titlesConmebolLibertadores)) {
        secondClubConmebolLibertadores.style.backgroundColor  = 'rgba(239, 176, 140, 0.5)';
    }

    if (Number(clubs[0].titles.titlesConmebolSudamericana) > Number(clubs[1].titles.titlesConmebolSudamericana)) {
        firstClubConmebolSudamericana.style.backgroundColor = 'rgba(239, 176, 140, 0.5)';
    } else if (Number(clubs[0].titles.titlesConmebolSudamericana) < Number(clubs[1].titles.titlesConmebolSudamericana)) {
        secondClubConmebolSudamericana.style.backgroundColor  = 'rgba(239, 176, 140, 0.5)';
    }

    if (Number(clubs[0].titles.titlesConmebolRecopa) > Number(clubs[1].titles.titlesConmebolRecopa)) {
        firstClubConmebolRecopa.style.backgroundColor = 'rgba(239, 176, 140, 0.5)';
    } else if (Number(clubs[0].titles.titlesConmebolRecopa) < Number(clubs[1].titles.titlesConmebolRecopa)) {
        secondClubConmebolRecopa.style.backgroundColor  = 'rgba(239, 176, 140, 0.5)';
    }

    if (Number(clubs[0].titles.titlesClubWorldCup) > Number(clubs[1].titles.titlesClubWorldCup)) {
        firstClubClubWorldCup.style.backgroundColor = 'rgba(239, 176, 140, 0.5)';
    } else if (Number(clubs[0].titles.titlesClubWorldCup) < Number(clubs[1].titles.titlesClubWorldCup)) {
        secondClubClubWorldCup.style.backgroundColor  = 'rgba(239, 176, 140, 0.5)';
    }

    if (clubs[0].state === clubs[1].state) {
        if (Number(clubs[0].titles.titlesStateChampionship) > Number(clubs[1].titles.titlesStateChampionship)) {
            firstClubStateChampionship.style.backgroundColor = 'rgba(239, 176, 140, 0.5)';
        } else if (Number(clubs[0].titles.titlesStateChampionship) < Number(clubs[1].titles.titlesStateChampionship)) {
            secondClubStateChampionship.style.backgroundColor = 'rgba(239, 176, 140, 0.5)';
        }
    }

}
