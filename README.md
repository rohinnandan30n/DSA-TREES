# Tree Trainer - Educational Tree Data Structure Trainer

## Overview

**Tree Trainer** is a comprehensive, educational C application for learning and visualizing binary search trees (BST), AVL trees, and Red-Black trees. It includes interactive lessons, a quiz engine, and full test coverage.

## Features

### Core Data Structures
- **BST (Binary Search Tree)**: Classic implementation with insert, delete, search
- **AVL Tree**: Self-balancing BST with automatic rotations (LL, RR, LR, RL)
- **Red-Black Tree**: Balanced BST with color-based constraints and properties

### Educational Components
- **Interactive Lessons**: Step-by-step visualization of tree operations and rotations
- **Quiz Engine**: 
  - AVL rotation type identification
  - Tree shape prediction quizzes
  - Red-Black tree fix-up scenarios
  - Adaptive difficulty levels based on performance
- **Score Tracking**: Track progress across quiz sessions

### Visualization
- ASCII art tree display
- Step-by-step operation visualization
- Color output support for enhanced learning

### Testing
- Comprehensive unit tests for all data structures
- Edge case coverage (duplicates, skewed sequences, deletions)
- Test runners with detailed pass/fail reporting

## Build Instructions

### Prerequisites
- CMake 3.10 or higher
- C11 compiler (GCC, Clang, or MSVC)
- Git (optional, for version control)

### Building

#### Using CMake (Recommended)

**Windows (PowerShell):**
```powershell
mkdir build
cd build
cmake -G "Visual Studio 16 2019" ..
cmake --build . --config Release
```

**Linux/macOS:**
```bash
mkdir build
cd build
cmake -G "Unix Makefiles" ..
make
```

#### Using Make (If Makefile exists)

```bash
make
make test
```

### Output
- **Main Application**: `build/tree_trainer` (Linux/macOS) or `build/Release/tree_trainer.exe` (Windows)
- **Test Executables**: 
  - `build/test_bst`
  - `build/test_avl`
  - `build/test_rbt`

## Usage

### Running the Application

```bash
./tree_trainer
```

This launches the interactive menu where you can:
1. Select a tree type (BST, AVL, RBT)
2. Choose operations (insert, delete, search, visualize)
3. View interactive lessons
4. Start a quiz session

### Running Tests

**Using CMake:**
```bash
cd build
ctest
```

**Or run individual tests:**
```bash
./test_avl
./test_bst
./test_rbt
```

Tests verify:
- Insertion correctness and tree structure
- Search and delete operations
- Balance properties (AVL height balance, RBT color properties)
- Edge cases (empty trees, duplicates, single nodes)

## Project Structure

```
tree_trainer/
├── CMakeLists.txt              # Build configuration
├── Makefile                    # Alternative build system
├── README.md                   # This file
│
├── include/                    # Header files
│   ├── bst.h                   # BST interface
│   ├── avl.h                   # AVL tree interface
│   ├── rbt.h                   # Red-Black tree interface
│   ├── quiz.h                  # Quiz engine interface
│   ├── app.h                   # Application state and UI
│   └── visualize.h             # Visualization utilities
│
├── src/                        # Implementation files
│   ├── bst.c                   # BST implementation
│   ├── avl.c                   # AVL tree implementation
│   ├── rbt.c                   # Red-Black tree implementation
│   ├── quiz.c                  # Quiz engine implementation
│   ├── app.c                   # Application UI and menus
│   ├── visualize.c             # Visualization implementation
│   ├── main.c                  # Entry point
│   ├── bst_test.c              # Simple BST demo (legacy)
│   ├── dev1_test.c             # Development test (legacy)
│   └── avl_test.c              # AVL demo (legacy)
│
├── tests/                      # Comprehensive unit tests
│   ├── test_bst.c              # BST unit tests (13 tests)
│   ├── test_avl.c              # AVL unit tests (10 tests)
│   └── test_rbt.c              # RBT unit tests (9 tests)
│
└── docs/                       # Documentation
    ├── design.md               # Architecture and design decisions
    └── tree_theory.md          # Theoretical background
```

## Architecture

### Module Roles

**BST Module** (`bst.h`, `bst.c`)
- Provides foundation: insert, delete, search, traversal
- Used as base for AVL and RBT implementations

**AVL Module** (`avl.h`, `avl.c`)
- Extends BST with automatic balancing
- Implements 4 rotation types (LL, RR, LR, RL)
- Maintains height information for each node

**RBT Module** (`rbt.h`, `rbt.c`)
- Balanced tree with color-based constraints
- Ensures: no red-red paths, consistent black height
- O(log n) guaranteed operations

**Quiz Engine** (`quiz.h`, `quiz.c`)
- Interactive educational quizzes
- Tracks user progress and difficulty levels
- Provides immediate feedback on answers

**Application** (`app.h`, `app.c`)
- Main menu system
- Tree operation handlers
- Lesson runners and educational content

**Visualization** (`visualize.h`, `visualize.c`)
- ASCII tree rendering
- Step-by-step operation display
- Optional color output

See [docs/design.md](docs/design.md) for detailed architecture documentation.

## Test Coverage

### BST Tests (13 tests)
- Single and sequential insertions
- Ascending/descending sequences
- Search operations (found/not found)
- Delete leaf, node with children, root
- Delete all nodes
- Empty tree operations
- Min element search

### AVL Tests (10 tests)
- Single and sequential insertions
- Skewed sequences (verify rotations)
- Search found/not found
- Delete operations (leaf, root)
- Duplicate handling
- Delete all nodes
- Balance factor verification
- Empty tree operations

### RBT Tests (9 tests)
- Single and sequential insertions
- Search operations
- Delete operations (leaf, root, all)
- Red-Black properties:
  - Red nodes have no red children
  - Root is black
  - Consistent black height
- Large insertion sequences

## Design Decisions

### Why Three Trees?

1. **BST**: Simplest foundation, O(n) worst case
2. **AVL**: Height-balanced, O(log n) guaranteed, more rotations during insert
3. **RBT**: Color-balanced, O(log n) guaranteed, fewer rotations than AVL

### Educational Focus

- **Minimal dependencies**: Pure C, no external libraries
- **Clear implementations**: Well-commented, easy to follow
- **Immediate feedback**: Quizzes provide instant answers
- **Progressive difficulty**: Adapt quiz complexity based on performance

### Build System

CMake provides:
- Cross-platform support (Windows, Linux, macOS)
- Easy test integration with `ctest`
- Scalability for future additions
- Clean separation of concerns

## Quick Examples

### Building and Testing

```bash
# Create and enter build directory
mkdir build && cd build

# Configure
cmake ..

# Build
cmake --build .

# Run tests
ctest --output-on-failure

# Or run individual test
./test_avl
```

### Running a Quiz

```bash
./tree_trainer
# Select: Quiz Engine
# Choose: AVL Rotation Type Quiz
# Answer questions about rotation types
```

### Testing Manually

```bash
# Compile and run manual test
gcc -I./include src/bst.c tests/test_bst.c -o test_bst
./test_bst
```

## Performance Characteristics

| Operation | BST | AVL | RBT |
|-----------|-----|-----|-----|
| Search    | O(log n) avg, O(n) worst | O(log n) | O(log n) |
| Insert    | O(log n) avg, O(n) worst | O(log n) | O(log n) |
| Delete    | O(log n) avg, O(n) worst | O(log n) | O(log n) |
| Space     | O(n) | O(n) | O(n) |

## Future Enhancements

- [ ] B-trees and B+ trees
- [ ] Treaps (randomized BSTs)
- [ ] Splay trees
- [ ] Persistent data structures
- [ ] Performance benchmarking suite
- [ ] Interactive web visualizer
- [ ] Sorting algorithm implementations (tree-based)

## Contributing

This is an educational project. Contributions are welcome:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -am 'Add feature'`)
4. Push to branch (`git push origin feature/improvement`)
5. Create Pull Request

## License

MIT License - See LICENSE file for details

## Authors

- **Tree Trainer Team**
  - Role assignments by skill and interest
  - Coordinated development following modular architecture

## References

- Cormen, Leiserson, Rivest, Stein - *Introduction to Algorithms* (3rd ed.)
- Sedgewick, Wayne - *Algorithms* (4th ed.)
- Okasaki - *Purely Functional Data Structures*

## Support & Troubleshooting

### Build Issues

**CMake not found:**
```bash
# Install CMake
# Windows: https://cmake.org/download/
# macOS: brew install cmake
# Linux: sudo apt-get install cmake
```

**Compiler errors:**
- Ensure C11 support is enabled
- Check include paths match your setup

### Test Failures

Run tests with verbose output:
```bash
ctest --verbose
```

Check individual test output:
```bash
./test_avl
```

### Performance Issues

- Compile with optimizations: `-O2` or `-O3`
- Check system resources during large insertions

## Version History

- **v1.0** (Initial Release)
  - Core BST, AVL, RBT implementations
  - Quiz engine with score tracking
  - Comprehensive test suite
  - CMake build system

---

**Enjoy learning about tree data structures!** 🌳

For questions or issues, please refer to the documentation in `docs/` or review the source code comments.
