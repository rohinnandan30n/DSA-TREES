import { useState, useEffect } from 'react';

interface PlaybackControlsProps {
  currentStep: number;
  totalSteps: number;
  onStepChange: (step: number) => void;
  isRunning: boolean;
  onRunningChange: (running: boolean) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  operationType: 'insert' | 'delete' | 'search';
  operationValue: number;
}

export default function PlaybackControls({
  currentStep,
  totalSteps,
  onStepChange,
  isRunning,
  onRunningChange,
  speed,
  onSpeedChange,
  operationType,
  operationValue,
}: PlaybackControlsProps) {
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      onStepChange(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  const handleReset = () => {
    onStepChange(0);
    onRunningChange(false);
  };

  const handlePlayPause = () => {
    onRunningChange(!isRunning);
  };

  return (
    <div className="playback-controls-container">
      <div className="playback-info">
        <div className="operation-display">
          <span className="op-type">{operationType.toUpperCase()}</span>
          <span className="op-value">{operationValue}</span>
        </div>
        <div className="step-indicator">
          <span className="step-count">Step {currentStep + 1} / {totalSteps}</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      <div className="playback-buttons">
        <button
          className="control-btn reset-btn"
          onClick={handleReset}
          title="Reset to beginning"
        >
          ⏮ Reset
        </button>
        <button
          className="control-btn prev-btn"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          title="Previous step"
        >
          ⏪ Prev
        </button>
        <button
          className={`control-btn play-btn ${isRunning ? 'playing' : ''}`}
          onClick={handlePlayPause}
          title={isRunning ? 'Pause' : 'Play'}
        >
          {isRunning ? '⏸ Pause' : '▶ Play'}
        </button>
        <button
          className="control-btn next-btn"
          onClick={handleNext}
          disabled={currentStep === totalSteps - 1}
          title="Next step"
        >
          Next ⏩
        </button>
      </div>

      <div className="speed-control">
        <label>Speed:</label>
        <input
          type="range"
          min="100"
          max="2000"
          step="100"
          value={speed}
          onChange={(e) => onSpeedChange(parseInt(e.target.value))}
          className="speed-slider"
        />
        <span className="speed-value">{speed}ms</span>
      </div>
    </div>
  );
}
