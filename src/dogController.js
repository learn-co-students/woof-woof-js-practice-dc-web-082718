class DogController{
  static init(){
    Adapter.getDogs()
            .then(function(dogs){

              dogs.forEach(dog=>new Dog(dog))
              DogController.renderDogBar(allDogs)

              })
    const filter = document.querySelector("#good-dog-filter")
    filter.addEventListener("click", DogController.filterDogs)
  }

  static renderDogBar(dogs){
    const dogBar = document.querySelector("#dog-bar")
    DogController.clearElement(dogBar)
    dogs.forEach(dog => DogController.renderDogBarElement(dog))
  }
  static filterDogs(e){
    let filter = e.target.dataset.filter
    let dogs
    if (filter == "false"){
      filter = true
      dogs = allDogs.filter(dog => dog.isGoodDog)

    }
    else{
      filter = false
      dogs = allDogs
    }
    DogController.renderFilterButton(filter)
    DogController.renderDogBar(dogs, filter)

  }
  static renderFilterButton(filter){
    const button = document.querySelector("#good-dog-filter")
    if (filter){
      button.innerText = "Filter good dogs: ON"
      button.dataset.filter = "true"
    }
    else{
      button.innerText = "Filter good dogs: OFF"
      button.dataset.filter = "false"
    }
  }

  static renderDogBarElement(dog){
    const dogBar = document.querySelector("#dog-bar")
    dogBar.appendChild(dog.dogBarElement)
    dog.dogBarElement.addEventListener("click", DogController.renderDogInfo)
  }

  static renderDogInfo(e, id){
    const dogInfoDiv = document.querySelector("#dog-info")
    DogController.clearElement(dogInfoDiv)
    if (id){
      var dog = allDogs.find(dogObject => dogObject.id == id)
    }
    else{
      var dog = allDogs.find(dogObject => dogObject.name == e.target.innerText)
    }
    dogInfoDiv.appendChild(dog.infoElement)
    document.querySelector("#good-dog-button").addEventListener("click", DogController.editDogInfo)

  }

  static editDogInfo(e){
    let dog = allDogs.find(dogObject => dogObject.id == e.target.dataset.id)
    if (dog.isGoodDog){
      dog.isGoodDog = false;
    }
    else{
      dog.isGoodDog = true;
    }
    Adapter.editDog(dog).then(dog => DogController.renderDogInfo(null, dog.id))
  }

  static clearElement(element){
    while (element.firstChild){
      element.firstChild.remove()
    }
  }

}
