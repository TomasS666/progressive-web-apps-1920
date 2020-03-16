require('dotenv').config()

const fetch = require('node-fetch');


function getData(endpoint, params){
    
    const apiKey = process.env.APIkey;
    
    
    let parameters = '';
    if(params){
         parameters = `&${params}`;
    }
    return fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}${parameters}`)
            .then(data => {
                return data.json()
            })

}

module.exports = getData