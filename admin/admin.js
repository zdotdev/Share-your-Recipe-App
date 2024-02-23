const reader = new FileReader();
async function editDish(body, id){
    try{
        const data = await fetch(`http://localhost:3000/dish/editReceipt/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        console.log(await data.json());
        window.location.reload()
    }
    catch(err){
        console.log(err)
    }
}

async function deleteDish(id){
    try{
        const data = await fetch(`http://localhost:3000/dish/deleteReceipt/${id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: ""
        })
        console.log(await data.json())
        window.location.reload()
    }
    catch(err){
        console.log(err)
    }
}

async function addDish(newDish){
    try{
        const data = await fetch("http://localhost:3000/dish/addReceipt", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(newDish)
        })
        console.log(await data.json())
        window.location.reload()
    }
    catch(err){
        console.log(err)
    }
}

document.getElementById("edit-dish-name").addEventListener("click", async () => {
    const dishID = document.getElementById("edit-dish-ID").value
    try{
        const data = await fetch(`http://localhost:3000/dish/${dishID}`)
        const dish = await data.json()
        document.getElementById("edit-dish-name").value = dish.dishes.dishName
        document.getElementById("edit-dish-ingredients").value = dish.dishes.dishIngredients
        document.getElementById("edit-dish-procedure").value = dish.dishes.dishProcedure
        console.log(data)
    }
    catch(err){
        console.log(err)
    }
})

function card(data){
    document.getElementById("data").innerHTML = ""
    Object.values(data.dishes).forEach(dish => {
        document.getElementById("data").innerHTML += `
        <div class="dish-div">
            <img src="${dish.dishImage}" alt="dish image" class="admin-image">
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
    }
    catch(err){
        console.log(err)
    }
    
}
getAllDish()

document.getElementById("edit-dish-button").addEventListener("click", () => {
    const imageFile = document.querySelector("#edit-dish-image").files[0]
    const dishID = document.getElementById("edit-dish-ID").value
    reader.onloadend = function() {
        const base64String = reader.result
        const data = {
            dishName: document.getElementById("edit-dish-name").value,
            dishIngredients: editDishIngredients.value,
            dishProcedure: editDishProcedure.value,
            dishImage : base64String
        }
        editDish(data, dishID)
    }
    reader.readAsDataURL(imageFile)
})

document.getElementById("delete-dish-button").addEventListener("click", () => {
    const dishID = document.getElementById("delete-dish-ID").value
    deleteDish(dishID)
    window.location.reload
})

document.getElementById("add-dish-button").addEventListener("click", () => {
    const imageFile = document.querySelector("#add-dish-image").files[0];
    reader.onloadend = function () {
        const base64String = reader.result;
        const data = {
            dishName: document.getElementById("add-dish-name").value,
            dishIngredients: addDishIngredients.value,
            dishProcedure: addDishProcedure.value,
            dishImage : base64String
        }
        addDish(data)
    };
    reader.readAsDataURL(imageFile);
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
