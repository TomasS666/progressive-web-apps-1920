const express = require('express');
const router = express.Router();
const hasImage = require('../helpers/hasImage')
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

    // console.log(test)

    return Promise.all(test);




    // return Promise.all(genreIdList.map((genre) =>{
    //     return getData("discover/movie", `with_genres=${genre.id}`)
    //  }))
}

router.get('/', (req, res)=>{

  
   

        getGenres()
 
        // .then(objects => {
        //     // console.log(data)
         
        //     const json = objects.map(async (obj) => {
        //         return {
        //             name: obj.name,
        //             data: await obj.data.json()
        //         }
        //     })

        //     // console.log(Promise.all(json))


        //     return Promise.all(json)
        // })
        .then(data => {
            // console.log("Dewdwfwefwefwefwfewef", data)
            // console.log("Data: ", data)

           return (data.map(genre =>{
               
                genre.data.results.map(movie =>{
                    movie.slug = movie.title.replace(/\s+/g, '-').toLowerCase();
                    hasImage(movie)
                    return movie;
                })
                return genre
            }))

            // return data;
        })

        .then(genre =>{

            // console.log("Genres: " + genre[0].data.results[0].slug)

            res.render("overview.ejs", {
                data:genre,
                form: genreIdList
            })
        })

        

    // res.render("overview.ejs", {
    //                 data:data.results
    //             })

    
})

module.exports = router;