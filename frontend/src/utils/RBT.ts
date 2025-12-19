export type Color = 'RED' | 'BLACK';

export interface RBTNode {
  key: number;
  color: Color;
  left: RBTNode | null;
  right: RBTNode | null;
  parent: RBTNode | null;
}

export interface SearchResult {
  found: boolean;
  key?: number;
  depth?: number;
  path?: string;
}

export class RBT {
  root: RBTNode | null = null;

  insert(key: number): void {
    let node: RBTNode | null = this.root;
    let parent: RBTNode | null = null;

    while (node) {
      parent = node;
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else {
        return; // Duplicate
      }
    }

    const newNode: RBTNode = {
      key,
      color: 'RED',
      left: null,
      right: null,
      parent,
    };

    if (!parent) {
      this.root = newNode;
      newNode.color = 'BLACK';
      return;
    } else if (key < parent.key) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }

    this._fixInsert(newNode);
  }

  private _fixInsert(node: RBTNode): void {
    while (node.parent && node.parent.color === 'RED') {
      if (node.parent === node.parent.parent?.left) {
        const uncle = node.parent.parent?.right;

        // Case 1: Uncle is RED
        if (uncle && uncle.color === 'RED') {
          node.parent.color = 'BLACK';
          uncle.color = 'BLACK';
          node.parent.parent!.color = 'RED';
          node = node.parent.parent!;
        } else {
          // Uncle is BLACK (or null)
          // Case 2: Node is right child
          if (node === node.parent.right) {
            node = node.parent;
            this._rotateLeft(node);
          }
          // Case 3: Node is left child (or after rotation)
          node.parent!.color = 'BLACK';
          node.parent!.parent!.color = 'RED';
          this._rotateRight(node.parent!.parent!);
        }
      } else {
        const uncle = node.parent.parent?.left;

        // Case 1: Uncle is RED
        if (uncle && uncle.color === 'RED') {
          node.parent.color = 'BLACK';
          uncle.color = 'BLACK';
          node.parent.parent!.color = 'RED';
          node = node.parent.parent!;
        } else {
          // Uncle is BLACK (or null)
          // Case 2: Node is left child
          if (node === node.parent.left) {
            node = node.parent;
            this._rotateRight(node);
          }
          // Case 3: Node is right child (or after rotation)
          node.parent!.color = 'BLACK';
          node.parent!.parent!.color = 'RED';
          this._rotateLeft(node.parent!.parent!);
        }
      }
    }
    if (this.root) this.root.color = 'BLACK';
  }

  delete(key: number): void {
    const node = this._search(this.root, key);
    if (!node) return;

    let nodeToFix: RBTNode | null;
    let nodeToFixParent: RBTNode | null;

    if (!node.left || !node.right) {
      nodeToFix = node.left || node.right;
      nodeToFixParent = node.parent;

      if (nodeToFix) {
        nodeToFix.parent = node.parent;
      }

      if (!node.parent) {
        this.root = nodeToFix;
      } else if (node === node.parent.left) {
        node.parent.left = nodeToFix;
      } else {
        node.parent.right = nodeToFix;
      }

      if (node.color === 'BLACK') {
        if (nodeToFix) {
          this._fixDelete(nodeToFix);
        } else if (nodeToFixParent) {
          this._fixDeleteNull(nodeToFixParent);
        }
      }
    } else {
      const successor = this._findMin(node.right);
      node.key = successor.key;
      this.delete(successor.key);
    }
  }

  private _fixDelete(node: RBTNode): void {
    while (node !== this.root && node.color === 'BLACK') {
      if (node === node.parent?.left) {
        let sibling = node.parent.right;

        if (sibling && sibling.color === 'RED') {
          sibling.color = 'BLACK';
          node.parent.color = 'RED';
          this._rotateLeft(node.parent);
          sibling = node.parent.right;
        }

        if (sibling) {
          const leftBlack = !sibling.left || sibling.left.color === 'BLACK';
          const rightBlack = !sibling.right || sibling.right.color === 'BLACK';

          if (leftBlack && rightBlack) {
            sibling.color = 'RED';
            node = node.parent;
          } else {
            if (rightBlack) {
              if (sibling.left) {
                sibling.left.color = 'BLACK';
              }
              sibling.color = 'RED';
              this._rotateRight(sibling);
              sibling = node.parent.right;
            }

            sibling!.color = node.parent.color;
            node.parent.color = 'BLACK';
            if (sibling!.right) {
              sibling!.right.color = 'BLACK';
            }
            this._rotateLeft(node.parent);
            node = this.root!;
          }
        }
      } else {
        let sibling = node.parent?.left;

        if (sibling && sibling.color === 'RED') {
          sibling.color = 'BLACK';
          node.parent!.color = 'RED';
          this._rotateRight(node.parent!);
          sibling = node.parent!.left;
        }

        if (sibling) {
          const leftBlack = !sibling.left || sibling.left.color === 'BLACK';
          const rightBlack = !sibling.right || sibling.right.color === 'BLACK';

          if (leftBlack && rightBlack) {
            sibling.color = 'RED';
            node = node.parent!;
          } else {
            if (leftBlack) {
              if (sibling.right) {
                sibling.right.color = 'BLACK';
              }
              sibling.color = 'RED';
              this._rotateLeft(sibling);
              sibling = node.parent!.left;
            }

            sibling!.color = node.parent!.color;
            node.parent!.color = 'BLACK';
            if (sibling!.left) {
              sibling!.left.color = 'BLACK';
            }
            this._rotateRight(node.parent!);
            node = this.root!;
          }
        }
      }
    }
    node.color = 'BLACK';
  }

  private _fixDeleteNull(parent: RBTNode): void {
    let node: RBTNode | null = null;
    while (node !== this.root) {
      if (node === parent.left) {
        let sibling = parent.right;

        if (sibling && sibling.color === 'RED') {
          sibling.color = 'BLACK';
          parent.color = 'RED';
          this._rotateLeft(parent);
          sibling = parent.right;
        }

        if (sibling) {
          const leftBlack = !sibling.left || sibling.left.color === 'BLACK';
          const rightBlack = !sibling.right || sibling.right.color === 'BLACK';

          if (leftBlack && rightBlack) {
            sibling.color = 'RED';
            node = parent;
            parent = parent.parent || parent;
          } else {
            if (rightBlack && sibling.left) {
              sibling.left.color = 'BLACK';
              sibling.color = 'RED';
              this._rotateRight(sibling);
              sibling = parent.right;
            }

            if (sibling) {
              sibling.color = parent.color;
              parent.color = 'BLACK';
              if (sibling.right) {
                sibling.right.color = 'BLACK';
              }
              this._rotateLeft(parent);
            }
            node = this.root;
          }
        }
      } else {
        let sibling = parent.left;

        if (sibling && sibling.color === 'RED') {
          sibling.color = 'BLACK';
          parent.color = 'RED';
          this._rotateRight(parent);
          sibling = parent.left;
        }

        if (sibling) {
          const leftBlack = !sibling.left || sibling.left.color === 'BLACK';
          const rightBlack = !sibling.right || sibling.right.color === 'BLACK';

          if (leftBlack && rightBlack) {
            sibling.color = 'RED';
            node = parent;
            parent = parent.parent || parent;
          } else {
            if (leftBlack && sibling.right) {
              sibling.right.color = 'BLACK';
              sibling.color = 'RED';
              this._rotateLeft(sibling);
              sibling = parent.left;
            }

            if (sibling) {
              sibling.color = parent.color;
              parent.color = 'BLACK';
              if (sibling.left) {
                sibling.left.color = 'BLACK';
              }
              this._rotateRight(parent);
            }
            node = this.root;
          }
        }
      }
    }
  }

  search(key: number): SearchResult {
    const result = this._searchWithPath(this.root, key, '', 0);
    return result;
  }

  private _searchWithPath(node: RBTNode | null, key: number, path: string, depth: number): SearchResult {
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

  private _search(node: RBTNode | null, key: number): RBTNode | null {
    if (!node) return null;
    if (node.key === key) return node;

    if (key < node.key) {
      return this._search(node.left, key);
    } else {
      return this._search(node.right, key);
    }
  }

  private _rotateLeft(node: RBTNode): void {
    const right = node.right!;
    node.right = right.left;

    if (right.left) {
      right.left.parent = node;
    }

    right.parent = node.parent;

    if (!node.parent) {
      this.root = right;
    } else if (node === node.parent.left) {
      node.parent.left = right;
    } else {
      node.parent.right = right;
    }

    right.left = node;
    node.parent = right;
  }

  private _rotateRight(node: RBTNode): void {
    const left = node.left!;
    node.left = left.right;

    if (left.right) {
      left.right.parent = node;
    }

    left.parent = node.parent;

    if (!node.parent) {
      this.root = left;
    } else if (node === node.parent.right) {
      node.parent.right = left;
    } else {
      node.parent.left = left;
    }

    left.right = node;
    node.parent = left;
  }

  private _findMin(node: RBTNode): RBTNode {
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

  private _inorder(node: RBTNode | null, result: number[]): void {
    if (!node) return;
    this._inorder(node.left, result);
    result.push(node.key);
    this._inorder(node.right, result);
  }

  private _preorder(node: RBTNode | null, result: number[]): void {
    if (!node) return;
    result.push(node.key);
    this._preorder(node.left, result);
    this._preorder(node.right, result);
  }

  private _postorder(node: RBTNode | null, result: number[]): void {
    if (!node) return;
    this._postorder(node.left, result);
    this._postorder(node.right, result);
    result.push(node.key);
  }

  getRoot(): RBTNode | null {
    return this.root;
  }

  clear(): void {
    this.root = null;
  }
}
