const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

// Enable CORS with specific origin and credentials
app.use(cors({
    origin: 'http://localhost:8080', // Your frontend URL
    credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Models
const models = require('./models');
models.sequelize.sync().then(() => {
    console.log('Database is connected');
}).catch((err) => {
    console.log(err, 'Something went wrong with the Database Update!');
});

// Passport
app.use(session({
    secret: process.env.SECRET || 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport/passport.js')(passport, models.user);

// Routes
const authRoutes = require('./routes/auth')(passport);
app.use('/', authRoutes);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});