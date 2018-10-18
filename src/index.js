

document.addEventListener('DOMContentLoaded', function(event){
  console.log("Page Loaded")
  getPups()
})

function getPups() {
  fetch('http://localhost:3000/pups')
  .then(r => r.json())
  .then(pups => {
    pups.forEach(pup => renderPupButton(pup))
  })
}

function renderPupButton(pup) {
  let dogBar = document.getElementById("dog-bar")
  let dogButton = document.createElement('span')
  dogButton.innerText = `${pup.name}`
  dogBar.appendChild(dogButton)
  dogButton.addEventListener('click', function(event){
    let dogBox = document.getElementById('dog-info')
    dogBox.innerHTML = ""
    showPupCard(pup)
  })
}

function showPupCard(pup) {
  console.log(`You Clicked ${pup.name}`)
  let dogBox = document.getElementById('dog-info')
  let dogButton = document.createElement('button')
  let dogCard = document.createElement('div')
  let dogHeader = document.createElement('h2')
  let dogImg = document.createElement('img')
  dogCard.appendChild(dogHeader)
  dogCard.appendChild(dogImg)
  dogCard.appendChild(dogButton)
  dogBox.appendChild(dogCard)
  dogHeader.innerText = `${pup.name}`
  dogImg.src = `${pup.image}`
  dogButton.dataset.id = `${pup.id}`
  pupButtonText(pup, dogButton)
  dogButton.addEventListener('click', function(event){
    let dogStatus = !pup.isGoodDog
    console.log(event.currentTarget.dataset.id)
    console.log(pup.name);
    let id = event.currentTarget.dataset.id
    let url = `http://localhost:3000/pups/${id}`
    let body = {isGoodDog: dogStatus}
    let options = {method: "PATCH",
                  headers:{'Content-Type': 'application/json'},
                  body: JSON.stringify(body)}
    fetch(url, options).then(r=>r.json())
    event.currentTarget.innerHTML = ""
    // event.currentTarget.inn
  })
}




function pupButtonText(pup, button) {
  if (pup.isGoodDog === true){
    return button.innerText = "Good Dog!"
  }
  else if (pup.isGoodDog === false) {
    return button.innerText = "Bad Dog!"
  }
}
