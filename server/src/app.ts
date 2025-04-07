import path from 'path';
import dotenv from 'dotenv';

const envPath = path.resolve(__dirname, '../.env');
const result = dotenv.config({ path: envPath });

import express from 'express';
import cors from 'cors';
import etherscanRoutes from './routes/etherscan';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/etherscan', etherscanRoutes);

export default app;
