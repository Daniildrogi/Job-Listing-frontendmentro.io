
const main = document.querySelector(".container-for-cards")
const searchWindow = document.querySelector(".popup-search")
const searchContainer = document.querySelector(".popup-container")
let searchSet = new Set()
let searchArray = [...searchSet]

const getData = fetch("./data.json")
  .then((response) => response.json())

// Creating card based on raw data from data.json
const createCard = (data) => {
  // creating the card container and adding innnerHTML with the layout, inserting the right names and pictures into it
  for (let i = 0; i < data.length; i++) {

    const card = document.createElement("div")

    const vacancySkills = [...data[i].languages].concat([...data[i].tools], data[i].role, data[i].level)

    card.classList.add("card-container")
    card.innerHTML = `
    <div class="card-left flex row">
      <div class="card-left-image-wrapper">
        <img src="${data[i].logo}" alt="" />
      </div>
      <div class="card-left-text-wrapper flex column">
        <div class="card-left-top-row flex row">
          <div class="company-name">${data[i].company}</div>
         ${data[i].new ? `<div class="new">new!</div>` : ""} 
         ${data[i].featured ? `<div class="featured">featured</div>` : ""} 
          
        </div>

        <div class="vacancy">${data[i].position}</div>
        <div class="card-left-bottom-row flex row">
          <div class="posted bottom-row">${data[i].postedAt}</div>
          <div class="type bottom-row">${data[i].contract}</div>
          <div class="location bottom-row">${data[i].location}</div>
        </div>
      </div>
    </div>
`

    // creating the right div in the card container, appending it into the card container and adding card-right class to it
    const cardRightDiv = document.createElement("div")
    card.appendChild(cardRightDiv)
    cardRightDiv.classList.add("card-right")


    // if (vacancySkills.map((item) => item == [...searchSet]))  {} 
    for (let p = 0; p < vacancySkills.length; p++) {
      const cardRightAppend = card.querySelector(".card-right")

      const cardSkillset = document.createElement("div")

      cardRightAppend.appendChild(cardSkillset)
      cardSkillset.classList.add("card-right-skillset")
      cardSkillset.innerHTML = vacancySkills[p]
    }


    main.appendChild(card)
  }

}
// Creating card based on search options
const applySearch = function (e, data) {
  if (e.target.classList == "card-right-skillset") {
    searchContainer.innerHTML = null
    searchWindow.classList.add("visible")
    searchSet.add(e.target.innerHTML)
    searchArray = [...searchSet]

    for (let i = 0; i < searchArray.length; i++) {
      const searchButton = document.createElement("div")
      searchContainer.appendChild(searchButton)

      searchButton.innerHTML = searchArray[i]
      searchButton.classList.add("search-option")
    }
  }

  if (e.target.classList == "vacancy") {
    searchContainer.innerHTML = null
    searchWindow.classList.add("visible")
   for (let j = 0; j < data.length; j++) {
    if (e.target.innerHTML == data[j].position) {
      console.log(data[j].role, data[j].level)
      searchSet.add(data[j].role)
      searchSet.add(data[j].level)
      searchArray = [...searchSet]
    }
    
   }
   


    for (let i = 0; i < searchArray.length; i++) {
      const searchButton = document.createElement("div")
      searchContainer.appendChild(searchButton)

      searchButton.innerHTML = searchArray[i]
      searchButton.classList.add("search-option")
    }
    
  }

  if (e.target.classList == "clear-button") {
    searchWindow.classList.remove("visible")

    searchContainer.innerHTML = null

    main.innerHTML = null
    searchArray = []
    searchSet = new Set()
    createCard(data)
  }

  if (e.target.classList == "search-option") {
    for (let i = 0; i < searchArray.length; i++) {
      if (searchArray[i] == e.target.innerHTML) searchArray.splice(i, 1)
      console.log(searchArray)

    }
    for (let j = 0; j < searchArray.length; j++) {
      searchContainer.innerHTML = null
      const searchButton = document.createElement("div")
      searchContainer.appendChild(searchButton)
      searchButton.innerHTML = searchArray[j]
      searchButton.classList.add("search-option")
    }
    if (!searchArray.length) {
      searchWindow.classList.remove("visible")

      searchContainer.innerHTML = null

      main.innerHTML = null

      searchSet = new Set()

      createCard(data)
    }
  }

}
// Filtering the data based on options cliсked
const filterData = (data) => {
  let filterArray = data.filter((a) => {
    return searchArray.every((tool) => a.languages.includes(tool) || a.tools.includes(tool) || a.role.includes(tool) || a.level.includes(tool));


  })
  return filterArray


}
// Adding eventlistener 
getData.then((data) => {

  createCard(filterData(data))
  document.addEventListener("click", (e) => {
    main.innerHTML = null
    applySearch(e, data)
    createCard(filterData(data))


  })
})

