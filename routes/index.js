const Pet = require('../models/pet');

module.exports = (app) => {

app.get('/', (req, res) => {
  Pet.paginate({}, {limit:2}, (err, results) => {
    pages = []
    for (i = 1; i <= results.pages; i++){
      pages.push(i)
    }
    res.render('pets-index', { pets: results.docs , pages: pages, cur_page: results.page });    
  });
});

app.get('/search', (req, res) => {
  Pet.paginate({name:req.query.term}, {limit:3}, (err, results) => {
    pages = []
    for (i = 1; i <= results.pages; i++){
      pages.push(i)
    }
    res.render('pets-index', { pets: results.docs , pages: pages, cur_page: results.page });    
  });
});

}
