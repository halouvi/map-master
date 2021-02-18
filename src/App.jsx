import { Header } from './components/Header/Header'
import { Map } from './pages/Map/Map'
import { Footer } from './components/Footer/Footer'
import { MessageBar } from './components/MessageBar/MessageBar'

export const App = () => {
  return (
    <>
      <Header />
      <Map />
      <Footer />
      <MessageBar />
    </>
  )
}
