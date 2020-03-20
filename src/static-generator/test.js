// More for fun and experimenting 

// Terrible shameful code that needs to be removed or refactored soon, 
// Yet useful and it works. 




const ejs = require('ejs');
var fs = require('fs');
const path = require("path");
const genreIdList = require('../helpers/genreIdList.js')
const getData = require('../helpers/getData.js')
const hasImage = require('../helpers/hasImage.js')

// Note to self : Check out  https://stackoverflow.com/questions/30362733/handling-errors-in-promise-all

const buildconfig = require('./test.config.js')

var dataFunctions = {
    getGenres: getGenres
}


// Check if file exists. Accecpts path to file and returns promise 

async function fileExist(file){
    // console.log(`${file}`)
    // const response = await fs.access('build/index.html', err => console.log(err))

    // console.log(response + 'wefwefwef')
    // return response

    return new Promise((resolve, reject) =>{
        fs.access(file, (err)=>{
           if(err){
               reject(err)
            //    return err
           }else{
               resolve(true)
           }
       })
   })
}

async function checkFiles(buildconfig) {

    // return Promise.all(buildconfig.map(async file => {
    //     // console.log(file)
    //     return {
    //         "exists" : await fileExist(file.path),
    //         "file" : file
    //     }
    // }))

    return Promise.all(buildconfig.map(async file => {
        // console.log(file)
        return {
            "exists" : file.path,
            "file" : file
        }
    }))

}

checkFiles(buildconfig)
    .then(res => {
   
        for (let value of res){
            console.log(`Result: ${value}`)
        }

        return res
       
    })
    .then(res => {
        console.log(res)

        // const result = res.reduce(res => res)

        const results = res;
        if(results.length > 1){
            results.map(result =>{
                return render(
                    result.file.template,
                    result.file.datafunc,
                    result.file.path,
                    result.file.filename
                )
            })  
        }else{
            const arr = results.reduce(value => value)
            render(
                arr.file.template,
                arr.file.datafunc,
                arr.file.path,
                arr.file.filename
            )
        }
        
    })
    .catch(err => console.log(err))

async function getGenres(){

    const test = genreIdList.map(async (genre) =>{
        return {
            name: genre.name,
            data: await getData("discover/movie", `with_genres=${genre.id}`)
        }
    })

    const data = await Promise.all(test)
        // console.log("Dewdwfwefwefwefwfewef", data)
        // console.log("Data: ", data)

    const genres = data.map(genre =>{
        // console.log(genre)
            genre.data.results.map(movie =>{
                movie.slug = movie.title.replace(/\s+/g, '-').toLowerCase();
                hasImage(movie)
                return movie;
            })
            return genre
        })

        return {
            data: genres,
            form: genreIdList
        }
}


// testing()

// function testing(){
//     checkArgs(process.argv)
// }

// function checkArgs(args){

//     // Remove the first two arguments which are not needed
//     const arguments = args.slice(2);

//     if(Array.isArray(arguments) && arguments.length){

//         for(let value of arguments){
//             console.log(`Build ${value}`)
//             // console.log(arguments)
//         }

//         // const file = arguments.reduce(value => value)
//         // console.log(file)

//         // fs.access(file, fs.constants.F_OK, (err) => {
//         //     console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
//         // });
//     }
// }

async function render(template, datafunc, destn, filename){
    // const template = fs.readFileSync(path.resolve(__dirname,'../views/detail-page.ejs'),  'utf-8')

    // const template = fs.readFileSync('views/detail-page.ejs',  'utf-8')

    console.log("\x1b[32m%s\x1b[0m", `${datafunc} ${template} ${destn} ${filename}`)

    // if(global[datafunc]){
    //     console.log(datafunc, template, destn, filename)
    // }else{
    //     console.log(datafunc + "Works")
    // }

    const data = await dataFunctions[datafunc]()
    console.log(data)
    console.log(path.join(__dirname, '../views', template))

    const parsedHTML = await ejs.renderFile( path.join(__dirname, '../views', template), data)

    // console.log(parsedHTML)
    
    const html = writeHTML(parsedHTML, destn)
        // .then(html => writeHTML(data, html))
        // .catch(err => console.log(err))
    return html;

}

function writeHTML(html, destn){
    console.log(html, destn)
    fs.writeFileSync(path.resolve(destn), html, 'utf8');
}

module.exports = checkFiles