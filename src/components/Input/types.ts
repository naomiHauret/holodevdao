export enum ListVariant {
  default = 'default',
}

export enum ListScale {
  default = 'default',
  sm = 'sm',
}

export interface IInputProps {
  variant?: ListVariant
  scale?: ListScale
  css?: string
  required?: boolean
  invalid?: boolean
  id: string
  type: string
  name: string
  min?: string | number
  max?: string | number
  step?: string | number
  pattern?: string
  placeholder?: string
  value?: string | number
  onChange?: (e: InputEvent) => void
  disabled?: boolean
}
