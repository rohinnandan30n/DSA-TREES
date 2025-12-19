#include <stdio.h>
#include <stdlib.h>
#include "avl.h"

int avl_height(AVLNode* node) {
    return node ? node->height : 0;
}

int max(int a, int b) {
    return a > b ? a : b;
}

int avl_balance_factor(AVLNode* node) {
    return node ? avl_height(node->left) - avl_height(node->right) : 0;
}

AVLNode* rotate_right(AVLNode* y) {
    AVLNode* x = y->left;
    AVLNode* T2 = x->right;

    x->right = y;
    y->left = T2;

    y->height = 1 + max(avl_height(y->left), avl_height(y->right));
    x->height = 1 + max(avl_height(x->left), avl_height(x->right));

    return x;
}
AVLNode* rotate_left(AVLNode* x) {
    AVLNode* y = x->right;
    AVLNode* T2 = y->left;

    y->left = x;
    x->right = T2;

    x->height = 1 + max(avl_height(x->left), avl_height(x->right));
    y->height = 1 + max(avl_height(y->left), avl_height(y->right));

    return y;
}

AVLNode* avl_insert(AVLNode* node, int key) {
    if (!node) {
        AVLNode* n = malloc(sizeof(AVLNode));
        n->key = key;
        n->left = n->right = NULL;
        n->height = 1;
        return n;
    }

    if (key < node->key)
        node->left = avl_insert(node->left, key);
    else if (key > node->key)
        node->right = avl_insert(node->right, key);
    else
        return node; // no duplicates

    node->height = 1 + max(avl_height(node->left), avl_height(node->right));
    int bf = avl_balance_factor(node);

    // LL
    if (bf > 1 && key < node->left->key)
        return rotate_right(node);

    // RR
    if (bf < -1 && key > node->right->key)
        return rotate_left(node);

    // LR
    if (bf > 1 && key > node->left->key) {
        node->left = rotate_left(node->left);
        return rotate_right(node);
    }

    // RL
    if (bf < -1 && key < node->right->key) {
        node->right = rotate_right(node->right);
        return rotate_left(node);
    }

    return node;
}

AVLNode* avl_min(AVLNode* node) {
    AVLNode* current = node;
    while (current && current->left)
        current = current->left;
    return current;
}

AVLNode* avl_delete(AVLNode* node, int key) {
    if (!node) return NULL;

    if (key < node->key)
        node->left = avl_delete(node->left, key);
    else if (key > node->key)
        node->right = avl_delete(node->right, key);
    else {
        if (!node->left) {
            AVLNode* temp = node->right;
            free(node);
            return temp;
        }
        if (!node->right) {
            AVLNode* temp = node->left;
            free(node);
            return temp;
        }
        AVLNode* succ = avl_min(node->right);
        node->key = succ->key;
        node->right = avl_delete(node->right, succ->key);
    }

    if (!node) return NULL;

    node->height = 1 + max(avl_height(node->left), avl_height(node->right));
    int bf = avl_balance_factor(node);

    if (bf > 1 && avl_balance_factor(node->left) >= 0)
        return rotate_right(node);
    if (bf > 1 && avl_balance_factor(node->left) < 0) {
        node->left = rotate_left(node->left);
        return rotate_right(node);
    }
    if (bf < -1 && avl_balance_factor(node->right) <= 0)
        return rotate_left(node);
    if (bf < -1 && avl_balance_factor(node->right) > 0) {
        node->right = rotate_right(node->right);
        return rotate_left(node);
    }

    return node;
}

AVLNode* avl_search(AVLNode* node, int key) {
    if (!node) return NULL;
    if (key == node->key) return node;
    if (key < node->key) return avl_search(node->left, key);
    return avl_search(node->right, key);
}

void avl_free(AVLNode* node) {
    if (!node) return;
    avl_free(node->left);
    avl_free(node->right);
    free(node);
}

typedef enum {
    ROT_NONE, ROT_LL, ROT_RR, ROT_LR, ROT_RL
} AVLRotation;

AVLRotation avl_last_rotation(void);
