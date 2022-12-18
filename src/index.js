// 1. build & add restaurant cards
function buildCards(eat) {
    //build a restaurant card
    const div = document.createElement("div")
    div.id= `card-${eat.id}`
    div.className = "card"

    const eatsName = document.createElement("h4")
    eatsName.textContent = `${eat.name}`

    const a = document.createElement("a")
    a.href = `${eat.yelp}`

    const eatsImg = document.createElement("img")
    eatsImg.className = "eats-img"
    eatsImg.src = `${eat.image}`
    a.append(eatsImg)

    const eatsInfo = document.createElement("p")
    eatsInfo.innerHTML = `
    <b>Location:</b> ${eat.location} <br>
    <b>Cuisine:</b> ${eat.type} <br>
    <b>Popular Dish:</b> ${eat.popular_dish} <br>`

    const eatsLike = document.createElement("button")
    eatsLike.className = "like-status"
    eatsLike.textContent = `${eat.likes} Likes`

    const plus = document.createElement("button")
    plus.className = "plus"
    plus.textContent = "+"

    const minus = document.createElement("button")
    minus.className = "minus"
    minus.textContent = "-"

    
    // add restaurant card to DOM
    div.append(eatsName, a, eatsInfo, minus, eatsLike, plus);
    document.getElementById("eats-cards").appendChild(div);


    // modify likes
    div.querySelector(".plus").addEventListener("click", plusLikes);
    function plusLikes() {
        eat.likes += 1;
        div.querySelector(".like-status").textContent = `${eat.likes} Likes`;
        modifyLikes(eat);
    }

    div.querySelector(".minus").addEventListener("click", minusLikes);
    function minusLikes() {
        eat.likes -= 1;
        div.querySelector(".like-status").textContent = `${eat.likes} Likes`;
        modifyLikes(eat);
    }


    // change opacity when mouseover
    div.querySelector(".eats-img").addEventListener("mouseover", makeDim);
    function makeDim() {
        div.querySelector(".eats-img").style.opacity = "0.5";
    }

    div.querySelector(".eats-img").addEventListener("mouseout", revert);
    function revert() {
        div.querySelector(".eats-img").style.opacity = "1";
    }
}

function getCards() {
     // fetch data from JSON server
    fetch("http://localhost:3000/restaurants")
    .then(res => res.json())
    .then(eats => eats.forEach(eat => {
        buildCards(eat);
        returnEats(eat);
    }))   
}

getCards();




// 2. submit new restaurant info
const newSubmit = document.querySelector(".add-eats");
newSubmit.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
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




// 3. add / subtract likes
function modifyLikes(eats) {
    fetch(`http://localhost:3000/restaurants/${eats.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(eats),
      })
      .then(res => res.json())
      .then(eats => console.log(eats))
    
}


// 4. return restaurant(s) based on cuisine
function returnEats(eat) {
    const findSubmit = document.querySelector(".find-eats");
    findSubmit.addEventListener("submit", submitEvent)
    
    function submitEvent(e){
        // display cards that match user's craving
        e.preventDefault();
        const card = document.querySelector(`#card-${eat.id}`)
        console.log(e)
        if (e.target[0].value !== eat.type) {
            card.style.display = "none";
        } 

        // remove display = "none" when user chooses a different cuisine
        const select = document.querySelector(".cravings-submit");
        select.addEventListener("click", () => card.style.display = "")

    }
}

