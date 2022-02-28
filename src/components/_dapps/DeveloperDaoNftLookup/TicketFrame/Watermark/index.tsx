import { WatermarkPosition } from './types'
import type { IWatermarkProps } from './types'

const Watermark = (props: IWatermarkProps) => {
  return (
    <>
      <div
        aria-hidden="true"
        classList={{
          'inline-start-0 top-4': props.position === WatermarkPosition.Top,
          'inline-end-0 bottom-8 text-end': props.position === WatermarkPosition.Bottom,
        }}
        class="absolute px-3 flex italic font-900 uppercase flex-col tracking-md text-md leading-none"
      >
        <span class="text-stroke-neutral-900 text-stroke-ss text-transparent">Developer</span>
        <span
          classList={{
            '-mis-1': props.position === WatermarkPosition.Top,
            '-mie-1': props.position === WatermarkPosition.Bottom,
          }}
          class="text-neutral-900"
        >
          DAO
        </span>
      </div>
    </>
  )
}

export default Watermark
