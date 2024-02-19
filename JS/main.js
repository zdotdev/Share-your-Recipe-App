function card(data){
    document.getElementById("dish-container").innerHTML = ""
    Object.values(data.dishes).forEach(dish => {
        document.getElementById("dish-container").innerHTML += `
        <div class="card">
            <img src="./public/img/chicken-adobo_008.jpeg" alt="dish-image" class="dish-image">
            <h2 class="dish-name">${dish.dishName}</h2>
            <h4>Ingredients</h4>
            <p class="dish-ingredients">${dish.dishIngredients}...</p>
            <h4>Procedure</h4>
            <p class="dish-procedure">${dish.dishProcedure.slice(0, 200)}...</p>
        </div>`
    });
}

async function getAllDishes(){
    try{
        const data = await fetch("http://localhost:3000/dish")
        const dishName = await data.json()
        card(dishName)
    }
    catch(err){
        console.log(err)
    }
}
getAllDishes()

window.addEventListener('scroll', function() {
    const dishContainer = document.getElementById("dish-container")
    if(dishContainer.querySelector(".card")){
        console.log("true")
    }else{
        console.log("false");
    }

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