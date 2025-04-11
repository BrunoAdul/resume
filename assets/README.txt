# Notification Sound Files

This directory contains the sound files that play when the chat notification appears on your resume website.

## Required Files

Please add the following files to this directory:

1. `notification.wav` - Primary notification sound (WAV format)
2. `notification.mp3` - Alternative notification sound (MP3 format)

Having both formats ensures maximum browser compatibility.

## Sound Specifications

For the best user experience, use sounds with these specifications:

- **Duration**: 0.5-2 seconds (short and attention-grabbing)
- **Sample Rate**: 44.1kHz
- **Bit Depth**: 16-bit
- **Channels**: Mono or Stereo
- **Volume**: Normalized (not too loud or too quiet)

## Where to Find Notification Sounds

You can download free notification sounds from these websites:

- [Mixkit](https://mixkit.co/free-sound-effects/notification/)
- [Freesound](https://freesound.org/)
- [NotificationSounds.com](https://notificationsounds.com/)
- [Zapsplat](https://www.zapsplat.com/sound-effect-categories/notifications-alerts/)

## Converting Sound Formats

If you only have one format, you can convert between WAV and MP3 using:

- [Online Audio Converter](https://online-audio-converter.com/)
- [CloudConvert](https://cloudconvert.com/wav-to-mp3)
- [FFmpeg](https://ffmpeg.org/) (command line)

## Troubleshooting

If the notification sound doesn't play:

1. Make sure both files exist in this directory
2. Check that the files are valid audio files (not empty or corrupted)
3. Try different browsers (Chrome, Firefox, Safari)
4. Some mobile browsers require user interaction before playing sounds

The website includes fallback mechanisms if these files are missing or cannot be played.