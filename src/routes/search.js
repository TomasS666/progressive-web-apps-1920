const express = require('express');
const router = express.Router();

const querystring = require('querystring');
const getData = require('../helpers/getData')
const bodyParser = require('body-parser')
const cleanData = require('../helpers/cleanData')
const hasImage = require('../helpers/hasImage')
const manifest = require('../../build/manifest-map.json')

// Local data
// const data = require("../helpers/fakeData")
const genreIdList = require("../helpers/genreIdList")
// const bodyParser = require('body-parser')

// function getGenres(){

//     const genres = genreIdList.map(async (genre) =>{
//         return {
//             name: genre.name,
//             data: await getData("discover/movie", `with_genres=${genre.id}`)
//         }
//     })

//     return Promise.all(genres);
// }

router.get('/search/', (req, res)=>{


        let q = req.query.query;
        let genre = req.query.genre;
        let page = req.query.page;
        

        const params = {
            query: q,
            "page": page,
        }

        const nextParams = {
            "page": String(Number(page) + 1),
            query: q
        }

        const prevParams = {
            "page":  String(Number(page) - 1),
            query: q
        }

        const queryString = querystring.stringify(params)
        const path = req.path;
        const nextPage =  path + '?' + querystring.stringify(nextParams)
        const prevPage = path + '?' +  querystring.stringify(prevParams)


        getData('search/movie', `${queryString}`)
            .then(json =>{
                console.log(json)
                return {
                    pages: json.total_pages, 
                    data: cleanData(json.results, ["id", "title", "poster_path", "vote_average"])
                }
            })
            .then(json => {
                return { 
                    pages: json.pages,
                    data: hasImage(json.data)
                }
            })
            .then(json => {
                // console.log(json)
                res.render('search-results.ejs', {
                    url: queryString,
                    nextPage: nextPage,
                    prevPage: prevPage,
                    query: params,
                    meta: json.pages,
                    data: json.data,
                    form: genreIdList,
                    manifest: manifest
                })
            })
    
})

module.exports = router;