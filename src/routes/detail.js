const express = require('express');
const router = express.Router();
const getData = require('../helpers/getData')
const hasImage = require('../helpers/hasImage')
const path = require('path')
const render = require('../static-generator/render')

// Local data
// const data = require("../helpers/fakeData")

router.get('/movie/:id/:title', (req, res)=>{
console.log("hallo")

// getData(`movie/${req.params.id}`)
// .then(data => data.json())
// .then(json => {
    
//     console.log(json)
//     res.end()
// })



    // getData(`movie/${req.params.id}`)
    Promise.all([
        getData(`movie/${req.params.id}`),
        getData(`movie/${req.params.id}/videos`)
    ])
        // .then(json =>{
        //     return cleanObjects(json.results, ["id", "title", "poster_path", "vote_average", "overview"]);
        // })

        .then(([data, trailers]) => {
            // console.log(data)
             data.genres = data.genres.map(obj => obj.name).join(", ")

            console.log(data)
            return [data, trailers]
        })
        .then(([data, trailers]) => [hasImage(data), trailers])
        // .then(([data, trailers]) => {
        //  console.log('GOO:', trailers)

        //     res.render("detail-page.ejs", {
        //         movie:data,
        //         trailers:trailers.results
        //     })
        // })
        .then(([data, trailers]) => {
            res.render("detail-page.ejs", {
                movie:data,
                trailers:trailers.results
            })

            
                // render({
                //     movie:data,
                //     trailers:trailers.results
                // }).then(html => {
                //     res.sendFile(path.resolve(__dirname,'../static-generator/html/detail-1.html'))
                // })
            
                

        })

    // res.render("detail-page.ejs", {
    //                 movie:data
    //             })

    // console.log(req.params.id)
    
})

module.exports = router;