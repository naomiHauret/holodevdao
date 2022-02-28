import type { JSX } from 'solid-js'

export interface IPWeb3ProviderProps {
  children: JSX.Element
}

export interface IStateChain {
  name: string
  isSupported: boolean
}

export interface IStateUser {
  hasMetamaskInstalled?: boolean
  address?: string | null
  balance?: string | null
  loadingWallet?: boolean
}

export type StateWeb3 = {
  chain: IStateChain
  user: IStateUser
}
