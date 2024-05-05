document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            phone: document.getElementById('phone').value,
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

        // Retrieve existing data from localStorage
        let requests = JSON.parse(localStorage.getItem('requestFormData')) || [];
        // Add the new formData to the array
        requests.push(formData);
        // Store updated array in localStorage
        localStorage.setItem('requestFormData', JSON.stringify(requests));

          // Increment the request count
          let requestCount = parseInt(localStorage.getItem('requestCount')) || 0;
          requestCount++;
          localStorage.setItem('requestCount', requestCount);

          
        // Redirect to the page where requests are displayed
        window.location.href = 'signin.html';
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const requestsContainer = document.getElementById('request-list');
    const requests = JSON.parse(localStorage.getItem('requestFormData')) || [];

    requests.forEach((request, index) => {
        const requestDiv = document.createElement('div');
        requestDiv.innerHTML = `
            <h2>Request ${index + 1}</h2>
            <p>Name: ${request.name}</p>
            <p>Email: ${request.email}</p>
            <p>Phone: ${request.phone}</p>
            <p>Location: ${request.location}</p>
            <p>Opening Time: ${request.openingTime}</p>
            <p>Closing Time: ${request.closingTime}</p>
            <p>Description: ${request.description}</p>
            <p>Category: ${request.category}</p>
            <p>Menu URL: <a href="${request.menuUrl}">${request.menuUrl}</a></p>
            <p>Location URL: <a href="${request.locationUrl}">${request.locationUrl}</a></p>
            <p>Logo URL: <a href="${request.logoUrl}">${request.logoUrl}</a></p>
            <p>Photo URL: <a href="${request.photoUrl}">${request.photoUrl}</a></p>
            <button onclick="acceptRequest(${index})">Accept</button>
            <button onclick="declineRequest(${index})">Decline</button>
            <hr>`;
        requestsContainer.appendChild(requestDiv);
    });
});

function acceptRequest(index) {
    let requests = JSON.parse(localStorage.getItem('requestFormData')) || [];
    let accepted = JSON.parse(localStorage.getItem('acceptedRestaurants')) || [];
    
    // Assuming request at 'index' is the one to accept
    const acceptedRequest = requests.splice(index, 1)[0];
    accepted.push({
        id: acceptedRequest.email.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase(), // creating a simple id from email
        name: acceptedRequest.name,
        email: acceptedRequest.email,
        password: acceptedRequest.password,
        phone: acceptedRequest.phone,
        location: acceptedRequest.location,
        openingTime: acceptedRequest.openingTime,
        closingTime: acceptedRequest.closingTime,
        description: acceptedRequest.description,
        category: acceptedRequest.category,
        menuUrl: acceptedRequest.menuUrl,
        locationUrl: acceptedRequest.locationUrl,
        logoUrl: acceptedRequest.logoUrl,
        photoUrl: acceptedRequest.photoUrl
    });
    

    // Update localStorage
    localStorage.setItem('requestFormData', JSON.stringify(requests));
    localStorage.setItem('acceptedRestaurants', JSON.stringify(accepted));

    // Optionally reload or update the page content
    location.reload();
}




function declineRequest(index) {
    // Decline request logic
    console.log('Declined Request:', index);
}

