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

export class AVL {
  root: AVLNode | null = null;

  insert(key: number): void {
    this.root = this._insert(this.root, key);
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
