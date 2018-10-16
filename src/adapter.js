class Adapter {

  static getDogs() {
    return fetch('http://localhost:3000/pups').then(res => res.json())
  }

  static getGoodDogs() {
    return fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(json => json.filter(dog => dog.isGoodDog === true))
  }

  static getDog(id) {
    return fetch(`http://localhost:3000/pups/${id}`).then(res => res.json())
  }

  static patchDog(dog) {
    const id = dog.id
    delete dog.id;
    const url = `http://localhost:3000/pups/${id}`
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dog)
    }

    return fetch(url, options).then(res => res.json())

  }

}
