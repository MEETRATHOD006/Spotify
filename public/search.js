



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
    else if (parseFloat(computedStyleA.height) === 100) {
        document.getElementById("song-info").style.height = "135px"
    }
    else {
        document.getElementById("song-info").style.height = "55px";
    }

}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    return formattedTime;
}

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


let songs = [];
let clear = 0;
let songIndex = 0;
let progressBaar = document.getElementById("progressBaar")
let songItem = Array.from(document.querySelectorAll(".song"))
let fill =  document.querySelectorAll(".bar .fill")
let shuffle = document.querySelector("#shuffle-me")
let repeat = document.querySelector("#repeat")
let searchBar = document.getElementById('search-bar')
let searchIcon = document.querySelector(".search-icon")
let container = document.getElementsByClassName("song-container")[0];
let generatedHTML = '';
let masterPlay = document.getElementById("masterPlay")
let audioElement = new Audio("");
let newTime;
let api_search_url =
"/api/searchResults";




searchBar.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        const searchTerm = searchBar.value.trim();
        if (searchTerm !== "") {
            await getSearchResults(`/api/searchResults?query=${searchTerm}`);
            console.log(searchTerm)
        }
    }
});




async function getSearchResults(url) {
    // const query = new URLSearchParams
    songIndex = 0;
    songs = [];
    console.log(songs);
    container.innerHTML = '';
    console.log("container.innerHTML = " ,container.innerHTML)
    generatedHTML = ''
    console.log("generatedHtml = ",generatedHTML)
    
    const response = await fetch(url)
    let searchData = await response.json();
    console.log(searchData)
    
    searchData.forEach(element => {
        const artists = [];
        const songName = element.name;
        const coverPath = element.album.images[0].url
        const filePath = element.preview_url
        console.log(songName)
        console.log(coverPath)
        console.log(filePath)
        const duration = formatTime(element.duration_ms);
        for (let i = 0; i < element.artists.length; i++) {
            artists.push(element.artists[i].name)
        }
        
        
        const song = {
            songName: songName,
            coverPath: coverPath,
            filePath: filePath,
            artist: artists,
            duration: duration
        }
        songs.push(song)
    });
    generateHtml();
    // audioElement = new Audio(`${songs[0].filePath}`)
     if (clear == 0) {
        document.querySelector("#corrent-song-img").style.backgroundImage = `url("${songs[songIndex].coverPath}")`;
        clear = 1
     }
    
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

getSearchResults(api_search_url);


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

masterPlay.addEventListener("click", () => {
    playPause();
})

document.querySelector("#previouse").addEventListener("click", () => {
    previousSong();
})

document.querySelector("#next").addEventListener("click", () => {
    nextSong();
})

document.onkeydown = checkKey;

progressBaar.addEventListener("input", () => {
    newTime = progressBaar.value * audioElement.duration/ 100;
    audioElement.currentTime = newTime;
});

shuffle.addEventListener("click", toggleElementState);

repeat.addEventListener("click", toggleElementState);

searchIcon.addEventListener("click", async () => {
        const searchTerm = searchBar.value.trim();
        if (searchTerm !== "") {
            await getSearchResults(`/api/searchResults?query=${searchTerm}`);
            console.log(searchTerm)
        }
});