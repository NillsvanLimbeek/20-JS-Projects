import './style';

// ui vars
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.seat:not(.seat--occupied)');
const seatCount = document.getElementById('seats') as HTMLElement;
const totalPrice = document.getElementById('price') as HTMLElement;
const movieSelect = document.getElementById('movie') as HTMLSelectElement;

populateUI();

let ticketPrice = +movieSelect.value;

// update selected seats and total
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat--selected');

    // create array from indexes with selected seats
    const seatIndex = [...selectedSeats].map((seat) =>
        [...seats].indexOf(seat),
    );

    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));

    seatCount.innerText = `${selectedSeats.length}`;
    totalPrice.innerText = `${selectedSeats.length * ticketPrice}`;
}

// set movie index and price
function setMovieData(movieIndex: number, moviePrice: string) {
    localStorage.setItem('movieIndex', `${movieIndex}`);
    localStorage.setItem('moviePrice', moviePrice);
}

// get data from localStorage
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('seat--selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('movieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = +selectedMovieIndex;
    }
}

// event listeners
// select seats
container.addEventListener('click', (e) => {
    if (
        (e.target as HTMLElement).classList.contains('seat') &&
        !(e.target as HTMLElement).classList.contains('seat--occupied')
    ) {
        (e.target as HTMLElement).classList.toggle('seat--selected');

        updateSelectedCount();
    }
});

// select movie
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +(e.target as HTMLSelectElement).value;
    setMovieData(
        (e.target as HTMLSelectElement).selectedIndex,
        (e.target as HTMLSelectElement).value,
    );

    updateSelectedCount();
});

updateSelectedCount();
