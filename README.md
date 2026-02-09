# Valentine Quiz Application 💕

A romantic, personalized web-based quiz designed as a Valentine's Day gift with a 1990s aesthetic.

## Features

- 5 carefully crafted romantic questions
- Playful interactive elements
- Beautiful 1990s Valentine aesthetic
- Mobile-friendly responsive design
- Animated floating hearts
- Personalized scoring and messages

## Personalization Instructions

Before deploying, customize the following:

### 1. Add Your Photo
Replace the image path in `js/questions.js` for Question 2:
```javascript
image: './assets/images/nidhi/1.JPG',  // Change this to your photo path
```
Add your photo to the `assets/images/` folder.

### 2. Customize Questions
Edit `js/questions.js` to personalize:
- **Question 1**: Travel destinations with emojis
- **Question 2**: Photo location options (mark the correct answer with `correct: true`)
- **Question 3**: "Will you be my valentine?" (already configured)
- **Question 4**: "I love you" dates/occasions (mark the correct answer with `correct: true` for bonus points)
- **Question 5**: Date night locations with emojis
- **Score Messages**: Customize romantic messages for different score ranges

### 3. Update Configuration
Edit `js/config.js` to customize:
- Partner name
- Relationship start date
- Color scheme (primary, secondary, accent colors)
- Animation settings (heart count, transition duration)

### 4. Customize Styling (Optional)
Edit `css/styles.css` to change:
- Color variables in `:root`
- Fonts (update Google Fonts link in `index.html`)
- Button styles and animations

## Deployment to GitHub Pages

### Quick Deployment Steps

1. **Create a GitHub Repository**
   - Go to GitHub and create a new repository
   - Name it something romantic (e.g., `valentine-quiz`)
   - Keep it public or private (your choice)

2. **Push Your Code**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Valentine Quiz"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository Settings
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select branch `main` and folder `/ (root)`
   - Click "Save"

4. **Access Your Quiz**
   - Wait 1-2 minutes for deployment
   - Your quiz will be available at: `https://yourusername.github.io/repository-name/`
   - Share this link with your valentine! 💕

### Important Notes

- All asset paths are already configured as relative paths for GitHub Pages compatibility
- No build process required - just push and deploy!
- If using a custom domain, update the repository settings accordingly
- The quiz works entirely client-side, so no server configuration needed

## Local Development

Simply open `index.html` in a web browser. No build tools required!

## Technologies Used

- HTML5
- CSS3 (with animations)
- Vanilla JavaScript (ES6+)
- Google Fonts

## Browser Support

Works on all modern browsers and mobile devices.
# valentine
# valentine
# valentine
