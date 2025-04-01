# Full Stack Web Application Setup Guide

## Project Initialization

### Frontend Setup

```bash
# Create Vite React project
cd frontend
npm create vite@latest

# Install dependencies
npm install
npm run dev
```

### Backend Setup

```bash
# Initialize backend project
cd backend
npm init -y

# Install core dependencies
npm i express mongoose dotenv jsonwebtoken bcryptjs cookie-parser socket.io cloudinary cors

# Install development dependencies
npm i nodemon -D
```

## Project Configuration

### Backend Package.json Updates

Update your `package.json` with the following modifications:

```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js"
  }
}
```

### Frontend Dependencies

```bash
# Frontend additional packages
cd frontend
npm i react-router-dom react-hot-toast axios zustand lucide-react socket.io-client
```

## Tailwind CSS Setup

### Install Tailwind with Vite

```bash
# Install Tailwind and DaisyUI
npm i -D tailwindcss postcss autoprefixer daisyui@latest
npx tailwindcss init -p
```

### Tailwind Config (`tailwind.config.js`)

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};
```

## Seeding Test Users

```bash
# Run user seeding script
cd backend
node seeds/user.seed.js
```
