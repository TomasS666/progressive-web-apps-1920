function hasImage(movie){

    if(Array.isArray(movie)){
        return movie.map(movie => {
            if(movie.poster_path == null){
                movie.poster_path = '/images/no-image.svg'
            }else{
                movie.poster_path = `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
            }
            return movie;
        })
    }else{
        if(movie.poster_path == null){
            movie.poster_path = '/images/no-image.svg'
        }else{
            movie.poster_path = `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
        }
        return movie;
    }

    
}


module.exports = hasImage;