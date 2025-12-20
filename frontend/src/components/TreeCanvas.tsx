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
  highlightedNode?: number | null;
  visitedPath?: number[];
  comparisonNode?: number | null;
  operationType?: 'insert' | 'delete' | 'search';
  balanceFactors?: Record<number, number>;
}

interface NodeInfo {
  key: number;
  x: number;
  y: number;
  node: TreeNode;
}

export default function TreeCanvas({ 
  treeData, 
  treeType, 
  highlightedNode, 
  visitedPath = [],
  comparisonNode,
  operationType,
  balanceFactors = {}
}: TreeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodePositionsRef = useRef<Map<number, NodeInfo>>(new Map());

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#f0f4ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    nodePositionsRef.current.clear();

    if (treeData && treeData.tree) {
      drawTree(ctx, treeData.tree, canvas.width, canvas.height, treeType, balanceFactors);
      
      // Draw visited path
      if (visitedPath && visitedPath.length > 0) {
        drawPath(ctx, visitedPath);
      }

      // Highlight current node
      if (highlightedNode !== null && highlightedNode !== undefined) {
        highlightNode(ctx, highlightedNode);
      }

      // Highlight comparison node
      if (comparisonNode !== null && comparisonNode !== undefined) {
        highlightComparisonNode(ctx, comparisonNode);
      }
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
  }, [treeData, treeType, highlightedNode, visitedPath, comparisonNode]);

  const drawPath = (ctx: CanvasRenderingContext2D, path: number[]) => {
    // Draw path connecting nodes
    for (let i = 0; i < path.length - 1; i++) {
      const from = nodePositionsRef.current.get(path[i]);
      const to = nodePositionsRef.current.get(path[i + 1]);
      
      if (from && to) {
        ctx.strokeStyle = '#ff9800';
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }
    }
  };

  const highlightNode = (ctx: CanvasRenderingContext2D, nodeKey: number) => {
    const nodeInfo = nodePositionsRef.current.get(nodeKey);
    if (!nodeInfo) return;

    // Draw highlight circle
    ctx.strokeStyle = '#ff5722';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(nodeInfo.x, nodeInfo.y, 28, 0, Math.PI * 2);
    ctx.stroke();

    // Pulsing effect
    ctx.fillStyle = 'rgba(255, 87, 34, 0.1)';
    ctx.beginPath();
    ctx.arc(nodeInfo.x, nodeInfo.y, 32, 0, Math.PI * 2);
    ctx.fill();
  };

  const highlightComparisonNode = (ctx: CanvasRenderingContext2D, nodeKey: number) => {
    const nodeInfo = nodePositionsRef.current.get(nodeKey);
    if (!nodeInfo) return;

    ctx.strokeStyle = '#2196f3';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(nodeInfo.x, nodeInfo.y, 28, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const drawTree = (
    ctx: CanvasRenderingContext2D,
    node: TreeNode | null,
    width: number,
    height: number,
    treeType: string,
    balanceFactors: Record<number, number> = {},
    x = width / 2,
    y = 40,
    xOffset = width / 4
  ) => {
    if (!node) return;

    // Draw connections to children first
    if (node.left) {
      const leftX = x - xOffset;
      const leftY = y + 80;
      ctx.strokeStyle = visitedPath?.includes(node.left.key) ? '#ff9800' : '#ccc';
      ctx.lineWidth = visitedPath?.includes(node.left.key) ? 3 : 2;
      ctx.beginPath();
      ctx.moveTo(x, y + 20);
      ctx.lineTo(leftX, leftY - 20);
      ctx.stroke();
      drawTree(ctx, node.left, width, height, treeType, balanceFactors, leftX, leftY, xOffset / 2);
    }

    if (node.right) {
      const rightX = x + xOffset;
      const rightY = y + 80;
      ctx.strokeStyle = visitedPath?.includes(node.right.key) ? '#ff9800' : '#ccc';
      ctx.lineWidth = visitedPath?.includes(node.right.key) ? 3 : 2;
      ctx.beginPath();
      ctx.moveTo(x, y + 20);
      ctx.lineTo(rightX, rightY - 20);
      ctx.stroke();
      drawTree(ctx, node.right, width, height, treeType, balanceFactors, rightX, rightY, xOffset / 2);
    }

    // Store node position
    nodePositionsRef.current.set(node.key, { key: node.key, x, y, node });

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

    // Draw balance factor and height for AVL
    if (treeType === 'avl') {
      const bf = balanceFactors[node.key];
      ctx.fillStyle = '#333';
      ctx.font = '9px Arial';
      ctx.textAlign = 'center';
      
      // Balance factor below node
      if (bf !== undefined) {
        ctx.fillText(`bf=${bf}`, x, y + 32);
      }
      
      // Height label
      if (node.height !== undefined) {
        ctx.fillText(`h=${node.height}`, x, y + 44);
      }
    } else if (treeType !== 'rbt') {
      // For BST, show height/depth
      if (node.height !== undefined) {
        ctx.fillStyle = '#666';
        ctx.font = '10px Arial';
        ctx.fillText(`h:${node.height}`, x, y + 35);
      }
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
