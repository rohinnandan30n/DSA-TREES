#ifndef APP_H
#define APP_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* Tree type enum */
typedef enum {
    TREE_BST = 0,
    TREE_AVL = 1,
    TREE_RBT = 2
} TreeType;

/* Global app state */
typedef struct {
    TreeType current_tree;
    int verbose;           /* Show detailed steps */
    int step_mode;         /* Pause after each operation */
    int use_colors;        /* Use colored output */
} AppState;

/* Main functions */
void app_main_menu(void);
void app_tree_menu(TreeType tree_type);
void app_operations_menu(TreeType tree_type);
void app_lessons_menu(TreeType tree_type);

/* Lesson runners */
void lesson_avl_ll_rotation(void);
void lesson_avl_rr_rotation(void);
void lesson_avl_lr_rotation(void);
void lesson_avl_rl_rotation(void);
void lesson_rbt_insert_case1(void);
void lesson_rbt_insert_case2_3(void);

/* Utility */
void app_pause(void);
void app_clear_screen(void);
void app_print_header(const char *title);
void app_print_separator(void);

/* Global state getter */
AppState* app_get_state(void);

#endif /* APP_H */
