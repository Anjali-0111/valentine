/**
 * Animation engine for Valentine Quiz Application
 */

import { CONFIG } from './config.js';
import { randomBetween } from './utils.js';

export class AnimationEngine {
  constructor() {
    this.hearts = [];
  }

  /**
   * Create floating hearts in the background
   * @param {HTMLElement} container - Container element for hearts
   * @param {number} count - Number of hearts to create
   */
  createFloatingHearts(container, count = CONFIG.animations.heartCount) {
    // Clear existing hearts
    this.clearFloatingHearts();

    // Create regular emoji hearts
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.textContent = '❤️';
      heart.style.left = `${randomBetween(0, 100)}%`;
      heart.style.animationDuration = `${randomBetween(3000, 6000)}ms`;
      heart.style.animationDelay = `${randomBetween(0, 3000)}ms`;
      heart.style.fontSize = `${randomBetween(1, 3)}rem`;
      
      container.appendChild(heart);
      this.hearts.push(heart);
    }

    // Create photo hearts with Nidhi's images
    this.createPhotoHearts(container);
  }

  /**
   * Create floating photo hearts with images
   * @param {HTMLElement} container - Container element for photo hearts
   */
  createPhotoHearts(container) {
    const photoCount = Math.min(CONFIG.animations.photoHeartCount, CONFIG.nidhiPhotos.length);
    
    for (let i = 0; i < photoCount; i++) {
      const photoHeart = document.createElement('div');
      photoHeart.className = 'floating-heart photo-heart';
      
      // Create heart-shaped container with image
      const heartShape = document.createElement('div');
      heartShape.className = 'heart-shape';
      
      const img = document.createElement('img');
      img.src = CONFIG.nidhiPhotos[i];
      img.alt = `Nidhi photo ${i + 1}`;
      img.loading = 'lazy';
      
      // Handle image load errors gracefully
      img.onerror = () => {
        photoHeart.style.display = 'none';
      };
      
      heartShape.appendChild(img);
      photoHeart.appendChild(heartShape);
      
      // Random positioning and animation
      photoHeart.style.left = `${randomBetween(0, 100)}%`;
      photoHeart.style.animationDuration = `${randomBetween(4000, 8000)}ms`;
      photoHeart.style.animationDelay = `${randomBetween(0, 4000)}ms`;
      
      container.appendChild(photoHeart);
      this.hearts.push(photoHeart);
    }
  }

  /**
   * Clear all floating hearts
   */
  clearFloatingHearts() {
    this.hearts.forEach(heart => heart.remove());
    this.hearts = [];
  }

  /**
   * Transition between screens with animation
   * @param {HTMLElement} fromScreen - Current screen element
   * @param {HTMLElement} toScreen - Next screen element
   * @param {string} type - Animation type ('fade', 'slide')
   */
  transitionScreen(fromScreen, toScreen, type = 'fade') {
    return new Promise((resolve) => {
      if (fromScreen) {
        const outClass = type === 'slide' ? 'slide-out-left' : 'fade-out';
        fromScreen.classList.add(outClass);
        
        setTimeout(() => {
          fromScreen.remove();
        }, CONFIG.animations.transitionDuration);
      }

      const inClass = type === 'slide' ? 'slide-in-right' : 'fade-in';
      toScreen.classList.add(inClass);
      
      setTimeout(() => {
        toScreen.classList.remove(inClass);
        resolve();
      }, CONFIG.animations.transitionDuration);
    });
  }

  /**
   * Make button escape from cursor/touch
   * @param {HTMLElement} button - Button element to move
   * @param {Event} event - Mouse or touch event
   */
  escapeButton(button, event) {
    const buttonRect = button.getBoundingClientRect();
    const containerRect = button.parentElement.getBoundingClientRect();
    
    // Get cursor/touch position
    let cursorX, cursorY;
    if (event.type.startsWith('touch')) {
      cursorX = event.touches[0]?.clientX || event.changedTouches[0]?.clientX;
      cursorY = event.touches[0]?.clientY || event.changedTouches[0]?.clientY;
    } else {
      cursorX = event.clientX;
      cursorY = event.clientY;
    }

    // Calculate new position away from cursor
    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;
    
    let newX = randomBetween(0, maxX);
    let newY = randomBetween(0, maxY);
    
    // Ensure button moves away from cursor
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;
    
    if (Math.abs(cursorX - buttonCenterX) < 100 && Math.abs(cursorY - buttonCenterY) < 100) {
      // Move to opposite side
      newX = cursorX < containerRect.width / 2 ? maxX : 0;
      newY = cursorY < containerRect.height / 2 ? maxY : 0;
    }

    button.style.position = 'absolute';
    button.style.left = `${newX}px`;
    button.style.top = `${newY}px`;
    button.style.transition = 'all 0.3s ease-out';
  }

  /**
   * Show celebration animation
   * @param {HTMLElement} element - Element to animate
   */
  celebrateAnswer(element) {
    element.classList.add('bounce', 'glow');
    setTimeout(() => {
      element.classList.remove('bounce', 'glow');
    }, 1000);
  }

  /**
   * Create heart explosion effect at coordinates
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {HTMLElement} container - Container for hearts
   */
  heartExplosion(x, y, container) {
    const heartCount = 12;
    const hearts = [];

    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart-explosion';
      heart.textContent = '❤️';
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      
      const angle = (i / heartCount) * Math.PI * 2;
      const distance = randomBetween(50, 150);
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      
      heart.style.setProperty('--tx', `${tx}px`);
      heart.style.setProperty('--ty', `${ty}px`);
      
      container.appendChild(heart);
      hearts.push(heart);
    }

    setTimeout(() => {
      hearts.forEach(heart => heart.remove());
    }, 1000);
  }
}
