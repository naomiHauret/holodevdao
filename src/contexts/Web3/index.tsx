import { onMount, createContext, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { providers } from 'ethers'
import { hexlify } from '@ethersproject/bytes'
import { formatEther } from '@ethersproject/units'
import { SUPPORTED_BLOCKCHAINS_IDS, SUPPORTED_BLOCKCHAINS, BLOCKCHAINS_RECORD } from '@utils/supportedBlockchains'
import type { IPWeb3ProviderProps, IStateUser, StateWeb3 } from './types'

const Web3Context = createContext()

export const Web3Provider = (props: IPWeb3ProviderProps) => {
  let provider: any

  const [state, setState] = createStore<StateWeb3>({
    user: {
      hasMetamaskInstalled: false,
      loadingWallet: true,
      address: null,
      balance: null,
    },
    chain: {
      name: '',
      isSupported: false,
    },
  })
  const store = [
    state,
    {
      requestAccount,
      connectWallet,
    },
  ]

  function setUser(data: IStateUser) {
    setState('user', (newState) => {
      return {
        ...newState,
        ...data,
      }
    })
  }

  function setChain(chainId: number) {
    setState('chain', (newState) => {
      const currentBlockchainId: number = chainId
      const isSupported = SUPPORTED_BLOCKCHAINS_IDS.includes(hexlify(chainId))
      !isSupported &&
        console.warn(
          `${BLOCKCHAINS_RECORD[currentBlockchainId].name} is not supported. Please switch to Ethereum mainnet to use Holographic Developer DAO.`,
        )
      return {
        ...newState,
        isSupported,
        name: BLOCKCHAINS_RECORD[currentBlockchainId].name,
      }
    })
  }

  async function requestAccount() {
    setUser({ loadingWallet: true })

    try {
      const signer = provider.getSigner()
      const address = await signer.getAddress()
      const balance = await provider.getBalance(address)
      const formattedBalance = parseFloat(formatEther(balance._hex)).toFixed(4)
      setUser({
        address,
        loadingWallet: false,
        balance: `${new Intl.NumberFormat('en-GB', { maximumSignificantDigits: 12 }).format(
          parseFloat(formattedBalance),
        )} ETH`,
      })
    } catch (e) {
      setUser({
        loadingWallet: false,
      })
    }
  }

  async function connectWallet() {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      await requestAccount()
    } catch (error: any) {
      if (error.code === 4001) {
        console.warn(error.message)
      }
    }
  }

  async function handlerAccountsChanged() {
    const accounts = await provider.listAccounts()
    if (!accounts.length) {
      setUser({
        address: null,
        balance: null,
        loadingWallet: false,
      })
    } else {
      await requestAccount()
    }
  }

  async function handlerChainChanged() {
    const network = await provider.getNetwork()
    setChain(network.chainId)
  }

  function handlerDisconnect() {
    setUser({
      address: null,
      balance: null,
      loadingWallet: false,
    })
  }

  async function dappInit() {
    provider = new providers.Web3Provider(window.ethereum, 'any')
    const network = await provider.getNetwork()
    setChain(network.chainId)
    await requestAccount()

    window.ethereum.request({ method: 'wallet_addEthereumChain', params: SUPPORTED_BLOCKCHAINS })
    window.ethereum.on('disconnect', handlerDisconnect)
    window.ethereum.on('accountsChanged', handlerAccountsChanged)
    provider.on('network', handlerChainChanged)
  }

  // On mount
  onMount(async () => {
    if (typeof window.ethereum !== 'undefined') {
      // If Metamask is installed
      setUser({ hasMetamaskInstalled: true })
      await dappInit() // init the dapp
    }
  })

  return <Web3Context.Provider value={store}>{props.children}</Web3Context.Provider>
}

export function useWeb3() {
  return useContext(Web3Context)
}
