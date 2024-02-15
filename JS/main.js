function card(data){
    Object.values(data.dishes).forEach(dish => {
        document.getElementById("section").innerHTML += `
        <div class="card">
            <h2 class="dish-name">${dish.dishName}</h2>
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
