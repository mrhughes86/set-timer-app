const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

// Global Veriables
let countdownTitle = " ";
let countdownDate = " ";

// Set Date Input Minimum With Todays Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Take Values From Form Input
function updateCountdown(e){
  e.preventDefault();
  countdownTitle = e.target[0].value;
  countdownDate = e.target[1].value;
  console.log(countdownTitle, countdownDate);
  console.log(e);
}

// Event Listeners

countdownForm.addEventListener('submit', updateCountdown);