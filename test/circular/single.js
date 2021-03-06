'use strict';
const test = require('ava');
const {Circular, Linear, Node} = require('../../.');

const circular = new Circular();

test('append', t => {
  circular.append('A');
  t.is(circular.head.value, 'A');
});

test('head & last values equal', t => {
  t.is(circular.head.value, circular.last.value);
});

test('head points backwards to last', t => {
  t.deepEqual(circular.head.prev, circular.last);
});

test('last points forward to head', t => {
  t.deepEqual(circular.last.next, circular.head);
});

test('empty check', t => {
  t.false(circular.isEmpty());
});

test('get node value', t => {
  t.is(circular.get(0), 'A');
});

test('select node', t => {
  const node = new Node('A');
  node.next = node;
  node.prev = node;
  t.deepEqual(circular.node(0), node);
});

test('next node is head', t => {
  t.deepEqual(circular.node(0).next, circular.node(0));
});

test('incremented length', t => {
  t.is(circular.length, 1);
});

test('set node value', t => {
  circular.set({index: 0, value: 'B'});
  t.is(circular.head.value, 'B');
});

test('update node value', t => {
  circular.node(0).value = 'A';
  t.is(circular.head.value, 'A');
});

test('arrayify', t => {
  t.deepEqual(circular.toArray(), ['A']);
});

test('join', t => {
  t.is(circular.join(), 'A');
});

test('reverse', t => {
  const reversed = circular.reverse();
  t.is(reversed.head.value, 'A');
});

test('map', t => {
  const mapped = circular.map(x => x);
  t.is(circular.head.value, mapped.head.value);
});

test('iterate', t => {
  const array = [];
  circular.forEach(x => array.push(x));
  t.is(circular.head.value, array[0]);
});

test('remove node', t => {
  circular.remove(0);
  t.is(circular.head, null);
});

test('decremented length', t => {
  t.is(circular.length, 0);
});

test('prepend', t => {
  circular.prepend('A');
  t.is(circular.head.value, 'A');
});

test('clear', t => {
  const cleared = circular.clear();
  t.deepEqual(circular, cleared);
});

test('insert', t => {
  circular.insert({value: 'A', index: 0});
  t.is(circular.head.value, 'A');
});

test('reduce', t => {
  t.is(circular.reduce((x, y) => x + y, ''), 'A');
});

test('reduceRight', t => {
  t.is(circular.reduceRight((x, y) => x + y, ''), 'A');
});

test('filter', t => {
  t.deepEqual(circular.filter(x => x.startsWith('A')), circular);
});

test('toString', t => {
  t.is(circular.toString(), 'A');
});

test('toLinear', t => {
  const linear = new Linear();
  linear.append('A');
  t.deepEqual(circular.toLinear(), linear);
});

test('isLinear', t => {
  t.is(circular.isLinear(), false);
});

test('isCircular', t => {
  t.is(circular.isCircular(), true);
});

test('includes', t => {
  circular.clear().append(5);
  t.is(circular.includes(), false);
  t.is(circular.includes(0), false);
  t.is(circular.includes(5), true);
});

test('indexOf', t => {
  t.is(circular.indexOf(), -1);
  t.is(circular.indexOf(0), -1);
  t.is(circular.indexOf(5), 0);
});
