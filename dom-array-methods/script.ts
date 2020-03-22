import './style';

// UI vars
const main = document.getElementById('main');

const addUserBtn = document.getElementById('add-user') as HTMLButtonElement;
const doubleBtn = document.getElementById('double') as HTMLButtonElement;
const showMillionaresBtn = document.getElementById(
    'show-millionaires',
) as HTMLButtonElement;
const sortBtn = document.getElementById('sort') as HTMLButtonElement;
const calculateWealthBtn = document.getElementById(
    'calculate-wealth',
) as HTMLButtonElement;

// types
type DataUser = {
    name: {
        title: string;
        first: string;
        last: string;
    };
};

type User = {
    name: string;
    money: number;
};

// user array
let userData: User[] = [];

getRandomUser();
getRandomUser();
getRandomUser();

// get user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user: DataUser = data.results[0];

    const newUser: User = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    };

    addData(newUser);
}

// double the money
function doubleMoney() {
    userData = userData.map((user) => {
        return { ...user, money: user.money * 2 };
    });

    updateDom();
}

// sort by wealth
function sortByWealth() {
    userData.sort((a, b) => b.money - a.money);

    updateDom();
}

// filter millionaired
function filterMillionaires() {
    userData = userData.filter((user) => user.money > 1000000);

    updateDom();
}

// calculate total wealth
function calculateWealth() {
    const total = userData.reduce((acc, user) => {
        return (acc += user.money);
    }, 0);

    const element = document.createElement('div');
    element.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
        total,
    )}</strong></h3>`;

    main.appendChild(element);
}

function addData(user: User) {
    userData.push(user);

    updateDom();
}

function updateDom(user = userData) {
    // clear the DOM
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    // loop through data and add to the DOM
    user.forEach((user) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(
            user.money,
        )}
        `;

        main.appendChild(element);
    });
}

// format money https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number: number) {
    return '€' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByWealth);
showMillionaresBtn.addEventListener('click', filterMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
