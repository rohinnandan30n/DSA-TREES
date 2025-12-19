import React, { useEffect, useRef } from 'react';

interface TreeNode {
  key: number;
  left: TreeNode | null;
  right: TreeNode | null;
  height?: number;
  color?: string;
}

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

    if (treeData && treeData.tree) {
      drawTree(ctx, treeData.tree, canvas.width, canvas.height, treeType);
    } else {
      ctx.font = '14px Arial';
      ctx.fillStyle = '#999';
      ctx.textAlign = 'center';
      ctx.fillText('Tree is empty. Insert values to visualize.', canvas.width / 2, canvas.height / 2);
    }

    // Draw tree info
    if (treeData && treeData.inorder) {
      ctx.font = '12px Arial';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'left';
      ctx.fillText(`Inorder: [${treeData.inorder.join(', ')}]`, 20, canvas.height - 10);
    }
  }, [treeData, treeType]);

  const drawTree = (
    ctx: CanvasRenderingContext2D,
    node: TreeNode | null,
    width: number,
    height: number,
    treeType: string,
    x = width / 2,
    y = 40,
    xOffset = width / 4
  ) => {
    if (!node) return;

    // Draw connections to children first
    if (node.left) {
      const leftX = x - xOffset;
      const leftY = y + 80;
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y + 20);
      ctx.lineTo(leftX, leftY - 20);
      ctx.stroke();
      drawTree(ctx, node.left, width, height, treeType, leftX, leftY, xOffset / 2);
    }

    if (node.right) {
      const rightX = x + xOffset;
      const rightY = y + 80;
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y + 20);
      ctx.lineTo(rightX, rightY - 20);
      ctx.stroke();
      drawTree(ctx, node.right, width, height, treeType, rightX, rightY, xOffset / 2);
    }

    // Draw node
    const nodeColor = getNodeColor(node, treeType);
    ctx.fillStyle = nodeColor;
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw text
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.key.toString(), x, y);

    // Draw height/depth for AVL
    if (treeType === 'avl' && node.height !== undefined) {
      ctx.fillStyle = '#666';
      ctx.font = '10px Arial';
      ctx.fillText(`h:${node.height}`, x, y + 35);
    }
  };

  const getNodeColor = (node: TreeNode, treeType: string): string => {
    if (treeType === 'rbt') {
      return node.color === 'RED' ? '#d32f2f' : '#1a1a1a';
    } else if (treeType === 'avl') {
      return '#667eea';
    } else {
      return '#4caf50';
    }
  };

  return (
    <div className="tree-canvas-container">
      <h2>🎨 Tree Visualization</h2>
      <canvas
        ref={canvasRef}
        width={700}
        height={450}
        className="tree-canvas"
      />
    </div>
  );
}
