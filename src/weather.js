import axios from "axios"

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
			// daily: parseDailyWeather(data),
			// hourly: parseHourlyWeather(data)
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

	const sunset_date_local = sunset;
	const sunset_date = new Date(sunset * 1000);
	
	console.log("Sunset, local time: ", new Date(sunset*1000).toLocaleString("en-US", {timeZone: "Africa/Lagos"}));

	console.log("sunset_date: ", sunset_date)
	console.log("My Hour: ", new Date().getHours())

	let hour   = sunset_date.getHours();
	let minute = sunset_date.getMinutes();

	// if(hour < 10)
	// 	hour = '0' + hour.toString();

	if(minute < 10)
		minute = '0' + minute.toString();

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
			timestamp: time * 1000, //to miliseconds
			iconCode: daily.weathercode[index],
			maxTemp: Math.round(daily.temperature_2m_max[index]),
		}
	})
}

function parseHourlyWeather({ hourly, current }) {
	return hourly.time.map((time, index) => {
		return {
			timestamp: time * 1000,
			iconCode: hourly.weathercode[index],
			temp: Math.round(hourly.temperature_2m[index]),
			precip: Math.round(hourly.precipitation[index] * 100) / 100,
			windSpeed: Math.round(hourly.windspeed_10m[index]),
		}
	}).filter(({ timestamp }) => timestamp >= current.time * 1000)
}