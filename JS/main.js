let dishContainer = document.getElementById("dish-container")

function card(data){
    Object.values(data.dishes).forEach(dish => {
        dishContainer.innerHTML += `
        <div class="card">
            <img src="${dish.dishImage}" alt="dish-image" class="dish-image">
            <h2 class="dish-name">${dish.dishName} <span id="dish-id" style="display: none">${dish._id}</span></h2>
            <h4>Ingredients:</h4>
            <p class="dish-ingredients">${dish.dishIngredients.slice(0, 50)}...</p>
            <h4>Procedure:</h4>
            <p class="dish-procedure">${dish.dishProcedure.slice(0, 50)}...</p>
        </div>`
    });
}

function imageDisplay(data){
    document.getElementById("image-container").innerHTML += `
    <img src="${data.dishes[0].dishImage}" alt="food image" class="food-image image-one">
    <img src="${data.dishes[1].dishImage}" alt="food image" class="food-image image-two">
    <img src="${data.dishes[2].dishImage}" alt="food image" class="food-image image-three">
    `
}

async function getAllDishes(){
    try{
        const data = await fetch("http://localhost:3000/dish")
        const dish = await data.json()
        dishContainer.innerHTML = ""
        card(dish)
        imageDisplay(dish)
    }
    catch(err){
        console.log(err)
        dishContainer.innerHTML = ""
        dishContainer.innerHTML += '<h2 class="error-message">Server connection error: Failed to fetch data :(</h2>'
    }
}
getAllDishes()

window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    const cards = document.querySelectorAll(".card")
    const navbar = this.document.getElementById("navbar")
    let lastScrollTop = document.documentElement.scrollTop;

    window.addEventListener('scroll', function() {
        const currentScroll = document.documentElement.scrollTop;
        if (currentScroll > lastScrollTop) {
            navbar.classList.remove("normal-pos")
            navbar.classList.add("move-up")
            if(scrollPercentage.toFixed(2) >= 20.00){
                cards.forEach(card => {
                    card.classList.add("translate")
                })
            }
        }
        if(currentScroll < lastScrollTop){
            navbar.classList.add("normal-pos")
            navbar.classList.remove("move-up")
        }
        lastScrollTop = currentScroll;
    });
});

dishContainer.addEventListener("click", (event) => {
    const card = event.target.closest(".card")
    if(card){
        const dishID = card.querySelector("#dish-id").textContent
        window.location.href = "dish/dish.html?id=" + dishID
    }
})

window.onload = function () {
    window.scrollTo(0, 0);
}
const searchInput = document.getElementById("search-input")

searchInput.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        fetchDishByName(searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1))
        window.location.href = "#main-dish-container"
    }
})

async function fetchDishByName(name){
    try{
        const data = await fetch(`http://localhost:3000/dish/dishName/${name}`)
        const dishByName = await data.json()
        if(dishByName.status == 404){
            dishContainer.innerHTML = ""
            dishContainer.innerHTML = '<h2 class="error-message">Error: No dish found. Try check your input or contact us to update dishes :(</h2>'
        }else(
            getDishByName(dishByName)
        )
        console.log(dishByName)
    }
    catch(err){
        console.log(err)
    }
}

function getDishByName(dish){
    dishContainer.innerHTML = ""
    dishContainer.innerHTML = `
        <div class="card">
            <img src="./public/img/chicken-adobo_008.jpeg" alt="dish-image" class="dish-image">
            <h2 class="dish-name">${dish.dishes.dishName} <span id="dish-id" style="display: none">${dish._id}</span></h2>
            <h4>Ingredients:</h4>
            <p class="dish-ingredients">${dish.dishes.dishIngredients.slice(0, 50)}...</p>
            <h4>Procedure:</h4>
            <p class="dish-procedure">${dish.dishes.dishProcedure.slice(0, 50)}...</p>
        </div>`
}