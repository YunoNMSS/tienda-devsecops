const express = require('express');
const { productos } = require('./catalogo');
const { prepararCobro } = require('./pagos');

const app = express();
app.use(express.json());

app.get('/productos', (req, res) => {
  res.json(productos);
});

app.post('/carrito/cobro', (req, res) => {
  const items = Array.isArray(req.body.items) ? req.body.items : [];
  res.json(prepararCobro(items));
});

if (require.main === module) {
  const puerto = process.env.PORT || 3000;
  app.listen(puerto, () => console.log(`Tienda escuchando en el puerto ${puerto}`));
}

module.exports = app;
