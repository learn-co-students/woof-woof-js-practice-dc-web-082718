
let mode = false;

(document.addEventListener("DOMContentLoaded", () => {
  getAllPups();

  let filter = document.getElementById('good-dog-filter');
  filter.addEventListener('click', toggleFilter)
}
))

function toggleFilter(e){

  mode = !mode
  if (mode === false) {
    e.target.innerText= "Filter good dogs: ON"
  } else {
    e.target.innerText = "FIlter good dogs: OFF"
  };
  return getAllPups();


}

function getAllPups(){

  let div = document.getElementById('dog-bar');

  while (div.firstChild) {
    div.removeChild(div.firstChild)
  };

  let filter = document.getElementById('good-dog-filter');

  if (filter.innerText === "Filter good dogs: ON") {
    fetch("http://localhost:3000/pups").then(res => res.json()).then(data => {data.forEach(dog => {
      if (dog.isGoodDog === true) {
        renderDog(dog)
      }
    } )})
  } else {
    fetch("http://localhost:3000/pups").then(res => res.json()).then(data => {data.forEach(dog => renderDog(dog))})
  }
}


function renderDog(dog){
  let span = document.createElement('span');
  span.innerText = dog.name;
  span.id = dog.id
  span.addEventListener('click', fetchSingleDogInfo)

  let div = document.getElementById('dog-bar');
  div.appendChild(span);
}


function fetchSingleDogInfo(e){
  let id = e.target.id
  let name = e.target.innerText
  fetch(`http://localhost:3000/pups/${id}`).then(res => res.json()).then(data => displayDogInfo(data))
}


function displayDogInfo(data){
  let div = document.getElementById('dog-info');

  while (div.firstChild) {
    div.removeChild(div.firstChild)};

  let id = data.id;
  let name = data.name;
  let image = data.image;
  let isGoodDog;
  if (data.isGoodDog === true){
    isGoodDog = true;
  } else {
    isGoodDog = false;
  };

  let img = document.createElement('img');
  img.src = image;

  let h2 = document.createElement('h2');
  h2.innerText = name;

  let button = document.createElement('button');
  if (isGoodDog === true) {
    button.innerText = "Good Dog!"
  } else {
    button.innerText = "Bad Dog!"

  }
  button.id = id;
  button.addEventListener('click', toggleDogStatus)

  div.appendChild(img);
  div.appendChild(h2);
  div.appendChild(button);
}

function toggleDogStatus(e){
  let button = e.target
  let id = e.target.id;
  let isGoodDog;

  if (e.target.innerText === "Good Dog!"){
    isGoodDog = false;
  } else {
    isGoodDog = true;
  };


  fetch(`http://localhost:3000/pups/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "isGoodDog": isGoodDog
    })
  }).then(res => res.json()).then(data =>  displayDogInfo(data))

}
