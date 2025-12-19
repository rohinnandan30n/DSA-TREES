#ifndef QUIZ_H
#define QUIZ_H

/**
 * @file quiz.h
 * @brief Educational quiz and challenge engine for tree data structures
 * 
 * Provides interactive quizzes for AVL rotations, predictions, and RB tree fix-ups.
 * Includes scoring, difficulty levels, and instant feedback.
 */

#include "avl.h"
#include "rbt.h"

/* ============================================================================
 * Quiz Types & Score Tracking
 * ============================================================================
 */

/**
 * @enum QuizDifficulty
 * @brief Difficulty levels for quizzes
 */
typedef enum {
    DIFFICULTY_EASY = 1,
    DIFFICULTY_MEDIUM = 2,
    DIFFICULTY_HARD = 3
} QuizDifficulty;

/**
 * @struct QuizScore
 * @brief Tracks user performance across quiz sessions
 */
typedef struct {
    int total_questions;
    int correct_answers;
    int total_points;
    QuizDifficulty current_level;
} QuizScore;

/* ============================================================================
 * AVL Rotation Quiz
 * ============================================================================
 */

/**
 * @brief Start interactive AVL rotation type quiz
 * 
 * Shows a small tree with imbalance and asks player to identify
 * rotation type: LL, RR, LR, or RL
 * 
 * @return 1 if correct, 0 if incorrect
 */
int start_avl_rotation_quiz(void);

/**
 * @brief Quiz: Predict tree shape after insertions
 * 
 * Given a sequence of values, asks for:
 * - Final tree height
 * - Root value
 * - Number of rotations performed
 * 
 * @return 1 if all predictions correct, 0 otherwise
 */
int start_avl_prediction_quiz(void);

/* ============================================================================
 * RB Tree Quiz
 * ============================================================================
 */

/**
 * @brief Interactive Red-Black tree fix-up quiz
 * 
 * Shows locally invalid RB tree and asks what fix-up step happens next
 * (recolor, rotate, or both)
 * 
 * @return 1 if correct, 0 if incorrect
 */
int start_rb_quiz(void);

/**
 * @brief Quiz: Predict RB tree after insertions
 * 
 * Given insertion sequence, asks to predict:
 * - Final colors
 * - Root value
 * - Black height
 * 
 * @return 1 if all predictions correct, 0 otherwise
 */
int start_rb_prediction_quiz(void);

/* ============================================================================
 * Score & Difficulty Management
 * ============================================================================
 */

/**
 * @brief Initialize quiz score tracker
 * 
 * @return Initialized QuizScore structure
 */
QuizScore quiz_score_init(void);

/**
 * @brief Record a correct answer
 * 
 * @param score Pointer to QuizScore
 * @param points Points awarded for this question
 */
void quiz_score_add_correct(QuizScore* score, int points);

/**
 * @brief Record an incorrect answer
 * 
 * @param score Pointer to QuizScore
 */
void quiz_score_add_incorrect(QuizScore* score);

/**
 * @brief Increase difficulty if performance is excellent
 * 
 * @param score Pointer to QuizScore
 * @return 1 if difficulty increased, 0 otherwise
 */
int quiz_difficulty_increase(QuizScore* score);

/**
 * @brief Decrease difficulty if performance is poor
 * 
 * @param score Pointer to QuizScore
 * @return 1 if difficulty decreased, 0 otherwise
 */
int quiz_difficulty_decrease(QuizScore* score);

/**
 * @brief Print current score and statistics
 * 
 * @param score Pointer to QuizScore
 */
void quiz_print_score(QuizScore* score);

/* ============================================================================
 * Quiz Runner Menu
 * ============================================================================
 */

/**
 * @brief Display quiz selection menu
 * 
 * Allows user to choose from various quiz types and difficulty levels
 */
void quiz_main_menu(void);

#endif // QUIZ_H
