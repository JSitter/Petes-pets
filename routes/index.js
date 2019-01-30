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

// SEARCH
app.get('/search', function (req, res) {
  Pet
      .find(
          { $text : { $search : req.query.term } },
          { score : { $meta: "textScore" } }
      )
      .sort({ score : { $meta : 'textScore' } })
      .limit(20)
      .exec(function(err, pets) {
        if (err) { return res.status(400).send(err) }

        if (req.header('Content-Type') == 'application/json') {
          return res.json({ pets: pets });
        } else {
          return res.render('pets-index', { pets: pets, term: req.query.term });
        }
      });
});

}
