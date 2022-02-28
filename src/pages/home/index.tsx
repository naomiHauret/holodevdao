import { createSignal } from 'solid-js'
import { useSearchParams } from 'solid-app-router'
import { useUserPreferences } from '@contexts/UserPreferences'
import DeveloperDaoNftLookup from '@components/_dapps/DeveloperDaoNftLookup'
import useNftLookupDapp from '@components/_dapps/DeveloperDaoNftLookup/useNftLookupDapp'
import Input from '@components/Input'
import { ButtonCta } from '@components/Button'
import { ListScale } from '@components/Input/types'
import styles from './index.module.css'

export default function Home() {
  const [nftStore, setNftStore] = useNftLookupDapp()
  const [searchParams, setSearchParams] = useSearchParams()
  /* @ts-expect-error */
  const [lookupValue, setLookupValue] = createSignal(nftStore.lookupId)

  function handleSubmit(e: Event) {
    e.preventDefault()
    /* @ts-expect-error */
    setNftStore('lookupId', lookupValue())
    setSearchParams({ id: lookupValue() })
  }

  function handleFieldLookupIdChange(e: any) {
    setLookupValue(e.currentTarget.value)
  }

  return (
    <div class="flex-grow flex flex-col items-center">
      <h1 class="pb-6">
        <div class="flex flex-col items-center leading-none">
          <span class={`tracking-md font-mono text-ss pb-1.5 ${styles.labelHolographic}`}>(holographic)</span>
          <span
            class={`${styles.labelDeveloper} uppercase text-sl font-900 italic text-stroke-neutral-900 text-stroke-ss text-transparent`}
          >
            Developer
          </span>{' '}
          <span class={`${styles.labelDao} uppercase text-sl font-900 italic text-neutral-900`}>DAO</span>
        </div>
      </h1>
      <p class="px-2 font-mono text-sm text-center max-w-prose">
        A community of of developers, designers, writers, students, mentors... learning and working together to build the web of tomorrow.
      </p>
      <p class="px-2 max-w-prose mt-6 mb-2 text-center font-600">
        Checkout any Dev NFT by entering its ID (a number) below.
      </p>
      <div class="flex flex-col items-center pb-5 px-2 mx-auto w-full">
        <form
          onSubmit={handleSubmit}
          classList={{
            /* @ts-expect-error */
            'border-opacity-10': nftStore.nftData.loading === true || nftStore.owner.loading === true,
          }}
          class="shadow-yellow-800 relative border-solid border-ss border-neutral-900 rounded-sm mb-6 flex"
        >
          <label class="focus-within:z-10 ss:flex-shrink-0 flex-grow" for="lookup_nft_id">
            <span class="sr-only">Lookup NFT ID</span>
            <Input
              css="border-md border-opacity-10 border-ie-transparent rounded-ie-none w-full"
              id="lookup_nft_id"
              name="lookup_nft_id"
              value={lookupValue()}
              type="number"
              min="0"
              max="8000"
              step="1"
              scale={ListScale.sm}
              onChange={handleFieldLookupIdChange}
              /* @ts-expect-error */
              disabled={nftStore.nftData.loading === true || nftStore.owner.loading === true ? true : false}
            />
          </label>
          {/* @ts-expect-error */}
          <ButtonCta
            isLoading={nftStore.nftData.loading === true || nftStore.owner.loading === true ? true : false}
            scale="sm"
            variant="primary-solid"
            css="focus-within:z-10 rounded-is-none flex-shrink-0 w-content"
            type="submit"
          >
            {/* @ts-expect-error */}
            {nftStore.nftData.loading === true || nftStore.owner.loading === true ? 'Looking up...' : 'Lookup'}

            <span
              class="pis-2"
              classList={{
                /* @ts-expect-error */
                'animate-flipendo motion-reduced:animate-none':
                  nftStore.nftData.loading === true || nftStore.owner.loading === true,
              }}
              aria-hidden="true"
            >
              👀
            </span>
          </ButtonCta>
        </form>
      </div>
      {/* @ts-expect-error */}
      <DeveloperDaoNftLookup nft={nftStore.nftData} owner={nftStore.owner} devId={nftStore.lookupId} />
    </div>
  )
}
