#ifndef BST_H
#define BST_H

typedef struct BSTNode {
    int key;
    struct BSTNode *left;
    struct BSTNode *right;
} BSTNode;

/* Core operations */
BSTNode* bst_insert(BSTNode* root, int key);
BSTNode* bst_delete(BSTNode* root, int key);
BSTNode* bst_search(BSTNode* root, int key);

/* Utilities */
BSTNode* bst_min(BSTNode* root);
void     bst_inorder(BSTNode* root, int* arr, int* index);
void     bst_free(BSTNode* root);

#endif
