const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3009;
const exphbs = require('express-handlebars');
// const hbs = exphbs.create({});
const hbs = exphbs.create({ helpers });

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store)

// Implement cookie duration of 2 minutes in maxAge when session is created per login
// The cookie will be clear in the browser when it expires and thus the client-user must log in
const twoMinutes = (60 + 60 ) * 1000 // milliseconds;
const sess = {
  secret: 'Just Not Too Critical To Be a Secrete', // left here for Heroku deployment or it will error out 500 
  cookie: { maxAge: twoMinutes },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

sequelize.sync({ force: false }).then(() => {  
  app.listen(PORT, () =>  console.log(`http://localhost:${PORT}/ \nhttp://localhost:${PORT}/login`));
  
});

