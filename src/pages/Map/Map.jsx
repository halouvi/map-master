import axios from 'axios'
import { useMount, useSetState } from 'react-use'
import { Button } from '@material-ui/core'
import { Loader } from '../../components/Loader/Loader'

export const Map = () => {
  const [{ name, coords }, setUserLocation] = useSetState({ name: '', coords: '' })

  const getUserLocationByIP = async () => {
    try {
      setUserLocation({ coords: '' })
      const {
        data: { city, country_name, latitude, longitude }
      } = await axios.get(`https://api.ipdata.co?api-key=${process.env.REACT_APP_IP_KEY}`)
      setUserLocation({
        name: `${city}, ${country_name}`,
        coords: `${latitude}, ${longitude}`
      })
    } catch (err) {
      console.error(err)
    }
  }

  useMount(getUserLocationByIP)

  const mapUrl = `
  https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_MAP_KEY}&q=${name}&center=${coords}&zoom=16
  `
  return (
    <main>
      <h3>{name}</h3>
      <p>
        <span>Not your location? </span>
        <Button variant="contained" disableElevation onClick={getUserLocationByIP}>
          Reload
        </Button>
      </p>
      {!coords ? <Loader /> : <iframe title="map" src={mapUrl} />}
    </main>
  )
}
