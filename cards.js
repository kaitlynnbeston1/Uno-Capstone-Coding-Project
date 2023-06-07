var rendering = true
var colors = ["red", "green", "blue", "yellow"]; //All colors for Uno deck.
var values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "skip", "reverse", "draw2"]; // All numerical card values.
var wilds = ["wild", "draw4"] // Wild card variables for the deck.
var turn = 0
var players = []
var move = 1
var renderedHand = []
var discard = []


class Player {
    constructor(name, turnNum) {
        this.name = name;
        this.turnNum = turnNum
        this.hand = [];
    } // End constructor
} // End class.

function setPlayers() {
    // Creates classes with players.
    while (true) {
        window.playersNum = parseInt(prompt("How many people are playing?"));
        if (!isNaN(playersNum)) {
            break;
        } // End if.
        else {
            continue;
        }// End else
    } // End while
    let t = 0
    while (true) {
        let pNum = t + 1;
        let n = prompt("Player" + pNum + ", What is your name?");
        window["p" + pNum] = new Player(n, pNum);
        eval("players.push(" + "p" + pNum + ")");
        t += 1
        if (t == playersNum) {
            break;
        } // End if
    } // End while. 
    console.log(players)
} // End function.


function incrementTurn() {
    // Increments turn number. Used to manage whose turn it is and to skip/reverse.
    turn += move
    if (turn == players.length) {
        turn = 0;
    }// End if.
    else if (turn < 0) {
        let n = players.length - 1
        turn = n
    } // End else.
    rendering = true
} // End function.


function createDeck() {
    // Creating a deck of cards.
    let deck = new Array();
    for (let item = 0; item < colors.length; item++) {
        for (let v = 0; v < values.length; v++) {
            let card = { color: colors[item], value: values[v] };
            deck.push(card);
        } // End loop 2.
    } // End loop 1.
    for (let item = 0; item < colors.length; item++) {
        for (let v = 0; v < values.length; v++) {
            let card = { color: colors[item], value: values[v] };
            deck.push(card);
        } // End loop 2.
    } // End loop 1.

    for (let w = 0; w < 4; w++) {
        let card = { color: "black", value: wilds[0] }
        deck.push(card)
    } //End for loop 1
    for (let w = 0; w < 4; w++) {
        let card = { color: "black", value: wilds[1] }
        deck.push(card)
    }
    return deck;
} // End function.

function shuffle(deck) {
    // Shuffling the deck 1,500 times.
    for (let item = 0; item < 1500; item++) {
        let location1 = Math.floor((Math.random() * deck.length));
        let location2 = Math.floor((Math.random() * deck.length))
        let tmp = deck[location1];
        deck[location1] = deck[location2]
        deck[location2] = tmp
    } // End for loop 1.
} // End function.


function getCard(fromDeck) {
    // Deals one card.
    return fromDeck.pop();
} // End function.

function drawCards(d, h, n) {
    for (let draw = 0; draw < n; draw++) {
        card = getCard(d);
        h.push(card)
    } // End for loop.
} // End function.


function displayCards(el, what) {
    if (what === "skip") {
        el.innerText = "X"
    } // End if.
    else if (what === "draw2") {
        el.innerText = "+2"
    }// End else if #1
    else if (what === "reverse") {
        el.innerText = "\u2923"
    } // End else if #2
    else if (what == "wild") {
        el.innerText = "W"
    } // End else if #3
    else if (what == "draw4") {
        el.innerText = "+4"
    }// End else if #4
    else {
        el.innerText = what;
    } //end else.
} // End function.


function renderTopCard() {
    // Shows top card to users.
    let n = discard.length
    n -= 1
    let topCard = discard[n]
    let d = document.getElementById("tc-div")
    let tcr = document.getElementById("top-card")
    let acc = document.getElementById("access")
    d.removeChild(tcr);
    d.removeChild(acc);
    let cd = document.createElement("p");
    displayCards(cd, topCard.value);
    cd.setAttribute("id", "top-card")
    cd.classList.add(topCard.color, topCard.value);
    cd.ariaHidden = true
    d.appendChild(cd);
    var accessibility = document.createElement("p");
    accessibility.innerText = "Top card," + " " + topCard.color + " " + topCard.value
    accessibility.setAttribute("class", "sr")
    accessibility.setAttribute("id", "access")
    d.appendChild(accessibility);
} // End function.


function chooseColor() {
    // Chooses the color of a wild card when it is played.
    var n = discard.length - 1
    var topCard = discard[n]
    var selecting = true
    while (selecting) {
        let choice = prompt("Choose a color. Blue, green, red, or yellow.")
        if (choice == "red") {
            topCard.color = "red";
            selecting = false;
        }// End if.
        else if (choice == "blue") {
            topCard.color = "blue";
            selecting = false;
        } // End else if #1.
        else if (choice == "yellow") {
            topCard.color = "yellow";
            selecting = false;
        } // End else if #2
        else if (choice == "green") {
            topCard.color = "green";
            selecting = false;
        } // End else if #3
        else {
            continue;
        } // End else.

    }// End while.
    rendering = true
} // End function.

function doSomething() {
    let n = discard.length - 1;
    let card = discard[n];
    if (card.value == "reverse") {
        move *= -1;
        incrementTurn();
    }// End if.
    else if (card.value == "wild") {
        chooseColor();
        incrementTurn();
    } // End else if.
    else if (card.value == "skip") {
        for (let i = 0; i < 2; i++) {
            incrementTurn();
        } // End for loop.
    } // End else if.
    else if (card.value = "draw2") {
        drawCards(d1, players[turn + 1].hand, 2);
        for (let i = 0; i < 2; i++) {
            incrementTurn();
        } // End for loop.
    } // End else if.
    else if (card.value = "draw4") {
        chooseCard();
        drawCards(d1, players[turn + 1].hand, 4);
        for (let i = 0; i < 2; i++) {
            incrementTurn();
        } // End for loop.
    } // End else if.
    else {
        incrementTurn();
    }
} // End function.


function placeCard(toPlace, h) {
    // Places card and renders hand+discard to reflect change.
    var topEl = document.getElementById("top-card")
    let tc = topEl.className
    let splitTc = tc.split(" ");
    let splitCl = toPlace.split(" ");
    let tcObj = { color: splitTc[0], value: splitTc[1] }
    let clObj = { color: splitCl[0], value: splitCl[1] }
    console.log(tcObj)
    console.log(clObj)
    if (tcObj.color == clObj.color || tcObj.value == clObj.value || tcObj.color == "black") {
        console.log(h)
        let index = -1
        for (let i = 0, len = h.length; i < len; i++) {
            if (h[i].color == clObj.color && h[i].value == clObj.value) {
                index = i;
                break;
            } // End if
        } // End for loop.
        console.log(index)
        let card = h.splice(index, 1);
        let moving = card.pop()
        discard.push(moving);
    } // End if.
    else {
        console.log("error.")
    } // end else. 
} // end function


function render(deck, where) {
    // Clears old cards and shows new ones.
    for (let card = 0; card < renderedHand.length; card++) {
        renderedHand[card].remove();
    } // End for loop.
    for (let c = 0; c < deck.length; c++) {
        let cd = document.createElement("button");
        displayCards(cd, deck[c].value)
        cd.classList.add(deck[c].color, deck[c].value)
        cd.ariaLabel = deck[c].color + " " + deck[c].value
        cd.onclick = function () {
            let cl = event.target.className;
            placeCard(cl, players[turn].hand);
            doSomething();
            rendering = true
        }
        document.getElementById(where).appendChild(cd);
        renderedHand.push(cd);
    } //End for loop
} // End function


function renderHeader() {
    // Renders header to say whose turn it is.
    let headerEl = document.getElementById("header-el");
    let headerInfo = document.getElementById("header-info");
    headerEl.removeChild(headerInfo);
    let newHeader = document.createElement("h1");
    newHeader.innerText = players[turn].name + "'s turn.";
    newHeader.setAttribute("id", "header-info")
    headerEl.appendChild(newHeader);
} // End function



function setup() {
    // Setting the players.
    setPlayers();

    // Creating deck.
    var d1 = createDeck();
    shuffle(d1);
    // Creating and rendering discard.
    drawCards(d1, discard, 1);
    renderTopCard();
    // Creating the draw card button.
    let drawDiv = document.getElementById("draw-div");
    let dbt = document.createElement("button");
    dbt.innerText = "+";
    dbt.onclick = function () {
        drawCards(d1, players[turn].hand, 1);
        render(player[turn].hand, "hand-el");
    }// End function

    dbt.ariaLabel = "Draw card";
    dbt.setAttribute("id", "draw-btn")
    drawDiv.appendChild(dbt)

    // Playing the game.
    // Drawing hand.
    for (let i = 0; i < players.length; i++) {
        drawCards(d1, players[i].hand, 7);
    } // End for loop.
}//end function
setup();
rendering = true

do {
    render(players[turn].hand, "hand-el");
    renderTopCard();
    renderHeader();
    rendering = false;
    break;
} // end do
while (rendering = true);

