# Tree Trainer - Design & Architecture

## 1. Overview

**Tree Trainer** is an educational C application for learning binary search trees (BST), AVL trees, and Red-Black trees.

---

## 2. Module Descriptions

### 2.1 Binary Search Tree (BST)
**Files**: `include/bst.h`, `src/bst.c`

**Core Operations**:
- Insert, Search, Delete
- In-order traversal
- Find minimum
- Memory management

**Time Complexity**:
- Insert/Search/Delete: O(log n) average, O(n) worst case

---

### 2.2 AVL Tree
**Files**: `include/avl.h`, `src/avl.c`

**Properties**
- Height-balanced BST
- Balance factor ∈ {-1, 0, +1}

**Rotations**
- LL: Right rotation
- RR: Left rotation
- LR: Left + Right
- RL: Right + Left

**Insert Flow**
1. Normal BST insert
2. Update height
3. Compute balance factor
4. Apply rotation if needed

**Time Complexity**
- Insert: O(log n)
- Delete: O(log n)
- Search: O(log n)
