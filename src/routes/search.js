const express = require('express');
const router = express.Router();

const querystring = require('querystring');
const getData = require('../helpers/getData')
const bodyParser = require('body-parser')
const cleanObjects = require('../helpers/cleanData')
const hasImage = require('../helpers/hasImage')

// Local data
// const data = require("../helpers/fakeData")
const genreIdList = require("../helpers/genreIdList")
// const bodyParser = require('body-parser')

function getGenres(){
    // return (Promise.all(genreIdList.map((genre) =>{
    //    return getData("discover/movie", `with_genres=${genre.id}`)
    // })))

    const test = genreIdList.map(async (genre) =>{
        return {
            name: genre.name,
            data: await getData("discover/movie", `with_genres=${genre.id}`)
        }
    })

    // console.log(test)

    return Promise.all(test);




    // return Promise.all(genreIdList.map((genre) =>{
    //     return getData("discover/movie", `with_genres=${genre.id}`)
    //  }))
}

router.get('/search/', (req, res)=>{

  
        // const query = req.body.searchValue;

        

        let q = req.query.query;
        let genre = req.query.genre;
        let page = req.query.page;
        
        // res.send(`${genre} ${query} ${page}`)

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


        // res.send(`
        
        // Querystring :${queryString} <br>
        // nextPage: ${nextPage} <br>
        // prevPage: ${prevPage} <br>
        // baseUrl: ${req.baseUrl} <br>
        // originalUrl: ${req.originalUrl} <br>
        // path: ${req.path}
        
        
        
        
        
        // `)

        getData('search/movie', `${queryString}`)
            // .then(data => {
            //    return data.json()
               
            // })
            .then(json =>{
                console.log(json)
                return {
                    pages: json.total_pages, 
                    data: cleanObjects(json.results, ["id", "title", "poster_path", "vote_average"])
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
                    form: genreIdList
                })
            })
    
        // getGenres()
 
        // .then(objects => {
        //     // console.log(data)
         
        //     const json = objects.map(async (obj) => {
        //         return {
        //             name: obj.name,
        //             data: await obj.data.json()
        //         }
        //     })

        //     console.log(Promise.all(json))


        //     return Promise.all(json)
        // })
        // .then(data => {
        //     console.log("Dewdwfwefwefwefwfewef", data)
        //     // console.log("Data: ", data)

        //     return data;
        // })

        // .then(genre =>{
        //     res.render("overview.ejs", {
        //         data:genre
        //     })
        // })

        

    // res.render("overview.ejs", {
    //                 data:data.results
    //             })

    
})

module.exports = router;