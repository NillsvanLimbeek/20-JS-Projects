import './style/progress';
import './style/style';

// UI Variables
const video = document.querySelector('.video__screen') as HTMLVideoElement;
const progress = document.querySelector('.video__progress') as HTMLProgressElement;
const timestamp = document.querySelector('.video__timestamp');
const play = document.querySelector('#play') as HTMLButtonElement;
const stop = document.querySelector('#stop') as HTMLButtonElement;

// functions
function toggleVideoStatus() {
    video.paused ? video.play() : video.pause();

    updatePlayIcon();
}

function updatePlayIcon() {
    video.paused
        ? (play.innerHTML = '<i class="fas fa-play fa-2x"></i>')
        : (play.innerHTML = '<i class="fas fa-pause fa-2x"></i>');
}

function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;

    // minutes
    let min = Math.floor(video.currentTime / 60);
    if (min < 10) {
        min = 0 + min;
    }

    // seconds
    let sec = Math.floor(video.currentTime % 60);
    if (sec < 10) {
        sec = 0 + sec;
    }

    timestamp.innerHTML = `${min}:${sec}`;
}

function stopVideo() {
    video.pause();
    video.currentTime = 0;
}

function setVideoProgess() {
    video.currentTime = (+progress.value * video.duration) / 100;
}

// event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgess);
