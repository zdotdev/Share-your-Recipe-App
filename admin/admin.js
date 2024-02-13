async function editDish(body,   id){
    const data = await fetch(`http://localhost:3000/dish/editDish/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })
    console.log(data);
}


const addDishIngredients = document.getElementById("add-dish-ingredients")

function adjustTextAreaHeight(element){
    element.addEventListener("keyup", (scrollHeightValue) => {
        element.style.height = "26px"
        let scrlHeight = scrollHeightValue.target.scrollHeight
        // console.log(scrlHeight)
        element.style.height = `${scrlHeight}px`;
    })
}
adjustTextAreaHeight(addDishIngredients)