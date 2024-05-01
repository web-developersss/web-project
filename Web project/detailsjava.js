// Define restaurant data with additional properties for each restaurant
const restaurantData = {
    'stereo-cafe': {
        name: "Stereo Cafe",
        image: "https://www.foodandwine.com/thmb/fVmYbaQzXCz1Prx8VxrW9sMcjMU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Braciole-FT-RECIPE1122-66acf49cef0e4390bec780945709e7f3.jpg", // Replace with your actual image link
        description: "Enjoy a vibrant atmosphere and great music at Stereo Cafe.",
        locationUrl: 'http://maps.google.com/?q=Stereo+Cafe+Location',
        phone: '19706',
        menuUrl: 'http://stereocafe.com/menu'
    },
    'pepenero-restaurant': {
        name: "Pepenero Restaurant",
        image: "https://www.thespruceeats.com/thmb/NKrzAkVokEycHnVDEX6vi8Hg3RQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/creamy-tomato-pasta-481963-Hero-5b6afcf6c9e77c0050e73162.jpg", // Replace with your actual image link
        description: "Savor authentic Italian cuisine at Pepenero.",
        locationUrl: 'http://maps.google.com/?q=Pepenero+Restaurant+Location',
        phone: '+201010101342',
        menuUrl: 'http://pepenero.com/menu'
    },
    'sizzler-restaurant': {
        name: "Sizzler",
        image: "https://www.eatthis.com/wp-content/uploads/sites/4/2023/08/steak-sauce.jpeg?quality=82&strip=all&w=1200", 
        description: "A place where food and coziness compliment each other.",
        locationUrl: 'https://www.google.com/maps/dir/30.0631638,31.3198485/Sizzler+Steak+House+Point+90,+Point+90+Mall,+American+University%D8%8C,+New+Cairo+1%E2%80%AD/@30.0412039,31.2338473,11z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x145823394d9de723:0xe35d74c4942db62b!2m2!1d31.495498!2d30.0202436?entry=ttu',
        phone: '0225202630',
        menuUrl: 'https://sizzleregypt.com/menu/'
    },
    'la-casetta': {
        name: "La-Casetta",
        image: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/34a30e77063259.5c7cf3a10dcb1.jpg", 
        description: "Discover an array of enticing main dishes, each crafted with precision and passion to satisfy every palate.",
        locationUrl: 'https://www.google.com/maps?s=web&hl=en&lqi=ChVsYSBjYXNldHRhIHJlc3RhdXJhbnRIj8Hsx82rgIAIWiMQABABEAIYABgBGAIiFWxhIGNhc2V0dGEgcmVzdGF1cmFudJIBCnJlc3RhdXJhbnSaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVUk5hMlJUTW14M1JSQUKqAVkQASoZIhVsYSBjYXNldHRhIHJlc3RhdXJhbnQoADIfEAEiG_Il2EBYHUzLkOeii5E4sQra-M4CccG2ilyPOTIZEAIiFWxhIGNhc2V0dGEgcmVzdGF1cmFudA&phdesc=e_o9ezo3EKI&vet=12ahUKEwjxi9nirOeFAxUYUqQEHVqnBdMQ1YkKegQIGBAB..i&cs=1&um=1&ie=UTF-8&fb=1&gl=eg&sa=X&geocode=KZnm5gFdPlgUMelvM92QkE2A&daddr=%D9%A1%D9%A3+Ismail+Al+Kabbani,+Al+Hay+as+Sabea,+Nasr+City,+Cairo+Governorate+4450130',
        phone: '01004019994',
        menuUrl: 'https://www.elmenus.com/cairo/la-casetta-d7g5/nasr-city-ypdd/info'
    },
};

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
    // Assuming 'mode' and 'username' are stored in local storage
    var mode = localStorage.getItem('mode'); // 0 for signed out, 1 for signed in
    var username = localStorage.getItem('username'); // Username stored after signing in

    if (mode === '1' && username) {
        // Change the navbar to show the username instead of "Sign In"
        var signinLink = document.getElementById('signinLink');
        signinLink.textContent =  username+ ' \uD83D\uDC68'; // Change the text to username
        signinLink.href = 'profile.html'; // Optionally change the href if it should link to a profile or log out page
    }
});


document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Example: Validate user credentials and set mode and username
    // This part should realistically make a server request

    // If credentials are valid:
    localStorage.setItem('mode', '1');
    localStorage.setItem('username', email); // Assuming the email is the username for simplicity

    // Redirect to home page or reload the page
    history.back();
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


