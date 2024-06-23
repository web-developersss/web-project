// Retrieve users, accepted restaurants, and request form data from local storage
    var users = JSON.parse(localStorage.getItem('users')) || [];
    var acceptedRestaurants = JSON.parse(localStorage.getItem('acceptedRestaurants')) || [];
    var requestFormData = JSON.parse(localStorage.getItem('requestFormData')) || [];

    // Check if the arrays are saved in local storage when the page loads
    console.log('Users:', users);
    console.log('Accepted Restaurants:', acceptedRestaurants);
    console.log('Request Restaurants:', requestFormData);

    document.querySelector('form').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission

        var name = document.getElementById('name').value.toLowerCase();
        var email = document.getElementById('email').value.toLowerCase();
        var password = document.getElementById('password').value.toLowerCase();
        var phone = document.getElementById('phone').value;
        var location = document.getElementById('location').value;

        try {
            // Send the signup request to the server
            const response = await fetch('/customerssignup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            
            const data = await response.json();

            if (data.error) {
                document.getElementById('emailError').textContent = data.error;
                document.getElementById('emailError').style.display = 'block';
                return;
            } else if (data.success) {
                alert(data.success);
                // Redirect to sign-in page or other actions
                window.location.href = '/signin';
            } else {
                alert("An error occurred. Please try again.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred. Please try again.");
          
        }

      

    });