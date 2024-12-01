import express from 'express';
import productRoutes from './routes/productRoutes';

const port = 8000;
const localhost = `http://localhost:${port}`;

const app = express();
app.use(express.json());

app.use('/api', productRoutes);

const run = async () => {
  app.listen(port, () => {
    console.log(`Server running at ${localhost}`);
  });
};

void run();
