#include "app.h"
#include "visualize.h"
#include "bst.h"
#include "avl.h"
#include "rbt.h"

/* ============================================================================
 * Global Application State
 * ============================================================================
 */

static AppState global_state = {
    .current_tree = TREE_BST,
    .verbose = 1,
    .step_mode = 0,
    .use_colors = 1
};

AppState* app_get_state(void) {
    return &global_state;
}

/* ============================================================================
 * Utility Functions
 * ============================================================================
 */

void app_clear_screen(void) {
    #ifdef _WIN32
        system("cls");
    #else
        system("clear");
    #endif
}

void app_print_header(const char *title) {
    printf("\n");
    printf("╔════════════════════════════════════════╗\n");
    printf("║  ");
    printf("%-36s", title);
    printf("  ║\n");
    printf("╚════════════════════════════════════════╝\n");
    printf("\n");
}

void app_print_separator(void) {
    printf("────────────────────────────────────────\n");
}

void app_pause(void) {
    printf("\nPress ENTER to continue...");
    getchar();
}

/* ============================================================================
 * Main Menu
 * ============================================================================
 */

void app_main_menu(void) {
    int choice = 0;
    
    while (1) {
        app_clear_screen();
        app_print_header("🌳 TREE EXPLORER 🌳");
        
        printf("╭─ What would you like to do? ─────────╮\n");
        printf("│                                       │\n");
        printf("│  1. Binary Search Tree (BST)         │\n");
        printf("│  2. AVL Tree (Self-Balancing)        │\n");
        printf("│  3. Red-Black Tree (RBT)             │\n");
        printf("│  4. Settings                         │\n");
        printf("│  0. Exit                             │\n");
        printf("│                                       │\n");
        printf("╰───────────────────────────────────────╯\n");
        
        printf("Enter your choice (0-4): ");
        scanf("%d", &choice);
        getchar();
        
        switch (choice) {
            case 1:
                global_state.current_tree = TREE_BST;
                app_tree_menu(TREE_BST);
                break;
            case 2:
                global_state.current_tree = TREE_AVL;
                app_tree_menu(TREE_AVL);
                break;
            case 3:
                global_state.current_tree = TREE_RBT;
                app_tree_menu(TREE_RBT);
                break;
            case 4: {
                app_clear_screen();
                app_print_header("⚙️  Settings");
                printf("1. Verbose Mode: %s\n", global_state.verbose ? "ON" : "OFF");
                printf("2. Step Mode: %s\n", global_state.step_mode ? "ON" : "OFF");
                printf("3. Colors: %s\n", global_state.use_colors ? "ON" : "OFF");
                printf("\n0. Back to Main Menu\n\n");
                
                int setting = 0;
                printf("Choose setting to toggle (0-3): ");
                scanf("%d", &setting);
                getchar();
                
                switch (setting) {
                    case 1: global_state.verbose = !global_state.verbose; break;
                    case 2: global_state.step_mode = !global_state.step_mode; break;
                    case 3: global_state.use_colors = !global_state.use_colors; break;
                }
                break;
            }
            case 0:
                app_clear_screen();
                printf("\n╔════════════════════════════════════════╗\n");
                printf("║  Thanks for exploring trees! 🌲        ║\n");
                printf("╚════════════════════════════════════════╝\n\n");
                exit(0);
            default:
                printf("Invalid choice! Please try again.\n");
                app_pause();
        }
    }
}

/* ============================================================================
 * Tree Mode Menu
 * ============================================================================
 */

void app_tree_menu(TreeType tree_type) {
    const char *tree_names[] = {"Binary Search Tree", "AVL Tree", "Red-Black Tree"};
    
    int choice = 0;
    while (1) {
        app_clear_screen();
        app_print_header(tree_names[tree_type]);
        
        printf("╭─ What would you like to do? ─────────╮\n");
        printf("│                                       │\n");
        printf("│  1. Operations (Insert/Search/Delete)│\n");
        printf("│  2. Interactive Lessons               │\n");
        printf("│  3. Learn Theory                      │\n");
        printf("│  0. Back to Main Menu                 │\n");
        printf("│                                       │\n");
        printf("╰───────────────────────────────────────╯\n");
        
        printf("Enter your choice (0-3): ");
        scanf("%d", &choice);
        getchar();
        
        switch (choice) {
            case 1:
                app_operations_menu(tree_type);
                break;
            case 2:
                app_lessons_menu(tree_type);
                break;
            case 3:
                app_clear_screen();
                app_print_header("📚 Tree Theory");
                printf("BST: All left descendants < parent < all right descendants\n\n");
                
                if (tree_type == TREE_AVL) {
                    printf("AVL: Balanced BST where height diff of subtrees ≤ 1\n");
                    printf("     Uses rotations to maintain balance\n");
                } else if (tree_type == TREE_RBT) {
                    printf("RBT: Colored BST (RED/BLACK) that ensures O(log n) height\n");
                    printf("     5 properties: color, root BLACK, leaf BLACK, no RED-RED, equal black-height\n");
                }
                
                printf("\nRead docs/tree_theory.md for detailed explanations!\n");
                app_pause();
                break;
            case 0:
                return;
            default:
                printf("Invalid choice!\n");
                app_pause();
        }
    }
}

/* ============================================================================
 * Operations Menu
 * ============================================================================
 */

void app_operations_menu(TreeType tree_type) {
    const char *tree_names[] = {"BST", "AVL", "RBT"};
    
    /* Create trees based on type */
    BSTNode *bst_root = NULL;
    AVLNode *avl_root = NULL;
    RBTree *rbt = (tree_type == TREE_RBT) ? rbt_create() : NULL;
    
    if (tree_type == TREE_RBT && rbt) {
        rbt_set_verbose(rbt, global_state.verbose);
    }
    
    int choice = 0;
    while (1) {
        app_clear_screen();
        app_print_header(tree_names[tree_type]);
        
        printf("╭─ Operations ──────────────────────────╮\n");
        printf("│                                       │\n");
        printf("│  1. Insert Value                      │\n");
        printf("│  2. Search Value                      │\n");
        printf("│  3. Delete Value                      │\n");
        printf("│  4. View Tree                         │\n");
        printf("│  5. Clear Tree                        │\n");
        printf("│  0. Back                              │\n");
        printf("│                                       │\n");
        printf("╰───────────────────────────────────────╯\n");
        
        printf("Enter your choice (0-5): ");
        scanf("%d", &choice);
        getchar();
        
        int value;
        switch (choice) {
            case 1:
                printf("\nEnter value to insert: ");
                scanf("%d", &value);
                getchar();
                
                printf("\n[Inserting %d into %s...]\n", value, tree_names[tree_type]);
                
                if (tree_type == TREE_BST) {
                    bst_root = bst_insert(bst_root, value);
                    print_bst(bst_root);
                } else if (tree_type == TREE_AVL) {
                    avl_root = avl_insert(avl_root, value);
                    print_avl(avl_root);
                } else if (tree_type == TREE_RBT) {
                    rbt_insert(rbt, value);
                    print_rbt(rbt->root);
                }
                
                if (global_state.step_mode) app_pause();
                break;
                
            case 2:
                printf("\nEnter value to search: ");
                scanf("%d", &value);
                getchar();
                
                printf("\n[Searching for %d in %s...]\n", value, tree_names[tree_type]);
                
                if (tree_type == TREE_BST) {
                    BSTNode *found = bst_search(bst_root, value);
                    printf(found ? "✓ Found!\n" : "✗ Not found!\n");
                } else if (tree_type == TREE_AVL) {
                    AVLNode *found = avl_search(avl_root, value);
                    printf(found ? "✓ Found!\n" : "✗ Not found!\n");
                } else if (tree_type == TREE_RBT) {
                    RBNode *found = rbt_search(rbt, value);
                    printf(found ? "✓ Found!\n" : "✗ Not found!\n");
                }
                
                app_pause();
                break;
                
            case 3:
                printf("\nDelete operation demo (coming soon!)\n");
                app_pause();
                break;
                
            case 4:
                printf("\n");
                if (tree_type == TREE_BST) {
                    if (bst_root) print_bst_detailed(bst_root);
                    else printf("  [Empty BST]\n");
                } else if (tree_type == TREE_AVL) {
                    if (avl_root) print_avl_detailed(avl_root);
                    else printf("  [Empty AVL Tree]\n");
                } else if (tree_type == TREE_RBT) {
                    if (rbt && rbt->root) print_rbt_detailed(rbt->root);
                    else printf("  [Empty RBT]\n");
                }
                app_pause();
                break;
                
            case 5:
                bst_root = NULL;
                avl_root = NULL;
                if (rbt) {
                    rbt_destroy(rbt);
                    rbt = rbt_create();
                    rbt_set_verbose(rbt, global_state.verbose);
                }
                printf("\n✓ Tree cleared!\n");
                app_pause();
                break;
                
            case 0:
                return;
            default:
                printf("Invalid choice!\n");
                app_pause();
        }
    }
}

/* ============================================================================
 * Lessons Menu
 * ============================================================================
 */

void app_lessons_menu(TreeType tree_type) {
    int choice = 0;
    
    while (1) {
        app_clear_screen();
        
        if (tree_type == TREE_BST) {
            app_print_header("📖 BST Lessons");
            printf("╭─ Lessons ────────────────────────────╮\n");
            printf("│                                       │\n");
            printf("│  Coming soon!                         │\n");
            printf("│                                       │\n");
            printf("│  0. Back                              │\n");
            printf("│                                       │\n");
            printf("╰───────────────────────────────────────╯\n");
            
        } else if (tree_type == TREE_AVL) {
            app_print_header("📖 AVL Lessons");
            printf("╭─ Lessons ────────────────────────────╮\n");
            printf("│                                       │\n");
            printf("│  1. LL Rotation (Left-Left)          │\n");
            printf("│  2. RR Rotation (Right-Right)        │\n");
            printf("│  3. LR Rotation (Left-Right)         │\n");
            printf("│  4. RL Rotation (Right-Left)         │\n");
            printf("│                                       │\n");
            printf("│  0. Back                              │\n");
            printf("│                                       │\n");
            printf("╰───────────────────────────────────────╯\n");
            
        } else if (tree_type == TREE_RBT) {
            app_print_header("📖 RBT Lessons");
            printf("╭─ Lessons ────────────────────────────╮\n");
            printf("│                                       │\n");
            printf("│  1. Case 1: Uncle is RED (Recolor)   │\n");
            printf("│  2. Case 2&3: Uncle is BLACK         │\n");
            printf("│  3. Build balanced RBT               │\n");
            printf("│                                       │\n");
            printf("│  0. Back                              │\n");
            printf("│                                       │\n");
            printf("╰───────────────────────────────────────╯\n");
        }
        
        printf("Enter your choice: ");
        scanf("%d", &choice);
        getchar();
        
        switch (choice) {
            case 1:
                if (tree_type == TREE_AVL) lesson_avl_ll_rotation();
                else if (tree_type == TREE_RBT) lesson_rbt_insert_case1();
                break;
            case 2:
                if (tree_type == TREE_AVL) lesson_avl_rr_rotation();
                else if (tree_type == TREE_RBT) lesson_rbt_insert_case2_3();
                break;
            case 3:
                if (tree_type == TREE_AVL) lesson_avl_lr_rotation();
                break;
            case 4:
                if (tree_type == TREE_AVL) lesson_avl_rl_rotation();
                break;
            case 0:
                return;
            default:
                printf("Invalid choice!\n");
                app_pause();
        }
    }
}

/* ============================================================================
 * AVL Lessons
 * ============================================================================
 */

void lesson_avl_ll_rotation(void) {
    app_clear_screen();
    app_print_header("📚 AVL Lesson: LL Rotation");
    
    printf("Scenario: Insert into LEFT subtree of LEFT child\n");
    printf("This violates balance factor at ancestor node.\n\n");
    
    printf("Example: Insert 10, 5, 3 (LL case)\n");
    printf("──────────────────────────────────\n\n");
    
    AVLNode *root = NULL;
    
    printf("Step 1: Insert 10\n");
    root = avl_insert(root, 10);
    print_avl(root);
    app_pause();
    
    printf("Step 2: Insert 5\n");
    root = avl_insert(root, 5);
    print_avl(root);
    app_pause();
    
    printf("Step 3: Insert 3 → Triggers LL rotation at 10\n");
    printf("        Before:  10           After:  5\n");
    printf("        /         \\         /  \\\n");
    printf("       5           →       3   10\n");
    printf("      /\n");
    printf("     3\n\n");
    
    root = avl_insert(root, 3);
    print_avl(root);
    app_pause();
}

void lesson_avl_rr_rotation(void) {
    app_clear_screen();
    app_print_header("📚 AVL Lesson: RR Rotation");
    
    printf("Scenario: Insert into RIGHT subtree of RIGHT child\n\n");
    
    printf("Example: Insert 10, 15, 20 (RR case)\n");
    printf("──────────────────────────────────\n\n");
    
    AVLNode *root = NULL;
    
    printf("Step 1: Insert 10\n");
    root = avl_insert(root, 10);
    print_avl(root);
    app_pause();
    
    printf("Step 2: Insert 15\n");
    root = avl_insert(root, 15);
    print_avl(root);
    app_pause();
    
    printf("Step 3: Insert 20 → Triggers RR rotation at 10\n");
    printf("        Before:  10           After:    15\n");
    printf("         \\       /            /  \\\n");
    printf("         15  →              10   20\n");
    printf("          \\\n");
    printf("          20\n\n");
    
    root = avl_insert(root, 20);
    print_avl(root);
    app_pause();
}

void lesson_avl_lr_rotation(void) {
    app_clear_screen();
    app_print_header("📚 AVL Lesson: LR Rotation");
    
    printf("Scenario: Insert into RIGHT subtree of LEFT child\n");
    printf("Requires: LEFT rotate at child, then RIGHT rotate at parent\n\n");
    
    printf("Example: Insert 10, 5, 7 (LR case)\n");
    printf("──────────────────────────────────\n\n");
    
    AVLNode *root = NULL;
    
    printf("Step 1: Insert 10\n");
    root = avl_insert(root, 10);
    print_avl(root);
    app_pause();
    
    printf("Step 2: Insert 5\n");
    root = avl_insert(root, 5);
    print_avl(root);
    app_pause();
    
    printf("Step 3: Insert 7 → Triggers LR rotation\n");
    printf("        Before: 10  (LR)→  7     After: 7\n");
    printf("        /       /           /  \\       /  \\\n");
    printf("       5       5→7      10          5   10\n");
    printf("        \\\n");
    printf("         7\n\n");
    
    root = avl_insert(root, 7);
    print_avl(root);
    app_pause();
}

void lesson_avl_rl_rotation(void) {
    app_clear_screen();
    app_print_header("📚 AVL Lesson: RL Rotation");
    
    printf("Scenario: Insert into LEFT subtree of RIGHT child\n");
    printf("Requires: RIGHT rotate at child, then LEFT rotate at parent\n\n");
    
    printf("Example: Insert 10, 15, 12 (RL case)\n");
    printf("──────────────────────────────────\n\n");
    
    AVLNode *root = NULL;
    
    printf("Step 1: Insert 10\n");
    root = avl_insert(root, 10);
    print_avl(root);
    app_pause();
    
    printf("Step 2: Insert 15\n");
    root = avl_insert(root, 15);
    print_avl(root);
    app_pause();
    
    printf("Step 3: Insert 12 → Triggers RL rotation\n");
    printf("        Before: 10  (RL)→  12    After: 12\n");
    printf("         \\      \\          /  \\       /  \\\n");
    printf("         15  →12→15    10   15\n");
    printf("        /\n");
    printf("       12\n\n");
    
    root = avl_insert(root, 12);
    print_avl(root);
    app_pause();
}

/* ============================================================================
 * RBT Lessons
 * ============================================================================
 */

void lesson_rbt_insert_case1(void) {
    app_clear_screen();
    app_print_header("📚 RBT Lesson: Case 1 (Uncle is RED)");
    
    printf("When uncle of inserted node is RED:\n");
    printf("→ Recolor parent & uncle to BLACK\n");
    printf("→ Recolor grandparent to RED\n");
    printf("→ Continue fix-up from grandparent\n\n");
    
    printf("Example: Insert 10, 5, 15, 3, 7\n");
    printf("──────────────────────────────────\n\n");
    
    RBTree *tree = rbt_create();
    rbt_set_verbose(tree, 1);
    
    printf("Step 1: Insert 10 (becomes root, BLACK)\n");
    rbt_insert(tree, 10);
    print_rbt(tree->root);
    app_pause();
    
    printf("Step 2: Insert 5 (RED)\n");
    rbt_insert(tree, 5);
    print_rbt(tree->root);
    app_pause();
    
    printf("Step 3: Insert 15 (RED)\n");
    rbt_insert(tree, 15);
    print_rbt(tree->root);
    app_pause();
    
    printf("Step 4: Insert 3 (RED) → No violation yet\n");
    rbt_insert(tree, 3);
    print_rbt(tree->root);
    app_pause();
    
    printf("Step 5: Insert 7 (RED) → Uncle (15) is RED!\n");
    printf("        Action: Recolor 5 & 15 to BLACK, 10 to RED\n");
    rbt_insert(tree, 7);
    print_rbt(tree->root);
    
    rbt_destroy(tree);
    app_pause();
}

void lesson_rbt_insert_case2_3(void) {
    app_clear_screen();
    app_print_header("📚 RBT Lesson: Case 2 & 3 (Uncle is BLACK)");
    
    printf("When uncle of inserted node is BLACK:\n\n");
    
    printf("Case 2 (Triangle): Node and parent on opposite sides\n");
    printf("→ Rotate at parent to create line\n");
    printf("→ Proceed to Case 3\n\n");
    
    printf("Case 3 (Line): Node and parent on same side\n");
    printf("→ Rotate at grandparent\n");
    printf("→ Recolor parent & grandparent\n\n");
    
    printf("Example: Insert 20, 10, 30, 5 (Line case)\n");
    printf("──────────────────────────────────────────\n\n");
    
    RBTree *tree = rbt_create();
    rbt_set_verbose(tree, 1);
    
    printf("Step 1-3: Insert 20, 10, 30\n");
    rbt_insert(tree, 20);
    rbt_insert(tree, 10);
    rbt_insert(tree, 30);
    print_rbt(tree->root);
    app_pause();
    
    printf("Step 4: Insert 5 → Case 3 (Left-Left line)\n");
    printf("        Action: Right rotate at 20, recolor\n");
    rbt_insert(tree, 5);
    print_rbt(tree->root);
    
    rbt_destroy(tree);
    app_pause();
}
