const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElement = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');



// Global Veriables
let countdownTitle = " ";
let countdownDate = " ";
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Minimum With Todays Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate Countdown / Complete UI
function updateDOM() {
  countdownActive = setInterval(()=> {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Hide Input
    inputContainer.hidden = true;

    // If countdown had complete
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} FINISHED @ ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // Show countdown in progress
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElement[0].textContent = `${days}`
      timeElement[1].textContent = `${hours}`
      timeElement[2].textContent = `${minutes}`
      timeElement[3].textContent = `${seconds}`
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
}


// Take Values From Form Input
function updateCountdown(e){
  e.preventDefault();
  countdownTitle = e.target[0].value;
  countdownDate = e.target[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));
  // Check for valid date
  if (countdownDate === '') {
    alert('Please select a date for the countdown');
  } else {
     // Get number version of current date
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// Reset All Values
function reset() {
  // Hide Countdowns and Show Input
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  // Stop the counter
  clearInterval(countdownActive)
  // Reset
  countdownTitle = " ";
  countdownDate = " ";
  localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
  // Get countdown from local storage if there one is stored
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// Event Listeners

countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// Check LocalStorage upon Loading
restorePreviousCountdown();