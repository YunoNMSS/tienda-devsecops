// Catálogo de la tienda. En una aplicación real vendría de una base de datos.
const productos = [
  { id: 1, nombre: 'Reloj clásico', precio: 180000 },
  { id: 2, nombre: 'Reloj deportivo', precio: 240000 },
  { id: 3, nombre: 'Correa de cuero', precio: 45000 },
];

function buscarProducto(id) {
  return productos.find((p) => p.id === Number(id));
}

module.exports = { productos, buscarProducto };
