/**
 * @file quiz.c
 * @brief Implementation of educational quiz and challenge engine
 * 
 * Provides interactive quizzes for AVL rotations, predictions, and RB tree operations.
 * Tracks scoring and difficulty progression.
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "quiz.h"
#include "avl.h"

/* ============================================================================
 * Utility Functions
 * ============================================================================
 */

/**
 * @brief Display a simple tree for visualization (ASCII art)
 */
static void quiz_display_small_tree(int root, int left, int right) {
    printf("\n     %d\n", root);
    if (left != -1 || right != -1) {
        if (left != -1)
            printf("   /   ");
        if (right != -1)
            printf("\\");
        printf("\n");
        if (left != -1)
            printf("  %d    ", left);
        if (right != -1)
            printf("%d", right);
        printf("\n");
    }
    printf("\n");
}

/**
 * @brief Get user input for multiple choice
 */
static int quiz_get_choice(const char* options[], int count) {
    int choice;
    printf("Your answer: ");
    scanf("%d", &choice);
    return (choice >= 1 && choice <= count) ? choice : -1;
}

/* ============================================================================
 * AVL Rotation Quiz
 * ============================================================================
 */

/**
 * @brief Start interactive AVL rotation type quiz
 */
int start_avl_rotation_quiz(void) {
    printf("\n========================================\n");
    printf("  AVL ROTATION TYPE QUIZ\n");
    printf("========================================\n");
    printf("\nIdentify the rotation needed to balance this tree:\n");
    
    /* Present scenario: unbalanced tree */
    quiz_display_small_tree(10, 5, -1);
    printf("Left subtree of 10 (rooted at 5):\n");
    quiz_display_small_tree(5, 3, -1);
    
    const char* rotations[] = {"LL", "RR", "LR", "RL"};
    printf("\nWhat type of rotation is needed?\n");
    printf("1. LL (Left-Left)\n");
    printf("2. RR (Right-Right)\n");
    printf("3. LR (Left-Right)\n");
    printf("4. RL (Right-Left)\n");
    
    int answer = quiz_get_choice(rotations, 4);
    
    /* Correct answer: LL rotation */
    int correct = (answer == 1);
    
    if (correct) {
        printf("\n✓ CORRECT! This is an LL rotation (unbalanced left child's left subtree).\n");
        printf("Solution: Right rotation at node 10.\n");
        return 1;
    } else {
        printf("\n✗ INCORRECT! The answer was LL (Left-Left).\n");
        printf("Explanation: Node 10 has a heavy left subtree with deep left child.\n");
        return 0;
    }
}

/**
 * @brief Quiz: Predict tree shape after insertions
 */
int start_avl_prediction_quiz(void) {
    printf("\n========================================\n");
    printf("  AVL PREDICTION QUIZ\n");
    printf("========================================\n");
    printf("\nYou will insert these values in order: 10, 5, 15, 2, 7\n");
    printf("to an initially empty AVL tree.\n\n");
    
    /* Build the tree */
    AVLNode* root = NULL;
    int values[] = {10, 5, 15, 2, 7};
    for (int i = 0; i < 5; i++) {
        root = avl_insert(root, values[i]);
    }
    
    int score = 0;
    
    /* Question 1: Final height */
    printf("Question 1: What is the height of the final tree?\n");
    printf("Your answer: ");
    int predicted_height;
    scanf("%d", &predicted_height);
    
    int actual_height = avl_height(root);
    if (predicted_height == actual_height) {
        printf("✓ CORRECT! Height is %d\n", actual_height);
        score++;
    } else {
        printf("✗ INCORRECT! Actual height is %d (you said %d)\n", actual_height, predicted_height);
    }
    
    /* Question 2: Root value */
    printf("\nQuestion 2: What is the root value?\n");
    printf("Your answer: ");
    int predicted_root;
    scanf("%d", &predicted_root);
    
    if (predicted_root == root->key) {
        printf("✓ CORRECT! Root is %d\n", root->key);
        score++;
    } else {
        printf("✗ INCORRECT! Actual root is %d (you said %d)\n", root->key, predicted_root);
    }
    
    avl_free(root);
    
    printf("\nYou scored %d/2 points.\n", score);
    return (score == 2) ? 1 : 0;
}

/* ============================================================================
 * RB Tree Quiz
 * ============================================================================
 */

/**
 * @brief Interactive Red-Black tree fix-up quiz
 */
int start_rb_quiz(void) {
    printf("\n========================================\n");
    printf("  RED-BLACK TREE FIX-UP QUIZ\n");
    printf("========================================\n");
    printf("\nScenario: After inserting a node, we have a local violation.\n");
    printf("Uncle is RED. What fix-up step happens?\n\n");
    
    printf("Current state:\n");
    printf("  Grandparent (BLACK)\n");
    printf("  /            \\\n");
    printf("Parent(RED)   Uncle(RED)\n");
    printf(" /\n");
    printf("Node(RED)  <- Violation: Parent and Node both RED\n\n");
    
    const char* options[] = {"Recolor only", "Rotate only", "Recolor and Rotate", "No fix needed"};
    printf("1. Recolor only\n");
    printf("2. Rotate only\n");
    printf("3. Recolor and Rotate\n");
    printf("4. No fix needed\n");
    
    int answer = quiz_get_choice(options, 4);
    
    /* Correct answer: Recolor only (uncle is red) */
    int correct = (answer == 1);
    
    if (correct) {
        printf("\n✓ CORRECT!\n");
        printf("When uncle is RED: recolor parent, uncle, and grandparent.\n");
        printf("Parent and Uncle become BLACK, Grandparent becomes RED.\n");
        return 1;
    } else {
        printf("\n✗ INCORRECT! The answer was: Recolor only\n");
        printf("Explanation: When the uncle is RED, we fix by recoloring.\n");
        printf("Change parent→BLACK, uncle→BLACK, grandparent→RED.\n");
        return 0;
    }
}

/**
 * @brief Quiz: Predict RB tree after insertions
 */
int start_rb_prediction_quiz(void) {
    printf("\n========================================\n");
    printf("  RED-BLACK PREDICTION QUIZ\n");
    printf("========================================\n");
    printf("\nInsert these values into an empty RB tree: 7, 3, 18, 10, 22\n");
    printf("(Note: In a real implementation, colors are maintained.)\n\n");
    
    printf("Question 1: After all insertions, what is the root value?\n");
    printf("Your answer: ");
    int predicted_root;
    scanf("%d", &predicted_root);
    
    /* Simplified: typical root after these insertions */
    int correct = (predicted_root == 10 || predicted_root == 7);
    
    if (correct) {
        printf("✓ CORRECT! %d is a valid root.\n", predicted_root);
        return 1;
    } else {
        printf("✗ INCORRECT! Typical root values are 7 or 10.\n");
        return 0;
    }
}

/* ============================================================================
 * Score & Difficulty Management
 * ============================================================================
 */

/**
 * @brief Initialize quiz score tracker
 */
QuizScore quiz_score_init(void) {
    QuizScore score = {
        .total_questions = 0,
        .correct_answers = 0,
        .total_points = 0,
        .current_level = DIFFICULTY_EASY
    };
    return score;
}

/**
 * @brief Record a correct answer
 */
void quiz_score_add_correct(QuizScore* score, int points) {
    if (!score) return;
    score->total_questions++;
    score->correct_answers++;
    score->total_points += points;
}

/**
 * @brief Record an incorrect answer
 */
void quiz_score_add_incorrect(QuizScore* score) {
    if (!score) return;
    score->total_questions++;
}

/**
 * @brief Increase difficulty if performance is excellent
 */
int quiz_difficulty_increase(QuizScore* score) {
    if (!score) return 0;
    
    if (score->total_questions >= 5) {
        double percentage = (double)score->correct_answers / score->total_questions * 100;
        
        if (percentage >= 90 && score->current_level < DIFFICULTY_HARD) {
            score->current_level++;
            return 1;
        }
    }
    return 0;
}

/**
 * @brief Decrease difficulty if performance is poor
 */
int quiz_difficulty_decrease(QuizScore* score) {
    if (!score) return 0;
    
    if (score->total_questions >= 3) {
        double percentage = (double)score->correct_answers / score->total_questions * 100;
        
        if (percentage < 50 && score->current_level > DIFFICULTY_EASY) {
            score->current_level--;
            return 1;
        }
    }
    return 0;
}

/**
 * @brief Print current score and statistics
 */
void quiz_print_score(QuizScore* score) {
    if (!score) return;
    
    printf("\n========================================\n");
    printf("  SCORE SUMMARY\n");
    printf("========================================\n");
    printf("Total Questions: %d\n", score->total_questions);
    printf("Correct Answers: %d\n", score->correct_answers);
    printf("Total Points: %d\n", score->total_points);
    
    if (score->total_questions > 0) {
        double percentage = (double)score->correct_answers / score->total_questions * 100;
        printf("Accuracy: %.1f%%\n", percentage);
    }
    
    const char* level_names[] = {"EASY", "MEDIUM", "HARD"};
    printf("Current Level: %s\n", level_names[score->current_level - 1]);
    printf("========================================\n\n");
}

/* ============================================================================
 * Quiz Runner Menu
 * ============================================================================
 */

/**
 * @brief Display quiz selection menu
 */
void quiz_main_menu(void) {
    QuizScore score = quiz_score_init();
    int running = 1;
    
    while (running) {
        printf("\n========================================\n");
        printf("  TREE DATA STRUCTURES QUIZ ENGINE\n");
        printf("========================================\n");
        printf("1. AVL Rotation Type Quiz\n");
        printf("2. AVL Prediction Quiz\n");
        printf("3. Red-Black Tree Fix-up Quiz\n");
        printf("4. Red-Black Tree Prediction Quiz\n");
        printf("5. View Score Summary\n");
        printf("6. Exit Quiz Mode\n");
        printf("========================================\n");
        
        int choice;
        printf("Select quiz (1-6): ");
        scanf("%d", &choice);
        
        int result = 0;
        switch (choice) {
            case 1:
                result = start_avl_rotation_quiz();
                break;
            case 2:
                result = start_avl_prediction_quiz();
                break;
            case 3:
                result = start_rb_quiz();
                break;
            case 4:
                result = start_rb_prediction_quiz();
                break;
            case 5:
                quiz_print_score(&score);
                continue;
            case 6:
                running = 0;
                continue;
            default:
                printf("Invalid choice. Try again.\n");
                continue;
        }
        
        /* Record score */
        if (result) {
            quiz_score_add_correct(&score, 1);
        } else {
            quiz_score_add_incorrect(&score);
        }
        
        /* Check for difficulty adjustment */
        if (quiz_difficulty_increase(&score)) {
            printf("\n🎉 Excellent performance! Difficulty increased to MEDIUM.\n");
        }
        if (quiz_difficulty_decrease(&score)) {
            printf("\nDifficulty adjusted to EASY for practice.\n");
        }
    }
    
    printf("\nFinal Score:\n");
    quiz_print_score(&score);
}
