let dishContainer = document.getElementById('dish-container')

function card (data) {
  Object.values(data.dishes).forEach(dish => {
    dishContainer.innerHTML += `
        <div class="card">
            <img src="${dish.dishImage}" data-image="${
      dish.dishImage
    }" alt="dish-image" class="dish-image">
            <h2 class="dish-name" data-id="${dish._id}">${dish.dishName}</h2>
            <h4>Ingredients:</h4>
            <p class="dish-ingredients">${dish.dishIngredients.slice(
              0,
              50
            )}...</p>
            <h4>Procedure:</h4>
            <p class="dish-procedure">${dish.dishProcedure.slice(0, 50)}...</p>
        </div>`
  })
}

function imageDisplay (data) {
  document.getElementById('image-container').innerHTML += `
    <img src="${data.dishes[0].dishImage}" alt="food image" class="food-image image-one">
    <img src="${data.dishes[1].dishImage}" alt="food image" class="food-image image-two">
    <img src="${data.dishes[2].dishImage}" alt="food image" class="food-image image-three">
    `
}

async function getAllDishes () {
  try {
    const data = await fetch('http://localhost:3000/dish')
    const dish = await data.json()
    dishContainer.innerHTML = ''
    card(dish)
    imageDisplay(dish)
  } catch (err) {
    console.log(err)
    dishContainer.innerHTML = ''
    dishContainer.innerHTML +=
      '<h2 class="error-message">Server connection error: Failed to fetch data :(</h2>'
  }
}
getAllDishes()

window.addEventListener('scroll', function () {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop
  const scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight
  const clientHeight =
    document.documentElement.clientHeight || window.innerHeight
  const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100
  const cards = document.querySelectorAll('.card')
  const navbar = this.document.getElementById('navbar')
  let lastScrollTop = document.documentElement.scrollTop

  window.addEventListener('scroll', function () {
    const currentScroll = document.documentElement.scrollTop
    if (currentScroll > lastScrollTop) {
      navbar.classList.remove('normal-pos')
      navbar.classList.add('move-up')
      if (scrollPercentage.toFixed(2) >= 20.0) {
        cards.forEach(card => {
          card.classList.add('translate')
        })
      }
    }
    if (currentScroll < lastScrollTop) {
      navbar.classList.add('normal-pos')
      navbar.classList.remove('move-up')
    }
    lastScrollTop = currentScroll
  })
})

dishContainer.addEventListener('click', async event => {
  const card = event.target.closest('.card')

  if (card) {
    const id = card.querySelector('.dish-name').dataset.id

    const data = await fetch(`http://localhost:3000/dish/${id}`)
    const recipe = await data.json()

    const fragment = document.createDocumentFragment()

    const fullCardDetailsDiv = document.createElement('div')
    fullCardDetailsDiv.classList.add('full-card-dish-details')

    fullCardDetailsDiv.innerHTML = `
      <a class="material-symbols-outlined close-button" id="close-button">Keyboard_Return</a>
      <img src="${recipe.dishes.dishImage}" alt="full-dish-image-detail" class="full-dish-image-detail">
      <h2 class="full-dish-name-detail">${recipe.dishes.dishName}</h2>
      <h4>Ingredients:</h4>
      <ul class="full-dish-ingredients-detail">
    `

    recipe.dishes.dishIngredients.split(',').forEach(e => {
      const li = document.createElement('li')
      li.textContent = e.trim()
      fullCardDetailsDiv
        .querySelector('.full-dish-ingredients-detail')
        .appendChild(li)
    })

    fullCardDetailsDiv.innerHTML += `</ul>
      <h4>Procedure:</h4>
      <p class="full-dish-procedure-detail">${recipe.dishes.dishProcedure}</p>
    `

    fragment.appendChild(fullCardDetailsDiv)

    const dialogDiv = document.querySelector('.dialog-div')
    dialogDiv.innerHTML = ''
    dialogDiv.appendChild(fragment)

    document.querySelector('[data-recipe-modal]').showModal()
    document.querySelector('[data-recipe-modal]').style.display = 'flex'
    document.querySelector('html').style.overflow = 'hidden'
  }
})

document
  .querySelector('[data-recipe-modal]')
  .addEventListener('click', event => {
    if (event.target.closest('#close-button')) {
      document.querySelector('[data-recipe-modal]').style.display = 'none'
      document.querySelector('html').style.overflow = 'auto'
      document.querySelector('[data-recipe-modal]').close()
    }
  })

window.onload = function () {
  window.scrollTo(0, 0)
}
const searchInput = document.getElementById('search-input')

searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    fetchDishByName(
      searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1)
    )
    window.location.href = '#main-dish-container'
  }
})

async function fetchDishByName (name) {
  try {
    const data = await fetch(`http://localhost:3000/dish/dishName/${name}`)
    const dishByName = await data.json()
    if (dishByName.status == 404) {
      dishContainer.innerHTML = ''
      dishContainer.innerHTML =
        '<h2 class="error-message">Error: No dish found. Try check your input or contact us to update dishes :(</h2>'
    } else getDishByName(dishByName)
    console.log(dishByName)
  } catch (err) {
    console.log(err)
  }
}

function getDishByName (dish) {
  dishContainer.innerHTML = ''
  dishContainer.innerHTML = `
        <div class="card">
            <img src="${
              dish.dishes.dishImage
            }" alt="dish-image" class="dish-image">
            <h2 class="dish-name" data-id="${dish.dishes._id}">${
    dish.dishes.dishName
  }</h2>
            <h4>Ingredients:</h4>
            <p class="dish-ingredients">${dish.dishes.dishIngredients.slice(
              0,
              50
            )}...</p>
            <h4>Procedure:</h4>
            <p class="dish-procedure">${dish.dishes.dishProcedure.slice(
              0,
              50
            )}...</p>
        </div>`
}
