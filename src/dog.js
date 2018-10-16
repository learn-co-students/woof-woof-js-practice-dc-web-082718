const allDogs  = []

class Dog{
  constructor({name,id,image,isGoodDog}){
    this.name = name
    this.id = id
    this.image = image
    this.isGoodDog = isGoodDog
    this.dogBarElement = this.dogBarElement()
    allDogs.push(this)
  }

   dogBarElement(){
    let span = document.createElement("span")
    span.innerText = `${this.name}`
    return span;
  }

  get infoElement(){
    let div = document.createElement("div")
    let img = document.createElement("img")
    img.src =`${this.image}`
    let name = document.createElement("h2")
    name.innerText = `${this.name}`
    let button = document.createElement("button")
    button.id = "good-dog-button"
    if (this.isGoodDog){
      button.innerText = "Bad Dog!"
    }
    else {
      button.innerText = "Good Dog!"
    }
    button.dataset.id = `${this.id}`
    div.appendChild(img)
    div.appendChild(name)
    div.appendChild(button)
    return div

  }


}
