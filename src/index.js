document.addEventListener('DOMContentLoaded', () => {
  let dogsURL = 'http://localhost:3000/pups'
  Controller.getDogs(dogsURL)
})

function renderDogBar(data) {
  let dogBar = document.querySelector('div#dog-bar')
  return data.map(dog => {
    let span = document.createElement('span')
    span.id = dog.id
    span.innerText = dog.name
    span.addEventListener('click', showDoggie)
    dogBar.appendChild(span)
  })

  function showDoggie(event) {
    let dogDiv = document.querySelector('div#dog-info')
    let dogID = event.target.id
    fetch(`http://localhost:3000/pups/${dogID}`)
      .then(res => res.json())
      .then(dog => {
        let img = document.createElement('img')
        let header = document.createElement('h2')
        let btn = document.createElement('button')

        img.src = dog.image
        header.innerText = dog.name

        if (dog.isGoodDog) {
          btn.innerText = "Good Dog!"
        } else {
          btn.innerText = "Bad Dog!"
        }
        btn.id = `btn-${dog.id}`
        btn.addEventListener('click', Controller.toggleDog)

        dogDiv.id = dog.id
        dogDiv.appendChild(header)
        dogDiv.appendChild(img)
        dogDiv.appendChild(btn)
      })
  }
}
