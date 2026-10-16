// Módulo de pagos: calcula el total del carrito y prepara el cobro.
const _ = require('lodash');
const { buscarProducto } = require('./catalogo');

// La clave de la pasarela se lee del entorno. Nunca se escribe en el código.
const PASARELA_API_KEY = process.env.PASARELA_API_KEY;

function totalCarrito(items) {
  return _.sumBy(items, (item) => {
    const producto = buscarProducto(item.id);
    return producto ? producto.precio * item.cantidad : 0;
  });
}

function prepararCobro(items) {
  return {
    total: totalCarrito(items),
    moneda: 'COP',
    pasarelaConfigurada: Boolean(PASARELA_API_KEY),
  };
}

module.exports = { totalCarrito, prepararCobro };
