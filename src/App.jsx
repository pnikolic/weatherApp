import { useState } from 'react'
import './App.css'
import Header from './Header'
import DaySection from './DaySection'
import HourSection from './HourSection'
import { getWeather } from './weather'
import myLocation from './data.json'

const all_data = {};

// Waiting for Open-Meteo Weather Forecast API response
await getWeather(myLocation.lat, myLocation.lon, Intl.DateTimeFormat().resolvedOptions().timeZone)
.then((res) => Object.assign(all_data, res))
.catch(e => {
	console.error(e)
	alert("Error getting weather.")
})

function App() {
	return (
		<>
			<Header
				currenttemp 	= { all_data.current.currentTemp }
				currenthigh 	= { all_data.current.highTemp }
				currentlow 		= { all_data.current.lowTemp }
				currentwind 	= { all_data.current.windSpeed }
				currentprecip 	= { all_data.current.precip }
				uv 				= { all_data.current.uvIndex }
				sunset 			= { all_data.current.sunset }
				iconCode		= { all_data.current.iconCode }
			/>
			<DaySection />
			<HourSection />
		</>
	)
}

export default App