const path = require('path')
const render = require('../static-generator/render')
const hasImage = require('../helpers/hasImage')
const getData = require('../helpers/getData')
const genreIdList = require("../helpers/genreIdList")

// const imageConfig = require('../helpers/image-config-data.json')
const manifest = require('../../build/manifest-map.json')

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

}

function renderPage(){
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
        // console.log(genre)
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
        render({
            data:genre,
            form: genreIdList,
            manifest: manifest
        })
    }).catch(err => console.log(err))
}

renderPage()


module.exports = renderPage;