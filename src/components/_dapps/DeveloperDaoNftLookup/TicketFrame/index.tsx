import { createSignal, Match, Switch } from 'solid-js'
import styles from '@components/_dapps/DeveloperDaoNftLookup/index.module.css'
import Watermark from './Watermark'
import Tagline from './Tagline'
import BarcodeId from './BarcodeId'
import { TaglinePosition } from './Tagline/types'
import { WatermarkPosition } from './Watermark/types'
import type { ITicketFrameProps, ITicketHeadProps } from './types'

export const TicketHead = (props: ITicketHeadProps) => {
  return (
    <div class="flex flex-col relative z-10 min-h-30 pb-1 border-b-sm border-dashed border-neutral-900 border-opacity-25">
      {props.children}
      <div class={`${styles.punchHoles} z-10`} />
    </div>
  )
}

export const TicketFrame = (props: ITicketFrameProps) => {
  const [holographicPositionX, setHolographicPositionX] = createSignal('54.16374269005848%')

  function updateHolographicPositionX(e: MouseEvent) {
    const x = e.clientX
    const width = document.documentElement.clientWidth
    const value = x / width
    setHolographicPositionX(`${value * 100}%`)
  }

  return (
    <div class="absolute w-full h-full top-0 left-0">
      <section
        class={`w-full h-auto min-h-158 overflow-hidden flex flex-col relative rounded-lg ${styles.ticket} ${props.backgroundStyle}`}
        style={{
          '--holographicPositionX': holographicPositionX(),
        }}
        onMouseOver={updateHolographicPositionX}
      >
        <div class="absolute rounded-lg z-10 top-0 left-0 w-full h-full border-solid border-ss border-neutral-900 border-opacity-10" />
        <div class="absolute flex flex-col w-full h-full">
          <Tagline position={TaglinePosition.Top} text={props.tagline} />
          <Tagline position={TaglinePosition.Bottom} text={props.tagline} />
        </div>
        <TicketHead>
          <Switch>
            <Match when={props.isBackface}>
              <BarcodeId id={props.ticketNumber} />
            </Match>
          </Switch>
        </TicketHead>
        <div class="z-20 relative flex flex-col flex-grow pb-24">
          <Watermark position={WatermarkPosition.Top} />
          <Watermark position={WatermarkPosition.Bottom} />
          {props.children}
          <div class={`${styles.punchHoles} z-20`} />
        </div>
      </section>
    </div>
  )
}

export default TicketFrame
