export type { IToken } from './token'
export type { IBlockchainBasicData, IBlockchainConfig, IBlockchainRecord } from './blockchain'
export { TRANSACTION_STATES } from './transaction'
export type { ITransaction } from './transaction'

declare global {
  interface Window {
    ethereum: any
  }
}
