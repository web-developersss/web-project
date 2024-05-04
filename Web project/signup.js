// Array to store user information
var users = JSON.parse(localStorage.getItem('users')) || [];

// Check if the users array is saved in local storage when the page loads
var savedUsers = JSON.parse(localStorage.getItem('users'));

if (savedUsers) {
    console.log('Users array is saved in local storage:', savedUsers);
} else {
    console.log('Users array is not saved in local storage.');
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    var name = document.getElementById('name').value.toLowerCase();
    var email = document.getElementById('email').value.toLowerCase();
    var password = document.getElementById('password').value.toLowerCase();    
    var phone = document.getElementById('phone').value;
    var location = document.getElementById('location').value;

    // Create a user object
    var user = {
        name: name,
        email: email,
        password: password,
        phone: phone,
        location: location
    };

    // Add the user object to the users array
    users.push(user);

    // Store the updated users array in local storage
    localStorage.setItem('users', JSON.stringify(users));

    // For demonstration purposes, we'll log the users array to the console
    console.log(users);

    // Reset the form
    window.location.href = 'home.html';
    
});


