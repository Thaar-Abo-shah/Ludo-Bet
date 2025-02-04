const CONSTANTS = {
    defaultColors: ['red', 'green', 'yellow', 'blue']
}
const showMessage = (text, color) => {
    const d = document.querySelector("." + color + ".home" + " .message");
    const dd = document.querySelector("#conva");

    let p;
    if (!text.includes(".gif")) {
        p = document.createElement("div");
        p.classList.add('conva-body')
        if (color == 'red') {
            color = '#db29299a';
        }
        if (color == 'green') {
            color = '#70db299a';
        }
        if (color == 'blue') {
            color = '#2935db9a';
        }
        if (color == 'yellow') {
            color = '#dbcf299a';
        }
        p.style.backgroundColor = color;

        mes = document.createElement("p");
        // p.innerHTML = text;

        mes.innerHTML += text + "</br>";
        mes.style.margin = 0;
        mes.style.color = 'white';
        mes.style.paddingleft = '15px';
        mes.style.padding = '3px';
        p.appendChild(mes)
        dd.appendChild(p)
    } else {
        p = document.createElement("img")
        p.src = text;
        d.appendChild(p)
        setTimeout(() => {
            d.removeChild(p)
        }, 3000);
    }

}
const sock = io();
let GAMEDATA = {
    playerIds: [],
    playerIndex: '',
    movableGottis: [],
    currentPlayerColor: '',
}


function createPowerup(type) {
    this.type = type;
    let desc = '';
    if (type == "freeRoll") {
        desc = "Gives you an extra free roll! Yeaaa";
    } else if (type == 'skipTurn') {
        desc = "Skips the next players' turn!"
    } else if (type == 'killAnyGotti') {
        desc = "Kill any player in the Arena!"
    }
    let elem = document.createElement("div");
    elem.className = "powerUp";
    elem.classList.add(type)
    this.description = document.createElement("p");
    this.description.innerText = desc;
    elem.appendChild(this.description);
    this.image = elem;
}


sock.on("waitForPlayers", (num) => {
    let p = document.createElement("div");

    p.innerHTML = "<span style='width='100%';'>WAITING FOR " + num + " PLAYERS!</span><img src='images/search.svg' width='100px'>"

    document.querySelector(".waitingForPlayers").classList.remove("hidden");
    document.querySelector("#startGameDialogue").classList.add("hidden");
    document.querySelector(".waitingForPlayers").innerHTML = '';
    document.querySelector(".waitingForPlayers").appendChild(p);
})
enterGame = () => {
    let name = document.querySelector(".playerName input").value.toUpperCase();
    // document.querySelector("#startGameDialogue").classList.remove("hidden");
    // document.querySelector(".playerName").classList.add("hidden");
    player = { 'name': name, 'id': name }
    sock.emit("playerName", player);
}

sock.on("startGame", (powerUps, availablePlayers, gottisInside, playerIds, names, index_player) => {
    document.querySelector(".waitingForPlayers").classList.add("hidden");
    document.querySelector("#startGameDialogue").classList.add("hidden");
    var R_F = document.getElementById('red_finish');
    var Y_F = document.getElementById('yellow_finish');
    var G_F = document.getElementById('green_finish');
    var B_F = document.getElementById('blue_finish');
    GAMEDATA.playerIds = playerIds;
    if (index_player == 0) {
        document.getElementById('canvas_section').style.transform = 'rotate(180deg)'
        R_F.style.transform = 'rotate(180deg)'
        Y_F.style.transform = 'rotate(180deg)'
        G_F.style.transform = 'rotate(180deg)'
        B_F.style.transform = 'rotate(180deg)'
    }
    if (index_player == 2) {
        document.getElementById('canvas_section').style.transform = 'rotate(0deg)'
    }
    if (index_player == 3) {
        document.getElementById('canvas_section').style.transform = 'rotateY(180deg)'
        R_F.style.transform = 'rotateY(180deg)'
        Y_F.style.transform = 'rotateY(180deg)'
        G_F.style.transform = 'rotateY(180deg)'
        B_F.style.transform = 'rotateY(180deg)'
    }
    if (index_player == 1) {
        document.getElementById('canvas_section').style.transform = 'rotateX(180deg)'
        R_F.style.transform = 'rotateX(180deg)'
        Y_F.style.transform = 'rotateX(180deg)'
        G_F.style.transform = 'rotateX(180deg)'
        B_F.style.transform = 'rotateX(180deg)'
    }
    document.querySelector("#Canvas").classList.remove("hidden");
    document.querySelector(".statesic").classList.remove("hidden");
    document.querySelector(".properties").classList.remove("hidden");
    for (let i = 0; i <= availablePlayers.length; i++) {
        if (availablePlayers.includes(i)) {
            //adding profile picturesf
            let div_profile = document.createElement("div");
            let profilePic = document.createElement("img");
            let name = document.createElement("h1");
            name.innerText = names[i]
            profilePic.src = "./images/pp.jpg"
            profilePic.classList.add("profilePic");
            div_profile.appendChild(profilePic)
            console.log(CONSTANTS.defaultColors[i])
            document.querySelector("." + CONSTANTS.defaultColors[i] + ".home").appendChild(div_profile)
            document.querySelector("." + CONSTANTS.defaultColors[i] + ".home").appendChild(name)
                //placing gottis in positions 
            for (let j = 0; j < 4; j++) {
                let gotti = document.createElement("img");
                gotti.classList.add("Gotti");
                gotti.id = gottisInside[i][j];
                let col = gotti.id.slice(0, gotti.id.length - 1)
                if (index_player == 0) {
                    if (col == 'yellow') {
                        div_profile.style.bottom = '-50px'
                        div_profile.style.right = '-45px'
                    }
                    if (col == 'red') {
                        div_profile.style.top = '-50px'
                        div_profile.style.left = '-45px'
                    }
                    if (col == 'green') {
                        div_profile.style.top = '-50px'
                        div_profile.style.right = '-45px'
                    }
                    if (col == 'blue') {
                        div_profile.style.bottom = '-50px'
                        div_profile.style.left = '-45px'
                    }
                }
                if (index_player == 1) {
                    if (col == 'yellow') {
                        div_profile.style.bottom = '-50px'
                        div_profile.style.right = '-60px'
                    }
                    if (col == 'red') {
                        div_profile.style.top = '-50px'
                        div_profile.style.left = '-60px'
                    }
                    if (col == 'green') {
                        div_profile.style.top = '-50px'
                        div_profile.style.right = '-60px'
                    }
                    if (col == 'blue') {
                        div_profile.style.bottom = '-50px'
                        div_profile.style.left = '-60px'
                    }
                }
                if (col == 'red') {
                    name.classList.add("name-red")
                }
                if (col == 'yellow') {
                    name.classList.add('name-yellow')

                }
                if (col == 'blue') {
                    name.classList.add("name-blue")
                }
                if (col == 'green') {
                    name.classList.add('name-green')
                }
                name.classList.add("name")
                gotti.src = './images/gottis/' + col + '.png ';
                let pnt = document.querySelectorAll(".home_" + col + ".inner_space");
                pnt[j].appendChild(gotti);
                if (index_player == 0) {
                    div_profile.style.transform = 'rotate(180deg)'
                    div_profile.style.position = 'absolute'
                    div_profile.style.height = '40%'
                    div_profile.style.width = '40%'
                    profilePic.style.height = '90%'
                    profilePic.style.width = '90%'
                    pnt[j].style.transform = 'rotate(180deg)'
                    var vertical = document.querySelectorAll('*[class^="vertical"]');
                    for (var r = 0; r < vertical.length; r++) {
                        vertical[r].style.transform = 'rotate(180deg)'
                    }
                    var horizontal = document.querySelectorAll('*[class^="horizontal"]');
                    for (var r = 0; r < horizontal.length; r++) {
                        horizontal[r].style.transform = 'rotate(180deg)'
                    }
                    name.style.transform = 'rotate(180deg)'
                }

                if (index_player == 3) {
                    pnt[j].style.transform = 'rotate(0deg)'
                    var vertical = document.querySelectorAll('*[class^="vertical"]');
                    for (var r = 0; r < vertical.length; r++) {
                        vertical[r].style.transform = 'rotate(0deg)'
                    }
                    var horizontal = document.querySelectorAll('*[class^="horizontal"]');
                    for (var r = 0; r < horizontal.length; r++) {
                        horizontal[r].style.transform = 'rotate(0deg)'
                    }
                    name.style.transform = 'rotatey(180deg)'
                }
                if (index_player == 1) {
                    div_profile.style.transform = 'rotate(180deg)'
                    div_profile.style.position = 'absolute'
                    div_profile.style.height = '40%'
                    div_profile.style.width = '40%'
                    profilePic.style.height = '90%'
                    profilePic.style.width = '90%'
                    pnt[j].style.transform = 'rotate(180deg)'
                    var vertical = document.querySelectorAll('*[class^="vertical"]');
                    for (var r = 0; r < vertical.length; r++) {
                        vertical[r].style.transform = 'rotate(180deg)'
                    }
                    var horizontal = document.querySelectorAll('*[class^="horizontal"]');
                    for (var r = 0; r < horizontal.length; r++) {
                        horizontal[r].style.transform = 'rotate(180deg)'
                    }
                    name.style.transform = 'rotatex(180deg)'
                }
            }
        }
    }
    //placing powerUps in positions
    for (var key in powerUps) {
        if (powerUps.hasOwnProperty(key)) {
            let location = document.getElementById(key);
            powerup = new createPowerup(powerUps[key]);
            location.appendChild(powerup.image)
        }
    }
})


sock.on("showMessage", (message, color) => {
    showMessage(message, color)
})

sock.on("powerUpTime", async() => {
    let pp = document.querySelector(".powerUps");
    pp.classList.add("timer");
    await new Promise(r => setTimeout(r, 4000))
    pp.classList.remove("timer")

})

sock.on("timeforplay", async(count) => {
    if (count == 0) {
        let dd = document.getElementById('time_play')
        dd.classList.add('timer_play')
        await new Promise(f => setTimeout(f, 8000))
        dd.classList.remove('timer_play')
    } else {
        let dd = document.getElementById('time_play')
        dd.classList.add('timer_play')
        await new Promise(f => setTimeout(f, 12000))
        dd.classList.remove('timer_play')
    }
})

sock.on("removeDice", () => {
    var dice = document.querySelector(".dd");
    dice.style.display = 'none';

})
sock.on("addDice", () => {
    var dice = document.querySelector(".dd");
    dice.style.display = 'block';

})





sock.on("gameOver", (winners) => {
    document.querySelector("#Canvas").classList.add("hidden");
    document.querySelector(".statesic").classList.add("hidden");
    document.querySelector(".properties").classList.add("hidden");
    document.querySelector(".main-game").classList.add("hidden");
    document.querySelector("#endGameDialogue").classList.remove("hidden");
    winners.forEach((element, index) => {
        let e = document.createElement("button");
        e.innerText = (index + 1) + ".  " + element;
        document.querySelector("#endGameDialogue div").appendChild(e);
    })
})

sock.on("playerIndicator", (currentPlayerColor, id, i) => {

    let r = document.querySelector(".roll");
    if (i == 0) {
        r.classList.add("red1");
        r.classList.remove("blue1");
        r.classList.remove("yallow1");
        r.classList.remove("green1");
    } else if (i == 1) {
        r.classList.remove("red1");
        r.classList.remove("blue1");
        r.classList.remove("yallow1");
        r.classList.add("green1");
    } else if (i == 2) {
        r.classList.remove("red1");
        r.classList.remove("blue1");
        r.classList.add("yallow1");
        r.classList.remove("green1");
    } else if (i == 3) {
        r.classList.remove("red1");
        r.classList.add("blue1");
        r.classList.remove("yallow1");
        r.classList.remove("green1");
    }







    console.log("adding highlight");
    let all = document.querySelectorAll(".home .profilePic");
    for (let i = 0; i < all.length; i++) {
        if (all[i].className.includes("highLight")) {
            all[i].classList.remove("highLight");
            break;
        }
    }
    GAMEDATA.currentPlayerColor = currentPlayerColor;
    let home = document.querySelector("." + currentPlayerColor + ".home .profilePic");
    home.classList.add('highLight');

    if (sock.id === id) {
        document.querySelector(".gif").classList.add("heartBeat");
    }
    if (currentPlayerColor == 'red') {
        var dice = document.querySelector(".dd");
        dice.style.display = 'block';
    } else {

    }
})

sock.on("removeGottiShake", () => {
    document.querySelector(".gif").classList.remove("heartBeat");


})


document.addEventListener("click", async(e) => {
    //if a gotti has been clicked
    let gottiId = e.target.id;
    if (gottiId.includes("bot_button")) {
        var bot = document.getElementById('no_bot')
        var bot_div = document.getElementById('bot-button')
        if (bot_on) {
            bot_on = false
            bot.classList.add('no_bot')
            bot_div.style.backgroundColor = '#db29299a'
        } else {
            bot_on = true
            bot.classList.remove('no_bot')
            bot_div.style.backgroundColor = '#ffffffb4'
        }
    } else if (gottiId.includes("start_button")) {
        enterGame();
        document.getElementById('Enteraudio').play();
    } else if (gottiId.includes("chat_button")) {
        var r = document.getElementById('conv_div')
        var f = document.getElementById('conva')
        if (conv_on) {
            conv_on = false
            r.classList.remove('conv_div')
            f.classList.add('convar')
        } else {
            conv_on = true
            r.classList.add('conv_div')
            f.classList.remove('convar')
        }

    } else if (gottiId.includes("play_button")) {
        document.getElementById('Bgaudio').value = 0.2
        document.getElementById('Bgaudio').loop = true
        document.getElementById('Bgaudio').play();
    } else if (gottiId.includes("pause_button")) {
        document.getElementById('Bgaudio').pause();
    } else if (gottiId.includes("volumeUp_button")) {
        document.getElementById('Bgaudio').volume += 0.1;
    } else if (gottiId.includes("volumeDown_button")) {
        document.getElementById('Bgaudio').volume -= 0.1;
    } else if (gottiId.includes("playAgain")) {
        console.log("jhggjhgjhg")
        document.querySelector("#endGameDialogue div").innerHTML = '';
        document.querySelector("#endGameDialogue").classList.add("hidden");
        document.querySelector("#startGameDialogue").classList.remove("hidden");
        document.getElementById('Enteraudio').play();
    } else if (gottiId.includes("players")) {
        document.getElementById('Enteraudio').play();
        sock.emit("joinGame", gottiId);
    } else if ((e.target.className == "cube" || e.target.className.includes("gif"))) {
        console.log("roll please")
        sock.emit("roll", "hey");
        document.getElementById('Diceaudio').play();
    } else if (!e.target.className.includes("powerUps") && e.target.className.includes("powerUp") && GAMEDATA.playerIds[GAMEDATA.playerIndex] == sock.id) {
        sock.emit("powerUpClicked", e.target.className.replace("powerUp ", ""))
    }
    //if he clicks in the box instead
    else if (gottiId.includes("sendMessage")) {
        console.log("sendiong messahe")
        sendMessage();
    } else if (gottiId.includes("gif")) {

        let src = gottiId.split(" ")[1];
        src = "./images/GIFS/" + src + ".gif";
        sendMessage(src);
    } else if (/^\d*$/.test(gottiId)) {
        try {

            let ch = document.getElementById(gottiId).getElementsByClassName("Gotti");
            if (ch[0]) {
                console.log("yess there is a fucking child")
                let ids = []
                for (let i = 0; i < ch.length; i++) {
                    ids.push(ch[i].id)
                }
                sock.emit("gottiClicked", ids);
            }
        } catch (err) {}
    } else {
        await sock.emit("gottiClicked", gottiId);
    }

})
document.querySelector("#messageBox").addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
        e.preventDefault();
        sendMessage();
    }
})

sendMessage = (src) => {
    let message;
    if (src) {
        message = src;
    } else {
        message = document.getElementById("messageBox").value;
        document.getElementById("messageBox").value = "";
    }
    if (message) sock.emit("sendMessage", message)
    document.getElementById('Gifaudio').volume = 0.40
    document.getElementById('Gifaudio').play()
}

sock.on("removePlayer", (color) => {
    console.log("removing player")
    let name = document.querySelector("." + color + " .name");
    name.parentElement.removeChild(name);
    let profile = document.querySelector("." + color + " .profilePic");
    profile.parentElement.removeChild(profile);
    for (let i = 1; i <= 4; i++) {
        let gotti = document.querySelector("#" + color + i);
        if (gotti) {
            gotti.parentElement.removeChild(gotti);
        }
    }
})

sock.on("rollTheDice", async(movementAmount) => {
    document.querySelector('.gif').classList.remove('test')
    document.querySelector('.gif').style.display = 'none';
    var cube = document.getElementById('cube');
    var min = 100;
    var max = 3000;
    var xRand = getRandom(max, min);
    var yRand = getRandom(max, min);
    cube.style.webkitTransform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';
    cube.style.transform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';

    function getRandom(max, min) {
        return (Math.floor(Math.random() * (max - min)) + min) * 90;
    }
    setTimeout(function() {
        let gif = document.querySelector(".gif");
        gif.src = './images/GIFS/' + movementAmount + ".png";
        gif.style.display = 'block'
        gif.classList.add('test')
    }, 1000);
})


sock.on("removeShakeAnimation", (gottisInside, gottisOutside, i) => {
    removeShakeAnimation(gottisInside, gottisOutside)




})

removeShakeAnimation = (gottisInside, gottisOutside) => {
    for (let i = 0; i < gottisOutside.length; i++) {
        for (let j = 0; j < gottisOutside[i].length; j++) {
            let gotti = document.querySelector("#" + gottisOutside[i][j]);
            if (gotti) gotti.classList.remove("useMe")
        }
    }
    for (let i = 0; i < gottisInside.length; i++) {
        for (let j = 0; j < gottisInside[i].length; j++) {
            let gotti = document.querySelector("#" + gottisInside[i][j]);
            if (gotti) gotti.classList.remove("useMe")
        }
    }
}

sock.on("moveGotti", async(id, playerIndex, positions, gottisInside, gottisOutside, result,num) => {
    GAMEDATA.playerIndex = playerIndex;
    removeShakeAnimation(gottisInside, gottisOutside);
    let g = document.getElementById(id);
    let fd;
    for (let i = 0; i < positions.length - 1;) {
        document.getElementById('Stepaudio').play();
        fd = document.getElementById(positions[i]);
        //if two gottis incountered in the way removes the classes that makes them smaller
        fdGottis = fd.getElementsByClassName("Gotti");
        if (fdGottis.length <= 2) {
            fd.classList.remove("twoGotti")
        } else if (fdGottis.length == 3) {
            fd.classList.remove("multipleGotti");
        }
        //if the gotti has reached the finish line
        i++;
        
            fd = document.getElementById(positions[i]);
        if (fd) {
            fdGottis = fd.getElementsByClassName("Gotti");
            //checks the position for any opponents or powerups
            await new Promise(r => setTimeout(r, 200))
            if (fdGottis.length === 2) fd.classList.add("twoGotti")
            else if (fdGottis.length > 2) fd.classList.add("multipleGotti")
            fd.appendChild(g);
        }
        if (i == positions.length - 1) {
            if (result["killed"]) killGotti(result['killed']);
            if (result['powerUp']) addPowerUp(result['powerUp'])
            if (result["gottiHome"]) gottiHome(result['gottiHome'])
            if (result["gameFinished"]) gameFinished(num,result['gameFinished'])
        }
    }
    if (GAMEDATA.playerIds[GAMEDATA.playerIndex] == sock.id) {
        sock.emit("finishedMoving", result);
    }
})

sock.on("getGottiOut", (id, position, gottisInside, gottisOutside) => {

    document.getElementById('Startaudio').play()
    removeShakeAnimation(gottisInside, gottisOutside);
    fd = document.getElementById(position);
    g = document.getElementById(id);
    fd.appendChild(g);
    //nikalda kheri position ma multiple gotti check
    let fdLen = fd.getElementsByClassName("Gotti")
    if (fdLen.length == 2) {
        fd.classList.add("twoGotti")
    } else if (fdLen.length > 2) {
        fd.classList.add("multipleGotti")
    }
    sock.emit("finishedMoving", "");
})

sock.on("addPowerUp", (destinationID) => {
    addPowerUp(destinationID)
})

addPowerUp = (destinationID) => {
    let dest = document.getElementById(destinationID);
    let child = dest.getElementsByClassName("powerUp")[0]
    dest.removeChild(child);
    if (GAMEDATA.playerIds[GAMEDATA.playerIndex] == sock.id) document.querySelector(".powerUps").appendChild(child);
    document.getElementById('Powerup').play()
}

sock.on("killGotti", (killed) => {
    killGotti(killed);
})

killGotti = (killed) => {
    let color = killed.substr(0, killed.length - 1);
    let spots = document.getElementsByClassName("home_" + color);
    for (let j = 0; j < spots.length; j++) {
        if (spots[j].children.length == 0) {
            spots[j].appendChild(document.querySelector("#" + killed))
            break;
        }
    }
}

gameFinished = (totalPlayersCount,res) => {
    let endGame = document.querySelector("#endGameDialogue");
    if (totalPlayersCount == 2) {
      
    }
    for (let i = 0; i < totalPlayersCount; i++) {
        let el = document.createElement("button");
        el.innerHTML = this.winners[i];
        endGame.children[0].appendChild(el);
    }
    endGame.classList.remove("hidden");
    document.querySelector("#Canvas").classList.add("hidden");
}

gottiHome = (id) => {
    let col = id.replace(/[0-9]/g, "");

    let gotti = document.querySelector('#' + id);
    document.querySelector(".finished_" + col).appendChild(gotti);
    console.log(gotti);
    console.log(document.querySelector(".finished_" + col))
}

sock.on("removePowerUp", type => {
    let pp = document.querySelector(".powerUps");
    pp.classList.remove("timer");
    let p = document.querySelector(".powerUps");
    let c = p.querySelector("." + type);
    p.removeChild(c);
})
sock.on("addShakeAnimation", (movableGottis, i) => {
    //console.log(i);

    movableGottis.forEach(element => {
        var d = document.getElementById(element);
        d.classList.add("useMe")

    });
})


// var interval = setInterval(function() {
//     if (bot_on) {
//         if (GAMEDATA.currentPlayerColor == 'yellow') {
//             sock.emit("roll", "hey");
//         }
//         if (GAMEDATA.currentPlayerColor == 'red') {
//             sock.emit("roll", "hey");
//         }
//         if (GAMEDATA.currentPlayerColor == 'green') {
//             sock.emit("roll", "hey");
//         }
//         if (GAMEDATA.currentPlayerColor == 'blue') {
//             sock.emit("roll", "hey");
//         }
//     }
// }, 1000);
var rr = setInterval(function() {
    if (GAMEDATA.currentPlayerColor == 'yellow') {
        sock.emit("roll", "hey");
    }
    if (GAMEDATA.currentPlayerColor == 'red') {
        sock.emit("roll", "hey");
    }
    if (GAMEDATA.currentPlayerColor == 'green') {
        sock.emit("roll", "hey");
    }
    if (GAMEDATA.currentPlayerColor == 'blue') {
        sock.emit("roll", "hey");
    }
}, 8000);

function playagain() {
    location.reload();
}

// if (GAMEDATA.currentPlayerColor == 'yellow') {

// }