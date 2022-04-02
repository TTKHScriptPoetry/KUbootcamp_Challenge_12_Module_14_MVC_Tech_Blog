const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = express.Router();


const app = express();
const PORT = process.env.PORT || 3008;
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
// const hbs = exphbs.create({ helpers });

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sess = {
  secret: 'Not Too Critical To Be a Secrete', // left here for Heroku deployment or it will error out 500 
  cookie: {},
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

sequelize.sync({ force: true }).then(() => {  
  app.listen(PORT, () =>  console.log(`http://localhost:${PORT}/ \nhttp://localhost:${PORT}/login`));
  
});

