# Chat Notification Sound Implementation

This document explains how to implement the notification sound for the chat feature on your resume website.

## File Structure

The notification sound system uses the following files:
- `/assets/notification.wav` - The sound file that plays when a notification appears
- `index.html` - Contains the notification script and styling

## Adding Your Notification Sound

1. Create an `assets` directory in your repository root if it doesn't already exist
2. Add your `notification.wav` file to the assets directory
3. Ensure the file is properly committed to your repository

## How It Works

The notification system works as follows:

1. When the page loads, the notification script initializes
2. After a 5-second delay, the system:
   - Plays the notification sound from `/assets/notification.wav`
   - Displays the notification with a smooth animation
   - Sets up click handlers for the notification

3. If the notification sound file cannot be loaded, the system falls back to a base64-encoded sound

## Customizing the Notification

### Changing the Sound

To use a different notification sound:
1. Replace the `/assets/notification.wav` file with your preferred sound
2. Ensure the new file is also named `notification.wav`
3. For best results, use a short (0.5-2 seconds) WAV file

### Adjusting the Timing

To change when the notification appears:
1. Open `index.html`
2. Locate the notification script (search for "notification-script")
3. Modify the timeout value (in milliseconds) in the `setTimeout` function:

```javascript
// Change 5000 (5 seconds) to your preferred delay
setTimeout(function() {
    // Notification code...
}, 5000);
```

### Styling the Notification

The notification appearance can be customized by modifying the CSS in `index.html`:

1. Find the `.chat-notification` CSS class
2. Adjust properties like:
   - `background` - Background color
   - `border-left` - Left border color and width
   - `border-radius` - Corner roundness
   - `box-shadow` - Shadow effect
   - `width` - Notification width

## Troubleshooting

If the notification sound doesn't play:

1. Check browser console for errors
2. Verify that the `notification.wav` file exists in the assets directory
3. Ensure the file path is correct in the notification script
4. Try a different audio format (MP3 or OGG) if WAV isn't supported
5. Check if the browser has autoplay restrictions (user interaction may be required)

## Browser Compatibility

The notification sound feature is compatible with:
- Chrome 50+
- Firefox 50+
- Safari 10+
- Edge 14+

Some mobile browsers may require user interaction before playing sounds due to autoplay policies.