import { Router, Request, Response } from 'express';
import Moralis from 'moralis';
import dotenv from 'dotenv';

dotenv.config(); 

const router = Router();
const apiKey = process.env.MORALIS_API;

if (!apiKey) {
  console.error('❌ MORALIS_API_KEY is missing');
  process.exit(1);
}

Moralis.start({ apiKey });

router.get('/all/:address', async (req: Request, res: Response) => {
  const { address } = req.params;
  const chain = req.query.chain as string || '0x1'; // fallback to Ethereum Mainnet

  const results: any = {
    walletHistory: null,
    erc20Tokens: null,
    nfts: null,
    prices: null,
    block: null,
    errors: {}
  };

  try {
    const history = await Moralis.EvmApi.wallets.getWalletHistory({ chain, address, order: 'DESC' });
    results.walletHistory = history.result;
  } catch (err) {
    results.errors.walletHistory = formatError(err);
  }

  try {
    const tokens = await Moralis.EvmApi.token.getWalletTokenBalances({ chain, address });
    results.erc20Tokens = tokens.result;
  } catch (err) {
    results.errors.erc20Tokens = formatError(err);
  }

  try {
    const nftRes = await Moralis.EvmApi.nft.getWalletNFTs({ chain, address });
    results.nfts = nftRes.result;
  } catch (err) {
    results.errors.nfts = formatError(err);
  }

  try {
    const price = await Moralis.EvmApi.token.getTokenPrice({ chain, address });
    results.prices = price.result;
  } catch (err) {
    results.errors.prices = formatError(err);
  }

  try {
    const blockData = await Moralis.EvmApi.block.getBlock({ chain, blockNumberOrHash: 'latest' });
    results.block = blockData.result;
  } catch (err) {
    results.errors.block = formatError(err);
  }

  res.json(results);
});

// Reusable error formatter
function formatError(error: any) {
  return {
    message: error?.message || 'Unknown error',
    code: error?.code || null,
    status: error?.details?.status || null,
    info: error?.details?.response?.data?.message || null,
  };
}


export default router;
