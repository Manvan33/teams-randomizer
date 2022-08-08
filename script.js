function getUrlVars() {
    let vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value.split("#")[0];
    });
    return vars;
}

let players = [];
let teams = [];
let res = {};

function init() {
    if (getUrlVars()["players"] != null) {
        if (!isNaN(getUrlVars()["players"])) {
            for (i = 1; i <= parseInt(getUrlVars()["players"]); i++) {
                players.push("Player " + i);
            }
        } else {
            players = getUrlVars()["players"].split(",")
        }
    }
    if (getUrlVars()["teams"] != null) {
        if (!isNaN(getUrlVars()["teams"])) {
            for (i = 1; i <= parseInt(getUrlVars()["teams"]); i++) {
                teams.push("Team " + i);
            }
        } else {
            teams = getUrlVars()["teams"].split(",")
        }
    }
    document.getElementById("playerInput").addEventListener("keyup", function (e) {
        if (e.key === "Enter") {
            addPlayer();
        }
    });
    document.getElementById("teamInput").addEventListener("keyup", e => {
        if (e.key === "Enter") {
            addTeam();
        }
    });
    document.getElementById("teamAdd").addEventListener("click", e => {
        addTeam();
    });
    document.getElementById("playerAdd").addEventListener("click", e => {
        addPlayer();
    });
    document.getElementById("launch").addEventListener("click", e => {
        randomize();
    });
    updatePlayers();
    updateTeams();
}

function addTeam() {
    document.getElementById("teamInput").value.length === 0 ? teams.push("Team " + (teams.length + 1)) : teams.push(document.getElementById("teamInput").value);
    document.getElementById("teamInput").value = "";
    updateTeams();
}

function addPlayer() {
    document.getElementById("playerInput").value.length === 0 ? players.push("Player " + (players.length + 1)) : players.push(document.getElementById("playerInput").value);
    document.getElementById("playerInput").value = "";
    updatePlayers();
}

function linode(text, classes) {
    let node = document.createElement("li");
    node.innerText = text;
    node.setAttribute("class", classes);
    return node;
}

function updatePlayers() {
    document.getElementById("playersList").innerText = "";
    if (players.length !== 0) {
        for (i of players) {
            document.getElementById("playersList").appendChild(linode(i, "playerItem"));
        }
    }
    document.querySelectorAll(".playerItem").forEach(item => item.addEventListener("click", e => {
        players.splice(players.indexOf(e.currentTarget.innerText), 1);
        updatePlayers();
    }));
}

function updateTeams() {
    document.getElementById("teamsList").innerText = "";
    if (teams.length !== 0) {
        for (i of teams) {
            document.getElementById("teamsList").appendChild(linode(i, "teamItem"));
        }
    }
    document.querySelectorAll(".teamItem").forEach(item => item.addEventListener("click", e => {
        teams.splice(teams.indexOf(e.currentTarget.innerText), 1);
        updateTeams();
    }));
}

function randomize() {
    let pool = Array.from(players);
    res = {};
    for (e of teams) {
        res[e] = [];
    }
    let i = 0;
    while (pool.length) {
        let rand = Math.floor(Math.random() * pool.length);
        res[teams[i]].push(pool[rand]);
        pool.splice(rand, 1);
        i++;
        if (i === teams.length) {
            i = 0;
        }
    }
    showRes();
}

function showRes() {
    let output = '';
    for (e of teams) {
        output += '<ul class="ResTeam"><li>' + e + '</li>';
        for (i of res[e]) {
            output += '<li>' + i + '</li>';
        }
        output += '</ul>';
    }
    document.getElementById("results").innerHTML = output;
}












