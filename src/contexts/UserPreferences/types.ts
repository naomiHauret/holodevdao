import type { JSX } from 'solid-js'

export interface IUserPreferencesProviderProps {
  children: JSX.Element
}

type PreferenceMotion = {
  reduced: boolean
}

export interface IStateUserPreferences {
  motion: PreferenceMotion
}
