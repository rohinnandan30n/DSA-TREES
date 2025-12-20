export interface TreeNode {
  key: number;
  left: TreeNode | null;
  right: TreeNode | null;
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
}

export class BST {
  root: TreeNode | null = null;
  executionSteps: ExecutionStep[] = [];

  insertWithTracking(key: number): ExecutionStep[] {
    this.executionSteps = [];
    const path: number[] = [];
    this.root = this._insertTrackedWithPath(this.root, key, path);
    return this.executionSteps;
  }

  private _insertTrackedWithPath(node: TreeNode | null, key: number, path: number[]): TreeNode {
    if (!node) {
      this.executionSteps.push({
        lineNumber: 6,
        code: 'if (!node) {',
        operation: 'condition',
        description: 'Node is null, creating new leaf node',
        variables: { key },
        visitedPath: [...path],
      });
      this.executionSteps.push({
        lineNumber: 7,
        code: 'return { key, left: null, right: null };',
        operation: 'create',
        description: `Creating new node with key=${key}`,
        variables: { key },
        currentNode: key,
        visitedPath: [...path, key],
      });
      return { key, left: null, right: null };
    }

    path.push(node.key);
    this.executionSteps.push({
      lineNumber: 5,
      code: 'private _insert(node, key): TreeNode {',
      operation: 'enter',
      description: `At node ${node.key}, comparing with ${key}`,
      variables: { nodeKey: node.key, key },
      currentNode: node.key,
      visitedPath: [...path],
      comparisonNode: node.key,
    });

    if (key < node.key) {
      this.executionSteps.push({
        lineNumber: 9,
        code: 'if (key < node.key) {',
        operation: 'condition',
        description: `${key} < ${node.key}, going LEFT`,
        variables: { key, nodeKey: node.key },
        currentNode: node.key,
        visitedPath: [...path],
      });
      node.left = this._insertTrackedWithPath(node.left, key, path);
    } else if (key > node.key) {
      this.executionSteps.push({
        lineNumber: 11,
        code: 'else if (key > node.key) {',
        operation: 'condition',
        description: `${key} > ${node.key}, going RIGHT`,
        variables: { key, nodeKey: node.key },
        currentNode: node.key,
        visitedPath: [...path],
      });
      node.right = this._insertTrackedWithPath(node.right, key, path);
    } else {
      this.executionSteps.push({
        lineNumber: 11,
        code: 'else if (key > node.key) {',
        operation: 'skip',
        description: `${key} == ${node.key}, duplicate key ignored`,
        variables: { key, nodeKey: node.key },
        currentNode: node.key,
        visitedPath: [...path],
      });
    }

    this.executionSteps.push({
      lineNumber: 14,
      code: 'return node;',
      operation: 'return',
      description: `Returning node with key=${node.key}`,
      variables: { node: node.key },
      currentNode: node.key,
      visitedPath: [...path],
    });
    return node;
  }

  insert(key: number): void {
    this.root = this._insert(this.root, key);
  }

  private _insert(node: TreeNode | null, key: number): TreeNode {
    if (!node) {
      return { key, left: null, right: null };
    }

    if (key < node.key) {
      node.left = this._insert(node.left, key);
    } else if (key > node.key) {
      node.right = this._insert(node.right, key);
    }

    return node;
  }

  deleteWithTracking(key: number): ExecutionStep[] {
    this.executionSteps = [];
    const path: number[] = [];
    this.root = this._deleteTrackedWithPath(this.root, key, path);
    return this.executionSteps;
  }

  private _deleteTrackedWithPath(node: TreeNode | null, key: number, path: number[]): TreeNode | null {
    if (!node) {
      this.executionSteps.push({
        lineNumber: 6,
        code: 'if (!node) return null;',
        operation: 'return',
        description: 'Node is null, returning',
        variables: {},
        visitedPath: [...path],
      });
      return null;
    }

    path.push(node.key);
    this.executionSteps.push({
      lineNumber: 5,
      code: 'private _delete(node, key): TreeNode {',
      operation: 'enter',
      description: `At node ${node.key}, searching for ${key}`,
      variables: { key, nodeKey: node.key },
      currentNode: node.key,
      visitedPath: [...path],
      comparisonNode: node.key,
    });

    if (key < node.key) {
      this.executionSteps.push({
        lineNumber: 7,
        code: 'if (key < node.key) {',
        operation: 'condition',
        description: `${key} < ${node.key}, searching LEFT`,
        variables: { key, nodeKey: node.key },
        currentNode: node.key,
        visitedPath: [...path],
      });
      node.left = this._deleteTrackedWithPath(node.left, key, path);
    } else if (key > node.key) {
      this.executionSteps.push({
        lineNumber: 9,
        code: 'else if (key > node.key) {',
        operation: 'condition',
        description: `${key} > ${node.key}, searching RIGHT`,
        variables: { key, nodeKey: node.key },
        currentNode: node.key,
        visitedPath: [...path],
      });
      node.right = this._deleteTrackedWithPath(node.right, key, path);
    } else {
      this.executionSteps.push({
        lineNumber: 11,
        code: '} else { // Node to delete found',
        operation: 'found',
        description: `Found node with key=${key}`,
        variables: { key, nodeKey: node.key },
        currentNode: node.key,
        visitedPath: [...path],
      });

      if (!node.left) {
        this.executionSteps.push({
          lineNumber: 12,
          code: 'if (!node.left) { return node.right; }',
          operation: 'delete',
          description: 'Node has no left child, replacing with right child',
          variables: { key },
          currentNode: node.key,
          visitedPath: [...path],
        });
        return node.right;
      }
      if (!node.right) {
        this.executionSteps.push({
          lineNumber: 13,
          code: 'if (!node.right) { return node.left; }',
          operation: 'delete',
          description: 'Node has no right child, replacing with left child',
          variables: { key },
          currentNode: node.key,
          visitedPath: [...path],
        });
        return node.left;
      }

      this.executionSteps.push({
        lineNumber: 14,
        code: 'const minRight = this._findMin(node.right);',
        operation: 'prepare',
        description: `Node has two children, finding minimum in right subtree`,
        variables: { key },
        currentNode: node.key,
        visitedPath: [...path],
      });
      const minRight = this._findMin(node.right);
      this.executionSteps.push({
        lineNumber: 15,
        code: 'node.key = minRight.key;',
        operation: 'replace',
        description: `Replacing node key with ${minRight.key}`,
        variables: { oldKey: key, newKey: minRight.key },
        currentNode: node.key,
        visitedPath: [...path],
      });
      node.key = minRight.key;
      this.executionSteps.push({
        lineNumber: 16,
        code: 'node.right = this._delete(node.right, minRight.key);',
        operation: 'recurse',
        description: `Deleting successor node with key=${minRight.key}`,
        variables: { key: minRight.key },
        currentNode: node.key,
        visitedPath: [...path],
      });
      node.right = this._deleteTrackedWithPath(node.right, minRight.key, path);
    }

    return node;
  }

  delete(key: number): void {
    this.root = this._delete(this.root, key);
  }

  private _delete(node: TreeNode | null, key: number): TreeNode | null {
    if (!node) return null;

    if (key < node.key) {
      node.left = this._delete(node.left, key);
    } else if (key > node.key) {
      node.right = this._delete(node.right, key);
    } else {
      // Node to delete found
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }

      // Node with two children
      const minRight = this._findMin(node.right);
      node.key = minRight.key;
      node.right = this._delete(node.right, minRight.key);
    }

    return node;
  }

  searchWithTracking(key: number): { result: SearchResult; steps: ExecutionStep[] } {
    this.executionSteps = [];
    const path: number[] = [];
    const result = this._searchTrackedWithPath(this.root, key, '', 0, path);
    return { result, steps: this.executionSteps };
  }

  private _searchTrackedWithPath(node: TreeNode | null, key: number, path: string, depth: number, visitedPath: number[]): SearchResult {
    if (!node) {
      this.executionSteps.push({
        lineNumber: 6,
        code: 'if (!node) return { found: false };',
        operation: 'return',
        description: `Node is null, ${key} not found`,
        variables: { key },
        visitedPath: [...visitedPath],
      });
      return { found: false };
    }

    visitedPath.push(node.key);
    this.executionSteps.push({
      lineNumber: 5,
      code: 'private _searchWithPath(node, key, path, depth) {',
      operation: 'enter',
      description: `At node ${node.key}, searching for ${key}`,
      variables: { key, depth, currentNode: node.key },
      currentNode: node.key,
      visitedPath: [...visitedPath],
      comparisonNode: node.key,
    });

    if (node.key === key) {
      this.executionSteps.push({
        lineNumber: 7,
        code: 'if (node.key === key) {',
        operation: 'found',
        description: `Found key=${key} at depth=${depth}`,
        variables: { key, depth, path: path || 'root' },
        currentNode: node.key,
        visitedPath: [...visitedPath],
      });
      this.executionSteps.push({
        lineNumber: 8,
        code: 'return { found: true, key, depth, path };',
        operation: 'return',
        description: `Returning found result`,
        variables: { key, depth, path: path || 'root' },
        currentNode: node.key,
        visitedPath: [...visitedPath],
      });
      return { found: true, key: node.key, depth, path: path || 'root' };
    }

    const direction = key < node.key ? 'left' : 'right';
    const newPath = path ? `${path} → ${direction}` : direction;

    this.executionSteps.push({
      lineNumber: 10,
      code: `const direction = key < node.key ? 'left' : 'right';`,
      operation: 'direction',
      description: `Going ${direction}`,
      variables: { key, nodeKey: node.key, direction },
      currentNode: node.key,
      visitedPath: [...visitedPath],
    });

    if (key < node.key) {
      this.executionSteps.push({
        lineNumber: 13,
        code: 'return this._searchWithPath(node.left, key, newPath, depth + 1);',
        operation: 'recurse',
        description: `Recursing LEFT with new path`,
        variables: { key, newPath },
        currentNode: node.key,
        visitedPath: [...visitedPath],
      });
      return this._searchTrackedWithPath(node.left, key, newPath, depth + 1, visitedPath);
    } else {
      this.executionSteps.push({
        lineNumber: 15,
        code: 'return this._searchWithPath(node.right, key, newPath, depth + 1);',
        operation: 'recurse',
        description: `Recursing RIGHT with new path`,
        variables: { key, newPath },
        currentNode: node.key,
        visitedPath: [...visitedPath],
      });
      return this._searchTrackedWithPath(node.right, key, newPath, depth + 1, visitedPath);
    }
  }

  search(key: number): SearchResult {
    const result = this._searchWithPath(this.root, key, '', 0);
    return result;
  }

  private _searchWithPath(node: TreeNode | null, key: number, path: string, depth: number): SearchResult {
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

  private _findMin(node: TreeNode): TreeNode {
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

  private _inorder(node: TreeNode | null, result: number[]): void {
    if (!node) return;
    this._inorder(node.left, result);
    result.push(node.key);
    this._inorder(node.right, result);
  }

  private _preorder(node: TreeNode | null, result: number[]): void {
    if (!node) return;
    result.push(node.key);
    this._preorder(node.left, result);
    this._preorder(node.right, result);
  }

  private _postorder(node: TreeNode | null, result: number[]): void {
    if (!node) return;
    this._postorder(node.left, result);
    this._postorder(node.right, result);
    result.push(node.key);
  }

  getRoot(): TreeNode | null {
    return this.root;
  }

  clear(): void {
    this.root = null;
  }
}

