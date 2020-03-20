const ejs  = require('ejs');
const fs   = require('fs');
const path = require("path");



async function render(data){
    // const template = fs.readFileSync(path.resolve(__dirname,'../views/detail-page.ejs'),  'utf-8')

    // const template = fs.readFileSync('views/detail-page.ejs',  'utf-8')

    const parsedHTML = await ejs.renderFile( path.join(__dirname, '..', 'views/overview.ejs') , data )
        .then(html => writeHTML(data, html))


        return parsedHTML;

}

function writeHTML(data, html){
    fs.writeFileSync(path.resolve(__dirname,`../../build/overview.html`), html, 'utf8');
}

module.exports = render