
// 1. build & add restaurant cards
function buildCards(eat) {
    const div = document.createElement("div")
    div.className = "card"

    const eatsName = document.createElement("h4")
    eatsName.textContent = `${eat.name}`

    const eatsYelp = document.createElement("a")
    eatsYelp.href = `${eat.yelp}`

    const eatsImg = document.createElement("img")
    eatsImg.className = "eats-img"
    eatsImg.src = `${eat.image}`
    

    eatsYelp.append(eatsImg)

    const eatsInfo = document.createElement("p")
    eatsInfo.innerHTML = `
    <b>Location:</b> ${eat.location} <br>
    <b>Cuisine:</b> ${eat.type} <br>
    <b>Popular Dish:</b> ${eat.popular_dish} <br>`

    const eatsLike = document.createElement("button")
    eatsLike.className = "like-button"
    eatsLike.textContent = `${eat.likes} Likes`

    const plus = document.createElement("button")
    plus.className = "plus"
    plus.textContent = "+"

    const minus = document.createElement("button")
    minus.className = "minus"
    minus.textContent = "-"

    

    div.append(eatsName, eatsYelp, eatsInfo, plus, eatsLike, minus)

    const eatCards = document.querySelector("#eat-cards")
    document.getElementById("eats-cards").appendChild(div);

}


function getCards() {
     // fetch data from JSON server
    fetch("http://localhost:3000/restaurants")
    .then(res => res.json())
    .then(eats => eats.forEach(eat => buildCards(eat)))   
}

getCards();

// 2. submit new restaurant info

const formSubmit = document.querySelector(".add-eats")
formSubmit.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
    e.preventDefault();
    console.log(e)
    let newObj = {
            "name": e.target[0].value,
            "location": e.target[1].value,
            "yelp": e.target[2].value,
            "image": e.target[3].value,
            "type": e.target[4].value,
            "popular_dish": e.target[5].value,
            "likes": 0
        }
    submitInfo(newObj);
}



function submitInfo(newObj) {
    fetch("http://localhost:3000/restaurants", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(newObj)
    })
    .then (res => res.json())
    .then (eats => console.log(eats))
}



// 3. hover over image event
// const eatsImg = document.querySelector(".eats-img")

// document.addEventListener("DOMContentLoaded", () => {
//     eatsImg.addEventListener("click", () => console.log("I was clicked"))

// })

// document.getElementsByClassName(".eats-cards").querySelectorAll("div.card img")