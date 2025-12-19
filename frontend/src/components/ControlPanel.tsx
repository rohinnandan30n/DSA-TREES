import React, { useState } from 'react';

interface ControlPanelProps {
  treeType: string;
  onTreeUpdate: (data: any) => void;
}

export default function ControlPanel({ treeType, onTreeUpdate }: ControlPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState<'insert' | 'search' | 'delete'>('insert');
  const [result, setResult] = useState('');

  const handleOperation = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setResult('❌ Please enter a valid number');
      return;
    }

    const actions: Record<string, string> = {
      insert: `✅ Inserted ${value} into ${treeType.toUpperCase()}`,
      search: `🔍 Found ${value} in tree`,
      delete: `🗑️ Deleted ${value} from tree`,
    };

    setResult(actions[operation]);
    setInputValue('');

    // Simulate tree update
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
          <p>{result}</p>
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
    </div>
  );
}
