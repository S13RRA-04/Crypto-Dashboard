import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import etherscanRoutes from './routes/etherscan';
import moralisRoutes from './routes/moralis';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/etherscan', etherscanRoutes);
app.use('/api/moralis', moralisRoutes);

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
  });

export default app;
