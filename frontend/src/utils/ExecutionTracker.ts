// Execution tracking for step-by-step visualization
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

export interface ExecutionContext {
  steps: ExecutionStep[];
  currentStep: number;
  operationType: 'insert' | 'delete' | 'search';
  operationValue: number;
  completed: boolean;
}

export class Tracker {
  steps: ExecutionStep[] = [];
  currentStep: number = 0;
  variables: Map<string, any> = new Map();

  addStep(lineNumber: number, code: string, operation: string, description: string, variables?: Record<string, any>) {
    this.steps.push({
      lineNumber,
      code,
      variables: variables || Object.fromEntries(this.variables),
      operation,
      description,
    });
  }

  setVariable(name: string, value: any) {
    this.variables.set(name, value);
  }

  getContext(): ExecutionContext {
    return {
      steps: this.steps,
      currentStep: this.currentStep,
      operationType: 'insert',
      operationValue: 0,
      completed: this.currentStep >= this.steps.length,
    };
  }

  reset() {
    this.steps = [];
    this.currentStep = 0;
    this.variables.clear();
  }
}

// Code snippets for each operation with line numbers
export const BST_CODE = {
  insert: `1  | insert(key: number): void {
2  |   this.root = this._insert(this.root, key);
3  | }
4  |
5  | private _insert(node, key): TreeNode {
6  |   if (!node) {
7  |     return { key, left: null, right: null };
8  |   }
9  |   if (key < node.key) {
10 |     node.left = this._insert(node.left, key);
11 |   } else if (key > node.key) {
12 |     node.right = this._insert(node.right, key);
13 |   }
14 |   return node;
15 | }`,
  delete: `1  | delete(key: number): void {
2  |   this.root = this._delete(this.root, key);
3  | }
4  |
5  | private _delete(node, key): TreeNode {
6  |   if (!node) return null;
7  |   if (key < node.key) {
8  |     node.left = this._delete(node.left, key);
9  |   } else if (key > node.key) {
10 |     node.right = this._delete(node.right, key);
11 |   } else {
12 |     if (!node.left) return node.right;
13 |     if (!node.right) return node.left;
14 |     const minRight = this._findMin(node.right);
15 |     node.key = minRight.key;
16 |     node.right = this._delete(node.right, minRight.key);
17 |   }
18 |   return node;
19 | }`,
  search: `1  | search(key: number): SearchResult {
2  |   return this._searchWithPath(this.root, key, '', 0);
3  | }
4  |
5  | private _searchWithPath(node, key, path, depth) {
6  |   if (!node) return { found: false };
7  |   if (node.key === key) {
8  |     return { found: true, key, depth, path };
9  |   }
10 |   const direction = key < node.key ? 'left' : 'right';
11 |   const newPath = path ? \`\${path} → \${direction}\` : direction;
12 |   if (key < node.key) {
13 |     return this._searchWithPath(node.left, key, newPath, depth + 1);
14 |   } else {
15 |     return this._searchWithPath(node.right, key, newPath, depth + 1);
16 |   }
17 | }`,
};

export const AVL_CODE = {
  insert: `1  | insert(key: number): void {
2  |   this.root = this._insert(this.root, key);
3  | }
4  |
5  | private _insert(node, key): AVLNode {
6  |   if (!node) return { key, left: null, right: null, height: 1 };
7  |   if (key < node.key) {
8  |     node.left = this._insert(node.left, key);
8  |   } else if (key > node.key) {
10 |     node.right = this._insert(node.right, key);
11 |   }
12 |   node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
13 |   const balance = this._getBalance(node);
14 |   return this._rebalance(node, balance);
15 | }
16 |
17 | private _rebalance(node, balance) {
18 |   if (balance > 1 && this._getBalance(node.left) >= 0) return this._rotateRight(node);
19 |   if (balance > 1 && this._getBalance(node.left) < 0) return this._rotateLeftRight(node);
20 |   if (balance < -1 && this._getBalance(node.right) <= 0) return this._rotateLeft(node);
21 |   if (balance < -1 && this._getBalance(node.right) > 0) return this._rotateRightLeft(node);
22 |   return node;
23 | }`,
  delete: `1  | delete(key: number): void {
2  |   this.root = this._delete(this.root, key);
3  | }
4  |
5  | private _delete(node, key): AVLNode {
6  |   if (!node) return null;
7  |   if (key < node.key) {
8  |     node.left = this._delete(node.left, key);
9  |   } else if (key > node.key) {
10 |     node.right = this._delete(node.right, key);
11 |   } else {
12 |     if (!node.left) return node.right;
13 |     if (!node.right) return node.left;
14 |     const minRight = this._findMin(node.right);
15 |     node.key = minRight.key;
16 |     node.right = this._delete(node.right, minRight.key);
17 |   }
18 |   node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
19 |   return this._rebalance(node, this._getBalance(node));
20 | }`,
  search: `1  | search(key: number): SearchResult {
2  |   const result = this._searchWithPath(this.root, key, '', 0);
3  |   return result;
4  | }
5  |
6  | private _searchWithPath(node, key, path, depth) {
7  |   if (!node) return { found: false };
8  |   if (node.key === key) {
9  |     return { found: true, key, depth, path };
10 |   }
11 |   const direction = key < node.key ? 'left' : 'right';
12 |   const newPath = path ? \`\${path} → \${direction}\` : direction;
13 |   if (key < node.key) {
14 |     return this._searchWithPath(node.left, key, newPath, depth + 1);
15 |   } else {
16 |     return this._searchWithPath(node.right, key, newPath, depth + 1);
17 |   }
18 | }`,
};

export const RBT_CODE = {
  insert: `1  | insert(key: number): void {
2  |   if (!this.root) {
3  |     this.root = { key, left: null, right: null, parent: null, color: 'black' };
4  |     return;
5  |   }
6  |   let current = this.root;
7  |   let node: RBTNode = { key, left: null, right: null, parent: null, color: 'red' };
8  |   while (current) {
9  |     node.parent = current;
10 |     if (key < current.key) {
11 |       current = current.left!;
12 |     } else if (key > current.key) {
13 |       current = current.right!;
14 |     } else return;
15 |   }
16 |   if (key < node.parent!.key) {
17 |     node.parent!.left = node;
18 |   } else {
19 |     node.parent!.right = node;
20 |   }
21 |   this._fixInsert(node);
22 | }`,
  delete: `1  | delete(key: number): void {
2  |   const node = this._findNode(this.root, key);
3  |   if (!node) return;
4  |   this._deleteNode(node);
5  | }
6  |
7  | private _deleteNode(node: RBTNode): void {
8  |   let replacement: RBTNode | null = null;
9  |   if (!node.left || !node.right) {
9  |     replacement = node.left || node.right;
11 |   } else {
12 |     const successor = this._findMin(node.right);
13 |     node.key = successor.key;
14 |     this._deleteNode(successor);
15 |     return;
16 |   }
17 |   if (node === this.root) {
18 |     this.root = replacement;
19 |   } else {
20 |     if (node === node.parent!.left) {
21 |       node.parent!.left = replacement;
22 |     } else {
23 |       node.parent!.right = replacement;
24 |     }
25 |   }
26 |   if (node.color === 'black') {
27 |     this._fixDelete(replacement || node.parent);
28 |   }
29 | }`,
  search: `1  | search(key: number): SearchResult {
2  |   const result = this._searchWithPath(this.root, key, '', 0);
3  |   return result;
4  | }
5  |
6  | private _searchWithPath(node, key, path, depth) {
7  |   if (!node) return { found: false };
8  |   if (node.key === key) {
9  |     return { found: true, key, depth, path, color: node.color };
10 |   }
11 |   const direction = key < node.key ? 'left' : 'right';
12 |   const newPath = path ? \`\${path} → \${direction}\` : direction;
13 |   if (key < node.key) {
14 |     return this._searchWithPath(node.left, key, newPath, depth + 1);
15 |   } else {
16 |     return this._searchWithPath(node.right, key, newPath, depth + 1);
17 |   }
18 | }`,
};
