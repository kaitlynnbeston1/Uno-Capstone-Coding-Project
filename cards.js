var colors = ["red", "green", "blue", "yellow"]; //All colors for Uno deck.
var values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "skip", "reverse", "draw2"]; // All numerical card values.
var wilds = ["wild", "draw4"] // Wild card variables for the deck.
var hand = []


function createDeck() {
    // Creating a deck of cards.
    let deck = new Array();
    for (let item = 0; item < colors.length; item++) {
        for (let v = 0; v < values.length; v++) {
            let card = { value: values[v], color: colors[item] };
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

function render(deck, where) {
    // Shows cards of choice.
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
        cd.setAttribute("class", deck[c].color);
        cd.ariaLabel = deck[c].color + " " + deck[c].value
        document.getElementById(where).appendChild(cd);

    } //End for loop
} // End function


// Creating the deck and draw card button.
d1 = createDeck();
let drawDiv = document.getElementById("draw-div");
let dbt = document.createElement("button");
dbt.innerText = "+";
dbt.ariaLabel = "Draw card";
dbt.setAttribute("id", "draw-btn")
drawDiv.appendChild(dbt)

// Playing the game.
shuffle(d1);
drawCards(d1, hand, 7);
render(hand, "hand-el");

