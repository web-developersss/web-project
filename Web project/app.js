const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const app = express();
const port = 3001;
const dbURI = 'mongodb+srv://hatem_1234567:F2EtlzpKM2v7t977@cluster0.zzlforu.mongodb.net/collection?retryWrites=true&w=majority&appName=Cluster0';
const path = require('path');
const customerdata = require("./models/CustomersSchema");
const restaurantdata = require("./models/Restaurantschema");
const Reservation = require("./models/ReservationSchema");
const { ObjectId } = mongoose.Types;

// Initialize MongoDBStore for session storage
const store = new MongoDBStore({
    uri: dbURI,
    collection: 'sessions' // Specify the collection name for sessions
});

// Catch errors in MongoDBStore initialization
store.on('error', function(error) {
    console.error('Session store error:', error);
});

// Middleware to set up session
app.use(session({
    secret: 'your-secret-key', // Change this to a long random string for production
    resave: false,
    saveUninitialized: true,
    store: store, // Use MongoDBStore for session storage
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Session expiration time (1 day)
    }
}));

// Other middleware and configuration
app.use(express.static('views'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes and handlers
app.get('/', (req, res) => {
    customerdata.find()
        .then((result) => {
            res.render('Home', { arr: result, user: req.session.user });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

app.get('/resturants', async (req, res) => {
    const perPage = 6;
    const page = parseInt(req.query.page) || 1;

    try {
        const restaurants = await restaurantdata.find()
            .skip((perPage * page) - perPage)
            .limit(perPage);

        const count = await restaurantdata.countDocuments();

        res.render('resturants', {
            restaurants,
            current: page,
            pages: Math.ceil(count / perPage),
            user: req.session.user
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/restaurant/:id', async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await restaurantdata.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).send('Restaurant not found');
        }
        res.render('details', { restaurant, user: req.session.user });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/restaurant/:id', (req, res) => {
  const restaurantId = req.params.id;
  restaurantdata.findById(restaurantId)
      .then(restaurant => {
          if (restaurant) {
              res.render('/details', { user: req.session.user });
          } else {
              res.send('Restaurant not found');
          }
      })
      .catch(err => console.log(err));
});

app.get('/aboutUs', (req, res) => {
    res.render('aboutUs', { user: req.session.user });
});

app.get('/signin', (req, res) => {
    res.render('signin', { user: req.session.user });
});

app.get('/contact', (req, res) => {
    res.render('contact', { user: req.session.user });
});

app.get('/customerssignup', (req, res) => {
    res.render('customerssignup', { user: req.session.user });
});

app.get('/restreq', (req, res) => {
    res.render('restreq', { user: req.session.user });
});

app.get('/details', (req, res) => {
    res.render('details', { user: req.session.user });
});
app.get('/profile', (req, res) => {
  res.render('profile', { user: req.session.user });
});



app.post('/customerssignup', (req, res) => {
    const cdata = new customerdata(req.body);
    cdata.save()
        .then(() => { res.redirect('/signin'); })
        .catch((err) => { console.log(err); });
});

app.post('/restreq', (req, res) => {
    const rdata = new restaurantdata(req.body);
    rdata.save()
        .then(() => { res.redirect('signin'); })
        .catch((err) => { console.log(err); });
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await customerdata.findOne({ email });
        if (!user) {
            return res.status(401).send("User not found");
        }
        if (user.password === password) {
            req.session.user = user; // Store user data in session
            res.redirect('/');
        } else {
            res.status(401).send("Incorrect email or password");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal server error");
    }
});
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
      if (err) {
          return res.status(500).send('Failed to logout');
      }
      res.redirect('/');
  });
});



// MongoDB connection and server start
mongoose.connect(dbURI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}/`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

