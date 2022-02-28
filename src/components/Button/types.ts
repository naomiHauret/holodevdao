import type { JSX } from 'solid-js/jsx-runtime'

export enum ListVariant {
  default = 'primary-solid',
  'secondary-outline' = 'secondary-outline',
}

export enum ListScale {
  default = 'default',
  small = 'sm',
}

export interface IButtonProps {
  variant?: ListVariant
  scale?: ListScale
  css?: string
  href?: string
  rel?: string
  target?: string
  disabled?: boolean
  children: JSX.Element
}

export interface IButtonCtaProps extends IButtonProps {
  isLoading?: boolean
}
