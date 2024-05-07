     // Retrieve users, accepted restaurants, and request form data from local storage
     var users = JSON.parse(localStorage.getItem('users')) || [];
     var acceptedRestaurants = JSON.parse(localStorage.getItem('acceptedRestaurants')) || [];
     var requestFormData = JSON.parse(localStorage.getItem('requestFormData')) || [];

     // Check if the arrays are saved in local storage when the page loads
     console.log('Users:', users);
     console.log('Accepted Restaurants:', acceptedRestaurants);
     console.log('Request Restaurants:', requestFormData);

     document.querySelector('form').addEventListener('submit', function(event) {
         event.preventDefault(); // Prevent the default form submission

         var name = document.getElementById('name').value.toLowerCase();
         var email = document.getElementById('email').value.toLowerCase();
         var password = document.getElementById('password').value.toLowerCase();
         var phone = document.getElementById('phone').value;
         var location = document.getElementById('location').value;

         // Check if email already exists in the users array
         var emailExistsInUsers = users.some(function(user) {
             return user.email === email;
         });

         // Check if email exists in accepted restaurants
         var emailExistsInAcceptedRestaurants = acceptedRestaurants.some(function(restaurant) {
             return restaurant.email === email;
         });

         // Check if email exists in request form data
         var emailExistsInRequestFormData = requestFormData.some(function(request) {
             return request.email === email;
         });

         // Show error message if email exists in any of the arrays
         var emailError = document.getElementById('emailError');
         if (emailExistsInUsers || emailExistsInAcceptedRestaurants || emailExistsInRequestFormData) {
             emailError.style.display = 'block';
             return;
         } else {
             emailError.style.display = 'none';
         }

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

         // Log the updated users array to the console for demonstration purposes
         console.log(users);

         // Redirect to the home page after sign-up
         window.location.href = 'home.html';
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





