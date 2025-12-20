import { useState } from 'react';
import { BST_CODE, AVL_CODE, RBT_CODE, ExecutionStep } from '../utils/ExecutionTracker';

interface VisualizerPanelProps {
  executionSteps: ExecutionStep[];
  currentStep: number;
  operationType: 'insert' | 'delete' | 'search';
  operationValue: number;
  treeType: 'bst' | 'avl' | 'rbt';
}

export default function VisualizerPanel({
  executionSteps,
  currentStep,
  operationType,
  operationValue,
  treeType,
}: VisualizerPanelProps) {
  const [showVariables, setShowVariables] = useState(true);

  // Get code based on tree type
  const getCode = () => {
    const codeMap = {
      bst: BST_CODE,
      avl: AVL_CODE,
      rbt: RBT_CODE,
    };
    return codeMap[treeType][operationType] || '';
  };

  const currentStepData = executionSteps[currentStep];
  const code = getCode();
  const codeLines = code.split('\n');

  return (
    <div className="visualizer-panel">
      <div className="visualizer-header">
        <h3>📝 Code Execution</h3>
        <div className="visualizer-info">
          <span className="op-badge">{operationType.toUpperCase()}</span>
          <span className="value-badge">Value: {operationValue}</span>
          <span className="step-counter">
            Step {currentStep + 1} / {executionSteps.length}
          </span>
        </div>
      </div>

      <div className="visualizer-content">
        {/* Code Display */}
        <div className="code-display">
          <div className="code-header">
            <h4>{treeType.toUpperCase()} {operationType.charAt(0).toUpperCase() + operationType.slice(1)}</h4>
          </div>
          <div className="code-block">
            {codeLines.map((line, idx) => {
              const lineNum = idx + 1;
              const isCurrentLine = currentStepData?.lineNumber === lineNum;
              const lineParts = line.includes('|') ? line.split('|') : [lineNum.toString(), line];
              return (
                <div
                  key={idx}
                  className={`code-line ${isCurrentLine ? 'highlight' : ''}`}
                >
                  <span className="line-number">{lineParts[0]}</span>
                  <span className="line-content">
                    {lineParts.slice(1).join('|')}
                  </span>
                  {isCurrentLine && <span className="execution-pointer">▶</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Variables and Execution Info */}
        <div className="execution-info">
          <div className="info-section">
            <h4 className="section-title">Current Step</h4>
            {currentStepData && (
              <div className="step-details">
                <p><strong>Line:</strong> {currentStepData.lineNumber}</p>
                <p><strong>Operation:</strong> {currentStepData.operation}</p>
                <p><strong>Description:</strong> {currentStepData.description}</p>
                {currentStepData.balanceFactors && Object.keys(currentStepData.balanceFactors).length > 0 && (
                  <p><strong>Balance Factors:</strong> {Object.entries(currentStepData.balanceFactors).map(([k, v]) => `${k}(bf=${v})`).join(', ')}</p>
                )}
              </div>
            )}
          </div>

          {showVariables && currentStepData?.variables && (
            <div className="info-section">
              <h4 className="section-title">Variables</h4>
              <div className="variables-display">
                {Object.entries(currentStepData.variables).map(([key, value]) => (
                  <div key={key} className="variable-item">
                    <span className="var-name">{key}</span>
                    <span className="var-value">{JSON.stringify(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Variables */}
      <div className="visualizer-footer">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={showVariables}
            onChange={(e) => setShowVariables(e.target.checked)}
          />
          Show Variables
        </label>
      </div>
    </div>
  );
}
