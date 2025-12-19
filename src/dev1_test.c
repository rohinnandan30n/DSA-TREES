#include <stdio.h>
#include "avl.h"

void inorder(AVLNode* root) {
    if (!root) return;
    inorder(root->left);
    printf("%d ", root->key);
    inorder(root->right);
}

int main() {
    AVLNode* root = NULL;

    int keys[] = {30, 20, 10};
    for (int i = 0; i < 3; i++)
        root = avl_insert(root, keys[i]);

    printf("Inorder: ");
    inorder(root);
    printf("\n");

    printf("Root: %d\n", root->key);
    printf("Height: %d\n", root->height);
    printf("Balance: %d\n", avl_balance_factor(root));

    avl_free(root);
    return 0;
}
