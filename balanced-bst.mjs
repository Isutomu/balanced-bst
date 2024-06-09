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
    if (node.data === value) return;

    if (value > node.data && !node.right) {
      node.right = new Node(value);
    } else if (value < node.data && !node.left) {
      node.left = new Node(value);
    } else {
      this.insert(value, value > node.data ? node.right : node.left);
    }
  }
}
