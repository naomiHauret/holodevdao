import type { JSX } from 'solid-js/jsx-runtime'

export interface ITicketFrameProps {
  backgroundStyle: string
  isBackface: boolean
  tagline: string
  ticketNumber: number | string
  children: JSX.Element
}

export interface ITicketHeadProps {
  children?: JSX.Element
}
