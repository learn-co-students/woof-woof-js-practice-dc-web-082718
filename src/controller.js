class Controller {
  static getDogs(url) {
    fetch(url)
    .then(res => res.json())
    .then(json => renderDogBar(json))
  }

  static toggleDog(event) {
    let dogID = event.target.id
    let btn = document.querySelector(`#${dogID}`)
    if (btn.innerText === "Good Dog!") {
      btn.innerText = "Bad Dog!"
      // Patch dog to bad
      Controller.editDog(dogID, false)
    } else {
      btn.innerText = "Good Dog!"
      // Patch dog to good
      Controller.editDog(dogID, true)
    }
  }

  static editDog(id, val) {
    let dogID = id.split("btn-")[1]
    fetch(`http://localhost:3000/pups/${dogID}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"isGoodDog": val})
    })
  }
}
