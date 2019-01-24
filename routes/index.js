const Pet = require('../models/pet');

module.exports = (app) => {

app.get('/', (req, res) => {
  Pet.paginate({}, {limit:2}, (err, results) => {
    console.log(results)
    console.log(results.pages)
    pages = []
    for (i = 1; i <= results.pages; i++){
      pages.push(i)
    }
    console.log(pages)
    res.render('pets-index', { pets: results.docs , pages: pages, cur_page: results.page });    
  });
});
}
