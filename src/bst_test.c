#include <stdio.h>
#include "bst.h"

void bst_inorder_print(BSTNode* root) {
    if (!root) return;
    bst_inorder_print(root->left);
    printf("%d ", root->key);
    bst_inorder_print(root->right);
}

int main() {
    BSTNode* root = NULL;

    int keys[] = {30, 20, 10, 25, 40};
    for (int i = 0; i < 5; i++)
        root = bst_insert(root, keys[i]);

    printf("Inorder: ");
    bst_inorder_print(root);
    printf("\n");

    printf("Search 25: %s\n", bst_search(root, 25) ? "Found" : "Not Found");
    printf("Search 100: %s\n", bst_search(root, 100) ? "Found" : "Not Found");

    root = bst_delete(root, 20);
    printf("After deleting 20: ");
    bst_inorder_print(root);
    printf("\n");

    bst_free(root);
    return 0;
}
