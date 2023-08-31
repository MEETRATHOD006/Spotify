


function slideAnimation(){
    const Aname = document.getElementById("artist")
    const currentName = document.getElementById("current-name")
    const computedStyle = window.getComputedStyle(currentName);
    const computedStyleA = window.getComputedStyle(Aname)
    const width = computedStyle.width;
    const Aheight = computedStyleA.height
    console.log(Aheight)

    if (parseFloat(computedStyle.width) > 345) {
        console.log("ok done")
        
            currentName.style.left = 0;
            console.log("Nahi he")
            const dynamicAnimation = `
            @keyframes slide {
                0% {
                    left: 0;
                }
                10% {
                    left: 0;
                }
                40% {
                    left: calc(345px - ${width});
                }
                50% {
                    left: calc(345px - ${width});
                }
                100% {
                    left: 0;
                }
            }`;

            const styleElement = document.createElement('style');
            styleElement.innerHTML = dynamicAnimation;
            document.head.appendChild(styleElement);

            currentName.style.animation = 'slide 25s ease infinite'; 
    
    } else {
        currentName.style.animation = null;
    }

    if (parseFloat(computedStyleA.height) === 50){
        document.getElementById("song-info").style.height = "80px";
    }
    else if (parseFloat(computedStyleA.height) === 75) {
        document.getElementById("song-info").style.height = "105px";
    }
    else {
        document.getElementById("song-info").style.height = "55px";
    }

}


function circleMouseFollower () {
    window.addEventListener("mousemove", function (details) {
        // console.log(details)
        document.querySelector("#mini-circle").style.transform = `translate(${details.clientX}px, ${details.clientY}px )`
    })

}

function playPause () {
    if (audioElement.paused || audioElement.currentTime <= 0){
        document.querySelector("path").setAttribute("d", "M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z")
        document.getElementById(`${songIndex}`).name = "pause";
        document.getElementsByClassName("count")[songIndex].innerHTML = `<img class="n5XwsUqagSoVk8oMiw1x" width="14" height="14" alt="" src="play.gif">`;
        document.getElementById("artist").innerHTML = songs[songIndex].artist;
        document.getElementById("current-name").innerHTML = songs[songIndex].songName;
        document.getElementById("fixTime").innerHTML = songs[songIndex].duration;
        audioElement.play()
        slideAnimation();
    }
    else {
        audioElement.pause();
        document.querySelector("path").setAttribute("d", "M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z")
        document.getElementById(`${songIndex}`).name = "play";
        document.getElementsByClassName("count")[songIndex].innerHTML = songIndex + 1;
    }
}

function nextSong() {
    if (songIndex === songs.length - 1) {
        console.log(songIndex = 0)

        audioElement.currentTime = 0;
        console.log(songs[songIndex].filePath)
        audioElement.src = songs[songIndex].filePath;
        audioElement.play();
        makeAllPlay();
        document.getElementById("9").name = "pause";
        playPause();
        
        
        document.querySelector("#corrent-song-img").style.backgroundImage = `url("${songs[songIndex].coverPath}")`;

        
    }
    else{
        songIndex++;

        audioElement.currentTime = 0;
        console.log(songs[songIndex].filePath)
        audioElement.src = songs[songIndex].filePath;
        audioElement.play();
        makeAllPlay();
        document.getElementById(`${songIndex}`).name = "pause";
        playPause();
        

        document.querySelector("#corrent-song-img").style.backgroundImage = `url("${songs[songIndex].coverPath}")`;

    }
}

function previousSong() {
    if (songIndex === 0) {
        console.log(songIndex = songs.length - 1)

        audioElement.currentTime = 0;
        console.log(songs[songIndex].filePath)
        audioElement.src = songs[songIndex].filePath;
        audioElement.play();
        makeAllPlay();
        document.getElementById("9").name = "pause";
        playPause();
        


        document.querySelector("#corrent-song-img").style.backgroundImage = `url("${songs[songIndex].coverPath}")`;

        
    }
    else if (songIndex > 0) {
        songIndex--;

        audioElement.currentTime = 0;
        console.log(songs[songIndex].filePath)
        audioElement.src = songs[songIndex].filePath;
        audioElement.play();
        makeAllPlay();
        document.getElementById(`${songIndex}`).name = "pause";
        playPause();
        


        document.querySelector("#corrent-song-img").style.backgroundImage = `url("${songs[songIndex].coverPath}")`;

    }
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    return formattedTime;
}

function checkKey(e) {

    e = e || window.event;
   
    if (e.keyCode == '37') {
       // left arrow
       previousSong();
    }
    else if (e.keyCode == '39') {
       // right arrow
       nextSong();
    }
    else if (e.keyCode == '32') {
        // space bar
        playPause();
    }

}

function makeAllPlay() {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.name = "play"
    })
    for(var i=0; i<songs.length; i++) {
        document.getElementsByClassName("count")[i].innerHTML = i + 1
    }
}

// ...

function songItemPlay() {
    Array.from(document.querySelectorAll(".song")).forEach((element, i) => {
        element.addEventListener("click", () => {
            makeAllPlay();
            songIndex = i;
            document.getElementById(`${songIndex}`).name = "pause";
            audioElement.currentTime = 0;
            audioElement.src = songs[songIndex].filePath;
            audioElement.play();
            playPause();
            
            document.querySelector("#corrent-song-img").style.backgroundImage = `url("${songs[songIndex].coverPath}")`;
        });
    });
}


// circleMouseFollower()


// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('')
let masterPlay = document.getElementById("masterPlay")
let progressBaar = document.getElementById("progressBaar")
let songItem = Array.from(document.querySelectorAll(".song"))
let fill =  document.querySelectorAll(".bar .fill")
let shuffle = document.querySelector("#shuffle-me")
let repeat = document.querySelector("#repeat")
let container = document.getElementsByClassName("song-container")[0];
let searchElement = document.querySelector('input[type="search"]')
// let searchLink = document.getElementById('search')
let songs = [];

const api_url =
      "/api/tracksData";


// Defining async function
async function getapi(url) {
   
    // Storing response
    const response = await fetch(url);
   
    // Storing data in form of JSON
    let data = await response.json();
    // show(data);
    // console.log(data);
    data = JSON.parse(data)
    

    data.tracks.forEach(trackData => {
        // console.log(trackData)
        const songName = trackData.name;
        let artist = []
        
        for (let i = 0; i < trackData.artists.length; i++){
            artist.push(trackData.artists[i].name)
        }
        // console.log(artist)
        const coverPath = trackData.album.images[0].url;
        const duration = formatTime(trackData.duration_ms);

        const song = {
            songName: songName,
            artist: artist,
            coverPath: coverPath,
            duration: duration,
            filePath: trackData.preview_url
          };

          songs.push(song);
        })
        document.getElementById('corrent-song-img').style.backgroundImage = `url(${songs[0].coverPath})`
        document.getElementById('current-name').innerHTML = songs[0].songName;
        document.getElementById('artist').innerHTML = songs[0].artist;

    console.log(songs)
    
    
    generateHtml();
    audioElement = new Audio(`${songs[songIndex].filePath}`)
    audioElement.addEventListener("timeupdate", () => {
        const currentTime = audioElement.currentTime;
        const duration = audioElement.duration;
    
        const progress = parseInt((currentTime / duration) * 100);
        progressBaar.value = progress;
        fill[0].style.width = progressBaar.value + "%";
    
        const formatTime = (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
            return formattedTime;
        };
    
        document.getElementById("timeUpdate").innerHTML = formatTime(currentTime);
    
        if (audioElement.currentTime === audioElement.duration) {
            if (repeat.classList.contains("on")){
                audioElement.currentTime = 0;
                audioElement.play();
            }
            else if (shuffle.classList.contains("on")){ 
                songIndex = Math.floor(Math.random() * songs.length);
                audioElement.currentTime = 0;
                console.log(songs[songIndex].filePath)
                audioElement.src = songs[songIndex].filePath;
                audioElement.play();
                makeAllPlay();
                document.getElementById(`${songIndex}`).name = "pause";
                playPause();
            
    
    
            document.querySelector("#corrent-song-img").style.backgroundImage = `url("${songs[songIndex].coverPath}")`;
            }
            else {
                nextSong();
            }
        }
    });

    
    
    container.innerHTML = generatedHTML + `<iframe
    title="Spotify Embed: Recommendation Playlist "
    src='https://open.spotify.com/embed/playlist/4bwVfzRxVwNlUMDrnCPUXu?utm_source=generator&theme=0'
    width="100%"
    height="100%"
    style={{ minHeight: '500px' }}
    frameBorder="0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
    />`;
    songItemPlay();
    
    
}
let generatedHTML = '';

// Calling async function

getapi(api_url);



function generateHtml (){

    for (let i = 0; i < songs.length; i++) {
        const song = songs[i];
        generatedHTML += `
            <div class="song">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; justify-self: center; align-items: center; gap: 20px;">
                        <h6 class="count" style="color: gray; font-size: large; font-weight: 400; height: 14px; width: 14px;">${i + 1}</h6>
                        <img src="${song.coverPath}" alt="" class="song-img">
                        <div>
                            <h4 style="color: white; font-weight: 600;" class="song-name">${song.songName}</h4>
                            <h4 class="makers" style="color: #ababab; font-weight: 400;">${song.artist}</h4>
                        </div>
                    </div>
                    <div style="color: white; display: flex; align-items: center; gap: 10px;">
                        <p>${song.duration}</p>
                        <ion-icon id="${i}" class="songItemPlay" name="play" style="color: #949494; font-size: 20px; margin: 10px;"></ion-icon>
                    </div>
                </div>
            </div>`;
        console.log("done", i);
} }



document.onkeydown = checkKey;



progressBaar.addEventListener("input", () => {
    newTime = progressBaar.value * audioElement.duration/ 100;
    audioElement.currentTime = newTime;
});

// audioElement.addEventListener("timeupdate", () => {
//     const currentTime = audioElement.currentTime;
//     const duration = audioElement.duration;

//     const progress = parseInt((currentTime / duration) * 100);
//     progressBaar.value = progress;
//     fill[0].style.width = progressBaar.value + "%";

//     const formatTime = (time) => {
//         const minutes = Math.floor(time / 60);
//         const seconds = Math.floor(time % 60);
//         const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//         return formattedTime;
//     };

//     document.getElementById("timeUpdate").innerHTML = formatTime(currentTime);

//     if (audioElement.currentTime === audioElement.duration) {
//         if (repeat.classList.contains("on")){
//             audioElement.currentTime = 0;
//             audioElement.play();
//         }
//         else if (shuffle.classList.contains("on")){ 
//             songIndex = Math.floor(Math.random() * songs.length);
//             audioElement.currentTime = 0;
//             console.log(songs[songIndex].filePath)
//             audioElement.src = songs[songIndex].filePath;
//             audioElement.play();
//             makeAllPlay();
//             document.getElementById(`${songIndex}`).name = "pause";
//             playPause();
        


//         document.querySelector("#corrent-song-img").style.backgroundImage = `url("${songs[songIndex].coverPath}")`;
//         }
//         else {
//             nextSong();
//         }
//     }
// });







// let songs = [
//     {songName:'Chaleya (From "Jawan")', duration: "3:20", artist:"Anirudh Ravichander, Arijit Singh, Shilpa Rao", filePath:"songs/Chaleya.mp3", coverPath:"song-img/Jawan.jpg"},
//     {songName:'Apna Bana Le (From "Bhediya")', duration: "4:21", artist:"Arijit Singh", filePath:"songs/Apna Bana Le Bhediya.mp3", coverPath:"song-img/Bhediya-Hindi-apna-banale.jpg"},
//     {songName:'Shayad (From "Love Aaj Kal 2")', duration: "4:07", artist:"Pritam, Arijit Singh", filePath:"songs/Shayad Love Aaj Kal.mp3", coverPath:"song-img/shayad.jpg"},
//     {songName:'Pyaar Hota Kayi Baar Hai', duration: "3:36", artist:"Pritam, Arijit Singh, Amitabh Bhattacharya, Charan", filePath:"songs/Pyaar Hota Kayi Baar Hai Tu Jhoothi Main Makkaar.mp3", coverPath:"song-img/pyaar-hota-kayi-baar-hai.jpg"},
//     {songName:'Ghodey Pe Sawar (From "Qala")', duration: "3:13", artist:"Amit Trivedi, Amitabh Bhattacharya, Sireesha Bhagavatula", filePath:"songs/Ghodey Pe Sawaar Qala.mp3", coverPath:"song-img/ghode-pe-sawaar.jpg"},
//     {songName:'Rait Zara Si (From "Atrangi Re")', duration: "4:51", artist:"A.R. Rahman, Arijit Singh, Shashaa Tirupati", filePath:"songs/Rait Zara Si Atrangi Re.mp3", coverPath:"song-img/rait-zara-si.jpg"},
//     {songName:'Tumhe Kitna Pyaar Karte (From "Bawal")', duration: "5:05", artist:"Mithoon, Arijit Singh, Manoj Muntashir", filePath:"songs/Tumhe Kitna Pyaar Karte Bawaal.mp3", coverPath:"song-img/tumhe-kitna-pyaar-karte.jpg"},
//     {songName:'Tere Hawaale (From "Laal Singh Chaddha")', duration: "5:46", artist:"Pritam, Arijit Singh, Shilpa Rao", filePath:"songs/Tere Hawaale Laal Singh Chaddha.mp3", coverPath:"song-img/tere-hawale.jpg"},
//     {songName:'Saazish (From "Dhindhora")', duration: "4:40", artist:"Rekha Bhardwaj, Bhuvan Bam", filePath:"songs/Saazish Dhindora.mp3", coverPath:"song-img/saazish.jpg"},
//     {songName:'Besabriya (From "M.S. Dhoni")', duration: "4:15", artist:"Armaan Malik", filePath:"songs/Besabriyaan M.s. Dhoni The Untold Story.mp3", coverPath:"song-img/besabariya.jpg"}
// ]



// audioElement.play()

songItem.forEach((element, i) => {
    // console.log(songs[i].coverPath);
    // element.querySelector(".song-img").src = songs[i].coverPath;
    element.getElementsByClassName("song-name")[0].innerHTML = songs[i].songName;
    // element.getElementsByClassName("makers")[0].innerHTML = songs[i].artist[0];
    element.querySelector("p").innerHTML = songs[i].duration;
    element.querySelector("h6").innerHTML = i + 1;  
})


// Handle play/pause click
masterPlay.addEventListener("click", () => {
    playPause();
})









document.querySelector("#previouse").addEventListener("click", () => {
    previousSong();
})



document.querySelector("#next").addEventListener("click", () => {
    nextSong();
})







shuffle.addEventListener("click", toggleElementState);
repeat.addEventListener("click", toggleElementState);

function toggleElementState(event) {
    const clickedElement = event.target;
    const isShuffleOn = shuffle.classList.contains("on");
    const isRepeatOn = repeat.classList.contains("on");

    if (clickedElement === shuffle) {
        if (isShuffleOn) {
            shuffle.classList.remove("on");
            shuffle.classList.add("off");
            shuffle.style.color = "";
            console.log("shuffle off");
        } else {
            shuffle.classList.remove("off");
            shuffle.classList.add("on");
            shuffle.style.color = "#18cba4";
            console.log("shuffle on");
            if (isRepeatOn) {
                repeat.classList.remove("on");
                repeat.classList.add("off");
                repeat.style.color = "";
                console.log("repeat off");
            }
        }
    } else if (clickedElement === repeat) {
        if (isRepeatOn) {
            repeat.classList.remove("on");
            repeat.classList.add("off");
            repeat.style.color = "";
            console.log("repeat off");
        } else {
            repeat.classList.remove("off");
            repeat.classList.add("on");
            repeat.style.color = "#18cba4";
            console.log("repeat on");
            if (isShuffleOn) {
                shuffle.classList.remove("on");
                shuffle.classList.add("off");
                shuffle.style.color = "";
                console.log("shuffle off");
            }
        }
    }
}


export let currentImg = songs[songIndex].coverPath
export let currentName = songs[songIndex].songName
export let currentArtist = songs[songIndex].artist
export let currentAudio = new Audio(songs[songIndex].filePath)

searchElement.addEventListener("click", ()=> {
    window.location.href = './search.html';
});


