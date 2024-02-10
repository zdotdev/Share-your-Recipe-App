function testing(data){
    Object.values(data.dishes).forEach(dish => {
        document.getElementById("main").innerHTML += `<h1>${dish.dishName}</h1>`
        console.log(`Dish Name: ${dish.dishName}`);
    });
}


async function getAllDishes(){
    try{
        const data = await fetch("http://localhost:3000/dish")
        const dishName = await data.json()
        testing(dishName)
    }
    catch(err){
        console.log(err)
    }
}
getAllDishes()
