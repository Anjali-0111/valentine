# Deployment Checklist

Before deploying your Valentine Quiz, make sure you've completed these steps:

## Personalization

- [ ] Updated photo path in `js/questions.js` (Question 2)
- [ ] Added your personal photo to `assets/images/` folder
- [ ] Customized travel destinations in Question 1
- [ ] Updated photo location options in Question 2
- [ ] Set correct answer for Question 2 (`correct: true`)
- [ ] Customized "I love you" dates in Question 4
- [ ] Set correct answer for Question 4 (`correct: true`)
- [ ] Updated date night locations in Question 5
- [ ] Personalized score messages in `js/questions.js`
- [ ] Updated partner name in `js/config.js`
- [ ] Set relationship start date in `js/config.js`

## Testing

- [ ] Opened `index.html` in a browser
- [ ] Tested welcome screen loads correctly
- [ ] Verified all 5 questions display properly
- [ ] Confirmed image loads in Question 2 (or placeholder shows)
- [ ] Tested "No" button escape behavior in Question 3
- [ ] Verified "Yes" button celebration animation works
- [ ] Checked score calculation is correct
- [ ] Confirmed results screen shows appropriate message
- [ ] Tested on mobile device or mobile emulator
- [ ] Verified no horizontal scrolling on mobile
- [ ] Tested touch interactions work properly
- [ ] Checked all animations run smoothly

## Deployment

- [ ] Created GitHub repository
- [ ] Pushed all files to repository
- [ ] Enabled GitHub Pages in repository settings
- [ ] Verified deployment URL works
- [ ] Tested deployed version on mobile device
- [ ] Shared link with your valentine! 💕

## Optional Enhancements

- [ ] Customized color scheme in `css/styles.css`
- [ ] Changed fonts (update Google Fonts link)
- [ ] Adjusted animation settings in `js/config.js`
- [ ] Optimized images for web (compress large files)
- [ ] Added custom domain (if desired)

## Troubleshooting

If something doesn't work:

1. **Images not loading**: Check file paths are correct and case-sensitive
2. **Animations not working**: Check browser console for JavaScript errors
3. **Mobile issues**: Test with Chrome DevTools mobile emulator
4. **GitHub Pages not deploying**: Wait 2-3 minutes and check repository settings
5. **Blank page**: Check browser console for errors, verify all file paths are relative

## Support

For issues or questions, check:
- Browser console (F12) for error messages
- GitHub Pages deployment status in repository settings
- README.md for detailed instructions
