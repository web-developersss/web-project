document.addEventListener('DOMContentLoaded', function() {
    var username = localStorage.getItem('username');
    var userInfo = document.getElementById('userInfo');
    var logoutButton = document.getElementById('logoutButton');

    if (username) {
        // Check if the username is that of the admin
        if (username === "admin@123") {
            // Handle admin specific display
            userInfo.innerHTML = 'Logged in as Admin';
            userInfo.innerHTML += '<br>Email: admin@123';
            userInfo.innerHTML += '<br>Phone: N/A';
            userInfo.innerHTML += '<br>Status: Administrator';
        } else {
            // Handle regular user display
            var savedUsers = JSON.parse(localStorage.getItem('users')) || [];
            var user = savedUsers.find(function(user) {
                return user.email === username;
            });

            if (user) {
                userInfo.textContent = 'Name: ' + user.name;
                userInfo.innerHTML += '<br>Email: ' + user.email;
                userInfo.innerHTML += '<br>Phone: ' + user.phone;
                userInfo.innerHTML += '<br>Password: ' + user.password; // Note: displaying passwords like this is generally unsafe
            } else {
                userInfo.textContent = 'User not found.';
                logoutButton.style.display = 'none'; // Hide logout button if user not found
            }
        }
    } else {
        userInfo.textContent = 'Not logged in.';
        logoutButton.style.display = 'none'; // Hide logout button if not logged in
    }

    logoutButton.addEventListener('click', function(event) {
        localStorage.setItem('mode', '0'); // Reset user mode
        localStorage.removeItem('username'); // Clear username
        window.location.href = 'Home.html'; // Redirect to login page instead of using history.back()
    });
});
