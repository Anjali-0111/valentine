/**
 * Question data and configuration for Valentine Quiz Application
 * Customized for Robin 💕
 */

export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'What was the first thing that made me fall for you?',
    options: [
      { text: 'Your singing', points: 3, emoji: '🎤' },
      { text: 'The way you talked to me', points: 3, emoji: '💬' },
      { text: 'Your caring nature', points: 3, emoji: '🤗' },
      { text: 'All of the above', points: 10, correct: true, emoji: '💖' }
    ]
  },
  {
    id: 2,
    type: 'multiple-choice',
    question: 'What\'s the most beautiful moment together?',
    options: [
      { text: 'First Mahakal visit', points: 10, correct: true, emoji: '🛕' },
      { text: 'Naldhera memories', points: 3, emoji: '🏔️' },
      { text: 'RCB winning match', points: 3, emoji: '🏏' },
      { text: 'Not mentioned here', points: 3, emoji: '✨' }
    ]
  },
  {
    id: 3,
    type: 'multiple-choice',
    question: 'What do I silently wish you never forget?',
    options: [
      { text: 'I\'m proud of you', points: 3, emoji: '🌟' },
      { text: 'I believe in you', points: 3, emoji: '💪' },
      { text: 'You matter to me deeply', points: 3, emoji: '💝' },
      { text: 'All of the above', points: 10, correct: true, emoji: '❤️' }
    ]
  },
  {
    id: 4,
    type: 'multiple-choice',
    question: 'Which place you want us to visit next?',
    options: [
      { text: 'Leh-Ladakh', points: 10, correct: true, emoji: '🏔️' },
      { text: 'Kedarnath', points: 3, emoji: '⛰️' },
      { text: 'Meghalaya', points: 3, emoji: '🌧️' },
      { text: 'Goa', points: 3, emoji: '🏖️' }
    ]
  },
  {
    id: 5,
    type: 'multiple-choice',
    question: 'Your best idea for date?',
    options: [
      { text: 'Watching movie with snacks', points: 3, emoji: '🍿' },
      { text: 'Candle light dinner at good restaurant', points: 3, emoji: '🕯️' },
      { text: 'Cozy home stay with inhouse meals', points: 10, correct: true, emoji: '🏡' },
      { text: 'Playing any game together', points: 3, emoji: '🎮' }
    ]
  },
  {
    id: 6,
    type: 'multiple-choice',
    question: 'What do I miss the most when we\'re not together?',
    options: [
      { text: 'Talking to you', points: 3, emoji: '💭' },
      { text: 'Laughing with you', points: 3, emoji: '😄' },
      { text: 'Your hugs', points: 3, emoji: '🤗' },
      { text: 'All of it — it\'s unfair actually', points: 10, correct: true, emoji: '💔' }
    ]
  },
  {
    id: 7,
    type: 'image-choice',
    question: 'Where is this picture taken?',
    image: './assets/images/couple.jpg',
    options: [
      { text: 'Banaras', points: 3, emoji: '🕉️' },
      { text: 'Dwarka', points: 3, emoji: '🏛️' },
      { text: 'Ujjain', points: 10, correct: true, emoji: '🛕' },
      { text: 'Prayagraj', points: 3, emoji: '🌊' }
    ]
  },
  {
    id: 8,
    type: 'multiple-choice',
    question: 'What color dress I wore on our first virtual date?',
    options: [
      { text: 'Black', points: 3, emoji: '🖤' },
      { text: 'Blue', points: 10, correct: true, emoji: '💙' },
      { text: 'White', points: 3, emoji: '🤍' },
      { text: 'Pink', points: 3, emoji: '💗' }
    ]
  },
  {
    id: 9,
    type: 'multiple-choice',
    question: 'What do I need the MOST from you when I am upset?',
    options: [
      { text: 'Solutions', points: 3, emoji: '💡' },
      { text: 'Space', points: 3, emoji: '🌌' },
      { text: 'Reassurance and hugs', points: 10, correct: true, emoji: '🫂' },
      { text: 'Food', points: 3, emoji: '🍕' }
    ]
  },
  {
    id: 10,
    type: 'playful-choice',
    question: 'Last and most important question... Will you be my valentine?',
    options: [
      { text: 'Yes! ❤️', points: 10, action: 'accept' },
      { text: 'No', points: 0, action: 'escape' }
    ]
  }
];

export const scoreMessages = [
  { min: 0, max: 40, message: 'Every moment with you is perfect! ❤️' },
  { min: 41, max: 70, message: 'You know me so well, my love! 💕' },
  { min: 71, max: 90, message: 'We are meant to be together! 💖' },
  { min: 91, max: 100, message: 'You are my soulmate! Forever and always! We are a perfect match made in heaven! 💝✨' }
];
