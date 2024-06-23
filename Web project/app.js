const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const app = express();
const port = 3001;
const dbURI = 'mongodb+srv://hatem_1234567:qJg1kVrmmu20TX9V@cluster0.zzlforu.mongodb.net/collection?retryWrites=true&w=majority&appName=Cluster0';
const path = require('path');
const customerdata = require("./models/CustomersSchema");
const restaurantdata = require("./models/Restaurantschema");
const Reservation = require("./models/ReservationSchema");
const { ObjectId } = mongoose.Types;
const router = express.Router();


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


function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/signin');
    }
}


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
        const restaurants = await restaurantdata.find({ status: { $ne: 'pending' } }) // Exclude restaurants with status 'pending'
            .skip((perPage * page) - perPage)
            .limit(perPage);

        const count = await restaurantdata.countDocuments({ status: { $ne: 'pending' } }); // Count only non-pending restaurants

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

// Other routes and middleware definitions



app.get('/restaurant/:id', async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await restaurantdata.findById(restaurantId);
       
        res.render('details', { restaurant, user: req.session.user });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.post('/details', async (req, res) => {
    const { numberOfPeople, date, time, restaurantEmail } = req.body;

    try {
        // Check if user is authenticated
        if (!req.session.user) {
            return res.redirect('/signin');
        }

        const userEmail = req.session.user.email;

        // Create reservation document
        const reservation = new Reservation({
            restaurantEmail,
            customerEmail: userEmail,
            numberOfPeople,
            date,
            time
        });

        await reservation.save();
        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
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
    res.render('customerssignup', { errorMessage: null, formData: {} });
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


app.get('/admin', (req, res) => {
    // Check if admin is logged in
        res.render('admin',{user: req.session.user}); // Render admin.ejs
  
});



app.post('/customerssignup', async (req, res) => {
    const { email, name, password, phone, location } = req.body;

    try {
        // Check if email already exists in customerdata or restaurantdata or if it's the admin email
        const customer = await customerdata.findOne({ email });
        const restaurant = await restaurantdata.findOne({ email });

        if (email === 'admin@123' || customer || restaurant) {
            return res.render('customerssignup', { errorMessage: 'This email is already in use. Please choose another.', formData: req.body });
        }

        // If email is not taken, create a new customer
        const cdata = new customerdata({ name, email, password, phone, location });
        await cdata.save();
        res.redirect('/signin');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/restreq', (req, res) => {
    const rdata = new restaurantdata(req.body);
    
    rdata.save()
        .then(() => { 
            console.log('Restaurant data saved successfully');
            res.redirect('/signin'); 
        })
        .catch((err) => { 
            console.error('Error saving restaurant data:', err); 
            res.status(500).send('Internal Server Error');
        });
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user is admin
        if (email === 'admin@123' && password === '123') {
            // Admin login successful
            req.session.user = { email: 'admin@123' }; // Store minimal user data in session
            return res.redirect('/admin');
        }

        // Normal user login check
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





app.get('/requests', async (req, res) => {
    try {
        const pendingRestaurants = await restaurantdata.find({ status: 'pending' });

        res.render('requests', { restaurants: pendingRestaurants });
    } catch (error) {
        console.error('Error fetching pending restaurants:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/requests/:id/accept', async (req, res) => {
    const restaurantId = req.params.id;

    try {
        await restaurantdata.findByIdAndUpdate(restaurantId, { status: 'accepted' });
        res.redirect('/requests'); // Redirect back to view requests page
    } catch (err) {
        console.error('Error accepting restaurant:', err);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/requests/:id/decline', async (req, res) => {
    const restaurantId = req.params.id;

    try {
        await restaurantdata.findByIdAndDelete(restaurantId);
        res.redirect('/requests'); // Redirect back to view requests page
    } catch (err) {
        console.error('Error declining restaurant:', err);
        res.status(500).send('Internal Server Error');
    }
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

