import type { IWrapperRowAttributesProps } from './types'

const WrapperRowAttributes = (props: IWrapperRowAttributesProps) => {
  return <div class="w-full flex divide-i-sm divide-opacity-50 divide-dashed divide-neutral-900">{props.children}</div>
}

export default WrapperRowAttributes
