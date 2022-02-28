import { mergeProps } from 'solid-js'
import ui from './ui'
import type { IButtonCtaProps, IButtonProps } from './types'
import { ListVariant, ListScale } from './types'

export const ButtonCta = (props: IButtonCtaProps) => {
  const { scale, variant, css, isLoading, ...rest } = props
  props = mergeProps({ variant: ListVariant.default, scale: ListScale.default, css: '' }, props)

  return (
    <button
      disabled={props.isLoading === true || props.disabled === true}
      class={`disabled:cursor-not-allowed
      disabled:opacity-50
      inline-flex justify-center items-center
      ${props.variant ? ui.variant[props.variant] : ui.variant[ListVariant.default]}
      ${props.scale ? ui.scale[props.scale] : ui.scale[ListScale.default]}
      ${props.css}`}
      {...rest}
    >
      {props.children}
    </button>
  )
}

export const ButtonLink = (props: IButtonProps) => {
  const { scale, variant, css, ...rest } = props
  props = mergeProps({ variant: ListVariant.default, scale: ListScale.default, css: '' }, props)

  return (
    <a
      class={`
  inline-flex justify-center items-center
  ${props.variant ? ui.variant[props.variant] : ui.variant[ListVariant.default]}
  ${props.scale ? ui.scale[props.scale] : ui.scale[ListScale.default]}
  ${props.css}`}
      {...rest}
    >
      {props.children}
    </a>
  )
}
