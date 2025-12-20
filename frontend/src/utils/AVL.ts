export interface AVLNode {
  key: number;
  left: AVLNode | null;
  right: AVLNode | null;
  height: number;
}

export interface SearchResult {
  found: boolean;
  key?: number;
  depth?: number;
  path?: string;
}

export interface ExecutionStep {
  lineNumber: number;
  code: string;
  variables: Record<string, any>;
  operation: string;
  description: string;
  currentNode?: number;
  visitedPath?: number[];
  comparisonNode?: number;
  balanceFactors?: Record<number, number>;
  highlightedNodes?: number[];
  rotationType?: string;
}

export class AVL {
  root: AVLNode | null = null;
  executionSteps: ExecutionStep[] = [];

  insert(key: number): void {
    this.root = this._insert(this.root, key);
  }

  insertWithTracking(key: number): ExecutionStep[] {
    this.executionSteps = [];
    this.root = this._insertTrackedWithPath(this.root, key, []);
    return this.executionSteps;
  }

  private _insertTrackedWithPath(node: AVLNode | null, key: number, path: number[]): AVLNode {
    const currentPath = [...path];
    
    if (!node) {
      this.executionSteps.push({
        lineNumber: 6,
        code: 'if (!node) return new AVLNode(key)',
        operation: 'create',
        description: `Creating new AVL node with key=${key}`,
        variables: { key },
        currentNode: key,
        visitedPath: [...currentPath, key],
        balanceFactors: this._getBalanceFactors(this.root),
      });
      return { key, left: null, right: null, height: 1 };
    }

    currentPath.push(node.key);
    this.executionSteps.push({
      lineNumber: 8,
      code: 'if (key < node.key) { node.left = _insert(...) }',
      operation: 'enter',
      description: `At node ${node.key}, comparing with ${key}`,
      variables: { nodeKey: node.key, key, height: node.height },
      currentNode: node.key,
      visitedPath: currentPath,
      comparisonNode: node.key,
      balanceFactors: this._getBalanceFactors(this.root),
    });

    if (key < node.key) {
      node.left = this._insertTrackedWithPath(node.left, key, currentPath);
    } else if (key > node.key) {
      node.right = this._insertTrackedWithPath(node.right, key, currentPath);
    } else {
      return node;
    }

    const oldHeight = node.height;
    node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));

    this.executionSteps.push({
      lineNumber: 18,
      code: 'node.height = 1 + Math.max(left.height, right.height)',
      operation: 'update-height',
      description: `Updated height of node ${node.key}: ${oldHeight} → ${node.height}`,
      variables: { nodeKey: node.key, newHeight: node.height },
      currentNode: node.key,
      visitedPath: currentPath,
      balanceFactors: this._getBalanceFactors(this.root),
    });

    const bf = this._getBalance(node);

    this.executionSteps.push({
      lineNumber: 20,
      code: 'const bf = getBalance(node)',
      operation: 'check-balance',
      description: `Balance factor of node ${node.key}: bf=${bf}`,
      variables: { nodeKey: node.key, balanceFactor: bf },
      currentNode: node.key,
      visitedPath: currentPath,
      balanceFactors: this._getBalanceFactors(this.root),
    });

    // LL Rotation
    if (bf > 1 && node.left && key < node.left.key) {
      this.executionSteps.push({
        lineNumber: 23,
        code: 'if (bf > 1 && key < node.left.key) return rotateRight(node)',
        operation: 'rotate',
        description: `LL Rotation at node ${node.key}`,
        variables: { nodeKey: node.key, rotationType: 'LL' },
        currentNode: node.key,
        visitedPath: currentPath,
        highlightedNodes: [node.key, node.left.key],
        rotationType: 'LL',
        balanceFactors: this._getBalanceFactors(this.root),
      });
      return this._rotateRight(node);
    }

    // RR Rotation
    if (bf < -1 && node.right && key > node.right.key) {
      this.executionSteps.push({
        lineNumber: 27,
        code: 'if (bf < -1 && key > node.right.key) return rotateLeft(node)',
        operation: 'rotate',
        description: `RR Rotation at node ${node.key}`,
        variables: { nodeKey: node.key, rotationType: 'RR' },
        currentNode: node.key,
        visitedPath: currentPath,
        highlightedNodes: [node.key, node.right.key],
        rotationType: 'RR',
        balanceFactors: this._getBalanceFactors(this.root),
      });
      return this._rotateLeft(node);
    }

    // LR Rotation
    if (bf > 1 && node.left && key > node.left.key) {
      this.executionSteps.push({
        lineNumber: 31,
        code: 'if (bf > 1 && key > node.left.key) return rotateLR(node)',
        operation: 'rotate',
        description: `LR Rotation at node ${node.key}`,
        variables: { nodeKey: node.key, rotationType: 'LR' },
        currentNode: node.key,
        visitedPath: currentPath,
        highlightedNodes: [node.key, node.left.key],
        rotationType: 'LR',
        balanceFactors: this._getBalanceFactors(this.root),
      });
      node.left = this._rotateLeft(node.left);
      return this._rotateRight(node);
    }

    // RL Rotation
    if (bf < -1 && node.right && key < node.right.key) {
      this.executionSteps.push({
        lineNumber: 35,
        code: 'if (bf < -1 && key < node.right.key) return rotateRL(node)',
        operation: 'rotate',
        description: `RL Rotation at node ${node.key}`,
        variables: { nodeKey: node.key, rotationType: 'RL' },
        currentNode: node.key,
        visitedPath: currentPath,
        highlightedNodes: [node.key, node.right.key],
        rotationType: 'RL',
        balanceFactors: this._getBalanceFactors(this.root),
      });
      node.right = this._rotateRight(node.right);
      return this._rotateLeft(node);
    }

    return node;
  }

  private _insert(node: AVLNode | null, key: number): AVLNode {
    if (!node) {
      return { key, left: null, right: null, height: 1 };
    }

    if (key < node.key) {
      node.left = this._insert(node.left, key);
    } else if (key > node.key) {
      node.right = this._insert(node.right, key);
    } else {
      return node; // No duplicates
    }

    node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));

    const bf = this._getBalance(node);

    // LL
    if (bf > 1 && key < node.left!.key) {
      return this._rotateRight(node);
    }

    // RR
    if (bf < -1 && key > node.right!.key) {
      return this._rotateLeft(node);
    }

    // LR
    if (bf > 1 && key > node.left!.key) {
      node.left = this._rotateLeft(node.left!);
      return this._rotateRight(node);
    }

    // RL
    if (bf < -1 && key < node.right!.key) {
      node.right = this._rotateRight(node.right!);
      return this._rotateLeft(node);
    }

    return node;
  }

  delete(key: number): void {
    this.root = this._delete(this.root, key);
  }

  private _delete(node: AVLNode | null, key: number): AVLNode | null {
    if (!node) return null;

    if (key < node.key) {
      node.left = this._delete(node.left, key);
    } else if (key > node.key) {
      node.right = this._delete(node.right, key);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      const minRight = this._findMin(node.right);
      node.key = minRight.key;
      node.right = this._delete(node.right, minRight.key);
    }

    if (!node) return null;

    node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    const bf = this._getBalance(node);

    if (bf > 1 && this._getBalance(node.left!) >= 0) {
      return this._rotateRight(node);
    }

    if (bf > 1 && this._getBalance(node.left!) < 0) {
      node.left = this._rotateLeft(node.left!);
      return this._rotateRight(node);
    }

    if (bf < -1 && this._getBalance(node.right!) <= 0) {
      return this._rotateLeft(node);
    }

    if (bf < -1 && this._getBalance(node.right!) > 0) {
      node.right = this._rotateRight(node.right!);
      return this._rotateLeft(node);
    }

    return node;
  }

  search(key: number): SearchResult {
    const result = this._searchWithPath(this.root, key, '', 0);
    return result;
  }

  searchWithTracking(key: number): { result: SearchResult; steps: ExecutionStep[] } {
    this.executionSteps = [];
    const result = this._searchTrackedWithPath(this.root, key, []);
    return { result, steps: this.executionSteps };
  }

  private _searchTrackedWithPath(node: AVLNode | null, key: number, path: number[]): SearchResult {
    const currentPath = [...path];

    if (!node) {
      this.executionSteps.push({
        lineNumber: 8,
        code: 'if (!node) return { found: false }',
        operation: 'not-found',
        description: `Node is null, ${key} not found`,
        variables: { key },
        currentNode: undefined,
        visitedPath: currentPath,
        balanceFactors: this._getBalanceFactors(this.root),
      });
      return { found: false };
    }

    currentPath.push(node.key);

    this.executionSteps.push({
      lineNumber: 10,
      code: 'if (key === node.key) return { found: true }',
      operation: 'compare',
      description: `At node ${node.key}, comparing with ${key}`,
      variables: { nodeKey: node.key, key, match: key === node.key },
      currentNode: node.key,
      visitedPath: currentPath,
      comparisonNode: node.key,
      balanceFactors: this._getBalanceFactors(this.root),
    });

    if (node.key === key) {
      this.executionSteps.push({
        lineNumber: 10,
        code: 'if (key === node.key) return { found: true }',
        operation: 'found',
        description: `✅ Found ${key} at node!`,
        variables: { key, depth: currentPath.length - 1 },
        currentNode: node.key,
        visitedPath: currentPath,
        balanceFactors: this._getBalanceFactors(this.root),
      });
      return { found: true, key: node.key, depth: currentPath.length - 1, path: currentPath.join(' → ') };
    }

    const direction = key < node.key ? 'left' : 'right';
    this.executionSteps.push({
      lineNumber: 12,
      code: `if (key < node.key) return search(node.left) else return search(node.right)`,
      operation: 'traverse',
      description: `${key} ${key < node.key ? '<' : '>'} ${node.key}, going ${direction}`,
      variables: { nodeKey: node.key, key, direction },
      currentNode: node.key,
      visitedPath: currentPath,
      balanceFactors: this._getBalanceFactors(this.root),
    });

    if (key < node.key) {
      return this._searchTrackedWithPath(node.left, key, currentPath);
    } else {
      return this._searchTrackedWithPath(node.right, key, currentPath);
    }
  }

  private _searchWithPath(node: AVLNode | null, key: number, path: string, depth: number): SearchResult {
    if (!node) return { found: false };
    if (node.key === key) {
      return { found: true, key: node.key, depth, path: path || 'root' };
    }

    const direction = key < node.key ? 'left' : 'right';
    const newPath = path ? `${path} → ${direction}` : direction;

    if (key < node.key) {
      return this._searchWithPath(node.left, key, newPath, depth + 1);
    } else {
      return this._searchWithPath(node.right, key, newPath, depth + 1);
    }
  }

  private _rotateRight(y: AVLNode): AVLNode {
    const x = y.left!;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = 1 + Math.max(this._getHeight(y.left), this._getHeight(y.right));
    x.height = 1 + Math.max(this._getHeight(x.left), this._getHeight(x.right));

    return x;
  }

  private _rotateLeft(x: AVLNode): AVLNode {
    const y = x.right!;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = 1 + Math.max(this._getHeight(x.left), this._getHeight(x.right));
    y.height = 1 + Math.max(this._getHeight(y.left), this._getHeight(y.right));

    return y;
  }

  private _getHeight(node: AVLNode | null): number {
    return node ? node.height : 0;
  }

  private _getBalance(node: AVLNode | null): number {
    return node ? this._getHeight(node.left) - this._getHeight(node.right) : 0;
  }

  private _getBalanceFactors(node: AVLNode | null): Record<number, number> {
    const factors: Record<number, number> = {};
    
    const traverse = (n: AVLNode | null) => {
      if (!n) return;
      factors[n.key] = this._getBalance(n);
      traverse(n.left);
      traverse(n.right);
    };
    
    traverse(node);
    return factors;
  }

  private _findMin(node: AVLNode): AVLNode {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  inorder(): number[] {
    const result: number[] = [];
    this._inorder(this.root, result);
    return result;
  }

  preorder(): number[] {
    const result: number[] = [];
    this._preorder(this.root, result);
    return result;
  }

  postorder(): number[] {
    const result: number[] = [];
    this._postorder(this.root, result);
    return result;
  }

  private _inorder(node: AVLNode | null, result: number[]): void {
    if (!node) return;
    this._inorder(node.left, result);
    result.push(node.key);
    this._inorder(node.right, result);
  }

  private _preorder(node: AVLNode | null, result: number[]): void {
    if (!node) return;
    result.push(node.key);
    this._preorder(node.left, result);
    this._preorder(node.right, result);
  }

  private _postorder(node: AVLNode | null, result: number[]): void {
    if (!node) return;
    this._postorder(node.left, result);
    this._postorder(node.right, result);
    result.push(node.key);
  }

  getRoot(): AVLNode | null {
    return this.root;
  }

  clear(): void {
    this.root = null;
  }
}
