const baseUrl = 'https://db.ygoprodeck.com/api/v3/cardinfo.php';

const filterTyping = document.querySelector('.filterTyping');
const filterTyping1 = document.querySelector('.filterTyping1');
const filterBtn1 = document.querySelector('#filterBtn1');


const filterType = document.querySelector('.filterType');
const filterAttribute = document.querySelector('.filterAttribute');
const filterLevel = document.querySelector('.filterLevel');
const filterRace = document.querySelector('.filterRace');

const filter = document.querySelector('.filter');
const search = document.querySelector('.search');
const filtering = document.querySelector('.filtering');
const filter_select = document.querySelector('.filter-select');
const searchedBtn = document.querySelector('#searchedBtn');
const filteredBtn = document.querySelector('#filteredBtn');


const filterBtn = document.querySelector('#filterBtn');
const displayCard = document.querySelector('.displayCard');
const resultCard = document.querySelector('.resultDisplay');
const cardList = document.querySelector('.cardList');
const specialCardList = document.querySelector('.specialCardList');


var cardName = [];
var type1 = [];
var attribute1 = [];
var level1 = [];
var race1 = [];




filter.style.display = 'none';
search.style.display = 'none';
filtering.style.display = 'none';


filteredBtn.addEventListener('click', function() {
    filter.style.display = 'block';
    filter_select.style.display = 'none';
})

searchedBtn.addEventListener('click', function() {
    search.style.display = 'block';
    filter_select.style.display = 'none';
})


document.querySelector('#backFilterBtn').addEventListener('click', function() {
    filter.style.display = 'none';
    filter_select.style.display = 'block';
})

document.querySelector('#backSearchBtn').addEventListener('click', function() {
    search.style.display = 'none';
    filter_select.style.display = 'block';
})

document.querySelector('#backFilteringBtn').addEventListener('click', function() {
    filtering.style.display = 'none';
    filter_select.style.display = 'block';
})

document.querySelector('#filteringBtn').addEventListener('click', function() {
    filtering.style.display = 'block';
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
            searchAll([...card]);
            searchName([...card])

        getType1([...card]);
        getAttribute1([...card]);
        getRace1([...card]);
        getLevel1([...card]);
        })
    
    
    
    
    function searchAll(cardArr){
        cardArr.map(card => {
            cardName.push(card.name);
        })
        
        $( function() {
        var newcardList = cardName;
        
            $( "#search" ).autocomplete({
              source: newcardList
            });
          } );
    }
    
    
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
       
    

    var x = cardList.childElementCount-1;
    var y = specialCardList.childElementCount-1;

    function getCard(mysrc, myname){
        
        
        if((y < 15) && (myname === 'Synchro Monster' || myname === 'XYZ Monster' || myname === 'Fusion Monster' || myname === 'XYZ Pendulum Effect Monster') || myname === 'Synchro Pendulum Effect Monster' || myname === 'Link Monster' || myname === 'Pendulum Effect Fusion Monster'){
            specialCardList.innerHTML += `<div class="deckCard"><img id="deckCard" src="${mysrc}"/></div>`
            y= y+1;
            //document.querySelector('.spancard1').innerHTML = `${y}` + '/15';
            deleteSpecialCard();
        } else if((x < 60) && (myname === 'Trap Card' || myname === 'Normal Monster' || myname === 'Pendulum Effect Monster' || myname === 'Flip Effect Monster' || myname === 'Effect Monster' || myname === 'Spell Card' || myname === 'Tuner Monster' || myname === 'Token' || myname === 'Normal Tuner Monster' || myname === 'Spirit Monster' || myname === 'Union Effect Monster' || myname === 'Ritual Monster' || myname === 'Ritual Effect Monster' || myname === 'Gemini Monster' || myname === 'Toon Monster' || myname === 'Pendulum Normal Monster' || myname === 'Pendulum Flip Effect Monster' || myname === 'Synchro Tuner Monster' || myname === 'Skill Card' || myname === 'Pendulum Tuner Effect Monster')){
            cardList.innerHTML += `<div class="deckCard"><img id="deckCard" src="${mysrc}"/></div>`
            x= x+1;
            document.querySelector('.spancard').innerHTML = `${x}`+ '/60';
            deleteCard();
        }
        
        if(x === 60){
            document.querySelector('#cardfull').style.display = 'block';
            document.querySelector('#cardfull').innerHTML = `FULL`;
        }
    
        if(y === 15){
            document.querySelector('#cardfull1').style.display = 'block';
            document.querySelector('#cardfull1').innerHTML = `FULL`;
        }
    
    }
    
    function searchName(cardArr) {
        document.querySelector('#searchBtn').addEventListener('click', function() {
            searchName = document.querySelector('#search').value;
    
    
            displaySearch(searchName, cardArr);
        })
    }
    
    function displaySearch(name, cardArr){
        let resultDisplay = cardArr.map(display => {
            if(name === display.name){
                return `<img id="resultImg" name="${display.type}" src="${display.image_url}""/>`
            }
        }).join('')
        resultCard.innerHTML = resultDisplay;
    }
    
    
    function deleteCard(){
        document.querySelectorAll('.deckCard').forEach(function(event){
            event.addEventListener('click', function() {
                    this.style.display = 'none';
                    
                    
                    x--;
                    document.querySelector('.spancard').innerHTML = `${x}`+ '/60';
                    
                    if(x < 60){
                        document.querySelector('#cardfull').style.display = 'none';
                    }
            });
          });
    }
    
    
    function deleteSpecialCard(){
        document.querySelectorAll('.deckCard').forEach(function(event){
            event.addEventListener('click', function() {
              this.style.display = 'none';

              y--;
              document.querySelector('.spancard1').innerHTML = ``;
              
              if(y < 15){
                document.querySelector('#cardfull1').style.display = 'none';
            }
            });
          });
    }
























function getType1(cardArr){
    filterTyping.addEventListener('change', function() {
        if(this.value === 'type'){
            card = cardArr;
            card.map(name => {
                type1.push(name.type);
            })
            getTypeList([...type1], cardArr);
        }
    })
}


function getTypeList(typeArr, cardArr){
    
    let filterList = typeArr.filter(distinct).map(name => {
        return `<option>${name}</option>`;
    })
    
    document.querySelector('.filterTyping1').innerHTML = filterList;
    filterGetType(cardArr);

}


//////////



function getAttribute1(cardArr){
    filterTyping.addEventListener('change', function() {
        if(this.value === 'attribute'){
            card = cardArr;
            card.map(name => {
                attribute1.push(name.attribute);
            })
            getAttributeList([...attribute1], cardArr);
        }
    })
}


function getAttributeList(attributeArr, cardArr){
    
    let filterList = attributeArr.filter(distinct).map(name => {
        return `<option>${name}</option>`;
    })
    
    document.querySelector('.filterTyping1').innerHTML = filterList;
    filterGetAttribute(cardArr);

}


///////////



function getRace1(cardArr){
    filterTyping.addEventListener('change', function() {
        if(this.value === 'race'){
            card = cardArr;
            card.map(name => {
                race1.push(name.race);
            })
            getRaceList([...race1], cardArr);
        }
    })
}


function getRaceList(raceArr, cardArr){
    
    let filterList = raceArr.filter(distinct).map(name => {
        return `<option>${name}</option>`;
    })
    
    document.querySelector('.filterTyping1').innerHTML = filterList;
    filterGetRace(cardArr);

}


///////////



function getLevel1(cardArr){
    filterTyping.addEventListener('change', function() {
        if(this.value === 'level'){
            card = cardArr;
            card.map(name => {
                level1.push(name.level);
            })
            getLevelList([...level1], cardArr);
        }
    })
}


function getLevelList(levelArr, cardArr){
    
    let filterList = levelArr.filter(distinct).map(name => {
        return `<option>${name}</option>`;
    })
    
    document.querySelector('.filterTyping1').innerHTML = filterList;
    filterGetLevel(cardArr);

}


///////////



//start of display Filtered Cards
function filterGetType(cardArr){
    filterBtn1.addEventListener('click', function() {

        let displayingType = cardArr.map(card => {
            if(filterTyping1.value === card.type){
                return `<div class="displayedCard" id="${card.id}" ><img id="displayedCardResult" src="${card.image_url}" height="180px" name="${card.id}"/></div>`
            }
        }).join('')
        displayCard.innerHTML = displayingType;
        displayCardResult(cardArr);
        
    })
    
}


/////////////




function filterGetAttribute(cardArr){
    filterBtn1.addEventListener('click', function() {

        let displayingType = cardArr.map(card => {
            if(filterTyping1.value === card.attribute){
                return `<div class="displayedCard" id="${card.id}" ><img id="displayedCardResult" src="${card.image_url}" height="180px" name="${card.id}"/></div>`
            }
        }).join('')
        displayCard.innerHTML = displayingType;
        displayCardResult(cardArr);
        
    })
    
}



/////////////




function filterGetRace(cardArr){
    filterBtn1.addEventListener('click', function() {

        let displayingType = cardArr.map(card => {
            if(filterTyping1.value === card.race){
                return `<div class="displayedCard" id="${card.id}" ><img id="displayedCardResult" src="${card.image_url}" height="180px" name="${card.id}"/></div>`
            }
        }).join('')
        displayCard.innerHTML = displayingType;
        displayCardResult(cardArr);
        
    })
    
}


/////////////




function filterGetLevel(cardArr){
    filterBtn1.addEventListener('click', function() {

        let displayingType = cardArr.map(card => {
            if(filterTyping1.value === card.level){
                return `<div class="displayedCard" id="${card.id}" ><img id="displayedCardResult" src="${card.image_url}" height="180px" name="${card.id}"/></div>`
            }
        }).join('')
        displayCard.innerHTML = displayingType;
        displayCardResult(cardArr);
        
    })
    
}


//end of display Filtered Cards