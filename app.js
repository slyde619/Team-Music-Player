// Variable Assignments
const volumeBtn = document.querySelector('.volume-btn')
const volumeControl = document.querySelector('#volume-range')
const backBtn = document.querySelector('.btn-back')
const albumCover = document.querySelector('.album-cover')
const musicTitle = document.querySelector('.music-title')
const artisteName = document.querySelector('.artiste-name')
const progressBar = document.querySelector('#progress-bar')
const currentTimer = document.querySelector('#current-timer')
const totalSongDuration = document.querySelector('#song-duration')
const prevBtn = document.querySelector('#prevBtn')
const playPauseBtn = document.querySelector('#playPauseBtn')
const nextBtn = document.querySelector('#nextBtn')
const audio = document.querySelector('#audio')

let currentSongIndex = 0

// Update load song on page load
window.addEventListener('DOMContentLoaded', loadSong(currentSongIndex))

// Load Song Function
function loadSong(songIndex){
    currentSongIndex = songIndex
    // Get song from songs library via index
    let song = songLibrary[songIndex]

    // dynamically update the music player UI
    audio.src = song.songPath
    albumCover.style.backgroundImage = `url(${song.coverImage})`
    musicTitle.textContent = song.songTitle
    artisteName.textContent = song.artiste

    // Reset progress bar and song duration display
    progressBar.value = 0;
    currentTimer.innerHTML = '00:00';
    totalSongDuration.innerHTML = '00:00';
}

function playSong(){
    // Check button icon to show pause on play
    const playPauseIcon = playPauseBtn.firstElementChild
    if(playPauseIcon.classList.contains('bx-play-circle')){
        audio.play()
        playPauseIcon.classList.remove('bx-play-circle')
        playPauseicon.classList.add('bx-pause')
    }else{
        audio.pause()
        playPauseIcon.classList.add('bx-play-circle')
        playPauseIcon.classList.remove('bx-pause')
    }
}


// Play Song on Click
playPauseBtn.addEventListener('click', playSong)
