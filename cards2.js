var colors = ["red", "green", "blue", "yellow"]; //All colors for Uno deck.
var values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "skip", "reverse", "draw2"]; // All numerical card values.
var wilds = ["wild", "draw4"] // Wild card variables for the deck.
var turns = new Array();
var turn = 0
var eventList = {}
var eCount = 0
var players = []
var renderedHand = []
var discard = []


class Player {
    constructor(name, turnNum) {
        this.name = name;
        this.turnNum = turnNum
        this.hand = [];
        this.isTurn = false;
    } // End constructor
} // End class.

function setPlayers() {
    while (true) {
        var playersNum = parseInt(prompt("How many people are playing?"));
        if (!isNaN(playersNum)) {
            break;
        } // End if.
        else {
            continue;
        }// End else
    } // End while
    for (let count = 1; count <= playersNum; count++) {
        turns.push(count)
    } // End for loop.
    var t = 0
    while (t < turns.length) {
        let t1 = t + 1
        let chosenPlayer = turns[t];
        let n = prompt("Player" + chosenPlayer + ", What is your name?");
        window["p" + t1] = new Player(n, t1);
        eval("players.push(" + "p" + t1 + ")");
        t += 1
        t1 += 1
        if (t == turns.length) {
            creating = false
        } // End if
    } // End while. 
    console.log(players)
} // End function.


function getTurn() {
    for (let i = 0; i < players.length; i++) {
        let num = players[i].turnNumber
        if (num == turns[turn]) {
            players[num].isTurn = true
            return players[num];
            break;
        } // End if.
    } // End for loop.
} // End function.


function incrementTurn() {
    // Increments turn number. Used to manage whose turn it is and to skip.
    turn += 1
    if (turn == turns.length) {
        turn = 0
    }// End if.
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
    cd = document.createElement("p")
    if (topCard.value === "skip") {
        cd.innerText = "X"
    } // End if.
    else if (topCard.value === "draw2") {
        cd.innerText = "+2"
    }// End else if #1
    else if (topCard.value === "reverse") {
        cd.innerText = "\u2923"
    } // End else if #2
    else if (topCard.value === "wild") {
        cd.innerText = "W"
    } // End else if #3
    else if (topCard.value == "draw4") {
        cd.innerText = "+4"
    }// End else if #4
    else {
        cd.innerText = topCard.value;
    } //end else.
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
        let choice = prompt("Choose a color. \n Blue, green, red, or yellow.")
        if (choice == "red") {
            topCard.color = "red";
            renderTopCard();
            selecting = false;
        }// End if.
        else if (choice == "blue") {
            topCard.color = "blue";
            renderTopCard();
            selecting = false;
        } // End else if #1.
        else if (choice == "yellow") {
            topCard.color = "yellow";
            renderTopCard();
            selecting = false;
        } // End else if #2
        else if (choice == "green") {
            topCard.color = "green";
            renderTopCard();
            selecting = false;
        } // End else if #3
        else {
            continue;
        } // End else.
    }// End while.
} // End function.

function doSomething(card) {
    if (card.value == "reverse") {
        turns.reverse();
    }// End if.
    else if (card.value == "wild") {
        chooseColor();
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
        renderTopCard();
        render(h, "hand-el");
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
        // Making the buttons look more Uno-ish for sighted players.
        if (deck[c].value === "skip") {
            cd.innerText = "X"
        } // End if.
        else if (deck[c].value === "draw2") {
            cd.innerText = "+2"
        }// End else if #1
        else if (deck[c].value === "reverse") {
            cd.innerText = "\u2923"
        } // End else if #2
        else if (deck[c].value === "wild") {
            cd.innerText = "W"
        } // End else if #3
        else if (deck[c].value == "draw4") {
            cd.innerText = "+4"
        }// End else if #4
        else {
            cd.innerText = deck[c].value;
        } //end else.
        cd.classList.add(deck[c].color, deck[c].value)
        cd.ariaLabel = deck[c].color + " " + deck[c].value
        cd.onclick = function () {
            let msg = "placed card."
            eCount += 1
            eval("eventList" + eCount + " = " + msg)
            let cl = event.target.className
            placeCard(cl, hand);
        }
        document.getElementById(where).appendChild(cd);
        renderedHand.push(cd);
    } //End for loop
} // End function


// Creating deck.
d1 = createDeck();
shuffle(d1);
// Creating and rendering discard.
drawCards(d1, discard, 1);
renderTopCard();
// Creating the draw card button.
let drawDiv = document.getElementById("draw-div");
let dbt = document.createElement("button");
dbt.innerText = "+";
dbt.onclick = function () {
    eCount += 1
    let msg = "drew card"
    eval("eventList" + eCount + " = " + msg);
    drawCards(d1, hand, 1);
    render(hand, "hand-el");
}
dbt.ariaLabel = "Draw card";
dbt.setAttribute("id", "draw-btn")
drawDiv.appendChild(dbt)

// Playing the game.
// Drawing hand.
for (let i = 0; i < players.length; i++) {
    drawCards(d1, players[i].hand, 7);
} // End for loop.
// render(hand, "hand-el");
while (true) {

}

