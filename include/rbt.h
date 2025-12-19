#ifndef RBT_H
#define RBT_H

#include <stdio.h>
#include <stdlib.h>

/* Red-Black Tree Color Definition */
typedef enum {
    RED = 0,
    BLACK = 1
} Color;

/* Red-Black Tree Node Structure */
typedef struct RBNode {
    int key;
    Color color;
    struct RBNode *left;
    struct RBNode *right;
    struct RBNode *parent;
} RBNode;

/* Red-Black Tree Structure */
typedef struct {
    RBNode *root;
    int verbose;
} RBTree;

/* Core Operations */
RBTree* rbt_create(void);
void rbt_destroy(RBTree *tree);
RBNode* rbt_insert(RBTree *tree, int key);
RBNode* rbt_search(RBTree *tree, int key);
void rbt_inorder(RBTree *tree);

/* Helper Functions */
void rbt_set_verbose(RBTree *tree, int enabled);
RBNode* rbt_find_min(RBNode *node);
RBNode* rbt_find_max(RBNode *node);

/* Internal Rotation and Fix-up */
void rbt_left_rotate(RBTree *tree, RBNode *node);
void rbt_right_rotate(RBTree *tree, RBNode *node);
void rbt_insert_fixup(RBTree *tree, RBNode *node);
void rbt_transplant(RBTree *tree, RBNode *u, RBNode *v);

/* Utility */
const char* rbt_color_string(Color color);

#endif /* RBT_H */
