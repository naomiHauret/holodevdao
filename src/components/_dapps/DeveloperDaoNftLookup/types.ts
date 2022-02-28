import type { StoreNode } from 'solid-js/store'

type NFTOwner = {
  loading: boolean
  error: null | string
  address: null | string
}

type OwnerNFTList = {
  list: Array<number>
  loading: boolean
  error: null | string
}

type NFTDataShape = {
  os: string
  text_editor: string
  language: string
  industry: string
  location: string
  mind: string
  vibe: string
  clothing: string
  raw: string
}

export type NFTData = {
  loading: boolean
  error: null | string
  value: NFTDataShape | null
}

export interface IStateNftLookupDapp extends StoreNode {
  nftData: NFTData
  owner: NFTOwner
  ownerNFTList: OwnerNFTList
  lookupId: number
}

export interface IDeveloperDaoNftLookupProps {
  nft: NFTData
  owner: NFTOwner
  devId: number
}
