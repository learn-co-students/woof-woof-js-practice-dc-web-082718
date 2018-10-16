class Adapter{
  static getDogs(){
    const url = "http://localhost:3000/pups"
    return fetch(url)
          .then(r => r.json())
  }
  static editDog(data){
    const url = `http://localhost:3000/pups/${data.id}`
    return fetch(url,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
          Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
  }
}
