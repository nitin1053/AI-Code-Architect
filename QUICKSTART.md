# 🚀 Quick Start Guide

## Get Started in 3 Steps

### 1️⃣ Install Dependencies (Already Done!)
```bash
npm install
```

### 2️⃣ (Optional) Add Grok API Key
Create a `.env` file in the root directory:
```bash
VITE_GROK_API_KEY=your_grok_api_key_here
```

**Note:** The app works perfectly without an API key in demo mode!

### 3️⃣ Start the Development Server
```bash
npm run dev
```

The app will open at `http://localhost:3000` 🎉

---

## 🎯 What You'll See

### Homepage
Beautiful landing page showcasing all features

### Features to Try

#### 1. Code Analysis
- Navigate to "Analyze" tab
- Paste or select example JavaScript code
- Click "Analyze Code"
- See detailed insights!

#### 2. Code Generation
- Click "Generate" tab
- Type: "Create a function to find the largest number in an array"
- Select a language
- Click "Generate Code"
- Get production-ready code!

#### 3. Bug Detection
- Click "Bugs" tab
- Load example buggy code
- Click "Detect Bugs"
- See detailed bug report with fixes!

#### 4. Test Generation
- Click "Tests" tab
- Load example code
- Select a test framework
- Generate comprehensive tests!

#### 5. Metrics Dashboard
- Click "Metrics" tab
- View beautiful charts and analytics
- Track code quality trends

---

## 🔑 Getting a Grok API Key

1. Visit [xAI Developer Platform](https://x.ai/api)
2. Sign up or log in
3. Generate an API key
4. Add it to your `.env` file

---

## 🎬 Running the Demo

Perfect for hackathon presentations:

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
grok_ai_application/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Main application pages
│   ├── services/         # API and business logic
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
└── tailwind.config.js    # Tailwind CSS config
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or change port in vite.config.js
```

### Module Not Found
```bash
npm install
```

### API Not Working
- Check your `.env` file
- Verify API key is correct
- App works in demo mode without API key!

---

## 📚 Resources

- **Documentation**: See `README.md` and `HACKATHON_SUBMISSION.md`
- **Presentation**: See `PRESENTATION_GUIDE.md`
- **Tech Stack**: React, Vite, Tailwind, Grok AI

---

## 🎉 You're All Set!

Start exploring and impress the judges! 🏆

**Pro Tip:** Try the demo without an API key first to see how it works!
