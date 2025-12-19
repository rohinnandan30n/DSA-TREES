# Red-Black Tree Theory & Rules

## Overview

A **Red-Black Tree (RBT)** is a self-balancing binary search tree that maintains balance through color properties and rotations. It guarantees O(log n) operations while being simpler to implement than AVL trees.

## Red-Black Tree Properties

Every Red-Black Tree must satisfy these invariants:

1. **Color Property**: Every node is colored either RED or BLACK
2. **Root Property**: The root node is always BLACK
3. **Leaf Property**: Every leaf (NIL) is BLACK
4. **Red Property** (No Red-Red): If a node is RED, both its children must be BLACK
5. **Black Height Property**: All paths from a node to its descendant leaves contain the same number of BLACK nodes (black height)

### Property Implications

- Property 5 ensures that no path is more than twice as long as another, maintaining O(log n) height
- Together, properties guarantee height ≤ 2 * log(n+1), ensuring O(log n) operations

## Insert Operation

### Overview
- Insert new node as RED (like BST)
- Call fix-up to restore RBT properties

### Insert Cases

When a RED node violates property 4 (RED parent with RED child), we have three cases:

#### Case 1: Uncle is RED (Recolor)
**Condition**: Parent is RED, Uncle is RED
**Action**: 
- Color parent → BLACK
- Color uncle → BLACK  
- Color grandparent → RED
- Move fix-up pointer to grandparent

**Why**: Push RED violation up the tree to find a solvable configuration

```
      B (gp)              R (gp)
     / \        ==>      / \
    R   R                B   B
   / (z)              / (z)
```

#### Case 2: Uncle is BLACK, Triangle (Rotate to Line)
**Condition**: Uncle is BLACK, node and parent on opposite sides of grandparent
**Action**:
- Rotate at parent to make it a line configuration
- Proceed to Case 3

**Pattern**:
- Left-Right: Insert right child of left-child → Left rotate at parent
- Right-Left: Insert left child of right-child → Right rotate at parent

```
    gp                gp
    / \      ==>      / \
   R   B             R   B
    \               /
     R(z)         R(z)
```

#### Case 3: Uncle is BLACK, Line (Recolor + Rotate)
**Condition**: Uncle is BLACK, node and parent on same side of grandparent
**Action**:
- Color parent → BLACK
- Color grandparent → RED
- Rotate at grandparent (opposite direction of node position)

**Pattern**:
- Left-Left: Left rotate at grandparent
- Right-Right: Right rotate at grandparent

```
      B(gp)                R(p)
     /                    /  \
    R(p)         ==>     B    B(gp)
   /                          \
  R(z)                         B
```

## Rotations

### Left Rotation at x
Moves x down-left, brings right subtree up-right.

```
      x                  y
     / \       ==>      / \
    A   y              x   C
       / \            / \
      B   C          A   B
```

**Precondition**: x.right must exist

### Right Rotation at x
Moves x down-right, brings left subtree up-left.

```
        x              y
       / \    ==>     / \
      y   C          A   x
     / \                / \
    A   B              B   C
```

**Precondition**: x.left must exist

## Time Complexity

| Operation | Average | Worst Case |
|-----------|---------|-----------|
| Search    | O(log n) | O(log n) |
| Insert    | O(log n) | O(log n) |
| Rotation  | O(1)    | O(1)    |
| Fix-up    | O(log n) | O(log n) |

## Implementation Details

### Node Structure
```c
typedef enum { RED = 0, BLACK = 1 } Color;

typedef struct RBNode {
    int key;
    Color color;
    struct RBNode *left;
    struct RBNode *right;
    struct RBNode *parent;
} RBNode;
```

### Verbose Output Example

When `rbt_set_verbose(tree, 1)` is enabled:

```
[RBT] Insert 10 as root
[RBT] Insert 20 as right child of 10 (color: RED)
[RBT] Case 3 (Line): Node 20, parent right-child, node right-child
[RBT]   Recolor parent 10 to BLACK (was RED)
[RBT]   Recolor grandparent to RED (was BLACK)
[RBT]   Left rotate at grandparent
[RBT] Final: Ensure root 20 is BLACK
```

### Learning Hooks

The implementation provides hooks for understanding RBT operations:

1. **`rbt_set_verbose(tree, 1)`** - Enable detailed logging
2. **Case identification** - Logs which case (1, 2, or 3) is triggered
3. **Color transitions** - Shows before/after colors
4. **Rotation details** - Logs rotations with node keys
5. **Uncle analysis** - Explicitly checks uncle color and acts accordingly

## Why RBT is Good

1. **Guaranteed Balance**: Height is O(log n), no worst-case degeneracy
2. **Fewer Rotations**: Compared to AVL trees, fewer rotations during insert/delete
3. **Simpler Logic**: Fewer edge cases than AVL balancing
4. **Practical**: Used in Linux kernel, Java TreeMap, C++ std::map

## Comparison with AVL Tree

| Property | RBT | AVL |
|----------|-----|-----|
| Balance Factor | Color-based | Height-based |
| Max Height | 2*log(n) | 1.44*log(n) |
| Rotations/Insert | ≤ 2-3 | ~1 |
| Rotations/Delete | ≤ 3 | Many |
| Search Speed | Slightly slower | Faster |
| Insert/Delete | Faster | Slower |

## References

- Cormen, Leiserson, Rivest, Stein - Introduction to Algorithms (CLRS)
- Red-Black Tree Properties: https://en.wikipedia.org/wiki/Red%E2%80%93black_tree

---

*Last Updated: 2025-12-19*
