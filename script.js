// Variables.
const content = document.querySelector('.content');

let CLUBS_DATA = [
    {
        id: '01',
        name: 'Atlético Mineiro',
        fullName: 'Clube Atlético Mineiro',
        state: 'Minas Gerais',
        supporters: '5',
        titles: {
            titlesClubWorldCup: '0',
            titlesBrazilianChampionship: '1',
            titlesBrazilianCup: '1',
            titlesConmebolLibertadores: '1',
            titlesConmebolSudamericana: '0',
            titlesConmebolRecopa: '1',
            titlesStateChampionship: '45'
        }
    },
    {
        id: '02',
        name: 'Botafogo',
        fullName: 'Botafogo de Futebol e Regatas',
        state: 'Rio de Janeiro',
        supporters: '2.8',
        titles: {
            titlesClubWorldCup: '0',
            titlesBrazilianChampionship: '2',
            titlesBrazilianCup: '0',
            titlesConmebolLibertadores: '0',
            titlesConmebolSudamericana: '0',
            titlesConmebolRecopa: '0',
            titlesStateChampionship: '21',
        }
    },
    {
        id: '03',
        name: 'Corinthians',
        fullName: 'Sport Club Corinthians Paulista',
        state: 'São Paulo',
        supporters: '28.3',
        titles: {
            titlesClubWorldCup: '2',
            titlesBrazilianChampionship: '7',
            titlesBrazilianCup: '3',
            titlesConmebolLibertadores: '1',
            titlesConmebolSudamericana: '0',
            titlesConmebolRecopa: '1',
            titlesStateChampionship: '30'
        }
    },
    {
        id: '04',
        name: 'Cruzeiro',
        fullName: 'Cruzeiro Esporte Clube',
        state: 'Minas Gerais',
        supporters: '7.2',
        titles: {
            titlesClubWorldCup: '0',
            titlesBrazilianChampionship: '4',
            titlesBrazilianCup: '6',
            titlesConmebolLibertadores: '2',
            titlesConmebolSudamericana: '0',
            titlesConmebolRecopa: '1',
            titlesStateChampionship: '36'
        }
    },
    {
        id: '05',
        name: 'Flamengo',
        fullName: 'Clube de Regatas do Flamengo',
        state: 'Rio de Janeiro',
        supporters: '37,9',
        titles: {
            titlesClubWorldCup: '1',
            titlesBrazilianChampionship: '6',
            titlesBrazilianCup: '3',
            titlesConmebolLibertadores: '2',
            titlesConmebolSudamericana: '0',
            titlesConmebolRecopa: '1',
            titlesStateChampionship: '35'
        }
    },
    {
        id: '06',
        name: 'Fluminense',
        fullName: 'Fluminense Football Club',
        state: 'Rio de Janeiro',
        supporters: '2.9',
        titles: {
            titlesClubWorldCup: '0',
            titlesBrazilianChampionship: '4',
            titlesBrazilianCup: '1',
            titlesConmebolLibertadores: '0',
            titlesConmebolSudamericana: '0',
            titlesConmebolRecopa: '0',
            titlesStateChampionship: '31'
        }
    },
    {
        id: '07',
        name: 'Grêmio',
        fullName: 'Grêmio Foot-Ball Porto Alegrense',
        state: 'Rio Grande do Sul',
        supporters: '8',
        titles: {
            titlesClubWorldCup: '1',
            titlesBrazilianChampionship: '2',
            titlesBrazilianCup: '5',
            titlesConmebolLibertadores: '3',
            titlesConmebolSudamericana: '0',
            titlesConmebolRecopa: '2',
            titlesStateChampionship: '38'
        }
    },
    {
        id: '08',
        name: 'Internacional',
        fullName: 'Sport Club Internacional',
        state: 'Rio Grande do Sul',
        supporters: '6.3',
        titles: {
            titlesClubWorldCup: '1',
            titlesBrazilianChampionship: '3',
            titlesBrazilianCup: '1',
            titlesConmebolLibertadores: '2',
            titlesConmebolSudamericana: '1',
            titlesConmebolRecopa: '2',
            titlesStateChampionship: '45'
        }
    },
    {
        id: '09',
        name: 'Palmeiras',
        fullName: 'Sociedade Esportiva Palmeiras',
        state: 'São Paulo',
        supporters: '13.1',
        titles: {
            titlesClubWorldCup: '0',
            titlesBrazilianChampionship: '10',
            titlesBrazilianCup: '3',
            titlesConmebolLibertadores: '1',
            titlesConmebolSudamericana: '0',
            titlesConmebolRecopa: '0',
            titlesStateChampionship: '24'
        }
    },
    {
        id: '10',
        name: 'Santos',
        fullName: 'Santos Futebol Clube',
        state: 'São Paulo',
        supporters: '5.5',
        titles: {
            titlesClubWorldCup: '2',
            titlesBrazilianChampionship: '8',
            titlesBrazilianCup: '1',
            titlesConmebolLibertadores: '3',
            titlesConmebolSudamericana: '0',
            titlesConmebolRecopa: '1',
            titlesStateChampionship: '22'
        }
    },
    {
        id: '11',
        name: 'São Paulo',
        fullName: 'São Paulo Futebol Clube',
        state: 'São Paulo',
        supporters: '17.1',
        titles: {
            titlesClubWorldCup: '3',
            titlesBrazilianChampionship: '6',
            titlesBrazilianCup: '0',
            titlesConmebolLibertadores: '3',
            titlesConmebolSudamericana: '1',
            titlesConmebolRecopa: '2',
            titlesStateChampionship: '21'
        }
    },
    {
        id: '12',
        name: 'Vasco',
        fullName: 'Clube de Regatas Vasco da Gama',
        state: 'Rio de Janeiro',
        supporters: '9.6',
        titles: {
            titlesClubWorldCup: '0',
            titlesBrazilianChampionship: '4',
            titlesBrazilianCup: '1',
            titlesConmebolLibertadores: '1',
            titlesConmebolSudamericana: '0',
            titlesConmebolRecopa: '0',
            titlesStateChampionship: '24'
        }
    }
];

function test() {
    CLUBS_DATA.map(club => {
        const div = document.createElement('div');
        const name = document.createElement('p');
        const fullName = document.createElement('p');
        const state = document.createElement('p');
        div.className = 'club';
        name.innerHTML = club.name;
        fullName.innerHTML = `Full name: ${club.fullName}`;
        state.innerHTML = club.state;
        div.appendChild(name);
        div.appendChild(fullName);
        div.appendChild(state);
        content.appendChild(div);
    });
}

// test();

const clubs = [
    { id: '01', name: 'atletico mineiro', nameFixed: 'Atlético Mineiro' },
    { id: '02', name: 'botafogo', nameFixed: 'Botafogo' },
    { id: '03', name: 'corinthians', nameFixed: 'Corinthians' },
    { id: '04', name: 'cruzeiro', nameFixed: 'Cruzeiro' },
    { id: '05', name: 'flamengo', nameFixed: 'Flamengo' },
    { id: '06', name: 'fluminense', nameFixed: 'Fluminense' },
    { id: '07', name: 'gremio', nameFixed: 'Grêmio' },
    { id: '08', name: 'internacional', nameFixed: 'Internacional' },
    { id: '09', name: 'palmeiras', nameFixed: 'Palmeiras' },
    { id: '10', name: 'santos', nameFixed: 'Santos' },
    { id: '11', name: 'sao paulo', nameFixed: 'São Paulo' },
    { id: '12', name: 'vasco', nameFixed: 'Vasco' },
];

const containerInputOne = document.querySelector('.container-input-one');
const containerInputTwo = document.querySelector('.container-input-two');
const inputOne = document.querySelector('.input-one');
const inputTwo = document.querySelector('.input-two');
const listInputOne = document.querySelector('.list-input-one');
const listInputTwo = document.querySelector('.list-input-two');
const selectionInputOne = document.querySelector('.selection-input-one');
const selectionInputTwo = document.querySelector('.selection-input-two');

inputOne.addEventListener('input', event => {
    let valueInserted = event.target.value;
    let valueInsertedFixed = valueInserted.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    let filteredArray = [];
    console.log(valueInsertedFixed);
    if (valueInsertedFixed) {
        console.log(clubs);
        filteredArray = clubs.filter(club => {
            let nameOfTheClub = club.name;
            return nameOfTheClub.includes(valueInsertedFixed);
        });
        filteredArray = filteredArray.map(club => {
            let idOfTheClub = club.id;
            let nameOfTheClub = club.nameFixed;
            return `<li id="${idOfTheClub}">${nameOfTheClub}</li>`;
        });
    }
    autoCompleteInputOne(filteredArray);
});

function autoCompleteInputOne(clubs) {
    if (clubs.length) {
        inputOne.classList.add('input-one-adjust');
        listInputOne.classList.add('list-input-one-adjust');
        listInputOne.innerHTML = clubs.join('');
    } else {
        inputOne.classList.remove('input-one-adjust');
        listInputOne.classList.remove('list-input-one-adjust');
        listInputOne.innerHTML = '';
    }
}

listInputOne.addEventListener('click', event => {
    let element = event.target;
    let elementId = element.id;
    let clubSelected;
    CLUBS_DATA.filter(club => {
        if (club.id === elementId) clubSelected = club.fullName;
    });
    selectionInputOne.innerHTML = `${clubSelected}. Id: ${elementId}`;
    inputOne.value = '';
    inputOne.classList.remove('input-one-adjust');
    listInputOne.classList.remove('list-input-one-adjust');
    listInputOne.innerHTML = '';
    // containerInputOne.style.display = 'none';
    // containerInputTwo.style.display = 'block';
});

inputTwo.addEventListener('input', event => {
    let valueInserted = event.target.value;
    let valueInsertedFixed = valueInserted.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    let filteredArray = [];
    if (valueInsertedFixed) {
        filteredArray = clubs.filter(club => {
            let nameOfTheClub = club.name;
            return nameOfTheClub.includes(valueInsertedFixed);
        });
        filteredArray = filteredArray.map(club => {
            let idOfTheClub = club.id;
            let nameOfTheClub = club.nameFixed;
            return `<li id="${idOfTheClub}">${nameOfTheClub}</li>`;
        });
    }
    autoCompleteInputTwo(filteredArray);
});

function autoCompleteInputTwo(clubs) {
    if (clubs.length) {
        listInputTwo.innerHTML = clubs.join('');
    } else {
        listInputTwo.innerHTML = '';
    }
}

listInputTwo.addEventListener('click', event => {
    let element = event.target;
    let elementId = element.id;
    let clubSelected;
    CLUBS_DATA.filter(club => {
        if (club.id === elementId) clubSelected = club.fullName;
    });
    selectionInputTwo.innerHTML = `${clubSelected}. Id: ${elementId}`;
});