#!/bin/bash
# Test Runner for Tree Explorer Project
# Compiles and runs all test files

echo "╔════════════════════════════════════════╗"
echo "║  🌳 Tree Explorer - Test Suite 🌳     ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
TOTAL=0
PASSED=0
FAILED=0

# Compile flags
CC="gcc"
CFLAGS="-Wall -Wextra -std=c11 -I./include -lm"

echo "📦 Compiling core libraries..."
echo "────────────────────────────"

# Compile core sources
$CC $CFLAGS -c src/bst.c -o build/bst.o 2>&1 | head -20
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Failed to compile bst.c${NC}"
    ((FAILED++))
else
    echo -e "${GREEN}✓ bst.c${NC}"
fi

$CC $CFLAGS -c src/avl.c -o build/avl.o 2>&1 | head -20
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Failed to compile avl.c${NC}"
    ((FAILED++))
else
    echo -e "${GREEN}✓ avl.c${NC}"
fi

$CC $CFLAGS -c src/rbt.c -o build/rbt.o 2>&1 | head -20
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Failed to compile rbt.c${NC}"
    ((FAILED++))
else
    echo -e "${GREEN}✓ rbt.c${NC}"
fi

$CC $CFLAGS -c src/visualize.c -o build/visualize.o 2>&1 | head -20
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Failed to compile visualize.c${NC}"
    ((FAILED++))
else
    echo -e "${GREEN}✓ visualize.c${NC}"
fi

$CC $CFLAGS -c src/app.c -o build/app.o 2>&1 | head -20
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Failed to compile app.c${NC}"
    ((FAILED++))
else
    echo -e "${GREEN}✓ app.c${NC}"
fi

$CC $CFLAGS -c src/quiz.c -o build/quiz.o 2>&1 | head -20
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Failed to compile quiz.c${NC}"
    ((FAILED++))
else
    echo -e "${GREEN}✓ quiz.c${NC}"
fi

echo ""
echo "📝 Building test executables..."
echo "──────────────────────────────"

# Test 1: BST Test
echo -n "Building bst_test... "
$CC $CFLAGS src/bst_test.c build/bst.o -o bin/bst_test 2>&1 | head -10
if [ -f bin/bst_test ]; then
    echo -e "${GREEN}✓${NC}"
    ((TOTAL++))
    ((PASSED++))
else
    echo -e "${RED}✗${NC}"
    ((TOTAL++))
    ((FAILED++))
fi

# Test 2: DEV1 AVL Test
echo -n "Building dev1_test (AVL)... "
$CC $CFLAGS src/dev1_test.c build/avl.o -o bin/dev1_test 2>&1 | head -10
if [ -f bin/dev1_test ]; then
    echo -e "${GREEN}✓${NC}"
    ((TOTAL++))
    ((PASSED++))
else
    echo -e "${RED}✗${NC}"
    ((TOTAL++))
    ((FAILED++))
fi

# Test 3: Unit Test BST
echo -n "Building test_bst (units)... "
$CC $CFLAGS tests/test_bst.c build/bst.o -o bin/test_bst 2>&1 | head -10
if [ -f bin/test_bst ]; then
    echo -e "${GREEN}✓${NC}"
    ((TOTAL++))
    ((PASSED++))
else
    echo -e "${RED}✗${NC}"
    ((TOTAL++))
    ((FAILED++))
fi

# Test 4: Unit Test AVL
echo -n "Building test_avl (units)... "
$CC $CFLAGS tests/test_avl.c build/avl.o -o bin/test_avl 2>&1 | head -10
if [ -f bin/test_avl ]; then
    echo -e "${GREEN}✓${NC}"
    ((TOTAL++))
    ((PASSED++))
else
    echo -e "${RED}✗${NC}"
    ((TOTAL++))
    ((FAILED++))
fi

# Test 5: Unit Test RBT
echo -n "Building test_rbt (units)... "
$CC $CFLAGS tests/test_rbt.c build/rbt.o -o bin/test_rbt 2>&1 | head -10
if [ -f bin/test_rbt ]; then
    echo -e "${GREEN}✓${NC}"
    ((TOTAL++))
    ((PASSED++))
else
    echo -e "${RED}✗${NC}"
    ((TOTAL++))
    ((FAILED++))
fi

# Test 6: Main Application
echo -n "Building main app... "
$CC $CFLAGS src/main.c build/bst.o build/avl.o build/rbt.o build/visualize.o build/app.o build/quiz.o -o bin/tree_explorer 2>&1 | head -10
if [ -f bin/tree_explorer ]; then
    echo -e "${GREEN}✓${NC}"
    ((TOTAL++))
    ((PASSED++))
else
    echo -e "${RED}✗${NC}"
    ((TOTAL++))
    ((FAILED++))
fi

echo ""
echo "🧪 Running tests..."
echo "──────────────────"

# Run BST Test
if [ -f bin/bst_test ]; then
    echo ""
    echo "Test: bst_test"
    echo "──────────────"
    timeout 5 ./bin/bst_test 2>&1 | head -30
fi

# Run AVL Test
if [ -f bin/dev1_test ]; then
    echo ""
    echo "Test: dev1_test (AVL)"
    echo "─────────────────────"
    timeout 5 ./bin/dev1_test 2>&1 | head -30
fi

# Run Unit Tests BST
if [ -f bin/test_bst ]; then
    echo ""
    echo "Test: test_bst (unit)"
    echo "─────────────────────"
    timeout 10 ./bin/test_bst 2>&1 | tail -20
fi

# Run Unit Tests AVL
if [ -f bin/test_avl ]; then
    echo ""
    echo "Test: test_avl (unit)"
    echo "─────────────────────"
    timeout 10 ./bin/test_avl 2>&1 | tail -20
fi

# Run Unit Tests RBT
if [ -f bin/test_rbt ]; then
    echo ""
    echo "Test: test_rbt (unit)"
    echo "─────────────────────"
    timeout 10 ./bin/test_rbt 2>&1 | tail -20
fi

echo ""
echo "════════════════════════════════════════"
echo "📊 Test Summary"
echo "════════════════════════════════════════"
echo -e "Total Builds:  $TOTAL"
echo -e "Passed:        ${GREEN}$PASSED${NC}"
echo -e "Failed:        ${RED}$FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}✗ Some tests failed${NC}"
    exit 1
fi
