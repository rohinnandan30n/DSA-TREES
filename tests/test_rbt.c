/**
 * @file test_rbt.c
 * @brief Unit tests for Red-Black Tree implementation
 * 
 * Tests RBT properties: color constraints, black height, insert/delete correctness
 */

#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <limits.h>
#include "../include/rbt.h"

/* ============================================================================
 * Test Utilities
 * ============================================================================
 */

/**
 * @brief Count nodes in tree
 */
static int count_nodes(RBTNode* root) {
    if (!root) return 0;
    return 1 + count_nodes(root->left) + count_nodes(root->right);
}

/**
 * @brief Verify red nodes don't have red children
 */
static int verify_no_red_red(RBTNode* node) {
    if (!node) return 1;
    
    if (node->color == RED) {
        if ((node->left && node->left->color == RED) ||
            (node->right && node->right->color == RED)) {
            printf("ERROR: Red node has red child\n");
            return 0;
        }
    }
    
    return verify_no_red_red(node->left) && verify_no_red_red(node->right);
}

/**
 * @brief Verify root is black
 */
static int verify_root_black(RBTNode* root) {
    if (!root) return 1;
    
    if (root->color != BLACK) {
        printf("ERROR: Root is not black\n");
        return 0;
    }
    return 1;
}

/**
 * @brief Count black nodes on path from node to leaf
 * Returns -1 if black height is inconsistent
 */
static int verify_black_height(RBTNode* node) {
    if (!node) return 1;  /* NIL nodes are black */
    
    int left_height = verify_black_height(node->left);
    int right_height = verify_black_height(node->right);
    
    if (left_height == -1 || right_height == -1) return -1;
    if (left_height != right_height) return -1;
    
    int increment = (node->color == BLACK) ? 1 : 0;
    return left_height + increment;
}

/* ============================================================================
 * Test Cases
 * ============================================================================
 */

/**
 * @test test_rbt_insert_single
 * @brief Insert single node, verify it's red
 */
int test_rbt_insert_single(void) {
    printf("Test: Insert single node... ");
    RBTNode* root = NULL;
    
    root = rbt_insert(root, 10);
    
    assert(root != NULL);
    assert(root->key == 10);
    assert(root->color == BLACK);  /* Root is always black */
    assert(count_nodes(root) == 1);
    
    rbt_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_rbt_insert_sequence
 * @brief Insert sequence and verify RBT properties
 */
int test_rbt_insert_sequence(void) {
    printf("Test: Insert sequence {10, 20, 30, 40, 50}... ");
    RBTNode* root = NULL;
    
    int keys[] = {10, 20, 30, 40, 50};
    for (int i = 0; i < 5; i++) {
        root = rbt_insert(root, keys[i]);
    }
    
    assert(count_nodes(root) == 5);
    assert(verify_root_black(root));
    assert(verify_no_red_red(root));
    assert(verify_black_height(root) > 0);
    
    rbt_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_rbt_search_found
 * @brief Search for existing keys
 */
int test_rbt_search_found(void) {
    printf("Test: Search found... ");
    RBTNode* root = NULL;
    
    int keys[] = {50, 30, 70, 20, 40, 60, 80};
    for (int i = 0; i < 7; i++) {
        root = rbt_insert(root, keys[i]);
    }
    
    assert(rbt_search(root, 50) != NULL);
    assert(rbt_search(root, 30) != NULL);
    assert(rbt_search(root, 70) != NULL);
    
    rbt_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_rbt_search_not_found
 * @brief Search for non-existing keys
 */
int test_rbt_search_not_found(void) {
    printf("Test: Search not found... ");
    RBTNode* root = NULL;
    
    int keys[] = {50, 30, 70};
    for (int i = 0; i < 3; i++) {
        root = rbt_insert(root, keys[i]);
    }
    
    assert(rbt_search(root, 100) == NULL);
    assert(rbt_search(root, 10) == NULL);
    
    rbt_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_rbt_delete_leaf
 * @brief Delete leaf node
 */
int test_rbt_delete_leaf(void) {
    printf("Test: Delete leaf node... ");
    RBTNode* root = NULL;
    
    int keys[] = {50, 30, 70, 20, 40};
    for (int i = 0; i < 5; i++) {
        root = rbt_insert(root, keys[i]);
    }
    
    root = rbt_delete(root, 20);
    
    assert(count_nodes(root) == 4);
    assert(rbt_search(root, 20) == NULL);
    assert(verify_root_black(root));
    
    rbt_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_rbt_delete_root
 * @brief Delete root node
 */
int test_rbt_delete_root(void) {
    printf("Test: Delete root node... ");
    RBTNode* root = NULL;
    
    int keys[] = {50, 30, 70, 20, 40, 60, 80};
    for (int i = 0; i < 7; i++) {
        root = rbt_insert(root, keys[i]);
    }
    
    root = rbt_delete(root, 50);
    
    assert(count_nodes(root) == 6);
    assert(rbt_search(root, 50) == NULL);
    assert(verify_root_black(root));
    
    rbt_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_rbt_delete_all
 * @brief Delete all nodes
 */
int test_rbt_delete_all(void) {
    printf("Test: Delete all nodes... ");
    RBTNode* root = NULL;
    
    int keys[] = {50, 25, 75, 12, 37, 62, 87};
    for (int i = 0; i < 7; i++) {
        root = rbt_insert(root, keys[i]);
    }
    
    for (int i = 0; i < 7; i++) {
        root = rbt_delete(root, keys[i]);
        if (root != NULL) {
            assert(verify_root_black(root));
            assert(verify_no_red_red(root));
        }
    }
    
    assert(root == NULL);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_rbt_properties_after_insertions
 * @brief Verify RBT properties after many insertions
 */
int test_rbt_properties_after_insertions(void) {
    printf("Test: RBT properties after insertions... ");
    RBTNode* root = NULL;
    
    for (int i = 1; i <= 20; i++) {
        root = rbt_insert(root, i);
    }
    
    assert(verify_root_black(root));
    assert(verify_no_red_red(root));
    assert(verify_black_height(root) > 0);
    assert(count_nodes(root) == 20);
    
    rbt_free(root);
    printf("PASS\n");
    return 1;
}

/**
 * @test test_rbt_empty_operations
 * @brief Operations on empty tree
 */
int test_rbt_empty_operations(void) {
    printf("Test: Operations on empty tree... ");
    RBTNode* root = NULL;
    
    assert(rbt_search(root, 10) == NULL);
    
    root = rbt_delete(root, 10);  /* Should not crash */
    assert(root == NULL);
    
    rbt_free(root);
    printf("PASS\n");
    return 1;
}

/* ============================================================================
 * Test Runner
 * ============================================================================
 */

int main(void) {
    printf("\n========================================\n");
    printf("  RED-BLACK TREE UNIT TESTS\n");
    printf("========================================\n\n");
    
    int passed = 0;
    int failed = 0;
    
    /* Run all tests */
    if (test_rbt_insert_single()) passed++; else failed++;
    if (test_rbt_insert_sequence()) passed++; else failed++;
    if (test_rbt_search_found()) passed++; else failed++;
    if (test_rbt_search_not_found()) passed++; else failed++;
    if (test_rbt_delete_leaf()) passed++; else failed++;
    if (test_rbt_delete_root()) passed++; else failed++;
    if (test_rbt_delete_all()) passed++; else failed++;
    if (test_rbt_properties_after_insertions()) passed++; else failed++;
    if (test_rbt_empty_operations()) passed++; else failed++;
    
    printf("\n========================================\n");
    printf("  TEST SUMMARY\n");
    printf("========================================\n");
    printf("Passed: %d\n", passed);
    printf("Failed: %d\n", failed);
    printf("Total:  %d\n", passed + failed);
    printf("========================================\n\n");
    
    return (failed == 0) ? 0 : 1;
}
