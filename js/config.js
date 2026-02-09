/**
 * Configuration file for Valentine Quiz Application
 * Customize these values to personalize your quiz
 */

export const CONFIG = {
  // Personalize these values
  partnerName: "Nidhi",
  relationshipStart: "2020-02-14",
  
  // Nidhi's photos for floating hearts
  nidhiPhotos: [
    './assets/images/nidhi/1.jpg',
    './assets/images/nidhi/2.jpg',
    './assets/images/nidhi/3.jpg',
    './assets/images/nidhi/4.jpg',
    './assets/images/nidhi/5.jpg'
  ],
  
  // Color scheme (1990s Valentine theme)
  colors: {
    primary: "#FF1493",      // Deep Pink
    secondary: "#FF69B4",    // Hot Pink
    accent: "#FFB6C1",       // Light Pink
    background: "#FFF0F5",   // Lavender Blush
    text: "#8B008B",         // Dark Magenta
    textLight: "#FFFFFF",    // White
    buttonHover: "#FF6EB4"   // Lighter Hot Pink
  },
  
  // Animation settings
  animations: {
    heartCount: 20,
    photoHeartCount: 5,  // Number of photo hearts to show
    transitionDuration: 600,
    enableSounds: false,
    floatingHeartSpeed: 3000  // milliseconds for one float cycle
  },
  
  // Touch interaction settings
  touch: {
    minButtonSize: 44,  // minimum 44x44px for touch targets
    tapDelay: 0         // no delay for touch interactions
  },
  
  // Responsive breakpoints
  breakpoints: {
    mobile: 768,
    tablet: 1024
  }
};
