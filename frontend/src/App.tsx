import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import TreeSelector from './TreeSelector';
import TreeCanvas from './TreeCanvas';
import ControlPanel from './ControlPanel';
import QuizPanel from './QuizPanel';

type TreeType = 'bst' | 'avl' | 'rbt';
type ViewMode = 'operations' | 'lessons' | 'quiz' | 'theory';

export default function App() {
  const [selectedTree, setSelectedTree] = useState<TreeType>('bst');
  const [viewMode, setViewMode] = useState<ViewMode>('operations');
  const [treeData, setTreeData] = useState<any>(null);
  const [showSettings, setShowSettings] = useState(false);

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
        </aside>

        <section className="content">
          {viewMode === 'operations' && (
            <>
              <TreeCanvas treeData={treeData} treeType={selectedTree} />
              <ControlPanel 
                treeType={selectedTree}
                onTreeUpdate={setTreeData}
              />
            </>
          )}

          {viewMode === 'quiz' && (
            <QuizPanel treeType={selectedTree} />
          )}

          {viewMode === 'lessons' && (
            <div className="lessons-panel">
              <h2>📚 Interactive Lessons</h2>
              <p>Learn step-by-step how {selectedTree.toUpperCase()} trees work</p>
              <div className="lesson-list">
                <div className="lesson-item">
                  <h3>Introduction to {selectedTree.toUpperCase()}</h3>
                  <p>Understand the basics and properties</p>
                </div>
                <div className="lesson-item">
                  <h3>Insertion Operations</h3>
                  <p>Learn how insertions work and rebalancing</p>
                </div>
                <div className="lesson-item">
                  <h3>Deletion Operations</h3>
                  <p>Master the deletion algorithm</p>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'theory' && (
            <div className="theory-panel">
              <h2>📖 Tree Theory</h2>
              <div className="theory-content">
                <h3>{selectedTree.toUpperCase()} Tree Properties</h3>
                {selectedTree === 'bst' && (
                  <ul>
                    <li>All values in left subtree &lt; parent</li>
                    <li>All values in right subtree &gt; parent</li>
                    <li>Time complexity: O(log n) average, O(n) worst</li>
                  </ul>
                )}
                {selectedTree === 'avl' && (
                  <ul>
                    <li>Self-balancing BST</li>
                    <li>Height difference &lt;= 1</li>
                    <li>Time complexity: O(log n) guaranteed</li>
                    <li>Uses rotations for balancing</li>
                  </ul>
                )}
                {selectedTree === 'rbt' && (
                  <ul>
                    <li>Every node is red or black</li>
                    <li>Root and leaves are black</li>
                    <li>Time complexity: O(log n) guaranteed</li>
                    <li>Uses color and rotations for balancing</li>
                  </ul>
                )}
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
