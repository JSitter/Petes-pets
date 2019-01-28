const Pet = require('../models/pet');

module.exports = (app) => {

app.get('/', (req, res) => {
  Pet.paginate({}, {limit:10}, (err, results) => {
    pages = []
    for (i = 1; i <= results.pages; i++){
      pages.push(i)
    }
    res.render('pets-index', { pets: results.docs , pages: pages, cur_page: results.page });    
  });
});

app.get('/search', (req, res) => {
  term = new RegExp(req.query.term, 'i')
  const page = req.query.page || 1
  Pet.paginate({$or:[
    {'name': term},
    {'species': term}
  ]}, {page: page, limit:10}, (err, results) => {
    pages = []
    for (i = 1; i <= results.pages; i++){
      pages.push(i)
    }
    res.render('pets-index', { pets: results.docs , pages: pages, cur_page: page });    
  });
});

}
