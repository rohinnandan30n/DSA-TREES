# 🚀 Frontend Setup & Installation Guide

## Quick Start (30 seconds)

### Prerequisites
- **Node.js** v16+ ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** (already initialized in project)

### Installation Steps

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

✅ **Done!** The app will automatically open at `http://localhost:3000`

---

## 📋 System Requirements

- **Windows 10+, macOS 10.15+, or Linux**
- **8GB RAM minimum** (4GB recommended)
- **500MB disk space** for node_modules

---

## 🎯 What You Can Do

Once the frontend is running:

### 1. **Select a Tree Type**
   - Choose BST, AVL, or Red-Black Tree from the sidebar
   - Each has unique properties and behaviors

### 2. **Choose a Learning Mode**
   - **Operations**: Perform insert, search, delete operations
   - **Lessons**: Step-by-step guided learning
   - **Quiz**: Test your knowledge with interactive quizzes
   - **Theory**: Read about tree properties and algorithms

### 3. **Interact with Trees**
   - Enter values in the input field
   - Click "Execute" to perform operations
   - Watch the tree visualization update in real-time
   - Try the quick action buttons

### 4. **Take Quizzes**
   - Answer multiple-choice questions
   - Get immediate feedback
   - Track your score
   - Learn from explanations

---

## 🔧 Development Commands

```bash
# Start development server (default: http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm preview

# Run linter
npm run lint
```

---

## 📁 Frontend Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── App.tsx              # Main application component
│   │   ├── TreeSelector.tsx     # Tree type & mode selector
│   │   ├── TreeCanvas.tsx       # Tree visualization
│   │   ├── ControlPanel.tsx     # Insert/Search/Delete controls
│   │   └── QuizPanel.tsx        # Interactive quizzes
│   ├── styles/
│   │   └── App.css              # Main stylesheet
│   ├── main.tsx                 # React entry point
│   └── index.css                # Global styles
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite build configuration
├── .gitignore                   # Git ignore rules
└── README.md                    # Frontend README
```

---

## 🎨 Features Overview

### Interactive Tree Operations
```
Input: 50, 30, 70, 20, 40
Operation: Insert
Result: ✅ Inserted 50 into BST
        → Visual tree updates
        → Nodes arranged correctly
```

### Real-time Visualization
- Nodes rendered as circles
- Edges shown as lines
- Color coding by tree type:
  - **BST**: Blue
  - **AVL**: Blue with balance info
  - **RBT**: Red/Black colored

### Quiz System
```
Question: What is the balance factor in AVL trees?
Options: [A] Height of left - Height of right
         [B] Height of right - Height of left
         [C] Number of left nodes - right nodes
         [D] Color of the node
Answer: A ✅
Score: 1/3
```

---

## ⚙️ Configuration

### Change Server Port
Edit `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    port: 3001,  // Change from 3000 to 3001
    open: true
  }
})
```

### Add Custom Quiz Questions
Edit `src/components/QuizPanel.tsx`:
```typescript
const quizzes: Record<string, any[]> = {
  bst: [
    {
      question: "Your question here?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correct: 0,  // Index of correct answer
    },
    // Add more questions...
  ],
}
```

---

## 🐛 Troubleshooting

### "npm: command not found"
- **Solution**: Node.js not installed. Download from https://nodejs.org/

### "Cannot find module" error
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use
```bash
# Solution: Use different port in vite.config.ts (see Configuration above)
```

### Styles not loading
```bash
# Solution: Clear browser cache (Ctrl+Shift+Delete) and restart dev server
npm run dev
```

---

## 📦 Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
# Build first
npm run build

# Deploy 'dist' folder to Netlify
```

### Deploy to GitHub Pages
```bash
# Update vite.config.ts with your repo name
# Then build and commit
npm run build
git add .
git commit -m "Deploy to GitHub Pages"
```

---

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/)
- [CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)

---

## ✨ Next Steps

1. ✅ Install and run the frontend
2. 📖 Explore tree visualizations
3. 🧪 Try interactive operations
4. 🎯 Take the quizzes
5. 🔗 Integrate with C backend via WebAssembly (future)

---

## 🤝 Need Help?

- Check [frontend/README.md](./frontend/README.md)
- Review [FRONTEND_README.md](./FRONTEND_README.md)
- Look at component source code
- Consult [docs/user_guide.md](./docs/user_guide.md)

---

**Happy Learning! 🌳**
