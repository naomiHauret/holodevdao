import { createContext, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import type { IUserPreferencesProviderProps, IStateUserPreferences } from './types'

const UserPreferences = createContext()

export const UserPreferencesProvider = (props: IUserPreferencesProviderProps) => {
  const [state, setState] = createStore<IStateUserPreferences>({
    motion: {
      reduced: true,
    },
  })

  function setPreferredReducedMotion(isReduced: boolean) {
    setState('motion', { reduced: isReduced })
  }

  const store = [
    state,
    {
      setPreferredReducedMotion,
    },
  ]

  return <UserPreferences.Provider value={store}>{props.children}</UserPreferences.Provider>
}

export function useUserPreferences() {
  return useContext(UserPreferences)
}
