const express = require('express');
const router = express.Router();
const getData = require('../helpers/getData')

// Local data
// const data = require("../helpers/fakeData")
const genreIdList = require("../helpers/genreIdList")


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

    console.log(test)

    return Promise.all(test);




    // return Promise.all(genreIdList.map((genre) =>{
    //     return getData("discover/movie", `with_genres=${genre.id}`)
    //  }))
}

router.get('/', (req, res)=>{

  
   
    
        getGenres()
 
        .then(objects => {
            // console.log(data)
         
            const json = objects.map(async (obj) => {
                return {
                    name: obj.name,
                    data: await obj.data.json()
                }
            })

            console.log(Promise.all(json))


            return Promise.all(json)
        })
        .then(data => {
            console.log("Dewdwfwefwefwefwfewef", data)
            // console.log("Data: ", data)

            return data;
        })

        .then(genre =>{
            res.render("overview.ejs", {
                data:genre
            })
        })

        

    // res.render("overview.ejs", {
    //                 data:data.results
    //             })

    
})

module.exports = router;