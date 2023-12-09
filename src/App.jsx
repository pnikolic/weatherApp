import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import DaySection from './DaySection'
import HourSection from './HourSection'
import { getWeather } from './weather'
// import cities from './data.json'
import cities from './data_sample.json'

// Default location - Abuja, Nigeria
const latitude = cities["Abuja"].lat; // myLocation.lat;
const longitude = cities["Abuja"].lon; //myLocation.lon;
// const latitude = 9.0244164; // myLocation.lat;
// const longitude = 7.367465; //myLocation.lon;

// function success(position) {
// 	// latitude = position.coords.latitude;
// 	// longitude = position.coords.longitude;

// 	console.log("Position: ", position);
// 	console.log("Latitude: ", position.coords.latitude);
// 	console.log("Longitude: ", position.coords.longitude);
// }

// function error() {
// 	console.log("NOT RETRIEVED")
// 	// await getLocation(latitude, longitude);
// }

// navigator.geolocation.getCurrentPosition(
// 	(position) => {
// 		getWeather(position.coords.latitude, position.coords.longitude, Intl.DateTimeFormat().resolvedOptions().timeZone)
// 	}, error
// );

function App() {
	// Initialize variables
	const templateDate = new Date();
	const templateHours = templateDate.getHours();
	const templateDay = templateDate.getDay();

	const keys_cities = Object.keys(cities);
	const options = []; // options for select element at top of page

	const [city, setCity] 			= useState('Select location');
	const [localTime, setLocalTime] = useState('--:--');
	const [timezone, setTimezone] 	= useState('America/Los_Angeles');
	const [all_data, setAll_data] 	= useState({
		current: {
			currentTemp: "--",
			highTemp: "--",
			iconCode: 0,
			lowTemp: "--",
			precip: "--",
			sunset: "--:--",
			uvIndex: "--",
			windSpeed: "--"
		},
		daily: [
			{ timestamp: 0,	iconCode: 0, maxTemp: 0, minTemp: 0 },
			{ timestamp: 0,	iconCode: 0, maxTemp: 0, minTemp: 0 },
			{ timestamp: 0,	iconCode: 0, maxTemp: 0, minTemp: 0 },
			{ timestamp: 0,	iconCode: 0, maxTemp: 0, minTemp: 0 },
			{ timestamp: 0,	iconCode: 0, maxTemp: 0, minTemp: 0 },
			{ timestamp: 0,	iconCode: 0, maxTemp: 0, minTemp: 0 },
			{ timestamp: 0,	iconCode: 0, maxTemp: 0, minTemp: 0 },
		],
		hourly: [
			{ timestamp: templateDate,	iconCode: 0, temp: "0", precip: "0", windSpeed: "0" },
			{ timestamp: templateDate,	iconCode: 0, temp: "0", precip: "0", windSpeed: "0" },
			{ timestamp: templateDate,	iconCode: 0, temp: "0", precip: "0", windSpeed: "0" },
			{ timestamp: templateDate,	iconCode: 0, temp: "0", precip: "0", windSpeed: "0" },
			{ timestamp: templateDate,	iconCode: 0, temp: "0", precip: "0", windSpeed: "0" },
			{ timestamp: templateDate,	iconCode: 0, temp: "0", precip: "0", windSpeed: "0" },
			{ timestamp: templateDate,	iconCode: 0, temp: "0", precip: "0", windSpeed: "0" },
		]
	});

	function setSunsetToLocale(currentSunset, tz) {
		if(currentSunset[0] == "-") {
			return "0";
 		} else {
			// console.log("The RESOLVE sunset TIME: ", currentSunset);
			let idx 	 = 1;
			let hours 	 = "";
			let minutes  = "";
			let date_new = new Date();
		
			for(let i = 0; i < currentSunset.length; i++) {
				if(currentSunset[i] == ":") {
					idx = i;
				} else if(i > idx && currentSunset[i] != " ") {
					minutes += currentSunset[i];
				} else if(currentSunset[i] == " ") {
					break;
				} else {
					hours += currentSunset[i];
				}
			}
			
			date_new.setHours(hours);
			date_new.setMinutes(minutes);

			const value = new Intl.DateTimeFormat('en-US', {hour: "numeric", minute: "numeric", timeZone: tz}).format(date_new); 
			// console.log("VALUE: ", value.substring(0, value.length-3));
			return value;
		}
	}

	function getLocation(lat, lon, tz) {
		const locationTime = new Intl.DateTimeFormat('en-US', {hour: "numeric", minute: "numeric", timeZone: tz}).format(new Date());
		
		getWeather(lat, lon, tz) /* Intl.DateTimeFormat().resolvedOptions().timeZone */ 
		.then((res) => {
			res.current.sunset = setSunsetToLocale(res.current.sunset, tz)
			setAll_data(res);
			console.log(res); // Show what API returns
		})
		.catch(e => {
			console.error(e);
			alert("Error getting weather.");
		});

		setTimezone(tz);
		setLocalTime(locationTime);
	}

	// Add options to select tag from "data_sample.json" AKA "cities"
	keys_cities.forEach((city) => {
		options.push(
			<option value={city} key={city}>
				{city}
			</option>
		);
	});

	// On first load
	useEffect(() => {
		getLocation(latitude, longitude, cities["Abuja"].tz);
		setCity('Abuja');
	}, []);

	return (
		<>
			<div id='city-selector'>
				<p style={{ fontSize: "11px", color: "blue" }}>*Location coordinates are approximate 
					<br></br>
					*Sunset time might not be exact.
					<br></br>
					*Temperatures are shown in °C
				</p>
				<label className='header-left' style={{ border: "none" , overflowX: "visible" }}>Select City
					<select id="select-box" onChange={
						(e) => {
							// console.log("Selected value: ", e.target.value);
							getLocation(
								cities[ e.target.value ].lat, 
								cities[ e.target.value ].lon, 
								cities[ e.target.value ].tz
							);
							setCity(e.target.value);
							// console.log(e.target.value);
						}
					}>
						{ options }
					</select>
				</label>
			</div>

			<Header
				currenttemp 	= { all_data.current.currentTemp }
				currenthigh 	= { all_data.current.highTemp }
				currentlow 		= { all_data.current.lowTemp }
				currentwind 	= { all_data.current.windSpeed }
				currentprecip 	= { all_data.current.precip }
				uv 				= { all_data.current.uvIndex }
				sunset 			= { all_data.current.sunset }
				iconCode		= { all_data.current.iconCode }
				location		= { city }
				localTime		= { localTime }
				tz				= { timezone }
			/>
			<DaySection
				days = { all_data.daily }
			/>
			<HourSection 
				hourly = { all_data.hourly }
			/>
		</>
	)
}

export default App