#include <stdio.h>
#include <stdlib.h>
#include "bst.h"

BSTNode* bst_insert(BSTNode* root, int key) {
    if (!root) {
        BSTNode* node = malloc(sizeof(BSTNode));
        node->key = key;
        node->left = node->right = NULL;
        return node;
    }

    if (key < root->key)
        root->left = bst_insert(root->left, key);
    else if (key > root->key)
        root->right = bst_insert(root->right, key);

    return root; // ignore duplicates
}

BSTNode* bst_delete(BSTNode* root, int key) {
    if (!root) return NULL;

    if (key < root->key)
        root->left = bst_delete(root->left, key);
    else if (key > root->key)
        root->right = bst_delete(root->right, key);
    else {
        if (!root->left) {
            BSTNode* temp = root->right;
            free(root);
            return temp;
        }
        if (!root->right) {
            BSTNode* temp = root->left;
            free(root);
            return temp;
        }

        BSTNode* succ = bst_min(root->right);
        root->key = succ->key;
        root->right = bst_delete(root->right, succ->key);
    }
    return root;
}

BSTNode* bst_search(BSTNode* root, int key) {
    if (!root || root->key == key)
        return root;

    if (key < root->key)
        return bst_search(root->left, key);
    else
        return bst_search(root->right, key);
}

BSTNode* bst_min(BSTNode* root) {
    if (!root) return NULL;
    while (root->left)
        root = root->left;
    return root;
}

void bst_inorder(BSTNode* root, int* arr, int* index) {
    if (!root) return;
    bst_inorder(root->left, arr, index);
    arr[(*index)++] = root->key;
    bst_inorder(root->right, arr, index);
}

void bst_free(BSTNode* root) {
    if (!root) return;
    bst_free(root->left);
    bst_free(root->right);
    free(root);
}
