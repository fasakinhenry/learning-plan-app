const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Plan = require('./models/Plan');

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

const plans = [
  // Month 1: Basics of HTML, CSS, and JavaScript
  // Weeks 1-2: HTML & CSS
  { day: 1, task: 'HTML basics: Create a basic HTML page.' },
  { day: 2, task: 'HTML basics: Create a basic HTML page.' },
  { day: 3, task: 'HTML forms and media elements: Create a contact form.' },
  { day: 4, task: 'HTML forms and media elements: Create a contact form.' },
  {
    day: 5,
    task: 'CSS basics: Style your HTML page using basic CSS properties.',
  },
  {
    day: 6,
    task: 'CSS basics: Style your HTML page using basic CSS properties.',
  },
  { day: 7, task: 'CSS box model: Create a layout using the box model.' },
  { day: 8, task: 'CSS positioning: Position elements on your HTML page.' },
  { day: 9, task: 'CSS positioning: Position elements on your HTML page.' },
  { day: 10, task: 'CSS Flexbox: Create a responsive layout using Flexbox.' },
  { day: 11, task: 'CSS Flexbox: Create a responsive layout using Flexbox.' },
  { day: 12, task: 'CSS Grid: Create a complex layout using CSS Grid.' },
  { day: 13, task: 'CSS Grid: Create a complex layout using CSS Grid.' },
  { day: 14, task: 'Review and build a simple portfolio page.' },

  // Weeks 3-4: JavaScript Basics
  { day: 15, task: 'JavaScript basics: Write basic JavaScript programs.' },
  { day: 16, task: 'JavaScript basics: Write basic JavaScript programs.' },
  {
    day: 17,
    task: 'Control structures: Create a simple program using control structures.',
  },
  {
    day: 18,
    task: 'Control structures: Create a simple program using control structures.',
  },
  {
    day: 19,
    task: 'Functions and scope: Write functions to perform specific tasks.',
  },
  {
    day: 20,
    task: 'Functions and scope: Write functions to perform specific tasks.',
  },
  { day: 21, task: 'Arrays and objects: Manipulate arrays and objects.' },
  { day: 22, task: 'Arrays and objects: Manipulate arrays and objects.' },
  {
    day: 23,
    task: 'DOM manipulation: Create, modify, and delete elements in the DOM.',
  },
  {
    day: 24,
    task: 'DOM manipulation: Create, modify, and delete elements in the DOM.',
  },
  { day: 25, task: 'Event handling: Add event listeners to HTML elements.' },
  { day: 26, task: 'Event handling: Add event listeners to HTML elements.' },
  { day: 27, task: 'Review and build a to-do list app.' },
  { day: 28, task: 'Review and build a to-do list app.' },

  // Month 2: Advanced JavaScript and Version Control
  // Weeks 1-2: Advanced JavaScript
  {
    day: 29,
    task: 'ES6+ features: Rewrite existing code using ES6+ features.',
  },
  {
    day: 30,
    task: 'ES6+ features: Rewrite existing code using ES6+ features.',
  },
  {
    day: 31,
    task: 'Destructuring, template literals, and spread/rest operators.',
  },
  {
    day: 32,
    task: 'Destructuring, template literals, and spread/rest operators.',
  },
  {
    day: 33,
    task: 'Promises and async/await: Create a program that fetches data from an API.',
  },
  {
    day: 34,
    task: 'Promises and async/await: Create a program that fetches data from an API.',
  },
  {
    day: 35,
    task: 'Modules and imports/exports: Organize your code into modules.',
  },
  {
    day: 36,
    task: 'Modules and imports/exports: Organize your code into modules.',
  },
  {
    day: 37,
    task: 'Error handling and debugging: Add error handling and debug code.',
  },
  {
    day: 38,
    task: 'Error handling and debugging: Add error handling and debug code.',
  },
  { day: 39, task: 'Build a small interactive project.' },
  { day: 40, task: 'Build a small interactive project.' },
  { day: 41, task: 'Build a small interactive project.' },
  { day: 42, task: 'Build a small interactive project.' },

  // Weeks 3-4: Version Control with Git
  {
    day: 43,
    task: 'Git basics: Initialize a Git repository and perform basic operations.',
  },
  {
    day: 44,
    task: 'Git basics: Initialize a Git repository and perform basic operations.',
  },
  {
    day: 45,
    task: 'Branching and merging: Create and merge branches in your project.',
  },
  {
    day: 46,
    task: 'Branching and merging: Create and merge branches in your project.',
  },
  {
    day: 47,
    task: 'Collaborating with GitHub: Create a repository and collaborate with others.',
  },
  {
    day: 48,
    task: 'Collaborating with GitHub: Create a repository and collaborate with others.',
  },
  {
    day: 49,
    task: 'Pull requests and code reviews: Create a pull request and review code.',
  },
  {
    day: 50,
    task: 'Pull requests and code reviews: Create a pull request and review code.',
  },
  {
    day: 51,
    task: 'Resolve conflicts and best practices: Resolve merge conflicts and follow best practices.',
  },
  {
    day: 52,
    task: 'Resolve conflicts and best practices: Resolve merge conflicts and follow best practices.',
  },
  { day: 53, task: 'Contribute to an open-source project.' },
  { day: 54, task: 'Contribute to an open-source project.' },
  { day: 55, task: 'Contribute to an open-source project.' },
  { day: 56, task: 'Contribute to an open-source project.' },

  // Month 3: Frontend Frameworks and Libraries
  // Weeks 1-2: React Basics
  { day: 57, task: 'Introduction to React: Create a simple React app.' },
  { day: 58, task: 'Introduction to React: Create a simple React app.' },
  {
    day: 59,
    task: 'Props and state: Pass data between components and manage state.',
  },
  {
    day: 60,
    task: 'Props and state: Pass data between components and manage state.',
  },
  {
    day: 61,
    task: 'Event handling in React: Add event handlers to components.',
  },
  {
    day: 62,
    task: 'Event handling in React: Add event handlers to components.',
  },
  { day: 63, task: 'React Router: Implement navigation using React Router.' },
  { day: 64, task: 'React Router: Implement navigation using React Router.' },
  {
    day: 65,
    task: 'Lifecycle methods and hooks: Use lifecycle methods and hooks.',
  },
  {
    day: 66,
    task: 'Lifecycle methods and hooks: Use lifecycle methods and hooks.',
  },
  { day: 67, task: 'Build a simple React application.' },
  { day: 68, task: 'Build a simple React application.' },
  { day: 69, task: 'Build a simple React application.' },
  { day: 70, task: 'Build a simple React application.' },

  // Weeks 3-4: More React and State Management
  { day: 71, task: 'Context API: Manage global state using the Context API.' },
  { day: 72, task: 'Context API: Manage global state using the Context API.' },
  { day: 73, task: 'Redux basics: Set up Redux in your React app.' },
  { day: 74, task: 'Redux basics: Set up Redux in your React app.' },
  {
    day: 75,
    task: 'Redux middleware: Handle asynchronous actions using Redux middleware.',
  },
  {
    day: 76,
    task: 'Redux middleware: Handle asynchronous actions using Redux middleware.',
  },
  { day: 77, task: 'Build a React application with Redux.' },
  { day: 78, task: 'Build a React application with Redux.' },
  { day: 79, task: 'Build a React application with Redux.' },
  { day: 80, task: 'Build a React application with Redux.' },

  // Month 4: CSS Frameworks, Preprocessors, and Build Tools
  // Weeks 1-2: CSS Frameworks and Preprocessors
  {
    day: 81,
    task: 'Introduction to Bootstrap: Create a responsive layout using Bootstrap.',
  },
  {
    day: 82,
    task: 'Introduction to Bootstrap: Create a responsive layout using Bootstrap.',
  },
  {
    day: 83,
    task: 'Bootstrap components: Use Bootstrap components in your project.',
  },
  {
    day: 84,
    task: 'Bootstrap components: Use Bootstrap components in your project.',
  },
  {
    day: 85,
    task: 'Introduction to SASS: Write SASS code and compile it to CSS.',
  },
  {
    day: 86,
    task: 'Introduction to SASS: Write SASS code and compile it to CSS.',
  },
  {
    day: 87,
    task: 'SASS features: Use variables, nesting, and mixins in SASS.',
  },
  {
    day: 88,
    task: 'SASS features: Use variables, nesting, and mixins in SASS.',
  },
  { day: 89, task: 'Build a project using Bootstrap and SASS.' },
  { day: 90, task: 'Build a project using Bootstrap and SASS.' },
  { day: 91, task: 'Build a project using Bootstrap and SASS.' },
  { day: 92, task: 'Build a project using Bootstrap and SASS.' },

  // Weeks 3-4: Build Tools and Task Runners
  {
    day: 93,
    task: 'Introduction to build tools: Set up Webpack in your project.',
  },
  {
    day: 94,
    task: 'Introduction to build tools: Set up Webpack in your project.',
  },
  {
    day: 95,
    task: 'Webpack configuration: Configure Webpack for development and production.',
  },
  {
    day: 96,
    task: 'Webpack configuration: Configure Webpack for development and production.',
  },
  {
    day: 97,
    task: 'Introduction to task runners: Set up Gulp in your project.',
  },
  {
    day: 98,
    task: 'Introduction to task runners: Set up Gulp in your project.',
  },
  {
    day: 99,
    task: 'Gulp tasks: Write tasks to automate your development workflow.',
  },
  {
    day: 100,
    task: 'Gulp tasks: Write tasks to automate your development workflow.',
  },
  { day: 101, task: 'Build and optimize a project using Webpack and Gulp.' },
  { day: 102, task: 'Build and optimize a project using Webpack and Gulp.' },
  { day: 103, task: 'Build and optimize a project using Webpack and Gulp.' },
  { day: 104, task: 'Build and optimize a project using Webpack and Gulp.' },

  // Month 5: Testing, Debugging, and Deployment
  // Weeks 1-2: Testing and Debugging
  { day: 105, task: 'Introduction to testing: Write unit tests using Jest.' },
  { day: 106, task: 'Introduction to testing: Write unit tests using Jest.' },
  {
    day: 107,
    task: 'Testing React components: Write tests for React components.',
  },
  {
    day: 108,
    task: 'Testing React components: Write tests for React components.',
  },
  {
    day: 109,
    task: 'Integration testing: Write integration tests using Jest and React Testing Library.',
  },
  {
    day: 110,
    task: 'Integration testing: Write integration tests using Jest and React Testing Library.',
  },
  {
    day: 111,
    task: 'Debugging techniques: Debug JavaScript and React applications.',
  },
  {
    day: 112,
    task: 'Debugging techniques: Debug JavaScript and React applications.',
  },
  {
    day: 113,
    task: 'Browser developer tools: Use browser developer tools for debugging.',
  },
  {
    day: 114,
    task: 'Browser developer tools: Use browser developer tools for debugging.',
  },
  { day: 115, task: 'Build a project with testing and debugging practices.' },
  { day: 116, task: 'Build a project with testing and debugging practices.' },
  { day: 117, task: 'Build a project with testing and debugging practices.' },
  { day: 118, task: 'Build a project with testing and debugging practices.' },

  // Weeks 3-4: Deployment and Hosting
  {
    day: 119,
    task: 'Introduction to deployment: Deploy a static site using Netlify.',
  },
  {
    day: 120,
    task: 'Introduction to deployment: Deploy a static site using Netlify.',
  },
  {
    day: 121,
    task: 'Server configuration: Configure a server for a React app.',
  },
  {
    day: 122,
    task: 'Server configuration: Configure a server for a React app.',
  },
  {
    day: 123,
    task: 'Continuous integration and deployment: Set up CI/CD pipelines with GitHub Actions.',
  },
  {
    day: 124,
    task: 'Continuous integration and deployment: Set up CI/CD pipelines with GitHub Actions.',
  },
  {
    day: 125,
    task: 'Deploy a React application to a cloud provider (e.g., Vercel, Heroku).',
  },
  {
    day: 126,
    task: 'Deploy a React application to a cloud provider (e.g., Vercel, Heroku).',
  },
  { day: 127, task: 'Monitor and maintain a deployed application.' },
  { day: 128, task: 'Monitor and maintain a deployed application.' },
  { day: 129, task: 'Build and develop an application for production.' },
];

// Actual code that seeds the database
Plan.insertMany(plans)
  .then(() => {
    // Log report if data logs in successfully
    console.log('Data seeded successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error seeding data:', err);
    mongoose.connection.close();
  });
