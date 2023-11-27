import { useState } from 'react'
import './App.css'
import Header from './Header'
import DaySection from './DaySection'
import HourSection from './HourSection'
import { getWeather } from './weather'
import cities from './data.json'

// const all_data = {};
// let all_data  = {};

// let all_data = navigator.geolocation.getCurrentPosition(
// 				(position) => 
// 					getWeather(
// 						position.coords.latitude, 
// 						position.coords.longitude, 
// 						Intl.DateTimeFormat().resolvedOptions().timeZone
// 					)
// 				);
	
// setTimeout(() => {
// 	console.log("ALL_DATA IS: ", all_data);
// }, "1000");

// Default location - Abuja, Nigeria
const latitude = 9.0244164; // myLocation.lat;
const longitude = 7.367465; //myLocation.lon;

// const [lat, setLat] = useState(latitude);
// const [lon, setLon] = useState(longitude);

// setLat(latitude);
// setLon(longitude)

// Displaying default location (Abuja, Nigeria)
// await getWeather(latitude, longitude, Intl.DateTimeFormat().resolvedOptions().timeZone)
// .then((result) => Object.assign(all_data, result))
// .catch(e => {
// 	console.error(e);
// 	alert("Error getting weather.");
// })

	// Waiting for Open-Meteo Weather Forecast API response
	// getWeather(lat, lon, Intl.DateTimeFormat().resolvedOptions().timeZone)
	// .then((res) => Object.assign(all_data, res))
	// .catch(e => {
	// 	console.error(e)
	// 	alert("Error getting weather.")
	// })


// function success(position) {
// 	// latitude = position.coords.latitude;
// 	// longitude = position.coords.longitude;

// 	console.log("Position: ", position);
// 	console.log("Latitude: ", position.coords.latitude);
// 	console.log("Longitude: ", position.coords.longitude);

// 	getLocation(position.coords.latitude, position.coords.longitude)
// 	.then((res) => {
// 		console.log("Returned from promise: ", res);
// 		console.log("ALL DATA: ", all_data);
		
// 	})
// }

// function error() {
// 	console.log("NOT RETRIEVED")
// 	// await getLocation(latitude, longitude);
// }

// navigator.geolocation.getCurrentPosition(
// 	(position) => {
// 		getWeather(position.coords.latitude, position.coords.longitude, Intl.DateTimeFormat().resolvedOptions().timeZone)
// 		.then((result) => Object.assign(all_data, result))
// 		.then((res) => console.log("THE RESULT: ", res))
// 		.then(() => console.log("THEN log: ", all_data.current))
// 		.then(() => {
// 			latitude = position.coords.latitude;
// 			longitude = position.coords.longitude;
// 		})
// 		.catch(e => {
// 			console.error(e);
// 			alert("Error getting weather.");
// 		})
// 	}, error
// );


function App() {

	// const [lat, setLat] = useState(latitude);
	// const [lon, setLon] = useState(longitude);

	const keys_cities = Object.keys(cities);

	const [city, setCity] = useState('Select location');
	const [all_data, setAll_data] = useState({
		current: {
			currentTemp: "--",
			highTemp: "--",
			iconCode: 0,
			lowTemp: "--",
			precip: "--",
			sunset: "--:--",
			uvIndex: "--",
			windSpeed: "--"
		}
	})

	// console.log("APP all_data: ", all_data)

	// if(latitude == cities.lat)
	// 	console.log("WORKED!!!!!!!!!!!!!!!!!!!");
	// else if(latitude == 10)
	// 	console.log("Failed to use location data");

	function getLocation(lat, lon) {
		getWeather(lat, lon, Intl.DateTimeFormat().resolvedOptions().timeZone)
		// .then((result) => Object.assign(all_data, result))
		.then((res) => setAll_data(res))
		.then(() => console.log("Updated data: ", all_data))
		.catch(e => {
			console.error(e);
			alert("Error getting weather.");
		})
	}

	console.log("Keys: ", Object.keys(cities))

	// getLocation(latitude, longitude);
	// setCity('Abuja');

	return (
		<>
			<div id='city-selector'>
				<label>Select City
					<select id="select-box" onChange={
						(e) => {
							console.log("Selected value: ", e.target.value);
							getLocation(cities[e.target.value].lat, cities[e.target.value].lon);
							setCity(e.target.value);
						}
					}>
						<option value={keys_cities[0]}>{keys_cities[0]}</option>
						<option value={keys_cities[1]}>{keys_cities[1]}</option>
						<option value={keys_cities[2]}>{keys_cities[2]}</option>
						<option value={keys_cities[3]}>{keys_cities[3]}</option>
						<option value={keys_cities[4]}>{keys_cities[4]}</option>
						<option value={keys_cities[5]}>{keys_cities[5]}</option>
						<option value={keys_cities[6]}>{keys_cities[6]}</option>
						<option value={keys_cities[7]}>{keys_cities[7]}</option>
						<option value={keys_cities[8]}>{keys_cities[8]}</option>
						<option value={keys_cities[9]}>{keys_cities[9]}</option>
						<option value={keys_cities[10]}>{keys_cities[10]}</option>
						<option value={keys_cities[11]}>{keys_cities[11]}</option>
						<option value={keys_cities[12]}>{keys_cities[12]}</option>
						<option value={keys_cities[13]}>{keys_cities[13]}</option>
						<option value={keys_cities[14]}>{keys_cities[14]}</option>
						<option value={keys_cities[15]}>{keys_cities[15]}</option>
						<option value={keys_cities[16]}>{keys_cities[16]}</option>
						<option value={keys_cities[17]}>{keys_cities[17]}</option>
						<option value={keys_cities[18]}>{keys_cities[18]}</option>
						<option value={keys_cities[19]}>{keys_cities[19]}</option>
						<option value={keys_cities[20]}>{keys_cities[20]}</option>
						<option value={keys_cities[21]}>{keys_cities[21]}</option>
						<option value={keys_cities[22]}>{keys_cities[22]}</option>
						<option value={keys_cities[23]}>{keys_cities[23]}</option>
						<option value={keys_cities[24]}>{keys_cities[24]}</option>
						<option value={keys_cities[25]}>{keys_cities[25]}</option>
						<option value={keys_cities[26]}>{keys_cities[26]}</option>
						<option value={keys_cities[27]}>{keys_cities[27]}</option>
						<option value={keys_cities[28]}>{keys_cities[28]}</option>
						<option value={keys_cities[29]}>{keys_cities[29]}</option>
						<option value={keys_cities[30]}>{keys_cities[30]}</option>
						<option value={keys_cities[31]}>{keys_cities[31]}</option>
						<option value={keys_cities[32]}>{keys_cities[32]}</option>
						<option value={keys_cities[33]}>{keys_cities[33]}</option>
						<option value={keys_cities[34]}>{keys_cities[34]}</option>
						<option value={keys_cities[35]}>{keys_cities[35]}</option>
						<option value={keys_cities[36]}>{keys_cities[36]}</option>
						<option value={keys_cities[37]}>{keys_cities[37]}</option>
						<option value={keys_cities[38]}>{keys_cities[38]}</option>
						<option value={keys_cities[39]}>{keys_cities[39]}</option>
						<option value={keys_cities[40]}>{keys_cities[40]}</option>
						<option value={keys_cities[41]}>{keys_cities[41]}</option>
						<option value={keys_cities[42]}>{keys_cities[42]}</option>
						<option value={keys_cities[43]}>{keys_cities[43]}</option>
						<option value={keys_cities[44]}>{keys_cities[44]}</option>
						<option value={keys_cities[45]}>{keys_cities[45]}</option>
						<option value={keys_cities[46]}>{keys_cities[46]}</option>
						<option value={keys_cities[47]}>{keys_cities[47]}</option>
						<option value={keys_cities[48]}>{keys_cities[48]}</option>
						<option value={keys_cities[49]}>{keys_cities[49]}</option>
						<option value={keys_cities[50]}>{keys_cities[50]}</option>
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
			/>
			<DaySection />
			<HourSection />
		</>
	)
}

export default App