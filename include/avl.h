#ifndef AVL_H
#define AVL_H

typedef struct AVLNode {
    int key;
    int height;
    struct AVLNode *left;
    struct AVLNode *right;
} AVLNode;

/* Core API */
AVLNode* avl_insert(AVLNode* root, int key);
AVLNode* avl_delete(AVLNode* root, int key);
AVLNode* avl_search(AVLNode* root, int key);
void     avl_free(AVLNode* root);

/* Helpers (exposed for testing & visualization) */
int      avl_height(AVLNode* node);
int      avl_balance_factor(AVLNode* node);

#endif
