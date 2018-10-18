let dogData = [];
let currentDog = {};

document.addEventListener('DOMContentLoaded',
  function()
  {
    fetch('http://localhost:3000/pups')
      .then(response => response.json())
        .then(data =>
          {
            dogData = data;
            console.log(data);
            let dogBar = document.getElementById('dog-bar');
            data.forEach(object =>
              {
                let element = document.createElement('span');
                element.innerText = object['name'];
                element.id = object['id'];
                element.addEventListener('click', addSpanSelectListener);
                dogBar.appendChild(element);
              });
          })
  });

function addSpanSelectListener()
{
  event.preventDefault();
  let element = event.currentTarget;
  console.log(element.id);
  setCurrentDog(element.id);
  displayDog(element.id);
}

function setCurrentDog(id)
{
  currentDog = dogData[id];
}

function displayDog(id)
{
  let element = document.getElementById('dog-info');
  let btnDisplay = 'Good Dog!'
  if (dogData[id]['isGoodDog'] === false)
  {
    btnDisplay = 'Bad Dog!';
  }
  element.innerHTML = `
    <img src='${dogData[id]['image']}'></img>
    <h2>${dogData[id]['name']}</h2>
    <button id='isDogGoodBtn'>${btnDisplay}</button>`;
  addIsDogGoodBtnListener();
}

function addIsDogGoodBtnListener()
{
  let btn = document.getElementById('isDogGoodBtn').addEventListener('click',
    function()
    {
      let element = event.currentTarget;
      if (element.innerHTML === 'Good Dog!')
      {
        element.innerHTML = 'Bad Dog!'
      }
      else
      {
        element.innerHTML = 'Good Dog!'
      }
      console.log(element);
      console.log(currentDog);

      currentDog['isGoodDog'] = !currentDog['isGoodDog'];
      fetch(`http://localhost:3000/pups/${currentDog['id']}`,
        {
          method: 'PATCH',
          headers:
          {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(
          {
            isGoodDog: currentDog['isGoodDog']
          })
        }
      )
        .then(response => response.json())
          .then(data => console.log(data));
      // if ()
      // btn.innerText =
    });
}
