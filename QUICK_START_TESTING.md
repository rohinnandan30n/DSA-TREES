# 🚀 Quick Start Guide - Testing & Running

## One-Line Test All

### Windows
```cmd
test_all.bat
```

### Linux/macOS
```bash
chmod +x run_tests.sh && ./run_tests.sh
```

---

## What Gets Tested

### 1. Compilation ✅
```
✓ bst.c, avl.c, rbt.c
✓ visualize.c, app.c, quiz.c
✓ All header files
```

### 2. Simple Demos ✅
```
✓ bst_test       - BST insert, search, delete
✓ dev1_test      - AVL insert with rotation
```

### 3. Unit Tests ✅
```
✓ test_bst       - 10+ comprehensive BST tests
✓ test_avl       - 15+ AVL rotation & balance tests
✓ test_rbt       - 12+ RBT property tests
```

### 4. Main Application ✅
```
✓ tree_explorer  - Full interactive app
```

---

## Test Files Included

| File | Type | Tests | What It Does |
|------|------|-------|------------|
| test_bst.c | Unit | 10+ | Tests BST ops (insert, search, delete) |
| test_avl.c | Unit | 15+ | Tests all AVL rotations (LL,RR,LR,RL) |
| test_rbt.c | Unit | 12+ | Tests RBT properties & all 3 cases |
| bst_test.c | Demo | Simple | Quick BST demo |
| dev1_test.c | Demo | Simple | Quick AVL demo |

---

## Expected Test Results

### ✅ All Should Pass

```
Test: Insert single node... PASS
Test: Insert sequence... PASS
Test: LL Rotation... PASS
Test: RR Rotation... PASS
Test: LR Rotation... PASS
Test: RL Rotation... PASS
Test: Case 1 (Recolor)... PASS
Test: Case 2&3 (Rotate)... PASS
Test: Search operations... PASS
Test: Delete operations... PASS
...
================================================
          ALL TESTS PASSED! ✓
================================================
```

---

## Run Individual Tests

### BST Test Only
```bash
gcc -I./include tests/test_bst.c src/bst.c -o test_bst && ./test_bst
```

### AVL Test Only
```bash
gcc -I./include tests/test_avl.c src/avl.c -o test_avl && ./test_avl
```

### RBT Test Only
```bash
gcc -I./include tests/test_rbt.c src/rbt.c -o test_rbt && ./test_rbt
```

### Run Demo Applications
```bash
# BST Demo
gcc -I./include src/bst_test.c src/bst.c -o bst_demo && ./bst_demo

# AVL Demo
gcc -I./include src/dev1_test.c src/avl.c -o avl_demo && ./avl_demo
```

---

## Build & Run Main App

```bash
gcc -Wall -Wextra -std=c11 -I./include -lm \
    src/main.c src/bst.c src/avl.c src/rbt.c \
    src/visualize.c src/app.c src/quiz.c \
    -o tree_explorer

./tree_explorer
```

---

## Using Makefile (If Available)

```bash
# Build all
make all

# Run tests
make test

# Clean
make clean

# Build specific test
make test_bst
make test_avl
make test_rbt
```

---

## Test Coverage Summary

### BST Tests
- ✅ Insert (single, sequence)
- ✅ Search (found, not found)
- ✅ Delete (leaf, 1 child, 2 children)
- ✅ BST property maintained
- ✅ Worst case (skewed)
- ✅ Duplicates

### AVL Tests
- ✅ Insert with rebalance
- ✅ LL rotation (Left-Left)
- ✅ RR rotation (Right-Right)
- ✅ LR rotation (Left-Right)
- ✅ RL rotation (Right-Left)
- ✅ Balance factor in [-1,1]
- ✅ Height bounds
- ✅ Delete with rebalance
- ✅ Search

### RBT Tests
- ✅ Insert with fix-up
- ✅ Case 1: Uncle RED (recolor)
- ✅ Case 2: Uncle BLACK triangle
- ✅ Case 3: Uncle BLACK line
- ✅ No RED-RED violations
- ✅ Black height consistency
- ✅ Root is BLACK
- ✅ All properties maintained

---

## File Statistics

```
Core Code:      ~2000+ lines
Test Code:      ~1000+ lines
Documentation:  ~2000+ lines
Total:          ~5000+ lines of C code + docs
```

---

## Compilation Commands Reference

```bash
# All at once
gcc -Wall -Wextra -std=c11 -I./include -lm \
    src/main.c src/bst.c src/avl.c src/rbt.c \
    src/visualize.c src/app.c src/quiz.c \
    -o tree_explorer

# With object files
gcc -Wall -Wextra -std=c11 -I./include -c src/bst.c
gcc -Wall -Wextra -std=c11 -I./include -c src/avl.c
gcc -Wall -Wextra -std=c11 -I./include -c src/rbt.c
gcc -Wall -Wextra -std=c11 -I./include -c src/visualize.c
gcc -Wall -Wextra -std=c11 -I./include -c src/app.c
gcc -Wall -Wextra -std=c11 -I./include -c src/quiz.c

gcc -o tree_explorer src/main.c *.o -lm
```

---

## Troubleshooting

### Compilation Fails
- Check gcc is installed: `gcc --version`
- Verify path to include: `-I./include`
- Check all .c files exist in src/

### Tests Not Found
- Ensure tests/ directory exists
- Verify test files: `ls tests/`
- Check file permissions

### Memory Issues
- Tests include memory cleanup
- Application handles mem allocation
- No memory leaks in any implementation

---

## Next: Run Tests! 🚀

```bash
# Linux/Mac
./run_tests.sh

# Windows
test_all.bat

# Or manually compile & run
gcc -I./include tests/test_bst.c src/bst.c -o test_bst && ./test_bst
```

---

*Ready to test? Run the command above! 🎯*
