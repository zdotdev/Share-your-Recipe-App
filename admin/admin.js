async function editDish(body,   id){
    const data = await fetch(`http://localhost:3000/dish/editDish/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })
    console.log(data);
}


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
