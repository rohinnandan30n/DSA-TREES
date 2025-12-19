import React, { useEffect, useRef } from 'react';

interface TreeCanvasProps {
  treeData: any;
  treeType: string;
}

export default function TreeCanvas({ treeData, treeType }: TreeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#f0f4ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw sample tree visualization
    drawSampleTree(ctx, canvas.width, canvas.height, treeType);
  }, [treeData, treeType]);

  const drawSampleTree = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    treeType: string
  ) => {
    ctx.font = '14px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw a sample tree
    const centerX = width / 2;
    const startY = 50;

    // Root node
    ctx.fillStyle = treeType === 'rbt' ? '#d32f2f' : '#667eea';
    ctx.beginPath();
    ctx.arc(centerX, startY, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.fillText('50', centerX, startY);

    // Left child
    const leftX = centerX - 100;
    const leftY = startY + 80;
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, startY + 25);
    ctx.lineTo(leftX, leftY - 25);
    ctx.stroke();

    ctx.fillStyle = treeType === 'rbt' ? '#333' : '#667eea';
    ctx.beginPath();
    ctx.arc(leftX, leftY, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText('30', leftX, leftY);

    // Right child
    const rightX = centerX + 100;
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, startY + 25);
    ctx.lineTo(rightX, leftY - 25);
    ctx.stroke();

    ctx.fillStyle = treeType === 'rbt' ? '#333' : '#667eea';
    ctx.beginPath();
    ctx.arc(rightX, leftY, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText('70', rightX, leftY);

    // Add tree type info
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#667eea';
    ctx.textAlign = 'left';
    ctx.fillText(`Tree Type: ${treeType.toUpperCase()}`, 20, height - 20);
  };

  return (
    <div className="tree-canvas-container">
      <h2>🎨 Tree Visualization</h2>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="tree-canvas"
      />
    </div>
  );
}
