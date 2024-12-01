const express = require('express');
const bodyParser = require('body-parser');
const actionRoutes = require('./routes/actionRoutes');

const port = 3000;
const localhost = `http://localhost:${port}`;

const app = express();
app.use(bodyParser.json());

app.use('/api', actionRoutes);

app.listen(port, () => {
  console.log(`Server running at ${localhost}`);
});