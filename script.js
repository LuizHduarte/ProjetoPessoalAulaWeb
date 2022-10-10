function initialFetch (){
    fetch("https://pokeapi.co/api/v2/pokemon?limit=6")
    .then(response => response.json())
    .then(json => getData(json.results))
    .catch(err => console.log(err))
}

async function fetchPkmCard (url){
    let response = await fetch(url)
    return response.json()
}

function createPkmDiv(data){
    let dataDiv = document.createElement("div")
    dataDiv.className = "pkmCard"
    let pkmName = document.createElement("span")
    pkmName.innerHTML = data.name

    let pkmTypeOne = document.createElement("span")
    pkmTypeOne.innerHTML = data.types[0].type.name

    dataDiv.appendChild(pkmName)
    dataDiv.appendChild(pkmTypeOne)

    if(data.types.length > 1){
        let pkmTypetwo = document.createElement("span")
        pkmTypetwo.innerHTML = data.types[1].type.name
        dataDiv.appendChild(pkmTypetwo)
    }

    return dataDiv
}

async function getData(json) {
    json.map((pkm) =>{
        let pkmCardDiv = document.createElement("div");
        pkmCardDiv.className = "mainPkmCard"
        
        fetchPkmCard(pkm.url)
        .then(response => {
            pkmCardDiv.appendChild(createPkmDiv(response))
        })

        document.body.appendChild(pkmCardDiv);
        
    })
}
