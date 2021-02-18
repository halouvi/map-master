import axios from 'axios'
import { useBus } from 'react-bus'
import { useMount } from 'react-use'
import { Button } from '@material-ui/core'
import { Loader } from '../../components/Loader/Loader'
import { useState } from 'react'

export const Map = () => {
  const eventBus = useBus()
  const [{ location, coords }, setUserLocation] = useState({ location: '', coords: '' })

  const getUserLocationByIP = async () => {
    try {
      setUserLocation({ location: '', coords: '' })
      const {
        data: { city, country_name, latitude, longitude }
      } = await axios.get(`https://api.ipdata.co?api-key=${process.env.REACT_APP_IP_KEY}`)
      setUserLocation({
        location: `${city}, ${country_name}`,
        coords: `${latitude}, ${longitude}`
      })
    } catch (err) {
      eventBus.emit('newMessage', {
        severity: 'error',
        txt: 'Something went Wrong, Please try again.'
      })
    }
  }

  useMount(getUserLocationByIP)

  const mapUrl = `
  https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_MAP_KEY}&q=${location}&center=${coords}&zoom=16
  `
  return (
    <main>
      <h4>{!location ? 'Searching...' : `Welcome, guest from ${location}!`}</h4>
      <p>
        <span>Got it wrong? </span>
        <Button onClick={getUserLocationByIP} variant="contained" disableElevation>
          Reload
        </Button>
      </p>
      {!location ? <Loader /> : <iframe src={mapUrl} title="map" />}
    </main>
  )
}
