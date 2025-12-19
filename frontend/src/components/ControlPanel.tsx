import React, { useState, useEffect } from 'react';

interface ControlPanelProps {
  treeType: string;
  onTreeUpdate: (data: any) => void;
  searchResult?: any;
  traversals?: { inorder: number[]; preorder: number[]; postorder: number[] } | null;
}

export default function ControlPanel({ treeType, onTreeUpdate, searchResult = null, traversals = null }: ControlPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState<'insert' | 'search' | 'delete'>('insert');
  const [result, setResult] = useState('');

  // Update result when searchResult changes
  useEffect(() => {
    if (operation === 'search' && searchResult) {
      if (searchResult.found) {
        setResult(`${searchResult.message}\n${searchResult.depth}\n${searchResult.path}`);
      } else {
        setResult(searchResult.message);
      }
    }
  }, [searchResult, operation]);

  const handleOperation = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setResult('❌ Please enter a valid number');
      return;
    }

    const actions: Record<string, string> = {
      insert: `✅ Inserted ${value} into ${treeType.toUpperCase()}`,
      search: `🔍 Searching ${value} in tree...`,
      delete: `🗑️ Deleted ${value} from tree`,
    };

    setResult(actions[operation]);
    setInputValue('');

    // Call the actual tree operation
    onTreeUpdate({ value, operation, tree: treeType });
  };

  return (
    <div className="control-panel">
      <h2>⚙️ Operations</h2>
      
      <div className="operation-controls">
        <div className="input-group">
          <label htmlFor="value">Value:</label>
          <input
            id="value"
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a number"
            onKeyPress={(e) => e.key === 'Enter' && handleOperation()}
          />
        </div>

        <div className="operation-select">
          <label htmlFor="operation">Operation:</label>
          <select
            id="operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value as any)}
          >
            <option value="insert">➕ Insert</option>
            <option value="search">🔍 Search</option>
            <option value="delete">🗑️ Delete</option>
          </select>
        </div>

        <button className="execute-btn" onClick={handleOperation}>
          Execute
        </button>
      </div>

      {result && (
        <div className="result-box">
          <p style={{ whiteSpace: 'pre-wrap' }}>{result}</p>
        </div>
      )}

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <button onClick={() => { setInputValue('50'); setOperation('insert'); }}>
          Insert 50
        </button>
        <button onClick={() => { setInputValue('30'); setOperation('insert'); }}>
          Insert 30
        </button>
        <button onClick={() => { setInputValue('70'); setOperation('insert'); }}>
          Insert 70
        </button>
      </div>

      {traversals && (
        <div className="traversals-section">
          <h3>📊 Tree Traversals</h3>
          <div className="traversal-item">
            <strong>Inorder (Left-Root-Right):</strong>
            <p>{traversals.inorder.length > 0 ? traversals.inorder.join(' → ') : 'Empty'}</p>
          </div>
          <div className="traversal-item">
            <strong>Preorder (Root-Left-Right):</strong>
            <p>{traversals.preorder.length > 0 ? traversals.preorder.join(' → ') : 'Empty'}</p>
          </div>
          <div className="traversal-item">
            <strong>Postorder (Left-Right-Root):</strong>
            <p>{traversals.postorder.length > 0 ? traversals.postorder.join(' → ') : 'Empty'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
