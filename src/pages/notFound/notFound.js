function searchPkm(){
    let searchValue = document.getElementById("inputBar")
    let searchUrl =  "https://pokeapi.co/api/v2/pokemon/" + searchValue.value
    localStorage.setItem("FetchContent" , searchUrl)
    window.location.replace("../pkmDetails/pkm.html")
}