const Pet = require('../models/pet');

module.exports = (app) => {

  /* GET home page. */
//   app.get('/', (req, res) => {
//     Pet.find().exec((err, pets) => {
//       res.render('pets-index', { pets: pets });    
//     });
//   });
// }

app.get('/', (req, res) => {
  Pet.paginate({}, {limit:2}, (err, results) => {
    console.log(results)
    console.log(results.pages)
    res.render('pets-index', { pets: results.docs , pages: results.pages });    
  });
});
}
