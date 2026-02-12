/**
 * Main application controller for Valentine Quiz Application
 */

import { questions, scoreMessages } from './questions.js';
import { AnimationEngine } from './animations.js';
import { calculateTotalScore, getScoreMessage } from './utils.js';

class ValentineQuizApp {
  constructor() {
    this.currentQuestion = 0;
    this.score = 0;
    this.answers = [];
    this.totalQuestions = questions.length;
    this.animationEngine = new AnimationEngine();
    this.appContainer = document.getElementById('app');
    this.noClickCount = 0; // Track No button click attempts
    this.backgroundMusic = null; // Background music player
  }

  /**
   * Initialize the application
   */
  init() {
    this.createBackgroundMusic();
    this.createFixedHearts();
    this.showWelcomeScreen();
    this.animationEngine.createFloatingHearts(document.body);
    this.setupEventListeners();
  }

  /**
   * Create and setup background music
   */
  createBackgroundMusic() {
    // Create audio element
    this.backgroundMusic = document.createElement('audio');
    this.backgroundMusic.src = './assets/a.mp3';
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.3; // Set volume to 30%
    
    // Try to autoplay (may be blocked by browser)
    const playPromise = this.backgroundMusic.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was prevented, play on first user interaction
        const playOnInteraction = () => {
          this.backgroundMusic.play();
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('touchstart', playOnInteraction);
        };
        
        document.addEventListener('click', playOnInteraction);
        document.addEventListener('touchstart', playOnInteraction);
      });
    }
  }

  /**
   * Create fixed opening hearts across the page
   */
  createFixedHearts() {
    // Create romantic polaroid-style photo frames
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'fixed-hearts-container';
    heartsContainer.innerHTML = `
      <div class="photo-polaroid polaroid-1">
        <div class="polaroid-frame">
          <img src="./assets/images/nidhi/1.jpg" alt="Memory 1" onerror="this.src='https://via.placeholder.com/150/FF69B4/FFFFFF?text=💕'">
          <div class="polaroid-caption">Our First Moment 💕</div>
        </div>
      </div>
      <div class="photo-polaroid polaroid-2">
        <div class="polaroid-frame">
          <img src="./assets/images/nidhi/2.jpg" alt="Memory 2" onerror="this.src='https://via.placeholder.com/150/FF1493/FFFFFF?text=💖'">
          <div class="polaroid-caption">Sweet Memories 💖</div>
        </div>
      </div>
      <div class="photo-polaroid polaroid-3">
        <div class="polaroid-frame">
          <img src="./assets/images/nidhi/3.jpg" alt="Memory 3" onerror="this.src='https://via.placeholder.com/150/FFB6C1/FFFFFF?text=💝'">
          <div class="polaroid-caption">Forever Together 💝</div>
        </div>
      </div>
      <div class="photo-polaroid polaroid-4">
        <div class="polaroid-frame">
          <img src="./assets/images/nidhi/4.jpg" alt="Memory 4" onerror="this.src='https://via.placeholder.com/150/FF69B4/FFFFFF?text=❤️'">
          <div class="polaroid-caption">Love You Always ❤️</div>
        </div>
      </div>
    `;
    document.body.appendChild(heartsContainer);
  }

  /**
   * Setup global event listeners
   */
  setupEventListeners() {
    // Event delegation for dynamically created buttons
    const handleClick = (e) => {
      if (e.target.id === 'start-btn') {
        this.startQuiz();
      } else if (e.target.id === 'restart-btn') {
        this.restartQuiz();
      } else if (e.target.id === 'music-toggle' || e.target.closest('#music-toggle')) {
        this.toggleMusic();
      } else if (e.target.classList.contains('option-button') || e.target.closest('.option-button')) {
        // Handle option button clicks (including clicks on child elements)
        const button = e.target.classList.contains('option-button') 
          ? e.target 
          : e.target.closest('.option-button');
        this.handleOptionClick(button);
      }
    };

    // Add both click and touch event listeners
    this.appContainer.addEventListener('click', handleClick);
    this.appContainer.addEventListener('touchend', (e) => {
      // Prevent default to avoid double-firing with click
      if (e.target.classList.contains('option-button') || 
          e.target.closest('.option-button') ||
          e.target.id === 'start-btn' ||
          e.target.id === 'restart-btn') {
        e.preventDefault();
        handleClick(e);
      }
    });
  }

  /**
   * Handle No button escape behavior
   * @param {Event} e - Mouse or touch event
   * @param {string} type - Event type ('mouse' or 'touch')
   */
  handleNoButtonEscape(e, type) {
    const noButton = this.appContainer.querySelector('.playful-no-button');
    if (!noButton) return;

    let clientX, clientY;
    if (type === 'touch' && e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if (type === 'mouse') {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return;
    }

    const rect = noButton.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    // Calculate distance from cursor/touch to button center
    const distance = Math.sqrt(
      Math.pow(clientX - buttonCenterX, 2) + 
      Math.pow(clientY - buttonCenterY, 2)
    );

    // If cursor/touch is within 100px of button, move it away
    const escapeThreshold = 100;
    if (distance < escapeThreshold) {
      this.moveNoButtonAway(noButton, clientX, clientY);
    }
  }

  /**
   * Move No button away from cursor/touch position
   * @param {HTMLElement} button - The No button element
   * @param {number} cursorX - Cursor/touch X position
   * @param {number} cursorY - Cursor/touch Y position
   */
  moveNoButtonAway(button, cursorX, cursorY) {
    const container = this.appContainer.querySelector('.options-container');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    // Calculate direction away from cursor
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;
    
    const deltaX = buttonCenterX - cursorX;
    const deltaY = buttonCenterY - cursorY;
    
    // Normalize and scale the movement
    const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const moveDistance = 150;
    
    let newX = (deltaX / magnitude) * moveDistance;
    let newY = (deltaY / magnitude) * moveDistance;

    // Keep button within container bounds
    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;
    
    // Get current position or default to 0
    const currentTransform = button.style.transform;
    let currentX = 0, currentY = 0;
    
    if (currentTransform) {
      const match = currentTransform.match(/translate\((-?\d+(?:\.\d+)?)px,\s*(-?\d+(?:\.\d+)?)px\)/);
      if (match) {
        currentX = parseFloat(match[1]);
        currentY = parseFloat(match[2]);
      }
    }

    newX = Math.max(-buttonRect.left + containerRect.left, Math.min(maxX, currentX + newX));
    newY = Math.max(-buttonRect.top + containerRect.top, Math.min(maxY, currentY + newY));

    button.style.transform = `translate(${newX}px, ${newY}px)`;
    button.style.transition = 'transform 0.3s ease-out';
  }

  /**
   * Handle option button click with visual feedback
   * @param {HTMLElement} button - The clicked option button
   */
  handleOptionClick(button) {
    if (!button) return;

    // Handle No button click in playful question
    if (button.classList.contains('playful-no-button')) {
      // Increment click count
      this.noClickCount++;
      
      // Show alert with romantic message
      alert('Wrong choice! 💔 Try again! 💕');
      
      // Make Yes button bigger
      const yesButton = this.appContainer.querySelector('.playful-yes-button');
      if (yesButton) {
        const currentScale = 1 + (this.noClickCount * 0.2); // Grow by 20% each time
        yesButton.style.transform = `scale(${currentScale})`;
        yesButton.style.transition = 'transform 0.3s ease';
      }
      
      return; // Don't proceed with answer submission
    }

    // Get all option buttons in current question
    const allOptions = this.appContainer.querySelectorAll('.option-button');
    
    // Remove selected class from all options
    allOptions.forEach(opt => opt.classList.remove('selected'));
    
    // Add selected class to clicked option for visual feedback
    button.classList.add('selected');

    // Special celebration for Yes button in playful question
    if (button.classList.contains('playful-yes-button')) {
      // Reset no click count for next time
      this.noClickCount = 0;
      
      this.animationEngine.celebrateAnswer(button);
      this.animationEngine.heartExplosion(
        window.innerWidth / 2,
        window.innerHeight / 2,
        this.appContainer
      );
    }
    
    // Extract answer data from button attributes
    const questionIndex = parseInt(button.dataset.questionIndex);
    const optionIndex = parseInt(button.dataset.optionIndex);
    const points = parseInt(button.dataset.points);
    const questionId = parseInt(button.dataset.questionId);
    
    // Small delay to show selection feedback before transitioning
    setTimeout(() => {
      this.submitAnswer({
        questionId,
        optionIndex,
        points
      });
    }, 300);
  }

  /**
   * Show welcome screen
   */
  showWelcomeScreen() {
    this.appContainer.innerHTML = `
      <div class="screen welcome-screen">
        <button id="music-toggle" class="music-toggle" title="Toggle Music">
          🎵
        </button>
        <h1>Valentine Quiz 💕</h1>
        <p class="welcome-name">Hello, Robin!</p>
        <p class="text-center">A romantic journey just for you</p>
        <button id="start-btn" class="pulse">Start Quiz</button>
      </div>
    `;
    this.addMusicToggle();
  }

  /**
   * Start the quiz
   */
  startQuiz() {
    this.currentQuestion = 0;
    this.score = 0;
    this.answers = [];
    
    // Get current screen for transition
    const currentScreen = this.appContainer.querySelector('.screen');
    
    // Create next screen content
    const nextScreenHTML = this.getQuestionHTML(0);
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = nextScreenHTML;
    const nextScreen = tempContainer.firstElementChild;
    
    // Add next screen to DOM
    this.appContainer.appendChild(nextScreen);
    
    // Animate transition
    this.animationEngine.transitionScreen(currentScreen, nextScreen, 'slide');
  }

  /**
   * Get HTML for a question screen
   * @param {number} questionIndex - Index of question
   * @returns {string} HTML string for question screen
   */
  getQuestionHTML(questionIndex) {
    const question = questions[questionIndex];
    const imageHTML = this.renderQuestionImage(question);
    const optionsHTML = this.renderOptions(question, questionIndex);
    
    return `
      <div class="screen question-screen">
        <button id="music-toggle" class="music-toggle ${this.backgroundMusic && !this.backgroundMusic.paused ? 'playing' : ''}" title="Toggle Music">
          ${this.backgroundMusic && !this.backgroundMusic.paused ? '🎵' : '🔇'}
        </button>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${((questionIndex + 1) / this.totalQuestions) * 100}%"></div>
        </div>
        <div class="question-number">Question ${questionIndex + 1} of ${this.totalQuestions}</div>
        <h2 class="question-text">${question.question}</h2>
        ${imageHTML}
        <div class="options-container" id="options-container">
          ${optionsHTML}
        </div>
      </div>
    `;
  }

  /**
   * Render question image for image-choice questions
   * @param {Object} question - Question object
   * @returns {string} HTML string for image or empty string
   */
  renderQuestionImage(question) {
    // Only render image for image-choice type questions
    if (question.type !== 'image-choice' || !question.image) {
      return '';
    }

    return `
      <div class="question-image-container">
        <img 
          src="${question.image}" 
          alt="Question image"
          class="question-image"
          onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect width=%22400%22 height=%22300%22 fill=%22%23FFB6C1%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2224%22 fill=%22%23FF1493%22%3EPhoto coming soon! 💕%3C/text%3E%3C/svg%3E'; this.parentElement.classList.add('placeholder');"
        >
      </div>
    `;
  }

  /**
   * Render answer options as interactive buttons
   * @param {Object} question - Question object
   * @param {number} questionIndex - Index of current question
   * @returns {string} HTML string for options
   */
  renderOptions(question, questionIndex) {
    // Special handling for playful-choice questions (Question 3)
    if (question.type === 'playful-choice') {
      return this.renderPlayfulOptions(question, questionIndex);
    }

    return question.options.map((option, optionIndex) => {
      const emoji = option.emoji ? `<span class="option-emoji">${option.emoji}</span>` : '';
      return `
        <button 
          class="option-button" 
          data-question-index="${questionIndex}"
          data-option-index="${optionIndex}"
          data-points="${option.points}"
          data-question-id="${question.id}"
        >
          ${emoji}
          <span class="option-text">${option.text}</span>
        </button>
      `;
    }).join('');
  }

  /**
   * Render playful options for "Will you be my valentine?" question
   * @param {Object} question - Question object
   * @param {number} questionIndex - Index of current question
   * @returns {string} HTML string for playful options
   */
  renderPlayfulOptions(question, questionIndex) {
    return question.options.map((option, optionIndex) => {
      const isNoButton = option.action === 'escape';
      const buttonClass = isNoButton ? 'option-button playful-no-button' : 'option-button playful-yes-button';
      
      return `
        <button 
          class="${buttonClass}" 
          data-question-index="${questionIndex}"
          data-option-index="${optionIndex}"
          data-points="${option.points}"
          data-question-id="${question.id}"
          data-action="${option.action || ''}"
        >
          <span class="option-text">${option.text}</span>
        </button>
      `;
    }).join('');
  }

  /**
   * Show specific question
   * @param {number} questionIndex - Index of question to show
   */
  showQuestion(questionIndex) {
    // Validate question index
    if (questionIndex < 0 || questionIndex >= this.totalQuestions) {
      console.error('Invalid question index:', questionIndex);
      return;
    }

    this.currentQuestion = questionIndex;
    this.appContainer.innerHTML = this.getQuestionHTML(questionIndex);
  }

  /**
   * Submit answer and move to next question or show results
   * @param {Object} answer - Answer object with questionId, optionIndex, points
   */
  submitAnswer(answer) {
    // Validate answer object
    if (!answer || typeof answer.points !== 'number') {
      console.error('Invalid answer object:', answer);
      return;
    }

    // Store answer with timestamp
    const answerRecord = {
      questionId: answer.questionId || questions[this.currentQuestion].id,
      selectedOption: answer.optionIndex,
      points: answer.points,
      timestamp: Date.now()
    };

    this.answers.push(answerRecord);
    this.score += answer.points;

    // Navigate to next question or results
    if (this.currentQuestion < this.totalQuestions - 1) {
      this.showQuestion(this.currentQuestion + 1);
    } else {
      this.showResults();
    }
  }

  /**
   * Show results screen
   */
  showResults() {
    const totalScore = calculateTotalScore(this.answers);
    const message = getScoreMessage(totalScore, scoreMessages);

    this.appContainer.innerHTML = `
      <div class="screen results-screen">
        <button id="music-toggle" class="music-toggle ${this.backgroundMusic && !this.backgroundMusic.paused ? 'playing' : ''}" title="Toggle Music">
          ${this.backgroundMusic && !this.backgroundMusic.paused ? '🎵' : '🔇'}
        </button>
        <h1>Your Score</h1>
        <div class="score-display">${totalScore}</div>
        <p class="score-message">${message}</p>
        <div class="results-hearts">❤️ 💕 💖 💝 ❤️</div>
        <button id="restart-btn" class="pulse">Start Over</button>
      </div>
    `;

    // Trigger celebration animation
    this.animationEngine.heartExplosion(
      window.innerWidth / 2,
      window.innerHeight / 2,
      document.body
    );
  }

  /**
   * Restart the quiz
   */
  restartQuiz() {
    this.currentQuestion = 0;
    this.score = 0;
    this.answers = [];
    this.showWelcomeScreen();
  }

  /**
   * Toggle background music on/off
   */
  toggleMusic() {
    if (!this.backgroundMusic) return;
    
    const musicToggle = document.getElementById('music-toggle');
    if (!musicToggle) return;
    
    if (this.backgroundMusic.paused) {
      this.backgroundMusic.play();
      musicToggle.textContent = '🎵';
      musicToggle.classList.add('playing');
    } else {
      this.backgroundMusic.pause();
      musicToggle.textContent = '🔇';
      musicToggle.classList.remove('playing');
    }
  }

  /**
   * Add music toggle button to current screen
   */
  addMusicToggle() {
    const musicToggle = document.getElementById('music-toggle');
    if (musicToggle && this.backgroundMusic) {
      // Update button state based on music playing status
      if (!this.backgroundMusic.paused) {
        musicToggle.classList.add('playing');
      }
    }
  }

  /**
   * Get current application state
   * @returns {Object} Current state
   */
  getState() {
    return {
      currentQuestion: this.currentQuestion,
      score: this.score,
      answers: [...this.answers],
      totalQuestions: this.totalQuestions,
      isComplete: this.currentQuestion >= this.totalQuestions && this.answers.length === this.totalQuestions
    };
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new ValentineQuizApp();
  app.init();
});

export default ValentineQuizApp;
