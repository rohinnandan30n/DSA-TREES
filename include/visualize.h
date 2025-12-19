#ifndef VISUALIZE_H
#define VISUALIZE_H

#include <stdio.h>
#include "bst.h"
#include "avl.h"
#include "rbt.h"

/* Color codes for terminal output */
#define COLOR_RED     "\x1b[31m"
#define COLOR_GREEN   "\x1b[32m"
#define COLOR_YELLOW  "\x1b[33m"
#define COLOR_BLUE    "\x1b[34m"
#define COLOR_MAGENTA "\x1b[35m"
#define COLOR_CYAN    "\x1b[36m"
#define COLOR_RESET   "\x1b[0m"
#define COLOR_BOLD    "\x1b[1m"

/* BST Visualization */
void print_bst(BSTNode* root);
void print_bst_detailed(BSTNode* root);

/* AVL Visualization */
void print_avl(AVLNode* root);
void print_avl_detailed(AVLNode* root);

/* RBT Visualization */
void print_rbt(RBNode* root);
void print_rbt_detailed(RBNode* root);

/* Helper functions */
void print_tree_info(const char *tree_name);
int tree_height(BSTNode* node);
int tree_height_avl(AVLNode* node);
int tree_height_rbt(RBNode* node);

#endif /* VISUALIZE_H */
