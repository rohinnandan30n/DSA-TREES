import React from 'react';

interface TreeSelectorProps {
  selectedTree: string;
  onSelectTree: (tree: string) => void;
  onSelectMode: (mode: any) => void;
  currentMode: string;
}

export default function TreeSelector({
  selectedTree,
  onSelectTree,
  onSelectMode,
  currentMode,
}: TreeSelectorProps) {
  return (
    <div className="tree-selector">
      <h2>🌳 Select Tree Type</h2>
      
      <div className="tree-buttons">
        <button
          className={`tree-btn ${selectedTree === 'bst' ? 'active' : ''}`}
          onClick={() => onSelectTree('bst')}
        >
          <span className="icon">🔍</span>
          <span className="name">Binary Search Tree</span>
        </button>
        
        <button
          className={`tree-btn ${selectedTree === 'avl' ? 'active' : ''}`}
          onClick={() => onSelectTree('avl')}
        >
          <span className="icon">⚖️</span>
          <span className="name">AVL Tree</span>
        </button>
        
        <button
          className={`tree-btn ${selectedTree === 'rbt' ? 'active' : ''}`}
          onClick={() => onSelectTree('rbt')}
        >
          <span className="icon">🔴</span>
          <span className="name">Red-Black Tree</span>
        </button>
      </div>

      <h3>📋 Mode</h3>
      <div className="mode-buttons">
        <button
          className={`mode-btn ${currentMode === 'operations' ? 'active' : ''}`}
          onClick={() => onSelectMode('operations')}
        >
          ⚙️ Operations
        </button>
        <button
          className={`mode-btn ${currentMode === 'lessons' ? 'active' : ''}`}
          onClick={() => onSelectMode('lessons')}
        >
          📚 Lessons
        </button>
        <button
          className={`mode-btn ${currentMode === 'quiz' ? 'active' : ''}`}
          onClick={() => onSelectMode('quiz')}
        >
          🎯 Quiz
        </button>
        <button
          className={`mode-btn ${currentMode === 'theory' ? 'active' : ''}`}
          onClick={() => onSelectMode('theory')}
        >
          📖 Theory
        </button>
        <button
          className={`mode-btn ${currentMode === 'code' ? 'active' : ''}`}
          onClick={() => onSelectMode('code')}
        >
          💻 Code
        </button>
      </div>

      <div className="info-box">
        <h4>💡 Tip</h4>
        <p>Select a tree type and choose how you'd like to explore it!</p>
      </div>
    </div>
  );
}
