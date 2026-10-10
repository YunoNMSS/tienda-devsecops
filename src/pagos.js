// Módulo de pagos: calcula el total del carrito y prepara el cobro.
const { buscarProducto } = require('./catalogo');

// La clave de la pasarela se lee del entorno. Nunca se escribe en el código.
const PASARELA_API_KEY = process.env.PASARELA_API_KEY;

function totalCarrito(items) {
  return items.reduce((total, item) => {
    const producto = buscarProducto(item.id);
    return producto ? total + producto.precio * item.cantidad : total;
  }, 0);
}

function prepararCobro(items) {
  return {
    total: totalCarrito(items),
    moneda: 'COP',
    pasarelaConfigurada: Boolean(PASARELA_API_KEY),
  };
}

module.exports = { totalCarrito, prepararCobro };
