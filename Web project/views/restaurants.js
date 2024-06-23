// Function to filter and display restaurants based on the selected category
function filterByCategory(category) {
    const acceptedRestaurants = JSON.parse(localStorage.getItem('acceptedRestaurants')) || [];
    if (category && category !== "All") {
        const filteredRestaurants = acceptedRestaurants.filter(restaurant => restaurant.category === category);
        renderRestaurants(filteredRestaurants);
    } else {
        renderRestaurants(acceptedRestaurants); // Show all if "All" is selected
    }
}

// Event listener for category selection form
document.getElementById('category-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting
    const selectedCategory = document.getElementById('category').value;
    filterByCategory(selectedCategory);
});

// Function to show nearby restaurants
function showNearbyRestaurants() {
    const username = localStorage.getItem('username');
    if (!username || localStorage.getItem('mode') === '0') {
        alert('Please sign in to see nearby options.');
        window.location.href = 'signin.html';
        return;
    }

    // Get user location
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === username);

    if (!user) {
        alert('User information not found.');
        return;
    }

    const userLocation = user.location;
    const acceptedRestaurants = JSON.parse(localStorage.getItem('acceptedRestaurants')) || [];

    // Filter restaurants by location
    const nearbyRestaurants = acceptedRestaurants.filter(restaurant => restaurant.location === userLocation);
    renderRestaurants(nearbyRestaurants);
}

// Event listener for the "See Nearby Options?" checkbox
document.getElementById('checkbox').addEventListener('change', function() {
    if (this.checked) {
        showNearbyRestaurants();
    } else {
        filterByCategory("All");
    }
});

// Load all restaurants on page load
document.addEventListener('DOMContentLoaded', function() {
    filterByCategory("All"); // Display all by default
});

document.addEventListener('DOMContentLoaded', function() {
    // This code runs after the DOM has fully loaded

    // Adding event listener to the search form
    let searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission behavior
            
            // Get the value entered in the search input
            let searchQueryInput = searchForm.querySelector('input[name="q"]');
            if (searchQueryInput) {
                let searchQuery = searchQueryInput.value.toLowerCase().trim();
                
                // Loop through each restaurant link
                let restaurantLinks = document.querySelectorAll('.restaurant');
                let found = false;
                restaurantLinks.forEach(function(link) {
                    let restaurantName = link.textContent.toLowerCase(); // Get the restaurant name
                    // Check if the search query matches the restaurant name
                    if (restaurantName.includes(searchQuery)) {
                        let restaurantUrl = link.getAttribute('href'); // Get the URL of the matching restaurant link
                        if (restaurantUrl) {
                            window.location.href = restaurantUrl; // Navigate to the restaurant page
                            found = true;
                        }
                        return; // Exit the loop once a match is found
                    }
                });

                // If no matching restaurant is found, display an alert
                if (!found) {
                    alert("No matching restaurant found!");
                }
            } else {
                console.error("Search query input element not found.");
            }
        });
    } else {
        console.error("Search form element not found.");
    }
});
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 4000); // Change image every 4 seconds
}