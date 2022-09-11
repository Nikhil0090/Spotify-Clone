console.log('Welcome to spotify-Clone');

//Initialising the elements 
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3")
let play = document.getElementById('play')
let myProgressBar = document.getElementById('myprogressBar')
let gif = document.getElementById('gif')
let mastersongName = document.getElementById('mastersongName')
let songItem = Array.from(document.getElementsByClassName('songItem'))
let songs = [
    { songName: "Dusk Till Dawn (feat Sia) - Radio Edit", filePath: 'songs/1.mp3', coverpath: "/covers/1.jpg" },
    { songName: "Entertainer", filePath: "/songs/2.mp3", coverpath: "/covers/2.jpg" },
    { songName: "Good Years", filePath: "/songs/3.mp3", coverpath: "/covers/3.jpg" },
    { songName: "I Dont Wanna Live Forever", filePath: "./songs/4.mp3", coverpath: "/covers/4.jpg" },
    { songName: "Let Me", filePath: "/songs/5.mp3", coverpath: "/covers/5.jpg" },
    { songName: "LIKE I WOULD", filePath: "/songs/6.mp3", coverpath: "/covers/6.jpg" },
    { songName: "No Candle No Light (feat Nicki Minaj)", filePath: "/songs/7.mp3", coverpath: "/covers/7.jpg" },
    { songName: "Rainberry", filePath: "/songs/8.mp3", coverpath: "/covers/8.jpg" },
    { songName: "Still Got Time", filePath: "/songs/9.mp3", coverpath: "/covers/9.jpg" },
]

songItem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByTagName('h3')[0].innerText = songs[i].songName;
})

//Handle the play button
play.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play()
        play.classList.add('fa-circle-pause');
        play.classList.remove('fa-circle-play');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
        gif.style.opacity = 0;

    }
})
//Listen to events
audioElement.addEventListener('timeupdate', () => {
    // console.log();
    //Update myProgessBar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPay();
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `./songs/${songIndex + 1}.mp3`;
        mastersongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    })
})
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `./songs/${songIndex + 1}.mp3`
    mastersongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    play.classList.remove('fa-circle-play');
    play.classList.add('fa-circle-pause');
})


document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `/songs/${songIndex + 1}.mp3`
    mastersongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    play.classList.remove('fa-circle-play');
    play.classList.add('fa-circle-pause');
})