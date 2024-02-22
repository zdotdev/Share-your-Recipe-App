const urlParams = new URLSearchParams(window.location.search)
const getID = urlParams.get('id')
let fullDishDetails = document.getElementById("full-dish-details")

async function getData(){
    try{
        const data = await fetch(`http://localhost:3000/dish/${getID}`)
        const dish = await data.json()
        showDish(dish)
    }
    catch(err){
        console.log(err)
    }
}
getData()
function showDish(data){
    fullDishDetails.innerHTML =`
        <div class="full-card-dish-details">
            <a class="material-symbols-outlined close-button" id="close-button">Keyboard_Return</a>
            <img src="../public/img/chicken-adobo_008.jpeg" alt="full-dish-image-detail" class="full-dish-image-detail">
            <h2 class="full-dish-name-detail">${data.dishes.dishName}</h2>
            <h4>Ingredients:</h4>
            <p class="full-dish-ingredients-detail">${data.dishes.dishIngredients}</p>
            <h4>Procedure:</h4>
            <p class="full-dish-procedure-detail">${data.dishes.dishProcedure}</p>
        </div>
    `
}
fullDishDetails.addEventListener("click", event => {
    const closeButton = event.target.closest("#close-button")
    if(closeButton){
        window.location.href = "/index.html"
    }
})