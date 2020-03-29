const express = require('express');
const router = express.Router();
const getData = require('../helpers/getData')
const hasImage = require('../helpers/hasImage')
const imageConfig = require('../helpers/images-config-data.json')
const manifest = require('../../build/manifest-map.json')
const cleanData = require('../helpers/cleanData')

router.get('/movie/:id/:title', (req, res)=>{

async function getMovie(){
   const movie = await getData(`movie/${req.params.id}`, '&append_to_response=credits')
   const videos = await getData(`movie/${req.params.id}/videos`)

   console.log(movie)
   let collection = null;
   if(movie.belongs_to_collection){
        collection = await getData(`collection/${movie.belongs_to_collection.id}`)
   }else{
        collection = null
   }

  
   return [movie, videos, collection]
}
        // .then(json =>{
        //     return cleanData(json.results, ["id", "title", "poster_path", "vote_average", "overview"]);
        // })

        getMovie().then(([data, trailers, collection]) => {
            
             data.genres = data.genres.map(obj => obj.name).join(", ")

            console.log(collection)
            return [data, trailers, collection]
        })
        .then(([data, trailers, collection]) => {

            // If collection, check if collection movies have image, else return null
            return [hasImage(data), trailers, collection ? hasImage(collection.parts) : null]
        })

        .then(([data, trailers, collection]) => {
            // console.log(collection)
            
console.log(data)
            res.render("detail-page.ejs", {
                movie:data,
                trailers:trailers.results,
                collection: collection,
                manifest: manifest,
                imageConfig: imageConfig
            })
           

        })
    
})

module.exports = router;