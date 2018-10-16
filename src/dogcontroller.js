class DogController {

  static init() {
    Adapter.getDogs().then(DogController.renderDogBar)
    const filter = document.querySelector('#good-dog-filter')
    filter.addEventListener('click', DogController.handleDogFilter)
  }

  static renderDogBar(dogs) {
    const dogBar = document.querySelector('#dog-bar')
    dogBar.innerHTML = "";
    dogs.forEach(DogController.renderBarItem)
  }

  static renderBarItem(dog) {
    const dogBar = document.querySelector('#dog-bar')
    const newDog = new Dog(dog);
    const span = newDog.barElement();
    dogBar.append(span);
  }

  static renderDog(dog) {
    const card = document.querySelector('#dog-info')
    card.innerHTML = "";
    const newDog = new Dog(dog);
    card.append(newDog.mainElement());
  }

  static handleDisplay(e) {
    e.preventDefault();
    const id = e.target.dataset.id;
    Adapter.getDog(id).then(DogController.renderDog)
  }

  static handleDogGoodness(e) {
    e.preventDefault();
    const id = e.target.dataset.id;
    let newDog;
    Adapter.getDog(id).then(function(json) {
      newDog = new Dog(json)
      newDog.toggleGoodness();
      return Adapter.patchDog(newDog);
    }).then(DogController.renderDog)
  }

  static handleDogFilter(e) {
    if(e.target.dataset.toggled === "false") {
      e.target.innerText = "Filter good dogs: ON";
      e.target.dataset.toggled = "true";
      Adapter.getGoodDogs().then(DogController.renderDogBar);
    } else {
      e.target.innerText = "Filter good dogs: OFF";
      e.target.dataset.toggled = "false";
      Adapter.getDogs().then(DogController.renderDogBar);
    }
  }

}
