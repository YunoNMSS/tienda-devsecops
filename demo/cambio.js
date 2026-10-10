// Aplica los dos cambios de la demostración sobre el proyecto.
//   node demo/cambio.js inseguro   -> el cambio del desarrollador con afán
//   node demo/cambio.js corregido  -> la corrección
// Solo copia archivos; no necesita internet.
const fs = require('node:fs');
const path = require('node:path');

const raiz = path.join(__dirname, '..');
const estado = process.argv[2];

if (!['inseguro', 'corregido'].includes(estado)) {
  console.error('Uso: node demo/cambio.js inseguro | corregido');
  process.exit(1);
}

// La clave es falsa y se arma por partes para que este archivo no dispare el escáner.
const claveFalsa = ['k9Xw2PqL', '7vRt4ZsY', '8mNb3JcD', '6hFg1TuE'].join('');

const lineaClave = {
  inseguro: [
    '// Clave de la pasarela de pagos (pendiente: mover a una variable de entorno)',
    `const PASARELA_API_KEY = "${claveFalsa}";`,
  ],
  corregido: [
    '// La clave de la pasarela se lee del entorno. Nunca se escribe en el código.',
    'const PASARELA_API_KEY = process.env.PASARELA_API_KEY;',
  ],
};

const pagos = `// Módulo de pagos: calcula el total del carrito y prepara el cobro.
const _ = require('lodash');
const { buscarProducto } = require('./catalogo');

${lineaClave[estado].join('\n')}

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
`;

fs.writeFileSync(path.join(raiz, 'src', 'pagos.js'), pagos);
fs.copyFileSync(path.join(__dirname, `package.${estado}.json`), path.join(raiz, 'package.json'));
fs.copyFileSync(path.join(__dirname, `package-lock.${estado}.json`), path.join(raiz, 'package-lock.json'));

console.log(`Listo: se aplicó el cambio "${estado}".`);
console.log('Archivos modificados: src/pagos.js, package.json, package-lock.json');
