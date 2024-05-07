document.addEventListener('DOMContentLoaded', function() {
    const typeDropdown = document.getElementById('type');
    const restaurantForm = document.getElementById('restaurantForm');
    const editRestaurantForm = document.getElementById('editRestaurantForm');
    const userForm = document.getElementById('userForm');
    const editUserForm = document.getElementById('editUserForm');
    const restaurantList = document.getElementById('restaurantList');
    const userList = document.getElementById('userList');

    // Load saved restaurants and users
    function displayRestaurants() {
        const restaurants = JSON.parse(localStorage.getItem('acceptedRestaurants')) || [];
        restaurantList.innerHTML = '';
        restaurants.forEach((restaurant, index) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <h3>${restaurant.name}</h3>
                <p>Email: ${restaurant.email}</p>
                <p>Phone: ${restaurant.phone}</p>
                <p>Description: ${restaurant.description}</p>
                <button class="edit-button" onclick="editRestaurant(${index})">Edit</button>
                <button class="delete-button" onclick="deleteRestaurant(${index})">Delete</button>
            `;
            restaurantList.appendChild(div);
        });
    }

    function displayUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        userList.innerHTML = '';
        users.forEach((user, index) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.phone}</p>
                <button class="edit-button" onclick="editUser(${index})">Edit</button>
                <button class="delete-button" onclick="deleteUser(${index})">Delete</button>
            `;
            userList.appendChild(div);
        });
    }

    // Switch between forms based on selected type
    typeDropdown.addEventListener('change', function() {
        if (this.value === 'Restaurant') {
            restaurantForm.classList.remove('hidden');
            editRestaurantForm.classList.add('hidden');
            restaurantList.classList.remove('hidden');
            userForm.classList.add('hidden');
            editUserForm.classList.add('hidden');
            userList.classList.add('hidden');
            displayRestaurants();
        } else {
            userForm.classList.remove('hidden');
            editUserForm.classList.add('hidden');
            userList.classList.remove('hidden');
            restaurantForm.classList.add('hidden');
            editRestaurantForm.classList.add('hidden');
            restaurantList.classList.add('hidden');
            displayUsers();
        }
    });

    // Add a new restaurant
    restaurantForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Collecting form data
        const newRestaurant = {
            id: document.getElementById('email').value.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase(), // creating a simple id from email
            name: document.getElementById('restaurant-name').value,
            phone: document.getElementById('restaurant-phone').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            location: document.getElementById('location').value,
            openingTime: document.getElementById('opening-time').value,
            closingTime: document.getElementById('closing-time').value,
            description: document.getElementById('description').value,
            category: document.getElementById('category').value,
            menuUrl: document.getElementById('menu-url').value,
            locationUrl: document.getElementById('location-url').value,
            logoUrl: document.getElementById('logo-url').value,
            photoUrl: document.getElementById('photo-url').value
        };

        // Saving to local storage
        let restaurants = JSON.parse(localStorage.getItem('acceptedRestaurants')) || [];
        restaurants.push(newRestaurant);
        localStorage.setItem('acceptedRestaurants', JSON.stringify(restaurants));

        displayRestaurants();
        restaurantForm.reset(); // Clear form fields
    });

    // Add a new user
    userForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newUser = {
            name: document.getElementById('user-name').value,
            email: document.getElementById('user-email').value,
            password: document.getElementById('user-password').value,
            phone: document.getElementById('user-phone').value,
            location: document.getElementById('user-location').value
        };

        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        displayUsers();
        userForm.reset(); // Clear form fields
    });

    // Function to delete restaurant
    window.deleteRestaurant = function(index) {
        let restaurants = JSON.parse(localStorage.getItem('acceptedRestaurants'));
        restaurants.splice(index, 1);
        localStorage.setItem('acceptedRestaurants', JSON.stringify(restaurants));
        displayRestaurants();
    };

    // Function to delete user
    window.deleteUser = function(index) {
        let users = JSON.parse(localStorage.getItem('users'));
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();
    };

    // Function to edit restaurant
    window.editRestaurant = function(index) {
        let restaurants = JSON.parse(localStorage.getItem('acceptedRestaurants'));
        let restaurant = restaurants[index];
        document.getElementById('edit-restaurant-index').value = index;
        document.getElementById('edit-restaurant-name').value = restaurant.name;
        document.getElementById('edit-restaurant-phone').value = restaurant.phone;
        document.getElementById('edit-email').value = restaurant.email;
        document.getElementById('edit-password').value = restaurant.password;
        document.getElementById('edit-location').value = restaurant.location;
        document.getElementById('edit-opening-time').value = restaurant.openingTime;
        document.getElementById('edit-closing-time').value = restaurant.closingTime;
        document.getElementById('edit-description').value = restaurant.description;
        document.getElementById('edit-category').value = restaurant.category;
        document.getElementById('edit-menu-url').value = restaurant.menuUrl;
        document.getElementById('edit-location-url').value = restaurant.locationUrl;
        document.getElementById('edit-logo-url').value = restaurant.logoUrl;
        document.getElementById('edit-photo-url').value = restaurant.photoUrl;

        restaurantForm.classList.add('hidden');
        editRestaurantForm.classList.remove('hidden');
    };

    // Save edited restaurant
    editRestaurantForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const index = document.getElementById('edit-restaurant-index').value;
        let restaurants = JSON.parse(localStorage.getItem('acceptedRestaurants')) || [];

        restaurants[index] = {
            id: document.getElementById('edit-email').value.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase(), // creating a simple id from email
            name: document.getElementById('edit-restaurant-name').value,
            phone: document.getElementById('edit-restaurant-phone').value,
            email: document.getElementById('edit-email').value,
            password: document.getElementById('edit-password').value,
            location: document.getElementById('edit-location').value,
            openingTime: document.getElementById('edit-opening-time').value,
            closingTime: document.getElementById('edit-closing-time').value,
            description: document.getElementById('edit-description').value,
            category: document.getElementById('edit-category').value,
            menuUrl: document.getElementById('edit-menu-url').value,
            locationUrl: document.getElementById('edit-location-url').value,
            logoUrl: document.getElementById('edit-logo-url').value,
            photoUrl: document.getElementById('edit-photo-url').value
        };

        localStorage.setItem('acceptedRestaurants', JSON.stringify(restaurants));
        displayRestaurants();

        restaurantForm.classList.remove('hidden');
        editRestaurantForm.classList.add('hidden');
    });

    // Function to edit user
    window.editUser = function(index) {
        let users = JSON.parse(localStorage.getItem('users'));
        let user = users[index];
        // Populate form with user data for editing
        document.getElementById('edit-user-index').value = index;
        document.getElementById('edit-user-name').value = user.name;
        document.getElementById('edit-user-email').value, user.email,
        document.getElementById('edit-user-email').value = user.email;
        document.getElementById('edit-user-password').value = user.password;
        document.getElementById('edit-user-phone').value = user.phone;
        document.getElementById('edit-user-location').value = user.location;

        userForm.classList.add('hidden');
        editUserForm.classList.remove('hidden');
    };

    // Save edited user
    editUserForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const index = document.getElementById('edit-user-index').value;
        let users = JSON.parse(localStorage.getItem('users')) || [];

        users[index] = {
            name: document.getElementById('edit-user-name').value,
            email: document.getElementById('edit-user-email').value,
            password: document.getElementById('edit-user-password').value,
            phone: document.getElementById('edit-user-phone').value,
            location: document.getElementById('edit-user-location').value
        };

        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();

        userForm.classList.remove('hidden');
        editUserForm.classList.add('hidden');
    });

    // Initial display based on the selected type
    function initializeForms() {
        const type = typeDropdown.value;
        if (type === 'Restaurant') {
            restaurantForm.classList.remove('hidden');
            editRestaurantForm.classList.add('hidden');
            restaurantList.classList.remove('hidden');
            userForm.classList.add('hidden');
            editUserForm.classList.add('hidden');
            userList.classList.add('hidden');
            displayRestaurants();
        } else {
            userForm.classList.remove('hidden');
            editUserForm.classList.add('hidden');
            userList.classList.remove('hidden');
            restaurantForm.classList.add('hidden');
            editRestaurantForm.classList.add('hidden');
            restaurantList.classList.add('hidden');
            displayUsers();
        }
    }

    typeDropdown.addEventListener('change', initializeForms);
    initializeForms(); // Initialize based on default selection
});