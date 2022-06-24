const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
//sacado de documentacion de PunkAPI:
const randomBeer = punkAPI.getRandom()


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res)=> {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    res.render('beers', {beers: beersFromApi}) 
  
  })
  .catch(error => console.log(error));

})
//addes line 10 for this working
app.get('/random-beer', (req, res)=> {
  
  punkAPI.getRandom()
  //ver en terminal la random beer:
  // .then(randomBeer => console.log('random Beer from the database: ', randomBeer))
  .then(randomBeer => {
    res.render('random-beer', {beers: randomBeer}) 
  })
  .catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));


