# Polling App

Welcome to the Polling App! This application allows users to create, view, and participate in polls. It includes user authentication features for secure access.

## Features

- **User Authentication**: Users can register, log in, and log out.
- **Poll Management**: Users can create new polls and view existing ones.
- **Voting Interface**: Users can vote on polls and see results.

## Project Structure

```
Polling_App
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── README.md
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src
│   ├── app
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── auth
│   │   │   ├── login
│   │   │   │   └── page.js
│   │   │   ├── register
│   │   │   │   └── page.js
│   │   │   └── logout
│   │   │       └── page.js
│   │   ├── polls
│   │   │   ├── page.js
│   │   │   ├── create
│   │   │   │   └── page.js
│   │   │   └── [id]
│   │   │       └── page.js
│   │   └── api
│   │       ├── auth
│   │       │   ├── login
│   │       │   │   └── route.js
│   │       │   ├── register
│   │       │   │   └── route.js
│   │       │   └── logout
│   │       │       └── route.js
│   │       └── polls
│   │           ├── route.js
│   │           └── [id]
│   │               └── route.js
│   ├── components
│   │   ├── ui
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   ├── label.jsx
│   │   │   └── form.jsx
│   │   ├── auth
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── AuthGuard.jsx
│   │   └── polls
│   │       ├── PollCard.jsx
│   │       ├── PollForm.jsx
│   │       ├── PollList.jsx
│   │       └── VotingInterface.jsx
│   ├── lib
│   │   ├── auth.js
│   │   ├── database.js
│   │   └── utils.js
│   └── hooks
│       ├── useAuth.js
│       └── usePolls.js
├── components.json
└── tailwind.config.js
```

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the development server with `npm run dev`.

## Contributing

Feel free to submit issues or pull requests to improve the application. 

## License

This project is licensed under the MIT License.