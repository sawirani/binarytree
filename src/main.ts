class BinaryTreeNode<K, V> {

  constructor(private _key: K,
              private _value: V,
              private _left: BinaryTreeNode<K, V> = null,
              private _right: BinaryTreeNode<K, V> = null) {
  }

  public get key(): K {
    return this._key;
  }

  public get value(): V {
    return this._value;
  }

  public get left(): BinaryTreeNode<K, V> {
    return this._left;
  }

  public get right(): BinaryTreeNode<K, V> {
    return this._right;
  }

  public set left(left: BinaryTreeNode<K, V>) {
    this._left = left;
  }

  public set right(right: BinaryTreeNode<K, V>) {
    this._right = right;
  }

  public set key(key: K) {
    this._key = key;
  }
}


class BinaryTree<K, V> {

  private _root: BinaryTreeNode<K, V> = null;

  public Add(key: K, value: V): void {
    if (this._root === null) {
      this._root = new BinaryTreeNode(key, value);
    } else {
      this.Insert(this._root, key, value);
    }
  }

  private Insert(root: BinaryTreeNode<K, V>, key: K, value: V): BinaryTreeNode<K, V> {
    if (root === null) {
      return new BinaryTreeNode(key, value);
    } else if (root.key >= key) {
      root.left = this.Insert(root.left, key, value);
    } else if (root.key < key) {
      root.right = this.Insert(root.right, key, value);
    }
    return root;
  }

  private SearshByKey(root: BinaryTreeNode<K, V>, key: K): V {
    if (root === null) {
      return null;
    } else if ((root.key === key) || (root === null)) {
      return root.value;
    } else if (root.key > key) {
      return this.SearshByKey(root.left, key);
    } else if (root.key < key) {
      return this.SearshByKey(root.right, key);
    }
  }

  public GetValueByKey(key: K): V {

    return this.SearshByKey(this._root, key);
  }

  public DeleteByKey(key: K): BinaryTreeNode<K, V> {

    return this.Delete(this._root, key);
  }

  private Delete(root: BinaryTreeNode<K, V>, key: K): BinaryTreeNode<K, V> {
    if (root === null) {
      return root;
    } else if (root.key > key) {
      root.left = this.Delete(root.left, key);
    } else if (root.key < key) {
      root.right = this.Delete(root.right, key);
    } else if (root.left != null && root.right != null) {
      root.key = this.Min(root.right).key;
      root.right = this.Delete(root.right, root.key);
    } else if (root.left != null) {
      root = root.left;
    } else {
      root = root.right;
    }
    return root;
  }

  private Min(root: BinaryTreeNode<K, V>): BinaryTreeNode<K, V> {
    if (root.left == null) {
      return root;
    }
    return this.Min(root.left);
  }

  // Вывод дерева в строку, кадждую вершину представляем, как (key,left,right)
  public Print(): string {
    if (this._root === null) {
      return 'null';
    } else {
      return this.toString(this._root);
    }
  }

  private toString(root: BinaryTreeNode<K, V>): string {
    if ((root.left === null) && (root.right == null)) {
      return '(' + root.key + ', null, null)';
    } else if ((root.left === null) && (root.right !== null)) {
      return '(' + root.key + ', null,' + root.right.key + ' )' + this.toString(root.right);
    } else if ((root.left !== null) && (root.right === null)) {
      return '(' + root.key + ', ' + root.left.key + ', null)' + this.toString(root.left);
    } else if ((root.left !== null) && (root.right !== null)) {
      return '(' + root.key + ', ' + root.left.key + ', ' + root.right.key + ')' + this.toString(root.left) + this.toString(root.right);
    }
  }
}

let node: BinaryTree<number, string> = new BinaryTree();

node.Add(8, '8');
node.Add(5, '5');
node.Add(13, '13');
node.Add(6, '6');
node.Add(6, '6');
node.Add(25, '25');
node.Add(15, '15');
node.Add(3, '3');

node.DeleteByKey(13);

console.log('Get Value 5: ' + node.GetValueByKey(5));
console.log('Get Value 235: ' + node.GetValueByKey(235));

console.log(node.Print());

console.dir(node);


