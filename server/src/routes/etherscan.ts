import { Router } from 'express';
import axios from 'axios';

const router = Router();
const ETHERSCAN_API = process.env.ETHERSCAN_API!;

if (!ETHERSCAN_API) {
    console.error('❌ Missing ETHERSCAN_API in environment variables');
    console.log(`[DEBUG] Calling Etherscan with API: ${ETHERSCAN_API}`);
    console.log(`[DEBUG] Etherscan API Key: ${ETHERSCAN_API}`);
    console.log(`[DEBUG] Etherscan API URL: https://api.etherscan.io/api`);
  process.exit(1);}

router.get('/balance/:address', async (req, res) => {
  const { address } = req.params;

  try {
    const response = await axios.get('https://api.etherscan.io/api', {
      params: {
        module: 'account',
        action: 'balance',
        address,
        tag: 'latest',
        apikey: ETHERSCAN_API
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Etherscan' });
  }
});

export default router;
