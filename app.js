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
const musicCard = document.querySelector('#music-card')

let currentSongIndex = 0

// Update loadSong() on page load with the first song
window.addEventListener('DOMContentLoaded', loadSong(currentSongIndex))

// Load Song Function
function loadSong(songIndex){
    currentSongIndex = songIndex
    // Get song from songs library via index
    let song = songLibrary[songIndex]  

    // Dynamically update the music player UI
    audio.src = song.songPath
    albumCover.style.backgroundImage = `url(${song.coverImage})`
    musicTitle.textContent = song.songTitle
    artisteName.textContent = song.artiste

    // Reset progress bar and song duration display
    progressBar.value = 0;
    currentTimer.innerHTML = '00:00';
    totalSongDuration.innerHTML = '00:00';

    // Get audio duration on page load
    audio.addEventListener('loadedmetadata', () => {
        // Max value to be audio duration
        progressBar.max = audio.duration
        totalSongDuration.textContent = formatTime(audio.duration)
    })

}

// Format Time
function formatTime(time){
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time % 60) //Get the remainder using modolus

    if(minutes < 10 && seconds < 10){
        minutes = `0${minutes}`
        seconds = `0${seconds}`
    }

    return `${minutes}:${seconds}`
}

// Update current song duration
audio.addEventListener('timeupdate', () => {
    progressBar.value = audio.currentTime
    currentTimer.innerHTML = formatTime(audio.currentTime)
})

// Update song duration on slider change
progressBar.addEventListener('change', () => {
    audio.currentTime = progressBar.value
})

// togglePlayPauseButtonIcons function
function togglePlayPauseButtonIcons() {
    if (audio.paused) {
        audio.play();
        albumCover.classList.add('play')
    } else {
        audio.pause();
        albumCover.classList.remove('play')
    }
    updatePlayPauseIcon();
}

// Add Eventlisteners to play/pause btn
playPauseBtn.addEventListener('click', togglePlayPauseButtonIcons)


// function to update play/pause icon
function updatePlayPauseIcon() {
    const playIcon = playPauseBtn.firstElementChild;
    if (audio.paused) {
        playIcon.classList.remove('bx-pause');
        playIcon.classList.add('bx-play-circle');
    } else {
        playIcon.classList.remove('bx-play-circle');
        playIcon.classList.add('bx-pause');
    }
}


// Next Btn To Play Next Song
nextBtn.addEventListener('click', () => {
    currentSongIndex++
    // Check if song has reached the end [length of music library]
    if(currentSongIndex >= songLibrary.length){
        currentSongIndex = 0
    }

    loadSong(currentSongIndex)
    playPauseBtn.click()
    
})

// Previous Btn To Play Previous Song
prevBtn.addEventListener('click', () => {
    // Decrement the index first
    currentSongIndex--
    
    // Check if we've gone before the start of the playlist
    if (currentSongIndex < 0) {
        currentSongIndex = songLibrary.length - 1
    }
    
    // Load and play the new song
    loadSong(currentSongIndex)
    playPauseBtn.click()
})

// Handle next song if audio ends
function playNextSong() {
    currentSongIndex++
    loadSong(currentSongIndex)
    audio.play()
}

// Play next song if current song ends
audio.addEventListener('ended', playNextSong)