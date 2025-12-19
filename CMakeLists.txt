cmake_minimum_required(VERSION 3.10)
project(TreeTrainer C)

# Set C standard
set(CMAKE_C_STANDARD 11)
set(CMAKE_C_STANDARD_REQUIRED ON)

# Add include directories
include_directories(${CMAKE_SOURCE_DIR}/include)

# ============================================================================
# Source Files
# ============================================================================

set(CORE_SOURCES
    src/bst.c
    src/avl.c
    src/rbt.c
    src/visualize.c
    src/app.c
    src/quiz.c
)

# ============================================================================
# Main Application
# ============================================================================

add_executable(tree_trainer 
    ${CORE_SOURCES}
    src/main.c
)

# ============================================================================
# Unit Tests
# ============================================================================

enable_testing()

# BST Tests
add_executable(test_bst
    src/bst.c
    tests/test_bst.c
)
add_test(NAME test_bst COMMAND test_bst)

# AVL Tests
add_executable(test_avl
    src/bst.c
    src/avl.c
    tests/test_avl.c
)
add_test(NAME test_avl COMMAND test_avl)

# RBT Tests
add_executable(test_rbt
    src/bst.c
    src/rbt.c
    tests/test_rbt.c
)
add_test(NAME test_rbt COMMAND test_rbt)

# ============================================================================
# Compiler Flags
# ============================================================================

if(MSVC)
    # Visual Studio
    add_compile_options(/W4 /WX)
else()
    # GCC / Clang
    add_compile_options(-Wall -Wextra -Wpedantic -Werror)
endif()

# ============================================================================
# Installation
# ============================================================================

install(TARGETS tree_trainer 
        RUNTIME DESTINATION bin)

install(DIRECTORY include/
        DESTINATION include)

# ============================================================================
# Summary
# ============================================================================

message(STATUS "========================================")
message(STATUS "  Tree Trainer Build Configuration")
message(STATUS "========================================")
message(STATUS "Generator: ${CMAKE_GENERATOR}")
message(STATUS "C Standard: ${CMAKE_C_STANDARD}")
message(STATUS "Build Type: ${CMAKE_BUILD_TYPE}")
message(STATUS "Tests Enabled: ON")
message(STATUS "========================================")
