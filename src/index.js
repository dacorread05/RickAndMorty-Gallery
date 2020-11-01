// let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let API = 'https://rickandmortyapi.com/api/character/';

const get = (urlAPI, callback) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', urlAPI , true);
    xhr.onreadystatechange = function(even){
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                callback(null, JSON.parse(xhr.responseText));
            } else{
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
        console.log(character.id, character.name);
        son.innerHTML +=`
            <li>${character.name}</li>
        `
    }
    get(API + '?page=2', function(error1,dato1){
        if (error1) return console.error(error1);
        for ( let character of dato1.results){
            console.log(character.id, character.name);
            son.innerHTML +=`
                <li>
                    ${character.name}
                    <img src="${character.image}"></img>
                </li>
                
            `
        }
    });
});
// get(API, function(error1, dato1){
//     if (error1) return console.error(error1);
//     console.log(dato1);
    // get(API, 2, function(error2, dato2){
    //     if (error2) return console.error(error2);
    //     console.log(dato2.name);
    //     get(API, 3, function(error3, dato3){
    //         if (error3) return console.error(error3);
    //         console.log(dato3.name);
    //         get(API, 4, function(error4, dato4){
    //             if (error4) return console.error(error4);
    //             console.log(dato4.name);
    //         });
    //         get(API, 5, function(error5, dato5){
    //             if (error5) return console.error(error5);
    //             console.log(dato5.name);
    //         });
    //     });
    // });
});

