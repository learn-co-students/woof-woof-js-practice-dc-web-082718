document.addEventListener("DOMContentLoaded", function() {
  let isClicked
  fetchDogs()
  dogFilter()
})

function fetchDogs() {
  fetch('http://localhost:3000/pups/')
  .then(response => response.json())
  .then(data => {data.forEach(render)
  })
}

function render(dog) {
  let dogBar = document.querySelector("#dog-bar")
  let span = document.createElement("span")
  span.innerText = dog.name
  span.id = dog.id
  span.addEventListener('click', fetchSingleDog)
  dogBar.appendChild(span)

}

function fetchSingleDog() {
  let infoDiv = document.querySelector("#dog-info")
  infoDiv.innerHTML = ""
  let id = event.currentTarget.id
  fetch(`http://localhost:3000/pups/${id}`)
  .then(response => response.json())
  .then(dog => {dogInfo(dog)
  })
}

function dogInfo(dog) {
  let infoDiv = document.querySelector("#dog-info")

  let image = document.createElement("img")
  image.setAttribute('src', dog.image)
  infoDiv.appendChild(image)

  let h2 = document.createElement("h2")
  h2.innerText = dog.name
  infoDiv.appendChild(h2)

  let button = document.createElement("button")
  if (dog.isGoodDog === true) {
    button.innerText = "Good Dog!"
  } else {
    button.innerText = "Bad Dog!"
  }
  button.id = dog.id
  button.addEventListener('click', toggleDog)
  infoDiv.appendChild(button)
}

function toggleDog(event) {
  //change isGoodDog boolean
    let dogTarget = event.currentTarget
    let dogId = event.currentTarget.id
    let data
    if (event.currentTarget.innerText === "Good Dog!") {
       data = {isGoodDog: false}
    } else {
       data = {isGoodDog: true}
    }
  fetch(`http://localhost:3000/pups/${dogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(json => {console.log(json)
    if (data.isGoodDog)  {
      dogTarget.innerText = "Good Dog!"
    }
    else {
      dogTarget.innerText = "Bad Dog!"
    }
  })
}

function dogFilter(){
  let filterBtn = document.querySelector("#good-dog-filter")
  filterBtn.addEventListener('click', filterFunction)
}

function filterFunction(event) {
  let infoDiv = document.querySelector("#dog-info")
  infoDiv.innerHTML = ""
  if (event.currentTarget.innerText === "Filter good dogs: OFF") {
    event.currentTarget.innerText = "Filter good dogs: ON"
    isClicked = false;
    dogsFilterOn(event)
  } else {
   event.currentTarget.innerText = "Filter good dogs: OFF"
   isClicked = true
  }
}

function dogsFilterOn(event) {
  let allDogSelection = document.querySelector("#dog-bar").children
  let goodDogs = Array.from(allDogSelection).forEach(function(dog){
    let dogId = dog.id
    fetch(`http://localhost:3000/pups/${dogId}`)
    .then(response => response.json())
    .then(dog => {
      if (dog.isGoodDog)  {
      dogInfo(dog)
    }
    })
  })
}
