

// Function to update the restaurant details in the HTML
function updateRestaurantDetails(restaurant) {
    // Update text and image
    document.getElementById('restaurant-name').textContent = restaurant.name;
    document.getElementById('restaurant-image').src = restaurant.image;
    document.getElementById('restaurant-description').textContent = restaurant.description;

    // Generate the HTML content for the info-icons
    const infoIconsHtml = `
        <a href="${restaurant.locationUrl}" target="_blank">&#x1F4CD; Location</a>
        <span id="phone-icon">&#x1F4DE; Phone</span>
        <a href="${restaurant.menuUrl}" target="_blank">&#x1F374; Menu</a>
    `;

    // Insert the HTML into the info-icons div
    const infoIconsDiv = document.querySelector('.info-icons');
    infoIconsDiv.innerHTML = infoIconsHtml;

    // Attach click event to phone icon after it has been added to the DOM
    const phoneIcon = document.getElementById('phone-icon');
    phoneIcon.addEventListener('click', function() {
        // Call the function to show the phone message
        showPhoneMessage(restaurant.phone);
    });
}

// Function to show the phone number message
function showPhoneMessage(phoneNumber) {
    const phoneMessage = document.getElementById('phone-message');
    const phoneNumberElement = document.getElementById('phone-number');
    phoneNumberElement.textContent = `Call us: ${phoneNumber}`;
    phoneMessage.style.display = 'block';
}

// Function to close the phone number message
function closePhoneMessage() {
    const phoneMessage = document.getElementById('phone-message');
    phoneMessage.style.display = 'none';
}

// Load the restaurant details based on the URL parameter
document.addEventListener('DOMContentLoaded', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const restaurantId = urlParams.get('id');

    if (restaurantId && restaurantData[restaurantId]) {
        updateRestaurantDetails(restaurantData[restaurantId]);
    } else {
        document.getElementById('restaurant-name').textContent = 'Restaurant Not Found';
    }

    // Attach event listener to the close button of the phone message
    const closePhoneMessageBtn = document.getElementById('close-phone-message');
    if (closePhoneMessageBtn) {
        closePhoneMessageBtn.addEventListener('click', closePhoneMessage);
    }
});










//modes for sign in
document.addEventListener('DOMContentLoaded', function() {
    var mode = localStorage.getItem('mode'); // 0 for signed out, 1 for signed in
    var username = localStorage.getItem('username');

    if (mode === '1' && username&&username==='admin@123') {
        var signinLink = document.getElementById('signinLink');
        signinLink.textContent = username + ' \uD83D\uDC68'; // Display the username with an emoji
        signinLink.href = 'admin.html';
    }
    else if(mode === '1' && username){
        var signinLink = document.getElementById('signinLink');
        signinLink.textContent = username + ' \uD83D\uDC68'; // Display the username with an emoji
        signinLink.href = 'profile.html';
    }

    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        var email = document.getElementById('email').value.toLowerCase();
        var password = document.getElementById('password').value;

        // Admin check
        if (email === 'admin@123' && password === '123') {
            localStorage.setItem('mode', '1');
            localStorage.setItem('username', 'admin@123'); // Admin as a special username
            window.location.href = 'admin.html';
            
        } else {
            var allUsers = JSON.parse(localStorage.getItem('users')) || [];
            var acceptedRestaurants = JSON.parse(localStorage.getItem('acceptedRestaurants')) || [];
            var requestFormData = JSON.parse(localStorage.getItem('requestFormData')) || [];

            // Combine all user data sources into one array
            var combinedUsers = allUsers.concat(acceptedRestaurants, requestFormData);

            var userExists = combinedUsers.some(function(user) {
                return user.email === email && user.password === password;
            });

            if (userExists) {
                localStorage.setItem('mode', '1');
                localStorage.setItem('username', email);
                history.back(); // Go back to the previous page or redirect as needed
            } else {
                alert('Invalid email or password. Please try again.');
            }
        }
    });
});










document.getElementById('reservation-button').addEventListener('click', function() {
    var mode = localStorage.getItem('mode'); // Get mode from local storage
    var loginPrompt = document.getElementById('login-prompt');
    var reservationForm = document.getElementById('reservation-form');
    var modalCover = document.createElement('div');
    modalCover.className = 'modal-cover';

    document.body.appendChild(modalCover); // Add cover to the body

    if(mode === '1') {
        // User is signed in
        reservationForm.style.display = 'block';
        modalCover.style.display = 'block';
    } else {
        // User is not signed in
        loginPrompt.style.display = 'block';
        modalCover.style.display = 'block';
    }

    // Close modals on background click
    modalCover.addEventListener('click', function() {
        reservationForm.style.display = 'none';
        loginPrompt.style.display = 'none';
        modalCover.style.display = 'none';
        document.body.removeChild(modalCover);
    });
});





// detailsjava.js
document.addEventListener('DOMContentLoaded', function() {
    // Function to get the query parameter by name
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Retrieve the id from the URL
    const restaurantId = getQueryParam('id');

    // Retrieve the list of accepted restaurants
    const acceptedRestaurants = JSON.parse(localStorage.getItem('acceptedRestaurants')) || [];
    // Find the restaurant data by id
    const restaurant = acceptedRestaurants.find(r => r.id === restaurantId);

    if (restaurant) {
        // Set the content on the page
        document.getElementById('restaurant-name').textContent = restaurant.name;
        document.getElementById('restaurant-description').textContent = restaurant.description;
        document.getElementById('restaurant-image').src = restaurant.photoUrl;
        document.getElementById('restaurant-image').alt = `Image of ${restaurant.name}`;
        
        // Set links and other info
        document.getElementById('location-icon').href = `http://maps.google.com/?q=${restaurant.location}`;
        document.getElementById('phone-number').textContent = restaurant.phone;
        document.getElementById('menu-icon').href = restaurant.menuUrl;

        const reservationSubmitButton = document.getElementById('reservation-submit');
        reservationSubmitButton.value = restaurant.email;

    } else {
        console.error('Restaurant data not found.');
    }

    // Show phone number in modal
    document.getElementById('phone-icon').addEventListener('click', () => {
        document.getElementById('phone-message').style.display = 'block';
    });

    // Close phone message
    document.getElementById('close-phone-message').addEventListener('click', () => {
        document.getElementById('phone-message').style.display = 'none';
    });
});




document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reservation-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        // Retrieve username from localStorage
        const username = localStorage.getItem('username');
        if (!username) {
            alert('Please log in to make a reservation.');
            return;
        }

        // Collect form data
        const formData = {
            status:'pending',
            username: username,
            rusername:document.getElementById('reservation-submit').value,
            number: document.getElementById('number').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value
        };

        // Save registration data in localStorage
        let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservations.push(formData);
        localStorage.setItem('reservations', JSON.stringify(reservations));

        
        window.back();
    });
});
