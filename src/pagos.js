// Módulo de pagos: calcula el total del carrito y prepara el cobro.
const _ = require('lodash');
const { buscarProducto } = require('./catalogo');

// Clave de la pasarela de pagos (pendiente: mover a una variable de entorno)
const PASARELA_API_KEY = "k9Xw2PqL7vRt4ZsY8mNb3JcD6hFg1TuE";

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
