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

document.getElementById("add-receipt-button").onclick = () => {
    const data = {
        dishName: document.getElementById("dish-name").value,
        dishIngredients: document.getElementById("dish-ingredients").value,
        dishProcedure: document.getElementById("dish-procedure").value
    }

    addNewReceipt(data)
    location.reload()
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

document.getElementById("delete-button").onclick = () => {
    const id = document.getElementById("delete-input").value
    deleteReceipt(id)
}

async function deleteReceipt(receiptID){
    try{
        const data = await fetch(`http://localhost:3000/dish/deleteReceipt/${receiptID}`,{
            method: "DELETE",
            headers:{"Content-Type": "application/json"},
            body: ""
        })
        console.log(await data.json());
    }
    catch(err){
        console.log(err)
    }
}

document.getElementById("edit-button").onclick = () => {
    const id = document.getElementById("edit-dishID").value
    const data = {
        dishName: document.getElementById("edit-dishName").value,
        dishIngredients: document.getElementById("edit-dishIngredients").value,
        dishProcedure: document.getElementById("edit-dishProcedure").value
    }
    editReceipt(id, data)
    location.reload()
}

async function editReceipt(editedReceiptID, editedReceiptData){
    try{
        const data = await fetch(`http://localhost:3000/dish/editReceipt/${editedReceiptID}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(editedReceiptData)
        })
        console.log(await data.json())
    }
    catch(err){
        console.log(err)
    }
}