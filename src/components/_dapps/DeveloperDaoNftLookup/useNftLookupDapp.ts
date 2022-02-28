import {
  DEVELOPER_DAO_CONTRACT,
  DEVELOPER_DAO_CONTRACT_ABI,
  ALCHEMY_URL,
  DEVELOPER_DAO_CONTRACT_NETWORK_PROVIDER,
  INFURA_PROJECT_ID,
  INFURA_PROJECT_SECRET,
} from '@utils/DeveloperDaoConstants'
import { getDefaultProvider, providers, Contract } from 'ethers'
import { useSearchParams } from 'solid-app-router'
import { createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'
import type { IStateNftLookupDapp } from './types'

const MODE = import.meta.env.MODE
const cachedTokensByAddress: { [key: string]: number[] } = {}

// Return a provider
function getProvider() {
  const infuraConfig = {
    projectId: INFURA_PROJECT_ID,
  }

  if (MODE === 'production') infuraConfig.projectSecret = INFURA_PROJECT_SECRET // avoid CORS error locally

  const defaultProvider = getDefaultProvider(DEVELOPER_DAO_CONTRACT_NETWORK_PROVIDER, {
    infura: infuraConfig,
  })
  const providerAlchemy = new providers.JsonRpcProvider(ALCHEMY_URL, DEVELOPER_DAO_CONTRACT_NETWORK_PROVIDER)
  const fallbackProviders = [defaultProvider, providerAlchemy]

  const provider = new providers.FallbackProvider(fallbackProviders)
  return provider
}

// Fetch Dev NFT with a given ID
async function fetchNFT(id: number, onError: () => void) {
  try {
    const provider = getProvider()
    const contract = new Contract(DEVELOPER_DAO_CONTRACT, DEVELOPER_DAO_CONTRACT_ABI, provider)
    const promises = [
      contract.getOS(id),
      contract.getTextEditor(id),
      contract.getLanguage(id),
      contract.getIndustry(id),
      contract.getLocation(id),
      contract.getMind(id),
      contract.getVibe(id),
      contract.getClothing(id),
      contract.tokenURI(id),
    ]
    const result = await Promise.all(promises)
    const tokenRawData = await fetch(result[8])
    const tokenData = await tokenRawData.json()
    const nft = {
      os: result[0],
      text_editor: result[1],
      language: result[2],
      industry: result[3],
      location: result[4],
      mind: result[5],
      vibe: result[6],
      clothing: result[7],
      raw: tokenData,
    }
    return nft
  } catch (err) {
    onError()
    console.error(err)
  }
}

// Fetch owner of Dev NFT with a given ID
async function fetchNFTOwner(id: number, onError: () => void) {
  try {
    const provider = getProvider()
    const contract = new Contract(DEVELOPER_DAO_CONTRACT, DEVELOPER_DAO_CONTRACT_ABI, provider)
    const hexOwnerAddress = await contract.ownerOf(id)
    const ensOwnerAddress = hexOwnerAddress !== null ? await provider.lookupAddress(hexOwnerAddress) : null

    return ensOwnerAddress === null ? hexOwnerAddress : ensOwnerAddress
  } catch (err) {
    onError()
    console.error(err)
  }
}

// Fetch other nfts owned by a given address
async function fetchNFTOwnedByAddress(address: string, onError: () => void) {
  try {
    const provider = getProvider()
    const contract = new Contract(DEVELOPER_DAO_CONTRACT, DEVELOPER_DAO_CONTRACT_ABI, provider)
    const ownerTokenCount = parseInt(await contract.balanceOf(address))
    const indexes = Array.from({ length: ownerTokenCount }, (_, k) => k)
    const tokens = await Promise.all(
      indexes.map(async (i) => parseInt(await contract.functions.tokenOfOwnerByIndex(address, i))),
    )
    tokens.sort((a, b) => a - b)
    cachedTokensByAddress[address] = tokens
    return tokens
  } catch (err) {
    onError()
    console.error(err)
  }
}

export default function useNftLookupDapp() {
  const [searchParams] = useSearchParams() // get nft id from URL params
  // default state for our store
  const [store, setStore] = createStore<IStateNftLookupDapp>({
    lookupId: searchParams.id ? searchParams.id : 1, // default lookup id to 1 when no `id` url parameter was specified
    nftData: {
      loading: true,
      error: null,
      value: null,
    },
    owner: {
      loading: true,
      error: null,
      address: null,
    },
    ownerNFTList: {
      list: [],
      loading: false,
      error: null,
    },
  })

  // Run this when lookup id change
  createEffect(async () => {
    /*
     ** 1# Fetch NFT with the newest lookup id provided by the user
     */
    try {
      setStore('nftData', {
        loading: true,
        error: null,
        value: null,
      })
      const nft = await fetchNFT(store.lookupId, () =>
        setStore('nftData', {
          value: null,
          loading: false,
          error: `NFT with id ${store.lookupId} couldn't be retrieved`,
        }),
      )
      setStore('nftData', { value: nft, loading: false, error: null })
    } catch (e) {
      console.error(`Something went wrong while NFT#${store.lookupId}`)
      console.error(e)
    }
    /*
     ** 2# Fetch the owner of the NFT
     */
    try {
      setStore('owner', {
        loading: true,
        error: null,
        address: null,
      })
      const address = await fetchNFTOwner(store.lookupId, () =>
        setStore('owner', { loading: false, error: `Owner of token id ${store.lookupId} couldn't be retrieved` }),
      )
      setStore('owner', { address, loading: false, error: null })
    } catch (e) {
      console.error(`Something went wrong while fetching the owner of NFT#${store.lookupId}`)
      console.error(e)
    }
    /*
     ** 2# If this NFT has an owner, fetch the other Dev NFT of this address
     */
    if (store.owner.address !== null && store.owner.loading === false) {
      try {
        setStore('ownerNFTList', {
          loading: true,
          error: null,
          list: [],
        })
        const listOfOtherTokens =
          cachedTokensByAddress[store.owner.address] ||
          (await fetchNFTOwnedByAddress(store.owner.address, () =>
            setStore('ownerNFTList', {
              list: [],
              loading: false,
              error: `Other NFTs owned by this address couldn't be retrieved`,
            }),
          ))
        setStore('ownerNFTList', { list: listOfOtherTokens, loading: false, error: null })
      } catch (e) {
        console.error(`Something went wrong while fetching the other NFTs of ${store.owner.address}`)
        console.error(e)
      }
    }
  })

  return [store, setStore]
}
