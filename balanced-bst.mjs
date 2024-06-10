import { sort } from "./sort.mjs";

function Node(data) {
  let right = null;
  let left = null;
  return { data, left, right };
}

function buildTree(arr, start = 0, end = arr.length - 1) {
  if (start > end) {
    return null;
  }

  const midIndex = Math.floor((start + end) / 2);
  const root = Node(arr[midIndex]);

  root.left = buildTree(arr, start, midIndex - 1);
  root.right = buildTree(arr, midIndex + 1, end);

  return root;
}

export default class Tree {
  _root;
  constructor(arr) {
    this._root = buildTree(sort(arr, true));
  }

  insert(value, node = this._root) {
    if (node === null) return new Node(value);

    if (value > node.data) {
      node.right = this.insert(value, node.right);
    } else if (value < node.data) {
      node.left = this.insert(value, node.left);
    }

    return node;
  }

  deleteItem(value, node = this._root) {
    if (node === null) return null;

    if (value === node.data) {
      if (!!node.right && !!node.left) {
        node.data = this.minValue(node.right);
        node.right = this.deleteItem(node.data, node.right);
      } else {
        node = node.right ? node.right : node.left;
      }
    } else {
      if (value > node.data) {
        node.right = this.deleteItem(value, node.right);
      } else if (value < node.data) {
        node.left = this.deleteItem(value, node.left);
      }
    }

    return node;
  }

  find(value) {
    let searchNode = this._root;

    while (searchNode !== null) {
      if (searchNode.data === value) {
        break;
      }
      searchNode = value > searchNode.data ? searchNode.right : searchNode.left;
    }

    return searchNode;
  }

  levelOrder(callback = null) {
    let queue = [this._root];
    let valuesArr = [];

    while (!!queue.length) {
      if (queue[0].left !== null) {
        queue.push(queue[0].left);
      }
      if (queue[0].right !== null) {
        queue.push(queue[0].right);
      }
      if (callback === null) {
        valuesArr.push(queue.shift().data);
      } else {
        callback(queue.shift());
      }
    }

    return callback === null ? valuesArr : true;
  }

  inOrder(callback = null, node = this._root) {
    if (!node.left && !node.right) return [node.data];

    const valueLeft = [];
    const valueRight = [];

    if (node.left !== null) {
      valueLeft.push(...this.inOrder(callback, node.left));
    }
    if (callback !== null) {
      callback(node);
    }
    if (node.right !== null) {
      valueRight.push(...this.inOrder(callback, node.right));
    }

    return [...valueLeft, node.data, ...valueRight];
  }

  preOrder(callback = null, node = this._root) {
    if (!node.left && !node.right) return [node.data];

    const valueLeft = [];
    const valueRight = [];

    if (callback !== null) {
      callback(node);
    }
    if (node.left !== null) {
      valueLeft.push(...this.preOrder(callback, node.left));
    }
    if (node.right !== null) {
      valueRight.push(...this.preOrder(callback, node.right));
    }

    return [node.data, ...valueLeft, ...valueRight];
  }

  postOrder(callback = null, node = this._root) {
    if (!node.left && !node.right) return [node.data];

    const valueLeft = [];
    const valueRight = [];

    if (node.left !== null) {
      valueLeft.push(...this.postOrder(callback, node.left));
    }
    if (node.right !== null) {
      valueRight.push(...this.postOrder(callback, node.right));
    }
    if (callback !== null) {
      callback(node);
    }

    return [...valueLeft, ...valueRight, node.data];
  }

  height(node = this._root) {
    if (!node.right && !node.left) return 1;

    const leftDepth = 1 + (!node.left ? 0 : this.height(node.left));
    const rightDepth = 1 + (!node.right ? 0 : this.height(node.right));

    return leftDepth > rightDepth ? leftDepth : rightDepth;
  }

  depth(node) {
    let depthValue = 1;
    let searchNode = this._root;

    while (true) {
      if (searchNode === node) {
        return depthValue;
      }

      depthValue += 1;
      searchNode =
        node.data > searchNode.data ? searchNode.right : searchNode.left;
    }
  }

  minValue(node = this._root) {
    let searchNode = node;
    while (searchNode.left !== null) {
      searchNode = searchNode.left;
    }

    return searchNode.data;
  }
}
