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
    <button class="like-button" id=${eat.id}>Like 💛</button>
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