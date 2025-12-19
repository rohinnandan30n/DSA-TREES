# Makefile for Tree Trainer
# Cross-platform compatible (Windows with MinGW, Linux, macOS)

# ============================================================================
# Compiler and Flags
# ============================================================================

CC = gcc
CFLAGS = -Wall -Wextra -Wpedantic -std=c11 -I./include

# Uncomment for debug build
# CFLAGS += -g -O0

# Uncomment for release build with optimization
CFLAGS += -O2

# ============================================================================
# Directories
# ============================================================================

SRC_DIR = src
INC_DIR = include
TEST_DIR = tests
BIN_DIR = bin

# ============================================================================
# Source Files
# ============================================================================

CORE_SOURCES = \
    $(SRC_DIR)/bst.c \
    $(SRC_DIR)/avl.c \
    $(SRC_DIR)/rbt.c \
    $(SRC_DIR)/visualize.c \
    $(SRC_DIR)/app.c \
    $(SRC_DIR)/quiz.c

MAIN_SOURCES = $(CORE_SOURCES) $(SRC_DIR)/main.c

TEST_SOURCES = \
    $(TEST_DIR)/test_bst.c \
    $(TEST_DIR)/test_avl.c \
    $(TEST_DIR)/test_rbt.c

# ============================================================================
# Object Files
# ============================================================================

CORE_OBJECTS = $(CORE_SOURCES:.c=.o)
TEST_BSTS = test_bst
TEST_AVLS = test_avl
TEST_RBTS = test_rbt

# ============================================================================
# Main Targets
# ============================================================================

.PHONY: all clean test help run

all: $(BIN_DIR)/tree_trainer

$(BIN_DIR)/tree_trainer: $(MAIN_SOURCES)
	@mkdir -p $(BIN_DIR)
	$(CC) $(CFLAGS) -o $@ $^
	@echo "✓ Built: $(BIN_DIR)/tree_trainer"

# ============================================================================
# Test Targets
# ============================================================================

test: test_bst test_avl test_rbt
	@echo ""
	@echo "=========================================="
	@echo "  Running all unit tests"
	@echo "=========================================="
	@echo ""
	@echo "------- BST Tests -------"
	@./$(TEST_BSTS)
	@echo ""
	@echo "------- AVL Tests -------"
	@./$(TEST_AVLS)
	@echo ""
	@echo "------- RBT Tests -------"
	@./$(TEST_RBTS)
	@echo ""
	@echo "=========================================="
	@echo "  All tests completed!"
	@echo "=========================================="

test_bst: $(SRC_DIR)/bst.c $(TEST_DIR)/test_bst.c
	@mkdir -p $(BIN_DIR)
	$(CC) $(CFLAGS) -o $(TEST_BSTS) $^
	@echo "✓ Built: $(TEST_BSTS)"

test_avl: $(SRC_DIR)/bst.c $(SRC_DIR)/avl.c $(TEST_DIR)/test_avl.c
	@mkdir -p $(BIN_DIR)
	$(CC) $(CFLAGS) -o $(TEST_AVLS) $^
	@echo "✓ Built: $(TEST_AVLS)"

test_rbt: $(SRC_DIR)/bst.c $(SRC_DIR)/rbt.c $(TEST_DIR)/test_rbt.c
	@mkdir -p $(BIN_DIR)
	$(CC) $(CFLAGS) -o $(TEST_RBTS) $^
	@echo "✓ Built: $(TEST_RBTS)"

# ============================================================================
# Utility Targets
# ============================================================================

run: all
	@echo "Starting Tree Trainer..."
	@./$(BIN_DIR)/tree_trainer

clean:
	@echo "Cleaning build artifacts..."
	@rm -f $(SRC_DIR)/*.o
	@rm -f $(TEST_BSTS) $(TEST_AVLS) $(TEST_RBTS)
	@rm -rf $(BIN_DIR)
	@echo "✓ Clean complete"

rebuild: clean all
	@echo "✓ Rebuild complete"

help:
	@echo ""
	@echo "=========================================="
	@echo "  Tree Trainer - Makefile Targets"
	@echo "=========================================="
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Main Targets:"
	@echo "  all          Build main application (default)"
	@echo "  test         Build and run all unit tests"
	@echo "  test_bst     Build and run BST tests only"
	@echo "  test_avl     Build and run AVL tests only"
	@echo "  test_rbt     Build and run RBT tests only"
	@echo "  run          Build and run main application"
	@echo "  clean        Remove all build artifacts"
	@echo "  rebuild      Clean and build everything"
	@echo "  help         Show this help message"
	@echo ""
	@echo "Examples:"
	@echo "  make              # Build main application"
	@echo "  make test         # Run all tests"
	@echo "  make run          # Build and run app"
	@echo "  make clean        # Remove build files"
	@echo ""
	@echo "=========================================="
	@echo ""

# ============================================================================
# Phony target for .o files
# ============================================================================

%.o: %.c
	$(CC) $(CFLAGS) -c -o $@ $<

# ============================================================================
# Default target
# ============================================================================

.DEFAULT_GOAL := all

# ============================================================================
# Print configuration
# ============================================================================

.PHONY: info

info:
	@echo ""
	@echo "=========================================="
	@echo "  Build Configuration"
	@echo "=========================================="
	@echo "Compiler: $(CC)"
	@echo "Flags: $(CFLAGS)"
	@echo "Source Directory: $(SRC_DIR)"
	@echo "Include Directory: $(INC_DIR)"
	@echo "Test Directory: $(TEST_DIR)"
	@echo "Output Directory: $(BIN_DIR)"
	@echo ""
	@echo "Core Sources:"
	@for file in $(CORE_SOURCES); do echo "  - $$file"; done
	@echo ""
	@echo "=========================================="
	@echo ""
