// Variables.
const inputClub = document.querySelector('.input-club');
const listClubs = document.querySelector('.list-clubs');
const nameSelectedClub = document.querySelector('.name-selected-club');
const imageSelectedClub = document.querySelector('.image-selected-club');
const buttonChooseSecondClub = document.querySelector('.button-choose-second-club');
const buttonCompareClubs = document.querySelector('.button-compare-clubs');

let CLUBS_DATA = [];
let CLUBS_SELECTED = [];

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
            nameSelectedClub.innerHTML = club.name;
            imageSelectedClub.src = `images/${club.logo}`;
            imageSelectedClub.alt = club.fullName;
            CLUBS_SELECTED.push(club.id);
            if (CLUBS_SELECTED.length === 1) {
                buttonChooseSecondClub.style.display = 'block';
            } else {
                buttonChooseSecondClub.style.display = 'none';
                buttonCompareClubs.style.display = 'block';
            }
        }
    });


    

    inputClub.value = '';
    inputClub.classList.remove('input-club-adjust');
    listClubs.classList.remove('list-clubs-adjust');
    listClubs.innerHTML = '';
});
