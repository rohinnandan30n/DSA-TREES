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

export class BST {
  root: TreeNode | null = null;

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
