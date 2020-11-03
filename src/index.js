// let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let API = 'https://rickandmortyapi.com/api/character/';

const get = (urlAPI, callback) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', urlAPI , true);
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                callback(null, JSON.parse(xhr.responseText));
            } else {
                const error = new Error('Error' + urlAPI)
                return callback(error, null);
            }
        }
    }
    xhr.send();
}
get(API, function(error,dato){
    if (error) return console.error(error);
    var son = document.querySelector('#characteres')
    son.innerHTML = '';
    for ( let character of dato.results){
        // console.log(character.id, character.name);
        son.innerHTML +=`
        <div class="grid-item">
            <figure>
                <h4>${character.id} ${character.name}</h4>
                <img src="${character.image}"></img>
            </figure>
        </div>
        `
    }
    get(API + '?page=2', function(error1,dato1){
        if (error1) return console.error(error1);
        for ( let character of dato1.results){
            // console.log(character.id, character.name);
            son.innerHTML +=`
                <div class="grid-item">
                    <figure>
                        <h4>${character.id} ${character.name}</h4>
                        <img src="${character.image}"></img>
                    </figure>
                </div>
                `
        }
        get(API + '?page=3', function(error2, dato2){
            if (error2) return console.error(error2);
            for (let i = 0; i < 2; i++){
                son.innerHTML += `
                <div class="grid-item">
                    <figure>
                        <h4>${dato2.results[i].id} ${dato2.results[i].name}</h4>
                        <img src="${dato2.results[i].image}"></img>
                    </figure>
                </div>
                `
            }
        });
    });
});
get(API + '?page=3', function(error1, dato1){
    if (error1) return console.error(error1);
    console.log(dato1);
});

