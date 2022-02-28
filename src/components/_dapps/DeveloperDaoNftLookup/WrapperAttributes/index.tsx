import type { IWrapperAttributesProps } from './types'

const WrapperAttributes = (props: IWrapperAttributesProps) => {
  return (
    <div class="border-solid border-neutral-900 border-md rounded-sl p-1">
      <div class="flex flex-wrap border-solid border-neutral-900 border-md rounded-md divide-y-sm divide-neutral-900 divide-solid">
        {props.children}
      </div>
    </div>
  )
}

export default WrapperAttributes
