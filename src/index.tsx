import '@styles/index.css'
import { render } from 'solid-js/web'
import { Router } from 'solid-app-router'
import App from './app'
import { UserPreferencesProvider } from '@contexts/UserPreferences'

render(
  () => (
    <UserPreferencesProvider>
      <Router>
        <App />
      </Router>
    </UserPreferencesProvider>
  ),
  document.getElementById('root') as HTMLElement,
)
