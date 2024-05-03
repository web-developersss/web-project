document.addEventListener('DOMContentLoaded', function() {
    var username = localStorage.getItem('username');
    var userInfoForm = document.getElementById('userInfoForm');
    var nameField = document.getElementById('name');
    var emailField = document.getElementById('email');
    var phoneField = document.getElementById('phone');
    var passwordField = document.getElementById('password');
    var logoutButton = document.getElementById('logoutButton');

    if (username) {
        var savedUsers = JSON.parse(localStorage.getItem('users')) || [];
        var user = savedUsers.find(function(user) {
            return user.email === username;
        });

        if (user) {
            nameField.value = user.name;
            emailField.value = user.email;
            phoneField.value = user.phone;
            
        } else {
            userInfoForm.style.display = 'none'; // Hide form if user not found
            userInfo.textContent = 'User not found.';
        }
    } else {
        userInfoForm.style.display = 'none'; // Hide form if not logged in
        userInfo.textContent = 'Not logged in.';
    }

    logoutButton.addEventListener('click', function(event) {
        localStorage.setItem('mode', '0'); // Reset user mode
        localStorage.removeItem('username'); // Clear username
        history.back();
    });
});
