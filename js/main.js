const baseUrl = 'https://db.ygoprodeck.com/api/v3/cardinfo.php';

const filterType = document.querySelector('.filterType');
const filterAttribute = document.querySelector('.filterAttribute');
const filterLevel = document.querySelector('.filterLevel');
const filterRace = document.querySelector('.filterRace');

const filter = document.querySelector('.filter');
const search = document.querySelector('.search');
const filter_select = document.querySelector('.filter-select');
const searchedBtn = document.querySelector('#searchedBtn');
const filteredBtn = document.querySelector('#filteredBtn');


const filterBtn = document.querySelector('#filterBtn');
const displayCard = document.querySelector('.displayCard');
const resultCard = document.querySelector('.resultDisplay');
const cardList = document.querySelector('.cardList');
const specialCardList = document.querySelector('.specialCardList');




filter.style.display = 'none';
search.style.display = 'none';


filteredBtn.addEventListener('click', function() {
    filter.style.display = 'block';
    filter_select.style.display = 'none';
})

searchedBtn.addEventListener('click', function() {
    search.style.display = 'block';
    filter_select.style.display = 'none';
})



var type = [];
var race = [];
var attribute = [];
var level = [];
var newType= [];

const distinct = (value, index, self) => { 
    return self.indexOf(value) === index;
}


fetch(`${baseUrl}`)
    .then(response => response.json()) 
    .then(function(card) {
        card = card[0];
        getType([...card]);
        getAttribute([...card]);
        getLevel([...card]);
        getRace([...card]);
        filterGet([...card])
    })



//start of getType
function getType(cardArr){
        cardArr.map(card => {
                type.push(card.type);
        })
        displayType([...type]);  
}
function displayType(cardArr){

    let filterList = cardArr.filter(distinct).map(type => {
        return `<option value="${type}">${type}</option>`;
    }).join('')
    
    filterType.innerHTML = filterList;
    filterType.innerHTML += `<option disabled selected>Select Card Type</option>`;
}
//end of getType





//start of getAttribute
function getAttribute(cardArr){
    cardArr.map(card => {
            attribute.push(card.attribute);
    })
    displayAttribute([...attribute]);  
}
function displayAttribute(cardArr){
    let filterList = cardArr.filter(distinct).map(attribute => {
            return `<option value="${attribute}">${attribute}</option>`;
    }).join('')
    filterAttribute.innerHTML = filterList;
    filterAttribute.innerHTML += `<option disabled selected>Select Card Attribute</option>`;
}
//end of getAttribute



//start of getLevel
function getLevel(cardArr){
    cardArr.map(card => {
            level.push(card.level);
    })
    displayLevel([...level]);  
}
function displayLevel(cardArr){
    let filterList = cardArr.filter(distinct).map(level => {
            return `<option value="${level}">${level}</option>`;
    }).join('')
    filterLevel.innerHTML = filterList;
    filterLevel.innerHTML += `<option disabled selected>Select Card Level</option>`;
}
//end of getLevel



//start of getRace
function getRace(cardArr){
    cardArr.map(card => {
            race.push(card.race);
    })
    displayRace([...race]);  
}
function displayRace(cardArr){
    let filterList = cardArr.filter(distinct).map(race => {
            return `<option value="${race}">${race}</option>`;
    }).join('')
    filterRace.innerHTML = filterList;
    filterRace.innerHTML += `<option disabled selected>Select Card Race</option>`;
}
//end of getRace



//start of display Filtered Cards
function filterGet(cardArr){
    filterBtn.addEventListener('click', function() {
        let cardFilter = cardArr.map(card => {
            if(filterType.value === card.type && filterAttribute.value === card.attribute &&    filterLevel.value === card.level && filterRace.value === card.race){
                return `<div class="displayedCard" id="${card.id}" ><img id="displayedCardResult" src="${card.image_url}" height="180px" name="${card.id}"/></div>`
           }else{
               document.querySelector('.displayCardError').innerHTML = `<div   class="displayedCardError"><h1>NO YUGIOH CARD FOUND!</h1></div>`;

           }
           
       }).join('')
       if(cardFilter){
          displayCard.innerHTML = cardFilter;
          document.querySelector('.displayCardError').style.display = 'none';
      }else{
          displayCard.innerHTML = cardFilter;
          document.querySelector('.displayCardError').style.display = 'block'
      }
      displayCardResult(cardArr);
    }) 
}
//end of display Filtered Cards



//start of selected Displayed Card
function displayCardResult(cardArr) {
    
    document.querySelectorAll('.displayedCard').forEach(function(event){
        event.addEventListener('click', function() {
          getDisplayResult(this.id, cardArr)
        });
      });

}


function getDisplayResult(id, cardArr){
    let resultDisplay = cardArr.map(display => {
        if(id === display.id){
            return `<img id="resultImg" name="${display.type}" src="${display.image_url}""/>`
        }
    }).join('')
    resultCard.innerHTML = resultDisplay;
}
//end of selected Displayed Card



resultCard.addEventListener('click', function() {
    
        var someimage = document.getElementById('resultDisplay');
        var myimg = someimage.getElementsByTagName('img')[0];
        var mysrc = myimg.src;
        var myname = myimg.name;
        
        getCard(mysrc, myname)
})
   



function getCard(mysrc, myname){
    
    if(myname === 'Synchro Monster' || myname === 'XYZ Monster' || myname === 'Fusion Monster' || myname === 'XYZ Pendulum Effect Monster'){
        specialCardList.innerHTML += `<div class="deckCard"><img id="deckCard" src="${mysrc}"/></div>`
    } else{
        cardList.innerHTML += `<div class="deckCard"><img id="deckCard" src="${mysrc}"/></div>`
    }
}