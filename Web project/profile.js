document.addEventListener('DOMContentLoaded', function() {
    var username = localStorage.getItem('username');
    var userInfoForm = document.getElementById('userInfoForm');
    var nameField = document.getElementById('name');
    var emailField = document.getElementById('email');
    var phoneField = document.getElementById('phone');
    var logoutButton = document.getElementById('logoutButton');
    var editButton = document.getElementById('editButton');
    var saveButton = document.getElementById('saveButton');

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
            document.getElementById('userInfo').textContent = 'User not found.';
        }
    } else {
        userInfoForm.style.display = 'none'; // Hide form if not logged in
        document.getElementById('userInfo').textContent = 'Not logged in.';
    }

    logoutButton.addEventListener('click', function(event) {
        localStorage.setItem('mode', '0'); // Reset user mode
        localStorage.removeItem('username'); // Clear username
        history.back();
    });

    editButton.addEventListener('click', function() {
        nameField.readOnly = false;
        emailField.readOnly = false;
        phoneField.readOnly = false;
        saveButton.style.display = 'inline'; // Show the Save button
        editButton.style.display = 'none'; // Hide the Edit button
        nameField.focus(); // Set focus to the first editable field
    });

    saveButton.addEventListener('click', function() {
        nameField.readOnly = true;
        emailField.readOnly = true;
        phoneField.readOnly = true;
        saveButton.style.display = 'none'; // Hide the Save button
        editButton.style.display = 'inline'; // Show the Edit button
    });
});
