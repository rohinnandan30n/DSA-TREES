/**
 * @file test_avl.c
 * @brief Unit tests for AVL tree implementation
 * 
 * Tests correctness of insert, delete, and search operations.
 * Covers edge cases like duplicates, skewed sequences, and balance validation.
 */

#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <limits.h>
#include "../include/avl.h"

/* ============================================================================
 * Test Utilities
 * ============================================================================
 */

/**
 * @brief Helper: Fill array with inorder traversal
 */
static void avl_inorder_to_array(AVLNode* root, int* arr, int* index) {
    if (!root) return;
    avl_inorder_to_array(root->left, arr, index);
    arr[(*index)++] = root->key;
    avl_inorder_to_array(root->right, arr, index);
}

/**
 * @brief Verify inorder sequence is sorted
 */
static int is_sorted(int* arr, int len) {
    for (int i = 1; i < len; i++) {
        if (arr[i] < arr[i-1]) return 0;
    }
    return 1;
}

/**
 * @brief Verify balance factors are within [-1, 1]
 */
static int verify_balance(AVLNode* node) {
    if (!node) return 1;
    
    int bf = avl_balance_factor(node);
    if (bf < -1 || bf > 1) {
        printf("ERROR: Node %d has invalid balance factor %d\n", node->key, bf);
        return 0;
    }
    
    if (!verify_balance(node->left)) return 0;
    if (!verify_balance(node->right)) return 0;
    
    return 1;
}

/**
 * @brief Count nodes in tree
 */
static int count_nodes(AVLNode* root) {
    if (!root) return 0;
    return 1 + count_nodes(root->left) + count_nodes(root->right);
}

/* ============================================================================
 * Test Cases
 * ============================================================================
 */

/**
 * @test test_avl_insert_single
 * @brief Insert single node
 */
int test_avl_insert_single(void) {
    printf("Test: Insert single node... ");
    AVLNode* root = NULL;
    
    root = avl_insert(root, 10);
    
    assert(root != NULL);
    assert(root->key == 10);
    assert(root->height == 0);
    assert(root->left == NULL);
    assert(root->right == NULL);
    
    avl_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_avl_insert_sequence
 * @brief Insert known sequence and verify BST property and balance
 */
int test_avl_insert_sequence(void) {
    printf("Test: Insert sequence {30, 20, 10, 25, 40}... ");
    AVLNode* root = NULL;
    
    int keys[] = {30, 20, 10, 25, 40};
    for (int i = 0; i < 5; i++) {
        root = avl_insert(root, keys[i]);
    }
    
    /* Verify tree has all 5 nodes */
    assert(count_nodes(root) == 5);
    
    /* Verify inorder is sorted (BST property) */
    int inorder[5];
    int idx = 0;
    avl_inorder_to_array(root, inorder, &idx);
    assert(is_sorted(inorder, 5));
    
    /* Verify balance factors */
    assert(verify_balance(root));
    
    avl_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_avl_insert_skewed_left
 * @brief Insert skewed left sequence, verify rotations occur
 */
int test_avl_insert_skewed_left(void) {
    printf("Test: Insert skewed left {50, 40, 30, 20, 10}... ");
    AVLNode* root = NULL;
    
    int keys[] = {50, 40, 30, 20, 10};
    for (int i = 0; i < 5; i++) {
        root = avl_insert(root, keys[i]);
    }
    
    /* Tree should be balanced, not linear */
    assert(count_nodes(root) == 5);
    
    /* Height should be ~log(n), not n */
    int h = avl_height(root);
    assert(h <= 3);  /* log2(5) ≈ 2.3, so max 3 */
    
    /* Balance must be maintained */
    assert(verify_balance(root));
    
    avl_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_avl_search_found
 * @brief Search for existing key
 */
int test_avl_search_found(void) {
    printf("Test: Search for existing key... ");
    AVLNode* root = NULL;
    
    int keys[] = {20, 10, 30, 5, 15};
    for (int i = 0; i < 5; i++) {
        root = avl_insert(root, keys[i]);
    }
    
    assert(avl_search(root, 20) != NULL);
    assert(avl_search(root, 10) != NULL);
    assert(avl_search(root, 30) != NULL);
    
    avl_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_avl_search_not_found
 * @brief Search for non-existing key
 */
int test_avl_search_not_found(void) {
    printf("Test: Search for non-existing key... ");
    AVLNode* root = NULL;
    
    int keys[] = {20, 10, 30};
    for (int i = 0; i < 3; i++) {
        root = avl_insert(root, keys[i]);
    }
    
    assert(avl_search(root, 100) == NULL);
    assert(avl_search(root, 5) == NULL);
    
    avl_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_avl_delete_leaf
 * @brief Delete leaf node
 */
int test_avl_delete_leaf(void) {
    printf("Test: Delete leaf node... ");
    AVLNode* root = NULL;
    
    int keys[] = {10, 5, 15};
    for (int i = 0; i < 3; i++) {
        root = avl_insert(root, keys[i]);
    }
    
    root = avl_delete(root, 5);
    
    assert(count_nodes(root) == 2);
    assert(avl_search(root, 5) == NULL);
    assert(verify_balance(root));
    
    avl_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_avl_delete_root
 * @brief Delete root node
 */
int test_avl_delete_root(void) {
    printf("Test: Delete root node... ");
    AVLNode* root = NULL;
    
    int keys[] = {10, 5, 15, 3, 7};
    for (int i = 0; i < 5; i++) {
        root = avl_insert(root, keys[i]);
    }
    
    root = avl_delete(root, 10);
    
    assert(count_nodes(root) == 4);
    assert(avl_search(root, 10) == NULL);
    assert(verify_balance(root));
    
    avl_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_avl_duplicate_insert
 * @brief Insert duplicate values (behavior defined by implementation)
 */
int test_avl_duplicate_insert(void) {
    printf("Test: Insert duplicate values... ");
    AVLNode* root = NULL;
    
    root = avl_insert(root, 10);
    root = avl_insert(root, 10);
    root = avl_insert(root, 10);
    
    /* Behavior may vary; just ensure no crash and tree is valid */
    assert(root != NULL);
    assert(verify_balance(root));
    
    avl_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_avl_delete_all
 * @brief Delete all nodes one by one
 */
int test_avl_delete_all(void) {
    printf("Test: Delete all nodes... ");
    AVLNode* root = NULL;
    
    int keys[] = {50, 25, 75, 12, 37, 62, 87};
    for (int i = 0; i < 7; i++) {
        root = avl_insert(root, keys[i]);
    }
    
    for (int i = 0; i < 7; i++) {
        root = avl_delete(root, keys[i]);
        if (i < 6) {
            assert(verify_balance(root));
        }
    }
    
    assert(root == NULL);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_avl_empty_operations
 * @brief Operations on empty tree
 */
int test_avl_empty_operations(void) {
    printf("Test: Operations on empty tree... ");
    AVLNode* root = NULL;
    
    assert(avl_search(root, 10) == NULL);
    assert(avl_height(root) == -1);
    assert(avl_balance_factor(root) == 0);
    
    root = avl_delete(root, 10);  /* Should not crash */
    assert(root == NULL);
    
    avl_free(root);
    printf("PASS\n");
    return 1;
}

/* ============================================================================
 * Test Runner
 * ============================================================================
 */

int main(void) {
    printf("\n========================================\n");
    printf("  AVL TREE UNIT TESTS\n");
    printf("========================================\n\n");
    
    int passed = 0;
    int failed = 0;
    
    /* Run all tests */
    if (test_avl_insert_single()) passed++; else failed++;
    if (test_avl_insert_sequence()) passed++; else failed++;
    if (test_avl_insert_skewed_left()) passed++; else failed++;
    if (test_avl_search_found()) passed++; else failed++;
    if (test_avl_search_not_found()) passed++; else failed++;
    if (test_avl_delete_leaf()) passed++; else failed++;
    if (test_avl_delete_root()) passed++; else failed++;
    if (test_avl_duplicate_insert()) passed++; else failed++;
    if (test_avl_delete_all()) passed++; else failed++;
    if (test_avl_empty_operations()) passed++; else failed++;
    
    printf("\n========================================\n");
    printf("  TEST SUMMARY\n");
    printf("========================================\n");
    printf("Passed: %d\n", passed);
    printf("Failed: %d\n", failed);
    printf("Total:  %d\n", passed + failed);
    printf("========================================\n\n");
    
    return (failed == 0) ? 0 : 1;
}
