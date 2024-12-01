import express from 'express';

const app = express();

const port = 8000;
const localhost = `http://localhost:${port}`;

const run = async () => {
    app.listen(port, () => {
        console.log(`Server running at ${localhost}`);
    });
};

void run();