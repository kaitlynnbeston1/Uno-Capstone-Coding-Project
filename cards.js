var colors = ["red", "green", "blue", "yellow"]; //All colors for Uno deck.
var values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "skip", "reverse", "draw2"]; // All numerical card values.
var wilds = ["wild", "draw4"] // Wild card variables for the deck.
var hand = []
var renderedHand = []
var discard = []


function createDeck() {
    // Creating a deck of cards.
    let deck = new Array();
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
    drawCards(d1, hand, 1);
    render(hand, "hand-el");
}
dbt.ariaLabel = "Draw card";
dbt.setAttribute("id", "draw-btn")
drawDiv.appendChild(dbt)

// Playing the game.
// Drawing hand.
drawCards(d1, hand, 7);
render(hand, "hand-el");


