// Function to save restaurants to local storage
function saveRestaurants(restaurants) {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
}

// Function to retrieve restaurants from local storage
function getRestaurants() {
    const storedRestaurants = localStorage.getItem('restaurants');
    return storedRestaurants ? JSON.parse(storedRestaurants) : [];
}

// Function to display restaurants
function displayRestaurants() {
    const restaurantList = document.getElementById('restaurantList');
    restaurantList.innerHTML = '';

    const restaurants = getRestaurants();

    restaurants.forEach(restaurant => {
        const li = document.createElement('li');
        li.textContent = `Name: ${restaurant.name}, Address: ${restaurant.address}, Phone: ${restaurant.phone}`;
        restaurantList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    displayRestaurants();

    // Add event listener to the delete form
    document.getElementById('deleteForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get restaurant ID from the form
        const restaurantId = document.getElementById('restaurantId').value;

        // Get existing restaurants from local storage
        let restaurants = getRestaurants();

        // Remove the restaurant with the specified ID
        restaurants = restaurants.filter(restaurant => restaurant.id !== restaurantId);

        // Save the updated array to local storage
        saveRestaurants(restaurants);

        // Redirect to view_restaurants.html
        window.location.href = 'view_restaurants.html';
    });

    // Add event listener to the edit form
    document.getElementById('editForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get restaurant ID from the form
        const restaurantId = document.getElementById('restaurantId').value;

        // Get existing restaurants from local storage
        let restaurants = getRestaurants();

        // Find the index of the restaurant with the specified ID
        const index = restaurants.findIndex(restaurant => restaurant.id === restaurantId);

        // Update the restaurant information
        if (index !== -1) {
            // Retrieve edited restaurant information from other form fields
            const newName = document.getElementById('newName').value;
            const newAddress = document.getElementById('newAddress').value;
            const newPhone = document.getElementById('newPhone').value;

            // Update the restaurant object
            restaurants[index].name = newName;
            restaurants[index].address = newAddress;
            restaurants[index].phone = newPhone;

            // Save the updated array to local storage
            saveRestaurants(restaurants);

            // Redirect to view_restaurants.html
            window.location.href = 'view_restaurants.html';
        } else {
            alert('Restaurant not found!');
        }
    });
});
