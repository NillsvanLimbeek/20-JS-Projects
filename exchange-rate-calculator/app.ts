import './style';

// API key
const key = 'b18f74d4d8c4ee2498a7a34c';

// UI variables
const currencyOne = document.getElementById('currency-one') as HTMLSelectElement;
const amountOne = document.getElementById('amount-one') as HTMLInputElement;
const currencyTwo = document.getElementById('currency-two') as HTMLSelectElement;
const amountTwo = document.getElementById('amount-two') as HTMLInputElement;

const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

// functions
function calculate() {
    // currency value
    const currencyOneValue = currencyOne.value;
    const currencyTwoValue = currencyTwo.value;

    // fetch currency on currency one value
    fetch(`https://prime.exchangerate-api.com/v5/${key}/latest/${currencyOneValue}`)
        .then((res) => res.json())
        .then((data) => {
            const rateExchange = data.conversion_rates[currencyTwoValue];

            rate.innerHTML = `1 ${currencyOneValue} = ${rateExchange} ${currencyTwoValue}`;

            amountTwo.value = (+amountOne.value * rateExchange).toFixed(2);
        });
}

function swapCurrencies() {
    const temp = currencyOne.value;

    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;

    calculate();
}

// event listeners
currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountTwo.addEventListener('change', calculate);

swap.addEventListener('click', swapCurrencies);

calculate();
