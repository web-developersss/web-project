const previousReviews = {}; // Object to store previous reviews

function makeReservation(reservationId) {
    // Your logic for making a new reservation goes here
    alert("Reservation functionality will be implemented here.");
}

function openFeedbackModal(reservationId) {
    document.getElementById('currentReservationId').value = reservationId;
    const reviewTextarea = document.getElementById('review');
    if (previousReviews.hasOwnProperty(reservationId)) {
        openReviewModal(reservationId);
        reviewTextarea.value = previousReviews[reservationId];
        reviewTextarea.disabled = true; // Disable the textarea
        
    } else {
        reviewTextarea.value = ""; // Clear the review textarea
        reviewTextarea.disabled = false;
        document.getElementById('feedbackModal').style.display = 'block'; // Enable the textarea
    }
   
}

function closeFeedbackModal() {
    document.getElementById('feedbackModal').style.display = 'none';
    // Reset the form fields
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const rating = form.querySelector('input[name="rate"]:checked');
        const review = form.querySelector('textarea[name="review"]').value;
        const reservationId = document.getElementById('currentReservationId').value;
        if (rating && review) {
            alert("Thanks for your feedback!\nRating: " + rating.value + "\nReview: " + review + "\nReservation ID: " + reservationId);
            previousReviews[reservationId] = review; // Save the review
            // Reset the form fields
            closeFeedbackModal();
        } else {
            alert("Please give a rating.");
        }
    });
});
function openReviewModal(reservationId) {
const review = previousReviews[reservationId];
const rating = getRating(reservationId);
if (review) {
document.getElementById('reviewContent').innerHTML = "Review: " + review + "<br>" + "Rating: " + rating;
document.getElementById('viewReviewModal').style.display = 'block';
} else {
alert("No review available for this reservation.");
}
}

function getRating(reservationId) {
const ratingInput = document.querySelector('input[name="rate"]:checked');
if (ratingInput) {
return ratingInput.value;
}
return "Rating not available";
}


function closeReviewModal() {
document.getElementById('viewReviewModal').style.display = 'none';
}