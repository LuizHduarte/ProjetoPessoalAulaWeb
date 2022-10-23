
function initialFetch (){
    let url = localStorage.getItem("typeFetch")
    fetch(url)
    .then(response => response.json())
    .then(json => getData(json))
    .catch(err => console.log(err))
}

function pkmFetch(){
    var url = localStorage.getItem("FetchContent")
    fetch(url)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))
}

async function fetchPkmCard (url){
    let response = await fetch(url)
    return response.json()
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

function createPkmDiv(data, url){
    let dataDiv = document.createElement("div")
    dataDiv.className = "pkmCard"

    let linkDiv = document.createElement("a")
    linkDiv.onclick = function(){localStorage.setItem("FetchContent", url)}
    linkDiv.href = "../pkmDetails/pkm.html"

    let spriteDiv = document.createElement("img")
    spriteDiv.src = data.sprites.other['official-artwork'].front_default;
    spriteDiv.className = "spriteDiv"
    linkDiv.appendChild(spriteDiv)
    linkDiv.className = "linkDiv"
    
    let pkmName = document.createElement("span")
    pkmName.innerHTML = data.name
    pkmName.className="pkmName"

    let pkmElementContainer = document.createElement("div")
    pkmElementContainer.className = "pkmElementContainer"

    let pkmTypeOne = document.createElement("span")
    pkmTypeOne.innerHTML = data.types[0].type.name
    pkmTypeOne.id = verifyElementType(data.types[0].type.name)
    pkmTypeOne.className = "pkmElementDiv";
    pkmTypeOne.onclick = () =>{
        localStorage.setItem("typeFetch" , data.types[0].type.url)
        window.location.href = "./type.html";
    }

    dataDiv.appendChild(linkDiv)
    dataDiv.appendChild(pkmName)
    dataDiv.appendChild(pkmElementContainer)

    pkmElementContainer.appendChild(pkmTypeOne)

    if(data.types.length > 1){

        let pkmTypetwo = document.createElement("span")
        pkmTypetwo.id = verifyElementType(data.types[1].type.name)
        pkmTypetwo.className = "pkmElementDiv";
        pkmTypetwo.innerHTML = data.types[1].type.name
        pkmTypetwo.onclick = () =>{
            localStorage.setItem("typeFetch" , data.types[1].type.url)
            window.location.href = "./type.html";
        }
        pkmElementContainer.appendChild(pkmTypetwo)
    }
    return dataDiv
}

async function getData(json) {
    let mainDiv = document.getElementById("mainDiv")
    console.log(json.pokemon)
    json.pokemon.map((pkm) =>{
        console.log(pkm.pokemon.url)
        let pkmCardDiv = document.createElement("div");
        pkmCardDiv.className = "mainPkmCard"
        
        fetchPkmCard(pkm.pokemon.url)
        .then(response => {
            pkmCardDiv.appendChild(createPkmDiv(response, pkm.pokemon.url))
        })

        mainDiv.appendChild(pkmCardDiv);
    })
}