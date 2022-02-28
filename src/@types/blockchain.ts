import { IToken } from './token'
export interface IBlockchainBasicData {
  name: string
  token: string
  isMainnet: boolean
}

export interface IBlockchainConfig {
  chainId: string
  chainName: string
  nativeCurrency: IToken
  rpcUrls: Array<string>
  blockExplorerUrls: Array<string>
}

export interface IBlockchainRecord {
  [key: number]: IBlockchainBasicData
}
