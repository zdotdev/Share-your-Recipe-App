async function editDish(body, id){
    const data = await fetch(`http://localhost:3000/dish/editReceipt/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })
    console.log(await data.json());
}

async function deleteDish(id){
    try{
        const data = await fetch(`http://localhost:3000/dish/deleteReceipt/${id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: ""
        })
        console.log(await data.json())
    }
    catch(err){
        console.log(err)
    }
}

function card(data){
    Object.values(data.dishes).forEach(dish => {
        document.getElementById("data").innerHTML += `
        <div class="dish-div">
            <h2>${dish.dishName}</h2>
            <h3>${dish._id}</h3>
            <p>${dish.dishIngredients}</p>
            <p>${dish.dishProcedure}</p>
        </div>
        `
    });
}

async function getAllDish(){
    try{
        const data = await fetch("http://localhost:3000/dish")
        let dish = await data.json()
        card(dish)
        console.log(dish);
    }
    catch(err){
        console.log(err)
    }
    
}
getAllDish()

document.getElementById("edit-dish-button").addEventListener("click", () => {
    const dishID = document.getElementById("edit-dish-ID").value
    const data = {
        dishName: document.getElementById("edit-dish-name").value,
        dishIngredients: editDishIngredients.value,
        dishProcedure: editDishProcedure.value
    }
    editDish(data, dishID)
})

document.getElementById("delete-dish-button").addEventListener("click", () => {
    const dishID = document.getElementById("delete-dish-ID").value
    deleteDish(dishID)
})

const addDishIngredients = document.getElementById("add-dish-ingredients")
const addDishProcedure = document.getElementById("add-dish-procedure")
const editDishIngredients = document.getElementById("edit-dish-ingredients")
const editDishProcedure = document.getElementById("edit-dish-procedure")

function adjustTextAreaHeight(element){
    element.addEventListener("keyup", (scrollHeightValue) => {
        element.style.height = "26px"
        let scrlHeight = scrollHeightValue.target.scrollHeight
        element.style.height = `${scrlHeight}px`;
    })
}
adjustTextAreaHeight(addDishIngredients)
adjustTextAreaHeight(addDishProcedure)
adjustTextAreaHeight(editDishIngredients)
adjustTextAreaHeight(editDishProcedure)
