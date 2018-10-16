document.addEventListener("DOMContentLoaded", function(){
  dogInfoSelector = document.querySelector("#dog-info")
  fetchAllDoggos()
  filterButtonListener()
})

function fetchAllDoggos(){
  fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(json => {
      showDoggoBar(json)
    })
}

function showDoggoBar(json){
  json.forEach(doggo => {
    let spanElement = document.createElement("span")
    spanElement.id = `doggo-${doggo.id}`
    spanElement.innerText = doggo.name
    document.querySelector("#dog-bar").appendChild(spanElement)
    doggoListener(doggo)
  })
}

function doggoListener(doggo){

  document.querySelector(`#doggo-${doggo.id}`).addEventListener("click", function(){
    while(dogInfoSelector.firstChild){
      dogInfoSelector.removeChild(dogInfoSelector.firstChild)
    }

    fetch(`http://localhost:3000/pups/${doggo.id}`)
    .then(response => response.json())
    .then(json => {
      let divElement = document.createElement("div")
      if(doggo.isGoodDog === true){
        divElement.innerHTML =
        `<img src="${doggo.image}">
        <h2>${doggo.name}</h2>
        <button id="toggle-${doggo.id}">Good Dog!</button>`
      }
      else if (doggo.isGoodDog === false){
        divElement.innerHTML =
        `<img src="${doggo.image}">
        <h2>${doggo.name}</h2>
        <button id="toggle-${doggo.id}">Bad Dog!</button>`
      }
      document.querySelector("#dog-info").appendChild(divElement)

      doggoToggler(doggo)
    })
  })
}

function doggoToggler(doggo){
  let data = {isGoodDog: !doggo.isGoodDog}

  document.querySelector(`#toggle-${doggo.id}`).addEventListener("click", function(){
    fetch(`http://localhost:3000/pups/${doggo.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json", "Accept": "application/json"},
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(dog => {
        doggoAfterToggo(dog)
      })
    })
  }

function doggoAfterToggo(dog){
  if(dog.isGoodDog === true){
    dogInfoSelector.innerHTML =
    `<div>
    <img src="${dog.image}">
    <h2>${dog.name}</h2>
    <button id="toggle-${dog.id}">Good Dog!</button>
    </div>`
  }
  else if (dog.isGoodDog === false){
    dogInfoSelector.innerHTML =
    `<div>
    <img src="${dog.image}">
    <h2>${dog.name}</h2>
    <button id="toggle-${dog.id}">Bad Dog!</button>
    </div>`
  }
  doggoToggler(dog)
}

function filterButtonListener(){
  let filterButton = document.querySelector("#good-dog-filter")

  filterButton.addEventListener("click",function(event){
    let goodDoggos = []
    if (filterButton.innerText === "Filter good dogs: OFF"){
      filterButton.innerText = "Filter good dogs: ON"
      fetch("http://localhost:3000/pups")
        .then(response => response.json())
        .then(json => {
          for(doggo of json){
            if (doggo.isGoodDog === true){
              goodDoggos.push(doggo)
            }
          }
          document.querySelector("#dog-bar").innerHTML = ""
          showDoggoBar(goodDoggos)

      })
    } else {
      filterButton.innerText = "Filter good dogs: OFF"
      document.querySelector("#dog-bar").innerHTML = ""
      fetchAllDoggos()
    }
  })
}
