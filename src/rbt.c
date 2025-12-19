#include "rbt.h"
#include <stdarg.h>

/* ============================================================================
 * Red-Black Tree Implementation with Insert Fix-up and Learning Hooks
 * ============================================================================
 */

/* Helper: Convert color to string for verbose output */
const char* rbt_color_string(Color color) {
    return color == RED ? "RED" : "BLACK";
}

/* Helper: Log message if verbose mode enabled */
static void rbt_log(RBTree *tree, const char *fmt, ...) {
    if (!tree || !tree->verbose) return;
    
    va_list args;
    va_start(args, fmt);
    fprintf(stdout, "[RBT] ");
    vfprintf(stdout, fmt, args);
    fprintf(stdout, "\n");
    va_end(args);
}

/* Create a new RB tree */
RBTree* rbt_create(void) {
    RBTree *tree = (RBTree *)malloc(sizeof(RBTree));
    if (!tree) return NULL;
    tree->root = NULL;
    tree->verbose = 0;
    return tree;
}

/* Create a new RB node */
static RBNode* rbt_node_create(int key) {
    RBNode *node = (RBNode *)malloc(sizeof(RBNode));
    if (!node) return NULL;
    node->key = key;
    node->color = RED;  /* New nodes are always RED */
    node->left = NULL;
    node->right = NULL;
    node->parent = NULL;
    return node;
}

/* Enable/disable verbose output */
void rbt_set_verbose(RBTree *tree, int enabled) {
    if (tree) tree->verbose = enabled;
}

/* Find minimum key in subtree */
RBNode* rbt_find_min(RBNode *node) {
    if (!node) return NULL;
    while (node->left) {
        node = node->left;
    }
    return node;
}

/* Find maximum key in subtree */
RBNode* rbt_find_max(RBNode *node) {
    if (!node) return NULL;
    while (node->right) {
        node = node->right;
    }
    return node;
}

/* Get sibling of a node */
static RBNode* rbt_get_sibling(RBNode *node) {
    if (!node || !node->parent) return NULL;
    return (node == node->parent->left) ? 
           node->parent->right : node->parent->left;
}

/* Get uncle of a node (parent's sibling) */
static RBNode* rbt_get_uncle(RBNode *node) {
    if (!node || !node->parent) return NULL;
    return rbt_get_sibling(node->parent);
}

/* Get grandparent of a node */
static RBNode* rbt_get_grandparent(RBNode *node) {
    if (!node || !node->parent) return NULL;
    return node->parent->parent;
}

/* ============================================================================
 * Rotations
 * ============================================================================
 */

/* Left Rotation at node x
 *
 *      x                  y
 *     / \       ==>      / \
 *    A   y              x   C
 *       / \            / \
 *      B   C          A   B
 */
void rbt_left_rotate(RBTree *tree, RBNode *x) {
    if (!tree || !x || !x->right) return;
    
    RBNode *y = x->right;
    
    /* Set x's right child to y's left child */
    x->right = y->left;
    if (y->left) {
        y->left->parent = x;
    }
    
    /* Link x's parent to y */
    y->parent = x->parent;
    if (!x->parent) {
        tree->root = y;
    } else if (x == x->parent->left) {
        x->parent->left = y;
    } else {
        x->parent->right = y;
    }
    
    /* Put x on y's left */
    y->left = x;
    x->parent = y;
    
    rbt_log(tree, "Left rotate at %d", x->key);
}

/* Right Rotation at node x
 *
 *        x              y
 *       / \    ==>     / \
 *      y   C          A   x
 *     / \                / \
 *    A   B              B   C
 */
void rbt_right_rotate(RBTree *tree, RBNode *x) {
    if (!tree || !x || !x->left) return;
    
    RBNode *y = x->left;
    
    /* Set x's left child to y's right child */
    x->left = y->right;
    if (y->right) {
        y->right->parent = x;
    }
    
    /* Link x's parent to y */
    y->parent = x->parent;
    if (!x->parent) {
        tree->root = y;
    } else if (x == x->parent->left) {
        x->parent->left = y;
    } else {
        x->parent->right = y;
    }
    
    /* Put x on y's right */
    y->right = x;
    x->parent = y;
    
    rbt_log(tree, "Right rotate at %d", x->key);
}

/* ============================================================================
 * Insert with Fix-up
 * ============================================================================
 */

/* Insert Fix-up: Restore RB properties after insert
 *
 * RB Tree Properties to maintain:
 * 1. Every node is RED or BLACK
 * 2. Root is BLACK
 * 3. Every leaf (NIL) is BLACK
 * 4. If node is RED, both children are BLACK (no RED-RED)
 * 5. All paths from node to leaves have same number of BLACK nodes
 *
 * Cases during fix-up:
 * - Case 1: Uncle is RED     -> Recolor (parent, uncle, grandparent)
 * - Case 2: Uncle is BLACK, triangle -> Rotate to make line
 * - Case 3: Uncle is BLACK, line -> Rotate and recolor
 */
void rbt_insert_fixup(RBTree *tree, RBNode *z) {
    if (!tree || !z) return;
    
    RBNode *y;  /* uncle */
    
    while (z->parent && z->parent->color == RED) {
        RBNode *gp = rbt_get_grandparent(z);
        
        if (!gp) break;
        
        if (z->parent == gp->left) {
            /* Parent is left child of grandparent */
            y = gp->right;  /* uncle */
            
            if (y && y->color == RED) {
                /* Case 1: Uncle is RED -> Recolor */
                rbt_log(tree, "Case 1 (Recolor): Node %d, parent RED, uncle RED",
                        z->key);
                rbt_log(tree, "  Recolor node %d to BLACK (was %s)",
                        z->parent->key, rbt_color_string(z->parent->color));
                rbt_log(tree, "  Recolor uncle %d to BLACK (was %s)",
                        y->key, rbt_color_string(y->color));
                rbt_log(tree, "  Recolor grandparent %d to RED (was %s)",
                        gp->key, rbt_color_string(gp->color));
                
                z->parent->color = BLACK;
                y->color = BLACK;
                gp->color = RED;
                z = gp;
            } else {
                /* Uncle is BLACK */
                if (z == z->parent->right) {
                    /* Case 2: Triangle (Left-Right) */
                    rbt_log(tree, "Case 2 (Triangle): Node %d, parent left-child, node right-child",
                            z->key);
                    rbt_log(tree, "  Left rotate at parent %d to make line", z->parent->key);
                    z = z->parent;
                    rbt_left_rotate(tree, z);
                }
                
                /* Case 3: Line (Left-Left) */
                rbt_log(tree, "Case 3 (Line): Node %d, parent left-child, node left-child",
                        z->key);
                rbt_log(tree, "  Recolor parent %d to BLACK (was %s)",
                        z->parent->key, rbt_color_string(z->parent->color));
                rbt_log(tree, "  Recolor grandparent %d to RED (was %s)",
                        gp->key, rbt_color_string(gp->color));
                rbt_log(tree, "  Right rotate at grandparent %d", gp->key);
                
                z->parent->color = BLACK;
                gp->color = RED;
                rbt_right_rotate(tree, gp);
            }
        } else {
            /* Parent is right child of grandparent (mirror cases) */
            y = gp->left;  /* uncle */
            
            if (y && y->color == RED) {
                /* Case 1: Uncle is RED -> Recolor */
                rbt_log(tree, "Case 1 (Recolor): Node %d, parent RED, uncle RED (mirror)",
                        z->key);
                rbt_log(tree, "  Recolor node %d to BLACK (was %s)",
                        z->parent->key, rbt_color_string(z->parent->color));
                rbt_log(tree, "  Recolor uncle %d to BLACK (was %s)",
                        y->key, rbt_color_string(y->color));
                rbt_log(tree, "  Recolor grandparent %d to RED (was %s)",
                        gp->key, rbt_color_string(gp->color));
                
                z->parent->color = BLACK;
                y->color = BLACK;
                gp->color = RED;
                z = gp;
            } else {
                /* Uncle is BLACK */
                if (z == z->parent->left) {
                    /* Case 2: Triangle (Right-Left) */
                    rbt_log(tree, "Case 2 (Triangle): Node %d, parent right-child, node left-child",
                            z->key);
                    rbt_log(tree, "  Right rotate at parent %d to make line", z->parent->key);
                    z = z->parent;
                    rbt_right_rotate(tree, z);
                }
                
                /* Case 3: Line (Right-Right) */
                rbt_log(tree, "Case 3 (Line): Node %d, parent right-child, node right-child",
                        z->key);
                rbt_log(tree, "  Recolor parent %d to BLACK (was %s)",
                        z->parent->key, rbt_color_string(z->parent->color));
                rbt_log(tree, "  Recolor grandparent %d to RED (was %s)",
                        gp->key, rbt_color_string(gp->color));
                rbt_log(tree, "  Left rotate at grandparent %d", gp->key);
                
                z->parent->color = BLACK;
                gp->color = RED;
                rbt_left_rotate(tree, gp);
            }
        }
    }
    
    /* Ensure root is BLACK */
    if (tree->root) {
        if (tree->root->color != BLACK) {
            rbt_log(tree, "Final: Ensure root %d is BLACK", tree->root->key);
            tree->root->color = BLACK;
        }
    }
}

/* Insert a new key into the RB tree */
RBNode* rbt_insert(RBTree *tree, int key) {
    if (!tree) return NULL;
    
    /* Standard BST insert */
    RBNode *y = NULL;
    RBNode *x = tree->root;
    
    while (x) {
        y = x;
        x = (key < x->key) ? x->left : x->right;
    }
    
    RBNode *z = rbt_node_create(key);
    if (!z) return NULL;
    
    z->parent = y;
    
    if (!y) {
        tree->root = z;
        rbt_log(tree, "Insert %d as root", key);
    } else if (key < y->key) {
        y->left = z;
        rbt_log(tree, "Insert %d as left child of %d (color: %s)",
                key, y->key, rbt_color_string(z->color));
    } else {
        y->right = z;
        rbt_log(tree, "Insert %d as right child of %d (color: %s)",
                key, y->key, rbt_color_string(z->color));
    }
    
    /* Fix-up violations */
    rbt_insert_fixup(tree, z);
    
    return z;
}

/* ============================================================================
 * Search
 * ============================================================================
 */

/* Search for a key in the tree */
RBNode* rbt_search(RBTree *tree, int key) {
    if (!tree) return NULL;
    
    RBNode *node = tree->root;
    while (node) {
        if (key == node->key) {
            return node;
        } else if (key < node->key) {
            node = node->left;
        } else {
            node = node->right;
        }
    }
    return NULL;
}

/* ============================================================================
 * Tree Traversal & Utility
 * ============================================================================
 */

/* Helper for inorder traversal */
static void rbt_inorder_helper(RBNode *node) {
    if (!node) return;
    
    rbt_inorder_helper(node->left);
    printf("%d(%s) ", node->key, rbt_color_string(node->color));
    rbt_inorder_helper(node->right);
}

/* Inorder traversal with colors */
void rbt_inorder(RBTree *tree) {
    if (!tree) return;
    
    printf("Inorder: ");
    rbt_inorder_helper(tree->root);
    printf("\n");
}

/* Helper for tree destruction */
static void rbt_destroy_helper(RBNode *node) {
    if (!node) return;
    
    rbt_destroy_helper(node->left);
    rbt_destroy_helper(node->right);
    free(node);
}

/* Destroy tree and free memory */
void rbt_destroy(RBTree *tree) {
    if (!tree) return;
    
    rbt_destroy_helper(tree->root);
    free(tree);
}

/* Transplant (used in delete, included for completeness) */
void rbt_transplant(RBTree *tree, RBNode *u, RBNode *v) {
    if (!tree || !u) return;
    
    if (!u->parent) {
        tree->root = v;
    } else if (u == u->parent->left) {
        u->parent->left = v;
    } else {
        u->parent->right = v;
    }
    
    if (v) {
        v->parent = u->parent;
    }
}
