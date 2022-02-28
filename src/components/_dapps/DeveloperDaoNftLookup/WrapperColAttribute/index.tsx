import type { IWrapperColAttributeProps } from './types'

const WrapperColAttribute = (props: IWrapperColAttributeProps) => {
  return (
    <div class="flex text-start flex-col w-full justify-baseline p-3 overflow-hidden">
      <span class="text-hs text-neutral-900 text-opacity-50">{props.label}</span>
      <span class={`text-sm overflow-hidden overflow-ellipsis ${props.valueStyles || ''}`}>{props.value}</span>
    </div>
  )
}

export default WrapperColAttribute
