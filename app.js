const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const dotenv = require('dotenv');

const app = express();
const path = require('path');


app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(session({
  secret: 'urlshorter',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 100 * 30
  }
}));

app.use(flash());

app.use((req, res, next)=> {
  res.locals.success_msg = req.flash(('success_msg'));
  res.locals.error_msg = req.flash(('error_msg'));
  res.locals.error = req.flash(('error'));
  // res.locals.currentUser = req.user;
  next();
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});