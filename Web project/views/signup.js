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
 
 





