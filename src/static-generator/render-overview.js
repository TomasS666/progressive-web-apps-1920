const render = require('../static-generator/render')
const hasImage = require('../helpers/hasImage')
const getData = require('../helpers/getData')
const genreIdList = require("../helpers/genreIdList")
const manifest = require('../../build/manifest-map.json')

function getGenres() {

    const genres = genreIdList.map(async (genre) => {
        return {
            name: genre.name,
            data: await getData("discover/movie", `with_genres=${genre.id}`)
        }
    })

    return Promise.all(genres);

}

function renderPage() {
    getGenres()
        .then(data => {
            return (data.map(genre => {

                genre.data.results.map(movie => {
                    movie.slug = movie.title.replace(/\s+/g, '-').toLowerCase();
                    hasImage(movie)
                    return movie;
                })
                return genre
            }))

        })

        .then(genre => {
            render({
                data: genre,
                form: genreIdList,
                manifest: manifest
            })
        })
        .catch(err => console.log(err))
}

renderPage()


module.exports = renderPage;