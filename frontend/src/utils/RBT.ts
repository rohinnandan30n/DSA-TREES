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

export interface ExecutionStep {
  lineNumber: number;
  code: string;
  variables: Record<string, any>;
  operation: string;
  description: string;
  currentNode?: number;
  visitedPath?: number[];
  comparisonNode?: number;
  highlightedNodes?: number[];
}

export class RBT {
  root: RBTNode | null = null;
  executionSteps: ExecutionStep[] = [];

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

  insertWithTracking(key: number): ExecutionStep[] {
    this.executionSteps = [];
    let node: RBTNode | null = this.root;
    let parent: RBTNode | null = null;
    const path: number[] = [];

    this.executionSteps.push({
      lineNumber: 5,
      code: 'let node = this.root; let parent = null;',
      operation: 'init',
      description: 'Starting RBT insertion',
      variables: { key },
      visitedPath: [],
    });

    while (node) {
      path.push(node.key);
      this.executionSteps.push({
        lineNumber: 7,
        code: 'while (node) { if (key < node.key) node = node.left ...',
        operation: 'traverse',
        description: `At node ${node.key}, comparing with ${key}`,
        variables: { nodeKey: node.key, key },
        currentNode: node.key,
        visitedPath: [...path],
        comparisonNode: node.key,
      });

      parent = node;
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else {
        this.executionSteps.push({
          lineNumber: 14,
          code: 'if (key === node.key) return; // Duplicate',
          operation: 'duplicate',
          description: `Key ${key} already exists`,
          variables: { key },
          currentNode: node.key,
        });
        return this.executionSteps;
      }
    }

    this.executionSteps.push({
      lineNumber: 17,
      code: 'const newNode = { key, color: RED, ... }',
      operation: 'create',
      description: `Creating new RED node with key=${key}`,
      variables: { key, color: 'RED' },
      currentNode: key,
      visitedPath: [...path, key],
    });

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
      this.executionSteps.push({
        lineNumber: 21,
        code: 'if (!parent) { this.root = newNode; newNode.color = BLACK; }',
        operation: 'root-insert',
        description: `Node ${key} is root, colored BLACK`,
        variables: { key, color: 'BLACK' },
        currentNode: key,
      });
      return this.executionSteps;
    } else if (key < parent.key) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }

    this.executionSteps.push({
      lineNumber: 25,
      code: 'parent.left/right = newNode;',
      operation: 'link',
      description: `Linked node ${key} to parent ${parent.key}`,
      variables: { key, parentKey: parent.key },
      currentNode: key,
      visitedPath: [...path, key],
    });

    this._fixInsertWithTracking(newNode);
    return this.executionSteps;
  }

  private _fixInsertWithTracking(node: RBTNode): void {
    while (node.parent && node.parent.color === 'RED') {
      const parentKey = node.parent.key;
      const uncleKey = node.parent.parent?.left === node.parent ? node.parent.parent?.right?.key : node.parent.parent?.left?.key;

      if (node.parent === node.parent.parent?.left) {
        const uncle = node.parent.parent?.right;

        if (uncle && uncle.color === 'RED') {
          this.executionSteps.push({
            lineNumber: 30,
            code: 'if (uncle.color === RED) { recolor... }',
            operation: 'recolor',
            description: `Recoloring: parent(${parentKey}) and uncle(${uncleKey}) BLACK, grandparent RED`,
            variables: { nodeKey: node.key, uncle: uncleKey },
            currentNode: node.key,
            highlightedNodes: [parentKey, uncleKey || 0, node.parent.parent?.key || 0].filter(Boolean),
          });
          node.parent.color = 'BLACK';
          uncle.color = 'BLACK';
          node.parent.parent!.color = 'RED';
          node = node.parent.parent!;
        } else {
          if (node === node.parent.right) {
            this.executionSteps.push({
              lineNumber: 35,
              code: 'if (node === parent.right) { rotateLeft(parent); }',
              operation: 'rotate',
              description: `Left rotation at node ${parentKey}`,
              variables: { nodeKey: node.key, rotationType: 'LEFT' },
              currentNode: parentKey,
              highlightedNodes: [parentKey, node.key],
            });
            node = node.parent;
            this._rotateLeft(node);
          }
          this.executionSteps.push({
            lineNumber: 40,
            code: 'parent.color = BLACK; grandparent.color = RED; rotateRight(grandparent);',
            operation: 'rotate-recolor',
            description: `Recoloring and right rotation at grandparent`,
            variables: { parentKey, grandparentKey: node.parent?.parent?.key },
            currentNode: node.key,
          });
          node.parent!.color = 'BLACK';
          node.parent!.parent!.color = 'RED';
          this._rotateRight(node.parent!.parent!);
        }
      } else {
        const uncle = node.parent.parent?.left;

        if (uncle && uncle.color === 'RED') {
          this.executionSteps.push({
            lineNumber: 30,
            code: 'if (uncle.color === RED) { recolor... }',
            operation: 'recolor',
            description: `Recoloring: parent(${parentKey}) and uncle(${uncleKey}) BLACK, grandparent RED`,
            variables: { nodeKey: node.key, uncle: uncleKey },
            currentNode: node.key,
            highlightedNodes: [parentKey, uncleKey || 0, node.parent.parent?.key || 0].filter(Boolean),
          });
          node.parent.color = 'BLACK';
          uncle.color = 'BLACK';
          node.parent.parent!.color = 'RED';
          node = node.parent.parent!;
        } else {
          if (node === node.parent.left) {
            this.executionSteps.push({
              lineNumber: 35,
              code: 'if (node === parent.left) { rotateRight(parent); }',
              operation: 'rotate',
              description: `Right rotation at node ${parentKey}`,
              variables: { nodeKey: node.key, rotationType: 'RIGHT' },
              currentNode: parentKey,
              highlightedNodes: [parentKey, node.key],
            });
            node = node.parent;
            this._rotateRight(node);
          }
          this.executionSteps.push({
            lineNumber: 40,
            code: 'parent.color = BLACK; grandparent.color = RED; rotateLeft(grandparent);',
            operation: 'rotate-recolor',
            description: `Recoloring and left rotation at grandparent`,
            variables: { parentKey, grandparentKey: node.parent?.parent?.key },
            currentNode: node.key,
          });
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

  searchWithTracking(key: number): { result: SearchResult; steps: ExecutionStep[] } {
    this.executionSteps = [];
    const result = this._searchTrackedWithPath(this.root, key, []);
    return { result, steps: this.executionSteps };
  }

  private _searchTrackedWithPath(node: RBTNode | null, key: number, path: number[]): SearchResult {
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
      });
      return { found: false };
    }

    currentPath.push(node.key);

    this.executionSteps.push({
      lineNumber: 10,
      code: 'if (key === node.key) return { found: true }',
      operation: 'compare',
      description: `At node ${node.key} (${node.color}), comparing with ${key}`,
      variables: { nodeKey: node.key, key, color: node.color, match: key === node.key },
      currentNode: node.key,
      visitedPath: currentPath,
      comparisonNode: node.key,
    });

    if (node.key === key) {
      this.executionSteps.push({
        lineNumber: 10,
        code: 'if (key === node.key) return { found: true }',
        operation: 'found',
        description: `✅ Found ${key} at node (${node.color})!`,
        variables: { key, depth: currentPath.length - 1, color: node.color },
        currentNode: node.key,
        visitedPath: currentPath,
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
    });

    if (key < node.key) {
      return this._searchTrackedWithPath(node.left, key, currentPath);
    } else {
      return this._searchTrackedWithPath(node.right, key, currentPath);
    }
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
