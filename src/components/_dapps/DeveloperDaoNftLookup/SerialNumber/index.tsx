import type { ISerialNumberProps } from './types'

const SerialNumber = (props: ISerialNumberProps) => {
  return (
    <div class="tracking-lg font-800 pt-6 text-base text-end pie-3">
      <span class="text-neutral-900">{props.id}</span>
      <span class="mx-1 text-neutral-900 text-opacity-20">/</span>
      <span class="text-stroke-neutral-900 text-stroke-ss text-transparent">{props.max}</span>
    </div>
  )
}

export default SerialNumber
