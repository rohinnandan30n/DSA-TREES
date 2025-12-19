#include "visualize.h"
#include <math.h>

/* ============================================================================
 * ASCII Tree Visualization
 * ============================================================================
 */

/* Forward declarations */
static void print_bst_recursive(BSTNode *node, int level, int max_level);
static void print_avl_recursive(AVLNode *node, int level, int max_level);
static void print_rbt_recursive(RBNode *node, int level, int max_level);

/* Helper: Calculate tree height */
int tree_height(BSTNode* node) {
    if (!node) return 0;
    int left_h = tree_height(node->left);
    int right_h = tree_height(node->right);
    return (left_h > right_h ? left_h : right_h) + 1;
}

int tree_height_avl(AVLNode* node) {
    if (!node) return 0;
    int left_h = tree_height_avl(node->left);
    int right_h = tree_height_avl(node->right);
    return (left_h > right_h ? left_h : right_h) + 1;
}

int tree_height_rbt(RBNode* node) {
    if (!node) return 0;
    int left_h = tree_height_rbt(node->left);
    int right_h = tree_height_rbt(node->right);
    return (left_h > right_h ? left_h : right_h) + 1;
}

/* ============================================================================
 * BST Printing
 * ============================================================================
 */

static void print_bst_recursive(BSTNode *node, int level, int max_level) {
    if (!node) return;
    
    /* Calculate spacing */
    int spaces = (1 << (max_level - level)) - 1;
    int between = (1 << (max_level - level + 1)) - 1;
    
    /* Indent */
    for (int i = 0; i < spaces; i++) printf(" ");
    
    /* Print node */
    printf("%d", node->key);
    
    for (int i = 0; i < spaces; i++) printf(" ");
    
    printf("\n");
    
    if (level < max_level) {
        /* Print left subtree */
        print_bst_recursive(node->left, level + 1, max_level);
        
        /* Print right subtree */
        print_bst_recursive(node->right, level + 1, max_level);
    }
}

void print_bst(BSTNode* root) {
    if (!root) {
        printf("  [Empty BST]\n");
        return;
    }
    
    printf("\n");
    printf("  BST Structure (Level-wise):\n");
    printf("  ============================\n");
    
    int h = tree_height(root);
    print_bst_recursive(root, 1, h);
    printf("\n");
}

void print_bst_detailed(BSTNode* root) {
    if (!root) {
        printf("  [Empty BST]\n");
        return;
    }
    
    printf("\n");
    printf("  BST Inorder: ");
    
    /* Inorder traversal */
    void traverse(BSTNode *n) {
        if (!n) return;
        traverse(n->left);
        printf("%d ", n->key);
        traverse(n->right);
    }
    traverse(root);
    printf("\n");
    
    printf("  Height: %d\n", tree_height(root));
    printf("\n");
}

/* ============================================================================
 * AVL Printing
 * ============================================================================
 */

static void print_avl_recursive(AVLNode *node, int level, int max_level) {
    if (!node) return;
    
    int spaces = (1 << (max_level - level)) - 1;
    
    for (int i = 0; i < spaces; i++) printf(" ");
    
    printf("%d(h:%d)", node->key, node->height);
    
    for (int i = 0; i < spaces; i++) printf(" ");
    printf("\n");
    
    if (level < max_level) {
        print_avl_recursive(node->left, level + 1, max_level);
        print_avl_recursive(node->right, level + 1, max_level);
    }
}

void print_avl(AVLNode* root) {
    if (!root) {
        printf("  [Empty AVL Tree]\n");
        return;
    }
    
    printf("\n");
    printf("  AVL Structure (Level-wise):\n");
    printf("  ============================\n");
    
    int h = tree_height_avl(root);
    print_avl_recursive(root, 1, h);
    printf("\n");
}

void print_avl_detailed(AVLNode* root) {
    if (!root) {
        printf("  [Empty AVL Tree]\n");
        return;
    }
    
    printf("\n");
    printf("  AVL Inorder: ");
    
    void traverse(AVLNode *n) {
        if (!n) return;
        traverse(n->left);
        printf("%d ", n->key);
        traverse(n->right);
    }
    traverse(root);
    printf("\n");
    
    printf("  Height: %d\n", tree_height_avl(root));
    printf("  (h:balance factor shown in nodes)\n");
    printf("\n");
}

/* ============================================================================
 * RBT Printing
 * ============================================================================
 */

static const char* rbt_color_name(Color color) {
    return color == RED ? "R" : "B";
}

static void print_rbt_recursive(RBNode *node, int level, int max_level) {
    if (!node) return;
    
    int spaces = (1 << (max_level - level)) - 1;
    
    for (int i = 0; i < spaces; i++) printf(" ");
    
    /* Print with color marker */
    printf("%d%s", node->key, rbt_color_name(node->color));
    
    for (int i = 0; i < spaces; i++) printf(" ");
    printf("\n");
    
    if (level < max_level) {
        print_rbt_recursive(node->left, level + 1, max_level);
        print_rbt_recursive(node->right, level + 1, max_level);
    }
}

void print_rbt(RBNode* root) {
    if (!root) {
        printf("  [Empty RBT]\n");
        return;
    }
    
    printf("\n");
    printf("  RBT Structure (Level-wise):\n");
    printf("  ============================\n");
    printf("  (R=RED, B=BLACK)\n");
    
    int h = tree_height_rbt(root);
    print_rbt_recursive(root, 1, h);
    printf("\n");
}

void print_rbt_detailed(RBNode* root) {
    if (!root) {
        printf("  [Empty RBT]\n");
        return;
    }
    
    printf("\n");
    printf("  RBT Inorder: ");
    
    void traverse(RBNode *n) {
        if (!n) return;
        traverse(n->left);
        printf("%d%s ", n->key, rbt_color_name(n->color));
        traverse(n->right);
    }
    traverse(root);
    printf("\n");
    
    printf("  Height: %d\n", tree_height_rbt(root));
    printf("\n");
}

/* ============================================================================
 * Info Printing
 * ============================================================================
 */

void print_tree_info(const char *tree_name) {
    printf("\n");
    printf("  Tree Type: %s\n", tree_name);
    printf("  ====================================\n");
}
