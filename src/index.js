
// 1. build & add restaurant cards
function buildCards(eat) {
    let card = document.createElement("li");
    card.className = "card";

    // build restaurant card
    card.innerHTML = `
    <div class="card">
    <h4>${eat.name}</h4>
    <a href=${eat.yelp}><img src=${eat.image} class="eats-img" id=${eat.id}></a>
    <p><b>Location:</b> ${eat.location}</p>
    <p><b>Cuisine:</b> ${eat.type}</p>
    <p><b>Popular Dish:</b> ${eat.popular_dish}</p>
    <button class="like-button" id=${eat.id}> Likes</button>
    <div>`

    // add card to the DOM
    document.getElementById("eats-cards").appendChild(card);
}

function getCards() {
     // fetch data from JSON server
    fetch("http://localhost:3000/restaurants")
    .then(res => res.json())
    .then(eats => eats.forEach(eat => buildCards(eat)))   
}

getCards();




// 2. submit new restaurant info

// const formSubmit = document.querySelector(".add-eats")
// formSubmit.addEventListener("submit", handleSubmit)

function handleSubmit() {
    const formSubmit = document.querySelector(".add-eats")
    formSubmit.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(e)
        let newObj = {
                "name": e.target[0].value,
                "location": e.target[1].value,
                "yelp": e.target[2].value,
                "image": e.target[3].value,
                "type": e.target[4].value,
                "popular_dish": e.target[5].value
        }
    submitInfo(newObj);
    })
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

handleSubmit();

// 3. likes
let likes = 0