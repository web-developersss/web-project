// Function to filter and display restaurants based on the selected category


// Event listener for category selection form
document.getElementById('category-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting
    const selectedCategory = document.getElementById('category').value;
    filterByCategory(selectedCategory);
});



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

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const restaurantsContainer = document.getElementById('restaurants');

    // Function to fetch restaurants based on search input
    const fetchRestaurants = async (searchTerm) => {
        try {
            const response = await fetch(`/search?name=${searchTerm}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const restaurants = await response.json();
            displayRestaurants(restaurants);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    // Function to display fetched restaurants
    const displayRestaurants = (restaurants) => {
        restaurantsContainer.innerHTML = ''; // Clear previous results
        if (restaurants.length === 0) {
            restaurantsContainer.innerHTML = '<p>No matching restaurants found</p>';
        } else {
            restaurants.forEach(restaurant => {
                const restaurantElement = document.createElement('div');
                restaurantElement.classList.add('restaurant');
                restaurantElement.innerHTML = `
                    <a href="/restaurant/${restaurant._id}">
                        <img src="${restaurant.logoUrl}" alt="${restaurant.name}">
                        <h3>${restaurant.name}</h3>
                    </a>
                `;
                restaurantsContainer.appendChild(restaurantElement);
            });
        }
    };

    // Event listener for input changes (typing)
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.trim();
        if (searchTerm.length > 0) {
            fetchRestaurants(searchTerm);
        } else {
            restaurantsContainer.innerHTML = ''; // Clear when input is empty
        }
    });
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

