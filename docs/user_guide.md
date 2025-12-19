# 🌳 Tree Explorer - User Guide

## Overview

**Tree Explorer** is an interactive, educational application for learning and experimenting with three fundamental data structures:
- **BST** (Binary Search Tree)
- **AVL** (Self-Balancing Tree)
- **RBT** (Red-Black Tree)

The application provides interactive menus, step-by-step visualizations, and guided lessons to help you understand how these trees work.

---

## Getting Started

### Compilation

```bash
gcc -o tree_explorer src/main.c src/app.c src/visualize.c src/bst.c src/avl.c src/rbt.c -I include -lm
```

### Running the Application

```bash
./tree_explorer
```

---

## Main Menu

When you start the application, you'll see the main menu:

```
╔════════════════════════════════════════╗
║  🌳 TREE EXPLORER 🌳                   ║
╚════════════════════════════════════════╝

╭─ What would you like to do? ─────────╮
│                                       │
│  1. Binary Search Tree (BST)         │
│  2. AVL Tree (Self-Balancing)        │
│  3. Red-Black Tree (RBT)             │
│  4. Settings                         │
│  0. Exit                             │
│                                       │
╰───────────────────────────────────────╯
```

### Options

- **1-3**: Choose a tree type to explore
- **4**: Adjust application settings (verbose, step mode, colors)
- **0**: Exit the application

---

## Tree Mode Menu

After selecting a tree type, you'll see the tree-specific menu:

```
╭─ What would you like to do? ─────────╮
│                                       │
│  1. Operations (Insert/Search/Delete)│
│  2. Interactive Lessons               │
│  3. Learn Theory                      │
│  0. Back to Main Menu                 │
│                                       │
╰───────────────────────────────────────╯
```

### Options

- **1. Operations**: Insert, search, delete, and visualize nodes
- **2. Interactive Lessons**: Step-by-step guided lessons on tree rotations and cases
- **3. Learn Theory**: Quick overview of the tree's properties
- **0. Back**: Return to main menu

---

## Operations Menu

Choose this to work with the tree interactively:

```
╭─ Operations ──────────────────────────╮
│                                       │
│  1. Insert Value                      │
│  2. Search Value                      │
│  3. Delete Value                      │
│  4. View Tree                         │
│  5. Clear Tree                        │
│  0. Back                              │
│                                       │
╰───────────────────────────────────────╯
```

### Inserting Values

Example: **Insert 10, 5, 15 into AVL**

```
Enter value to insert: 10
[Inserting 10 into AVL...]

  AVL Structure (Level-wise):
  ============================
          10(h:1)

```

The tree is displayed level-wise with heights shown in parentheses.

### Searching Values

```
Enter value to search: 5
[Searching for 5 in AVL...]
✓ Found!
```

### Viewing the Tree

Displays the current tree structure and inorder traversal:

```
  AVL Structure (Level-wise):
  ============================
    10(h:2)
   /     \
  5(h:1) 15(h:1)

  AVL Inorder: 5 10 15
  Height: 2
```

### Clearing the Tree

Removes all nodes and resets the tree to empty state.

---

## AVL Lessons

### Lesson 1: LL Rotation (Left-Left)

**Scenario**: Insert into left subtree of left child

```
Example: Insert 10, 5, 3
Step 1-2: Build left-heavy tree
Step 3: Insert 3 → LL rotation at 10

Before:          After:
  10             5
  /             / \
 5              3  10
/
3
```

**Result**: Tree is rebalanced with rotation.

### Lesson 2: RR Rotation (Right-Right)

**Scenario**: Insert into right subtree of right child

```
Example: Insert 10, 15, 20
Step 1-2: Build right-heavy tree
Step 3: Insert 20 → RR rotation at 10

Before:          After:
10                 15
  \               /  \
  15             10  20
    \
    20
```

### Lesson 3: LR Rotation (Left-Right)

**Scenario**: Insert into right subtree of left child

```
Example: Insert 10, 5, 7
Requires: LEFT rotate at child, then RIGHT rotate at parent

Before:          After:
10                 7
/                 / \
5       →         5  10
  \
   7
```

### Lesson 4: RL Rotation (Right-Left)

**Scenario**: Insert into left subtree of right child

```
Example: Insert 10, 15, 12
Requires: RIGHT rotate at child, then LEFT rotate at parent

Before:          After:
  10              12
    \            /  \
    15          10  15
    /
   12
```

---

## RBT Lessons

### Lesson 1: Case 1 - Uncle is RED (Recolor)

**Condition**: Both parent and uncle are RED

**Action**:
- Recolor parent → BLACK
- Recolor uncle → BLACK
- Recolor grandparent → RED
- Continue fix-up from grandparent

```
Example: Insert 10, 5, 15, 3, 7

After inserting 7:
  Uncle (15) is RED
  → Recolor 5 & 15 to BLACK
  → Recolor 10 to RED

     10B               10R
     / \       →       / \
    5R 15R           5B 15B
   / \             / \
  3R 7R           3R 7R
```

### Lesson 2: Case 2 & 3 - Uncle is BLACK

**Case 2 (Triangle)**: Node and parent on opposite sides
- Rotate at parent to create line configuration

**Case 3 (Line)**: Node and parent on same side
- Rotate at grandparent
- Recolor parent & grandparent

```
Example: Insert 20, 10, 30, 5

Final case is Left-Left (Line):
  Right rotate at 20
  Recolor 10 (parent) to BLACK
  Recolor 20 (grandparent) to RED

Before:          After:
   20B             10B
   / \             / \
  10R 30B         5R 20R
 /                    \
5R                    30B
```

---

## Settings

Access settings from the main menu:

```
⚙️  Settings

1. Verbose Mode: ON
2. Step Mode: ON
3. Colors: ON

0. Back to Main Menu
```

### Verbose Mode
- **ON**: Shows detailed operation logs (recolors, rotations, cases)
- **OFF**: Only shows final tree state

Example with Verbose ON:
```
[RBT] Insert 10 as root
[RBT] Insert 5 as left child of 10 (color: RED)
[RBT] Case 3 (Line): Node 5, parent left-child, node left-child
[RBT]   Recolor parent 10 to BLACK (was RED)
[RBT]   Right rotate at grandparent...
```

### Step Mode
- **ON**: Pauses after each operation for user review
- **OFF**: Continuous operation without pauses

### Colors
- **ON**: Use colored terminal output for visualization
- **OFF**: Plain text output

---

## Tree Visualization Format

### AVL Tree Display

Nodes show: `key(h:height)`

```
       10(h:2)
       /     \
     5(h:1) 15(h:1)
```

Height helps understand balance factor.

### RBT Display

Nodes show: `keyColor` where color is R (RED) or B (BLACK)

```
      10B
      / \
    5R 15B
```

Color codes:
- **R** = RED node (usually temporary during fix-up)
- **B** = BLACK node (stable)

---

## Example Walkthrough: AVL Insert Lesson

### Setup
1. Start application
2. Choose: `2. AVL Tree`
3. Choose: `2. Interactive Lessons`
4. Choose: `1. LL Rotation`

### Execution

```
Step 1: Insert 10
  10(h:1)
Press ENTER to continue...

Step 2: Insert 5
       10(h:1)
       /
      5(h:1)
Press ENTER to continue...

Step 3: Insert 3 → Triggers LL rotation at 10
        Before:  10           After:  5
        /                          / \
       5                          3  10
      /
     3

        5(h:2)
       / \
     3   10
Press ENTER to continue...
```

After each step, the tree is visualized and you can proceed at your own pace.

---

## Tips for Learning

### 1. Start with AVL
AVL trees are more intuitive with 4 rotation cases.

### 2. Use Verbose Mode
Enable verbose output to see exactly what's happening:
- Which case triggered?
- What recoloring occurred?
- Where was the rotation?

### 3. Follow Lessons First
Before free-form experimentation:
1. Watch the guided lessons
2. Understand each rotation case
3. Then try manual inserts

### 4. Compare Trees
- Insert same sequence into BST, AVL, RBT
- Observe how each maintains balance differently

### 5. Read the Docs
- `docs/tree_theory.md` - Complete theory reference
- Covers all properties, invariants, and complexities

---

## Common Patterns

### AVL LL Imbalance
```
Insert into left subtree of left child
→ Right rotation at imbalanced node
```

### AVL RR Imbalance
```
Insert into right subtree of right child
→ Left rotation at imbalanced node
```

### RBT Uncle-is-RED
```
Uncle is RED after insert
→ Recolor (no rotations usually)
→ Move fix-up up tree
```

### RBT Uncle-is-BLACK
```
Uncle is BLACK after insert
→ At most 2 rotations + recolor
→ Restores properties immediately
```

---

## Troubleshooting

### Application crashes on insert
- Ensure verbose mode is OFF when inserting duplicate keys
- Duplicate handling depends on specific implementation

### Tree doesn't look balanced
- Check that you're in AVL mode (not BST)
- AVL shows heights; check balance factors manually

### Lesson doesn't progress
- Press ENTER at each step prompt
- Some prompts might be fast; watch for text changes

---

## Advanced Usage

### Manual Tree Building
1. Go to Operations
2. Insert sequence: 50, 25, 75, 12, 37, 62, 87
3. Observe automatic rebalancing
4. Compare with theory

### Testing Edge Cases
- Insert duplicates
- Insert in ascending order (worst for BST)
- Insert in random order
- Observe structure changes

---

## References

- **CLRS** - Introduction to Algorithms (Cormen et al.)
- **AVL Trees**: Adelson-Velsky & Landis (1962)
- **Red-Black Trees**: Bayer (1972), Guibas & Sedgewick (1978)

---

*Last Updated: 2025-12-19*
*Happy tree exploring! 🌲*
