const form = document.querySelector("form")
const body = document.querySelector("body")
let container = document.querySelector(".container");
let Films = "";
let butNum = [1,2,3,4,5,6];


function filmInfo(title){
    fetch(`http://www.omdbapi.com/?t=${title}&apikey=98f47082`)
    .then(res => res.json())
    .then(json => fetchInfo(json))

    function fetchInfo(obj){
        console.log(obj)
    body.innerHTML += `
    <h2>Film info:</h2>
    <div style = "display:flex;justify-content: center;">
    <div class = "element" style = "width:60%;padding:20px">
        <div><img src = ${obj.Poster}></div>
            <table>
                <tr> 
                    <td>Title:</td>
                    <td>${obj.Title}</td>
                </tr>
                <tr> 
                    <td>Released:</td>
                    <td>${obj.Released}</td>
                </tr>
                <tr> 
                    <td>Genre:</td>
                    <td>${obj.Genre}</td>
                </tr>
                <tr> 
                    <td>Country:</td>
                    <td>${obj.Country}</td>
                </tr>
                <tr> 
                    <td>Director:</td>
                    <td>${obj.Director}</td>
                </tr>
                <tr> 
                    <td>Writer:</td>
                    <td>${obj.Writer}</td>
                </tr>
                <tr> 
                    <td>Actors:</td>
                    <td>${obj.Actors}</td>
                </tr>
                <tr> 
                    <td>Awards:</td>
                    <td>${obj.Awards}</td>
                 </tr>
            </table>
    </div>
    </div>`;
    }
}


function Pag(str){
    console.log(str)
    if(str == "min" && butNum[0] > 1){
        for(let i = 0;i < butNum.length;i++){
            document.querySelector(`#p${i}`).textContent = --butNum[i];
        }
    }
    else if(str == "plus"){
        for(let i = 0;i < butNum.length;i++){  
            document.querySelector(`#p${i}`).textContent = ++butNum[i];
        }
    }
   
}


function PagCard(id){
    let num = document.querySelector(`#p${id}`).textContent;
    let count = 0;
    document.querySelector(".container").innerHTML = " ";
    for(let i = ((num-1)*3);i < (num*3);i++){
        if(Films.Search[i]){
            count++;
            document.querySelector(".container").innerHTML += `
            <div class = "element">
                <div><img src = ${Films.Search[i].Poster}></div>
                <div>
                <p> ${Films.Search[i].Type}</p>
                <p><h3>${Films.Search[i].Title}</h3></P>
                <p style = "font-size:35px;">${Films.Search[i].Year}</p>
                <button id = btn${i} onclick = "filmInfo(Films.Search[${i}].Title)">Details</button>
                </div>
            </div>
            `;     
        }
        
    }
    if(!count) document.querySelector("#res").innerHTML = `<div><h2>Movie not found!</h2></div>`;
    else document.querySelector("#res").innerHTML = `<div><h2>Films:</h2></div>`;
}





document.querySelector('[name="sub"]').onclick = (e) => {
    e.preventDefault();
    const title = form.querySelector('[name="title"]');
    const type = form.querySelector('[name="type"]');
    fetch(`http://www.omdbapi.com/?s=${title.value}&&type=${type.value}&page=2&apikey=98f47082`)
    .then(res => res.json())
    .then(json => getFilms(json))

    async function getFilms(json){
        Films = await json;
        container.innerHTML = "";
        if(Films.Search) document.querySelector("#res").innerHTML += `<div><h2>Films:</h2></div>`;
        else  document.querySelector("#res").innerHTML += `<div><h2>Movie not found!</h2></div>`;

        
        
        for(let i = 0;i < Films.Search.length;i++){
            if(i < 3){
            container.innerHTML += `
                <div class = "element">
                    <div><img src = ${Films.Search[i].Poster}></div>
                    <div>
                    <p> ${Films.Search[i].Type}</p>
                    <p><h3>${Films.Search[i].Title}</h3></P>
                    <p style = "font-size:35px;">${Films.Search[i].Year}</p>
                    <button id = btn${i} onclick = "filmInfo(Films.Search[${i}].Title)">Details</button>
                    </div>
                </div>
            `; 
            }
        } 
        body.innerHTML += `
        <div style = "display:flex; justify-content: center;">
            <div class = "pag">
                <button id = "min" onclick = "Pag('min')"> << </button>
            </div>
        </div>
        `;
        for(let i = 0;i < butNum.length;i++){
            document.querySelector(".pag").innerHTML += `
                <button id = "p${i}" onclick = "PagCard(${i})" >${butNum[i]}</button>
            `;
        }
        document.querySelector(".pag").innerHTML += `
        <button id = "plus" onclick = "Pag('plus')"> >> </button>
         `;
    }
}






   



