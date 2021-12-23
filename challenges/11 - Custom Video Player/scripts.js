//Get elements
const player = document.querySelector('.player')
const viewer = player.querySelector('.viewer')
const controls = player.querySelector('.player__controls')
const playerButtons = controls.querySelectorAll('.player__button')
const toggleButton = controls.querySelector('.toggle')
const playbackSpeedSlider = controls.querySelector('input[name="playbackRate"]')
const volumeSlider = controls.querySelector('input[name="volume"]')
const progress = controls.querySelector('.progress__filled')


//Functions

function HandleSeek(e) {
    const skipValue = parseFloat(e.currentTarget.dataset.skip);
    viewer.currentTime = viewer.currentTime + skipValue;
}

function HandleToggle() {
    if (viewer.paused) {
        viewer.play();
        toggleButton.innerHTML = "❙❙"
    }
    else {
        viewer.pause();
        toggleButton.innerHTML = '►'
    }
}

function HandlePlaybackSpeedChanged(e) {
    viewer.playbackRate = e.target.valueAsNumber
}

function HandleVolumeChanged(e) {
    viewer.volume = e.target.valueAsNumber
}

function HandleTimeUpdated() {
    const percent = (viewer.currentTime / viewer.duration) * 100;
    progress.style.flexBasis = `${percent}%`;
}

//Hook up elements
playerButtons.forEach(button =>{
    if (button.dataset.skip)
        button.addEventListener('click', HandleSeek)
})

toggleButton.addEventListener('click', HandleToggle)
playbackSpeedSlider.addEventListener('change', HandlePlaybackSpeedChanged)
volumeSlider.addEventListener('change', HandleVolumeChanged)
viewer.addEventListener('timeupdate', HandleTimeUpdated)

viewer.volume = 0.0;
progress.style.flexBasis = '0%'
