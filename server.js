const express = require('express')
const app = express();
const hbs = require('hbs')
const fs = require('fs')
const port = process.env.PORT || 3000;


app.use(express.static(__dirname + '/public'))
app.use((req, res, next) => {
  let now = new Date().toString()
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server log')
    }
  })
  next();
})
app.use((req, res, next) => {
  res.render('maintenance.hbs');
})

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: "Home Page",
    message: "Hola sinoras e signor"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: "About Page"
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "Unable to fulfill the request"
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})