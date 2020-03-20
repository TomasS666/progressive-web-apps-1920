
// const filesToBuild = [{
//     "filename": "index.html",
//     "path": "build/index.html"
// },{
//     "filename": "index.js",
//     "path": "build/js/index.js"
// }]


const filesToBuild = [{
    "filename": "index.html",
    "path": "src/static-generator/html/index.html",
    "template": "overview.ejs",
    "datafunc": "getGenres"
},{
    "filename": "test.html",
    "path": "src/static-generator/html/test.html",
    "template": "overview.ejs",
    "datafunc": "getGenres"
}]




module.exports = filesToBuild