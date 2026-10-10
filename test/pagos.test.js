const test = require('node:test');
const assert = require('node:assert');
const { totalCarrito } = require('../src/pagos');

test('suma el total del carrito', () => {
  const total = totalCarrito([{ id: 1, cantidad: 1 }, { id: 3, cantidad: 2 }]);
  assert.strictEqual(total, 270000);
});

test('ignora productos que no existen', () => {
  assert.strictEqual(totalCarrito([{ id: 99, cantidad: 5 }]), 0);
});
