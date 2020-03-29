const imgConfig = require('./images-config-data.json')

function hasImage(movie) {

    if (Array.isArray(movie)) {
        return movie.map(movie => {
            if (movie.poster_path == null) {
                movie.poster_path = '/images/no-image.svg'
            } else {
                srcsetPaths(movie)
            }
            return movie;
        })
    } else {
        if (movie.poster_path == null) {
            movie.poster_path = '/images/no-image.svg'
        } else {
            srcsetPaths(movie)
        }
        return movie;
    }
}





function srcsetPaths(movie) {
    const imagesPaths = imgConfig.images.poster_sizes

        .map((size, i) => {
            i++

            const width = size != "original" ?
                `${ size.substring(1) }w` :
                `${ 2000 }w`

            return `https://image.tmdb.org/t/p/${size}/${movie.poster_path} ${width}`
        }).join(", ")


    movie.images = imagesPaths
    movie.poster_path = `https://image.tmdb.org/t/p/w342/${movie.poster_path}`

    return movie;
}

module.exports = hasImage;