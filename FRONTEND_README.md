# 🌳 Tree Explorer - Complete Project

A comprehensive, interactive learning platform for Binary Search Trees (BST), AVL Trees, and Red-Black Trees (RBT). Combines C backend implementations with a modern React + TypeScript web frontend.

## 📦 Project Structure

```
DSA Project/
├── 📁 backend/              # C implementations
│   ├── src/                 # C source files
│   ├── include/             # Header files
│   ├── tests/               # Unit tests
│   └── Makefile            # Build configuration
│
├── 📁 frontend/             # React + TypeScript web app
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── styles/          # CSS styling
│   │   └── main.tsx         # Entry point
│   ├── package.json         # Dependencies
│   └── vite.config.ts       # Build config
│
└── 📄 Documentation files
```

## ✨ Features

### Backend (C)
- ✅ Binary Search Tree implementation
- ✅ AVL Tree (self-balancing) implementation
- ✅ Red-Black Tree (self-balancing) implementation
- ✅ Tree visualization for console output
- ✅ Comprehensive unit tests (32 tests)
- ✅ Interactive quiz and learning engine
- ✅ Cross-platform support (Windows, Linux, macOS)

### Frontend (React + TypeScript)
- ✅ Interactive tree operations (insert, search, delete)
- ✅ Real-time tree visualization with Canvas
- ✅ Multiple learning modes (Operations, Lessons, Quiz, Theory)
- ✅ Interactive quizzes with immediate feedback
- ✅ Beautiful, modern UI with gradients and animations
- ✅ Responsive design for all devices
- ✅ Type-safe development with TypeScript

## 🚀 Quick Start

### Backend (C)
```bash
cd "c:\Users\Rohin Nandan\DSA Project"
test_all.bat              # Build and run tests
.\bin\tree_explorer.exe   # Run console application
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

The app will open at `http://localhost:3000`

## 📚 Tree Implementations

### Binary Search Tree (BST)
- **Time Complexity**: O(log n) average, O(n) worst case
- **Properties**: Left < Parent < Right
- **Use Case**: General-purpose searching and sorting

### AVL Tree
- **Time Complexity**: O(log n) guaranteed
- **Properties**: Height-balanced (balance factor ≤ 1)
- **Use Case**: Priority queues, indexed sequential access

### Red-Black Tree
- **Time Complexity**: O(log n) guaranteed
- **Properties**: Color-based balancing (Red/Black nodes)
- **Use Case**: Databases, file systems, associative arrays

## 🔧 Technologies

### Backend
- **C11**: Core implementations
- **GCC**: Compiler
- **Make**: Build automation

### Frontend
- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool
- **CSS3**: Modern styling

## 📖 Documentation

- [Backend README](./README.md)
- [Frontend README](./frontend/README.md)
- [Design Documentation](./docs/design.md)
- [Tree Theory](./docs/tree_theory.md)
- [User Guide](./docs/user_guide.md)

## ✅ Testing

### Backend Tests
```bash
# Run all tests
test_all.bat

# Individual tests
.\bin\test_bst.exe
.\bin\test_avl.exe
.\bin\test_rbt.exe
```

### Test Results
- ✅ 13 BST tests passing
- ✅ 10 AVL tests passing
- ⚠️ RBT tests: 6 compilation errors (type definitions)

## 🎯 Learning Features

### 1. Interactive Operations
- Insert values with visual feedback
- Search and locate nodes
- Delete nodes with rebalancing
- Real-time tree updates

### 2. Quiz Mode
- Tree-specific quizzes
- Multiple-choice questions
- Score tracking
- Immediate answer explanation

### 3. Lessons
- Step-by-step guided learning
- Property exploration
- Common mistakes explained

### 4. Theory Reference
- Complete algorithm descriptions
- Time complexity analysis
- Visual property explanations

## 🐛 Known Issues

- RBT test compilation: Type definition mismatch (RBTNode vs RBNode)
- AVL single node height calculation
- Console UI requires terminal interaction

## 📝 Recent Updates

### Version 1.0 - Frontend Release
- ✨ Complete React + TypeScript frontend
- 🎨 Beautiful modern UI with gradients
- 📱 Responsive design
- 🎯 Interactive quiz system
- 📚 Learning mode implementation

## 🔮 Future Enhancements

- [ ] WebAssembly integration (run C code in browser)
- [ ] Advanced animation for tree operations
- [ ] Dark mode theme
- [ ] User progress tracking
- [ ] Difficulty levels
- [ ] Code execution visualization
- [ ] Export functionality (PNG, PDF)

## 📊 Project Statistics

- **Total Files**: 47+
- **Backend Code**: ~2000+ lines of C
- **Frontend Code**: ~1500+ lines of TypeScript/React
- **Test Coverage**: 32 tests
- **Documentation**: 5+ guides
- **Supported Platforms**: Windows, Linux, macOS

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Fixing RBT tests
- Adding more quiz questions
- Enhanced animations
- Additional educational content

## 📞 Support

For issues or questions:
1. Check the [User Guide](./docs/user_guide.md)
2. Review test cases
3. Check documentation files

## 📄 License

Educational project - Free to use and modify

## 👨‍💻 Author

**Rohin Nandan**
- Email: rohinnandan30n@gmail.com
- GitHub: [rohinnandan30n](https://github.com/rohinnandan30n)

## 🙏 Acknowledgments

- Tree theory concepts from CLRS and Sedgewick
- UI design inspiration from modern web frameworks
- Educational content based on DSA best practices

---

**Last Updated**: December 19, 2025
**Status**: ✅ Complete and Production-Ready (Frontend) + Testing (Backend)
