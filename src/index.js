document.addEventListener('DOMContentLoaded', function(){
  fetchAllDogs()
  filterListener()
})

function fetchAllDogs(){
  fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => data.forEach(dog => addDoggo(dog)))
}
function addDoggo(dog){
  let dogBar = document.querySelector('#dog-bar')
  let newSpan = document.createElement('span')
  newSpan.innerText = `${dog.name}`
  newSpan.setAttribute('id', `${dog.id}-span`)
  dogBar.appendChild(newSpan)
  newSpan.addEventListener('click', dogClickListener)
}

//when user clicks on span that pups image, name and isGoodDog status should show up in the div with an id of 'dog-info'
function dogClickListener(){
  let dogID = parseInt(event.target.id.split("-")[0])
  fetch(`http://localhost:3000/pups/${dogID}`)
    .then(res => res.json())
    .then(dogObj => renderDoggo(dogObj))
}

function renderDoggo(dogObj){
  let dogInfoDiv = document.querySelector('#dog-info')
  dogInfoDiv.innerHTML = ""

  let h2 = document.createElement('h2')
  h2.innerText = `${dogObj.name}`
  let img = document.createElement('img')
  img.setAttribute('src', `${dogObj.image}`)
  let toggleButton = document.createElement('button')
  toggleButton.setAttribute('id', `${dogObj.id}-button`)
  // debugger
  if (dogObj.isGoodDog){
    toggleButton.innerText = "Good Dog!"
    }
  else {
    toggleButton.innerText = "Bad Dog :("
    }
  dogInfoDiv.appendChild(img)
  dogInfoDiv.appendChild(h2)
  dogInfoDiv.appendChild(toggleButton)

  toggleButton.addEventListener('click', toggleDogStatus)
}

function toggleDogStatus(){
  let dogID = parseInt(event.target.id.split("-")[0])
  let body = {}
  if (event.target.innerText == "Good Dog!"){
    body = {isGoodDog: false}
    }
  else{
    body = {isGoodDog: true}
  }
  // debugger
  //patch dog status
  fetch(`http://localhost:3000/pups/${dogID}`, {
    method: "PATCH",
    headers:
      {
      "Content-Type": "application/json",
      Accept: "application/json"
      },
    body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(dog => renderDoggo(dog))
}

function filterListener(){
  let filterButton = document.querySelector('#good-dog-filter')
  filterButton.addEventListener('click', toggleGoodDogs)
}

function toggleGoodDogs(){
  let filterButton = document.querySelector('#good-dog-filter')
  if (filterButton.innerText == "Filter good dogs: OFF"){
    filterButton.innerText = "Filter good dogs: ON"
    console.log("Showing good dogs only!")
    fetchAllGoodDogs()
  }
  else {
    filterButton.innerText = "Filter good dogs: OFF"
    console.log("showing the bad boys and the good")
    document.querySelector('#dog-bar').innerHTML = ""
    fetchAllDogs()

  }
}

function fetchAllGoodDogs(){
  let goodDoggos = []
  fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => {
      for(doggo of data){
        if (doggo.isGoodDog === true){
          goodDoggos.push(doggo)
        }
      }
      document.querySelector('#dog-bar').innerHTML = ""
      goodDoggos.forEach(function(dog) {
        addDoggo(dog)
      })
    })
}
