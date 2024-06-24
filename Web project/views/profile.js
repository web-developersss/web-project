document.addEventListener('DOMContentLoaded', function() {
    var username = localStorage.getItem('username');
    var userInfo = document.getElementById('userInfo');
    var reservationLink = document.getElementById('reser');
    var logoutButton = document.getElementById('logoutButton');

    if (username) {
        // First, check if the user is the admin
        if (username === "admin@123") {
            userInfo.innerHTML = 'Logged in as Admin';
            userInfo.innerHTML += '<br>Email: admin@123';
            userInfo.innerHTML += '<br>Phone: 01159141115';
            userInfo.innerHTML += '<br>Status: Administrator';
            reservationLink.href = 'Home.html';
            reservationLink.textContent = 'View Site';
        } else {
            // Check across different user roles
            var savedUsers = JSON.parse(localStorage.getItem('users')) || [];
            var requestFormData = JSON.parse(localStorage.getItem('requestFormData')) || [];
            var acceptedRestaurants = JSON.parse(localStorage.getItem('acceptedRestaurants')) || [];

            // Check if user is in acceptedRestaurants
            var acceptedUser = acceptedRestaurants.find(user => user.email === username);
            if (acceptedUser) {
                userInfo.innerHTML = `Name: ${acceptedUser.name}`;
                userInfo.innerHTML += `<br>Email: ${acceptedUser.email}`;
                userInfo.innerHTML += `<br>Phone: ${acceptedUser.phone}`;
                userInfo.innerHTML += `<br>Role: Restaurant Owner 👩‍🍳`;
                userInfo.innerHTML += `<br>Status: Accepted`;

                reservationLink.href = 'sellerReservstion.html';
                reservationLink.textContent = 'View Seller Reservations';
            } else {
                // Check if user is in requestFormData
                var pendingUser = requestFormData.find(user => user.email === username);
                if (pendingUser) {
                    userInfo.innerHTML = `Name: ${pendingUser.name}`;
                    userInfo.innerHTML += `<br>Email: ${pendingUser.email}`;
                    userInfo.innerHTML += `<br>Phone: ${pendingUser.phone}`;
                    userInfo.innerHTML += `<br>Role: Restaurant Owner 👩‍🍳`;
                    userInfo.innerHTML += `<br>Status: Pending`;

                    reservationLink.href = 'sellerReservation.html';
                    reservationLink.textContent = 'View Seller Reservstions';
                } else {
                    // Finally, check if the user is a regular user
                    var regularUser = savedUsers.find(user => user.email === username);
                    if (regularUser) {
                        userInfo.innerHTML = `Name: ${regularUser.name}`;
                        userInfo.innerHTML += `<br>Email: ${regularUser.email}`;
                        userInfo.innerHTML += `<br>Phone: ${regularUser.phone}`;
                        userInfo.innerHTML += `<br>Role: User`;

                        reservationLink.href = 'CusViewRes.html';
                        reservationLink.textContent = 'View Customer Reservations';
                    } else {
                        userInfo.textContent = 'User not found.';
                        reservationLink.textContent = '';
                    }
                }
            }
        }
    } else {
        userInfo.textContent = 'Not logged in.';
        logoutButton.style.display = 'none'; // Hide the logout button if not logged in
    }

    logoutButton.addEventListener('click', function(event) {
        localStorage.setItem('mode', '0'); // Reset user mode
        localStorage.removeItem('username'); // Clear username
        window.location.href = 'Home.html'; // Redirect to the home page
    });
});
