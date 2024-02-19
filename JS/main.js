function card(data){
    Object.values(data.dishes).forEach(dish => {
        document.getElementById("dish-container").innerHTML += `
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
// getAllDishes()


// Add an event listener to detect scrolling
window.addEventListener('scroll', function(event) {
    const dishContainer = document.getElementById("dish-container")

    // Get the current vertical scrollbar position
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // Get the total height of the scrollable content
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    // Get the height of the viewport
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    
    // Calculate the scroll percentage
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    console.log(scrollPercentage.toFixed(2))

    const cards = document.querySelectorAll(".card")
    
    const navbar = this.document.getElementById("navbar")
    
    // if(scrollPercentage.toFixed(2) >= 20.00){

    //     navbar.classList.remove("normal-pos")
    //     navbar.classList.add("move-up")
    //     cards.forEach(card => {
    //         card.classList.add("translate")
    //     })
    // }else{
    //     navbar.classList.remove("move-up")
    //     navbar.classList.add("normal-pos")
    // }

    // if(scrollPercentage.toFixed(2) >= 50.00){
    //     navbar.classList.remove("normal-pos")
    // }
    // else{
    //     navbar.classList.add("normal-pos")
    // }

    let lastScrollTop = document.documentElement.scrollTop;
        window.addEventListener('scroll', function() {
            const currentScroll = document.documentElement.scrollTop;
    
            console.log(`${currentScroll.toFixed(2)} : ${lastScrollTop.toFixed(2)}`);
            if (currentScroll > lastScrollTop) {
                navbar.classList.remove("normal-pos")
                navbar.classList.add("move-up")
                if(scrollPercentage.toFixed(2) >= 20.00){
                    cards.forEach(card => {
                        card.classList.add("translate")
                    })
                }
            }
            if(currentScroll < lastScrollTop){
                navbar.classList.add("normal-pos")
                navbar.classList.remove("move-up")
            }
            
    
            lastScrollTop = currentScroll;
        });

});