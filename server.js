const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (error) => {
    if (error) {
      console.log('unable to append to log:', error)
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + "/public")) ;

app.get("/", (req, res) => {
  // res.send("<h1>Hello Express</h1>");
  res.render('welcome.hbs', {
    pageTitle:"Welcome",
    currentYear: new Date().getFullYear(),
    welcomeMessage:"Welcome to the site!"
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: "About Page",
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage:"Could not handle request."
  });
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
