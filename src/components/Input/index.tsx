import { mergeProps } from 'solid-js'
import { ui } from './ui'
import type { IInputProps } from './types'
import { ListVariant, ListScale } from './types'

const Input = (props: IInputProps) => {
  const { scale, variant, css, required, invalid, disabled, ...rest } = props
  props = mergeProps({ variant: 'default', scale: 'default', css: '' }, props)

  return (
    <input
      aria-required={props.required}
      aria-invalid={props.invalid}
      class={`disabled:cursor-not-allowed
      disabled:opacity-50
      ${props.variant ? ui.variant[props.variant] : ui[ListVariant.default]}
      ${props.scale ? ui.scale[props.scale] : ui[ListScale.default]}
      ${props.css}`}
      disabled={props.disabled === true ? true : false}
      {...rest}
    />
  )
}

export default Input
