/**
 * Utility functions for Valentine Quiz Application
 */

/**
 * Calculate total score from answers array
 * @param {Array} answers - Array of answer objects with points
 * @returns {number} Total score
 */
export function calculateTotalScore(answers) {
  return answers.reduce((total, answer) => total + (answer.points || 0), 0);
}

/**
 * Get romantic message based on score
 * @param {number} score - Total score
 * @param {Array} scoreMessages - Array of score message objects
 * @returns {string} Romantic message
 */
export function getScoreMessage(score, scoreMessages) {
  const messageObj = scoreMessages.find(
    msg => score >= msg.min && score <= msg.max
  );
  return messageObj ? messageObj.message : 'You are amazing! ❤️';
}

/**
 * Create a DOM element with classes and content
 * @param {string} tag - HTML tag name
 * @param {string|Array} classes - Class name(s) to add
 * @param {string} content - Inner HTML content
 * @returns {HTMLElement} Created element
 */
export function createElement(tag, classes = '', content = '') {
  const element = document.createElement(tag);
  if (classes) {
    const classList = Array.isArray(classes) ? classes : [classes];
    element.classList.add(...classList);
  }
  if (content) {
    element.innerHTML = content;
  }
  return element;
}

/**
 * Add event listener with touch support
 * @param {HTMLElement} element - Target element
 * @param {Function} callback - Event handler
 */
export function addTouchClickListener(element, callback) {
  element.addEventListener('click', callback);
  element.addEventListener('touchend', (e) => {
    e.preventDefault();
    callback(e);
  });
}

/**
 * Check if device supports touch
 * @returns {boolean} True if touch is supported
 */
export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Get random number between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Debounce function to limit execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
