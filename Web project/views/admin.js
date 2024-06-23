document.addEventListener('DOMContentLoaded', function() {
    // Retrieve users data from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Get the users count
    const usersCount = users.length;

    // Update the HTML with the users count
    const usersCountElement = document.getElementById('users-count');
    usersCountElement.textContent = usersCount.toString(); // Convert count to string and display

    // Display the count in console for debugging
    console.log('Total clients:', usersCount);
});
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve request count from localStorage
    const requestFormData = JSON.parse(localStorage.getItem('requestFormData')) || [];
    const requestsCount = requestFormData.length;

    // Update the HTML with the request count
    const requestCountElement = document.getElementById('request-count');
    requestCountElement.textContent = requestsCount.toString(); // Convert count to string and display

    // Display the count in console for debugging
    console.log('Requests Pending:', requestsCount);
});
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve accepted count from localStorage
    const acceptedRestaurants = JSON.parse(localStorage.getItem('acceptedRestaurants')) || [];
    const acceptedCount = acceptedRestaurants.length;

    // Display accepted count in the HTML element
    document.getElementById('restaurants-count').textContent = acceptedCount;
});