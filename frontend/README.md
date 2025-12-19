# 🌳 Tree Explorer - Web Frontend

Modern React + TypeScript web application for interactive learning of Binary Search Trees, AVL Trees, and Red-Black Trees.

## ✨ Features

- **Interactive Tree Operations**: Insert, search, and delete operations on different tree types
- **Real-time Visualization**: Canvas-based tree visualization that updates as you perform operations
- **Quiz Engine**: Challenging quizzes for each tree type with immediate feedback
- **Interactive Lessons**: Step-by-step guided learning through tree concepts
- **Theory Reference**: Comprehensive reference material for tree properties and algorithms
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Beautiful UI**: Modern, gradient-based UI with smooth animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Development Server

```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── App.tsx           # Main app component
│   │   ├── TreeSelector.tsx  # Tree type selector
│   │   ├── TreeCanvas.tsx    # Tree visualization
│   │   ├── ControlPanel.tsx  # Operation controls
│   │   └── QuizPanel.tsx     # Quiz interface
│   ├── styles/
│   │   └── App.css           # Main styles
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
└── vite.config.ts            # Vite config
```

## 🛠️ Tech Stack

- **React 18**: UI framework
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool
- **CSS3**: Modern styling with gradients and animations

## 📚 Features Breakdown

### 1. Tree Operations
- Insert values into trees
- Search for specific values
- Delete nodes from trees
- Real-time visualization updates

### 2. Interactive Visualization
- Node representation with canvas
- Tree structure display
- Different colors for tree types:
  - BST: Blue nodes
  - AVL: Blue nodes with balance info
  - RBT: Red/Black colored nodes

### 3. Quiz System
- Multiple-choice questions
- Score tracking
- Immediate feedback
- Difficulty progression
- Custom quizzes for each tree type

### 4. Learning Modes
- **Operations**: Hands-on tree operations
- **Lessons**: Step-by-step guided learning
- **Quiz**: Test your knowledge
- **Theory**: Reference material

## 🎨 UI Components

### TreeSelector
Choose between BST, AVL, and Red-Black Trees, and select learning mode.

### TreeCanvas
Visual representation of the tree structure with nodes and edges.

### ControlPanel
Input interface for tree operations with quick action buttons.

### QuizPanel
Interactive quiz with immediate feedback and score tracking.

## 🔧 Configuration

Edit `vite.config.ts` to customize:
- Dev server port (default: 3000)
- Build output directory
- Asset handling

## 📖 Learning Resources

Each tree type includes:
- Detailed theory explanations
- Property descriptions
- Time complexity analysis
- Common operations guide

## 🚀 Future Enhancements

- [ ] WebAssembly integration for C code
- [ ] Advanced tree rotations visualization
- [ ] Step-by-step operation animations
- [ ] Code execution visualization
- [ ] Difficulty levels for quizzes
- [ ] User progress tracking
- [ ] Dark mode theme
- [ ] Export tree as image

## 📝 License

This project is part of the Tree Explorer DSA project.

## 👨‍💻 Author

Rohin Nandan

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests.
