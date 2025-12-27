# Quiz Master (QuickQuiz)

Quiz Master is a lightweight, client-side React quiz application that runs multiple rounds of short quizzes. It ships with example questions in `src/App.js` (the `QUIZ_DATA` constant) so you can try the app immediately and easily customize questions or rounds.

**Features**
- **Multi-round quizzes**: configurable number of rounds and questions per round.
- **Per-round and overall scoring**: see round results and a final cumulative score.
- **Start / Restart**: start the quiz, restart a round, or start over completely.
- **Immediate feedback**: answers are marked correct/incorrect as you submit them.

**How it works (implementation notes)**
- The UI and logic live in `src/App.js`.
- Quiz content is provided via a `QUIZ_DATA` constant at the top of `src/App.js`.
- The app tracks `currentRound`, `currentQuestion`, `roundScore`, and `totalScore` in React state.

**Quick Local Commands**
- Install dependencies: `npm install`
- Run in development: `npm start` (open http://localhost:3000)
- Build for production: `npm run build`
- Run tests: `npm test`

**Customize the quiz**
- Edit the `QUIZ_DATA` object in `src/App.js` to change rounds, questions, options, and correct answers.
- `QUIZ_DATA` fields you may want to change: `questionsPerRound`, `totalRounds`, and each round's `questions` array.

**Where to look in the code**
- Start page and quiz screens: `src/App.js`
- Styling: uses Tailwind-style classes in the components (no separate CSS needed for the demo build assets).

If you'd like, I can:
- extract `QUIZ_DATA` to a JSON file and load it dynamically,
- add an editor to manage questions in-app, or
- wire the app to persist scores to localStorage or a backend.

----
_This README was updated to reflect the actual app behavior defined in `src/App.js`._
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
