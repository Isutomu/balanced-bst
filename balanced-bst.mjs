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
}
