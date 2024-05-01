
document.addEventListener('DOMContentLoaded', function() {
    var username = localStorage.getItem('username');
    var logoutButton = document.getElementById('logoutButton');

    if (username) {
        userInfo.textContent = 'Logged in as ' + username;
    } else {
        userInfo.textContent = 'Not logged in.';
        logoutButton.style.display = 'none'; // Hide logout button if not logged in
    }

    logoutButton.addEventListener('click', function(event) {
        localStorage.setItem('mode', '0'); // Reset user mode
        localStorage.removeItem('username'); // Clear username
        window.location.href = 'Home.html'; // Redirect to home page or login page
    });
});
