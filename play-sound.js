// Function to play a notification sound
function playNotificationSound() {
    console.log("DEBUG: Attempting to play notification.mp3 from root folder");

    // Create a new audio element
    var audio = new Audio('notification.mp3');

    // Set maximum volume
    audio.volume = 1.0;

    // Play the sound with detailed error handling
    var playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(function() {
            console.log("SUCCESS: notification.mp3 played successfully");
        }).catch(function(error) {
            console.error("ERROR: Failed to play notification.mp3:", error);
            console.error("ERROR: Error name:", error.name);
            console.error("ERROR: Error message:", error.message);
        });
    } else {
        console.log("DEBUG: Play promise is undefined, browser might be handling play request differently");
    }

    return audio; // Return the audio element for debugging
}

// Export the function
window.playNotificationSound = playNotificationSound;

// Log when the script loads
console.log("DEBUG: play-sound.js loaded");

// Try to play the sound when this script loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("DEBUG: DOMContentLoaded event fired");

    // Try to play after a short delay
    setTimeout(function() {
        console.log("DEBUG: Attempting initial sound play");
        playNotificationSound();
    }, 1000);
});