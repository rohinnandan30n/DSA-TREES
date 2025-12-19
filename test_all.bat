@echo off
REM Test Runner for Tree Explorer - Windows Version
REM Compiles and runs all test files

setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════╗
echo ║  🌳 Tree Explorer - Test Suite 🌳     ║
echo ╚════════════════════════════════════════╝
echo.

REM Check if directories exist
if not exist build mkdir build
if not exist bin mkdir bin

set TOTAL=0
set PASSED=0
set FAILED=0

set CC=gcc
set CFLAGS=-Wall -Wextra -std=c11 -I./include -lm

echo 📦 Compiling core libraries...
echo ────────────────────────────

echo Compiling bst.c...
%CC% %CFLAGS% -c src/bst.c -o build/bst.o
if errorlevel 1 (
    echo [FAIL] bst.c
    set /a FAILED=!FAILED!+1
) else (
    echo [OK] bst.c
    set /a PASSED=!PASSED!+1
)

echo Compiling avl.c...
%CC% %CFLAGS% -c src/avl.c -o build/avl.o
if errorlevel 1 (
    echo [FAIL] avl.c
    set /a FAILED=!FAILED!+1
) else (
    echo [OK] avl.c
    set /a PASSED=!PASSED!+1
)

echo Compiling rbt.c...
%CC% %CFLAGS% -c src/rbt.c -o build/rbt.o
if errorlevel 1 (
    echo [FAIL] rbt.c
    set /a FAILED=!FAILED!+1
) else (
    echo [OK] rbt.c
    set /a PASSED=!PASSED!+1
)

echo Compiling visualize.c...
%CC% %CFLAGS% -c src/visualize.c -o build/visualize.o
if errorlevel 1 (
    echo [FAIL] visualize.c
    set /a FAILED=!FAILED!+1
) else (
    echo [OK] visualize.c
    set /a PASSED=!PASSED!+1
)

echo Compiling app.c...
%CC% %CFLAGS% -c src/app.c -o build/app.o
if errorlevel 1 (
    echo [FAIL] app.c
    set /a FAILED=!FAILED!+1
) else (
    echo [OK] app.c
    set /a PASSED=!PASSED!+1
)

echo Compiling quiz.c...
%CC% %CFLAGS% -c src/quiz.c -o build/quiz.o
if errorlevel 1 (
    echo [FAIL] quiz.c
    set /a FAILED=!FAILED!+1
) else (
    echo [OK] quiz.c
    set /a PASSED=!PASSED!+1
)

echo.
echo 📝 Building test executables...
echo ──────────────────────────────

echo Building bst_test...
%CC% %CFLAGS% src/bst_test.c build/bst.o -o bin/bst_test.exe
if errorlevel 1 (
    echo [FAIL] bst_test
) else (
    echo [OK] bst_test
)

echo Building dev1_test...
%CC% %CFLAGS% src/dev1_test.c build/avl.o -o bin/dev1_test.exe
if errorlevel 1 (
    echo [FAIL] dev1_test
) else (
    echo [OK] dev1_test
)

echo Building test_bst...
%CC% %CFLAGS% tests/test_bst.c build/bst.o -o bin/test_bst.exe
if errorlevel 1 (
    echo [FAIL] test_bst
) else (
    echo [OK] test_bst
)

echo Building test_avl...
%CC% %CFLAGS% tests/test_avl.c build/avl.o -o bin/test_avl.exe
if errorlevel 1 (
    echo [FAIL] test_avl
) else (
    echo [OK] test_avl
)

echo Building test_rbt...
%CC% %CFLAGS% tests/test_rbt.c build/rbt.o -o bin/test_rbt.exe
if errorlevel 1 (
    echo [FAIL] test_rbt
) else (
    echo [OK] test_rbt
)

echo Building tree_explorer...
%CC% %CFLAGS% src/main.c build/bst.o build/avl.o build/rbt.o build/visualize.o build/app.o build/quiz.o -o bin/tree_explorer.exe
if errorlevel 1 (
    echo [FAIL] tree_explorer
) else (
    echo [OK] tree_explorer
)

echo.
echo 🧪 Running tests...
echo ──────────────────

if exist bin\bst_test.exe (
    echo.
    echo Test: bst_test
    echo ──────────────
    bin\bst_test.exe
)

if exist bin\dev1_test.exe (
    echo.
    echo Test: dev1_test
    echo ──────────────
    bin\dev1_test.exe
)

if exist bin\test_bst.exe (
    echo.
    echo Test: test_bst (unit tests)
    echo ────────────────────────────
    bin\test_bst.exe
)

if exist bin\test_avl.exe (
    echo.
    echo Test: test_avl (unit tests)
    echo ────────────────────────────
    bin\test_avl.exe
)

if exist bin\test_rbt.exe (
    echo.
    echo Test: test_rbt (unit tests)
    echo ────────────────────────────
    bin\test_rbt.exe
)

if exist bin\tree_explorer.exe (
    echo.
    echo ════════════════════════════════════════
    echo ✓ All executables built successfully!
    echo ════════════════════════════════════════
    echo.
    echo Main application: bin\tree_explorer.exe
)

echo.
pause
