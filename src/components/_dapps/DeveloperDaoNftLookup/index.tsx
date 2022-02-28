import { Switch, Match, createEffect, createSignal, Show } from 'solid-js'
import { IconOpenSea, IconTwitter } from '@components/Icons'
import { ButtonLink } from '@components/Button'
import { OPENSEA_DIRECT_LINK_PREFIX } from '@utils/DeveloperDaoConstants'
import VanillaTilt from 'vanilla-tilt'
import WrapperAttributes from './WrapperAttributes'
import WrapperRowAttributes from './WrapperRowAttributes'
import WrapperColAttribute from './WrapperColAttribute'
import SerialNumber from './SerialNumber'
import TicketFrame from './TicketFrame'
import styles from './index.module.css'
import type { IDeveloperDaoNftLookupProps } from './types'
import { ListVariant as ButtonVariant } from '@components/Button/types'

const DeveloperDaoNftLookup = (props: IDeveloperDaoNftLookupProps) => {
  let wrapperTiltedElement: any
  const [taglineText, setTaglineText] = createSignal('Loading (probably nothing...)')

  function initTiltInstance() {
    VanillaTilt.init(wrapperTiltedElement, {
      // sorry, too lazy to re-implement this library in solid
      reverse: true,
      max: 15,
      speed: 600,
      reset: true,
      perspective: 1500,
      transition: true,
      gyroscope: true,
      gyroscopeMinAngleX: -45,
      gyroscopeMaxAngleX: 45,
      gyroscopeMinAngleY: -45,
      gyroscopeMaxAngleY: 45,
    })
  }

  function destroyTiltInstance() {
    wrapperTiltedElement?.vanillaTilt && wrapperTiltedElement.vanillaTilt.destroy()
  }

  // Update tagline text
  createEffect(() => {
    if (props.nft.error !== null || props.owner.error !== null)
      setTaglineText('Something went wrong (definitely something)')
    if (props.nft.loading === true || props.owner.loading === true) setTaglineText('Loading (probably nothing...)')
    if (props.nft.loading === false && props.owner.loading === false && props.nft.error === null)
      setTaglineText('Probably nothing')
  })

  // update tilt instance
  createEffect(() => {
    initTiltInstance()
  })

  return (
    <>
      <div
        ref={wrapperTiltedElement}
        class={`${styles.flipContext} tilt flex flex-col relative w-full max-w-75 min-h-158`}
      >
        <div
          class={`${styles.flipWrapper} motion-reduced:transition-none relative flex-grow`}
          classList={{
            [styles.flipped]:
              props.nft.loading === false &&
              props.owner.loading === false &&
              props.nft.value !== null &&
              props.nft.error === null &&
              props.owner.error === null,
          }}
        >
          <TicketFrame
            tagline={taglineText()}
            ticketNumber={props.devId}
            backgroundStyle={
              props.nft.loading === false && props.owner.loading === false && props.nft.error === null
                ? styles.backFace
                : styles.frontFace
            }
            isBackface={props.nft.loading === false && props.owner.loading === false && props.nft.error === null}
          >
            <Switch>
              <Match when={props.nft.loading === true || props.owner.loading === true || props.nft.error !== null}>
                <div class="m-auto text-center">
                  <Switch>
                    <Match when={props.nft.loading === true || props.owner.loading === true}>
                      <div class="flex font-900 italic text-hl" aria-hidden="true">
                        <span class="block motion-reduced:animate-none animate-flipendo">D</span>
                        <span>_</span>
                        <span class="block motion-reduced:animate-none animate-flipendo">D</span>
                      </div>
                      <p class="sr-only">Loading</p>
                    </Match>
                    <Match when={props.nft.error !== null}>
                      <span class="font-900 italic text-hl" aria-hidden="true">
                        x_x
                      </span>
                      <p class="text-sm font-500 pt-5 px-5">An error occured. Please try reloading the page.</p>
                    </Match>
                  </Switch>
                </div>
              </Match>
              <Match when={props.nft.value !== null && props.nft.loading === false && props.owner.loading === false}>
                <SerialNumber id={props.devId} max="8000" />
                <div class="pt-5 px-1.5">
                  <WrapperAttributes>
                    <WrapperRowAttributes>
                      <WrapperColAttribute
                        label="Owner"
                        value={
                          props.owner.address
                            ? props.owner.address
                            : props.owner.error
                            ? props.owner.error
                            : 'Unclaimed'
                        }
                        valueStyles="font-mono overflow-hidden overflow-ellipsis"
                      />
                    </WrapperRowAttributes>
                    <WrapperRowAttributes>
                      {/* @ts-expect-error */}
                      <WrapperColAttribute label="OS" value={props.nft.value.os} />
                      {/* @ts-expect-error */}
                      <WrapperColAttribute label="Language" value={props.nft.value.language} />
                      {/* @ts-expect-error */}
                      <WrapperColAttribute label="Text editor" value={props.nft.value.text_editor} />
                    </WrapperRowAttributes>
                    <WrapperRowAttributes>
                      {/* @ts-expect-error */}
                      <WrapperColAttribute label="Location" value={props.nft.value.location} />
                      {/* @ts-expect-error */}
                      <WrapperColAttribute label="Industry" value={props.nft.value.industry} />
                    </WrapperRowAttributes>
                    <WrapperRowAttributes>
                      {/* @ts-expect-error */}
                      <WrapperColAttribute label="Mind" value={props.nft.value.mind} />
                      {/* @ts-expect-error */}
                      <WrapperColAttribute label="Vibe" value={props.nft.value.vibe} />
                    </WrapperRowAttributes>
                    <WrapperRowAttributes>
                      {/* @ts-expect-error */}
                      <WrapperColAttribute label="Clothing" value={props.nft.value.clothing} />
                    </WrapperRowAttributes>
                  </WrapperAttributes>
                </div>
                <div class="absolute bottom-8 inline-start-3">
                  <div class="flex flex-col tracking-lg">
                    <span class="font-barcode text-sl">Dev {props.devId}</span>
                    <div class="-mt-5 font-mono text-hs uppercase">Gn Web2. Gm Web3.</div>
                  </div>
                </div>
              </Match>
            </Switch>
          </TicketFrame>
        </div>
      </div>
      <Show when={props.nft.value !== null && props.owner.address !== null}>
        <div class="animate-appear px-2 pt-8 w-full max-w-75 flex flex-col space-y-3 justify-center items-center">
          <ButtonLink
            css="w-full"
            variant={ButtonVariant['secondary-outline']}
            rel="nofollow noreferrer"
            target="_blank"
            href={`${OPENSEA_DIRECT_LINK_PREFIX}/${props.devId}`}
          >
            <IconOpenSea width="1em" class="mie-2 text-md" /> View on OpenSea
          </ButtonLink>

          <ButtonLink
            css="w-full"
            variant={ButtonVariant['secondary-outline']}
            rel="nofollow noreferrer"
            target="_blank"
            href={`https://twitter.com/intent/tweet?url=Gm%20%40developer_dao%20from%20Dev%23${props.devId}%20%F0%9F%8C%88%20Ready%20to%20learn%20and%20build%20%23web3%20%F0%9F%A4%9D%20%0ACheck%20your%20%E2%9C%A8Holographic%E2%9C%A8%20Dev%20here%20%F0%9F%91%80%E2%9E%A1%EF%B8%8F%20https%3A%2F%2Fholodevdao.xyz%2F%3Fid%3D${props.devId}%0A%23probablynothing%20%23holographicdev%F0%9F%8C%88%20%23devdao%0A`}
          >
            <IconTwitter width="1em" class="mie-2 text-md" /> Share on Twitter
          </ButtonLink>
        </div>
      </Show>
    </>
  )
}

export default DeveloperDaoNftLookup
