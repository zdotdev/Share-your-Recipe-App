function card(data){
    Object.values(data.dishes).forEach(dish => {
        document.getElementById("section").innerHTML += `
        <div class="card">
        <h2 class="dish-name">${dish.dishName}</h2>
        <p class="dish-procedure">${dish.dishProcedure}</p>
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

document.getElementById("add-receipt-button").onclick = () => {
    const data = {
        dishName: document.getElementById("dish-name").value,
        dishIngredients: document.getElementById("dish-ingredients").value,
        dishProcedure: document.getElementById("dish-procedure").value
    }

    addNewReceipt(data)
}

async function addNewReceipt(newReceipt){
    try{
        const data = await fetch("http://localhost:3000/dish/addReceipt", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newReceipt)
        })
        console.log(await data.json())
    }
    catch(err){
        console.log(err);
    }
}