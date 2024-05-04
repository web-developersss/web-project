document.addEventListener('DOMContentLoaded', function() {
    var username = localStorage.getItem('username');
    var userInfo = document.getElementById('userInfo');
    var logoutButton = document.getElementById('logoutButton');

    if (username) {
        var savedUsers = JSON.parse(localStorage.getItem('users')) || [];
        var user = savedUsers.find(function(user) {
            return user.email === username;
        });

        
        if (user) {
            userInfo.textContent = 'Name: ' + user.name ;
            userInfo.innerHTML += '<br>Email: ' + user.email;
            userInfo.innerHTML += '<br>Phone: ' + user.phone;
            userInfo.innerHTML += '<br>password: ' + user.password;
        } else {
            userInfo.textContent = 'User not found.';
            // Hide logout button if user not found
        }
    } else {
        userInfo.textContent = 'Not logged in.';
        logoutButton.style.display = 'none'; // Hide logout button if not logged in
    }

    logoutButton.addEventListener('click', function(event) {
        localStorage.setItem('mode', '0'); // Reset user mode
        localStorage.removeItem('username'); // Clear username
        history.back();

    });
});
