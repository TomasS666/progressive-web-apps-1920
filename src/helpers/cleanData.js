
/* ==== Semi generic object cleaning function ==== */

/*

    I wanted a function that could take multiple objects and an array of the desired
    key: value pairs. Problem with .map(... => {desiredKey: value}) is that you cannot just
    place a variable value in the desiredKey position. It would output the object like { desiredKey: "Tomas"}

    Kris helped me out with the last pieces of the puzzle. I return an array with objects. Within the map I iterate over
    the objects. Within the loop I take the fields array with the desired keys and iterate over them where

    Credits to: Guido Bouman and Kris Kuiper
*/

function cleanObjects(array, fields){
    return array.map(obj => {
        
        // www.github.com/kriskuiper
        return fields.reduce((tuples, field) => {
           
            tuples[field] = obj[field]

            return tuples
        }, {})
    })
}

module.exports = cleanObjects