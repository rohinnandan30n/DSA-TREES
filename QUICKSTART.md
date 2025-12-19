# Tree Trainer - Quick Start Guide

## Overview

You've successfully created **Tree Trainer** - a comprehensive educational system for learning tree data structures. This guide helps you get started quickly.

---

## What Was Added (Dev 4)

### 📚 Quiz Engine
- **Files**: `include/quiz.h`, `src/quiz.c`
- **Features**:
  - AVL rotation type identification quiz
  - Tree shape prediction quizzes  
  - Red-Black tree fix-up scenarios
  - Adaptive difficulty levels
  - Score tracking and statistics

### 🧪 Unit Tests
- **Files**: `tests/test_avl.c`, `tests/test_bst.c`, `tests/test_rbt.c`
- **Coverage**: 32 comprehensive tests
  - BST: 13 tests
  - AVL: 10 tests
  - RBT: 9 tests
- **Validation**: Edge cases, duplicates, deletions, property verification

### ⚙️ Build System
- **CMakeLists.txt**: Modern CMake configuration
- **Makefile**: Alternative build system
- **Cross-platform**: Windows, Linux, macOS support

### 📖 Documentation
- **README.md**: Complete user guide with examples
- **docs/design.md**: Architecture and design decisions
- **.github/workflows/ci.yml**: GitHub Actions CI/CD pipeline

---

## Project Structure

```
tree_trainer/
├── CMakeLists.txt              ← CMake build config
├── Makefile                    ← Alternative build
├── README.md                   ← Full documentation
│
├── include/
│   ├── quiz.h                  ← NEW: Quiz engine API
│   ├── avl.h, bst.h, rbt.h
│   ├── app.h, visualize.h
│
├── src/
│   ├── quiz.c                  ← NEW: Quiz implementation
│   ├── bst.c, avl.c, rbt.c
│   ├── app.c, visualize.c
│   └── main.c
│
├── tests/                      ← NEW: Unit tests directory
│   ├── test_bst.c
│   ├── test_avl.c
│   └── test_rbt.c
│
├── docs/
│   ├── design.md               ← UPDATED: Full architecture
│   └── tree_theory.md
│
└── .github/workflows/
    └── ci.yml                  ← NEW: GitHub Actions CI
```

---

## Quick Build & Run

### Using CMake (Recommended)

**Windows (PowerShell):**
```powershell
mkdir build
cd build
cmake -G "Visual Studio 17 2022" ..
cmake --build . --config Release
ctest
.\Release\tree_trainer.exe
```

**Linux/macOS:**
```bash
mkdir build
cd build
cmake ..
make
ctest
./tree_trainer
```

### Using Makefile

```bash
make              # Build main application
make test         # Run all unit tests
make run          # Build and run app
make clean        # Clean build artifacts
make help         # Show all targets
```

---

## Running Tests

### Run All Tests
```bash
cd build
ctest --output-on-failure
```

### Run Specific Test
```bash
./test_avl   # Test AVL tree (10 tests)
./test_bst   # Test BST (13 tests)
./test_rbt   # Test RBT (9 tests)
```

### Test Output Example
```
========================================
  AVL TREE UNIT TESTS
========================================

Test: Insert single node... PASS
Test: Insert sequence {30, 20, 10, 25, 40}... PASS
Test: Insert skewed left {50, 40, 30, 20, 10}... PASS
...
========================================
  TEST SUMMARY
========================================
Passed: 10
Failed: 0
Total:  10
========================================
```

---

## Quiz Engine Usage

### Launching Quizzes

After building and running the main application:

```bash
./tree_trainer
# Select: Quiz Engine from main menu
```

### Quiz Types Available

1. **AVL Rotation Type Quiz**
   - Shows unbalanced tree
   - Ask: What type of rotation? (LL/RR/LR/RL)
   - Instant feedback with explanation

2. **AVL Prediction Quiz**
   - Given insertion sequence: 10, 5, 15, 2, 7
   - Predict: Height, root value, rotations
   - Verify all 3 predictions

3. **Red-Black Tree Fix-Up Quiz**
   - Shows locally invalid RB tree
   - Ask: What fix-up step? (Recolor/Rotate/Both)
   - Explains correct answer

4. **RB Prediction Quiz**
   - Given insertion sequence
   - Predict: Root value, colors, black height
   - Immediate scoring

### Score Tracking

```
========================================
  SCORE SUMMARY
========================================
Total Questions: 5
Correct Answers: 4
Total Points: 4
Accuracy: 80.0%
Current Level: EASY
========================================
```

### Difficulty Progression

- **EASY → MEDIUM**: 90%+ accuracy after 5 questions
- **MEDIUM → HARD**: 90%+ accuracy after 5 questions
- **AUTO-ADJUST DOWN**: < 50% accuracy after 3 questions

---

## Test Examples

### BST Unit Test
```c
// Insert ascending sequence
for (int i = 1; i <= 5; i++)
    root = bst_insert(root, i);

// Verify BST property maintained
assert(verify_bst_property(root));
```

### AVL Unit Test
```c
// Insert skewed left sequence
int keys[] = {50, 40, 30, 20, 10};
for (int i = 0; i < 5; i++)
    root = avl_insert(root, keys[i]);

// Verify rotations kept height balanced
assert(avl_height(root) <= 3);
assert(verify_balance(root));
```

### RBT Unit Test
```c
// Insert 20 nodes
for (int i = 1; i <= 20; i++)
    root = rbt_insert(root, i);

// Verify Red-Black properties
assert(verify_root_black(root));
assert(verify_no_red_red(root));
assert(verify_black_height(root) > 0);
```

---

## Build Configuration Options

### Debug Build
Add to CMakeLists.txt or Makefile:
```bash
cmake -DCMAKE_BUILD_TYPE=Debug ..
# or
CFLAGS += -g -O0  # in Makefile
```

### Release Build (Default)
```bash
cmake -DCMAKE_BUILD_TYPE=Release ..
# or
CFLAGS += -O2  # in Makefile (default)
```

### Enable All Warnings
Already enabled in CMakeLists.txt and Makefile:
```cmake
add_compile_options(/W4 /WX)  # MSVC
add_compile_options(-Wall -Wextra -Wpedantic -Werror)  # GCC/Clang
```

---

## Continuous Integration

### GitHub Actions Workflow
Automatically triggers on push/PR to `main` or `develop`:

**Runs on**:
- Ubuntu (Linux)
- Windows  
- macOS

**Checks**:
1. Build on all platforms
2. Run unit tests (ctest)
3. Code quality (cppcheck)
4. Documentation verification

**View Results**: Go to repository → Actions tab

---

## Module Overview

| Module | Files | Purpose |
|--------|-------|---------|
| **BST** | bst.h, bst.c | Foundation: insert, delete, search |
| **AVL** | avl.h, avl.c | Height-balanced with 4 rotation types |
| **RBT** | rbt.h, rbt.c | Color-balanced with RB properties |
| **Quiz** | quiz.h, quiz.c | Educational quizzes with scoring |
| **App** | app.h, app.c | Menu system and operations handler |
| **Viz** | visualize.h, visualize.c | ASCII tree display |

---

## Performance Benchmarks

All operations guaranteed O(log n):

```
Inserting 1000 nodes:
- BST: Fast (unbalanced possible)
- AVL: Medium (guaranteed balanced)
- RBT: Medium (guaranteed balanced)

Searching 1000 nodes:
- BST: O(log n) average
- AVL: O(log n) guaranteed
- RBT: O(log n) guaranteed
```

---

## Testing Checklist

- [ ] ✅ Build main application
- [ ] ✅ Run all unit tests (32 tests)
- [ ] ✅ Test each BST operation
- [ ] ✅ Test AVL rotations
- [ ] ✅ Test RBT properties
- [ ] ✅ Try quiz engine
- [ ] ✅ Check score tracking
- [ ] ✅ Verify documentation

---

## Troubleshooting

### CMake not found
```bash
# Install CMake
# Windows: https://cmake.org/download/
# macOS: brew install cmake
# Linux: sudo apt-get install cmake
```

### Build errors
```bash
# Check C11 support
gcc --version  # Should support C11 flag

# Try explicit C standard
cmake -DCMAKE_C_STANDARD=11 ..
```

### Test failures
```bash
# Run with verbose output
ctest --verbose

# Run individual test
./test_avl

# Check memory issues
valgrind ./test_avl
```

---

## Next Steps

1. **Explore the Code**
   - Start with `src/main.c`
   - Review `src/app.c` for menu system
   - Examine `src/quiz.c` for quiz implementation

2. **Extend the Project**
   - Add more quiz question types
   - Implement visualization improvements
   - Add B-trees or Treaps
   - Create persistence (save/load trees)

3. **Share & Contribute**
   - Fork on GitHub
   - Make improvements
   - Submit pull requests

---

## File Checklist

**Headers** (include/):
- ✅ quiz.h - NEW
- ✅ bst.h, avl.h, rbt.h
- ✅ app.h, visualize.h

**Implementation** (src/):
- ✅ quiz.c - NEW
- ✅ bst.c, avl.c, rbt.c
- ✅ app.c, visualize.c, main.c

**Tests** (tests/):
- ✅ test_bst.c - NEW
- ✅ test_avl.c - NEW
- ✅ test_rbt.c - NEW

**Build**:
- ✅ CMakeLists.txt
- ✅ Makefile - NEW

**Documentation**:
- ✅ README.md - NEW (comprehensive)
- ✅ docs/design.md - UPDATED
- ✅ .github/workflows/ci.yml - NEW

**Total**: 18 files created/updated ✅

---

## Quick Reference Commands

```bash
# Build
mkdir build && cd build && cmake .. && make

# Test
ctest --output-on-failure
./test_avl && ./test_bst && ./test_rbt

# Run application
./tree_trainer

# Clean
make clean

# Help
make help
```

---

## Support Resources

- **README.md**: Complete user guide
- **docs/design.md**: Architecture details
- **Source comments**: Implementation explanations
- **Test files**: Usage examples
- **GitHub Issues**: Report problems

---

## Summary

Tree Trainer now has:
- ✅ Complete quiz engine with 4 question types
- ✅ 32 comprehensive unit tests (BST, AVL, RBT)
- ✅ Modern CMake + Makefile build systems
- ✅ Full documentation (README + design doc)
- ✅ GitHub Actions CI/CD pipeline
- ✅ Cross-platform support (Windows, Linux, macOS)

**Happy learning! 🌳**

For detailed information, see README.md and docs/design.md.
