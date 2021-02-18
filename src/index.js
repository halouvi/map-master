import { render } from 'react-dom'
import { App } from './App.jsx'
import { Provider as EventBusProvider } from 'react-bus'

import './styles/styles.scss'

render(
  <EventBusProvider>
    <App />
  </EventBusProvider>,
  document.getElementById('root')
)
