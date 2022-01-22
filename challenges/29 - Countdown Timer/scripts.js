const displayTimeLeft = document.querySelector('.display__time-left');
const displayEndTimeParagraph = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('.timer__controls button');
let countdownInterval;

function onTimerControlButtonClick(e) {
    seconds = this.dataset.time;
    timer(seconds);
}

function onCustomFormSubmit(e) {
    e.preventDefault();
    minutes = parseInt(this.minutes.value);
    timer(minutes * 60);
}

function timer(seconds) {
    clearInterval(countdownInterval);
    
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeftUntil(then);
    displayEndTime(then);
    countdownInterval = setInterval(() => {
        displayTimeLeftUntil(then);
    }, 1000);
}

function displayTimeLeftUntil(timestamp){
    let  secondsLeft = Math.round((timestamp - Date.now()) / 1000);
    if (secondsLeft <= 0) {
        secondsLeft = 0;
        clearInterval(countdownInterval);
    }

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    timeLeftAsString = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    displayTimeLeft.textContent = timeLeftAsString;
    document.title = timeLeftAsString;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    let hour = end.getHours();
    const minutes = end.getMinutes();
    let amPm;

    if (hour > 11) {
        amPm = "pm";
        if (hour != 12)
            hour -= 12;
    } else {
        amPm = "am";
        if (hour == 0) {
            hour = 12;
        }
    }

    endTimeAsString = `${hour}:${minutes.toString().padStart(2, "0")}${amPm}`;
    displayEndTimeParagraph.textContent = `Be back at ${endTimeAsString}`;
}

buttons.forEach(button => {
    button.addEventListener('click', onTimerControlButtonClick);
});

document.customForm.addEventListener('submit', onCustomFormSubmit);
