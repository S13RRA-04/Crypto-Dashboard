import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

router.get('/balance/:address', async (req: Request, res: Response) => {
  const apiKey = process.env.ETHERSCAN_API;
  const { address } = req.params;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing ETHERSCAN_API' });
  }

  try {
    const response = await axios.get('https://api.etherscan.io/api', {
      params: {
        module: 'account',
        action: 'balance',
        address,
        tag: 'latest',
        apikey: apiKey,
      },
    });

    return res.json(response.data);
  } catch (error) {
    console.error('[Etherscan Error]', (error as Error).message);
    return res.status(500).json({ error: 'Failed to fetch from Etherscan' });
  }
});

export default router;
