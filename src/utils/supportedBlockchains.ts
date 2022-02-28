export const SUPPORTED_BLOCKCHAINS = [
  {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://main-light.eth.linkpool.io/'],
    blockExplorerUrls: ['https://etherscan.io/'],
  },
  {
    chainId: '0x4',
    chainName: 'Rinkeby (testnet)',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rinkeby-light.eth.linkpool.io/'],
    blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
  },
]
export const SUPPORTED_BLOCKCHAINS_IDS = SUPPORTED_BLOCKCHAINS.map((b) => b.chainId)
export const BLOCKCHAINS_RECORD = {
  1: {
    name: 'Ethereum Mainnet',
    token: 'ETH',
    isMainnet: true,
  },
  3: {
    name: 'Ropsten',
    token: 'ETH',
    isMainnet: false,
  },
  4: {
    name: 'Rinkeby',
    token: 'ETH',
    isMainnet: false,
  },
  5: {
    name: 'Goerli',
    token: 'ETH',
    isMainnet: false,
  },
  10: {
    name: 'Optimism',
    token: 'ETH',
    isMainnet: true,
  },
  42: {
    name: 'Kovan',
    token: 'ETH',
    isMainnet: false,
  },
  56: {
    name: 'Binance Smart Chain',
    token: 'BNB',
    isMainnet: true,
  },
  66: {
    name: 'OKExChain',
    token: 'OKT',
    isMainnet: true,
  },
  100: {
    name: 'xDai',
    token: 'xDai',
    isMainnet: true,
  },
  128: {
    name: 'Heco',
    token: 'HT',
    isMainnet: true,
  },
  137: {
    name: 'Polygon',
    token: 'MATIC',
    isMainnet: true,
  },
  250: {
    name: 'Fantom',
    token: 'FTM',
    isMainnet: true,
  },
  4002: {
    name: 'Fantom',
    token: 'FTM',
    isMainnet: false,
  },
  42220: {
    name: 'Celo',
    token: 'CELO',
    isMainnet: true,
  },
  43114: {
    name: 'Avalanche',
    token: 'AVAX',
    isMainnet: true,
  },
  421611: {
    name: 'Arbitrum',
    token: 'ETH',
    isMainnet: true,
  },
  1666600000: {
    name: 'Harmony One',
    token: 'ONE',
    isMainnet: true,
  },
}
