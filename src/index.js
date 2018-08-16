const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const newToyForm = document.querySelector('.add-toy-form')
let addToy = false

let toy1 =   {
    "id": 1,
    "name": "Woody",
    "image": "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png",
    "likes": 5
  }

  // teddy = http://dimg.dillards.com/is/image/DillardsZoom/zoom/starting-out-10-bear-plush-toy/05151397_zi_brown.jpg

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

function allOfTheToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(jsonData => {
    let toyData = jsonData
    toyData.forEach(toy => {
      renderToy(toy)
    })
  })
}

function renderToy(toy) {
  let toyColl = document.getElementById('toy-collection')
  let toyDiv = document.createElement('div')
  toyDiv.classList.add("card")
  toyDiv.id = `toy-${toy.id}`
  let toyName = document.createElement('h2')
  toyName.innerText = toy.name
  let toyImage = document.createElement('img')
  toyImage.src = toy.image
  toyImage.classList.add('toy-avatar')
  let toyLikes = document.createElement('p')
  toyLikes.innerText = `${toy.likes} likes` 

  let toyButton = document.createElement('button')
  toyButton.innerText = ' Like 👍 '
  toyButton.classList.add('like-btn')
  toyButton.addEventListener('click', incrementLikes)

  toyColl.appendChild(toyDiv)
  toyDiv.appendChild(toyName)
  toyDiv.appendChild(toyImage)
  toyDiv.appendChild(toyLikes)
  toyDiv.appendChild(toyButton)
}

newToyForm.addEventListener('submit', addNewToy)

function addNewToy(event) {
  event.preventDefault();

  let name = newToyForm.elements.namedItem('name').value
  let image = newToyForm.elements.namedItem('image').value

  if (name === "" || image === "") {
    alert("You gots to put something in dummy!");
  } else {
    postToy(name, image);
  }
}

function postToy(name, image) {
  let formData = {
    name: name,
    image: image,
    likes: 0
  }
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Accept": "application/json"
        },
    body: JSON.stringify(formData)
  })
  renderToy(formData)
}

function incrementLikes(event) {
  let toyId = (event.currentTarget.parentElement.id).split("-")[1]
  let likesNumber = event.target.parentNode
    .querySelector('p')
    .innerText.split(" ")[0];
  likesNumber++;
  updateLikes(likesNumber, toyId);
}

function updateLikes(number, id) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      likes: number
    })
  }).then(response => response.json())
    .then(jsonData => {
      let update = document.getElementById(`toy-${id}`)
      update.querySelector("p").innerText = `${number} likes`
    })
}


document.addEventListener("DOMContentLoaded", allOfTheToys)
