import React, { useState } from 'react';

interface CodePanelProps {
  treeType: string;
}

interface CodeExample {
  name: string;
  code: string;
  language: string;
}

export default function CodePanel({ treeType }: CodePanelProps) {
  const [selectedCode, setSelectedCode] = useState<number>(0);

  const bstCodeC: CodeExample[] = [
    {
      name: 'Insert Operation',
      language: 'c',
      code: `BSTNode* bst_insert(BSTNode* root, int key) {
  if (!root) {
    BSTNode* node = malloc(sizeof(BSTNode));
    node->key = key;
    node->left = node->right = NULL;
    return node;
  }

  if (key < root->key)
    root->left = bst_insert(root->left, key);
  else if (key > root->key)
    root->right = bst_insert(root->right, key);

  return root;
}`,
    },
    {
      name: 'Search Operation',
      language: 'c',
      code: `BSTNode* bst_search(BSTNode* root, int key) {
  if (!root || root->key == key)
    return root;

  if (key < root->key)
    return bst_search(root->left, key);
  else
    return bst_search(root->right, key);
}`,
    },
    {
      name: 'Delete Operation',
      language: 'c',
      code: `BSTNode* bst_delete(BSTNode* root, int key) {
  if (!root) return NULL;

  if (key < root->key)
    root->left = bst_delete(root->left, key);
  else if (key > root->key)
    root->right = bst_delete(root->right, key);
  else {
    if (!root->left) {
      BSTNode* temp = root->right;
      free(root);
      return temp;
    }
    if (!root->right) {
      BSTNode* temp = root->left;
      free(root);
      return temp;
    }
    BSTNode* succ = bst_min(root->right);
    root->key = succ->key;
    root->right = bst_delete(root->right, succ->key);
  }
  return root;
}`,
    },
    {
      name: 'Inorder Traversal',
      language: 'c',
      code: `void bst_inorder(BSTNode* root, int* arr, int* index) {
  if (!root) return;
  bst_inorder(root->left, arr, index);
  arr[(*index)++] = root->key;
  bst_inorder(root->right, arr, index);
}

BSTNode* bst_min(BSTNode* root) {
  if (!root) return NULL;
  while (root->left)
    root = root->left;
  return root;
}`,
    },
  ];

  const avlCodeC: CodeExample[] = [
    {
      name: 'Insert Operation',
      language: 'c',
      code: `AVLNode* avl_insert(AVLNode* node, int key) {
  if (!node) {
    AVLNode* n = malloc(sizeof(AVLNode));
    n->key = key;
    n->left = n->right = NULL;
    n->height = 1;
    return n;
  }

  if (key < node->key)
    node->left = avl_insert(node->left, key);
  else if (key > node->key)
    node->right = avl_insert(node->right, key);
  else
    return node;

  node->height = 1 + max(avl_height(node->left), 
                         avl_height(node->right));
  int bf = avl_balance_factor(node);

  if (bf > 1 && key < node->left->key)
    return rotate_right(node);
  if (bf < -1 && key > node->right->key)
    return rotate_left(node);
  if (bf > 1 && key > node->left->key) {
    node->left = rotate_left(node->left);
    return rotate_right(node);
  }
  if (bf < -1 && key < node->right->key) {
    node->right = rotate_right(node->right);
    return rotate_left(node);
  }

  return node;
}`,
    },
    {
      name: 'Left Rotation',
      language: 'c',
      code: `AVLNode* rotate_left(AVLNode* x) {
  AVLNode* y = x->right;
  AVLNode* T2 = y->left;

  y->left = x;
  x->right = T2;

  x->height = 1 + max(avl_height(x->left), 
                      avl_height(x->right));
  y->height = 1 + max(avl_height(y->left), 
                      avl_height(y->right));

  return y;
}`,
    },
    {
      name: 'Right Rotation',
      language: 'c',
      code: `AVLNode* rotate_right(AVLNode* y) {
  AVLNode* x = y->left;
  AVLNode* T2 = x->right;

  x->right = y;
  y->left = T2;

  y->height = 1 + max(avl_height(y->left), 
                      avl_height(y->right));
  x->height = 1 + max(avl_height(x->left), 
                      avl_height(x->right));

  return x;
}`,
    },
    {
      name: 'Balance Factor',
      language: 'c',
      code: `int avl_height(AVLNode* node) {
  return node ? node->height : 0;
}

int avl_balance_factor(AVLNode* node) {
  return node ? avl_height(node->left) - 
              avl_height(node->right) : 0;
}

int max(int a, int b) {
  return a > b ? a : b;
}`,
    },
    {
      name: 'Delete Operation',
      language: 'c',
      code: `AVLNode* avl_delete(AVLNode* node, int key) {
  if (!node) return NULL;

  if (key < node->key)
    node->left = avl_delete(node->left, key);
  else if (key > node->key)
    node->right = avl_delete(node->right, key);
  else {
    if (!node->left) {
      AVLNode* temp = node->right;
      free(node);
      return temp;
    }
    if (!node->right) {
      AVLNode* temp = node->left;
      free(node);
      return temp;
    }
    AVLNode* succ = avl_min(node->right);
    node->key = succ->key;
    node->right = avl_delete(node->right, succ->key);
  }

  if (!node) return NULL;
  node->height = 1 + max(avl_height(node->left), 
                         avl_height(node->right));
  int bf = avl_balance_factor(node);

  if (bf > 1 && avl_balance_factor(node->left) >= 0)
    return rotate_right(node);
  if (bf > 1 && avl_balance_factor(node->left) < 0) {
    node->left = rotate_left(node->left);
    return rotate_right(node);
  }
  if (bf < -1 && avl_balance_factor(node->right) <= 0)
    return rotate_left(node);
  if (bf < -1 && avl_balance_factor(node->right) > 0) {
    node->right = rotate_right(node->right);
    return rotate_left(node);
  }

  return node;
}`,
    },
  ];

  const rbtCodeC: CodeExample[] = [
    {
      name: 'Left Rotation',
      language: 'c',
      code: `void rbt_left_rotate(RBTree *tree, RBNode *x) {
  if (!tree || !x || !x->right) return;
  
  RBNode *y = x->right;
  
  x->right = y->left;
  if (y->left) {
    y->left->parent = x;
  }
  
  y->parent = x->parent;
  if (!x->parent) {
    tree->root = y;
  } else if (x == x->parent->left) {
    x->parent->left = y;
  } else {
    x->parent->right = y;
  }
  
  y->left = x;
  x->parent = y;
}`,
    },
    {
      name: 'Right Rotation',
      language: 'c',
      code: `void rbt_right_rotate(RBTree *tree, RBNode *x) {
  if (!tree || !x || !x->left) return;
  
  RBNode *y = x->left;
  
  x->left = y->right;
  if (y->right) {
    y->right->parent = x;
  }
  
  y->parent = x->parent;
  if (!x->parent) {
    tree->root = y;
  } else if (x == x->parent->left) {
    x->parent->left = y;
  } else {
    x->parent->right = y;
  }
  
  y->right = x;
  x->parent = y;
}`,
    },
    {
      name: 'Insert Fixup',
      language: 'c',
      code: `void rbt_insert_fixup(RBTree *tree, RBNode *z) {
  if (!tree || !z) return;
  
  RBNode *y;
  
  while (z->parent && z->parent->color == RED) {
    RBNode *gp = rbt_get_grandparent(z);
    
    if (!gp) break;
    
    if (z->parent == gp->left) {
      y = gp->right;
      
      if (y && y->color == RED) {
        z->parent->color = BLACK;
        y->color = BLACK;
        gp->color = RED;
        z = gp;
      } else {
        if (z == z->parent->right) {
          z = z->parent;
          rbt_left_rotate(tree, z);
        }
        
        z->parent->color = BLACK;
        gp->color = RED;
        rbt_right_rotate(tree, gp);
      }
    } else {
      y = gp->left;
      
      if (y && y->color == RED) {
        z->parent->color = BLACK;
        y->color = BLACK;
        gp->color = RED;
        z = gp;
      } else {
        if (z == z->parent->left) {
          z = z->parent;
          rbt_right_rotate(tree, z);
        }
        
        z->parent->color = BLACK;
        gp->color = RED;
        rbt_left_rotate(tree, gp);
      }
    }
  }
  
  tree->root->color = BLACK;
}`,
    },
    {
      name: 'Insert Operation',
      language: 'c',
      code: `RBNode* rbt_insert(RBTree *tree, int key) {
  if (!tree) return NULL;
  
  RBNode *z = rbt_node_create(key);
  if (!z) return NULL;
  
  RBNode *y = NULL;
  RBNode *x = tree->root;
  
  while (x) {
    y = x;
    if (z->key < x->key)
      x = x->left;
    else
      x = x->right;
  }
  
  z->parent = y;
  
  if (!y) {
    tree->root = z;
  } else if (z->key < y->key) {
    y->left = z;
  } else {
    y->right = z;
  }
  
  z->color = RED;
  rbt_insert_fixup(tree, z);
  
  return z;
}`,
    },
  ];


  const codeExamples = treeType === 'bst' ? bstCodeC : (treeType === 'avl' ? avlCodeC : rbtCodeC);
  const currentCode = codeExamples[selectedCode];

  return (
    <div className="code-panel">
      <h2>💻 C Backend Implementation</h2>
      <p>Explore the actual C backend code for {treeType.toUpperCase()} operations</p>

      <div className="code-selector">
        {codeExamples.map((example, index) => (
          <button
            key={index}
            className={`code-btn ${selectedCode === index ? 'active' : ''}`}
            onClick={() => setSelectedCode(index)}
          >
            {example.name}
          </button>
        ))}
      </div>

      <div className="code-display">
        <div className="code-header">
          <span className="code-title">{currentCode.name}</span>
          <span className="code-language">{currentCode.language}</span>
        </div>
        <pre className="code-block">
          <code>{currentCode.code}</code>
        </pre>
      </div>

      <div className="code-info">
        <h4>💡 Key Points:</h4>
        {selectedCode === 0 && treeType === 'bst' && (
          <ul>
            <li>Uses malloc() for dynamic memory allocation</li>
            <li>Recursive approach with pointer manipulation</li>
            <li>Returns pointer to new/updated node</li>
            <li>Time Complexity: O(log n) avg, O(n) worst</li>
          </ul>
        )}
        {selectedCode === 1 && treeType === 'bst' && (
          <ul>
            <li>Recursive binary search implementation</li>
            <li>Returns pointer if found, NULL if not found</li>
            <li>Leverages BST property for efficient search</li>
            <li>Time Complexity: O(log n) avg, O(n) worst</li>
          </ul>
        )}
        {selectedCode === 2 && treeType === 'bst' && (
          <ul>
            <li>Three cases: leaf, one child, two children</li>
            <li>Inorder successor replaces deleted node</li>
            <li>Frees memory of deleted node</li>
            <li>Time Complexity: O(log n) avg, O(n) worst</li>
          </ul>
        )}
        {selectedCode === 3 && treeType === 'bst' && (
          <ul>
            <li>Inorder traversal produces sorted sequence</li>
            <li>Uses array pointer to store results</li>
            <li>Index pointer tracks array position</li>
            <li>Time Complexity: O(n)</li>
          </ul>
        )}

        {selectedCode === 0 && treeType === 'avl' && (
          <ul>
            <li>Insert as regular BST then rebalance</li>
            <li>Height updated after insertion</li>
            <li>Four rotation types: LL, RR, LR, RL</li>
            <li>Time Complexity: O(log n)</li>
          </ul>
        )}
        {selectedCode === 1 && treeType === 'avl' && (
          <ul>
            <li>Left rotation for right-heavy trees</li>
            <li>Preserves BST ordering</li>
            <li>O(1) time - pointer adjustments only</li>
            <li>Updates heights after rotation</li>
          </ul>
        )}
        {selectedCode === 2 && treeType === 'avl' && (
          <ul>
            <li>Right rotation for left-heavy trees</li>
            <li>Mirror operation of left rotation</li>
            <li>O(1) time - pointer adjustments only</li>
            <li>Maintains height invariant</li>
          </ul>
        )}
        {selectedCode === 3 && treeType === 'avl' && (
          <ul>
            <li>BF = height(left) - height(right)</li>
            <li>Valid range: -1, 0, 1</li>
            <li>Helper functions for height calculation</li>
            <li>Critical for determining rotation type</li>
          </ul>
        )}
        {selectedCode === 4 && treeType === 'avl' && (
          <ul>
            <li>Delete node using inorder successor</li>
            <li>Rebalance tree after deletion</li>
            <li>May require multiple rotations</li>
            <li>Time Complexity: O(log n)</li>
          </ul>
        )}

        {selectedCode === 0 && treeType === 'rbt' && (
          <ul>
            <li>Adjusts pointers for left rotation</li>
            <li>Updates parent pointers throughout</li>
            <li>Handles root change if needed</li>
            <li>O(1) time - only pointer changes</li>
          </ul>
        )}
        {selectedCode === 1 && treeType === 'rbt' && (
          <ul>
            <li>Mirror of left rotation</li>
            <li>Updates parent pointers correctly</li>
            <li>Handles root reassignment</li>
            <li>O(1) time operation</li>
          </ul>
        )}
        {selectedCode === 2 && treeType === 'rbt' && (
          <ul>
            <li>Three fix-up cases: recolor, LR/RL rotate, LL/RR rotate</li>
            <li>Maintains RED-BLACK properties</li>
            <li>While loop continues until RED-RED resolved</li>
            <li>Ensures root is always BLACK</li>
          </ul>
        )}
        {selectedCode === 3 && treeType === 'rbt' && (
          <ul>
            <li>Standard BST insertion with pointers</li>
            <li>New nodes inserted as RED</li>
            <li>Calls fixup to restore RB properties</li>
            <li>Time Complexity: O(log n)</li>
          </ul>
        )}
      </div>
    </div>
  );
}
