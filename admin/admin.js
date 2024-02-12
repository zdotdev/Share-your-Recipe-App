async function editDish(body,   id){
    const data = await fetch(`http://localhost:3000/dish/editDish/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })
    console.log(data);
}


const textarea = document.getElementById("add-dish-ingredients")
textarea.addEventListener("keyup", (scrollHeightValue) => {
    textarea.style.height = "24px"
    let scrlHeight = scrollHeightValue.target.scrollHeight
    // console.log(scrlHeight)
    textarea.style.height = `${scrlHeight}px`;
})