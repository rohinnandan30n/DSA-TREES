/**
 * @file test_bst.c
 * @brief Unit tests for Binary Search Tree implementation
 * 
 * Tests basic BST operations: insert, search, delete
 * Verifies BST property and proper handling of edge cases
 */

#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <limits.h>
#include "../include/bst.h"

/* ============================================================================
 * Test Utilities
 * ============================================================================
 */

/**
 * @brief Fill array with inorder traversal
 */
static void bst_inorder_to_array(BSTNode* root, int* arr, int* index) {
    if (!root) return;
    bst_inorder_to_array(root->left, arr, index);
    arr[(*index)++] = root->key;
    bst_inorder_to_array(root->right, arr, index);
}

/**
 * @brief Verify inorder sequence is sorted (BST property)
 */
static int is_sorted(int* arr, int len) {
    for (int i = 1; i < len; i++) {
        if (arr[i] < arr[i-1]) return 0;
    }
    return 1;
}

/**
 * @brief Count nodes in tree
 */
static int count_nodes(BSTNode* root) {
    if (!root) return 0;
    return 1 + count_nodes(root->left) + count_nodes(root->right);
}

/**
 * @brief Verify BST property (all left < parent < all right)
 */
static int verify_bst_property(BSTNode* root, int min, int max) {
    if (!root) return 1;
    
    if (root->key <= min || root->key >= max) {
        printf("ERROR: BST property violated at node %d\n", root->key);
        return 0;
    }
    
    return verify_bst_property(root->left, min, root->key) &&
           verify_bst_property(root->right, root->key, max);
}

/* ============================================================================
 * Test Cases
 * ============================================================================
 */

/**
 * @test test_bst_insert_single
 * @brief Insert single node
 */
int test_bst_insert_single(void) {
    printf("Test: Insert single node... ");
    BSTNode* root = NULL;
    
    root = bst_insert(root, 10);
    
    assert(root != NULL);
    assert(root->key == 10);
    assert(root->left == NULL);
    assert(root->right == NULL);
    
    bst_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_bst_insert_sequence
 * @brief Insert known sequence and verify BST property
 */
int test_bst_insert_sequence(void) {
    printf("Test: Insert sequence {30, 20, 10, 25, 40}... ");
    BSTNode* root = NULL;
    
    int keys[] = {30, 20, 10, 25, 40};
    for (int i = 0; i < 5; i++) {
        root = bst_insert(root, keys[i]);
    }
    
    /* Verify tree has all 5 nodes */
    assert(count_nodes(root) == 5);
    
    /* Verify inorder is sorted (BST property) */
    int inorder[5];
    int idx = 0;
    bst_inorder_to_array(root, inorder, &idx);
    assert(is_sorted(inorder, 5));
    
    /* Verify BST property */
    assert(verify_bst_property(root, INT_MIN, INT_MAX));
    
    bst_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_bst_insert_ascending
 * @brief Insert ascending sequence
 */
int test_bst_insert_ascending(void) {
    printf("Test: Insert ascending {1, 2, 3, 4, 5}... ");
    BSTNode* root = NULL;
    
    for (int i = 1; i <= 5; i++) {
        root = bst_insert(root, i);
    }
    
    assert(count_nodes(root) == 5);
    assert(verify_bst_property(root, INT_MIN, INT_MAX));
    
    bst_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_bst_insert_descending
 * @brief Insert descending sequence
 */
int test_bst_insert_descending(void) {
    printf("Test: Insert descending {5, 4, 3, 2, 1}... ");
    BSTNode* root = NULL;
    
    for (int i = 5; i >= 1; i--) {
        root = bst_insert(root, i);
    }
    
    assert(count_nodes(root) == 5);
    assert(verify_bst_property(root, INT_MIN, INT_MAX));
    
    bst_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_bst_search_found
 * @brief Search for existing keys
 */
int test_bst_search_found(void) {
    printf("Test: Search found... ");
    BSTNode* root = NULL;
    
    int keys[] = {20, 10, 30, 5, 15};
    for (int i = 0; i < 5; i++) {
        root = bst_insert(root, keys[i]);
    }
    
    assert(bst_search(root, 20) != NULL);
    assert(bst_search(root, 10) != NULL);
    assert(bst_search(root, 30) != NULL);
    assert(bst_search(root, 5) != NULL);
    assert(bst_search(root, 15) != NULL);
    
    bst_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_bst_search_not_found
 * @brief Search for non-existing keys
 */
int test_bst_search_not_found(void) {
    printf("Test: Search not found... ");
    BSTNode* root = NULL;
    
    int keys[] = {20, 10, 30};
    for (int i = 0; i < 3; i++) {
        root = bst_insert(root, keys[i]);
    }
    
    assert(bst_search(root, 100) == NULL);
    assert(bst_search(root, 5) == NULL);
    assert(bst_search(root, 25) == NULL);
    
    bst_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_bst_delete_leaf
 * @brief Delete leaf node
 */
int test_bst_delete_leaf(void) {
    printf("Test: Delete leaf node... ");
    BSTNode* root = NULL;
    
    int keys[] = {10, 5, 15, 3, 7};
    for (int i = 0; i < 5; i++) {
        root = bst_insert(root, keys[i]);
    }
    
    root = bst_delete(root, 3);
    
    assert(count_nodes(root) == 4);
    assert(bst_search(root, 3) == NULL);
    assert(verify_bst_property(root, INT_MIN, INT_MAX));
    
    bst_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_bst_delete_node_one_child
 * @brief Delete node with one child
 */
int test_bst_delete_node_one_child(void) {
    printf("Test: Delete node with one child... ");
    BSTNode* root = NULL;
    
    int keys[] = {10, 5, 15, 3, 12};
    for (int i = 0; i < 5; i++) {
        root = bst_insert(root, keys[i]);
    }
    
    root = bst_delete(root, 15);
    
    assert(count_nodes(root) == 4);
    assert(bst_search(root, 15) == NULL);
    assert(verify_bst_property(root, INT_MIN, INT_MAX));
    
    bst_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_bst_delete_node_two_children
 * @brief Delete node with two children
 */
int test_bst_delete_node_two_children(void) {
    printf("Test: Delete node with two children... ");
    BSTNode* root = NULL;
    
    int keys[] = {20, 10, 30, 5, 15, 25, 35};
    for (int i = 0; i < 7; i++) {
        root = bst_insert(root, keys[i]);
    }
    
    root = bst_delete(root, 10);
    
    assert(count_nodes(root) == 6);
    assert(bst_search(root, 10) == NULL);
    assert(verify_bst_property(root, INT_MIN, INT_MAX));
    
    bst_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_bst_delete_root
 * @brief Delete root node
 */
int test_bst_delete_root(void) {
    printf("Test: Delete root node... ");
    BSTNode* root = NULL;
    
    int keys[] = {20, 10, 30, 5, 15};
    for (int i = 0; i < 5; i++) {
        root = bst_insert(root, keys[i]);
    }
    
    root = bst_delete(root, 20);
    
    assert(count_nodes(root) == 4);
    assert(bst_search(root, 20) == NULL);
    assert(verify_bst_property(root, INT_MIN, INT_MAX));
    
    bst_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_bst_delete_all
 * @brief Delete all nodes
 */
int test_bst_delete_all(void) {
    printf("Test: Delete all nodes... ");
    BSTNode* root = NULL;
    
    int keys[] = {50, 25, 75, 12, 37, 62, 87};
    for (int i = 0; i < 7; i++) {
        root = bst_insert(root, keys[i]);
    }
    
    for (int i = 0; i < 7; i++) {
        root = bst_delete(root, keys[i]);
        if (root != NULL) {
            assert(verify_bst_property(root, INT_MIN, INT_MAX));
        }
    }
    
    assert(root == NULL);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_bst_empty_operations
 * @brief Operations on empty tree
 */
int test_bst_empty_operations(void) {
    printf("Test: Operations on empty tree... ");
    BSTNode* root = NULL;
    
    assert(bst_search(root, 10) == NULL);
    
    root = bst_delete(root, 10);  /* Should not crash */
    assert(root == NULL);
    
    bst_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_bst_min_max
 * @brief Find minimum value
 */
int test_bst_min_max(void) {
    printf("Test: Find minimum... ");
    BSTNode* root = NULL;
    
    int keys[] = {30, 20, 40, 10, 25};
    for (int i = 0; i < 5; i++) {
        root = bst_insert(root, keys[i]);
    }
    
    BSTNode* min = bst_min(root);
    assert(min != NULL);
    assert(min->key == 10);
    
    bst_free(root);
    printf("PASS\n");
    return 1;
}

/* ============================================================================
 * Test Runner
 * ============================================================================
 */

int main(void) {
    printf("\n========================================\n");
    printf("  BST UNIT TESTS\n");
    printf("========================================\n\n");
    
    int passed = 0;
    int failed = 0;
    
    /* Run all tests */
    if (test_bst_insert_single()) passed++; else failed++;
    if (test_bst_insert_sequence()) passed++; else failed++;
    if (test_bst_insert_ascending()) passed++; else failed++;
    if (test_bst_insert_descending()) passed++; else failed++;
    if (test_bst_search_found()) passed++; else failed++;
    if (test_bst_search_not_found()) passed++; else failed++;
    if (test_bst_delete_leaf()) passed++; else failed++;
    if (test_bst_delete_node_one_child()) passed++; else failed++;
    if (test_bst_delete_node_two_children()) passed++; else failed++;
    if (test_bst_delete_root()) passed++; else failed++;
    if (test_bst_delete_all()) passed++; else failed++;
    if (test_bst_empty_operations()) passed++; else failed++;
    if (test_bst_min_max()) passed++; else failed++;
    
    printf("\n========================================\n");
    printf("  TEST SUMMARY\n");
    printf("========================================\n");
    printf("Passed: %d\n", passed);
    printf("Failed: %d\n", failed);
    printf("Total:  %d\n", passed + failed);
    printf("========================================\n\n");
    
    return (failed == 0) ? 0 : 1;
}
