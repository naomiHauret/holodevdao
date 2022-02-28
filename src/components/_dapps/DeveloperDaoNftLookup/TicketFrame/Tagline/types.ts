export enum TaglinePosition {
  Top = 'top',
  Bottom = 'bottom',
}

export interface ITaglineProps {
  text: string
  position: TaglinePosition
}
