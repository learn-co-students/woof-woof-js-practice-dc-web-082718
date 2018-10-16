class Dog {

  constructor({id, name, isGoodDog, image}) {
    this.id = id;
    this.name = name;
    this.isGoodDog = isGoodDog;
    this.image = image;
  }

  toggleGoodness() {
    if(this.isGoodDog) {
      this.isGoodDog = false;
    } else {
      this.isGoodDog = true;
    }
  }

  barElement() {
    const span = document.createElement('span');
    span.innerText = this.name;
    span.dataset.id = this.id;
    span.addEventListener('click', DogController.handleDisplay)
    return span;
  }

  mainElement() {

    const div = document.createElement('div');

    const img = document.createElement('img');
    img.src = this.image;
    div.append(img);

    const heading = document.createElement('h2')
    heading.innerText = this.name;
    div.append(heading);

    const goodness = document.createElement('p')
    const btn = document.createElement('button')
    btn.dataset.id = this.id;

    if(this.isGoodDog) {
      goodness.innerText = `${this.name} is a good doggo!`
      btn.innerText = 'Bad Dog!'
    } else {
      goodness.innerText = `${this.name} is a bad doggo!`
      btn.innerText = 'Good Dog!'
    }

    div.append(goodness);
    div.append(btn);

    btn.addEventListener('click', DogController.handleDogGoodness)

    return div

  }

}
