# 🧪 Testing & Compilation Guide

## Overview

This document describes all test files in the project and how to run them.

## Project Structure

```
.
├── src/
│   ├── bst.c              (Binary Search Tree implementation)
│   ├── avl.c              (AVL Tree implementation)
│   ├── rbt.c              (Red-Black Tree implementation)
│   ├── visualize.c        (ASCII visualization)
│   ├── app.c              (Interactive menu system)
│   ├── quiz.c             (Educational quizzes)
│   ├── main.c             (Main application entry)
│   ├── bst_test.c         (Simple BST demo)
│   └── dev1_test.c        (Simple AVL demo)
│
├── tests/
│   ├── test_bst.c         (BST unit tests)
│   ├── test_avl.c         (AVL unit tests)
│   └── test_rbt.c         (RBT unit tests)
│
├── include/
│   ├── bst.h
│   ├── avl.h
│   ├── rbt.h
│   ├── visualize.h
│   ├── app.h
│   └── quiz.h
│
├── Makefile               (Build configuration)
├── CMakeLists.txt         (CMake configuration)
├── test_all.bat           (Windows test runner)
└── run_tests.sh           (Linux/Mac test runner)
```

## Test Files

### Simple Demo Tests

#### 1. **bst_test.c** (src/bst_test.c)
**Purpose**: Simple demonstration of BST operations

**Tests**:
- Insert sequence: 30, 20, 10, 25, 40
- Search for existing key (25) → Should find
- Search for non-existent key (100) → Should not find
- Delete node (20)
- Verify inorder traversal is sorted

**Expected Output**:
```
Inorder: 10 20 25 30 40
Search 25: Found
Search 100: Not Found
After deleting 20: 10 25 30 40
```

#### 2. **dev1_test.c** (src/dev1_test.c)
**Purpose**: Simple AVL Tree demonstration

**Tests**:
- Insert sequence: 30, 20, 10 (triggers LL rotation)
- Verify tree is balanced
- Check root, height, and balance factor

**Expected Output**:
```
Inorder: 10 20 30
Root: 20
Height: 1
Balance: 0
```

### Unit Tests

#### 3. **test_bst.c** (tests/test_bst.c)
**Purpose**: Comprehensive unit tests for BST

**Test Cases** (detailed in file):
- `test_bst_insert_single` - Single node insertion
- `test_bst_insert_sequence` - Multiple insertions with BST property verification
- `test_bst_search` - Search existing and non-existing keys
- `test_bst_delete_leaf` - Delete leaf node
- `test_bst_delete_one_child` - Delete node with one child
- `test_bst_delete_two_children` - Delete node with two children
- `test_bst_balance_worst_case` - Skewed tree (worst case O(n))
- `test_bst_duplicate_handling` - Handling of duplicate insertions
- And more...

**Coverage**:
- ✓ Insert operations
- ✓ Search operations
- ✓ Delete operations
- ✓ Tree properties (BST invariant)
- ✓ Edge cases (empty tree, single node, duplicates)

**Running**:
```bash
# Using test script
./run_tests.sh          # Linux/Mac
test_all.bat            # Windows

# Or manually
gcc -I./include tests/test_bst.c src/bst.c -o bin/test_bst
./bin/test_bst
```

#### 4. **test_avl.c** (tests/test_avl.c)
**Purpose**: Comprehensive unit tests for AVL Tree

**Test Cases** (detailed in file):
- `test_avl_insert_single` - Single node
- `test_avl_insert_sequence` - Multiple with balance verification
- `test_avl_ll_rotation` - Left-Left case (right rotation)
- `test_avl_rr_rotation` - Right-Right case (left rotation)
- `test_avl_lr_rotation` - Left-Right case (LR rotation)
- `test_avl_rl_rotation` - Right-Left case (RL rotation)
- `test_avl_search` - Search operations
- `test_avl_delete` - Deletion with rebalancing
- `test_avl_balance_maintained` - Verify balance after all operations
- And more...

**Coverage**:
- ✓ All 4 rotation cases
- ✓ Balance factor maintenance
- ✓ Search and delete with rebalancing
- ✓ Worst-case sequences
- ✓ Height verification

**Running**:
```bash
gcc -I./include tests/test_avl.c src/avl.c -o bin/test_avl
./bin/test_avl
```

#### 5. **test_rbt.c** (tests/test_rbt.c)
**Purpose**: Comprehensive unit tests for Red-Black Tree

**Test Cases** (detailed in file):
- `test_rbt_insert_single` - Single node (becomes BLACK as root)
- `test_rbt_insert_sequence` - Multiple insertions
- `test_rbt_case1` - Uncle is RED (recolor)
- `test_rbt_case2_3` - Uncle is BLACK (rotate + recolor)
- `test_rbt_ll_rotation` - Left-Left case
- `test_rbt_rr_rotation` - Right-Right case
- `test_rbt_verify_red_red` - No RED-RED violation
- `test_rbt_verify_black_height` - Consistent black height
- `test_rbt_verify_root_black` - Root is always BLACK
- And more...

**Coverage**:
- ✓ All 3 insert fix-up cases
- ✓ Color property enforcement
- ✓ Black height invariant
- ✓ No RED-RED violations
- ✓ Complex insertion sequences

**Running**:
```bash
gcc -I./include tests/test_rbt.c src/rbt.c -o bin/test_rbt
./bin/test_rbt
```

## Compilation Options

### Option 1: Using Makefile (Recommended)
```bash
make all              # Build everything
make test_bst         # Build specific test
make test_avl
make test_rbt
make clean            # Clean objects and binaries
```

### Option 2: Using CMake
```bash
mkdir build
cd build
cmake ..
make
ctest --verbose
```

### Option 3: Manual Compilation

**Compile Core Libraries**:
```bash
gcc -Wall -Wextra -std=c11 -I./include -c src/bst.c -o bst.o
gcc -Wall -Wextra -std=c11 -I./include -c src/avl.c -o avl.o
gcc -Wall -Wextra -std=c11 -I./include -c src/rbt.c -o rbt.o
gcc -Wall -Wextra -std=c11 -I./include -c src/visualize.c -o visualize.o
gcc -Wall -Wextra -std=c11 -I./include -c src/app.c -o app.o
gcc -Wall -Wextra -std=c11 -I./include -c src/quiz.c -o quiz.o
```

**Compile Tests**:
```bash
# BST Test
gcc -Wall -Wextra -std=c11 -I./include tests/test_bst.c bst.o -o test_bst
./test_bst

# AVL Test
gcc -Wall -Wextra -std=c11 -I./include tests/test_avl.c avl.o -o test_avl
./test_avl

# RBT Test
gcc -Wall -Wextra -std=c11 -I./include tests/test_rbt.c rbt.o -o test_rbt
./test_rbt
```

**Build Main Application**:
```bash
gcc -Wall -Wextra -std=c11 -I./include -lm \
    src/main.c bst.o avl.o rbt.o visualize.o app.o quiz.o \
    -o tree_explorer

./tree_explorer
```

## Running Tests

### Linux/macOS
```bash
# Using provided script
chmod +x run_tests.sh
./run_tests.sh

# Or make
make test
```

### Windows
```cmd
REM Using provided batch file
test_all.bat

REM Or with make (if installed)
make test
```

## Expected Test Output

### BST Test Output
```
Test: Insert single node... PASS
Test: Insert sequence {30, 20, 10, 25, 40}... PASS
Test: BST property verification... PASS
Test: Search existing key... PASS
Test: Search non-existent key... PASS
Test: Delete leaf node... PASS
Test: Delete node with one child... PASS
Test: Delete node with two children... PASS
Test: Handle duplicates... PASS
...
================================================
                All Tests Passed!
================================================
```

### AVL Test Output
```
Test: Insert single node... PASS
Test: Insert sequence with balance... PASS
Test: LL Rotation (Left-Left)... PASS
Test: RR Rotation (Right-Right)... PASS
Test: LR Rotation (Left-Right)... PASS
Test: RL Rotation (Right-Left)... PASS
Test: Balance factor maintained... PASS
Test: Search operations... PASS
Test: Delete with rebalancing... PASS
...
================================================
            All AVL Tests Passed!
================================================
```

### RBT Test Output
```
Test: Insert single node... PASS
Test: Insert sequence... PASS
Test: Case 1 - Uncle RED (recolor)... PASS
Test: Case 2&3 - Uncle BLACK (rotate)... PASS
Test: No RED-RED violation... PASS
Test: Black height consistency... PASS
Test: Root is BLACK... PASS
Test: Verify all RBT properties... PASS
...
================================================
           All RBT Tests Passed!
================================================
```

## Test Coverage

### BST
- ✓ Basic operations (insert, search, delete)
- ✓ Edge cases (empty, single node, duplicates)
- ✓ Tree properties (BST invariant)
- ✓ Worst-case scenarios (skewed trees)

### AVL
- ✓ All rotation cases (LL, RR, LR, RL)
- ✓ Balance maintenance
- ✓ Search and delete
- ✓ Height management
- ✓ Worst-case and best-case sequences

### RBT
- ✓ Color properties
- ✓ All insert fix-up cases
- ✓ No RED-RED violations
- ✓ Black height consistency
- ✓ Root is BLACK
- ✓ Complex insertion patterns

## Debugging Failed Tests

### Compilation Errors

**Issue**: `undefined reference to 'xxx'`
- **Solution**: Ensure all .c files are compiled and linked

**Issue**: `include files not found`
- **Solution**: Check `-I./include` flag is present

### Test Failures

**Issue**: Test assertion fails
- **Solution**: 
  1. Enable verbose output in test file
  2. Print tree structure using visualization functions
  3. Trace through operation step-by-step

**Example Debug**:
```c
// In test file, after operation
void print_tree_debug(AVLNode* root, int level) {
    if (!root) return;
    for (int i = 0; i < level; i++) printf("  ");
    printf("%d (h=%d, bf=%d)\n", root->key, root->height, 
           avl_balance_factor(root));
    print_tree_debug(root->left, level + 1);
    print_tree_debug(root->right, level + 1);
}
```

## CI/CD Integration

### GitHub Actions (if applicable)
```yaml
- name: Run tests
  run: make test
```

### Manual CI
Create a test script that:
1. Compiles all targets
2. Runs all unit tests
3. Checks return codes
4. Generates report

## Performance Testing

To test performance with large datasets:

```bash
# Create a test with 10,000 insertions
gcc -O2 -I./include tests/test_avl.c src/avl.c -o bench_avl
time ./bench_avl
```

## Conclusion

All test files have been created and should compile without errors. The test suite provides comprehensive coverage of:
- ✓ Basic functionality
- ✓ Edge cases
- ✓ Tree invariants
- ✓ Performance characteristics

Run the test scripts to verify all implementations are correct!

---

*Last Updated: 2025-12-19*
