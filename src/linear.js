'use strict';
const List = require('./list');
const Node = require('./node');

class Linear extends List {
  _appendHead(value) {
    const {_head} = this;
    const node = new Node(value);
    node.next = _head;
    this._head.previous = node;
    this._head = node;
    this._length++;
  }

  _appendLast(value) {
    const {_last} = this;
    const node = new Node(value);
    node.prev = _last;
    this._last.next = node;
    this._last = node;
    this._length++;
  }

  _initializeList(value) {
    const node = new Node(value);
    this._head = node;
    this._last = node;
    this._length++;
  }

  _removeHead() {
    const {next} = this._head;

    if (!next) {
      return this.clear();
    }

    this._head = next;
    this._head.prev = null;
    this._length--;
    return this;
  }

  _removeLast() {
    const {prev} = this._last;

    if (!prev) {
      return this.clear();
    }

    this._last = prev;
    this._last.next = null;
    this._length--;
    return this;
  }

  _removeNode(index) {
    const node = this.node(index);
    const {prev, next} = node;
    prev.next = next;
    next.prev = prev;
    this._length--;
    return this;
  }

  append(...values) {
    values.forEach(value => {
      if (this.isEmpty()) {
        return this._initializeList(value);
      }

      return this._appendLast(value);
    });
    return this;
  }

  filter(fn) {
    const list = new Linear();

    this.forEach(x => {
      if (fn(x)) {
        list.append(x);
      }
    });

    return list;
  }

  forEach(fn) {
    let {_head: node} = this;

    while (node) {
      fn(node.value);
      node = node.next;
    }

    return this;
  }

  get(index) {
    const {value} = this.node(index);
    return value;
  }

  join(separator) {
    let result = '';
    let {_head: node} = this;

    while (node) {
      result += node.value;

      if (node.next) {
        result += separator;
      }

      node = node.next;
    }

    return result;
  }

  reduce(fn, acc) {
    let result = acc;

    this.forEach(x => {
      result = fn(result, x);
    });

    return result;
  }

  map(fn) {
    const list = new Linear();
    this.forEach(x => list.append(fn(x)));
    return list;
  }

  node(index) {
    if (!this._isValid(index)) {
      throw new RangeError('List index out of bounds');
    }

    let count = 0;
    let {_head: node} = this;

    while (index !== count) {
      node = node.next;
      count++;
    }

    return node;
  }

  prepend(...values) {
    values.forEach(value => {
      if (this.isEmpty()) {
        return this._initializeList(value);
      }

      return this._appendHead(value);
    });
    return this;
  }

  remove(index) {
    if (index === 0) {
      return this._removeHead();
    }

    if (index === this.length - 1) {
      return this._removeLast();
    }

    return this._removeNode(index);
  }

  reverse() {
    const list = new Linear();
    this.forEach(x => list.prepend(x));
    return list;
  }

  set({value, index}) {
    const node = this.node(index);
    node.value = value;
    return this;
  }

  toArray() {
    const array = [];
    this.forEach(x => array.push(x));
    return array;
  }
}

module.exports = Linear;
