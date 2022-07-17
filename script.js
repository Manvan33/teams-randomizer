function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
		vars[key] = value.split("#")[0];
	});
	return vars;
}
var colors = ['red', 'green', 'blue'];
var players = [];
var teams = [];
var res = {};
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
	$("#playerInput").keyup(function (e) {
		if (e.which == 13) {
			addPlayer();
		}
	});
	$("#teamInput").keyup(function (e) {
		if (e.which == 13) {
			addTeam();
		}
	});
	$("#teamAdd").click(function () {
		addTeam();
	});
	$("#playerAdd").click(function () {
		addPlayer();
	});
	$("#launch").click(function () {
		randomize();
	});
	updatePlayers();
	updateTeams();
}
function addTeam() {
	$("#teamInput").val().length == 0 ? teams.push("Team " + (teams.length + 1)) : teams.push($("#teamInput").val());
	$("#teamInput").val("");
	updateTeams();
}
function addPlayer() {
	$("#playerInput").val().length == 0 ? players.push("Player " + (players.length + 1)) : players.push($("#playerInput").val());
	$("#playerInput").val("");
	updatePlayers();
}
function updatePlayers() {
	$("#playersList")[0].innerHTML = "";
	if (players.length != 0) {
		for (i of players) {
			$("#playersList").append('<li class="playerItem">' + i + "</li>");
		}
	}
	$(".playerItem").click(function () {
		players.splice(players.indexOf($(this).text()), 1);
		updatePlayers();
	});
}
function updateTeams() {
	$("#teamsList")[0].innerHTML = "";
	if (teams.length != 0) {
		for (i of teams) {
			$("#teamsList").append('<li class="teamItem">' + i + "</li>");
		}
	}
	$(".teamItem").click(function () {
		teams.splice(teams.indexOf($(this).text()), 1);
		updateTeams();
	});
}
function randomize() {
	pool = Array.from(players);
	res = {};
	for (e of teams) {
		res[e] = [];
	}
	i = 0;
	while (pool.length) {
		rand = Math.floor(Math.random() * pool.length);
		res[teams[i]].push(pool[rand]);
		pool.splice(rand, 1);
		i++
		if (i == teams.length) {
			i = 0;
		}
	}
	showRes();
}
function showRes() {
	output = '';
	for (e of teams) {
		output += '<ul class="ResTeam"><li>' + e + '</li>';
		for (i of res[e]) {
			output += '<li>' + i + '</li>';
		}
		output += '</ul>';
	};
	$("#results")[0].innerHTML = output;
}












