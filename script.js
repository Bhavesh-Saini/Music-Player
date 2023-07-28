console.log("Welcome to Spotify");

//Initializing variables
let songIndex = 0;
let audioElement = new Audio("1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

//songs array storing names, songs and their covers
let songs = [
  {
    songName: "These Days-Sidhu Moose Wala",
    filePath: "1.mp3",
    coverPath: "cover1.jpg",
  },
  {
    songName: "Blessings of Baapu-Gagan Kokri",
    filePath: "2.mp3",
    coverPath: "cover2.jpeg",
  },
  {
    songName: "Tere Bare-Karan Randhawa",
    filePath: "3.mp3",
    coverPath: "cover3.jpg",
  },
  { songName: "Naah-Jass Manak", filePath: "4.mp3", coverPath: "cover4.jpg" },
  { songName: "Mill Lo Naa-Guri", filePath: "5.mp3", coverPath: "cover5.jpg" },
  { songName: "Hair-Karan Aujla", filePath: "6.mp3", coverPath: "cover6.jpg" },
  {
    songName: "Laal Chunariya-Akull",
    filePath: "7.mp3",
    coverPath: "cover7.jpeg",
  },
  { songName: "Jannat-Aatish", filePath: "8.mp3", coverPath: "cover8.jpeg" },
];

songItems.forEach((element, i) => {
  //giving cover image before song name
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  //change songname at  bottom when particular song is played
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// play/pause song
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    //make play button to be seen as paused button
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    //make pause button to be seen as played button
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
    gif.style.opacity = 0;
  }
});

//Listen to Events
audioElement.addEventListener("timeupdate", () => {
  //update seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

//on clicking seekbar plays song from there
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

//make all other songs sign to play
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause");
      element.classList.add("fa-play");
    }
  );
};

//play songs when clicked in front of their name
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays(); //makes all other songs icon to play  sign
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play");
      e.target.classList.add("fa-pause");
      //playing the clicked song
      audioElement.src = `${songIndex + 1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play");
      masterPlay.classList.add("fa-pause");
    });
  }
);

//setting next button
document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 7) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `${songIndex + 1}.mp3`;
  //add name of played song at bottom
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
});

//setting previous button
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 7;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `${songIndex + 1}.mp3`;
  //add name of played song at bottom
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
});
