import React, { useState, useEffect } from 'react';
import './styles/App.css';
import TreeSelector from './components/TreeSelector.tsx';
import TreeCanvas from './components/TreeCanvas.tsx';
import ControlPanel from './components/ControlPanel.tsx';
import QuizPanel from './components/QuizPanel.tsx';
import CodePanel from './components/CodePanel.tsx';
import VisualizerPanel from './components/VisualizerPanel.tsx';
import PlaybackControls from './components/PlaybackControls.tsx';
import { BST } from './utils/BST';
import { AVL, type ExecutionStep } from './utils/AVL';
import { RBT } from './utils/RBT';

type TreeType = 'bst' | 'avl' | 'rbt';
type ViewMode = 'operations' | 'visualizer' | 'lessons' | 'quiz' | 'theory' | 'code';

export default function App() {
  const [selectedTree, setSelectedTree] = useState<TreeType>('bst');
  const [viewMode, setViewMode] = useState<ViewMode>('operations');
  const [treeData, setTreeData] = useState<any>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [lastOperation, setLastOperation] = useState<{ type: 'insert' | 'delete' | 'search'; value: number } | null>(null);
  
  // Keep instances keyed by tree type
  const [instances] = useState({
    bst: new BST(),
    avl: new AVL(),
    rbt: new RBT(),
  });

  const getTreeInstance = () => {
    return instances[selectedTree];
  };

  const handleTreeUpdate = (data: any) => {
    const tree = getTreeInstance();
    const { value, operation } = data;

    try {
      if (operation === 'insert') {
        if (selectedTree === 'bst') {
          const steps = (tree as BST).insertWithTracking(value);
          setExecutionSteps(steps);
          setCurrentStep(0);
        } else if (selectedTree === 'avl') {
          const steps = (tree as AVL).insertWithTracking(value);
          setExecutionSteps(steps);
          setCurrentStep(0);
        } else if (selectedTree === 'rbt') {
          const steps = (tree as RBT).insertWithTracking(value);
          setExecutionSteps(steps);
          setCurrentStep(0);
        } else {
          tree.insert(value);
        }
        setSearchResult(null);
        setLastOperation({ type: 'insert', value });
        setTreeData({
          ...data,
          tree: tree.getRoot(),
          inorder: tree.inorder(),
          preorder: tree.preorder(),
          postorder: tree.postorder(),
          timestamp: Date.now(),
        });
      } else if (operation === 'delete') {
        if (selectedTree === 'bst') {
          const steps = (tree as BST).deleteWithTracking(value);
          setExecutionSteps(steps);
          setCurrentStep(0);
        } else {
          tree.delete(value);
        }
        setSearchResult(null);
        setLastOperation({ type: 'delete', value });
        setTreeData({
          ...data,
          tree: tree.getRoot(),
          inorder: tree.inorder(),
          preorder: tree.preorder(),
          postorder: tree.postorder(),
          timestamp: Date.now(),
        });
      } else if (operation === 'search') {
        if (selectedTree === 'bst') {
          const { result, steps } = (tree as BST).searchWithTracking(value);
          setExecutionSteps(steps);
          setCurrentStep(0);
          if (result.found) {
            setSearchResult({
              found: true,
              message: `✅ Found ${value}!`,
              depth: `Depth: ${result.depth}`,
              path: `Path: ${result.path}`,
            });
          } else {
            setSearchResult({
              found: false,
              message: `❌ ${value} not found`,
              depth: '',
              path: '',
            });
          }
        } else if (selectedTree === 'avl') {
          const { result, steps } = (tree as AVL).searchWithTracking(value);
          setExecutionSteps(steps);
          setCurrentStep(0);
          if (result.found) {
            setSearchResult({
              found: true,
              message: `✅ Found ${value}!`,
              depth: `Depth: ${result.depth}`,
              path: `Path: ${result.path}`,
            });
          } else {
            setSearchResult({
              found: false,
              message: `❌ ${value} not found`,
              depth: '',
              path: '',
            });
          }
        } else if (selectedTree === 'rbt') {
          const { result, steps } = (tree as RBT).searchWithTracking(value);
          setExecutionSteps(steps);
          setCurrentStep(0);
          if (result.found) {
            setSearchResult({
              found: true,
              message: `✅ Found ${value}!`,
              depth: `Depth: ${result.depth}`,
              path: `Path: ${result.path}`,
            });
          } else {
            setSearchResult({
              found: false,
              message: `❌ ${value} not found`,
              depth: '',
              path: '',
            });
          }
        } else {
          const result = tree.search(value);
          if (result.found) {
            setSearchResult({
              found: true,
              message: `✅ Found ${value}!`,
              depth: `Depth: ${result.depth}`,
              path: `Path: ${result.path}`,
            });
          } else {
            setSearchResult({
              found: false,
              message: `❌ ${value} not found`,
              depth: '',
              path: '',
            });
          }
        }
        setLastOperation({ type: 'search', value });
      }
    } catch (e) {
      console.error('Operation error:', e);
      setSearchResult({
        found: false,
        message: '❌ Error during operation',
        depth: '',
        path: '',
      });
    }
  };

  const handleClearTree = () => {
    const tree = getTreeInstance();
    tree.clear();
    setTreeData(null);
    setExecutionSteps([]);
    setCurrentStep(0);
  };

  // Update treeData when selectedTree changes to show the current state of the selected tree
  useEffect(() => {
    const tree = getTreeInstance();
    if (tree.getRoot()) {
      setTreeData({
        tree: tree.getRoot(),
        inorder: tree.inorder(),
        timestamp: Date.now(),
      });
    } else {
      setTreeData(null);
    }
  }, [selectedTree]);

  // Auto-play logic for visualizer
  useEffect(() => {
    if (!isRunning || executionSteps.length === 0) return;
    
    const timer = setTimeout(() => {
      if (currentStep < executionSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsRunning(false);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [isRunning, currentStep, executionSteps.length, speed]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌳 Tree Explorer</h1>
        <p>Interactive Learning Platform for Data Structures</p>
      </header>

      <main className="app-main">
        <aside className="sidebar">
          <TreeSelector 
            selectedTree={selectedTree}
            onSelectTree={setSelectedTree}
            onSelectMode={setViewMode}
            currentMode={viewMode}
          />
          <button className="clear-btn" onClick={handleClearTree}>🔄 Clear Tree</button>
        </aside>

        <section className="content">
          {viewMode === 'operations' && (
            <>
              <TreeCanvas treeData={treeData} treeType={selectedTree} />
              <ControlPanel 
                treeType={selectedTree}
                onTreeUpdate={handleTreeUpdate}
                searchResult={searchResult}
                traversals={treeData ? { inorder: treeData.inorder, preorder: treeData.preorder, postorder: treeData.postorder } : null}
              />
            </>
          )}

          {viewMode === 'visualizer' && (
            <>
              {executionSteps.length > 0 && lastOperation && (
                <PlaybackControls 
                  currentStep={currentStep}
                  totalSteps={executionSteps.length}
                  onStepChange={setCurrentStep}
                  isRunning={isRunning}
                  onRunningChange={setIsRunning}
                  speed={speed}
                  onSpeedChange={setSpeed}
                  operationType={lastOperation.type}
                  operationValue={lastOperation.value}
                />
              )}
              {executionSteps.length > 0 && (
                <TreeCanvas 
                  treeData={treeData} 
                  treeType={selectedTree}
                  highlightedNode={executionSteps[currentStep]?.currentNode}
                  visitedPath={executionSteps[currentStep]?.visitedPath}
                  comparisonNode={executionSteps[currentStep]?.comparisonNode}
                  operationType={lastOperation?.type}
                  balanceFactors={selectedTree === 'avl' ? (executionSteps[currentStep]?.balanceFactors || {}) : {}}
                />
              )}
              {executionSteps.length === 0 && (
                <TreeCanvas treeData={treeData} treeType={selectedTree} />
              )}
              <ControlPanel 
                treeType={selectedTree}
                onTreeUpdate={handleTreeUpdate}
                searchResult={searchResult}
                traversals={treeData ? { inorder: treeData.inorder, preorder: treeData.preorder, postorder: treeData.postorder } : null}
              />
              {executionSteps.length > 0 && lastOperation && (
                <VisualizerPanel 
                  executionSteps={executionSteps}
                  currentStep={currentStep}
                  operationType={lastOperation.type}
                  operationValue={lastOperation.value}
                  treeType={selectedTree}
                />
              )}
            </>
          )}

          {viewMode === 'quiz' && (
            <QuizPanel treeType={selectedTree} />
          )}

          {viewMode === 'lessons' && (
            <div className="lessons-panel">
              <h2>📚 Interactive Lessons</h2>
              <p>Learn step-by-step how {selectedTree.toUpperCase()} trees work</p>
              
              {selectedTree === 'bst' && (
                <div className="lesson-list">
                  <div className="lesson-item">
                    <h3>1️⃣ Introduction to BST</h3>
                    <p><strong>What is a Binary Search Tree?</strong></p>
                    <p>A Binary Search Tree is a binary tree where each node has at most two children (left and right), and follows the BST property: all values in the left subtree are less than the node's value, and all values in the right subtree are greater.</p>
                    <p><strong>Key Characteristics:</strong></p>
                    <ul>
                      <li>Every node has 0, 1, or 2 children</li>
                      <li>Left child &lt; Parent &lt; Right child</li>
                      <li>No duplicate values allowed</li>
                      <li>Easy to search and retrieve data</li>
                    </ul>
                  </div>
                  
                  <div className="lesson-item">
                    <h3>2️⃣ Insertion Operations</h3>
                    <p><strong>How to Insert a Node:</strong></p>
                    <ol>
                      <li>Start at the root</li>
                      <li>If new value &lt; current node: go left</li>
                      <li>If new value &gt; current node: go right</li>
                      <li>If empty position found: insert new node there</li>
                      <li>Time: O(log n) average, O(n) worst case</li>
                    </ol>
                    <p><strong>Example:</strong> Inserting 50, 30, 70, 20, 40 creates a balanced tree structure</p>
                  </div>
                  
                  <div className="lesson-item">
                    <h3>3️⃣ Deletion Operations</h3>
                    <p><strong>Three Cases for Deletion:</strong></p>
                    <p><strong>Case 1 - Leaf Node:</strong> Simply remove it</p>
                    <p><strong>Case 2 - One Child:</strong> Replace node with its child</p>
                    <p><strong>Case 3 - Two Children:</strong> Replace with inorder successor (smallest in right subtree) or inorder predecessor (largest in left subtree)</p>
                    <p>Time: O(log n) average, O(n) worst case</p>
                  </div>
                  
                  <div className="lesson-item">
                    <h3>4️⃣ Search Operation</h3>
                    <p><strong>Binary Search Property:</strong></p>
                    <p>Start at root and follow BST property to navigate tree</p>
                    <ul>
                      <li>If target &lt; current: search left subtree</li>
                      <li>If target &gt; current: search right subtree</li>
                      <li>If target == current: found!</li>
                    </ul>
                    <p>Time: O(log n) average, O(n) worst case</p>
                  </div>
                </div>
              )}

              {selectedTree === 'avl' && (
                <div className="lesson-list">
                  <div className="lesson-item">
                    <h3>1️⃣ Introduction to AVL Trees</h3>
                    <p><strong>What is an AVL Tree?</strong></p>
                    <p>An AVL tree is a self-balancing Binary Search Tree where the heights of the two child subtrees of any node differ by at most 1. Named after inventors Adelson-Velsky and Landis.</p>
                    <p><strong>Key Characteristics:</strong></p>
                    <ul>
                      <li>Self-balancing binary search tree</li>
                      <li>Balance Factor = Height(Left) - Height(Right)</li>
                      <li>Valid Balance Factor: -1, 0, or 1</li>
                      <li>Guarantees O(log n) for all operations</li>
                    </ul>
                  </div>
                  
                  <div className="lesson-item">
                    <h3>2️⃣ Balance Factor & Height</h3>
                    <p><strong>Balance Factor Calculation:</strong></p>
                    <p>BF = Height of Left Subtree - Height of Right Subtree</p>
                    <ul>
                      <li>BF = 0: Perfectly balanced</li>
                      <li>BF = 1: Left heavy (acceptable)</li>
                      <li>BF = -1: Right heavy (acceptable)</li>
                      <li>|BF| &gt; 1: Unbalanced, needs rotation</li>
                    </ul>
                    <p><strong>Height:</strong> Maximum edges from node to leaf</p>
                  </div>
                  
                  <div className="lesson-item">
                    <h3>3️⃣ Rotations - The Key to Balance</h3>
                    <p><strong>Four Types of Rotations:</strong></p>
                    <p><strong>Left Rotation (LL):</strong> Right-heavy node rotated left</p>
                    <p><strong>Right Rotation (RR):</strong> Left-heavy node rotated right</p>
                    <p><strong>Left-Right Rotation (LR):</strong> Left child rotated left, then node rotated right</p>
                    <p><strong>Right-Left Rotation (RL):</strong> Right child rotated right, then node rotated left</p>
                  </div>
                  
                  <div className="lesson-item">
                    <h3>4️⃣ Insertion with Balancing</h3>
                    <p><strong>Steps:</strong></p>
                    <ol>
                      <li>Insert like normal BST</li>
                      <li>Update heights of ancestors</li>
                      <li>Check balance factor of ancestors</li>
                      <li>If |BF| &gt; 1, perform appropriate rotation</li>
                    </ol>
                    <p>Time: O(log n), Space: O(log n)</p>
                  </div>
                </div>
              )}

              {selectedTree === 'rbt' && (
                <div className="lesson-list">
                  <div className="lesson-item">
                    <h3>1️⃣ Introduction to Red-Black Trees</h3>
                    <p><strong>What is a Red-Black Tree?</strong></p>
                    <p>A Red-Black Tree is a binary search tree with an extra color attribute (RED or BLACK) for each node. It maintains balance through color properties instead of height balancing.</p>
                    <p><strong>Key Characteristics:</strong></p>
                    <ul>
                      <li>Each node is colored RED or BLACK</li>
                      <li>Self-balancing through color constraints</li>
                      <li>Guarantees O(log n) for all operations</li>
                      <li>Used in many standard libraries (Java TreeMap, C++ std::map)</li>
                    </ul>
                  </div>
                  
                  <div className="lesson-item">
                    <h3>2️⃣ Red-Black Tree Properties</h3>
                    <p><strong>Five Properties that Must Hold:</strong></p>
                    <ol>
                      <li><strong>Color Property:</strong> Every node is RED or BLACK</li>
                      <li><strong>Root Property:</strong> Root is always BLACK</li>
                      <li><strong>Leaf Property:</strong> All leaves (NIL) are BLACK</li>
                      <li><strong>Red Property:</strong> No two RED nodes can be adjacent (RED node has BLACK children)</li>
                      <li><strong>Black Height Property:</strong> All paths from node to leaves have same number of BLACK nodes</li>
                    </ol>
                  </div>
                  
                  <div className="lesson-item">
                    <h3>3️⃣ Insertion in Red-Black Trees</h3>
                    <p><strong>Insertion Process:</strong></p>
                    <ol>
                      <li>Insert new node as RED (following BST rules)</li>
                      <li>If uncle is RED: recolor parent, uncle, grandparent</li>
                      <li>If uncle is BLACK: perform rotations and recoloring</li>
                      <li>Always ensure root is BLACK</li>
                    </ol>
                    <p><strong>Fix Cases:</strong> Case 1 (Uncle RED), Case 2 (LR/RL), Case 3 (LL/RR)</p>
                  </div>
                  
                  <div className="lesson-item">
                    <h3>4️⃣ Advantages & Applications</h3>
                    <p><strong>Why Use Red-Black Trees?</strong></p>
                    <ul>
                      <li>Guaranteed O(log n) operations</li>
                      <li>Fewer rotations than AVL trees (better for frequent insertions)</li>
                      <li>More cache-friendly in practice</li>
                      <li>Maintains BST property</li>
                    </ul>
                    <p><strong>Real-World Uses:</strong> Linux kernel, Java HashMap, C++ STL maps</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {viewMode === 'theory' && (
            <div className="theory-panel">
              <h2>📖 Tree Theory & Analysis</h2>
              
              {selectedTree === 'bst' && (
                <div className="theory-content">
                  <h3>Binary Search Tree (BST)</h3>
                  
                  <div className="theory-section">
                    <h4>🏗️ Structure Definition</h4>
                    <p><strong>BST Property:</strong> For every node n:</p>
                    <ul>
                      <li>All values in left subtree &lt; n.value</li>
                      <li>All values in right subtree &gt; n.value</li>
                      <li>No duplicate values</li>
                    </ul>
                  </div>

                  <div className="theory-section">
                    <h4>⏱️ Time Complexity</h4>
                    <table className="complexity-table">
                      <tr>
                        <th>Operation</th>
                        <th>Best Case</th>
                        <th>Average Case</th>
                        <th>Worst Case</th>
                      </tr>
                      <tr>
                        <td>Search</td>
                        <td>O(1)</td>
                        <td>O(log n)</td>
                        <td>O(n)</td>
                      </tr>
                      <tr>
                        <td>Insert</td>
                        <td>O(log n)</td>
                        <td>O(log n)</td>
                        <td>O(n)</td>
                      </tr>
                      <tr>
                        <td>Delete</td>
                        <td>O(log n)</td>
                        <td>O(log n)</td>
                        <td>O(n)</td>
                      </tr>
                    </table>
                  </div>

                  <div className="theory-section">
                    <h4>🎯 Advantages</h4>
                    <ul>
                      <li>Simple to understand and implement</li>
                      <li>Natural data ordering</li>
                      <li>Efficient for moderate amounts of data</li>
                      <li>In-order traversal gives sorted sequence</li>
                    </ul>
                  </div>

                  <div className="theory-section">
                    <h4>⚠️ Disadvantages</h4>
                    <ul>
                      <li>Can become unbalanced (skewed)</li>
                      <li>Worst case O(n) for operations if skewed</li>
                      <li>Sequential insertions create linked list structure</li>
                      <li>Not suitable for real-time systems</li>
                    </ul>
                  </div>

                  <div className="theory-section">
                    <h4>📐 Space Complexity</h4>
                    <p>O(n) - where n is the number of nodes</p>
                  </div>
                </div>
              )}

              {selectedTree === 'avl' && (
                <div className="theory-content">
                  <h3>AVL Tree (Self-Balancing BST)</h3>
                  
                  <div className="theory-section">
                    <h4>🏗️ Structure Definition</h4>
                    <p>An AVL tree is a BST with the following additional property:</p>
                    <p><strong>Balance Property:</strong> |Height(Left) - Height(Right)| ≤ 1 for all nodes</p>
                    <p><strong>Balance Factor (BF):</strong> Height(Left) - Height(Right)</p>
                    <p>Valid BF values: {-1, 0, 1}</p>
                  </div>

                  <div className="theory-section">
                    <h4>⏱️ Time Complexity</h4>
                    <table className="complexity-table">
                      <tr>
                        <th>Operation</th>
                        <th>Best Case</th>
                        <th>Average Case</th>
                        <th>Worst Case</th>
                      </tr>
                      <tr>
                        <td>Search</td>
                        <td>O(log n)</td>
                        <td>O(log n)</td>
                        <td>O(log n)</td>
                      </tr>
                      <tr>
                        <td>Insert</td>
                        <td>O(log n)</td>
                        <td>O(log n)</td>
                        <td>O(log n)</td>
                      </tr>
                      <tr>
                        <td>Delete</td>
                        <td>O(log n)</td>
                        <td>O(log n)</td>
                        <td>O(log n)</td>
                      </tr>
                    </table>
                  </div>

                  <div className="theory-section">
                    <h4>🔄 Rotation Operations</h4>
                    <p><strong>Left Rotation:</strong> Moves node to left, right child becomes new parent</p>
                    <p><strong>Right Rotation:</strong> Moves node to right, left child becomes new parent</p>
                    <p><strong>Time per rotation:</strong> O(1) - only pointers change</p>
                  </div>

                  <div className="theory-section">
                    <h4>🎯 Advantages</h4>
                    <ul>
                      <li>Guaranteed O(log n) for all operations</li>
                      <li>Maintains strict balance</li>
                      <li>Good for frequent searches</li>
                      <li>Height: O(log n) always</li>
                    </ul>
                  </div>

                  <div className="theory-section">
                    <h4>⚠️ Disadvantages</h4>
                    <ul>
                      <li>More complex implementation</li>
                      <li>More rotations during insertions/deletions</li>
                      <li>Higher overhead for updates</li>
                    </ul>
                  </div>

                  <div className="theory-section">
                    <h4>📊 Height Analysis</h4>
                    <p>For an AVL tree with n nodes:</p>
                    <p>Height ≤ 1.44 × log₂(n + 1)</p>
                  </div>
                </div>
              )}

              {selectedTree === 'rbt' && (
                <div className="theory-content">
                  <h3>Red-Black Tree</h3>
                  
                  <div className="theory-section">
                    <h4>🏗️ Structure Definition</h4>
                    <p><strong>Five Red-Black Properties:</strong></p>
                    <ol>
                      <li>Every node is RED or BLACK</li>
                      <li>Root node is always BLACK</li>
                      <li>All leaves (NIL) are BLACK</li>
                      <li>If a node is RED, both children must be BLACK</li>
                      <li>Every path from node to leaves has same BLACK node count</li>
                    </ol>
                  </div>

                  <div className="theory-section">
                    <h4>⏱️ Time Complexity</h4>
                    <table className="complexity-table">
                      <tr>
                        <th>Operation</th>
                        <th>Best Case</th>
                        <th>Average Case</th>
                        <th>Worst Case</th>
                      </tr>
                      <tr>
                        <td>Search</td>
                        <td>O(log n)</td>
                        <td>O(log n)</td>
                        <td>O(log n)</td>
                      </tr>
                      <tr>
                        <td>Insert</td>
                        <td>O(log n)</td>
                        <td>O(log n)</td>
                        <td>O(log n)</td>
                      </tr>
                      <tr>
                        <td>Delete</td>
                        <td>O(log n)</td>
                        <td>O(log n)</td>
                        <td>O(log n)</td>
                      </tr>
                    </table>
                  </div>

                  <div className="theory-section">
                    <h4>📐 Height Bound</h4>
                    <p>Maximum height h ≤ 2 × log₂(n + 1)</p>
                    <p>This is because black-height must satisfy color constraints</p>
                  </div>

                  <div className="theory-section">
                    <h4>🎨 Coloring Rules</h4>
                    <ul>
                      <li>New nodes are inserted as RED</li>
                      <li>Root is always BLACK</li>
                      <li>RED nodes cannot have RED children</li>
                      <li>Recoloring happens during fix-up</li>
                    </ul>
                  </div>

                  <div className="theory-section">
                    <h4>🎯 Advantages</h4>
                    <ul>
                      <li>Guaranteed O(log n) operations</li>
                      <li>Fewer rotations than AVL trees</li>
                      <li>Better cache locality</li>
                      <li>Easier to implement than AVL</li>
                      <li>Used in most production systems</li>
                    </ul>
                  </div>

                  <div className="theory-section">
                    <h4>📚 Real-World Applications</h4>
                    <ul>
                      <li>Java: TreeMap, TreeSet</li>
                      <li>C++: std::map, std::set</li>
                      <li>Linux Kernel: ext4 filesystem</li>
                      <li>Python: OrderedDict (older versions)</li>
                      <li>Chrome V8 JavaScript Engine</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {viewMode === 'code' && selectedTree !== 'rbt' && (
            <CodePanel treeType={selectedTree} />
          )}

          {viewMode === 'code' && selectedTree === 'rbt' && (
            <div className="code-panel">
              <h2>💻 Implementation Code</h2>
              <p>Red-Black Tree implementation coming soon!</p>
              <div className="coming-soon">
                <p>Red-Black Tree code is currently available in the Theory section.</p>
                <p>You can switch to BST or AVL to view their implementation code.</p>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>🚀 Tree Explorer v1.0 | Interactive Data Structure Learning Platform</p>
      </footer>
    </div>
  );
}
