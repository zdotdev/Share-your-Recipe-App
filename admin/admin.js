async function editDish(body, id){
    const data = await fetch(`http://localhost:3000/dish/editReceipt/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })
    console.log(await data.json());
}

async function getAllDish(){
    try{
        const data = await fetch("http://localhost:3000/dish")
        let dish = await data.json()
        document.getElementById("data").innerHTML +=`
        <h1>${dish.dishes[0]._id}<h1>
        `
        console.log(dish.dishes[0]._id);
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
