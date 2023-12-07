import axios from "axios"

/*
	Code		| Description
---------------------------------------------------------
	0			| Clear sky
	1, 2, 3		| Mainly clear, partly cloudy, and overcast
	45, 48		| Fog and depositing rime fog
	51, 53, 55	| Drizzle: Light, moderate, and dense intensity
	56, 57		| Freezing Drizzle: Light and dense intensity
	61, 63, 65	| Rain: Slight, moderate and heavy intensity
	66, 67		| Freezing Rain: Light and heavy intensity
	71, 73, 75	| Snow fall: Slight, moderate, and heavy intensity
	77			| Snow grains
	80, 81, 82	| Rain showers: Slight, moderate, and violent
	85, 86		| Snow showers slight and heavy
	95 *		| Thunderstorm: Slight or moderate
	96, 99 *	| Thunderstorm with slight and heavy hail

	(*) Thunderstorm forecast with hail is only available in Central Europe
*/

export const icons = {
	0: 	'src/icons/day.svg',			
	1: 	'src/icons/cloudy-day-2.svg',
	2: 	'src/icons/cloudy-day-2.svg',
	3: 	'src/icons/cloudy-day-2.svg',
	45: 'src/icons/fog.svg',
	48:	'src/icons/fog.svg',
	51: 'src/icons/rainy-5.svg',
	53: 'src/icons/rainy-5.svg',
	55: 'src/icons/rainy-5.svg',
	56: 'src/icons/rainy-5.svg',
	57: 'src/icons/rainy-5.svg',
	61: 'src/icons/rainy-5.svg',
	63: 'src/icons/rainy-5.svg',
	65: 'src/icons/rainy-5.svg',
	66: 'src/icons/rainy-5.svg',
	67:	'src/icons/rainy-5.svg',
	71: 'src/icons/snowy-6.svg',
	73: 'src/icons/snowy-6.svg',
	75: 'src/icons/snowy-6.svg',
	77: 'src/icons/snowy-6.svg',
	80: 'src/icons/rainy-5.svg',
	81: 'src/icons/rainy-5.svg',
	82: 'src/icons/rainy-5.svg',
	85: 'src/icons/snowy-6.svg',
	86: 'src/icons/snowy-6.svg',
	95: 'src/icons/thunder.svg',
	96: 'src/icons/thunder.svg',
	99: 'src/icons/thunder.svg',
}

// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,weathercode,windspeed_10m&hourly=temperature_2m,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunset,uv_index_max,precipitation_sum&timeformat=unixtime&timezone=America%2FLos_Angeles

export function getWeather(lat, lon, timezone) {
	return axios.get(
		"https://api.open-meteo.com/v1/forecast?current=temperature_2m,weathercode,windspeed_10m&hourly=temperature_2m,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunset,uv_index_max,precipitation_sum&timeformat=unixtime", 
		{ 
			params: {
				latitude: lat,
				longitude: lon,
				timezone,
			},
		}
	)
	.then(({data}) => {
		return {
			current: parseCurrentWeather(data),
			daily: parseDailyWeather(data),
			hourly: parseHourlyWeather(data)
		}
	})
}

function parseCurrentWeather({ current, daily }) {
	const { 
		temperature_2m: currentTemp, 
		windspeed_10m: windSpeed, 
		weathercode: iconCode,
	} = current;

	const {
		temperature_2m_max: [maxTemp],
		temperature_2m_min: [minTemp],
		precipitation_sum: [precip],
		sunset: [sunset],
		uv_index_max: [uv],
	} = daily;

	const sunset_date = new Date(sunset * 1000);
	let hour   = sunset_date.getHours();
	let minute = sunset_date.getMinutes();

	// console.log("Sunset, local time: ", new Date(sunset*1000).toLocaleString("en-US", {timeZone: "Africa/Lagos"}));
	// console.log("sunset_date: ", sunset_date)	

	if(minute < 10) {
		minute = '0' + minute.toString();
	}

	// const sunset_time_local = hour.toString() + ':' + minute.toString();
	const sunset_time = hour.toString() + ':' + minute.toString();

	return {
		currentTemp: Math.round(currentTemp),
		highTemp: Math.round(maxTemp),
		lowTemp: Math.round(minTemp),
		windSpeed: Math.round(windSpeed),
		precip: Math.round(precip * 100) / 100,
		uvIndex: Math.round(uv),
		sunset: sunset_time,
		iconCode,
	}
}

function parseDailyWeather({ daily }) {
	return daily.time.map((time, index) => {
		return {
			timestamp: new Date(time * 1000).getDay(), // to miliseconds, then get day (integer)
			iconCode: daily.weathercode[index], // integer
			maxTemp: Math.round(daily.temperature_2m_max[index]),
			minTemp: Math.round(daily.temperature_2m_min[index]),
		}
	})
}

function parseHourlyWeather({ hourly, current }) {
	return hourly.time.map((time, index) => {
		return {
			timestamp: new Date(time * 1000).getHours(), //to miliseconds, then 
			iconCode: hourly.weathercode[index],
			temp: Math.round(hourly.temperature_2m[index]),
			precip: Math.round(hourly.precipitation[index] * 100) / 100,
			windSpeed: Math.round(hourly.windspeed_10m[index]),
		}
	}).filter(({ timestamp }) => timestamp >= current.time * 1000)
}