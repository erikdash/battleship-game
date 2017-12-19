function getInfo() {
    //localStorage.clear();
    //var scores = JSON.parse(localStorage["scores"] || "[]");
    //localStorage.clear();
    //localStorage.setItem("scores", JSON.stringify(scores));
    var reA = /A.[A-J][1-910]\-[A-J][1-910]/;
    var reB = /B.[A-J][1-910]\-[A-J][1-910]/;
    var reS = /S.([A-J]\d\d?)\-([A-J]\d\d?)/;
    var p1name = prompt("Enter the name of player 1");
    do {
        var placements1 = prompt("Enter valid ship placements");
        var p1Astr = reA.exec(placements1);
        var p1A = getPositions(p1Astr[0]);
        var p1Bstr = reB.exec(placements1);
        var p1B = getPositions(p1Bstr[0]);
        var p1Sstr = reS.exec(placements1);
        var p1S = getPositions(p1Sstr[0]);
    }
    while (intersect(p1A, p1B) || intersect(p1A, p1S) || intersect(p1B, p1S) || (p1A.length != 5) || (p1B.length != 4) || (p1S.length != 3));
    var p2name = prompt("Enter the name of player 2");
    do {
        var placements2 = prompt("Enter valid ship placements");
        var p2Astr = reA.exec(placements2);
        var p2A = getPositions(p2Astr[0]);
        var p2Bstr = reB.exec(placements2);
        var p2B = getPositions(p2Bstr[0]);
        var p2Sstr = reS.exec(placements2);
        var p2S = getPositions(p2Sstr[0]);
    } while (intersect(p2A, p2B) || intersect(p2A, p2S) || intersect(p2B, p2S) || (p1A.length != 5) || (p1B.length != 4) || (p1S.length != 3));
    localStorage.setItem("p1name", p1name);
    localStorage.setItem("p1A", p1A);
    localStorage.setItem("p1B", p1B);
    localStorage.setItem("p1S", p1S);
    localStorage.setItem("p2name", p2name);
    localStorage.setItem("p2A", p2A);
    localStorage.setItem("p2B", p2B);
    localStorage.setItem("p2S", p2S);
    var p1red = [];
    var p1white = [];
    var p2red = [];
    var p2white = [];
    localStorage.setItem("p1red", JSON.stringify(p1red));
    localStorage.setItem("p1white", JSON.stringify(p1white));
    localStorage.setItem("p2red", JSON.stringify(p2red));
    localStorage.setItem("p2white", JSON.stringify(p2white));
    localStorage.setItem("turn", 1);
    setTimeout(startGame, 10);
}

function startGame() {
    alert("Click OK to begin " + localStorage.getItem("p1name") + "\'s turn");
    populatePlayer1();
}

function fire(id) {
    var turn = localStorage.getItem("turn");
    var shot = [id];
    var end = false;
    if(turn == 1) {
        p2A = localStorage.getItem("p2A").split(",");
        p2B = localStorage.getItem("p2B").split(",");
        p2S = localStorage.getItem("p2S").split(",");
        p1red = JSON.parse(localStorage.getItem("p1red"));
        p1white = JSON.parse(localStorage.getItem("p1white"));
        if(intersect(p2A, shot)) {
            document.getElementById(id).style.backgroundColor = "red";
            setTimeout(function(){alert("You hit " + localStorage.getItem("p2name") + "\'s aircraft carrier!")}, 10);
            if(!(p1red.includes(id))) {
                p1red.push(id);
            }
            setTimeout(function() {
                if(sunk(p2A, p1red)) {
                    alert("You sunk " + localStorage.getItem("p2name") + "\'s aircraft carrier!");
                    if(sunk(p2B, p1red) && sunk(p2S, p1red)) {
                        alert("You sunk all 3 of " + localStorage.getItem("p2name") + "\'s ships! You win!");
                        end = true;
                        gameOver(1);
                    }
                }
            }, 20);
            if(end == false) {
                localStorage.setItem("p1red", JSON.stringify(p1red));
                localStorage.setItem("turn", 2);
                setTimeout(announceNext, 30);
            }
        }
        else if (intersect(p2B, shot)) {
            document.getElementById(id).style.backgroundColor = "red";
            setTimeout(function(){alert("You hit " + localStorage.getItem("p2name") + "\'s battleship!")}, 10);
            if(!(p1red.includes(id))) {
                p1red.push(id);
            }
            setTimeout(function() {
                if(sunk(p2B, p1red)) {
                    alert("You sunk " + localStorage.getItem("p2name") + "\'s battleship!");
                    if(sunk(p2A, p1red) && sunk(p2S, p1red)) {
                        alert("You sunk all 3 of " + localStorage.getItem("p2name") + "\'s ships! You win!");
                        end = true;
                        gameOver(1);
                    }
                }
            }, 20);
            if(end == false) {
                localStorage.setItem("p1red", JSON.stringify(p1red));
                localStorage.setItem("turn", 2);
                setTimeout(announceNext, 30);
            }
        }
        else if(intersect(p2S, shot)) {
            document.getElementById(id).style.backgroundColor = "red";
            setTimeout(function(){alert("You hit " + localStorage.getItem("p2name") + "\'s submarine!")}, 10);
            if(!(p1red.includes(id))) {
                p1red.push(id);
            }
            setTimeout(function() {
                if(sunk(p2S, p1red)) {
                    alert("You sunk " + localStorage.getItem("p2name") + "\'s submarine!");
                    if(sunk(p2B, p1red) && sunk(p2A, p1red)) {
                        alert("You sunk all 3 of " + localStorage.getItem("p2name") + "\'s ships! You win!");
                        end = true;
                        gameOver(1);
                    }
                }
            }, 20);
            if(end == false) {
                localStorage.setItem("p1red", JSON.stringify(p1red));
                localStorage.setItem("turn", 2);
                setTimeout(announceNext, 30);
            }
        }
        else if(!(intersect(p2A, shot) && intersect(p2B, shot) && intersect(p2S, shot))) {
            document.getElementById(id).style.backgroundColor = "white";
            setTimeout(function(){alert("Miss!")}, 10);
            if(!(p1white.includes(id))) {
                p1white.push(id);
            }
            localStorage.setItem("p1white", JSON.stringify(p1white));
            localStorage.setItem("turn", 2);
            setTimeout(announceNext, 30);
        }


    }
    else {
        p1A = localStorage.getItem("p1A").split(",");
        p1B = localStorage.getItem("p1B").split(",");
        p1S = localStorage.getItem("p1S").split(",");
        p2red = JSON.parse(localStorage.getItem("p2red"));
        p2white = JSON.parse(localStorage.getItem("p2white"));
        if(intersect(p1A, shot)) {
            document.getElementById(id).style.backgroundColor = "red";
            setTimeout(function(){alert("You hit " + localStorage.getItem("p1name") + "\'s aircraft carrier!")}, 10);
            if(!(p2red.includes(id))) {
                p2red.push(id);
            }
            setTimeout(function() {
                if(sunk(p1A, p2red)) {
                    alert("You sunk " + localStorage.getItem("p1name") + "\'s aircraft carrier!");
                    if(sunk(p1B, p2red) && sunk(p1S, p2red)) {
                        alert("You sunk all 3 of " + localStorage.getItem("p1name") + "\'s ships! You win!");
                        end = true;
                        gameOver(2);
                    }
                }
            }, 20);
            if(end == false) {
                localStorage.setItem("p2red", JSON.stringify(p2red));
                localStorage.setItem("turn", 1);
                setTimeout(announceNext, 30);
            }
        }
        else if (intersect(p1B, shot)) {
            document.getElementById(id).style.backgroundColor = "red";
            setTimeout(function(){alert("You hit " + localStorage.getItem("p1name") + "\'s battleship!")}, 10);
            if(!(p2red.includes(id))) {
                p2red.push(id);
            }
            setTimeout(function() {
                if(sunk(p1B, p2red)) {
                    alert("You sunk " + localStorage.getItem("p1name") + "\'s battleship!");
                    if(sunk(p1A, p2red) && sunk(p1S, p2red)) {
                        alert("You sunk all 3 of " + localStorage.getItem("p1name") + "\'s ships! You win!");
                        end = true;
                        gameOver(2);
                    }
                }
            }, 20);
            if(end == false) {
                localStorage.setItem("p2red", JSON.stringify(p2red));
                localStorage.setItem("turn", 1);
                setTimeout(announceNext, 30);
            }
        }
        else if(intersect(p1S, shot)) {
            document.getElementById(id).style.backgroundColor = "red";
            setTimeout(function(){alert("You hit " + localStorage.getItem("p1name") + "\'s submarine!")}, 10);
            if(!(p2red.includes(id))) {
                p2red.push(id);
            }
            setTimeout(function() {
                if(sunk(p1S, p2red)) {
                    alert("You sunk " + localStorage.getItem("p1name") + "\'s submarine!");
                    if(sunk(p1B, p2red) && sunk(p1A, p2red)) {
                        alert("You sunk all 3 of " + localStorage.getItem("p1name") + "\'s ships! You win!");
                        end = true;
                        gameOver(2);
                    }
                }
            }, 20);
            if(end == false) {
                localStorage.setItem("p2red", JSON.stringify(p2red));
                localStorage.setItem("turn", 1);
                setTimeout(announceNext, 30);
            }
        }
        else if(!(intersect(p1A, shot) && intersect(p1B, shot) && intersect(p1S, shot))) {
            document.getElementById(id).style.backgroundColor = "white";
            setTimeout(function(){alert("Miss!")}, 10);
            if(!(p2white.includes(id))) {
                p2white.push(id);
            }
            localStorage.setItem("p2white", JSON.stringify(p2white));
            localStorage.setItem("turn", 1);
            setTimeout(announceNext, 30);
        }
    }
}

function announceNext() {
    turn = localStorage.getItem("turn");
    if(turn == 1) {
        blankscreen();
        setTimeout(function(){alert("Click OK to begin " + localStorage.getItem("p1name") + "\'s turn")}, 10);
        setTimeout(populatePlayer1, 20);
        p1red = localStorage.getItem("p1red");
        p1white = localStorage.getItem("p1white");
    }
    else {
        blankscreen();
        setTimeout(function(){alert("Click OK to begin " + localStorage.getItem("p2name") + "\'s turn")}, 10);
        setTimeout(populatePlayer2, 20);
        p2red = localStorage.getItem("p2red");
        p2white = localStorage.getItem("p2white");
    }
}

function getPositions(regexStr) {
    if (regexStr.charAt(2) == regexStr.charAt(regexStr.indexOf("-")+1)) {
        return horizMatch(regexStr);
    } else {
        return vertMatch(regexStr);
    }
}

function vertMatch(regexStr) {
    var alphabet = ["A","B","C","D","E","F","G","H","I","J"];
    var placements = [];
    var let1 = alphabet.indexOf(regexStr.charAt(2));
    var let2 = alphabet.indexOf(regexStr.charAt(regexStr.indexOf("-")+1));
    while(let1 <= let2) {
        placement = alphabet[let1] + regexStr.charAt(3);
        if(regexStr.charAt(4) == "0") {
            placement += "0";
        }
        placements.push(placement);
        let1++;
    }
    return placements;
}

function horizMatch(regexStr) {
    var num1 = regexStr.charAt(3);
    if(regexStr.charAt(7) != "0") {
        var num2 = regexStr.charAt(6);
    }else {
        var num2 = parseInt(regexStr.substring(6,8));
    }
    var placements = [];
    while(num1 <= num2) {
        placements.push(regexStr.charAt(2) + num1);
        num1++;
    }
    return placements;
}

function blankscreen() {
    var allCells = document.getElementsByTagName("td");
    for(i = 0; i < allCells.length; i++) {
            if(allCells[i].id != "label") {
            allCells[i].style.backgroundColor = "lightblue";
            allCells[i].innerHTML = "";
        }
    }
}

function populatePlayer1() {
    p1A = localStorage.getItem("p1A").split(",");
    p1B = localStorage.getItem("p1B").split(",");
    p1S = localStorage.getItem("p1S").split(",");
    p1red = JSON.parse(localStorage.getItem("p1red"));
    p1white = JSON.parse(localStorage.getItem("p1white"));
    p2red = JSON.parse(localStorage.getItem("p2red"));
    p2white = JSON.parse(localStorage.getItem("p2white"));
    for(i = 0; i < p1A.length; i++) {
        document.getElementById(p1A[i] + "_").innerHTML = "A";
    }
    for(i = 0; i < p1B.length; i++) {
        document.getElementById(p1B[i] + "_").innerHTML = "B";
    }
    for(i = 0; i < p1S.length; i++) {
        document.getElementById(p1S[i] + "_").innerHTML = "S";
    }
    for(i = 0; i < p1red.length; i++) {
        document.getElementById(p1red[i]).style.backgroundColor = "red";
    }
    for(i = 0; i < p1white.length; i++) {
        document.getElementById(p1white[i]).style.backgroundColor = "white";
    }
    for(i = 0; i < p2red.length; i++) {
        document.getElementById(p2red[i] + "_").style.backgroundColor = "red";
    }
    for(i = 0; i < p2white.length; i++) {
        document.getElementById(p2white[i] + "_").style.backgroundColor = "white";
    }
}

function populatePlayer2() {
    p2A = localStorage.getItem("p2A").split(",");
    p2B = localStorage.getItem("p2B").split(",");
    p2S = localStorage.getItem("p2S").split(",");
    p2red = JSON.parse(localStorage.getItem("p2red"));
    p2white = JSON.parse(localStorage.getItem("p2white"));
    p1red = JSON.parse(localStorage.getItem("p1red"));
    p1white = JSON.parse(localStorage.getItem("p1white"));
    for(i = 0; i < p2A.length; i++) {
        document.getElementById(p2A[i] + "_").innerHTML = "A";
    }
    for(i = 0; i < p2B.length; i++) {
        document.getElementById(p2B[i] + "_").innerHTML = "B";
    }
    for(i = 0; i < p2S.length; i++) {
        document.getElementById(p2S[i] + "_").innerHTML = "S";
    }
    for(i = 0; i < p2red.length; i++) {
        document.getElementById(p2red[i]).style.backgroundColor = "red";
    }
    for(i = 0; i < p2white.length; i++) {
        document.getElementById(p2white[i]).style.backgroundColor = "white";
    }
    for(i = 0; i < p1red.length; i++) {
        document.getElementById(p1red[i] + "_").style.backgroundColor = "red";
    }
    for(i = 0; i < p1white.length; i++) {
        document.getElementById(p1white[i] + "_").style.backgroundColor = "white";
    }
}

function intersect(a, b) {
    for(i = 0; i < a.length; i++) {
        if(b.includes(a[i])) {
            return true;
        }
    }
    return false;
}

function sunk(needle, haystack) {
    var count = 0;
    for(i = 0; i < needle.length; i++) {
        if(haystack.includes(needle[i])) {
            count++;
        }
    }
    if(count == needle.length) {
        return true;
    }else {
        return false;
    }
}

function gameOver(playerNum) {
    var scores = JSON.parse(localStorage.getItem("scores") || "[]");
    if(playerNum == 1) {
        p1name = localStorage.getItem("p1name");
        p1white = JSON.parse(localStorage.getItem("p2red"));
        var playerDict = {};
        playerDict.name = p1name;
        playerDict.score = 24-(p2red.length*2);
        if(scores == null) {// || scores == "[]") {
            scores = [];
        }
        if(scores.length == 10 && playerDict.score > scores[9].score) {
            scores[9] = playerDict;
        }
        else {
            scores.push(playerDict);
        }
        scores.sort(function(a,b){return b.score-a.score});
        localStorage.setItem("scores", JSON.stringify(scores));
        var str = "";
        for(i = 0; i < scores.length; i++) {
            str += (scores[i].name + ":" + scores[i].score);
        }
        alert("scores:" + str);
    }
    else {
        p2name = localStorage.getItem("p2name");
        p2white = JSON.parse(localStorage.getItem("p1red"));
        var playerDict = {};
        playerDict.name = p2name;
        playerDict.score = 24-(p1red.length*2);
        if(scores == null) {// || scores == "[]") {
            scores = [];
        }
        if(scores.length == 10 && playerDict.score > scores[9].score) {
            scores[9] = playerDict;
        }
        else {
            scores.push(playerDict);
        }
        scores.sort(function(a,b){return b.score-a.score});
        localStorage.setItem("scores", JSON.stringify(scores));
        var str = "";
        for(i = 0; i < scores.length; i++) {
            str += (scores[i].name + ":" + scores[i].score + "/ ");
        }
        alert("High Scores: " + str);
    }
    location.href="gameend.html";
}
