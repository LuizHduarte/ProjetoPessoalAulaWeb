function pkmFetch() {
    let url = localStorage.getItem("FetchContent")
    fetch(url)
    .then(response => response.json())
    .then(json => getData(json))
    .catch(err => console.log(err))
}

function reloadPageNext(){
    const nextPage = localStorage.getItem("nextPkm")
    localStorage.setItem("FetchContent", nextPage)
    location.reload()
}

function reloadPagePrev(){
    const prevPage = localStorage.getItem("prevPkm")
    localStorage.setItem("FetchContent", prevPage)
    location.reload()
}

function verifyElementType(type){

    if(type == "bug"){
        return "pkmElementDivBug"
    }

    if(type == "dark"){
        return "pkmElementDivDark"
    }

    if(type == "dragon"){
        return "pkmElementDivDragon"
    }

    if(type == "electric"){
        return "pkmElementDivElectric"
    }

    if(type == "fairy"){
        return "pkmElementDivFairy"
    }
    
    if(type == "fighting"){
        return "pkmElementDivFighting"
    }

    if(type == "fire"){
        return "pkmElementDivFire"
    }

    if(type == "flying"){
        return "pkmElementDivFlying"
    }

    if(type == "ghost"){
        return "pkmElementDivGhost"
    }

    if(type == "grass"){
        return "pkmElementDivGrass"
    }

    if(type == "ground"){
        return "pkmElementDivGround"
    }

    if(type == "ice"){
        return "pkmElementDivIce"
    }

    if(type == "normal"){
        return "pkmElementDivNormal"
    }

    if(type == "poison"){
        return "pkmElementDivPosion"
    }

    if(type == "psychic"){
        return "pkmElementDivPsychic"
    }

    if(type == "rock"){
        return "pkmElementDivRock"
    }

    if(type == "steel"){
        return "pkmElementDivSteel"
    }

    if(type == "water"){
        return "pkmElementDivWater"
    }   
}

function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
}

async function getData(json) {

    console.log(json)

    localStorage.setItem("nextPkm" , "https://pokeapi.co/api/v2/pokemon/"+(json.id+1))
    if(json.id >1){
        localStorage.setItem("prevPkm" , "https://pokeapi.co/api/v2/pokemon/"+(json.id-1))
        
    }
    else{
        const x = localStorage.getItem("FetchContent")
        localStorage.setItem("prevPkm" , x)
        let prevButton = document.getElementById("prevButton")
        prevButton.disabled = true;
    }

    if(json.id == 905){
        const x = localStorage.getItem("FetchContent")
        localStorage.setItem("nextPkm" , x)
        let nextButton = document.getElementById("nextButton")
        nextButton.disabled = true;
    }

    let spriteDiv = document.getElementById("spriteDiv")
    spriteDiv.src = json.sprites.other['official-artwork'].front_default;

    let pkmName = document.getElementById("pkmName")
    pkmName.innerHTML = json.name

    let HeightDiv = document.getElementById("HeightValue")
    HeightDiv.innerText = (json.height/10) + " m";

    let WeightValue = document.getElementById("WeightValue")
    WeightValue.innerText = (json.weight/10) + " kg";

    let AbilityValue = document.getElementById("AbilityValue")
    AbilityValue.innerHTML = json.abilities[0].ability.name;

    let IdValue = document.getElementById("IdValue")
    console.log(addLeadingZeros(json.id))
    IdValue.innerHTML = addLeadingZeros(json.id, 3);

    let pkmDescription = document.getElementById("pkmDescription")
    fetch(json.species.url)
    .then(response => response.json())
    .then(json => {
        console.log(json)

        const Rnumbers = [8, 9, 10, 11];
        const random = Math.floor(Math.random() * Rnumbers.length);
        console.log(random)
        pkmDescription.innerHTML = (json.flavor_text_entries[Rnumbers[random]].flavor_text)
    })
    .catch(err => console.log(err))
     

    let pkmAssets = document.getElementById("pkmAssets")
    
    let pkmElementContainer = document.createElement("div")
    pkmElementContainer.className = "pkmElementContainer"

    let pkmTypeOne = document.createElement("span")
    pkmTypeOne.innerHTML = json.types[0].type.name
    pkmTypeOne.id = verifyElementType(json.types[0].type.name)
    pkmTypeOne.className = "pkmElementDiv";
    pkmTypeOne.onclick = () =>{
        localStorage.setItem("typeFetch" , json.types[0].type.url)
        window.location.href = "../types/type.html";
    }

    pkmElementContainer.appendChild(pkmTypeOne)

    if(json.types.length > 1){

        let pkmTypetwo = document.createElement("span")
        pkmTypetwo.id = verifyElementType(json.types[1].type.name)
        pkmTypetwo.className = "pkmElementDiv";
        pkmTypetwo.innerHTML = json.types[1].type.name
        pkmElementContainer.appendChild(pkmTypetwo)
        pkmTypetwo.onclick = () =>{
            localStorage.setItem("typeFetch" , json.types[1].type.url)
            window.location.href = "../types/type.html";
        }
    }

    pkmAssets.appendChild(pkmElementContainer)
    
}